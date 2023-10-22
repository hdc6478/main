namespace game.mod.activity {

    import HuanjingLeichongConfig = game.config.HuanjingLeichongConfig;
    import LanDef = game.localization.LanDef;

    export class HuanjingLeichongItem extends BaseGiftItemRender {

        data: IHuanjingLeichongItemData;
        private _proxy: FuchenlinghuProxy;

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.Fuchenlinghu);
            this.img_bought.source = 'lvseyilingqu';
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data || !data.cfg) {
                return;
            }
            let cfg = data.cfg;
            this._listData.replaceAll(cfg.reward);

            let desc: string;
            let payedRmb = RoleVo.ins.day_charge_rmb;
            if (cfg.value == 0) {
                desc = getLanById(LanDef.fuchenlinghu_tips14);
            } else {
                desc = StringUtil.substitute(getLanById(LanDef.fuchenlinghu_tips15), [cfg.value])
                    + TextUtil.addColor(`(${payedRmb}/${cfg.value})`, payedRmb >= cfg.value ? WhiteColor.GREEN : WhiteColor.RED);
            }
            this.lb_desc.textFlow = TextUtil.parseHtml(desc);

            if (data.status == RewardStatus.Draw) {
                this.btn_buy.visible = false;
                this.img_bought.visible = true;
            } else {
                this.btn_buy.visible = true;
                this.img_bought.visible = false;
                if (data.status == RewardStatus.Finish) {
                    this.btn_buy.label = getLanById(LanDef.lingqu);
                    this.btn_buy.setHint(true);
                    this.btn_buy.setYellow();
                } else {
                    this.btn_buy.label = getLanById(LanDef.exp_pool15);
                    this.btn_buy.setHint(false);
                    this.btn_buy.setBlue();
                }
            }
        }

        protected onClick() {
            if (this.data.status == RewardStatus.Finish) {
                this._proxy.c2s_linghu_oper(FuchenlinghuOperType.Oper7, this.data.cfg.index);
            } else {
                ViewMgr.getIns().openCommonRechargeView();
            }
        }
    }

    export interface IHuanjingLeichongItemData {
        cfg: HuanjingLeichongConfig;
        status: RewardStatus;
    }
}