namespace game.mod.chat {

    export class RoleTipsView extends eui.Component {
        public btn_god: AttrGodItem;
        public head:game.mod.HeadVip;
        public power:game.mod.Power;
        public lab_name:eui.Label;
        public lab_guild:eui.Label;
        public lab_team:eui.Label;
        public lab_rebirth:eui.Label;
        public btn_add: game.mod.Btn;
        public btn_black: game.mod.Btn;
        public scr: eui.Scroller;
        public shenling: RoleTipsShenlingView;
        public equip: RoleTipsEquipView;
        public skill: RoleTipsSkillView;
        public otherSkill: RoleTipsOtherSkillView;
        public btn_next: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.chat.RoleTipsSkin";
        }
    }

}