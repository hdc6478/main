namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;
    import facade = base.facade;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import GPlayerVo = game.scene.GPlayerVo;
    import ObjectType = game.scene.ObjectType;
    import Tween = base.Tween;
    import Handler = base.Handler;
    import s2c_scene_kill_notice = msg.s2c_scene_kill_notice;
    import Monster1Config = game.config.Monster1Config;
    import MoveAct = game.scene.MoveAct;
    import ActorVo = game.scene.ActorVo;
    import CommonAi = game.scene.CommonAi;
    import XianjiebrawlBaseConfig = game.config.XianjiebrawlBaseConfig;

    export class XianjieLuandouSceneMdr extends MdrBase implements UpdateItem {
        private _view: XianjieLuandouSceneView = this.mark("_view", XianjieLuandouSceneView);
        private _proxy: XianjieLuandouProxy;
        private _sceneProxy: ISceneProxy;
        private _competeProxy: ICompeteProxy;
        private _listBoss: eui.ArrayCollection;
        private _listSkill: eui.ArrayCollection;

        private _selBossIdx: number;//当前选中攻击的boss序号
        private _skillCostIdx: number;
        private _belongVo: GPlayerVo;//归属者
        private _nearbyEnemyVo: GPlayerVo;//最近敌人
        private _targetVo: ActorVo;//正在攻击的敌人或者怪物

        private _isNoticeShowing: boolean = false;//是否正在公吿
        private readonly NOTICE_TIME: number = 200; //公告出现时间
        private readonly NOTICE_SHOW: number = 2000; //公告暂停时间
        private _reliveTime: number = 0;//复活时间戳

        //左边列表三个角色的箭头按钮控制状态
        private _clickBtn1 = false;
        private _clickBtn2 = false;
        private _clickBtn3 = false;

        public constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._view.percentHeight = 100;
            this._view.percentWidth = 100;
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.XianjieLuandou);
            this._sceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            this._competeProxy = facade.retMod(ModName.Compete).retProxy(ProxyType.Compete);

            this._view.list_boss.itemRenderer = XianjieLuandouBossItem;
            this._view.list_boss.dataProvider = this._listBoss = new eui.ArrayCollection();
            this._view.list_skill.itemRenderer = XianjieLuandouSceneSkillItem;
            this._view.list_skill.dataProvider = this._listSkill = new eui.ArrayCollection();

            this._view.lb_goto.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(getLanById(LanDef.guild_invite), WhiteColor.ORANGE, ''));
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.head1, egret.TouchEvent.TOUCH_TAP, this.onClickHead1, this);
            addEventListener(this._view.head2, egret.TouchEvent.TOUCH_TAP, this.onClickHead2, this);
            addEventListener(this._view.head3, egret.TouchEvent.TOUCH_TAP, this.onClickHead3, this);
            addEventListener(this._view.btn1, egret.TouchEvent.TOUCH_TAP, this.onClickBtn1, this);
            addEventListener(this._view.btn2, egret.TouchEvent.TOUCH_TAP, this.onClickBtn2, this);
            addEventListener(this._view.btn3, egret.TouchEvent.TOUCH_TAP, this.onClickBtn3, this);
            addEventListener(this._view.btn_zhanbao, egret.TouchEvent.TOUCH_TAP, this.onClickZhanbao, this);
            addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickRule, this);
            addEventListener(this._view.btn_hurt, egret.TouchEvent.TOUCH_TAP, this.onClickHurt, this);
            addEventListener(this._view.btn_reward, egret.TouchEvent.TOUCH_TAP, this.onClickRrward, this);
            addEventListener(this._view.skillItem, egret.TouchEvent.TOUCH_TAP, this.onClickSkillItem, this);
            addEventListener(this._view.list_boss, eui.ItemTapEvent.ITEM_TAP, this.onClickListBoss, this);
            addEventListener(this._view.list_skill, eui.ItemTapEvent.ITEM_TAP, this.onClickListSkill, this);
            addEventListener(this._view.btn_skill, egret.TouchEvent.TOUCH_TAP, this.onClickBtnSkill, this);
            addEventListener(this._view.buffReviveView.lab_revive, egret.TextEvent.LINK, this.onClickRevive);
            addEventListener(this._view.lb_goto, egret.TextEvent.LINK, this.onClickGoto);

            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateIndex, this);
            this.onNt(SceneEvent.ON_SCENE_MAX_HURT_UPDATE, this.updateAvengeEnemy, this);//最高伤害者更新
            this.onNt(SceneEvent.ON_OBJ_ADD, this.onObjAdd, this);
            this.onNt(SceneEvent.ON_OBJ_DEL, this.onObjDel, this);
            this.onNt(SceneEvent.ON_ROLE_RELIVE, this.onRoleRelive, this);
            this.onNt(SceneEvent.ON_ROLE_DIE, this.onRoleDie, this);
            this.onNt(MoreEvent.ON_XIANJIE_PVP_BOSS_INFO_UPDATE, this.updateBossListHp, this);
            this.onNt(MoreEvent.ON_XIANJIE_PVP_SCENE_INFO_UPDATE, this.onUpdateXianjieSceneInfo, this);
            this.onNt(MoreEvent.ON_XIANJIE_PVP_KILL_BOSS_INFO_UPDATE, this.onUpdateKillBossInfo, this);
            this.onNt(CompeteEvent.KUAFU_DOUFA_NOTICE_UPDATE, this.updateKill, this);//击杀公告更新
            this.onNt(MoreEvent.ON_XIANJIE_SCENE_SKILL_CD_UPDATE, this.updateSkillCd, this);//技能cd
            this.onNt(SceneEvent.FOE_TARGET_CHANGE, this.updateAttack, this);//切换攻击目标
            this.onNt(MoreEvent.ON_XIANJIE_PVP_SCORE_REWARD_UPDATE, this.updateBtnHint, this);
            this.onNt(SceneEvent.ON_BOSS_HP_FILTER, this.onBossHpChange, this);//boss血条展示后，处理boss选中
            // this.onNt(MoreEvent.ON_XIANJIE_PVP_BATTLE_REPORT_UPDATE, this.onUpdateBattleReportInfo, this);//战报
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();

            this.updateBossList();
            this.initBossSelect();
            this.updateBelong();
            this.updateNearbyEnemy();
            this.updateAvengeEnemy();
            this.updateSkill();
            this.onUpdateXianjieSceneInfo();
            // this.onUpdateBattleReportInfo();

            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
        }

        private initShow(): void {
            this._view.grp_killtips.visible = false;
            this._view.grp_tips.visible = false;
            this._view.headKillView.visible = false;
            this.setAttackShow(false);
            this.setDiedShow(false);
        }

        protected onHide(): void {
            this._selBossIdx = null;
            this._skillCostIdx = null;
            this._belongVo = null;
            this._nearbyEnemyVo = null;
            this._targetVo = null;
            this._competeProxy.clearNotice();
            Tween.remove(this._view.grp_killtips);
            Tween.remove(this._view.headKillView);
            this._clickBtn1 = this._clickBtn2 = this._clickBtn3 = false;
            this.setDiedShow(false);
            super.onHide();
        }

        //战报按钮
        private onUpdateBattleReportInfo(): void {
            let list = this._proxy.report_list;
            this._view.btn_zhanbao.visible = list && list.length > 0;
        }

        //宗门人数等变化
        private onUpdateXianjieSceneInfo(): void {
            this._view.btn_skill.data = this._proxy.boss_kill_count;
            this._view.lb_cnt.textFlow = TextUtil.parseHtml(getLanById(LanDef.union_title_4) + ':' + TextUtil.addColor(this._proxy.guild_count + '', 0x41ff28));

            this.updateBtnHint();
        }

        //积分按钮红点
        private updateBtnHint(): void {
            this._view.btn_reward.setHint(this._proxy.getScoreRewardHint());
        }

        //todo
        private updateAttack(): void {
            DEBUG && console.log(`xianjie change attack：`, this._sceneProxy.foeTargetId);
            let foeTargetId = this._sceneProxy.foeTargetId;
            let targetVo: ActorVo = null;
            if (foeTargetId) {
                let vo = this._sceneProxy.getVoById(foeTargetId) as ActorVo;
                if (vo && vo.percent > 0) {
                    targetVo = vo;
                }
            }
            if (targetVo) {
                /*if (targetVo.type == ObjectType.MONSTER) {
                    //怪物
                    let data: BossHpData = {
                        entity_id: targetVo.entity_id,
                        cfg: targetVo.cfg,
                        max_hp: targetVo.max_hp,
                        percent: targetVo.percent
                    };
                    this.setAttackShow(true, data);
                } else */
                if (targetVo.type == ObjectType.PLAYER) {
                    //玩家，攻击玩家直接隐藏boss血条
                    this.setAttackShow(false);
                }
            } else {
                this.setAttackShow(false);
            }
        }

        private setAttackShow(show: boolean, data?: BossHpData): void {
            if (show) {
                facade.showView(ModName.Scene, SceneViewType.BigBossHp, data);
            } else {
                facade.hideView(ModName.Scene, SceneViewType.BigBossHp);
            }
        }

        //在打boss
        private onBossHpChange(n: GameNT): void {
            let mainAi: CommonAi = this._sceneProxy.mainAi;
            DEBUG && console.log(`XianjieLuandouSceneMdr, onBossHpChange`);
            if (!mainAi || !mainAi.curTarget || (mainAi.curTarget instanceof GPlayerVo)) {
                this._selBossIdx = null;
                this.setAttackShow(false);
                return;
            }
            if (this._selBossIdx == null) {
                this.initBossSelect();
            }
            let msg: BossHpData = n.body;
            if (!msg) {
                return;
            }
            if (this._selBossIdx != null) {
                //todo 打印
                let bossIdx = this._proxy.bossIdxList[this._selBossIdx];
                DEBUG && console.log(`XianjieLuandouSceneMdr, onBossHpChange, bossIdx1: ${bossIdx}, bossName2: ${msg.cfg && msg.cfg.index}`);
            }
            if (msg.percent > 0 && !this._sceneProxy.curBossId) {
                //血量大于0且之前不在挑战boss状态
                this.setAttackShow(true, msg);
            } else {
                this.sendNt(SceneEvent.ON_BOSS_HP, msg);//发送事件，在BigBossHpMdr里面监听
            }
        }

        /*====================战场提示 start====================*/

        //击破灵石提示
        private onUpdateKillBossInfo(): void {
            let info = this._proxy.kill_boss_info;
            if (!info) {
                this._view.grp_killtips.visible = false;
            } else {
                this._view.grp_killtips.visible = true;
                let bossCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, info.boss_id.toNumber());
                //todo
                this._view.lb_killtips.text = `${info.guild_name}获得${bossCfg && bossCfg.name || ''}的归属`;

                Tween.remove(this._view.grp_killtips);
                Tween.get(this._view.grp_killtips).delay(5000).exec(Handler.alloc(this, () => {
                    this._view.grp_killtips.visible = false;
                    this._proxy.kill_boss_info = null;
                }));
            }
        }

        /*====================击杀提示 start====================*/

        private setKillShow(show: boolean): void {
            this._view.headKillView.visible = show;
        }

        private updateKill(): void {
            let infoList = this._competeProxy.noticeList;
            if (!this._isNoticeShowing && infoList.length) {
                //不在公告表现，且存在公告信息时
                this.showKill(infoList.shift());
            }
        }

        private showKill(info: s2c_scene_kill_notice): void {
            this._isNoticeShowing = true;
            this.setKillShow(true);

            this._view.headKillView.updateShow(info);

            Tween.remove(this._view.headKillView);
            this._view.headKillView.scaleX = this._view.headKillView.scaleY = 0;
            Tween.get(this._view.headKillView)
                .to({scaleX: 1, scaleY: 1}, this.NOTICE_TIME)
                .delay(this.NOTICE_SHOW)//显示2秒钟
                .to({scaleX: 0, scaleY: 0}, this.NOTICE_TIME)
                .exec(Handler.alloc(this, this.checkNextKill));
        }

        private checkNextKill() {
            let infoList = this._competeProxy.noticeList;
            if (!infoList.length) {
                this._isNoticeShowing = false;
                this.setKillShow(false);
                return;
            }
            this.showKill(infoList.shift());
        }

        /*====================顶部怪物列表 start====================*/

        //boss列表
        private updateBossList(): void {
            this._listBoss.replaceAll(this._proxy.bossCfgList);
        }

        //初始boss选中
        private initBossSelect(): void {
            let mainAi = this._sceneProxy.mainAi;
            if (!mainAi) {
                return;
            }
            let target = mainAi.curTarget ? mainAi.curTarget.entity_id : SceneUtil.getAttackTargetId();
            let selIdx: number;
            if (target) {
                let list = this._proxy.boss_list;
                if (list) {
                    let bossIdx: number;
                    for (let key in list) {
                        let item: msg.xianjie_pvp_boss_info = list[key];
                        if (item && item.entity_id.eq(target)) {
                            bossIdx = item.index.toNumber();
                            break;
                        }
                    }
                    if (bossIdx) {
                        selIdx = this._proxy.bossIdxList.indexOf(bossIdx);
                    }
                }
            }
            if (selIdx >= 0) {
                this._view.list_boss.selectedIndex = this._selBossIdx = selIdx;
            } else {
                this._view.list_boss.selectedIndex = this._selBossIdx = null;
            }
        }

        private updateBossListHp(): void {
            let num = this._view.list_boss.numChildren || 0;
            for (let i = 0; i < num; i++) {
                let item = this._view.list_boss.getChildAt(i) as XianjieLuandouBossItem;
                if (!item || !item.data) {
                    continue;
                }
                let bossIdx = item.data.monster_index[0];
                let bossInfo = this._proxy.getBossInfo(bossIdx);
                let hp = bossInfo && bossInfo.percent || 0;
                item.updateHp(hp);
            }
            this.updateBelong();
        }

        /*====================顶部怪物列表 end====================*/

        /*====================左边敌人列表 start====================*/

        private onObjAdd(n: GameNT) {
            this.updateNearbyEnemy();
            this.updateAvengeEnemy();
        }

        private onObjDel(n: GameNT) {
            // let body = n.body;
            // if (body instanceof GPlayerVo) {
            //     //攻击玩家情况下，打死玩家了，继续寻怪或玩家 @zpj
            //     let entityId = body.entity_id;
            //     let foeTargetId = this._sceneProxy.foeTargetId;
            //     if (foeTargetId && entityId && foeTargetId.eq(entityId)) {
            //         this._sceneProxy.foeTargetId = null;
            //     }
            // }
            this.updateNearbyEnemy();
            this.updateAvengeEnemy();
        }

        //更新归属者
        private updateBelong(): void {
            let ownerInfo = this._proxy.owner_info;
            if (ownerInfo) {
                this._view.head1.updateHeadShow(ownerInfo.head, ownerInfo.head_frame, ownerInfo.sex);
            } else {
                this._view.head1.defaultHeadShow();
            }
            this.updateBelongHp();
        }

        //更新归属者血量
        private updateBelongHp(): void {
            let ownerInfo = this._proxy.owner_info;
            if (!ownerInfo) {
                this._view.bar1.show(0, 100, false, 0, false, ProgressBarType.Percent);
                return;
            }
            let value = ownerInfo && ownerInfo.index || 0;
            this._view.bar1.show(value, 10000, false, 0, false, ProgressBarType.Percent);
        }

        //更新附近敌人
        private updateNearbyEnemy(): void {
            let enemies = this._sceneProxy.getEnemyVos(ObjectType.PLAYER);//获取所有敌对玩家
            this._nearbyEnemyVo = enemies && enemies.length ? enemies[0] as GPlayerVo : null;//取第一个敌人
            if (this._nearbyEnemyVo) {
                this._view.head2.updateHeadShow(this._nearbyEnemyVo.head, this._nearbyEnemyVo.head_frame, this._nearbyEnemyVo.sex);
            } else {
                this._view.head2.defaultHeadShow();
            }
            this.updateNearbyEnemyHp();
        }

        //更新附近敌人血量
        private updateNearbyEnemyHp(): void {
            if (!this._nearbyEnemyVo) {
                this._view.bar2.show(0, 100, false, 0, false, ProgressBarType.Percent);
                return;
            }
            let value = this._nearbyEnemyVo.percent || 0;
            this._view.bar2.show(value, 10000, false, 0, false, ProgressBarType.Percent);
        }

        //更新复仇敌人
        private updateAvengeEnemy(): void {
            let info = this._sceneProxy.maxHurt;
            let maxHurtVo: GPlayerVo = info ? this.getVoByRoleId(info.role_id) : null;
            if (!info || !maxHurtVo) {
                this._view.head3.defaultHeadShow();
            } else {
                this._view.head3.updateHeadShow(info.head, info.head_frame, info.sex);
            }
            this.updateAvengeEnemyHp();
        }

        //更新复仇敌人血量
        private updateAvengeEnemyHp(): void {
            let info = this._sceneProxy.maxHurt;
            let maxHurtVo: GPlayerVo = info ? this.getVoByRoleId(info.role_id) : null;
            if (!info || !maxHurtVo) {
                this._view.bar3.show(0, 100, false, 0, false, ProgressBarType.Percent);
                return;
            }
            let value = maxHurtVo && maxHurtVo.percent || 0;
            this._view.bar3.show(value, 10000, false, 0, false, ProgressBarType.Percent);
        }

        private getVoByRoleId(roleId: Long, camp?: number): GPlayerVo {
            let vos: GPlayerVo[] = this._sceneProxy.getVosByType(ObjectType.PLAYER) as GPlayerVo[];
            if (!vos || !vos.length) {
                return null;
            }
            for (let v of vos) {
                if (camp != undefined && v.camp != camp) {
                    continue;
                }
                if (v.role_id.eq(roleId)) {
                    return v;
                }
            }
            return null;
        }

        /*====================左边敌人列表 end====================*/

        /*====================下方技能 start====================*/

        //更新技能
        private updateSkill(): void {
            let skillList = this._proxy.skill_list;
            this._listSkill.replaceAll(skillList);
            this._skillCostIdx = skillList[0][3];

            this._view.skillItem.updateSkillItem();
            this.updateSkillCost();
        }

        private updateSkillCost(): void {
            this._view.skillItem.updateCost(BagUtil.getPropCntByIdx(this._skillCostIdx) + "");
        }

        private updateSkillCd(): void {
            if (!this._proxy.haveSkillCd()) {
                return;
            }
            this._listSkill.replaceAll(this._proxy.skill_list);
        }

        /*====================下方技能 end====================*/

        /*====================角色复活 start====================*/
        private onRoleRelive(): void {
            this.setDiedShow(false);
        }

        private onRoleDie(): void {
            this.setDiedShow(true);
        }

        private setDiedShow(show: boolean): void {
            this._view.buffReviveView.visible = show;
            if (show) {
                let diedInfo = this._sceneProxy.diedInfo;
                this._reliveTime = diedInfo && diedInfo.relife_time || 0;
                this.updateReliveTime();
            }
        }

        private updateReliveTime(): void {
            if (this._view.buffReviveView.visible) {
                let leftTime = this._reliveTime - TimeMgr.time.serverTimeSecond;
                this._view.buffReviveView.updateShow(leftTime);

                if (leftTime <= 0) {
                    this.setDiedShow(false);
                }
            }
        }

        /*====================角色复活 end====================*/

        //立即复活
        private onClickRevive(): void {
            let data = this._proxy.revive_data;
            if (!data) {
                return;
            }
            let cost = [data[3], data[4]];
            if (cost && BagUtil.checkPropCntUp(cost[0], cost[1])) {
                this._proxy.c2s_xianjie_pvp_scene_use_buff(data[0]);
            }
        }

        //点击归属者
        private onClickHead1(): void {
            let info = this._proxy.owner_info;
            if (!info || info.role_id.eq(RoleVo.ins.role_id)) {
                if (info.role_id.notEquals(RoleVo.ins.role_id) && info.guild_id == RoleUtil.getGuildId()) {
                    PromptBox.getIns().show(getLanById(LanDef.xianjieluandou_tips15));
                }
                return;
            }
            this.changeAttackTarget(info.entity_id);
        }

        //点击附近敌人
        private onClickHead2(): void {
            if (this._nearbyEnemyVo) {
                this.changeAttackTarget(this._nearbyEnemyVo.entity_id);
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.Scene, SceneViewType.Enemy);
        }

        //点击复仇
        private onClickHead3(): void {
            if (this._sceneProxy.maxHurt) {
                this.changeAttackTarget(this._sceneProxy.maxHurt.entity_id);
                return;
            }
        }

        //更改攻击目标，攻击玩家 todo
        private changeAttackTarget(foeTargetId: Long): void {
            let mainPlayer = this._sceneProxy.mainPlayerObj;
            if (mainPlayer) {
                //玩家正在移动的话，清除移动动作
                mainPlayer.actMgr.removeAllActByCls(MoveAct);
            }
            this._sceneProxy.foeTargetId = foeTargetId;
            this._sceneProxy.requestMonster(foeTargetId);//请求挑战
            this._view.list_boss.selectedIndex = -1;//无选中boss
            this._selBossIdx = null;
        }

        private onClickBtn1(): void {
            this._clickBtn1 = !this._clickBtn1;
            this._view.btn1.scaleY = this._clickBtn1 ? -1 : 1;
            this._view.enemyInfo1.visible = this._clickBtn1;
            let mate = this._proxy.owner_info;
            if (mate) {
                this._view.enemyInfo1.updateShow(mate);
            } else {
                this._view.enemyInfo1.updateShowDefault();
            }
        }

        private onClickBtn2(): void {
            this._clickBtn2 = !this._clickBtn2;
            this._view.btn2.scaleY = this._clickBtn2 ? -1 : 1;
            this._view.enemyInfo2.visible = this._clickBtn2;
            let vo = this._nearbyEnemyVo;
            if (vo) {
                this._view.enemyInfo2.updateShowByObj(vo);
            } else {
                this._view.enemyInfo2.updateShowDefault();
            }
        }

        private onClickBtn3(): void {
            this._clickBtn3 = !this._clickBtn3;
            this._view.btn3.scaleY = this._clickBtn3 ? -1 : 1;
            this._view.enemyInfo3.visible = this._clickBtn3;
            if (this._sceneProxy.maxHurt) {
                this._view.enemyInfo3.updateShow(this._sceneProxy.maxHurt);
            } else {
                this._view.enemyInfo3.updateShowDefault();
            }
        }

        //战报
        private onClickZhanbao(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianjieLuandouZhanbao);
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.xianjieluandou_tips2));
        }

        //战场统计
        private onClickHurt(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianjieLuandouStatistic);
        }

        //积分奖励
        private onClickRrward(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianjieLuandouScoreReward);
        }

        //技能列表
        private onClickSkillItem(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianjieLuandouSkill);
        }

        private onClickListBoss(e: eui.ItemTapEvent): void {
            let itemData = e.item as XianjiebrawlBaseConfig;
            if (!itemData) {
                return;
            }
            let bossIdx = itemData.monster_index[0];
            let hp = this._proxy.getBossHp(bossIdx);
            if (hp <= 0) {
                //died
                PromptBox.getIns().show(getLanById(LanDef.xianjieluandou_tips9));
                this._view.list_boss.selectedIndex = this._selBossIdx;
                return;
            }
            let itemIndex = e.itemIndex;
            if (itemIndex == this._selBossIdx) {
                return;
            }
            this._selBossIdx = itemIndex;
            let bossCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, bossIdx);
            PromptBox.getIns().show(getLanById(LanDef.xianjieluandou_tips10) + bossCfg.name);//已选择xx

            //攻击boss
            let bossInfo = this._proxy.getBossInfo(bossIdx);
            let target = bossInfo ? bossInfo.entity_id : null;
            this._sceneProxy.requestMonster(target);
        }

        // 使用技能
        private onClickListSkill(e: eui.ItemTapEvent): void {
            let values = e.item as number[];
            if (!values) {
                return;
            }
            let cdTime = this._proxy.getSkillCd(values[0]);
            if (cdTime > 0) {
                PromptBox.getIns().show(getLanById(LanDef.xianjieluandou_tips17));
                return;
            }
            let cost: number[] = [values[3], values[4]];
            if (cost && !BagUtil.checkPropCntUp(cost[0], cost[1])) {
                return;
            }
            this._proxy.c2s_xianjie_pvp_scene_use_buff(values[0]);
        }

        private onClickBtnSkill(): void {
            facade.showView(ModName.More, MoreViewType.XianjieLuandouSkillTips);
        }

        //仙宗邀请
        private onClickGoto(): void {
            let chatProxy: IChatProxy = facade.retMod(ModName.Chat).retProxy(ProxyType.Chat);
            let chatCd = chatProxy.getChatCD(ChatChannel.Union);
            let cfgCd = chatProxy.getCfgCD(ChatChannel.Union);
            if (chatCd && TimeMgr.time.serverTimeSecond - chatCd < cfgCd) {
                return;
            }
            this._proxy.c2s_xianjie_pvp_oper(XianjieLuandouOperType.Oper5);
        }

        /** 通用背包事件监听 */
        private onBagUpdateIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            let index = this._skillCostIdx;
            if (index && indexs.indexOf(index) > -1) {
                this.updateSkillCost();
            }
        }

        update(time: base.Time) {
            // this.updateBelongHp();
            this.updateNearbyEnemyHp();
            this.updateAvengeEnemyHp();
            this.updateSkillCd();
            this.updateReliveTime();

            if (this._selBossIdx == null) {
                this.initBossSelect();
            }

            let endTime = this._proxy.end_time;
            this._view.timeItem.updateTime(endTime);
        }

    }
}