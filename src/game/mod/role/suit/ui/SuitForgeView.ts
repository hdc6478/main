namespace game.mod.role {

    export class SuitForgeView extends eui.Component {
        public power: game.mod.Power2;
        public cost: game.mod.CostIcon;
        public btn_forge: game.mod.Btn;
        public icon_target: game.mod.Icon;
        public lb_name: eui.Label;
        public attrComp0: game.mod.AttrListView;
        public attrComp1: game.mod.AttrListView;
        public iconList: game.mod.role.SuitIconList;
        public lb_attr: eui.Label;
        public btn_master: game.mod.role.SuitForgeBtn;
        public lb_attr0: eui.Label;
        public img_max: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.role.SuitForgeSkin";
        }
    }
}