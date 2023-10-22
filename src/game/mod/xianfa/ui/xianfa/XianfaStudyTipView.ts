namespace game.mod.xianfa {

    export class XianfaStudyTipView extends eui.Component {

        public img_quality_bg: eui.Image;
        public skill: XianfaItem;
        public lab_skill_name: eui.Label;

        public star: game.mod.StarListView;
        public lab_lv: eui.Label;

        public star_big0: eui.Image;
        public star_big1: eui.Image;
        public star_big2: eui.Image;
        public star_big3: eui.Image;
        public star_big4: eui.Image;

        public lab_attr1: eui.Label;
        public lab_attr2: eui.Label;

        public lab_desc: eui.Label;
        public lab_condition: eui.Label;

        public icon_cost: game.mod.Icon;
        public btn_study: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.xianfa.XianfaStudyTipSkin";
        }
    }

}