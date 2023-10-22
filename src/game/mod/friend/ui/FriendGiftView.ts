namespace game.mod.friend {

    export class FriendGiftView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public list_item: eui.List;
        public lab_cnt: eui.Label;
        public btn_add: game.mod.Btn;
        public btn_subtract: game.mod.Btn;
        public btn_subtractTen: game.mod.Btn;
        public btn_addTen: game.mod.Btn;
        public btn_send: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.friend.FriendGiftSkin";
        }
    }

}