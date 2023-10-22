namespace game.mod.more {


    export class XiandiView extends eui.Component {

        public item1: XiandiItem;
        public item2: XiandiItem;
        public item3: XiandiItem;
        public btn: Btn;

        public lab_count: eui.Label;
        public btn_add: Btn;
        public lab_rank: eui.Label;
        public lab_score: eui.Label;

        public timeItem: TimeItem;
        public btn_rank: Btn;
        public btn_explain: Btn;

        constructor() {
            super();
            this.skinName = "skins.more.XiandiSkin";
        }
    }

}