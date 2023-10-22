namespace game.mod.role {

    export class XiuxianNvpuResultView extends eui.Component {
        public nameItem: game.mod.AvatarNameItem;
        public btn_do: game.mod.Btn;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.role.XiuxianNvpuResultSkin";
        }
    }
}