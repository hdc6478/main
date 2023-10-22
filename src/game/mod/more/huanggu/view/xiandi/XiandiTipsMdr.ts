namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class XiandiTipsMdr extends MdrBase {
        private _view: XiandiTipsView = this.mark("_view", XiandiTipsView);

        private _proxy: XiandiProxy

        constructor() {
            super(Layer.upperWin);
            // this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            // this._view.horizontalCenter = 0;
            // this._view.verticalCenter = 0;

            this._proxy = this.retProxy(ProxyType.Xiandi);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.closeTips.male, TouchEvent.TOUCH_TAP, this.onNoRemind);
        }

        protected onShow(): void {
            super.onShow();
            this._view.closeTips.updateTxt(getLanById(LanDef.xiandi_tips7));
            this._view.closeTips.updateShow(3, base.Handler.alloc(this, this.hide));
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let type: number = this._showArgs;
            let info: msg.teammate;
            let content: string = "";
            let landef = "";
            let name: string = "";
            if (type == XiandiType.Xiandi) {
                info = this._proxy.tiandi_info;
                landef = getLanById(LanDef.xiandi_tips8);
            } else {
                info = this._proxy.xianhou_info;
                landef = getLanById(LanDef.xiandi_tips9);
            }
            name = info && TextUtil.addColor(info.name, 0xfff053) || getLanById(LanDef.tishi_2);
            content = StringUtil.substitute(landef, [name]);

            if (info) {
                this._view.head.updateHeadShow(info.head, info.head_frame, info.sex);
            }
            this._view.img_title.source = `xiandi_title${type}`;

            this._view.lab_desc.textFlow = TextUtil.parseHtml(content);
        }

        private onNoRemind(): void {
            this._proxy.c2s_tiandi_zhengba_ui_info();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}