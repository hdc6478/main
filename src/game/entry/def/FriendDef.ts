namespace game {
    export const enum FriendEvent {
        ON_FRIEND_UPDATE = "on_friend_update",//好友更新
    }

    export const enum FriendCheckType {
        Check = 1,//查看
        Chat = 2,//私聊
        Battle = 3,//切磋
        Compete = 4,//战力比拼
        Delete = 5,//删除
        Black = 6,//拉黑
    }

    export const enum FriendOpType {
        Friend = 1,//1:好友,
        Follow = 2,//2:关注,
        Recommend = 3,//3:推荐
    }
    export const enum FriendEventType {
        Delete = 1,//1.删除
        Add = 2,//2.添加
        Update = 3,//3.数据变更
    }
}
