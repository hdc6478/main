namespace game.mod.yishou {

    export class YishouShouguComposeView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public scr: eui.Scroller;
        public list_type: eui.List;
        public list_item: eui.List;
        public lab_cnt: eui.Label;
        public btn_sub: game.mod.Btn;
        public btn_add: game.mod.Btn;
        public btn_compose: game.mod.Btn;
        public icon0: game.mod.Icon;
        public icon_center: game.mod.Icon;
        public icon1: game.mod.Icon;
        public icon2: game.mod.Icon;
        public lb_name: eui.Label;
        public list_name: eui.List;

        constructor() {
            super();
            this.skinName = "skins.yishou.YishouShouguComposeSkin";
        }
    }
}