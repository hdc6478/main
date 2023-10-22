namespace game.mod.activity {


    import AtticLoginConfig = game.config.AtticLoginConfig;
    import LanDef = game.localization.LanDef;

    export class TongtiangeItem6 extends BaseGiftItemRender {

        data: { cfg: AtticLoginConfig, status: RewardStatus };
        private _proxy: TongtiangeProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.img_bought.source = `lvseyilingqu`;
            this._proxy = getProxy(ModName.Activity, ProxyType.Tongtiange);
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this._listData.replaceAll(data.cfg.reward);

            let desc: string;
            if (data.cfg.type == 1) {
                let cost = data.cfg.cost;
                let today = RoleVo.ins.day_charge_rmb;
                desc = StringUtil.substitute(getLanById(LanDef.tongtiange_tips9), [cost])
                    + TextUtil.addColor(`(${today}/${cost})`, today >= cost ? WhiteColor.GREEN : WhiteColor.RED);
            } else {
                desc = getLanById(LanDef.tongtiange_tips10);
            }
            this.lb_desc.textFlow = TextUtil.parseHtml(desc);

            this.img_bought.visible = data.status == RewardStatus.Draw;
            this.btn_buy.visible = !this.img_bought.visible;
            this.btn_buy.setHint(data.status == RewardStatus.Finish);

            if (data.status == RewardStatus.NotFinish) {
                this.btn_buy.label = data.cfg.type == 1 ? getLanById(LanDef.exp_pool15) : getLanById(LanDef.tishi_29);
                this.btn_buy.setBlue();
            } else if (data.status == RewardStatus.Finish) {
                this.btn_buy.label = getLanById(LanDef.tishi_29);
                this.btn_buy.setYellow();
            }
        }

        protected onClick() {
            if (!this.data) {
                return;
            }
            let type = this.data.cfg.type;
            if (type == 1 && this.data.status != RewardStatus.Finish) {
                ViewMgr.getIns().openCommonRechargeView();
            }
            this._proxy.c2s_attic_get_reward(4, this.data.cfg.index);
        }
    }
}