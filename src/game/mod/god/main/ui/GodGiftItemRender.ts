namespace game.mod.god {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import TiandiLevelrewardsConfig = game.config.TiandiLevelrewardsConfig;
    import TiandiTypeConfig = game.config.TiandiTypeConfig;

    export class GodGiftItemRender extends BaseRenderer {
        private lab_desc: eui.Label;
        private list_reward: eui.List;
        private img_buy: eui.Image;
        private btn_buy: game.mod.Btn;

        public data: TiandiLevelrewardsConfig;
        private _proxy: GodProxy;
        private _rewardList: ArrayCollection;
        private _canBuy: boolean = false;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.God).retProxy(ProxyType.God);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);

            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let index = this.data.index;
            let info = this._proxy.getInfo(this._proxy.iType);
            let stage = info && info.level || 0;
            let cfg: TiandiTypeConfig = getConfigByNameId(ConfigName.TiandiType, this._proxy.iType);
            let pin = this._proxy.getPin();
            let limit: number = Math.ceil(this.data.condtion / 10);
            let str1 = StringUtil.substitute(getLanById(LanDef.tiandi_tips1), [cfg.name, limit]);
            let str2 = TextUtil.addEnoughColor(pin, limit);
            this.lab_desc.textFlow = TextUtil.parseHtml(str1 + str2);

            this._rewardList.source = this.data.rewards;

            let buyBool = this._proxy.getBool(this._proxy.iType, index);
            this._canBuy = stage >= this.data.condtion;
            this.btn_buy.visible = !buyBool;
            this.img_buy.visible = buyBool;
            this.btn_buy.label = getLanById(LanDef.tishi_29);
            if (this.btn_buy.visible) {
                this.btn_buy.redPoint.visible = this._canBuy;
            }
        }

        private onClick(): void {
            if (!this.data) {
                return;
            }
            let index = this.data.index;
            if (!this._canBuy) {
                PromptBox.getIns().show(getLanById(LanDef.jinjielibao_tips2));
                return;
            }
            this._proxy.c2s_tiandi_get_level_rewards(this._proxy.iType, index);
        }
    }
}