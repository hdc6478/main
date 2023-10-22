namespace game.mod.shilian {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class YuanLingResultMdr extends MdrBase implements UpdateItem {
        private _view: YuanLingResultView = this.mark("_view", YuanLingResultView);
        private _proxy: YuanLingProxy;
        protected _showArgs: msg.s2c_instance_fin;
        private _endTime = 0;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.YuanlingFuben);
            this._view.list.itemRenderer = YuanLingResultItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(ShilianEvent.ON_YUANLING_DAMAGE_INFO_UPDATE, this.onUpdateList, this);
        }

        protected onShow(): void {
            super.onShow();
            let msg = this._showArgs;
            if (!msg) {
                return;
            }
            let param = msg.params;
            this._view.lb_layer.text = param[1] + '';
            let time = param[2] as number;
            let mins = Math.floor(time / 60);
            let seconds = time % 60;
            this._view.lb_time.text = `${mins < 10 ? '0' + mins : mins}分${seconds < 10 ? '0' + seconds : seconds}秒`;
            this._endTime = TimeMgr.time.serverTimeSecond + 10;
            TimeMgr.addUpdateItem(this, 1000);
            this._view.lb_cd.text = StringUtil.substitute(getLanById(LanDef.close_countdown), [10]);
            this.onUpdateList();
        }

        protected onHide(): void {
            super.onHide();
            // 打开翻牌界面 判断是否使用收益次数。使用则不需要打开这个界面
            let isUse = this._showArgs && this._showArgs.params && this._showArgs.params[3] || 0;
            if (isUse != 1) {
                SceneUtil.exitScene();
                return;
            }
            facade.showView(ModName.Shilian, ShilianViewType.YuanLingReward, this._showArgs);
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                this.hide();
                return;
            }
            this._view.lb_cd.text = StringUtil.substitute(getLanById(LanDef.close_countdown), [leftTime]);
        }

        private onUpdateList(): void {
            this._listData.replaceAll(this._proxy.model.damage_info);
        }
    }
}