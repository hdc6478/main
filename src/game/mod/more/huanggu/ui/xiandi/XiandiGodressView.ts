namespace game.mod.more {


    export class XiandiGodressView extends eui.Component {

        public nameItem: AvatarNameItem;
        public grp_eft: eui.Group;
        public head: Head;
        public lab_name: eui.Label;
        public btn_fight: Btn;
        public grp_skill: eui.Group;
        public img_icon: eui.Image;
        public lab_cnt: eui.Label;
        // public lab_desc:eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.XiandiGodressSkin";
        }
    }

}