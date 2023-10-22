namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import ItemTapEvent = eui.ItemTapEvent;
    import TouchEvent = egret.TouchEvent;

    export class CrossUnionTeamMdr extends MdrBase {
        private _view: CrossUnionTeamView = this.mark("_view", CrossUnionTeamView);
        private _proxy: CrossUnionProxy;

        private _listData: eui.ArrayCollection = new eui.ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.CrossUnion);

            this._view.list.itemRenderer = CrossUnionTeamItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClickList);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClickBtn);

            this.onNt(MoreEvent.ON_UPDATE_CROSS_UNION_TEAM_LIST_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_guild_pk_lineup_show();
            super.onShow();
            // this.onUpdateView();
        }

        private onUpdateView(): void {
            // let index: number = this._proxy.team_index;

            this._listData.replaceAll(this._proxy.team_list_data);
            this._view.list.selectedIndex = 0;
        }

        private onClickList(e: ItemTapEvent): void {
            if (this._view.list.selectedIndex == e.itemIndex) {
                return;
            }
            this._view.list.selectedIndex = e.itemIndex;
        }

        private onClickBtn(): void {
            let index = this._view.list.selectedIndex + 1;
            this._proxy.c2s_guild_pk_oper(2, index);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}