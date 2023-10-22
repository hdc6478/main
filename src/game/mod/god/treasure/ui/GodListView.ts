namespace game.mod.god {

    export class GodTreasureView extends eui.Component {
        public list: eui.List;
        public reward: GodProgressReward;

        constructor() {
            super();
            this.skinName = "skins.god.GodTreasureSkin";
        }
    }

}