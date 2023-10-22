namespace game.mod.more {

    import zhandui_can_apply_struct = msg.zhandui_can_apply_struct;
    import LanDef = game.localization.LanDef;

    export class ZhanduiJoinItem extends BaseListenerRenderer {
        public lb_name: eui.Label;
        public lb_captain: eui.Label;
        public lb_num: eui.Label;
        public powerLabel: game.mod.PowerLabel;
        public btn_do: game.mod.Btn;
        public lb_limit: eui.Label;
        public img_flag: eui.Image;

        data: zhandui_can_apply_struct;
        private _proxy: ZhanduiProxy;
        private _teamCnt = 4;//战队人员数量

        constructor() {
            super();
            this.skinName = `skins.more.ZhanduiJoinItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Zhandui);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_do, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.lb_name.text = getLanById(LanDef.zhandui_tips1) + '：' + data.team_name;
            this.lb_captain.text = getLanById(LanDef.guild_mengzhu) + `：` + data.name;
            this.lb_num.text = getLanById(LanDef.relic6) + `：` + data.role_count + '/' + this._teamCnt;
            this.powerLabel.setPowerValue(data.total_showpower);
            this.img_flag.source = ResUtil.getZhanduiFlag(data.flag_index);

            if (data.limit_showpower && data.limit_showpower.notEquals(Long.ZERO)) {
                this.lb_limit.text = getLanById(LanDef.showpower) + '：' + StringUtil.getPowerNumStr(data.limit_showpower.toNumber());
            } else {
                this.lb_limit.text = getLanById(LanDef.zhandui_tips6);
            }
        }

        private onClick(): void {
            if (this.lb_limit.text == getLanById(LanDef.zhandui_tips6)) {
                if (this.data.role_count >= this._teamCnt) {
                    PromptBox.getIns().show(getLanById(LanDef.zhandui_tips26));
                } else {
                    this._proxy.sendButtonClickTeamId(this.data.team_id);
                }
                return;
            }
            let limitPower = this.data.limit_showpower;
            let myPower = RoleVo.ins.showpower;
            if (myPower.lessThan(limitPower)) {
                PromptBox.getIns().show(getLanById(LanDef.tiaojianbuzu));
                return;
            }
            this._proxy.sendButtonClickTeamId(this.data.team_id);
        }
    }
}