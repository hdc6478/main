namespace game.mod.more {

    export class XiandiListItem extends BaseRenderer {

        private headVip: HeadVip;
        private lab_name: eui.Label;
        private lab_power: eui.Label;
        private btn_set: Btn;

        private _proxy: XiandiProxy;
        public data: msg.rank_info;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Xiandi);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_set, this.onClickBtn, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let info = this.data.base_info;
            this.lab_name.text = info.name;
            this.lab_power.text = `战力：${info.showpower && info.showpower.toNumber()}`;
            this.headVip.updateShow(info.head, info.head_frame, info.sex, info.vip);
        }

        private onClickBtn(): void {
            this._proxy.c2s_xiandi_zhengba_oper(4, this._proxy.king_index, this.data.base_info.role_id);
            base.facade.hideView(ModName.More, MoreViewType.XiandiList);
        }
    }
}
