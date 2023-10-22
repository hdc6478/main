namespace game.mod.bag {

    import facade = base.facade;
    import Handler = base.Handler;

    export class IconBag extends Icon {
        protected dataChanged(): void {
            super.dataChanged();
            this.iconShowType = IconShowType.Bag;

            let hint = false;
            if (this.propData) {
                let proxy: BagProxy = facade.retMod(ModName.Bag).retProxy(ProxyType.Bag);
                hint = proxy.getPropHint(this.propData);
            }
            this.setHint(hint);

            this.setClickHandler(Handler.alloc(this, this.onClickThis));
        }

        private onClickThis(): void {
            if (!this.propData || !this.propData.cfg) {
                return;
            }
            if (this.iconShowType == IconShowType.NotTips) {
                return;
            }
            if (this.propData.type == ConfigHead.Equip && this.propData.propType == EquipPropType.RoleEquip) {
                ViewMgr.getIns().showRoleEquipTips(this.propData, null, true);
                return;
            }
            ViewMgr.getIns().showPropTips(this.propData);
        }
    }

}