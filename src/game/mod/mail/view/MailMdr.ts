namespace game.mod.mail {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import mail_data = msg.mail_data;

    export class MailMdr extends MdrBase {
        private _view: MailView = this.mark("_view", MailView);
        private _proxy: MailProxy;

        private _listData: ArrayCollection = new ArrayCollection();
        private _equips: number = 0;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Mail);

            this._view.list.itemRenderer = MailItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClickGet, this);
            addEventListener(this._view.btn_del, TouchEvent.TOUCH_TAP, this.onClickDel, this);
            //预留优化接口
            //addEventListener(this._view.scroller,eui.UIEvent.CHANGE_END,this.onScrollEnd,this);
            this.onNt(MailEvent.ON_MAIL_UPDATE, this.onUpdateView, this);

        }

        private onScrollEnd(evt: egret.TouchEvent) {
            // 如果(滚动的距离 + 滚动区域的高度) >= 可滚动内容的高度，那么此刻内容已经滚动到了底部
            if ((this._view.scroller.viewport.scrollV + this._view.scroller.height) >= this._view.scroller.viewport.contentHeight) {
                // 滚动到底部的操作
            }
        }

        protected onShow(): void {
            super.onShow();
            this._equips = 0;
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let list = this._proxy.getList();
            if (list.length > 0) {
                this.checkEquipCnt(list);
                this._view.btn_get.visible = true;
                this._view.btn_del.visible = true;
            } else {
                this._view.btn_get.visible = false;
                this._view.btn_del.visible = false;
            }
            this._listData.source = list;
        }

        private checkEquipCnt(list: mail_data[]): void {
            for (let info of list) {
                if (!info.attachments) {
                    continue;
                }
                for (let data of info.attachments) {
                    let prop = PropData.create(data.idx, data.cnt);
                    if (prop.type == ConfigHead.Equip && prop.propType == EquipPropType.RoleEquip) {
                        this._equips++;
                    }
                }
            }
        }

        private onClickGet(): void {
            if (this._equips > 0 && BagUtil.checkBagFull()) {
                return;
            }
            this._proxy.mail_onekey_take_c2s();
        }

        private onClickDel(): void {
            this._proxy.mail_onekey_delete_c2s();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}