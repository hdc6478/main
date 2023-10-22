namespace game.mod.role {

    export class XiuxianNvpuLikeBtn extends BaseListenerRenderer {
        public redPoint: eui.Image;
        public iconDisplay: eui.Image;
        public labelDisplay: eui.Label;

        data: { showHint?: boolean, level: number };

        constructor() {
            super();
            this.skinName = `skins.role.XiuxianNvpuLikeBtnSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            //this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this., this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.redPoint.visible = !!data.showHint;
            this.labelDisplay.text = data.level + '';
        }
    }
}