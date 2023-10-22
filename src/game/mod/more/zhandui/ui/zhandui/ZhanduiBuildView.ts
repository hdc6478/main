namespace game.mod.more {

    export class ZhanduiBuildView extends eui.Component {
        public btn_create: game.mod.Btn;
        public btn_join: game.mod.Btn;
        public lb_desc: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.ZhanduiBuildSkin";
        }
    }
}