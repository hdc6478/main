namespace game.mod.yishou {

    export class YishouShouguEquipTipsView extends eui.Component {
        public propTips: game.mod.BasePropTips;
        public power: game.mod.Power;
        public descItem0: game.mod.BaseDescItem;
        public descItem1: game.mod.BaseDescItem;
        public btn_replace: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.yishou.YishouShouguEquipTipsSkin";
        }
    }
}