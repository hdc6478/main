namespace game.mod.bag {

    export class PropSurfaceTipsView extends eui.Component {
        public basePropTips: game.mod.BasePropTips;
        public power: game.mod.Power;
        public img_status: eui.Image;
        public baseSurfaceItem: game.mod.BaseSurfaceItem;
        public baseDescItem: game.mod.BaseDescItem;
        public basePropGainList: game.mod.BasePropGainList;

        /**神灵*/
        public img_type: eui.Image;
        public btn_skill: game.mod.ShenLingSkillIconTap;
        public gr_power0: eui.Group;
        public gr_power: eui.Group;
        public name0: game.mod.BaseNameItem;
        public list_skill: eui.List;

        constructor() {
            super();
            this.skinName = "skins.bag.PropSurfaceTipsSkin";
        }
    }

}