namespace game.mod.shilian {

    export class YuanLingRewardView extends eui.Component {
        public lb_cnt: eui.Label;
        public list: eui.List;
        public gr_eft: eui.Group;
        public lb_cd: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.shilian.YuanLingRewardSkin";
        }
    }
}