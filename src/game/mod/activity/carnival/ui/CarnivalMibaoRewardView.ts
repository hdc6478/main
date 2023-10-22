namespace game.mod.activity {

    export class CarnivalMibaoRewardView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public list: eui.List;
        public btn_buy: game.mod.Btn;
        public img_state: eui.Image;
        public lab_tips: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.activity.CarnivalMibaoRewardSkin";
        }
    }
}