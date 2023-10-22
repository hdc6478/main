namespace game.mod.jiban {

    import GatherConfig = game.config.GatherConfig;

    export class RoleGatherBtnItem extends BaseListenerRenderer {
        public img_sel: eui.Image;
        public img_gray: eui.Image;
        public img_collected: eui.Image;
        public img_icon: eui.Image;
        public redPoint: eui.Image;
        public lb_desc: eui.Label;

        data: IRoleGatherBtnItemData;

        constructor() {
            super();
            this.skinName = `skins.jiban.RoleGatherBtnItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.img_collected.visible = !!data.isActed;
            this.img_icon.source = data.cfg.icon;
            this.lb_desc.text = data.cfg.name;

            this.img_gray.visible = !data.isOpen;
            this.redPoint.visible = !!data.hint;
        }
    }

    export interface IRoleGatherBtnItemData {
        cfg: GatherConfig;
        hint: boolean;
        isActed: boolean;//是否收集激活
        isOpen: boolean;//是否开启
    }
}