declare namespace game.mod.vip {
    class VipPrivilegeItem extends BaseListenerRenderer {
        lb_desc: eui.Label;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.vip {
    class VipMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.vip {
    import vip_reward_info = msg.vip_reward_info;
    class VipModel {
        /** 当前vip等级索引 直接初始vip0*/
        idx: number;
        /** 当前vip经验 */
        exp: number;
        /** vip奖励信息 */
        reward_list: {
            [index: number]: vip_reward_info;
        };
        hintPath: string[];
    }
}
declare namespace game.mod.vip {
    import GameNT = base.GameNT;
    import VipConfig = game.config.VipConfig;
    import vip_reward_info = msg.vip_reward_info;
    /**
     * @description VIP系统
     */
    class VipProxy extends ProxyBase implements IVipProxy {
        private _model;
        private _isLogin;
        readonly model: VipModel;
        initialize(): void;
        /**
         * 领取礼包或购买
         * @param type 1.领取2.购买
         * @param idx
         */
        c2s_vip_receive_gift(type: number, idx: number): void;
        c2s_vip_info(): void;
        private s2c_vip_info;
        /**=================================================================*/
        /**当前能展示的最大vip等级的配置*/
        getShowVipCfgList(): VipConfig[];
        private _vipCfgs;
        /**vip相关全部配置，F=0是vip等级*/
        getVipCfgList(): VipConfig[];
        /**当前能展示的最大vip等级  1-10,11-13,14-16*/
        getMaxShowVip(): number;
        getVipCfg(idx: number): VipConfig;
        /**是否已达最大vip等级*/
        isMaxVip(): boolean;
        /**是否领取了奖励*/
        isActed(idx: number): boolean;
        getRewardInfo(idx: number): vip_reward_info;
        canGetReward(idx: number): boolean;
        /**当前能购买奖励的vip的index*/
        getMinBuyIdx(): number;
        canBuy(index: number): boolean;
        updateHint(): void;
        protected onRoleUpdate(n: GameNT): void;
        /**当前vip等级的index*/
        getIdx(): number;
        /**当前vip经验*/
        getExp(): number;
    }
}
declare namespace game.mod.vip {
    import VipConfig = game.config.VipConfig;
    class VipBarComp extends eui.Component {
        bar: game.mod.ProgressBarComp;
        btn_charge: game.mod.Btn;
        img_bg: eui.Image;
        gr_vip: eui.Group;
        img_desc: eui.Image;
        gr_vipNum: eui.Group;
        img_desc1: eui.Image;
        gr_vipFont: eui.Group;
        private _proxy;
        private _hub;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        private onClick;
        updateView(cfg: VipConfig): void;
        /**两个vip等级exp差距*/
        getDisExp(targetIdx: number): number;
    }
}
declare namespace game.mod.vip {
    import VipConfig = game.config.VipConfig;
    class VipEffComp extends eui.Component {
        img_tips: eui.Image;
        gr_vip: eui.Group;
        private _hub;
        constructor();
        updateView(cfg: VipConfig): void;
    }
}
declare namespace game.mod.vip {
    class VipPrivilegeBtn extends BaseRenderer {
        gr_vip: eui.Group;
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod.vip {
    class VipMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.vip {
    class VipPrivilegeView extends eui.Component {
        scroller: eui.Scroller;
        list: eui.List;
        barComp: game.mod.vip.VipBarComp;
        list_desc: eui.List;
        gr_vip: eui.Group;
        constructor();
    }
}
declare namespace game.mod.vip {
    class VipUpView extends eui.Component {
        gr_eff: eui.Group;
        constructor();
    }
}
declare namespace game.mod.vip {
    class VipView extends eui.Component {
        btn_left: game.mod.Btn;
        btn_right: game.mod.Btn;
        list_reward: eui.List;
        lb_privilege: eui.Label;
        gr_eff: eui.Group;
        barComp: game.mod.vip.VipBarComp;
        effComp: game.mod.vip.VipEffComp;
        img_vipdesc: eui.Image;
        img_next: eui.Label;
        btn_buy: game.mod.Btn;
        lb_time: eui.Label;
        btn_go: game.mod.Btn;
        lb_privilegecnt: eui.Label;
        constructor();
    }
}
declare namespace game.mod.vip {
    import UpdateItem = base.UpdateItem;
    class VipMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _showTween;
        private _curIdx;
        private _effIdx;
        private _cost;
        private _effCompY;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private getIdx;
        private onUpdateView;
        private updateView;
        private updateEffCompView;
        private showTween;
        private onClickLeft;
        private onClickRight;
        private canShowRightBtn;
        private onClickGoCharge;
        private onClickGo;
        private onClickBuy;
        update(time: base.Time): void;
        private updateTime;
        getBtnHint(isLeft?: boolean): boolean;
    }
}
declare namespace game.mod.vip {
    class VipPrivilegeMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _listDesc;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateRightView;
        protected onHide(): void;
        private onClick;
    }
}
declare namespace game.mod.vip {
    class VipUpMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
    }
}
