namespace game.mod.activity {

    import GameNT = base.GameNT;

    export class FuchenlinghuXianlingMdr extends EffectMdrBase {
        private _view: FuchenlinghuXianlingView = this.mark("_view", FuchenlinghuXianlingView);
        private _proxy: FuchenlinghuProxy;
        private _seaType: SeaType;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Fuchenlinghu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.rect, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            addEventListener(this._view.btn_refresh, egret.TouchEvent.TOUCH_TAP, this.onClickChange, this);
            this.onNt(ActivityEvent.ON_UPDATE_FUCHENLINGHU_INFO, this.updateView, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateByPropIndex, this);
        }

        protected onShow(): void {
            super.onShow();
            this._seaType = this._showArgs;
            if (!this._seaType) {
                return;
            }
            this.updateView();
            this.addEftByParent('xitongjihuo', this._view.gr_eff, 0, 0);
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            this._seaType = this._proxy.type;
            this.updateCost();
            this._view.btn_refresh.img.source = 'fuchenlinghu_seaname' + this._seaType;

            let extraProps = this._proxy.getExtraProps(this._seaType);
            for (let i = 0; i < 6; i++) {
                let icon = this._view[`icon${i}`] as Icon;
                if (!icon) {
                    continue;
                }
                icon.data = extraProps[i];
            }
        }

        private updateCost(): void {
            this._view.costIcon.updateShow(this._proxy.getCostSpecial());
        }

        private onClick(): void {
            if (this._proxy.canXianling(this._seaType, true)) {
                this._proxy.c2s_linghu_oper(FuchenlinghuOperType.Oper4);
            }
        }

        private onClickChange(): void {
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.FuchenlinghuRefresh, this._seaType);
        }

        private onBagUpdateByPropIndex(n: GameNT): void {
            let indexs = n.body as number[];
            let cost = this._proxy.getCostSpecial();
            if (cost && indexs.indexOf(cost[0]) > -1) {
                this.updateCost();
            }
        }
    }
}