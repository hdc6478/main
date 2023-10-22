namespace game.mod.scene {

    export class BelongPlayerView extends eui.Component {
        public grp_base: eui.Group;

        public head1: Head;
        public bar1: ProgressBarComp;
        public img_tips1: eui.Image;
        public btn_belong: game.mod.Btn;
        public grp_belong: eui.Group;
        public lab_name: eui.Label;
        public lab_power: eui.Label;
        public lab_guild: eui.Label;

        public head2: Head;
        public bar2: ProgressBarComp;
        public btn_enemy: game.mod.Btn;

        public head3: Head;
        public bar3: ProgressBarComp;

        constructor() {
            super();
            this.skinName = "skins.scene.BelongPlayerSkin";
        }
    }
}