namespace game.mod.mail {


    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;

    export class MailDescMdr extends MdrBase {
        private _view: MailDescView = this.mark('_view', MailDescView);
        private _listData: ArrayCollection = new ArrayCollection();

        private _proxy: MailProxy;
        private _hasEquip: boolean;//是否有装备

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Mail);

            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClickGet, this);

            this.onNt(MailEvent.ON_MAIL_UPDATE, this.onUpdateView, this);

        }

        protected onShow() {
            this._proxy.mail_read_c2s(this._showArgs.mail_id, this._showArgs.mail_type);
            super.onShow();

            this.onUpdateView();
        }

        private onUpdateView(): void {

            this._showArgs = this._proxy.getMail(this._showArgs.mail_id);

            this._view.lb_desc.textFlow = TextUtil.parseHtml(this._showArgs.content,true);
            this._view.secondPop.updateTitleStr(getLanById(LanDef.tishi_25));

            this._hasEquip = false;
            if (this._showArgs.attachments) {
                let list: PropData[] = [];
                for (let data of this._showArgs.attachments) {
                    let prop = PropData.create(data.idx, data.cnt);
                    if (prop.type == ConfigHead.Equip && prop.propType == EquipPropType.RoleEquip) {
                        this._hasEquip = true;
                    }
                    list.push(prop);
                }
                this._listData.source = list;
            }

            this.updateGetBtnStatus();

        }

        private updateGetBtnStatus(): void {
            if (this._showArgs.is_taken == 1) {
                //邮件已经领取
                this._view.btn_get.visible = false;
                this._view.img_geted.visible = true;
            } else {
                //邮件未领取
                if (this._showArgs.attachments && this._showArgs.attachments.length > 0) {
                    this._view.btn_get.visible = true;
                    this._view.img_geted.visible = false;
                } else {
                    this._view.btn_get.visible = false;
                    this._view.img_geted.visible = false;
                }
            }
        }

        private onClickGet(): void {
            if (this._hasEquip && BagUtil.checkBagFull()) {
                return;
            }
            this._proxy.mail_take_c2s(this._showArgs.mail_id, this._showArgs.mail_type);
        }
    }

}