declare namespace game.mod.friend {
    class FriendRecommendView extends eui.Component {
        scr: eui.Scroller;
        list_item: eui.List;
        grp_tips: eui.Group;
        btn_add: game.mod.Btn;
        btn_change: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.friend {
    class FriendMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.friend {
    import friend_info = msg.friend_info;
    import friend_add_data = msg.friend_add_data;
    import qiecuo_param_data = msg.qiecuo_param_data;
    class FriendProxy extends ProxyBase implements IFriendProxy {
        private _model;
        initialize(): void;
        onStartReconnect(): void;
        c2s_friend_list(type: number): void;
        c2s_change_recommond_friend(): void;
        c2s_friend_apply(roleList: friend_add_data[]): void;
        c2s_friend_delete(roleId: Long, serverId: number): void;
        c2s_friend_give_gift(roleId: Long, index: number, count: number): void;
        c2s_friend_pvp_challenge(roleId: Long, data?: qiecuo_param_data): void;
        private s2c_friend_list;
        private s2c_update_friend_data;
        private getInfoPos;
        readonly friendList: friend_info[];
        readonly followList: friend_info[];
        readonly recommendList: friend_info[];
        isFriend(roleId: Long): boolean;
        getFriendInfo(roleId: Long): friend_info;
        getMaxGiftCnt(): number;
        getGiftCnt(): number;
        getLeftGiftCnt(): number;
        getMaxFriendCnt(): number;
        getFriendCnt(): number;
        getLeftFriendCnt(): number;
        private checkCanAdd;
        onClickAdd(roleList: friend_add_data[]): void;
        onClickOneKeyAdd(infos: friend_info[]): void;
        readonly giftIndexList: number[];
        /**更新红点*/
        private updateHint;
        getGiftHint(): boolean;
        changeTime: number;
        protected onBagUpdateByPropIndex(n: base.GameNT): void;
    }
}
declare namespace game.mod.friend {
    import teammate = msg.teammate;
    class FriendBlackItem extends BaseListenerRenderer {
        head: HeadVip;
        lab_name: eui.Label;
        lab_team: eui.Label;
        power: PowerLabel;
        btn_black: game.mod.Btn;
        private _chatProxy;
        data: teammate;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.friend {
    class FriendBlackView extends eui.Component {
        scr: eui.Scroller;
        list_item: eui.List;
        grp_tips: eui.Group;
        constructor();
    }
}
declare namespace game.mod.friend {
    class FriendCheckView extends eui.Component {
        list_btn: eui.List;
        constructor();
    }
}
declare namespace game.mod.friend {
    class FriendFollowView extends eui.Component {
        scr: eui.Scroller;
        list_item: eui.List;
        grp_tips: eui.Group;
        btn_add: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.friend {
    import FriendGiftConfig = game.config.FriendGiftConfig;
    class FriendGiftItem extends eui.ItemRenderer {
        icon: game.mod.Icon;
        lab_name: eui.Label;
        lab_cnt: eui.Label;
        item1: CoinItem;
        lab_value: eui.Label;
        redPoint: eui.Image;
        data: FriendGiftConfig;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.friend {
    class FriendGiftView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list_item: eui.List;
        lab_cnt: eui.Label;
        btn_add: game.mod.Btn;
        btn_subtract: game.mod.Btn;
        btn_subtractTen: game.mod.Btn;
        btn_addTen: game.mod.Btn;
        btn_send: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.friend {
    import friend_info = msg.friend_info;
    class FriendItem extends BaseListenerRenderer {
        head: HeadVip;
        img_state: eui.Image;
        lab_name: eui.Label;
        lab_team: eui.Label;
        power: PowerLabel;
        lab_value: eui.Label;
        img_online: eui.Image;
        lab_online: eui.Label;
        btn_gift: game.mod.Btn;
        private _proxy;
        data: friend_info;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
        private onClickHead;
    }
}
declare namespace game.mod.friend {
    import friend_info = msg.friend_info;
    class FriendItem2 extends BaseListenerRenderer {
        head: HeadVip;
        img_state: eui.Image;
        lab_name: eui.Label;
        lab_team: eui.Label;
        power: PowerLabel;
        img_online: eui.Image;
        lab_online: eui.Label;
        btn_add: game.mod.Btn;
        private _proxy;
        data: friend_info;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.friend {
    import friend_info = msg.friend_info;
    class FriendModel {
        infoList: {
            [type: number]: friend_info[];
        };
        giftCount: number;
        giftIndexList: number[];
        changeTime: number;
        friendHint: string[];
    }
}
declare namespace game.mod.friend {
    class FriendResultView extends eui.Component {
        img_di: eui.Image;
        img_title: eui.Image;
        head1: HeadVip;
        lab_name1: eui.Label;
        img_state1: eui.Image;
        head2: HeadVip;
        lab_name2: eui.Label;
        img_state2: eui.Image;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod.friend {
    class FriendView extends eui.Component {
        lab_cnt: eui.Label;
        scr: eui.Scroller;
        list_item: eui.List;
        grp_tips: eui.Group;
        lab_goto: eui.Label;
        lab_gift: eui.Label;
        constructor();
    }
}
declare namespace game.mod.friend {
    class FriendBlackMdr extends EffectMdrBase {
        private _view;
        private _chatProxy;
        private _itemList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onInfoUpdate;
        private updateItemList;
    }
}
declare namespace game.mod.friend {
    import Point = egret.Point;
    import friend_info = msg.friend_info;
    class FriendCheckMdr extends MdrBase {
        private _view;
        private _btnList;
        private _proxy;
        private _chatProxy;
        protected _showArgs: {
            info: friend_info;
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
        private onClickChat;
        private onClickBattle;
        private onClickCompete;
        private onClickDelete;
        private onClickBlack;
    }
}
declare namespace game.mod.friend {
    class FriendFollowMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickAdd;
        private onInfoUpdate;
        private updateItemList;
    }
}
declare namespace game.mod.friend {
    import friend_info = msg.friend_info;
    class FriendGiftMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        private _selCnt;
        private _selIndex;
        private _infos;
        private _info;
        protected _showArgs: friend_info;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /** 通用背包事件监听 */
        private onBagUpdateIndex;
        private onInfoUpdate;
        private onClickItem;
        private onClickSend;
        private onClickSubtractTen;
        private onClickSubtract;
        private onClickAdd;
        private onClickAddTen;
        private subtractSelCnt;
        private addSelCnt;
        private getMaxCnt;
        private setSelCnt;
        private updateCnt;
        private updateMaxCnt;
        private updateItemList;
    }
}
declare namespace game.mod.friend {
    class FriendMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.friend {
    class FriendMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickGoto;
        private onInfoUpdate;
        private updateItemList;
        private updateGift;
    }
}
declare namespace game.mod.friend {
    class FriendRecommendMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        private readonly TIME_TICK;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickAdd;
        private onClickChange;
        private onInfoUpdate;
        private updateItemList;
    }
}
declare namespace game.mod.friend {
    import s2c_instance_fin = msg.s2c_instance_fin;
    class FriendResultMdr extends EffectMdrBase {
        private _view;
        protected _showArgs: s2c_instance_fin;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateInfo;
    }
}
