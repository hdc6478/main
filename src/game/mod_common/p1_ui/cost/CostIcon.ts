namespace game.mod {

    import PropConfig = game.config.PropConfig;

    export class CostIcon extends BaseListenerRenderer {
        public img_cost: eui.Image;
        public lab_cost: eui.Label;

        /**消耗道具【index, count】*/
        private _index: number;

        constructor() {
            super();
            this.skinName = "skins.common.CostItemSkin";
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.img_cost, this.onClick, this);
        }

        /**点击弹出道具tips*/
        protected onClick(): void {
            if (this._index) {
                ViewMgr.getIns().showPropTips(this._index);
            }
        }

        protected dataChanged() {
            let data = this.data as number[];
            if (!data) {
                return;
            }
            this.updateShow(data);
        }

        /**设置图标*/
        public set imgCost(img: string) {
            this.img_cost.source = img;
        }

        /**设置数值*/
        public setLabCost(str: string, color: number = BlackColor.GREEN): void {
            this.lab_cost.textFlow = TextUtil.parseHtml(TextUtil.addColor(str, color));
        }

        /**设置道具索引*/
        public updateIndex(index: number): void {
            this._index = index;
            let cfg: PropConfig = GameConfig.getPropConfigById(index);
            this.imgCost = cfg.icon;
        }

        /**设置消耗显示，一般会配置一个数组【index，count】*/
        public updateShow(cost: number[]): void {
            let index = cost[0];
            let costCnt = cost[1];
            this.updateIndex(index);
            let curCnt = BagUtil.getPropCntByIdx(index);
            let str = StringUtil.getHurtNumStr(curCnt) + "/" + StringUtil.getHurtNumStr(costCnt);//拥有的道具 / 消耗的道具
            let color = curCnt >= costCnt ? BlackColor.GREEN : BlackColor.RED;
            this.setLabCost(str, color);
        }
    }

}