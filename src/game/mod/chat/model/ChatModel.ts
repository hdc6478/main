namespace game.mod.chat {

    import chat_setting_data = msg.chat_setting_data;
    import s2c_chat_look_user = msg.s2c_chat_look_user;
    import teammate = msg.teammate;

    export class ChatModel {

        //消息
        public chatMap: { [channel: number]: ChatInfoListData[] };
        public chatCD: { [channel: number]: number } = {};
        public chatEmojiCD: { [channel: number]: number } = {};
        public infos: chat_setting_data[];
        public blackInfos: teammate[] = [];
        public blackFlag: boolean;
        public chatChannel: ChatChannel = ChatChannel.Cross;
        public lockInfo: s2c_chat_look_user;
        public chatPrivateMap: { [roleKey: string]: ChatInfoListData[] };//私聊信息，角色ID转string
        public chatPrivateCD: { [roleKey: string]: number } = {};//私聊CD，角色ID转string
        public chatPrivateEmojiCD: { [roleKey: string]: number } = {};//私聊表情CD，角色ID转string
        public privateList: ChatPrivateData[] = [];//私聊列表
        public curPrivateInfo: ChatPrivateData;//私聊选中的玩家
        public reqPrivateList: string[] = [];//已请求信息的私聊列表，角色ID转string
        public notReadPrivateList: string[] = [];//未读消息的私聊列表，角色ID转string
        public mainChatList: ChatInfoListData[] = [];//主界面显示的聊天信息
        public openChat: boolean = false;//打开聊天按钮
        public systemList: string[] = [];//系统公告
        public settingTime: number;//屏蔽时间
        public reqUnion: boolean = false;//是否请求仙宗纪行消息
        public unionList: ChatInfoListData[] = [];//仙宗纪行消息

        public clearData(): void {
            this.chatMap = null;
            this.chatCD = {};
            this.chatEmojiCD = {};
            this.infos = null;
            this.blackInfos = [];
            this.blackFlag = false;
            this.chatPrivateMap = {};
            this.chatPrivateCD = {};
            this.chatPrivateEmojiCD = {};
            this.privateList = [];
            this.curPrivateInfo = null;
            this.reqPrivateList = [];
            this.notReadPrivateList = [];
            this.mainChatList = [];
            this.openChat = false;
            this.systemList = [];
            this.settingTime = 0;
            this.reqUnion = false;
            this.unionList = [];
        }
    }
}
