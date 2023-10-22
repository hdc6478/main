namespace game.mod.debug {
    import Component = eui.Component;
    import EditableText = eui.EditableText;
    import Group = eui.Group;
    import Button = eui.Button;
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import VerticalAlign = egret.VerticalAlign;

    export class GmCmdMdr extends MdrBase {
        private _view: GmCmdView = this.mark("_view", GmCmdView);

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btnSend, TouchEvent.TOUCH_TAP, this.onTapBtn);
        }
        
        protected onShow(): void {
            let params: string[] = this._showArgs.params;
            for (let i: number = 0, len: number = params.length; i < len; i++) {
                let txt: EditableText = this._view.newLabel();
                txt.prompt = params[i];
                this._view.grpLab.addChild(txt);
            }
        }

        protected onHide(): void {
            this._view.grpLab.removeChildren();
        }

        private onTapBtn(e: TouchEvent) {
            let args: string[] = [this._showArgs.cmd];
            for (let i: number = 0, n: number = this._view.grpLab.numChildren; i < n; i++) {
                let lab: EditableText = <EditableText>this._view.grpLab.getChildAt(i);
                if (lab.text == "" || lab.text == undefined) {
                    return;
                }
                args.push(lab.text);
            }
            let miscProxy: IMiscProxy = facade.retMod(ModName.Misc).retProxy(ProxyType.Misc);
            miscProxy.sendGM(args.join(" "));
            this.hide();
        }
    }

    class GmCmdView extends Component {
        public grpLab: Group;
        public btnSend: Button;

        constructor() {
            super();
            this.skinName = "skins.debug.GmCmdSkin";

            this.horizontalCenter = 0;
            this.verticalCenter = 0;
        }

        public newLabel(): EditableText {
            let txt: EditableText = new EditableText();
            txt.width = 168;
            txt.height = 38;
            txt.border = true;
            txt.background = true;
            txt.backgroundColor = 0x775858;
            txt.promptColor = 0xe2d5d5;
            txt.textColor = 0xffffff;
            txt.verticalAlign = VerticalAlign.MIDDLE;
            return txt;
        }
    }
}
