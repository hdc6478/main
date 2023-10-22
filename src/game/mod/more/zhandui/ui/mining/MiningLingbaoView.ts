namespace game.mod.more {

    export class MiningLingbaoView extends eui.Component {

        public list: eui.List;
        public btn: Btn;
        public costItem: CostIcon;
        public lab_count: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.MiningLingbaoSkin";
        }
    }

}