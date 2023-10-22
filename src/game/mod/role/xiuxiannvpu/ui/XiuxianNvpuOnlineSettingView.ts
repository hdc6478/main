namespace game.mod.role {

    export class XiuxianNvpuOnlineSettingView extends eui.Component {
        public img_bg: eui.Image;
        public checkBoxAll: eui.CheckBox;
        public lb_checkBoxAll: eui.Label;
        public scroller: eui.Scroller;
        public gr_checkbox: eui.Group;
        public list0: eui.List;
        public list1: eui.List;
        public list2: eui.List;
        public img_acted0: eui.Image;
        public btn_act0: game.mod.Btn;
        public img_acted1: eui.Image;
        public btn_act1: game.mod.Btn;
        public btn_receive: game.mod.Btn;
        public lb_time: eui.Label;
        public btn_back: game.mod.Btn;
        public lb_title: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.role.XiuxianNvpuOnlineSettingSkin";
        }
    }
}