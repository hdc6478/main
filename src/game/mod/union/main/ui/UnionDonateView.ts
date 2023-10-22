namespace game.mod.union {


    export class UnionDonateView extends eui.Component {

        public secondPop: SecondPop;
        public btn: Btn;

        public lab_level: eui.Label;
        public lab_level2: eui.Label;
        public lab_member: eui.Label;
        public lab_member2: eui.Label;
        public lab_wage: eui.Label;
        public lab_wage2: eui.Label;

        public coin_1: CostIcon;
        public coin_2: CostIcon;
        public coin_3: CostIcon;

        public list_1: eui.List;
        public list_2: eui.List;
        public list_3: eui.List;

        public progress: ProgressBarComp;

        constructor() {
            super();
            this.skinName = "skins.union.UnionDonateSkin";
        }
    }

}