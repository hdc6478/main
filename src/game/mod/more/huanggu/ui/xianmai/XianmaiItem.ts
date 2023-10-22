namespace game.mod.more {

    import XianmaiStageConfig = game.config.XianmaiStageConfig;
    import TimeMgr = base.TimeMgr;
    import xianmai_role_data = msg.xianmai_role_data;
    import LanDef = game.localization.LanDef;

    export class XianmaiItem extends BaseRenderer {
        public img_bg: eui.Image;
        public img_timedi: eui.Image;
        public lb_name: eui.Label;
        public powerLabel: game.mod.PowerLabel;
        public bar: game.mod.ProgressBarComp;
        public lb_defendtime: eui.Label;

        data: IXianmaiItemData;
        private _proxy: XianmaiProxy;
        private _defendEft: number;

        constructor() {
            super();
            this.skinName = `skins.more.XianmaiItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Xianmai);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.removeDefendTime();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }

            let info = this._proxy.getStageInfo(data.cfg.index);
            this.currentState = info ? 'default' : 'notone';
            this.img_bg.source = `xianmai_img` + this._proxy.getLayerIdx(data.stage);
            if (info) {
                let isRobot = info.data && info.data.role_id.eq(Long.ZERO);

                let myGuildId = RoleUtil.getGuildId();//我的仙宗id
                let otherGuildId = info.data.guild_id || null;
                let isSameGuild = myGuildId && otherGuildId && myGuildId == otherGuildId;
                let color: number = 0xf9e241;
                if (isRobot || !isSameGuild) {
                    color = BlackColor.RED;//中立生物和非本仙宗玩家用红色
                }
                this.lb_name.text = isRobot ? this._proxy.getBossNames()[0] : (info.data && info.data.name || '');
                this.lb_name.textColor = color;

                this.powerLabel.setPowerValue(info.data && info.data.showpower || 0, 0xfefae5);
                this.bar.show(info.hp / 100, 100, false, null, false);
                this.bar.showLabel(info.hp / 100 + '%');

                this.updateTime();
            }
        }

        private onClick(): void {
            let stage = this.data.stage;
            let index = this.data.cfg.index;

            let myData = this._proxy.my_data;
            if (myData && stage == myData.stage && index == myData.index) {
                ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianmaiItemTipsMine);
                return;
            }

            let info = this.data.info;
            if (info && info.defend_time && TimeMgr.time.serverTimeSecond < info.defend_time) {
                PromptBox.getIns().show(getLanById(LanDef.xianmaizhengduo_tips22));
                return;
            }

            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianmaiItemTips, [stage, index]);
        }

        //更新保护时间
        public updateTime(): void {
            if (!this.data || !this.data.cfg) {
                this.removeDefendTime();
                return;
            }
            let info = this._proxy.getStageInfo(this.data.cfg.index);
            if (!info) {
                this.removeDefendTime();
                return;
            }

            let defendTime = info.defend_time || 0;
            let leftTime = defendTime - TimeMgr.time.serverTimeSecond;
            if (leftTime > 0) {
                this.lb_defendtime.visible = true;
                this.img_timedi.visible = true;
                this.lb_defendtime.text = getLanById(LanDef.xianmaizhengduo_tips23) + ':' + TimeUtil.formatSecond(leftTime, 'mm分ss秒');
                this.addDefendEff();
            } else {
                this.removeDefendTime();
            }
        }

        private removeDefendTime(): void {
            this.lb_defendtime.visible = false;
            this.img_timedi.visible = false;
            if (this._defendEft) {
                this.removeEffect(this._defendEft);
            }
        }

        //保护特效 todo
        private addDefendEff(): void {
            // if (this._defendEft) {
            //     this.removeEffect(this._defendEft);
            // }
        }
    }

    export interface IXianmaiItemData {
        stage: number;//层数
        cfg: XianmaiStageConfig;
        info: xianmai_role_data;
    }
}