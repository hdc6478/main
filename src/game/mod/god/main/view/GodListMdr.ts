namespace game.mod.god {

    import ArrayCollection = eui.ArrayCollection;
    import ItemTapEvent = eui.ItemTapEvent;
    import LanDef = game.localization.LanDef;

    export class GodListMdr extends MdrBase {
        private _view: GodListView = this.mark("_view", GodListView);
        private _listData: ArrayCollection = new ArrayCollection();
        private _proxy: GodProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.God);

            this._view.list.itemRenderer = GodItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClick);

            this.onNt(GodEvent.ON_UPDATE_ROAD_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            this._listData.replaceAll(this._proxy.list);
            let str: string = TextUtil.addColor(`(${this._proxy.activateCount}/${4})`, 0x228d2d);
            this._view.lab.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.tiandi_tips3), [str]));
        }

        private onClick(e: ItemTapEvent): void {
            this._proxy.iType = e.itemIndex + 1;
            //todo
            if (this._proxy.iType==3){
                PromptBox.getIns().show(`敬请期待！`);
            }else if(this._proxy.iType==4){
                PromptBox.getIns().show(`敬请期待！`);
            }else {
                ViewMgr.getIns().showView(ModName.God, GodViewType.GodCommonMain);
            }

        }

        protected onHide(): void {
            super.onHide();
        }
    }
}