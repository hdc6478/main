namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import pvp_battle_pk_data = msg.pvp_battle_pk_data;
    import ItemTapEvent = eui.ItemTapEvent;

    export class DoufaFinalsMdr extends MdrBase {

        private _view: DoufaFinalsView = this.mark("_view", DoufaFinalsView);
        private _proxy: CompeteProxy;
        private _btnList: ArrayCollection;

        private _selType: number;/**当前选中的分组类型*/

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._btnList = new ArrayCollection();
            this._view.list_type.itemRenderer = DoufaTabItem;
            this._view.list_type.dataProvider = this._btnList;

            this._proxy = this.retProxy(ProxyType.Compete);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);

            this.onNt(CompeteEvent.UPDATE_DOUFA_GROUP_INFO, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initTypeList();
            //this.typeUpdateInfo();
            this._proxy.c2s_pvp_battle_group_pk_info();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickType(e: ItemTapEvent) {
            let type = e.itemIndex + 1;
            if(type == this._selType){
                return;
            }
            this._selType = type;
            this.typeUpdateInfo();
        }

        private onInfoUpdate(): void {
            this.typeUpdateInfo();
        }

        private initTypeList(): void {
            let datas: number[] = [];
            for(let i = 1; i <= DoufaGroupType.Type4; ++i){
                datas.push(i);
            }
            this._btnList.source = datas;

            this._selType = datas[0];
            this._view.list_type.selectedIndex = this._selType - 1;
        }

        private typeUpdateInfo(): void {
            this._view.player.updateShow(this._selType);
        }
    }
}
