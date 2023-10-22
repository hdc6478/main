namespace game.mod.scene {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import MonsterVo = game.scene.MonsterVo;
    import BitmapFillMode = egret.BitmapFillMode;
    import facade = base.facade;
    import GameNT = base.GameNT;
    import Tween = base.Tween;
    import Handler = base.Handler;
    import SubsectionConfig = game.config.SubsectionConfig;
    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import teammate = msg.teammate;
    import s2c_boss_srefresh_damage = msg.s2c_boss_srefresh_damage;
    import boss_srefresh_damage = msg.boss_srefresh_damage;
    import ShenlingConfig = game.config.ShenlingConfig;

    export class BigBossHpMdr extends MdrBase implements UpdateItem {

        private _view: BigBossHpView = this.mark("_view", BigBossHpView);
        private _proxy: SceneProxy;

        protected _showArgs: BossHpData;
        private _curBossInfo: BossHpData;//boss信息
        private _lastBossId: Long;//上一次boss
        private _rewardId: number;//奖励预览id
        private _rankList: ArrayCollection;//排行榜
        private _damageList: ArrayCollection;//伤害

        /**旧代码*/
        private _isClearBoss: boolean;//清除boss标志
        private _record: number[][];
        private _lastPer: number;
        private _lastNum: number;
        private _isTweening: boolean;
        private _maxLine: number;
        /**旧代码*/

        private _showList: boolean;//默认不展开排行榜列表，伤害列表
        private _maxRank: number = 10;//显示前10名
        private _rankInfo: SceneRankData;//排行榜数据
        private _damageInfo: s2c_boss_srefresh_damage;//伤害数据

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            let self = this;
            self._view.top = 120;
            self._view.horizontalCenter = 0;
            self._view.touchEnabled = false;
            self._proxy = self.retProxy(ProxyType.Scene);
            self._view.img_hp0.fillMode = self._view.img_mask.fillMode = self._view.img_bai.fillMode = BitmapFillMode.REPEAT;

            this._rankList = new ArrayCollection();
            this._view.list_rank.itemRenderer = SceneRankItem;
            this._view.list_rank.dataProvider = this._rankList;

            this._damageList = new ArrayCollection();
            this._view.list_damage.itemRenderer = SceneDamageItem;
            this._view.list_damage.dataProvider = this._damageList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
            addEventListener(this._view.btn_damage, TouchEvent.TOUCH_TAP, this.onClickDamage);

            this.onNt(SceneEvent.ON_OBJ_DEL, this.onObjDel, this);
            this.onNt(SceneEvent.ON_BOSS_HP, this.onBossHpChanged, this);
            this.onNt(SceneEvent.SCENE_CHANGE, this.hide, this);

            this.onNt(SceneEvent.ON_SCENE_RANK_UPDATE, this.onRankUpdate, this);
            this.onNt(SceneEvent.ON_SCENE_DAMAGE_UPDATE, this.onDamageUpdate, this);
            this.onNt(SceneEvent.ON_SCENE_BELONG_UPDATE, this.onBelongUpdate, this);//归属者更新，先放boss血条这里监听，后续需要的话再改
        }

        protected onShow(): void {
            super.onShow();

            // todo
            if (SceneUtil.getCurSceneType() == SceneType.XianjieLuandou) {
                this._view.top = 200;
            }

            this.initShow();

            this.setBossInfo(this._showArgs);
            this.updateReward();

            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            this._proxy.curBossId = null;
            this._lastBossId = null;
            this._isClearBoss = false;

            this._lastNum = this._lastPer = this._maxLine = this._record = null;
            this._isTweening = false;

            TimeMgr.removeUpdateItem(this);
            Tween.remove(this._view.img_mask);

            super.onHide();
        }

        private initShow(): void {
            this._view.grp_rank.visible = false;
            this._showList = false;
            this._rankInfo = null;

            this._view.grp_damage.visible = false;
            this._damageInfo = null;
        }

        private hideHp(): void {
            this.hide();
            this.sendNt(SceneEvent.BIG_BOSS_HP_HIDE);
        }

        /** 检测BOSS是否存活 */
        private onObjDel(n: GameNT) {
            let _vo: MonsterVo = n.body;
            if (!_vo || _vo.entity_id.neq(this._proxy.curBossId)) {
                return;
            }
            if (_vo.isDead) {
                this.setBossHpTweenInfo(0, null);
            } else if (!this._isTweening) {
                this.hideHp();
            }
            this._isClearBoss = true;
        }

        /// 血条更新///
        private onBossHpChanged(n: GameNT) {
            let msg: BossHpData = n.body;
            if (this._proxy.curBossId) {
                let mainPlayerVo = this._proxy.mainPlayerVo;
                let curBossVo = this._proxy.getVoById(this._proxy.curBossId);
                let newBossVo = this._proxy.getVoById(msg.entity_id);
                let curBossDis, newBossDis;
                if (curBossVo) curBossDis = PointUtil.distance(mainPlayerVo.x, mainPlayerVo.y, curBossVo.x, curBossVo.y);
                if (newBossVo) newBossDis = PointUtil.distance(mainPlayerVo.x, mainPlayerVo.y, newBossVo.x, newBossVo.y);
                if (curBossVo && newBossVo && newBossDis > curBossDis){
                    /**过滤距离比当前boss远的boss血量更新*/
                    return;
                }
            }
            this.setBossInfo(msg);
        }

        //设置boss信息
        private setBossInfo(info: BossHpData): void {
            this._curBossInfo = info;
            this._proxy.curBossId = this._curBossInfo.entity_id;
            this.updateBossShow();
            this.setBossHpTweenInfo(this._curBossInfo.percent, this._curBossInfo.max_hp);
        }

        //显示boss信息
        private updateBossShow() {
            if(this._lastBossId && this._curBossInfo.entity_id.eq(this._lastBossId)){
                return;
            }
            this._lastBossId = this._curBossInfo.entity_id;
            let cfg = this._curBossInfo.cfg;
            this._view.lab_name.text = cfg.name;
            this._view.img_icon.source = cfg.res_id;
        }

        //--------------------------------血条动画---------------------------------------------------------

        private setBossHpTweenInfo(percent: number, max_hp: Long) {
            let self = this;
            if (self._lastPer == percent) {
                return;
            }
            self._lastPer = percent;

            let _cur: number = 1;
            let _per: number = 0;
            if (percent > 0) {
                this._maxLine = self.getHpLimit(max_hp);
                let _one: number = Number(max_hp.div(self._maxLine));
                let hp: Long = max_hp.mul(percent).div(10000);
                let _less: number = Number(hp) / _one;
                _cur = Math.floor(_less);
                if (_less > _cur) {
                    _cur++;
                }
                _less = Number(hp.mod(_one));
                _per = _less > 0 ? _less / _one : 1;
            }

            if (!self._record) {
                self._record = [[_per, _cur]];
            } else {
                self._record.push([_per, _cur]);
            }
            if (!self._isTweening) {
                self.setHpTweenShow();
            }
        }

        private getHpLimit(max_hp: Long): number {
            let _line: number = 1;
            let _cfgs: SubsectionConfig[] = getConfigListByName(ConfigName.Subsection);
            if (_cfgs && _cfgs.length > 0) {
                for (let _temp of _cfgs) {
                    if (max_hp.lt(_temp.boss_hp)) {
                        break;
                    }
                    _line = _temp.hp_subsection;
                }
            }
            return _line;
        }

        private setHpTweenShow() {
            let self = this;
            if (self._lastNum != null) {
                self._isTweening = true;
                self.showRecordInfo();
            } else {
                let _show: number[] = self._record.shift();
                self.setOverShow(_show[0], _show[1]);
            }
        }

        private showProTween(_per: number, _cur: number, _isNext: boolean, _time: number = 150) {
            let self = this;
            let _w: number = _isNext ? 0 : _per * 321;
            self._view.img_hp0.width = _w;

            Tween.get(self._view.img_bai)
                .to({alpha: 0}, _time);

            Tween.get(self._view.img_mask)
                .delay(_time - 50)
                .to({width: _w}, _time + 50)
                .exec(Handler.alloc(self, _isNext ? self.showHpFull : self.checkToShowNext, [_per, _cur]));
        }

        private showHpFull(_per: number, _cur: number) {
            let self = this;
            self.setOverShow(1, self._lastNum - 1);
            self.showProTween(_per, _cur, _cur != self._lastNum && self._lastNum > 0, 100);
        }

        private checkToShowNext(_per: number, _cur: number) {
            let self = this;
            self.setOverShow(_per, _cur);

            if (!self._record.length) {
                self._isTweening = false;
                if (_per == 0 && _cur < 2 || self._isClearBoss) {
                    this.hideHp();
                }
                return;
            }
            self.showRecordInfo();
        }

        private showRecordInfo() {
            let self = this;
            let _show: number[] = self._record.pop();
            self._record.length = 0;
            self.showProTween(_show[0], _show[1], _show[1] != this._lastNum && this._lastNum > 0);
        }

        private setOverShow(_per: number, _cur: number) {
            let self = this;
            self._view.img_hp0.width = self._view.img_mask.width = self._view.img_bai.width = _per * 321;
            self._view.img_bai.alpha = 1;
            self._lastNum = _cur;

            this._view.lab_hp.text = _cur > 0 ? "x" + _cur : "";//血条数量

            let _line: number = _cur % 10;//Math.max(0, self._maxLine - _cur);
            self._view.img_hp0.source = self._view.img_mask.source = "boss_hp" + (_line > 0 ? 10 - _line : 0);
            _line = _line > 0 ? _line - 1 : 9;
            self._view.img_hp1.source = _cur == 1 ? "" : "boss_hp" + (_line > 0 ? 10 - _line : 0);
        }
        //--------------------------------血条动画---------------------------------------------------------

        //-----------------------------------倒计时---------------------------------------------------------

        update(time: base.Time): void {
            if(!this._curBossInfo){
                return;
            }
            this.setBossHpTweenInfo(this._curBossInfo.percent, this._curBossInfo.max_hp);
        }


        //-----------------------------------奖励预览-------------------------------
        private onClickReward(): void {
            ViewMgr.getIns().bossReward(this._rewardId);
        }

        private updateReward(): void {
            this._rewardId = 0;
            let rewardInfo = SceneUtil.getReward();
            if(rewardInfo && rewardInfo[0] == SceneUtil.getCurSceneType()){
                this._rewardId = rewardInfo[1];
            }
            this._view.btn_reward.visible = !!this._rewardId;
        }
        //-----------------------------------奖励预览-------------------------------

        //-----------------------------------排行榜-------------------------------
        private onClickRank(): void {
            this._showList = !this._showList;
            this.updateRank();
        }

        private onRankUpdate(n: GameNT) {
            let msg: SceneRankData = n.body;
            this._view.grp_rank.visible = true;
            this._rankInfo = msg;
            this.updateRank();
        }

        private updateRank(): void {
            this._view.currentState = this._showList ? "2" : "1";
            let info = this._rankInfo;
            if(!info){
                return;
            }
            if(this._showList){
                this._rankList.source = info.hurtList && info.hurtList.length ? info.hurtList.slice(0, this._maxRank) : [];//显示前10名
            }
            else {
                let rankStr = getLanById(LanDef.fairy_magic_my_rank);//我的排名：
                rankStr += info.myInfo && info.myInfo.rank_num <= this._maxRank ? info.myInfo.rank_num : this._maxRank + "+";//10+
                this._view.lab_myRank.text = rankStr;

                let myHurt = info.myInfo && info.myInfo.value ? info.myInfo.value.toNumber() : 0;
                this._view.lab_myHurt.text = getLanById(LanDef.exp_tip10) + "：" + StringUtil.getHurtNumStr(myHurt);//伤害：0
            }
        }
        //-----------------------------------排行榜-------------------------------
        //-----------------------------------归属者-------------------------------
        private onBelongUpdate(n: GameNT) {
            let msg: teammate = n.body;
            if(!this._proxy.belong){
                //当前未显示归属者时
                this._proxy.belong = msg;
                facade.showView(ModName.Scene, SceneViewType.Belong, msg);
            }
        }
        //-----------------------------------归属者-------------------------------
        //-----------------------------------伤害-------------------------------
        private onClickDamage(): void {
            this._showList = !this._showList;
            this.updateDamage();
        }

        private onDamageUpdate(n: GameNT) {
            let msg: s2c_boss_srefresh_damage = n.body;
            if(this._rankInfo){
                console.error("场景存在排行榜时，不需要下发伤害！！！");
                this._view.grp_damage.visible = false;
                return;
            }
            this._view.grp_damage.visible = true;
            this._damageInfo = msg;
            this.updateDamage();
        }

        private updateDamage(): void {
            this._view.currentState = this._showList ? "2" : "1";
            let info = this._damageInfo;
            if(!info){
                return;
            }
            if(this._showList){
                let damageList = info.damage_list && info.damage_list.length ? info.damage_list : [];
                damageList.sort(this.sortDamage);
                this._damageList.source = damageList;
            }
            else {
                let allDamage = Long.fromValue(0);
                let perDamage = Long.fromValue(0);
                if(info.damage_list && info.damage_list.length){
                    for(let i of info.damage_list){
                        allDamage = allDamage.add(i.damage);
                        perDamage = perDamage.add(i.damage_s);
                    }
                }
                let damageStr = getLanById(LanDef.all_damage) + "：" + StringUtil.getHurtNumStr(allDamage.toNumber());//总伤害：
                this._view.lab_allDamage.text = damageStr;

                this._view.lab_perDamage.text = StringUtil.getHurtNumStr(perDamage.toNumber()) + "/" + getLanById(LanDef.shijian_4);
            }
        }

        private sortDamage(a: boss_srefresh_damage, b: boss_srefresh_damage): number {
            let aRole: number = a.index.eq(RoleVo.ins.role_id) ? 0 : 1;
            let bRole: number = b.index.eq(RoleVo.ins.role_id) ? 0 : 1;
            if (aRole != bRole) {
                return aRole - bRole;
            }
            let aCfg: ShenlingConfig = getConfigByNameId(ConfigName.Shenling, a.index.toNumber());
            let aType = aCfg ? ShenLingTypeAry.indexOf(aCfg.type) : 0;
            let bCfg: ShenlingConfig = getConfigByNameId(ConfigName.Shenling, b.index.toNumber());
            let bType = bCfg ? ShenLingTypeAry.indexOf(bCfg.type) : 0;
            if(aType != bType){
                return aType - bType;
            }
            return a.index.toNumber() - b.index.toNumber();
        }
        //-----------------------------------伤害-------------------------------

    }
}
