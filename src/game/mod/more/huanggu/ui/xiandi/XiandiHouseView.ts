namespace game.mod.more {


    export class XiandiHouseView extends eui.Component {

        public btn_god1: Btn;
        public btn_god2: Btn;
        public btn_god3: Btn;
        public btn_god4: Btn;

        public btn: Btn;
        public lab_name: eui.Label;
        public head: Head;

        constructor() {
            super();
            this.skinName = "skins.more.XiandiHouseSkin";
        }
    }

}