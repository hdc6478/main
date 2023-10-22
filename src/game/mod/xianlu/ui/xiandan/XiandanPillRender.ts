namespace game.mod.xianlu {

    import ElixirInitConfig = game.config.ElixirInitConfig;
    import facade = base.facade;

    export class XiandanPillRender extends IconSel {
        public data: ElixirInitConfig;//丹药index，不是道具index

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let cfg = this.data;
            let propIndex = cfg.itemid;
            this.icon.setData([propIndex, BagUtil.getPropCntByIdx(propIndex)], IconShowType.NotTips);

            let _proxy: XianluProxy = facade.retMod(ModName.Xianlu).retProxy(ProxyType.Xianlu);
            this.redPoint.visible = _proxy.canPillUse(cfg);
        }
    }
}