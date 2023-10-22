namespace game.mod.more {

    import Handler = base.Handler;
    import BuffConfig = game.config.BuffConfig;

    export class XianjieLuandouSkillItem extends BaseListenerRenderer {
        public img_icon: eui.Image;
        public lab_name: eui.Label;
        public lab_desc: eui.Label;
        public btn_buy: game.mod.Btn;

        data: number[];
        private _proxy: XianjieLuandouProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.XianjieLuandou);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let buffId = data[1];
            let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffId);
            if (buffCfg) {
                this.img_icon.source = buffCfg.icon;
                this.lab_name.text = buffCfg.name;
                this.lab_desc.textFlow = TextUtil.parseHtml(buffCfg.des);
            }

            let cost: number[] = [data[3], data[4]];
            this.btn_buy.setCost(cost);
        }

        private onClick(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let cost: number[] = [data[3], data[4]];
            if (cost && !BagUtil.checkPropCntUp(cost[0], cost[1])) {
                return;
            }

            let buffId = data[1];
            let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffId);
            let costCfg = GameConfig.getPropConfigById(cost[0]);
            let costDesc = TextUtil.addColor(`${cost[1]}张${costCfg.name}`, WhiteColor.GREEN);
            let str = `使用${TextUtil.addColor(buffCfg.name, WhiteColor.RED)}#N${buffCfg.des}#N消耗${costDesc}`;
            ViewMgr.getIns().showConfirm(str, Handler.alloc(this, () => {
                this._proxy.c2s_xianjie_pvp_scene_use_buff(data[0]);
            }));
        }
    }
}