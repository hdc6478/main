namespace game.mod.union {


    import GuildXianshouTargetConfig = game.config.GuildXianshouTargetConfig;
    import LanDef = game.localization.LanDef;

    export class UnionBeastRewardItem extends BaseGiftItemRender {

        // public data: GuildXianshouTargetConfig;
        public data: { cfg: GuildXianshouTargetConfig, state: RewardStatus };
        private _proxy: UnionProxy;
        private _status: number;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Union, ProxyType.Union);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let cfg = this.data.cfg;
            let cnt: number = BagUtil.getPropCntByIdx(PropIndex.GuildXianshouExp);
            this.lb_desc.textFlow = TextUtil.parseHtml(`本周贡献${TextUtil.addEnoughColor(cnt, cfg.score, false)}仙兽经验，可领取：`);
            this._listData.replaceAll(cfg.reward);

            // let bool: boolean = this._proxy.getRewardStatus(this.data.index);
            // if (this.data.score > cnt) {
            //     this._status = RewardStatus.NotFinish;
            // } else if (bool) {
            //     this._status = RewardStatus.Draw;
            // } else {
            //     this._status = RewardStatus.Finish;
            // }
            // this._status = this._proxy.getRewardState(this.data.index);
            this._status = this.data.state;

            this.btn_buy.visible = this._status == RewardStatus.Finish;
            this.img_bought.visible = !this.btn_buy.visible;
            if (this.btn_buy.visible) {
                this.btn_buy.label = getLanById(LanDef.tishi_29);
                this.btn_buy.setHint(true);
            }

            if (this._status == RewardStatus.NotFinish) {
                this.img_bought.source = 'hongseweiwancheng';
            } else if (this._status == RewardStatus.Draw) {
                this.img_bought.source = 'lvseyilingqu';
            }
        }

        protected onClick(): void {
            if (this._status == RewardStatus.Finish) {
                this._proxy.c2s_guild_xianshou_receive(this.data.cfg.index);
            }
        }

    }

}