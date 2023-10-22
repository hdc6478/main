namespace game.login {
    import HtmlTextParser = egret.HtmlTextParser;
    import StringUtil = game.StringUtil;
    import Mdr = base.Mdr;
    import TouchEvent = egret.TouchEvent;
    import TextFieldBase = uilib.TextFieldBase;
    import Pool = base.Pool;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import Group = eui.Group;
    import Handler = base.Handler;
    import facade = base.facade;

    export class PrivacyMdr extends Mdr implements UpdateItem {
        private _view: PrivacyView = this.mark("_view", PrivacyView);
        private _txt:string;
        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
        }

        protected addListeners(): void {
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btnClose, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btnCancel, TouchEvent.TOUCH_TAP, this.cancel);
            addEventListener(this._view.btnConfirm, TouchEvent.TOUCH_TAP, this.confirm);

        }
        protected onShow(): void {
            let txt = this._showArgs;

            let v = this._view;
            v.x = (v.parent.width - v.width) / 2;
            v.y = (v.parent.height - v.height) / 2;

            this._view.labelContainer.touchChildren = false;
            this._view.labelContainer.touchEnabled = false;
            TimeMgr.addUpdateItem(this, 100);

            let str = this.getLabStr();
            LoadMgr.ins.load("assets/data_server/" + str + ".txt",
                Handler.alloc(this, this.privacyTxt), LoadPri.Init, Handler.alloc(this, () => {
                    gAlert("加载失败");
                }));
        }

        private getLabStr(): string {
            let txt = this._showArgs;
            let str = "privacy";//用户协议是同一个文件，保留判断好扩展
            switch (gso.channel) {
                case CHANNEL_NAME.WANJIANAUDIT_SHOUQ:
                case CHANNEL_NAME.WANJIANTEST_SHOUQ:
                case CHANNEL_NAME.WANJIAN_SHOUQ:
                    //str = txt == GameUtil.yszc ? "yszc_wanjian" : "privacy_wanjian";
                    break;
            }
            if(gso.isQQHall){
                //str = txt == GameUtil.yszc ? "yszc_qqhall" : "privacy_qqhall";
            }
            return str;
        }

        private privacyTxt(str: string, url: string) {
            this._txt = str;
            this.setTxt();
        }

        private setTxt() {
            if (this._view.labelContainer.numChildren) {
                this.clearLabContainer();
            }

            let txtList = this._txt.replace(/\r/g, "").split("\n");

            for (let txt of txtList) {
                let lab: TextFieldBase = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.x = 13;
                lab.lineSpacing = 6;
                lab.width = 550;
                lab.bold = true;
                if (txt.charAt(0) === "$") {
                    lab.name = "1";
                    lab.textColor = 0x426e7b;
                    lab.textFlow = new HtmlTextParser().parse(StringUtil.replaceColorCode(txt.substring(1)));
                    lab.size = 20;
                } else if (txt.indexOf("<title>") > -1) {
                    lab.name = "2";
                    let gr: Group = Pool.alloc(Group);
                    gr.height = 48;
                    gr.width = 202;

                    // 标题图片
                    let img: BitmapBase = Pool.alloc(BitmapBase);
                    img.source = "common_titleBg24";
                    img.x = lab.x;
                    img.y = 5;
                    gr.addChild(img);

                    // 标题内容
                    txt = txt.replace("<title>", " ");
                    lab.textColor = 0xffffff;
                    lab.stroke = 2;
                    lab.strokeColor = 0x426e7b;
                    lab.textFlow = new HtmlTextParser().parse(StringUtil.replaceColorCode(txt.substring(1)));
                    lab.size = 22;
                    lab.y = 15;
                    lab.x = (202 - lab.textWidth) * 0.5 + img.x;
                    gr.addChild(lab);
                    this._view.labelContainer.addChild(gr);
                    continue;
                } else {
                    lab.textColor = 0x426e7b;
                    lab.textFlow = new HtmlTextParser().parse(StringUtil.replaceColorCode(txt));
                    lab.size = 20;
                    // lab.x = 59;
                }
                this._view.labelContainer.addChild(lab);
            }
            this.updateLabY();
        }

        private clearLabContainer(): void {
            while (this._view.labelContainer.numChildren) {
                let child = this._view.labelContainer.removeChildAt(0);
                if (child instanceof TextFieldBase) {
                    child.name = "";
                }
                Pool.release(child);
            }
        }

        protected onHide(): void {
            this.clearLabContainer();
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        update(time: base.Time): void {
            this.updateLabY();
            TimeMgr.removeUpdateItem(this);
        }


        private updateLabY(): void {
            let num = this._view.labelContainer.numChildren;
            let labY: number = 5;
            let labList = [] = this._view.labelContainer.$children.concat();
            for (let i = 0; i < num; ++i) {
                let lab = labList[i];///as TextFieldBase
                if (lab.name == "1") {
                    lab.y = labY + 6;
                    labY = lab.y + lab.height + 10;
                } else if (lab.name == "2") {

                } else {
                    lab.y = labY;
                    labY = lab.y + lab.height + 6;
                }
            }
        }

        private cancel() {
            let self = this;
            if(gso.isQQHall){
                self.onRefuse();
                return;
            }
            let data = {
                lab: "不同意隐私协议将退出游戏？", confirm: Handler.alloc(this, () => {
                    self.onRefuse();
                    if(gzyyou.sdk.exitMiniProgram) {
                        gzyyou.sdk.exitMiniProgram(null);
                    }
                }), cancel: Handler.alloc(this, () => {
                    self.confirm();
                }),ConfirmTxt:"退出" , CancelTxt:"同意"
            };
            facade.showView(ModName.Login, LoginViewType.Alert, data);
        }

        private onRefuse(): void {
            let self = this;
            gso.isPrivacy = false;
            facade.sendNt(LoginEvent.USER_ARGREEMENT_TIP_CONFIRM);
            self.hide();
        }

        private confirm() {
            gso.isPrivacy = true;
            facade.sendNt(LoginEvent.USER_ARGREEMENT_TIP_CONFIRM);
            this.hide();
            //不是新号不直接进入游戏
            if(gso.all_is_new != 1) return;

            let proxy: LoginProxy = this.retProxy(ProxyType.Login);
            ggo.loadVerbose(LOADING_VERBOSE_MSG.GET_SERVER_INFO);
            proxy.getServerInfo(gso.max_server.server_id);
        }
    }
}