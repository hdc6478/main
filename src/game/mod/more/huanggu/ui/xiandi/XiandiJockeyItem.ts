namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import teammate = msg.teammate;
    import LanDef = game.localization.LanDef;

    /**仙帝弑帝夺位 */
    export class XiandiJockeyItem extends BaseRenderer {

        private head: Head;
        private lab_name: eui.Label;
        /**按钮需求要自己扩展 */
        private btn_fight: Btn;

        private _proxy: XiandiProxy;
        public data: teammate;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_fight, this.onClickFight, this);

            this._proxy = getProxy(ModName.More, ProxyType.Xiandi);
        }

        protected dataChanged(): void {
            if (!this.data) {
                this.lab_name.text = getLanById(LanDef.tishi_2);
                this.head.defaultHeadShow();
                return;
            }
            this.lab_name.text = this.data.name;
            this.head.updateHeadShow(this.data.head, this.data.head_frame, this.data.sex, this.data.role_id);

            this.btn_fight.visible = !this._proxy.is_tiandi;
        }

        private onClickFight(): void {
            this._proxy.onCheckJockey();
        }

        public setData(data: teammate): void {
            this.data = data;
        }

        public initData(): void {
            this.data = this._proxy.tiandi_info;
        }
    }
}