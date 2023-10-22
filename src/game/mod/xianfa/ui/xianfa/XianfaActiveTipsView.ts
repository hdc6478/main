namespace game.mod.xianfa {

    export class XianfaActiveTipsView extends eui.Component {

        public img_bg: eui.Image;
        public grp_type: eui.Group;
        public skill: XianfaItem;
        public power:game.mod.Power;

        constructor() {
            super();
            this.skinName = "skins.xianfa.XianfaActiveTipsSkin";
        }
    }

}