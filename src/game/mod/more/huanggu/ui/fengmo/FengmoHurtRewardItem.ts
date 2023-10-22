namespace game.mod.more {

    import FengmoDamageRewardConfig = game.config.FengmoDamageRewardConfig;
    import LanDef = game.localization.LanDef;

    export class FengmoHurtRewardItem extends BaseGiftItemRender {

        public data: { status: number, cfg: FengmoDamageRewardConfig };
        private _proxy: FengmoProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Fengmo);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }

            //let cfg: FengmoDamageRewardConfig = this.data;


            let hurt: number = this._proxy.damage_value;

            let target: number = this.data.cfg.damage_value * 10000;

            // let bool: boolean = hurt >= target;
            // let bought: boolean = this._proxy.damage_indexs.indexOf(cfg.index) > -1;
            //
            // this.btn_buy.visible = bool && !bought;

            if (this.data.status == 1) {
                //达到领取条件
                this.btn_buy.label = "领取";
                this.btn_buy.setHint(true);
                this.btn_buy.visible = true;
                this.img_bought.visible = false;
            } else if (this.data.status == 2) {
                //未达到领取条件
                this.btn_buy.visible = false;
                this.img_bought.visible = false;
            } else if (this.data.status == 3) {
                //已经领取
                this.btn_buy.visible = false;
                this.img_bought.visible = true;
            }


            let color = this.data.status == 1 ? WhiteColor.GREEN : WhiteColor.RED;
            let hurtStr: string = StringUtil.getHurtNumStr(hurt);
            let targetStr: string = StringUtil.getHurtNumStr(target);

            let str = StringUtil.substitute(getLanById(LanDef.xianzong_tips14), [targetStr]);
            let str2 = TextUtil.addColor(`(${hurtStr}/${targetStr})`, color);
            this.lb_desc.textFlow = TextUtil.parseHtml(str + str2);

            this._listData.replaceAll(this.data.cfg.damage_awards);
        }

        /**点击购买*/
        protected onClick(): void {
            this._proxy.c2s_guild_fengmo_get_reward(1, this.data.cfg.index);
        }
    }
}