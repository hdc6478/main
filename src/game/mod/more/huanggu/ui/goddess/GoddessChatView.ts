namespace game.mod.more {

    export class GoddessChatView extends eui.Component {
        public secondPop: SecondPop;
        public scr: eui.Scroller;
        public list: eui.List;
        public lab_tips: eui.Label;
        public lab_act: eui.Label;
        public list_sel: eui.List;

        constructor() {
            super();
            this.skinName = "skins.more.GoddessChatSkin";
        }
    }

}