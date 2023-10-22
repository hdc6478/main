namespace game.mod.friend {

    export class FriendRecommendView extends eui.Component {
        public scr: eui.Scroller;
        public list_item: eui.List;
        public grp_tips: eui.Group;
        public btn_add: game.mod.Btn;
        public btn_change: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.friend.FriendRecommendSkin";
        }
    }

}