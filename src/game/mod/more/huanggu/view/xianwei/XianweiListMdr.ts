namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import XianweiBaseConfig = game.config.XianweiBaseConfig;
    import xianwei_member_data = msg.xianwei_member_data;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class XianweiListMdr extends MdrBase implements UpdateItem {
        private _view: XianweiListView = this.mark("_view", XianweiListView);

        private _proxy: XianweiProxy;
        private _listData: ArrayCollection = new ArrayCollection();
        private _listProp: ArrayCollection = new ArrayCollection();

        private _stage: number;
        private _index: number;
        private _idxs: number[] = [];
        private _delayIdx: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianwei);

            this._view.list.itemRenderer = XianweiListItem;
            this._view.list.dataProvider = this._listData;

            this._view.list_prop.itemRenderer = CoinItemCenter;
            this._view.list_prop.dataProvider = this._listProp;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(MoreEvent.ON_UPDATE_XIANWEI_LIST_INFO, this.onUpdateView, this);
            this.onNt(MainEvent.ON_CLOSE_COMMON_POPUP, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            let key: string[] = this._showArgs.split("_");
            this._stage = +key[0];
            this._index = +key[1];
            this._proxy.c2s_xianwei_branch_show(this._stage, this._index);
            TimeMgr.addUpdateItem(this, 1000);
        }

        private onUpdateView(): void {
            let cfg: XianweiBaseConfig = this._proxy.cfgArr.get(this._showArgs);
            this._listProp.replaceAll([cfg.score, cfg.coin]);
            this._view.img_title.source = `xianweititle${this._showArgs}`;

            let serverTime: number = TimeMgr.time.serverTimeSecond;
            let list = this._proxy.member_list;
            for (let i = 0; i < list.length; i++) {
                let member = list[i];
                if (member.end_time > serverTime) {
                    this._idxs.push(i);
                }
            }
            this._listData.replaceAll(list);
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
            this.onClearDelay();
        }

        update(time: base.Time): void {
            let serverTime: number = TimeMgr.time.serverTimeSecond;
            let is_open: boolean = this._proxy.is_open;
            let suffix: string = is_open ? "后重置" : "后开启";
            let endTIme: number = is_open ? this._proxy.open_time : this._proxy.end_time;
            let leftTime: number = endTIme - serverTime;
            if (leftTime <= 0) {
                this.onResult();
            }
            this._view.timeItem.updateLeftTime(leftTime, suffix, "");

            for (let k in this._listData.source) {
                let data: xianwei_member_data = this._listData.source[k];
                if (!data.end_time) {
                    continue;
                }
                if (serverTime >= data.end_time) {
                    this.onResult();
                    // continue;
                }
                this._listData.itemUpdated(data);
            }
        }

        private onResult(): void {
            this.onClearDelay();
            this._delayIdx = base.delayCall(base.Handler.alloc(this, () => {
                this._proxy.c2s_xianwei_branch_show(this._stage, this._index);
                this._delayIdx = 0;
            }), 200);
        }

        private onClearDelay(): void {
            if (this._delayIdx) {
                base.clearDelay(this._delayIdx);
                this._delayIdx = 0;
            }
        }
    }
}