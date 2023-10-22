namespace game.mod.shilian {

    export class ResultFubenView extends eui.Component {

        public grp_lv: eui.Group;
        public grp_maxLv: eui.Group;
        public lab_cnt: eui.Label;
        public lab_add: eui.Label;
        public closeTips: game.mod.CloseTips;

        constructor() {
            super();
            this.skinName = "skins.shilian.ResultFubenSkin";
        }
    }

}