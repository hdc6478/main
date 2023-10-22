namespace game.mod.compete {

    export class YouliTreasureView extends eui.Component {

        public lab_desc: eui.Label;
        public list_reward:eui.List;
        public btn_get: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.compete.YouliTreasureSkin";
        }

    }
}