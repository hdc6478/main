namespace game.mod.role {

    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import ItemTapEvent = eui.ItemTapEvent;
    import Handler = base.Handler;
    import facade = base.facade;
    import PropertyEvent = eui.PropertyEvent;
    import equip_strength_data = msg.equip_strength_data;

    export class RoleInfoMdr extends EffectMdrBase {
        private _view: RoleInfoView = this.mark("_view", RoleInfoView);

        private _equipProxy: IEquipProxy;
        private _proxy: RoleProxy;
        private _listBtn: eui.ArrayCollection;
        private _enhanceProxy: IEnhanceProxy;

        private _btnData: TabBaseItemData[] = [
            {
                icon: "yuyi_tab_icon",
                openIdx: OpenIdx.Wing,
                param: [ModName.Role, NewRoleViewType.Wing],
                rankType: RankType.Yuyi
            },
            {
                icon: "shizhuang_tab_icon",
                openIdx: OpenIdx.Body,
                param: [ModName.Role, NewRoleViewType.Body],
                guideKey: GuideKey.RoleBody
            },
            {
                icon: "shenbing_tab_icon",
                openIdx: OpenIdx.Weapon,
                param: [ModName.Role, NewRoleViewType.Weapon],
                rankType: RankType.Shenbing
            },
            {
                icon: "lingbao_tab_icon",
                openIdx: 0,
                param: null
            }
        ];


        protected onInit(): void {
            super.onInit();
            this._equipProxy = getProxy(ModName.Equip, ProxyType.Equip);
            this._enhanceProxy = getProxy(ModName.Enhance, ProxyType.Enhance);
            this._proxy = this.retProxy(ProxyType.Role);

            this._view.list_btn.itemRenderer = TabSecondItem;
            this._view.list_btn.dataProvider = this._listBtn = new eui.ArrayCollection();
            this._view.btn_xiuxiannupu.setHintStyle(-6,0);
        }

        protected addListeners() {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.power2.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr);
            addEventListener(this._view.btn_oneKey, egret.TouchEvent.TOUCH_TAP, this.onClickOneKey);
            addEventListener(this._view.icon0, egret.TouchEvent.TOUCH_TAP, this.onClick);
            addEventListener(this._view.icon1, egret.TouchEvent.TOUCH_TAP, this.onClick);
            addEventListener(this._view.icon2, egret.TouchEvent.TOUCH_TAP, this.onClick);
            addEventListener(this._view.icon3, egret.TouchEvent.TOUCH_TAP, this.onClick);
            addEventListener(this._view.btn_suit, egret.TouchEvent.TOUCH_TAP, this.onClickSuit);
            addEventListener(this._view.btn_collect, egret.TouchEvent.TOUCH_TAP, this.onClickCollect);
            addEventListener(this._view.btn_huanHua, egret.TouchEvent.TOUCH_TAP, this.onClickHuanHua);
            addEventListener(this._view.list_btn, eui.ItemTapEvent.ITEM_TAP, this.onClickBtnList);
            addEventListener(this._view.list_btn, PropertyEvent.PROPERTY_CHANGE, this.onListChange);
            addEventListener(this._view.equip_list.list_equip, eui.ItemTapEvent.ITEM_TAP, this.onClickList);
            addEventListener(this._view.btn_xiuxiannupu, egret.TouchEvent.TOUCH_TAP, this.onClickXiuxianNvpu);

            this.onNt(EquipEvent.EQUIP_UPDATE_BACK, this.updateViewByPost, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
            this.onNt(JiBanEvent.ON_GATHER_INFO_UPDATE, this.showCollectGuide, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
            this.onNt(ActivityEvent.ON_UPDATE_PUNSHLIST_TYPE, this.onUpdateBtn, this);
        }

        protected onShow() {
            super.onShow();
            this.updateView();
            this._listBtn.replaceAll(this._btnData);
            this.updateIcon();//todo
            this.updateBtnHint();
            this.showGuide();
            this.updateGod();
            this.onUpdateBtn();
            this.updateXiuxianNvpuBtn();
        }

        private updateView(): void {
            this._view.lb_name.text = RoleVo.ins.name + '';
            this.updateViewByPost();
            this.updateIconHint();
        }

        private updateViewByPost(): void {
            let lvList: number[] = [];
            for (let pos of EquipPosAry) {
                let info1: equip_strength_data = this._enhanceProxy.getStrengthInfo(pos);
                lvList.push(info1 ? info1.strength_lv : 0);
            }
            this._view.equip_list.updateEquip(lvList);

            this.updatePower();
            this.updateRole();
        }

        private updatePower(): void {
            this._view.power2.setPowerValue(RoleVo.ins.showpower);
        }

        private updateRole(): void {
            this.updateSelfUIRole(this._view.gr_role);
        }

        private updateGod(): void {
            this._view.btn_god.updateGod(RoleVo.ins.god || 0);
        }

        protected onHide() {
            GuideMgr.getIns().clear(GuideKey.RoleEquip);//清除指引
            GuideMgr.getIns().clear(GuideKey.RoleCollect);//清除指引
            GuideMgr.getIns().clear(GuideKey.RoleBody);//清除指引
            super.onHide();
        }

        private onClickSuit(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.SuitType1, true)) {
                return;
            }
            ViewMgr.getIns().showView(ModName.Role, NewRoleViewType.SuitMain);
        }

        //点击收集
        private onClickCollect(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.RoleCollect, true)) {
                return;
            }
            ViewMgr.getIns().showView(ModName.Jiban, JibanViewType.JibanMain, JibanMainBtnType.Collect);
        }

        //点击幻化
        private onClickHuanHua(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.RoleHuanhua, true)) {
                return;
            }
            ViewMgr.getIns().showView(ModName.Jiban, JibanViewType.JibanMain, JibanMainBtnType.Huanhua);
        }

        private onClickBtnList(e: ItemTapEvent): void {
            let d: TabBaseItemData = e.item;
            this.onClickBtn(d);
        }

        private onClickBtn(d: TabBaseItemData): void {
            if (d.openIdx && !ViewMgr.getIns().checkViewOpen(d.openIdx, true)) {
                return;
            }
            if (!d.param) {
                PromptBox.getIns().show(`尚未开启，敬请期待！`);
                return;
            }
            ViewMgr.getIns().showView(d.param[0], d.param[1]);
        }

        private onClickAttr(): void {
            ViewMgr.getIns().showSecondPop(ModName.Role, NewRoleViewType.RoleAttrTips);
        }

        private onClickOneKey(): void {
            if (!this._equipProxy.checkOneKey()) {
                PromptBox.getIns().show(`暂无可穿戴装备`);
                return;
            }
            this._equipProxy.c2s_equip_operate(3, null);
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let data = e.item as IconEquipData;
            if (!data) {
                return;
            }
            if (typeof data.prop === 'number') {
                PromptBox.getIns().show(getLanById(LanDef.not_equip));
                return;
            }
            ViewMgr.getIns().showRoleEquipTips(data.prop, true);
        }

        private onHintUpdate(n: GameNT): void {
            let hint = n.body as IHintData;
            if (hint.node == HintMgr.getType(this._proxy.getOpenIdxToHintType(OpenIdx.SuitType1))) {
                this._view.btn_suit.setHint(hint.value);
                return;
            }
            if (hint.node == HintMgr.getType(this._proxy.getOpenIdxToHintType(OpenIdx.RoleHuanhua))) {
                this._view.btn_huanHua.setHint(hint.value);
                return;
            }
            if (hint.node == HintMgr.getType(this._proxy.getOpenIdxToHintType(OpenIdx.RoleCollect))) {
                this._view.btn_collect.setHint(hint.value);
                return;
            }
            if (hint.node == HintMgr.getType(this._proxy.getOpenIdxToHintType(OpenIdx.XiuxianNvpu))) {
                this._view.btn_xiuxiannupu.setHint(hint.value);
                return;
            }

            if (hint.node.indexOf(HintMgr.getType(this._equipProxy.getRoleEquipIconHint())) > -1) {
                this.updateIconHint();
            }

            for (let item of this._btnData) {
                let hintType = this._proxy.getOpenIdxToHintType(item.openIdx);
                if (hintType && hint.node == HintMgr.getType(hintType)) {
                    item.showHint = hint.value;
                    this._listBtn.itemUpdated(item);
                }
            }
        }

        /**冲榜标签 */
        private onUpdateBtn(): void {
            let type: number = ActivityUtil.getType();
            for (let item of this._btnData) {
                let bool: boolean = item.rankType && item.rankType == type;
                if (bool) {
                    let open: boolean = ActivityUtil.checkOpen();
                    item.tag = open ? "chongbang1" : "";
                } else {
                    item.tag = "";
                }
                this._listBtn.itemUpdated(item);
            }
        }

        private updateIconHint(): void {
            let hintPath = this._equipProxy.getRoleEquipIconHint();
            this._view.btn_oneKey.setHint(HintMgr.getHint(hintPath));
            let hints: boolean[] = [];
            let num = EquipPosAry.length;
            for (let i = 0; i < num; i++) {
                let pos = EquipPosAry[i] + '';
                hints.push(HintMgr.getHint([...hintPath, pos]));
            }
            this._view.equip_list.updateHint(hints);
        }

        //todo
        private onClick(): void {
            PromptBox.getIns().show(`尚未开启，敬请期待！`);
        }

        //todo，icon按钮
        private updateIcon(): void {
            this._view.icon0.updateIconImg('xianyuanjiezhi_btn_icon');
            this._view.icon0.setImgLock();
            this._view.icon1.updateIconImg('wutongbaoshu_btn_icon');
            this._view.icon1.setImgLock();
            this._view.icon2.updateIconImg('hunlongtianyin_btn_icon');
            this._view.icon2.setImgLock();
            this._view.icon3.updateIconImg('huangguqishu_btn_icon');
            this._view.icon3.setImgLock();
        }

        //更新按钮红点
        private updateBtnHint(): void {
            this._view.btn_suit.setHint(HintMgr.getHint([ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain]));
            this._view.btn_huanHua.setHint(HintMgr.getHint(this._proxy.getOpenIdxToHintType(OpenIdx.RoleHuanhua)));
            this._view.btn_collect.setHint(HintMgr.getHint(this._proxy.getOpenIdxToHintType(OpenIdx.RoleCollect)));

            for (let item of this._btnData) {
                if (!item.openIdx) {
                    continue;
                }
                let node: string[] = this._proxy.getOpenIdxToHintType(item.openIdx);
                if (!node) {
                    continue;
                }
                let bool: boolean = HintMgr.getHint(node);
                if (item.showHint != bool) {
                    item.showHint = bool;
                    this._listBtn.itemUpdated(item);
                }
            }
        }

        private showGuide(): void {
            GuideMgr.getIns().show(GuideKey.RoleEquip, this._view.btn_oneKey, Handler.alloc(this, this.onClickOneKey));//任务指引
            this.showCollectGuide();
            this.showListGuide();
        }

        private showCollectGuide(): void {
            //收集指引，需要判断是否可以收集
            let _proxy: IShoujiHuanhuaProxy = facade.retMod(ModName.Jiban).retProxy(ProxyType.ShoujiHuanhua);
            if (_proxy.canTaskActGather()) {
                GuideMgr.getIns().show(GuideKey.RoleCollect, this._view.btn_collect, Handler.alloc(this, this.onClickCollect));//任务指引
            }
        }

        private showListGuide(): void {
            let num = this._view.list_btn.numChildren;
            if (!num) {
                return;
            }
            for (let i = 0; i < this._btnData.length && i < num; i++) {
                let btnData = this._btnData[i];
                let btn = this._view.list_btn.getChildAt(i);
                if (btnData.guideKey) {
                    GuideMgr.getIns().show(btnData.guideKey, btn, Handler.alloc(this, this.onClickBtn, [btnData]));//指引
                }
            }
        }

        private onListChange(e: PropertyEvent): void {
            if (e.property == "contentWidth") {
                this.showListGuide();
            }
        }

        private onRoleUpdate(n: GameNT): void {
            let keys = n.body as string[];
            if (keys.indexOf(AttrKey.god) > -1) {
                this.updateGod();
            }
        }

        //修仙女仆
        private updateXiuxianNvpuBtn(): void {
            let xiuxianNvpuProxy: XiuxianNvpuProxy = this.retProxy(ProxyType.XiuxianNvpu);
            this._view.btn_xiuxiannupu.visible = xiuxianNvpuProxy.isBought();
            let hint = HintMgr.getHint(this._proxy.getOpenIdxToHintType(OpenIdx.XiuxianNvpu));
            this._view.btn_xiuxiannupu.setHint(hint);
        }

        private onClickXiuxianNvpu(): void {
            ViewMgr.getIns().showView(ModName.Role, NewRoleViewType.XiuxianNvpuGrowMain);
        }

    }

}