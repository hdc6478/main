namespace game.mod.xianyuan {

    import ArrayCollection = eui.ArrayCollection;

    export class XianlvDoufaSectionMdr extends EffectMdrBase {
        private _view: RankSectionView = this.mark("_view", RankSectionView);

        private _itemList: ArrayCollection;
        private _proxy: XianlvDoufaProxy;

        private _section: string;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.XianlvDoufa);

            this._itemList = new ArrayCollection();
            this._view.list.itemRenderer = RankSectionItem;
            this._view.list.dataProvider = this._itemList;
        }

        protected onShow(): void {
            super.onShow();
            this._section = this._showArgs.rank;
            this.onRankUpdate();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onRankUpdate(): void {
            if (this._section) {
                this._itemList.source = this._proxy.getRankSection(this._section);
            }
            this._view.img_type2.source = "jingjijifen";
            this._view.lab_rank.textFlow = TextUtil.parseHtml(this._proxy.getRankStr());
            this._view.lab_score.textFlow = TextUtil.parseHtml(this._proxy.getRankCountStr());
        }
    }
}