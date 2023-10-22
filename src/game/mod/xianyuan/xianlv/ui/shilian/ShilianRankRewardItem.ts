namespace game.mod.xianyuan {

    import XianlvJifenConfig = game.config.XianlvJifenConfig;
    import LanDef = game.localization.LanDef;

    export class ShilianRankRewardItem extends BaseGiftItemRender {

        data: IShilianRankRewardItemData;
        private _shilianProxy: XianlvShilianProxy;

        protected onAddToStage() {
            super.onAddToStage();
            this._shilianProxy = getProxy(ModName.Xianyuan, ProxyType.XianlvShilian);
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let cfgScore = data.cfg.score;
            let str = TextUtil.addColor(`${data.score}/${cfgScore}`, data.score >= cfgScore ? WhiteColor.GREEN : WhiteColor.RED);
            this.lb_desc.textFlow = TextUtil.parseHtml(`试炼积分达到${cfgScore}，可领取` + str);

            this._listData.source = data.cfg.reward;

            this.btn_buy.visible = data.status == RewardStatus.Finish;
            this.img_bought.visible = !this.btn_buy.visible;
            if (this.btn_buy.visible) {
                this.btn_buy.label = getLanById(LanDef.tishi_29);
                this.btn_buy.setHint(true);
            }

            if (data.status == RewardStatus.NotFinish) {
                this.img_bought.source = 'hongseweiwancheng';
            } else if (data.status == RewardStatus.Draw) {
                this.img_bought.source = 'lvseyilingqu';
            }
        }

        protected onClick() {
            if (this.btn_buy.visible) {
                this._shilianProxy.c2s_shilian_jifen_oper(this.data.cfg.index);
            }
        }
    }

    export interface IShilianRankRewardItemData {
        cfg: XianlvJifenConfig;
        status: RewardStatus;
        score: number;
    }
}