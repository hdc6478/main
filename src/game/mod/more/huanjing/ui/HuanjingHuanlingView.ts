namespace game.mod.more {

    export class HuanjingHuanlingView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public grp_lv: eui.Group;
        public list_btn: eui.List;
        public skillItem0: game.mod.SkillItemRender;
        public skillItem1: game.mod.SkillItemRender;
        public skillItem2: game.mod.SkillItemRender;
        public skillItem3: game.mod.SkillItemRender;
        public img_name: eui.Image;
        public img_eff: eui.Image;
        public lb_lv: eui.Label;
        public icon: game.mod.Icon;
        public btn_do: game.mod.Btn;
        public img_huanlingname: eui.Image;
        public img_bg: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.more.HuanjingHuanlingSkin";
        }
    }
}