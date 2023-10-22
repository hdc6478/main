namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class HunkaComposeMdr extends MdrBase{
        private _view: HunkaComposeView = this.mark("_view", HunkaComposeView);
        private _proxy: GoddessRecordProxy;
        private _showingPreview: boolean;//显示合成预览
        private _canCompose: boolean;
        private _ids: Long[];

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.GoddessRecord);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_preview, TouchEvent.TOUCH_TAP, this.onClickPreview);
            addEventListener(this._view.btn_compose, TouchEvent.TOUCH_TAP, this.onClickCompose);
            addEventListener(this._view.btn_oneKey, TouchEvent.TOUCH_TAP, this.onClickOneKey);

            this.onNt(GoddessRecordEvent.ON_UPDATE_HUNKA_SELECT, this.updateSel, this);
            this.onNt(GoddessRecordEvent.ON_UPDATE_HUNKA_COMPOSE, this.updateSel, this);
            this.onNt(GoddessRecordEvent.ON_UPDATE_HUNKA_PREVIEW, this.updatePreview, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateSel();
            this.setPreview(false);
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickPreview(): void {
            let show = !this._showingPreview;
            this.setPreview(show);
            //请求数据
            this._proxy.c2s_chuang_shi_nv_shen_hun_ka_click(HunkaOpType.Preview, undefined, undefined, undefined, this._ids);
        }

        private onClickCompose(): void {
            if(!this._canCompose){
                PromptBox.getIns().show(getLanById(LanDef.hunka_tips20));
                return;
            }
            this._proxy.c2s_chuang_shi_nv_shen_hun_ka_click(HunkaOpType.Compose, undefined, undefined, undefined, this._ids);
        }

        private onClickOneKey(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.HunkaOneKeyCompose);
        }

        private updateSel(): void {
            this._view.item0.setData(0);
            this._view.item1.setData(1);

            this._ids = [];
            let composeList = this._proxy.composeList;
            for(let k in composeList) {
                let prop = composeList[k];
                if(prop){
                    this._ids.push(prop.prop_id);
                }
            }
            this._canCompose = this._ids.length >= 2;
            this._view.btn_preview.visible = this._canCompose;
        }

        private setPreview(show: boolean): void {
            this._showingPreview = show;

            let btnStr = show ? getLanById(LanDef.hunka_tips16) : getLanById(LanDef.hunka_tips15);
            this._view.btn_preview.labelDisplay.text = btnStr;

            this._view.item0.visible = this._view.item1.visible = !show;
            this._view.item_preview.visible = show;
        }

        private updatePreview(): void {
            let data = this._proxy.hunkaPreview;
            this._view.item_preview.setData(data);
        }
    }
}