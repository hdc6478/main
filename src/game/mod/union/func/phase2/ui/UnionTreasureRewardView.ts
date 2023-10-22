namespace game.mod.union {

    export class UnionTreasureRewardView extends eui.Component {

        public list: eui.List;
        // public list_item: eui.List;
        public icon: Icon;
        public timeItem: TimeItem;

        constructor() {
            super();
            this.skinName = "skins.union.UnionTreasureRewardSkin";
        }
    }

}