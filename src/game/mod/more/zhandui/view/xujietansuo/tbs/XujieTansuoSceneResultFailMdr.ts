namespace game.mod.more {

    import Handler = base.Handler;

    export class XujieTansuoSceneResultFailMdr extends EffectMdrBase {

        private _view: XujieTansuoSceneResultFailView = this.mark("_view", XujieTansuoSceneResultFailView);

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onShow(): void {
            super.onShow();

            this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
        }
    }
}

