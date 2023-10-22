namespace game.mod.more {

    export class HunkaBagView extends eui.Component {
        public secondPop: SecondPop;
        public hunkaNone: HunkaNoneView;
        public list_item: eui.List;

        constructor() {
            super();
            this.skinName = "skins.more.HunkaBagSkin";
        }
    }

}