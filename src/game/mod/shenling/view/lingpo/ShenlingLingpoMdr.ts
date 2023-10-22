namespace game.mod.shenling {

    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import JumpConfig = game.config.JumpConfig;

    export class ShenlingLingpoMdr extends MdrBase {
        private _view: ShenlingLingpoView = this.mark("_view", ShenlingLingpoView);
        private _proxy: ShenlingLingpoProxy;
        private _slProxy: ShenLingProxy;
        private _listData: eui.ArrayCollection;
        private _selType: ShenLingType = 0;
        private _selIdx = 0;
        private _cfgId = 0;
        private _preId = 0;//一键操作的灵魄id，没有下一个可一键操作的时候停留在当前灵魄

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.ShenlingLingpo);
            this._slProxy = this.retProxy(ProxyType.Shenling);
            this._view.list.itemRenderer = ShenlingLingpoItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.typeListComp.list_menu, eui.ItemTapEvent.ITEM_TAP, this.onClickType, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            addEventListener(this._view.btn_onekey, egret.TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
            addEventListener(this._view.suitBtn, egret.TouchEvent.TOUCH_TAP, this.onClickSuitBtn, this);
            addEventListener(this._view.lb_gain, egret.TextEvent.LINK, this.onClickGain, this);
            this.onNt(ShenLingEvent.ON_SHEN_LING_LING_PO_UPDATE, this.onUpdateView, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onUpdateByBagType, this);
        }

        protected onShow(): void {
            super.onShow();

            this._view.typeListComp.updateListView(ShenLingMdrType.Lingpo);
            let typeAry = this._proxy.getShowShenlingTypes();
            this.onSwitchType(typeAry[0]);
        }

        protected onHide(): void {
            super.onHide();
            this._selType = 0;
            this._selIdx = 0;
            this._cfgId = 0;
            this._preId = null;
        }

        private onSwitchType(type: ShenLingType): void {
            this._selIdx = 0;
            this._preId = null;
            this._selType = type;

            this._view.typeListComp.updateSelType(type);
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollH = 0;
            this.updateView();
        }

        private getNextOneKeyType(): ShenLingType {
            if (this._proxy.getHintByType(this._selType)) {
                return this._selType;
            }
            let typeAry = this._proxy.getShowShenlingTypes();
            for (let type of typeAry) {
                if (this._proxy.getHintByType(type)) {
                    return type;
                }
            }
            return this._selType;
        }

        private onUpdateView(): void {
            let nextType = this.getNextOneKeyType();
            if (this._preId && nextType != this._selType) {
                this.onSwitchType(nextType);
                return;
            }
            this.updateView();
        }

        private updateView(): void {
            this._view.typeListComp.updateListHint(ShenLingMdrType.Lingpo);
            this.updateListView();
            this.updateTopView();
        }

        private updateListView(): void {
            let cfgList = this._proxy.getShowTypeCfgList(this._selType);
            let list: IShenlingLingpoItemData[] = [];
            let selFirst = false;
            for (let cfg of cfgList) {
                let hint = this._proxy.getHintById(cfg.id);
                let data: IShenlingLingpoItemData = {
                    isActed: this._proxy.isActed(cfg.id),
                    cfg,
                    hint,
                    lv: this._proxy.getSuitLevel(cfg.id),
                    progress: this._proxy.getSuitLevelProgressCnt(cfg.id),
                    isSel: false
                };
                if (hint) {
                    selFirst = true;
                }
                list.push(data);
            }
            list.sort((a, b) => {
                if (a.hint != b.hint) {
                    return a.hint ? -1 : 1;
                }
                if (a.isActed != b.isActed) {
                    return b.isActed ? 1 : -1;
                }
                if (a.lv != b.lv) {
                    return b.lv > 0 ? 1 : -1;
                }
                return a.cfg.id - b.cfg.id;
            });

            if (selFirst) {
                this._selIdx = 0;
            } else if (this._preId) {
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    if (item && item.cfg.id == this._preId) {
                        this._selIdx = i;
                        break;
                    }
                }
            }
            let size = list.length;
            for (let i = 0; i < size; i++) {
                list[i].isSel = this._selIdx == i;
            }
            this._listData.replaceAll(list);
            this._view.list.selectedIndex = this._selIdx;

            if (list && list[this._selIdx]) {
                this._cfgId = list[this._selIdx].cfg.id;
            }
        }

        private updateTopView(): void {
            this._view.power.setPowerValue(this._proxy.getPower(this._cfgId));

            this._view.listComp.updateView(this._selType, this._cfgId);
            this._view.suitBtn.updateView(this._selType, this._cfgId);
            let canOneKey = this._proxy.canOneKey(this._cfgId);
            let canOneKeySuit = this._proxy.canOneKeySuit(this._cfgId);
            this._view.btn_onekey.visible = canOneKey || canOneKeySuit;
            this._view.gr_gain.visible = false;
            if (canOneKey) {
                this._view.btn_onekey.label = this._proxy.isActedAllIcon(this._cfgId) ? getLanById(LanDef.onekeyup) : getLanById(LanDef.yijianjihuo);
            } else if (canOneKeySuit) {
                this._view.btn_onekey.label = getLanById(LanDef.lingpo_tips4);
            } else {
                let isMax = this._proxy.isSuitLevelMax(this._cfgId);
                if (!isMax) {
                    this._view.gr_gain.visible = true;
                    let cfg = this._proxy.getTypeCfg(this._cfgId);
                    let jumpCfg: JumpConfig = getConfigByNameId(ConfigName.Jump, cfg.gain_id[0]);
                    this._view.lb_gain.textFlow = TextUtil.parseHtml(getLanById(LanDef.bag_cue21) + `：` + TextUtil.addLinkHtmlTxt(jumpCfg.name, BlackColor.YELLOW, ''));
                }
            }
            if (this._view.btn_onekey.visible) {
                this._view.btn_onekey.setHint(true);
            }
        }

        private onClickType(e: eui.ItemTapEvent): void {
            if (!e) {
                return;
            }
            let type = (e.item as ISLTypeIconData).type;
            if (type == this._selType) {
                return;
            }
            this.onSwitchType(type);
        }

        private onClickList(e: eui.ItemTapEvent): void {
            if (!e || !e.item || this._selIdx == e.itemIndex) {
                return;
            }
            let list: IShenlingLingpoItemData[] = this._listData.source;
            let preData = list[this._selIdx];
            if (preData) {
                preData.isSel = false;
                this._listData.itemUpdated(preData);
            }
            let data = e.item as IShenlingLingpoItemData;
            data.isSel = true;
            this._listData.itemUpdated(data);

            this._selIdx = e.itemIndex;
            this._cfgId = (e.item as IShenlingLingpoItemData).cfg.id;
            this._preId = null;
            this.updateTopView();
        }

        private onClickOneKey(): void {
            if (this._proxy.canOneKey(this._cfgId)) {
                this._preId = this._cfgId;
                this._proxy.c2s_god_brother_lingpo_click(2, this._cfgId);
            } else if (this._proxy.canOneKeySuit(this._cfgId)) {
                this.onClickSuitBtn();
            }
        }

        private onClickSuitBtn(): void {
            ViewMgr.getIns().showSecondPop(ModName.Shenling, ShenLingViewType.ShenlingLingpoSuitTips, this._cfgId);
        }

        private onClickGain(): void {
            let cfg = this._proxy.getTypeCfg(this._cfgId);
            ViewMgr.getIns().showViewByID(cfg.gain_id[0]);
        }

        private onUpdateByBagType(n: GameNT): void {
            let bagTypes = n.body as number[];
            if (bagTypes.indexOf(BagType.ShenlingEquip) > -1) {
                this.updateView();
            }
        }
    }
}