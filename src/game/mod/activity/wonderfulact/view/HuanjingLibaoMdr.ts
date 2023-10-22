namespace game.mod.activity {

    import HuanjingGiftConfig = game.config.HuanjingGiftConfig;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    /**幻境礼包*/
    export class HuanjingLibaoMdr extends MdrBase implements UpdateItem {
        private _view: BaseGiftView = this.mark("_view", BaseGiftView);
        private _proxy: FuchenlinghuProxy;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Fuchenlinghu);
            this._view.list.itemRendererSkinName = 'skins.common.BaseGiftItemSkin3';
            this._view.list.itemRenderer = HuanjingLibaoItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.updateBanner('huanjinglibao_banner', true);
        }

        protected addListeners(): void {
            super.addListeners();
            // this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
            this.onNt(ActivityEvent.ON_UPDATE_FUCHENLINGHU_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let list: IHuanjingLibaoItemData[] = [];
            let cfgList: HuanjingGiftConfig[] = getConfigListByName(ConfigName.HuanjingGift) || [];
            for (let cfg of cfgList) {
                list.push({
                    cfg,
                    status: this._proxy.getLibaoStatus(cfg.index),
                    boughtCnt: this._proxy.getLibaoBoughtCnt(cfg.index)
                });
            }
            SortTools.sortReward(list);
            this._listData.replaceAll(list);

            if (cfgList && cfgList[cfgList.length - 1]) {
                let cfg = cfgList[cfgList.length - 1];
                if (cfg && cfg.type == 1) {
                    this._view.updateBigReward(cfg.reward2[0]);
                } else if (cfg && cfg.type == 2 && cfg.product_id) {
                    let rewards = PayUtil.getRewards(cfg.product_id);
                    this._view.updateBigReward(rewards[0]);
                }
            }
        }

        update(time: base.Time) {
            let endTime = TimeUtil.getNextWeekTime();
            this._view.timeItem.updateTime(endTime);
        }

        // private onRoleUpdate(n: GameNT): void {
        //     let keys: string[] = n.body;
        //     if (keys.indexOf(RolePropertyKey.day_charge_rmb) > -1) {
        //         this.updateView();
        //     }
        // }
    }
}