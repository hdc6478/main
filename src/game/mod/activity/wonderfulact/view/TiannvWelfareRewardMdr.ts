namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;

    export class TiannvWelfareRewardMdr extends EffectMdrBase {
        private _view: TiannvWelfareRewardView = this.mark("_view", TiannvWelfareRewardView);
        private _proxy: WonderfulActProxy;
        private _itemList: ArrayCollection;
        protected _showArgs: number;//传进来的是充值档位
        private _type: number = TiannvWelfareOpType.Tiannv;
        private _valueType: number;//充值档位

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = TiannvWelfareRewardItem;
            this._view.list_item.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.WonderfulAct);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(ActivityEvent.ON_UPDATE_TIANNV_WELFARE_INFO, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this._valueType = this._showArgs;
            this.onInfoUpdate();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onInfoUpdate(): void {
            this.updateItemList();
            this.updateTips();
        }

        private updateItemList(): void {
            let cfgList = this._proxy.getTiannvCfgs(this._valueType);
            let items = cfgList.concat();
            this._itemList.source = items;
        }

        private updateTips(): void {
            let tipsStr = getLanById(LanDef.tiannv_welfare_tips2);
            let rmb = this._proxy.getRmb(this._type);
            let rmbStr = TextUtil.addColor(rmb + "/" + this._valueType, rmb >= this._valueType ? WhiteColor.GREEN : WhiteColor.RED);
            tipsStr = StringUtil.substitute(tipsStr, [rmbStr]);
            this._view.lab_tips.textFlow = TextUtil.parseHtml(tipsStr);
        }

    }
}