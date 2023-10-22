namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    /**
     * 神灵上阵
     * 前端做个假上阵处理，只有点击一键或者关闭界面，才会最终上阵
     */
    export class ZhenrongShenlingMdr extends MdrBase {
        private _view: ZhenrongShenlingView = this.mark("_view", ZhenrongShenlingView);
        private _proxy: XujieTansuoProxy;
        private _shenlingProxy: IShenLingProxy;
        private _listMenu: eui.ArrayCollection;
        private _listAvatar: eui.ArrayCollection;

        private _seledType = ShenLingType.Default;
        private _seledList: number[];

        private _legionType = LegionType.Shenling;
        private _maxCnt = 0;
        private _itemList: AvatarIconLongPress[] = [];

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);
            this._shenlingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);

            this._view.list_menu.itemRenderer = ShenlingTypeBtn;
            this._view.list_menu.dataProvider = this._listMenu = new eui.ArrayCollection();
            this._view.list.itemRenderer = AvatarIconLongPress;
            this._view.list.dataProvider = this._listAvatar = new eui.ArrayCollection();

            this._maxCnt = LegionTypeCnt[this._legionType];
            for (let i = 0; i < this._maxCnt; i++) {
                if (this._view[`item${i}`]) {
                    this._itemList.push(this._view[`item${i}`]);
                }
            }
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_oneKey, egret.TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
            addEventListener(this._view.list_menu, eui.ItemTapEvent.ITEM_TAP, this.onClickListMenu, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);

            this._itemList.forEach((item) => {
                addEventListener(item, egret.TouchEvent.TOUCH_TAP, this.onClickItem, this);
            });

            this.onNt(MoreEvent.ON_UPDATE_ZHENRONG_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShangzhenList();
            this._listMenu.replaceAll(ShenLingTypeBtnAry);
            this.onSwitchType();
            this._view.list_menu.selectedIndex = this._seledType;
        }

        protected onHide(): void {
            super.onHide();
            this.onResetScroller();
            this.finallyShangzhen();
            this._seledType = ShenLingType.Default;
            this._seledList = null;
        }

        private onResetScroller(): void {
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;
        }

        //初始上阵的数据
        private initShangzhenList(): void {
            this._seledList = this._proxy.getShangzhenIdList(this._legionType);
        }

        private onUpdateView(): void {
            this.initShangzhenList();//重置服务端真实上阵的神灵
            this.updateListAvatar();
            this.updateTopItemList();
        }

        private onSwitchType(type = ShenLingType.Default): void {
            this._seledType = type;
            this.updateListAvatar();
            this.updateTopItemList();
        }

        //更新已上阵的信息
        private updateTopItemList(): void {
            let list: number[] = this._seledList;//当前上阵的神灵id
            for (let i = 0; i < this._maxCnt; i++) {
                let icon = this._view[`item${i}`] as AvatarIconLongPress;
                if (!icon) {
                    return;
                }
                let index = list[i];
                if (index) {
                    let info = this._shenlingProxy.getInfoByIndex(index);
                    icon.data = {
                        cfg: this._shenlingProxy.getShenLingCfg(index),
                        star: info && info.star || 0,
                        showHint: false,
                        isBattle: true,
                        isSel: false
                    } as AvatarItemData;
                } else {
                    icon.data = null;
                }
            }
        }

        private updateListAvatar(): void {
            let list = this.getList();
            let listData: AvatarItemData[] = [];
            for (let item of list) {
                let info = this._shenlingProxy.getInfoByIndex(item.index);
                listData.push({
                    cfg: this._shenlingProxy.getShenLingCfg(item.index),
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
            let limitQuality = this._proxy.getShenlingLimitQuality();
            for (let info of infoList) {
                if (!info) {
                    continue;
                }
                let cfg = this._shenlingProxy.getShenLingCfg(info.index.toNumber());
                if (!cfg || cfg.quality < limitQuality) {
                    continue;
                }
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

        //一键上阵
        private onClickOneKey(): void {
            this._proxy.sendShangzhen(this._legionType, 2);
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
            if (this._seledList.length >= this._maxCnt) {
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

        //关闭界面最终上阵处理
        private finallyShangzhen(): void {
            let map = new Map();
            let info = this._proxy.getShangzhenInfo(this._legionType);
            if (info && info.unitlist) {
                //后端真上阵数据
                info.unitlist.forEach((item) => {
                    map.set(item.toNumber(), true);
                });
            }

            let seledSize = this._seledList.length;
            let sameCnt = 0;
            if (map.size == seledSize) {
                //前端假上阵数据
                this._seledList.forEach((item) => {
                    if (map.get(item)) {
                        sameCnt++;
                    }
                });
            }

            if (map.size != seledSize || sameCnt != seledSize) {
                this._proxy.sendShangzhen(this._legionType, 3, this._seledList);
            }
        }
    }
}