namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import ShenlingConfig = game.config.ShenlingConfig;

    export class XujieTansuoExpeditionShenLingMdr extends MdrBase {
        private _view: XujieTansuoExpeditionShenLingView = this.mark("_view", XujieTansuoExpeditionShenLingView);
        private _proxy: XujieTansuoProxy;
        private _shenlingProxy: IShenLingProxy;
        private _listMenu: eui.ArrayCollection;
        private _listAvatar: eui.ArrayCollection;
        private _seledType = ShenLingType.Default;
        private _seledList: number[] = [];
        /**4_数量_品质_需要挂机时长（秒）_掉落id_展示id*/
        private _gridItemData: IXujieTansuoGridItemData;
        private _data: number[];
        private _maxCnt = 8;
        private _itemList: AvatarIconLongPress[] = [];

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);
            this._shenlingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            this._view.list_menu.itemRenderer = ShenlingTypeBtn;
            this._view.list_menu.dataProvider = this._listMenu = new eui.ArrayCollection();
            this._view.list.itemRenderer = AvatarIconLongPress;
            this._view.list.dataProvider = this._listAvatar = new eui.ArrayCollection();

            for (let i = 0; i < this._maxCnt; i++) {
                this._itemList.push(this._view[`item${i}`]);
            }
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            addEventListener(this._view.btn_oneKey, egret.TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
            addEventListener(this._view.btn_sure, egret.TouchEvent.TOUCH_TAP, this.onSure, this);
            addEventListener(this._view.list_menu, eui.ItemTapEvent.ITEM_TAP, this.onClickListMenu, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);

            this._itemList.forEach((item) => {
                addEventListener(item, egret.TouchEvent.TOUCH_TAP, this.onClickItem, this);
            });

            this.onNt(MoreEvent.ON_UPDATE_XUJIETANSUO_BASE_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._gridItemData = this._showArgs;
            this._data = this._gridItemData.grid;
            // this._view.secondPop.updateTitleStr('');//todo
            this._listMenu.replaceAll(ShenLingTypeBtnAry);
            this.onSwitchType();
            this._view.list_menu.selectedIndex = this._seledType;
        }

        protected onHide(): void {
            super.onHide();
            this.onResetScroller();
            this._seledType = ShenLingType.Default;
            this._seledList = [];
        }

        private onResetScroller(): void {
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;
        }

        //开始远征处理
        private onUpdateView(): void {
            this.hide();
        }

        private onSwitchType(type = ShenLingType.Default): void {
            this._seledType = type;

            this.updateListAvatar();
            this.updateTopInfo();
            this.updateCondition();
        }

        private updateListAvatar(): void {
            let list = this.getList();
            let listData: AvatarItemData[] = [];
            for (let item of list) {
                let info = this._shenlingProxy.getInfoByIndex(item.index);
                let cfg: ShenlingConfig = this._shenlingProxy.getShenLingCfg(item.index);
                if (!cfg || cfg.quality != this._data[2]) {
                    continue;
                }
                listData.push({
                    cfg: cfg,
                    showHint: false,
                    isBattle: item.isBattle,
                    star: info && info.star || 0
                });
            }
            this._listAvatar.replaceAll(listData);
        }

        private getList(): AvatarItemBattleData[] {
            if (this._seledType != ShenLingType.Default) {
                return this.getListData(this._seledType);
            }
            let list: AvatarItemBattleData[] = [];
            let _list: AvatarItemBattleData[] = [];
            for (let i of ShenLingTypeAry) {
                let typeList = this.getListData(i);
                if (!typeList || !typeList.length) {
                    continue;
                }
                for (let info of typeList) {
                    if (info && info.isBattle) {
                        list.push(info);
                    } else {
                        _list.push(info);
                    }
                }
            }
            list = list.concat(_list);
            return list;
        }

        private getListData(type: number): AvatarItemBattleData[] {
            let list: AvatarItemBattleData[] = [];
            let infoList = this._shenlingProxy.getActedListByType(type);
            for (let info of infoList) {
                let data: AvatarItemBattleData = {
                    index: info.index.toNumber(),
                    isBattle: false
                };
                if (this.isBattle(info.index.toNumber())) {
                    data.isBattle = true;
                    list.unshift(data);
                } else {
                    list.push(data);
                }
            }
            return list;
        }

        //是否上阵
        private isBattle(index: number): boolean {
            return this._seledList.indexOf(index) > -1;
        }

        private updateCondition(): void {
            let desc = StringUtil.substitute(getLanById(LanDef.xujietansuo_tips11), [this._data[1], QualityTypeSrName[this._data[2]]]);
            let satisfy = this.isQualitySatisfy();
            let color = satisfy ? BlackColor.GREEN : BlackColor.GRAY;
            this._view.lb_desc.textFlow = TextUtil.parseHtml(TextUtil.addColor(desc, color));
            this._view.checkBox.selected = satisfy;
        }

        //品质是否满足
        private isQualitySatisfy(): boolean {
            let cnt = this._data[1];
            let quality = this._data[2];
            let needCnt = 0;
            for (let i = 0; i < this._maxCnt; i++) {
                let icon = this._view[`item${i}`] as AvatarIconLongPress;
                if (!icon) {
                    continue;
                }
                let itemData = icon.data;
                if (itemData && itemData.cfg && itemData.cfg.quality >= quality) {
                    needCnt++;
                }
            }
            return needCnt >= cnt;
        }

        private updateTopInfo(): void {
            let list: number[] = this._seledList;//已上阵的 todo
            let cnt = this._data[1];//需要数量
            for (let i = 0; i < this._maxCnt; i++) {
                let icon = this._view[`item${i}`] as AvatarIconLongPress;
                if (list[i]) {
                    let info = this._shenlingProxy.getInfoByIndex(list[i]);
                    icon.data = {
                        cfg: this._shenlingProxy.getShenLingCfg(list[i]),
                        star: info && info.star || 0,
                        showHint: false,
                        isBattle: true,
                        isSel: false
                    } as AvatarItemData;
                } else {
                    icon.data = null;
                }
                if (i >= cnt) {
                    icon.img_icon.source = `common_gray_icon`;//todo
                }
            }
        }

        //一键上阵
        private onClickOneKey(): void {
            let cnt = this._data[1];
            let seledList = this._seledList;
            let listSource: AvatarItemData[] = this._listAvatar.source || [];
            if (listSource.length < cnt) {
                PromptBox.getIns().show(getLanById(LanDef.tiaojianbuzu));
                return;
            }
            // todo
            for (let item of listSource) {
                let id = item.cfg.index;
                if (seledList.indexOf(id) > -1) {
                    continue;
                }
                if (seledList.length >= cnt) {
                    break;
                }
                seledList.push(id);
            }
            this.onSwitchType(this._seledType);
        }

        //开始远征
        private onSure(): void {
            let cnt = this._data[1];
            if (this._seledList && this._seledList.length < cnt) {
                PromptBox.getIns().show(getLanById(LanDef.tiaojianbuzu));
                return;
            }
            let gridData = this._gridItemData;
            let list: Long[] = [];
            for (let id of this._seledList) {
                list.push(Long.fromValue(id));
            }
            //上阵神灵，开始远征
            this._proxy.c2s_zhandui_xujietansuo_role_click(XujieTansuoOperType.Oper3, gridData.type,
                gridData.layer, gridData.row, gridData.col, list);
        }

        //选中类型
        private onClickListMenu(e: eui.ItemTapEvent): void {
            let type = e.item;
            if (type == this._seledType) {
                return;
            }
            if (type != ShenLingType.Default) {
                let info = this._shenlingProxy.getTypeInfo(type);
                if (!info || !info.upindex) {
                    PromptBox.getIns().show(getLanById(LanDef.shenling_tips5));
                    this._view.list_menu.selectedIndex = ShenLingTypeBtnAry.indexOf(this._seledType);
                    return;
                }
            }
            this.onResetScroller();
            this.onSwitchType(type);
        }

        //点击单个，上阵
        private onClickList(e: eui.ItemTapEvent): void {
            if (this._seledList.length >= this._data[1]) {
                PromptBox.getIns().show(getLanById(LanDef.xujietansuo_tips12));
                return;
            }
            let data = e.item as AvatarItemData;
            if (this._seledList.indexOf(data.cfg.index) > -1) {
                PromptBox.getIns().show(getLanById(LanDef.shenling_tips15));
                return;
            }
            data.isBattle = true;
            this._listAvatar.itemUpdated(data);
            this._seledList.push(data.cfg.index);
            PromptBox.getIns().show(getLanById(LanDef.shenling_tips14));

            this.onSwitchType(this._seledType);
        }

        //点击单个，下阵
        private onClickItem(e: egret.TouchEvent): void {
            let data: AvatarItemData = e.currentTarget.data;
            if (!data) {
                return;
            }
            let index = data.cfg.index;
            let idx = this._seledList.indexOf(index);
            if (idx > -1) {
                this._seledList.splice(idx, 1);
            }
            let itemIdx = this._itemList.indexOf(e.currentTarget);
            let item = this._itemList[itemIdx];
            if (item) {
                item.data = null;
            }

            this.onSwitchType(this._seledType);
        }
    }
}