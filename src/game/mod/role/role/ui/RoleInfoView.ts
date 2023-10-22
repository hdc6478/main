namespace game.mod.role {

    export class RoleInfoView extends eui.Component {
        public equip_list: game.mod.EquipListView;
        public gr_role: eui.Group;
        public btn_oneKey: game.mod.Btn;
        public btn_collect: game.mod.Btn;
        public btn_huanHua: game.mod.Btn;
        public btn_suit: game.mod.Btn;
        public power2: game.mod.Power2;
        public icon0: game.mod.Icon;
        public icon1: game.mod.Icon;
        public icon2: game.mod.Icon;
        public icon3: game.mod.Icon;
        public lb_name: eui.Label;
        public list_btn: eui.List;
        public btn_god: game.mod.AttrGodItem;
        public btn_xiuxiannupu: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.role.NewRoleInfoSkin";
            this.touchEnabled = false;
        }
    }
}