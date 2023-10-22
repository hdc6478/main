namespace game.mod.yishou {

    import YishouShoulingConfig = game.config.YishouShoulingConfig;

    export class YishouShoulingMdr extends MdrBase {
        private _view: YishouShoulingView = this.mark("_view", YishouShoulingView);
        private _proxy: YishouProxy;
        private _selIdx: number;
        private _selCfg: YishouShoulingConfig;
        private _listData: eui.ArrayCollection;
        /**二级页签类型*/
        private _type: number = 1;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Yishou);
            this._view.list.itemRenderer = YishouShoulingAvatarItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.power2.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            this.onNt(YishouEvent.ON_UPDATE_YISHOU_SHOULING_INFO, this.onUpdateView, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePower, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateListData();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = 0;
            this._selCfg = null;
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollH = 0;
        }

        private updateListData(): void {
            let cfgList = this._proxy.getShoulingCfgs(this._type);
            let list: AvatarItemData[] = [];
            for (let i = 0; i < cfgList.length; i++) {
                let cfg = cfgList[i];
                let isActed = this._proxy.isShoulingActed(cfg.index);
                list.push({
                    cfg,
                    showHint: this._proxy.getShoulingHint(cfg.index),
                    star: isActed ? 1 : 0,//激活就有星级，假设为1
                    isBattle: false
                });
            }
            list.sort((a, b) => {
                let actedA = a.star > 0;
                let actedB = b.star > 0;
                if (actedA != actedB) {
                    return actedB ? 1 : -1;
                }
                return a.cfg.index - b.cfg.index;
            });

            if (this._selCfg) {
                let size = list.length;
                for (let i = 0; i < size; i++) {
                    let cfg = list[i].cfg;
                    if (cfg && cfg.index == this._selCfg.index) {
                        this._selIdx = i;
                        break;
                    }
                }
            } else {
                this._selIdx = 0;
                this._selCfg = list[this._selIdx].cfg;
            }

            let size = list.length;
            for (let i = 0; i < size; i++) {
                list[i].isSel = this._selIdx == i;
            }

            this._listData.replaceAll(list);
            this._view.list.selectedIndex = this._selIdx;
        }

        private onUpdateView(): void {
            this.updateListData();
            this.updateView();
        }

        private updateView(): void {
            let cfg = this._selCfg;
            if (!cfg) {
                return;
            }

            this._view.specialAttrView.updateDesc(cfg);
            this._view.skillComp.updateView(cfg);
            this.updatePower();

            let starCfg = this._proxy.getShoulingEquipCfg(cfg.index, 1);
            if (!starCfg) {
                return;
            }
            let len = starCfg.cost.length;
            for (let i = 0; i < len; i++) {
                let equipId = starCfg.cost[i][0];
                let info = this._proxy.getShoulingEquipInfo(cfg.index, equipId);
                let data: IYishouShoulingEquipIconData = {
                    index: cfg.index,
                    equipId: equipId,
                    idx: i,
                    hint: this._proxy.getShoulingEquipHint(cfg.index, equipId),
                    star: info ? info.star : 0
                };
                this._view[`icon${i}`].data = data;
            }
        }

        private updatePower(): void {
            let power = 0;
            if (this._selCfg) {
                power = this._proxy.getShoulingPower(this._selCfg.index);
            }
            this._view.power2.setPowerValue(power);
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selIdx) {
                return;
            }
            let list: AvatarItemData[] = this._listData.source;
            let preData = list[this._selIdx];
            if (preData) {
                preData.isSel = false;
                this._listData.itemUpdated(preData);
            }

            let data = e.item as AvatarItemData;
            data.isSel = true;
            this._listData.itemUpdated(data);

            this._selIdx = itemIdx;
            this._selCfg = data.cfg;
            this.updateView();
        }

        private onClickAttr(): void {
            if (!this._selCfg) {
                return;
            }
            let attr = this._proxy.getShoulingAttr(this._selCfg.index);
            ViewMgr.getIns().showAttrTipsWithoutGod('兽灵属性', attr, '激活属性');
        }

    }
}