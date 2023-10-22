namespace game.mod.more {


    import facade = base.facade;
    import PropConfig = game.config.PropConfig;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class TimeGoddessShelfItem extends BaseRenderer {

        private lab_name: eui.Label;
        private lab_score: eui.Label;
        private icon: Icon;
        private grp_time: eui.Group;

        private _proxy: GoddessRecordProxy;
        public data: PropData;


        protected onAddToStage(): void {
            this.lab_score.text = "";
            this.lab_name.y = 57;
            this._proxy = facade.retMod(ModName.More).retProxy(ProxyType.GoddessRecord);
            this.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected dataChanged(): void {
            if (this.data == null) {
                return;
            }
            this.icon.setData(this.data);
            this.lab_name.textFlow = this.icon.getPropName();

            let cfg: PropConfig = this.data.cfg;
            let seconds: number = cfg.param1[0][0];
            this.addBmpFont(TimeUtil.getConsecrateTime(seconds), BmpTextCfg[BmpTextType.MainVip], this.grp_time);

        }

        //外部指引调用
        private onClick(): void {
            let idx = Long.fromValue(this.data.index);
            this._proxy.c2s_chuang_shi_nv_shen_system_click(TimeGoddessOpType.Gongfeng, null, [idx]);
            facade.sendNt(ConsecrateEvent.ON_CLOSE_CONSECRATE_SHELF);
        }
    }

}