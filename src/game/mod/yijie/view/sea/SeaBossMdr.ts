namespace game.mod.yijie {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import HuanjingzhihaiIndexConfig = game.config.HuanjingzhihaiIndexConfig;
    import Handler = base.Handler;
    import Tween = base.Tween;
    import delayCall = base.delayCall;

    export class SeaBossMdr extends EffectMdrBase implements UpdateItem {
        private _view: SeaBossView = this.mark("_view", SeaBossView);

        private _proxy: SeaProxy;
        private _itemList: SeaBossPosItem[] = [];
        private _lastIndex: number;//上一次显示的外显
        private _effId: number;//怪物模型用
        private _eftId_player: number;//特效
        private _playingMove: boolean;//正在播放移动
        private _playingAttack: boolean;//正在播放攻击
        private _attackTime: number;//攻击时间，限制0.5秒攻击一次
        private _moveCnt: number = 0;//场景移动的次数

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Sea);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
            addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickGift);
            addEventListener(this._view.btn_ling, TouchEvent.TOUCH_TAP, this.onClickLing);
            addEventListener(this._view.btn_rule, TouchEvent.TOUCH_TAP, this.onClickRule);
            addEventListener(this._view.btn_attack, TouchEvent.TOUCH_TAP, this.onClickAttack);

            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateIndex, this);
            this.onNt(SeaEvent.ON_SEA_INFO_UPDATE, this.onInfoUpdate, this);
            this.onNt(SeaEvent.ON_SEA_RANK_UPDATE, this.updateTopRank, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateGiftTips();
            this.updateTime();
            this.reqRankInfo();
            this.updateTopRank();
            this.updateHint();
            this.onInfoUpdate();
            this.updateScene();

            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            this._effId = 0;
            this._lastIndex = 0;
            this._playingMove = false;
            this._playingAttack = false;
            this._moveCnt = 0;
            this.removeAttackEft();
            this.resetMoveData();
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onClickRank(): void {
            let type = this._proxy.type;
            let btnType = "0" + type;
            ViewMgr.getIns().showView(ModName.Yijie, YijieViewType.SeaRankMain, btnType);
        }

        private onClickGift(): void {
            this.setGiftTips(false);
            ViewMgr.getIns().showGift(ProductId.Id201801);
        }

        private onClickLing(): void {
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.Giving, MdrTabBtnType.TabBtnType06);
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.sea_rule_tips));
        }

        private onClickAttack(): void {
            if(this._playingMove){
                return;//正在移动
            }
            let curTime = TimeMgr.time.serverTime;
            if(this._attackTime && curTime - this._attackTime < 500){
                //点击限制，0.5秒点击一次
                return;
            }
            this._attackTime = curTime;
            if(!BagUtil.checkPropCntUp(PropIndex.HuanjingBossTiaozhanling)){
                return;
            }
            this.playAttack();
            let type = this._proxy.type;
            this._proxy.c2s_huanjingzhihai_click(SeaOpType.Attack, type);
        }

        /** 通用背包事件监听 */
        private onBagUpdateIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            if(indexs.indexOf(PropIndex.HuanjingBossTiaozhanling) >= 0){
                this._view.costItem.updateShow();
            }
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            let type = this._proxy.type;
            let hintType = this._proxy.getRankHintType(type);
            let orderHintType = this._proxy.getOrderHintType(type);
            if (data.node == HintMgr.getType(hintType)) {
                this.updateRankHint(data.value);
            }
            else if (data.node == HintMgr.getType(orderHintType)) {
                this.updateOrderHint(data.value);
            }
        }

        private onInfoUpdate(): void {
            this.updateItemList();
            this.updateShow();
        }

        private initShow(): void {
            this._view.costItem.setDataYellow(PropIndex.HuanjingBossTiaozhanling);
            this._itemList = [
                this._view.item0,
                this._view.item1,
                this._view.item2,
                this._view.item3,
                this._view.item4
            ];
            this._view.scene1.img_bg.source = ResUtil.getUiJpg("sea_boss_bg1");
            this._view.scene2.img_bg.source = ResUtil.getUiJpg("sea_boss_bg2");
        }

        private reqRankInfo(): void {
            let type = this._proxy.type;
            this._proxy.c2s_huanjingzhihai_click(SeaOpType.Rank, type);
        }

        private updateGiftTips(): void {
            let productId = ProductId.Id201801;
            let showGift = PayUtil.checkShowGift(productId);
            this._view.btn_gift.visible = showGift;
            if(showGift){
                let hasBuy = PayUtil.hasBuy(productId);
                this.setGiftTips(!hasBuy);
                if(!hasBuy){
                    this._view.lab_gift.text = getLanById(LanDef.sea_tips11);
                }
            }
            else {
                this.setGiftTips(false);
            }
        }

        private setGiftTips(show: boolean): void {
            this._view.grp_gift.visible = show;
        }

        private updateItemList(): void {
            let type = this._proxy.type;
            let startIndex = this._proxy.getBossStartIndex(type);
            for(let i = 0; i < this._itemList.length; ++i){
                let item = this._itemList[i];
                let index = startIndex + i;
                item.data = index;
            }
        }

        private updateShow(): void {
            let type = this._proxy.type;
            let curIndex = this._proxy.getBossIndex(type);
            let cfg = this._proxy.getBossCfg(type, curIndex);
            let damageStr = StringUtil.getHurtNumStr(cfg.damage_shenling);
            let tipsStr = StringUtil.substitute(getLanById(LanDef.sea_tips10), [damageStr]);
            this._view.lab_tips.text = tipsStr;

            let hp = this._proxy.getBossHp(type);
            let maxHp = cfg.boss_hp;
            this._view.bar.show(hp, maxHp, false, 0, false);//boss血量

            if (curIndex == this._lastIndex) {
                return;
            }
            if(this._lastIndex){
                this.playMove();
            }
            this._lastIndex = curIndex;
            if (this._effId) {
                this.removeEffect(this._effId);
            }
            //todo，怪物没有向下方向的模型
            this._effId = this.addMonsterByRes(cfg.res_id, this._view.scene1.grp_monster, Direction.LEFT_DOWN);
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let endTime = TimeUtil.getNextWeekTime();
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            this._view.timeItem.updateLeftTime(leftTime);
        }

        public updateTopRank(): void {
            let type = this._proxy.type;
            let topInfo = this._proxy.getTopRank(type);
            if (topInfo && topInfo.name) {
                this._view.lab_name.text = topInfo.name;
                this._view.head.updateHeadShow(topInfo.head, topInfo.head_frame, topInfo.sex, topInfo.role_id, topInfo.server_id);
            }
            else {
                this._view.lab_name.text = getLanById(LanDef.tishi_2);
                this._view.head.defaultHeadShow();
            }
        }

        private updateHint(): void {
            let type = this._proxy.type;
            let hintType = this._proxy.getRankHintType(type);
            this.updateRankHint(HintMgr.getHint(hintType));

            let orderHintType = this._proxy.getOrderHintType(type);
            this.updateOrderHint(HintMgr.getHint(orderHintType));
        }

        private updateRankHint(hint: boolean): void {
            this._view.btn_rank.redPoint.visible = hint;
        }

        private updateOrderHint(hint: boolean): void {
            this._view.btn_ling.redPoint.visible = hint;
        }

        private updateScene(): void {
            this.playRoleStand();
            let type = this._proxy.type;
            let cfg: HuanjingzhihaiIndexConfig = getConfigByNameId(ConfigName.HuanjingzhihaiIndex, type);
            for(let i = 0; i < cfg.shenling.length; ++i){
                let index = cfg.shenling[i];
                let shenling = this._view.scene1["shenling" + i] as SeaShenlingItem;
                let dir = SeaShenlingDir[i];
                let star = SurfaceUtil.getStar(index);
                let isAct = star > 0;
                this.addAnimate(index, shenling.grp_shenling, dir, ActionName.STAND, false, false, !isAct);
                if(isAct){
                    this._view.scene1.setIndex(i, index);
                    shenling.starListView.visible = true;
                    shenling.starListView.updateStar(star, star);
                }
                else {
                    shenling.starListView.visible = false;
                    this._view.scene1.setPosX(i, shenling.x);//缓存未激活神灵坐标
                }
            }
        }

        private removeAttackEft(): void {
            if (this._eftId_player) {
                this.removeEffect(this._eftId_player);
                this._eftId_player = null;
            }
        }

        //播放攻击
        private playAttack(): void {
            //todo，怪物没有受击动作

            this.removeAttackEft();
            //播放玩家攻击特效
            this._eftId_player = this.addEftByParent(UIEftSrc.Luolei, this._view.grp_eff, 0,0,-1,null,1,2);

            if(this._playingAttack){
                return;//正在播放攻击动作
            }
            this._playingAttack = true;
            //玩家攻击动作
            this.updateRoleAct(this._view.scene1.grp_player, Direction.RIGHT_UP, ActionName.ATTACK+"1", false, Handler.alloc(this, ()=>{
                this.playRoleStand();
            }));

            //神灵攻击动作和特效
            this.playShenlingAttack();
        }

        //玩家站立
        private playRoleStand(): void {
            this._playingAttack = false;
            this.updateRoleAct(this._view.scene1.grp_player, Direction.RIGHT_UP, ActionName.STAND);
        }

        //神灵站立
        private playShenlingStand(): void {
            let infos = this._view.scene1.getInfos();
            for(let i in infos){
                let index = infos[i];
                let shenling = this._view.scene1["shenling" + i] as SeaShenlingItem;
                shenling.grp_shenling.removeChildren();
                let dir = SeaShenlingDir[i];
                this.addAnimate(index, shenling.grp_shenling, dir, ActionName.STAND, false);
            }
        }

        //神灵攻击
        private playShenlingAttack(): void {
            let infos = this._view.scene1.getInfos();
            for(let i in infos){
                let index = infos[i];
                let shenling = this._view.scene1["shenling" + i] as SeaShenlingItem;
                shenling.grp_shenling.removeChildren();
                let dir = SeaShenlingDir[i];
                this.addAnimate(index, shenling.grp_shenling, dir, ActionName.ATTACK+"1", false, false, false, Handler.alloc(this, ()=>{
                    this.addAnimate(index, shenling.grp_shenling, dir, ActionName.STAND, false);
                }), 1);

                let eftSrc = ResUtil.getSkillEftUrl(SeaShenlingEft[i]);
                let grpEft = this._view["grp_eff_shenling" + i] as eui.Group;
                let rotation = SeaShenlingEftRotation[i];
                this.addEftByParent(eftSrc, grpEft, 0,0,-1,null,1,1, true, 1,
                    false,0, rotation);
            }
        }

        //播放移动
        private playMove(): void {
            this._playingMove = true;
            this.setBossVisible(false);//隐藏boss相关

            delayCall(Handler.alloc(this, ()=>{
                //玩家移动，延迟1秒执行
                this.updateRoleAct(this._view.scene1.grp_player, Direction.RIGHT, ActionName.RUN, true);

                this.playShenlingMove();

                this.playSceneMove();
            }), 1000);
        }
        //神灵移动
        private playShenlingMove(): void {
            let infos = this._view.scene1.getInfos();
            for(let i in infos){
                let index = infos[i];
                let shenling = this._view.scene1["shenling" + i] as SeaShenlingItem;
                shenling.grp_shenling.removeChildren();
                this.addAnimate(index, shenling.grp_shenling, Direction.RIGHT, ActionName.RUN, false);
            }
        }
        //场景移动
        private playSceneMove(): void {
            //背景移动
            this._moveCnt++;
            let cntVal = this._moveCnt % 3 || 3;//循环1~3
            let bgNum = cntVal == 1 ? 3 : (cntVal == 2 ? 2 : 1);
            let bgWidth = 690;
            Tween.get(this._view.scene1.img_bg)
                .to({x: -bgWidth}, 1000)
                .exec(Handler.alloc(this, () => {
                    this._view.scene1.img_bg.x = bgWidth;
                    //设置背景资源，移动一次背景3，移动两次背景2，移动三次背景1，如此循环
                    let bgStr1 ="sea_boss_bg" + bgNum;
                    this._view.scene1.img_bg.source = ResUtil.getUiJpg(bgStr1);

                    //设置boss可见，移动boss位置
                    this.setSceneVisible(true, bgWidth);//显示boss相关
                }))
                .to({x: 0}, 1000)
                .exec(Handler.alloc(this, this.onMoveEnd));

            Tween.get(this._view.scene2.img_bg)
                .to({x: -bgWidth * 2}, 2000)
                .exec(Handler.alloc(this, () => {
                    this._view.scene2.img_bg.x = 0;
                    let bgNum2 = (bgNum + 1) % 3 || 3;
                    let bgStr2 ="sea_boss_bg" + bgNum2;
                    this._view.scene2.img_bg.source = ResUtil.getUiJpg(bgStr2);
                }));

            //移动BOSS
            let bossX = this._view.scene1.grp_monster.x;
            Tween.get(this._view.scene1.grp_monster)
                .delay(1000)
                .to({x: bossX}, 1000);

            //移动神灵
            for(let i = 0; i < SeaShenlingNum; ++i){
                let index = this._view.scene1.getIndex(i);
                if(index){
                    continue;
                }
                let shenling = this._view.scene1["shenling" + i] as SeaShenlingItem;
                let shenlingX = shenling.x;
                Tween.get(shenling)
                    .delay(1000)
                    .to({x: shenlingX}, 1000);
            }
        }

        private resetMoveData(): void {
            Tween.remove(this._view.scene1.img_bg);
            this._view.scene1.img_bg.x = 0;
            Tween.remove(this._view.scene2.img_bg);
            this._view.scene2.img_bg.x = 0;
            Tween.remove(this._view.scene1.grp_monster);
            this._view.scene1.grp_monster.x = 345;//默认居中
            //移动神灵
            for(let i = 0; i < SeaShenlingNum; ++i){
                let index = this._view.scene1.getIndex(i);
                if(index){
                    continue;
                }
                let shenling = this._view.scene1["shenling" + i] as SeaShenlingItem;
                Tween.remove(shenling);
                shenling.x = this._view.scene1.getPosX(i);
            }
            this.setBossVisible(true);//重置显示
        }

        //玩家移动结束
        private onMoveEnd(): void {
            this._playingMove = false;
            this.setBossVisible(true);//显示boss相关
            this.playRoleStand();
            this.playShenlingStand();
        }

        private setBossVisible(visible: boolean): void {
            this._view.bar.visible = visible;//设置boss血条显示隐藏
            this.setSceneVisible(visible);
        }
        //设置场景相关BOSS神灵显示隐藏
        private setSceneVisible(visible: boolean, moveX?: number): void {
            this._view.scene1.grp_monster.visible = visible;
            if(moveX){
                this._view.scene1.grp_monster.x += moveX;
            }

            //设置未激活的神灵显示隐藏
            for(let i = 0; i < SeaShenlingNum; ++i){
                let index = this._view.scene1.getIndex(i);
                if(index){
                    continue;
                }
                let shenling = this._view.scene1["shenling" + i] as SeaShenlingItem;
                shenling.visible = visible;
                if(moveX){
                    shenling.x += moveX;
                }
            }
        }
    }
}