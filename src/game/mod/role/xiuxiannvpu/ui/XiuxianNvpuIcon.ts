namespace game.mod.role {


    export class XiuxianNvpuIcon extends BaseListenerRenderer {
        public img_di: eui.Image;
        public img_icon: eui.Image;
        public likeBtn: game.mod.role.XiuxianNvpuLikeBtn;
        public img_huanhua: eui.Image;
        public img_lock: eui.Image;

        data: number;
        private _proxy: XiuxianNvpuProxy;

        constructor() {
            super();
            this.skinName = `skins.role.XiuxianNvpuIconSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Role, ProxyType.XiuxianNvpu);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let level = this.data;
            if (!level) {
                return;
            }
            this.likeBtn.data = {showHint: false, level: level};
            let shenlingCfg = this._proxy.shenlingCfg;
            if (shenlingCfg) {
                let iconList = shenlingCfg.icons.split(',');
                this.img_icon.source = iconList[this.itemIndex];
            }
            this.img_huanhua.visible = this._proxy.show_index == level;
            this.img_lock.visible = level > this._proxy.level;
        }
    }
}