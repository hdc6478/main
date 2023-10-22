namespace game.mod.main {

    import Event = egret.Event;

    export class MainMenuBtn extends Btn {
        public iconDisplay: eui.Image;
        public redPoint: eui.Image;

        private _effHub: UIEftHub;
        private _effId: number;

        constructor() {
            super();
            this.skinName = "skins.main.MainMenuBtnSkin";
            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this._effHub = new UIEftHub(this);
        }

        protected onAddToStage() {
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        protected onRemoveFromStage() {
            this.removeEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.onHide();
        }

        public setImgLock(isUnlock: boolean): void {
            this.iconDisplay.visible = isUnlock;
            this.touchEnabled = isUnlock;
        }

        public showUnLockEff() {
            let self = this;
            if (!self._effId) {
                let posX = this.width / 2;
                let posY = this.height / 2;
                //self._effId = self._effHub.add(UIEftSrc.BtnFuncOpen, posX, posY, Handler.alloc(self, self.removeEffect), 1, this, -1);
            }
        }

        private removeEffect() {
            if (this._effId) {
                this._effHub.removeEffect(this._effId);
                this._effId = null;
            }
        }

        private onHide(): void {
            let self = this;
            self._effHub.clearAllFont();
            self._effHub.removeAllEffects();
        }
    }

}