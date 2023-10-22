namespace game.mod.yijie {

    import LanDef = game.localization.LanDef;

    export class SeaRewardItem extends eui.ItemRenderer {
        private cost1: CostIcon;
        private cost2: CostIcon;
        public data: number[][];

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            this.updateShow(this.cost1, data[0]);
            this.updateShow(this.cost2, data[1]);
        }

        private updateShow(cost: CostIcon, costData: number[]): void {
            let index = costData[0];
            let cnt = costData[1];
            cost.updateIndex(index);
            let str = cnt + "/" + getLanById(LanDef.zongmen_hour);
            cost.setLabCost(str);
        }

        public setData(data: number[][]): void {
            this.data = data;
        }

    }
}