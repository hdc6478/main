namespace game.mod.boss {

    import ArrayCollection = eui.ArrayCollection;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class AbyssBossListMdr extends MdrBase implements UpdateItem {

        private _view: AbyssBossListView = this.mark("_view", AbyssBossListView);
        private _proxy: BossProxy;

        private _itemList: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = AbyssBossItem;
            this._view.list_item.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Boss);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(SceneEvent.SCENE_CHANGE, this.hide, this);
            this.onNt(BossEvent.BOSS_LIST_INFO_UPDATE, this.updateBoss, this);
        }

        protected onShow(): void {
            super.onShow();
            this.reqBossInfo();
            this.updateBoss();
            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        /**更新boss*/
        private updateBoss(): void {
            let bossList = this._proxy.bossList.concat();
            SortTools.sortMap(bossList, "index");
            this._itemList.replaceAll(bossList);
        }

        update(time: base.Time): void {
            // todo 只更新时间 时间结束再请求
            this.reqBossInfo();
        }

        private reqBossInfo(): void {
            this._proxy.c2s_zhuimo_boss_info();
        }
    }
}
