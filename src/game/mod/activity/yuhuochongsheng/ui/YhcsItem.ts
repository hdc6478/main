namespace game.mod.activity {

    import facade = base.facade;
    import YuhuoRewardConfig = game.config.YuhuoRewardConfig;
    import LanDef = game.localization.LanDef;

    export class YhcsItem extends BaseGiftItemRender {

        data: YuhuoRewardConfig;

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }

            this._listData.source = data.reward;
            this.lb_desc.text = `第${StringUtil.ChineseNum[data.open_day]}天`;

            let _proxy: YhcsProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Yhcs);
            if (_proxy.isReceived(data.index)) {
                this.btn_buy.visible = false;
                this.img_bought.visible = true;
                return;
            }
            this.btn_buy.visible = true;
            this.img_bought.visible = false;

            if (_proxy.isEnough) {
                this.btn_buy.label = "领取";
                this.btn_buy.setHint(_proxy.model.open_day >= data.open_day);
            } else {
                this.btn_buy.label = "激活立领";
                this.btn_buy.setHint(false);
            }
        }

        protected onClick() {
            let _proxy: YhcsProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Yhcs);
            if (!_proxy.isEnough) {
                ViewMgr.getIns().openCommonRechargeView();
                return;
            }
            if (_proxy.model.open_day < this.data.open_day) {
                PromptBox.getIns().show(getLanById(LanDef.fight_soul_altar_tips1));
                return;
            }
            _proxy.c2s_yuhuochongsheng_get_rewards(this.data.index);
        }
    }
}
