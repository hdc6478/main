namespace game.mod.compete {

    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import ParamConfig = game.config.ParamConfig;

    export class KuafuDoufaTipsMdr extends EffectMdrBase implements UpdateItem {
        private _view: BossTipsView = this.mark("_view", BossTipsView);
        private _proxy: CompeteProxy;
        private _itemList: ArrayCollection = new ArrayCollection();

        private _endTime: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Compete);

            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClick);
        }

        protected onShow(): void {
            super.onShow();

            this.onUpdateView();
            this.updateLeftTime();
            TimeMgr.addUpdateItem(this, 1000);
        }

        private onUpdateView(): void {
            this._endTime = this._proxy.getNextTime();

            let cfg: ParamConfig = GameConfig.getParamConfigById("kuafu_doufa_reward");
            let list: number[][] = cfg.value;
            this._itemList.source = list;

            this._view.lab_desc.textFlow = TextUtil.parseHtml(getLanById(LanDef.kuafu_doufa_tips10));

            this._view.btn_get.setEffect(UIEftSrc.Tiaozhan);
        }

        private onClick(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.KuafuDoufa);
            this.hide();
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
            PropTipsMgr.getIns().closeBoss();//继续boss弹窗
        }

        update(time: base.Time): void {
            this.updateLeftTime();
        }

        private updateLeftTime(): void {
            let leftTime: number = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this.hide();
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }
    }
}