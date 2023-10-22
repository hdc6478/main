namespace game.mod.more {

    import Handler = base.Handler;
    import s2c_zhandui_kuanmai_pvp_ret = msg.s2c_zhandui_kuanmai_pvp_ret;

    export class MiningResultWinMdr extends EffectMdrBase {
        private _view: MiningResultWinView = this.mark("_view", MiningResultWinView);
        private _proxy: MiningProxy;
        private _btnList: eui.Image[] = [];
        public _showArgs: s2c_zhandui_kuanmai_pvp_ret;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Mining);
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();


            // this.addEftByParent(UIEftSrc.Default, this._view.grp_eft, 0, 0, 0, null, 1, 1, false);
            if (this._showArgs.type == 1 || this._showArgs.type == 2) {
                this._view.img_title.source = "jiejiuchenggong";
                this._view.lab_tips1.text = "恭喜您解救成功";
                this._view.lab_tips2.text = `${this._showArgs.name}已摆脱仙臣`;
            } else {
                this._view.img_title.source = "zhengfuchenggong";
                this._view.lab_tips1.text = "恭喜您征服仙臣成功";
                this._view.lab_tips2.text = `${this._showArgs.name}已成为您的仙臣`;
            }

            this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));

        }

        protected onHide(): void {
            this._proxy.c2s_zhandui_kuanzhu_show(1);
            this.removeEft();
            super.onHide();
        }
    }
}

