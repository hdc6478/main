namespace game.mod.chat {

    export class RoleSurfaceTipsView extends eui.Component {
        public baseQualityTips: BaseQualityTips;
        public head:game.mod.HeadVip;
        public lab_name: eui.Label;
        public lab_power: eui.Label;
        public lab_cnt: eui.Label;
        public power:game.mod.Power;
        public baseSurfaceItem: game.mod.BaseSurfaceItem;

        /**神灵*/
        public img_type: eui.Image;
        public btn_skill: game.mod.ShenLingSkillIconTap;
        public list_skill: eui.List;

        constructor() {
            super();
            this.skinName = "skins.chat.RoleSurfaceTipsSkin";
        }
    }

}