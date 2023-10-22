namespace game.mod.xianlu {

    export class LingchiDetailView extends eui.Component {
        public img_type: eui.Image;
        public lab_lv: eui.Label;
        public lab_desc1: eui.Label;
        public img_icon1: eui.Image;
        public lab_add1: eui.Label;
        public img_icon2: eui.Image;
        public lab_add2: eui.Label;
        public cost1: game.mod.CostIcon;
        public cost2: game.mod.CostIcon;
        public lab_desc2: eui.Label;
        public list_item: eui.List;
        public btn_up: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.xianlu.LingchiDetailSkin";
        }
    }

}