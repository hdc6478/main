namespace game.mod.result {

    import s2c_instance_fin = msg.s2c_instance_fin;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;

    export class ResultPassMdr extends EffectMdrBase {

        private _view: ResultPassView = this.mark("_view", ResultPassView);
        protected _showArgs: s2c_instance_fin;
        private _passProxy: IPassProxy;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._passProxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();
            let step = this._passProxy.getStepByIdx(this._showArgs.index);
            if(this._showArgs) {
                this.addBmpFont(step + "", BmpTextCfg[BmpTextType.CommonPower], this._view.grp_1, true, 1, true);
                this.addBmpFont((step + 1) + "", BmpTextCfg[BmpTextType.CommonPower], this._view.grp_2, true, 1, true);
            }
            let str = StringUtil.substitute(getLanById(LanDef.trial_tips9), [(step + 1)]) + getLanById(LanDef.boss_cue5);
            this._view.lab_func1.text = str;
            this._view.lab_func2.text = str;

            this._view.closeTips.updateShow(5, Handler.alloc(this, this.hide));
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}

