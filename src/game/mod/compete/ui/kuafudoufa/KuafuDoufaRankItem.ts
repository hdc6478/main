namespace game.mod.compete {

    import kuafudoufa_zhanchang_paiming = msg.kuafudoufa_zhanchang_paiming;

    export class KuafuDoufaRankItem extends eui.ItemRenderer {
        public img_mvp: eui.Image;
        public lab_rank: eui.Label;
        public lab_name: eui.Label;
        public lab_kill: eui.Label;
        public lab_num: eui.Label;
        public lab_score: eui.Label;

        public data: kuafudoufa_zhanchang_paiming;

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let rankNo = this.itemIndex + 1;
            this.img_mvp.visible = rankNo == 1;
            this.lab_rank.text = rankNo + "";
            let nameStr = TextUtil.addColor(this.data.name, this.data.camp == CampType.RED ? WhiteColor.RED : WhiteColor.DEFAULT2);
            this.lab_name.textFlow = TextUtil.parseHtml(nameStr);
            this.lab_kill.text = this.data.kill_num + "";
            this.lab_num.text = this.data.help_kill_num + "";
            this.lab_score.text = this.data.score + "";
        }
    }
}
