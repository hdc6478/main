namespace game.mod.main {


    export class RewardFindView extends eui.Component {
        public lab_tips: eui.Label;
        public list_item: eui.List;
        public btn_find: game.mod.Btn;
        public btn_vipFind: game.mod.Btn;
        public lab_find: eui.Label;
        public lab_vipFind: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.main.RewardFindSkin";
        }
    }
}