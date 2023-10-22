namespace game.mod.xianyuan {

    export class ShilianRankRewardMdr extends MdrBase {
        private _view: ShilianRankRewardView = this.mark("_view", ShilianRankRewardView);
        private _proxy: XianlvShilianProxy;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XianlvShilian);
            this._view.list.itemRenderer = ShilianRankRewardItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(XianyuanEvent.ON_UPDATE_SHILIAN_JIFEN_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let cfgList = this._proxy.getJifenCfgList();

            let myScore = this._proxy.model.my_score;
            this._view.lb_num.text = myScore + '';

            let lastCfg = cfgList[cfgList.length - 1];
            if (lastCfg && lastCfg.reward && lastCfg.reward[0]) {
                this._view.icon_bigreward.setData(lastCfg.reward[0]);
            }

            let list: IShilianRankRewardItemData[] = [];
            for (let cfg of cfgList) {
                let status = RewardStatus.NotFinish;
                if (this._proxy.isJifenGotten(cfg.index)) {
                    status = RewardStatus.Draw;
                } else if (myScore >= cfg.score) {
                    status = RewardStatus.Finish;
                }
                list.push({
                    cfg,
                    status,
                    score: myScore
                });
            }
            SortTools.sortReward(list);
            this._listData.replaceAll(list);
        }
    }
}