namespace game.mod.friend {

    import friend_info = msg.friend_info;

    export class FriendModel {
        public infoList: {[type: number]: friend_info[]} = {};
        public giftCount: number = 0;
        public giftIndexList: number[];
        public changeTime: number = 0;
        public friendHint: string[] = [ModName.Friend, FriendViewType.FriendMain, FriendMainBtnType.Friend];//好友红点
    }
}