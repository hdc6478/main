namespace game.mod.enhance {

    export class GemMasterView extends eui.Component {

        public secondPop: game.mod.SecondPop;
        public power:game.mod.Power;
        public img_icon: eui.Image;
        public img_icon2: eui.Image;
        public lab_title: eui.Label;
        public lab_tip: eui.Label;
        public btn_use: game.mod.Btn;
        public list_attr: eui.List;
        public img_max:eui.Image;

        constructor() {
            super();
            this.skinName = "skins.enhance.GemMasterSkin";
        }

        public set isAdvance(value: boolean) {
            this.currentState = value ? "advance" : "normal";
        }

    }

}