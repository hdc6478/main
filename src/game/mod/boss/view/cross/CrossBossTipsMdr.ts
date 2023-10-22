namespace game.mod.boss {

    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import ParamConfig = game.config.ParamConfig;

    export class CrossBossTipsMdr extends EffectMdrBase implements UpdateItem {
        private _view: BossTipsView = this.mark("_view", BossTipsView);
        private _proxy: BossProxy;
        private _listData: ArrayCollection = new ArrayCollection();

        private _endTime: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Boss);

            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClick);
        }

        protected onShow(): void {
            super.onShow();

            this.onUpdateView();
            this.updateLeftTime();
            TimeMgr.addUpdateItem(this, 1000);
        }

        private onUpdateView(): void {
            let bossInfo = this._proxy.crossBossInfo;
            this._endTime = bossInfo.endtime ? bossInfo.endtime.toNumber() : 0;

            let cfg: ParamConfig = GameConfig.getParamConfigById("cross_boss_reward");
            let list: number[][] = cfg.value;
            this._listData.source = list;

            this._view.lab_desc.textFlow = TextUtil.parseHtml(getLanById(LanDef.cross_boss_tips12));

            this._view.btn_get.setEffect(UIEftSrc.Tiaozhan);
        }

        private onClick(): void {
            //挑战跨服boss界面
            ViewMgr.getIns().showViewByID(JumpIdx.CrossBoss);
            this.hide();
        }

        protected onHide(): void {
            super.onHide();
            PropTipsMgr.getIns().closeBoss();//继续boss弹窗
            TimeMgr.removeUpdateItem(this);
        }

        update(time: base.Time): void {
            this.updateLeftTime();
        }

        private updateLeftTime(): void {
            let leftTime: number = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this.hide();
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }
    }
}