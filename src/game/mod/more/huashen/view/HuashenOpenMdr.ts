namespace game.mod.more {

    export class HuashenOpenMdr extends MdrBase {
        private _view: HuashenOpenView = this.mark("_view", HuashenOpenView);

        protected onInit(): void {
            super.onInit();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}