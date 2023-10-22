namespace game.mod.union {

    import GuildDrawConfig = game.config.GuildDrawConfig;

    export class UnionLotteryItem extends BaseRenderer {
        public icon: Icon;
        public redPoint: eui.Image;
        public gr_got: eui.Group;
        public img_get: eui.Image;
        public img_reward2: eui.Image;
        public grp_count: eui.Group;
        public lab_count: eui.Label;

        public data: UnionTianData;

        constructor() {
            super();
            this.skinName = "skins.common.IconRewardSkin";
        }

        protected dataChanged(): void {
            if (this.data == null) {
                this.icon.defaultIcon();
                this.redPoint.visible = false;
                return;
            }
            // if (this.data.showHint != undefined) {
            //     this.redPoint.visible = this.data.showHint;
            // }
            let cfg: GuildDrawConfig = this.data.cfg;
            if (cfg != undefined) {
                this.icon.setData(cfg.reward);
            }

            this.gr_got.visible = this.data.count == cfg.num;

            this.grp_count.visible = true;
            this.lab_count.text = `${cfg.num - this.data.count}/${cfg.num}`;
            this.lab_count.textColor = cfg.num > this.data.count ? BlackColor.GREEN : BlackColor.RED;

            this.img_reward2.visible = !!cfg.max_reward;
        }

        /**设置数据data，单个icon时候调用*/
        public setData(data: UnionTianData): void {
            this.data = data;
        }
    }

}