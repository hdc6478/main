namespace game.mod.pass {

    export class WorldMapBoxAwdView extends eui.Component {

        public secondPop: game.mod.SecondPop;

        public list_reward:eui.List;
        public lab_tip: eui.Label;
        public btn_get: mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.pass.WorldMapBoxAwdSkin";
        }

    }
}