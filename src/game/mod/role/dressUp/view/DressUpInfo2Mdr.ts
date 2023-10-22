namespace game.mod.role {


    export class DressUpInfo2Mdr extends DressUpInfoMdr {

        protected _type: DressUpType = DressUpType.Frame;

        protected onInit(): void {
            super.onInit();
            this._view.grp_head.visible = true;
            this._view.grp_bubble.visible = false;
        }
    }
}