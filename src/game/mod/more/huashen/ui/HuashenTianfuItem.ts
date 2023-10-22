namespace game.mod.more {

    import facade = base.facade;
    import HuashenTianfuConfig = game.config.HuashenTianfuConfig;
    import LanDef = game.localization.LanDef;

    export class HuashenTianfuItem extends eui.ItemRenderer {
        public img_bg: eui.Image;
        public img_icon: eui.Image;
        public img_sel: eui.Image;
        public lab_lv: eui.Label;
        public img_lock: eui.Image;
        private redPoint: eui.Image;

        public data: HuashenTianfuConfig;

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let cfg = this.data;
            let _proxy: HuashenProxy = facade.retMod(ModName.More).retProxy(ProxyType.Huashen);
            let isOpen = _proxy.isTianfuOpen(cfg);
            this.img_lock.visible = !isOpen;
            let maxLv = cfg.upgrade_item.length;
            let info = _proxy.getTianfuInfo(cfg.index);
            let curLv = info ? info.lv : 0;
            let lvStr = curLv + "/" + maxLv;
            if(curLv >= maxLv){
                lvStr = TextUtil.addColor(getLanById(LanDef.maxlv), WhiteColor.RED);
            }
            this.lab_lv.textFlow = TextUtil.parseHtml(lvStr);
            this.redPoint.visible = _proxy.getTianfuHint(cfg);
        }
    }
}