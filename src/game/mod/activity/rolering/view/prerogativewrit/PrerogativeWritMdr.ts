namespace game.mod.activity {


    import LanDef = game.localization.LanDef;

    export class PrerogativeWritMdr extends EffectMdrBase {
        private _view: PrerogativeWritView = this.mark("_view", PrerogativeWritView);
        private _proxy: PrerogativeWritProxy;
        private _listBtn: eui.ArrayCollection;
        private _listReward: eui.ArrayCollection;
        private _selIdx = 0;
        private _effIdx = 0;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.gr_eff.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.PrerogativeWrit);
            this._view.list_btn.itemRenderer = PrerogativeWritItem;
            this._view.list_btn.dataProvider = this._listBtn = new eui.ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listReward = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_btn, eui.ItemTapEvent.ITEM_TAP, this.onClickListBtn, this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(ActivityEvent.ON_UPDATE_PREROGATIVE_WRIT_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();

            let selIdx = 0;
            let selType = super.decodeShowArgs(true);
            if (selType != null) {
                selIdx = selType;
            }
            this._selIdx = selIdx;
            this.updateBtnList();
            this.updateView();
            this._view.list_btn.selectedIndex = this._selIdx;
            //添加特效
            this.addEftByParentScale(this._view.btn_do.group_eft);
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = 0;
        }

        private onUpdateView(): void {
            this.updateBtnList(true);
            this.updateView();
        }

        private updateBtnList(autoSel?: boolean): void {
            let list: { type: PrerogativeWritType, hint: boolean }[] = [];
            let selIdx: number;
            for (let i = 1; i <= 3; i++) {
                let hint = this._proxy.getHint(i);
                if (hint && selIdx == undefined) {
                    selIdx = i - 1;
                }
                list.push({
                    type: i,
                    hint: hint
                });
            }
            this._listBtn.replaceAll(list);

            //领完之后，如果下一个令牌也可以领取奖励，则会自动跳到下一个令牌。
            if (autoSel) {
                if (selIdx == null) {
                    selIdx = this._selIdx;
                }
                this._view.list_btn.selectedIndex = this._selIdx = selIdx;
            }
        }

        private updateView(): void {
            let type = this._selIdx + 1;
            this._view.img_wenan.source = `wenan_${type}`;

            this._listReward.replaceAll(this._proxy.getRewardShow(type).concat());

            let isBought = this._proxy.isPayBought(type);
            this._view.img_desc.source = isBought ? 'meitiankelingqu' : 'goumaikehuode';

            this._view.lb_day.text = isBought ? StringUtil.substitute(getLanById(LanDef.tql_tips4), [this._proxy.getReceivedDay(type)]) : getLanById(LanDef.tql_tips5);

            let isReceived = this._proxy.isReceived(type);
            this._view.img_received.visible = isReceived;
            this._view.btn_do.visible = !isReceived;
            this._view.btnTipsBase.visible = false;
            if (!isReceived) {
                if (!isBought) {
                    let rmb = PayUtil.getRmbValue(this._proxy.getProductId(type));
                    this._view.btn_do.setFontPrice(rmb);
                    let nextVip = VipUtil.getNextVipByPay(rmb);
                    let curVip = VipUtil.getShowVipLv() || 0;
                    if (nextVip > curVip) {
                        this._view.btnTipsBase.updateShow(getLanById(LanDef.zhishengvip) + nextVip);
                        this._view.btnTipsBase.visible = true;
                    }
                } else {
                    this._view.btn_do.clearFontPrice();
                    this._view.btn_do.setImage('common_get', true);
                }
                this._view.btn_do.setHint(this._proxy.getHint(type));
            }

            this.updateModel();
        }

        private updateModel(): void {
            let productId = this._proxy.getProductId(this._selIdx + 1);
            let rewards = PayUtil.getRewards(productId);
            if (!rewards || !rewards.length) {
                return;
            }
            let item = rewards[0];
            let cfg = GameConfig.getPropConfigById(item[0]);
            let surfaceId = cfg && cfg.param1 ? cfg.param1[0][0] : 0;
            if (surfaceId) {
                let surfaceCfg = getConfigById(surfaceId);
                if (surfaceCfg) {
                    this._view.nameItem.updateShow(surfaceCfg.name, surfaceCfg.quality);
                }
            }
            if (cfg.param1) {
                this.removeEffect(this._effIdx);
                this._effIdx = this.addAnimate(cfg.param1[0][0], this._view.gr_eff);
            }
        }

        private onClickListBtn(e: eui.ItemTapEvent): void {
            let itemIndex = e.itemIndex;
            if (itemIndex == this._selIdx) {
                return;
            }
            this._selIdx = itemIndex;
            this.updateView();
        }

        private onClick(): void {
            let type = this._selIdx + 1;
            let isBought = this._proxy.isPayBought(type);
            let productId = this._proxy.getProductId(type);
            if (!isBought) {
                PayUtil.pay(productId);
                return;
            }
            let info = this._proxy.getInfo(type);
            if (info && info.status == 1) {
                this._proxy.c2s_prerogative_writ_get(type);
            }
        }
    }
}