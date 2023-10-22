namespace game.mod.activity {

    export class HuanjingBaozangView extends eui.Component {
        public iconBigReward: game.mod.IconBigReward;
        public timeItem: game.mod.TimeItem;
        public lb_cnt: eui.Label;
        public scr: eui.Scroller;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.activity.HuanjingBaozangSkin";
        }
    }
}