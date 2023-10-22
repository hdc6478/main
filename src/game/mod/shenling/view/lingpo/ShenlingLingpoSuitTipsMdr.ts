namespace game.mod.shenling {

    import ShenlingLingpoTypeConfig = game.config.ShenlingLingpoTypeConfig;
    import attributes = msg.attributes;
    import LanDef = game.localization.LanDef;

    export class ShenlingLingpoSuitTipsMdr extends MdrBase {
        private _view: ShenlingLingpoIconTipsView = this.mark("_view", ShenlingLingpoIconTipsView);
        private _proxy: ShenlingLingpoProxy;

        _showArgs: number;//灵魄id
        private _cfg: ShenlingLingpoTypeConfig;
        private _suitAttrIds: number[];
        private _nextSuitAttrIds: number[];

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.ShenlingLingpo);
            this._view.gr_cost.visible = false;
            this._view.btn_do.x = 276;
            this._view.btn_do.y = 880;
            if (this._view.descItem.parent) {
                this._view.descItem.parent.removeChild(this._view.descItem);
            }
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickBtn, this);
            this.onNt(ShenLingEvent.ON_SHEN_LING_LING_PO_UPDATE, this.updateView, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.onUpdateAttr, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._cfg = this._proxy.getTypeCfg(this._showArgs);
            if (!this._cfg) {
                return;
            }
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._suitAttrIds = null;
            this._nextSuitAttrIds = null;
        }

        private updateView(): void {
            this._view.propTips.updateShowByArgs(this._cfg.quality, this._cfg.name, this._cfg.icon);

            let isMax = this._proxy.isSuitLevelMax(this._showArgs);
            this._view.img_max.visible = isMax;
            this._view.btn_do.visible = !this._view.img_max.visible;
            let info = this._proxy.getInfo(this._showArgs);
            let suitLv = info && info.suit_level || 0;
            this._view.btn_do.label = suitLv ? getLanById(LanDef.rank_up) : getLanById(LanDef.active);
            if (this._view.btn_do.visible) {
                this._view.btn_do.setHint(this._proxy.canActOrUpSuit(this._showArgs));
            }

            if (info && info.suit_attrs && Object.keys(info.suit_attrs).length > 0) {
                this.updateSuitAttr(info.suit_attrs);
            } else {
                let cfg = this._proxy.getConfig(this._showArgs, 1);
                this._suitAttrIds = cfg.suit_attr;
                let suitAttrs = RoleUtil.getAttrList(this._suitAttrIds);
                if (suitAttrs && suitAttrs.length) {
                    this.updateSuitAttr(TextUtil.calcAttrList(suitAttrs));
                }
            }

            let isShowNext = !isMax && suitLv > 0;
            this._view.lingpoAttrItem1.visible = isShowNext;
            if (isShowNext) {
                let nextCfg = this._proxy.getConfig(this._showArgs, suitLv + 1);
                this._nextSuitAttrIds = nextCfg.suit_attr;
                let suitAttrs = RoleUtil.getAttrList(this._nextSuitAttrIds);
                if (suitAttrs && suitAttrs.length) {
                    this.updateNextSuitAttr(TextUtil.calcAttrList(suitAttrs));
                }
            }
        }

        private onUpdateAttr(): void {
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

        private updateSuitAttr(attr: attributes): void {
            if (!attr) {
                return;
            }

            this._view.lingpoAttrItem0.updateInfo(this._showArgs, attr);
        }

        private updateNextSuitAttr(attr: attributes): void {
            if (!attr) {
                return;
            }
            this._view.lingpoAttrItem1.updateNextInfo(this._showArgs, attr);
        }

        private onClickBtn(): void {
            if (!this._proxy.canActOrUpSuit(this._showArgs, true)) {
                return;
            }
            this._proxy.c2s_god_brother_lingpo_click(3, this._showArgs);
        }
    }
}