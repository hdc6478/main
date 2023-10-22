namespace game.mod.consecrate {

    import ArrayCollection = eui.ArrayCollection;
    import GongfengShowConfig = game.config.GongfengShowConfig;

    export class ConsecratePreviewRewardItem extends BaseRenderer {
        public img_type: eui.Image;
        public lab_desc: eui.Label;
        public list_reward: eui.List;

        public data: GongfengShowConfig;
        private _rewardList: ArrayCollection;

        protected onAddToStage(): void {
            super.onAddToStage();

            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let cfg = this.data;
            let index = cfg.index;
            this.img_type.source = "consecrate_type" + index;
            this.lab_desc.text = "";

            let rewards: number[][] = [];
            for (let i of cfg.award) {
                let reward = i.slice(0, 2);
                rewards.push(reward);
            }
            this._rewardList.source = rewards;
        }
    }
}
