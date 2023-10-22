namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import TouchEvent = egret.TouchEvent;
    import ParamConfig = game.config.ParamConfig;
    import Handler = base.Handler;
    import GameNT = base.GameNT;

    export class ExchangeShopMdr extends MdrBase implements UpdateItem {
        protected _view: ExchangeView = this.mark("_view", ExchangeView);
        protected _proxy: ExchangeShopProxy;
        /**限购类型 用于倒计时判断 */
        private _lmt_type: number;
        /**商店类型 */
        protected _type: number;

        protected _listData: ArrayCollection = new ArrayCollection();

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.ExchangeShop);

            this.onInitList();
        }

        protected onInitList(): void {
            this._view.list.itemRenderer = ExchangeShopItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_refresh, TouchEvent.TOUCH_TAP, this.onClickRefresh, this);

            this.onNt(ActivityEvent.ON_UPDATE_EXCHANGE_SHOP_INFO, this.onUpdateList, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.setType();
            this.onUpdateList();
            this.onUpdateView();
            HintMgr.setHint(false, [ModName.Activity, MainActivityViewType.ExchangeShop, `0${this._type}`]);
        }

        protected setType(): void {
            this._type = this._proxy.getTypeByIndex();
        }

        private onUpdateView(): void {
            this._view.img_banner.source = ResUtil.getUiJpg(`shop_banner_${this._type}`);
            this._lmt_type = this._proxy.getRefreshType(this._type);
            if (this._lmt_type == 1 || this._lmt_type == 3) {
                this.onUpdateTime();
                TimeMgr.addUpdateItem(this, 1000);
            }
            this._view.btn_refresh.visible = this._type == ExchangeShopType.Type1;
            this._view.btn_refresh.x = this._view.timeItem.x + this._view.timeItem.width + 30;

            let prop: number = this._proxy.getBigReward(this._type);
            this._view.updateBigReward(prop ? [prop, 1] : null);
        }

        protected onUpdateList(): void {
            let list = this._proxy.getShopList(this._type);
            this._listData.source = list;
        }

        public update(time: base.Time): void {
            this.onUpdateTime();
        }

        private onUpdateTime(): void {
            let endTime;
            if (this._lmt_type == 3) {
                endTime = TimeUtil.getNextWeekTime();
            } else if (this._lmt_type == 1) {
                endTime = TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false, 1);
            } else {
                TimeMgr.removeUpdateItem(this);
            }
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            this._view.timeItem.updateLeftTime(leftTime, '', getLanById(LanDef.battle_cue29));
        }

        private onClickRefresh(): void {
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "exchange_shop_refresh_number");
            let str: string;
            let count: number = this._proxy.getRefreshCount(this._type);
            let cost: ParamConfig = getConfigByNameId(ConfigName.Param, "exchange_shop_refresh");
            if (count < cfg.value) {
                str = StringUtil.substitute(getLanById(LanDef.exchange_shop_refresh1), [TextUtil.addColor(`(${count}/${cfg.value})`, BlackColor.GREEN)]);
            } else {
                let prop: PropData = PropData.create(cost.value[0], cost.value[1]);
                str = StringUtil.substitute(getLanById(LanDef.exchange_shop_refresh2), [TextUtil.addColor(`${prop.count}${prop.cfg.name}`, BlackColor.GREEN)]);
            }
            let self = this;
            ViewMgr.getIns().showConfirm(str, Handler.alloc(this, () => {
                if (count >= cfg.value && !BagUtil.checkPropCnt(cost.value[0], cost.value[1], PropLackType.Text)) {
                    return;
                }
                self._proxy.c2s_exchange_shop_refresh_prop(this._type);
            }));
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
        }

        protected onRoleUpdate(n: GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.vip_lv) > -1) {
                this.onUpdateList();
            }
        }
    }
}