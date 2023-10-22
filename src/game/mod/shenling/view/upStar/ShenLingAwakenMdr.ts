namespace game.mod.shenling {


    import TouchEvent = egret.TouchEvent;

    export class ShenLingAwakenMdr extends MdrBase {
        private _view: ShenLingAwakenView = this.mark("_view", ShenLingAwakenView);
        private _proxy: ShenLingProxy;
        private _listCost: eui.ArrayCollection;
        private _listReward: eui.ArrayCollection;

        _showArgs: { type: number, index: number };

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Shenling);
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listReward = new eui.ArrayCollection();
            this._view.list_cost.itemRenderer = CostIcon3;
            this._view.list_cost.dataProvider = this._listCost = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn_awaken, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(ShenLingEvent.ON_SHEN_LING_UPDATE_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this.updateView();
        }

        private updateView(): void {
            let args = this._showArgs;
            let info = this._proxy.getInfoByIndex(args.index);
            if (!info) {
                return;
            }

            let data: AvatarItemData = {
                cfg: this._proxy.getShenLingCfg(args.index),
                star: info.star,
                showHint: false,
                isBattle: false
            };
            this._view.item0.data = data;
            this._view.item0.setGray(false);

            let awakenStar = this._proxy.getMaxAwakenStar(args.index);
            let data1: AvatarItemData = {
                cfg: this._proxy.getShenLingCfg(args.index),
                star: info.star >= awakenStar ? info.star : info.star + 1,
                showHint: false,
                isBattle: false
            };
            this._view.item1.data = data1;
            this._view.item1.setGray(false);

            this._view.power.setPowerValue(info.attrs && info.attrs.showpower || 0);

            let maxStar = this._proxy.getMaxAwakenStar(args.index);
            let isMax = info.star >= maxStar;
            this._view.btn_awaken.visible = !isMax;
            this._view.img_max.visible = isMax;
            let cfg = this._proxy.getStarCfg(args.index, isMax ? maxStar : info.star + 1);
            if (!cfg) {
                return;
            }
            this._listReward.replaceAll(cfg.star_award.concat());
            this._listCost.replaceAll(cfg.star_consume.concat());

            this._view.btn_awaken.setHint(this._proxy.canAwaken(args.index));
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClick(): void {
            if (!this._proxy.canAwaken(this._showArgs.index, true)) {
                return;
            }
            this._proxy.c2s_god_brother_starup(this._showArgs.index);
        }
    }
}