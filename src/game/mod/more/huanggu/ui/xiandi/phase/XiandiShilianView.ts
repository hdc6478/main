namespace game.mod.more {


    export class XiandiShilianView extends eui.Component {

        public icon: Icon;
        public btn: Btn;
        public recommendPower: RecommendPower;
        public lab_tips: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.XiandiShilianSkin";
        }
    }

}