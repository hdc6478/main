namespace game.mod.role {
    import ArrayCollection = eui.ArrayCollection;
    import DressConfig = game.config.DressConfig;
    import TouchEvent = egret.TouchEvent;
    import attributes = msg.attributes;
    import LanDef = game.localization.LanDef;
    import ItemTapEvent = eui.ItemTapEvent;
    import ParamConfig = game.config.ParamConfig;

    export class DressUpInfoMdr extends MdrBase {
        protected _view: DressUpInfoView = this.mark("_view", DressUpInfoView);
        private _proxy: DressUpProxy;
        protected _dressCol: ArrayCollection;
        private _typeList: ArrayCollection;
        private curIndex: number;
        private _data: DressConfig[][];
        /**当前选中的外显类型*/
        private _selType: number;

        protected _type: DressUpType = DressUpType.Head;

        //private _selectedIndex:number;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.DressUp);

            this._view.touchEnabled = false;

            this._typeList = new ArrayCollection();
            this._view.list_menu.itemRenderer = TabSecondItem;
            this._view.list_menu.dataProvider = this._typeList;

            this._view.btn_act.setLabelStyle3({size: 24, textColor: 0x8a5226});
            this._view.btn_dress.setLabelStyle3({size: 28, textColor: 0x8a5226});

            this.onInitDressList();

            this._view.grp_head.visible = true;
            this._view.grp_bubble.visible = false;
        }

        protected onInitDressList(): void {
            this._view.dressList.dataProvider = this._dressCol = new ArrayCollection();
            this._view.dressList.itemRenderer = DressUpItemIcon;
            this._view.dressList.itemRendererSkinName = "skins.role.DressUpItemSkin";
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            // addEventListener(this._view.dressList, DressUpEvent.DRESS_UP_ITEM_CLICK_BACK, this.updateItemSel);
            addEventListener(this._view.dressList, ItemTapEvent.ITEM_TAP, this.updateItemSel);
            addEventListener(this._view.list_menu, ItemTapEvent.ITEM_TAP, this.updateItemType);
            addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onTap);
            addEventListener(this._view.btn_dress, egret.TouchEvent.TOUCH_TAP, this.onDress);
            this.onNt(DressUpEvent.DRESS_UP_INFO_UPDATE, this.updateView, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateAttr, this);
        }

        protected onShow(): void {
            super.onShow();
            this.initTypeList();
            this.setListData();

            this._view.dressList.selectedIndex = 0;
            this.curIndex = this._dressCol.source[this._view.dressList.selectedIndex].index;
            this._proxy.selectedIndex = this.curIndex;
            this._proxy.curIdxList[this._type - 1] = this.curIndex;

            this.updateDressInfo();
        }

        private initTypeList(): void {
            let datas = this._proxy.getTypes(this._type);
            let typeDatas: TabBaseItemData[] = [];
            for (let i = 0; i < datas.length; i++) {
                let icon = "dress_type_" + datas[i];
                typeDatas.push({icon});
            }
            this._typeList.source = typeDatas;

            this._selType = datas[0];
            this._view.list_menu.selectedIndex = 0;
            // this._selIndex = 0;
        }

        private updateView() {
            this.setListData();
            this.updateDressInfo();
        }

        private updateDressInfo() {
            this.updateShowRes();
            this.updateAttr();
            this.updateStateView();
            this.updateTypeListHint();
        }

        private getDressUpCfg(idx: number): DressConfig {
            return getConfigByNameId(ConfigName.DressUp, idx);
        }

        private updateStateView(): void {
            if (!this.curIndex) {
                this._view.costItem.visible = this._view.btn_act.visible
                    = this._view.btn_dress.visible = this._view.img_state.visible = false;
            }

            //未激活不出现穿戴按钮
            let info = this._proxy.getDressByIdx(this.curIndex);
            let cfg: DressConfig = this.getDressUpCfg(this.curIndex);
            if (!cfg) {
                return;
            }
            let str: string = `${cfg.name}`;
            if (info && info.lv) {
                str += ` ${info && info.lv || 0}星`;
            }
            this._view.lab_name.text = str;

            //未激活不出现穿戴按钮
            let isDress = this._proxy.head == this.curIndex || this._proxy.head_frame == this.curIndex
                || this._proxy.chat_frame == this.curIndex;
            this._view.btn_dress.visible = info && info.lv > 0 && !isDress;
            this._view.btn_dress.label = getLanById(LanDef.soul1);

            let param: ParamConfig = GameConfig.getParamConfigById("liaotianzhuangban_shangxian");
            let isMax = info && info.lv == param.value;//已满星
            this._view.img_state.visible = !info || info.lv < 1 || isMax;
            if (!info || info.lv < 1) {
                this._view.img_state.source = 'hongseweijihuo';
                this._view.img_state.x = 452;
            } else if (isMax) {
                this._view.img_state.source = 'lvseyimanxing';
                this._view.img_state.x = 120;
            }

            this._view.costItem.visible = this._view.btn_act.visible = !isMax && !!cfg.material;
            if (isMax || !cfg.material) {
                return;
            }
            let cost = cfg.material[0];
            this._view.costItem.data = cost;
            let bagCnt = BagUtil.getPropCntByIdx(cost[0]);
            let costCnt = cost[1];
            let color = bagCnt >= costCnt ? BlackColor.GREEN : BlackColor.RED;
            this._view.costItem.updateCnt(TextUtil.addColor(`${StringUtil.getHurtNumStr(costCnt)}`, color));
            this._view.btn_act.label = getLanById(info && info.lv ? LanDef.upstar : LanDef.active);
            this._view.btn_act.setHint(this._proxy.canActOrUpStar(cfg.index));

            if (cfg.activation_param) {
                let _proxy: IShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
                let shenling = _proxy.getInfoByIndex(cfg.activation_param[0]);
                let isActed: boolean = shenling && shenling.star >= cfg.activation_param[1];
                if (!isActed) {
                    let cfg_shenling: game.config.ShenlingConfig = getConfigByNameId(ConfigName.Shenling, cfg.activation_param[0]);
                    this._view.lab_tips.text = `${cfg_shenling.name}${cfg.activation_param[1]}星可激活`;
                    return;
                }
            }
            this._view.lab_tips.text = "";
        }

        private setListData() {
            // this._data = this._proxy.getDressData();
            // let selectedIndex = this.computerNumber();
            // this._dressCol.replaceAll(this._data);
            let list = this._proxy.getDressList(this._type, this._selType);
            this._dressCol.replaceAll(list);
            // this.showTheIndex(0);
        }

        private isHint(data: DressConfig[]): boolean {

            if (!data) {
                return false;
            }

            for (let i = 0; i < data.length; i++) {
                let d = data[i];
                if (!d) {
                    continue;
                }

                let ret = this._proxy.canActOrUpStar(data[i].index);
                if (ret) {
                    this.curIndex = data[i].index;
                    this._proxy.selectedIndex = this.curIndex;
                    return true;
                }
            }
            return false;
        }

        //处理数据
        private computerNumber(): number {
            let selectedIndex = 0;
            let ret = false;
            for (let i = 0; i < this._data.length; i = i + 2) {
                let d1 = this._data[i];
                let d2 = this._data[i + 1];
                if (this.isHint(d1) || this.isHint(d2)) {
                    ret = true;
                    break;
                }
                selectedIndex++;
            }

            if (!ret) {
                this.curIndex = null;
                this._proxy.selectedIndex = null;
                return 0;
            }
            return selectedIndex;
        }

        //展示到特定的那一行
        private showTheIndex(selectedIndex: number): void {
            let self = this;
            egret.callLater(() => {
                ScrollUtil.moveVToAssign(self._view.dressScroller, selectedIndex, 148, 10);
            }, this);
        }

        // 界面显示装扮效果
        private updateShowRes() {
            let defIcon = [this._proxy.head, this._proxy.head_frame, this._proxy.chat_frame];
            let curIdxList: number[] = this._proxy.curIdxList;
            for (let i = 0; i < 3; i++) {
                let index: number = curIdxList[i] ? curIdxList[i] : defIcon[i];
                this.showResByIndex(index);
            }
        }

        // 更新显示装扮
        private showResByIndex(index: number) {
            let _type: number = this._proxy.getDressTypeByIdx(index);
            let _cfg: DressConfig = this.getDressUpCfg(index);
            let _resStr: string = _cfg ? ResUtil.getDressUpIcon(index, RoleVo.ins.sex) : "";
            if (_type == DressUpType.Bubble) {
                this._view.img_bubble.source = _resStr;
                this._view.lbl_bubbleName.text = _cfg.name;
            } else if (_type == DressUpType.Head) {
                this._view.img_head.source = _resStr;
            } else {
                this._view.img_frame.source = _resStr;
            }
        }

        private updateAttr() {
            let _attr: attributes = this._proxy.getDressAttrs(this.curIndex ? this.curIndex : null);
            if (!_attr) {
                let cfg: DressConfig = getConfigByNameId(ConfigName.DressUp, this.curIndex);
                if (cfg && cfg.attr_id) {
                    _attr = RoleUtil.getAttr(cfg.attr_id[0]);
                }
            }
            this._view.power.setPowerValue(_attr && _attr.showpower || 0);

            let txt = TextUtil.getAttrTextAdd(_attr);
            this._view.lb_attr.textFlow = TextUtil.parseHtml(txt);
        }

        //升星/激活
        private onTap() {
            let cfg: DressConfig = this.getDressUpCfg(this.curIndex);
            if (!cfg || !cfg.material) {
                return;
            }
            if (cfg.activation_param) {
                let _proxy: IShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
                let shenling = _proxy.getInfoByIndex(cfg.activation_param[0]);
                let isActed: boolean = shenling && shenling.star >= cfg.activation_param[1];
                if (!isActed) {
                    let cfg_shenling: game.config.ShenlingConfig = getConfigByNameId(ConfigName.Shenling, cfg.activation_param[0]);
                    PromptBox.getIns().show(`${cfg_shenling.name}${cfg.activation_param[1]}星可激活`);
                    return;
                }
            }
            let cost = cfg.material[0];
            if (!BagUtil.checkPropCnt(cost[0], cost[1], PropLackType.Text)) {
                return;
            }
            this._proxy.c2s_base_surface_lvup(Long.fromNumber(this.curIndex), Long.fromNumber(cost[0]));
        }

        private onDress(): void {
            let dress = this._proxy.getDressByIdx(this.curIndex);
            if (!dress || !dress.lv) {
                return;
            }
            this._proxy.c2s_base_surface_change(Long.fromNumber(this.curIndex));
        }

        // 装扮item点击
        private updateItemSel(e: ItemTapEvent) {
            let cfg: DressConfig = e.item;
            this.curIndex = cfg.index;
            this._proxy.selectedIndex = this.curIndex;
            this._proxy.curIdxList[this._type - 1] = this.curIndex;
            // if (n && n.data) {
            //     this.curIndex = n.data;
            //     this._proxy.selectedIndex = this.curIndex;
            // }
            // this._dressCol.replaceAll(this._dressCol.source);
            this.updateDressInfo();
        }

        private updateItemType(e: ItemTapEvent): void {
            let datas = this._proxy.getTypes(this._type);
            this._view.list_menu.selectedIndex = e.itemIndex;
            this._selType = datas[e.itemIndex];

            this.setListData();

            this._view.dressList.selectedIndex = 0;
            this.curIndex = this._dressCol.source[this._view.dressList.selectedIndex].index;
            this._proxy.selectedIndex = this.curIndex;
            this._proxy.curIdxList[this._type - 1] = this.curIndex;

            this.updateDressInfo();
        }

        private updateTypeListHint(): void {
            let datas = this._proxy.getTypes(this._type);
            let list: TabBaseItemData[] = this._typeList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                let type2: number = datas[i];
                let btnData = list[i];
                let hint = this._proxy.getTypeHint(this._type, type2);
                btnData.strCount = `${this._proxy.getDressActLen(this._type, type2)}/${this._proxy.getDressLen(this._type, type2)}`;
                if (!!btnData.showHint != hint) {//过滤undefined!=false
                    btnData.showHint = hint;
                    this._typeList.itemUpdated(btnData);
                }
            }
        }

        protected onHide(): void {
            this._proxy.curIdxList.length = 0;
            this.curIndex = null;
            this._proxy.selectedIndex = null;
            //this._selectedIndex = -1;
            super.onHide();
        }
    }
}