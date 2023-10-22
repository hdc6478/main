namespace game.mod.god {

    import ArrayCollection = eui.ArrayCollection;
    import facade = base.facade;
    import TiandiYuhuangQiandaoConfig = game.config.TiandiYuhuangQiandaoConfig;

    export class GodProgressReward extends BaseRenderer {

        public img_tips: eui.Image;
        public lab_count: eui.Label;

        public list_reward: eui.List;
        public list_progress: eui.List;

        protected _listData: ArrayCollection = new ArrayCollection();
        protected _listReward: ArrayCollection = new ArrayCollection();

        constructor() {
            super();
            this.skinName = "skins.common.ComProgressRewardSkin";
        }

        protected onAddToStage() {
            super.onAddToStage();
            this.list_progress.itemRenderer = GodProgressItem;
            this.list_progress.dataProvider = this._listData;

            this.list_reward.itemRenderer = GodProgressRewardItem;
            this.list_reward.dataProvider = this._listReward;

            this.img_tips.source = "qiandaoshu";
        }

        public setData(val: number): void {
            this.lab_count.text = `${val}`;

            let proxy: GodProxy = facade.retMod(ModName.God).retProxy(ProxyType.God);
            let cfgArr: TiandiYuhuangQiandaoConfig[] = proxy.getVipSignCfgArr();
            let list: VProgressData[] = [];
            for (let i = 0; i < cfgArr.length; i++) {
                let cfg = cfgArr[i];
                let cfgBefore = cfgArr[i - 1];
                let start = cfgBefore && cfgBefore.index || 0;
                let target: number = cfg.index;
                list.push({val, start, target});
            }
            this._listData.source = list;

            this._listReward.source = cfgArr;
        }
    }
}