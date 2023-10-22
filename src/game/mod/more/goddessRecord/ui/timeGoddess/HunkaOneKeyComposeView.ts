namespace game.mod.more {

    import RadioButton = eui.RadioButton;

    export class HunkaOneKeyComposeView extends eui.Component {
        public secondPop: SecondPop;
        public lab_tips: eui.Label;
        public hunkaNone: HunkaNoneView;
        public list_item: eui.List;
        public list_type: eui.List;
        public sel0: RadioButton;
        public sel1: RadioButton;
        public sel2: RadioButton;
        public sel3: RadioButton;
        public sel4: RadioButton;
        public btn_compose: Btn;

        constructor() {
            super();
            this.skinName = "skins.more.HunkaOneKeyComposeSkin";
        }
    }

}