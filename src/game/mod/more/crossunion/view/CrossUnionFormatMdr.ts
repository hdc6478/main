namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import ItemTapEvent = eui.ItemTapEvent;
    import ArrayCollection = eui.ArrayCollection;

    export class CrossUnionFormatMdr extends MdrBase {
        private _view: CrossUnionFormatView = this.mark("_view", CrossUnionFormatView);
        private _proxy: CrossUnionProxy;

        private _listData: ArrayCollection = new ArrayCollection();
        private _tabData: ArrayCollection = new ArrayCollection();

        private _tabList: BtnTabItemData[] = [
            { name: "全部" },
            { name: "一队" },
            { name: "二队" },
            { name: "三队" },
            { name: "四队" }
        ]

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.CrossUnion);

            this._view.list.itemRenderer = CrossUnionFormatItem;
            this._view.list.dataProvider = this._listData;

            this._view.list_type.itemRenderer = BtnTabItem;
            this._view.list_type.dataProvider = this._tabData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickTab, this);

            this.onNt(MoreEvent.ON_UPDATE_CROSS_UNION_SELECT_INFO, this.onUpdateView, this);
            this.onNt(MoreEvent.ON_UPDATE_CROSS_UNION_TEAM_LIST_INFO, this.onInitView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_guild_pk_lineup_show();
            super.onShow();
            this.onUpdateTab();
            this._view.list_type.selectedIndex = +this._showArgs || 0;
            // this.onUpdateView();
        }

        private onUpdateTab(): void {
            // let list: BtnTabItemData[] = [
            //     { name: "全部" },
            //     { name: "一队" },
            //     { name: "二队" },
            //     { name: "三队" },
            //     { name: "四队" }
            // ];
            this._tabData.source = this._tabList;
        }

        private onInitView(): void {
            this._proxy.select = 0;
            // this._view.list_type.selectedIndex = e.itemIndex;
            this._view.list.scrollV = 0;
            this.onUpdateView();
        }

        private onUpdateView(): void {
            // TODO: getLanById(LanDef)
            let str: string = this._tabList[this._view.list_type.selectedIndex].name
            this._view.secondPop.updateTitleStr(str);

            this._view.lab_tips.text = !!this._proxy.select ? getLanById(LanDef.kuafuxianzong_tips6) : getLanById(LanDef.kuafuxianzong_tips5);

            let index: number = this._view.list_type.selectedIndex;
            let list = this._proxy.getTeamList(index);
            this._listData.replaceAll(list);
        }

        private onClickTab(e: ItemTapEvent): void {
            // this._proxy.select = 0;
            // // this._view.list_type.selectedIndex = e.itemIndex;
            // this._view.list.scrollV = 0;
            // this.onUpdateView();
            this.onInitView();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}