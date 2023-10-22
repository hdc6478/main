namespace game.mod {
    import Event = egret.Event;
    // import TouchEvent = egret.TouchEvent;
    // import facade = base.facade;

    export class SecondPop extends eui.Component {
        private img_bg: eui.Image;
        private lab_title: eui.Label;
        public btn_close: game.mod.Btn;

        private _titleStr: string;//标题文字，提示表字段
        private _bgStr: string;//背景，完整的路径
        //private _hasHide: boolean;//是否关闭SecondPop

        constructor() {
            super();
            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);
        }

        private onAddToStage() {
            //this.btn_close.addEventListener(TouchEvent.TOUCH_TAP, this.onClickHide, this);
            //this._hasHide = false;
            this.updateTitleSrc();
            this.updateBgSrc();
        }

        private onRemove() {
            //this.onClickHide();
            //this.btn_close.removeEventListener(TouchEvent.TOUCH_TAP, this.onClickHide, this);
        }

        // private onClickHide() {
        //     if(this._hasHide){
        //         this._hasHide = false;//防止一直不能关闭
        //         return;
        //     }
        //     this._hasHide = true;
        //     let curSecondPop = ViewMgr.getIns().getSecondPopMod();
        //     if (curSecondPop && curSecondPop.length) {
        //         facade.hideView(curSecondPop[0], curSecondPop[1]);
        //     }
        // }

        private updateTitleSrc() {
            if (this._titleStr) {
                let strList = this._titleStr.split(",");
                let allStr = "";
                for(let str of strList){
                    allStr += getLanById(str);
                }
                this.lab_title.text = allStr;
            }
        }

        public updateBgSrc(str?: string) {
            if (this._bgStr) {
                this.img_bg.source = this._bgStr;
            }
            if (str != null) {
                this.img_bg.source = str;
            }
        }

        /**皮肤设置标题用*/
        public set titleStr(str: string) {
            this._titleStr = str;
        }

        /**皮肤设置背景用*/
        public set bgStr(str: string) {
            this._bgStr = str;
        }

        /**代码设置标题用*/
        public updateTitleStr(str: string) {
            this.lab_title.text = str;
        }
    }
}