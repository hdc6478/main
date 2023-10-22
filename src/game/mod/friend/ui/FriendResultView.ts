namespace game.mod.friend {

    export class FriendResultView extends eui.Component {
        public img_di: eui.Image;
        public img_title: eui.Image;
        public head1: HeadVip;
        public lab_name1: eui.Label;
        public img_state1: eui.Image;

        public head2: HeadVip;
        public lab_name2: eui.Label;
        public img_state2: eui.Image;

        public closeTips: game.mod.CloseTips;

        constructor() {
            super();
            this.skinName = "skins.friend.FriendResultSkin";
        }
    }

}