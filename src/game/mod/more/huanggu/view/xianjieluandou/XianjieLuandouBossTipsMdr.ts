namespace game.mod.more {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    export class XianjieLuandouBossTipsMdr extends MdrBase implements UpdateItem {
        private _view: BossTipsView = this.mark("_view", BossTipsView);
        private _proxy: XianjieLuandouProxy;
        private _listData: eui.ArrayCollection;
        private _endTime: number;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XianjieLuandou);
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_get, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected onShow(): void {
            super.onShow();

            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            this._endTime = this._proxy.show_time_sec;
            this._listData.replaceAll(this._proxy.show_rewards);

            this._view.lab_desc.textFlow = TextUtil.parseHtml(getLanById(LanDef.xianjieluandou_tips19));
            this._view.btn_get.setEffect(UIEftSrc.Tiaozhan);
        }

        private onClick(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.XianjieLuandouMain);
            this.hide();
        }

        update(time: base.Time) {
            let leftTime: number = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this.hide();
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }
    }
}