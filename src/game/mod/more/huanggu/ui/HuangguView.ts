namespace game.mod.more {

    export class HuangguView extends eui.Component {
        public btn_goddess: Btn;
        public btn_xiandi: Btn;
        public btn_doufa: Btn;
        public btn_shenqi: Btn;
        public btn_xianwei: Btn;

        public item: XiandiXianhouItem;

        constructor() {
            super();
            this.skinName = "skins.more.HuangguSkin";
        }
    }

}