namespace game.mod.more {

    export class CrossUnionWinView extends eui.Component {

        public list: eui.List;
        public list_reward: eui.List;
        public closeTips: CloseTips;

        constructor() {
            super();
            this.skinName = "skins.more.CrossUnionWinSkin";
        }
    }

}