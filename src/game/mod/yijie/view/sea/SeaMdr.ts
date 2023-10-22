namespace game.mod.yijie {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import TextUtil = game.TextUtil;
    import GameNT = base.GameNT;

    export class SeaMdr extends MdrBase {
        private _view: SeaView = this.mark("_view", SeaView);
        private _proxy: SeaProxy;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Sea);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_sea1, TouchEvent.TOUCH_TAP, this.onClickSea1);
            addEventListener(this._view.btn_sea2, TouchEvent.TOUCH_TAP, this.onClickSea2);
            addEventListener(this._view.btn_sea3, TouchEvent.TOUCH_TAP, this.onClickSea3);
            addEventListener(this._view.btn_sea4, TouchEvent.TOUCH_TAP, this.onClickSea4);

            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateShow();
            this.updateHint();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickSea1(): void {
            this.checkSea(OpenIdx.Sea1, SeaMainBtnType.Sea1);
        }

        private onClickSea2(): void {
            this.checkSea(OpenIdx.Sea2, SeaMainBtnType.Sea2);
        }

        private onClickSea3(): void {
            this.checkSea(OpenIdx.Sea3, SeaMainBtnType.Sea3);
        }

        private checkSea(openIdx: number, btnType: string): void {
            if(!ViewMgr.getIns().checkViewOpen(openIdx, true)){
                return;
            }
            ViewMgr.getIns().showView(ModName.Yijie, YijieViewType.SeaMain, btnType);
        }

        private onClickSea4(): void {
            PromptBox.getIns().show(getLanById(LanDef.sea_tips1));
        }

        private updateShow(): void {
            this.updateSea(OpenIdx.Sea1, this._view.btn_sea1);
            this.updateSea(OpenIdx.Sea2, this._view.btn_sea2);
            this.updateSea(OpenIdx.Sea3, this._view.btn_sea3);
        }

        private updateSea(openIdx: number, btn: Btn): void {
            let isOpen = ViewMgr.getIns().checkViewOpen(openIdx);
            let str = TextUtil.addColor(getLanById(isOpen ? LanDef.sea_tips2 : LanDef.sea_tips1), isOpen ? BlackColor.GREEN : BlackColor.YELLOW);
            let text = btn.labelDisplay as eui.Label;
            text.textFlow = TextUtil.parseHtml(str);
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            let hintType1 = this._proxy.getHintType(SeaType.Sea1);
            let hintType2 = this._proxy.getHintType(SeaType.Sea2);
            let hintType3 = this._proxy.getHintType(SeaType.Sea3);

            if (data.node == HintMgr.getType(hintType1)) {
                this.updateSeaHint(data.value, this._view.btn_sea1);
            }
            else if (data.node == HintMgr.getType(hintType2)) {
                this.updateSeaHint(data.value, this._view.btn_sea2);
            }
            else if (data.node == HintMgr.getType(hintType3)) {
                this.updateSeaHint(data.value, this._view.btn_sea3);
            }
        }

        private updateHint(): void {
            let hintType1 = this._proxy.getHintType(SeaType.Sea1);
            this.updateSeaHint(HintMgr.getHint(hintType1), this._view.btn_sea1);

            let hintType2 = this._proxy.getHintType(SeaType.Sea2);
            this.updateSeaHint(HintMgr.getHint(hintType2), this._view.btn_sea2);

            let hintType3 = this._proxy.getHintType(SeaType.Sea3);
            this.updateSeaHint(HintMgr.getHint(hintType3), this._view.btn_sea3);
        }

        private updateSeaHint(hint: boolean, btn: Btn) {
            btn.redPoint.visible = hint;
        }

    }
}