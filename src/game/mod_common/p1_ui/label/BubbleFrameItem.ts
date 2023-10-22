namespace game.mod {

    export class BubbleFrameItem extends eui.Component {
        public lb_desc: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.common.BubbleFrameItemSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHide, this);
        }

        protected onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            // this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHide, this);
        }

        /**
         * 更新文本
         * @param str
         */
        public updateShow(str: string): void {
            this.visible = true;
            this.lb_desc.textFlow = TextUtil.parseHtml(str);
        }

        // private onClickHide(): void {
        //     this.visible = false;
        // }
    }
}