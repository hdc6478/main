namespace game.mod.surface {

    export class TianshenSuitTipsView extends eui.Component {
        public baseQualityTips: game.mod.BaseQualityTips;
        public icon_suit: TianshenSuitItem;
        public lab_name: eui.Label;
        public grp_attr: eui.Group;
        public baseDescItem1: BaseDescItem;
        public attrListZhuangshiView1: AttrListZhuangshiView;
        public baseDescItem2: BaseDescItem;
        public attrListZhuangshiView2: AttrListZhuangshiView;
        public btn_operate: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.surface.TianshenSuitTipsSkin";
        }
    }

}