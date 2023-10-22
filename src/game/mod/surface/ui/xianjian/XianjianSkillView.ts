namespace game.mod.surface {

    export class XianjianSkillView extends eui.Component {
        public grp_eff: eui.Group;
        public power2: game.mod.Power2;
        public list_item: eui.List;
        public list_type: eui.List;
        public item_skill: XianjianBattleSkillItem;
        public lab: eui.Label;
        public icon_1: XianjianBuweiItem;
        public icon_2: XianjianBuweiItem;
        public icon_3: XianjianBuweiItem;
        public icon_4: XianjianBuweiItem;
        public lab_name:eui.Label;
        public img_sr:eui.Image;

        constructor() {
            super();
            this.skinName = "skins.surface.XianjianSkillSkin";
        }
    }

}