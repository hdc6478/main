namespace game.mod.more {

    import teammate = msg.teammate;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;
    import zhandui_oper = msg.zhandui_oper;

    export class MiningSlaveEftItem extends BaseRenderer {

        private btn_modal: MiningModalItem;
        private btn_ot: Btn;
        private btn_check: Btn;
        private btn_free: Btn;
        private btn_out: Btn;
        private btn_goon: Btn;

        public data: teammate;
        private _proxy: MiningProxy;
        private _show: boolean = false;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Mining);

            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_modal, this.onClickModal, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_ot, this.onClickOt, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_check, this.onClickCheck, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_free, this.onClickFree, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_out, this.onClickOut, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_goon, this.onClickGoOn, this);
        }

        protected dataChanged(): void {
            this.btn_modal.setModal(this.data);

            this._show = false;
            this.btn_ot.visible = this.btn_check.visible = this.btn_free.visible = this.btn_out.visible = this.btn_goon.visible = this._show;

            if (!this.data || !this.data.role_id) {
                this.setHint = false;
                this.btn_modal.setHint(this._proxy.conquer_num > 0);
                return;
            }
            let opers: zhandui_oper = this._proxy.getSlaveOper(this.data.role_id) as zhandui_oper;
            if (!opers || !opers.list) {
                this.setHint = true;
                this.btn_modal.setHint(true);
                return;
            }
            let list = opers.list;
            this.btn_ot.setHint(list.indexOf(MiningOper.Ot) == -1);
            this.btn_check.setHint(list.indexOf(MiningOper.Check) == -1);
            this.btn_goon.setHint(list.indexOf(MiningOper.GoOn) == -1);
            this.btn_modal.setHint(list.length < 3);
        }

        private set setHint(bool: boolean) {
            this.btn_ot.setHint(bool);
            this.btn_check.setHint(bool);
            this.btn_goon.setHint(bool);
        }

        public setData(data: teammate, dir?: number): void {
            this.data = data;
            if (dir == 2) {
                this.btn_modal.setCurrentState()
            }
        }

        private onClickModal(): void {
            if (this.data && this.data.role_id) {
                this._show = !this._show;
                this.btn_ot.visible = this.btn_check.visible = this.btn_free.visible = this.btn_out.visible = this.btn_goon.visible = this._show;
            } else {
                // PromptBox.getIns().show("征服");
                if (!ViewMgr.getIns().checkZhenrongGod(1)) {
                    PromptBox.getIns().show("请先上阵军团阵容");
                    return;
                }
                ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.MiningFight);
            }
        }

        private onClickOt(): void {
            let bool: boolean = this._proxy.getSlaveOper(this.data.role_id, MiningOper.Ot) as boolean;
            if (bool) {
                PromptBox.getIns().show(getLanById(LanDef.zhanduishengxu_tips19));
                return;
            }
            ViewMgr.getIns().showConfirm(getLanById(LanDef.zhanduishengxu_tips1), Handler.alloc(this, () => {
                this._proxy.c2s_zhandui_helot_operate(MiningOper.Ot, this.data.role_id, RoleVo.ins.role_id);
            }));
        }

        private onClickCheck(): void {
            let bool: boolean = this._proxy.getSlaveOper(this.data.role_id, MiningOper.Check) as boolean;
            if (bool) {
                PromptBox.getIns().show(getLanById(LanDef.zhanduishengxu_tips18));
                return;
            }
            ViewMgr.getIns().showConfirm(getLanById(LanDef.zhanduishengxu_tips2), Handler.alloc(this, () => {
                this._proxy.c2s_zhandui_helot_operate(MiningOper.Check, this.data.role_id, RoleVo.ins.role_id);
            }));
        }

        private onClickFree(): void {
            ViewMgr.getIns().showConfirm(getLanById(LanDef.zhanduishengxu_tips3), Handler.alloc(this, () => {
                this._proxy.c2s_zhandui_helot_operate(MiningOper.Free, this.data.role_id, RoleVo.ins.role_id);
            }));
        }

        private onClickOut(): void {
            ViewMgr.getIns().showConfirm(getLanById(LanDef.zhanduishengxu_tips4), Handler.alloc(this, () => {
                this._proxy.c2s_zhandui_helot_operate(MiningOper.Out, this.data.role_id, RoleVo.ins.role_id);
            }));
        }

        private onClickGoOn(): void {
            let bool: boolean = this._proxy.getSlaveOper(this.data.role_id, MiningOper.GoOn) as boolean;
            if (bool) {
                PromptBox.getIns().show(getLanById(LanDef.zhanduishengxu_tips21));
                return;
            }
            ViewMgr.getIns().showConfirm(getLanById(LanDef.zhanduishengxu_tips5), Handler.alloc(this, () => {
                this._proxy.c2s_zhandui_helot_operate(MiningOper.GoOn, this.data.role_id, RoleVo.ins.role_id);
            }));
        }

    }
}