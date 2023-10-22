namespace game.mod.compete {

    import LanDef = game.localization.LanDef;
    import MagicTopRankConfig = game.config.MagicTopRankConfig;
    import teammate = msg.teammate;

    export class DoufaTopRankItem extends BaseRenderer {
        public img_rank: eui.Image;
        public lab_rank: eui.Label;
        public head: HeadVip;
        public grp_title: eui.Group;
        public lab_name: eui.Label;

        public data: {cfg: MagicTopRankConfig, rankInfo: teammate};

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let rankNo = this.itemIndex + 2;//排名2开始
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

            let rankInfo = this.data.rankInfo;
            let cfg = this.data.cfg;
            let name = "";
            if(!!rankInfo){
                this.head.updateShow(rankInfo.head, rankInfo.head_frame, rankInfo.sex, rankInfo.vip, rankInfo.role_id, rankInfo.server_id, rankInfo.is_robot);
                name = rankInfo.name;
            }
            else {
                this.head.defaultHeadShow();
                name = getLanById(LanDef.tishi_2);//虚位以待
            }
            this.lab_name.text = name;

            this.removeEft();
            let index = cfg.reward[0][0];
            this.addEftByParent(ResUtil.getTitleSrc(index), this.grp_title);
        }
    }
}
