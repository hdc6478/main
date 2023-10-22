namespace game.mod.more {

    export class MiningView extends eui.Component {

        public icon: eui.Image;
        public lab_count: eui.Label;
        public img_icon: eui.Image;
        public lab_have: eui.Label;
        public modalItem1: MiningSlaveEftItem;
        public modalItem2: MiningSlaveEftItem;
        public modal1: MiningModalItem;
        public modal2: MiningModalItem;
        public modal3: MiningModalItem;
        public modal4: MiningModalItem;
        public modal5: MiningModalItem;
        public modal6: MiningModalItem;
        public btn_lingbao: Btn;
        public btn_gift: Btn;
        public btn_sale: GiftBtn;

        constructor() {
            super();
            this.skinName = "skins.more.MiningSkin";
        }
    }

}