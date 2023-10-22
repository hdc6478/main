namespace game.mod.more {

    export class HuanjingStageView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public power2: game.mod.Power2;
        public grp_lv: eui.Group;
        public nameItem: game.mod.AvatarNameItem;
        public lb_nextstage: eui.Label;
        public list_nextattr: eui.List;
        public costIcon: game.mod.CostIcon;
        public btn_do: game.mod.Btn;
        public stageSkillItem: game.mod.more.HuanjingStageSkillItem;
        public stageBar: game.mod.more.HuanjingStageBar;
        public img_name: eui.Image;
        public img_bg: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.more.HuanjingStageSkin";
        }
    }
}