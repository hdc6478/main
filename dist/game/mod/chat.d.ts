declare namespace game.mod.chat {
    import ride_info = msg.ride_info;
    class RoleTipsBattleRender extends eui.ItemRenderer {
        icon: Icon;
        lab_desc: eui.Label;
        grp_star: eui.Group;
        lab_star: eui.Label;
        img_star: eui.Image;
        data: ride_info;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.chat {
    class ChatMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.chat {
    import s2c_chat_look_user = msg.s2c_chat_look_user;
    import teammate = msg.teammate;
    class ChatProxy extends ProxyBase implements IChatProxy {
        private _model;
        initialize(): void;
        onStartReconnect(): void;
        c2s_chat(chatChannel: number, content: string, idx?: number): void;
        private s2c_chat;
        /**
         * 处理返回的聊天信息
         */
        private onFormat;
        private checkIsFace;
        private checkFaceUrl;
        private getPropName;
        private setChatContent;
        private decodeContent;
        private setChatInfoData;
        openChat: boolean;
        private setMainChatList;
        readonly mainChatList: ChatInfoListData[];
        readonly systemList: string[];
        getChatInfoByChannel(chatChannel: ChatChannel): ChatInfoListData[];
        getChatCD(chatChannel: ChatChannel, roleId?: Long): number;
        getCfgCD(chatChannel: ChatChannel, roleId?: Long): number;
        getChatEmojiCD(chatChannel: ChatChannel, roleId?: Long): number;
        chatChannel: number;
        /**
         * 点击链接触发
         * @param {game.mod.chat.ChatInfoListData} info 聊天数据
         * @param {string} event 链接绑定的事件
         */
        onClickChatLink(info: ChatInfoListData, event: string): void;
        private click_link_c2s;
        /** 点击超链接返回的跳转 */
        private s2c_click_hyperlink;
        /**------------------------聊天设置-----------------------------*/
        c2s_chat_open_setting(): void;
        c2s_chat_setting(type: number): void;
        private s2c_chat_open_setting;
        private getInfoPos;
        isSettingSelected(type: number): boolean;
        settingTime: number;
        /**------------------------黑名单-----------------------------*/
        c2s_chat_add_blackuser(serverId: number, roleId: Long, isRobot: number): void;
        c2s_chat_del_blackuser(roleId: Long): void;
        c2s_chat_open_blacklist(): void;
        private s2c_chat_open_blacklist;
        readonly blackInfos: teammate[];
        private getBlackInfoPos;
        isBlackUser(roleId: Long): boolean;
        onClickBlack(serverId: number, roleId: Long, isRobot: number): void;
        /**------------------------战力比拼，查看玩家信息-----------------------------*/
        c2s_chat_look_user(serverId: number, roleId: Long, isRobot: number, type: number): void;
        private s2c_chat_showpower_check_info;
        private s2c_chat_look_user;
        readonly lookInfo: s2c_chat_look_user;
        /**------------------------私聊-----------------------------*/
        c2s_private_chat(serverId: number, roleId: Long, content: string): void;
        c2s_get_private_chat(serverId: number, roleId: Long): void;
        c2s_read_private_chat(serverId: number, roleId: Long): void;
        private s2c_private_chat;
        private s2c_private_chat_update;
        /**
         * 处理返回的私聊信息
         */
        private onFormatPrivate;
        private setChatPrivateInfoData;
        private clearChatPrivateInfoData;
        private hasReqPrivate;
        getChatPrivateInfos(roleId: Long): ChatInfoListData[];
        getPrivateList(): ChatPrivateData[];
        private updatePrivateInfo;
        setPrivateInfo(info: msg.friend_info | Long | msg.teammate, startPos?: number): void;
        curPrivateInfo: ChatPrivateData;
        deletePrivateInfo(roleId: Long, type?: number): void;
        private getPrivatePos;
        private setNotReadPrivate;
        isNotReadPrivate(roleId: Long): boolean;
        /**更新红点*/
        private updatePrivateHint;
        c2s_private_chat_role_online_status(): void;
        private s2c_private_chat_role_online_status;
        /**------------------------私聊-----------------------------*/
        /**------------------------仙宗纪行-----------------------------*/
        c2s_guild_chat_tips_text(): void;
        private s2c_guild_chat_tips_text;
        /**
         * 处理返回的仙宗行纪信息
        */
        private onFormatUnion;
        readonly unionList: ChatInfoListData[];
    }
}
declare namespace game.mod.chat {
    class ChatCheckView extends eui.Component {
        list_btn: eui.List;
        constructor();
    }
}
declare namespace game.mod.chat {
    import showpower_check_data = msg.showpower_check_data;
    class ChatCompeteRender extends eui.ItemRenderer {
        img_val1: eui.Image;
        lab_val1: eui.Label;
        img_val2: eui.Image;
        lab_val2: eui.Label;
        lab_desc: eui.Label;
        data: showpower_check_data;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.chat {
    class ChatCompeteView extends eui.Component {
        lab_name1: eui.Label;
        powerLabel1: game.mod.PowerLabel;
        head1: game.mod.HeadVip;
        lab_name2: eui.Label;
        powerLabel2: game.mod.PowerLabel;
        head2: game.mod.HeadVip;
        grp_vs: eui.Group;
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.chat {
    class ChatDefaultTxtRender extends eui.ItemRenderer {
        img_bg: eui.Image;
        lab_content: eui.Label;
        data: number;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.chat {
    class ChatMoreBtn extends eui.ItemRenderer {
        iconDisplay: eui.Image;
        data: string;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.chat {
    class ChatPrivateRender extends BaseListenerRenderer {
        img_bg: eui.Image;
        head: HeadVip;
        img_online: eui.Image;
        lab_name: eui.Label;
        btn_close: game.mod.Btn;
        redPoint: eui.Image;
        data: ChatPrivateData;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.chat {
    class ChatRender extends BaseListenerRenderer {
        lab_name: eui.Label;
        grp_content: eui.Group;
        img_di: eui.Image;
        img_chatFrame: eui.Image;
        img_emo: eui.Image;
        lab_txt: eui.Label;
        head: HeadVip;
        data: ChatInfoListData;
        private _proxy;
        private _isSelf;
        private _isSystem;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickHead;
        private onTapLink;
    }
}
declare namespace game.mod.chat {
    class ChatSettingView extends eui.Component {
        btn_confirm: game.mod.Btn;
        checkbox1: eui.CheckBox;
        checkbox2: eui.CheckBox;
        checkbox3: eui.CheckBox;
        constructor();
    }
}
declare namespace game.mod.chat {
    class ChatUnionRender extends BaseListenerRenderer {
        lab_txt: eui.Label;
        data: ChatInfoListData;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onTapLink;
    }
}
declare namespace game.mod.chat {
    class ChatView extends eui.Component {
        scr: eui.Scroller;
        list: eui.List;
        grp_tips: eui.Group;
        btn_more: game.mod.Btn;
        input: eui.EditableText;
        btn_txt: game.mod.Btn;
        btn_send: game.mod.Btn;
        btn_face: game.mod.Btn;
        grp_txt: eui.Group;
        lab_tip: eui.Label;
        list_txt: eui.List;
        grp_more: eui.Group;
        list_more: eui.List;
        grp_tips_private: eui.Group;
        lab_goto: eui.Label;
        scr_private: eui.Scroller;
        list_private: eui.List;
        scr_union: eui.Scroller;
        list_union: eui.List;
        constructor();
    }
}
declare namespace game.mod.chat {
    class EmoticonRender extends BaseRenderer {
        img_item: eui.Image;
        img_bg: eui.Image;
        private _isVip;
        data: {
            type: number;
            idx: number;
        };
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private changeImgSize;
    }
}
declare namespace game.mod.chat {
    class EmoticonView extends eui.Component {
        list_btn: eui.List;
        list_emoticon: eui.List;
        scr: eui.Scroller;
        constructor();
    }
}
declare namespace game.mod.chat {
    class RoleSurfaceTipsView extends eui.Component {
        baseQualityTips: BaseQualityTips;
        head: game.mod.HeadVip;
        lab_name: eui.Label;
        lab_power: eui.Label;
        lab_cnt: eui.Label;
        power: game.mod.Power;
        baseSurfaceItem: game.mod.BaseSurfaceItem;
        /**神灵*/
        img_type: eui.Image;
        btn_skill: game.mod.ShenLingSkillIconTap;
        list_skill: eui.List;
        constructor();
    }
}
declare namespace game.mod.chat {
    import chat_setting_data = msg.chat_setting_data;
    import s2c_chat_look_user = msg.s2c_chat_look_user;
    import teammate = msg.teammate;
    class ChatModel {
        chatMap: {
            [channel: number]: ChatInfoListData[];
        };
        chatCD: {
            [channel: number]: number;
        };
        chatEmojiCD: {
            [channel: number]: number;
        };
        infos: chat_setting_data[];
        blackInfos: teammate[];
        blackFlag: boolean;
        chatChannel: ChatChannel;
        lockInfo: s2c_chat_look_user;
        chatPrivateMap: {
            [roleKey: string]: ChatInfoListData[];
        };
        chatPrivateCD: {
            [roleKey: string]: number;
        };
        chatPrivateEmojiCD: {
            [roleKey: string]: number;
        };
        privateList: ChatPrivateData[];
        curPrivateInfo: ChatPrivateData;
        reqPrivateList: string[];
        notReadPrivateList: string[];
        mainChatList: ChatInfoListData[];
        openChat: boolean;
        systemList: string[];
        settingTime: number;
        reqUnion: boolean;
        unionList: ChatInfoListData[];
        clearData(): void;
    }
}
declare namespace game.mod.chat {
    class RoleTipsBattleView extends eui.Component {
        gr_eft: eui.Group;
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.chat {
    class RoleTipsEquipView extends eui.Component {
        list_equip: eui.List;
        constructor();
    }
}
declare namespace game.mod.chat {
    class RoleTipsOtherSkillView extends eui.Component {
        list_skill: eui.List;
        constructor();
    }
}
declare namespace game.mod.chat {
    class RoleTipsShenlingView extends eui.Component {
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.chat {
    class RoleTipsSkillView extends eui.Component {
        list_skill: eui.List;
        constructor();
    }
}
declare namespace game.mod.chat {
    class RoleTipsView extends eui.Component {
        btn_god: AttrGodItem;
        head: game.mod.HeadVip;
        power: game.mod.Power;
        lab_name: eui.Label;
        lab_guild: eui.Label;
        lab_team: eui.Label;
        lab_rebirth: eui.Label;
        btn_add: game.mod.Btn;
        btn_black: game.mod.Btn;
        scr: eui.Scroller;
        shenling: RoleTipsShenlingView;
        equip: RoleTipsEquipView;
        skill: RoleTipsSkillView;
        otherSkill: RoleTipsOtherSkillView;
        btn_next: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.chat {
    import Point = egret.Point;
    import teammate = msg.teammate;
    class ChatCheckMdr extends MdrBase {
        private _view;
        private _btnList;
        private _proxy;
        private _friendProxy;
        private _isFriend;
        protected _showArgs: {
            info: teammate;
            point: Point;
        };
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickBtn;
        private onClickOther;
        private initView;
        private initTypeList;
        private onClickCheck;
        private onClickAdd;
        private onClickCompete;
        private onClickBlack;
    }
}
declare namespace game.mod.chat {
    import s2c_chat_showpower_check_info = msg.s2c_chat_showpower_check_info;
    class ChatCompeteMdr extends MdrBase {
        private _view;
        private _proxy;
        private _itemList;
        protected _showArgs: s2c_chat_showpower_check_info;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateSelf;
        private updateEnemy;
        private updateItemList;
    }
}
declare namespace game.mod.chat {
    class ChatMainMdr extends WndBaseMdr {
        private _proxy;
        protected onInit(): void;
        private initBtnData;
        protected onTabCheck(index: number): boolean;
        protected onHide(): void;
    }
}
declare namespace game.mod.chat {
    import UpdateItem = base.UpdateItem;
    class ChatMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _chatChannel;
        private _itemList;
        private _txtList;
        private _moreList;
        private _privateList;
        private _unionList;
        private _isSendSuccess;
        private readonly ITEM_H;
        private readonly ITEM_N;
        private readonly ITEM_N_OTHER;
        private readonly ITEM_H_UNION;
        private _defaultTxtIdx;
        private _sendTime;
        private _isOpen;
        private _isOpenTxt;
        private _isOpenMore;
        private _selIndex;
        private _selInfo;
        private _isPrivate;
        private _time;
        private readonly TIME_TICK;
        private _isUnion;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initShow;
        private onClickFace;
        private onClickSend;
        private canChat;
        private openChat;
        private checkContentCanSend;
        private onSendSuccess;
        private onChatUpdate;
        private onChatHide;
        private updateDefaultList;
        private updateItemList;
        /**------------------------快捷发言-----------------------------*/
        private onClickTxt;
        private onClickListTxt;
        private setOpenTxt;
        private updateDefaultTxt;
        private getDefaultTxtList;
        private setDefaultIdx;
        /**------------------------更多-----------------------------*/
        private onClickMore;
        private onClickListMore;
        private setOpenMore;
        private updateMoreList;
        private onClickSetting;
        private onClickBlack;
        /**------------------------私聊-----------------------------*/
        private onClickGoto;
        private onClickPrivate;
        private updatePrivateList;
        private updatePrivateHint;
        private updatePrivateInfo;
        private updateSelIndex;
        private indexUpdateInfo;
        private onChatPrivateUpdate;
        update(time: base.Time): void;
        /**------------------------仙宗纪行-----------------------------*/
        private onChatUnionUpdate;
        private updateUnionList;
    }
}
declare namespace game.mod.chat {
    class ChatSettingMdr extends MdrBase {
        private _view;
        private _proxy;
        private _list;
        private readonly CHAT_SETTING_TIME;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickCheck;
        private initView;
        private updateView;
        private updateSelected;
    }
}
declare namespace game.mod.chat {
    class EmoticonMdr extends MdrBase {
        private _view;
        private _itemList;
        private _btnList;
        private _proxy;
        protected _showArgs: number;
        private _selType;
        private _chatChannel;
        private _isPrivate;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickBtn;
        private onClickEmoticon;
        private onClickOther;
        private initTypeList;
        private typeUpdateInfo;
        private updateItemList;
        private isOpenVip;
    }
}
declare namespace game.mod.chat {
    import s2c_chat_look_user = msg.s2c_chat_look_user;
    class RoleSurfaceTipsMdr extends EffectMdrBase {
        private _view;
        _showArgs: {
            index: number;
            info: s2c_chat_look_user;
        };
        private _index;
        private _headType;
        private _listSkill;
        private _cfg;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickSkill;
        private onClickTalent;
        private updateShow;
        private getTypeInfo;
        private getCurInfo;
        private getCurShenlingInfo;
        private getShenlingTypeInfo;
        private updateShenling;
    }
}
declare namespace game.mod.chat {
    class RoleTipsBattleMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickItem;
        /**------------------------模型-----------------------------*/
        private updateModel;
        /**------------------------外显-----------------------------*/
        private updateItemList;
    }
}
declare namespace game.mod.chat {
    import ArrayCollection = eui.ArrayCollection;
    class RoleTipsMainMdr extends WndSecondMainMdr {
        protected _btnList: ArrayCollection;
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.chat {
    class RoleTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        private _itemList;
        private _equipList;
        private _skillList;
        private _otherSkillList;
        private _friendProxy;
        private _isFriend;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickAdd;
        private onClickBlack;
        private onClickNext;
        /**------------------------基础信息-----------------------------*/
        private updateRoleInfo;
        private updateBtn;
        /**------------------------神灵-----------------------------*/
        private updateShenling;
        private onClickShenling;
        /**------------------------装备-----------------------------*/
        private updateEquip;
        private getEquipByPos;
        private onClickEquip;
        /**------------------------仙法-----------------------------*/
        private updateSkill;
        private onClickSkill;
        /**------------------------其他技能-----------------------------*/
        private updateOtherSkill;
    }
}
