namespace game.mod.shilian {

    export class FubenSceneView extends eui.Component {
        public grp_lv0: eui.Group;
        public grp_lv: eui.Group;
        public grp_lv_show: eui.Group;
        public scr1: eui.Scroller;
        public list_layer1: eui.List;
        public scr2: eui.Scroller;
        public list_layer2: eui.List;

        public grp_tips: eui.Group;
        public lab_tips: eui.Label;

        public lab_name: eui.Label;
        public lab_cur: eui.Label;
        public lab_cnt: eui.Label;
        public lab_time: eui.Label;
        public grp_gift: eui.Group;
        public img_tips: eui.Image;
        public lab_add: eui.Label;
        public btn_gift: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.shilian.FubenSceneSkin";
        }
    }

}