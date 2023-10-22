declare namespace game.mod.rank {
    class NewRankView extends eui.Component {
        gr_efttitle: eui.Group;
        gr_eft: eui.Group;
        btn_like: game.mod.Btn;
        btn_record: game.mod.Btn;
        scroller: eui.Scroller;
        list_ranktype: eui.List;
        list_rank: eui.List;
        lb_myrank: eui.Label;
        lb_mypower: eui.Label;
        frameItem: game.mod.BubbleFrameItem;
        power: game.mod.Power;
        nameItem: game.mod.rank.RankFirstNameItem;
        lb_liketime: eui.Label;
        img_sketch: eui.Image;
        gr_value: eui.Group;
        lb_value: eui.Label;
        constructor();
    }
}
declare namespace game.mod.rank {
    class RankMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.rank {
    import s2c_rank_info = msg.s2c_rank_info;
    import RankConfConfig = game.config.RankConfConfig;
    import RankRewardConfig = game.config.RankRewardConfig;
    import rank_info = msg.rank_info;
    /**
     * @description 排行榜系统，主界面上方排行榜按钮
     */
    class NewRankProxy extends ProxyBase implements INewRankProxy {
        private _model;
        initialize(): void;
        /**
         * 获取排行榜信息
         * @param type 排行榜编号
         * @param event_type 1.排行榜界面2.大神榜
         * @param start  todo 后续补上滚动请求个数 2023.3.8
         * @param end
         */
        c2s_rank_req_rank(type: RankType, event_type: number, start?: number, end?: number): void;
        private s2c_rank_info;
        c2s_rank_worship(type: RankType): void;
        private s2c_rank_worship;
        private s2c_rank_base_info;
        c2s_dashen_rank_award(type: RankType, index: number): void;
        private s2c_rank_update_reward;
        inOneHour(type: RankType): boolean;
        getConfCfg(type: RankType): RankConfConfig;
        getRewardCfgList(type: RankType): RankRewardConfig[];
        getRankTypeList(): RankType[];
        getRankInfo(type: RankType, eventType?: number): s2c_rank_info;
        getRankRewardStatus(type: RankType, index: number): RankRewardStatus;
        canWorship(type: RankType): boolean;
        canGetReward(type: RankType): boolean;
        getMyRankTypeDesc(type: RankType, powerCN?: boolean): string;
        private getMyPowerDesc;
        getHintByType(type: RankType): boolean;
        updateHint(): void;
        getWorshipList(): number[];
        getGodCondition(type: RankType, param: number): string;
        getPowerByRankInfo(type: RankType, data: rank_info): string;
    }
}
declare namespace game.mod.rank {
    import s2c_new_rank_info = msg.s2c_new_rank_info;
    class RankModel {
        infos: {
            [rankType: number]: s2c_new_rank_info;
        };
        godInfos: {
            [rankType: number]: RankGodRenderData[];
        };
        /**排行榜类型映射红点类型，todo*/
        rankTypeToHintTypes: {
            [type: number]: string[];
        };
        /**排行榜类型映射功能id，todo*/
        rankTypeToOpenIdx: {
            [type: number]: number;
        };
    }
}
declare namespace game.mod.rank {
    import s2c_new_rank_info = msg.s2c_new_rank_info;
    import GameNT = base.GameNT;
    class RankProxy extends ProxyBase implements IRankProxy {
        private _model;
        initialize(): void;
        /**请求排行榜信息*/
        c2s_new_rank_req_rank(rankType: number): void;
        private s2c_new_rank_info;
        /**请求领取大神榜 奖励*/
        c2s_first_rank_award(rankType: number, index: number): void;
        private s2c_first_rank_server_award;
        private s2c_first_rank_award;
        /**获取排行榜信息*/
        getRankInfo(rankType: number): s2c_new_rank_info;
        /**获取大神榜信息*/
        getGodInfos(rankType: number): RankGodRenderData[];
        /**初始化大神榜信息*/
        private initGodInfos;
        /**更新大神榜信息*/
        private updateGodInfos;
        /**更新大神榜奖励信息*/
        private updateGodRewardInfos;
        private setRankUpdate;
        /**获取红点类型*/
        getHintTypes(rankType: number): string[];
        private updateHint;
        private checkHint;
        private getCfgList;
        /**功能开启刷新按钮*/
        protected onOpenFuncUpdate(n: GameNT): void;
    }
}
declare namespace game.mod.rank {
    class NewRankGodRender extends RankGodRender {
        data: RankGodRenderData;
        private _proxy;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        protected onClickGet(): void;
    }
}
declare namespace game.mod.rank {
    import rank_info = msg.rank_info;
    class NewRankItem extends BaseListenerRenderer {
        img_rank: eui.Image;
        lb_rank: eui.Label;
        head: game.mod.Head;
        lb_name: eui.Label;
        lb_power: eui.Label;
        lb_notone: eui.Label;
        data: INewRankItemData;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
    interface INewRankItemData {
        type: RankType;
        info: rank_info;
    }
}
declare namespace game.mod.rank {
    class NewRankModel {
        /**排行榜信息*/
        rank_info: {
            [rankType: number]: {
                [eventType: number]: msg.s2c_rank_info;
            };
        };
        /**大神榜奖励信息*/
        reward_list: {
            [rankType: number]: {
                [index: number]: msg.rank_reward;
            };
        };
        /**可点赞信息*/
        worship_list: number[];
        hintPath: string[];
        /**在一个小时内，请求不生效*/
        time_map: {
            [type: number]: number;
        };
    }
}
declare namespace game.mod.rank {
    class RankFirstNameItem extends eui.Component {
        lb_name: eui.Label;
        constructor();
        updateShow(name: string): void;
    }
}
declare namespace game.mod.rank {
    class NewRankGodMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: RankType;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateView;
        private moveScroller;
        private getRecord;
    }
}
declare namespace game.mod.rank {
    class NewRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.rank {
    class NewRankMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _type;
        private _listRankType;
        private _listRank;
        private _titleId;
        private _clickTypes;
        private _selIdx;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private sendRankType;
        protected onHide(): void;
        private updateRankTypeList;
        private onUpdateView;
        private updateTopInfo;
        private notTopPlayerView;
        private updateTopPlayerView;
        private onUpdateLikeTime;
        private updateLikeTime;
        private onClickLike;
        private onClickRecord;
        private onClickRankType;
        private onClickBubbleFrameItem;
        private updateBtnHint;
    }
}
declare namespace game.mod.rank {
    class RankGodMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        protected _showArgs: number;
        private _rankType;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onRankRewardUpdate;
        private updateItemList;
    }
}
declare namespace game.mod.rank {
    class RankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.rank {
    class RankMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        protected _showArgs: number[];
        private _rankType;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickGod;
        private updateShow;
        /** 通用红点事件监听 */
        private onHintUpdate;
        /** 更新红点 */
        private updateHint;
        /** 设置红点 */
        setHint(val: boolean): void;
    }
}
