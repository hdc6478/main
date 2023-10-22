namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import HuashenTianfuConfig = game.config.HuashenTianfuConfig;
    import HuashenTianfuLeixingConfig = game.config.HuashenTianfuLeixingConfig;
    import TouchEvent = egret.TouchEvent;
    import Event = egret.Event;
    import LanDef = game.localization.LanDef;
    import BuffConfig = game.config.BuffConfig;

    export class HuashenTianfuMdr extends MdrBase {
        private _view: HuashenTianfuView = this.mark("_view", HuashenTianfuView);
        private _proxy: HuashenProxy;

        private _btnList: ArrayCollection;
        private _itemList: HuashenTianfuItem[] = [];

        private _selType: number;/**当前选中的类型*/
        private _selIndex: number;/**当前选中的下标*/
        private _selCfg: HuashenTianfuConfig;/**当前选中的配置*/
        private _cfgList: HuashenTianfuLeixingConfig[];
        private _maxNum: number = 7;
        private _cost: number[];

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._view.touchEnabled = false;

            this._btnList = new ArrayCollection();
            this._view.list_type.itemRenderer = HuashenTianfuTabItem;
            this._view.list_type.dataProvider = this._btnList;

            this._proxy = this.retProxy(ProxyType.Huashen);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
            this._itemList = [];
            for(let i = 1; i <= this._maxNum; ++i){
                let btn = this._view["item" + i];
                this._itemList.push(btn);
                addEventListener(btn, TouchEvent.TOUCH_TAP, this.onClickIcon);
            }
            addEventListener(this._view.list_type, Event.CHANGING, this.onClickType);
            this.onNt(HuashenEvent.ON_UPDATE_HUASHEN_TIANFU_INFO, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this.initTypeList();
            this.typeUpdateInfo();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickUp(): void {
            if(!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])){
                return;
            }
            if(!this._selCfg){
                return;
            }
            this._proxy.c2s_huashen_levelup(this._selCfg.index);
        }

        private onClickIcon(e: TouchEvent): void {
            let imgBg = e.target;
            for(let i = 0; i < this._itemList.length; ++i) {
                let btn = this._itemList[i];
                if(btn.img_bg == imgBg){
                    if(this._selIndex == i){
                        return;
                    }
                    this._selIndex = i;
                    this.indexUpdateInfo();
                    break;
                }
            }
        }

        private onInfoUpdate(): void {
            this.typeUpdateInfo();
            this.updateTypeListHint();
        }

        private onClickType(e: egret.Event) {
            let cfg: HuashenTianfuLeixingConfig = this._view.list_type.selectedItem;
            if (!this._proxy.isTianfuTypeOpen(cfg, true)) {
                e.preventDefault();
                return;
            }
            let type = cfg.type;
            if(type == this._selType){
                return;
            }
            this._selType = type;
            this._selIndex = 0;
            this.typeUpdateInfo();
        }

        private initTypeList(): void {
            this._cfgList = getConfigListByName(ConfigName.HuashenTianfuLeixing);
            this._btnList.source = this._cfgList;

            this._selType = 1;
            this._view.list_type.selectedIndex = this._selType - 1;
            this._selIndex = 0;
        }

        private updateTypeListHint(): void {
            this._btnList.replaceAll(this._btnList.source);
        }

        private typeUpdateInfo(): void {
            this.updateItemList();
            this.indexUpdateInfo();
        }

        private updateItemList(): void {
            let items = this._proxy.getTianfuCfgList(this._selType);
            for(let i = 0; i < this._itemList.length && i < items.length; ++i) {
                let btn = this._itemList[i];
                let data = items[i];
                btn.data = data;
            }
            //todo
            //this._selIndex = 0;
        }

        private indexUpdateInfo(): void {
            let items = this._proxy.getTianfuCfgList(this._selType);
            this._selCfg = items[this._selIndex];
            if(!this._selCfg){
                return;
            }
            this.updateItemSel();
            this.updateDesc();
        }

        private updateItemSel(): void {
            for(let i = 0; i < this._itemList.length; ++i) {
                let btn = this._itemList[i];
                let sel = this._selIndex == i;
                btn.img_sel.visible = sel;
            }
        }

        private updateDesc(): void {
            let lv = 0;
            let nextLv = 0;
            let isOpen = this._proxy.isTianfuOpen(this._selCfg);
            if(!isOpen){
                //未开启
                this._view.currentState = "lock";
                let infos = this._selCfg.premise;
                let info = infos[0];
                let limitIndex = info[0];
                let limitLv = info[1];
                let limitCfg: HuashenTianfuConfig = getConfigByNameId(ConfigName.HuashenTianfu, limitIndex);
                let limitStr = StringUtil.substitute(getLanById(LanDef.linggen_tips2), [limitCfg.name, limitLv + ""]);
                this._view.lab_limit.text = limitStr;
                nextLv = lv + 1;
            }
            else {
                let info = this._proxy.getTianfuInfo(this._selCfg.index);
                lv = info ? info.lv : 0;
                let maxLv = this._selCfg.upgrade_item.length;
                let isMax = lv >= maxLv;
                this._view.currentState = isMax ? "max" : "default";
                if(!isMax){
                    nextLv = lv + 1;
                    this._cost = this._selCfg.upgrade_item[lv];
                    this._view.cost.updateShow(this._cost);
                    this._view.btn_up.redPoint.visible = this._proxy.getTianfuHint(this._selCfg);
                }
            }

            let lvStr = this._selCfg.name + "Lv." + lv;
            this._view.lab_lv.text = lvStr;
            let desc = "";
            if(lv == 0){
                desc = getLanById(LanDef.not_active);
            }
            else {
                let buffIndex = this._selCfg.buff_index[lv - 1];
                let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffIndex);
                desc = buffCfg.des;
            }
            this._view.lab_desc.textFlow = TextUtil.parseHtml(desc);

            if(nextLv != 0){
                let nextLvStr = this._selCfg.name + "Lv." + nextLv;
                this._view.lab_nextLv.text = nextLvStr;

                let nextBuffIndex = this._selCfg.buff_index[nextLv - 1];
                let nextBuffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, nextBuffIndex);
                let nextDesc = nextBuffCfg.des;
                this._view.lab_nextDesc.textFlow = TextUtil.parseHtml(nextDesc);
            }
        }

    }
}