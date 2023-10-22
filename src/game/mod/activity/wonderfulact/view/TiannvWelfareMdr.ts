namespace game.mod.activity {

    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import TiannvchargeWealConfig = game.config.TiannvchargeWealConfig;

    export class TiannvWelfareMdr extends EffectMdrBase implements UpdateItem{
        private _view: TiannvWelfareView = this.mark("_view", TiannvWelfareView);
        private _proxy: WonderfulActProxy;
        private _itemList: TiannvWelfareItem[];
        private _type: number = TiannvWelfareOpType.Tiannv;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.WonderfulAct);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(ActivityEvent.ON_UPDATE_TIANNV_WELFARE_INFO, this.updateItemList, this);
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
            let cfgList: TiannvchargeWealConfig[] = getConfigListByName(ConfigName.TiannvChargeWeal);
            let cfg = cfgList[cfgList.length - 1];
            let rewards = cfg.reward;
            this._view.icon_bigreward.setData(rewards[0]);

            this._itemList = [
                this._view.item1,
                this._view.item2,
                this._view.item3,
                this._view.item4,
                this._view.item5
            ];
            for(let i = 0; i < this._itemList.length; ++i) {
                let item = this._itemList[i];
                let index = i + 1;
                item.setBox("baoxiang_new" + index);
            }
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
            let types = this._proxy.getValueTypes();
            for(let i = 0; i < this._itemList.length && i < types.length; ++i) {
                let item = this._itemList[i];
                let valueType = types[i];
                item.data = valueType;
            }
        }
    }
}