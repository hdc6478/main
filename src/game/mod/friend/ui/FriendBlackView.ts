namespace game.mod.friend {

    export class FriendBlackView extends eui.Component {
        public scr: eui.Scroller;
        public list_item: eui.List;
        public grp_tips: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.friend.FriendBlackSkin";
        }
    }

}