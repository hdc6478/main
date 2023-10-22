namespace game.mod.role {

    import LanDef = game.localization.LanDef;

    export class SuitStrengthenMasterBtn extends eui.Component {
        public lb_lv: eui.Label;
        public redPoint: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.role.SuitStrengthenMasterBtnSkin";
        }

        public updateLv(lv: number): void {
            this.lb_lv.text = lv + getLanById(LanDef.tishi_43);
        }

        public setHint(hint = false) {
            this.redPoint.visible = hint;
        }
    }
}