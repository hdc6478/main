namespace game.mod.surface {


    export class XianjianUpView extends eui.Component {
        public secondPop: SecondPop;
        public grp_eff: eui.Group;
        public btn_shangzhen: Btn;
        public suit_item: XianjianSkillSuitComp;
        public power: Power;
        public skill_1: XianjianSkillItem;
        public skill_2: XianjianSkillItem;
        public skill_3: XianjianSkillItem;
        public skill_4: XianjianSkillItem;
        public btn_up: Btn;
        public lab_level: eui.Label;
        public bar: ProgressBarComp;
        public icon: Icon;

        constructor() {
            super();
            this.skinName = "skins.surface.XianjianUpSkin";
        }
    }

}