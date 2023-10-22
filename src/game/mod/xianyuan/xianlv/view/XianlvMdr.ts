namespace game.mod.xianyuan {

    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;

    export class XianlvMdr extends MdrBase {
        private _view: XianlvView = this.mark("_view", XianlvView);
        private _proxy: XianlvProxy;
        private _childProxy: ChildProxy;
        private _listChild: eui.ArrayCollection;
        private _listBtn: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianlv);
            this._childProxy = this.retProxy(ProxyType.Child);
            this._view.list_child.itemRenderer = XianlvChildIcon;
            this._view.list_child.dataProvider = this._listChild = new eui.ArrayCollection();
            this._view.list_tap.itemRenderer = TabSecondItem;
            this._view.list_tap.dataProvider = this._listBtn = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickDo, this);
            addEventListener(this._view.btn_zhaohuan, egret.TouchEvent.TOUCH_TAP, this.onClickZhaohuan, this);
            addEventListener(this._view.list_tap, eui.ItemTapEvent.ITEM_TAP, this.onClickListTap, this);
            this.onNt(XianyuanEvent.ON_UPDATE_BANLV_INFO, this.updateView, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onUpdateHint, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateByPropIndex, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
            this.updateListTap();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            this._view.power.setPowerValue(this._proxy.getPower());
            let isMarried = this._proxy.isMarried();
            this._view.btn_do.icon = isMarried ? 'yijue' : 'tubiao_jiqingjilu';
            this._view.gr_day.visible = this._proxy.isMarried();
            this._view.lb_day.text = StringUtil.substitute(getLanById(LanDef.xianlv_tips11), [this._proxy.getTogetherDay()]);

            this._view.roleComp0.updateViewForMyself();
            let banlvInfo = this._proxy.getBanlvInfo();
            this._view.roleComp1.updateView(banlvInfo, false);

            this.updateListChild();
            this.updateZhaohuanBtn();
        }

        private updateListChild(): void {
            let vipAry = this._childProxy.getVipList();
            let list: IXianlvChildIconData[] = [];
            let vipLv = VipUtil.getShowVipLv();
            let childList = this._childProxy.getBattleChildList();
            for (let i = 0; i < vipAry.length; i++) {
                let vip = vipAry[i];
                let childIndex = childList[i] || 0;
                list.push({
                    vip,
                    childIndex,
                    isActed: vipLv >= vip
                });
            }
            this._listChild.replaceAll(list);
        }

        private updateZhaohuanBtn(): void {
            let costList = this._proxy.getZhaohuanCosts();
            let cost: number[];
            for (let i = costList.length - 1; i >= 0; i--) {
                let item = costList[i];
                let bagCnt = BagUtil.getPropCntByIdx(item[0]);
                if (bagCnt > 0) {
                    cost = [bagCnt, item[1]];
                    break;
                }
            }
            if (!cost) {
                let item = costList[1];
                let bagCnt = BagUtil.getPropCntByIdx(item[0]);
                cost = [bagCnt, item[1]];
            }
            this._view.btn_zhaohuan.updateView(cost[0], cost[1]);
            this._view.btn_zhaohuan.setHint(this._proxy.canZhaohuan());
        }

        private onClickAttr(): void {
            this.showView(XianyuanViewType.AttrView);
        }

        private onClickDo(): void {
            if (this._proxy.isMarried()) {
                this.showView(XianyuanViewType.Breakup);
            } else {
                this.showView(XianyuanViewType.InviteRecord);
            }
        }

        private onClickZhaohuan(): void {
            this.showView(XianyuanViewType.Zhaohuan);
        }

        //只更子女等按钮红点 todo
        private onUpdateHint(n: GameNT): void {
            let data = n.body as IHintData;
            let openIdxAry = this._proxy.getBtnOpenIdxAry();
            for (let i = 0; i < openIdxAry.length; i++) {
                let btnData: TabBaseItemData = this._listBtn.getItemAt(i);
                let hintType = this._proxy.getBtnHintPath(openIdxAry[i]);
                if (btnData && hintType && data.node == HintMgr.getType(hintType)) {
                    btnData.showHint = data.value;
                    this._listBtn.itemUpdated(btnData);
                }
            }
        }

        private updateListTap(): void {
            let btnData: TabBaseItemData[] = [];
            let openIdxAry = this._proxy.getBtnOpenIdxAry();
            for (let i = 0; i < openIdxAry.length; i++) {
                let hintPath = this._proxy.getBtnHintPath(openIdxAry[i]);
                let param: string[];
                if (hintPath) {
                    param = [ModName.Xianyuan, hintPath[hintPath.length - 1]];
                }
                btnData.push({
                    icon: 'xianlv_second_tab_' + i,
                    showHint: hintPath ? HintMgr.getHint(hintPath) : false,
                    openIdx: openIdxAry[i],
                    param
                });
            }
            this._listBtn.replaceAll(btnData);
        }

        private updateListBtnHint(): void {
            let size = this._listBtn.source.length;
            for (let i = 0; i < size; i++) {
                let data = this._listBtn.source[i];
                if (!data) {
                    continue;
                }
                data.showHint = false;//todo
                this._listBtn.itemUpdated(data);
            }
        }

        //todo
        private onClickListTap(e: eui.ItemTapEvent): void {
            let data = e.item as TabBaseItemData;
            if (!data || !data.param) {
                PromptBox.getIns().show(`尚未开启，敬请期待！`);
                return;
            }
            if (data.openIdx && !ViewMgr.getIns().checkViewOpen(data.openIdx, true)) {
                return;
            }
            let [m, v] = data.param;
            ViewMgr.getIns().showView(m, v, true);
        }

        private onRoleUpdate(n: GameNT): void {
            let keys = n.body as string[];
            if (keys.indexOf(RolePropertyKey.Xtlqcoin) > -1) {
                this.updateZhaohuanBtn();
            }
        }

        private onBagUpdateByPropIndex(n: GameNT): void {
            let indexs = n.body as number[];
            let costs = this._proxy.getZhaohuanCosts();
            if (costs[1] && costs[1][0] && indexs.indexOf(costs[1][0]) > -1) {
                this.updateZhaohuanBtn();
            }
        }
    }
}