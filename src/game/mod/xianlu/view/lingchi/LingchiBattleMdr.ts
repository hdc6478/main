namespace game.mod.xianlu {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import GridConfig = game.config.GridConfig;
    import ItemTapEvent = eui.ItemTapEvent;
    import LanDef = game.localization.LanDef;

    export class LingchiBattleMdr extends EffectMdrBase {
        private _view: LingchiBattleView = this.mark("_view", LingchiBattleView);
        private _proxy: XianluProxy;

        private _itemList1: ArrayCollection;
        private _itemList2: ArrayCollection;

        public _showArgs: number;//灵池类型

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList1 = new ArrayCollection();
            this._view.list_item1.itemRenderer = LingchiShenlingItemRender;
            this._view.list_item1.dataProvider = this._itemList1;

            this._itemList2 = new ArrayCollection();
            this._view.list_item2.itemRenderer = LingchiShenlingSelItemRender;
            this._view.list_item2.dataProvider = this._itemList2;

            this._proxy = this.retProxy(ProxyType.Xianlu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_battle, TouchEvent.TOUCH_TAP, this.onClickBattle);
            addEventListener(this._view.list_item2, ItemTapEvent.ITEM_TAP, this.onClickItem);
            this.onNt(XianluEvent.LINGCHI_INFO_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.poolType = this._showArgs;
            this._proxy.battleView = true;
            this.onInfoUpdate();
        }

        protected onHide(): void {
            this._proxy.battleView = false;
            super.onHide();
        }

        private onClickBattle(): void {
            //一键派遣
            if(!this._itemList2.source || !this._itemList2.source.length){
                PromptBox.getIns().show(getLanById(LanDef.shenling_tips4));
                return;
            }
            this._proxy.c2s_lingpool_onekey_unit(this._showArgs);
        }

        private onInfoUpdate(): void {
            this.updateView();
            this.updateItemList1();
            this.updateItemList2();
        }

        private updateView(): void {
            let type = this._showArgs;
            let _info = this._proxy.getPoolInfo(type);
            let totalAdd = this._proxy.calcPoolAdd(_info) / 100;
            let fontStr = "s" + totalAdd + "%";
            this.addBmpFont(fontStr, BmpTextCfg[BmpTextType.CommonPower], this._view.grp_add);
            this._view.btn_battle.redPoint.visible = this._proxy.canPoolBattle(_info);
        }

        private updateItemList1(): void {
            let cfg: GridConfig = getConfigByNameId(ConfigName.Grid, this._showArgs);
            let datas = cfg.grid_condition;
            if(this._itemList1.source.length > 0){
                this._itemList1.replaceAll(datas);
            }
            else{
                this._itemList1.source = datas;
            }
        }

        private updateItemList2(): void {
            let type = this._showArgs;
            let datas: number[] = this._proxy.getShenlingList(type);
            this._itemList2.source = datas;
        }

        private onClickItem(e: ItemTapEvent) {
            let index: number = e.item;
            let type = this._showArgs;
            this._proxy.c2s_lingpool_add_unit(type, index);
        }
    }
}