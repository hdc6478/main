namespace game.mod.scene {

    import GameNT = base.GameNT;
    import teammate = msg.teammate;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import GPlayerVo = game.scene.GPlayerVo;
    import TouchEvent = egret.TouchEvent;
    import ObjectType = game.scene.ObjectType;
    import LanDef = game.localization.LanDef;

    export class BelongPlayerMdr extends MdrBase implements UpdateItem {

        private _view: BelongPlayerView = this.mark("_view", BelongPlayerView);
        private _proxy: SceneProxy;
        private _isMyBelong: boolean;//归属是否是自己
        private _belongVo: GPlayerVo;//归属者
        private _openBelong: boolean;//查看归属玩家

        private _curEnemyVo: GPlayerVo;//显示的第一个敌人

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._view.percentHeight = 100;
            this._view.percentWidth = 100;
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Scene);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.head1, TouchEvent.TOUCH_TAP, this.onClickBelong);
            addEventListener(this._view.head2, TouchEvent.TOUCH_TAP, this.onClickEnemy);
            addEventListener(this._view.head3, TouchEvent.TOUCH_TAP, this.onClickMaxHurt);
            addEventListener(this._view.btn_enemy, TouchEvent.TOUCH_TAP, this.onClickEnemyList);
            addEventListener(this._view.btn_belong, TouchEvent.TOUCH_TAP, this.onClickBelongInfo);

            this.onNt(SceneEvent.SCENE_CHANGE, this.hide, this);
            this.onNt(SceneEvent.BIG_BOSS_HP_HIDE, this.hide, this);
            this.onNt(SceneEvent.ON_SCENE_BELONG_UPDATE, this.onBelongUpdate, this);//归属者更新
            this.onNt(SceneEvent.ON_SCENE_MAX_HURT_UPDATE, this.onMaxHurtUpdate, this);//最高伤害者更新
            this.onNt(SceneEvent.ON_OBJ_ADD, this.onObjAdd, this);
            this.onNt(SceneEvent.ON_OBJ_DEL, this.onObjDel, this);
        }

        protected onShow(): void {
            super.onShow();
            this.initShow();
            this.setBelongGrp(false);
            this.updateBelong();
            this.updateEnemy();

            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            this._proxy.belong = null;
            this._belongVo = null;
            this._curEnemyVo = null;

            TimeMgr.removeUpdateItem(this);

            super.onHide();
        }

        private initShow(): void {
            let showRight = SceneUtil.isSceneType(SceneType.ManyBoss);//多人BOSS显示在右边
            if (showRight) {
                this._view.grp_base.right = 6;
                this._view.grp_belong.x = -180;
            }
            else {
                this._view.grp_base.left = 6;
                this._view.grp_belong.x = 133;
            }
        }

        /**点击归属者*/
        private onClickBelong(): void {
            if (this._isMyBelong) {
                return;
            }
            if (!!this._belongVo.camp && !!this._proxy.mainPlayerVo.camp && this._belongVo.camp == this._proxy.mainPlayerVo.camp) {
                PromptBox.getIns().show("同一阵营不能抢夺");
                return;
            }
            this._proxy.foeTargetId = this._belongVo.entity_id;//设置归属者为攻击目标
        }

        /**点击查看归属者信息*/
        private onClickBelongInfo(): void {
            this.setBelongGrp(!this._openBelong);
        }

        /**点击敌人*/
        private onClickEnemy(): void {
            if (!this._curEnemyVo) {
                return;
            }
            this._proxy.foeTargetId = this._curEnemyVo.entity_id;//设置敌人为攻击目标
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
            this.updateEnemy();
        }

        private onBelongUpdate(n: GameNT) {
            let msg: teammate = n.body;
            if (!msg) {
                this.hide();//没有归属者时关闭界面
                return;
            }
            this._proxy.belong = msg;
            this.updateBelong();
        }

        /**更新归属者*/
        private updateBelong(): void {
            this.updateBelongInfo();
            this.updateBelongHp();
            this.updateBelongGrp();
        }

        /**更新归属者头像*/
        private updateBelongInfo(): void {
            let info = this._proxy.belong;
            this._view.head1.updateHeadShow(info.head, info.head_frame, info.sex);
            this._isMyBelong = RoleVo.ins.role_id.eq(info.role_id);
            this._view.img_tips1.visible = !this._isMyBelong;//不是自己就显示抢夺提示
        }

        /**更新归属者血量*/
        private updateBelongHp(): void {
            let info = this._proxy.belong;
            let belongVo = this._proxy.getVoById(info.entity_id) as GPlayerVo;
            this._belongVo = belongVo;
            let value = belongVo && belongVo.percent || 0;
            this._view.bar1.show(value, 10000, false, 0, false, ProgressBarType.Percent);
        }

        /**更新附近敌人*/
        private updateEnemy(): void {
            let enemies = this._proxy.getEnemyVos(ObjectType.PLAYER);//获取所有敌对玩家
            this._curEnemyVo = enemies && enemies.length ? enemies[0] as GPlayerVo : null;//取第一个敌人
            this.updateViewState();
            if (!this._curEnemyVo) {
                return;
            }
            this._view.head2.updateHeadShow(this._curEnemyVo.head, this._curEnemyVo.head_frame, this._curEnemyVo.sex);
            this.updateEnemyHp();
        }

        /**更新敌人血量*/
        private updateEnemyHp(): void {
            if (!this._curEnemyVo) {
                return;
            }
            let value = this._curEnemyVo.percent || 0;
            this._view.bar2.show(value, 10000, false, 0, false, ProgressBarType.Percent);
        }

        /**反击敌人*/
        private onClickMaxHurt(): void {
            if (!this._proxy.maxHurt) {
                return;
            }
            this._proxy.foeTargetId = this._proxy.maxHurt.entity_id;//设置敌人为攻击目标
        }

        private onMaxHurtUpdate(n: GameNT) {
            this.updateViewState();
            this.updateMaxHurt();
            this.updateMaxHurtHp();
        }

        /**更新复仇敌人*/
        private updateMaxHurt(): void {
            let info = this._proxy.maxHurt;
            this._view.head3.updateHeadShow(info.head, info.head_frame, info.sex);
        }

        /**更新复仇敌人血量*/
        private updateMaxHurtHp(): void {
            if (!this._proxy.maxHurt) {
                return;
            }
            let info = this._proxy.maxHurt;
            let maxHurtVo = this._proxy.getVoById(info.entity_id) as GPlayerVo;
            let value = maxHurtVo && maxHurtVo.percent || 0;
            this._view.bar3.show(value, 10000, false, 0, false, ProgressBarType.Percent);
        }

        private updateViewState(): void {
            this._view.currentState = this._curEnemyVo ? (this._proxy.maxHurt ? "3" : "2") : "1";
        }

        private setBelongGrp(open: boolean): void {
            this._openBelong = open;
            this._view.grp_belong.visible = open;
            this._view.btn_belong.scaleY = open ? -1 : 1;
        }

        private updateBelongGrp(): void {
            let info = this._proxy.belong;
            this._view.lab_name.text = info.name;

            let power = info.showpower ? info.showpower.toNumber() : 0;
            this._view.lab_power.text = getLanById(LanDef.showpower) + "：" + StringUtil.getHurtNumStr(power);

            let guildName = info.guild_name || getLanById(LanDef.bag_cue20);
            this._view.lab_guild.text = getLanById(LanDef.union_title_2) + "：" + guildName;
        }

        update(time: base.Time): void {
            this.updateBelongHp();
            this.updateEnemyHp();
            this.updateMaxHurtHp();
        }
    }
}
