namespace game.mod.scene {

    import teammate = msg.teammate;

    export class SceneRankItem extends eui.ItemRenderer {
        public lab_rank: eui.Label;
        public lab_name: eui.Label;
        public lab_hurt: eui.Label;

        public data: teammate;

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            this.lab_rank.text = this.data.rank_num + "";
            this.lab_name.text = this.data.name;
            this.lab_hurt.text = StringUtil.getHurtNumStr(this.data.value.toNumber());
        }

    }
}
