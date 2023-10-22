namespace game.mod {

    import Handler = base.Handler;
    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;

    /**
     * 基础的奖励领取界面
     */
    export class BaseRewardMdr extends MdrBase {
        protected _view: BaseRewardView = this.mark("_view", BaseRewardView);

        /**
         * titleStr 面板标题，传空，默认奖励预览
         * reward 奖励数组[[index, count], [index, count], ...]
         * state: 领取状态 0：未完成，1: 可领取，2：已领取
         * handler: 点击领取按钮回调
         * tipsStr 提示文本，存在提示文本时，不显示领取状态
         * @protected
         */
        protected _showArgs: {
            titleStr: string, reward: number[][],
            state: number, handler: Handler, tipsStr?: string
        };

        protected _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(MainEvent.UPDATE_BASE_REWARD_MDR_STATE, this.onUpdateState, this);
        }

        protected onShow(): void {
            super.onShow();
            let titleStr = this._showArgs.titleStr || getLanById(LanDef.relic2);//奖励预览
            this._view.secondPop.updateTitleStr(titleStr);
            this._listData.replaceAll(this._showArgs.reward || []);
            let state = this._showArgs.state || 0;
            this.updateState(state);
        }

        private updateState(state: number): void {
            let tipsStr = this._showArgs.tipsStr;
            if(tipsStr){
                //存在提示文本时，不显示领取状态
                this._view.lab_tips.textFlow = TextUtil.parseHtml(tipsStr);
                this._view.btn_get.visible = this._view.img_state.visible = false;
            }
            else {
                if (state == 1) {
                    this._view.btn_get.visible = true;
                    this._view.img_state.visible = false;
                } else {
                    this._view.btn_get.visible = false;
                    this._view.img_state.visible = true;
                    this._view.img_state.source = state == 0 ? 'hongseweiwancheng' : 'lvseyiwancheng';
                }
            }
        }

        /**
         * 点击领取按钮
         * @protected
         */
        protected onClick(): void {
            if (this._showArgs.state == 1) {
                this._showArgs.handler && this._showArgs.handler.exec();
            }
        }

        /**
         * 监听 MainEvent.UPDATE_BASE_REWARD_MDR_STATE，带有参数state
         * @param n
         */
        protected onUpdateState(n: GameNT): void {
            let state = n.body as number;
            this.updateState(state || 0);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}