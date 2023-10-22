namespace game.mod.main {

    export class MainMenuView extends eui.Component {
        public img_bg: eui.Image;
        public gr_menu: eui.Group;
        public btn_role: game.mod.main.MainMenuBtn;
        public btn_enhance: game.mod.main.MainMenuBtn;
        public btn_surface: game.mod.main.MainMenuBtn;
        public btn_xianfa: game.mod.main.MainMenuBtn;
        public btn_bag: game.mod.main.MainMenuBtn;
        public btn_shenling: game.mod.Btn;
        public btn_xianlu: game.mod.Btn;
        public grp_tip: eui.Group;
        public img_tip: eui.Image;
        public gr_shenlingtips: eui.Group;
        public lb_shenlingtips: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.main.NewMainMenuSkin";
        }

    }
}
