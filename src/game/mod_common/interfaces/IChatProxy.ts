namespace game.mod {

    import IProxy = base.IProxy;
    import teammate = msg.teammate;

    export interface IChatProxy extends IProxy {
        c2s_chat_look_user(serverId: number, roleId: Long, isRobot: number, type: number): void;
        c2s_chat_look_user(serverId: number, roleId: Long, isRobot: number, type: number): void;
        onClickBlack(serverId: number, roleId: Long, isRobot: number): void;
        readonly blackInfos: teammate[];
        c2s_chat_open_blacklist(): void;
        setPrivateInfo(info: msg.friend_info | Long | msg.teammate): void;
        deletePrivateInfo(roleId: Long, type?: number): void;
        readonly mainChatList: ChatInfoListData[];
        onClickChatLink(_info: ChatInfoListData, event: string): void;
        openChat: boolean;
        readonly systemList: string[];
        getChatCD(chatChannel: ChatChannel, roleId?: Long): number;
        getCfgCD(chatChannel: ChatChannel, roleId?: Long): number;
    }
}