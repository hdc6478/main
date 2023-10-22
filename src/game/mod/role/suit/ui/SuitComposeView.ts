namespace game.mod.role {

    export class SuitComposeView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public lb_name: eui.Label;
        public scroller: eui.Scroller;
        public list_type: eui.List;
        public icon_target: game.mod.Icon;
        public icon0: game.mod.Icon;
        public icon1: game.mod.Icon;
        public icon2: game.mod.Icon;
        public btn_compose: game.mod.Btn;
        public btn_sub: game.mod.Btn;
        public btn_add: game.mod.Btn;
        public lb_num: eui.Label;
        public list_btn: eui.List;

        public list_resolve: eui.List;
        public lb_resolve: eui.Label;
        public img_resolve: eui.Image;
        public lb_resolveNum: eui.Label;
        public btn_resolve: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.role.SuitComposeSkin";
        }
    }
}