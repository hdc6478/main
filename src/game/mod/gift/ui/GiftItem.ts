namespace game.mod.gift {

    import DabiaojiangliConfig = game.config.DabiaojiangliConfig;
    import LanDef = game.localization.LanDef;

    export class GiftItem extends BaseGiftItemRender {
        private _proxy: GiftProxy;
        data: IGiftItemData;

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Gift, ProxyType.Gift);
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this._listData.replaceAll(data.cfg.award.concat());

            this.img_bought.visible = data.status == RewardStatus.Draw;
            this.btn_buy.visible = !this.img_bought.visible;

            if (this.btn_buy.visible) {
                let cost = data.cfg.award_buy[0];
                this.btn_buy.setCost(cost);
                this.btn_buy.setHint(data.status == RewardStatus.Finish && BagUtil.checkPropCnt(cost[0], cost[1]));
            }

            let target = data.cfg.target[0]; //todo 目标完成数量
            if (data.giftType == GiftType.Yuanling) {
                target = data.cfg.target[1];
            }

            let desc = data.cfg && data.cfg.desc || '';
            let str = StringUtil.substitute(desc, [target]) +
                TextUtil.addColor(`(${data.finishCnt}/${target})`, data.finishCnt >= target ? WhiteColor.GREEN : WhiteColor.RED);
            this.lb_desc.textFlow = TextUtil.parseHtml(str);
        }

        protected onClick() {
            let data = this.data;
            if (!data || !data.cfg || !data.cfg.award_buy) {
                return;
            }
            if (data.status != RewardStatus.Finish) {
                PromptBox.getIns().show(getLanById(LanDef.jinjielibao_tips2));
                return;
            }
            for (let item of data.cfg.award_buy) {
                if (!BagUtil.checkPropCnt(item[0], item[1], PropLackType.Dialog)) {
                    return;
                }
            }
            this._proxy.c2s_jinjie_stage_get_reward(data.giftType, data.cfg.index);
        }
    }

    export interface IGiftItemData {
        cfg: DabiaojiangliConfig;
        finishCnt: number;//完成次数
        giftType: GiftType;
        status: RewardStatus;
    }
}