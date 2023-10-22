namespace game.mod.friend {

    import LanDef = game.localization.LanDef;

    export class FriendMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: FriendMainBtnType.Friend,
                icon: "friend_tab",
                mdr: FriendMdr,
                title: LanDef.friend_tips1,
                hintTypes: [ModName.Friend, FriendViewType.FriendMain, FriendMainBtnType.Friend],
            },
            {
                btnType: FriendMainBtnType.Recommend,
                icon: "friend_recommend_tab",
                mdr: FriendRecommendMdr,
                title: LanDef.friend_tips2,
            },
            {
                btnType: FriendMainBtnType.Follow,
                icon: "friend_follow_tab",
                mdr: FriendFollowMdr,
                title: LanDef.friend_tips3,
            },
            {
                btnType: FriendMainBtnType.Black,
                icon: "friend_black_tab",
                mdr: FriendBlackMdr,
                title: LanDef.friend_tips4,
            }
        ];

    }
}