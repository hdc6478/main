namespace game.mod.vip {

    import VipConfig = game.config.VipConfig;

    export class VipEffComp extends eui.Component {
        public img_tips: eui.Image;
        public gr_vip: eui.Group;

        private _hub: UIEftHub;

        constructor() {
            super();
            this.skinName = "skins.vip.VipEffCompSkin";
            this._hub = new UIEftHub(this);
        }

        public updateView(cfg: VipConfig): void {
            this._hub.addBmpFont(VipUtil.getShowVipLv(cfg.index) + '', BmpTextCfg[BmpTextType.Vip1], this.gr_vip, true, 1, true);
            this.img_tips.source = cfg.tagline1;
        }
    }
}