namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import GuildZhanyaotaiConfig = game.config.GuildZhanyaotaiConfig;
    import ItemTapEvent = eui.ItemTapEvent;

    export class UnionKillTipsMdr extends EffectMdrBase {
        private _view: UnionKillTipsView = this.mark("_view", UnionKillTipsView);
        private _proxy: UnionProxy;

        private showBtn: boolean;
        private _cfg: GuildZhanyaotaiConfig;
        private eft_id: number;

        private _listData: ArrayCollection = new ArrayCollection();
        private _summonData: ArrayCollection = new ArrayCollection();
        private _killData: ArrayCollection = new ArrayCollection();

        private _list: TabBaseItemData[] = [
            {
                icon: "tubiao_boss_1",
                showHint: false
            },
            {
                icon: "tubiao_boss_2",
                showHint: false
            },
            {
                icon: "tubiao_boss_3",
                showHint: false
            }
        ];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = TabSecondItem;
            this._view.list.dataProvider = this._listData;

            this._view.list_summon.itemRenderer = Icon;
            this._view.list_summon.dataProvider = this._summonData;

            this._view.list_kill.itemRenderer = Icon;
            this._view.list_kill.dataProvider = this._killData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClick);
            addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onTabChanged, this);
        }

        protected onShow(): void {
            // todo skin标题
            super.onShow();
            this.showBtn = this._showArgs.showBtn || false;
            this.onUpdateType();
            this.onUpdateView();
        }

        private onUpdateType(): void {
            let cfgArr: GuildZhanyaotaiConfig[] = getConfigListByName(ConfigName.GuildZhanyaotai);
            for (let i = 0; i < cfgArr.length; i++) {
                this._list[i].param = cfgArr[i];
            }
            this._listData.source = this._list;
            this._view.list.selectedIndex = 0;
            this._cfg = this._listData.getItemAt(0).param;
        }

        private onUpdateView(): void {
            this._view.costIcon.visible = this.showBtn && !!this._cfg.costs;
            this._view.btn.visible = this.showBtn;

            if (this.eft_id) {
                this.removeEffect(this.eft_id);
            }
            this.eft_id = this.addMonster(this._cfg.BOSS, this._view.grp_eff);
            this._view.nameItem.updateShow(this._cfg.name, this._cfg.quality);

            this._killData.replaceAll(this._cfg.rewards3);
            this._summonData.replaceAll(this._cfg.rewards1);

            if (this._view.costIcon.visible) {
                // this._view.costIcon.setData(this._cfg.costs[0][0]);
                this._view.costIcon.updateShow(this._cfg.costs[0]);
            }
            this._view.lab_limit.visible = !!this._cfg.vip_limit && this.showBtn;
            if (this._view.lab_limit.visible) {
                this._view.lab_limit.text = `VIP${this._cfg.vip_limit}每天可免费召唤${StringUtil.getCNBynumber(this._cfg.count)}次`;
            }
        }

        private onTabChanged(e: ItemTapEvent): void {
            let data: TabBaseItemData = this._listData.getItemAt(e.itemIndex);
            this._cfg = data.param;
            this.onUpdateView();
        }

        private onClick(): void {
            if (this._cfg.count && this._proxy.getSummonCount(this._cfg.index) >= this._cfg.count) {
                PromptBox.getIns().show("今日召唤次数已用完");
                return;
            }
            if (this._cfg.vip_limit) {
                if (VipUtil.getShowVipLv() < this._cfg.vip_limit) {
                    ViewMgr.getIns().openCommonRechargeView();
                    this.hide();
                    return;
                }
            } else {
                if (!BagUtil.checkPropCnt(this._cfg.costs[0][0], this._cfg.costs[0][1], PropLackType.Dialog)) {
                    return;
                }
            }
            this._proxy.c2s_guild_zhanyaotai_click(1, null, this._cfg.index);
            this.hide();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}