namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;

    export class PunshListRankSectionMdr extends EffectMdrBase {
        private _view: RankSectionView = this.mark("_view", RankSectionView);

        private _itemList: ArrayCollection;

        private _section: string;
        public _showArgs: {
            rank: string,
            list: IRankSectionData[],
            strRank: string,
            strScore: string
        };

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list.itemRenderer = RankSectionItem;
            this._view.list.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            this.onNt(ActivityEvent.ON_UPDATE_RANK, this.onRankUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.scroller.viewport.scrollV = 0;
            this._section = this._showArgs.rank;
            this._view.secondPop.updateTitleStr(getLanById(LanDef.pass_rank));
            this.onRankUpdate();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onRankUpdate(): void {
            this._view.lab_rank.textFlow = TextUtil.parseHtml(this._showArgs.strRank);
            this._view.lab_score.textFlow = TextUtil.parseHtml(this._showArgs.strScore);
            this._itemList.replaceAll(this._showArgs.list);

            let proxy: PunshListProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.PunshList);
            this._view.img_type2.source = `chongbang_power_${proxy.type}`

            // todo
            // this._view.img_type2
        }
    }
}