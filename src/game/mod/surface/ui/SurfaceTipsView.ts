namespace game.mod.surface {

    export class SurfaceTipsView extends eui.Component {
        public grp_type: eui.Group;
        public img_type: eui.Image;
        public grp_name: eui.Group;
        public lab_name: eui.Label;
        public img_quality: eui.Image;
        public grp_eff: eui.Group;
        public grp_eft2: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.surface.SurfaceTipsSkin";
        }
    }

}