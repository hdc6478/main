namespace game.mod.more {

    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;

    export class XujieJitanShelfMdr extends MdrBase {
        private _view: XujieJitanShelfView = this.mark("_view", XujieJitanShelfView);
        private _proxy: XujieJitanProxy;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieJitan);
            this._view.list.itemRenderer = XujieJitanShelfItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onBagUpdateByBagType, this);
            this.onNt(MoreEvent.ON_CLOSE_ZHANDUI_JITAN_SHELF, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.secondPop.updateTitleStr(getLanById(LanDef.xujiejitan_tips4));
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let datas = this._proxy.getBagDatas();
            datas.sort((a, b) => {
                if (a.quality != b.quality) {
                    return b.quality - a.quality;
                }
                return a.index - b.index;
            });
            this._listData.replaceAll(datas);
        }

        //todo
        private onClick(): void {
            let prop: number[] = [];
            let num = this._proxy.getSpaceCount();
            let source: PropData[] = this._listData.source || [];
            for (let i = 0; i < source.length; i++) {
                if (num <= 0) {
                    break;
                }
                let info = source[i];
                let len = num > info.count ? info.count : num;
                for (let i = 0; i < len; i++) {
                    prop.push(info.index);
                }
                num -= info.count;
            }
            if (prop && prop.length) {
                this._proxy.sendJitanButtonClick(ZhanduiOperType.Oper200, null, null, prop);
                this.hide();
            }
        }

        private onBagUpdateByBagType(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(BagType.XujieJitan) > -1) {
                this.updateView();
            }

        }
    }
}