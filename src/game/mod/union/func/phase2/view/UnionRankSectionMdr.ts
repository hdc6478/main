namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;

    export class UnionRankSectionMdr extends EffectMdrBase {
        private _view: RankSectionView = this.mark("_view", RankSectionView);

        private _itemList: ArrayCollection;
        private _proxy: UnionProxy;

        private _section: string;
        private _type: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Union);

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
            let open_fun = this._proxy.open_fun;
            switch (open_fun) {
                case UnionMainType.UnionTreasure:
                    this._view.img_type2.source = "duobaocishu";
                    this._view.lab_rank.textFlow = TextUtil.parseHtml(this._proxy.getRankStr(this._type));
                    this._view.lab_score.textFlow = TextUtil.parseHtml(this._proxy.getRankCountStr(this._type));
                    break;
                case UnionMainType.UnionKill:
                    this._view.img_type2.source = "zhanyaojifen";
                    this._view.lab_rank.textFlow = TextUtil.parseHtml(this._proxy.getBossRankStr(this._type));
                    this._view.lab_score.textFlow = TextUtil.parseHtml(this._proxy.getBossRankCountStr(this._type));
                    break;
                case UnionMainType.UnionBeast:
                    this._view.img_type2.source = "meishuzi_xianshoujingyan";
                    this._view.lab_rank.textFlow = TextUtil.parseHtml(this._proxy.getBeastRankStr(this._type));
                    this._view.lab_score.textFlow = TextUtil.parseHtml(this._proxy.getBeastRankCountStr(this._type));
                    break;
            }
        }
    }
}