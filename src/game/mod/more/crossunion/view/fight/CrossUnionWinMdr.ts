namespace game.mod.more {

    import s2c_guild_pk_ret = msg.s2c_guild_pk_ret;
    import guild_pk_finally = msg.guild_pk_finally;
    import TouchEvent = egret.TouchEvent;

    export class CrossUnionWinMdr extends EffectMdrBase {
        private _view: CrossUnionWinView = this.mark("_view", CrossUnionWinView);
        private _proxy: CrossUnionProxy;
        // private _fight: CrossUnionFightProxy;

        protected _showArgs: s2c_guild_pk_ret;

        private _listData: eui.ArrayCollection = new eui.ArrayCollection();
        private _rewardData: eui.ArrayCollection = new eui.ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.CrossUnion);

            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._rewardData;

            this._view.list.itemRenderer = CrossUnionWinItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.closeTips, TouchEvent.TOUCH_TAP, this.hide);
        }

        protected onShow(): void { 
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let ret: number = this._showArgs.is_win ? 1 : 2
            this._view.currentState = `${ret}`;

            let lsit: guild_pk_finally[] = this._showArgs.list.sort((a, b) => {
                return b.kill_num - a.kill_num;
            })
            this._listData.replaceAll(lsit);

            this._rewardData.replaceAll(this._proxy.getRewards(ret));

            this._view.closeTips.visible = true;
            this._view.closeTips.updateShow(10, base.Handler.alloc(this, this.hide));
        }

        protected onHide(): void {
            this.sendNt(CUFigthEvent.ON_UPDATE_CUF_EXIT);
            super.onHide();

        }
    }
}