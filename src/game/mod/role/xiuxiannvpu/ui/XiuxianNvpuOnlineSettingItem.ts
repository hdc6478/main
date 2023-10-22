namespace game.mod.role {

    export class XiuxianNvpuOnlineSettingItem extends BaseListenerRenderer {
        public lb_desc: eui.Label;

        data: any;

        constructor() {
            super();
            this.skinName = `skins.role.XiuxianNvpuOnlineSettingItemSkin`;
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.lb_desc.textFlow = TextUtil.parseHtml(data);
        }
    }
}