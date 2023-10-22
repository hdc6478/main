namespace game.mod.yishou {

    export class YishouShouguBagView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public scroller: eui.Scroller;
        public list: eui.List;
        public lb_num: eui.Label;
        public list_type: eui.List;

        constructor() {
            super();
            this.skinName = "skins.yishou.YishouShouguBagSkin";
        }
    }
}