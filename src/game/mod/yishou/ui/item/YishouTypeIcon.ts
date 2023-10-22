namespace game.mod.yishou {


    export class YishouTypeIcon extends BaseListenerRenderer {
        public img_icon: eui.Image;
        public img_sel: eui.Image;
        public redPoint: eui.Image;
        public gr_lock: eui.Group;

        data: IYishouTypeIconData;

        constructor() {
            super();
            this.skinName = `skins.yishou.YishouTypeIconSkin`;
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
            this.gr_lock.visible = !data.isActed;
            this.redPoint.visible = !!data.showHint;
            this.img_icon.source = `yishou_type${data.type}`;
        }
    }

    export interface IYishouTypeIconData {
        type: YishouType;
        isActed: boolean;
        showHint: boolean;
    }
}