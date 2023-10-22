namespace game.mod.activity {

    import AtticChallengeConfig = game.config.AtticChallengeConfig;
    import LanDef = game.localization.LanDef;

    export class TongtiangeItem2 extends BaseGiftItemRender {

        data: ITongtiangeItemData2;
        private _tongtiangeProxy: TongtiangeProxy;

        protected onAddToStage() {
            super.onAddToStage();
            this._tongtiangeProxy = getProxy(ModName.Activity, ProxyType.Tongtiange);
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this._listData.replaceAll(data.cfg.reward);
            let desc = getLanById(LanDef.tongtiange_tips5);
            if (data.type == TongtiangeRankType.Guild) {
                desc = getLanById(LanDef.union_title_2);
            }
            desc += StringUtil.substitute(getLanById(LanDef.tongtiange_tips6), [data.cfg.cnt])
                + TextUtil.addColor(`(${data.val}/${data.cfg.cnt})`,
                    data.val >= data.cfg.cnt ? WhiteColor.GREEN : WhiteColor.RED);
            this.lb_desc.textFlow = TextUtil.parseHtml(desc);

            let status = data.status;
            this.img_bought.visible = status == RewardStatus.Draw;
            this.img_bought.source = `lvseyiwancheng`;
            this.btn_buy.visible = !this.img_bought.visible;

            if (this.btn_buy.visible) {
                let hint = status == RewardStatus.Finish;
                this.btn_buy.label = hint ? getLanById(LanDef.tishi_29) : getLanById(LanDef.goto);
                this.btn_buy.setHint(hint);
                if (hint) {
                    this.btn_buy.setYellow();
                } else {
                    this.btn_buy.setBlue();
                }
            }
        }

        protected onClick() {
            if (!this.data) {
                return;
            }
            let status = this.data.status;
            if (status == RewardStatus.NotFinish) {
                ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.TongtiangeMain);
                return;
            }
            let type = this.data.type == TongtiangeRankType.Guild ? 3 : 1;
            this._tongtiangeProxy.c2s_attic_get_reward(type, this.data.cfg.index);
        }
    }

    export interface ITongtiangeItemData2 {
        type: TongtiangeRankType;//1个人挑战，2宗门挑战
        cfg: AtticChallengeConfig;
        status: RewardStatus;
        val: number;//建造次数
    }
}