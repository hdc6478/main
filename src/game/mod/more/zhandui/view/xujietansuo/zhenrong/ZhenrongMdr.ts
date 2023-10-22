namespace game.mod.more {


    export class ZhenrongMdr extends MdrBase {
        private _view: ZhenrongView = this.mark("_view", ZhenrongView);
        private _proxy: XujieTansuoProxy;
        private _listBtn: eui.ArrayCollection;
        private _listShenling: eui.ArrayCollection;
        private _listHuashen: eui.ArrayCollection;
        private _listAttr: eui.ArrayCollection;
        private _selIdx: number;
        private _legionTypeAry: LegionType[];
        //todo
        private _btnData: TabBaseItemData[] = [
            {
                icon: "tubiao_shenling",
                param: LegionType.Shenling
            },
            {
                icon: "tubiao_huashen",
                param: LegionType.Huashen
            },
            {
                icon: "tubiao_nvshen",
                param: LegionType.Nvshen
            }
        ];

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);

            this._view.list_btn.itemRenderer = TabSecondItem;
            this._view.list_btn.dataProvider = this._listBtn = new eui.ArrayCollection();

            this._view.list_shenling.itemRenderer = ZhenrongItem;
            this._view.list_shenling.dataProvider = this._listShenling = new eui.ArrayCollection();

            this._view.list_huashen.itemRenderer = ZhenrongItem;
            this._view.list_huashen.dataProvider = this._listHuashen = new eui.ArrayCollection();

            this._view.list_attr.itemRenderer = AttrItemRender;
            this._view.list_attr.dataProvider = this._listAttr = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            addEventListener(this._view.btn_onekey, egret.TouchEvent.TOUCH_TAP, this.onClickOnekey, this);
            addEventListener(this._view.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.list_btn, eui.ItemTapEvent.ITEM_TAP, this.onClickListBtn, this);
            addEventListener(this._view.list_shenling, eui.ItemTapEvent.ITEM_TAP, this.onClickModel, this);
            addEventListener(this._view.list_huashen, eui.ItemTapEvent.ITEM_TAP, this.onClickModel, this);

            this.onNt(MoreEvent.ON_UPDATE_ZHENRONG_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this._legionTypeAry = LegionTypeAry;
            this.updateListBtn();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateView(): void {
            this.updateView();

            this._view.btn_onekey.setHint(this._proxy.getZhenrongHint());
        }

        private updateView(): void {
            let type = this._legionTypeAry[this._selIdx];
            let isShenling = type == LegionType.Shenling;
            this._view.list_shenling.visible = isShenling;
            this._view.list_huashen.visible = !isShenling;

            let actedList = this._proxy.getShangzhenIdList(type);
            actedList.length = LegionTypeCnt[type];
            if (isShenling) {
                this._listShenling.replaceAll(actedList);
            } else if (!isShenling) {
                this._listHuashen.replaceAll(actedList);
            }
            this.updatePower();
        }

        //todo
        private updatePower(): void {
            let power: Long;
            let legionAttr = this._proxy.legion_attr;
            let attr = new msg.attributes();
            if (legionAttr) {
                let keys = Object.keys(legionAttr);
                for (let key of keys) {
                    attr[key] = legionAttr[key];
                }
                power = legionAttr.legion_god;
            }
            this._view.godPower.setPowerValue(power || 0);

            let attrList: string[] = [];
            if (attr && Object.keys(attr).length) {
                let keys: string[] = TextUtil.getAttrOrderKeys(attr);
                for (let i = 0; i < keys.length; i++) {
                    let k = keys[i];
                    let a = TextUtil.getAttrsText(k);
                    let val = attr[k];
                    let v = TextUtil.getAttrsPerCent(k, val);
                    attrList.push(TextUtil.addColor(a, 0xdaecfa) + TextUtil.addColor(' +' + v, 0x00ff48));
                }
            }

            this._listAttr.replaceAll(attrList);
        }

        private updateListBtn(): void {
            this._listBtn.replaceAll(this._btnData);
            this._view.list_btn.selectedIndex = this._selIdx = 0;
        }

        private onClickOnekey(): void {
            this._proxy.sendShangzhenOnekey();
        }

        private onClickAttr(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.ZhenrongAttr);
        }

        private onClickListBtn(e: eui.ItemTapEvent): void {
            let idx = e.itemIndex;
            if (idx == this._selIdx) {
                return;
            }
            //化神、女神开启否
            if ((this._legionTypeAry[idx] == LegionType.Huashen && !this._proxy.isHuashenOpen(true))
                || (this._legionTypeAry[idx] == LegionType.Nvshen && !this._proxy.isNvshenOpen(true))) {
                this._view.list_btn.selectedIndex = this._selIdx;
                return;
            }
            this._selIdx = idx;
            this.updateView();
        }

        private onClickModel(): void {
            let type = this._legionTypeAry[this._selIdx];//第几个页签，传入number也可
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.ZhenrongShangzhen, type);
        }
    }
}