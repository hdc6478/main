namespace game.mod.xianlu {

    export class XiandanView extends eui.Component {
        public item1: XiandanRender;
        public item2: XiandanRender;
        public img_type: eui.Image;
        public grp_lv: eui.Group;
        public btn_change: game.mod.Btn;
        public btn_desc: game.mod.Btn;
        public lab_name: eui.Label;
        public icon: game.mod.Icon;
        public lab_tips: eui.Label;
        public lab_desc: eui.Label;
        public lab_attr: eui.Label;
        public scr_item: eui.Scroller;
        public list_item: eui.List;
        public btn_last: game.mod.Btn;
        public btn_next: game.mod.Btn;
        public btn_use: game.mod.Btn;
        public list_type: eui.List;

        constructor() {
            super();
            this.skinName = "skins.xianlu.XiandanSkin";
        }
    }

}