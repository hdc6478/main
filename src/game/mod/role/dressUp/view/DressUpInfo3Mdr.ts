namespace game.mod.role {


    import ArrayCollection = eui.ArrayCollection;

    export class DressUpInfo3Mdr extends DressUpInfoMdr {

        protected _type: DressUpType = DressUpType.Bubble;

        protected onInit(): void {
            super.onInit();
            this._view.grp_head.visible = false;
            this._view.grp_bubble.visible = true;
        }

        protected onInitDressList(): void {
            this._view.dressList.dataProvider = this._dressCol = new ArrayCollection();
            this._view.dressList.itemRenderer = DressUpItemIcon;
            this._view.dressList.itemRendererSkinName = "skins.role.DressUpItem2Skin";
        }
    }
}