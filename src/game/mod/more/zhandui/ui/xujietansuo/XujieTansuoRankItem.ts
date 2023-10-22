namespace game.mod.more {

    import ZhanduiTansuoTypeConfig = game.config.ZhanduiTansuoTypeConfig;
    import LanDef = game.localization.LanDef;
    import zhandui_legion_rank_struct = msg.zhandui_legion_rank_struct;

    export class XujieTansuoRankItem extends BaseListenerRenderer {
        public img_rank: eui.Image;
        public lab_rank: eui.Label;
        public img_flag: eui.Image;
        public lab_name: eui.Label;
        public lab_num: eui.Label;

        data: IXujieTansuoRankItemData;

        constructor() {
            super();
            this.skinName = `skins.more.XujieTansuoRankItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(egret.TextEvent.LINK, this.lab_name, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let rank = data.rank;
            if (rank[0] == rank[1]) {
                //具体名次
                let rankNo = rank[0];
                if (rankNo <= 3) {
                    this.currentState = rankNo == 1 ? 'first' : 'default';
                    this.img_rank.visible = true;
                    this.img_rank.source = `rank` + rankNo;
                    this.lab_rank.text = '';
                } else {
                    this.currentState = 'default';
                    this.img_rank.visible = false;
                    this.lab_rank.text = rankNo + '';
                }
                this.img_flag.source = data.info ? ResUtil.getZhanduiFlag(data.info.flag_index) : '';
                this.lab_name.text = data.info ? `${data.info.team_name + '\n' + getLanById(LanDef.guild_mengzhu) + ': ' + data.info.caption_name}` : getLanById(LanDef.tishi_2);
                if (data.info) {
                    let cfg: ZhanduiTansuoTypeConfig = getConfigByNameId(ConfigName.ZhanduiTansuoType, data.info.map_index);
                    this.lab_num.text = cfg.name + '\n' + data.progress + '%';
                } else {
                    this.lab_num.text = '';
                }
            } else if (rank.length == 1) {
                //20+
                this.currentState = 'default';
                this.img_rank.visible = false;
                this.img_flag.source = '';
                this.lab_rank.text = rank[0] + '+';
                this.lab_name.text = '';
                this.lab_num.text = '';
            } else {
                //范围排名（比如6-10）
                this.currentState = 'default';
                this.img_rank.visible = false;
                this.lab_rank.text = rank[0] + '-' + rank[1];
                this.img_flag.source = '';
                this.lab_name.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(getLanById(LanDef.tongtiange_tips12), WhiteColor.ORANGE, ''));
                this.lab_num.text = '';
            }
        }

        private onClick(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XujieTansuoRankSection, this.data.rank);
        }
    }

    export interface IXujieTansuoRankItemData {
        rank: number[];//rank[0]==rank[1] 就是具体名次
        info: zhandui_legion_rank_struct;//战队信息
        progress: number;//进度
    }
}