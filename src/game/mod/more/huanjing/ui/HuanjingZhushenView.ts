namespace game.mod.more {

    export class HuanjingZhushenView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public skillItem0: game.mod.more.HuanjingZhushenSkillItem;
        public skillItem1: game.mod.more.HuanjingZhushenSkillItem;
        public skillItem2: game.mod.more.HuanjingZhushenSkillItem;
        public skillItem3: game.mod.more.HuanjingZhushenSkillItem;
        public img_name: eui.Image;
        public img_eff1: eui.Image;
        public gr_font1:eui.Group;
        public img_eff2: eui.Image;
        public gr_font2:eui.Group;
        public lb_lv: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.HuanjingZhushenSkin";
        }
    }
}