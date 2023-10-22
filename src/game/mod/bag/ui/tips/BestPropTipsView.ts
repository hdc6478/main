namespace game.mod.bag {

    export class BestPropTipsView extends eui.Component {
        public img_bg: eui.Image;
        public scr_reward: eui.Scroller;
        public list_reward: eui.List;

        constructor() {
            super();
            this.skinName = "skins.bag.BestPropTipsSkin";
        }
    }

}