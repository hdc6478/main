namespace game.mod.activity {

    import LanDef = game.localization.LanDef;
    import DaolvShopConfig = game.config.DaolvShopConfig;
    import daolv_house_info = msg.daolv_house_info;
    import Handler = base.Handler;

    export class ExchangeShopSpecialItem extends ExchangeShopBaseItem {

        public data: DaolvShopConfig;

        protected dataChanged(): void {
            let cfg: DaolvShopConfig = this.data;
            if (!cfg) {
                return;
            }

            let info: daolv_house_info = this._proxy.getInfoByTypeIndex(cfg.index) as daolv_house_info;
            let bought_cnt = info ? info.week_cnt : 0;//已购买次数
            this.lmt_type = 3;
            let str: string;
            //限购类型1先判断周限购再判断终生限购 2终生限购 3周限购 0不限购
            if (cfg.lmt_type == 1) {
                str = getLanById(LanDef.store7);
                // let life_cnt: number = cfg.cnts[1] - info.life_cnt;//终生可购买剩余次数
                this.lmt_cnt = info.max_cnt;//终生购买次数<每周购买次数
                this.left_cnt = this.lmt_cnt - bought_cnt;
            } else if (cfg.lmt_type == 3) {
                str = getLanById(LanDef.store7);
                this.lmt_cnt = cfg.lmt_cnt;
                this.left_cnt = this.lmt_cnt - bought_cnt;
            } else if (cfg.lmt_type == 2) {
                str = getLanById(LanDef.store6);
                this.lmt_cnt = cfg.lmt_cnt;
                this.left_cnt = this.lmt_cnt - info.life_cnt;
            }
            if (cfg.lmt_type != 0) {
                this.lab_limit.textFlow = TextUtil.parseHtml(str + TextUtil.addColor(`${this.left_cnt}/${this.lmt_cnt}`,
                    this.left_cnt > 0 ? "0x238e2c" : BlackColor.RED));
            } else {
                this.lab_limit.text = "";
            }

            super.dataChanged();

            this.args = {
                ...this.args,
                handler: Handler.alloc(this._proxy, this._proxy.c2s_daolv_house_buy_prop, [cfg.index])
            };

        }

    }
}