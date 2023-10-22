namespace game.mod.main {

    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import prop_use = msg.prop_use;

    export class MainFastProp extends BaseRenderer {
        img_bg: eui.Image;
        lab: eui.Label;
        icon: Icon;
        btn_use: Btn;
        btn_close: Btn;

        data: PropData;

        constructor() {
            super();
            this.skinName = "skins.main.MainFastPropSkin";
        }

        protected onAddToStage(): void {
            this.btn_close.addEventListener(TouchEvent.TOUCH_TAP, this.onClose, this);
            this.btn_use.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                facade.sendNt(MainEvent.ON_CLOSE_EASY_UES_PROP);
                return;
            }
            this.icon.setData(this.data);

            if (this.data.type == ConfigHead.Equip) {
                this.btn_use.label = "更换装备";
                this.lab.text = "更强装备";
            } else {
                this.btn_use.label = "使用";
                this.lab.text = "快捷使用";
            }
        }

        public setData(data: PropData): void {
            this.data = data;
        }

        private onClose(): void {
            facade.sendNt(MainEvent.ON_CLOSE_EASY_UES_PROP);
        }

        private onClick(): void {
            if (this.data.type == ConfigHead.Equip) {
                let proxy: IEquipProxy = getProxy(ModName.Equip, ProxyType.Equip);
                proxy.c2s_equip_operate(1, this.data.prop_id);
            } else {
                let proxy: IBagProxy = getProxy(ModName.Bag, ProxyType.Bag);
                let prop: prop_use = new prop_use();
                prop.prop_id = this.data.prop_id;
                prop.use_cnt = this.data.count;
                proxy.c2s_prop_list_use([prop]);
            }
            facade.sendNt(MainEvent.ON_CLOSE_EASY_UES_PROP);
        }
    }
}
