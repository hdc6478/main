namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import FengmoTiaozhanRewardConfig = game.config.FengmoTiaozhanRewardConfig;
    import LanDef = game.localization.LanDef;

    export class FengmoProgressReward extends BaseRenderer {

        public img_tips: eui.Image;
        public lab_count: eui.Label;

        public list_reward: eui.List;
        public list_progress: eui.List;
        public scroller: eui.Scroller;

        protected _listData: ArrayCollection = new ArrayCollection();
        protected _listReward: ArrayCollection = new ArrayCollection();

        private _proxy: FengmoProxy;
        private readonly _count: number = 4;

        protected onAddToStage() {
            super.onAddToStage();
            this.list_progress.itemRenderer = ComProgressItem;
            this.list_progress.dataProvider = this._listData;

            this.list_reward.itemRenderer = ComProgressRewardItem;
            this.list_reward.dataProvider = this._listReward;

            this.img_tips.source = "leijicishu";

            this._proxy = getProxy(ModName.More, ProxyType.Fengmo);
        }

        // public setData(val: number): void {
        //     this.lab_count.text = `${val}`;

        //     let cfgArr: FengmoTiaozhanRewardConfig[] = getConfigListByName(ConfigName.FengmoTiaozhanReward);
        //     let proxy: FengmoProxy = getProxy(ModName.More, ProxyType.Fengmo);
        //     let list: FengmoTiaozhanRewardConfig[] = [];
        //     let cfg: FengmoTiaozhanRewardConfig = cfgArr.find(v => {
        //         return proxy.times_indexs.indexOf(v.index) == -1;
        //     });
        //     let last: FengmoTiaozhanRewardConfig = cfgArr[cfgArr.length - 1];
        //     if (cfg && last.index - cfg.index >= 3) {
        //         for (let k in cfgArr) {
        //             if (cfgArr[k].index < cfg.index) {
        //                 continue;
        //             }
        //             if (list.length > 3) {
        //                 break;
        //             }
        //             list.push(cfgArr[k]);
        //         }
        //     } else {
        //         for (let len = cfgArr.length - 1; len > 0; len--) {
        //             if (list.length > 3) {
        //                 break;
        //             }
        //             list.push(cfgArr[len]);
        //         }
        //     }
        //     this._listReward.replaceAll(list.sort((a, b) => {
        //         return a.index - b.index;
        //     }));

        //     let vlist: VProgressData[] = [];
        //     for (let i in list) {
        //         let index = list[i].index;
        //         let cfg = getConfigByNameId(ConfigName.FengmoTiaozhanReward, index);
        //         let before = getConfigByNameId(ConfigName.FengmoTiaozhanReward, index - 1);
        //         let start = before && before.tiaozhan_times || 0;
        //         let target: number = cfg.tiaozhan_times;
        //         vlist.push({val, start, target})
        //     }
        //     this._listData.replaceAll(vlist.sort((a, b) => {
        //         return a.target - b.target;
        //     }))
        // }

        public updateShow(val: number): void {
            // let val: number = this._proxy.max_win_count;
            this.scroller.maxWidth = ITEM_WIDTH * this._count;
            this.lab_count.text = `${val}`;

            let cfgArr: FengmoTiaozhanRewardConfig[] = getConfigListByName(ConfigName.FengmoTiaozhanReward);
            let len: number = cfgArr.length;

            let list: VProgressData[] = [];
            for (let i = 0; i < cfgArr.length; i++) {
                let cfg = cfgArr[i];
                let cfgBefore = cfgArr[i - 1];
                let start = cfgBefore && cfgBefore.tiaozhan_times || 0;
                let target: number = cfg.tiaozhan_times;
                list.push({ val, start, target });
            }
            this._listData.replaceAll(list);

            let idx: number = -1;
            let reward: ComRewardData[] = [];
            for (let i in cfgArr) {
                let cfg = cfgArr[i];
                let state: number = this._proxy.getRewardState(cfg);
                if (state != ComRewardState.Done && idx == -1) {
                    idx = +i;
                }
                let content: string = StringUtil.substitute(getLanById(LanDef.xianzong_tips15), [cfg.tiaozhan_times]) + TextUtil.addEnoughColor(val, cfg.tiaozhan_times);
                reward.push({
                    state,
                    content,
                    index: cfg.index,
                    count: cfg.tiaozhan_times,
                    rewards: cfg.tiaozhan_awards,
                    handler: base.Handler.alloc(this, () => {
                        this._proxy.c2s_guild_fengmo_get_reward(2, cfg.index);
                    })
                })
            }
            this._listReward.replaceAll(reward);

            if (idx < 0 || len - idx < this._count) {
                idx = len - this._count;
            }
            // ScrollUtil.moveHToAssign(this.scroller, idx, ITEM_WIDTH);
            // this.scroller.viewport.scrollH = idx * ITEM_WIDTH;
            base.Tween.remove(this.scroller.viewport);
            base.Tween.get(this.scroller.viewport).to({ scrollH: idx * ITEM_WIDTH }, 100);
        }
    }
}