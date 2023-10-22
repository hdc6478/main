/** @internal */


namespace game.login {
    import UIComponent = uilib.UIComponent;
    import Button = uilib.Button;
    import TextFieldBase = uilib.TextFieldBase;
    import Pool = base.Pool;
    import Handler = base.Handler;

    export class StartView extends UIComponent {
        public btnStart: Button;
        public btnNotice: Button;
        public btnClear: Button;
        public btnAgeTip: Button;
        public labServer: TextFieldBase;
        public btnSelectServer: Button;
        public btnSelectServer2: Button;
        public imgTag: BitmapBase;
        public imgDbg: BitmapBase;
        //public imgLogo: BitmapBase;

        public imgLastTag: BitmapBase;
        public labLastServer: TextFieldBase;

        public imgAgreeDi: BitmapBase;
        public imgAgreeGou: BitmapBase;
        public labAgree: TextFieldBase;

        // public labIdentity: TextFieldBase; // 实名认证链接
        public labState: TextFieldBase; // 实名认证状态
        public imgState: BitmapBase; // 实名认证状态
        public btnIdentity: Button; // 实名认证链接

        constructor() {
            super();
        }

        protected _setup(): void {
            this.width = 720;
            this.height = 1280;

            let btn: Button = this.btnStart = Pool.alloc(Button);
            btn.x = 219;
            btn.y = 979;
            //btn.source = GetLoginUrl("enter");
            this.loadBtn(btn,GetLoginUrl("enter"));
            this.addChild(btn);

            // btn = this.btnClear = Pool.alloc(Button);
            // btn.x = 626;
            // btn.y = 20;
            // btn.source = GetLoginUrl("btn_clear");
            // this.addChild(btn);

            btn = this.btnNotice = Pool.alloc(Button);
            btn.x = 626;
            btn.y = 20;
            //btn.source = GetLoginUrl("btn_notice");
            this.loadBtn(btn,GetLoginUrl("btn_notice"));
            this.addChild(btn);

            let img: BitmapBase = Pool.alloc(BitmapBase);
            //img.source = GetLoginUrl("bg_11");
            this.loadImg(img,GetLoginUrl("bg_11"));
            img.x = 0;
            img.y = 854;
            this.addChild(img);

            // img = this.imgLogo = Pool.alloc(BitmapBase);
            // img.source = "assets/game_bg/title_logo.png";
            // img.x = 25;
            // img.y = 20;
            // this.addChild(img);


            img = this.imgTag = Pool.alloc(BitmapBase);
            img.x = 160;
            img.y = 915;
            img.width = img.height = 25;
            this.addChild(img);

            img = this.imgLastTag = Pool.alloc(BitmapBase);
            img.touchEnabled = true;
            img.x = 342;
            img.y = 865;
            img.width = img.height = 25;
            this.addChild(img);

            let lab: TextFieldBase = this.labServer = Pool.alloc(TextFieldBase);
            lab.touchEnabled = false;
            lab.x = 200;
            lab.y = 916;
            lab.width = 160;
            lab.height = 29;
            lab.size = 29;
            lab.stroke = 1;

            lab.verticalAlign = "middle";
            lab.textAlign = "left";
            lab.textColor = 0xffffff;
            this.addChild(lab);
            //实名认证
            img = this.imgState = Pool.alloc(BitmapBase);//实名
            img.x = 176;
            img.y = 78;
            this.addChild(img);
            lab = this.labState = Pool.alloc(TextFieldBase);
            lab.touchEnabled = false;
            lab.x = 320;
            lab.y = 80;
            lab.width = 320;
            lab.anchorOffsetX = 160;
            lab.height = 34;
            lab.size = 28;
            lab.bold = true;
            lab.stroke = 1;
            lab.verticalAlign = "middle";
            lab.textAlign = "center";
            lab.textColor = 0xffffff;
            this.addChild(lab);
            //实名按钮
            // btn = this.btnIdentity = Pool.alloc(Button);
            // btn.x = 626;
            // btn.y = 120;
            // btn.source = GetLoginUrl("btn_identity");
            // this.addChild(btn);
            // lab = this.labIdentity = Pool.alloc(TextFieldBase);
            // lab.touchEnabled = true;
            // lab.x = 320;
            // lab.y = 830;
            // lab.width = 320;
            // lab.anchorOffsetX = 160;
            // lab.height = 30;
            // lab.size = 28;
            // lab.bold = true;
            // lab.stroke = 1;
            // lab.verticalAlign = "middle";
            // lab.textAlign = "center";
            // lab.textColor = 0xffffff;
            // lab.text = "实名认证>>";
            // this.addChild(lab);
            //--------------------------------------------------------------
            lab = this.labLastServer = Pool.alloc(TextFieldBase);
            lab.touchEnabled = true;
            lab.x = 372;
            lab.y = 868;
            lab.width = 160;
            lab.height = 26;
            lab.size = 24;
            lab.stroke = 1;
            lab.strokeColor = 0x00535c;

            lab.verticalAlign = "middle";
            lab.textAlign = "left";
            lab.textColor = 0x00ff00;
            this.addChild(lab);

            lab = Pool.alloc(TextFieldBase);
            lab.touchEnabled = false;
            lab.x = 262;
            lab.y = 867;
            lab.width = 73;
            lab.height = 26;
            lab.size = 24;
            // lab.stroke = 1;
            // lab.strokeColor = 0x00535c;
            lab.verticalAlign = "middle";
            lab.textAlign = "left";
            lab.textColor = 0x007ac7;
            lab.text = LoginLan.LastServerTips;
            this.addChild(lab);


            btn = this.btnSelectServer = Pool.alloc(Button);
            btn.x = 350;
            btn.y = 893;
            //btn.source = GetLoginUrl("dianjigenghuanfuwuqi");
            this.loadBtn(btn,GetLoginUrl("dianjigenghuanfuwuqi"));
            this.addChild(btn);

            btn = this.btnSelectServer2 = Pool.alloc(Button);
            btn.x = 525;
            btn.y = 905;
            //btn.source = GetLoginUrl("btn_select");
            this.loadBtn(btn,GetLoginUrl("btn_select"));
            this.addChild(btn);

            lab = Pool.alloc(TextFieldBase);
            lab.touchEnabled = false;
            lab.x = 0;
            lab.y = 1130;
            lab.size = 18;
            lab.stroke = 1;
            lab.strokeColor = 0x000000;
            lab.textAlign = "center";
            lab.textColor = 0xffffff;
            lab.lineSpacing = 6;
            lab.width = this.width;
            let text = "";
            text += LoginLan.Counsel;
            lab.text = text;
            this.addChild(lab);

            // lab = Pool.alloc(TextFieldBase);
            // lab.touchEnabled = false;
            // lab.x = 0;
            // lab.y = 1205;
            // lab.size = 18;
            // lab.stroke = 1;
            // lab.textAlign = "center";
            // lab.textColor = 0xffffff;
            // lab.lineSpacing = 6;
            // lab.width = this.width;
            // let textStr = LoginLan.Copyright;
            // lab.text = textStr;
            // this.addChild(lab);

            img = this.imgDbg = Pool.alloc(BitmapBase); // 外网调试用
            img.touchEnabled = true;
            img.x = 0;
            img.y = 1180;
            img.width = 120;
            img.height = 100;
            img.alpha = 0;
            this.addChild(img);

            img = this.imgAgreeDi = Pool.alloc(BitmapBase);
            img.touchEnabled = true;
            img.x = 165;
            img.y = 1075;
            //img.source = GetLoginUrl("btn_agree_di");
            this.loadImg(img,GetLoginUrl("btn_agree_di"));
            this.addChild(img);

            img = this.imgAgreeGou = Pool.alloc(BitmapBase);
            img.touchEnabled = true;
            img.x = 165;
            img.y = 1075;
            //img.source = GetLoginUrl("btn_agree_gou");
            this.loadImg(img,GetLoginUrl("btn_agree_gou"));
            this.addChild(img);

            lab = this.labAgree = Pool.alloc(TextFieldBase);
            lab.touchEnabled = true;
            lab.x = 220;
            lab.y = 1091;
            lab.height = 24;
            // lab.width = 265;
            lab.size = 20;
            lab.stroke = 1;
            lab.strokeColor = 0x06717d;

            lab.verticalAlign = "middle";
            lab.textAlign = "left";
            lab.textColor = 0xffffff;

            let title = "";
            // if(GameUtil.isShowYhxy) {
            //     title = TextUtil.addLinkHtmlTxt("用户协议", WhiteColor.GREEN, "yhxy") + "和";
            // }
            // if(GameUtil.isShowYszc) {
            //     title += TextUtil.addLinkHtmlTxt("隐私政策", WhiteColor.GREEN, "yszc");
            // }
            lab.textFlow =
            TextUtil.parseHtml(LoginLan.AgreeTips + title);
            this.addChild(lab);

            btn = this.btnAgeTip = Pool.alloc(Button);
            btn.x = 650;
            btn.y = 1080;
            btn.width = 810;
            btn.height = 1038;
            btn.scaleX = btn.scaleY = 0.06;
            btn.source = "assets/game_bg/age_tip.png";
            this.addChild(btn);
        }

        private loadImg(img:BitmapBase,url:string):void{
            LoadMgr.ins.load(url, Handler.alloc(this,function (data: any, url: string) {
                img.source = data;
            }), LoadPri.UI);
        }

        private loadBtn(btn:Button,url:string):void{
            LoadMgr.ins.load(url, Handler.alloc(this,function (data: any, url: string) {
                btn.getDisplay().source = data;
            }), LoadPri.UI);
        }

    }
}
