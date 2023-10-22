namespace game.mod.main {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import ItemTapEvent = eui.ItemTapEvent;
    import StrongerConfig = game.config.StrongerConfig;

    export class StrongerMdr extends EffectMdrBase {
        private _view: StrongerView= this.mark("_view", StrongerView);

        private _typeList: ArrayCollection;
        private _itemList: ArrayCollection;

        private _selIndex: number;//当前选中的类型

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = StrongerItem;
            this._view.list_item.dataProvider = this._itemList;

            this._typeList = new ArrayCollection();
            this._view.list_type.itemRenderer = TabSecondItem;
            this._view.list_type.dataProvider = this._typeList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
        }

        protected onShow(): void {
            super.onShow();

            this._selIndex = 0;
            this.initTypeList();
            this.updateItemList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickType(e: ItemTapEvent) {
            let index = e.itemIndex;
            if(index == this._selIndex){
                return;
            }
            this._selIndex = index;
            this.updateItemList();
        }

        private initTypeList(): void {
            let typeDatas: TabBaseItemData[] = [];
            let type = 1;
            while (type){
                let cfgs = getConfigByNameId(ConfigName.Stronger, type);
                if(!cfgs){
                    break;
                }
                let icon = "stronger_type" + type;
                typeDatas.push({icon: icon});
                type++;
            }
            this._typeList.source = typeDatas;
            this._view.list_type.selectedIndex = this._selIndex;
        }

        private updateItemList(): void {
            this._view.scr.stopAnimation();
            let type = this._selIndex + 1;
            let cfgs = getConfigByNameId(ConfigName.Stronger, type);
            let infos: StrongerConfig[] = [];
            for(let k in cfgs){
                let cfg = cfgs[k];
                infos.push(cfg);
            }
            this._itemList.source = infos;
        }

    }
}