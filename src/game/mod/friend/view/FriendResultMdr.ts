namespace game.mod.friend {

    import s2c_instance_fin = msg.s2c_instance_fin;
    import Handler = base.Handler;

    export class FriendResultMdr extends EffectMdrBase {
        private _view: FriendResultView= this.mark("_view", FriendResultView);
        protected _showArgs: s2c_instance_fin;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();

            this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
            this.updateInfo();
        }

        protected onHide(): void {
            SceneUtil.exitScene();
            super.onHide();
        }

        private updateInfo(): void {
            let info = this._showArgs;
            let isWin = info.is_success;

            let diStr = isWin ? "result_bg1" : "result_bg2";
            this._view.img_di.source = ResUtil.getUiPng(diStr);

            let titleStr = isWin ? "result_shenli" : "result_shibai";
            this._view.img_title.source = ResUtil.getUiPng(titleStr);

            this._view.img_state1.source = isWin ? "doufa_win" : "doufa_fail";
            this._view.img_state2.source = !isWin ? "doufa_win" : "doufa_fail";

            this._view.head1.updateMyHead();
            this._view.lab_name1.text = RoleVo.ins.name;

            let ownerInfo = info.owner;
            this._view.head2.updateShow(ownerInfo.head, ownerInfo.head_frame, ownerInfo.sex, ownerInfo.vip);
            this._view.lab_name2.text = ownerInfo.name;
        }

    }
}