namespace game.mod.role {

    export class RoleEquipTipsView extends eui.Component {
        public baseRoleEquipTips: game.mod.role.BaseRoleEquipTipsView;
        public scroller: eui.Scroller;
        public gr_attr: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.role.NewRoleEquipTipsSkin";
        }
    }
}