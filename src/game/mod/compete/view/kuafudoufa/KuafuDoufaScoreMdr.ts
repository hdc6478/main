namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import DoufaJifenConfig = game.config.DoufaJifenConfig;

    export class KuafuDoufaScoreMdr extends MdrBase {

        private _view: KuafuDoufaScoreView = this.mark("_view", KuafuDoufaScoreView);
        private _proxy: CompeteProxy;

        private _itemList: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = KuafuDoufaScoreItem;
            this._view.list_reward.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Compete);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(CompeteEvent.KUAFU_DOUFA_MY_SCORE_UPDATE, this.updateItemList, this);
            this.onNt(CompeteEvent.KUAFU_DOUFA_SCORE_REWARD_UPDATE, this.updateItemList, this);
            this.onNt(SceneEvent.SCENE_CHANGE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateItemList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateItemList(): void {
            let cfgList: DoufaJifenConfig[] = getConfigListByName(ConfigName.DoufaJifen);
            let tmps: {item: KuafuScoreData, order: number}[] = [];
            for(let cfg of cfgList){
                let sort = cfg.index;
                let status = this._proxy.getScoreStatus(cfg);
                if(status == RewardStatus.NotFinish){
                    sort += 10000;
                }
                else if(status == RewardStatus.Draw){
                    sort += 10000000;
                }
                tmps.push({item: {cfg, status}, order: sort});
            }
            tmps.sort((v1, v2)=>{
                return v1.order - v2.order;
            });

            let items: KuafuScoreData[] = [];
            for(let i of tmps){
                items.push(i.item);
            }
            if(this._itemList.source.length){
                this._itemList.replaceAll(items);
            }
            else {
                this._itemList.source = items;
            }
        }
    }
}
