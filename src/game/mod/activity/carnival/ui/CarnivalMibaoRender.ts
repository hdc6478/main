namespace game.mod.activity {

    export class CarnivalMibaoRender extends eui.ItemRenderer {
        public img_di: eui.Image;
        public btn_draw: game.mod.Btn;
        public icon: Icon;
        public grp_draw: eui.Group;

        public data: CarnivalMibaoData;

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            let reward = data.reward;
            let hasDraw = data.hasDraw;
            let canDraw = data.canDraw;
            let hasLastDraw = data.hasLastDarw;
            let isBig = data.isBig;

            let prop = reward && reward.rewards && reward.rewards[0];
            this.icon.setData(prop);
            this.grp_draw.visible = hasDraw;
            this.btn_draw.redPoint.visible = canDraw;

            this.img_di.source = hasLastDraw ? "dizuo_huangse" : "dizuo_lanse";
            this.currentState = isBig ? "big" : "small";
        }

        public setData(data: CarnivalMibaoData): void {
            this.data = data;
        }
    }
}