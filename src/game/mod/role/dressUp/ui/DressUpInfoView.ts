namespace game.mod.role {

    export class DressUpInfoView extends eui.Component {
        public power: game.mod.Power;
        public img_head: eui.Image;
        public img_frame: eui.Image;
        public img_bubble: eui.Image;
        public lbl_bubbleName: eui.Label;
        public costItem: game.mod.Icon;
        public btn_act: game.mod.Btn;
        public btn_dress: game.mod.Btn;
        public img_state: eui.Image;
        public dressList: eui.List;
        public lb_attr: eui.Label;
        public dressScroller: eui.Scroller;
        public list_menu: eui.List;
        public grp_head: eui.Group;
        public grp_bubble: eui.Group;
        public lab_name: eui.Label;
        public lab_tips: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.role.DressUpInfoSkin";
        }
    }

}