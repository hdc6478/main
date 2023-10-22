namespace game.mod {


    /**
     * 排行榜组件
     */
    export class RankSectionItem extends BaseRenderer {

        public data: IRankSectionData;

        public lab_rank: eui.Label;
        public lab_name: eui.Label;
        public lab_num: eui.Label;


        protected onAddToStage() {
            super.onAddToStage();
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            this.lab_rank.text = `${data.rank}`;
            this.lab_name.text = `${data.name}`;
            this.lab_num.text = `${data.value}`;
        }
    }
}