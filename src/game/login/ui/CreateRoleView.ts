/** @internal */ namespace game.login {
    import UIComponent = uilib.UIComponent;
    import Button = uilib.Button;
    import TextFieldBase = uilib.TextFieldBase;
    import Pool = base.Pool;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import HorizontalAlign = egret.HorizontalAlign;
    import VerticalAlign = egret.VerticalAlign;
    import TextFieldType = egret.TextFieldType;

    export class CreateRoleView extends UIComponent {
        public group_eft: DisplayObjectContainer;
        // public imgMale: BitmapBase;
        // public imgFemale: BitmapBase;
        public btnCreate: Button;
        public txtName: TextFieldBase;
        public male: DisplayObjectContainer;
        public female: DisplayObjectContainer;
        public btnRandom: Button;
        public lab_timeDown: TextFieldBase;
        public btnRen: Button;
        public btnMo: Button;
        public btnYoung: Button;
        public btnYouth: Button;
        public imgTitle: BitmapBase;

        public male_bg: BitmapBase;
        public male_img: BitmapBase;
        public female_bg: BitmapBase;
        public female_img: BitmapBase;

        constructor() {
            super();
        }

        protected _setup(): void {
            this.width = 720;
            this.height = 1280;

            let img: BitmapBase = Pool.alloc(BitmapBase);
            img.source = GetCreateRoleUrl("create_role_bg.jpg");
            this.addChild(img);

            let group: DisplayObjectContainer = this.group_eft = new DisplayObjectContainer();
            group.touchEnabled = group.touchChildren = false;
            group.height = 842;
            group.width = 1397;
            group.y = 0;

            // let animate = Pool.alloc(UIAnimate);
            // animate.x = 360;
            // animate.y = 825;
            // animate.id = 1;
            // animate.times = -1;
            // animate.scaleX = animate.scaleY = 1.2;
            // animate.speed = 1;
            // animate.load( "assets/anim/body/create/create_male", 12);
            // group.addChild(animate);
            // animate.play();

            // animate = Pool.alloc(UIAnimate);
            // animate.x = 720 + 360 + 40;
            // animate.y = 825;
            // animate.id = 1;
            // animate.times = -1;
            // animate.scaleX = animate.scaleY = 1.2;
            // animate.speed = 1;
            // animate.load( "assets/anim/body/create/create_female", 12);
            // group.addChild(animate);
            // animate.play();

            // img = this.imgMale = Pool.alloc(BitmapBase);
            // img.y = 0;
            // img.source = GetCreateRoleUrl("nan.png");
            // group.addChild(img);
            // img = this.imgFemale = Pool.alloc(BitmapBase);
            // img.x = 720;
            // img.source = GetCreateRoleUrl("nv.png");
            // group.addChild(img);
            this.addChild(group);

            let btn: Button = this.btnCreate = Pool.alloc(Button);
            btn.x = 360 - 183;
            btn.y = 1080;
            btn.width = 366;
            btn.height = 120;
            // btn.label = "开始游戏";
            btn.source = GetCreateRoleUrl("create_role_btn.png");
            this.addChild(btn);

            img = Pool.alloc(BitmapBase);
            img.x = 125;
            img.y = 1005;
            img.source = GetCreateRoleUrl("create_role_input.png");
            this.addChild(img);

            //标题
            img = this.imgTitle = Pool.alloc(BitmapBase);
            img.x = 30;
            img.y = 30;
            img.source = GetCreateRoleUrl("create_title_nan.png");
            this.addChild(img);

            let txt: TextFieldBase = this.txtName = Pool.alloc(TextFieldBase);
            txt.type = TextFieldType.INPUT;
            txt.x = 230;
            txt.y = 1005;
            txt.width = 260;
            txt.height = 60;
            txt.size = 28;
            txt.maxChars = 7;
            txt.textColor = 0xffffff;
            txt.textAlign = HorizontalAlign.CENTER;
            txt.verticalAlign = VerticalAlign.MIDDLE;
            txt.bold = true;
            // txt.prompt = "请输入角色名";
            // txt.promptColor = 0xa8b6ba;
            this.addChild(txt);

            btn = this.btnRandom = Pool.alloc(Button);
            btn.x = 518;
            btn.y = 1005;
            btn.source = GetCreateRoleUrl("chouqian.png");
            this.addChild(btn);

            txt = this.lab_timeDown = Pool.alloc(TextFieldBase);
            txt.touchEnabled = false;
            txt.x = 149;
            txt.y = 1200;
            txt.width = 422;
            txt.size = 22;
            txt.textColor = 0x00ff27;
            txt.stroke = 1;
            txt.textAlign = HorizontalAlign.CENTER;
            this.addChild(txt);

            btn = this.btnRen = Pool.alloc(Button);
            btn.x = 203;
            btn.y = 875;
            btn.source = GetCreateRoleUrl("btn_ren_hui.png");
            this.addChild(btn);

            btn = this.btnMo = Pool.alloc(Button);
            btn.x = 419;
            btn.y = 875;
            btn.source = GetCreateRoleUrl("btn_mo_hui.png");
            this.addChild(btn);

            // btn = this.btnYoung = Pool.alloc(Button);
            // btn.x = 152;
            // btn.y = 931;
            // btn.source = GetCreateRoleUrl("btn_young_hui.png");
            // this.addChild(btn);

            // btn = this.btnYouth = Pool.alloc(Button);
            // btn.x = 288;
            // btn.y = 931;
            // btn.source = GetCreateRoleUrl("btn_youth_hui.png");
            // this.addChild(btn);

            // group = this.male = new DisplayObjectContainer();
            // group.touchEnabled = true;
            // group.x = 486;
            // group.y = 730;
            // img = this.male_bg = Pool.alloc(BitmapBase);
            // img.source = GetCreateRoleUrl("loginxuanweizhong");
            // group.addChild(img);
            // img = this.male_img = Pool.alloc(BitmapBase);
            // img.x = 26;
            // img.y = 22;
            // img.source = "sex_1_1";
            // group.addChild(img);
            // this.addChild(group);
            //
            // group = this.female = new DisplayObjectContainer();
            // group.touchEnabled = true;
            // group.x = 534;
            // group.y = 683;
            // img = this.female_bg = Pool.alloc(BitmapBase);
            // img.source = GetCreateRoleUrl("loginxuanweizhong");
            // group.addChild(img);
            // img = this.female_img = Pool.alloc(BitmapBase);
            // img.x = 20;
            // img.y = 24;
            // img.source = GetCreateRoleUrl("sex_2_1");
            // group.addChild(img);
            // this.addChild(group);
        }
    }
}
