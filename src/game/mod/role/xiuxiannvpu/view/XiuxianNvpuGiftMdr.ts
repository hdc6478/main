namespace game.mod.role {

    import AyahTargetConfig = game.config.AyahTargetConfig;

    export class XiuxianNvpuGiftMdr extends MdrBase {
        private _view: BaseGiftView = this.mark("_view", BaseGiftView);
        private _proxy: XiuxianNvpuProxy;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XiuxianNvpu);
            this._view.list.itemRenderer = XiuxianNvpuGiftItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.timeItem.visible = this._view.iconBigReward.visible = false;
            this._view.img_banner.source=ResUtil.getUiPng("xiuxiannvpuguanggao");
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(RoleEvent.ON_XIUXIANNVPU_INFO_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let cfgList: AyahTargetConfig[] = getConfigListByName(ConfigName.XiuxianNvpuTarget);
            this._listData.replaceAll(cfgList);
        }
    }
}