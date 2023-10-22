namespace game.mod.yijie {

    import ArrayCollection = eui.ArrayCollection;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import yijie_boss_data = msg.yijie_boss_data;

    export class YijieBossListMdr extends MdrBase implements UpdateItem {

        private _view: YijieBossListView = this.mark("_view", YijieBossListView);
        private _proxy: YijieProxy;

        private _itemList: ArrayCollection;
        protected _showArgs: number;//YijieBossType
        private _type: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = YijieBossItem;
            this._view.list_item.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Yijie);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(SceneEvent.SCENE_CHANGE, this.hide, this);
            this.onNt(YijieEvent.BOSS_LIST_INFO_UPDATE, this.updateBoss, this);
        }

        protected onShow(): void {
            super.onShow();
            this._type = this._showArgs;
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
            SortTools.sortMap(bossList, "index");//排序
            if(this._type != YijieBossType.YonghengYijie && bossList.length < YijieBossNum){
                let stage = bossList.length ? bossList[0].stage : 1;
                let info: yijie_boss_data = new yijie_boss_data();//显示稀有boss
                info.stage = stage;
                info.index = YijieBossNum;
                info.recover_time = Long.fromValue(-1);//-1表示未刷新
                bossList.push(info);
            }
            if(this._itemList.source.length){
                this._itemList.replaceAll(bossList);
            }
            else {
                this._itemList.source = bossList;
            }
        }

        update(time: base.Time): void {
            this.reqBossInfo();
        }

        private reqBossInfo(): void {
            if(this._type == YijieBossType.YonghengYijie){
                this._proxy.c2s_yongheng_boss_info();
                return;
            }
            this._proxy.c2s_yijie_boss_info();
        }
    }
}
