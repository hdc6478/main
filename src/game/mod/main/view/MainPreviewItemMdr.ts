namespace game.mod.main {


    import TouchEvent = egret.TouchEvent;

    export class MainPreviewItemMdr extends MdrBase {
        private _view: MainPreviewItemView = this.mark("_view", MainPreviewItemView);
        private _proxy: IPassProxy;

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = getProxy(ModName.Pass, ProxyType.Pass);

            this._view.x = 580;
            this._view.y = 400;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_preview, TouchEvent.TOUCH_TAP, this.onClickPreview);

            this.onNt(PassEvent.UPDATE_MAIN_PASS_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            if (!this._proxy.onCheckMainShow()) {
                this.hide();
                return;
            }
            let index: number = this._proxy.getShowIndex();
            this._view.btn_preview.icon = this._proxy.getIcon(index);
            this._view.btn_preview.setHint(HintMgr.getHint([ModName.Pass, PassViewType.PassMain + PassMainBtnType.Main, PassViewType.Preview]));
            this._view.lab_limit.textFlow = TextUtil.parseHtml(this._proxy.getOpenTxt(index));
        }

        private onClickPreview(): void {
            // if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Pass,true)){
            //     return;
            // }
            ViewMgr.getIns().showView(ModName.Pass, PassViewType.Preview);
        }

        protected onHide(): void {
            super.onHide();
        }

    }
}