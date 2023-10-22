namespace game.mod.jiban {

    import ItemTapEvent = eui.ItemTapEvent;
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import ArrayCollection = eui.ArrayCollection;
    import HorseJibanConfig = game.config.HorseJibanConfig;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import HorseConfig = game.config.HorseConfig;
    import YuanlingJibanConfig = game.config.YuanlingJibanConfig;

    export class JibanBaseMdr extends MdrBase {
        protected _view: JibanBaseView = this.mark("_view", JibanBaseView);
        protected _proxy: ISurfaceProxy;
        private _jProxy: JibanProxy;

        protected _itemList: ArrayCollection;
        /**当前选中的羁绊下标*/
        protected _selIndex: number;
        /**当前选中的羁绊配置*/
        protected _selCfg: HorseJibanConfig | YuanlingJibanConfig;
        protected _maxCnt: number = 6;
        protected _canAct: boolean;
        protected _headType: number = ConfigHead.Horse;//子类重写
        protected _maxStar: number;
        protected _curStar: number;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
            this._jProxy = this.retProxy(ProxyType.Jiban);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = JibanBaseRender;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
            addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickAct);

            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePower, this);
            this.onNt(SurfaceEvent.SURFACE_INFO_UPDATE, this.onInfoUpdate, this);
            this.onNt(SurfaceEvent.SURFACE_JIBAN_INFO_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this.initShow();
            this.updateItemList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickItem(e: ItemTapEvent) {
            let index = e.itemIndex;
            if (index == this._selIndex) {
                return;
            }
            this._selIndex = index;
            this.indexUpdateInfo();
        }

        /**重载，激活整套羁绊*/
        protected onClickAct(): void {
            if (!this._selCfg) {
                return;
            }
            if (!this._canAct) {
                PromptBox.getIns().show(getLanById(LanDef.jiban_tips1));
                return;
            }
            this._proxy.c2s_ride_oper_jiban(this._headType, this._selCfg.index);
        }

        protected onInfoUpdate(n: GameNT): void {
            let headType: number = n.body;
            if (headType == this._headType) {
                this.updateItemListHint();
                this.updateModel();
                this.updateAct();
            }
        }

        private initShow(): void {
            this._selIndex = 0;
            this._curStar = 0;
            this._view.img_icon.source = "jiban_icon_" + this._headType;
        }

        private updateItemList(): void {
            let items = this.getJibanCfgList();
            this._itemList.source = items;
            this._view.list_item.selectedIndex = this._selIndex;
            this.indexUpdateInfo();
        }

        private updateItemListHint(): void {
            let items = this.getJibanCfgList();
            this._itemList.replaceAll(items);
        }

        private indexUpdateInfo(): void {
            let items = this.getJibanCfgList();
            this._selCfg = items[this._selIndex].cfg;
            this._proxy.selJibanCfg = this._selCfg;
            if (!this._selCfg) {
                return;
            }
            this.updatePower();
            this.updateShow();
            this.updateModel();
            this.updateNameItem();
            this.updateAct();
        }

        /**更新战力*/
        protected updatePower(): void {
            let attr = RoleUtil.getAttr(this._selCfg.property);
            let power = attr && attr.showpower ? attr.showpower : 0;
            this._view.power.setPowerValue(power);
            let god = attr && attr.god ? attr.god : 0;
            this._view.god_item.updateGod(god);
        }

        private updateShow(): void {
            let pos = this._selIndex + 1;
            this._view.img_name.source = "jiban_name_" + this._headType + "_" + pos;
            this._view.img_eff.source = "jiban_" + this._headType + "_" + pos;
        }

        protected updateModel(): void {
            let infos = this._selCfg.partners;
            this._curStar = 0;
            for (let i = 0; i < this._maxCnt; ++i) {
                let item = this._view["item" + i];
                item.visible = i <= infos.length - 1;
                if (item.visible) {
                    let index = infos[i];
                    let itemData: IJibanBaseItemRenderData = {
                        headType: this._headType,
                        cfg: getConfigById(index),
                        jibanCfg: this._selCfg,
                        isActed: this._proxy.isJibanItemAct(this._headType, this._selCfg.index, index),
                        showHint: this._proxy.canJibanItemAct(this._headType, this._selCfg, index)
                    };
                    item.data = itemData;
                    let star = this.getStar(index);
                    this._curStar += Math.min(star, 1);

                }
            }
            this._view.currentState = infos.length + "";
            this._view.img_item.source=`surface_${this._headType}_${this._selCfg.index}`;
            this._maxStar = infos.length;
        }

        protected updateNameItem(): void {
            //let cfg: HorseConfig = getConfigById(this._selCfg.partners[this._selCfg.partners.length - 1]);
            this._view.name_item.updateShow(this._selCfg.name, this._selCfg.quality);
        }

        protected getStar(index: number): number {
            return this._proxy.getSurfacePerStar(index);
        }

        protected getAct(index: number): boolean {
            return this._proxy.isJibanAct(this._headType, index);
        }

        /**羁绊icon数据*/
        protected getJibanCfgList(): IJibanBaseRenderData[] {
            let cfgList: HorseJibanConfig[] | YuanlingJibanConfig[] = this._proxy.getJibanCfgList(this._headType);
            let list: IJibanBaseRenderData[] = [];
            for (let cfg of cfgList) {
                list.push({
                    cfg,
                    isActed: this._proxy.isJibanAct(this._headType, cfg.index),
                    showHint: this._proxy.canJibanSysAct(this._headType, cfg)
                });
            }
            return list;
        }

        /**更新激活条件和激活状态*/
        protected updateAct(): void {
            let index = this._selCfg.index;
            let isAct = this.getAct(index);
            this._view.btn_act.visible = this._view.lab_tips.visible = !isAct;
            this._view.img_act.visible = isAct;
            if (!isAct) {
                this._canAct = this._proxy.canJibanAct(this._headType, this._selCfg);
                this._view.btn_act.redPoint.visible = this._canAct;
                let tipsStr = "[" + this._selCfg.name + "]" + getLanById(LanDef.jiban_tips2);
                tipsStr += TextUtil.addColor("(" + this._curStar + "/" + this._maxStar + ")", this._curStar >= this._maxStar ? WhiteColor.GREEN : WhiteColor.RED);
                this._view.lab_tips.textFlow = TextUtil.parseHtml(tipsStr);
            }
        }
    }
}