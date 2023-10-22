namespace game.mod.daily {

    import ArrayCollection = eui.ArrayCollection;
    import DailyWanfaConfig = game.config.DailyWanfaConfig;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class WanfaMdr extends MdrBase implements UpdateItem {

        private _view: WanfaView = this.mark("_view", WanfaView);

        private _listTaskData: ArrayCollection;
        private _wanfaCfgs: DailyWanfaConfig[];

        protected onInit(): void {
            super.onInit();

            this._view.touchEnabled = false;
            this._view.horizontalCenter = 0;

            this._listTaskData = new ArrayCollection();
            this._view.list_item.itemRenderer = WanfaRender;
            this._view.list_item.dataProvider = this._listTaskData;
        }

        protected addListeners(): void {
            super.addListeners();

            this.onNt(WanfaEvent.UPDATE_WANFAN_LIST, this.updateInfo, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateInfo();

            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private updateInfo(): void {
            if (!this._wanfaCfgs) {
                this._wanfaCfgs = getConfigListByName(ConfigName.DailyWanfa);
            }
            this._listTaskData.replaceAll(this._wanfaCfgs);
        }

        update(time: base.Time): void {
            let len = this._view.list_item.numChildren;
            for (let i = 0; i < len; ++i) {
                let item = this._view.list_item.getChildAt(i) as WanfaRender;
                item.updateState();
            }
        }

    }
}