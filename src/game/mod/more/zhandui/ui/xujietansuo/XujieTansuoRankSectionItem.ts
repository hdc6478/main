namespace game.mod.more {


    import LanDef = game.localization.LanDef;
    import ZhanduiTansuoTypeConfig = game.config.ZhanduiTansuoTypeConfig;

    export class XujieTansuoRankSectionItem extends BaseListenerRenderer {
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
            this.width = 642;
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
            this.img_rank.visible = false;
            this.lab_rank.text = rank[0] + '';
            this.img_flag.source = data.info ? ResUtil.getZhanduiFlag(data.info.flag_index) : '';
            this.lab_name.text = data.info ? `${data.info.team_name + '\n' + getLanById(LanDef.guild_mengzhu) + ': ' + data.info.caption_name}` : getLanById(LanDef.tishi_2);
            if (data.info) {
                let cfg: ZhanduiTansuoTypeConfig = getConfigByNameId(ConfigName.ZhanduiTansuoType, data.info.map_index);
                this.lab_num.text = cfg.name + '\n' + data.progress + '%';
            } else {
                this.lab_num.text = '';
            }
        }
    }
}