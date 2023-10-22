namespace game.mod {

    export class WndBaseNewView extends eui.Component {
        public img_bg: eui.Image;
        public grp_top: eui.Group;
        public list_menu: eui.List;
        public btn_back: Btn;

        constructor() {
            super();
            this.skinName = "skins.common.WndBaseNewSkin";
        }
    }

}