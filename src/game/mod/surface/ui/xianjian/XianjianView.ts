namespace game.mod.surface {

    export class XianjianView extends eui.Component {
        public grp_eff: eui.Group;
        public power2: game.mod.Power2;
        public name_item: AvatarNameItem;
        public item_skill: XianjianBattleSkillItem;
        // public special_attr: game.mod.SpecialAttrView;
        public btn_up: game.mod.UpStarBtn;
        public btn_jiban: game.mod.Btn;
        public btn_duanlian: game.mod.Btn;
        public grp_duanlian: eui.Group;
        public list_item: eui.List;
        public list_type: eui.List;
        public god_item: AttrGodItem;
        public lab_count: eui.Label;

        public btn_flyRank:Btn;
        public lab_flyRank:eui.Label;
        public grp_flyRank:eui.Group;

        constructor() {
            super();
            this.skinName = "skins.surface.XianjianSkin";
        }
    }

}