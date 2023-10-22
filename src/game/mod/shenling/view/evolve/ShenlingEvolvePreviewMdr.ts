namespace game.mod.shenling {

    import ShenlingConfig = game.config.ShenlingConfig;

    export class ShenlingEvolvePreviewMdr extends MdrBase {
        private _view: ShenlingEvolvePreviewView = this.mark("_view", ShenlingEvolvePreviewView);
        private _proxy: ShenLingProxy;
        _showArgs: ShenlingConfig;
        private _selIdx: number = 0;
        private _listData: eui.ArrayCollection;
        private _listArrow: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            // this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.list_type.itemRenderer = ShenlingEvolveTypeIcon;
            this._view.list_type.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.list_arrow.dataProvider = this._listArrow = new eui.ArrayCollection();
            this._proxy = this.retProxy(ProxyType.Shenling);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_type, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateGod, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.secondPop.updateTitleStr('进化预览');
            this.updateListData();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateListData(): void {
            if (!this._showArgs.character) {
                return;
            }
            let ary = this._showArgs.character;
            let list: IShenlingEvolveTypeIconData[] = [];
            for (let i = ary[0]; i <= ary[1]; i++) {
                list.push({
                    index: this._showArgs.index,
                    quality: i
                });
            }
            this._listData.replaceAll(list);
            this._view.list_type.selectedIndex = this._selIdx = 0;

            let arrowAry: any[] = [];
            arrowAry.length = list.length - 1;
            this._listArrow.replaceAll(arrowAry);
        }

        private getSpeQuality(): number {
            let cfg = this._showArgs;
            let initQua = cfg.character[0];
            return initQua + this._selIdx;
        }

        private updateView(): void {
            let index = this._showArgs.index;
            this._view.modelItem.updateEvolveModel(index, this.getSpeQuality());

            this.updateGod();
            let character = this._showArgs.character;
            let initQuality = character[0];//初始进化品质
            let speQuality = initQuality + this._selIdx;//进化品质
            this._view.skillItem.updateView(this._showArgs.common, speQuality, initQuality == speQuality);

            let num = character[1] - character[0] + 1;
            let numStr = StringUtil.getCNBynumber(num);
            this._view.lb_desc.text = numStr + '阶形态进化，激发无限潜力';
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selIdx) {
                return;
            }
            this._selIdx = itemIdx;
            this.updateView();
        }

        private updateGod(): void {
            let attrId = this._showArgs.attr[this._selIdx];
            let attr = RoleUtil.getAttr(attrId);
            this._view.btn_god.updateGod(attr && attr.god || 0);
        }
    }
}