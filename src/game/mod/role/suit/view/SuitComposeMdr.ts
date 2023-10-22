namespace game.mod.role {


    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;
    import TouchEvent = egret.TouchEvent;
    import EquipmentConfig = game.config.EquipmentConfig;
    import LanDef = game.localization.LanDef;
    import prop_tips_data = msg.prop_tips_data;
    import Tween = base.Tween;

    export class SuitComposeMdr extends MdrBase {
        private _view: SuitComposeView = this.mark("_view", SuitComposeView);
        private _proxy: SuitProxy;
        private _listType: ArrayCollection;
        private _listBtn: ArrayCollection;
        private _curSelIdx = 0;//list_type当前选择
        private _listResolve: ArrayCollection;
        private _selResolve: PropData[] = [];//已选中的分解
        private _skinType = 0; //0:compose, 1:resolve
        private _resolveCnt = 50;//格子数
        private _suitTypeAry = [SuitType.CangTian, SuitType.YanTian];//可合成的套装类型
        private _composeCnt = 3;//合成所需数量

        private _btnData: TabBaseItemData[] = [
            {
                icon: 'hecheng',
                showHint: false
            },
            {
                icon: 'fenjie',
                showHint: false
            }
        ];

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Suit);
            this._view.list_type.itemRenderer = SuitComposeTypeTab;
            this._view.list_type.dataProvider = this._listType = new ArrayCollection();
            this._view.scroller['$hasScissor'] = true;
            this._view.list_type.useVirtualLayout = false;

            this._view.secondPop.bgStr = ResUtil.getUiJpg('suit_hecheng_bg');

            this._view.list_btn.itemRenderer = TabSecondItem;
            this._view.list_btn.dataProvider = this._listBtn = new eui.ArrayCollection();

            this._view.list_resolve.itemRenderer = IconSelMany;
            this._view.list_resolve.dataProvider = this._listResolve = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_type, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            addEventListener(this._view.btn_compose, TouchEvent.TOUCH_TAP, this.onClickCompose, this);
            addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd, this);
            addEventListener(this._view.btn_sub, TouchEvent.TOUCH_TAP, this.onClickSub, this);
            addEventListener(this._view.list_btn, eui.ItemTapEvent.ITEM_TAP, this.onClickBtnList, this);
            addEventListener(this._view.btn_resolve, TouchEvent.TOUCH_TAP, this.onClickResolve, this);
            addEventListener(this._view.list_resolve, eui.ItemTapEvent.ITEM_TAP, this.onClickResolveList, this);
            this.onNt(SuitEvent.ON_SUIT_COMPOSE_SELECT_UPDATE, this.onUpdateRightSide, this);
            this.onNt(SuitEvent.ON_SUIT_EQUIP_SYNTHESIS_UPDATE, this.onComposeUpdate, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onUpdateByBagType, this);
        }

        protected onShow(): void {
            super.onShow();
            this._listBtn.replaceAll(this._btnData);
            this._view.list_btn.selectedIndex = 0;

            this._skinType = 0;
            this.updateViewBySkinType();
            this.updateBtnHint();
        }

        protected onHide(): void {
            super.onHide();
            this._proxy.composeSelAry = [];
            this._view.scroller.viewport.scrollV = 0;
            this._view.scroller.stopAnimation();
            this._curSelIdx = 0;
        }

        /**合成回调*/
        private onComposeUpdate(): void {
            if (this._skinType == 0) {
                this.updateComposeView();
                this.updateBtnHint();
            } else {
                this.updateResolveView();
            }
        }

        private updateTypeList(): void {
            let list: ISuitComposeTypeTabData[] = [];
            let data = this._proxy.composeSelAry;
            for (let type of this._suitTypeAry) {
                list.push({
                    type,
                    hint: HintMgr.getHint(this._proxy.model.composeHintPath[type]),
                    sel: this._curSelIdx != -1 && data[0] && data[0] == type // -1表示没有选择
                });
            }
            if (this._listType.source && this._listType.source.length > 0) {
                this._listType.replaceAll(list);
            } else {
                this._listType.source = list;
            }
        }

        //点击套装
        private onClickList(e: eui.ItemTapEvent): void {
            // 点击子项list的不能刷新
            if (this._proxy.composeSelSub) {
                this._proxy.composeSelSub = false;
                return;
            }
            if (this._proxy.composeSelPos2) {
                this._proxy.composeSelPos2 = false;
                return;
            }
            this._view.scroller.viewport.scrollV = 0;

            let idx = e.itemIndex;
            //点击当前已选择的，就是关闭
            if (idx == this._curSelIdx) {
                this._view.list_type.selectedIndex = this._curSelIdx = -1;
                this.updateTypeList();
                return;
            }

            let curType = this._suitTypeAry[idx];
            let data = this._proxy.getCanComposeDataByType(curType);
            if (data && data.length && data[0] == curType) {
                this.updateRightSide(data[0], data[1], data[2]);
            } else {
                this.updateRightSide(curType, 2, SuitEquipPosAry[0]);
            }

            this._curSelIdx = idx;
            this.updateTypeList();
        }

        //右边list下的list选择，更新右边视图
        private onUpdateRightSide(n: GameNT): void {
            let data = n.body as number[];
            let [type, lv, pos] = data;//类型，阶级，部位
            DEBUG && console.log(`SuitComposeMdr: type: ${type}, lv: ${lv}, pos: ${pos}`);
            this.updateRightSide(type, lv, pos);
        }

        private updateRightSide(type: SuitType, lv: number, pos: EquipPos): void {
            this._proxy.composeSelAry = [type, lv, pos];//当前选中的合成数据
            let cfg = this._proxy.getEquipCfg(type, lv, pos);
            if (!cfg) {
                console.log(`没有当前套装装备 index:${this._proxy.getIndex(type, lv, pos)} suitType:${type} lv:${lv} pos:${pos}`);
                return;
            }
            this._view.icon_target.data = PropData.create(cfg.index);
            this._view.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.name, ColorUtil.getColorByQuality1(cfg.quality)));

            let list = this._proxy.getCanComposeList(type, lv, pos);
            for (let i = 0; i < this._composeCnt; i++) {
                let icon: Icon = this._view[`icon${i}`];
                if (icon) {
                    icon.data = list[i] || null;
                }
            }

            // 合成红点
            this._view.btn_compose.setHint(list && list.length >= this._composeCnt);
        }

        private onClickCompose(): void {
            let d = this._proxy.composeSelAry;
            let list = this._proxy.getCanComposeList(d[0], d[1], d[2]) || [];
            if (list.length < this._composeCnt) {
                PromptBox.getIns().show(`合成消耗数量不足`);
                return;
            }
            let target = this._view.icon_target.data as PropData;
            this._proxy.c2s_suit_equip_synthesis(target.index, d[0], d[2], this.getNum());
        }

        private onClickAdd(): void {
            let d = this._proxy.composeSelAry;
            let list = this._proxy.getCanComposeList(d[0], d[1], d[2]) || [];
            let size = list.length;
            let maxNum = size || 1;//获取最大数量
            let num = this.getNum();
            if (num > maxNum) {
                return;
            }
            this.setNum(num++);
        }

        private onClickSub(): void {
            let num = this.getNum();
            if (num <= 1) {
                return;
            }
            this.setNum(num--);
        }

        //合成数量
        private getNum(): number {
            return +(this._view.lb_num.text) || 1;
        }

        private setNum(num: number): void {
            this._view.lb_num.text = num + '';
        }

        private onClickBtnList(e: eui.ItemTapEvent): void {
            this._skinType = e.itemIndex;

            this.updateViewBySkinType();
        }

        private updateViewBySkinType(): void {
            this._view.currentState = this._skinType == 0 ? 'compose' : 'resolve';
            this._view.secondPop.updateBgSrc(ResUtil.getUiJpg(this._skinType == 0 ? 'suit_hecheng_bg' : 'suit_fenjie_bg'));

            if (this._skinType == 0) {
                this._curSelIdx = 0;
                this._listType.removeAll();
                this._view.scroller.viewport.scrollV = 0;
                this.updateComposeView();
            } else {
                this._proxy.composeSelAry = [];
                this.updateResolveView();
                //切换到分解，icon清除数据
                for (let i = 0; i < this._composeCnt; i++) {
                    let icon: Icon = this._view[`icon${i}`];
                    if (icon) {
                        icon.data = null;
                    }
                }
            }
        }

        private updateComposeView(): void {
            let data = this._proxy.getCanComposeData();
            this.updateRightSide(data[0], data[1], data[2]);//先更右边数据，保存选中数据
            this.updateTypeList();
            this._view.list_type.selectedIndex = this._curSelIdx = Math.max(data[0] - 1, 0);
            this.doMoveScroller();
        }

        private doMoveScroller(): void {
            egret.callLater(this.moveScroller, this);
        }

        //移动scroller
        private moveScroller(): void {
            let data = this._proxy.composeSelAry;
            if (!data || !data.length) {
                return;
            }
            let viewport = this._view.scroller.viewport as eui.List;
            let scrollerH = this._view.scroller.height;
            let contentH = viewport.contentHeight;
            let typeH = 70;
            let lvH = 66;
            let gap = 6;
            if (!contentH) {
                let maxS = this._proxy.getMaxStageByType(1);
                contentH = typeH * 2 + gap + (maxS - 2) * lvH + (maxS - 2 - 1) * gap + 8 * 64 + (8 - 1) * 6;
            }
            let moveH = data[0] == 2 ? typeH + gap : 0;//为套装2时加上套装1的height
            let lvIdx = data[1] - 2;//阶数从2开始，第几个item
            moveH = moveH + lvIdx * lvH + Math.max(0, lvIdx - 1) * gap;
            moveH = Math.max(0, Math.min(moveH, contentH - scrollerH));

            viewport.scrollV = 0;
            Tween.remove(viewport);
            Tween.get(viewport).to({scrollV: moveH}, 10);
        }

        /**================================== 分解 ==================================*/

        private onUpdateByBagType(n: GameNT): void {
            let types = n.body as number[];
            if (!types || !types.length || types.indexOf(BagType.Suit) < 0) {
                return;
            }
            if (this._skinType == 1) {
                this.updateResolveView();
            }
        }

        private updateResolveView(): void {
            this._listResolve.removeAll();
            let list = this._proxy.getSuitEquipListByBagType();
            let listData: IconSelManyData[] = [];
            this._selResolve = [];
            for (let item of list) {
                if (!item) {
                    continue;
                }
                let lv = this._proxy.getIndexLv(item.index);//当前装备阶数
                let type = this._proxy.getIndexType(item.index);//当前套装类型
                let curDressEquip = this._proxy.getPosEquipInfo(type, item.index % 10);
                let curDressLv = curDressEquip ? this._proxy.getIndexLv(curDressEquip.equipment_id.toNumber()) : 0;
                if (curDressEquip && curDressLv > lv + 2) {
                    listData.push({
                        prop: item,
                        sel: true
                    });
                    this._selResolve.push(item);
                } else {
                    listData.push({
                        prop: item,
                        sel: false
                    });
                }
            }
            if (listData.length < this._resolveCnt) {
                listData.length = this._resolveCnt;
            }
            this._listResolve.replaceAll(listData);
            this.updateSelDesc();
        }

        private onClickResolve(): void {
            if (!this._selResolve || !this._selResolve.length) {
                PromptBox.getIns().show(getLanById(LanDef.resolve_tips5));
                return;
            }
            let list: prop_tips_data[] = [];
            for (let item of this._selResolve) {
                let d = new prop_tips_data();
                d.idx = item.prop_id;
                d.cnt = item.count;
                list.push(d);
            }
            let bagProxy: IBagProxy = getProxy(ModName.Bag, ProxyType.Bag);
            bagProxy.c2s_prop_one_key_resolve(list);
        }

        private onClickResolveList(e: eui.ItemTapEvent): void {
            let d = e.item as IconSelManyData;
            if (!d) {
                return;
            }
            d.sel = !d.sel;
            this._listResolve.itemUpdated(d);
            this.updateSel(d);
            this.updateSelDesc();
        }

        private updateSel(data: IconSelManyData): void {
            if (data.sel) {
                this._selResolve.push(data.prop);
            } else {
                let idx = this._selResolve.indexOf(data.prop);
                if (idx > -1) {
                    this._selResolve.splice(idx, 1);
                }
            }
        }

        private _resolveMap: { [idx: number]: number } = {};

        private updateSelDesc(): void {
            this._resolveMap = {};
            let idx: number;//只展示一个
            for (let item of this._selResolve) {
                if (!item || !item.cfg) {
                    continue;
                }
                let cfg: EquipmentConfig = item.cfg;
                let resolve = cfg.resolve || [];
                for (let re of resolve) {
                    if (!this._resolveMap[re[0]]) {
                        this._resolveMap[re[0]] = 0;
                    }
                    this._resolveMap[re[0]] += re[1];
                    idx = re[0];
                }
            }
            this._view.lb_resolve.textFlow = TextUtil.parseHtml(`共选择${TextUtil.addColor(this._selResolve.length + '', WhiteColor.GREEN)}件，分解获得`);
            if (!idx) {
                let equipCfg = this._proxy.getEquipCfg(SuitType.CangTian);
                idx = equipCfg && equipCfg.resolve ? equipCfg.resolve[0][0] : 0;//获取任一装备分解道具
            }
            let cfg = GameConfig.getPropConfigById(idx);
            this._view.img_resolve.source = cfg ? cfg.icon : '';
            this._view.lb_resolveNum.text = (this._resolveMap[idx] || 0) + '';
        }

        /**更新页签红点*/
        private updateBtnHint(): void {
            let btn = this._listBtn.source[0] as TabBaseItemData;
            if (!btn) {
                return;
            }
            btn.showHint = HintMgr.getHint(this._proxy.model.composeHintPath[SuitType.CangTian]) ||
                HintMgr.getHint(this._proxy.model.composeHintPath[SuitType.YanTian]);
            this._listBtn.itemUpdated(btn);
        }
    }
}