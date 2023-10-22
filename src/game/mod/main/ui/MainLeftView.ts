namespace game.mod.main {


    export class MainLeftView extends eui.Component {
        public gr_list2: eui.Group;
        public btn_list2: eui.List;
        public img_rect: eui.Image;
        public btn_list: eui.List;

        constructor() {
            super();
            this.name = "MainLeftView";
            this.skinName = "skins.main.NewMainLeftSkin";
        }
    }

}
