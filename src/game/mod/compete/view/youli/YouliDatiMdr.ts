namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import tour_role_info = msg.tour_role_info;
    import LanDef = game.localization.LanDef;
    import TourpvpDatiConfig = game.config.TourpvpDatiConfig;
    import ItemTapEvent = eui.ItemTapEvent;

    export class YouliDatiMdr extends EffectMdrBase {
        private _view: YouliDatiView = this.mark("_view", YouliDatiView);

        private _proxy: CompeteProxy;

        private _itemList: ArrayCollection;
        protected _showArgs: tour_role_info;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();

            this._itemList= new ArrayCollection();
            this._view.list_item.itemRenderer = YouliDatiItem;
            this._view.list_item.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Compete);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
            this.onNt(CompeteEvent.UPDATE_YOULI_DATI, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateShow();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickItem(e: ItemTapEvent): void {
            let index: number = e.item;
            this._proxy.c2s_tour_dati_select(index);
        }

        private updateShow(): void {
            this._view.lab_tip.text = getLanById(LanDef.tourpvp_dati_tips);

            let infos = this._showArgs.param1;
            let index = infos[0];//第一个是题目索引
            let optionList = infos.slice(1, infos.length);//后面的是选项

            let cfg: TourpvpDatiConfig = getConfigByNameId(ConfigName.TourpvpDati, index);
            this._proxy.datiCfg = cfg;

            this._view.lab_desc.text = cfg.ques;

            this._itemList.source = optionList;
        }

    }
}