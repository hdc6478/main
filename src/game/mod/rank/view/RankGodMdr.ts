namespace game.mod.rank {

    import ArrayCollection = eui.ArrayCollection;

    export class RankGodMdr extends EffectMdrBase {
        private _view: RankGodView = this.mark("_view",RankGodView);

        private _itemList: ArrayCollection;
        protected _showArgs: number;
        private _rankType: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = RankGodRender;
            this._view.list_rank.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(RankEvent.ON_RANK_REWARD_INFO_UPDATE, this.onRankRewardUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this._rankType = this._showArgs;
            this.updateItemList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onRankRewardUpdate(n: base.GameNT): void {
            let rankType: number = n.body;
            if(rankType == this._rankType){
                this.updateItemList();
            }
        }

        private updateItemList(): void {
            let infos = RankUtil.getGodInfos(this._rankType);
            if(this._itemList.source.length){
                this._itemList.replaceAll(infos);
            }
            else {
                this._itemList.source = infos;
            }
        }
    }
}