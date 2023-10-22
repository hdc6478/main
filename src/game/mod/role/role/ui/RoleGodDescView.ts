namespace game.mod.role {

    export class RoleGodDescView extends eui.Component {
        public list_item: eui.List;

        constructor() {
            super();
            this.skinName = "skins.role.RoleGodDescSkin";
            this.touchEnabled = false;
        }
    }
}