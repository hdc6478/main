namespace game.mod.more {

    export class ZhenrongView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public godPower: game.mod.TeamGodPower;
        public btn_desc: game.mod.Btn;
        public list_attr: eui.List;
        public list_btn: eui.List;
        public btn_onekey: game.mod.Btn;
        public list_shenling: eui.List;
        public list_huashen: eui.List;

        constructor() {
            super();
            this.skinName = "skins.more.ZhenrongSkin";
        }
    }
}