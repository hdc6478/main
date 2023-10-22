namespace game.mod.main {
    import Handler = base.Handler;
    import Tween = base.Tween;

    export class SuccessTipsMdr extends EffectMdrBase {

        private _view: SuccessTipsView = this.mark("_view", SuccessTipsView);

        protected _showArgs: SuccessTipsType;

        constructor() {
            super(Layer.tip);
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;
        }

        protected onShow(): void {
            super.onShow();
            this.showTween();
            this.showEffect();
        }

        protected onHide(): void {
            this.removeTween();
            super.onHide();
        }

        private showTween(): void {
            this.removeTween();

            this._view.img_type.source = "success_tips_" + this._showArgs;
            this._view.img_type.verticalCenter = 0;
            this._view.img_type.scaleX = this._view.img_type.scaleY = 7;
            this._view.img_type.alpha = 1;
            Tween.get(this._view.img_type)
                .to({scaleX: 1.7, scaleY: 1.7}, 200)
                .delay(800)
                .to({verticalCenter: - 80, alpha: 0}, 300)
                .exec(Handler.alloc(this, () => {
                    this.hide();
                }));
        }

        private removeTween(): void {
            Tween.remove(this._view.img_type);
        }

        private showEffect(): void {
            this.removeEft();
            this.addEftByParent(UIEftSrc.Success, this._view.grp_eft, 0,0,0,null,1);
        }
    }
}