namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import SummonProxy = game.mod.activity.SummonProxy;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;

    export class SummonRankSectionMdr extends EffectMdrBase {
        private _view: RankSectionView = this.mark("_view", RankSectionView);

        private _itemList: ArrayCollection;
        private _proxy: SummonProxy;

        private _section: string;

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Summon);

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
            this._section = this._showArgs.rank;
            this._view.secondPop.updateTitleStr(getLanById(LanDef.pass_rank));
            this.onRankUpdate();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onRankUpdate(): void {
            if (this._section) {
                this._itemList.source = this._proxy.getListBySection(this._section);
            }
            this._view.lab_rank.text = `我的排名：${this._proxy.myRank}`;
            this._view.lab_score.text = `我的积分：${this._proxy.myRankCount}`;
        }
    }
}