namespace game.mod.role {

    import DabiaojiangliConfig = game.config.DabiaojiangliConfig;

    export class SuitGiftMdr extends MdrBase {
        private _view: BaseGiftView = this.mark("_view", BaseGiftView);
        private _proxy: SuitProxy;
        private _giftProxy: IGiftProxy;
        private _listData: eui.ArrayCollection;

        private _type: GiftType;
        private _cfgList: DabiaojiangliConfig[] = [];

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Suit);
            this._giftProxy = getProxy(ModName.Gift, ProxyType.Gift);
            this._view.list.itemRenderer = SuitGiftItemRender;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(GiftEvent.ON_UPDATE_GIFT_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._cfgList = [];
            this._type = this._showArgs[0];
            this._view.updateBanner(this._type == GiftType.SuitType1 ? 'cangtian_guanggaotu' : 'yantian_guanggaotu');
            let cfgs = getConfigByNameId(ConfigName.Dabiaojiangli, this._type);
            for (let key in cfgs) {
                this._cfgList.push(cfgs[key]);
            }
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._cfgList = [];
        }

        private updateView(): void {
            let canList: ISuitGiftItemData[] = [];
            let list: ISuitGiftItemData[] = [];
            let doneList: ISuitGiftItemData[] = [];

            for (let i = 0; i < this._cfgList.length; i++) {
                let cfg = this._cfgList[i];
                if (!cfg) {
                    continue;
                }
                if (this._cfgList.length - 1 == i) {
                    this._view.updateBigReward(cfg.award[0]);
                }
                let info = this._giftProxy.getGiftStatus(this._type, cfg.index);
                let item: ISuitGiftItemData = {
                    cfg,
                    status: info,
                    type: this._type - 1 //套装类型需要-1
                };
                if (info && info.status == 2) {
                    doneList.push(item);
                } else if (info && info.status == 1) {
                    canList.push(item);
                } else {
                    list.push(item);
                }
            }
            this._listData.replaceAll(canList.concat(list, doneList));
        }
    }
}