namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;

    export class EventChatMdr extends MdrBase implements UpdateItem{
        private _view: EventChatView= this.mark("_view", EventChatView);

        private content: string = "";
        private contentLen: number = -1;
        private startContent: boolean = false;
        protected _showArgs: EventChatData;

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view, TouchEvent.TOUCH_TAP, this.jumpChat);
        }

        protected onShow(): void {
            super.onShow();
            this.isEasyHide = false;
            this.updateView();
        }

        protected onHide(): void {
            this.resetData();
            super.onHide();
        }

        private jumpChat(): void {
            if (this.startContent) {
                this.contentLen = this.content.length;
                this._view.lab_desc.textFlow = TextUtil.parseHtml(this.content);
            }
            this.isEasyHide = true;
        }

        private updateView(): void {
            let systemInfo = this._showArgs.systemInfo;
            this._view.head.updateHeadShow(systemInfo[0], systemInfo[1], systemInfo[2]);

            this.content = this._showArgs.desc;
            this.startContent = true;
            this.updateContent();
            TimeMgr.addUpdateItem(this, 25);//用于对话文本表现
        }

        private resetData(): void {
            this.content = "";
            this.contentLen = -1;
            this.startContent = false;
            this.isEasyHide = true;
            TimeMgr.removeUpdateItem(this);
        }

        update(time: base.Time) {
            this.updateContent();
        }

        private updateContent(): void {
            if (this.contentLen == this.content.length) {
                this.resetData();
            } else {
                this.contentLen++;
                let tmpContent = this.content.substring(0, this.contentLen);
                this._view.lab_desc.textFlow = TextUtil.parseHtml(tmpContent);
            }
        }
    }
}