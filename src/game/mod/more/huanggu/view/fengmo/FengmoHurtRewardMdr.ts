namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import FengmoDamageRewardConfig = game.config.FengmoDamageRewardConfig;

    export class FengmoHurtRewardMdr extends MdrBase {
        private _view: FengmoHurtRewardView = this.mark("_view", FengmoHurtRewardView);

        private _itemList: ArrayCollection;
        private _proxy: FengmoProxy;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = FengmoHurtRewardItem;
            this._view.list_reward.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Fengmo);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(HuangguEvent.ON_UPDATE_FENGMO_INFO, this.updateReward, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateReward();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateReward(): void {
            let hurt: number = this._proxy.damage_value;
            let cfgArr: FengmoDamageRewardConfig[] = getConfigListByName(ConfigName.FengmoDamageReward);
            let dataList: { status: number, cfg: FengmoDamageRewardConfig }[] = [];
            for (let cfg of cfgArr) {
                let status = 1;
                let bought: boolean = this._proxy.damage_indexs.indexOf(cfg.index) > -1;
                if (bought) {
                    //已经领取
                    status = 3;
                    dataList.push({ status, cfg });
                    continue;
                }
                let target: number = cfg.damage_value * 10000;
                let bool: boolean = hurt >= target;
                if (!bool) {
                    //未达到领取条件
                    status = 2;
                }
                dataList.push({ status, cfg });
            }

            this._itemList.replaceAll(dataList.sort(this.sortDamage));

        }

        private sortDamage(a: { status: number }, b: { status: number }): number {
            return a.status - b.status;
        }

    }
}