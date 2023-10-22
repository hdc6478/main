namespace game.mod.shenling {

    export class ShenlingLingliView extends eui.Component {
        public scroller: eui.Scroller;
        public skillListComp: game.mod.shenling.ShenlingLingliSkillListComp;
        public typeListComp: game.mod.shenling.ShenLingTypeListView;
        public btn_rule: game.mod.Btn;
        public lb_resetcost: eui.Label;
        public btn_reset: game.mod.Btn;
        public skillDescComp: game.mod.shenling.ShenlingLingliSkillDescComp;
        public line0_0: game.mod.shenling.ShenlingLingliLine;
        public line0_1: game.mod.shenling.ShenlingLingliLine;
        public line1_0: game.mod.shenling.ShenlingLingliLine;
        public line1_1: game.mod.shenling.ShenlingLingliLine;
        public icon_main: game.mod.shenling.ShenlingLingliSkillIcon;
        public img_max: eui.Image;
        public gr_cost: eui.Group;
        public lb_precondition: eui.Label;
        public lb_cost: eui.Label;
        public btn_do: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenlingLingliSkin";
        }
    }
}