namespace game.mod.xianyuan {

    import teammate = msg.teammate;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class XianlvRoleComp extends eui.Component {
        public gr_eft: eui.Group;
        public img_sketch: eui.Image;
        public btn_chat: game.mod.Btn;
        public btn_add: game.mod.Btn;
        public lb_name: eui.Label;

        private _proxy: XianlvProxy;
        private _hub: UIEftHub;
        private _roleId: Long;
        private _serverId: number;
        private teammate: teammate;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.XianlvRoleCompSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage() {
            this._hub = new UIEftHub(this);
            this._proxy = getProxy(ModName.Xianyuan, ProxyType.Xianlv);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btn_chat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickChat, this);
            this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickAdd, this);
        }

        protected onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btn_chat.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickChat, this);
            this.btn_add.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickAdd, this);
            this.gr_eft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRole, this);
            this._hub.removeAllEffects();
            this._roleId = this._serverId = null;
        }

        public updateViewForMyself(): void {
            let info = new teammate();
            let ins = RoleVo.ins;
            info.role_id = ins.role_id;
            info.name = ins.name;
            info.sex = ins.sex;
            info.fashion = ins.fashion;
            info.weapon = ins.weapon;
            info.wing = ins.wing;
            info.server_id = ins.server_id;
            this.updateView(info, true);
        }

        public updateView(teammate: teammate, isMyself = false): void {
            this.teammate = teammate;
            if (!teammate) {
                this.defaultView();
                return;
            }
            this.btn_add.visible = this.img_sketch.visible = false;
            this.lb_name.text = teammate.name;
            this.btn_chat.visible = !isMyself;
            let body: string = ResUtil.getModelName(teammate.fashion, teammate.sex);
            let weapon: string = ResUtil.getModelName(teammate.weapon);
            let wing: string = ResUtil.getModelName(teammate.wing, teammate.sex, true);
            this._hub.removeAllEffects();
            this._hub.updateUIRole(body, weapon, wing, this.gr_eft);

            if (!isMyself) {
                this._roleId = teammate.role_id;
                this._serverId = teammate.server_id;
                this.gr_eft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRole, this);
            }
        }

        private defaultView(): void {
            this.btn_add.visible = this.img_sketch.visible = true;
            this.btn_chat.visible = false;
            this._hub.removeAllEffects();
            this.lb_name.text = getLanById(LanDef.xianlv_tips7);
        }

        //打开私聊界面
        private onClickChat(): void {
            ViewMgr.getIns().chat(this.teammate);
        }

        private onClickAdd(): void {
            facade.showView(ModName.Xianyuan, XianyuanViewType.InviteAdd);
        }

        private onClickRole(): void {
            if (this._roleId) {
                ViewMgr.getIns().showRoleTips(this._roleId, this._serverId);
            }
        }

    }
}