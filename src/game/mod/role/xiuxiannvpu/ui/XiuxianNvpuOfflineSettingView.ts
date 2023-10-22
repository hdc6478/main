namespace game.mod.role {

    export class XiuxianNvpuOfflineSettingView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public btn_rule: game.mod.Btn;
        public lb_acted: eui.Label;
        public btn_goto: game.mod.Btn;
        public list: eui.List;
        public btn_close: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.role.XiuxianNvpuOfflineSettingSkin";
        }
    }
}