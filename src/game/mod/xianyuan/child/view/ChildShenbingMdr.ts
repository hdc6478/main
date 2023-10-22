namespace game.mod.xianyuan {

    import ChildShenbingConfig = game.config.ChildShenbingConfig;
    import ChildLingyiConfig = game.config.ChildLingyiConfig;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;

    export class ChildShenbingMdr extends EffectMdrBase {
        protected _view: ChildShenbingView = this.mark("_view", ChildShenbingView);
        protected _proxy: ChildProxy;
        /**大类*/
        protected _surfaceType: XianlvSurfaceType = XianlvSurfaceType.Shenbing;
        /**二级页签类型*/
        protected _tabType: XianlvSecondTabType = XianlvSecondTabType.Type1;
        private _eftIdx: number;
        private _selIdx: number = 0;
        private _selCfg: ChildShenbingConfig | ChildLingyiConfig;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.gr_eff.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Child);
            this._view.list.itemRenderer = AvatarItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_up, egret.TouchEvent.TOUCH_TAP, this.onClickUp, this);
            addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            this.onNt(XianyuanEvent.ON_UPDATE_CHILD_SHENBING_INFO, this.onUpdateView, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePower, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onBagUpdateByBagType, this);
        }

        protected onShow(): void {
            super.onShow();

            this.onUpdateView();
        }

        protected onHide(): void {
            super.onHide();
            this.removeModelEft();
            this._selIdx = 0;
            this._selCfg = null;
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollH = 0;
        }

        private removeModelEft(): void {
            if (this._eftIdx) {
                this.removeEffect(this._eftIdx);
                this._eftIdx = null;
            }
        }

        private onUpdateView(): void {
            this.updateListData();
            this.updateView();
        }

        private updateView(): void {
            if (!this._selCfg) {
                return;
            }
            this.updateModel();
            this.updatePower();
            this.updateCost();
        }

        private updateListData(): void {
            let list: AvatarItemData[] = [];
            let cfgList = this._proxy.getSurfaceCfgList(this._surfaceType, this._tabType);
            if (!cfgList) {
                return;
            }
            for (let cfg of cfgList) {
                let info = this._proxy.getSurfaceInfo(this._surfaceType, cfg.index);
                list.push({
                    cfg,
                    showHint: this._proxy.canActOrUpSurface(this._surfaceType, cfg.index),
                    star: info ? info.shenbin_lv : 0,
                    isBattle: false
                });
            }
            list.sort((a, b) => {
                if (a.showHint != b.showHint) {
                    return a.showHint ? -1 : 1;
                }
                if (a.star != b.star) {
                    return b.star > 0 ? 1 : -1;
                }
                if (a.cfg.quality != b.cfg.quality) {
                    return a.cfg.quality - b.cfg.quality;
                }
                return a.cfg.index - b.cfg.index;
            });

            if (this._selCfg) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].cfg.index == this._selCfg.index) {
                        this._selIdx = i;
                        break;
                    }
                }
            } else {
                // this._selIdx = 0;
                this._selCfg = list[this._selIdx].cfg;
            }

            let size = list.length;
            for (let i = 0; i < size; i++) {
                list[i].isSel = i == this._selIdx;
            }
            this._listData.replaceAll(list);
            this._view.list.selectedIndex = this._selIdx;
        }

        private updateModel(): void {
            this.removeModelEft();
            let index = this._selCfg.index;
            let headType = PropData.getPropParse(index);
            if (headType == ConfigHead.ChildShenbing) {
                this._view.gr_eff.x = 480;//todo 模型位置要调整
            } else {
                this._view.gr_eff.x = 360;
            }
            this._eftIdx = this.addAnimate(index, this._view.gr_eff);
            this._view.nameItem.updateShow(this._selCfg.name, this._selCfg.quality);

            let isActed = this._proxy.isActedSurface(this._surfaceType, index);
            this._view.power.btn_desc.visible = isActed;
            this._view.starComp.visible = isActed;
            if (isActed) {
                let info = this._proxy.getSurfaceInfo(this._surfaceType, index);
                this._view.starComp.updateStar(info ? info.shenbin_lv : 0, this._proxy.getMaxStarSurface(this._surfaceType, index));
            }
            this._view.specialAttr.updateDesc(this._selCfg);
        }

        private updatePower(): void {
            let info = this._proxy.getSurfaceInfo(this._surfaceType, this._selCfg.index);
            let attr = info ? info.shenbin_attr : null;
            if (!attr) {
                let attrId = this._selCfg.attr_id[0];
                attr = RoleUtil.getAttr(attrId);
            }
            this._view.power.setPowerValue(attr && attr.showpower ? attr.showpower : 0);
            this._view.godItem.updateGod(attr && attr.god ? attr.god : 0);
        }

        private updateCost(): void {
            let isMax = this._proxy.isMaxStarSurface(this._surfaceType, this._selCfg.index);
            if (isMax) {
                this._view.btn_up.updateMaxStar();
                return;
            }
            let curStar = this._proxy.getStarSurface(this._surfaceType, this._selCfg.index);
            let power = this._selCfg.star_power[curStar] || 0;
            let str = StringUtil.substitute(getLanById(LanDef.xianlv_tips26), [TextUtil.addColor(Math.floor(power / 100) + '%', WhiteColor.GREEN)]);
            let cost = this._proxy.getCostSurface(this._surfaceType, this._selCfg.index);
            this._view.btn_up.updateCost(cost, !!curStar, str);
            this._view.btn_up.setHint(this._proxy.canActOrUpSurface(this._surfaceType, this._selCfg.index));
        }

        private onClickUp(): void {
            if (this._selCfg && this._proxy.canActOrUpSurface(this._surfaceType, this._selCfg.index, true)) {
                this._proxy.c2s_child_oper_shenbin(this._surfaceType, this._selCfg.index);
            }
        }

        private onClickAttr(): void {
            let info = this._proxy.getSurfaceInfo(this._surfaceType, this._selCfg.index);
            ViewMgr.getIns().showAttrTips(XianlvSurfaceName[this._surfaceType] + getLanById(LanDef.maid_cue12), info ? info.shenbin_attr : null);
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
            let data: AvatarItemData = e.item;
            data.isSel = true;
            this._listData.itemUpdated(data);

            this._selIdx = itemIdx;
            this._selCfg = data.cfg;
            this.updateView();
        }

        private onBagUpdateByBagType(n: GameNT): void {
            let bagTypes = n.body as number[];
            if (bagTypes.indexOf(BagType.Material) > -1) {
                this.onUpdateView();
            }
        }
    }

    export class ChildShenbingMdr2 extends ChildShenbingMdr {
        protected _surfaceType = XianlvSurfaceType.Shenbing;
        protected _tabType = XianlvSecondTabType.Type2;
    }
}