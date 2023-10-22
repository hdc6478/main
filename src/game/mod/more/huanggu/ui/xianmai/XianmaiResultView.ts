namespace game.mod.more {

    export class XianmaiResultView extends eui.Component {
        public list_reward: eui.List;
        public btn_do: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.more.XianmaiResultSkin";
        }
    }
}