namespace game.mod.jiban {

    export class RoleGatherView extends eui.Component {
        public list_equip: eui.List;
        public list_item: eui.List;
        public gr_eff: eui.Group;
        public lb_awardname: eui.Label;
        public lb_suitcnt: eui.Label;
        public bar: game.mod.ProgressBarComp;
        public barItem0: game.mod.jiban.RoleGatherBarItem;
        public barItem1: game.mod.jiban.RoleGatherBarItem;
        public barItem2: game.mod.jiban.RoleGatherBarItem;
        public barItem3: game.mod.jiban.RoleGatherBarItem;
        public icon_reward: game.mod.Icon;
        public btn_act: game.mod.Btn;
        public lb_attr: eui.Label;
        public img_got: eui.Image;
        public img_name: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.role.RoleGatherSkin";
        }
    }
}