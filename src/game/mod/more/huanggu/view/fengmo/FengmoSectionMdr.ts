namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;

    export class FengmoSectionMdr extends EffectMdrBase {
        private _view: RankSectionView = this.mark("_view", RankSectionView);

        private _itemList: ArrayCollection;
        private _proxy: FengmoProxy;

        private _section: string;
        private _type: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Fengmo);

            this._itemList = new ArrayCollection();
            this._view.list.itemRenderer = RankSectionItem;
            this._view.list.dataProvider = this._itemList;
        }

        protected onShow(): void {
            super.onShow();
            this._section = this._showArgs.rank;
            this._type = +this._showArgs.type;
            this.onRankUpdate();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onRankUpdate(): void {
            if (this._section && this._type) {
                this._itemList.source = this._proxy.getRankSection(this._section, this._type);
            }
            this._view.img_type2.source = "fengmojifen";
            this._view.lab_rank.textFlow = TextUtil.parseHtml(this._proxy.getRankStr(this._type));
            this._view.lab_score.textFlow = TextUtil.parseHtml(this._proxy.getRankCountStr(this._type));
        }
    }
}