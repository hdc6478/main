namespace game.mod.more {
    import Event = egret.Event;
    import TextEvent = egret.TextEvent;
    import Handler = base.Handler;

    export class HunkaNoneView extends eui.Component {
        private lab_go: eui.Label;
        private _clickHandler: Handler;

        constructor() {
            super();
            this.skinName = "skins.more.HunkaNoneSkin";

            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage() {
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);
            this.lab_go.addEventListener(TextEvent.LINK, this.onClickGo, this);

            let textStr = this.lab_go.text;
            let textColor = this.lab_go.textColor;
            this.lab_go.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(textStr, textColor, ""));
        }

        private onRemove() {
            this.lab_go.removeEventListener(TextEvent.LINK, this.onClickGo, this);
        }

        private onClickGo(): void {
            if(this._clickHandler){
                this._clickHandler.exec();
            }
            ViewMgr.getIns().showView(ModName.More, MoreViewType.TimeGoddessMain);
        }

        public updateHunkaNoneView(clickHandler: Handler): void {
            this._clickHandler = clickHandler;
        }
    }

}