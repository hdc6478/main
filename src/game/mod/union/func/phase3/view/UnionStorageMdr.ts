namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import ItemTapEvent = eui.ItemTapEvent;
    import prop_attributes = msg.prop_attributes;
    import GameNT = base.GameNT;
    import GuildWareConfig = game.config.GuildWareConfig;
    import ParamConfig = game.config.ParamConfig;

    /**仓库 */
    export class UnionStorageMdr extends MdrBase {
        private _view: UnionStorageView = this.mark("_view", UnionStorageView);
        private _proxy: UnionProxy;

        private _listData: ArrayCollection = new ArrayCollection();
        private _msgData: ArrayCollection = new ArrayCollection();

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list_msg.itemRenderer = UnionStorageMsgItem;
            this._view.list_msg.dataProvider = this._msgData;

            this._view.list_item.itemRenderer = UnionStorageItem;
            this._view.list_item.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_recycle, TouchEvent.TOUCH_TAP, this.onClickRecycle);
            addEventListener(this._view.btn_donate, TouchEvent.TOUCH_TAP, this.onClickDonate);
            addEventListener(this._view.checkbox, TouchEvent.TOUCH_TAP, this.onClickCheckbox);

            this.onNt(UnionEvent.ON_UPDATE_STORAGE_INFO, this.onUpdateView, this);
            // this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onUpdateIndex, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);//属性刷新，有货币
        }

        protected onShow(): void {
            this._proxy.c2s_guild_ware_show();
            super.onShow();
            this._view.scr.viewport.scrollV = 0;
        }

        private onUpdateView(): void {
            let model: UnionModel = this._proxy.model;

            let max_boxs: number = this._proxy.max_boxs;
            if (model.item_list.length < max_boxs) {
                model.item_list.length = max_boxs;
            }
            let list: PropData[] = [];
            let cfgs: PropData[] = [];
            let equips: PropData[] = [];
            let nulls: any[] = [];
            let param: ParamConfig = GameConfig.getParamConfigById("guild_jifen");
            let len: number = getConfigListByName(ConfigName.GuildWare).length;
            for (let data of model.item_list) {
                if (!data) {
                    nulls.push(data);
                    continue;
                }
                let prop: PropData = PropData.create(data.index, data.count);
                // prop.prop_id = data.prop_id;
                prop.update(data);
                let cfg: GuildWareConfig = getConfigByNameId(ConfigName.GuildWare, prop.index);
                if (cfg) {
                    // cfgs.push(prop);
                    cfgs[cfg.sort] = prop;
                    continue;
                }
                if (prop.index == param.value[1]) {
                    // cfgs.push(prop);
                    cfgs[len] = prop;
                    continue;
                }
                if (prop.type == ConfigHead.Equip) {
                    if (this._view.checkbox.selected) {
                        if (RoleUtil.getRebirthLv(prop.cfg.rebirth_limit) == RoleUtil.getRebirthLv()) {
                            equips.push(prop);
                        }
                    } else {
                        equips.push(prop);
                    }
                    continue;
                }
                equips.push(prop);
            }
            // cfgs.sort((a, b) => { return a.index - b.index });
            cfgs = cfgs.filter(v => { return !!v });
            equips.sort((a, b) => { return b.quality - a.quality });
            list = cfgs.concat(equips, nulls);
            this._listData.replaceAll(list);

            this._msgData.replaceAll(model.donate_logs);

            this.onUpdateCount();
        }

        private onUpdateCount(): void {
            this._view.coinItem.updateShow([PropIndex.GuildScore, 0]);
            let cnt: number = BagUtil.getPropCntByIdx(PropIndex.GuildScore);
            this._view.coinItem.setLabCost(`${cnt}`, 0xffffff);
        }

        private onClickRecycle(): void {
            ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionRecycle);
        }

        private onClickDonate(): void {
            ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionDonateEquip);
        }

        private onRoleUpdate(n: GameNT): void {
            let keys: string[] = n.body;
            if (keys && keys.indexOf(PropIndexToKey[PropIndex.GuildScore]) >= 0) {
                this.onUpdateCount();
            }
        }

        private onClickCheckbox(): void {
            this.onUpdateView();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}