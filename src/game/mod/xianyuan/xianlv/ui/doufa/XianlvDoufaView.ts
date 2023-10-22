namespace game.mod.xianyuan {

    export class XianlvDoufaView extends eui.Component {

        public btn_rank: Btn;
        public btn_fight: Btn;
        public btn_rule: Btn;
        public reward: any;
        public timeItem: TimeItem;
        public coinItem: TopCoinItem;
        public checkbox: eui.CheckBox;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.XianlvDoufaSkin";
        }
    }
}