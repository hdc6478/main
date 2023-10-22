namespace game.mod {

    import ParamConfig = game.config.ParamConfig;
    import GuildWareConfig = game.config.GuildWareConfig;
    import EquipmentConfig = game.config.EquipmentConfig;
    import TouchEvent = egret.TouchEvent;
    import Handler = base.Handler;
    import facade = base.facade;

    export class ExchangeTips extends BaseListenerRenderer {
        public costItem: CostIcon;
        public btn_buy: Btn;
        public lab_count: eui.Label

        private _propData: PropData;
        private _clickHandler: Handler;

        protected onAddToStage() {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
        }

        private onClick(): void {
            if (!this._propData) {
                return;
            }
            if (!this._propData.count) {
                PromptBox.getIns().show("剩余兑换数量不足");
                return;
            }
            let proxy: IUnionProxy = facade.retMod(ModName.Union).retProxy(ProxyType.Union);
            proxy.c2s_guild_ware_exchange(this._propData.prop_id);
            if(this._clickHandler){
                this._clickHandler.exec();
            }
        }

        public updateExchangeTips(data: PropData, clickHandler?: Handler): void {
            let iconShowType = data.iconShowType;
            let showExchange = iconShowType == IconShowType.UnionExchange;//显示兑换，优先显示
            this.visible = showExchange;
            if(!this.visible){
                return;
            }
            this._propData = data;
            this._clickHandler = clickHandler;

            if (this._propData.type != ConfigHead.Equip) {
                let param1: ParamConfig = GameConfig.getParamConfigById("guild_jifen");
                if (this._propData.index == param1.value[1]) {
                    let param2: ParamConfig = GameConfig.getParamConfigById("guild_jifen_goumai");
                    this.costItem.updateShow(param2.value);
                } else {
                    let cfg: GuildWareConfig = getConfigByNameId(ConfigName.GuildWare, this._propData.index);
                    if (!cfg) {
                        console.error(`guild_ware.json缺少${this._propData.index}配置`);
                    }
                    this.costItem.updateShow(cfg.cost);
                }
            } else {
                let cfg = this._propData.cfg as EquipmentConfig;
                this.costItem.updateShow(cfg.guild_donate);
            }
            this.lab_count.text = `剩余可兑换${this._propData.count}次`;
        }
    }

}