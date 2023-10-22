namespace game.mod.more {

    export class XujieTansuoRewardGridMdr extends MdrBase {
        private _view: XujieTansuoRewardGridView = this.mark("_view", XujieTansuoRewardGridView);
        private _proxy: XujieTansuoProxy;
        /**2_任务id*/
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
            let taskId = this._data[1];
            let task = TaskUtil.getTask(taskId);
            if (!task) {
                DEBUG && console.error(`没有 ${taskId} 任务数据`);
                return;
            }
            let taskDesc = TaskUtil.getTaskDesc(task);
            this._view.lb_cond.textFlow = TextUtil.parseHtml(taskDesc);
            let taskCfg = TaskUtil.getCfg(taskId);
            this._listData.replaceAll(taskCfg.rewards);
        }

        // todo gridview需监听任务变化，刷新grid状态
        private onClick(): void {
            let taskId = this._data[1];
            let task = TaskUtil.getTask(taskId);
            TaskUtil.clickTask(task);
        }
    }
}