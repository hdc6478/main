namespace game.mod.consecrate {

    export class AmassTipsView extends eui.Component {
        public basePropTips: game.mod.BasePropTips;
        public power: game.mod.Power;
        public img_status: eui.Image;
        public lab_cnt: eui.Label;
        public img_bg: eui.Image;
        public baseDescItem: game.mod.BaseDescItem;
        public btn_goto: Btn;

        constructor() {
            super();
            this.skinName = "skins.consecrate.AmassTipsSkin";
        }
    }

}