namespace game.mod.yishou {

    import CheckBox = eui.CheckBox;
    import EquipmentConfig = game.config.EquipmentConfig;
    import GameNT = base.GameNT;
    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;

    export class YishouShouguDecomposeMdr extends MdrBase {
        private _view: YishouShouguDecomposeView = this.mark("_view", YishouShouguDecomposeView);
        private _proxy: YishouProxy;
        private _listIcon: eui.ArrayCollection;
        private _listBtn: eui.ArrayCollection;
        private _selIdx = 0;
        private _qualityAry = [3, 4, 5, 6, 7];
        private _checkBoxAry: CheckBox[] = [];
        private _selQualityAry: number[] = [];//选中的品质
        private _selProp: PropData[] = [];//选中的道具

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Yishou);
            this._view.list.itemRenderer = YishouShouguDecomposeIcon;
            this._view.list.dataProvider = this._listIcon = new eui.ArrayCollection();
            this._view.list_type.itemRenderer = TabSecondItem;
            this._view.list_type.dataProvider = this._listBtn = new eui.ArrayCollection();

            this._view.list.useVirtualLayout = false;

            this._checkBoxAry = [];
            let i = 0;
            while (this._view[`checkBox${i}`]) {
                this._checkBoxAry.push(this._view[`checkBox${i}`]);
                i++;
            }
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_type, eui.ItemTapEvent.ITEM_TAP, this.onClickListType, this);
            addEventListener(this._view.btn_decompose, egret.TouchEvent.TOUCH_TAP, this.onClickDecompose, this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);

            for (let checkbox of this._checkBoxAry) {
                addEventListener(checkbox, egret.TouchEvent.TOUCH_TAP, this.onClickCheckBox, this);
            }
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickListIcon, this);

            this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onBagUpdateByBagType, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initSel();

            this.updateListBtn();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = 0;
            this._selQualityAry = [];
            this._selProp = [];
            this.initScroller();
        }

        private initScroller(): void {
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;
        }

        //初始选中状态
        private initSel(): void {
            for (let checkbox of this._checkBoxAry) {
                checkbox.selected = false;
            }
            this._view.checkBox0.selected = true;
            this._selQualityAry = [this._qualityAry[0]];
            this._selProp = [];
        }

        private updateListBtn(): void {
            let ary = YishouTypeAry;
            let list: TabBaseItemData[] = [];
            for (let type of ary) {
                list.push({
                    icon: `yishou_second_tap${type}`,
                    showHint: false
                });
            }
            this._listBtn.replaceAll(list);
            this._view.list_type.selectedIndex = this._selIdx = 0;
        }

        private updateListIcon(): void {
            let type = YishouTypeAry[this._selIdx];
            let bagDatas = this._proxy.getBagDatas(type);
            bagDatas.sort((a, b) => {
                let indexA = a.index;
                let indexB = b.index;
                let qualityA = Math.floor(indexA / 10000) % 10;
                let qualityB = Math.floor(indexB / 10000) % 10;
                if (qualityA != qualityB) {
                    return qualityA - qualityB;
                }
                let starA = Math.floor(indexA / 10) % 10;
                let starB = Math.floor(indexB / 10) % 10;
                return starA - starB;
            });

            let list: IconSelManyData[] = [];
            for (let prop of bagDatas) {
                let quality = Math.floor(prop.index / 10000) % 10;
                let isSel = this._selQualityAry.indexOf(quality) > -1;//选中
                let selIdx = this._selProp.indexOf(prop);

                if (isSel) {
                    if (selIdx < 0) {
                        this._selProp.push(prop);//选中，加入选中列表
                    }
                } else {
                    if (selIdx > -1) {
                        this._selProp.splice(selIdx, 1);//没有选中且在列表中的，移除
                    }
                }

                list.push({
                    prop,
                    sel: isSel
                });
            }
            if (list.length < YishouBagCnt) {
                list.length = YishouBagCnt;
            }
            this._listIcon.source = list;
        }

        private updateView(): void {
            this.updateListIcon();
            this.updateLabel();
        }

        private updateLabel(): void {
            let list = this._selProp;
            let len = list.length;
            let cnt = 0;
            let id: number;
            if (len > 0) {
                this._view.gr_lb.visible = true;

                for (let prop of list) {
                    if (!prop) {
                        continue;
                    }
                    let cfg = prop.cfg as EquipmentConfig;
                    if (!cfg || !cfg.resolve) {
                        continue;
                    }
                    let resolve = cfg.resolve[0];
                    if (!id) {
                        id = resolve[0];
                    }
                    cnt += resolve[1];
                }

                let str = StringUtil.substitute(getLanById(LanDef.yishou_tips4), [`${TextUtil.addColor(len + '', WhiteColor.GREEN)}`]);
                this._view.lb_decompose.textFlow = TextUtil.parseHtml(str);
                this._view.lb_decomposeNum.text = cnt + '';
                let propCfg = GameConfig.getPropConfigById(id);
                if (propCfg) {
                    this._view.img_decompose.source = propCfg.icon;
                }
            } else {
                this._view.gr_lb.visible = false;
            }
        }

        private onClickDecompose(): void {
            if (!this._selProp || !this._selProp.length) {
                PromptBox.getIns().show(getLanById(LanDef.yishou_tips11));
                return;
            }
            let upQuality = this._qualityAry[2];
            let haveUpQuality = false;
            let list: Long[] = [];
            for (let prop of this._selProp) {
                let qua = Math.floor(prop.index / 10000) % 10;
                if (qua >= upQuality && !haveUpQuality) {
                    haveUpQuality = true;
                }
                list.push(prop.prop_id);
            }
            let type = YishouTypeAry[this._selIdx];
            if (haveUpQuality) {
                ViewMgr.getIns().showConfirm(getLanById(LanDef.yishou_tips12), Handler.alloc(this, this.decomposeFunc, [type, list]));
            } else {
                this.decomposeFunc(type, list);
            }
        }

        private decomposeFunc(type: number, list: Long[]): void {
            this._proxy.c2s_yishou_equip_resolve(type, list);
            this._selProp = [];//清空数据
        }

        //点击checkbox，选择品质
        private onClickCheckBox(e: egret.TouchEvent): void {
            let checkbox = e.currentTarget as eui.CheckBox;
            let idx = this._checkBoxAry.indexOf(checkbox);
            let quality = this._qualityAry[idx];//点击的品质
            let selIdx = this._selQualityAry.indexOf(quality);
            let select = checkbox.selected;//状态
            if (select) {
                if (selIdx < 0) {
                    this._selQualityAry.push(quality);
                }
            } else {
                if (selIdx > -1) {
                    this._selQualityAry.splice(selIdx, 1);
                }
            }

            this.updateView();
        }

        //点击底部类型按钮
        private onClickListType(e: eui.ItemTapEvent): void {
            let idx = e.itemIndex;
            if (this._selIdx == idx) {
                return;
            }
            let type = YishouTypeAry[idx];
            if (!this._proxy.checkTypeActed(type, true)) {
                this._view.list_type.selectedIndex = this._selIdx;
                return;
            }
            this._selIdx = idx;
            this.initSel();
            this.initScroller();
            this.updateView();
        }

        //点击装备icon
        private onClickListIcon(e: eui.ItemTapEvent): void {
            let item = e.item as IconSelManyData;
            if (!item) {
                return;
            }
            let isSel = !item.sel;//状态反转
            let selIdx = this._selProp.indexOf(item.prop);
            if (isSel) {
                if (selIdx < 0) {
                    this._selProp.push(item.prop);
                }
            } else {
                if (selIdx > -1) {
                    this._selProp.splice(selIdx, 1);
                }
            }
            item.sel = isSel;
            this._listIcon.itemUpdated(item);
            this.updateLabel();
        }

        private onBagUpdateByBagType(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(BagType.Yishou) > -1) {
                this.initSel();
                this.updateView();
            }
        }
    }
}