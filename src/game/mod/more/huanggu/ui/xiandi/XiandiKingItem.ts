namespace game.mod.more {

    import teammate = msg.teammate;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;

    export class XiandiKingItem extends BaseRenderer {

        private grp_eft: eui.Group;
        // private lab_name: eui.Label;
        // private lab_score: eui.Label;
        private btn_change: Btn;
        private btn_add: Btn;
        private btn_info: Btn;
        // private img_title: eui.Image;

        private titleItem: XiandiTitleItem;

        // private _proxy: XiandiProxy;
        public data: teammate;
        private _bool: boolean = false;
        private _index: number = 0;
        private _proxy: XiandiProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Xiandi);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_change, this.onClickChange, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_add, this.onClickChange, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_info, this.onClickInfo, this);
        }

        protected dataChanged(): void {
            let info = this.data;
            if (info) {
                this.updateRankUIRole(this.grp_eft, info, 0.6);
            }
            this.btn_change.visible = this._bool;
            this.btn_add.visible = !info;
            this.btn_info.visible = !this._index;
            // this.btn_info.visible = !!info && !this._index;

            let name: string = info && info.name || getLanById(LanDef.tishi_2);
            let title: string = "";
            let showpower: number = 0;
            if (this._index) {
                title = `img_king_title${this._index}`;
            } else {
                title = "xiandi_title1";
                showpower = info && info.showpower && info.showpower.toNumber() || 0;
            }
            let power: string;
            if (showpower) {
                power = StringUtil.getPowerNumStr(showpower);
            }
            this.titleItem.setData({ title, name, power })
        }

        public setData(data: teammate, index: number, bool: boolean = false): void {
            this._index = index;
            this._bool = bool || false;
            this.data = data;
        }

        private onClickChange(): void {
            if (!this._proxy.is_tiandi) {
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XiandiList, this._index);
        }

        private onClickInfo(): void {
            if (!this._proxy.tiandi_info) {
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XiandiInfo);
        }

    }
}
