namespace game.mod.more {

    import RewardPreviewConfig = game.config.RewardPreviewConfig;

    export class XujieTansuoBusinessGridMdr extends MdrBase {
        private _view: XujieTansuoBusinessGridView = this.mark("_view", XujieTansuoBusinessGridView);
        private _proxy: XujieTansuoProxy;
        /**3_消耗货币id_消耗货币的数量_掉落id(奖励为必掉的)_奖励预览id*/
        private _data: number[];
        /**格子数据*/
        private _gridItemData: IXujieTansuoGridItemData;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(MoreEvent.ON_UPDATE_XUJIETANSUO_BASE_INFO, this.onUpdateView, this);
            this.onNt(ViewEvent.ON_VIEW_HIDE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._gridItemData = this._showArgs;
            this._data = this._gridItemData.grid;
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateView(): void {
            let data = this._gridItemData;
            let gridInfo = this._proxy.getGridInfo(data.type, data.layer, data.row, data.col);
            if (gridInfo && gridInfo.grid_type == XujieTansuoGridStatus.Null) {
                this.hide();
                return;
            }
            this.updateView();
        }

        private updateView(): void {
            let cfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, this._data[4]);
            if (cfg) {
                this._listData.replaceAll(cfg.content);
            }

            let cost = [this._data[1], this._data[2]];
            this._view.icon.data = cost;

            let bagCnt = BagUtil.getPropCntByIdx(cost[0]);
            let cnt = cost[1];
            let color = bagCnt >= cnt ? BlackColor.GREEN : BlackColor.RED;
            let str = TextUtil.addColor(`${StringUtil.getHurtNumStr(bagCnt)}/${StringUtil.getHurtNumStr(cnt)}`, color);
            this._view.icon.updateCnt(str);
        }

        private onClick(): void {
            if (!BagUtil.checkPropCntUp(this._data[1], this._data[2])) {
                return;
            }
            //商店格子购买
            let gridData = this._gridItemData;
            this._proxy.c2s_zhandui_xujietansuo_role_click(XujieTansuoOperType.Oper2, gridData.type, gridData.layer, gridData.row, gridData.col);
        }
    }
}