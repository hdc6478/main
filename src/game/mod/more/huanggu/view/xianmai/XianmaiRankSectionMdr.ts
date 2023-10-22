namespace game.mod.more {
    import ArrayCollection = eui.ArrayCollection
    import LanDef = game.localization.LanDef;

    export class XianmaiRankSectionMdr extends EffectMdrBase{
        private _view: RankSectionView = this.mark("_view", RankSectionView);

        private _itemList: ArrayCollection;
        private _proxy: XianmaiProxy;

        private _section: string;
        private _type: number;

        protected _showArgs:{rank: string, type: number};

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Xianmai);

            this._itemList = new ArrayCollection();
            this._view.list.itemRenderer = RankSectionItem;
            this._view.list.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();
            this._section = this._showArgs.rank;
            this._type = +this._showArgs.type;
            this._view.secondPop.updateTitleStr(getLanById(LanDef.pass_rank));
            this.onRankUpdate();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onRankUpdate(): void {
            if (this._section && this._type) {
                this._itemList.source = this._proxy.getRankSection(this._section, this._type);
            }
            this._view.img_type2.source = "xianmaijifen";
            this._view.lab_rank.textFlow = TextUtil.parseHtml(this._proxy.getRankStr(this._type));
            this._view.lab_score.textFlow = TextUtil.parseHtml(this._proxy.getRankCountStr(this._type));
        }
    }
}