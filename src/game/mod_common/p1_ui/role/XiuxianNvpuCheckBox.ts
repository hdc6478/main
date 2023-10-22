namespace game.mod {

    import facade = base.facade;
    import GameNT = base.GameNT;

    /**
     * 修仙女仆的自动挑战勾选框
     */
    export class XiuxianNvpuCheckBox extends eui.CheckBox {

        constructor() {
            super();
            this.skinName = `skins.common.CheckSkin1`;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage(): void {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            facade.onNt(MainEvent.ON_OPEN_FUNC_UPDATE, this.onOpenFuncUpdate, this);

            this.label = '自动挑战';
        }

        protected onRemoveFromStage(): void {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            facade.offNt(MainEvent.ON_OPEN_FUNC_UPDATE, this.onOpenFuncUpdate, this);
        }

        private _eventType: XiuxianNvpuEventType;

        /**
         * 更新展示
         * @param eventType
         */
        public updateShow(eventType: XiuxianNvpuEventType): void {
            this._eventType = eventType;
            let isOpen = ViewMgr.getIns().checkViewOpen(OpenIdx.XiuxianNvpu);
            this.visible = isOpen;
            if (!isOpen) {
                return;
            }
            this.selected = RoleUtil.isNvpuOnlineSelected(eventType);
        }

        private onClick(): void {
            if (!RoleUtil.isNvpuAct(false, true)) {
                this.selected = false;
                return;
            }
            RoleUtil.setNvpuOnlineSetting(XiuxianNvpuEventType.ManyBoss, this.selected);
        }

        private onOpenFuncUpdate(n: GameNT): void {
            let idxs = n.body as number[];
            if (this._eventType && idxs.indexOf(OpenIdx.XiuxianNvpu) > -1) {
                this.updateShow(this._eventType);
            }
        }
    }
}