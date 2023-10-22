namespace game.mod.more {

    export class MiningSaveView extends eui.Component {

        public head1: HeadVip;
        public head2: HeadVip;
        public power1: TeamGodPower;
        public power2: TeamGodPower;
        public lab_name1: eui.Label;
        public lab_name2: eui.Label;
        public lab_count: eui.Label;
        public btn: Btn;

        constructor() {
            super();
            this.skinName = "skins.more.MiningSaveSkin";
        }
    }

}