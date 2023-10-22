namespace game.mod.activity {

    export class SummonEffectView extends eui.Component {

        public img_bg: eui.Image;
        public btn_back: Btn;
        public btn_again: Btn;
        public lab_num: eui.Label;
        public cost: CostIcon;

        public card_0: SummonCardItem;
        public card_1: SummonCardItem;
        public card_2: SummonCardItem;
        public card_3: SummonCardItem;
        public card_4: SummonCardItem;
        public card_5: SummonCardItem;
        public card_6: SummonCardItem;
        public card_7: SummonCardItem;
        public card_8: SummonCardItem;
        public card_9: SummonCardItem;
        public card_10: SummonCardItem;
        public grp_eff:eui.Group;
        public grp_eff2:eui.Group;

        constructor() {
            super();
            this.skinName = "skins.activity.SummonEffectSkin";
        }
    }

}