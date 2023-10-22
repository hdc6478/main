namespace game.mod.more {

    export class XianmaiZhanbaoView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public list_btn: eui.List;
        public lb_desc: eui.Label;
        public scroller: eui.Scroller;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.more.XianmaiZhanbaoSkin";
        }
    }
}