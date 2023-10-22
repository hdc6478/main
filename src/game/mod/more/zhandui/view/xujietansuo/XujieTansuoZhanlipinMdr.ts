namespace game.mod.more {

    import xujietansuo_challenge_records = msg.xujietansuo_challenge_records;

    export class XujieTansuoZhanlipinMdr extends MdrBase {
        private _view: XujieTansuoZhanlipinView = this.mark("_view", XujieTansuoZhanlipinView);
        private _proxy: XujieTansuoProxy;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);
            this._view.list.itemRenderer = XujieTansuoZhanlipinItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(MoreEvent.ON_UPDATE_XUJIETANSUO_RECORDS_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let list: xujietansuo_challenge_records[] = this._proxy.rewards_records;
            this._listData.replaceAll(list);

            this._view.btn_do.setHint(list && list.length > 0);
        }

        private onClick(): void {
            if (this._proxy.canGetZhanlipin(true)) {
                //todo 一键获取战利品
                this._proxy.c2s_zhandui_xujietansuo_role_click(XujieTansuoOperType.Oper1);
            }
        }
    }
}