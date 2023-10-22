namespace game.mod.daily {

    import ArrayCollection = eui.ArrayCollection;
    import ActiveAwardConfig = game.config.ActiveAwardConfig;

    export class LivenessProgressReward extends BaseRenderer {

        public img_tips: eui.Image;
        public lab_count: eui.Label;

        public list_reward: eui.List;
        public list_progress: eui.List;
        public group_eft1:eui.Group;

        protected _listData: ArrayCollection = new ArrayCollection();
        protected _listReward: ArrayCollection = new ArrayCollection();

        constructor() {
            super();
            this.skinName = "skins.common.ComProgressRewardSkin";
        }

        protected onAddToStage() {
            super.onAddToStage();
            this.list_progress.itemRenderer = LivenessProgressItem;
            this.list_progress.dataProvider = this._listData;

            this.list_reward.itemRenderer = LivenessProgressRewardItem;
            this.list_reward.dataProvider = this._listReward;

            this.img_tips.source = "huoyuedu";
        }

        public setData(val: number): void {
            this.lab_count.text = `${val}`;

            // let cfgArr: ShengtanScoreConfig[] = getConfigListByName(ConfigName.ShengtanScore);
            let cfgArr: ActiveAwardConfig[] = getConfigListByName(ConfigName.ActiveAward);
            let list: VProgressData[] = [];
            for (let i = 0; i < cfgArr.length; i++) {
                let cfg = cfgArr[i];
                let cfgBefore = cfgArr[i - 1];
                let start = cfgBefore && cfgBefore.activation || 0;
                let target: number = cfg.activation;
                list.push({val, start, target});
            }
            this._listData.source = list;

            this._listReward.source = cfgArr;
        }
    }
}