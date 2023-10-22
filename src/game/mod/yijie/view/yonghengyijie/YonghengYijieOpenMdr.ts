namespace game.mod.yijie {

    import TouchEvent = egret.TouchEvent;
    import YonghengConfig = game.config.YonghengConfig;
    import facade = base.facade;
    import DailyLimitTimeConfig = game.config.DailyLimitTimeConfig;
    import ArrayCollection = eui.ArrayCollection;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;

    export class YonghengYijieOpenMdr extends MdrBase implements UpdateItem {
        private _view: YonghengYijieOpenView = this.mark("_view", YonghengYijieOpenView);
        private _sceneProxy: ISceneProxy;
        private _proxy: YijieProxy;
        private _dailyLimitTimeActProxy: IDailyLimitTimeActProxy;
        private _itemList: ArrayCollection;
        private _selCfg: YonghengConfig;/**当前选中的配置*/
        public _showArgs: YonghengConfig;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._sceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            this._proxy = this.retProxy(ProxyType.Yijie);
            this._dailyLimitTimeActProxy = facade.retMod(ModName.Daily).retProxy(ProxyType.DailyLimitTime);

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);

            this.onNt(DailyLimitTimeEvent.UPDATE_LIMIT_ACT_INFO, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this._selCfg = this._showArgs;
            this.updateReward();
            this.updateOpen();
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onInfoUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if(types.indexOf(DailyLimitTimeType.YonghengYijie) < 0){
                return;
            }
            this.updateOpen();
        }

        private onClickChallenge(): void {
            if(!this._selCfg){
                return;
            }
            if(SceneUtil.getCurSceneType() == SceneType.YonghengYijie){
                //已在活动场景则将攻击目标切换目标为存活的一个活动boss
                this._sceneProxy.requestMonster();
            }
            else {
                SceneUtil.setReward(SceneType.YonghengYijie, this._selCfg.reward_big);
                this._proxy.c2s_yongheng_boss_challenge(this._selCfg);//字段定义没导出
            }
            this.hide();
        }

        private updateReward(): void {
            let cfg: DailyLimitTimeConfig = getConfigByNameId(ConfigName.DailyLimitTime, DailyLimitTimeType.YonghengYijie);
            this._itemList.source = cfg.reward;
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let nextTime = this._dailyLimitTimeActProxy.getNextStartTime(DailyLimitTimeType.YonghengYijie);
            this._view.timeItem.updateTime(nextTime, getLanById(LanDef.material3));
        }

        private updateOpen(): void {
            let isOpen = this._dailyLimitTimeActProxy.isOpen(DailyLimitTimeType.YonghengYijie);
            this._view.btn_challenge.visible = isOpen;
            this._view.timeItem.visible = !isOpen;
            if(!isOpen){
                //未开启
                this.updateTime();
                TimeMgr.addUpdateItem(this, 1000);
            }
            else {
                TimeMgr.removeUpdateItem(this);
            }
        }
    }
}