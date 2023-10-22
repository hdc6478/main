namespace game.mod {

    import TouchEvent = egret.TouchEvent;
    import Handler = base.Handler;
    import GameNT = base.GameNT;

    export class WndBaseMdr extends WndMdr {
        protected _view: WndBaseView = this.mark("_view", WndBaseView);

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
            addEventListener(this._view.btn_close, TouchEvent.TOUCH_TAP, this.onClickClose);
            addEventListener(this._view.btn_back, TouchEvent.TOUCH_TAP, this.onClickBack);
            this.onNt(MainEvent.UPDATE_WND_BASE_MDR_TITLE, this.onTitleUpdate, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);//属性刷新，有货币
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onUpdateByPropIndex, this);//道具刷新

            this.onNt(GuideEvent.ON_GUIDE_TRIGGER, this.onGuideTrigger, this);//触发指定指引
        }

        protected onShow(): void {
            super.onShow();
            this.showBackGuide();
        }

        protected onHide() {
            GuideMgr.getIns().clear(GuideKey.Back);//清除指引
            //GuideMgr.getIns().recordSpecialGuideMap(GuideKey.Back);//清除指引
            super.onHide();
        }

        protected onClickClose() {
            ViewMgr.getIns().back();
        }

        /**分页选中变更时调用，比Mdr的onShow()方法晚执行*/
        protected onTabChanged() {
            super.onTabChanged();
            let data: WndBaseViewData = this._btnList.source[this._tab.selectIndex];
            if(!data){
                console.error("取不到分页数据");
                return;
            }
            this.updateTitle(data.title);
            this.updateCoin(data);
        }

        /**更新标题*/
        private updateTitle(title: string): void {
            if(!title){
                return;
            }
            let str = getLanById(title) || title;
            this._view.lab_title.text = str;
        }

        /**更新背景，子类重写 */
        protected updateBg(bg: string): void {
            if(bg == undefined){
                /**支持背景设置空：""*/
                return;
            }
            this._view.img_bg.source = ResUtil.getUiJpg(bg);
        }

        /** 通用标题监听 */
        private onTitleUpdate(n: GameNT): void {
            let title: string = n.body;
            this.updateTitle(title);
        }

        /** 通用移动层级监听，子类重写 */
        protected setTop(): void {
            this._view.setChildIndex(this._view.grp_top, this._view.numChildren - 1);
        }

        /**更新货币*/
        private updateCoin(data: WndBaseViewData): void {
            let coinIndex1 = data.coinIndex1 ? data.coinIndex1 : PropIndex.Xianyu;
            this._view.item1.setData(coinIndex1);

            let coinIndex2 = data.coinIndex2 ? data.coinIndex2 : PropIndex.Yuanbao;
            this._view.item2.setData(coinIndex2);

            //其他货币或道具展示
            this._view.item0.visible = !!data.coinIndex0;
            if (data.coinIndex0) {
                this._view.item0.setData(data.coinIndex0);
            }
        }

        private onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            this.updateItemShow(keys, this._view.item1);
            this.updateItemShow(keys, this._view.item2);
            this.updateItemShow(keys, this._view.item0);
        }

        private updateItemShow(keys: string[], item: TopCoinItem): void {
            if(!item.visible){
                return;
            }
            let key = PropIndexToKey[item.index];
            if(key && keys.indexOf(key) >= 0){
                item.updateShow(true);
            }
        }

        private onUpdateByPropIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            this.updateItemShowByIndex(indexs, this._view.item1);
            this.updateItemShowByIndex(indexs, this._view.item2);
            this.updateItemShowByIndex(indexs, this._view.item0);
        }

        private updateItemShowByIndex(indexs: number[], item: TopCoinItem): void {
            if(!item.visible){
                return;
            }
            if(indexs.indexOf(item.index) >= 0){
                item.updateShow();
            }
        }

        //触发指定指引
        private onGuideTrigger(n: GameNT): void {
            let key: number = n.body;
            if(key == GuideKey.Back){
                this.showBackGuide()
            }
        }
        //返回指引
        private showBackGuide(): void {
            GuideMgr.getIns().show(GuideKey.Back, this._view.btn_back, Handler.alloc(this, this.onClickBack));//返回指引
        }
    }
}