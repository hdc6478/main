declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class CaiyunbangMdr3 extends MdrBase implements UpdateItem {
        protected _view: BaseGiftView;
        private _proxy;
        private _listData;
        private _endTime;
        protected _actType: ActivityType;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    import GameNT = base.GameNT;
    import ShopConfig = game.config.ShopConfig;
    import treasure_house_info = msg.treasure_house_info;
    import daolv_house_info = msg.daolv_house_info;
    import DaolvShopConfig = game.config.DaolvShopConfig;
    class ExchangeShopProxy extends ProxyBase implements IExchangeShopProxy {
        private _model;
        readonly model: ExchangeShopModel;
        initialize(): void;
        /**--------------------协议start-------------------- */
        /**获取商品信息 */
        c2s_exchange_shop_info(shop_type: number): void;
        /**购买商店 */
        c2s_exchange_shop_buy_prop(index: number, buy_cnt: number, shop_type?: number): void;
        /**刷新商店 */
        c2s_exchange_shop_refresh_prop(shop_type: number): void;
        /**特殊逻辑 道侣商店 */
        c2s_daolv_house_info(): void;
        /**道侣商店购买商品 */
        c2s_daolv_house_buy_prop(index: number, buy_cnt: number): void;
        /**返回道侣商品信息 */
        s2c_daolv_house_info(n: GameNT): void;
        /**返回商品信息 */
        private s2c_exchange_shop_info;
        /**--------------------协议end-------------------- */
        getShopList(type: number): ShopConfig[];
        getSpecialList(): DaolvShopConfig[];
        getCfgListByType(type: number): ShopConfig[];
        private getType1List;
        /**随机配置 */
        getShowCfgListByRandom(type: number): ShopConfig[];
        /**获取单个商品的状态数据 */
        getInfoByTypeIndex(index: number, type?: number): treasure_house_info | daolv_house_info;
        /**刷新时间 */
        getRefreshType(type: number): number;
        /**获取商店类型 */
        getTypeByIndex(): number;
        /**获取刷新次数 */
        getRefreshCount(type: number): number;
        /**获取大奖道具 */
        getBigReward(type: number): number;
        getListType(): number[];
        shopType: number;
        /**获取标题id */
        getTitleByType(type: number): string;
        /**根据类型获取道具id */
        getCoinIdByType(type: number): number;
        /**根据类型获取功能开启id */
        getOpenIdxByType(type: number): number;
        protected onRoleUpdate(n: GameNT): void;
        protected onBagUpdateByPropIndex(n: base.GameNT): void;
        private onUpdateHint;
        getHintByExchangeType(type: ExchangeShopType): boolean;
        private onUpdateHintByType;
        private onUpdateHintDaolv;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    import GameNT = base.GameNT;
    /**通用战令mdr*/
    class GameOrderMdr extends MdrBase implements UpdateItem {
        protected _view: GameOrderView;
        protected _proxy: GameOrderProxy;
        protected _listData: eui.ArrayCollection;
        protected _listItemData: eui.ArrayCollection;
        /**结束时间*/
        protected _endTime: number;
        /**战令类型*/
        protected _gameOrderType: GameOrderType;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /**onShow内调用*/
        protected updateView(): void;
        /**
         * 默认监听 ActivityEvent.ON_UPDATE_GIVING_LIST 回调
         */
        protected onUpdateView(): void;
        /**滚动到可领取位置*/
        protected onUpdateIndex(): void;
        /**获取可领取位置*/
        protected getPosByType(): number;
        /**
         * 三种按钮状态的点击事件
         * 1前往挑战
         * 2全部领取
         * 3解锁战令
         */
        protected onClick(): void;
        /** 通用红点事件监听 */
        protected onHintUpdate(n: GameNT): void;
        update(time: base.Time): void;
        /**重写，战令结束时间，返回0就是没有倒计时*/
        protected getEndTime(type: number): number;
        /**
         * 获取按钮状态
         * 1前往挑战
         * 2全部领取
         * 3解锁战令
         */
        protected getBtnStatus(type: number): number;
        /**重写，是否购买战令*/
        protected getIsBought(type: number): boolean;
        /**重写，获取列表数据 */
        protected getListByType(type: number): IGameOrderItemData[];
        /**前往挑战，按钮状态1*/
        protected clickBtnStatus1(): void;
        /**请求领取战令奖励，按钮状态2*/
        protected clickBtnStatus2(): void;
        /**解锁战令，按钮状态3*/
        protected clickBtnStatus3(): void;
        /**购买后累计可领取的付费奖励*/
        getReward(): PropData[];
        /**现在购买可立即领取的付费奖励*/
        getRewardCanGet(): PropData[];
    }
}
declare namespace game.mod.activity {
    import ExchangeShopProxy = game.mod.activity.ExchangeShopProxy;
    class ExchangeShopBaseItem extends BaseRenderer {
        protected icon: Icon;
        protected btn: Btn;
        protected img_bought: eui.Image;
        protected lab_name: eui.Label;
        protected lab_limit: eui.Label;
        protected img_tag: eui.Image;
        protected img_bg: eui.Image;
        protected _proxy: ExchangeShopProxy;
        protected args: ShopBuyBulkData;
        protected lmt_type: number;
        /**限购次数 */
        protected lmt_cnt: number;
        /**剩余购买次数 */
        protected left_cnt: number;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class CaiyunbangMdr4 extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _endTime;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    class CaiyunbangMdr5 extends CaiyunbangMdr3 {
        protected _actType: ActivityType;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class CarnivalGiftMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _carnivalProxy;
        private _itemList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        update(time: base.Time): void;
        private updateTime;
        private updateItemList;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class CarnivalMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _carnivalProxy;
        private _itemList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onInfoUpdate;
        update(time: base.Time): void;
        private updateTime;
        private updateItemList;
        private updateLoopCnt;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class CarnivalMibaoMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _carnivalProxy;
        private _itemList;
        private _lineList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onRoleUpdate;
        private initShow;
        private onClickItem;
        update(time: base.Time): void;
        private updateTime;
        private updateItemList;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class CarnivalRankMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _carnivalProxy;
        private _itemList;
        private _canDraw;
        private _isCross;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickReward;
        private onClickLastRank;
        private onClickGo;
        private onInfoUpdate;
        update(time: base.Time): void;
        private updateTime;
        private updateMyInfo;
        private updateRankList;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class CarnivalZhaohuanMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _carnivalProxy;
        private _itemList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initShow;
        update(time: base.Time): void;
        private updateTime;
        private updateItemList;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class CaiyunbangMdr2 extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        private _actData;
        private _actProxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickRule;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class CaiyunbangMdr1 extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _endTime;
        private _lastPos;
        private _maxSize;
        private _roundNum;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private setTween;
        private onTweenEnd;
        private updateView;
        private updateReward;
        private updateCost;
        private onClick;
        private onClickTen;
        update(time: base.Time): void;
        private onBagUpdateByPropIndex;
    }
}
declare namespace game.mod.activity {
    import ArrayCollection = eui.ArrayCollection;
    import UpdateItem = base.UpdateItem;
    import GameNT = base.GameNT;
    class ExchangeShopMdr extends MdrBase implements UpdateItem {
        protected _view: ExchangeView;
        protected _proxy: ExchangeShopProxy;
        /**限购类型 用于倒计时判断 */
        private _lmt_type;
        /**商店类型 */
        protected _type: number;
        protected _listData: ArrayCollection;
        protected onInit(): void;
        protected onInitList(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected setType(): void;
        private onUpdateView;
        protected onUpdateList(): void;
        update(time: base.Time): void;
        private onUpdateTime;
        private onClickRefresh;
        protected onHide(): void;
        protected onRoleUpdate(n: GameNT): void;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class FlyGiftMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _flyRankProxy;
        private _itemList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initShow;
        update(time: base.Time): void;
        private updateTime;
        private updateItemList;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class FlyRankMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _flyRankProxy;
        private _itemList;
        private _canDraw;
        private _topScore;
        private _propIndex;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickReward;
        private onClickLastRank;
        private onClickGo;
        private onInfoUpdate;
        private initShow;
        update(time: base.Time): void;
        private updateTime;
        private updateMyInfo;
        private updateRankList;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class FlyRebateMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _flyRankProxy;
        private _itemList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onInfoUpdate;
        private initShow;
        update(time: base.Time): void;
        private updateTime;
        private updateItemList;
        private updateLoopCnt;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class FlyWarMainMdr extends WndSecondMdr implements UpdateItem {
        protected _btnData: WndBaseViewData[];
        private _proxy;
        private _flyRankProxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        update(time: base.Time): void;
        private updateTime;
        private updateWarHint;
        private onRoleUpdate;
        protected onTaskHint(n: base.GameNT): void;
        private updateTaskHint;
        private updateHint;
    }
}
declare namespace game.mod.activity {
    /**通用战令item*/
    class GameOrderItem extends BaseListenerRenderer {
        list: eui.List;
        icon: game.mod.IconGot;
        bar: game.mod.VProgressBar;
        lab_val: eui.Label;
        grp_gray: eui.Group;
        img_gray: eui.Image;
        data: IGameOrderItemData;
        protected _listData: eui.ArrayCollection;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    class ZcxMdr7 extends EffectMdrBase {
        protected _view: ZcxFundView;
        protected _proxy: ZcxProxy;
        protected _listData: eui.ArrayCollection;
        protected _type: ZcxFundType;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected updateView(): void;
        private updateBtnGift;
        protected onClickBuy(): void;
        protected onClickGift(): void;
    }
}
declare namespace game.mod.activity {
    import GameNT = base.GameNT;
    import teammate = msg.teammate;
    class SummonProxy extends ProxyBase {
        private _model;
        readonly model: SummonModel;
        initialize(): void;
        /**--------------------协议start-------------------- */
        /**
         * 点击抽奖
         * @param button_type 1单抽   2十连    3百抽
         * */
        c2s_draw_button_click(button_type: number): void;
        /**请求排行数据 */
        c2s_draw_get_rank_info(): void;
        /**礼券购买奖励 */
        c2s_draw_buy_gift(index: number): void;
        /**购买命运豪礼 */
        c2s_draw_buy_luck_gift(itype: number, index: number): void;
        /**领取风云录奖励 */
        c2s_draw_get_fengyun_rewards(index: number): void;
        /**积分排行 */
        private s2c_draw_send_rank_info;
        /**风云录数据 */
        private s2c_draw_send_fengyun_info;
        /**礼券数据 */
        private s2c_draw_buy_gift_info;
        /**命运豪礼数据 */
        private s2c_draw_buy_luck_gift_info;
        /**抽奖获得 */
        private s2c_draw_get_rewards;
        private getSummonEffectCostPropData;
        private getSummonEffectHandler;
        /**抽奖数据 */
        private s2c_draw_base_data;
        /**--------------------协议end-------------------- */
        /**获取风云录列表信息*/
        getFengYunRankList(): ISummonFengYunData[];
        /**获取剩余购买数量 */
        getCountByIndex(index: number): number;
        /**获取排名数据 */
        getItemByRank(rank: number): teammate;
        /**获取区间排行榜列表 参数为排名 需要-1转换索引 */
        getListBySection(rank: string): IRankSectionData[];
        /**无人上榜的空数组 参数为排名 */
        getNobodyListBySection(start: number, end: number): IRankSectionData[];
        /**获取排行榜展示列表 (查看排名)*/
        getRankList(): RankRewardRenderData[];
        /**根据类型获取积分 */
        getScoreByType(type: number, min?: number): number;
        /**根据类型获取配置 */
        getGiftCfgByType(type: number, len?: number): ISummonGiftData[];
        /**获取命运豪礼礼包状态 */
        private getStatus;
        /**剩余次数 保底剩余次数为1时显示下次必得  -1不显示保底*/
        getCount(count: number): number;
        /**获取单抽/十连需要的道具和数量 */
        getPropDataByType(type: CommonCountType): PropData;
        /**获取保底道具 */
        getMustGetProp(): PropData;
        /**我的排名 */
        readonly myRank: string | number;
        /**我的排名次数 */
        readonly myRankCount: number;
        private onUpdateHintByGift;
        private onUpdateHintByFengyun;
        private onUpdateHintByExchange;
        private onUpdateHintByProp;
        protected onBagUpdateByPropIndex(n: GameNT): void;
        /**根据类型获取积分 类型3欧皇不显示 */
        getCountByType(type: number): number;
        /**获取提示 */
        getTipsByType(type: number): string;
        luck_num: number;
        mdrType: number;
        readonly count: number;
    }
    const CountByType: {
        [CommonCountType.Once]: number;
        [CommonCountType.Ten]: number;
        [CommonCountType.Hund]: number;
    };
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    import GameNT = base.GameNT;
    class WonderfulActMdr4 extends MdrBase implements UpdateItem {
        protected _view: WonderfulActView4;
        protected _proxy: WonderfulActProxy;
        protected _listData: eui.ArrayCollection;
        protected _endTime: number;
        protected _type: ActivityType;
        protected onInit(): void;
        protected addListeners(): void;
        protected onActivityClose(n: GameNT): void;
        protected onShow(): void;
        protected onHide(): void;
        protected updateView(): void;
        protected getEndTime(): number;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    class ZcxMdr5 extends GameOrderMdr {
        protected _gameOrderType: GameOrderType;
        protected onUpdateView(): void;
    }
}
declare namespace game.mod.activity {
    class FuchenlinghuAvatarItem extends AvatarItemLongPress {
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    class CarnivalView extends eui.Component {
        lab_count: eui.Label;
        timeItem: game.mod.TimeItem;
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    import act_reward = msg.act_reward;
    class CarnivalZhaohuanRender extends BaseListenerRenderer {
        lab_desc: eui.Label;
        list_reward: eui.List;
        private img_draw;
        private btn_draw;
        private _rewardList;
        private _proxy;
        private _carnivalProxy;
        private _canDraw;
        data: act_reward;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickDraw;
    }
}
declare namespace game.mod.activity {
    import act_reward = msg.act_reward;
    import teammate = msg.teammate;
    class CaiyunbangRankItem extends BaseListenerRenderer {
        img_rank: eui.Image;
        lab_rank: eui.Label;
        lab_name: eui.Label;
        lab_power: eui.Label;
        lab_num: eui.Label;
        list_reward: eui.List;
        data: ICaiyunbangRankItemData;
        private _proxy;
        private _listData;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
    interface ICaiyunbangRankItemData {
        actReward: act_reward;
        teammate: teammate;
        rankRange: number[];
    }
}
declare namespace game.mod.activity {
    class CaiyunbangView1 extends eui.Component {
        costIcon1: game.mod.CostIcon;
        costIcon10: game.mod.CostIcon;
        btn_do1: game.mod.Btn;
        btn_do10: game.mod.Btn;
        timeItem: game.mod.TimeItem;
        icon0: game.mod.IconReward;
        icon1: game.mod.IconReward;
        icon2: game.mod.IconReward;
        icon3: game.mod.IconReward;
        icon4: game.mod.IconReward;
        icon5: game.mod.IconReward;
        icon6: game.mod.IconReward;
        icon7: game.mod.IconReward;
        lb_desc: eui.Label;
        constructor();
    }
}
declare namespace game.mod.activity {
    import oper_act_item = msg.oper_act_item;
    const ActTypeToMdr: {
        [type: number]: ActMainBtnData;
    };
    class ActMainMdr extends WndBaseMdr {
        private _proxy;
        protected _showArgs: oper_act_item | oper_act_item[] | OperActivityData;
        private _curActInfo;
        private _isSelAct;
        private _selIndex;
        protected onInit(): void;
        protected onShow(): void;
        protected addListeners(): void;
        private onActivityClose;
        private onActivityUpdate;
        private onActivitySelTab;
        /**获取对应的mdr index*/
        private getMdrPosByActType;
        /**更新list数据*/
        protected updateBtnList(): void;
        /**刷新显示界面*/
        protected updateViewShow(): void;
        /**分页点击时检测*/
        protected onTabCheck(index: number): boolean;
        /**保存分页数据，子类可重写*/
        protected setViewData(): void;
    }
}
declare namespace game.mod.activity {
    class CarnivalMibaoRewardMdr extends MdrBase {
        protected _view: CarnivalMibaoRewardView;
        protected _showArgs: {
            data: CarnivalMibaoData;
            actId: number;
        };
        private _info;
        protected _listData: eui.ArrayCollection;
        private _carnivalProxy;
        private _cost;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onInfoUpdate;
        protected onClick(): void;
        private initShow;
        private updateState;
    }
}
declare namespace game.mod.activity {
    class CaiyunbangModel {
        item_list: msg.prop_tips_data[];
        times: number;
        leichong_num: number;
        leichong_info: {
            [id: number]: msg.reward_state;
        };
        duihuan_info: {
            [id: number]: msg.goods_buy_times;
        };
        login_info: {
            [id: number]: msg.reward_state;
        };
        rank_list: msg.teammate[];
        my_score: number;
        my_rank_no: number;
        qifuLoginHint: boolean;
        chargeLoginHint: boolean;
    }
}
declare namespace game.mod.activity {
    class CarnivalRankSectionMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _proxy;
        private _carnivalProxy;
        _showArgs: {
            start: number;
            end: number;
        };
        private _lastRank;
        private _start;
        private _end;
        private _actInfo;
        private _isCross;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onInfoUpdate;
        private onInfoUpdateLastRank;
        private updateRank;
        private updateLastRank;
        private updateRankList;
    }
}
declare namespace game.mod.activity {
    import GameNT = base.GameNT;
    import oper_act_item = msg.oper_act_item;
    import prop_tips_data = msg.prop_tips_data;
    import teammate = msg.teammate;
    import reward_state = msg.reward_state;
    /**
     * @description 财运榜系统
     */
    class CaiyunbangProxy extends ProxyBase {
        private _model;
        private _actTypeList;
        initialize(): void;
        c2s_activity_caiyun_qifu(type: CommonCountType): void;
        private s2c_activity_caiyun_qifu_info;
        c2s_activity_caiyun_leichong_reward(id: number): void;
        private s2c_activity_caiyun_leichong;
        c2s_activity_caiyun_duihuan(id: number, cnt?: number): void;
        private s2c_activity_caiyun_duihuan;
        c2s_activity_caiyun_login(id: number): void;
        private s2c_activity_caiyun_login;
        private s2c_activity_caiyun_rank_info;
        /**====================================== 协议end ======================================*/
        getCurOpenAct(): oper_act_item;
        getEndTime(): number;
        /**活动最后一天提示*/
        checkActTips(type: NotTipsType): void;
        getActData(type: ActivityType): oper_act_item;
        getActId(type: ActivityType): number;
        getQifuCost(type?: CommonCountType): number[];
        private isXianyu;
        canQifu(type?: CommonCountType, isTips?: boolean): boolean;
        getQifuHint(type?: CommonCountType): boolean;
        getQifuTimes(): number;
        private _qifuReward;
        getQifuRewards(): prop_tips_data[];
        getQifuProp(): prop_tips_data[];
        getQifuTargetIdx(): number;
        getRankTeammate(rankNo: number): teammate;
        getRankList(): teammate[];
        getMyRankNo(): number;
        getMyScore(): number;
        getChargeRmb(): number;
        getChargeStateInfo(id: number): reward_state;
        getLoginStateInfo(id: number): reward_state;
        getExchangeCost(): number;
        getBoughtCnt(id: number): number;
        protected onActivityInit(n: GameNT): void;
        protected onActivityUpdateByType(n: GameNT): void;
        private updateHint;
        getHintQifu(): boolean;
        getHintCharge(): boolean;
        getHintExchange(): boolean;
        getHintLogin(): boolean;
        protected onBagUpdateByPropIndex(n: GameNT): void;
        protected onRoleUpdate(n: GameNT): void;
        clearLoginHint(type: ActivityType): void;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    /**
     * 超值礼包
     * 不监听公共事件，只在打开时候更新处理，后期有需求自行调整
     */
    class ChaozhiLibaoMdr extends MdrBase implements UpdateItem {
        private _view;
        /**展示在此面板上的所有按钮，放到initBtnData()处理*/
        private _btnData;
        /**按钮管理器*/
        private _ins;
        private _rectangle;
        static isShow: boolean;
        private _tehuiProxy;
        private _shenlingGiftProxy;
        private initBtnData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private dealBtnIconList;
        private dealSingleBtnIcon;
        private calPoint;
        private onClickStage;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    class ChaozhiLibaoView extends eui.Component {
        gr_chaozhilibao: eui.Group;
        gr_btns: eui.Group;
        constructor();
    }
}
declare namespace game.mod.activity {
    import GameNT = base.GameNT;
    /**
     * @description 飞升礼包系统（飞升悟空，绝版仙剑，至尊兽印）
     */
    class FeishengLibaoProxy extends ProxyBase {
        private _openIdxAry;
        private _btnIdAry;
        private _indexs;
        initialize(): void;
        private s2c_feisheng_giftbag_info;
        private checkOpen;
        private canOpen;
        private isBought;
        getProductId(openIdx: number): number;
        getUpNumStr(openIdx: number): string;
        protected onOpenFuncUpdate(n: GameNT): void;
        getIdx(openIdx: number): number;
    }
}
declare namespace game.mod.activity {
    class FeishengLibaoView extends eui.Component {
        btn_close: game.mod.Btn;
        btn_buy: game.mod.Btn;
        list: eui.List;
        nameItem: game.mod.AvatarNameSrItem;
        gr_eft: eui.Group;
        power: game.mod.Power;
        img_title: eui.Image;
        gr_font: eui.Group;
        img_desc: eui.Image;
        constructor();
    }
}
declare namespace game.mod.activity {
    class FeishengLibaoMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _openIdx;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickBuy;
    }
}
declare namespace game.mod.activity {
    class MeiriTehuiModel {
        day: number;
        list: {
            [index: number]: msg.daily_tehui_reward;
        };
        hintPath: string[];
    }
}
declare namespace game.mod.activity {
    import DirectShopConfig = game.config.DirectShopConfig;
    /**
     * @description 每日特惠系统
     */
    class MeiriTehuiProxy extends ProxyBase {
        private _model;
        initialize(): void;
        private s2c_daily_tehui_all_info;
        c2s_daily_tehui_get_reward(index: number): void;
        getFreeRewards(): number[][];
        getDirectShopCfgList(): DirectShopConfig[];
        getStatus(id: number): RewardStatus;
        isBuyTenDay(): boolean;
        getEndTime(): number;
        getLeftDays(): number;
        canBuyTenDay(): boolean;
        private _btnTenStr;
        getBtnTenStr(): string;
        private updateHint;
    }
}
declare namespace game.mod.activity {
    class MeiriTehuiItem extends BaseListenerRenderer {
        list: eui.List;
        btn: game.mod.Btn;
        img_bought: eui.Image;
        data: IMeiriTehuiItemData;
        private _listData;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
    interface IMeiriTehuiItemData {
        productId: number;
        rewards: number[][];
        status: RewardStatus;
    }
}
declare namespace game.mod.activity {
    class MeiriTehuiView extends eui.Component {
        list: eui.List;
        btn_buyTen: game.mod.Btn;
        btn_go: game.mod.Btn;
        lb_free: eui.Label;
        timeItem: game.mod.TimeItem;
        btn_close: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class MeiriTehuiMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickBuyTen;
        private onClickGo;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    class ShenlingGiftMdr extends MdrBase {
        private _view;
        private _proxy;
        private _productId;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClick;
    }
}
declare namespace game.mod.activity {
    /**
     * @description 神灵天赋礼包
     */
    class ShenlingGiftProxy extends ProxyBase implements IShenlingGiftProxy {
        /**当前已购买的礼包index*/
        private _index;
        private _giftHint;
        initialize(): void;
        private s2c_tianfu_giftbag_info;
        private _productIdAry;
        private getProductIdAry;
        getProductId(): number;
        isAllBought(): boolean;
        canOpen(): boolean;
        checkOpen(): void;
        giftHint: boolean;
    }
}
declare namespace game.mod.activity {
    class ShenlingGiftView extends eui.Component {
        icon: game.mod.Icon;
        list: eui.List;
        btn_close: game.mod.Btn;
        btn_buy: game.mod.Btn;
        img_type: eui.Image;
        img_name: eui.Image;
        constructor();
    }
}
declare namespace game.mod.activity {
    class TehuiLibaoModel {
        infos: {
            [type: number]: number;
        };
        openIdxs: {
            [type: number]: number;
        };
        btnIdxs: {
            [type: number]: number;
        };
        /**收到协议的时间戳 */
        tehuiTime: number;
    }
}
declare namespace game.mod.activity {
    import GameNT = base.GameNT;
    /**
     * @description 特惠礼包&特惠进阶
     */
    class TehuiLibaoProxy extends ProxyBase {
        private _model;
        initialize(): void;
        private s2c_cheap_gift_info;
        isOpen(type: number): boolean;
        private onUpdateOpen;
        getInfo(type: number): number;
        getEndTime(): number;
        private checkTimeOpen;
        protected onOpenFuncUpdate(n: GameNT): void;
    }
}
declare namespace game.mod.activity {
    class TehuiLibaoView extends eui.Component {
        img_bg: eui.Image;
        img_zhekou: eui.Image;
        list: eui.List;
        btn: Btn;
        timeItem: TimeItem;
        btn_close: Btn;
        lab_tips: eui.Label;
        constructor();
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class TehuiLibaoMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        private _productId;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateTime;
        private onUpdateView;
        private onClick;
        protected onHide(): void;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    import chengshen_reward = msg.chengshen_reward;
    class ChengshenModel {
        type: number;
        list: chengshen_reward[];
        hintType: string[];
    }
}
declare namespace game.mod.activity {
    import GameNT = base.GameNT;
    class ChengshenProxy extends ProxyBase {
        private _model;
        initialize(): void;
        c2s_chengshen_get_reward(type: number): void;
        private s2c_chengshen_update_data;
        private getInfoPos;
        type: number;
        getTaskList(type: number): number[];
        hasDraw(type: number): boolean;
        canDraw(type: number): boolean;
        getHintByType(type: number): boolean;
        private hasDrawAllReward;
        getEndTime(): number;
        isOpen(): boolean;
        private updateInfo;
        private checkIsOpen;
        /**更新红点*/
        private updateHint;
        protected onTaskHint(n: base.GameNT): void;
        protected onServerDayUpdate(n: GameNT): void;
        /**功能开启刷新按钮*/
        protected onOpenFuncUpdate(n: GameNT): void;
        /**功能开启刷新按钮*/
        protected onOpenFuncInit(n: GameNT): void;
    }
}
declare namespace game.mod.activity {
    class ChengshenJibanView extends eui.Component {
        item0: AvatarBaseItem;
        item1: AvatarBaseItem;
        constructor();
    }
}
declare namespace game.mod.activity {
    import task_data = msg.task_data;
    class ChengshenTaskItem extends BaseRenderer {
        private lab_desc;
        private icon;
        private img_draw;
        private btn_draw;
        private _proxy;
        data: task_data;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickDraw;
    }
}
declare namespace game.mod.activity {
    class ChengshenTaskView extends eui.Component {
        baseSurfaceItem: BaseSurfaceItem;
        img_reward: eui.Image;
        lab_tips: eui.Label;
        img_draw: eui.Image;
        btn_draw: Btn;
        task0: ChengshenTaskItem;
        task1: ChengshenTaskItem;
        task2: ChengshenTaskItem;
        lab_cnt: eui.Label;
        constructor();
    }
}
declare namespace game.mod.activity {
    class ChengshenView extends eui.Component {
        timeItem: TimeItem;
        item0: AvatarNameSrItem;
        item1: AvatarNameSrItem;
        btn_jiban: Btn;
        btn_type1: Btn;
        btn_type2: Btn;
        constructor();
    }
}
declare namespace game.mod.activity {
    class ChengshenJibanMdr extends MdrBase {
        private _view;
        private _proxy;
        private _indexList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onActivityIconHide;
        private onClickItem0;
        private onClickItem1;
        private initShow;
    }
}
declare namespace game.mod.activity {
    class ChengshenMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        protected addListeners(): void;
        private onActivityIconHide;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class ChengshenMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onTaskUpdate;
        private onInfoUpdate;
        private onClickJiban;
        private onClickType1;
        private onClickType2;
        private initShow;
        private updateHint;
        update(time: base.Time): void;
        private updateTime;
    }
}
declare namespace game.mod.activity {
    class ChengshenTaskMdr extends MdrBase {
        private _view;
        private _proxy;
        protected _showArgs: number;
        private _index;
        private _canDraw;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onActivityIconHide;
        private onClickDraw;
        private onTaskUpdate;
        private onInfoUpdate;
        private initShow;
        private updateTaskList;
        private updateState;
        private updateCnt;
    }
}
declare namespace game.mod.activity {
    import exchange_shop_info = msg.exchange_shop_info;
    import ShopConfig = game.config.ShopConfig;
    import daolv_house_info = msg.daolv_house_info;
    class ExchangeShopModel {
        /**选中的shoptype */
        shopType: number;
        /**页签类型列表 */
        shopTypeList: number[];
        /**缓存商品数据 */
        shopMap: {
            [type: number]: exchange_shop_info;
        };
        /**缓存配置信息 */
        cfgMap: {
            [type: number]: ShopConfig[];
        };
        /**缓存道侣表数据 */
        daolvShopMap: {
            [index: number]: daolv_house_info;
        };
        /**大奖配置id */
        paramIdMap: {
            [type: number]: string;
        };
        /**根据类型获取道具id */
        getCoinIdByType: {
            [type: number]: number;
        };
        /**获取功能开启id */
        getOpenIdxByType: {
            [type: number]: number;
        };
        /**通过道具id更新商店类型红点 */
        typeByPropId: {
            [propid: number]: number;
        };
        /**通过货币更新商店类型红点 */
        typeByPropCoin: {
            [coin: number]: number;
        };
        /**标题 */
        titleIdByType: {
            [type: number]: string;
        };
    }
}
declare namespace game.mod.activity {
    class CaiyunbangItem3 extends BaseGiftItemRender {
        data: ICaiyunbangItemData;
        private _proxy;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        protected onClick(): void;
    }
    interface ICaiyunbangItemData {
        actType: ActivityType;
        reward: msg.act_reward;
        status: RewardStatus;
    }
}
declare namespace game.mod.activity {
    class CaiyunbangItem4 extends BaseListenerRenderer {
        img_bg: eui.Image;
        icon: game.mod.Icon;
        lab_name: eui.Label;
        lab_limit: eui.Label;
        img_bought: eui.Image;
        btn: game.mod.Btn;
        img_tag: eui.Image;
        data: ICaiyunbangItemData;
        private _proxy;
        private _bulkData;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.activity {
    import ShopConfig = game.config.ShopConfig;
    class ExchangeShopItem extends ExchangeShopBaseItem {
        data: ShopConfig;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    import DaolvShopConfig = game.config.DaolvShopConfig;
    class ExchangeShopSpecialItem extends ExchangeShopBaseItem {
        data: DaolvShopConfig;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    class ExchangeShopBuyTipsMdr extends MdrBase {
        private _view;
        _showArgs: ShopBuyBulkData;
        private _cost;
        private _leftCnt;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateView;
        private updateCostIcon;
        protected onHide(): void;
        private onConfirm;
        private getCnt;
        private setCnt;
        private onAdd;
        private onAddTen;
        private onSubtract;
        private onSubtractTen;
    }
}
declare namespace game.mod.activity {
    class ExchangeShopMainMdr extends WndBaseMdr {
        private _proxy;
        protected onInit(): void;
        protected onShow(): void;
        protected onTabCheck(index: number): boolean;
        protected onHide(): void;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class CaiyunbangRankSectionMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _endTime;
        private _listData;
        private _startRank;
        private _endRank;
        _showArgs: number[];
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    class ExchangeShopSpecialMdr extends ExchangeShopMdr {
        protected onInitList(): void;
        protected onUpdateList(): void;
    }
}
declare namespace game.mod.activity {
    import super_first_charge_item = msg.super_first_charge_item;
    class FirstModel {
        /**充值数额 */
        charged: number;
        /**累充列表数据 */
        infos: super_first_charge_item[];
        /**开服天数 */
        one_first: boolean;
        /**type */
        type: number;
        /**可领取天数 */
        readonly receive: number;
        hintType: {
            [type: number]: string[];
        };
        cache_times: boolean;
    }
}
declare namespace game.mod.activity {
    import ShouchongConfig = game.config.ShouchongConfig;
    class FirstProxy extends ProxyBase implements IFirstProxy {
        private _model;
        readonly model: FirstModel;
        initialize(): void;
        /**--------------------协议start-------------------- */
        private s2c_super_first_charge_info;
        private s2c_first_charge;
        /**后端通知打开弹窗 */
        private s2c_super_first_charge_advertise;
        /**
         * 领取奖励
         * @param index 福利大厅编号
         * @param day_no 领取第几天的奖励
         * */
        c2s_super_first_charge_reward(index: number, day_no: number): void;
        /**--------------------协议end-------------------- */
        getIndex(type?: number): number;
        /**根据类型获取配置 */
        getCfgByType(type: number): ShouchongConfig;
        /**获取已领取天数 */
        getDayByType(type: number): number;
        private onUpdatHint;
        /**获取红点类型 */
        getHintType(type: number): string[];
        readonly one_first: boolean;
        type: number;
        cache_times: boolean;
        getRewardDay(index: number): number;
        readonly isOpen: boolean;
        private checkOpen;
    }
}
declare namespace game.mod.activity {
    class FirstItem extends BaseRenderer {
        data: IFirstItemData;
        private _proxy;
        private list;
        private img_day;
        private _listData;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    class FirstView extends eui.Component {
        grp_eff: eui.Group;
        list: eui.List;
        btn: Btn;
        img_bg: eui.Image;
        list_type: eui.List;
        lab_price: eui.Label;
        btn_close: Btn;
        img_got: eui.Image;
        constructor();
    }
}
declare namespace game.mod.activity {
    class FirstMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _tabData;
        /**当前页签是否达到充值额度 */
        private _bool;
        /**达标时间到当天时间达到可领取天数 */
        private _ontime;
        /**当前选项获取的配置 */
        private _cfg;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateAnimate;
        private onInitTabSelect;
        private onUpdateTab;
        private onUpdateView;
        private onHintUpdate;
        private onClickTab;
        private onClickBtn;
        protected onHide(): void;
    }
}
declare namespace game.mod.activity {
    import teammate = msg.teammate;
    import activity_feishen_gift_struct = msg.activity_feishen_gift_struct;
    class FlyRankModel {
        rankList: {
            [actId: number]: teammate[];
        };
        myData: {
            [actId: number]: teammate;
        };
        rewardStatus: {
            [actId: number]: number;
        };
        lastRankList: {
            [actId: number]: teammate[];
        };
        lastMyData: {
            [actId: number]: teammate;
        };
        /**************飞升礼包***************/
        giftList: {
            [actId: number]: activity_feishen_gift_struct[];
        };
        /**************飞升返利***************/
        scoreList: {
            [actId: number]: Long;
        };
        indexList: {
            [actId: number]: number[];
        };
        loopNumList: {
            [actId: number]: number;
        };
        /**************飞升令***************/
        warIndex1: {
            [actId: number]: number;
        };
        warIndex2: {
            [actId: number]: number;
        };
        warIsBuy: {
            [actId: number]: number;
        };
        clear(): void;
    }
}
declare namespace game.mod.activity {
    import oper_act_item = msg.oper_act_item;
    import teammate = msg.teammate;
    import act_reward = msg.act_reward;
    import prop_tips_data = msg.prop_tips_data;
    class FlyRankProxy extends ProxyBase implements IFlyRankProxy {
        private _model;
        initialize(): void;
        onStartReconnect(): void;
        private s2c_activity_feishen_send_rank_info;
        getRankProp(actInfo: oper_act_item): number;
        getTopScore(actInfo: oper_act_item): number;
        getTopRewards(actInfo: oper_act_item, curRank: number, maxRank: number): prop_tips_data[];
        getMaxRank(actInfo: oper_act_item): number;
        getNextRank(actInfo: oper_act_item, curRank: number): number;
        getRewardList(actInfo: oper_act_item): act_reward[];
        private isReward;
        private getRank;
        getMyData(actId: number): teammate;
        getLastMyData(actId: number): teammate;
        getRankList(actId: number): teammate[];
        getLastRankList(actId: number): teammate[];
        canDraw(actId: number): boolean;
        getRankInfo(actId: number, rank: number): teammate;
        getFirstRankName(actInfo: oper_act_item): string;
        private updateRankHint;
        private getRankHint;
        /********************************飞升礼包****************************************/
        c2s_activity_feishen_gift_info(actId: number, index: number): void;
        private s2c_activity_feishen_gift_info;
        private getInfoPos;
        getGiftBuyCnt(actId: number, index: number): number;
        hasGiftBuy(actId: number, reward: act_reward): boolean;
        getGiftType(reward: act_reward): number;
        getGiftCost(reward: act_reward): number;
        private updateGiftHint;
        private getGiftHint;
        /********************************飞升返利****************************************/
        c2s_activity_feishen_score_get_rewards(actId: number, index: number): void;
        private s2c_activity_feishen_score_rewards_info;
        getScore(actId: number): number;
        getLoopNum(actId: number): number;
        hasRebateDraw(actId: number, reward: act_reward): boolean;
        canRebateDraw(actId: number, reward: act_reward): boolean;
        private updateRebateHint;
        private getRebateHint;
        /********************************飞升特惠****************************************/
        c2s_activity_feishen_gameorder_get_rewards(actId: number): void;
        private s2c_activity_feishen_gameorder_info;
        hasWarBuy(actId: number): boolean;
        getWarIndex1(actId: number): number;
        hasWarDraw1(actId: number, index: number): boolean;
        hasWarDraw2(actId: number, index: number): boolean;
        canWarDraw1(actId: number, reward: act_reward): boolean;
        canWarDraw2(actId: number, reward: act_reward): boolean;
        private checkExpEnough;
        getNormalRewardList(actInfo: oper_act_item): act_reward[];
        getWarRewardList(actInfo: oper_act_item): act_reward[];
        private getNormalReward;
        getWarRewardByNormalIndex(actInfo: oper_act_item, index: number): act_reward;
        private isNormalReward;
        getLimitExp(reward: act_reward): number;
        isWarShow(reward: act_reward): boolean;
        private updateWarHint;
        private getWarHint;
        getWarRewardHint(actInfo: oper_act_item): boolean;
        protected onRoleUpdate(n: base.GameNT): void;
        protected onTaskHint(n: base.GameNT): void;
    }
}
declare namespace game.mod.activity {
    import act_reward = msg.act_reward;
    class FlyGiftRender extends BaseListenerRenderer {
        img_type: eui.Image;
        lab_desc: eui.Label;
        list_reward: eui.List;
        img_bought: eui.Image;
        btn_buy: game.mod.Btn;
        lab_limit: eui.Label;
        private _rewardList;
        private _proxy;
        private _flyRankProxy;
        private _isRmb;
        private _cnt;
        data: act_reward;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.activity {
    class FlyGiftView extends eui.Component {
        timeItem: game.mod.TimeItem;
        icon_bigreward: IconBigReward;
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    import act_reward = msg.act_reward;
    class FlyRankRender extends BaseListenerRenderer {
        img_rank: eui.Image;
        lab_rank: eui.Label;
        lab_name: eui.Label;
        lab_look: eui.Label;
        private list_reward;
        private list_reward2;
        private _rewardList;
        private _rewardList2;
        private _proxy;
        private _flyRankProxy;
        data: act_reward;
        private _start;
        private _end;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.activity {
    class FlyRankView extends eui.Component {
        grp_eff: eui.Group;
        timeItem: game.mod.TimeItem;
        img_prop: eui.Image;
        lab_tips1: eui.Label;
        lab_tips2: eui.Label;
        list_rank: eui.List;
        lab_rank: eui.Label;
        lab_num: eui.Label;
        grp_tips3: eui.Group;
        lab_tips3: eui.Label;
        btn_reward: Btn;
        btn_lastRank: game.mod.Btn;
        btn_go: Btn;
        constructor();
    }
}
declare namespace game.mod.activity {
    import act_reward = msg.act_reward;
    class FlyRebateRender extends BaseListenerRenderer {
        lab_desc: eui.Label;
        list_reward: eui.List;
        private img_draw;
        private btn_draw;
        private _rewardList;
        private _proxy;
        private _flyRankProxy;
        private _canDraw;
        data: act_reward;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickDraw;
    }
}
declare namespace game.mod.activity {
    class FlyRebateView extends eui.Component {
        lab_count: eui.Label;
        timeItem: game.mod.TimeItem;
        icon_bigreward: IconBigReward;
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    class FlyTaskView extends eui.Component {
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    import act_reward = msg.act_reward;
    class FlyWarRender extends BaseListenerRenderer {
        list: eui.List;
        icon: game.mod.IconGot;
        lab_tips: eui.Label;
        grp_bar: eui.Group;
        bar: game.mod.VProgressBar;
        lab_val: eui.Label;
        img_gray: eui.Image;
        private _rewardList;
        private _proxy;
        private _flyRankProxy;
        data: act_reward;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
        private onClickItem;
        private clickIcon;
        setShowReward(data: act_reward): void;
    }
}
declare namespace game.mod.activity {
    class FlyWarView extends eui.Component {
        icon: game.mod.Icon;
        lab_name: eui.Label;
        /**当前值 */
        lab_cur: eui.Label;
        /**解锁按钮 */
        btn_unlock: Btn;
        scroller: eui.Scroller;
        /**奖励列表 */
        list_item: eui.List;
        item: FlyWarRender;
        constructor();
    }
}
declare namespace game.mod.activity {
    import act_reward = msg.act_reward;
    import activity_kuanghuan_gift_info = msg.activity_kuanghuan_gift_info;
    import teammate = msg.teammate;
    class CarnivalModel {
        mibaoList: {
            [actId: number]: number[];
        };
        giftList: {
            [actId: number]: activity_kuanghuan_gift_info[];
        };
        scoreList: {
            [actId: number]: number;
        };
        indexList: {
            [actId: number]: number[];
        };
        loopNumList: {
            [actId: number]: number;
        };
        zhaohuanScoreList: {
            [actId: number]: number;
        };
        zhaohuanIndexList: {
            [actId: number]: number[];
        };
        rankList: {
            [actId: number]: teammate[];
        };
        myData: {
            [actId: number]: teammate;
        };
        rewardStatus: {
            [actId: number]: number;
        };
        lastRankList: {
            [actId: number]: teammate[];
        };
        lastMyData: {
            [actId: number]: teammate;
        };
        clear(): void;
    }
    interface CarnivalMibaoData {
        reward: act_reward;
        hasDraw: boolean;
        canDraw: boolean;
        hasLastDarw: boolean;
        isBig: boolean;
    }
}
declare namespace game.mod.activity {
    import oper_act_item = msg.oper_act_item;
    import act_reward = msg.act_reward;
    import teammate = msg.teammate;
    class CarnivalProxy extends ProxyBase {
        private _model;
        private _zhaohuanlibaoIsFirst;
        initialize(): void;
        onStartReconnect(): void;
        private s2c_activity_kuanghuan_mibao_info;
        c2s_activity_kuanghuan_mibao_get_reward(actId: number, index: number): void;
        getMibaoProp(actInfo: oper_act_item): number;
        getMibaoLimit(reward: act_reward): number;
        hasMibaoDraw(actId: number, index: number): boolean;
        hasLastMibaoDraw(actId: number, index: number): boolean;
        canMibaoDraw(actId: number, reward: act_reward): boolean;
        private updateMibaoHint;
        private getMibaoHint;
        /****************************************召唤礼包*********************************************/
        c2s_activity_kuanghuan_gift_buy(actId: number, index: number): void;
        private s2c_activity_kuanghuan_gift_info;
        private getInfoPos;
        getGiftBuyCnt(actId: number, index: number): number;
        hasGiftBuy(actId: number, reward: act_reward): boolean;
        getGiftType(reward: act_reward): number;
        getGiftCost(reward: act_reward): number;
        private updateGiftHint;
        setZhaohuanlibaoIsFirst(ret: boolean): void;
        private getGiftHint;
        /********************************狂欢节****************************************/
        c2s_activity_kuanghuan_geren_zhaohuan_get_reward(actId: number): void;
        private s2c_activity_kuanghuan_zhaohuan_status;
        getScore(actId: number): number;
        getLoopNum(actId: number): number;
        hasCarnivalDraw(actId: number, reward: act_reward): boolean;
        canCarnivalDraw(actId: number, reward: act_reward): boolean;
        private updateCarnivalHint;
        private getCarnivalHint;
        /********************************宗门召唤****************************************/
        c2s_activity_kuanghuan_zongmen_zhaohuan_get_reward(actId: number): void;
        private s2c_activity_kuanghuan_zhaohuan_state;
        getZhaohuanScore(actId: number): number;
        hasCarnivalZhaohuanDraw(actId: number, reward: act_reward): boolean;
        canCarnivalZhaohuanDraw(actId: number, reward: act_reward): boolean;
        private updateCarnivalZhaohuanHint;
        private getCarnivalZhaohuanHint;
        private s2c_activity_kuanghuan_geren_rank_info;
        private s2c_activity_kuanghuan_zongmen_rank_info;
        private updateRankInfo;
        getMyData(actId: number): teammate;
        getLastMyData(actId: number): teammate;
        getRankList(actId: number): teammate[];
        getLastRankList(actId: number): teammate[];
        canDraw(actId: number): boolean;
        getRankInfo(actId: number, rank: number): teammate;
        private updateRankHint;
        private getRankHint;
        protected onRoleUpdate(n: base.GameNT): void;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class FlyRankSectionMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _proxy;
        private _flyRankProxy;
        _showArgs: {
            start: number;
            end: number;
        };
        private _lastRank;
        private _start;
        private _end;
        private _actInfo;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onInfoUpdate;
        private onInfoUpdateLastRank;
        update(time: base.Time): void;
        private updateTime;
        private updateRank;
        private updateLastRank;
        private updateRankList;
    }
}
declare namespace game.mod.activity {
    import act_reward = msg.act_reward;
    class CarnivalGiftRender extends BaseListenerRenderer {
        lb_limit: eui.Label;
        list: eui.List;
        btn_buy: game.mod.Btn;
        img_bought: eui.Image;
        private _rewardList;
        private _proxy;
        private _carnivalProxy;
        private _isRmb;
        private _cnt;
        data: act_reward;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.activity {
    class FlyTaskMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        private _taskType;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onTaskUpdate;
        private updateTaskList;
    }
}
declare namespace game.mod.activity {
    class CarnivalGiftView extends eui.Component {
        timeItem: game.mod.TimeItem;
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    class FlyWarMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _flyRankProxy;
        private _itemList;
        private _exp;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickUnlock;
        private onInfoUpdate;
        private onRoleUpdate;
        private initShow;
        private updateExp;
        private updateBuy;
        private updateItemList;
        private updatePos;
    }
}
declare namespace game.mod.activity {
    class FlyWarUnlockMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _itemList2;
        private _proxy;
        private _flyRankProxy;
        private _productId;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClick;
        private updateList;
    }
}
declare namespace game.mod.activity {
    import game_order_data = msg.game_order_data;
    class GameOrderModel {
        /**当前mdr*/
        mdrType: number;
        list: {
            [type: number]: game_order_data;
        };
        selType: GameOrderType;
        /**战令系统，统一展示的战令类型数组 todo*/
        showType: number[];
        /**战令banner资源，默认 giving_banner */
        bannerType: {
            [type: number]: string;
        };
        /**不显示tips文本图片的类型*/
        notTipsType: GameOrderType[];
        btnTypeByType: {
            [type: number]: string;
        };
        /**战令类型红点*/
        hintPath: {
            [type: number]: string[];
        };
    }
}
declare namespace game.mod.activity {
    import GameOrderConfig = game.config.GameOrderConfig;
    import common_reward_status = msg.common_reward_status;
    import game_order_data = msg.game_order_data;
    /**战令系统（赠送100召唤卷）*/
    class GameOrderProxy extends ProxyBase {
        private _model;
        readonly model: GameOrderModel;
        initialize(): void;
        /**--------------------协议start-------------------- */
        /**战令信息 */
        private s2c_game_order_info;
        private updateInfo;
        selType: number;
        /**请求领取战令奖励 */
        c2s_game_order_get_rewards(type: number): void;
        /**--------------------协议end-------------------- */
        /**送100召唤卷显示的战令类型*/
        getTypeListForMdr(): number[];
        /**类型数据，结束的返回null*/
        getInfoByType(type: GameOrderType): game_order_data;
        /**列表类型 */
        getTypeList(): number[];
        /**
         * 1前往挑战
         * 2全部领取
         * 3解锁战令
         * */
        getBtnStatus(type: number): number;
        /**是否结束活动(全部已领取或者时间结束) */
        private isOver;
        isRewardAllDraw(type: GameOrderType): boolean;
        /**获取列表数据 */
        getListByType(type: number): IGameOrderItemData[];
        /**根据类型和索引获取状态 */
        getStatusByTypeIndex(type: number, index: number): common_reward_status;
        /**获取当前战令的值 */
        getValueByType(type: number): number;
        /**是否购买战令 */
        getIsBought(type: number): boolean;
        /**获取结束时间 */
        getEndTime(type: number): number;
        /**根据类型获取配置数据 */
        getCfgArrByType(type: number): GameOrderConfig[];
        /**获取解锁战令不可领取奖励 */
        getReward(type: number): PropData[];
        /**获取可领取奖励 */
        getRewardCanGet(type: number): PropData[];
        getPosByType(type: number): number;
        /**
         * 获取战令红点
         * @param type
         */
        getHintByType(type: GameOrderType): boolean;
        private onUpdateHint;
        /**战令类型*/
        mdrType: GameOrderType;
    }
}
declare namespace game.mod.activity {
    class CarnivalMibaoRender extends eui.ItemRenderer {
        img_di: eui.Image;
        btn_draw: game.mod.Btn;
        icon: Icon;
        grp_draw: eui.Group;
        data: CarnivalMibaoData;
        protected dataChanged(): void;
        setData(data: CarnivalMibaoData): void;
    }
}
declare namespace game.mod.activity {
    class GameOrderUnlockView extends eui.Component {
        lab_title: eui.Label;
        list: eui.List;
        list_item: eui.List;
        btn: Btn;
        secondPop: SecondPop;
        constructor();
    }
}
declare namespace game.mod.activity {
    class GameOrderView extends eui.Component {
        /**大奖列表 */
        list: eui.List;
        /**当前值 */
        lab_cur: eui.Label;
        /**解锁按钮 */
        btn_unlock: Btn;
        /**奖励列表 */
        list_item: eui.List;
        /** */
        scroller: eui.Scroller;
        /**领取按钮 */
        btn: Btn;
        img_type: eui.Image;
        img_type2: eui.Image;
        img_type1: eui.Image;
        img_icon: eui.Image;
        img_tips: eui.Image;
        img_banner: eui.Image;
        gr_icon: eui.Group;
        gr_time: eui.Group;
        lab_time: eui.Label;
        constructor();
    }
}
declare namespace game.mod.activity {
    class GivingItem extends GameOrderItem {
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    class CarnivalMibaoRewardView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list: eui.List;
        btn_buy: game.mod.Btn;
        img_state: eui.Image;
        lab_tips: eui.Label;
        constructor();
    }
}
declare namespace game.mod.activity {
    class GameOrderUnlockMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _listItemData;
        /**战令类型*/
        private _gameOrderType;
        /**0战令类型，1购买后累计可领取，2现在购买立即领取*/
        _showArgs: any[];
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClick;
        protected onHide(): void;
    }
}
declare namespace game.mod.activity {
    class GivingMainMdr extends WndBaseMdr {
        private _proxy;
        protected onInit(): void;
        protected onShow(): void;
        protected onTabCheck(index: number): boolean;
        protected onHide(): void;
    }
}
declare namespace game.mod.activity {
    class GivingMdr extends GameOrderMdr {
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected updateView(): void;
    }
}
declare namespace game.mod.activity {
    class GivingShenLingModel {
        /**在线时间 */
        online_time: number;
        /**登录时间 */
        login_time: number;
        /**领取状态`1可领取 2已领取 */
        receive: number;
        isClick: boolean;
    }
}
declare namespace game.mod.activity {
    /**送瑶姬(在线领奖励活动) */
    class GivingShenLingProxy extends ProxyBase {
        private _model;
        readonly model: GivingShenLingModel;
        initialize(): void;
        /**--------------------协议start-------------------- */
        c2s_yaoji_get_reward(): void;
        private s2c_yaoji_online_info;
        /**--------------------协议end-------------------- */
        /**获得奖励需要的时间 */
        private readonly cfgTime;
        /**结束时间 */
        getEndTime(): number;
        /** */
        private onUpdateHint;
        private updateHint;
        readonly isOpen: boolean;
        private checkOpen;
    }
}
declare namespace game.mod.activity {
    class GivingShenLingView extends eui.Component {
        icon: Icon;
        lab_time: eui.Label;
        gr_time: eui.Group;
        btn: Btn;
        img_got: eui.Image;
        gr_eff: eui.Group;
        constructor();
    }
}
declare namespace game.mod.activity {
    class GivingShenLingMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class GivingShenLingMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _endTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateHint;
        update(time: base.Time): void;
        private onUpdateTime;
        private onGivingShenLingRewardBtn;
        private onClick;
        protected onHide(): void;
    }
}
declare namespace game.mod.activity {
    import DemonRewardConfig = game.config.DemonRewardConfig;
    import demon_reward_info = msg.demon_reward_info;
    class KillBossModel {
        /**tab的index 调用getTypeByIndex拿到类型 */
        tabIdx: number;
        /**选中的bossindex */
        bossIndex: number;
        /**活动数据列表 */
        list: demon_reward_info[];
        /**是否已经初始化配置 */
        initMap: boolean;
        /**根据类型保存boss表 */
        cfgBossMap: {
            [type: number]: DemonRewardConfig[];
        };
        /**根据类型保存boss开启条件 */
        openMap: {
            [type: number]: number[];
        };
        /**保存类型列表 */
        typeList: number[];
    }
}
declare namespace game.mod.activity {
    import DemonRewardConfig = game.config.DemonRewardConfig;
    import demon_reward_info = msg.demon_reward_info;
    /**斩妖福利（挑战多人boss获得奖励） */
    class KillBossProxy extends ProxyBase {
        private _model;
        readonly model: KillBossModel;
        initialize(): void;
        /**--------------------协议start-------------------- */
        private s2c_demon_reward_data;
        /**领取奖励结果 */
        private s2c_receive_demon_reward_ret;
        /**领取奖励 */
        c2s_receive_demon_reward(index: number, type: number): void;
        c2s_open_demon_reward(): void;
        /**--------------------协议end-------------------- */
        private onUpdateList;
        /**重新归类配置 */
        private setCfgMap;
        /**获取类型 */
        getCfgListByType(type: number): DemonRewardConfig[];
        /**根据类型获取开启条件 */
        getOpenByType(type: number): number[];
        /**获取类型 可用作tab列表 */
        getMapKeyList(): number[];
        /**根据index获取类型 */
        getTypeByIndex(index?: number): number;
        /**
         * 获取奖励列表配置和状态
         * @param index 配置index
         *  */
        getRewardList(type: number, index: number): IKillBossData;
        /**根据index获取状态数据 */
        getInfoByIndex(index: number): demon_reward_info;
        /**Wnd下的tab 选中的index */
        tabIdx: number;
        bossIndex: number;
        /**index转换type type=几转 */
        private getTypeConverByIndex;
        private onUpdateWndTab;
        /**获取Wnd的tab页签 */
        getInitTab(): string;
        /** */
        getInitIndex(type?: number): number;
        private onUpdateHint;
        private onSetHint;
        /**
         * 根据bossindex获取红点
         * @param index bossindex
         * */
        getBossItemHint(index: number): boolean;
        /**先获取开启条件再判断 */
        checkBossOpen(type: number): boolean;
    }
}
declare namespace game.mod.activity {
    class KillBossTabItem extends BaseRenderer {
        img_icon: eui.Image;
        lab_name: eui.Label;
        redPoint: eui.Image;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    class KillBossView extends eui.Component {
        list_boss: eui.List;
        list_server: eui.List;
        list_person: eui.List;
        list_last: eui.List;
        img_bg: eui.Image;
        img_kill: eui.Image;
        lab: eui.Label;
        img_get1: eui.Image;
        img_get2: eui.Image;
        img_get3: eui.Image;
        btn1: Btn;
        btn2: Btn;
        btn3: Btn;
        constructor();
    }
}
declare namespace game.mod.activity {
    class KillBossMainMdr extends WndBaseMdr {
        private _proxy;
        protected onInit(): void;
        protected onShow(): void;
        protected onTabCheck(index: number): boolean;
        protected onHide(): void;
    }
}
declare namespace game.mod.activity {
    class KillBossMdr extends MdrBase {
        private _view;
        private _proxy;
        private _info;
        private _listData;
        private _listBoss;
        private _listServer;
        private _listPerson;
        private _listLast;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onInitTab;
        private onUpdateView;
        private onClickTab;
        private onClickBtn;
        private onSelectIndex;
        private onUpdateIndex;
        /** 通用红点事件监听 */
        private onHintUpdate;
        protected onHide(): void;
    }
}
declare namespace game.mod.activity {
    class LotteryModel {
        count: number;
        id_list: number[];
    }
}
declare namespace game.mod.activity {
    import PowerDiaRewardConfig = game.config.PowerDiaRewardConfig;
    class LotteryProxy extends ProxyBase implements ILotteryProxy {
        private _model;
        readonly model: LotteryModel;
        initialize(): void;
        /**--------------------转盘协议start-------------------- */
        /**抽奖 */
        c2s_power_dia_draw(): void;
        /**抽奖返回结果 */
        private s2c_power_dia_draw_ret;
        /**活动详情（实时更新） */
        private s2c_power_dia_info;
        /**--------------------转盘协议end-------------------- */
        onUpdateHint(): void;
        /**获取目标战力 */
        readonly targetPower: number;
        /**是否全部奖励领取 */
        readonly isOver: boolean;
        /**根据文档显示第4个奖励为大奖 */
        readonly cfgReward: PowerDiaRewardConfig;
        readonly id_list: number[];
        getRewardGot(index: number): boolean;
        isOpen(): boolean;
    }
}
declare namespace game.mod.activity {
    class LotteryView extends eui.Component {
        img_bg: eui.Image;
        img_banner: eui.Image;
        img_sel: eui.Image;
        btn_lottery: game.mod.Btn;
        btn_recharge: game.mod.Btn;
        lab_cur: eui.Label;
        lab_tar: eui.Label;
        icon: game.mod.IconBigReward;
        /**概率公示 */
        lab_tips: eui.Label;
        grp_eff: eui.Group;
        icon_1: game.mod.IconReward;
        icon_2: game.mod.IconReward;
        icon_3: game.mod.IconReward;
        icon_4: game.mod.IconReward;
        icon_5: game.mod.IconReward;
        icon_6: game.mod.IconReward;
        icon_7: game.mod.IconReward;
        icon_8: game.mod.IconReward;
        icon_9: game.mod.IconReward;
        icon_10: game.mod.IconReward;
        icon_11: game.mod.IconReward;
        icon_12: game.mod.IconReward;
        grp_eft: eui.Group;
        grp_eft2: eui.Group;
        constructor();
    }
}
declare namespace game.mod.activity {
    class LottertMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.activity {
    import Point = egret.Point;
    class LotteryMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        /**icon坐标和id */
        private posArr;
        /**动画圈数 */
        private readonly round;
        /**中心点 */
        private readonly center;
        /**动画当前位置索引 */
        private cur;
        /**奖励id */
        private idx;
        private readonly _ingLay;
        private readonly _default;
        private delay_idx;
        private eff_idx;
        /**正在抽奖 */
        private isTween;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onInitView;
        private onUpdateIcon;
        private onOpenTween;
        private onTween;
        private onOver;
        private onClickLottry;
        /**提示说明 */
        private onClickTips;
        private onRecharge;
        /** 通用红点事件监听 */
        private onHintUpdate;
        private readonly selectData;
        protected onHide(): void;
        private onClear;
    }
    interface LotteryPosAndId {
        pos: Point;
        id: number;
    }
}
declare namespace game.mod.activity {
    import act_reward = msg.act_reward;
    import oper_act_item = msg.oper_act_item;
    class ActivityData {
        act_id: number;
        name: string;
        sort_num: number;
        type: number;
        is_single_icon: boolean;
        entrance: string;
        icon: string;
        banner: string;
        desc: string;
        c_begin_time: number;
        c_end_time: number;
        s_begin_time: number;
        s_end_time: number;
        param: number[];
        reward_list: act_reward[];
        updateData(msg: oper_act_item): void;
    }
}
declare namespace game.mod.activity {
    import oper_act_item = msg.oper_act_item;
    class ActivityModel {
        activityList: {
            [key: number]: oper_act_item;
        };
        actTypeList: {
            [key: number]: number[];
        };
        entranceBtnMap: {
            [entrance: string]: oper_act_item[];
        };
        curOpenAct: oper_act_item;
    }
}
declare namespace game.mod.activity {
    import oper_act_item = msg.oper_act_item;
    import Handler = base.Handler;
    /***
     * 活动数据（新活动请自行创建新的Proxy和Model）
     */
    class ActivityProxy extends ProxyBase implements IActivityProxy {
        private _model;
        getModel(): ActivityModel;
        initialize(): void;
        onStartReconnect(): void;
        private s2c_oper_act_info;
        private s2c_oper_act_update;
        private s2c_oper_act_close;
        private setEntranceBtnMap;
        private updateEntranceBtnMap;
        private getEntranceBtnPos;
        private checkDeleteEntrance;
        private deleteEntrance;
        private isSingleIcon;
        private getActIcon;
        private getActPos;
        private getEntranceBtnList;
        private isLeftBtn;
        private isBigBtn;
        private isTopBtn;
        private sortOperActList;
        private isActShow;
        getTopEntranceBtnList(): IBtnIconData[];
        getLeftEntranceBtnList(): IBtnIconData[];
        getBigEntranceBtnList(): IBtnIconData[];
        /**通过活动入口获取已开启的活动数据，notEntrance：默认会额外计算未配置入口编号的其他活动*/
        getActListByEntrance(entrance: string, notEntrance?: boolean): oper_act_item[];
        /**根据活动id获取活动数据*/
        getActData(actId: number): oper_act_item;
        /** 根据活动类型获取单个活动数据*/
        getOperActByType(actType: number, entrance?: string): oper_act_item;
        /** 根据活动类型获取已开启的活动列表数据*/
        getOperActList(actType: number): oper_act_item[];
        /**功能开启ID，固定通用活动参数1*/
        getOpenIdx(actInfo: oper_act_item): number;
        /**界面选中分页时候保存的活动*/
        curOpenAct: oper_act_item;
        /**获取活动入口编号，部分活动未配置时可用*/
        getEntrance(actInfo: oper_act_item): string;
        /**获取红点类型*/
        getHintTypes(actInfo: oper_act_item): string[][];
        /**根据活动类型获取红点类型*/
        getEntranceHintByActType(actType: number): boolean;
        private getBtnType;
        /**设置中控活动红点*/
        setActHint(type: number, handler: Handler): void;
        /**收到中控活动时，保存数据*/
        private setActData;
        /**通用中控活动数据请求*/
        c2s_oper_act_get_info(actId: number, param1?: number): void;
        /**通用排行榜，配置51的话，取50，显示成50+*/
        getMaxRank(actInfo: oper_act_item): number;
        /**传4进来,配置了4、11的话，返回10*/
        getNextRank(actInfo: oper_act_item, curRank: number): number;
        /**条件1：名次*/
        private getRank;
        /**活动最后一天提示*/
        checkActTips(type: NotTipsType): void;
        /**获取活动入口数据，entrance可以是入口编号或者独立图标*/
        private getBtnData;
    }
}
declare namespace game.mod.activity {
    import PoolObject = base.PoolObject;
    /** 左边活动数据（直购、非直购）*/
    class MainLeftActBtnData implements PoolObject {
        /** 图标 */
        icon: string;
        /** 红点 */
        showHint: boolean;
        /** 是否是直购 */
        isLimit: number;
        isShowEff: boolean;
        /**活动id*/
        index: number;
        dispose(): void;
        onAlloc(): void;
        onRelease(): void;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class MainActivityBtn extends BaseRenderer implements UpdateItem {
        btn_act: Btn;
        gr_eff: eui.Group;
        redPoint: eui.Image;
        gr_time: eui.Group;
        lab_time: eui.Label;
        private _proxy;
        private endTime;
        private effId;
        private _effId1;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private setTime;
        update(time: base.Time): void;
        private updateTime;
    }
}
declare namespace game.mod.activity {
    class MainChatRender extends BaseRenderer {
        img_type: eui.Image;
        grp_vip: eui.Group;
        lab_txt: eui.Label;
        data: ChatInfoListData;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onTapLink;
    }
}
declare namespace game.mod.activity {
    class MainLeftActBtn extends BaseRenderer {
        btn_act: game.mod.Btn;
        redPoint: eui.Image;
        gr_time: eui.Group;
        lab_time: eui.Label;
        group_eff: eui.Group;
        data: MainLeftActBtnData;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private _eftIdx;
        private addBtnEft;
        private clearBtnEft;
    }
}
declare namespace game.mod.activity {
    class MainLeftActMidView extends eui.Component {
        group_top1: eui.Group;
        group_tips: eui.Group;
        btn_hide: game.mod.Btn;
        icon_tips: eui.Image;
        constructor();
    }
}
declare namespace game.mod.activity {
    class MainLeftActTopView extends eui.Component {
        group_notice: eui.Group;
        scr_notice: eui.Scroller;
        lab_notice: eui.Label;
        group_top1: eui.Group;
        btn_hide: game.mod.Btn;
        btn: MainPunshListBtn;
        group_big: eui.Group;
        group_chat: eui.Group;
        img_chat: eui.Image;
        list_chat: eui.List;
        btn_chat: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.activity {
    class MainPunshListBtn extends Btn {
        lab_time: eui.Label;
        lab_name: eui.Label;
        gr_eff: eui.Group;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class MainLeftActMidMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _model;
        /**展示在此面板上的所有按钮，放到initBtnData()处理*/
        private _btnData;
        /**按钮管理器*/
        private _ins;
        private _listXOri;
        private _isShow;
        private _initFuben;
        private initBtnData;
        constructor();
        protected onInit(): void;
        private hideActivity;
        private setIsShow;
        private btnTween;
        protected addListeners(): void;
        protected onShow(): void;
        /** 切换场景 */
        private onSceneChange;
        private updateShow;
        private dealBtnIconList;
        private dealSingleBtnIcon;
        private removeBtnIconTime;
        private dealSingleBtnIconByNt;
        protected onHide(): void;
        /** 通用红点事件监听 */
        private onHintUpdate;
        /**功能开启刷新按钮*/
        private onOpenFuncUpdate;
        /**功能关闭移除按钮*/
        private onOpenFuncDelete;
        update(time: base.Time): void;
        private onUpdateScene;
        private onInitFirstTips;
        private onSetFirstTips;
        private onShowFirstTips;
        private onLoopTips;
        private onHideIconTips;
        private onClickFirst;
        /** 送瑶姬仙子 */
        private onClickGiving;
        private showGivingShenlingGuide;
        private onUpdateGivingShenlingTips;
        private getGivingShenlingTimeStr;
        private onUpdatePassTips;
        private onShowGivingTips;
        private onClickChaozhiLibao;
        private onActivityInit;
        private onActivityEntranceUpdate;
        private updateLeftActivity;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class MainLeftActTopMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _model;
        private _flyRankProxy;
        private _chatProxy;
        /**展示在此面板上的所有按钮，放到initBtnData()处理*/
        private _btnData;
        /**按钮管理器*/
        private _ins;
        /**冲榜按钮管理器*/
        private _ins_big;
        private _btnData_big;
        private _listYOri;
        private _listYOri_big;
        private _isShow;
        private _isOnTween;
        /**新服冲榜结束时间 */
        private _endTime;
        /**新服冲榜计时 一分钟请求一次排行榜 */
        private _time;
        private _itemList;
        private _isNoticeShowing;
        private readonly NOTICE_TIME;
        private readonly NOTICE_SHOW;
        /**入口手动赋值就行了，其他的不用管*/
        private initBtnData;
        private initBigBtnData;
        constructor();
        protected onInit(): void;
        private hideActivity;
        private setIsShow;
        private btnTween;
        protected addListeners(): void;
        protected onShow(): void;
        /** 切换场景 */
        private onSceneChange;
        private updateShow;
        private dealBtnIconList;
        private dealBigBtnIconList;
        private dealSingleBtnIcon;
        private dealSingleBigBtnIcon;
        private dealSingleBtnIconByNt;
        protected onHide(): void;
        /** 通用红点事件监听 */
        private onHintUpdate;
        private updateBtnHint;
        /**功能开启刷新按钮*/
        private onOpenFuncUpdate;
        /**功能关闭移除按钮*/
        private onOpenFuncDelete;
        private getWonderfulActTimeStr;
        update(time: base.Time): void;
        private onRankUpdate;
        /**浴火重生 */
        private checkYhcs;
        /**战力转盘 */
        private checkLottery;
        /**精彩活动特殊开启判断 */
        private checkWonderful;
        /** */
        private onUpdateTimeOpen;
        private onCheckPunshListBtn;
        private getPunshListBtnShow;
        private onUpdatePunshList;
        private onClickPunshList;
        private onUpdateFirst;
        private onClickXiandi;
        private showGuide;
        private onActivityInit;
        private onActivityEntranceUpdate;
        private updateTopActivity;
        private updateBigActivity;
        private updateGroupBigY;
        private getGroupBigY;
        /**************************系统公吿***************************/
        private updateNotice;
        private updateNoticeVisible;
        private showNotice;
        private checkNextNotice;
        /**************************聊天***************************/
        private onClickChatBtn;
        private onClickChat;
        private updateChat;
        private updateChatList;
    }
}
declare namespace game.mod.activity {
    import chonglist_gift_data = msg.chonglist_gift_data;
    import chonglist_revelry_data = msg.chonglist_revelry_data;
    class PunshListModel {
        type: number;
        gifts: {
            [type: number]: chonglist_gift_data[];
        };
        datas: {
            [type: number]: chonglist_revelry_data[];
        };
        score: number;
        openIdxs: number[];
        surfaceType: number[];
        roleType: number[];
        openIdxToRankType: {
            [openidx: number]: number;
        };
        getOpenIdxByRankType: {
            [rankType: number]: number;
        };
        hintsByType: {
            [rankType: number]: string[];
        };
        getJumpIdxByType: {
            [rankType: number]: number;
        };
        getRankPowerByType: {
            [rankType: number]: string;
        };
        getRankTitleByType: {
            [rankType: number]: string;
        };
    }
}
declare namespace game.mod.activity {
    import chonglist_gift_data = msg.chonglist_gift_data;
    import GameNT = base.GameNT;
    import chonglist_revelry_data = msg.chonglist_revelry_data;
    import rank_info = msg.rank_info;
    import ChonglistGiftConfig = game.config.ChonglistGiftConfig;
    class PunshListProxy extends ProxyBase implements IPunshListProxy {
        private _model;
        readonly model: PunshListModel;
        initialize(): void;
        private s2c_chonglist_item_buy_gift;
        private s2c_chonglist_base_info;
        private s2c_chonglist_receive_reward;
        private s2c_update_chonglist_revelry_data;
        c2s_chonglist_item_buy_gift(type: number, index: number): void;
        c2s_chonglist_receive_reward(type: number, index: number): void;
        getGifts(type: number): chonglist_gift_data[];
        getGift(type: number, index: number): chonglist_gift_data;
        readonly type: number;
        readonly surfaceType: number[];
        readonly roleType: number[];
        getDatas(type: number): chonglist_revelry_data[];
        getData(type: number, index: number): chonglist_revelry_data;
        getRankTypeByOpenIdx(openIdx: number): number;
        readonly openIdxs: number[];
        getEndTime(): number;
        /**活动最后一天提示*/
        checkActTips(type: NotTipsType): void;
        getBigReward(cfg: ChonglistGiftConfig): number[];
        getRankStr(type: number): string;
        getRankScore(type: number): string;
        /**获取区间排行榜列表 参数为排名 需要-1转换索引 */
        getListBySection(rank: string): IRankSectionData[];
        /**无人上榜的空数组 参数为排名 */
        getNobodyListBySection(start: number, end: number): IRankSectionData[];
        getRankFirst(): rank_info;
        getRankList(type?: number): RankRewardRenderData[];
        onTaskUpdate(n: GameNT): void;
        private onUpdateHint;
        private setSurfaceHint;
        getSurfaceHintNodes(type: number): string[];
        getJumpIdxByType(type: number): number;
        getRankTitleByType(type: number): string;
        getOpenIdx(type: number): number;
    }
}
declare namespace game.mod.activity {
    import ChonglistGiftConfig = game.config.ChonglistGiftConfig;
    class PunshListGiftItem extends BaseGiftItemRender {
        protected lab_limit: eui.Label;
        protected grp_buy: eui.Group;
        protected img_lab: eui.Image;
        private _proxy;
        data: ChonglistGiftConfig;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        /**点击购买*/
        protected onClick(): void;
    }
}
declare namespace game.mod.activity {
    class PunshListGiftView extends eui.Component {
        img_bg: eui.Image;
        big_reward: game.mod.Icon;
        scroller: eui.Scroller;
        list: eui.List;
        timeItem: TimeItem;
        constructor();
    }
}
declare namespace game.mod.activity {
    import ChonglistTargetConfig = game.config.ChonglistTargetConfig;
    class PunshListItem extends BaseRenderer {
        private list;
        private grp;
        private _listData;
        private _proxy;
        data: ChonglistTargetConfig;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    class PunshListRankView extends RankView {
        lab_numstr: eui.Label;
        lab_numcnt: eui.Label;
        lab_rankstr: eui.Label;
        lab_ranknum: eui.Label;
        btn_go: Btn;
        grp_num: eui.Group;
    }
}
declare namespace game.mod.activity {
    import task_data = msg.task_data;
    class PunshListTaskItem extends BaseListenerRenderer {
        img_icon: eui.Image;
        lab_num: eui.Label;
        lab_desc: eui.Label;
        progressComp: ProgressBarComp;
        img_finished: eui.Image;
        btn_go: game.mod.Btn;
        data: task_data;
        protected onAddToStage(): void;
        private onClickGo;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    class PunshListView extends eui.Component {
        grp_progress: eui.Group;
        progress_bg: eui.Image;
        progress: eui.Image;
        lab_score: eui.Label;
        btn_1: Btn;
        btn_2: Btn;
        btn_3: Btn;
        btn_4: Btn;
        src_task: eui.Scroller;
        list_task: eui.List;
        list: eui.List;
        timeItem: TimeItem;
        constructor();
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class PunshListGiftMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    class PunshListMainMdr extends WndBaseMdr {
        private _proxy;
        protected _btnData: WndBaseViewData[];
        protected onInit(): void;
        protected onShow(): void;
        protected onTabCheck(index: number): boolean;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class PunshListMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        private _scoreData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onUpdateProgress;
        private onTaskUpdate;
        private onUpdateTask;
        private onClickBtn;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class PunshListRankMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onRankUpdate;
        private initShow;
        private updateShow;
        update(time: base.Time): void;
        private updateTime;
        private reqRankInfo;
        private onClickBtn;
    }
}
declare namespace game.mod.activity {
    class PunshListRankSectionMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _section;
        _showArgs: {
            rank: string;
            list: IRankSectionData[];
            strRank: string;
            strScore: string;
        };
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onRankUpdate;
    }
}
declare namespace game.mod.activity {
    class PunshListShopMdr extends ExchangeShopMdr {
        protected setType(): void;
    }
}
declare namespace game.mod.activity {
    import prerogative_writ_infos = msg.prerogative_writ_infos;
    class PrerogativeWritModel {
        /**特权令信息，存在代表已购买*/
        info: {
            [type: number]: prerogative_writ_infos;
        };
        hintPath: string[];
    }
}
declare namespace game.mod.activity {
    import GameNT = base.GameNT;
    import prerogative_writ_infos = msg.prerogative_writ_infos;
    /**
     * @description 特权令系统
     */
    class PrerogativeWritProxy extends ProxyBase implements IPrerogativeWritProxy {
        private _model;
        readonly model: PrerogativeWritModel;
        initialize(): void;
        c2s_prerogative_writ_get(type: PrerogativeWritType): void;
        s2c_prerogative_writ_info(n: GameNT): void;
        /**================================= 协议end =================================*/
        getDailyReward(type: PrerogativeWritType): number[][];
        getRewardShow(type: PrerogativeWritType): number[][];
        private _productIdMap;
        getProductId(type: PrerogativeWritType): number;
        isPayBought(type: PrerogativeWritType): boolean;
        isReceived(type: PrerogativeWritType): boolean;
        getInfo(type: PrerogativeWritType): prerogative_writ_infos;
        getReceivedDay(type: PrerogativeWritType): number;
        /**特权令是否全部购买了*/
        isAllBought(): boolean;
        /**================================= hint =================================*/
        getHint(type: PrerogativeWritType): boolean;
        updateHint(): void;
    }
}
declare namespace game.mod.activity {
    import role_ring_info = msg.role_ring_info;
    class RoleRingModel {
        infos: role_ring_info[];
        hints: string[][];
    }
}
declare namespace game.mod.activity {
    class RoleRingProxy extends ProxyBase implements IRoleRingProxy {
        private _model;
        readonly model: RoleRingModel;
        initialize(): void;
        /**
         * 领取奖励
         * */
        c2s_role_ring_receive(type: number, act_event: number): void;
        /**
         * 培育操作
         * */
        c2s_role_ring_foster(type: number, act_event: number): void;
        private s2c_role_ring_data;
        private s2c_role_ring_update;
        private getInfoPos;
        private getInfo;
        getStatus(type: number): number;
        /**主角光环是否激活*/
        isRoleRingAct(type?: number): boolean;
        getKillReward(type: number): number[];
        getValue(type: number): number;
        getIndex(type: number): number;
        getYaoqiStatus(type: number): number;
        getYaoqiValue(type: number): number;
        private updateHintOfType1;
        getTypeHint(type: number): boolean;
        getEggHint(type: number): boolean;
        getHintType(pos: number): string[];
        /**更新红点*/
        updateHint(): void;
        protected onBagUpdateByPropIndex(n: base.GameNT): void;
        private checkGodOpen;
    }
}
declare namespace game.mod.activity {
    class RoleRingExp extends BaseRenderer {
        img_mark: eui.Image;
        group_eft1: eui.Group;
        group_eft2: eui.Group;
        labelDisplay: eui.Label;
        private _eftIdx1;
        private _eftIdx2;
        protected onRemoveFromStage(): void;
        private clearAllEft;
        private clearEft1;
        private clearEft2;
        private addEft1;
        private addEft2;
        updateShow(val: number, max: number): void;
    }
}
declare namespace game.mod.activity {
    import YaodiRandomConfig = game.config.YaodiRandomConfig;
    class RoleRingRewardItem extends BaseRenderer {
        img_type: eui.Image;
        lab_desc: eui.Label;
        list_reward: eui.List;
        data: YaodiRandomConfig;
        private _rewardList;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    class RoleRingUpView extends eui.Component {
        secondPop: SecondPop;
        grp_eff: eui.Group;
        btn_reward: Btn;
        lab_desc: eui.Label;
        bar: ProgressBarComp;
        lab_val: eui.Label;
        lab_charge: eui.Label;
        btn_up: Btn;
        constructor();
    }
}
declare namespace game.mod.activity {
    class RoleRingView extends eui.Component {
        img_bg: eui.Image;
        img_surface: eui.Image;
        lab_desc: eui.Label;
        grp_exp: eui.Group;
        bar: RoleRingExp;
        redPoint1: eui.Image;
        grp_egg: eui.Group;
        grp_eft: eui.Group;
        img_type: eui.Image;
        redPoint2: eui.Image;
        item: CoinItem;
        lab_add: eui.Label;
        img_num: eui.Image;
        scr: eui.Scroller;
        img_txt: eui.Image;
        btn_god: Btn;
        btn_reward: Btn;
        img_get: eui.Image;
        lab_act: eui.Label;
        list_type: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    class PrerogativeWritItem extends BaseListenerRenderer {
        img_icon: eui.Image;
        redPoint: eui.Image;
        data: {
            type: PrerogativeWritType;
            hint: boolean;
        };
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    class PrerogativeWritView extends eui.Component {
        nameItem: game.mod.AvatarNameSrItem;
        gr_eff: eui.Group;
        list_reward: eui.List;
        btn_do: game.mod.Btn;
        lb_day: eui.Label;
        list_btn: eui.List;
        img_received: eui.Image;
        img_desc: eui.Image;
        img_wenan: eui.Image;
        btnTipsBase: game.mod.BtnTipsBase;
        constructor();
    }
}
declare namespace game.mod.activity {
    class RoleRingMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.activity {
    class RoleRingMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _btnList;
        private _selType; /**当前选中的类型*/
        private _lastSelType; /**上一次选中的类型*/
        private _canDraw;
        private _isAct;
        private _canDrawExp;
        private _eftIdEgg;
        private _eftStrEgg;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickExp;
        private onClickEgg;
        private onClickGod;
        private onClickReward;
        private onClickType;
        private onInfoUpdate;
        private initTypeList;
        private setSelType;
        private updateViewState;
        private typeUpdateInfo;
        private updateTypeShow;
        private updateShow;
        private updateModel;
        private removeEffectEgg;
        private updateReward;
        /** 通用红点事件监听 */
        private onHintUpdate;
    }
}
declare namespace game.mod.activity {
    class RoleRingRewardMdr extends MdrBase {
        private _view;
        private _itemList;
        private _proxy;
        protected _showArgs: number;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateItemList;
    }
}
declare namespace game.mod.activity {
    class RoleRingUpMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        protected _showArgs: number;
        private _effId;
        private _lastIndex;
        private _canDraw;
        private _cost;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickUp;
        private onClickReward;
        private onInfoUpdate;
        private updateShow;
        private updateModel;
        updateInfo(): void;
    }
}
declare namespace game.mod.activity {
    class PrerogativeWritMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listBtn;
        private _listReward;
        private _selIdx;
        private _effIdx;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateBtnList;
        private updateView;
        private updateModel;
        private onClickListBtn;
        private onClick;
    }
}
declare namespace game.mod.activity {
    import DailySignConfig = game.config.DailySignConfig;
    class SignGiftItem extends BaseListenerRenderer {
        icon: game.mod.Icon;
        img_done: eui.Image;
        gr_num: eui.Group;
        lb_num: eui.Label;
        img_gray: eui.Image;
        private _proxy;
        data: ISignGiftItemData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
        updateData(ary: number[]): void;
    }
    interface ISignGiftItemData {
        cfg: DailySignConfig;
        state: number;
    }
}
declare namespace game.mod.activity {
    class SignGiftMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateBigReward;
    }
}
declare namespace game.mod.activity {
    class SignGiftModel {
        /**签到的索引集合*/
        list: number[];
        /**当前可签到的索引*/
        index: number;
        /**已总共签到的天数*/
        count: number;
    }
}
declare namespace game.mod.activity {
    /**
     * @description 签到有礼系统
     */
    class SignGiftProxy extends ProxyBase {
        private _model;
        readonly model: SignGiftModel;
        initialize(): void;
        /** 签到 */
        c2s_sign(index: number): void;
        /** 签到信息 */
        private s2c_sign_info;
        /**是否已签到*/
        isSigned(index: number): boolean;
        getHint(): boolean;
        updateHint(): void;
    }
}
declare namespace game.mod.activity {
    class SignGiftView extends eui.Component {
        secondPop: game.mod.SecondPop;
        icon_bigReward: game.mod.activity.SignGiftItem;
        lb_signDay: eui.Label;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    class FuchenlinghuModel {
        type: number;
        up: number;
        count: number;
        forever_count: number;
        total_count: number;
        zengli_data: number[];
        free_baozang_data: number[];
        buy_baozang_data: number[];
        leichong_data: number[];
        gift_data: msg.buy_gift_data[];
        extraProps: {
            [type: number]: number[][];
        };
        isHundred: boolean;
        hintPath: {
            [btnType: string]: string[];
        };
        leichongHintPath: string[];
        libaoHintPath: string[];
    }
}
declare namespace game.mod.activity {
    import GameNT = base.GameNT;
    import Handler = base.Handler;
    /**
     * @description 浮尘灵壶系统
     */
    class FuchenlinghuProxy extends ProxyBase implements IFuchenlinghuProxy {
        private _model;
        initialize(): void;
        getOperHandler(cnt: CommonCountType): Handler;
        getOperHandlerSpecial(): Handler;
        /**
         * @param oper 1召唤（1单抽 2十连 3百连） 2切换卡池（类型） 3许愿（索引） 4特殊卡池召唤 5赠礼奖励 6宝藏奖励 7累充奖励 8礼包
         * @param param
         * @param ex_param oper==6使用 1领取免费档 2领取付费
         */
        c2s_linghu_oper(oper: FuchenlinghuOperType, param?: number, ex_param?: number): void;
        private s2c_linghu_info;
        /**============================= 协议end =============================*/
        isHundred: boolean;
        readonly type: SeaType;
        readonly up: number;
        readonly total_count: number;
        getShowProps(type: SeaType): number[][];
        getUpProps(type: SeaType): number[][];
        getExtraProps(seaType: SeaType): number[][];
        getCostIds(): number[];
        getCost(type: CommonCountType): number[];
        getCostSpecial(): number[];
        getShowHundredCost(): number;
        isShowHundredCheckBox(type: SeaType): boolean;
        getZhaohuanCnt(type: SeaType): number;
        getUpIndex(type: SeaType): number;
        getGuaranteeCnt(): number;
        isOpenSea(seaType: SeaType, isTips?: boolean): boolean;
        canZhaohuan(seaType: SeaType, countType?: CommonCountType, isTips?: boolean): boolean;
        getSeaNameByType(seaType: SeaType): string;
        canXianling(seaType: SeaType, isTips?: boolean): boolean;
        canXianlingAllType(): boolean;
        getZengliStatus(index: number): RewardStatus;
        getZengliHint(index: number): boolean;
        getBaozangStatus(index: number, isFree?: boolean): RewardStatus;
        getBaozangHint(index: number, isFree?: boolean): boolean;
        getLeichongStatus(index: number): RewardStatus;
        getLibaoBoughtCnt(index: number): number;
        getLibaoStatus(index: number): RewardStatus;
        /**============================= hint start =============================*/
        private updateHint;
        private updateFuchenlinghuHint;
        private updateZengliHint;
        private updateBaozangHint;
        private updateLeichongHint;
        private updateLibaoHint;
        protected onBagUpdateByPropIndex(n: GameNT): void;
        protected onRoleUpdate(n: GameNT): void;
        protected onOpenFuncUpdate(n: GameNT): void;
        protected onSeaInfoUpdate(n: GameNT): void;
    }
}
declare namespace game.mod.activity {
    import draw_itype_luck_gift_data = msg.draw_itype_luck_gift_data;
    import teammate = msg.teammate;
    import draw_fengyun_data = msg.draw_fengyun_data;
    import draw_gift_data = msg.draw_gift_data;
    class SummonModel {
        /**当前mdr*/
        mdrType: number;
        /**当前抽奖类型 */
        type: number | CommonCountType;
        /**总抽取数 */
        count: number;
        /**积分 */
        score: number;
        /**非酋积分 */
        unluck_score: number;
        /**最小幸运值 */
        min_luck_score: number;
        /**最大幸运值 */
        max_luck_score: number;
        /**排行榜结束时间 */
        end_time: number;
        /**我的排行属性 */
        my_data: teammate;
        /**此次抽奖欧气值(用于抽奖界面显示) */
        luck_num: number;
        /**命运豪礼各类型豪礼数据 */
        gift_list: {
            [key: number]: draw_itype_luck_gift_data;
        };
        /**排行榜数据 */
        rank_list: teammate[];
        /**风云录数据 */
        list: draw_fengyun_data[];
        /**礼券数据 */
        item_list: draw_gift_data[];
    }
}
declare namespace game.mod.activity {
    class CarnivalMibaoView extends eui.Component {
        timeItem: game.mod.TimeItem;
        img_line1: eui.Image;
        img_line2: eui.Image;
        img_line3: eui.Image;
        img_line4: eui.Image;
        img_line5: eui.Image;
        img_line6: eui.Image;
        img_line7: eui.Image;
        img_line8: eui.Image;
        item1: CarnivalMibaoRender;
        item2: CarnivalMibaoRender;
        item3: CarnivalMibaoRender;
        item4: CarnivalMibaoRender;
        item5: CarnivalMibaoRender;
        item6: CarnivalMibaoRender;
        item7: CarnivalMibaoRender;
        item8: CarnivalMibaoRender;
        item9: CarnivalMibaoRender;
        costItem: TopCoinItem;
        lab_tips: eui.Label;
        constructor();
    }
}
declare namespace game.mod.activity {
    import TreasureboxConfig = game.config.TreasureboxConfig;
    import GameNT = base.GameNT;
    /**
     * @description 召唤-宝藏系统
     */
    class SummonTreasureProxy extends ProxyBase {
        private _hintPath;
        initialize(): void;
        c2s_baozangbox_onekey_open(index?: number): void;
        canOpenOneKey(): boolean;
        getConfig(index: number): TreasureboxConfig;
        getCondStr(): string;
        canOneKey(isTips?: boolean): boolean;
        canOneKeyByIndex(index: number, isTips?: boolean): boolean;
        getAllHint(): boolean;
        private updateHint;
        protected onBagUpdateByBagType(n: GameNT): void;
    }
}
declare namespace game.mod.activity {
    import prop_tips_data = msg.prop_tips_data;
    class SummonCardItem extends BaseRenderer {
        data: prop_tips_data;
        /**卡片背面 */
        private card_cons;
        /**卡片正面背景*/
        private card_pros;
        private icon;
        private gr_pros;
        private img_title;
        private grp_eff;
        private isSkip;
        private isSurface;
        private delay_idx;
        private readonly bigsize;
        private readonly default;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onInit;
        setData(data: prop_tips_data): void;
        setTween(isSkip?: boolean): void;
        private onBeginTween;
        private callbackTween;
        private onEndTween;
        private onSetEff;
        private onShowShake;
        private onTweenEnd;
        private onShowEft1;
        private onShowEft3;
        private onSendOver;
        setSkip(): void;
        private clearDelayIdx;
    }
}
declare namespace game.mod.activity {
    class SummonEffectView extends eui.Component {
        img_bg: eui.Image;
        btn_back: Btn;
        btn_again: Btn;
        lab_num: eui.Label;
        cost: CostIcon;
        card_0: SummonCardItem;
        card_1: SummonCardItem;
        card_2: SummonCardItem;
        card_3: SummonCardItem;
        card_4: SummonCardItem;
        card_5: SummonCardItem;
        card_6: SummonCardItem;
        card_7: SummonCardItem;
        card_8: SummonCardItem;
        card_9: SummonCardItem;
        card_10: SummonCardItem;
        grp_eff: eui.Group;
        grp_eff2: eui.Group;
        constructor();
    }
}
declare namespace game.mod.activity {
    class SummonGiftItem extends BaseGiftItemRender {
        data: ISummonGiftData;
        protected dataChanged(): void;
        protected onClick(): void;
    }
}
declare namespace game.mod.activity {
    class SummonGiftView extends eui.Component {
        secondPop: SecondPop;
        img_bg: eui.Image;
        lab_count: eui.Label;
        lab_tips: eui.Label;
        img_type: eui.Image;
        list: eui.List;
        list_type: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    import DrawGiftConfig = game.config.DrawGiftConfig;
    class SummonIconShopItem extends BaseRenderer {
        private icon;
        private btn;
        private img_bought;
        private lab_name;
        private lab_limit;
        data: DrawGiftConfig;
        private _proxy;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.activity {
    class SummonRankGodRender extends BaseListenerRenderer {
        lab_title: eui.Label;
        head: game.mod.Head;
        lab_name: eui.Label;
        btn_check: game.mod.Btn;
        list_reward: eui.List;
        img_get: eui.Image;
        btn_get: game.mod.Btn;
        data: ISummonFengYunData;
        private _itemList;
        protected onAddToStage(): void;
        protected onClickCheck(): void;
        protected onClickGet(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    class SummonView extends eui.Component {
        img_bg: eui.Image;
        icon: Icon;
        gr: eui.Group;
        group_eft: eui.Group;
        checkbox: eui.CheckBox;
        grp_havecount: eui.Group;
        grp_count: eui.Group;
        gr_eft: eui.Group;
        img_must: eui.Image;
        img_card: eui.Image;
        img_zhekou: eui.Image;
        cost_once: CostIcon;
        cost_ten: CostIcon;
        cost: CostIcon;
        btn_once: Btn;
        btn_ten: Btn;
        btn_exchange: game.mod.Btn;
        btn_gift: game.mod.Btn;
        btn_rank: game.mod.Btn;
        btn_zhanling: Btn;
        btn_gain: Btn;
        btn_explain: Btn;
        head: HeadVip;
        lab_name: eui.Label;
        btn_carnival: game.mod.Btn;
        lab_carnival: eui.Label;
        img_ditu1: eui.Image;
        img_ditu2: eui.Image;
        constructor();
    }
}
declare namespace game.mod.activity {
    class ActivityMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.activity {
    class FuchenlinghuRefreshItem extends BaseListenerRenderer {
        list: eui.List;
        img_type: eui.Image;
        gr_gray: eui.Group;
        img_type1: eui.Image;
        data: SeaType;
        private _listData;
        private _proxy;
        private _seaProxy;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    class FuchenlinghuRefreshView extends eui.Component {
        secondPop: game.mod.SecondPop;
        btn: game.mod.Btn;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    class FuchenlinghuView extends eui.Component {
        cost1: game.mod.CostIcon;
        cost10: game.mod.CostIcon;
        btn1: game.mod.Btn;
        btn10: game.mod.Btn;
        checkBox: eui.CheckBox;
        lb_num: eui.Label;
        btn_rule: game.mod.Btn;
        btn_reward: game.mod.Btn;
        btn_xianling: game.mod.Btn;
        icon0: game.mod.Icon;
        icon1: game.mod.Icon;
        icon2: game.mod.Icon;
        icon3: game.mod.Icon;
        icon4: game.mod.Icon;
        icon5: game.mod.Icon;
        icon6: game.mod.Icon;
        avatarBaseItem: game.mod.AvatarBaseItem;
        btn_refresh: game.mod.Btn;
        img_gain: eui.Image;
        btn_refresh1: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.activity {
    class FuchenlinghuWishView extends eui.Component {
        secondPop: game.mod.SecondPop;
        btn: game.mod.Btn;
        scr: eui.Scroller;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    class FuchenlinghuXianlingView extends eui.Component {
        costIcon: game.mod.CostIcon;
        icon0: game.mod.Icon;
        icon1: game.mod.Icon;
        icon2: game.mod.Icon;
        icon3: game.mod.Icon;
        icon4: game.mod.Icon;
        icon5: game.mod.Icon;
        gr_eff: eui.Group;
        rect: eui.Rect;
        btn_refresh: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.activity {
    import HuanjingBaozangConfig = game.config.HuanjingBaozangConfig;
    class HuanjingBaozangItem extends BaseListenerRenderer {
        icon: game.mod.IconGot;
        list: eui.List;
        btn_do0: game.mod.Btn;
        btn_do1: game.mod.Btn;
        img_got0: eui.Image;
        img_got1: eui.Image;
        lab_val: eui.Label;
        bar: game.mod.VProgressBar;
        thumbTop: eui.Image;
        thumb: eui.Image;
        scr: eui.Scroller;
        data: IHuanjingBaozangItemData;
        private _listData;
        private _proxy;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClickBtn0;
        private onClickBtn1;
        private jumpFunc;
    }
    interface IHuanjingBaozangItemData {
        cfg: HuanjingBaozangConfig;
        /**状态，免费奖励*/
        freeStatus: RewardStatus;
        /**状态，付费奖励*/
        payStatus: RewardStatus;
        /**当前进度值*/
        val: number;
        /**上个配置的值 */
        before: number;
        /**下一个目标值 */
        next: number;
    }
}
declare namespace game.mod.activity {
    class HuanjingBaozangView extends eui.Component {
        iconBigReward: game.mod.IconBigReward;
        timeItem: game.mod.TimeItem;
        lb_cnt: eui.Label;
        scr: eui.Scroller;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    class SummonTreasureBoxView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list: eui.List;
        costIcon: game.mod.CostIcon;
        btn_onekey: game.mod.Btn;
        img_icon: eui.Image;
        scroller: eui.Scroller;
        constructor();
    }
}
declare namespace game.mod.activity {
    import TreasureboxConfig = game.config.TreasureboxConfig;
    class SummonTreasureItem extends BaseRenderer {
        img_eft: eui.Image;
        img_icon: eui.Image;
        redPoint: eui.Image;
        gr_eft: eui.Group;
        bar: game.mod.ProgressBarComp;
        data: TreasureboxConfig;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.activity {
    import TreasureboxConfig = game.config.TreasureboxConfig;
    class SummonTreasureList extends BaseListenerRenderer {
        list: eui.List;
        private _listData;
        data: TreasureboxConfig[];
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    class SummonTreasureTipsView extends eui.Component {
        propTips: game.mod.BasePropTips;
        descItem: game.mod.BaseDescItem;
        list: eui.List;
        btn_go: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.activity {
    class SummonTreasureView extends eui.Component {
        scroller: eui.Scroller;
        list: eui.List;
        btn_onekey: game.mod.Btn;
        treasureItem: game.mod.activity.SummonTreasureItem;
        img_cond: eui.Image;
        constructor();
    }
}
declare namespace game.mod.activity {
    /**
     * 召唤特效界面，需传入 SummonEffectData
     */
    class SummonEffectMdr extends EffectMdrBase {
        private _view;
        private _listData;
        private _isTween;
        private _idxTween;
        private _len;
        private _count;
        private _skip;
        private posArr;
        _showArgs: SummonEffectData;
        constructor();
        protected onInit(): void;
        private onInitPos;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateData;
        private onClickAgain;
        private onUpdateView;
        private onUpdataShake;
        private onTween;
        private onSkip;
        private onStart;
        private onCheckOver;
        private onUpdateOver;
        private onOver;
        protected onHide(): void;
    }
}
declare namespace game.mod.activity {
    class SummonExchangeMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        protected onShow(): void;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class SummonExchangeMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateList;
        update(time: base.Time): void;
        private onUpdateTime;
        protected onHide(): void;
    }
}
declare namespace game.mod.activity {
    class SummonGiftMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        protected onShow(): void;
    }
}
declare namespace game.mod.activity {
    import ItemTapEvent = eui.ItemTapEvent;
    class SummonGiftMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _btnList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateType;
        private onUpdateView;
        protected onTabChanged(e: ItemTapEvent): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.activity {
    class SummonMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        protected onShow(): void;
        protected onTabCheck(index: number): boolean;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class SummonMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _isHund;
        private _eftId_sel;
        private _rankTime;
        private _actInfo;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateBtn;
        private onUpdateMust;
        private isCheck;
        private onClickSummon;
        private onClickSummonTen;
        private reqSummon;
        private onJumpExchange;
        private onJumpGift;
        private onJumpRank;
        private onClickGain;
        private onClickZhanling;
        private onClickPreview;
        private onCheckBox;
        private onUpdateTenBtn;
        private onUpdateHint;
        protected onHide(): void;
        private showGuide;
        /**********************************狂欢庆典**********************************/
        private onClickCarnival;
        /** 通用中控活动事件监听 */
        private onActivityUpdateByType;
        private updateCarnival;
        update(time: base.Time): void;
        private updateTime;
    }
}
declare namespace game.mod.activity {
    class SummonRankGodMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateItemList;
    }
}
declare namespace game.mod.activity {
    class SummonRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        protected onShow(): void;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class SummonRankMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onJumpGod;
        protected onHide(): void;
        private onRankUpdate;
        private initShow;
        private updateShow;
        update(time: base.Time): void;
        private updateTime;
        private onUpdateHint;
        private reqRankInfo;
    }
}
declare namespace game.mod.activity {
    class SummonRankSectionMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _proxy;
        private _section;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onRankUpdate;
    }
}
declare namespace game.mod.activity {
    /**召唤系统命运豪礼 */
    class SummonSecondMdr extends WndSecondMdr {
        private _proxy;
        protected onInit(): void;
        protected _btnData: WndBaseViewData[];
        protected onTabCheck(index: number): boolean;
        protected onHide(): void;
    }
}
declare namespace game.mod.activity {
    /**浮尘灵壶*/
    class FuchenlinghuMdr extends MdrBase {
        private _view;
        private _proxy;
        private _seaType;
        private _isHundred;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateIcon;
        private updateCost;
        private onClickCheckbox;
        private onClickAvatarBaseItem;
        private onClickBtnXianling;
        private onClickBtnRule;
        private onClickBtnReward;
        private onClickBtnRefresh;
        private onClickChange;
        private onClickBtn1;
        private onClickBtn10;
        private onClickGain;
        private updateXianlingHint;
        private onBagUpdateByPropIndex;
    }
}
declare namespace game.mod.activity {
    class FuchenlinghuRefreshMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _selIdx;
        private _seaType;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClick;
        private onClickList;
    }
}
declare namespace game.mod.activity {
    class FuchenlinghuWishMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _seaType;
        private _selIdx;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickBtn;
        private onClickList;
    }
}
declare namespace game.mod.activity {
    class FuchenlinghuXianlingMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _seaType;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateCost;
        private onClick;
        private onClickChange;
        private onBagUpdateByPropIndex;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    /**幻境宝藏*/
    class HuanjingBaozangMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    import HuanjingZengliConfig = game.config.HuanjingZengliConfig;
    class HuanjingZengliItem extends BaseGiftItemRender {
        data: IHuanjingZengliItemData;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        protected onClick(): void;
    }
    interface IHuanjingZengliItemData {
        cfg: HuanjingZengliConfig;
        status: RewardStatus;
        cnt: number;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    /**幻境赠礼*/
    class HuanjingZengliMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    import TreasureboxConfig = game.config.TreasureboxConfig;
    class SummonTreasureBoxMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        _showArgs: TreasureboxConfig;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateCost;
        private onClick;
        private onBagUpdateByBagType;
        private showEft;
    }
}
declare namespace game.mod.activity {
    class SummonTreasureMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickTreasure;
        private onClickOneKey;
        private onBagUpdateByBagType;
    }
}
declare namespace game.mod.activity {
    class SummonTreasureTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        _showArgs: PropData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClick;
    }
}
declare namespace game.mod.activity {
    class SupremeGitMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.activity {
    import supreme_git_info = msg.supreme_git_info;
    class SupremeGitModel {
        infos: supreme_git_info[];
        hintType: string[];
    }
}
declare namespace game.mod.activity {
    import GameNT = base.GameNT;
    class SupremeGitProxy extends ProxyBase {
        private _model;
        initialize(): void;
        private s2c_supreme_git_info;
        hasBuy(productId: number): boolean;
        canAllBuy(): boolean;
        getHint(productId: number): boolean;
        private updateHint;
        /**功能开启刷新按钮*/
        protected onOpenFuncUpdate(n: GameNT): void;
    }
}
declare namespace game.mod.activity {
    import xian_chi_qi_yuan_struct = msg.xian_chi_qi_yuan_struct;
    class XianchiModel {
        layer: number;
        rewards: xian_chi_qi_yuan_struct[];
        hintType: string[];
    }
}
declare namespace game.mod.activity {
    import GameNT = base.GameNT;
    import prop_tips_data = msg.prop_tips_data;
    class XianchiProxy extends ProxyBase {
        private _model;
        initialize(): void;
        c2s_xian_chi_qi_yuan_click(type: number): void;
        private s2c_xian_chi_qi_yuan_info;
        getReward(index: number): prop_tips_data;
        getCost(): number[];
        getLayerRewardIndex(): number;
        hasDraw(layer: number): boolean;
        canDraw(): boolean;
        readonly hintType: string[];
        private updateHint;
        private checkHint;
        /** 通用背包事件监听 */
        protected onBagUpdateByPropIndex(n: GameNT): void;
    }
}
declare namespace game.mod.activity {
    class SupremeGitItem extends BaseRenderer {
        img_icon: eui.Image;
        redPoint: eui.Image;
        gr_font: eui.Group;
        data: number;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    class SupremeGitView extends eui.Component {
        list_item: eui.List;
        list_reward: eui.List;
        img_bought: eui.Image;
        btn_buy: Btn;
        btn_last: Btn;
        btn_next: Btn;
        img_allBought: eui.Image;
        btn_allBuy: Btn;
        coinItem: game.mod.CoinItem;
        lab_text: eui.Label;
        img_item: eui.Image;
        img_lab: eui.Image;
        gr_font: eui.Group;
        constructor();
    }
}
declare namespace game.mod.activity {
    import prop_tips_data = msg.prop_tips_data;
    class XianchiItem extends eui.ItemRenderer {
        icon: game.mod.Icon;
        data: prop_tips_data;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    import XianchiRewardConfig = game.config.XianchiRewardConfig;
    class XianchiRewardItem extends BaseListenerRenderer {
        private lab_desc;
        private list_reward;
        private img_draw;
        private _proxy;
        private _rewardList;
        data: XianchiRewardConfig;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    class XianchiRewardView extends eui.Component {
        secondPop: SecondPop;
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    class XianchiView extends eui.Component {
        btn_rule: Btn;
        btn_reward: Btn;
        btn_big: Btn;
        item1: XianchiItem;
        item2: XianchiItem;
        item3: XianchiItem;
        item4: XianchiItem;
        item5: XianchiItem;
        item6: XianchiItem;
        item7: XianchiItem;
        item8: XianchiItem;
        item9: XianchiItem;
        cost: CostIcon;
        btn_draw: Btn;
        lab_tips: eui.Label;
        constructor();
    }
}
declare namespace game.mod.activity {
    class SupremeGitMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _selIndex;
        private _selProductId;
        private _list_item;
        private _list_reward;
        private _canAllBuy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onInfoUpdate;
        private updateImg;
        private onClickLast;
        private onClickNext;
        private onClickItem;
        private onClickBuy;
        private onClickAllBuy;
        private initShow;
        private getSelIndex;
        private autoSel;
        private setSelIndex;
        private updateItemList;
        private getItems;
        private indexUpdateInfo;
        private updateReward;
        private updateBuy;
        private updateAllBuy;
        private updateBtn;
    }
}
declare namespace game.mod.activity {
    class XianchiMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _cost;
        private _itemList;
        private _canDraw;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickRule;
        private onClickReward;
        private onClickBig;
        private onClickDraw;
        private onInfoUpdate;
        /** 通用背包事件监听 */
        private onBagUpdateIndex;
        /** 通用红点事件监听 */
        private onHintUpdate;
        private initShow;
        private updateTips;
        private updateCost;
        private updateItemList;
        private updateHint;
    }
}
declare namespace game.mod.activity {
    class XianchiRewardMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateItemList;
    }
}
declare namespace game.mod.activity {
    class TongtiangeMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        private _proxy;
        protected onInit(): void;
        protected onTabChanged(): void;
        private onActivityClose;
    }
}
declare namespace game.mod.activity {
    class TongtiangeModel {
        first_data: msg.teammate;
        role_list: {
            [layer: number]: msg.teammate;
        };
        rank_no: number;
        rank_value: number;
        role_rank_list: {
            [rankNo: number]: msg.teammate;
        };
        guild_rank_list: {
            [rankNo: number]: msg.teammate;
        };
        my_build_num: number;
        guild_build_num: number;
        role_challenge_list: {
            [index: number]: msg.attic_challenge_data;
        };
        guild_challenge_list: {
            [index: number]: msg.attic_challenge_data;
        };
        stage_list: {
            [round: number]: msg.attic_reward_stage_data;
        };
        exchange_list: {
            [index: number]: msg.attic_exchange_data;
        };
        login_reward_list: {
            [index: number]: msg.attic_Login_reward;
        };
        gift_list: {
            [index: number]: msg.attic_gift_data;
        };
        last_rank_no: number;
        last_build_cnt: number;
        last_role_list: {
            [rankNo: number]: msg.teammate;
        };
        last_guild_list: {
            [rankNo: number]: msg.teammate;
        };
        hintPath: {
            [type: number]: string[];
        };
    }
}
declare namespace game.mod.activity {
    import GameNT = base.GameNT;
    import oper_act_item = msg.oper_act_item;
    import teammate = msg.teammate;
    import AtticChallengeConfig = game.config.AtticChallengeConfig;
    /**
     * @description 通天阁系统
     */
    class TongtiangeProxy extends ProxyBase {
        private _model;
        giftLoginHint: boolean;
        minRankNo: number;
        readonly model: TongtiangeModel;
        initialize(): void;
        /**
         * 请求摘星楼界面
         * @param type 1.首次打开界面2.进行滑动
         * @param start 起始层
         * @param end 结束层
         */
        c2s_attic_storey_show(type: number, start?: number, end?: number): void;
        private s2c_attic_storey_show;
        /**
         * 请求通天阁排行界面
         * @param type 1.个人2.宗门
         * @param start 默认请求1
         * @param end 默认请求3
         */
        c2s_attic_rank_show(type: number, start?: number, end?: number): void;
        private s2c_attic_rank_show;
        c2s_attic_build(type: number): void;
        private s2c_attic_build;
        private s2c_attic_role_info;
        private s2c_update_attic_challenge_data;
        c2s_attic_guild_challenge_show(): void;
        private s2c_attic_guild_challenge_show;
        c2s_attic_exchange(index: number, place: number): void;
        private s2c_attic_exchange;
        private s2c_update_attic_login_reward;
        c2s_attic_get_reward(type: number, index: number): void;
        c2s_attic_item_buy_gift(index: number): void;
        private s2c_attic_item_buy_gift;
        /**
         * 请求通天阁上一期排行界面
         * @param type 1.个人2.宗门
         * @param start 起始层
         * @param end 结束层
         */
        c2s_attic_done_rank_show(type: number, start?: number, end?: number): void;
        private s2c_attic_done_rank_show;
        /**================================= 协议end =================================*/
        protected onOpenFuncUpdate(n: GameNT): void;
        protected onOpenFuncInit(n: GameNT): void;
        protected onActivityInit(n: GameNT): void;
        protected onActivityUpdateByType(n: GameNT): void;
        checkOpen(): void;
        getActId(isRank?: boolean): number;
        getActData(isRank?: boolean): oper_act_item;
        isOpen(): boolean;
        getEndTime(): number;
        /**活动最后一天提示*/
        checkActTips(type: NotTipsType): void;
        private _buildCost;
        getBuildCost(isTen?: boolean): number[];
        canBuild(isTen?: boolean, isTips?: boolean): boolean;
        getLoginStatus(index: number): RewardStatus;
        getGiftLimitCnt(index: number): number;
        getGiftLeftCnt(index: number): number;
        getGiftBoughtCnt(index: number): number;
        private _previewRewardMap;
        getPreviewRewards(type: number): number[][];
        getTopPlayerInfo(): teammate;
        getBuildCnt(isGuild?: boolean): number;
        getRankNo(): number;
        getRankCnt(isGuild?: boolean): number;
        getChallengeCfgByType(type: number): {
            [index: number]: AtticChallengeConfig;
        };
        private _maxPersonalType;
        private getMaxPersonalType;
        private _personChallengeCfg;
        getPersonChallengeCfg(stage: number): AtticChallengeConfig[];
        private _totalStage;
        getTotalStage(): number;
        getDoneStage(): number;
        private isStageDone;
        getCurStage(): number;
        getPreStagesCnt(): number;
        getPersonChallengeStatus(index: number): RewardStatus;
        getGuildChallengeStatus(index: number): RewardStatus;
        getStageHint(stage: number): boolean;
        getExchangeMaxCnt(): number;
        getExchangeBoughtCnt(index: number, pos: number): number;
        getExchangeStatus(index: number, pos: number): number;
        canExchange(curIndex: number, isTips?: boolean): boolean;
        isLayerActed(layer: number, isTips?: boolean): boolean;
        private updateHint;
        private updateHint1;
        private updateHint2;
        private updateHint3;
        canBuyGift(index: number): boolean;
        isSoldOut(): boolean;
        updateHint4(): void;
        getExchangeLayerHint(layer: number): boolean;
        private updateHint5;
        private updateHint6;
        protected onBagUpdateByPropIndex(n: GameNT): void;
        protected onRoleUpdate(n: GameNT): void;
        private _autoBuildVip;
        getAutoBuildVip(): number;
    }
}
declare namespace game.mod.activity {
    import teammate = msg.teammate;
    class TongtiangeItem1 extends BaseListenerRenderer {
        lb_layer: eui.Label;
        lb_name: eui.Label;
        head: game.mod.Head;
        data: teammate;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    import AtticChallengeConfig = game.config.AtticChallengeConfig;
    class TongtiangeItem2 extends BaseGiftItemRender {
        data: ITongtiangeItemData2;
        private _tongtiangeProxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        protected onClick(): void;
    }
    interface ITongtiangeItemData2 {
        type: TongtiangeRankType;
        cfg: AtticChallengeConfig;
        status: RewardStatus;
        val: number;
    }
}
declare namespace game.mod.activity {
    import AtticGiftConfig = game.config.AtticGiftConfig;
    class TongtiangeItem4 extends BaseListenerRenderer {
        img_bg: eui.Image;
        img_icon: eui.Image;
        lb_limit: eui.Label;
        list: eui.List;
        img_bought: eui.Image;
        btn_buy: game.mod.Btn;
        private _listData;
        private _proxy;
        private _cost;
        data: AtticGiftConfig;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        onClick(): void;
        private getRewards;
        private getIcon;
    }
}
declare namespace game.mod.activity {
    import AtticLoginConfig = game.config.AtticLoginConfig;
    class TongtiangeItem6 extends BaseGiftItemRender {
        data: {
            cfg: AtticLoginConfig;
            status: RewardStatus;
        };
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        protected onClick(): void;
    }
}
declare namespace game.mod.activity {
    class TongtiangeLayerItem extends BaseRenderer {
        img_layer: eui.Image;
        img_type: eui.Image;
        redPoint: eui.Image;
        group_eft: eui.Group;
        private _layer;
        constructor();
        protected dataChanged(): void;
        updateSel(isSel?: boolean): void;
    }
    interface ITongtiangeLayerItemData {
        layer: number;
        isSel: boolean;
        showHint?: boolean;
    }
}
declare namespace game.mod.activity {
    import prop_tips_data = msg.prop_tips_data;
    import teammate = msg.teammate;
    class TongtiangeRankItem extends BaseListenerRenderer {
        img_rank: eui.Image;
        lab_rank: eui.Label;
        lab_name: eui.Label;
        lab_power: eui.Label;
        lab_num: eui.Label;
        private list_reward;
        data: ITongtiangeRankItemData;
        private _listData;
        private _proxy;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
    interface ITongtiangeRankItemData {
        rewards: prop_tips_data[];
        type: TongtiangeRankType;
        teammate?: teammate;
        rankNo?: number;
        rankRange?: number[];
        isShow?: boolean;
    }
}
declare namespace game.mod.activity {
    import AtticExchangeConfig = game.config.AtticExchangeConfig;
    class TongtiangeRewardItem extends BaseListenerRenderer {
        icon: game.mod.Icon;
        lb_limit: eui.Label;
        img_bought: eui.Image;
        btn_do: game.mod.Btn;
        data: ITongtiangeRewardItemData;
        private _proxy;
        private _cost;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
    interface ITongtiangeRewardItemData {
        cfg: AtticExchangeConfig;
        status: RewardStatus;
        maxCnt: number;
        boughtCnt: number;
    }
}
declare namespace game.mod.activity {
    class TongtiangeStageItem extends eui.Component {
        lb_desc: eui.Label;
        list: eui.List;
        img_status: eui.Image;
        btn_do: game.mod.Btn;
        private _proxy;
        private _listData;
        private _curStage;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        updateView(curStage: number): void;
        private onClick;
    }
}
declare namespace game.mod.activity {
    class TongtiangeView1 extends eui.Component {
        timeItem: game.mod.TimeItem;
        scroller: eui.Scroller;
        list: eui.List;
        btn_rank: game.mod.Btn;
        head: game.mod.Head;
        btn_reward: game.mod.Btn;
        btn_rule: game.mod.Btn;
        lb_desc: eui.Label;
        costIconOne: game.mod.CostIcon;
        btn_build: game.mod.Btn;
        costIconTen: game.mod.CostIcon;
        btn_buildten: game.mod.Btn;
        checkBox: eui.CheckBox;
        img_gain: eui.Image;
        lb_name: eui.Label;
        lb_checkboxcond: eui.Label;
        constructor();
    }
}
declare namespace game.mod.activity {
    class TongtiangeView2 extends eui.Component {
        timeItem: game.mod.TimeItem;
        list: eui.List;
        lb_stage: eui.Label;
        stageItem: game.mod.activity.TongtiangeStageItem;
        btn_left: game.mod.Btn;
        btn_right: game.mod.Btn;
        img_banner: eui.Image;
        constructor();
    }
}
declare namespace game.mod.activity {
    class TongtiangeView4 extends eui.Component {
        img_banner: eui.Image;
        list: eui.List;
        timeItem: game.mod.TimeItem;
        constructor();
    }
}
declare namespace game.mod.activity {
    class TongtiangeView5 extends eui.Component {
        list: eui.List;
        timeItem: game.mod.TimeItem;
        line0: game.mod.CommonLine;
        line1: game.mod.CommonLine;
        line2: game.mod.CommonLine;
        line3: game.mod.CommonLine;
        line4: game.mod.CommonLine;
        line5: game.mod.CommonLine;
        layer0: game.mod.activity.TongtiangeLayerItem;
        layer1: game.mod.activity.TongtiangeLayerItem;
        layer2: game.mod.activity.TongtiangeLayerItem;
        layer3: game.mod.activity.TongtiangeLayerItem;
        layer4: game.mod.activity.TongtiangeLayerItem;
        layer5: game.mod.activity.TongtiangeLayerItem;
        layer6: game.mod.activity.TongtiangeLayerItem;
        constructor();
    }
}
declare namespace game.mod.activity {
    class TongtiangeLastRankMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        _showArgs: any[];
        private _maxRankNo;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateView;
        private onListChange;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class TongtiangeMdr1 extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        private _reqNext;
        private _isClickCheckBox;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateViewByScroller;
        private onUpdateViewByBuildSuccess;
        private updateScrollerPos;
        private updateBuildCnt;
        private updateCost;
        private onClickRank;
        private onClickReward;
        private onClickRule;
        private onClickBuild;
        private onClickBuildTen;
        private onClickCheckBox;
        private sendBuild;
        private onClickGain;
        private onClickVip;
        private onListChange;
        update(time: base.Time): void;
        private onBagUpdateByPropIndex;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class TongtiangeMdr2 extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        private _curStage;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateStageView;
        private onClickLeft;
        private onClickRight;
        private updateBtnHint;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class TongtiangeMdr3 extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class TongtiangeMdr4 extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class TongtiangeMdr5 extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        private _curLayer;
        private _layerItemAry;
        private _lineItemAry;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateLayerView;
        private updateListData;
        private onClickLayer;
        update(time: base.Time): void;
        private onRoleUpdate;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class TongtiangeMdr6 extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    class TongtiangeRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class TongtiangeRankMdr1 extends EffectMdrBase implements UpdateItem {
        protected _view: RankView;
        protected _proxy: TongtiangeProxy;
        protected _endTime: number;
        /**1个人排名，2宗门排名*/
        protected _type: TongtiangeRankType;
        protected _listData: eui.ArrayCollection;
        protected _maxRankNum: number;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateModel;
        private _rewardList;
        private getRewardList;
        private updateListData;
        private updateRankLabel;
        private getTopPlayer;
        update(time: base.Time): void;
        private onClickLastRank;
    }
    class TongtiangeRankMdr2 extends TongtiangeRankMdr1 {
        /**1个人排名，2宗门排名*/
        protected _type: TongtiangeRankType;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class TongtiangeRankSectionMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        /**0是排行榜类型，1是排名范围*/
        _showArgs: any[];
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateView;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    class WonderfulActMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        /**更新list数据*/
        protected updateBtnList(): void;
        private checkShow;
        private onWonderfulActClose;
    }
}
declare namespace game.mod.activity {
    import TiannvchargeWealConfig = game.config.TiannvchargeWealConfig;
    class WonderfulActModel {
        /** 领取状态  0未领取   1已领取 */
        status: number;
        /** 开启时间戳 */
        open_time: number;
        /**藏珍阁*/
        box_list: {
            [index: number]: msg.cangzhenge_struct;
        };
        /** 大奖状态 0未开启   1已开启 */
        big_box_status: number;
        act_id_czg: number;
        /**连续充值*/
        list_keepcharge: {
            [type: number]: msg.keepcharge_data;
        };
        act_id_keepcharge: number;
        /**累计充值*/
        list_addcharge: {
            [index: number]: msg.keepcharge_struct;
        };
        /** 充值累计金额 */
        num_addcharge: number;
        act_id_addcharge: number;
        /**登录活动*/
        list_login: {
            [index: number]: msg.keepcharge_struct;
        };
        act_id_login: number;
        num_login: number;
        count: number;
        hintPath: {
            [type: number]: string[];
        };
        hintPath1: {
            [1]: (ModName | MainActivityViewType | MdrTabBtnType | WonderfulActMainBtnType)[];
            [2]: (ModName | MainActivityViewType | MdrTabBtnType | WonderfulActMainBtnType)[];
        };
        /********************************天女赐福&&VIP5福利****************************************/
        infos: {
            [type: number]: msg.s2c_tired_charge_info;
        };
        tiannvCfgs: {
            [valueType: number]: TiannvchargeWealConfig[];
        };
        tiannvValueTypes: number[];
        tiannvHint: string[];
        vipHint: string[];
    }
}
declare namespace game.mod.activity {
    import GameNT = base.GameNT;
    import oper_act_item = msg.oper_act_item;
    import s2c_tired_charge_info = msg.s2c_tired_charge_info;
    import TiannvchargeWealConfig = game.config.TiannvchargeWealConfig;
    import VipChargeConfig = game.config.VipChargeConfig;
    /**
     * @description 精彩活动
     */
    class WonderfulActProxy extends ProxyBase {
        private _model;
        readonly model: WonderfulActModel;
        initialize(): void;
        c2s_xiannv_gift_get_rewards(): void;
        private s2c_xiannv_gift_info;
        c2s_jingcai_cangzhenge_open(index: number): void;
        private s2c_jingcai_cangzhenge_info;
        c2s_jingcai_keepcharge_get_rewards(index: number): void;
        private s2c_jingcai_keepcharge_info;
        c2s_jingcai_addcharge_get_rewards(index: number): void;
        private s2c_jingcai_addcharge_info;
        c2s_jingcai_login_get_rewards(index: number): void;
        private s2c_jingcai_login_info;
        c2s_luckbless_button_click(button_type: number): void;
        private s2c_luckbless_info;
        private _xiannvTimeObjList;
        getXiannvTimeObjList(): {
            h: number;
            m: number;
        }[];
        private getXiannvTimeSecondList;
        inXiannvActTime(): boolean;
        canGetXiannvReward(): boolean;
        getXiannvNextTimeSec(): number;
        getCzgRewardGottenCnt(): number;
        getCzgRewardMaxCnt(): number;
        canOpenCzgReward(index: number, isTips?: boolean): boolean;
        getActDataByType(type: ActivityType): oper_act_item;
        getActData(act_id: number): oper_act_item;
        getActId(type: ActivityType): number;
        getEndTimeSec(type: ActivityType): number;
        canOpen(type: ActivityType): boolean;
        canGetLoginReward(index: number): boolean;
        getKeepChargeStatus(type: number, index: number): number;
        private _czgCostId;
        private _cfgOneId;
        private _cfgTenId;
        getCountOne(): number;
        getCountTen(): number;
        getCzgCostId(): number;
        protected onBagUpdateByPropIndex(n: GameNT): void;
        private updateHint6;
        oneIsHasHint(): boolean;
        tenIsHasHint(): boolean;
        private updateHint1;
        private updateHint2;
        private updateHint3;
        private updateHintOther;
        getKeepChargeRmb(): number[];
        /********************************天女赐福&&VIP5福利****************************************/
        c2s_tired_charge_receive(type: number, index: number): void;
        private s2c_tired_charge_info;
        private s2c_tired_charge_update;
        getInfo(type: number): s2c_tired_charge_info;
        getEndTime(type: number): number;
        getRmb(type: number): number;
        private getRewardList;
        private checkOpen;
        isTiannvOpen(): boolean;
        isVipOpen(): boolean;
        private initTiannvCfgs;
        getValueTypes(): number[];
        getTiannvCfgs(valueType: number): TiannvchargeWealConfig[];
        hasDraw(type: number, index: number): boolean;
        canTiannvDraw(cfg: TiannvchargeWealConfig): boolean;
        canVipDraw(cfg: VipChargeConfig): boolean;
        getTiannvHintByValueType(valueType: number): boolean;
        private checkTiannvHint;
        private updateTiannvHint;
        private updateVipHint;
        private checkVipHint;
        private checkTiannvClose;
        private onTiannvClose;
        private checkVipClose;
        private onVipClose;
        /**功能开启刷新按钮*/
        protected onOpenFuncUpdate(n: GameNT): void;
    }
}
declare namespace game.mod.activity {
    import HuanjingLeichongConfig = game.config.HuanjingLeichongConfig;
    class HuanjingLeichongItem extends BaseGiftItemRender {
        data: IHuanjingLeichongItemData;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        protected onClick(): void;
    }
    interface IHuanjingLeichongItemData {
        cfg: HuanjingLeichongConfig;
        status: RewardStatus;
    }
}
declare namespace game.mod.activity {
    import HuanjingGiftConfig = game.config.HuanjingGiftConfig;
    class HuanjingLibaoItem extends BaseListenerRenderer {
        lb_desc: eui.Label;
        list: eui.List;
        img_bought: eui.Image;
        btn_buy: game.mod.Btn;
        lb_cnt: eui.Label;
        data: IHuanjingLibaoItemData;
        private _listData;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        protected onClick(): void;
    }
    interface IHuanjingLibaoItemData {
        cfg: HuanjingGiftConfig;
        status: RewardStatus;
        boughtCnt: number;
    }
}
declare namespace game.mod.activity {
    class TiannvWelfareItem extends BaseRenderer {
        btn_box: game.mod.Btn;
        gr_font: eui.Group;
        private _proxy;
        data: number;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickBox;
        setBox(icon: string): void;
    }
}
declare namespace game.mod.activity {
    import TiannvchargeWealConfig = game.config.TiannvchargeWealConfig;
    class TiannvWelfareRewardItem extends BaseListenerRenderer {
        private list_reward;
        private img_status;
        private btn_draw;
        private _rewardList;
        private _proxy;
        data: TiannvchargeWealConfig;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickDraw;
    }
}
declare namespace game.mod.activity {
    class TiannvWelfareRewardView extends eui.Component {
        secondPop: SecondPop;
        list_item: eui.List;
        lab_tips: eui.Label;
        constructor();
    }
}
declare namespace game.mod.activity {
    class TiannvWelfareView extends eui.Component {
        timeItem: game.mod.TimeItem;
        icon_bigreward: IconBigReward;
        item1: TiannvWelfareItem;
        item2: TiannvWelfareItem;
        item3: TiannvWelfareItem;
        item4: TiannvWelfareItem;
        item5: TiannvWelfareItem;
        constructor();
    }
}
declare namespace game.mod.activity {
    import VipChargeConfig = game.config.VipChargeConfig;
    class VipWelfareItem extends BaseListenerRenderer {
        lab_desc: eui.Label;
        list_reward: eui.List;
        private img_draw;
        private btn_draw;
        private _rewardList;
        private _proxy;
        data: {
            cfg: VipChargeConfig;
            canDraw: boolean;
            hasDraw: boolean;
        };
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickDraw;
    }
}
declare namespace game.mod.activity {
    class VipWelfareView extends eui.Component {
        timeItem: game.mod.TimeItem;
        icon_bigreward: IconBigReward;
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    class WonderfulActIcon extends BaseListenerRenderer {
        img_icon: eui.Image;
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    import act_reward = msg.act_reward;
    class WonderfulActItem4 extends BaseListenerRenderer {
        lb_desc: eui.Label;
        list: eui.List;
        img_bought: eui.Image;
        btn_do: game.mod.Btn;
        data: IWonderfulActItemData;
        protected _listData: eui.ArrayCollection;
        protected _proxy: WonderfulActProxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        protected updateItemView(): void;
        protected onClick(): void;
    }
    class WonderfulActItem5 extends WonderfulActItem4 {
        protected dataChanged(): void;
        protected updateItemView(): void;
        protected onClick(): void;
    }
    interface IWonderfulActItemData {
        type: ActivityType;
        info: act_reward;
        val: number;
        status: number;
    }
}
declare namespace game.mod.activity {
    class WonderfulActRewardView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list: eui.List;
        list1: eui.List;
        lb_prob: eui.Label;
        lb_prob1: eui.Label;
        constructor();
    }
}
declare namespace game.mod.activity {
    class WonderfulActView1 extends eui.Component {
        list: eui.List;
        btn_do: game.mod.Btn;
        lb_time: eui.Label;
        gr_time: eui.Group;
        timeItem: game.mod.TimeItem;
        constructor();
    }
}
declare namespace game.mod.activity {
    class WonderfulActView2 extends eui.Component {
        list: eui.List;
        timeItem: game.mod.TimeItem;
        icon_bigreward: game.mod.IconReward;
        bar: game.mod.ProgressBarComp;
        btn_rule: game.mod.Btn;
        btn_reward: game.mod.Btn;
        lb_desc: eui.Label;
        img_reward2: eui.Image;
        costIcon: game.mod.CostIcon;
        btn_add: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.activity {
    class WonderfulActView3 extends eui.Component {
        icon_bigreward: game.mod.Icon;
        lb_chargenum: eui.Label;
        timeItem: game.mod.TimeItem;
        list: eui.List;
        list_btn: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    class WonderfulActView4 extends eui.Component {
        gr_bigreward: eui.Group;
        icon_bigreward: game.mod.Icon;
        timeItem: game.mod.TimeItem;
        list: eui.List;
        img_banner: eui.Image;
        constructor();
    }
}
declare namespace game.mod.activity {
    class WonderfulActView6 extends eui.Component {
        btn_once: Btn;
        btn_ten: Btn;
        cost_ten: CostIcon;
        cost_once: CostIcon;
        btn_gain: Btn;
        btn_explain: Btn;
        lab: eui.Label;
        icon_1: Icon;
        icon_2: Icon;
        icon_3: Icon;
        icon_4: Icon;
        color_1: eui.Image;
        color_2: eui.Image;
        color_3: eui.Image;
        color_4: eui.Image;
        constructor();
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    /**幻境累充*/
    class HuanjingLeichongMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        update(time: base.Time): void;
        private onRoleUpdate;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    /**幻境礼包*/
    class HuanjingLibaoMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class TiannvWelfareMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _itemList;
        private _type;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initShow;
        update(time: base.Time): void;
        private updateTime;
        private updateItemList;
    }
}
declare namespace game.mod.activity {
    class TiannvWelfareRewardMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        protected _showArgs: number;
        private _type;
        private _valueType;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onInfoUpdate;
        private updateItemList;
        private updateTips;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class VipWelfareMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _itemList;
        private _type;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initShow;
        update(time: base.Time): void;
        private updateTime;
        private updateItemList;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class WonderfulActMdr1 extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateView;
        private getFormatTimeStr;
        private onUpdateView;
        protected onHide(): void;
        update(time: base.Time): void;
        private onClick;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class WonderfulActMdr2 extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        private _cost;
        private _bigData;
        private _type;
        protected onInit(): void;
        protected addListeners(): void;
        private onActivityClose;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateCost;
        private onClickReward;
        private onClickRule;
        private onClickAdd;
        private onClickBigReward;
        private onClickList;
        update(time: base.Time): void;
        private onUpdateByPropIndex;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class WonderfulActMdr3 extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _endTime;
        private _listData;
        private _type;
        private _listBtn;
        private _bigType;
        protected onInit(): void;
        protected addListeners(): void;
        private onActivityClose;
        protected onShow(): void;
        protected onHide(): void;
        private getEndTime;
        private onUpdateView;
        private updateView;
        update(time: base.Time): void;
        private onSwitchType;
        private onClickBtn;
        private updateBtnHint;
    }
}
declare namespace game.mod.activity {
    import act_reward = msg.act_reward;
    class CarnivalRankRender extends BaseListenerRenderer {
        private img_rank;
        private lab_rank;
        private lab_name;
        private lab_look;
        private lab_power;
        private lab_num;
        private list_reward;
        private _rewardList;
        private _proxy;
        private _carnivalProxy;
        data: act_reward;
        private _start;
        private _end;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.activity {
    class WonderfulActMdr5 extends WonderfulActMdr4 {
        protected _type: ActivityType;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected updateView(): void;
    }
}
declare namespace game.mod.activity {
    class WonderfulActMdr6 extends MdrBase {
        protected _view: WonderfulActView6;
        protected _proxy: WonderfulActProxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateCount;
        private onClick;
        private onClickGain;
        private onClickPreview;
    }
}
declare namespace game.mod.activity {
    class WonderfulActRewardMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _listData1;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.activity {
    /**
     * @description 仙侣礼包系统
     */
    class XianlvGiftProxy extends ProxyBase {
        info: number[];
        private _hintType;
        private _hint;
        initialize(): void;
        c2s_xianlv_libao(): void;
        private s2c_xianlv_libao;
        isBought(type?: number): boolean;
        private updateHint;
        hint: boolean;
    }
}
declare namespace game.mod.activity {
    class XianlvGiftView extends eui.Component {
        list: eui.List;
        img_bought: eui.Image;
        btn_buy: game.mod.Btn;
        btn_close: game.mod.Btn;
        img_name0: eui.Image;
        img_name1: eui.Image;
        img_name2: eui.Image;
        img_desc0: eui.Image;
        img_desc1: eui.Image;
        btn1: game.mod.Btn;
        btn2: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.activity {
    class XianlvGiftMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _type;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickBuy;
        private onClickBtn1;
        private onClickBtn2;
        private switchType;
    }
}
declare namespace game.mod.activity {
    class YjjsFirstMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.activity {
    class YjjsMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        protected onShow(): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.activity {
    class YjjsModel {
        /**三生修练*/
        sansheng_target_list: msg.yaoji_target[];
        /**三世危机*/
        sanshi_target_list: msg.yaoji_target[];
        sanshi_stage: number;
        sanshi_count: number;
        /**神器修炼*/
        shenqi_count: number;
        /**瑶姬宝库*/
        baoku_list: msg.yaoji_baoku[];
        /**累充礼包*/
        charge_list: msg.yaoji_target[];
        /**目标豪礼*/
        haoli_list: number[];
        /**瑶姬令*/
        ling_list: msg.yaoji_target[];
        ling_list2: {
            [index: number]: msg.yaoji_target;
        };
        ling_day: number;
        is_ling_buy: boolean;
        hintPath: {
            [type: number]: string[];
        };
    }
}
declare namespace game.mod.activity {
    import GameNT = base.GameNT;
    import yaoji_target = msg.yaoji_target;
    import yaoji_baoku = msg.yaoji_baoku;
    import TotalCumulativeConfig = game.config.TotalCumulativeConfig;
    import TotalTargetConfig = game.config.TotalTargetConfig;
    import TotalFubenConfig = game.config.TotalFubenConfig;
    /**
     * @description 瑶姬降世系统
     */
    class YjjsProxy extends ProxyBase implements IYjjsProxy {
        private _model;
        clickDrawReward: boolean;
        clickDay: number;
        readonly model: YjjsModel;
        initialize(): void;
        private s2c_yaoji_sansheng_info;
        private s2c_yaoji_sanshi_info;
        c2s_yaoji_shenqi_challenge(): void;
        private s2c_yaoji_shenqi_info;
        private s2c_yaoji_baoku_info;
        private s2c_yaoji_charge_info;
        private s2c_yaoji_haoli_info;
        private s2c_yaoji_ling_info;
        /**
         * 奖励领取
         * @param type 1.三生修炼2.三世危机4.累充礼包5.目标豪礼6.瑶姬令
         * @param index 奖励索引
         */
        c2s_yaoji_receive_reward(type: number, index: number): void;
        /**
         * 达成次数奖励领取
         * @param type 1.三生修炼2.三世危机
         * @param index 奖励索引
         */
        c2s_yaoji_target_reward(type: number, index: number): void;
        /**
         * 购买奖励
         * @param type 3.瑶姬宝库5.目标豪礼
         * @param index 奖励索引
         * @param count 购买次数
         */
        c2s_yaoji_buy(type: number, index: number, count?: number): void;
        /**================================= 协议end =================================*/
        getCurDay(): number;
        private getEndDay;
        isOpenByDay(day: number): boolean;
        isOpen(): boolean;
        isTaskFinishedByDay(day: number): boolean;
        isTaskReceivedByDay(day: number): boolean;
        getDrawDay(): number;
        private getNotFinishDay;
        /**
         * 当前选择天数页签
         * 显示按状态优先级：可领取＞未完成＞已领取；在同状态下天数越早优先级越高
         */
        getSelDay(): number;
        getEndTime(): number;
        /**三生修炼*/
        getSanshengTaskListByDay(day: number): number[];
        getSanShengTaskFinishedCntByDay(day: number): number;
        /**三世危机*/
        getSanShiTaskListByStage(stage: number): any[];
        /**
         * 获取进度条奖励信息
         * @param type 1三生修炼，2三世危机
         * @param idx
         */
        getTargetInfo(type: number, idx: number): yaoji_target;
        /**
         * 获取完成的任务数量
         */
        getFinishedTaskCnt(): number;
        getFinishedTaskCnt2(): number;
        /**
         * 获取进度总数
         * @param type 1三生修炼，2三世危机
         */
        getTotalTaskCnt(type: number): number;
        private _fubenCfgAry;
        getFubenCfgList(): TotalFubenConfig[];
        getFubenCfg(): TotalFubenConfig;
        getFubenMaxLv(): number;
        isFubenMax(): boolean;
        /**神器--能否挑战*/
        canChallengeShenqi(isTips?: boolean): boolean;
        getStoreInfo(index: number): yaoji_baoku;
        getChargeCfgList(): TotalCumulativeConfig[];
        getChargeCfgByIdx(index: number): TotalCumulativeConfig;
        getChargeInfo(index: number): yaoji_target;
        getHaoliCfgList(): TotalTargetConfig[];
        getHaoliCfgByIdx(index: number): TotalTargetConfig;
        getHaoliStatus(index: number): number;
        /**
         * 获取进度
         * 1三生修炼 2三世危机 3神器修行 4瑶姬宝库 5累充礼包 6目标豪礼 7瑶姬令
         */
        getProgressVal(type: number): number[];
        /**============================== hint ==============================*/
        protected onTaskUpdate(n: GameNT): void;
        getHintByDay(day: number): boolean;
        private getBarIconHint;
        updateHint1(): void;
        getHintByStage(stage: number): boolean;
        updateHint2(): void;
        updateHint3(): void;
        updateHint4(): void;
        updateHint5(): void;
        updateHint6(): void;
        protected onUpdateGivingList(n: GameNT): void;
        getBtnStatus(): number;
        /**获取解锁战令不可领取奖励 */
        getReward(): PropData[];
        /**获取可领取奖励，解锁瑶姬令可获得奖励 */
        getRewardCanGet(): PropData[];
        /**根据引获取状态 */
        getStatusByTypeIndex(index: number): yaoji_target;
        updateHint7(): void;
        /**
         * 根据按钮类型获取红点
         * 1三生修炼 2三世危机 3神器修行 4瑶姬宝库 5累充礼包 6目标豪礼 7瑶姬令
         * @param type
         */
        getHintByBtnType(type: number): boolean;
        updateFirstMainHint(): void;
        checkOpen(): void;
    }
}
declare namespace game.mod.activity {
    class YjjsFirstView extends eui.Component {
        list: eui.List;
        timeItem: game.mod.TimeItem;
        constructor();
    }
}
declare namespace game.mod.activity {
    class YjjsView1 extends eui.Component {
        bar: game.mod.ProgressBarComp;
        barCnt0: game.mod.ProgressBarCntComp;
        barCnt1: game.mod.ProgressBarCntComp;
        barCnt2: game.mod.ProgressBarCntComp;
        barCnt3: game.mod.ProgressBarCntComp;
        lb_time: eui.Label;
        list_day: eui.List;
        list_item: eui.List;
        icon0: game.mod.IconGot;
        icon1: game.mod.IconGot;
        icon2: game.mod.IconGot;
        icon3: game.mod.IconGot;
        timeItem: game.mod.TimeItem;
        gr_font: eui.Group;
        scroller: eui.Scroller;
        barCntComp0: game.mod.ProgressBarCntComp2;
        barCntComp1: game.mod.ProgressBarCntComp2;
        barCntComp2: game.mod.ProgressBarCntComp2;
        barCntComp3: game.mod.ProgressBarCntComp2;
        constructor();
    }
}
declare namespace game.mod.activity {
    class YjjsView2 extends eui.Component {
        btn_god: game.mod.AttrGodItem;
        bar: game.mod.ProgressBarComp;
        barCnt0: game.mod.ProgressBarCntComp;
        barCnt1: game.mod.ProgressBarCntComp;
        barCnt2: game.mod.ProgressBarCntComp;
        icon0: game.mod.IconGot;
        icon1: game.mod.IconGot;
        icon2: game.mod.IconGot;
        list: eui.List;
        gr_eff: eui.Group;
        constructor();
    }
}
declare namespace game.mod.activity {
    class YjjsView3 extends eui.Component {
        lb_go: eui.Label;
        btn_challenge: game.mod.Btn;
        img_finished: eui.Image;
        icon: game.mod.Icon;
        gr_eff: eui.Group;
        lb_lvdesc: eui.Label;
        lb_vipdesc: eui.Label;
        list: eui.List;
        bar: game.mod.ProgressBarComp;
        gr_font: eui.Group;
        constructor();
    }
}
declare namespace game.mod.activity {
    class YjjsView4 extends eui.Component {
        lb_time: eui.Label;
        icon_bigreward: game.mod.Icon;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    class YjjsView5 extends eui.Component {
        lb_time: eui.Label;
        list: eui.List;
        icon_bigreward: game.mod.Icon;
        constructor();
    }
}
declare namespace game.mod.activity {
    class YjjsView6 extends eui.Component {
        icon: game.mod.Icon;
        lb_time: eui.Label;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    class YjjsDayItem extends BaseListenerRenderer {
        img_day: eui.Image;
        lb_progress: eui.Label;
        redPoint: eui.Image;
        data: IYjjsDayItemData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
    interface IYjjsDayItemData {
        hint: boolean;
        unlock: boolean;
        day: number;
        val: number;
        max: number;
        sel: boolean;
    }
}
declare namespace game.mod.activity {
    class YjjsFirstItem extends BaseListenerRenderer {
        img_bg: eui.Image;
        redPoint: eui.Image;
        coinItem: game.mod.CoinItem;
        gr_bar: eui.Group;
        bar: game.mod.ProgressBarComp;
        data: IYjjsFirstItemData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
    interface IYjjsFirstItemData {
        hint: boolean;
        val: number;
        max: number;
    }
}
declare namespace game.mod.activity {
    import task_data = msg.task_data;
    class YjjsItem1 extends BaseListenerRenderer {
        icon: game.mod.Icon;
        bar: game.mod.ProgressBarComp;
        btn_do: game.mod.Btn;
        lb_desc: eui.Label;
        img_done: eui.Image;
        data: task_data;
        private _jump;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.activity {
    import task_data = msg.task_data;
    class YjjsItem2 extends BaseListenerRenderer {
        lb_desc: eui.Label;
        lb_cond: eui.Label;
        img_done: eui.Image;
        btn_do: game.mod.Btn;
        icon: game.mod.Icon;
        data: task_data;
        private _jump;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.activity {
    import ShopConfig = game.config.ShopConfig;
    class YjjsItem4 extends IconShop {
        icon: game.mod.Icon;
        btn: game.mod.Btn;
        lab_name: eui.Label;
        lab_limit: eui.Label;
        img_bought: eui.Image;
        data: ShopConfig;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        protected updateLmtLab(left_cnt?: number, total_cnt?: number, str?: string): void;
        private getLeftCnt;
        protected onClickBuy(): void;
    }
}
declare namespace game.mod.activity {
    import TotalCumulativeConfig = game.config.TotalCumulativeConfig;
    class YjjsItem5 extends BaseListenerRenderer {
        lb_desc: eui.Label;
        list: eui.List;
        img_done: eui.Image;
        btn_do: game.mod.Btn;
        data: TotalCumulativeConfig;
        private _proxy;
        private _listData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.activity {
    import TotalTargetConfig = game.config.TotalTargetConfig;
    class YjjsItem6 extends BaseListenerRenderer {
        lb_cond: eui.Label;
        icon: game.mod.IconGot;
        btn_go: game.mod.Btn;
        btn_buy: game.mod.Btn;
        list: eui.List;
        img_got: eui.Image;
        img_got0: eui.Image;
        data: TotalTargetConfig;
        private _proxy;
        private _listData;
        private _status;
        private _jump;
        private _cost;
        private _reward;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private updateRightView;
        private onClickGo;
        private onClickBuy;
        private onConfirmFunc;
        private onClickIcon;
    }
}
declare namespace game.mod.activity {
    class YjjsItem7 extends BaseListenerRenderer {
        data: any;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class YjjsFirstMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _endTime;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickList;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class YjjsMdr1 extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listDay;
        private _listItem;
        private _endTime;
        private _curDay;
        private _iconGotList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateTask;
        private updateView;
        private updateTopView;
        private updateDayView;
        private updateItemView;
        private onClickDay;
        update(time: base.Time): void;
        private onClickIcon;
    }
}
declare namespace game.mod.activity {
    class YjjsMdr2 extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _curStage;
        private _iconGotList;
        private _effId;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateTask;
        private updateView;
        private updateListView;
        private onClickIcon;
    }
}
declare namespace game.mod.activity {
    class YjjsMdr3 extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _fubenCfg;
        private _effId;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickChallenge;
        private onClickGo;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class YjjsMdr4 extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _endTime;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class YjjsMdr5 extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _endTime;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class YjjsMdr6 extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _endTime;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateTask;
        private updateView;
        private updateBigReward;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.activity {
    /**
     * 瑶姬令
     * 协议没有整合
     */
    class YjjsMdr7 extends GameOrderMdr {
        protected _gameOrderType: GameOrderType;
        private _yjjsProxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected getEndTime(type: number): number;
        protected getBtnStatus(type: number): number;
        /**根据类型和索引获取状态 */
        private getStatusByTypeIndex;
        protected getListByType(type: number): IGameOrderItemData[];
        protected getIsBought(type: number): boolean;
        protected clickBtnStatus2(): void;
        /**购买后累计可领取*/
        getReward(): PropData[];
        /**现在购买立即领取*/
        getRewardCanGet(): PropData[];
        protected onUpdateView(): void;
        protected clickBtnStatus1(): void;
        /**获取可领取位置*/
        protected getPosByType(): number;
    }
}
declare namespace game.mod.activity {
    class YhcsModel {
        list: number[];
        num: number;
        open_day: number;
        isEnough: boolean;
    }
}
declare namespace game.mod.activity {
    import YuhuoRewardConfig = game.config.YuhuoRewardConfig;
    class YhcsProxy extends ProxyBase {
        private _model;
        readonly model: YhcsModel;
        initialize(): void;
        /**--------------------协议start-------------------- */
        c2s_yuhuochongsheng_get_rewards(index: number): void;
        private s2c_yuhuochongsheng_info;
        /**--------------------协议end-------------------- */
        /**获取奖励列表 */
        getList(): YuhuoRewardConfig[];
        /**是否充值达标 */
        readonly isEnough: boolean;
        /**是否已领取 */
        isReceived(index: number): boolean;
        /**用于判断活动图标隐藏 */
        isActivityEnd(): boolean;
        private onUpdateHint;
        isOpen(): boolean;
    }
}
declare namespace game.mod.activity {
    import YuhuoRewardConfig = game.config.YuhuoRewardConfig;
    class YhcsItem extends BaseGiftItemRender {
        data: YuhuoRewardConfig;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        protected onClick(): void;
    }
}
declare namespace game.mod.activity {
    class YhcsView extends eui.Component {
        list: eui.List;
        lab_tips: eui.Label;
        btn_recharge: Btn;
        constructor();
    }
}
declare namespace game.mod.activity {
    class YhcsMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.activity {
    import ArrayCollection = eui.ArrayCollection;
    class YhcsMdr extends EffectMdrBase {
        protected _view: YhcsView;
        protected _proxy: YhcsProxy;
        protected _listData: ArrayCollection;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onRecharge;
        protected onHide(): void;
    }
}
declare namespace game.mod.activity {
    import common_reward_status = msg.common_reward_status;
    class ZeroBuyModel {
        infos: common_reward_status[];
        index: number;
    }
}
declare namespace game.mod.activity {
    import GameNT = base.GameNT;
    import ZeroBuyConfig = game.config.ZeroBuyConfig;
    class ZeroBuyProxy extends ProxyBase implements IZeroBuyProxy {
        private _model;
        readonly model: ZeroBuyModel;
        initialize(): void;
        /**--------------------协议start-------------------- */
        private s2c_zero_buy_info;
        c2s_zero_buy_get(index: number): void;
        /**--------------------协议end-------------------- */
        /**列表 */
        getList(): ZeroBuyConfig[];
        /**获取状态 1已购买 2已返回奖励 */
        getStatusByIndex(index: number): number;
        protected onRoleUpdate(n: GameNT): void;
        /**更新红点 */
        private onUpdateHint;
        readonly isOpen: boolean;
        private checkOpen;
    }
}
declare namespace game.mod.activity {
    class ZeroBuyMainView extends eui.Component {
        scr: eui.Scroller;
        list: eui.List;
        img_next: eui.Image;
        img_before: eui.Image;
        constructor();
    }
}
declare namespace game.mod.activity {
    import ZeroBuyConfig = game.config.ZeroBuyConfig;
    class ZeroBuyRender extends BaseRenderer {
        private img_bg;
        private btn;
        private special_attr;
        private name_item;
        private lab_limit;
        private grp_eff;
        private list;
        private img_close;
        private img_got;
        private gr_font;
        data: ZeroBuyConfig;
        private _proxy;
        private _listData;
        private _effId;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClickClose;
        private onClick;
    }
}
declare namespace game.mod.activity {
    class ZeroBuyMainMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private readonly _width;
        private _showIdx;
        private _delay;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateIndex;
        private onUpdateItem;
        private onChange;
        private onUpdateChange;
        private onUpdateBtn;
        private onClickNext;
        private onClickBefore;
        /**滑动容器缓动 */
        private onTween;
        protected onHide(): void;
    }
}
declare namespace game.mod.activity {
    class ZcxMainMdr extends WndBaseMdr {
        private _proxy;
        private _gameOrderProxy;
        protected onInit(): void;
        private _firstBtnData;
        private _openBtnData;
        private _openBtnData2;
        protected updateBtnList(): void;
        private setBtnData;
    }
}
declare namespace game.mod.activity {
    import ZcxFundConfig = game.config.ZcxFundConfig;
    class ZcxModel {
        /** 幸运数字 */
        luck_num: number;
        /** 0不可领取   1可领取   2已领取 */
        status: number;
        /** 第x等奖   0表示未开奖 */
        rank_num: number;
        /** 字段value为幸运数字 */
        list: msg.teammate[];
        /** 存储的货币数 */
        value: Long;
        /** 收益重新开始的时间戳 */
        save_time: number;
        /** 收益道具 */
        item_list: msg.prop_tips_data[];
        /** 兑换列表 */
        exchange_list: {
            [index: number]: msg.zcx_exchange_data;
        };
        /** 副本--获得奖励记录 */
        records: msg.zcx_raid_record[];
        /** 副本--剩余可挑战次数 */
        count: number;
        /**============基金============*/
        fundMap: {
            [type: number]: msg.s2c_zcx_fund_update;
        };
        fundBoxShowMap: {
            [type: number]: number;
        };
        fundRewardShowMap: {
            [type: number]: number;
        };
        fundCfgMap: {
            [type: number]: ZcxFundConfig[];
        };
        hintPath: {
            [btnType: string]: string[];
        };
    }
}
declare namespace game.mod.activity {
    import GameNT = base.GameNT;
    import zcx_exchange_data = msg.zcx_exchange_data;
    import ZcxFubenConfig = game.config.ZcxFubenConfig;
    import ZcxFundConfig = game.config.ZcxFundConfig;
    /**
     * @description 招财仙系统
     */
    class ZcxProxy extends ProxyBase {
        private _model;
        readonly model: ZcxModel;
        initialize(): void;
        /** 幸运数字 */
        private s2c_zcx_luck_number;
        /** 1获得幸运数字  2领奖   3请求获奖名单 */
        c2s_get_zcx_luck_number(type: number): void;
        /** 进宝钱庄 */
        private s2c_zcx_coins_bank_info;
        /** 1为存   2为取 */
        c2s_zcx_coins_bank_button(type: number): void;
        /**进宝钱庄 领取收益*/
        c2s_zcx_coins_bank_get_rewards(): void;
        /** 兑换 */
        c2s_zcx_exchange_button(index: number, num: number): void;
        /**财神兑换*/
        private s2c_zcx_exchange_info;
        /**请求挑战财神副本*/
        c2s_zcx_raid_challenge(): void;
        private s2c_zcx_raid_info;
        /**================================ 协议end ================================*/
        getSixLuckNum(num: number): string;
        isOpen(): boolean;
        private _maxBankVal;
        getMaxBankVal(): number;
        isMaxBankSave(): boolean;
        canGetBankInterest(): boolean;
        getBankEndTime(): number;
        getExchangeInfo(index: number): zcx_exchange_data;
        getExchangeLeftCnt(index: number): number;
        canExchange(index: number): boolean;
        getCurFubenCfg(): ZcxFubenConfig;
        canChallenge(): boolean;
        getRandomNum(start: number, end: number): number;
        getRandomTipsStrKey(): string;
        getRandomName(): string;
        getRandomRewardTips(): string;
        getRecordTipStr(index: number): string;
        getRandomTipsStr(index: number): string;
        private _recordTipsAry;
        getRecordTips(index: number): string;
        private _rewardMap;
        getBankReward(coin: number): number[][];
        /**================================= hint =================================*/
        canGetLuckNum(): boolean;
        private _exchangeCostIds;
        /**兑换消耗id*/
        getExchangeCostIds(): number[];
        protected onBagUpdateByPropIndex(n: GameNT): void;
        private updateLuckNumHint;
        private updateBankHint;
        private updateFubenHint;
        private updateExchangeHint;
        /**============================ 基金start ============================*/
        c2s_zcx_fund_box_reward(type: ZcxFundType): void;
        c2s_zcx_fund_day_reward(type: ZcxFundType): void;
        c2s_zcx_fund_box_show(type: ZcxFundType): void;
        private s2c_zcx_fund_update;
        private s2c_zcx_fund_box_show;
        c2s_zcx_fund_reward_show(type: ZcxFundType): void;
        private s2c_zcx_fund_reward_show;
        getBoughtNum(type: ZcxFundType): number;
        getBoxStatus(type: ZcxFundType): RewardStatus;
        isBought(type: ZcxFundType): boolean;
        isReceiveToday(type: ZcxFundType): boolean;
        isReceiveAll(type: ZcxFundType): boolean;
        getReceiveStatus(type: ZcxFundType, day: number): RewardStatus;
        getFundCfgList(type: ZcxFundType): ZcxFundConfig[];
        getFundBoxReward(type: ZcxFundType): number[];
        getFundResetTime(type: ZcxFundType): number;
        getFundTargetNum(type: ZcxFundType): number;
        getFundProductId(type: ZcxFundType): number;
        getAllRewards(type: ZcxFundType): number[][];
        getRewardsAfterPay(type: ZcxFundType): number[][];
        protected onUpdateGivingList(n: GameNT): void;
        private updateGameorderHint;
        getFundHint(type: ZcxFundType): boolean;
        private updateFundHint;
    }
}
declare namespace game.mod.activity {
    class ZcxBuyTipsView extends eui.Component {
        secondPop: game.mod.SecondPop;
        icon: game.mod.Icon;
        btnView: game.mod.BuyBtnListView;
        btn_buy: game.mod.Btn;
        lb_name: eui.Label;
        lb_own: eui.Label;
        lb_stock: eui.Label;
        list_cost: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    class ZcxCoinItem extends BaseListenerRenderer {
        img_cost: eui.Image;
        lab_cost: eui.Label;
        data: number[];
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    class ZcxFirstBubbleItem extends eui.Component {
        lb_desc: eui.Label;
        constructor();
        updateView(txt: string): void;
    }
}
declare namespace game.mod.activity {
    class ZcxFirstItem extends BaseListenerRenderer {
        img_bg: eui.Image;
        bubbleItem: game.mod.activity.ZcxFirstBubbleItem;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
    interface IZCXFirstItemData {
        index: number;
        isSel: boolean;
    }
}
declare namespace game.mod.activity {
    class ZcxFirstView extends eui.Component {
        btn_act: game.mod.Btn;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    import ZcxFundConfig = game.config.ZcxFundConfig;
    class ZcxFundItem extends BaseListenerRenderer {
        icon: game.mod.Icon;
        lb_desc: eui.Label;
        img_got: eui.Image;
        img_gray: eui.Image;
        redPoint: eui.Image;
        data: IZcxFundItemData;
        constructor();
        protected dataChanged(): void;
    }
    interface IZcxFundItemData {
        cfg: ZcxFundConfig;
        status: RewardStatus;
    }
}
declare namespace game.mod.activity {
    class ZcxFundView extends eui.Component {
        btn_buy: game.mod.Btn;
        list: eui.List;
        btn_gift: game.mod.Btn;
        btnTipsBase: game.mod.BtnTipsBase;
        lb_desc: eui.Label;
        scroller: eui.Scroller;
        img_fundtype: eui.Image;
        img_baoxiang: eui.Image;
        gr_font1: eui.Group;
        gr_font2: eui.Group;
        constructor();
    }
}
declare namespace game.mod.activity {
    class ZcxIconItem extends Icon {
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    import ZcxLuckNumberConfig = game.config.ZcxLuckNumberConfig;
    class ZcxItem1 extends BaseListenerRenderer {
        list: eui.List;
        img_rank: eui.Image;
        data: ZcxLuckNumberConfig;
        private _listData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    class ZcxItem3 extends eui.Component {
        lb_desc: eui.Label;
        constructor();
        updateView(str: string): void;
    }
}
declare namespace game.mod.activity {
    import ZcxExchangeConfig = game.config.ZcxExchangeConfig;
    class ZcxItem4 extends BaseListenerRenderer {
        list: eui.List;
        icon_target: game.mod.Icon;
        btn_exchange: game.mod.Btn;
        lb_cnt: eui.Label;
        data: ZcxExchangeConfig;
        private _proxy;
        private _listData;
        private _leftCnt;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.activity {
    class ZcxView1 extends eui.Component {
        list: eui.List;
        btn_get: game.mod.Btn;
        gr_num: eui.Group;
        btn_winner: game.mod.Btn;
        lb_rank: eui.Label;
        gr_eff0: eui.Group;
        gr_eff1: eui.Group;
        gr_eff2: eui.Group;
        gr_eff3: eui.Group;
        gr_eff4: eui.Group;
        gr_eff5: eui.Group;
        lb0: eui.Label;
        lb1: eui.Label;
        lb2: eui.Label;
        lb3: eui.Label;
        lb4: eui.Label;
        lb5: eui.Label;
        redPoint: eui.Image;
        constructor();
    }
}
declare namespace game.mod.activity {
    class ZcxView2 extends eui.Component {
        gr_xianyu: eui.Group;
        list_reward: eui.List;
        lb_time: eui.Label;
        btn_get: game.mod.Btn;
        btn_save: game.mod.Btn;
        lb_interest: eui.Label;
        lb_saveDesc: eui.Label;
        btn_receive: game.mod.Btn;
        gr: eui.Group;
        timeItem: game.mod.TimeItem;
        constructor();
    }
}
declare namespace game.mod.activity {
    class ZcxView3 extends eui.Component {
        list: eui.List;
        btn_challenge: game.mod.Btn;
        gr: eui.Group;
        timeItem: game.mod.TimeItem;
        constructor();
    }
}
declare namespace game.mod.activity {
    class ZcxView4 extends eui.Component {
        icon_bigReward: game.mod.Icon;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.activity {
    class ZcxWinnerListView extends eui.Component {
        secondPop: game.mod.SecondPop;
        headVip: game.mod.HeadVip;
        lb_top: eui.Label;
        list: eui.List;
        constructor();
    }
    class ZcxWinnerItem extends BaseListenerRenderer {
        lb_name: eui.Label;
        lb_num: eui.Label;
        data: msg.teammate;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.activity {
    import ZcxExchangeConfig = game.config.ZcxExchangeConfig;
    class ZcxBuyTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _leftCnt;
        private _cost;
        _showArgs: ZcxExchangeConfig;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateCost;
        private onUpdateBuyCnt;
        private setCnt;
        private onClickBuy;
        private onClickList;
    }
}
declare namespace game.mod.activity {
    class ZcxFirstMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _curIdx;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateList;
        protected onHide(): void;
        private onClick;
        private onClickList;
        private onUpdateByFirstCharge;
    }
}
declare namespace game.mod.activity {
    class ZcxFuliMdr extends MdrBase {
        private _view;
        private _proxy;
        private _type;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClick;
    }
}
declare namespace game.mod.activity {
    class ZcxMdr1 extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _firstShowX;
        private _directShowX;
        private _onClickX;
        private _numSize;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateLbNum;
        private updateLuckNumView;
        private _luckNumAry;
        private _delayIdAry;
        private _cntAry;
        private _timeAry;
        private showLuckNumDirect;
        private doTween;
        private getLuckNum;
        private updateView;
        private onClickGet;
        private onClickWinner;
        private onClickNum;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class ZcxMdr2 extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _saveCnt;
        private _endTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateTimeView;
        private onClickGet;
        private onGetConfirmFunc;
        private onClickSave;
        private onConfirmFunc;
        private onClickReceive;
        update(time: base.Time): void;
        private updateTimeLb;
    }
}
declare namespace game.mod.activity {
    import UpdateItem = base.UpdateItem;
    class ZcxMdr3 extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClick;
        update(time: base.Time): void;
        /**==============================跑马灯==============================*/
        private _initCnt;
        private _initMax;
        private _curIdx;
        private initGrView;
        private getItemY;
        private doAddItem;
        private doItemTween;
    }
}
declare namespace game.mod.activity {
    class ZcxMdr4 extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateBigReward;
    }
}
declare namespace game.mod.activity {
    class CarnivalRankView extends eui.Component {
        grp_eff: eui.Group;
        timeItem: game.mod.TimeItem;
        grp_first: eui.Group;
        lab_first: eui.Label;
        list_rank: eui.List;
        lab_rank: eui.Label;
        lab_num: eui.Label;
        btn_reward: Btn;
        btn_lastRank: game.mod.Btn;
        btn_go: Btn;
        scr: eui.Scroller;
        constructor();
    }
}
declare namespace game.mod.activity {
    class ZcxMdr6 extends ZcxMdr5 {
        protected _gameOrderType: GameOrderType;
        protected onUpdateView(): void;
    }
}
declare namespace game.mod.activity {
    import act_reward = msg.act_reward;
    class CarnivalRender extends BaseListenerRenderer {
        lab_desc: eui.Label;
        list_reward: eui.List;
        private img_draw;
        private btn_draw;
        private _rewardList;
        private _proxy;
        private _carnivalProxy;
        private _canDraw;
        data: act_reward;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickDraw;
    }
}
declare namespace game.mod.activity {
    class ZcxMdr8 extends ZcxMdr7 {
        protected _type: ZcxFundType;
    }
}
declare namespace game.mod.activity {
    class ZcxUnlockMdr extends EffectMdrBase {
        private _view;
        private _listData;
        private _listItemData;
        private _proxy;
        private _type;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateView;
        private onClick;
    }
}
declare namespace game.mod.activity {
    class ZcxWinnerListMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateView;
        protected onHide(): void;
    }
}
