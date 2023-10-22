namespace game.mod.activity {

    export class GivingShenLingView extends eui.Component {

        public icon: Icon;
        public lab_time: eui.Label;
        public gr_time: eui.Group;
        public btn: Btn;
        public img_got: eui.Image;
        public gr_eff: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.activity.GivingShenLingSkin";
            this.touchEnabled = false;
        }
    }

}