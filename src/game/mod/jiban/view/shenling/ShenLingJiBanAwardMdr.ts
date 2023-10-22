namespace game.mod.jiban {

    import TouchEvent = egret.TouchEvent;

    export class ShenLingJiBanAwardMdr extends MdrBase {
        private _view: ShenLingJiBanAwardView = this.mark("_view", ShenLingJiBanAwardView);
        private _proxy: IShenLingProxy;
        private _listData: eui.ArrayCollection;
        private _jiBanIndex: number;
        private _rewardList: number[] = [];//能够一键领取的奖励

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            this._view.list.itemRenderer = ShenLingJiBanAwardItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_oneKey, TouchEvent.TOUCH_TAP, this.onClick, this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            this.onNt(ShenLingEvent.ON_SHEN_LING_JI_BAN_UPDATE, this.onUpdateInfo, this);
        }

        protected onShow(): void {
            super.onShow();
            this._jiBanIndex = this._showArgs as number;
            if (!this._jiBanIndex) {
                return;
            }
            this.onUpdateInfo();
        }

        private onUpdateInfo(): void {
            let index = this._jiBanIndex;
            let cfgs = this._proxy.getJiBanCfg(index);
            let jiBanInfo = this._proxy.getJiBanInfo(index);
            let rewardList = jiBanInfo && jiBanInfo.reward_list ? jiBanInfo.reward_list : [];
            let list: IShenLingJiBanAwardItemData[] = [];
            for (let i = 0; i < cfgs.length; i++) {
                let cfg = cfgs[i];
                if (!cfg) {
                    continue;
                }
                list.push({
                    index: cfg.jibanid,
                    cfg: cfg,
                    status: rewardList[i] || 0,
                    jiBanLv: jiBanInfo && jiBanInfo.level || 0
                });
            }
            this._listData.replaceAll(list);

            this._rewardList = [];
            for (let i = 0; i < rewardList.length; i++) {
                if (rewardList[i] == 1) {
                    this._rewardList.push(i + 1);
                }
            }
            this._view.btn_oneKey.setHint(this._rewardList.length > 0);
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClick(): void {
            if (this._rewardList && this._rewardList.length) {
                this._proxy.c2s_god_brother_groupup(this._showArgs, this._rewardList, null);
            }
        }
    }
}