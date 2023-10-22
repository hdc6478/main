namespace game.mod.boss {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class AbyssNoTeamMdr extends MdrBase {

        private _view: AbyssNoTeamView = this.mark("_view", AbyssNoTeamView);
        private _proxy: BossProxy;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Boss);
        }


        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_invite, TouchEvent.TOUCH_TAP, this.onClickInvite);
            addEventListener(this._view.btn_union, TouchEvent.TOUCH_TAP, this.onClickUnion);
            addEventListener(this._view.btn_team, TouchEvent.TOUCH_TAP, this.onClickTeam);
            this.onNt(SceneEvent.SCENE_CHANGE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.lab_tips1.textFlow = TextUtil.parseHtml(getLanById(LanDef.zhuimoshenyuan_tips1));
            this._view.lab_tips2.textFlow = TextUtil.parseHtml(getLanById(LanDef.zhuimoshenyuan_tips2));
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickInvite(): void {
            this.hide();
            ViewMgr.getIns().showSecondPop(ModName.Boss, BossViewType.AbyssInvite);
        }

        private onClickUnion(): void {
            this._proxy.c2s_zhuimo_army_ui_show(2);
        }

        private onClickTeam(): void {
            this.hide();
            ViewMgr.getIns().showSecondPop(ModName.Boss, BossViewType.AbyssTeam);
        }

    }
}
