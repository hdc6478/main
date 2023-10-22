namespace game.mod.activity {

    import facade = base.facade;

    export class SupremeGitItem extends BaseRenderer {
        public img_icon: eui.Image;
        public redPoint: eui.Image;
        public gr_font: eui.Group;

        public data: number;//礼包id


        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let proxy: SupremeGitProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.SupremeGit);
            this.img_icon.source = `zhizunimg_${this.itemIndex + 1}`;
            let rmb = PayUtil.getRmbValue(data);
            let rmbStr = rmb > 0 ? rmb + PayUtil.getRmbUnit() : "免"
            this.addBmpFont(rmbStr, BmpTextCfg[BmpTextType.Supremegit], this.gr_font, true, 1, true);
            this.redPoint.visible = proxy.getHint(data);
        }
    }
}