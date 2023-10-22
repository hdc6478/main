namespace game.mod.shenling {


    import LanDef = game.localization.LanDef;

    /**
     * 上阵逻辑处理：
     * 只有关闭界面或者点击一键上阵按钮，才是最终的上阵 （功能会议时候提出假上阵展示）
     */
    export class ShenLingShangZhenMdr extends MdrBase {
        private _view: ShenLingShangZhenView = this.mark("_view", ShenLingShangZhenView);
        private _proxy: ShenLingProxy;
        private _selectedType = ShenLingType.Default;//当前类型按钮选择
        private _selectedList: number[] = [];//当前选择的神灵index
        private _listData: eui.ArrayCollection;
        private _listMenu: eui.ArrayCollection;
        private _maxType = 6;//神灵类型数量

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Shenling);

            this._view.list.itemRenderer = AvatarIconLongPress;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();

            this._view.list_menu.itemRenderer = ShenlingTypeBtn;
            this._view.list_menu.dataProvider = this._listMenu = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_menu, eui.ItemTapEvent.ITEM_TAP, this.onClickListMenu, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            addEventListener(this._view.btn_oneKey, egret.TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
            this.onNt(ShenLingEvent.ON_SHEN_LING_UPDATE_INFO, this.updateList, this);
        }

        protected onShow(): void {
            super.onShow();

            this._view.currentState = ShenLingTypeAry.length + '';

            this._listMenu.replaceAll(ShenLingTypeBtnAry);
            //初始选择所有已上阵的神灵index
            for (let type of ShenLingTypeAry) {
                let list = this._proxy.getTypeInfo(type);
                this._selectedList[type] = list && list.upindex || 0;
            }
            this.onSwitchType();
            this._view.list_menu.selectedIndex = 0;
            this.updateBtnHint();
        }

        protected onHide(): void {
            super.onHide();
            this.finallySelected();
            this._selectedList = [];
        }

        private onSwitchType(type: number = ShenLingType.Default): void {
            this._selectedType = type;

            let list = this.getList();
            let listData: AvatarItemData[] = [];
            for (let item of list) {
                let info = this._proxy.getInfoByIndex(item.index);
                listData.push({
                    cfg: this._proxy.getShenLingCfg(item.index),
                    showHint: this.haveShangzhenHint(item.index),
                    isBattle: item.isBattle,
                    star: info && info.star || 0
                });
            }
            this._listData.replaceAll(listData);

            this.updateTopInfo();
        }

        private updateList(): void {
            this.onSwitchType(this._selectedType);
            this.updateBtnHint();
        }

        private getList(): AvatarItemBattleData[] {
            if (this._selectedType != ShenLingType.Default) {
                return this.getListData(this._selectedType);
            }
            let list: AvatarItemBattleData[] = [];
            let _list: AvatarItemBattleData[] = [];
            for (let i of ShenLingTypeAry) {
                let typeList = this.getListData(i);
                if (!typeList || !typeList.length) {
                    continue;
                }
                let item = typeList.shift();
                list.push(item);
                _list.push(...typeList);
            }
            list = list.concat(_list);
            return list;
        }

        private getListData(type: number): AvatarItemBattleData[] {
            let list: AvatarItemBattleData[] = [];
            let infoList = this._proxy.getActedListByType(type);
            for (let info of infoList) {
                let data: AvatarItemBattleData = {
                    index: info.index.toNumber(),
                    isBattle: false
                };
                if (this.isBattle(type, info.index.toNumber())) {
                    data.isBattle = true;
                    list.unshift(data);
                } else {
                    list.push(data);
                }
            }
            return list;
        }

        //是否上阵
        private isBattle(type: number, index: number): boolean {
            let upindex = this._selectedList[type];
            return upindex && upindex == index;
        }

        private updateTopInfo(): void {
            let selectedList: number[] = [];
            for (let type of ShenLingTypeAry) {
                if (this._selectedList[type]) {
                    selectedList.push(this._selectedList[type]);
                }
            }
            for (let i = 0; i < this._maxType; i++) {
                let index = selectedList[i];
                let avatarData: AvatarItemData = null;
                if (index) {
                    let info = this._proxy.getInfoByIndex(index);
                    avatarData = {
                        cfg: this._proxy.getShenLingCfg(index),
                        star: info && info.star || 0,
                        isBattle: true,
                        showHint: false
                    };
                }
                this._view[`item${i}`].data = avatarData;
            }
        }

        private onClickListMenu(e: eui.ItemTapEvent): void {
            if (!e) {
                return;
            }
            let type = e.item;
            if (type == this._selectedType) {
                return;
            }
            if (type != 0) {
                let info = this._proxy.getTypeInfo(type);
                if (!info || !info.upindex) {
                    PromptBox.getIns().show(getLanById(LanDef.shenling_tips5));
                    this._view.list_menu.selectedIndex = ShenLingTypeBtnAry.indexOf(this._selectedType);
                    return;
                }
            }
            this._view.scroller.viewport.scrollV = 0;
            this.onSwitchType(type);
        }

        private onClickList(e: eui.ItemTapEvent): void {
            if (!e || !e.item) {
                return;
            }
            let data = e.item as AvatarItemData;
            let type = this._proxy.getShenLingType(data.cfg.index);
            if (this._selectedList[type] == data.cfg.index) {
                PromptBox.getIns().show(getLanById(LanDef.shenling_tips15));
                return;
            }

            let preIndex = this._selectedList[type];
            let curIndex = data.cfg.index;
            let preIdx = 0;
            let curIdx = 0;
            let size = this._listData.source.length;
            for (let i = 0; i < size; i++) {
                let item = this._listData.source[i] as AvatarItemData;
                if (item && item.cfg.index == preIndex) {
                    preIdx = i;
                }
                if (item && item.cfg.index == curIndex) {
                    curIdx = i;
                }
            }

            this._selectedList[type] = curIndex;

            let curInfo = this._proxy.getInfoByIndex(curIndex);
            let curData: AvatarItemData = {
                cfg: this._proxy.getShenLingCfg(curIndex),
                star: curInfo && curInfo.star || 0,
                showHint: this.haveShangzhenHint(curIndex),
                isBattle: true
            };
            this._listData.replaceItemAt(curData, preIdx);

            let preInfo = this._proxy.getInfoByIndex(preIndex);
            let preData: AvatarItemData = {
                cfg: this._proxy.getShenLingCfg(preIndex),
                star: preInfo && preInfo.star || 0,
                showHint: this.haveShangzhenHint(preIndex),
                isBattle: false
            };
            this._listData.replaceItemAt(preData, curIdx);

            PromptBox.getIns().show(getLanById(LanDef.shenling_tips14));

            this.updateTopInfo();
            this.updateBtnHint(type);
        }

        //一键上阵，选择所有类型阵位的最高战力
        private onClickOneKey(): void {
            let isBest = true;
            for (let type of ShenLingTypeAry) {
                let list = this._proxy.getActedListByType(type);
                let bestIndex = list && list[0] ? list[0].index.toNumber() : 0;
                if (this._selectedList[type] != bestIndex) {
                    this._selectedList[type] = bestIndex;
                    isBest = false;
                }
            }
            if (isBest) {
                PromptBox.getIns().show(getLanById(LanDef.shenling_tips17));
                return;
            }
            this.finallySelected();
        }

        private finallySelected(): void {
            for (let i of ShenLingTypeAry) {
                let idx = this._selectedList[i];
                if (idx) {
                    this._proxy.c2s_god_brother_uporchange(i, idx);
                }
            }
        }

        /**替换神灵后，若有高战力的需要出现红点*/
        private updateBtnHint(curType?: number): void {
            let isHint = false;
            for (let index of this._selectedList) {
                if (!index) {
                    continue;
                }
                let type = this._proxy.getShenLingType(index);
                if (curType && curType != type) {
                    continue;
                }
                let actedList = this._proxy.getActedListByType(type);
                let curPower = this._proxy.getSinglePowerByIndex(index) || 0;//当前假上阵的神灵战力
                for (let info of actedList) {
                    if (info && info.index.toNumber() == index) {
                        continue;
                    }
                    if (this._proxy.getSinglePower(info) > curPower) {
                        isHint = true;
                        break;
                    }
                }
                if (isHint) {
                    break;
                }
            }
            this._view.btn_oneKey.setHint(isHint);
            HintMgr.setHint(isHint, [ModName.Shenling, ShenLingViewType.ShenLingMain + ShenLingBtnType.Main, ShenLingViewType.ShenLingShangZhen, MdrTabBtnType.TabBtnType01]);
        }

        //上阵红点
        private haveShangzhenHint(index: number): boolean {
            let type = this._proxy.getShenLingType(index);
            let upIndex = this._selectedList[type];
            let upPower = this._proxy.getSinglePowerByIndex(upIndex);
            let curPower = this._proxy.getSinglePowerByIndex(index);
            return curPower > upPower;
        }
    }
}