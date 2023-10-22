namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import GuildXianshouTargetConfig = game.config.GuildXianshouTargetConfig;

    export class UnionBeastRewardMdr extends MdrBase {
        private _view: UnionBeastRewardView = this.mark("_view", UnionBeastRewardView);
        private _proxy: UnionProxy;

        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = UnionBeastRewardItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(UnionEvent.ON_UPDATE_BEAST_REWARD_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let cfgArr: GuildXianshouTargetConfig[] = getConfigListByName(ConfigName.GuildXianshouTarget);
            let list: { cfg: GuildXianshouTargetConfig, state: RewardStatus }[] = []
            for (let cfg of cfgArr) {
                let state = this._proxy.getRewardState(cfg.index);
                console.error(state);
                list.push({ cfg, state });
            }
            list.sort((a, b) => {
                if (a.state == RewardStatus.Draw || b.state == RewardStatus.Draw) {
                    if (a.state != b.state) {
                        if (a.state == RewardStatus.Draw) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                }
                return a.cfg.index - b.cfg.index;
            })
            this._listData.replaceAll(list);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}