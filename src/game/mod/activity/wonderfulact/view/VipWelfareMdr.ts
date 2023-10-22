namespace game.mod.activity {


    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import VipChargeConfig = game.config.VipChargeConfig;

    export class VipWelfareMdr extends EffectMdrBase implements UpdateItem{
        private _view: VipWelfareView = this.mark("_view", VipWelfareView);
        private _proxy: WonderfulActProxy;

        private _itemList: ArrayCollection;
        private _type: number = TiannvWelfareOpType.Vip;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.WonderfulAct);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = VipWelfareItem;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(ActivityEvent.ON_UPDATE_VIP_WELFARE_INFO, this.updateItemList, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateTime();
            this.updateItemList();

            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private initShow(): void {
            let cfgList: VipChargeConfig[] = getConfigListByName(ConfigName.VipCharge);
            let cfg = cfgList[cfgList.length - 1];
            let rewards = cfg.reward;
            this._view.icon_bigreward.setData(rewards[0]);
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let endTime = this._proxy.getEndTime(this._type);
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
        }

        private updateItemList(): void {
            let cfgList: VipChargeConfig[] = getConfigListByName(ConfigName.VipCharge);

            let tmps: {sort: number, info: {cfg: VipChargeConfig, canDraw: boolean, hasDraw: boolean}}[] = [];
            for(let cfg of cfgList){
                let sort = cfg.index;//从小到大排序
                let hasDraw = this._proxy.hasDraw(this._type, cfg.index);
                let canDraw = this._proxy.canVipDraw(cfg);
                if(hasDraw){
                    sort += 10000000;
                }
                if(canDraw){
                    sort -= 100000;
                }
                tmps.push({sort: sort, info: {cfg: cfg, canDraw: canDraw, hasDraw: hasDraw}});
            }
            tmps.sort(SortTools.sortByRort);
            let infos: {cfg: VipChargeConfig, canDraw: boolean, hasDraw: boolean}[] = [];
            for(let item of tmps){
                infos.push(item.info);
            }

            if(this._itemList.source.length){
                this._itemList.replaceAll(infos);
            }
            else {
                this._itemList.source = infos;
            }
        }
    }
}