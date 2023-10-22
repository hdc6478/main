namespace game.mod.compete {

    export class DoufaFinalsView extends eui.Component {

        public secondPop: SecondPop;
        public player: DoufaPlayerView;
        public list_type: eui.List;

        constructor() {
            super();
            this.skinName = "skins.compete.DoufaFinalsSkin";
        }
    }
}
