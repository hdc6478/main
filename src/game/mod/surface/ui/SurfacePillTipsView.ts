namespace game.mod.surface {

    export class SurfacePillTipsView extends eui.Component {
        public basePropTips: game.mod.BasePropTips;
        public lab_cnt: eui.Label;
        public power: game.mod.Power;
        public grp_attr: eui.Group;
        public baseAttrItem: BaseAttrItem;
        public baseDescItem: BaseDescItem;
        public list_attr: eui.List;

        constructor() {
            super();
            this.skinName = "skins.surface.SurfacePillTipsSkin";
        }
    }

}