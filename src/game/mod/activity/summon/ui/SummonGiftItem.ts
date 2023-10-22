namespace game.mod.activity {

    import facade = base.facade;

    export class SummonGiftItem extends BaseGiftItemRender {
        data: ISummonGiftData;

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }

            this._listData.source = data.cfg.items;
            let target = data.cfg.condition[0];
            let id: string = `zhanhuan_tip_${this.data.type}`;
            let _proxy: SummonProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Summon);
            let finish_cnt = _proxy.getScoreByType(this.data.type, this.data.type == 3 ? data.cfg.condition[0] : null);
            if (this.data.type == 3) {
                target = data.cfg.condition[1];
                id = id + `_${data.cfg.condition[0]}`;
            }
            let str = StringUtil.substitute(getLanById(id), [target]) +
                TextUtil.addColor(`(${finish_cnt}/${target})`, finish_cnt >= target ? WhiteColor.GREEN : WhiteColor.RED);
            this.lb_desc.textFlow = TextUtil.parseHtml(str);

            this.img_bought.visible = data.status && data.status.status == 1;
            this.btn_buy.visible = !this.img_bought.visible;

            if (this.btn_buy.visible) {
                this.btn_buy.resetCost();
                if (finish_cnt >= target) {
                    if (data.cfg.cost) {
                        this.btn_buy.label = "";
                        this.btn_buy.setCost(data.cfg.cost);
                    } else {
                        this.btn_buy.label = "领取";

                    }
                } else {
                    this.btn_buy.label = "前往召唤";
                }
                this.btn_buy.setHint(data.status && data.status.status == 0 && finish_cnt >= target);
            }
        }

        protected onClick() {
            let data = this.data;
            if (!data) {
                return;
            }
            let _proxy: SummonProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Summon);
            let target = data.cfg.condition[0];
            let finish_cnt = _proxy.getScoreByType(this.data.type, this.data.type == 3 ? data.cfg.condition[0] : null);
            if (target > finish_cnt) {
                facade.showView(ModName.Activity, MainActivityViewType.SummonMain);
                return;
            }
            if (data.cfg && data.cfg.cost) {
                if (!BagUtil.checkPropCnt(data.cfg.cost[0], data.cfg.cost[1], PropLackType.Text)) {
                    return;
                }
            }
            _proxy.c2s_draw_buy_luck_gift(_proxy.mdrType, data.cfg.index);
        }
    }
}
