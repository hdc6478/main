namespace game.mod.boss {

    import NewVipBossFubenConfig = game.config.NewVipBossFubenConfig;
    import Monster1Config = game.config.Monster1Config;
    import LanDef = game.localization.LanDef;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import Handler = base.Handler;

    export class VipBossItemRender extends BaseRenderer implements UpdateItem {

        public img_icon: eui.Image;
        public img_lock: eui.Image;
        public timeItem: game.mod.TimeItem;
        public lab_name: eui.Label;
        public grp_vip_num: eui.Group;
        public redPoint: eui.Image;

        public data: IVipBossGateData;
        private _time: number;

        constructor() {
            super();
            this.skinName = "skins.boss.VipBossItemSkin";
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.lab_name, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            TimeMgr.removeUpdateItem(this);
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            if(!this.data || !this.data.info){
                return;
            }
            let cfg = this.data.cfg;
            let fbCfg: NewVipBossFubenConfig = getConfigByNameId(ConfigName.NewVipBossFuben, cfg.index % 10);
            this.addBmpFont(fbCfg.VIP_lv + "", BmpTextCfg[BmpTextType.MainVip], this.grp_vip_num);
            let mcfg: Monster1Config = getConfigByNameId(ConfigName.Monster, fbCfg.bossId[0]);
            this.img_icon.source = mcfg.res_id;
            
            this._time = this.data.info.next_boss_time - TimeMgr.time.serverTimeSecond;
            if(this._time > 0) {                // cd 时间
                this.timeItem.visible = true;
                this.lab_name.visible = false;
                this.update(null);
                TimeMgr.addUpdateItem(this, 1000);
            } else {
                this.timeItem.visible = false;
                this.lab_name.visible = true;

                if(this.data.state == VipBossState.NonActivited) {          // 未激活
                    this.lab_name.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt("前往激活", BlackColor.YELLOW, ""));
                } else {                // 可挑战、或可碾压
                    this.lab_name.text = "已刷新";
                }
                TimeMgr.removeUpdateItem(this);
            }
            //cd或者未激活
            this.img_lock.visible = this._time > 0 || this.data.state == VipBossState.NonActivited;   // (this.data.state == VipBossState.CD || this.data.state == VipBossState.NonActivited);
            this.redPoint.visible = !this.img_lock.visible;
        }

        //倒计时
        update(time: base.Time): void {
            this._time--;
            this.timeItem.updateLeftTime(this._time);
            if (this._time <= 0) {
                this.dataChanged();
                TimeMgr.removeUpdateItem(this);
            }
        }

        private onClick(e: TouchEvent) {
            if(!this.data || !this.data.info){
                return;
            }
            if(this.data.state == VipBossState.NonActivited) {
                ViewMgr.getIns().openCommonRechargeView();
            }
        }

    }
}