namespace game.mod.vip {

    export class VipPrivilegeItem extends BaseListenerRenderer {
        public lb_desc: eui.Label;

        constructor() {
            super();
            this.skinName = `skins.vip.VipPrivilegeItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data as string;
            this.lb_desc.textFlow = TextUtil.parseHtml(data || '');
        }
    }
}