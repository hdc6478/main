namespace game {
    export const enum ChatEvent {
        ON_CHAT_INIT = "on_chat_init",//初始化
        ON_CHAT_UPDATE = "on_chat_update",//聊天信息更新
        ON_CHAT_PRIVATE_UPDATE = "on_chat_private_update",//私聊信息更新
        ON_CHAT_PRIVATE_LIST_UPDATE = "on_chat_private_list_update",//私聊列表更新
        ON_CHAT_PRIVATE_LIST_HINT = "on_chat_private_list_hint",//私聊列表红点
        ON_CHAT_PRIVATE_LIST_INFO = "on_chat_private_list_info",//私聊列表信息更新，目前只支持在线状态变更
        ON_SEND_SUCCESS = "on_send_success",//发送成功
        ON_CHAT_SETTING_UPDATE = "on_chat_setting_update",//聊天设置
        ON_CHAT_BLACK_UPDATE = "on_chat_black_update",//聊天黑名单ChatEvent
        ON_CHAT_UNION_UPDATE = "on_chat_union_update",//聊天仙宗纪行更新
    }

    export const enum ChatChannel {
        Cross = 1, //跨服
        Local = 2, //本服
        Private = 3,//私聊
        Union = 4,//宗门
        Zhandui = 5,//战队
        System = 6,//系统公告
    }

    /**
     * 聊天信息类型
     */
    export const enum ChatType {
        Face = 1,//表情
        Link = 2,//超链接
        Normal = 3,//文字
        Show = 4,//展示链接
        Jump = 5,//跳转链接
    }

    export const enum ChatEmoticonType {
        Normal = 1,//普通
        Vip = 2,//Vip
    }

    export const enum ChatSettingType {
        Lv = 1,//屏蔽200级以下发言
        Vip = 2,//屏蔽VIP2以下发言
        Stranger = 3,//屏蔽陌生人发言
    }

    export const enum ChatSettingRebackType {
        Open = 1,//1打开界面
        Update = 2,//2设置后返回
    }

    export const enum ChatCheckType {
        Check = 1,//查看
        Add = 2,//添加或者私聊
        Compete = 3,//战力比拼
        Black = 4,//拉黑
    }

    export const enum ChatBlackType {
        Open = 1,//1打开界面
        Add = 2,//2添加用户
        Delete = 3,//3删除用户
    }

    export const enum ChatLookType {
        Compete = 1,//1战力比拼
        Show = 2,//2展示信息
    }

    export const enum ChatMoreBtnType {
        Setting = "shezhianniu",//设置
        Black = "heimingdan",//黑名单
        RedPacket = "hongbaotubiao",//红包
    }

    //删除私聊类型
    export const enum ChatPrivateDelType {
        Close = 1,//1、玩家手动关闭，仙侣不能手动关闭
        Black,//2、添加黑名单
        DelFriend,//3、删除好友
        DelBanlv//4、解除仙侣时候
    }

    export const FACE_NUM = 24;//默认表情数量
    export const VIP_FACE_NUM = 45;//Vip表情数量
    export const CHAT_LIMIT = 30;//信息数量限制
    export const CHAT_DEFAULT_NUM = 6;//快捷语数量上限
    export const ChatEmoW = [68, 96];//聊天单个表情宽
    export const CHAT_LIMIT_LEVEL = 200;//屏蔽200级以下发言
    export const CHAT_LIMIT_VIP = 110000002;//屏蔽VIP2以下发言
    export const CHAT_PRIVATE_LIMIT = 100;//私聊信息数量限制
    export const MAIN_CHAT_LIMIT = 5;//主界面聊天信息数量限制
    export const CHAT_UNION_LIMIT = 20;//仙宗纪行数量限制
}
