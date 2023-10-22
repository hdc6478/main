namespace game.mod.shenling {

    import attributes = msg.attributes;
    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;

    export class ShenlingLingpoIconTipsMdr extends MdrBase {
        private _view: ShenlingLingpoIconTipsView = this.mark("_view", ShenlingLingpoIconTipsView);
        private _proxy: ShenlingLingpoProxy;

        _showArgs: IShenlingLingpoIconData;
        private _baseAttrIds: number[];
        private _suitAttrIds: number[];
        private _costCnt = 0;
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
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickBtn, this);
            this.onNt(ShenLingEvent.ON_SHEN_LING_LING_PO_UPDATE, this.onUpdateView, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.onUpdateAttr, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._view.propTips.updateShow(this._showArgs.index);
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

        private onUpdateView(): void {
            let info = this._proxy.getIconInfo(this._showArgs.id, this._showArgs.idx);
            if (info) {
                this._showArgs.level = info.level;//重赋值level，避免意外使用到level出现bug
            }
            this.updateView();
        }

        private updateView(): void {
            let args = this._showArgs;
            let info = this._proxy.getIconInfo(args.id, args.idx);
            let level = info && info.level || 0;
            let nextCfg = this._proxy.getConfig(args.id, level + 1);
            this._view.btn_do.label = level > 0 ? getLanById(LanDef.uplv) : getLanById(LanDef.active);
            this._view.gr_cost.visible = this._view.btn_do.visible = !!nextCfg;
            this._view.img_max.visible = !this._view.btn_do.visible;
            if (nextCfg) {
                this._view.img_max.visible = false;
                let cost = nextCfg.cost[args.idx - 1];
                this._view.icon_cost.data = cost;
                this._view.icon_cost.updateCostLab(cost);
                this._costCnt = cost[1];
                this._view.btn_do.setHint(this._proxy.canActOrUp(args.id, args.idx));
                this._view.bar.show(0, cost[1], false, 0, false, ProgressBarType.Value);
            } else {
                nextCfg = this._proxy.getConfig(args.id, level);//没有则获取满阶配置
            }

            if (info && info.base_attrs) {
                this.updateBaseAttr(info.base_attrs);
            } else {
                this._baseAttrIds = nextCfg.attr_base[args.idx - 1];
                let attrs = RoleUtil.getAttrList(this._baseAttrIds);
                if (attrs) {
                    this.updateBaseAttr(TextUtil.calcAttrList(attrs));
                }
            }

            let suitLv = this._proxy.getSuitLevel(args.id);
            let suitCfg = this._proxy.getConfig(args.id, suitLv || 1);
            this._suitAttrIds = suitCfg ? suitCfg.suit_attr : null;
            let suitAttrs = RoleUtil.getAttrList(this._suitAttrIds);
            if (suitAttrs && suitAttrs.length) {
                this.updateSuitAttr(TextUtil.calcAttrList(suitAttrs));
            }

            let isMax = this._proxy.isSuitLevelMax(args.id) || 0;
            let isShowNext = !isMax && suitLv > 0;
            this._view.lingpoAttrItem1.visible = isShowNext;
            if (isShowNext) {
                let nextCfg = this._proxy.getConfig(args.id, suitLv + 1);
                this._nextSuitAttrIds = nextCfg.suit_attr;
                let suitAttrs = RoleUtil.getAttrList(this._nextSuitAttrIds);
                if (suitAttrs && suitAttrs.length) {
                    this.updateNextSuitAttr(TextUtil.calcAttrList(suitAttrs));
                }
            }
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
            this._view.descItem.updateShow(TextUtil.getAttrTextInfos(attr, BlackColor.GREEN, '\n', ' +', BlackColor.DEFAULT).join('\n'), '基础属性');
        }

        private updateSuitAttr(attr: attributes): void {
            if (!attr) {
                return;
            }

            this._view.lingpoAttrItem0.updateInfo(this._showArgs.id, attr);
        }

        private updateNextSuitAttr(attr: attributes): void {
            if (!attr) {
                return;
            }
            this._view.lingpoAttrItem1.updateNextInfo(this._showArgs.id, attr);
        }

        private onClickBtn(): void {
            let args = this._showArgs;
            if (!this._proxy.canActOrUp(args.id, args.idx, true)) {
                return;
            }
            if (this._costCnt) {
                this._view.bar.show(this._costCnt, this._costCnt, true, 0, false, ProgressBarType.Value,
                    Handler.alloc(this, this.onceCallBack));
            }
        }

        private onceCallBack(): void {
            this._proxy.c2s_god_brother_lingpo_click(1, this._showArgs.id, this._showArgs.idx);
        }
    }
}