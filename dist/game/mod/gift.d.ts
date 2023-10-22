declare namespace game.mod.gift {
    class GiftMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.gift {
    import jinjie_list = msg.jinjie_list;
    class GiftModel {
        /**礼包类型数据*/
        giftMap: {
            [type: number]: jinjie_list;
        };
        /**红点路径*/
        giftTypes: {
            [type: number]: string[];
        };
        /**icon资源*/
        iconTypes: {
            [type: number]: string;
        };
        /**标题*/
        titleTypes: {
            [type: number]: string;
        };
        /**广告图，默认png*/
        bannerTypes: {
            [type: number]: string;
        };
    }
}
declare namespace game.mod.gift {
    import GameNT = base.GameNT;
    import jinjie_list = msg.jinjie_list;
    import common_reward_status = msg.common_reward_status;
    import DabiaojiangliConfig = game.config.DabiaojiangliConfig;
    /**
     * @description 进阶礼包
     */
    class GiftProxy extends ProxyBase implements IGiftProxy {
        private _model;
        initialize(): void;
        /** 点击阶段奖励信息 */
        c2s_jinjie_stage_get_list(type: GiftType): void;
        /**领取奖励*/
        c2s_jinjie_stage_get_reward(type: GiftType, index: number): void;
        /**奖励列表*/
        private s2c_jinjie_stage_get_list;
        /**================================== 协议 end ==================================*/
        /**根据类型，获取对应的进阶奖励列表*/
        getGiftInfo(type: GiftType): jinjie_list;
        /**根据类型和索引，获取对应的奖励状态信息*/
        getGiftStatus(type: GiftType, index: number): common_reward_status;
        private _cfgMap;
        /**根据 GiftType 获取对应配置*/
        getCfgListByType(type: GiftType): DabiaojiangliConfig[];
        /**根据 GiftType 获取红点*/
        getHintByGiftType(type: GiftType): boolean;
        private updateHint;
        protected onRoleUpdate(n: GameNT): void;
        /**获取红点路径*/
        getHintTypes(type: GiftType): string[];
        /**icon资源*/
        getIcon(type: GiftType): string;
        /**标题*/
        getTitle(type: GiftType): string;
        /**banner资源，默认png*/
        getBanner(type: GiftType): string;
    }
}
declare namespace game.mod.gift {
    import DabiaojiangliConfig = game.config.DabiaojiangliConfig;
    class GiftItem extends BaseGiftItemRender {
        private _proxy;
        data: IGiftItemData;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        protected onClick(): void;
    }
    interface IGiftItemData {
        cfg: DabiaojiangliConfig;
        finishCnt: number;
        giftType: GiftType;
        status: RewardStatus;
    }
}
declare namespace game.mod.gift {
    class GiftMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        private _proxy;
        private _giftType;
        protected onInit(): void;
        protected onShow(): void;
        protected updateBtnList(): void;
        protected updateViewShow(): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.gift {
    class GiftMdr extends MdrBase {
        private _view;
        private _proxy;
        /**进阶礼包类型*/
        private _giftType;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected updateView(): void;
    }
}
