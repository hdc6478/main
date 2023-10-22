namespace game.mod.activity {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class CarnivalMibaoRewardMdr extends MdrBase {
        protected _view: CarnivalMibaoRewardView = this.mark("_view", CarnivalMibaoRewardView);
        protected _showArgs: {data: CarnivalMibaoData, actId: number};
        private _info: {data: CarnivalMibaoData, actId: number};

        protected _listData: eui.ArrayCollection;
        private _carnivalProxy: CarnivalProxy;
        private _cost: number[];

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();

            this._carnivalProxy = this.retProxy(ProxyType.Carnival);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn_buy, TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(ActivityEvent.ON_CARNIVAL_MIBAO_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onInfoUpdate(): void {
            let data = this._info.data;
            let actId = this._info.actId;
            let index = data.reward.index;
            let hasDraw = this._carnivalProxy.hasMibaoDraw(actId, index);
            this.updateState(hasDraw);
        }

        protected onClick(): void {
            if (!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                return;
            }
            let data = this._info.data;
            let reward = data.reward;
            let index = reward.index;
            let actId = this._info.actId;
            this._carnivalProxy.c2s_activity_kuanghuan_mibao_get_reward(actId, index);
            this.hide();
        }

        private initShow(): void {
            this._info = this._showArgs;
            let data = this._info.data;
            let reward = data.reward;
            let index = reward.index;
            let titleStr = getLanById("carnival_mibao_tips" + index);
            this._view.secondPop.updateTitleStr(titleStr);
            this._listData.source = reward.rewards;
            let tipsStr = getLanById(LanDef.carnival_tips2);
            this._view.lab_tips.text = tipsStr;

            let limit = this._carnivalProxy.getMibaoLimit(reward);
            this._cost = [PropIndex.Xingshi, limit];
            this._view.btn_buy.setCost(this._cost);

            let hasDraw = data.hasDraw;
            this.updateState(hasDraw);
        }

        private updateState(hasDraw: boolean): void {
            let data = this._info.data;
            let canDraw = data.canDraw;
            let hasLastDraw = data.hasLastDarw;
            this._view.img_state.visible = hasDraw;
            this._view.lab_tips.visible = !hasLastDraw;
            this._view.btn_buy.visible = !hasDraw && hasLastDraw;
            this._view.btn_buy.redPoint.visible = canDraw;
        }
    }
}