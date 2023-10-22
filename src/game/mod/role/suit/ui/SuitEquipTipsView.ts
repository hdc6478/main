namespace game.mod.role {

    export class SuitEquipTipsView extends eui.Component {
        public tips: game.mod.BasePropTips;
        public power: game.mod.Power;
        public scroller: eui.Scroller;
        public gr_attr: eui.Group;
        public img_line: eui.Image;
        public gr_act: eui.Group;
        public icon_act: game.mod.Icon;
        public btn_act: game.mod.Btn;
        public gr_up: eui.Group;
        public costItem: game.mod.CostIcon;
        public btn_up: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.role.SuitEquipTipsSkin";
        }
    }
}