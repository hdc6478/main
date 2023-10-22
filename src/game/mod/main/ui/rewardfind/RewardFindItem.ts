namespace game.mod.main {

    import ArrayCollection = eui.ArrayCollection;
    import reward_find_data = msg.reward_find_data;
    import RewardFindConfig = game.config.RewardFindConfig;

    export class RewardFindItem extends BaseListenerRenderer {
        public img_icon: eui.Image;
        public scr: eui.Scroller;
        public list_reward: eui.List;
        private _rewardList: ArrayCollection;
        public data: reward_find_data;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.scr["$hasScissor"] = true;
            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }

            let cfg: RewardFindConfig = getConfigByNameId(ConfigName.RewardFind, this.data.type);
            this.img_icon.source = cfg.icon;
            this._rewardList.source = this.data.prop_list;
        }
    }
}