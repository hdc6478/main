namespace game.mod.activity {

    import facade = base.facade;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class MainActivityBtn extends BaseRenderer implements UpdateItem {
        public btn_act: Btn;
        public gr_eff: eui.Group;
        public redPoint: eui.Image;
        public gr_time: eui.Group;
        public lab_time: eui.Label;

        private _proxy: ActivityProxy;
        private endTime: number;
        private effId: number;
        private _effId1: number;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.gr_eff.touchEnabled = false;
            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            // this.lab_time.textColor = WhiteColor.GREEN;
        }

        protected onRemoveFromStage(): void {
            TimeMgr.removeUpdateItem(this);
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let self = this;
            let icon: string = self.data;
            self.gr_time.visible = false;
            self.btn_act.visible = true;
            self.lab_time.text = "";
            if (!icon || icon.trim() == "") {
                this.btn_act.visible = false;
                return;
            }
            let showHint: boolean = false

            self.btn_act.icon = icon;
            self.redPoint.visible = showHint;
            if (self.effId) {
                self.removeEffect(self.effId);
                self.effId = null;
            }
            if (showHint && icon) {
                //self.effId = this.addEftByParent(UIEftSrc.ActBtnEffect, 42, 42, self.gr_eff, -1, null, 0);
            }
        }

        private setTime(_time: number): void {
            if (_time) {
                this.endTime = _time;
                this.gr_time.visible = true;
                if (!TimeMgr.hasUpdateItem(this)) {
                    TimeMgr.addUpdateItem(this, 1000);
                    this.updateTime();
                }
            }
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime() {
            let left_time: number = this.endTime - TimeMgr.time.serverTimeSecond;
            if (left_time < 0) {
                this.gr_time.visible = false;
                TimeMgr.removeUpdateItem(this);
            } else if (left_time > 3600 * 24) {
                this.lab_time.text = TimeUtil.formatSecond(left_time, "dd天HH时");
            } else {
                this.lab_time.text = TimeUtil.formatSecond(left_time, "HH时mm分");
            }
        }
    }
}