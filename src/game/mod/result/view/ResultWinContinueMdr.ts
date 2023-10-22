namespace game.mod.result {

    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import s2c_instance_fin = msg.s2c_instance_fin;
    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;

    export class ResultWinContinueMdr extends EffectMdrBase implements UpdateItem {

        private _view: ResultWinContinueView = this.mark("_view", ResultWinContinueView);
        protected _showArgs: s2c_instance_fin;
        private _time: number;

        private _proxy: ResultProxy;
        private _shilianProxy: IShilianProxy;
        private _showExit: boolean;//是否只显示退出按钮
        private _hasOper: boolean;//用到判断是否是操作后关闭界面的


        constructor() {
            super(Layer.modal);
            this.isEasyHide = false;//设置为不可点击
        }

        protected onInit(): void {
            super.onInit();

            this._shilianProxy = facade.retMod(ModName.Shilian).retProxy(ProxyType.Shilian);
            this._proxy = this.retProxy(ProxyType.Result);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_exit, TouchEvent.TOUCH_TAP, this.onClickExit);
            addEventListener(this._view.btn_go, TouchEvent.TOUCH_TAP, this.onClickGo);
        }

        protected onShow(): void {
            super.onShow();
            this._time = 10;
            this._hasOper = false;
            this.updateWinPassShow();
            this.updateReward();
            this.updateHurtList();
            this.updateTimeToClose();
            TimeMgr.addUpdateItem(this, 1000);

            this.removeEft();
            this.addEftByParent(UIEftSrc.Victory, this._view.grp_eft, 0, 0, 0, null, 1, 1, false);
            this.addEftByParent(UIEftSrc.ZhanDouShengli1, this._view.grp_eft2);
        }

        protected onHide(): void {
            if (!this._hasOper) {
                SceneUtil.exitScene();
            }
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        //倒计时
        update(time: base.Time): void {
            this.updateTimeToClose();
        }

        private updateTimeToClose() {
            this._time--;
            if (this._showExit) {
                this._view.btn_exit.labelDisplay.text = `退出(${this._time})`;
                if (this._time <= 0) {
                    this.onClickExit();
                    TimeMgr.removeUpdateItem(this);
                }
            } else {
                this._view.btn_go.label = `继续(${this._time})`;
                if (this._time <= 0) {
                    this.onClickGo();
                    TimeMgr.removeUpdateItem(this);
                }
            }
        }

        //显示
        private updateWinPassShow() {
            this._showExit = this.isShowExit();
            this._view.currentState = this._showExit ? "exit" : "normal";
            this._view.btn_exit.labelDisplay.text = `退出`;
            this._view.btn_go.label = `继续`;
        }

        //显示奖励
        private updateReward() {
            let info = this._showArgs;
            this._view.resultReward.updateRewardList(info.reward);
        }

        //显示伤害
        private updateHurtList(): void {
            let info = this._showArgs;
            this._view.resultHurt.updateHurtList(info.damage_list);
        }

        private onClickExit() {
            SceneUtil.exitScene();
            this._hasOper = true;
            this.hide();
        }

        private onClickGo() {
            this._proxy.c2s_next_scene();
            this.sendNt(SceneEvent.FUBEN_CONTINUE_BATTLE);
            this._hasOper = true;
            this.hide();
        }

        /**是否只显示退出按钮，满级或者小于推荐战力*/
        private isShowExit(): boolean {
            switch (this._showArgs.type) {
                case SceneType.Forbidden:
                    return this._shilianProxy.isEndSmallGate;
                case SceneType.Xianta:
                    return this._shilianProxy.isXiantaShowExit();
            }
            //todo
            return false;
        }
    }
}

