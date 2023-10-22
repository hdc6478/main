namespace game.mod.scene {
    import Tween = base.Tween;
    import Handler = base.Handler;

    export class ChallengeTipsMdr extends EffectMdrBase {
        private _view: ChallengeTipsView = this.mark("_view", ChallengeTipsView);
        protected _showArgs: number;//层级

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._view.horizontalCenter = 0;
            this._view.top = 335;
            this._view.touchEnabled = false;
        }

        protected onShow(): void {
            super.onShow();
            this.updateLv();
        }

        protected onHide(): void {
            Tween.remove(this._view);
            super.onHide();
        }

        private updateLv(): void {
            let lv = this._showArgs;
            let curStr = "第" + lv + "层";
            this.addBmpFont(curStr, BmpTextCfg[BmpTextType.Layer], this._view.grp_lv, true, 1, true);

            Tween.remove(this._view);
            Tween.get(this._view)
                .delay(1000)
                .exec(Handler.alloc(this, this.hide));
        }
    }
}