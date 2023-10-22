namespace game.mod.activity {

    import XianchiRewardConfig = game.config.XianchiRewardConfig;
    import facade = base.facade;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;

    export class XianchiRewardItem extends BaseListenerRenderer {
        private lab_desc: eui.Label;
        private list_reward: eui.List;
        private img_draw: eui.Image;

        private _proxy: XianchiProxy;
        private _rewardList: ArrayCollection;

        public data: XianchiRewardConfig;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Xianchi);

            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let desc = StringUtil.substitute(getLanById(LanDef.xianchi_tips4), [this.data.index]);
            this.lab_desc.textFlow = TextUtil.parseHtml(desc);
            let rewards = this.data.rewards;
            this._rewardList.source = rewards;
            let hasDraw = this._proxy.hasDraw(this.data.index);
            this.img_draw.visible = hasDraw;
        }
    }
}