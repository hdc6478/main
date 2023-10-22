namespace game.mod.shenling {

    export class ShenlingLingpoIconTipsBagView extends eui.Component {
        public propTips: game.mod.BasePropTips;
        public power: game.mod.Power;
        public scroller: eui.Scroller;
        public descItem0: game.mod.BaseDescItem;
        public lingpoAttrItem0: game.mod.shenling.ShenlingLingpoAttrItem;
        public lingpoAttrItem1: game.mod.shenling.ShenlingLingpoAttrItem;
        public descItem1: game.mod.BaseDescItem;
        public propGainList: game.mod.BasePropGainList;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenlingLingpoIconTipsBagSkin";
        }
    }
}