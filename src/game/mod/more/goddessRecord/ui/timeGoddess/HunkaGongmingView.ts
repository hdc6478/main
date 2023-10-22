namespace game.mod.more {

    export class HunkaGongmingView extends eui.Component {
        public baseQualityTips: BaseQualityTips;
        public img_icon: eui.Image;
        public lab_name: eui.Label;
        public baseNameItem: BaseNameItem;
        public list_item: eui.List;
        public lab_tips: eui.Label;
        public item: HunkaScoreItem;
        public btn_act: Btn;

        constructor() {
            super();
            this.skinName = "skins.more.HunkaGongmingSkin";
        }
    }

}