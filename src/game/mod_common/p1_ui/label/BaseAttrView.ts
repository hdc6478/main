namespace game.mod {

    export class BaseAttrView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public name0: game.mod.AttrNameItem;
        public name1: game.mod.AttrNameItem;
        public power: game.mod.XianLiPower;
        public listAttr0: game.mod.AttrListView;
        public scroller: eui.Scroller;
        public listAttr1: eui.List;

        constructor() {
            super();
            this.skinName = "skins.common.BaseAttrViewSkin";
        }
    }
}