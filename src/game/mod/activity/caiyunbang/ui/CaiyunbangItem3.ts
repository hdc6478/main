namespace game.mod.activity {

    import LanDef = game.localization.LanDef;

    export class CaiyunbangItem3 extends BaseGiftItemRender {

        data: ICaiyunbangItemData;
        private _proxy: CaiyunbangProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.Caiyunbang);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let desc = data.reward.desc;
            if (data.actType == ActivityType.CaiyunbangCharge) {
                let rmb = this._proxy.getChargeRmb();
                let needRmb = data.reward.cond_1[0];
                let color = rmb >= needRmb ? WhiteColor.GREEN : WhiteColor.RED;
                desc = desc + TextUtil.addColor(`(${rmb}/${needRmb})`, color);
            } else {
                let type = data.reward.cond_1[0];
                if (type == LoginRewardType.Vip) {
                    let myVip = VipUtil.getShowVipLv();
                    let needVip = data.reward.cond_2[0];
                    let color = myVip >= needVip ? WhiteColor.GREEN : WhiteColor.RED;
                    desc = desc + TextUtil.addColor(`(${myVip}/${needVip})`, color);
                }
            }

            this.img_bought.visible = data.status == RewardStatus.Draw;
            this.btn_buy.visible = !this.img_bought.visible;

            if (this.btn_buy.visible) {
                this.btn_buy.label = getLanById(LanDef.exp_pool15);
            }

            if (data.status == RewardStatus.Draw) {
                this.img_bought.visible = true;
                this.btn_buy.visible = false;
            } else if (data.status == RewardStatus.Finish) {
                this.img_bought.visible = false;
                this.btn_buy.visible = true;
                this.btn_buy.label = getLanById(LanDef.lingqu);
                this.btn_buy.setYellow();
                this.btn_buy.setHint(true);
            } else {
                this.img_bought.visible = false;
                this.btn_buy.visible = true;
                let btnStr = getLanById(LanDef.exp_pool15);
                if (data.actType == ActivityType.CaiyunbangLogin) {
                    btnStr = getLanById(LanDef.equip_Rresolve_tips4);
                }
                this.btn_buy.label = btnStr;
                this.btn_buy.setBlue();
                this.btn_buy.setHint(false);
            }

            this._listData.replaceAll(data.reward.rewards);
            this.lb_desc.textFlow = TextUtil.parseHtml(desc);
        }

        protected onClick() {
            let data = this.data;
            if (!data) {
                return;
            }
            let actType = data.actType;
            let status = data.status;
            if (actType == ActivityType.CaiyunbangCharge) {
                if (status == RewardStatus.Finish) {
                    this._proxy.c2s_activity_caiyun_leichong_reward(data.reward.index);
                } else {
                    ViewMgr.getIns().openCommonRechargeView();
                }
            } else {
                if (status == RewardStatus.Finish) {
                    this._proxy.c2s_activity_caiyun_login(data.reward.index);
                } else {
                    ViewMgr.getIns().openVipView();
                }
            }
        }
    }

    export interface ICaiyunbangItemData {
        actType: ActivityType;
        reward: msg.act_reward;
        status: RewardStatus;
    }
}