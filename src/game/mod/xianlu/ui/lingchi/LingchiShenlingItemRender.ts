namespace game.mod.xianlu {

    import facade = base.facade;
    import RebirthConfig = game.config.RebirthConfig;
    import LanDef = game.localization.LanDef;
    import PropConfig = game.config.PropConfig;

    export class LingchiShenlingItemRender extends eui.ItemRenderer {
        private grp_item2: eui.Group;
        public item: AvatarBaseItem;
        private lab_add: eui.Label;
        private img_add: eui.Image;
        private redPoint: eui.Image;

        private lab_lock: eui.Label;

        public data: number;//开启条件，转生index

        protected dataChanged(): void {
            if(this.data == null){
                return;
            }
            let index = this.data;
            let _proxy: XianluProxy = facade.retMod(ModName.Xianlu).retProxy(ProxyType.Xianlu);
            let isOpen = _proxy.isPoolGridOpen(index);
            if(isOpen){
                this.currentState = "unlock";
                let pos = this.itemIndex + 1;
                let gridIndex = _proxy.getPoolGridIndex(_proxy.poolType, pos);
                if(gridIndex){
                    //已派遣
                    this.grp_item2.visible = true;
                    this.img_add.visible = false;

                    let cfg: PropConfig = getConfigByNameId(ConfigName.Shenling, gridIndex);
                    this.item.setData(cfg);

                    let addNum = _proxy.getShenlingAdd(gridIndex) / 100;
                    this.lab_add.textFlow = TextUtil.parseHtml(TextUtil.addColor("+" + addNum + "%", UIColor.GREEN));
                }
                else {
                    //未派遣
                    this.grp_item2.visible = false;
                    this.img_add.visible = true;
                }
                //红点
                this.redPoint.visible = !_proxy.battleView && _proxy.canPoolGridBattle(_proxy.poolType, pos);
            }
            else {
                this.currentState = "lock";
                let lockStr = TextUtil.addColor(RoleUtil.getRebirthLvStr(index), UIColor.YELLOW);
                this.lab_lock.textFlow = TextUtil.parseHtml(lockStr);
                this.redPoint.visible = false;
            }
        }
    }
}