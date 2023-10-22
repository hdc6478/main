namespace game.mod.boss {

    import ArrayCollection = eui.ArrayCollection;

    export class CrossBossHurtRewardMdr extends MdrBase {
        private _view: CrossBossHurtRewardView = this.mark("_view", CrossBossHurtRewardView);

        private _itemList: ArrayCollection;
        private _proxy: BossProxy;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = CrossBossHurtRewardItem;
            this._view.list_reward.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Boss);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(SceneEvent.SCENE_CHANGE, this.hide, this);
            this.onNt(BossEvent.ON_CROSS_BOSS_REWARD_UPDATE, this.updateReward, this);
            this.onNt(SceneEvent.ON_SCENE_RANK_UPDATE, this.updateReward, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateReward();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateReward(): void {
            let rewards = this._proxy.selCrossBossCfg.hurt_reward_show;
            let infos: {index: number, hurt: number, rewardId: number, status: number}[] = [];
            for(let i = 0; i < rewards.length; ++i){
                let index = i + 1;
                let info = rewards[i];
                let hurt = info[0];
                let rewardId = info[1];
                let status = this._proxy.getCrossBossRewardStatus(index);
                infos.push({index: index, hurt: hurt, rewardId: rewardId, status: status});
            }
            SortTools.sortMap(infos, "status");//排序
            if(this._itemList.source.length){
                this._itemList.replaceAll(infos);
            }
            else {
                this._itemList.source = infos;
            }
        }
    }
}