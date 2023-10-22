namespace game.mod.more {

    import facade = base.facade;

    export class HuanjingCollectItem extends BaseListenerRenderer {
        public avatarItem: game.mod.AvatarBaseItem;
        public img_icon: eui.Image;
        public img_frame: eui.Image;
        public img_quality: eui.Image;
        public lb_name: eui.Label;
        public starListView: game.mod.StarListView;
        public img_gray: eui.Image;
        public redPoint: eui.Image;

        data: number;//外显id
        private _proxy: HuanjingProxy;

        constructor() {
            super();
            this.skinName = `skins.more.HuanjingCollectItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Huanjing);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let index = this.data;
            if (!index) {
                return;
            }
            let cfg = getConfigById(index);
            // this.avatarItem.updateShow(cfg);
            this.img_icon.source = ResUtil.getBigIcon(cfg.icon);
            this.img_frame.source = `huanjing_avatar_frame_${cfg.quality}`;
            this.img_quality.source = `avatarquality${cfg.quality}`;
            this.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.name, ColorUtil.getColorByQuality2(cfg.quality)));

            this.img_gray.visible = !SurfaceUtil.isAct(index);
            this.redPoint.visible = this._proxy.getSurfaceSingleHint(index);
        }

        private onClick(): void {
            facade.showView(ModName.More, MoreViewType.HuanjingCollectItemTips, this.data);
        }
    }
}