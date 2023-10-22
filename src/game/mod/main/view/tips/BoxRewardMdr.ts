namespace game.mod.main {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import Handler = base.Handler;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class BoxRewardMdr extends MdrBase implements UpdateItem {
        private _view: BoxRewardView = this.mark("_view", BoxRewardView);

        protected _showArgs: BoxRewardData;

        private _rewardDatas: ArrayCollection;
        private _okFunc: Handler;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();

            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;

            this._rewardDatas = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._rewardDatas;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_ok, TouchEvent.TOUCH_TAP, this.btnOkFunc);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
        }

        private btnOkFunc(): void {
            this._okFunc && this._okFunc.exec();
            this.hide();
        }

        protected onShow(): void {
            super.onShow();
            if (this._showArgs.title) {
                this._view.secondPop.updateTitleStr(this._showArgs.title);
            }
            this.onUpdateView();
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onUpdateView(): void {
            let len: number = this._showArgs.reward.length;
            this._okFunc = this._showArgs.okFunc;

            let layout: eui.TileLayout = this._view.list_reward.layout as eui.TileLayout;
            layout.requestedColumnCount = len > 5 ? 5 : len;

            this._rewardDatas.source = this._showArgs.reward;
            this._view.lab_tip.textFlow = TextUtil.parseHtml(this._showArgs.tips);

            if (this._showArgs.tips1) {
                this._view.btn_ok.label = "扫荡";
                this._view.lab_tip1.textFlow = TextUtil.parseHtml(this._showArgs.tips1);
            }
            if (this._showArgs.btnStr) {
                this._view.btn_ok.label = this._showArgs.btnStr;
            }
            if (this._showArgs.time) {
                this._view.btn_ok.visible = false;
                this._view.lab_time.visible = true;
                TimeMgr.addUpdateItem(this, 1000);
                this.onUpdateTime();
            } else if (this._showArgs.btnTips) {
                this._view.btn_ok.visible = false;
                this._view.lab_time.visible = true;
                this._view.lab_time.textFlow = TextUtil.parseHtml(this._showArgs.btnTips);
            } else {
                this._view.btn_ok.visible = true;
                this._view.lab_time.visible = false;
            }
        }

        update(time: base.Time): void {
            this.onUpdateTime();
        }

        private onUpdateTime(): void {
            let leftTime = this._showArgs.time - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this._showArgs.time = 0;
                this.onUpdateView();
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.lab_time.text = TimeUtil.formatSecond(leftTime, 'HH时MM分ss秒', true) + this._showArgs.timeTips;
        }
    }
}