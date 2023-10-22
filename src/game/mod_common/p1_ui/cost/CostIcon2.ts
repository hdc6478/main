namespace game.mod {


    /**
     * 拥有Icon组件的消耗组件，水平布局
     */
    export class CostIcon2 extends eui.ItemRenderer {
        public icon: game.mod.Icon;
        public lab_cost: eui.Label;

        constructor() {
            super();
            this.skinName = `skins.common.CostItem2Skin`;
        }

        protected dataChanged() {
            let data = this.data as number[];
            if (!data) {
                return;
            }
            this.updateShow(data);
        }

        /**
         * (拥有数量/消耗数量)
         */
        private updateView(index: number, cnt = 1, isShowName: boolean = false): void {
            let curCnt = BagUtil.getPropCntByIdx(index);
            let str = `(${StringUtil.getHurtNumStr(curCnt)}/${StringUtil.getHurtNumStr(cnt)})`;
            let color = curCnt >= cnt ? 0x3cfe00 : WhiteColor.RED;

            let txt = '';
            if (isShowName) {
                let cfg = getConfigById(index);
                txt = TextUtil.addColor(cfg && cfg['name'] || '', ColorUtil.getColorByQuality1(cfg && cfg['quality'] || 0))
                    + '\n';
                this.lab_cost.lineSpacing = 5;
            }
            this.lab_cost.textFlow = TextUtil.parseHtml(txt + TextUtil.addColor(str, color));
        }

        /**
         * 设置icon的缩放
         * @param scale 默认1
         */
        public setIconScale(scale: number = 1): void {
            this.icon.scaleX = this.icon.scaleY = scale;
            this.lab_cost.x = this.icon.x + this.icon.width * scale + 10;
        }

        /**设置数值*/
        public setLabCost(str: string, color: number = WhiteColor.GREEN): void {
            this.lab_cost.textFlow = TextUtil.parseHtml(TextUtil.addColor(str, color));
        }

        /**设置消耗显示，一般会配置一个数组【index，count】*/
        public updateShow(cost: number[], isShowName = false): void {
            let [index, cnt] = cost;
            let propData = PropData.create(index);
            if (!propData) {
                return;
            }
            this.icon.data = propData;
            this.updateView(index, cnt, isShowName);
        }
    }

}