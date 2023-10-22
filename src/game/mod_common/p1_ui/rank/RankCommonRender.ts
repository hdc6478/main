namespace game.mod {

    /**
     * 排行榜组件，公共结构
     */
    export class RankCommonRender extends eui.ItemRenderer {
        public img_rank: eui.Image;
        public lab_rank: eui.Label;
        public lab_name: eui.Label;
        public lab_power: eui.Label;
        public lab_num: eui.Label;

        public data: RankCommonRenderData;//排行榜数据

        constructor() {
            super();
            this.skinName = "skins.common.RankItemSkin";
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            let rankNo = data.rank;
            this.currentState = rankNo == 1 ? "first" : "default";
            if(rankNo <= 3){
                //前三名显示图标
                this.img_rank.visible = true;
                this.img_rank.source = 'rank' + rankNo;
                this.lab_rank.text = "";
            }
            else {
                this.img_rank.visible = false;
                this.lab_rank.text = "" + rankNo;
            }
            this.lab_name.text = data.name;

            this.lab_power.text = data.powerStr;

            this.lab_num.text = data.hurtStr;
        }
    }
}