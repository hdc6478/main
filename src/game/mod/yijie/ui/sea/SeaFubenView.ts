namespace game.mod.yijie {

    export class SeaFubenView extends eui.Component {
        public avatarNameItem: AvatarNameItem;
        public icon: game.mod.Icon;
        public bar: game.mod.ProgressBarComp;
        public seaRewardItem: SeaRewardItem;
        public lab_gate: eui.Label;
        public list_reward: eui.List;
        public grp_font: eui.Group;
        public btn_challenge: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.yijie.SeaFubenSkin";
        }
    }

}