namespace game.mod.more {

    import XianmaiStageConfig = game.config.XianmaiStageConfig;
    import xianmai_role_data = msg.xianmai_role_data;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    export class XianmaiInfoItem extends BaseRenderer {
        public img_bg: eui.Image;
        public timeItem: game.mod.TimeItem;
        public gr_defendtime: eui.Group;
        public lb_defendtime: eui.Label;
        public lb_desc0: eui.Label;
        public lb_desc1: eui.Label;
        public lb_desc2: eui.Label;
        public bar: game.mod.ProgressBarComp;

        private _proxy: XianmaiProxy;
        private _defendEft: number;

        constructor() {
            super();
            this.skinName = `skins.more.XianmaiInfoItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Xianmai);
        }

        protected onRemoveFromStage() {
            super.onRemoveFromStage();
            this.removeDefendEff();

        }

        //无人占领的
        public updateDefaultView(stage: number, index: number): void {
            this.gr_defendtime.visible = false;
            this.timeItem.visible = false;
            let cfg = this._proxy.getStageCfg(stage, index);
            this.updateInfo(cfg, stage);
            this.bar.show(0, 1, false, null, false);
            this.bar.showLabel('0%');
        }

        public updateInfo(cfg: XianmaiStageConfig, stage: number): void {
            this.img_bg.source = `xianmai_img` + this._proxy.getLayerIdx(stage);

            this.lb_desc0.textFlow = TextUtil.parseHtml(getLanById(LanDef.xianmaizhengduo_tips24) + `：` + TextUtil.addColor(`4小时`, WhiteColor.GREEN));
            let item0 = cfg.score_item;
            let cfg0 = GameConfig.getPropConfigById(item0[0]);
            this.lb_desc1.textFlow = TextUtil.parseHtml(cfg0.name + '：' + TextUtil.addColor(item0[1] + '', WhiteColor.GREEN));
            let item1 = cfg.lingshi_item;
            let cfg1 = GameConfig.getPropConfigById(item1[0]);
            this.lb_desc2.textFlow = TextUtil.parseHtml(cfg1.name + '：' + TextUtil.addColor(item1[1] + '', WhiteColor.GREEN));
        }

        //有人占领的
        public updateRoleView(data: xianmai_role_data): void {
            if (!data) {
                return;
            }
            let cfg = this._proxy.getStageCfg(data.stage, data.index);
            this.updateInfo(cfg, data.stage);
            this.bar.show(data.hp / 100, 100, false, null, false);
            this.bar.showLabel(data.hp / 100 + '%');

            //占领倒计时
            let endTime = data.end_time;
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            this.timeItem.visible = leftTime > 0;
            if (leftTime > 0) {
                this.timeItem.updateLeftTime(leftTime);
            }

            //保护倒计时
            let defendTime = data.defend_time || 0;
            let defendLeftTime = defendTime - TimeMgr.time.serverTimeSecond;
            if (defendLeftTime > 0) {
                this.gr_defendtime.visible = true;
                this.lb_defendtime.text = getLanById(LanDef.xianmaizhengduo_tips23) + ':' + TimeUtil.formatSecond(defendLeftTime, 'mm分ss秒');
                this.addDefendEff();
            } else {
                this.gr_defendtime.visible = false;
                this.removeDefendEff();
            }
        }

        private removeDefendEff(): void {
            if (this._defendEft) {
                this.removeEffect(this._defendEft);
            }
        }

        //保护特效 todo
        private addDefendEff(): void {
            // this.removeDefendEff();

        }

    }
}