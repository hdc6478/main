namespace game.mod.compete {

    export class YouliScoreView extends eui.Component {
        public lab_score: eui.Label;
        public lab_time: eui.Label;
        public list_item: eui.List;

        constructor() {
            super();
            this.skinName = "skins.compete.YouliScoreSkin";
        }
    }

}