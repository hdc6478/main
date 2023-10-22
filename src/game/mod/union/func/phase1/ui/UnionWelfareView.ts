namespace game.mod.union {

    export class UnionWelfareView extends eui.Component {

        public list: eui.List;
        public btn_explain: Btn;
        public head: HeadVip;
        public lab_nobody: eui.Label;
        public img_title: eui.Image;
        public lab_name: eui.Label;
        public lab_count: eui.Label;
        public gr_eft: eui.Group;
        public img_ditu: eui.Image;
        public img_nobody: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.union.UnionWelfareSkin";
        }
    }

}