namespace game.mod.enhance {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import ItemTapEvent = eui.ItemTapEvent;
    import PropConfig = game.config.PropConfig;
    import attributes = msg.attributes;
    import gem_data = msg.gem_data;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;

    export class GemSynMdr extends MdrBase {
        private _view: GemSynView = this.mark("_view", GemSynView);
        private _proxy: EnhanceProxy;
        private _model: EnhanceModel;

        private _bagList: ArrayCollection;
        private _curBagPos: number;
        private _isCanMergeOneKey: boolean;

        protected _showArgs: { eqPos: number, gemPos: number };

        private _settedGem: gem_data;           // 当前槽位的镶嵌的宝石
        private _curWearGemId: number = 0;      // 当前槽位的镶嵌的宝石id
        private _selectIdx: number = -1;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.verticalCenter = 0;
            this._view.horizontalCenter = 0;

            this._bagList = new ArrayCollection();
            this._view.list_bag.dataProvider = this._bagList;
            this._view.list_bag.itemRenderer = GemSynRender;

            this._proxy = this.retProxy(ProxyType.Enhance);
            this._model = this._proxy.getModel();
        }

        protected addListeners(): void {
            super.addListeners();

            this.onNt(EnhanceEvent.UPDATE_GEM_INFO, this.updateGemBag, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onUpdateBag, this);
            this.onNt(EnhanceEvent.ON_GEM_ATTR_BACK, this.updateCurAttr, this);
            
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn_off, TouchEvent.TOUCH_TAP, this.onClickOff);
            addEventListener(this._view.btn_merge, TouchEvent.TOUCH_TAP, this.onClickMerge);
            addEventListener(this._view.btn_one_key_merge, TouchEvent.TOUCH_TAP, this.onClickOneKeyMerge);
            addEventListener(this._view.list_bag, ItemTapEvent.ITEM_TAP, this.onClickGem);
        }

        protected onShow(): void {
            super.onShow();
            this.updateGemBag();
        }

        protected onHide(): void {
            this._selectIdx = -1;
            super.onHide();
        }

        //背包列表
        private updateGemBag() {
            this._settedGem = this._model.getGemHoleInfo(this._showArgs.eqPos, this._showArgs.gemPos);
            let prop: PropData = this._settedGem && this._settedGem.index ? PropData.create(this._settedGem.index) : null;
            this._curWearGemId = this._model.getCurGemId(this._showArgs.eqPos, this._showArgs.gemPos);

            let bagDatas: PropData[] = BagUtil.getBagsByType(BagType.Gem);
            bagDatas.sort(this.sortGemBagList);

            let list: PropData[] = prop ? [prop] : [];
            list = list.concat(bagDatas);

            // let b = this._proxy.getGemsByType(PropSubType4.Type2);
            let list1: PropData[] = [];
            let selIdx = -1;
            for(let i = 0, len = list.length; i < len; i++) {
                let d = list[i];
                let type2  = this._proxy.getGemType(d.index);
                if(this._showArgs.gemPos == type2 - 1) {
                    list1.push(d);
                }
                if(selIdx == -1 && d.index == this._curWearGemId) {
                    selIdx = i;
                }
            }

            if (!this._bagList.source.length) {
                this._bagList.source = list1;
            } else {
                this._bagList.replaceAll(list1);
            }

            if(this._selectIdx != -1) {
                this._view.list_bag.selectedIndex = this._selectIdx;
                this.updateCurSelect(this._selectIdx, this._curWearGemId);
            } else if(selIdx != -1) {
                this._view.list_bag.selectedIndex = selIdx;
                this.updateCurSelect(selIdx, this._curWearGemId);
                this._selectIdx = selIdx;
            } else if(list1.length) {
                this._view.list_bag.selectedIndex = 0;
                this.updateCurSelect(0, list1[0].index);
            } else {
                this.updateCurSelect();
            }
            this._isCanMergeOneKey = this._view.btn_one_key_merge.redPoint.visible = 
                (this._proxy.checkGemAKeySynHint(list1) && list1.length > 0);
        }

        private sortGemBagList(a: PropData, b: PropData) {
            return (a == null && b != null) || (a != null && b != null && b.index > a.index) ? 1 : -1;
        }

        //当前选中
        private updateCurSelect(bagPos: number = -1, gemId: number = -1) {
            let prop: PropData = this._bagList.source[bagPos];
            if(bagPos == -1 || gemId == -1 || !prop) {
                this._view.icon_tar.setData(null);
                this.updateGemAttrShow(null);
                this._view.lab_name.text = "";
                this._view.btn_off.label = getLanById(LanDef.set);
                this._view.btn_off.redPoint.visible = false;
                this._view.btn_merge.redPoint.visible = false;
                return;
            }

            this._curBagPos = bagPos;
            this._view.icon_tar.setData(prop);
            let isSetted: boolean = (bagPos == 0) && (gemId == this._curWearGemId) && this._curWearGemId > 0;     // 是否镶嵌
            this._view.btn_off.label = getLanById(isSetted ? LanDef.disboard : LanDef.set);

            let propCfg: PropConfig = prop ? prop.cfg : null;
            this._view.lab_name.textFlow = propCfg ?
                TextUtil.parseHtml(TextUtil.addColor(propCfg.name, ColorUtil.getColorByQuality(prop.quality))) : null;

            let attr: attributes = propCfg ? this._proxy.getGemAttr(propCfg.index) : null;
            if (attr) {
                this.updateGemAttrShow(attr);
            }

            this._view.btn_off.redPoint.visible = isSetted ? false : this._proxy.gemSettledHint(this._settedGem, prop);
            this._view.btn_merge.redPoint.visible = this._proxy.checkGemSynHint(prop);
        }

        private updateGemAttrShow(attr: attributes) {
            this._view.lab_des.textFlow = TextUtil.parseHtml(TextUtil.getAttrText(attr));
        }
        
        private updateCurAttr(n: GameNT) {
            this.updateGemAttrShow(n.body);
        }

        private onUpdateBag(n?: GameNT): void {
            let types = n && (n.body as number[]);
            if (!types || !types.length || types.indexOf(BagType.Gem) < 0) {
                return;
            }
            this.updateGemBag();
        }

        private onClickOff() {
            let prop: PropData = this._bagList.source[this._curBagPos];
            if (!prop) {
                return;
            }

            if (prop && (prop.index == this._curWearGemId) && this._curBagPos == 0) {
                this._proxy.c2s_equip_gem_takeoff(this._showArgs.eqPos, this._showArgs.gemPos + 1);
            } else {
                this._proxy.c2s_equip_gem_takeon(this._showArgs.eqPos, this._showArgs.gemPos + 1, prop.prop_id);
            }
        }

        private onClickMerge() {
            let prop: PropData = this._bagList.source[this._curBagPos];
            let isSetted: boolean = prop && (prop.index == this._curWearGemId);
            if (isSetted) {
                this._proxy.c2s_equip_gem_combine(this._showArgs.eqPos, this._showArgs.gemPos + 1, null, null);
            } else if(prop) {
                this._proxy.c2s_equip_gem_combine(null, null, prop.index, 1);
            }
        }

        private onClickOneKeyMerge() {
            if (!this._isCanMergeOneKey) {
                PromptBox.getIns().show("暂无可合成的宝石");
                return;
            }
            this._proxy.c2s_equip_gem_combine(null, this._showArgs.gemPos + 1, null, 2);
        }

        private onClickGem(e: ItemTapEvent) {
            if (this._curBagPos == e.itemIndex) {
                return;
            }
            this._selectIdx = e.itemIndex;
            this.updateCurSelect(e.itemIndex, e.item.index);
        }

    }
}