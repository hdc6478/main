namespace game.mod.yishou {

    export class YishouShoulingEquipTipsBagView extends eui.Component {
        public propTips: game.mod.BasePropTips;
        public lb_cnt: eui.Label;
        public power: game.mod.Power;
        public descItem: game.mod.BaseDescItem;
        public descList: game.mod.BaseDescList;
        public lb_specialattr: eui.Label;
        public descItem1: game.mod.BaseDescItem;
        public gainItem: game.mod.BaseGainItem;
        public btn_do: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.yishou.YishouShoulingEquipTipsBagSkin";
        }
    }
}