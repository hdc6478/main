namespace game.mod.shenling {

    import PropConfig = game.config.PropConfig;
    import attributes = msg.attributes;

    export class ShenlingLingpoIconTipsBagMdr extends MdrBase {
        private _view: ShenlingLingpoIconTipsBagView = this.mark("_view", ShenlingLingpoIconTipsBagView);
        private _proxy: ShenlingLingpoProxy;

        _showArgs: PropData;
        private _baseAttrIds: number[];
        private _suitAttrIds: number[];
        private _nextSuitAttrIds: number[];

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.ShenlingLingpo);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.onUpdateAttr, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._view.propTips.updateShow(this._showArgs.index);
            this._view.power.setPowerValue(this._showArgs.cfg.showPower);
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;
            this._baseAttrIds = null;
            this._suitAttrIds = null;
            this._nextSuitAttrIds = null;
        }

        //[灵魄Id, 几号位]
        private getLingpoAry(): number[] {
            let cfg = this._showArgs.cfg as PropConfig;
            return cfg.param1[0];
        }

        private updateView(): void {
            let data = this._showArgs;
            let cfg: PropConfig = data.cfg;
            let ary = this.getLingpoAry();
            let lingpoId = ary[0];
            let lingpoIdx = ary[1];

            //基础属性
            let info = this._proxy.getIconInfo(lingpoId, lingpoIdx);
            if (info && info.base_attrs) {
                this.updateBaseAttr(info.base_attrs);
            } else {
                let nextCfg = this._proxy.getConfig(lingpoId, 1);
                this._baseAttrIds = nextCfg.attr_base[lingpoIdx - 1];
                let attrs = RoleUtil.getAttrList(this._baseAttrIds);
                if (attrs) {
                    this.updateBaseAttr(TextUtil.calcAttrList(attrs));
                }
            }

            //套装属性
            let suitLv = this._proxy.getSuitLevel(lingpoId);
            let suitCfg = this._proxy.getConfig(lingpoId, suitLv || 1);
            this._suitAttrIds = suitCfg ? suitCfg.suit_attr : null;
            let suitAttrs = RoleUtil.getAttrList(this._suitAttrIds);
            if (suitAttrs && suitAttrs.length) {
                this.updateSuitAttr(TextUtil.calcAttrList(suitAttrs));
            }

            let isMax = this._proxy.isSuitLevelMax(lingpoId) || 0;
            let isShowNext = !isMax && suitLv > 0;
            if (isShowNext) {
                this._view.lingpoAttrItem1.includeInLayout = true;
                this._view.lingpoAttrItem1.visible = true;
                let nextCfg = this._proxy.getConfig(lingpoId, suitLv + 1);
                this._nextSuitAttrIds = nextCfg.suit_attr;
                let suitAttrs = RoleUtil.getAttrList(this._nextSuitAttrIds);
                if (suitAttrs && suitAttrs.length) {
                    this.updateNextSuitAttr(TextUtil.calcAttrList(suitAttrs));
                }
            } else {
                this._view.lingpoAttrItem1.includeInLayout = false;
                this._view.lingpoAttrItem1.visible = false;
            }

            //道具描述
            this._view.descItem1.updateShow(cfg.desc);
            //获取途径
            this._view.propGainList.updateShow(cfg.gain_id);
        }

        private onUpdateAttr(): void {
            let attrs = RoleUtil.getAttrList(this._baseAttrIds);
            if (this._baseAttrIds && attrs && attrs.length) {
                this.updateBaseAttr(TextUtil.calcAttrList(attrs));
                this._baseAttrIds = null;
            }
            let suitAttrs = RoleUtil.getAttrList(this._suitAttrIds);
            if (suitAttrs && suitAttrs.length) {
                this.updateSuitAttr(TextUtil.calcAttrList(suitAttrs));
                this._suitAttrIds = null;
            }
            let nextSuitAttrs = RoleUtil.getAttrList(this._nextSuitAttrIds);
            if (nextSuitAttrs && nextSuitAttrs.length) {
                this.updateNextSuitAttr(TextUtil.calcAttrList(nextSuitAttrs));
                this._nextSuitAttrIds = null;
            }
        }

        private updateBaseAttr(attr: attributes): void {
            if (!attr) {
                return;
            }
            this._view.descItem0.updateShow(TextUtil.getAttrTextInfos(attr, BlackColor.GREEN, '\n', ' +', BlackColor.DEFAULT).join('\n'), '基础属性');
        }

        private updateSuitAttr(attr: attributes): void {
            if (!attr) {
                return;
            }
            let ary = this.getLingpoAry();
            this._view.lingpoAttrItem0.updateInfo(ary[0], attr);
        }

        private updateNextSuitAttr(attr: attributes): void {
            if (!attr) {
                return;
            }
            let ary = this.getLingpoAry();
            this._view.lingpoAttrItem1.updateNextInfo(ary[0], attr);
        }
    }
}