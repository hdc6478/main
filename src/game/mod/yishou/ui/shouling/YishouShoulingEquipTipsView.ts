namespace game.mod.yishou {

    export class YishouShoulingEquipTipsView extends eui.Component {
        public propTips: game.mod.BasePropTips;
        public power: game.mod.Power;
        public descItem: game.mod.BaseDescItem;
        public descList: game.mod.BaseDescList;
        public lb_specialattr: eui.Label;
        public btn_do: game.mod.Btn;
        public icon_cost: game.mod.Icon;
        public img_max: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.yishou.YishouShoulingEquipTipsSkin";
        }
    }
}