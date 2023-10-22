namespace game.mod.surface {

    export class SurfaceSkillTipsView extends eui.Component {
        private baseQualityTips: BaseQualityTips;
        public skill: SkillItemRender;
        public lab_name: eui.Label;
        public baseDescItem: BaseDescItem;
        public baseDescItem2: BaseDescItem;
        public skillAttrList: SkillAttrList;
        public baseDescList: BaseDescList;
        public baseDescList2: BaseDescList;
        public baseDescList3: BaseDescList;
        public btn:Btn;

        constructor() {
            super();
            this.skinName = "skins.surface.SurfaceSkillTipsSkin";
        }
    }

}