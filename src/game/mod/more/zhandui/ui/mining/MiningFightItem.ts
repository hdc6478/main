namespace game.mod.more {


    import TouchEvent = egret.TouchEvent;
    import zhandui_conquer_data = msg.zhandui_conquer_data;
    import teammate = msg.teammate;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class MiningFightItem extends BaseRenderer {

        private headVip: HeadVip;
        private lab_name: eui.Label;
        private power: TeamGodPower;
        private btn_fight: Btn;
        private lab_rate: eui.Label;
        private lab_master: eui.Label;

        private _proxy: MiningProxy;

        public data: zhandui_conquer_data;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_fight, this.onClickFight, this);

            this._proxy = getProxy(ModName.More, ProxyType.Mining);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.lab_master.text = "";
            if (this.data.name && this.data.role_id) {
                this.lab_master.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.zhanduishengxu_tips8), [this.data.name]));
            }
            let info: teammate = this.data.data;
            this.headVip.updateShow(info.head, info.head_frame, info.sex, info.vip, info.role_id);
            this.lab_name.text = info.name;
            this.power.setPowerValue(info && info.god || 0);

            this.lab_rate.text = `胜率：${info.value || 0}%`;
            if (this.data.name) {
                let str = StringUtil.substitute(getLanById(LanDef.zhanduishengxu_tips8), [this.data.name]);
                this.lab_master.textFlow = TextUtil.parseHtml(str);
            } else {
                this.lab_master.text = "";
            }
        }

        private onClickFight(): void {
            if (!this._proxy.conquer_num) {
                if (!this._proxy.dail_buy_num) {
                    PromptBox.getIns().show(getLanById(LanDef.guaji_shouyi_tips07));
                    return;
                }
                ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.MiningBuy);
                return;
            }
            let proxy: IFriendProxy = getProxy(ModName.Friend, ProxyType.Friend);
            if (this.data.role_id) {
                proxy.c2s_friend_pvp_challenge(this.data.role_id, { type: 2, target_id: this.data.data.role_id });
            } else {
                proxy.c2s_friend_pvp_challenge(this.data.data.role_id, { type: 2, target_id: null });
            }
            this._proxy.refresh_list = true;
            facade.hideView(ModName.More, MoreViewType.MiningFight);
        }

    }
}