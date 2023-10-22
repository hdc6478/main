namespace game.mod.pass {

    export class QiyuanDetail1View extends eui.Component {

        public secondPop: game.mod.SecondPop;

        public awd_icon: Icon;
        public pro_awd: ProgressBarComp;

        public lab_desc: eui.Label;
        public lab_awd_title: eui.Label;

        public list_reward: eui.List;
        public btn_fight: game.mod.Btn;

        recommendPower: RecommendPower;

        constructor() {
            super();
            this.skinName = "skins.pass.QiyuanDetail1Skin";
        }

    }
}