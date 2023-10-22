namespace game.mod.xianlu {

    export class LingmaiDetailView extends eui.Component {
        public img_name: eui.Image;
        public power: game.mod.Power;
        public lab_desc: eui.Label;
        public list_item: eui.List;
        public list_limit: eui.List;
        public cost: game.mod.CostIcon;
        public lab_lv: eui.Label;
        public btn_up: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.xianlu.LingmaiDetailSkin";
        }
    }

}