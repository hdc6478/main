namespace game.mod {

    /**
     * 基础的 egret.Event.ADDED_TO_STAGE 和 egret.Event.REMOVED_FROM_STAGE 事件
     */
    export class BaseStageEventItem extends eui.Component {

        constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        protected onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }
    }

    /**基础文本*/
    export class BaseLabelItem extends BaseListenerRenderer {
        public lb_desc: eui.Label;

        constructor() {
            super();
            this.skinName = `skins.common.BaseLabelItemSkin`;
        }

        protected onRemoveFromStage() {
            super.onRemoveFromStage();
        }

        protected dataChanged() {
            let str = this.data as string;
            this.setLabel(str);
        }

        /**
         * 设置文本样式
         * @param props {textColor: 0xffffff, size: 22, ...}
         */
        private setLabelStyle(props: any): void {
            if (!props || !this.lb_desc) {
                return;
            }
            for (let key in props) {
                this.lb_desc[key] = props[key];
            }
        }

        /**
         * 设置文本
         * @param txt 文本
         * @param props 文本样式 比如：{textColor: 0xffffff, size: 22, ...}
         */
        public setLabel(txt: string, props?: any): void {
            this.lb_desc.textFlow = TextUtil.parseHtml(txt);
            if (props) {
                this.setLabelStyle(props);
            }
        }
    }
}