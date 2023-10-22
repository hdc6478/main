namespace game.mod.yishou {

    import facade = base.facade;
    import Handler = base.Handler;
    import EquipmentConfig = game.config.EquipmentConfig;

    export class YishouShouguBagIconName extends IconName {

        private _yishouProxy: YishouProxy;

        protected onAddToStage() {
            super.onAddToStage();
            this._yishouProxy = getProxy(ModName.Yishou, ProxyType.Yishou);
        }

        protected dataChanged(): void {
            super.dataChanged();
            if (this.data) {
                let data = this.data as PropData;
                let index = data.index;
                let type = Math.floor(index / 100) % 10;
                let pos = index % 10;
                let posEquip = this._yishouProxy.getEquipInfo(type, pos);
                let equipAttr = posEquip && posEquip.regular_attrs ? posEquip.regular_attrs : null;
                //当前穿戴的战力
                let equipPower = equipAttr && equipAttr.showpower ? equipAttr.showpower.toNumber() : 0;
                //此装备的战力
                let propPower = data.regular_attrs && data.regular_attrs.showpower ? data.regular_attrs.showpower.toNumber() : 0;
                let hint = false;
                let reincarnate = RoleVo.ins.reincarnate;
                let rein = (data.cfg as EquipmentConfig).rebirth_limit;
                if (propPower > equipPower && reincarnate >= rein) {
                    hint = true;
                }
                this.setHint(hint);
                this.setClickHandler(Handler.alloc(this, this.onClick));
            } else {
                this.setHint(false);
            }
        }

        private onClick(): void {
            let data = this.data as PropData;
            if (!data) {
                return;
            }
            facade.showView(ModName.Yishou, YiShouViewType.ShouguEquipTips2, data);
        }
    }
}