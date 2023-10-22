namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import HuangguGiftConfig = game.config.HuangguGiftConfig;

    export class GoddessTargetMdr extends EffectMdrBase {
        private _view: GoddessTargetView = this.mark("_view", GoddessTargetView);
        private _proxy: HuangguProxy;
        private _itemList: ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Huanggu);

            this._itemList = new ArrayCollection();
            this._view.list.itemRenderer = GoddessTargetRender;
            this._view.list.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(HuangguEvent.ON_UPDATE_GODDESS_TARGET_INFO, this.updateItemList, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateItemList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private initShow(): void {
            let cfgList: HuangguGiftConfig[] = getConfigListByName(ConfigName.HuangguGift);
            let rewards = cfgList[cfgList.length - 1].reward2;
            this._view.icon_bigreward.setData(rewards[0]);
        }

        private updateItemList(): void {
            let cfgList: HuangguGiftConfig[] = getConfigListByName(ConfigName.HuangguGift);
            if(this._itemList.source.length){
                this._itemList.replaceAll(cfgList);
            }
            else {
                this._itemList.source = cfgList;
            }
        }

    }
}