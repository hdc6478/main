namespace game.mod.xianlu {

    export class LingmaiUpView extends eui.Component {
        public img_name: eui.Image;
        public grp_lv: eui.Group;
        public power: game.mod.Power;
        public img_line1: eui.Image;
        public img_line2: eui.Image;
        public img_line3: eui.Image;
        public img_line4: eui.Image;
        public img_line5: eui.Image;
        public img_line6: eui.Image;
        public img_line71: eui.Image;
        public img_line72: eui.Image;
        public img_line8: eui.Image;
        public img_line9: eui.Image;
        public item1: LingmaiItemRender;
        public item2: LingmaiItemRender;
        public item3: LingmaiItemRender;
        public item4: LingmaiItemRender;
        public item5: LingmaiItemRender;
        public item6: LingmaiItemRender;
        public item7: LingmaiItemRender;
        public item8: LingmaiItemRender;
        public item9: LingmaiItemRender;
        public item10: LingmaiItemRender;
        public lab_buff: eui.Label;
        public list_attr: game.mod.AttrListView;
        public cost: game.mod.CostIcon;
        public btn_up: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.xianlu.LingmaiUpSkin";
        }
    }

}