namespace game.mod.role {

    import DabiaojiangliConfig = game.config.DabiaojiangliConfig;
    import common_reward_status = msg.common_reward_status;

    export class SuitGiftItemRender extends BaseGiftItemRender {
        data: ISuitGiftItemData;
        private _proxy: IGiftProxy;

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Gift, ProxyType.Gift);
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.img_bought.visible = data.status && data.status.status == 2;//2已领取
            this.btn_buy.visible = !this.img_bought.visible;

            if (this.btn_buy.visible) {
                this.btn_buy.setCost(data.cfg.award_buy[0]);
                this.btn_buy.setHint(data.status && data.status.status == 1);//1可领取
            }

            this._listData.replaceAll([...data.cfg.award]);
            let target = data.cfg.target[0];
            let finish_cnt = data.status ? data.status.finish_cnt : 0;
            let str = SuitTypeName[data.type] + '套装达到' + target + '阶可购买' +
                TextUtil.addColor(`(${finish_cnt}/${target})`, finish_cnt >= target ? WhiteColor.GREEN : WhiteColor.RED);
            this.lb_desc.textFlow = TextUtil.parseHtml(str);
        }

        protected onClick() {
            let data = this.data;
            if (!data) {
                return;
            }
            if (!data.status || data.status.status != 1) {
                PromptBox.getIns().show(`未满足购买条件`);
                return;
            }
            if (!data.cfg || !data.cfg.award_buy) {
                return;
            }
            for (let item of data.cfg.award_buy) {
                if (!BagUtil.checkPropCnt(item[0], item[1], PropLackType.Text)) {
                    return;
                }
            }
            this._proxy.c2s_jinjie_stage_get_reward(data.type + 1, data.cfg.index);
        }
    }

    export interface ISuitGiftItemData {
        type: SuitType;//等于GiftType-1
        cfg: DabiaojiangliConfig;
        status: common_reward_status;
    }
}