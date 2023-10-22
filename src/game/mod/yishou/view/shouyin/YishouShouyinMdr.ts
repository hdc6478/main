namespace game.mod.yishou {

    import YishouShouyingConfig = game.config.YishouShouyingConfig;
    import LanDef = game.localization.LanDef;

    export class YishouShouyinMdr extends EffectMdrBase {
        protected _view: YishouShouyinView = this.mark("_view", YishouShouyinView);
        protected _proxy: YishouProxy;
        /**二级页签类型*/
        protected _type = YishouShouyinType.Type1;

        private _listData: eui.ArrayCollection;
        private _selIdx = 0;
        private _selCfg: YishouShouyingConfig;
        private _effId: number;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Yishou);
            this._view.list.itemRenderer = AvatarItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_jiban, egret.TouchEvent.TOUCH_TAP, this.onClickJiban, this);
            addEventListener(this._view.btn_upstar, egret.TouchEvent.TOUCH_TAP, this.onClickUpstar, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            this.onNt(YishouEvent.ON_UPDATE_YISHOU_SHOUYIN_INFO, this.onUpdateView, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePower, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = 0;
            this._selCfg = null;
            this.removeEffect(this._effId);
            this._effId = null;
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollH = 0;
        }

        private onUpdateView(): void {
            this.updateListData();
            this.updateView();
        }

        private updateListData(): void {
            let cfgList = this._proxy.getShouyinCfgList(this._type);
            let list: AvatarItemData[] = [];
            for (let cfg of cfgList) {
                let info = this._proxy.getShouyinInfo(cfg.index);
                list.push({
                    cfg,
                    showHint: this._proxy.canShouyinActOrUp(cfg.index),
                    star: info && info.star || 0,
                    isBattle: false,
                    isSel: false
                });
            }
            list.sort((a, b) => {
                if (a.showHint != b.showHint) {
                    return a.showHint ? -1 : 1;
                }
                if (a.star != b.star) {
                    return a.star ? -1 : 1;
                }
                return b.cfg.quality - a.cfg.quality;
            });

            let size = list.length || 0;
            if (this._selCfg) {
                for (let i = 0; i < size; i++) {
                    if (this._selCfg.index == list[i].cfg.index) {
                        this._selIdx = i;
                        break;
                    }
                }
            } else {
                if (list[this._selIdx]) {
                    this._selCfg = list[this._selIdx].cfg;
                }
            }
            for (let i = 0; i < size; i++) {
                list[i].isSel = this._selIdx == i;
            }

            this._listData.replaceAll(list);
            this._view.list.selectedIndex = this._selIdx;
        }

        private updateView(): void {
            if (!this._selCfg) {
                return;
            }
            let cfg = this._selCfg;
            this._view.nameItem.updateShow(cfg.name, cfg.quality);
            this._view.img_icon.source = ResUtil.getShouyinSrc(cfg.index);
            // this.removeEffect(this._effId);
            // this._effId = this.addAnimate(cfg.index, this._view.gr_eft);

            this.updatePower();
            this.updateCost();
            this._view.btn_jiban.setHint(this._proxy.getJibanBtnHint());
        }

        private updatePower(): void {
            if (!this._selCfg) {
                return;
            }
            let star = this._proxy.getShouyinStar(this._selCfg.index);
            let starIdx = 0;
            if (star) {
                starIdx = star - 1;
            }
            let attrId = this._selCfg.attr_id[starIdx];
            let attr = RoleUtil.getAttr(attrId);
            this._view.btn_god.updateGod(attr && attr.god || 0);
            this._view.power.setPowerValue(attr && attr.showpower || 0);
        }

        private updateCost(): void {
            let index = this._selCfg.index;
            let isMax = this._proxy.isShouyinMaxStar(index);
            if (isMax) {
                this._view.btn_upstar.updateMaxStar();
                return;
            }
            let star = this._proxy.getShouyinStar(index);
            let cost = this._selCfg.material[star];
            let tips = '';
            if (star) {
                let power = this._selCfg.star_power[star];
                let starPower = Math.floor(power / 100);
                tips = getLanById(LanDef.upstar) + getLanById(LanDef.showpower) + "\n"
                    + TextUtil.addColor(`+${starPower}%`, WhiteColor.GREEN);
            }
            this._view.btn_upstar.updateCost(cost, !!star, tips);
            this._view.btn_upstar.setHint(this._proxy.canShouyinActOrUp(index));
        }

        private onClickJiban(): void {
            ViewMgr.getIns().showView(ModName.Jiban, JibanViewType.JibanMain, JibanMainBtnType.YishouShouyin);
        }

        private onClickUpstar(): void {
            let index = this._selCfg.index;
            if (this._proxy.canShouyinActOrUp(index, true)) {
                this._proxy.c2s_yishou_shouying_up_star(index);
            }
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
            let curData = e.item as AvatarItemData;
            curData.isSel = true;
            this._listData.itemUpdated(curData);
            this._selIdx = itemIdx;
            this._selCfg = curData.cfg;
            this.updateView();
        }
    }

    export class YishouShouyinMdr2 extends YishouShouyinMdr {
        protected _type = YishouShouyinType.Type2;
    }

    export class YishouShouyinMdr3 extends YishouShouyinMdr {
        protected _type = YishouShouyinType.Type3;
    }
}