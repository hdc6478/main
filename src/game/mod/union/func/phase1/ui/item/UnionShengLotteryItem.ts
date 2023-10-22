namespace game.mod.union {

    import shengtai_data = msg.shengtai_data;
    import ShengtanItemConfig = game.config.ShengtanItemConfig;

    export class UnionShengLotteryItem extends BaseRenderer {
        public icon: Icon;
        public redPoint: eui.Image;
        public gr_got: eui.Group;
        public img_reward2: eui.Image;
        public grp_name: eui.Group;
        public lab_name: eui.Label;

        public data: shengtai_data | ShengtanItemConfig;

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

            if (this.data instanceof shengtai_data) {
                this.grp_name.visible = true;
                this.lab_name.text = this.data.name;

                let cfg: ShengtanItemConfig = getConfigByNameId(ConfigName.ShengtanItem, this.data.index);
                this.img_reward2.visible = cfg.reward_type == 2;
                if (cfg != undefined) {
                    this.icon.setData(cfg.reward);
                }
            } else {
                this.grp_name.visible = false;

                let cfg: ShengtanItemConfig = this.data;
                this.img_reward2.visible = cfg.reward_type == 2;
                if (cfg != undefined) {
                    this.icon.setData(cfg.reward);
                }
            }
        }

        /**设置数据data，单个icon时候调用*/
        public setData(data: shengtai_data | ShengtanItemConfig): void {
            this.data = data;
        }
    }

}