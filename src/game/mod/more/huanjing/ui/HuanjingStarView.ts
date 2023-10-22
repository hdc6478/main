namespace game.mod.more {

    export class HuanjingStarView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public power: game.mod.Power;
        public starComp: game.mod.more.HuanjingStarComp;
        public costIcon: game.mod.CostIcon;
        public lb_desc: eui.Label;
        public lb_name: eui.Label;
        public lb_skilldesc: eui.Label;
        public img_icon: eui.Image;
        public lb_lv: eui.Label;
        public redPoint: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.more.HuanjingStarSkin";
        }
    }
}