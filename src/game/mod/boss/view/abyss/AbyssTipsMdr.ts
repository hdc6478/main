namespace game.mod.boss {

    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class AbyssTipsMdr extends EffectMdrBase implements UpdateItem {
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
            this._endTime = this._proxy.endTime;
            TimeMgr.addUpdateItem(this, 1000);
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let list = this._proxy.zhuimo_jiangli.filter((v, i) => {
                return i < 4;
            });
            this._listData.replaceAll(list);

            this.update(TimeMgr.time);

            this._view.lab_desc.textFlow = TextUtil.parseHtml(getLanById(LanDef.zhuimoshenyuan_tips3));

            this._view.btn_get.setEffect(UIEftSrc.Tiaozhan);
        }

        private onClick(): void {
            // this._proxy.c2s_zhuimo_boss_challenge();
            ViewMgr.getIns().showView(ModName.Boss, BossViewType.BossMain, BossMainBtnType.Abyss);
            this.hide();
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
            PropTipsMgr.getIns().closeBoss();//继续boss弹窗
        }

        update(time: base.Time): void {
            let leftTime: number = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this.hide();
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }
    }
}