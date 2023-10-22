/** @internal */


namespace game.login {
    import Mdr = base.Mdr;
    import TextFieldBase = uilib.TextFieldBase;
    import Pool = base.Pool;
    import TextFieldType = egret.TextFieldType;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Button = uilib.Button;
    import HorizontalAlign = egret.HorizontalAlign;
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;

    export class LoginMdr extends Mdr {
        /** @internal */ private _view: NoticePanel = this.mark("_view", NoticePanel);
        private accountTxt: TextFieldBase;
        private btn: Button;

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {

        }

        protected addListeners(): void {
        }


        protected onShow(): void {
            let self = this;
            let v = self._view;
            v.x = (v.parent.width - v.width) / 2;
            v.y = (v.parent.height - v.height) / 2;
            self._view.btnClose.visible = false;
            self._view.lab_tips.visible = false;
            let dis = new DisplayObjectContainer();
            self._view.addChild(dis);
            dis.width = 428;
            dis.height = 400;
            dis.anchorOffsetX = 214;
            dis.anchorOffsetY = 200;
            dis.x = 360;
            dis.y = v.height / 2;
            let img = Pool.alloc(BitmapBase);
            img.source = GetLoginUrl("di1");
            dis.addChild(img);
            img = Pool.alloc(BitmapBase);
            img.source = GetLoginUrl("di1");
            img.y = 150;
            dis.addChild(img);
            let lab = Pool.alloc(TextFieldBase);
            lab.text = "临时登录";
            lab.height = 50;
            lab.width = 200;
            // lab.verticalAlign = VerticalAlign.MIDDLE;
            lab.textAlign = HorizontalAlign.CENTER;
            lab.anchorOffsetX = 100;
            lab.anchorOffsetY = 25;
            lab.x = 214;
            lab.y = 50;
            lab.textColor = 0x000000;
            dis.addChild(lab);
            self.accountTxt = Pool.alloc(TextFieldBase);
            self.accountTxt.width = 200;
            self.accountTxt.height = 50;
            self.accountTxt.anchorOffsetX = 100;
            self.accountTxt.x = 250;
            self.accountTxt.y = 175;
            self.accountTxt.type = TextFieldType.INPUT;
            self.accountTxt.prompt = "请输入账号";
            // self.accountTxt.verticalAlign = VerticalAlign.MIDDLE;
            dis.addChild(self.accountTxt);
            lab = Pool.alloc(TextFieldBase);
            lab.y = 175;
            lab.x = 85;
            lab.text = "账号:"
            lab.textColor = 0x000000;
            dis.addChild(lab);
            let btn = self.btn = Pool.alloc(Button);
            btn.source = GetLoginUrl("xuanzhekuang");
            btn.width = 187;
            btn.height = 68;
            btn.anchorOffsetX = 93;
            btn.anchorOffsetY = 34;
            btn.x = 214;
            btn.y = 400;
            btn.label = "登录";
            dis.addChild(btn);
            let addEventListener = self.onEgret.bind(self);
            addEventListener(self.accountTxt, egret.FocusEvent.FOCUS_IN, self.onClickIn);
            addEventListener(self.accountTxt, egret.FocusEvent.FOCUS_OUT, self.onClickOut);
            addEventListener(self.btn, TouchEvent.TOUCH_TAP, self.onClickLogin);
        }


        protected onHide(): void {
            super.onHide();
        }

        private onClickIn() {
            if (this.accountTxt.text == "请输入账号") {
                this.accountTxt.text = "";
            }
        }

        private onClickOut(e: Event) {
            if (this.accountTxt.text == "") {
                this.accountTxt.text = "请输入账号";
            }
        }

        private onClickLogin() {
            if (this.accountTxt.text == "请输入账号") {
                this.showView(LoginViewType.Alert, this.accountTxt.text)
                return;
            }
            gso.account = this.accountTxt.text;
            let data: any = {
                jzsj_channel: gso.jzsj_channel,
                gameid: gso.gameid,
                account: gso.account,
                token: gso.token
            };
            if (gso.timestamp) {
                data.timestamp = gso.timestamp;
            }
            let apiUrl = gso.apiHost + gso.apiLoginMethod + "index/";
            if (gso.jzsj_channel === "testshow") {
                apiUrl = gso.apiHost;
                data = {
                    action: "index",
                    jzsj_channel: gso.jzsj_channel,
                    gameid: gso.gameid,
                    account: gso.account,
                    token: gso.token
                };
            }
            ggo.webReqGet(apiUrl, data, this.apiLoginSucc, this.apiLoginFail);

        }

        private apiLoginSucc(resp: any) {
            let k;
            for (k in resp) {
                if (k !== "params" && resp.hasOwnProperty(k)) {
                    gso[k] = resp[k];
                }
            }
            for (k in resp.params) {
                if (resp.params.hasOwnProperty(k)) {
                    gso[k] = resp.params[k];
                }
            }
            gso.version = gso.test_ver || ggo.checkVersion(gso.version);
            facade.hideView(ModName.Login, LoginViewType.Login);
            gso.login_acc = undefined;
            console.info("LoginMdr 触发事件 LauncherEvent.SHOW_START");
            facade.sendNt(LauncherEvent.SHOW_START);
        }

        private apiLoginFail() {
            this.showView(LoginViewType.Alert, "登录失败，重新登录")
        }
    }
}
