namespace game.mod.xianyuan {

    import GameNT = base.GameNT;

    export class XianlvZhaohuanMdr extends MdrBase {
        private _view: XianlvZhaohuanView = this.mark("_view", XianlvZhaohuanView);
        private _proxy: XianlvProxy;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianlv);
            this._view.list.itemRenderer = XianlvZhaohuanItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateByPropIndex, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let list: IXianlvZhaohuanData[] = [];
            let costs = this._proxy.getZhaohuanCosts();
            for (let i = 0; i < costs.length; i++) {
                list.push({
                    cost: costs[i],
                    hint: this._proxy.canZhaohuanByOper(i + 1),
                    oper: i + 1
                });
            }
            this._listData.replaceAll(list);
        }

        private onRoleUpdate(n: GameNT): void {
            let keys = n.body as string[];
            if (keys.indexOf(RolePropertyKey.Xtlqcoin) > -1) {
                this.updateView();
            }
        }

        private onBagUpdateByPropIndex(n: GameNT): void {
            let indexs = n.body as number[];
            let costs = this._proxy.getZhaohuanCosts();
            for (let cost of costs) {
                if (indexs.indexOf(cost[0]) > -1) {
                    this.updateView();
                    break;
                }
            }
        }
    }
}