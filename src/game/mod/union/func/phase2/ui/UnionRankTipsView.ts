namespace game.mod.union {

    export class UnionRankTipsView extends eui.Component {
        public list_reward: eui.List;
        public btn_do: Btn;
        public lab_tips: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.union.UnionRankTipsSkin";
        }
    }
}