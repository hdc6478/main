namespace game.mod.scene {


    export class RoleReviveView extends eui.Component {

        public gr_time: eui.Group;
        public gr_btn: eui.Group;
        public btnRelife: Btn;
        public lab_killBy: eui.Label;
        public lab_btn: eui.Label;
        public lab_cnt: eui.Label;
        public img_icon: eui.Image;

        public lab_tips: eui.Label;


        constructor() {
            super();
            this.skinName = "skins.scene.RoleReviveSkin";
        }
    }
}
