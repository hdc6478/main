namespace game.mod.xianyuan {

    export class RingGiftTipsView extends eui.Component {
        public basePropTips: game.mod.BasePropTips;
        public power: game.mod.Power;
        public icon: game.mod.Icon;
        public lb_cond: eui.Label;
        public btn_do: game.mod.Btn;
        public baseSurfaceItem: game.mod.BaseSurfaceItem;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.RingGiftTipsSkin";
        }
    }
}