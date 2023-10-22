namespace game.mod.yijie {

    export class SeaTaskView extends eui.Component {
        public secondPop: SecondPop;
        public list_task: eui.List;

        constructor() {
            super();
            this.skinName = "skins.yijie.SeaTaskSkin";
        }
    }

}