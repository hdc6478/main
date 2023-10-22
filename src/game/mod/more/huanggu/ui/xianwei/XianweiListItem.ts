namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import TouchEvent = egret.TouchEvent;
    import XianweiBaseConfig = game.config.XianweiBaseConfig;
    import xianwei_member_data = msg.xianwei_member_data;
    import facade = base.facade;

    export class XianweiListItem extends BaseRenderer {

        private head: Head;
        private img_title: eui.Image;
        private lab_name: eui.Label;
        private powerLabel: PowerLabel;
        private timeItem: TimeItem;
        private btn: Btn;
        private grp_time: eui.Group;

        private _proxy: XianweiProxy;
        private _power: number;
        private _self: boolean = false;
        // data: { cfg: XianweiBaseConfig, info: xianwei_member_data };
        data: xianwei_member_data;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Xianwei);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn, this.onClickBtn, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.head, this.onClickHead, this);
        }

        protected dataChanged(): void {
            let info = this.data;
            // let cfg = this.data.cfg;
            let cfg: XianweiBaseConfig = this._proxy.cfgArr.get(`${info.stage}_${info.index}`);
            if (!info.data || info.data.is_robot) {
                let head: number[] = cfg.head_frame[info.pos - 1];
                this.head.updateHeadShow(head[0], head[1]);
                this.lab_name.text = cfg.name;
                this.powerLabel.setPowerValue(cfg.rebot_power);
                this._power = cfg.rebot_power;
            } else {
                this._self = info.data.role_id.eq(RoleVo.ins.role_id);

                this.head.updateHeadShow(info.data.head, info.data.head_frame, info.data.sex, info.data.role_id);
                this.lab_name.text = info.data.name;
                this.powerLabel.setPowerValue(info.data.showpower);
                this._power = info.data.showpower.toNumber();
            }
            let key: string = `${info.stage}_${info.index}`;
            this.img_title.source = `xianweititle${key}`;

            let serverTime: number = TimeMgr.time.serverTimeSecond;
            this.grp_time.visible = !!info.end_time && info.end_time > serverTime;
            if (this.grp_time.visible) {
                this.timeItem.updateLeftTime(serverTime - info.start_time, "", "");//getLanById(LanDef.battle_cue29)
            }
        }

        private onClickBtn(): void {
            if (this._self) {
                PromptBox.getIns().show("不能挑战自己");
                return;
            }
            if (RoleVo.ins.showpower.toNumber() < this._power) {
                PromptBox.getIns().show("战力不足，挑战失败");
                return;
            }
            if (this._proxy.attack_time && TimeMgr.time.serverTimeSecond < this._proxy.attack_time) {
                PromptBox.getIns().show("攻击冷却中");
                return;
            }
            let info = this.data;
            this._proxy.c2s_xianwei_challenge(info.stage, info.index, info.pos);
            facade.sendNt(MainEvent.ON_CLOSE_COMMON_POPUP);
        }

        private onClickHead(): void {
            let info = this.data;
            if (!info.data || info.data.is_robot) {
                PromptBox.getIns().show("对方修为如迷雾一般，竟无法看透");
            }
        }
    }
}
