namespace game.mod.xianlu {

    import facade = base.facade;
    import PropConfig = game.config.PropConfig;

    export class LingchiShenlingSelItemRender extends eui.ItemRenderer {
        private grp_item2: eui.Group;
        public item: AvatarBaseItem;
        private lab_add: eui.Label;
        private img_add: eui.Image;
        private redPoint: eui.Image;

        public data: number;//神灵index

        protected dataChanged(): void {
            if(this.data == null){
                return;
            }
            let gridIndex = this.data;
            let _proxy: XianluProxy = facade.retMod(ModName.Xianlu).retProxy(ProxyType.Xianlu);

            let isBattle = _proxy.isBattle(_proxy.poolType, gridIndex);
            this.currentState = isBattle ? "upAndSelected" : "unlock";
            //已派遣
            this.grp_item2.visible = true;
            this.img_add.visible = false;

            let cfg: PropConfig = getConfigByNameId(ConfigName.Shenling, gridIndex);
            this.item.setData(cfg);

            let addNum = _proxy.getShenlingAdd(gridIndex) / 100;
            this.lab_add.textFlow = TextUtil.parseHtml(TextUtil.addColor("+" + addNum + "%", UIColor.GREEN));
            //红点
            this.redPoint.visible = !isBattle && _proxy.checkBestShenlingByIndex(_proxy.poolType, gridIndex);
        }
    }
}