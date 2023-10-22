namespace game.mod.consecrate {


    import facade = base.facade;
    import PropConfig = game.config.PropConfig;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class ConsecrateShelfItem extends BaseRenderer {

        private lab_name: eui.Label;
        // private lab_time: eui.Label;
        private lab_score: eui.Label;
        private icon: Icon;
        private grp_time: eui.Group;

        private _proxy: ConsecrateProxy;
        public data: PropData;


        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.Consecrate).retProxy(ProxyType.Consecrate);
            // this.icon.addEventListener(TouchEvent.TOUCH_TAP, this.onClickIcon, this);
            this.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected dataChanged(): void {
            if (this.data == null) {
                return;
            }
            this.icon.setData(this.data);
            this.lab_name.textFlow = this.icon.getPropName();

            let cfg: PropConfig = this.data.cfg;
            let score: number = cfg.param1[1][0];
            this.lab_score.text = `${getLanById(LanDef.consecrate_title3)}：+${score}`;

            let seconds: number = cfg.param1[0][0];
            this.addBmpFont(TimeUtil.getConsecrateTime(seconds), BmpTextCfg[BmpTextType.MainVip], this.grp_time);

        }

        //外部指引调用
        public onClick(): void {
            this._proxy.c2s_consecrate_putin([this.data.index]);
            facade.sendNt(ConsecrateEvent.ON_CLOSE_CONSECRATE_SHELF);
        }
    }

}