namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;

    export class CrossUnionFormatItem extends BaseRenderer {

        private btn: Btn;
        private lab_pos: eui.Label;
        private lab_name: eui.Label;
        private powerLab: PowerLabel;
        private lab_job: eui.Label;

        private _proxy: CrossUnionProxy;
        private _idx: number;

        public data: CrossUnionFormatData;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.CrossUnion);

            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn, this.onClickBtn, this);
        }

        protected dataChanged(): void {
            this._idx = this.itemIndex + 1;

            this.btn.visible = !!this.data.team;
            if (this.btn.visible) {
                this.btn.icon = !!this._proxy.select ? "quxiao2" : "xuanze2";
            }

            this.lab_pos.text = `${this._idx}`;
            let info = this.data.info;
            this.lab_name.text = `${info.name || ""}`;
            this.lab_job.text = `${UnionJobStr[info.guild_job || 4]}`;
            this.powerLab.setPowerValue(info.power || 0);
        }

        private onClickBtn(): void {
            if (!this._proxy.team_oper) {
                PromptBox.getIns().show("暂无权限");
                return
            }
            let role_id: Long = this.data.info && this.data.info.role_id;
            if (!role_id) {
                DEBUG && console.error("role_id is undefined");
                return;
            }
            if (!this._proxy.select) {
                this._proxy.select = role_id;
                return;
            }
            let select: Long = this._proxy.select as Long;
            this._proxy.c2s_guild_pk_oper(3, null, select, role_id);
        }
    }

    export interface CrossUnionFormatData {
        team: number,
        info: msg.guild_pk_lineup_member,
    }
}