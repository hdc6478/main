namespace game.mod.more {

    export class XujieTansuoLayerView extends eui.Component {
        public scroller: eui.Scroller;
        public gridView: game.mod.more.XujieTansuoGridView;
        public costIcon: game.mod.CostIcon;
        public lb_desc: eui.Label;
        public gr_layerfont: eui.Group;
        public btn_showlayer: game.mod.Btn;
        public gr_layer: eui.Group;
        public list_layer: eui.List;
        public btn_zhanlipin: game.mod.Btn;
        public btn_zhenrong: game.mod.Btn;
        public btn_yuanzheng: game.mod.Btn;
        public timeItem: game.mod.TimeItem;

        constructor() {
            super();
            this.skinName = "skins.more.XujieTansuoLayerSkin";
        }
    }
}