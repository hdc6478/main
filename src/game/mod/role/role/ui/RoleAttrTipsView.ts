namespace game.mod.role {

    export class RoleAttrTipsView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public list_attr: eui.List;
        public attr: game.mod.AttrListView;
        public gr_power: eui.Group;
        public gr_power1: eui.Group;
        public xianliPower: game.mod.XianLiPower;

        constructor() {
            super();
            this.skinName = "skins.role.NewRoleAttrTipsSkin";
        }
    }
}