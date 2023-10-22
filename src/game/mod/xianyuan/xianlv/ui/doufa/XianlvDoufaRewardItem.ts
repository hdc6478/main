namespace game.mod.xianyuan {

    import ArrayCollection = eui.ArrayCollection;
    import XianlvdoufaRewardConfig = game.config.XianlvdoufaRewardConfig;
    import LanDef = game.localization.LanDef;

    export class XianlvDoufaRewardItem extends BaseRenderer {

        public img_tips: eui.Image;
        public lab_count: eui.Label;

        public list_reward: eui.List;
        public list_progress: eui.List;
        public scroller: eui.Scroller;

        private _proxy: XianlvDoufaProxy;

        protected _listData: ArrayCollection = new ArrayCollection();
        protected _listReward: ArrayCollection = new ArrayCollection();

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Xianyuan, ProxyType.XianlvDoufa);

            this.list_progress.itemRenderer = ComProgressItem;
            this.list_progress.dataProvider = this._listData;

            this.list_reward.itemRenderer = ComProgressRewardItem;
            this.list_reward.dataProvider = this._listReward;

            this.img_tips.source = "shengchang";
        }

        public updateShow(): void {
            let val: number = this._proxy.max_win_count;
            this.scroller.maxWidth = ITEM_WIDTH * 4;
            this.lab_count.text = `${val}`;

            let cfgArr: XianlvdoufaRewardConfig[] = getConfigListByName(ConfigName.XianlvDoufaReward);

            let list: VProgressData[] = [];
            for (let i = 0; i < cfgArr.length; i++) {
                let cfg = cfgArr[i];
                let cfgBefore = cfgArr[i - 1];
                let start = cfgBefore && cfgBefore.win_time || 0;
                let target: number = cfg.win_time;
                list.push({ val, start, target });
            }
            this._listData.replaceAll(list);

            let rewards: ComRewardData[] = [];
            for (let cfg of cfgArr) {
                let state: number = this._proxy.getRewardState(cfg);
                let content: string = StringUtil.substitute(getLanById(LanDef.xianlvdoufa_tips5), [cfg.win_time]) + TextUtil.addEnoughColor(val, cfg.win_time);
                rewards.push({
                    state,
                    content,
                    count: cfg.win_time,
                    rewards: cfg.reward,
                    handler: base.Handler.alloc(this, () => {
                        this._proxy.c2s_xianlv_pvp_oper(4);
                    })
                })
            }
            this._listReward.replaceAll(rewards);
        }
    }
}