namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import delayCall = base.delayCall;
    import clearDelay = base.clearDelay;
    import Handler = base.Handler;
    import facade = base.facade;

    export class HunkaBagIcon extends BaseRenderer {

        private icon: Icon;
        private starListFuView: StarListFuView;
        private img_up: eui.Image;

        private _delayProp: number;
        private _selectShow: boolean = false;//长按奖励时候提示
        private _proxy: GoddessRecordProxy;
        public data: PropData;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.More).retProxy(ProxyType.GoddessRecord);

            this.addEventListenerEx(TouchEvent.TOUCH_BEGIN, this.icon, this.onClickBegin, this);
            this.addEventListenerEx(TouchEvent.TOUCH_END, this.icon, this.onClickEnd, this);
            this.icon.setClickHandler(Handler.alloc(this, this.onClickTap));
        }

        protected onRemoveFromStage(): void {
            this.clearDelayProp();
            super.onRemoveFromStage();
        }

        private onClickBegin(): void {
            this._delayProp = delayCall(Handler.alloc(this, this.showPropTips), 2000);
        }

        private onClickEnd(): void {
            this.clearDelayProp();
        }

        private onClickTap(): void {
            if(this._selectShow){
                //长按提示奖励时候不选中
                this._selectShow = false;
                return;
            }
            let openType = this._proxy.hunkaBagOpenType;
            if(openType == HunkaBagOpenType.Wear){
                //穿戴
                let type = this._proxy.hunkaType;
                let pos = this._proxy.hunkaSelPos;
                let id = this.data.prop_id;
                this._proxy.c2s_chuang_shi_nv_shen_hun_ka_click(HunkaOpType.Wear, type, pos, id);
            }
            else if(openType == HunkaBagOpenType.Compose){
                //合成选择
                let pos = this._proxy.hunkaComposeSelPos;
                this._proxy.setComposeSel(this.data, pos);
            }
            facade.sendNt(GoddessRecordEvent.ON_UPDATE_HUNKA_SELECT);
        }

        private clearDelayProp(): void {
            if (this._delayProp) {
                clearDelay(this._delayProp);
            }
        }

        private showPropTips(): void {
            if(!this.data){
                return;
            }
            this._delayProp = 0;
            this._selectShow = true;
            facade.showView(ModName.More, MoreViewType.HunkaTips, this.data);
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            this.icon.setData(this.data);
            let star = this.data.hunka_star;
            this.starListFuView.updateStar(star, -10);

            let openType = this._proxy.hunkaBagOpenType;
            if(openType == HunkaBagOpenType.Wear) {
                //穿戴
                this.currentState = "up";
                let type = this._proxy.hunkaType;
                let pos = this._proxy.hunkaSelPos;
                let isBest = this._proxy.checkBestHunka(type, pos, this.data);
                this.img_up.source = isBest ? "jiantou_lvse" : "jiantou_hongse";
            }
            else if(openType == HunkaBagOpenType.Compose) {
                //合成
                this.currentState = "default";
            }
        }
    }

}