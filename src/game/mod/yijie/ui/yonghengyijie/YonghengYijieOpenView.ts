namespace game.mod.yijie {

    export class YonghengYijieOpenView extends eui.Component {
        public list_reward: eui.List;
        public timeItem: game.mod.TimeItem;
        public btn_challenge: Btn;

        constructor() {
            super();
            this.skinName = "skins.yijie.YonghengYijieOpenSkin";
        }
    }

}