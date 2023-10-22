namespace game.mod.activity {

    import ZcxFundConfig = game.config.ZcxFundConfig;
    import LanDef = game.localization.LanDef;

    export class ZcxFundItem extends BaseListenerRenderer {
        public icon: game.mod.Icon;
        public lb_desc: eui.Label;
        public img_got: eui.Image;
        public img_gray: eui.Image;
        public redPoint: eui.Image;

        data: IZcxFundItemData;

        constructor() {
            super();
            this.skinName = `skins.activity.ZcxFundItemSkin`;
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let cfg = data.cfg;
            this.icon.data = cfg.reward;
            this.lb_desc.text = StringUtil.substitute(getLanById(LanDef.fairy_day), [cfg.index]);

            this.img_got.visible = data.status == RewardStatus.Draw;
            this.img_gray.visible = data.status == RewardStatus.Draw;
            // this.lb_desc.visible = !this.img_got.visible;

            this.redPoint.visible = data.status == RewardStatus.Finish;
        }
    }

    export interface IZcxFundItemData {
        cfg: ZcxFundConfig;
        status: RewardStatus;
    }
}