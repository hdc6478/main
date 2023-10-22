namespace game.mod.more {

    export class XianjieLuandouScoreRewardMdr extends MdrBase {
        private _view: KuafuDoufaScoreView = this.mark("_view", KuafuDoufaScoreView);
        private _proxy: XianjieLuandouProxy;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XianjieLuandou);

            this._view.list_reward.itemRenderer = XianjieLuandouScoreRewardItem;
            this._view.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(MoreEvent.ON_XIANJIE_PVP_SCORE_REWARD_UPDATE, this.updateView, this);
            this.onNt(MoreEvent.ON_XIANJIE_PVP_SCENE_INFO_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let cfgList = this._proxy.getScoreCfgList();
            let list: IXianjieLuandouScoreRewardItemData[] = [];
            let myScore = this._proxy.my_score;
            let indexs = this._proxy.score_index;
            for (let cfg of cfgList) {
                let status = RewardStatus.NotFinish;
                if (indexs.indexOf(cfg.index) > -1) {
                    status = RewardStatus.Draw;
                } else if (myScore >= cfg.scroe) {
                    status = RewardStatus.Finish;
                }

                list.push({
                    cfg,
                    myScore,
                    status: status
                });
            }
            SortTools.sortReward(list);
            this._listData.replaceAll(list);
        }
    }
}