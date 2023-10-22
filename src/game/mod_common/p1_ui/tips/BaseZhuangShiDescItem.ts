namespace game.mod {

    /**
     * 装饰描述标题以及文本
     */
    export class BaseZhuangShiDescItem extends eui.ItemRenderer {
        public nameItem: game.mod.BaseZhuangshiItem;
        public lb_desc: eui.Label;

        constructor() {
            super();
            this.skinName = `skins.common.BaseZhuangshiDescItemSkin`;
        }

        protected dataChanged() {
            let list = this.data as string[];
            if (!list || !list.length) {
                this.updateShow('', null);
                return;
            }
            this.updateShow(list[0], list[1]);
        }

        /**
         * 更新标题以及描述文本
         * @param title 标题文本
         * @param desc 传入null或者空字符串，则只展示只有标题的皮肤状态
         */
        public updateShow(title: string, desc: string): void {
            this.nameItem.data = title;
            if (desc) {
                this.setDescState();
                this.lb_desc.textFlow = TextUtil.parseHtml(desc);
            } else {
                this.setNoDescState();
            }
        }

        /**设置皮肤状态，只有标题，没有文本描述*/
        private setDescState(): void {
            this.currentState = 'desc';
        }

        /**设置皮肤状态，有标题有文本描述*/
        private setNoDescState(): void {
            this.currentState = 'nodesc';
        }
    }

}