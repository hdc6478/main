namespace game.mod.more {

    import PropConfig = game.config.PropConfig;
    import facade = base.facade;

    export class XujieJitanShelfItem extends BaseRenderer {
        public icon: game.mod.Icon;
        public lab_name: eui.Label;
        public lab_score: eui.Label;
        public grp_time: eui.Group;

        data: PropData;
        private _proxy: XujieJitanProxy;

        constructor() {
            super();
            this.skinName = `skins.consecrate.ConsecrateShelfItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.XujieJitan);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.icon.setData(this.data);
            this.lab_name.textFlow = this.icon.getPropName();

            let cfg: PropConfig = this.data.cfg;
            let score: number = cfg.param1[1][0];
            // this.lab_score.text = `${getLanById(LanDef.consecrate_title3)}：+${score}`;
            this.lab_score.text = '';

            let seconds: number = cfg.param1[0][0];
            this.addBmpFont(TimeUtil.getConsecrateTime(seconds), BmpTextCfg[BmpTextType.MainVip], this.grp_time);
        }

        private onClick(): void {
            this._proxy.sendJitanButtonClick(ZhanduiOperType.Oper200, null, null, [this.data.index]);
            facade.sendNt(MoreEvent.ON_CLOSE_ZHANDUI_JITAN_SHELF);
        }
    }
}