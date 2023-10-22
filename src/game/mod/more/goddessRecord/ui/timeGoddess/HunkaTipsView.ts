namespace game.mod.more {

    export class HunkaTipsView extends eui.Component {
        public basePropTips: BasePropTips;
        public starListView: StarListView;
        public hunkaScore: HunkaScore;
        public baseDescItem1: BaseDescItem;
        public baseDescItem2: BaseDescItem;
        public baseNameItem: BaseNameItem;
        public hunkaAttrListView: HunkaAttrListView;
        public btn_remove: Btn;
        public btn_wear: Btn;

        constructor() {
            super();
            this.skinName = "skins.more.HunkaTipsSkin";
        }
    }

}