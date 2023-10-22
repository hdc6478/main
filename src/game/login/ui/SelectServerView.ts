/** @internal */


namespace game.login {
    import UIComponent = uilib.UIComponent;
    import List = uilib.List;
    import Pool = base.Pool;
    import UILayoutPolicy = uilib.UILayoutPolicy;
    import ScrollPolicy = uilib.ScrollPolicy;
    import Button = uilib.Button;
    import TextFieldBase = uilib.TextFieldBase;

    export class SelectServerView extends UIComponent {
        public listServer: List;
        public listServerType: List;
        public btnClose: Button;

        constructor() {
            super();
        }

        protected _setup(): void {
            this.width = 590;
            this.height = 923;

            let img: BitmapBase;
            img = Pool.alloc(BitmapBase);
            img.source = GetLoginUrl("bg_select2");
            img.x = -10;
            img.y = 0;
            this.addChild(img);

            img = Pool.alloc(BitmapBase);
            img.source = GetLoginUrl("di");
            img.x = 25;
            img.y = 83;
            this.addChild(img);

            img = Pool.alloc(BitmapBase);
            img.source = GetLoginUrl("xuanzequfu2");
            img.x = 244;
            img.y = 42;
            this.addChild(img);

            let list: List = this.listServer = Pool.alloc(List);
            list.x = 243;
            list.y = 95;
            list.width = 428;
            // list.height = 705;
            list.gap = 4;
            list.layoutPolicy = UILayoutPolicy.VERTICAL;
            list.setScrollRect(0, 0, 428, 795);
            list.scrollPolicy = ScrollPolicy.POS_RIGHT | ScrollPolicy.POLICY_OFF;
            this.addChild(list);

            list = this.listServerType = Pool.alloc(List);
            list.x = 35;
            list.y = 94;
            list.width = 192;
            // list.height = 705;
            list.gap = 2;
            list.layoutPolicy = UILayoutPolicy.VERTICAL;
            list.setScrollRect(0, 0, 192, 795);
            list.scrollPolicy = ScrollPolicy.POS_RIGHT | ScrollPolicy.POLICY_OFF;
            this.addChild(list);

            img = Pool.alloc(BitmapBase);
            img.source = GetLoginUrl("serverfenggexian");
            img.x = 225;
            img.y = 95;
            img.height = 797;
            this.addChild(img);

            let btn = this.btnClose = Pool.alloc(Button);
            btn.source = GetLoginUrl("guanbi2");
            btn.x = 561;
            btn.y = 27;
            this.addChild(btn);

            let lab: TextFieldBase = Pool.alloc(TextFieldBase);
            lab.touchEnabled = false;
            lab.text = LoginLan.CloseTips;
            lab.x = 210;
            lab.y = 970;
            lab.size = 24;
            lab.strokeColor = 0x0;
            lab.stroke = 1;
            lab.textColor = 0xb6b6b6;
            this.addChild(lab);
        }
    }
}
