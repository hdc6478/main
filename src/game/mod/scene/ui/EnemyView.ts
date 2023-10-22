namespace game.mod.scene {

    export class EnemyView extends eui.Component {
        public list_item: eui.List;

        constructor() {
            super();
            this.skinName = "skins.scene.EnemySkin";
        }
    }
}