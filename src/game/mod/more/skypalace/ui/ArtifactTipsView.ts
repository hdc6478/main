namespace game.mod.more {

    export class ArtifactTipsView extends eui.Component {

        public qualityTips: game.mod.BaseQualityTips;
        public lb_name: eui.Label;
        public power: game.mod.Power;
        // public icon: Icon;
        public img_icon: eui.Image;
        public scroller: eui.Scroller;
        public gr_middle: eui.Group;
        public img_status: eui.Image;
        public skill_item: BaseDescList2;
        public artifact_item: ArtifactTipsItem;

        constructor() {
            super();
            this.skinName = "skins.more.ArtifactTipsSkin";
        }
    }

}