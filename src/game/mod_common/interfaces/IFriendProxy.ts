namespace game.mod {

    import IProxy = base.IProxy;
    import friend_info = msg.friend_info;
    import friend_add_data = msg.friend_add_data;
    import qiecuo_param_data = msg.qiecuo_param_data;

    export interface IFriendProxy extends IProxy {
        isFriend(roleId: Long): boolean;
        getFriendInfo(roleId: Long): friend_info;
        c2s_friend_apply(roleList: friend_add_data[]): void;
        c2s_friend_list(type: number): void;
        friendList: friend_info[];
        c2s_friend_pvp_challenge(roleId: Long, data?: qiecuo_param_data):void;
    }
}