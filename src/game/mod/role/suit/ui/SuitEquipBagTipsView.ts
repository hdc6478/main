namespace game.mod.role {

    export class SuitEquipBagTipsView extends eui.Component {
        public power: game.mod.Power;
        public scroller: eui.Scroller;
        public gr_attr: eui.Group;
        public baseAttr: game.mod.BaseDescItem;
        public baseSuit: game.mod.BaseDescItem;
        public baseGain: game.mod.BaseGainItem;
        public lb_desc_bottom: eui.Label;
        public basePropTips: game.mod.BasePropTips;

        constructor() {
            super();
            this.skinName = "skins.role.SuitEquipBagTipsSkin";
        }
    }
}