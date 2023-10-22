namespace game.mod.xianfa {

    export class XianfaSkillTipView extends eui.Component {

        public lab_name: eui.Label;
        public power:game.mod.Power;
        public star: game.mod.StarListView;
        public grp_role_eff: eui.Group;
        public grp_role_skill_eff: eui.Group;

        public btn_play: game.mod.Btn;
        public btn_wear: game.mod.Btn;
        public btn_study: game.mod.Btn;

        public skill: XianfaItem;
        public lab_desc: eui.Label;
        
        public icon_cost: game.mod.Icon;
        public btn_up: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.xianfa.XianfaSkillTipSkin";
            this.touchEnabled = false;
            this.grp_role_eff.touchEnabled = false;
        }
    }

}