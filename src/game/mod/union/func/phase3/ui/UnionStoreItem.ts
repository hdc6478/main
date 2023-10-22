namespace game.mod.union {


    import GuildBaoKuConfig = game.config.GuildBaoKuConfig;
    import Handler = base.Handler;

    export class UnionStoreItem extends BaseRenderer {

        protected icon: Icon;
        protected btn: Btn;
        protected img_bought: eui.Image;
        protected lab_name: eui.Label;
        protected lab_limit: eui.Label;
        protected img_tag: eui.Image;
        protected img_bg: eui.Image;

        public data: GuildBaoKuConfig;
        private _proxy: UnionProxy;
        private lmt_cnt: number;
        private left_cnt: number;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Union, ProxyType.Union);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let prop: PropData = PropData.create(this.data.reward[0], 1);
            this.icon.setData(prop);
            this.btn.setCost(this.data.cost);

            this.lab_name.textFlow = this.icon.getPropName(true, true);

            this.lmt_cnt = this.data.count;
            this.left_cnt = this.lmt_cnt - this._proxy.getStoreData(this.data.index);
            let str: string = TextUtil.addColor(`${this.left_cnt}/${this.lmt_cnt}`, !this.left_cnt ? WhiteColor.RED : WhiteColor.GREEN);
            this.lab_limit.textFlow = TextUtil.parseHtml(`每周限购：` + str);


            this.img_bought.visible = this.left_cnt <= 0;
            this.lab_limit.visible = this.btn.visible = this.left_cnt > 0;
        }

        private onClick(): void {

            if (BagUtil.checkPropCnt(this.data.cost[0], this.data.cost[1])) {

                if (this._proxy.model.store_count >= this._proxy.guild_exchange_num) {
                    // PromptBox.getIns().show("本周兑换次数剩余0次");
                    BagUtil.checkPropCnt(this.data.cost[0], this.data.cost[1], PropLackType.Dialog);
                    return;
                }

                ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionStoreTips);
                return;
            }

            ViewMgr.getIns().openBuyBulkTips({
                prop: this.data.reward,
                cost: [...this.data.cost],
                lmt_type: 3,
                lmt_cnt: this.lmt_cnt,
                left_cnt: this.left_cnt,
                handler: Handler.alloc(this._proxy, this._proxy.c2s_guild_baoku_buy, [this.data.index])
            })
        }

    }
}