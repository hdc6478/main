namespace game.mod.more {

    export class HuanjingStarStageItem extends BaseListenerRenderer {
        public baseNameItem: game.mod.BaseNameItem;
        public lb_desc: eui.Label;
        public baseZhuangshiItem: game.mod.BaseZhuangshiItem;

        private _proxy: HuanjingProxy;

        constructor() {
            super();
            this.skinName = `skins.more.HuanjingStarStageItemSkin`;
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Huanjing);
        }

        updateShow(title: string, actDesc: string, desc: string): void {
            this.baseNameItem.setTitle(title);
            this.lb_desc.textFlow = TextUtil.parseHtml(actDesc);
            this.baseZhuangshiItem.updateShow(desc);
        }
    }
}