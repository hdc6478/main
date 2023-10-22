namespace game.mod.yijie {

    export class YijieLuckyView extends eui.Component {
        public secondPop: SecondPop;
        public icon: Icon;
        public lab_name: eui.Label;
        public lab_first: eui.Label;
        public lab_point: eui.Label;
        public btn_reward: Btn;
        public lab_tips: eui.Label;
        public list_item: eui.List;

        constructor() {
            super();
            this.skinName = "skins.yijie.YijieLuckySkin";
        }
    }

}