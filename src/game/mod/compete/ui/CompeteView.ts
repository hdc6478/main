namespace game.mod.compete {

    export class CompeteView extends eui.Component {

        public grp1: eui.Group;
        public timeItem1: game.mod.TimeItem;
        public lab_rank1: eui.Label;
        public lab_cnt1: eui.Label;
        public redPoint1: eui.Image;

        public grp2: eui.Group;
        public timeItem2: game.mod.TimeItem;
        public lab_open2: eui.Label;
        public lab_rank2: eui.Label;
        public lab_cnt2: eui.Label;
        public redPoint2: eui.Image;

        public grp3: eui.Group;

        public item: CoinItem;
        public btn_shop: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.compete.CompeteSkin";
        }
    }
}
