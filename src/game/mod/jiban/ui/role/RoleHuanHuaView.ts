namespace game.mod.jiban {

    export class RoleHuanHuaView extends eui.Component {
        public list_item: eui.List;
        public nameItem: game.mod.AvatarNameSrItem;
        public godItem: game.mod.AttrGodItem;
        public img_acted: eui.Image;
        public btn_act: game.mod.Btn;
        public icon0: game.mod.jiban.RoleHuanHuaIconItem;
        public icon1: game.mod.jiban.RoleHuanHuaIconItem;
        public icon2: game.mod.jiban.RoleHuanHuaIconItem;
        public power: game.mod.Power;
        public gr_eff: eui.Group;
        public lb_actCond: eui.Label;
        public img_name: eui.Image;
        public img_eff: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.jiban.RoleHuanHuaSkin";
            this.touchEnabled = false;
        }
    }
}