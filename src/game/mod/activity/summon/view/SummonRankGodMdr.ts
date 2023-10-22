namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;

    export class SummonRankGodMdr extends EffectMdrBase {
        private _view: RankGodView = this.mark("_view", RankGodView);

        private _proxy: SummonProxy;
        private _itemList: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Summon);
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = SummonRankGodRender;
            this._view.list_rank.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(ActivityEvent.ON_UPDATE_FENGYUN_LIST, this.updateItemList, this);
        }

        protected onShow(): void {
            super.onShow();

            this._view.secondPop.updateTitleStr(getLanById(LanDef.fengyunlu));
            this.updateItemList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateItemList(): void {
            let infos = this._proxy.getFengYunRankList();
            if (this._itemList.source.length) {
                this._itemList.replaceAll(infos);
            } else {
                this._itemList.source = infos;
            }
        }
    }
}