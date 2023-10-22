namespace game.mod.boss {

    import ArrayCollection = eui.ArrayCollection;

    export class AbyssInviteListMdr extends MdrBase {

        private _view: AbyssTeamListView = this.mark("_view", AbyssTeamListView);
        private _proxy: BossProxy;

        private _itemList: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Boss);

            this.onInitList();
        }

        protected onInitList(): void {
            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = AbyssInviteItem;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(SceneEvent.SCENE_CHANGE, this.hide, this);
            this.onNt(BossEvent.ON_ABYSS_TEAM_INVITE_UPDATE, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.c2s_zhuimo_army_ui_show(1);
        }

        protected onHide(): void {
            super.onHide();
        }

        protected onUpdateView(): void {
            this._itemList.replaceAll(this._proxy.duiyou_list);
        }
    }
}
