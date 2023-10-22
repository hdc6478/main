namespace game.mod.shilian {

    export class YuanLingSceneDiedMdr extends MdrBase {
        private _view: YuanLingSceneDiedView = this.mark("_view", YuanLingSceneDiedView);

        constructor() {
            super(Layer.main);
        }

        protected onInit() {
            super.onInit();
        }

        protected addListeners() {
            super.addListeners();
            this.onNt(SceneEvent.ON_ROLE_RELIVE, this.hide, this);
            this.onNt(SceneEvent.SCENE_CHANGE, this.hide, this);
        }

        protected onShow() {
            super.onShow();
            Layer.main.setChildIndex(this._view, 0);
        }

        protected onHide() {
            super.onHide();
        }
    }

}