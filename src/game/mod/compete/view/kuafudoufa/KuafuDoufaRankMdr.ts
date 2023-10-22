namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import GameNT = base.GameNT;
    import kuafudoufa_zhanchang_paiming = msg.kuafudoufa_zhanchang_paiming;

    export class KuafuDoufaRankMdr extends MdrBase implements UpdateItem {

        private _view: KuafuDoufaRankView = this.mark("_view", KuafuDoufaRankView);
        private _proxy: CompeteProxy;

        private _itemList: ArrayCollection;
        private _time: number;//定时请求信息
        private readonly TIME_TICK: number = 3;//定时请求信息

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = KuafuDoufaRankItem;
            this._view.list_rank.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Compete);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(CompeteEvent.KUAFU_DOUFA_SCENE_RANK_UPDATE, this.onInfoUpdate, this);
            this.onNt(SceneEvent.SCENE_CHANGE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this.reqInfo();
            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onInfoUpdate(n: GameNT): void {
            let rankList: kuafudoufa_zhanchang_paiming[] = n.body;
            if(this._itemList.source.length){
                this._itemList.replaceAll(rankList);
            }
            else {
                this._itemList.source = rankList;
            }
        }

        update(time: base.Time): void {
            this._time--;
            if (this._time <= 0) {
                this.reqInfo();
            }
        }

        private reqInfo(): void {
            this._proxy.c2s_kuafudoufa_click(KuafuDoufaOpType.SceneRank);
            this._time = this.TIME_TICK;
        }
    }
}
