namespace game.mod.surface {

    export class TianshenEquipTipsView extends eui.Component {
        public baseQualityTips: game.mod.BaseQualityTips;
        public icon_equip: TianshenIconEquip;
        public lab_name: eui.Label;
        public grp_attr: eui.Group;
        public baseAttrItem: BaseAttrItem;
        public baseDescItem: BaseDescItem;
        public attrListZhuangshiView1: AttrListZhuangshiView;
        public lab_condition: BaseLabelItem;
        public attrListZhuangshiView2: AttrListZhuangshiView;
        public icon_cost: game.mod.Icon;
        public btn_operate: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.surface.TianshenEquipTipsSkin";
        }
    }

}