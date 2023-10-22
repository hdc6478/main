namespace game.mod.more {


    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import PropConfig = game.config.PropConfig;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class MiningMasterMdr extends EffectMdrBase implements UpdateItem {
        private _view: MiningMasterView = this.mark("_view", MiningMasterView);
        private _proxy: MiningProxy;
        private _listData: ArrayCollection = new ArrayCollection();

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Mining);

            this._view.list.itemRenderer = MiningItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_explain, TouchEvent.TOUCH_TAP, this.onClickExplain);
            addEventListener(this._view.btn_zhenrong, TouchEvent.TOUCH_TAP, this.onClickZhenrong);
            addEventListener(this._view.btn_tips, TouchEvent.TOUCH_TAP, this.onClickTips);

            this.onNt(MoreEvent.ON_UPDATE_MINING_MASTER_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_zhandui_kuanzhu_show(1);
            super.onShow();
            TimeMgr.addUpdateItem(this, 1000);
        }

        private onUpdateView(): void {
            this._listData.replaceAll(this._proxy.list);

            let prop: PropConfig = GameConfig.getPropConfigById(this._proxy.team_kuanmai_item);
            this._view.img_icon.source = prop.icon;
            this._view.lab_count.text = `${this._proxy.total}/小时`;

            let team_conquest_num: number = this._proxy.team_conquest_num;
            let conquer_num: number = this._proxy.conquer_num;
            // let color_conquer = !conquer_num ? WhiteColor.RED : WhiteColor.GREEN;
            this._view.lab_fight.text = `${conquer_num}/${team_conquest_num}`;

            let team_rescue_num: number = this._proxy.team_rescue_num;
            let rescue_num: number = this._proxy.rescue_num;
            // let color = !cnt ? WhiteColor.RED : WhiteColor.GREEN;
            this._view.lab_help.text = `${rescue_num}/${team_rescue_num}`;
        }

        private onClickExplain(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.zhanduishengxu_tips6));
        }

        private onClickZhenrong(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.Zhenrong);
        }

        private onClickTips(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.MiningTips);
        }

        update(time: base.Time): void {
            if (!this._listData || !this._listData.source || !this._listData.source.length) {
                return;
            }
            for (let i = 0; i < this._view.list.numChildren; i++) {
                let item: MiningItem = this._view.list.getChildAt(+i) as MiningItem;
                if (item) {
                    item.onUpdateTimes();
                }
            }
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
        }
    }
}