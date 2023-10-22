namespace game.mod {

    import TouchEvent = egret.TouchEvent;

    export class WndBaseNewMdr extends WndMdr {
        protected _view: WndBaseNewView = this.mark("_view", WndBaseNewView);

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._view.list_menu.itemRenderer = TabBaseItem;
            this._view.list_menu.dataProvider = this._btnList;

            this._tab.btnList = this._view.list_menu;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_back, TouchEvent.TOUCH_TAP, this.onClickBack);
        }

        /**更新背景，子类重写 */
        protected updateBg(bg: string): void {
            if(bg == undefined){
                /**支持背景设置空：""*/
                return;
            }
            this._view.img_bg.source = ResUtil.getUiJpg(bg);
        }

        /** 通用移动层级监听，子类重写 */
        protected setTop(): void {
            this._view.setChildIndex(this._view.grp_top, this._view.numChildren - 1);
        }
    }
}