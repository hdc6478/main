namespace game.mod.xianlu {

    import LinggenConfig = game.config.LinggenConfig;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;
    import BuffConfig = game.config.BuffConfig;

    export class LinggenItemRender extends eui.ItemRenderer {
        public img_bg: eui.Image;
        public img_icon: eui.Image;
        public img_sel: eui.Image;
        public lab_lv: eui.Label;
        public img_lock: eui.Image;
        private redPoint: eui.Image;

        public data: LinggenConfig;

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let cfg = this.data;
            let _proxy: XianluProxy = facade.retMod(ModName.Xianlu).retProxy(ProxyType.Xianlu);
            let isOpen = _proxy.isLinggenOpen(cfg);
            this.img_lock.visible = !isOpen;
            let maxLv = cfg.upgrade_item.length;
            let info = _proxy.getLinggenInfo(cfg.index);
            let curLv = info ? info.lv : 0;
            let lvStr = curLv + "/" + maxLv;
            if(curLv >= maxLv){
                lvStr = TextUtil.addColor(getLanById(LanDef.maxlv), WhiteColor.RED);
            }
            this.lab_lv.textFlow = TextUtil.parseHtml(lvStr);
            this.redPoint.visible = _proxy.getLinggenHint(cfg);
            //todo
            let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, cfg.buff_index[0]);
            this.img_icon.source = buffCfg && buffCfg.icon || '';
        }
    }
}