/** @internal */


namespace game.login {
    import Mdr = base.Mdr;
    import TouchEvent = egret.TouchEvent;
    import UpdateItem = base.UpdateItem;
    import Time = base.Time;
    import TimeMgr = base.TimeMgr;
    import FocusEvent = egret.FocusEvent;
    import TextFieldBase = uilib.TextFieldBase;

    export class AdultIdMdr extends Mdr implements UpdateItem {
        private _view: AdultIdView = this.mark("_view", AdultIdView);
        private lastShowTime: number;
        private curCount: number;

        private ErrorCodeDict = {
            [11]: "认证成功",
            [12]: "已添加过认证",
            [13]: "serverid参数有误",
            [14]: "账号有误",
            [15]: "缺少身份证信息",
            [16]: "身份证长度错误",
            [17]: "名字有误",
            [18]: "名字包含非中文字符",
            [19]: "身份验证失败",
        };

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            this._view.labName.prompt = "请输入真实姓名";
            this._view.labIdentity.prompt = "请输入身份证号码";
            this._view.labIdentity.restrict = "0-9 X";
            this._view.labIdentity.maxChars = 30;

            this._view.btnConfirm.x = 341;
            this._view.btnCancel.visible = true;
        }

        protected addListeners(): void {
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btnConfirm, TouchEvent.TOUCH_TAP, this.onConfirm);
            addEventListener(this._view.btnCancel, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btnClose, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.labName, FocusEvent.FOCUS_IN, this.onLabelInt);
            addEventListener(this._view.labIdentity, FocusEvent.FOCUS_IN, this.onLabelInt);
            addEventListener(this._view.labName, FocusEvent.FOCUS_OUT, this.onLabelOut);
            addEventListener(this._view.labIdentity, FocusEvent.FOCUS_OUT, this.onLabelOut);
        }

        protected onShow(): void {
            let self = this;
            let v = self._view;
            v.x = (v.parent.width - v.width) / 2;
            v.y = (v.parent.height - v.height) / 2;
            this.lastShowTime = this.curCount = 0;

            this.refreshAccount();

            TimeMgr.addUpdateItem(this, 500);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onLabelInt(evt: FocusEvent): void {
            let tar: TextFieldBase = evt.currentTarget;
            if (tar) {
                if (tar.text == tar.prompt) {
                    tar.text = "";
                }
                tar.prompt = "";
            }
        }

        private onLabelOut(evt: FocusEvent): void {
            let tar: TextFieldBase = evt.currentTarget;
            if (tar.text.trim() != "") {
                return;
            }
            if (tar == this._view.labIdentity) {
                tar.prompt = "请输入身份证号码";
            } else if (tar == this._view.labName) {
                tar.prompt = "请输入真实姓名";
            }
        }

        private onConfirm() {
            let account: string = this._view.labAccount.text;
            let authId: string = this._view.labIdentity.text;
            let name: string = this._view.labName.text;

            if (authId.trim() == "" || authId == this._view.labIdentity.prompt) {
                this.printErrorString("请填写身份证号码", 4);
                return;
            }

            if (name.trim() == "" || name == this._view.labName.prompt) {
                this.printErrorString("请填写真实名字", 4);
                return;
            }

            let self = this;
            let cb = (obj: { code: number }) => {
                self.onRespAuth(obj);
            };
            //调用sdk
            gzyyou.sdk.uploadAuth(account.trim(), authId.trim(), name.trim(), cb);
        }

        private refreshAccount(): void {
            let account = gso.account;
            this._view.labAccount.text = account;
        }

        update(time: Time): void {
            if (!this._view.labTip || !this._view.labTip.visible) {
                return;
            }
            this.curCount++;
            if (this.curCount >= this.lastShowTime) {
                this._view.labTip.visible = false;
            }
        }

        private onRespAuth(obj: { code: number }): void {
            if (!obj) {
                return;
            }

            let code: number = obj.code;
            let codeString: string = this.ErrorCodeDict[code];
            if (codeString) {
                this.printErrorString(codeString, 6);
            }

            /* if (code == 11) {
                 gso.is_adult = "1";
                 this._view.labTip.textColor = 0x00ff00;
                 this.sendNt(LoginEvent.ADULT_CHANGE);
                 delayCall(Handler.alloc(this, this.hide), 2000);
             }*/
        }

        private printErrorString(content: string, time: number = 6): void {
            this._view.labTip.textColor = 0xff0000;
            this._view.labTip.text = content;
            this._view.labTip.visible = true;
            this.lastShowTime = time;
            this.curCount = 0;
        }
    }
}