namespace game.mod.compete {

    export class DoufaGuessView extends eui.Component {

        public secondPop: SecondPop;
        public img_head: eui.Image;
        public lab_name: eui.Label;
        public lab_double: eui.Label;
        public power: PowerLabel;
        public costIcon: CostIcon;
        public btn_guess: Btn;
        public lab_tips:eui.Label;

        constructor() {
            super();
            this.skinName = "skins.compete.DoufaGuessSkin";
        }
    }
}
