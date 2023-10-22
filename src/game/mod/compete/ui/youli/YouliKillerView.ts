namespace game.mod.compete {

    export class YouliKillerView extends eui.Component {

        public img_bg: eui.Image;
        public img_title: eui.Image;
        public lab_desc: eui.Label;
        public list_reward:eui.List;
        public grp_power: eui.Group;
        public btn_get: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.compete.YouliKillerSkin";
        }

    }
}