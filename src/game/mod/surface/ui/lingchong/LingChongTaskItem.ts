namespace game.mod.surface {

    export class LingChongTaskItem extends BaseListenerRenderer {
        public lb_desc: eui.Label;
        public lb_time: eui.Label;

        constructor() {
            super();
            this.skinName = `skins.surface.LingChongTaskItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data as string[];
            if (!data) {
                return;
            }
            this.lb_desc.textFlow = TextUtil.parseHtml(data[0]);
            this.lb_time.textFlow = TextUtil.parseHtml(data[1]);
        }
    }
}