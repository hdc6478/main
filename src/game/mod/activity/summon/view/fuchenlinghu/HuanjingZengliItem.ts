namespace game.mod.activity {

    import HuanjingZengliConfig = game.config.HuanjingZengliConfig;
    import LanDef = game.localization.LanDef;

    export class HuanjingZengliItem extends BaseGiftItemRender {

        data: IHuanjingZengliItemData;
        private _proxy: FuchenlinghuProxy;

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.Fuchenlinghu);
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this._listData.replaceAll(data.cfg.reward);
            let desc = StringUtil.substitute(getLanById(LanDef.fuchenlinghu_tips13), [data.cfg.times])
                + TextUtil.addColor(`(${data.cnt}/${data.cfg.times})`, data.cnt >= data.cfg.times ? WhiteColor.GREEN : WhiteColor.RED);
            this.lb_desc.textFlow = TextUtil.parseHtml(desc);

            if (data.status == RewardStatus.Draw) {
                this.img_bought.visible = true;
                this.img_bought.source = `lvseyilingqu`;
                this.btn_buy.visible = false;
            } else {
                this.img_bought.visible = false;
                this.btn_buy.visible = true;
                if (data.status == RewardStatus.Finish) {
                    this.btn_buy.label = getLanById(LanDef.lingqu);
                    this.btn_buy.setYellow();
                    this.btn_buy.setHint(true);
                } else {
                    this.btn_buy.label = getLanById(LanDef.chengshen_goto1);
                    this.btn_buy.setBlue();
                    this.btn_buy.setHint(false);
                }
            }
        }

        protected onClick() {
            if (this.data.status == RewardStatus.Finish) {
                this._proxy.c2s_linghu_oper(FuchenlinghuOperType.Oper5, this.data.cfg.index);
            } else {
                if (this._proxy.isOpenSea(SeaType.Sea1, true)) {
                    ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Fuchenlinghu);
                }
            }
        }
    }

    export interface IHuanjingZengliItemData {
        cfg: HuanjingZengliConfig;
        status: RewardStatus;
        cnt: number;//当前次数
    }
}