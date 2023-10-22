namespace game.mod.friend {

    export class FriendView extends eui.Component {
        public lab_cnt: eui.Label;
        public scr: eui.Scroller;
        public list_item: eui.List;
        public grp_tips: eui.Group;
        public lab_goto: eui.Label;
        public lab_gift: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.friend.FriendSkin";
        }
    }

}