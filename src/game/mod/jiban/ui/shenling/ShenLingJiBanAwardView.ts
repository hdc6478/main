namespace game.mod.jiban {

    export class ShenLingJiBanAwardView extends eui.Component {
        public secondPop: SecondPop;
        public list: eui.List;
        public btn_oneKey: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.jiban.ShenLingJiBanAwarkSkin";
        }
    }
}