namespace game.mod.more {

    import zhandui_kuanzhu_data = msg.zhandui_kuanzhu_data;
    import teammate = msg.teammate;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;

    export class MiningItem extends BaseRenderer {

        private head_master: HeadVip;
        private lab_slavetime: eui.Label;

        private grp_all: eui.Group;

        private grp_self: eui.Group;
        private head_self: HeadVip;
        private lab_self: eui.Label;
        private power_label: PowerLabel;

        private grp_tips: eui.Group;
        private lab_tips: eui.Label;

        private slaveItem1: MiningSlaveItem;
        private slaveItem2: MiningSlaveItem;
        private lab_time1: eui.Label;
        private lab_time2: eui.Label;

        public data: zhandui_kuanzhu_data;
        //玩家自己
        private is_self: boolean = false;
        private _proxy: MiningProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Mining);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.head_master, this.onFight, this);
        }

        protected dataChanged(): void {
            this.setMaster();

            let member = this.data && this.data.memeber;
            if (member) {
                this.is_self = member.role_id.eq(RoleVo.ins.role_id);

                this.head_self.updateShow(member.head, member.head_frame, member.sex, member.vip, member.role_id);
                this.lab_self.text = member.name;
                this.power_label.setPowerValue(member.showpower, 0xad3c1a);
            }

            for (let i = 0; i < 2; i++) {
                let key: number = i + 1;
                let info: teammate = this.data && this.data.members && this.data.members[i] || null;
                let item: MiningSlaveItem = this[`slaveItem${key}`];
                item.setData(info, this.is_self);
                if (this.is_self) {
                    item.setHint(!info && this._proxy.conquer_num > 0);
                } else {
                    item.setHint(false);
                }
                let lab: eui.Label = this[`lab_time${key}`];
                this.onUpdateTime(lab, info && info.value.toNumber() || 0);
            }
        }

        private setMaster(): void {
            let master = this.data && this.data.kuanzhu;
            let bool: boolean = !!master;
            if (!bool) {
                this.currentState = "1";
            } else {
                this.currentState = "2";

                this.head_master.updateShow(master.head, master.head_frame, master.sex, master.vip);
                this.onUpdateTime(this.lab_slavetime, master.value.toNumber());

                let str: string = StringUtil.substitute(getLanById(LanDef.zhanduishengxu_tips7), [master.name]);
                this.lab_tips.textFlow = TextUtil.parseHtml(str);
            }
        }

        private onFight(): void {
            if (!ViewMgr.getIns().checkZhenrongGod(1)) {
                PromptBox.getIns().show("请先上阵军团阵容");
                return;
            }
            if (!this._proxy.rescue_num) {
                PromptBox.getIns().show("次数不足");
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.MiningSave, this.data);
        }

        private onUpdateTime(lab: eui.Label, endTime: number): void {
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            let timeStr = TimeUtil.formatSecond(leftTime, 'd天H时', true);
            lab.text = leftTime > 0 ? timeStr : "";
        }

        public onUpdateTimes(): void {
            if (!this.data) {
                return;
            }
            if (this.data.members) {
                for (let i in this.data.members) {
                    let info = this.data.members[i];
                    let lab: eui.Label = this[`lab_time${+i + 1}`];
                    if (lab) {
                        this.onUpdateTime(lab, info.value.toNumber());
                    }
                }
            }
            if (this.currentState == "2" && this.data.kuanzhu) {
                this.onUpdateTime(this.lab_slavetime, this.data.kuanzhu.value.toNumber());
            }
        }
    }
}