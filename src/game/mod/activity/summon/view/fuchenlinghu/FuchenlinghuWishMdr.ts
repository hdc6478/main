namespace game.mod.activity {

    import PropConfig = game.config.PropConfig;

    export class FuchenlinghuWishMdr extends MdrBase {
        private _view: FuchenlinghuWishView = this.mark("_view", FuchenlinghuWishView);
        private _proxy: FuchenlinghuProxy;
        private _listData: eui.ArrayCollection;
        private _seaType: SeaType;
        private _selIdx: number;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Fuchenlinghu);
            this._view.list.itemRenderer = FuchenlinghuAvatarItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn, egret.TouchEvent.TOUCH_TAP, this.onClickBtn, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
        }

        protected onShow(): void {
            super.onShow();
            this._seaType = this._showArgs;
            if (!this._seaType) {
                return;
            }
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = null;
        }

        private updateView(): void {
            let upProps = this._proxy.getUpProps(this._seaType);
            let listData: AvatarItemData[] = [];
            for (let prop of upProps) {
                let propCfg: PropConfig = getConfigById(prop[0]);
                if (propCfg && propCfg.param1) {
                    let cfg = getConfigById(propCfg.param1[0][0]);
                    listData.push({
                        cfg,
                        isBattle: false,
                        showHint: false,
                        isSel: false
                    });
                }
            }
            //上一次选中的
            if (this._proxy.up) {
                let itemData = listData[this._proxy.up - 1];
                if (itemData) {
                    itemData.isSel = true;
                }
                this._selIdx = this._proxy.up - 1;
            }
            this._listData.replaceAll(listData);
        }

        private onClickBtn(): void {
            if (this._selIdx == null) {
                return;
            }
            //跟上次选择不一样，才发协议
            if (this._selIdx + 1 != this._proxy.up) {
                this._proxy.c2s_linghu_oper(FuchenlinghuOperType.Oper3, this._selIdx + 1);
            }
            this.hide();
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let selIdx = e.itemIndex;
            if (selIdx == this._selIdx) {
                return;
            }

            let list: AvatarItemData[] = this._listData.source;
            let preData = list[this._selIdx];
            if (preData) {
                preData.isSel = false;
                this._listData.itemUpdated(preData);
            }

            let data = e.item as AvatarItemData;
            data.isSel = true;
            this._listData.itemUpdated(data);
            this._selIdx = selIdx;
        }
    }
}