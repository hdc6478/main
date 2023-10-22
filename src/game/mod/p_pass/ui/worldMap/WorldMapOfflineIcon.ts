namespace game.mod.pass {

    import PropConfig = game.config.PropConfig;

    export class WorldMapOfflineIcon extends BaseListenerRenderer {
        public img_cost: eui.Image;
        public lab_cost: eui.Label;

        /**消耗道具【index, count】*/
        private _cost: number[];

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
            if (this._cost) {
                ViewMgr.getIns().showPropTips(this._cost[0]);
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

        /**设置消耗显示，一般会配置一个数组【index，count】*/
        public updateShow(cost: number[]): void {
            this._cost = cost;
            let index = cost[0];
            let costCnt = cost[1];
            let cfg: PropConfig = GameConfig.getPropConfigById(index);
            this.imgCost = cfg.icon;
            let str = StringUtil.getHurtNumStr(costCnt) + "/时";
            this.setLabCost(str);
        }
    }

}