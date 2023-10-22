namespace game.mod.consecrate {

    export class ConsecrateLotteryView extends eui.Component {

        public secondPop: SecondPop;

        public icon_1: Icon;
        public icon_2: Icon;
        public icon_3: Icon;
        public icon_4: Icon;
        public icon_5: Icon;
        public icon_6: Icon;
        public icon_7: Icon;
        public icon_8: Icon;
        public icon_9: Icon;
        public img: eui.Image;
        public checkbox: eui.CheckBox;
        public lab_tips: eui.Label;
        public lab_count: eui.Label;
        public btn:Btn;

        constructor() {
            super();
            this.skinName = "skins.consecrate.ConsecrateLotterySkin";
        }
    }

}