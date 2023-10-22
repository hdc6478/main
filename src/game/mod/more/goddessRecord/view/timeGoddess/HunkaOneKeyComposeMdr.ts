namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import ItemTapEvent = eui.ItemTapEvent;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;

    export class HunkaOneKeyComposeMdr extends MdrBase{
        private _view: HunkaOneKeyComposeView = this.mark("_view", HunkaOneKeyComposeView);
        private _proxy: GoddessRecordProxy;
        private _itemList: ArrayCollection;
        private _btnList: ArrayCollection;
        private _selType: number;/**当前选中的类型*/
        private _ids: Long[];//合成选中
        private _infos: PropData[];//缓存的数据

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.GoddessRecord);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = HunkaSelIcon;
            this._view.list_item.dataProvider = this._itemList;

            this._btnList = new ArrayCollection();
            this._view.list_type.dataProvider = this._btnList;
            this._view.list_type.itemRenderer = BtnTabItem;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
            addEventListener(this._view.btn_compose, TouchEvent.TOUCH_TAP, this.onClickCompose);

            this.onNt(GoddessRecordEvent.ON_UPDATE_HUNKA_COMPOSE, this.updateSel, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initTypeList();
            this.initCheckGrp();
            this.updateSel();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickCompose(): void {
            if(this._ids.length < 2){
                PromptBox.getIns().show(getLanById(LanDef.hunka_tips20));
                return;
            }
            this._proxy.c2s_chuang_shi_nv_shen_hun_ka_click(HunkaOpType.OneKeyCompose, undefined, undefined, undefined, this._ids);
        }

        private onClickType(e: ItemTapEvent) {
            let type = e.itemIndex;
            if(type == this._selType){
                return;
            }
            this._selType = type;
            this.updateSel();
        }

        private initTypeList(): void {
            let datas: BtnTabItemData[] = [];
            for(let i = 0; i <= PropSubType38.Shenhun3; ++i){
                let name = getLanById("hunka_tips" + i);
                datas.push({name: name});
            }
            this._btnList.source = datas;

            this._selType = 0;
            this._view.list_type.selectedIndex = this._selType;
        }

        private initCheckGrp(): void {
            let addEventListener = this.onEgret.bind(this);
            let radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
            addEventListener(radioGroup, eui.UIEvent.CHANGE, this.radioChangeHandler);
            for(let i = 0; i < 5; ++i){
                let selItem: eui.RadioButton = this._view["sel" + i];
                selItem.group = radioGroup;
                let quality = QualityType.ORANGE + i;
                selItem.value = quality;
                let label = selItem.labelDisplay as eui.Label;
                let labelStr = TextUtil.addColor(label.text, ColorUtil.getColorByQuality1(quality));
                label.textFlow = TextUtil.parseHtml(labelStr);
                label.stroke = 1;
                label.strokeColor = 0x000000;
            }
            this._view.sel0.selected = true;//默认选中第一个
            this._proxy.hunkaSelQuality = QualityType.ORANGE;
        }

        private radioChangeHandler(evt:eui.UIEvent):void {
            let radioGroup: eui.RadioButtonGroup = evt.target;
            this._proxy.hunkaSelQuality = radioGroup.selectedValue;
            this.updateItemListSel();
            this.updateTips();
        }

        private updateSel(): void {
            this.updateItemList();
            this.updateTips();
        }

        private updateItemList(): void {
            let type = this._selType;
            let infos: PropData[];
            if(!type){
                infos = BagUtil.getBagsByType(BagType.Hunka, true);
            }
            else {
                infos = BagUtil.getBagsByTypeAndPropSubType(BagType.Hunka, type, true);
            }
            this._infos = infos.concat();//缓存数据
            if(this._itemList.source.length){
                this._itemList.replaceAll(infos);
            }
            else {
                this._itemList.source = infos;
            }
            let isShow = infos.length <= 0;
            this._view.hunkaNone.visible = isShow;
            if(isShow){
                this._view.hunkaNone.updateHunkaNoneView(Handler.alloc(this, this.hide));
            }
        }

        private updateTips(): void {
            this._ids = [];
            for(let prop of this._infos) {
                if(prop.quality == this._proxy.hunkaSelQuality){
                    this._ids.push(prop.prop_id);
                }
            }
            let selNum = this._ids.length;
            let cntStr = TextUtil.addColor("(" + selNum + ")", WhiteColor.GREEN);
            let tipStr = StringUtil.substitute(getLanById(LanDef.hunka_tips13), [cntStr]);
            this._view.lab_tips.textFlow = TextUtil.parseHtml(tipStr);
        }

        private updateItemListSel(): void {
            this._itemList.replaceAll(this._itemList.source);
        }
    }
}