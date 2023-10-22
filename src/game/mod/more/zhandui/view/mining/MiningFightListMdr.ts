namespace game.mod.more {


    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    export class MiningFightListMdr extends MdrBase {
        private _view: MiningFightListView = this.mark("_view", MiningFightListView);
        private _proxy: MiningProxy;
        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Mining);

            this._view.list.itemRenderer = MiningFightItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClickBtn);
            addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);

            this.onNt(MoreEvent.ON_UPDATE_MINING_FIGHT_INFO, this.onUpdateView, this);
            this.onNt(MoreEvent.ON_UPDATE_MINING_CNT_INFO, this.onUpdateCnt, this);
        }

        protected onShow(): void {
            if (this._proxy.refresh_list || !this._proxy.conquest_list || !this._proxy.conquest_list.length) {
                this._proxy.c2s_zhandui_conquer_show();
                this._proxy.refresh_list = false;
            }
            super.onShow();
            this.onUpdateView();
            this.onUpdateCnt();
        }

        private onUpdateView(): void {
            this._listData.replaceAll(this._proxy.conquest_list);
        }


        private onUpdateCnt(): void {
            let conquer_num: number = this._proxy.conquer_num;
            let team_conquest_num: number = this._proxy.team_conquest_num;
            let color = !conquer_num ? WhiteColor.RED : WhiteColor.GREEN;
            this._view.lab_count.textFlow = TextUtil.parseHtml(`次数：${TextUtil.addColor(`${conquer_num}/${team_conquest_num}`, color)}`);
        }

        private onClickBtn(): void {
            // if (this._refreshTime && TimeMgr.time.serverTimeSecond - this._refreshTime < 30) {
            //     PromptBox.getIns().show(getLanById(LanDef.zhanduishengxu_tips11));
            //     return;
            // }
            // this._refreshTime = TimeMgr.time.serverTimeSecond;
            if (!this._proxy.conquer_num) {
                PromptBox.getIns().show("次数不足");
                return;
            }
            this._proxy.c2s_zhandui_conquer_show();
        }

        private onClickAdd(): void {
            if (!this._proxy.dail_buy_num) {
                PromptBox.getIns().show(getLanById(LanDef.bahuang_tips18));
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.MiningBuy);
        }

        protected onHide(): void {
            super.onHide();
            // this._refreshTime = 0;
        }
    }
}