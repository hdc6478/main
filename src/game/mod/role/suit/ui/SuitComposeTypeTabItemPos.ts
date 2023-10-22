namespace game.mod.role {

    export class SuitComposeTypeTabItemPos extends BaseListenerRenderer {
        public redPoint: eui.Image;
        public lab_name: eui.Label;

        protected dataChanged() {
            let data = this.data as ISuitComposeBtnData;
            if (!data) {
                return;
            }
            this.lab_name.text = getLanById(EquipPosName[data.pos]);
            this.redPoint.visible = !!data.hint;
        }
    }

    export interface ISuitComposeBtnData {
        hint: boolean;
        pos: EquipPos;
    }

}