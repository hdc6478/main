namespace game.mod.role {

    export class RoleGodView extends eui.Component {
        public grp_god: eui.Group;
        public btn_desc: game.mod.Btn;
        public power: game.mod.Power;
        public lab_desc: eui.Label;
        public list_item: eui.List;

        constructor() {
            super();
            this.skinName = "skins.role.RoleGodSkin";
            this.touchEnabled = false;
        }
    }
}