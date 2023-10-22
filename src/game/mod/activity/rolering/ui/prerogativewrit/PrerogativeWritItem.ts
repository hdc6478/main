namespace game.mod.activity {

    export class PrerogativeWritItem extends BaseListenerRenderer {
        public img_icon: eui.Image;
        public redPoint: eui.Image;

        data: { type: PrerogativeWritType, hint: boolean };

        constructor() {
            super();
            this.skinName = `skins.activity.PrerogativeWritItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.img_icon.source = `lingkuang_${data.type}`;
            this.redPoint.visible = !!data.hint;
        }
    }
}