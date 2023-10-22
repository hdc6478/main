namespace game.mod.xianlu {

    export class LingmaiView extends eui.Component {
        public power: game.mod.Power;
        public btn_icon1: game.mod.Btn;
        public btn_icon2: game.mod.Btn;
        public btn_icon3: game.mod.Btn;
        public btn_icon4: game.mod.Btn;
        public btn_icon5: game.mod.Btn;
        public btn_icon6: game.mod.Btn;
        public btn_icon7: game.mod.Btn;
        public btn_icon8: game.mod.Btn;
        public btn_icon9: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.xianlu.LingmaiSkin";
        }
    }

}