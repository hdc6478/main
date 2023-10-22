namespace game.mod.xianyuan {

    export class ChildHuanzhuangView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public gr_eft: eui.Group;
        public nameItem: game.mod.AvatarNameSrItem;
        public icon0: game.mod.Icon;
        public icon1: game.mod.Icon;
        public btn_onekey: game.mod.Btn;
        public lb_select: eui.Label;
        public scroller_avatar: eui.Scroller;
        public list_avatar: eui.List;
        public list_item: eui.List;
        public list_btn: eui.List;
        public lb_desc: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.ChildHuanzhuangSkin";
        }
    }
}