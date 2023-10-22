namespace game.mod.more {

    export class MiningMasterView extends eui.Component {

        public list: eui.List;
        public btn_tips: Btn;
        public btn_zhenrong: Btn;
        public btn_explain: Btn;
        public img_icon: eui.Image;
        public lab_count: eui.Label;
        public lab_fight: eui.Label;
        public lab_help: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.MiningMasterSkin";
        }
    }

}