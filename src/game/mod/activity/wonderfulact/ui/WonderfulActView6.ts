namespace game.mod.activity {

    export class WonderfulActView6 extends eui.Component {
        public btn_once: Btn;
        public btn_ten: Btn;
        public cost_ten: CostIcon;
        public cost_once: CostIcon;
        public btn_gain: Btn;
        public btn_explain: Btn;
        public lab: eui.Label;
        public icon_1: Icon;
        public icon_2: Icon;
        public icon_3: Icon;
        public icon_4: Icon;
        public color_1: eui.Image;
        public color_2: eui.Image;
        public color_3: eui.Image;
        public color_4: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.activity.WonderfulActSkin6";
        }
    }
}