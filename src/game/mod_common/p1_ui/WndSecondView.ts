namespace game.mod {

    export class WndSecondView extends eui.Component {
        public timeItem: game.mod.TimeItem;
        public grp_top: eui.Group;
        public list_type: eui.List;
        public img_bg: eui.Image;// todo 有的UI效果图没有这个底图

        constructor() {
            super();
            this.skinName = "skins.common.WndSecondSkin";
        }
    }

}