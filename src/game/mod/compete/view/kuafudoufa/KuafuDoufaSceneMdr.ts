namespace game.mod.compete {

    import TouchEvent = egret.TouchEvent;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import facade = base.facade;
    import GPlayerVo = game.scene.GPlayerVo;
    import GameNT = base.GameNT;
    import ObjectType = game.scene.ObjectType;
    import ParamConfig = game.config.ParamConfig;
    import ArrayCollection = eui.ArrayCollection;
    import TextEvent = egret.TextEvent;
    import s2c_scene_kill_notice = msg.s2c_scene_kill_notice;
    import Tween = base.Tween;
    import Handler = base.Handler;
    import ActorVo = game.scene.ActorVo;
    import MonsterVo = game.scene.MonsterVo;
    import ItemTapEvent = eui.ItemTapEvent;
    import LanDef = game.localization.LanDef;
    import DoufaJinengConfig = game.config.DoufaJinengConfig;
    import MoveAct = game.scene.MoveAct;

    export class KuafuDoufaSceneMdr extends EffectMdrBase implements UpdateItem {
        private _view: KuafuDoufaSceneView = this.mark("_view", KuafuDoufaSceneView);
        private _proxy: CompeteProxy;
        private _sceneProxy: ISceneProxy;

        private _curEnemyVo: GPlayerVo;//显示的第一个敌人
        private _minHpEnemyVo: GPlayerVo;//最低血量敌人
        private _targetVo: ActorVo;//正在攻击的敌人或者怪物
        private _endTime: number;
        private readonly START_TIME: number = 30;//30秒倒计时

        private _redList: ArrayCollection;
        private _blueList: ArrayCollection;
        private _skillList: ArrayCollection;

        private _reliveTime: number = 0;//复活时间戳
        private readonly ATTACK_TIME_TICK: number = 3;//切换攻击状态，限制3秒
        private _attackTime: number = 0;

        private _isNoticeShowing: boolean = false;//是否正在公吿
        private readonly NOTICE_TIME: number = 200; //公告出现时间
        private readonly NOTICE_SHOW: number = 2000; //公告暂停时间

        private _costIndex: number;//技能消耗道具

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._view.percentHeight = 100;
            this._view.percentWidth = 100;
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Compete);
            this._sceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);

            this._redList = new ArrayCollection();
            this._view.list_redBoss.itemRenderer = KuafuDoufaBossItem;
            this._view.list_redBoss.dataProvider = this._redList;

            this._blueList = new ArrayCollection();
            this._view.list_blueBoss.itemRenderer = KuafuDoufaBossItem;
            this._view.list_blueBoss.dataProvider = this._blueList;

            this._skillList = new ArrayCollection();
            this._view.list_skill.itemRenderer = KuafuDoufaSceneSkillItem;
            this._view.list_skill.dataProvider = this._skillList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.head1, TouchEvent.TOUCH_TAP, this.onClickMaxHurt);
            addEventListener(this._view.head2, TouchEvent.TOUCH_TAP, this.onClickEnemy);
            addEventListener(this._view.head3, TouchEvent.TOUCH_TAP, this.onClickMinHp);
            addEventListener(this._view.btn_enemy, TouchEvent.TOUCH_TAP, this.onClickEnemyList);
            addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
            addEventListener(this._view.btn_score, TouchEvent.TOUCH_TAP, this.onClickScore);
            addEventListener(this._view.btn_attack, TouchEvent.TOUCH_TAP, this.onClickAttack);
            addEventListener(this._view.lab_revive, TextEvent.LINK, this.onClickRevive);
            addEventListener(this._view.list_redBoss, ItemTapEvent.ITEM_TAP, this.onClickBoss);
            addEventListener(this._view.list_blueBoss, ItemTapEvent.ITEM_TAP, this.onClickBoss);
            addEventListener(this._view.skill_item, TouchEvent.TOUCH_TAP, this.onClickSkill);
            addEventListener(this._view.list_skill, ItemTapEvent.ITEM_TAP, this.onClickSkillList);

            this.onNt(SceneEvent.ON_SCENE_MAX_HURT_UPDATE, this.updateMaxHurt, this);//最高伤害者更新
            this.onNt(SceneEvent.ON_OBJ_ADD, this.onObjAdd, this);
            this.onNt(SceneEvent.ON_OBJ_DEL, this.onObjDel, this);
            this.onNt(CompeteEvent.KUAFU_DOUFA_SCORE_UPDATE, this.updateScore, this);//积分人数更新
            this.onNt(CompeteEvent.KUAFU_DOUFA_SCORE_REWARD_UPDATE, this.updateScoreHint, this);//积分奖励更新
            this.onNt(SceneEvent.ON_ROLE_RELIVE, this.onRoleRelive, this);
            this.onNt(SceneEvent.ON_ROLE_DIE, this.onRoleDie, this);
            this.onNt(CompeteEvent.KUAFU_DOUFA_BOSS_UPDATE, this.updateBossHp, this);//BOSS血量更新
            this.onNt(CompeteEvent.KUAFU_DOUFA_ATTACK_UPDATE, this.updateAttackStatus, this);//攻击驻守更新
            this.onNt(CompeteEvent.KUAFU_DOUFA_NOTICE_UPDATE, this.updateKill, this);//击杀公告更新
            this.onNt(SceneEvent.FOE_TARGET_CHANGE, this.updateAttack, this);//切换攻击目标
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateIndex, this);
            this.onNt(CompeteEvent.KUAFU_DOUFA_SKILL_CD_UPDATE, this.updateSkill, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateTime();
            this.updateScore();
            this.updateBoss();

            this.updateMaxHurt();
            this.updateEnemy();
            this.updateAttackStatus();

            this.updateSkill();

            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            this._curEnemyVo = null;
            this._minHpEnemyVo = null;
            this._targetVo = null;
            this._proxy.clearNotice();
            Tween.remove(this._view.grp_kill);
            TimeMgr.removeUpdateItem(this);
            if (this._bmpDanceGrp) {
                this._bmpDanceGrp.removeChildren();
            }
            this._bmpDanceGrp = null;
            this._bmpDanceHeadIdx = 0;
            super.onHide();
        }

        /**反击敌人*/
        private onClickMaxHurt(): void {
            if (!this._sceneProxy.maxHurt) {
                return;
            }
            this._bmpDanceHeadIdx = 1;
            this.attackTarget(this._sceneProxy.maxHurt.entity_id);//设置敌人为攻击目标
        }

        /**点击敌人*/
        private onClickEnemy(): void {
            if (!this._curEnemyVo) {
                return;
            }
            this._bmpDanceHeadIdx = 2;
            this.attackTarget(this._curEnemyVo.entity_id);//设置敌人为攻击目标
        }

        /**点击最低血量敌人*/
        private onClickMinHp(): void {
            if (!this._curEnemyVo) {
                return;
            }
            this._bmpDanceHeadIdx = 3;
            this.attackTarget(this._curEnemyVo.entity_id);//设置敌人为攻击目标
        }

        private attackTarget(foeTargetId: Long): void {
            let mainPlayer = this._sceneProxy.mainPlayerObj;
            if (mainPlayer) {
                //玩家正在移动的话，清除移动动作
                mainPlayer.actMgr.removeAllActByCls(MoveAct);
            }
            this._sceneProxy.foeTargetId = foeTargetId;
            this._sceneProxy.requestMonster(foeTargetId);//请求挑战
        }

        /**打开敌人列表*/
        private onClickEnemyList(): void {
            if (!this._curEnemyVo) {
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.Scene, SceneViewType.Enemy);
        }

        private onObjAdd(n: GameNT) {
            this.updateEnemy();
        }

        private onObjDel(n: GameNT) {
            let body = n.body;
            if (body instanceof GPlayerVo) {
                //攻击玩家情况下，打死玩家了，继续寻怪或玩家 @zpj
                let entityId = body.entity_id;
                let foeTargetId = this._sceneProxy.foeTargetId;
                if (foeTargetId && entityId && foeTargetId.eq(entityId)) {
                    this._sceneProxy.foeTargetId = null;
                }
            }
            this.updateEnemy();
        }

        private initShow(): void {
            this._endTime = this._proxy.getNextTime();
            this.setDiedShow(false);//默认关闭
            this._view.lab_revive.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt("立即复活", BlackColor.GREEN, ""));
            this.setKillShow(false);
            this.setAttackShow(false);
        }

        /**更新复仇敌人*/
        private updateMaxHurt(): void {
            let info = this._sceneProxy.maxHurt;
            if (!info) {
                this._view.head1.defaultHeadShow();
                this._view.img_fanji.visible = false;
            } else {
                this._view.head1.updateHeadShow(info.head, info.head_frame, info.sex);
                this._view.img_fanji.visible = true;
            }
            this.updateMaxHurtHp();
        }

        /**更新复仇敌人血量*/
        private updateMaxHurtHp(): void {
            if (!this._sceneProxy.maxHurt) {
                this._view.bar1.show(0, 100, false, 0, false, ProgressBarType.Percent);
                return;
            }
            let info = this._sceneProxy.maxHurt;
            let maxHurtVo = this._sceneProxy.getVoById(info.entity_id) as GPlayerVo;
            let value = maxHurtVo && maxHurtVo.percent || 0;
            this._view.bar1.show(value, 10000, false, 0, false, ProgressBarType.Percent);
        }

        /**更新附近敌人*/
        private updateEnemy(): void {
            let enemies = this._sceneProxy.getEnemyVos(ObjectType.PLAYER);//获取所有敌对玩家
            this._curEnemyVo = enemies && enemies.length ? enemies[0] as GPlayerVo : null;//取第一个敌人
            if (this._curEnemyVo) {
                this._view.head2.updateHeadShow(this._curEnemyVo.head, this._curEnemyVo.head_frame, this._curEnemyVo.sex);
            } else {
                this._view.head2.defaultHeadShow();
            }
            this.updateEnemyHp();

            if (!enemies.length) {
                this._minHpEnemyVo = null;
            } else {
                for (let i of enemies) {
                    if (!this._minHpEnemyVo || this._minHpEnemyVo.percent > i.percent) {
                        this._minHpEnemyVo = i as GPlayerVo;
                    }
                }
            }
            if (this._minHpEnemyVo) {
                this._view.head3.updateHeadShow(this._minHpEnemyVo.head, this._minHpEnemyVo.head_frame, this._minHpEnemyVo.sex);
            } else {
                this._view.head3.defaultHeadShow();
            }
            this.updateEnemyMinHp();
            this.updateAttack(); //@zpj
        }

        /**更新敌人血量*/
        private updateEnemyHp(): void {
            if (!this._curEnemyVo) {
                this._view.bar2.show(0, 100, false, 0, false, ProgressBarType.Percent);
                return;
            }
            let value = this._curEnemyVo.percent || 0;
            this._view.bar2.show(value, 10000, false, 0, false, ProgressBarType.Percent);
        }

        /**更新血量最低敌人血量*/
        private updateEnemyMinHp(): void {
            if (!this._minHpEnemyVo) {
                this._view.bar3.show(0, 100, false, 0, false, ProgressBarType.Percent);
                return;
            }
            let value = this._minHpEnemyVo.percent || 0;
            this._view.bar3.show(value, 10000, false, 0, false, ProgressBarType.Percent);
        }

        private onClickRank(): void {
            facade.showView(ModName.Compete, CompeteViewType.KuafuDoufaRank);
        }

        private onClickScore(): void {
            facade.showView(ModName.Compete, CompeteViewType.KuafuDoufaScore);
        }

        /**切换攻击驻守状态*/
        private onClickAttack(): void {
            let curTime = TimeMgr.time.serverTimeSecond;
            if (this._attackTime) {
                let passTime = curTime - this._attackTime;
                let leftTime = this.ATTACK_TIME_TICK - passTime;
                if (leftTime > 0) {
                    PromptBox.getIns().show(leftTime + "秒后可切换状态");
                    return;
                }
            }
            this._attackTime = curTime;
            this.attackTarget(null);//切换状态时，清除攻击目标
            this._proxy.c2s_kuafudoufa_click(KuafuDoufaOpType.Attack);
        }

        private onClickRevive(): void {
            //todo，立即复活
            let reviveIdx = 4;
            let cfg: DoufaJinengConfig = getConfigByNameId(ConfigName.DoufaJineng, reviveIdx);
            let cost = cfg.cost;
            if (cost && BagUtil.checkPropCntUp(cost[0], cost[1])) {
                this._proxy.c2s_kuafudoufa_scene_use_buff(reviveIdx);
            }
        }

        update(time: base.Time): void {
            this.updateMaxHurtHp();
            this.updateEnemyHp();
            this.updateEnemyMinHp();
            this.updateTargetHp();
            this.updateTime();
            this.updateReliveTime();
            this.updateSkillCd();
        }

        private updateTime(): void {
            let state = this._proxy.state;
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            let timeStr = TimeUtil.formatSecond(leftTime, "mm:ss");
            this._view.lab_time.text = timeStr;

            let continueCfg: ParamConfig = GameConfig.getParamConfigById("kuafu_doufa_continue_time");
            let continueTime = continueCfg && continueCfg.value;//活动持续时间
            let startTime = continueTime - leftTime;//已经开启了多长时间，持续时间-剩余时间
            let startLeftTime = this.START_TIME - startTime;//剩余倒计时时间
            if (startLeftTime >= 0) {
                //30秒倒计时
                this._view.grp_start.visible = true;
                let timeStr = startLeftTime + "";
                this.addBmpFont(timeStr, BmpTextCfg[BmpTextType.Layer], this._view.grp_time);
            } else {
                this._view.grp_start.visible = false;
            }

            if (leftTime <= 0 || state != KuafuDoufaState.Open) {
                // TimeMgr.removeUpdateItem(this);
            }
        }

        private updateScore(): void {
            this._view.lab_redScore.text = "积分：" + this._proxy.redCampScore;
            this._view.lab_redCnt.text = "" + this._proxy.redCampNum;
            this._view.lab_blueScore.text = "积分：" + this._proxy.blueCampScore;
            this._view.lab_blueCnt.text = "" + this._proxy.blueCampNum;
            this.updateScoreHint();
        }

        private updateScoreHint(): void {
            this._view.btn_score.redPoint.visible = this._proxy.getScoreHint();
        }

        /*********************BOSS显示**************************/
        private onClickBoss(e: ItemTapEvent) {
            let data: { camp: number, monsterIndex: number } = e.item;
            let camp = data.camp;
            let monsterIndex = data.monsterIndex;

            //检测BOSS是否可攻击
            let myCamp = this._sceneProxy.mainPlayerVo && this._sceneProxy.mainPlayerVo.camp;
            if (camp == myCamp) {
                return;//自己阵营的则返回
            }
            let hp = this._proxy.getBossHp(monsterIndex);
            if (hp <= 0) {
                return;//已死亡
            }
            //敌方阵营的话，检测上一只BOSS是否击杀
            let curIndex = this._proxy.findCurMonsterIndex(camp);
            if (curIndex != monsterIndex) {
                PromptBox.getIns().show(getLanById(LanDef.kuafu_doufa_tips11));
                return;
            }
            //如果玩家是驻守状态，此时要切换到攻击状态
            let status = this._proxy.attackStatus;
            if (status == KuafuDoufaAttackStatus.Defense) {
                this.onClickAttack();
            }

            this._sceneProxy.requestMonster();//请求挑战BOSS
        }

        private updateBoss(): void {
            let redCfg: ParamConfig = GameConfig.getParamConfigById("kuafu_doufa_guaiwu_zuobiao1");
            let redInfos: number[][] = redCfg && redCfg.value;
            let redDatas: { camp: number, monsterIndex: number }[] = [];
            //红阵营boss反转
            for (let i = redInfos.length - 1; i >= 0; --i) {
                let info = redInfos[i];
                redDatas.push({camp: CampType.RED, monsterIndex: info[0]});
            }
            this._redList.source = redDatas;

            let blueCfg: ParamConfig = GameConfig.getParamConfigById("kuafu_doufa_guaiwu_zuobiao2");
            let blueInfos: number[][] = blueCfg && blueCfg.value;
            let blueDatas: { camp: number, monsterIndex: number }[] = [];
            for (let info of blueInfos) {
                blueDatas.push({camp: CampType.BLUE, monsterIndex: info[0]});
            }
            this._blueList.source = blueDatas;
            this.updateBossHp();
        }

        private updateBossHp(): void {
            this.updateBossHpList(this._view.list_redBoss);
            this.updateBossHpList(this._view.list_blueBoss);
        }

        private updateBossHpList(bossList: eui.List): void {
            if (!bossList.numChildren) {
                return;
            }
            let len = bossList.numChildren;
            for (let i = 0; i < len; ++i) {
                let item = bossList.getChildAt(i) as KuafuDoufaBossItem;
                let monsterIndex = item.data.monsterIndex;
                let hp = this._proxy.getBossHp(monsterIndex);
                item.updateHp(hp);
            }
        }

        /*********************死亡提示**************************/
        private onRoleRelive(): void {
            this.setDiedShow(false);
        }

        private onRoleDie(): void {
            this.setDiedShow(true);
        }

        private setDiedShow(show: boolean): void {
            this._view.grp_died.visible = show;
            if (show) {
                let diedInfo = this._sceneProxy.diedInfo;
                this._reliveTime = diedInfo.relife_time;
                this.updateReliveTime();
            }
        }

        private updateReliveTime(): void {
            if (this._view.grp_died.visible) {
                let leftTime = this._reliveTime - TimeMgr.time.serverTimeSecond;
                this._view.lab_reviveTime.text = leftTime + "秒后复活";
            }
        }

        /*********************攻击驻守状态**************************/
        private updateAttackStatus(): void {
            let status = this._proxy.attackStatus;
            this._view.btn_attack.icon = status == KuafuDoufaAttackStatus.Attack ? "zhushou" : "gongji";
        }

        /*********************击杀公告**************************/
        private setKillShow(show: boolean): void {
            this._view.grp_kill.visible = show;
        }

        private updateKill(): void {
            let infoList = this._proxy.noticeList;
            if (!this._isNoticeShowing && infoList.length) {
                //不在公告表现，且存在公告信息时
                this.showKill(infoList.shift());
            }
            this.updateAttack();//公告更新时，更新攻击信息 @zpj
        }

        private showKill(info: s2c_scene_kill_notice): void {
            this._isNoticeShowing = true;
            this.setKillShow(true);

            this._view.kill1.setData(info.kill_info, false);
            let killStr = "kuafu_doufa_kill_tips" + Math.min(info.kill_num, 5);
            this._view.img_kill.source = killStr;
            this._view.kill2.setData(info.be_kill_info, true);

            Tween.remove(this._view.grp_kill);
            this._view.grp_kill.scaleX = this._view.grp_kill.scaleY = 0;
            Tween.get(this._view.grp_kill)
                .to({scaleX: 1, scaleY: 1}, this.NOTICE_TIME)
                .delay(this.NOTICE_SHOW)//显示2秒钟
                .to({scaleX: 0, scaleY: 0}, this.NOTICE_TIME)
                .exec(Handler.alloc(this, this.checkNextKill));
        }

        private checkNextKill() {
            let infoList = this._proxy.noticeList;
            if (!infoList.length) {
                this._isNoticeShowing = false;
                this.setKillShow(false);
                return;
            }
            this.showKill(infoList.shift());
        }

        /*********************当前攻击目标**************************/
        private setAttackShow(show: boolean): void {
            this._view.grp_attack.visible = show;
        }

        private updateAttack(): void {
            let foeTargetId = this._sceneProxy.foeTargetId;
            if (foeTargetId) {
                let targetVo = this._sceneProxy.getVoById(foeTargetId) as ActorVo;
                if (targetVo && targetVo.percent > 0) { //@zpj
                    this._targetVo = targetVo ? targetVo as ActorVo : null;
                }
            } else {
                this._targetVo = null;
            }
            console.info(`--kuafudoufan_updateAttack--  foeTargetId:${foeTargetId}, this._targetVo:`, this._targetVo);
            if (this._targetVo) {
                this._view.lab_name_attack.text = this._targetVo.name;
                if (this._targetVo.type == ObjectType.MONSTER) {
                    //攻击的是怪物
                    let vo = this._targetVo as MonsterVo;
                    this._view.head_attack.updateBossHeadShow(vo.index, 0);
                } else {
                    //攻击的是玩家
                    let vo = this._targetVo as GPlayerVo;
                    this._view.head_attack.updateHeadShow(vo.head, vo.head_frame, vo.sex);
                }
                this.updateTargetHp();
                this.setAttackShow(true);
            } else {
                this.setAttackShow(false);
            }

            this.updateBmpDanceFunc();
        }

        /**更新攻击目标血量*/
        private updateTargetHp(): void {
            if (!this._targetVo) {
                this.setAttackShow(false);
                return;
            }
            let value = this._targetVo.percent || 0;
            this._view.bar_attack.show(value, 10000, false, 0, false, ProgressBarType.Percent);
        }

        /*********************技能**************************/
        /** 通用背包事件监听 */
        private onBagUpdateIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            let index = this._costIndex;
            if (index && indexs.indexOf(index) > -1) {
                this.updateSkillCost();
            }
        }

        private onClickSkill(e: ItemTapEvent) {
            facade.showView(ModName.Compete, CompeteViewType.KuafuDoufaSkill);
        }

        private onClickSkillList(e: ItemTapEvent) {
            let data: DoufaJinengConfig = e.item;
            //todo
            let cdTime = this._proxy.getSkillCd(data.index);
            if (cdTime > 0) {
                PromptBox.getIns().show(`CD冷却中`);
                return;
            }
            if (data && data.cost && !BagUtil.checkPropCntUp(data.cost[0], data.cost[1])) {
                return;
            }
            this._proxy.c2s_kuafudoufa_scene_use_buff(data.index);
        }

        private updateSkill(): void {
            let items: DoufaJinengConfig[] = getConfigListByName(ConfigName.DoufaJineng);
            let cost = items[0].cost;
            this._costIndex = cost[0];

            this._view.skill_item.img_icon.source = "kuafu_doufa_skill";
            this._view.skill_item.img_mark.visible = false;
            this._view.skill_item.lab_time.text = "";
            this.updateSkillCost();

            this._skillList.source = items;
        }

        private updateSkillCost(): void {
            let cntStr = BagUtil.getPropCntByIdx(this._costIndex) + "";
            this._view.skill_item.lab_cnt.text = cntStr;
        }

        private updateSkillCd(): void {
            if (!this._proxy.haveSkillCd()) {
                return;
            }
            let items: DoufaJinengConfig[] = getConfigListByName(ConfigName.DoufaJineng);
            this._skillList.source = items;
        }

        /**===================攻击中字体跳动处理===================*/

            //上一个字体跳动group
        private _bmpDanceGrp: eui.Group;
        private _bmpDanceHeadIdx: number = 0;

        //攻击中文本处理 @zpj todo
        private updateBmpDanceFunc(): void {
            console.info(`--kuafudoufan_updateBmpDanceFunc111-- foeTargetId:${this._targetVo ? this._targetVo.entity_id : null}`);
            //没有攻击对象或者攻击对象是怪物
            if (!this._targetVo || this._targetVo.type == ObjectType.MONSTER) {
                if (this._bmpDanceGrp) {
                    this._bmpDanceGrp.removeChildren();
                }
                this._bmpDanceGrp = null;
                return;
            }
            let targetId = this._targetVo.entity_id;
            let grp: eui.Group;//播放字体跳动的group
            if (this._sceneProxy.maxHurt && this._bmpDanceHeadIdx == 1) {
                let entityId = this._sceneProxy.maxHurt.entity_id;
                if (entityId && targetId.eq(entityId)) {
                    grp = this._view.grp_attactEft1;
                    console.info(`--kuafudoufan_attack1--`, entityId);
                }
            }
            if (this._curEnemyVo && this._bmpDanceHeadIdx == 2) {
                let entityId = this._curEnemyVo.entity_id;
                if (entityId && targetId.eq(entityId)) {
                    grp = this._view.grp_attactEft2;
                    console.info(`--kuafudoufan_attack2--`, entityId);
                }
            }
            if (this._minHpEnemyVo && this._bmpDanceHeadIdx == 3) {
                let entityId = this._minHpEnemyVo.entity_id;
                if (entityId && targetId.eq(entityId)) {
                    grp = this._view.grp_attactEft3;
                    console.info(`--kuafudoufan_attack3--`, entityId);
                }
            }

            //已在动画中
            if (this._bmpDanceGrp && grp && this._bmpDanceGrp.hashCode == grp.hashCode) {
                return;
            }
            console.info(`--kuafudoufan_updateBmpDanceFunc222-- targetId:${this._targetVo ? this._targetVo.entity_id : null}`);
            if (this._bmpDanceGrp) {
                this._bmpDanceGrp.removeChildren();
            }
            this._bmpDanceGrp = grp;
            if (grp) {
                grp.removeChildren();
                this.getEffHub().addBmpDance('攻击中', grp);
            }
        }

        /**===================攻击中字体跳动处理===================*/
    }
}