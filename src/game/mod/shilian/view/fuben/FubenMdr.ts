namespace game.mod.shilian {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import Event = egret.Event;
    import material_item = msg.material_item;
    import LanDef = game.localization.LanDef;
    import MaterialFubenConfig = game.config.MaterialFubenConfig;
    import PropConfig = game.config.PropConfig;
    import MaterialSceneConfig = game.config.MaterialSceneConfig;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;
    import facade = base.facade;
    import Handler = base.Handler;
    import VipConfig = game.config.VipConfig;
    import NewPrivilegeConfig = game.config.NewPrivilegeConfig;

    export class FubenMdr extends EffectMdrBase {
        private _view: FubenView = this.mark("_view", FubenView);
        private _proxy: ShilianProxy;

        private _itemList: ArrayCollection;
        private _btnList: ArrayCollection;
        private _selType: number;/**当前选中的副本类型*/
        private _selInfo: material_item;/**当前选中的副本信息*/
        private _selCfg: MaterialFubenConfig;/**当前选中的副本配置*/
        private _cost: number[];//重置消耗
        private _canSweep: boolean;//是否可以扫荡
        private _isMax: boolean;//达到最大关卡

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Shilian);

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._itemList;

            this._btnList = new ArrayCollection();
            this._view.list_type.itemRenderer = TabSecondItem;
            this._view.list_type.dataProvider = this._btnList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_type, Event.CHANGING, this.onClickType);
            addEventListener(this._view.img_cost, TouchEvent.TOUCH_TAP, this.onClickCost);
            addEventListener(this._view.btn_more1, TouchEvent.TOUCH_TAP, this.onClickMore1);
            addEventListener(this._view.btn_more2, TouchEvent.TOUCH_TAP, this.onClickMore2);
            addEventListener(this._view.btn_more3, TouchEvent.TOUCH_TAP, this.onClickMore3);
            addEventListener(this._view.btn_reset, TouchEvent.TOUCH_TAP, this.onClickReset);
            addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);
            this.onNt(ShilianEvent.ON_FUBEN_INFO_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this.initShow();
            this.initTypeList();
            this.typeUpdateInfo();
            this.updateTypeListHint();
        }

        protected onHide(): void {
            GuideMgr.getIns().clear(GuideKey.FubenChallege);//清除指引
            super.onHide();
        }

        private initShow(): void {
            this.addEftByParent(UIEftSrc.Btn, this._view.btn_challenge.group_eft);
        }

        private onClickType(e: Event) {
            let type = this._proxy.typeList[this._view.list_type.selectedIndex];
            if (type == this._selType) {
                return;
            }
            if (!this._proxy.isFubenOpen(type, true)) {
                e.preventDefault();
                return;
            }
            this.setSelType(type);
            this.typeUpdateInfo();
        }

        private onClickCost(): void {
            let idx = this._cost[0];
            ViewMgr.getIns().showPropTips(idx);
        }

        private onClickMore1(): void {
            ViewMgr.getIns().openVipView();
        }

        private onClickMore2(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.PrerogativeWrit2);
        }

        private onClickMore3(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.RoleRing);
        }

        private onClickReset(): void {
            if (!this._selCfg) {
                return;
            }
            let isFree = this._selInfo && this._selInfo.free;
            if (!isFree) {
                if (!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                    return;
                }
            }
            let self = this;
            ViewMgr.getIns().showConfirm("是否重置副本进度?重置进度后可再次挑战获得奖励", Handler.alloc(this, function () {
                self._proxy.c2s_material_reset(self._selType);
            }));

        }

        private onClickChallenge(): void {
            if (this._isMax) {
                PromptBox.getIns().show(getLanById(LanDef.pass));
                return;
            }
            if (this._canSweep) {
                this._proxy.c2s_material_sweep(this._selType);
                return;
            }
            this._proxy.c2s_material_enter(this._selType);
        }

        private onInfoUpdate(): void {
            this.updateTypeListHint();
            this.updateInfo();
        }

        private initTypeList(): void {
            let datas: TabBaseItemData[] = [];
            for (let i = 0; i < this._proxy.typeList.length; ++i) {
                let type = this._proxy.typeList[i];
                let icon = "fuben_type_" + type;
                let nameIcon = "fuben_name_" + type;
                datas.push({ icon: icon, nameIcon: nameIcon });
            }
            this._btnList.source = datas;
            let type = this._proxy.typeList[0];
            let selType = super.decodeShowArgs(true);
            if (selType != null) {
                type = selType;
            }

            this.setSelType(type);
            this._view.list_type.selectedIndex = this._selType - 1;
        }

        private setSelType(type: number): void {
            this._selType = type;
            this._proxy.selType = this._selType;
            ViewMgr.getIns().lastData = [ShilianMainBtnType.Fuben, this._selType + ""];
            this.showGuide();
        }

        private updateTypeListHint(): void {
            let list: TabBaseItemData[] = this._btnList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                let btnData = list[i];
                let type = this._proxy.typeList[i];
                let hintType1 = this._proxy.getChallengeHintType(type);
                let hintType2 = this._proxy.getResetHintType(type);
                let hint = HintMgr.getHint(hintType1) || HintMgr.getHint(hintType2);
                if (!!btnData.showHint != hint) {//过滤undefined!=false
                    btnData.showHint = hint;
                    this._btnList.itemUpdated(btnData);
                }
            }
        }

        private typeUpdateInfo(): void {
            this._selCfg = getConfigByNameId(ConfigName.MaterialFuben, this._selType);
            this.updateShow();
            this.updateInfo();
            this.updateMore();
        }

        private updateShow(): void {
            let titleStr = this._selCfg.name;
            this.sendNt(MainEvent.UPDATE_WND_BASE_MDR_TITLE, titleStr);
            let bgStr = "fuben_bg_" + this._selType;
            this.sendNt(MainEvent.UPDATE_WND_BASE_MDR_BG, bgStr);
            let giftStr = "fuben_gift_" + this._selType;
            this._view.btn_gift.iconDisplay.source = giftStr;
            this._view.btn_gift.updateGift(this._selCfg.buyId);

            let index = this._proxy.getPropIndex(this._selType);
            let cfg: PropConfig = GameConfig.getPropConfigById(index);
            let moreStr = getLanById(LanDef.gengduo) + cfg.name;
            this._view.lab_more.text = moreStr;
        }

        private updateInfo(): void {
            this._selInfo = this._proxy.getFubenInfo(this._selType);

            let maxLv = this._selInfo && this._selInfo.history_lv ? this._selInfo.history_lv : 0;
            let curLv = this._selInfo && this._selInfo.lvl ? this._selInfo.lvl : 1;
            let cfgList: MaterialSceneConfig[] = getConfigByNameId(ConfigName.MaterialScene, this._selType);
            this._isMax = maxLv == curLv && !cfgList[maxLv + 1];

            let maxStr = maxLv + "层";
            this.addBmpFont(maxStr, BmpTextCfg[BmpTextType.Layer], this._view.grp_maxLv, true, 0.8, false, 0, true);

            // let lvStr = "d" + ResUtil.getChineseFontStr(curLv) + "c";
            let lvStr = "第" + StringUtil.getCNBynumber(+curLv) + "层";
            this.addBmpFont(lvStr, BmpTextCfg[BmpTextType.ChineseLayer], this._view.grp_lv, false, 1, true);

            //奖励
            let cfg = cfgList[curLv];
            let rewardId = cfg.reward;
            let rewardCfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, rewardId);
            this._itemList.source = rewardCfg.content;

            let openLimit = this._selCfg.mopup_open;
            this._canSweep = maxLv >= openLimit && maxLv > curLv - 1 && !this._isMax;//可扫荡

            this._view.btn_challenge.labelDisplay.text = this._canSweep ? getLanById(LanDef.sweep) : getLanById(LanDef.tishi_30);
            let power = cfg.show_power;
            let canChallenge = RoleVo.ins.showpower.toNumber() >= power && !this._isMax;
            this._view.btn_challenge.redPoint.visible = this._canSweep || canChallenge;

            this._view.grp_reset.visible = curLv > 1;
            if (this._view.grp_reset.visible) {
                this.updateResetGrp();
            }

            this._view.recommendPower.setPowerValue(power);
        }

        private updateResetGrp(): void {
            let isFree = this._selInfo && !!this._selInfo.free;
            let str = "";
            let canReset = isFree;
            this._cost = this._selCfg.cost[0];
            let idx = this._cost[0];
            let cfg: PropConfig = GameConfig.getPropConfigById(idx);
            if (isFree) {
                str = TextUtil.addColor(getLanById(LanDef.bosshome_tips5), BlackColor.GREEN);
            }
            else {
                let costCnt = this._cost[1];
                let curCnt = BagUtil.getPropCntByIdx(idx);
                canReset = curCnt >= costCnt;
                str = TextUtil.addColor(curCnt + "", canReset ? BlackColor.GREEN : BlackColor.RED);
            }
            this._view.img_cost.source = cfg.icon;
            this._view.lab_cost.textFlow = TextUtil.parseHtml(str);
            this._view.btn_reset.redPoint.visible = canReset;
        }

        private showGuide(): void {
            if (this._selType == FubenType.Type1) {
                GuideMgr.getIns().show(GuideKey.FubenChallege, this._view.btn_challenge, Handler.alloc(this, this.onClickChallenge));//任务指引
            }
            else {
                GuideMgr.getIns().clear(GuideKey.FubenChallege);//清除指引
            }
        }

        //刷新更多加成
        private updateMore(): void {
            //当前vip加成
            let vipCfg: VipConfig = getConfigByNameId(ConfigName.Vip, RoleVo.ins.vip_lv);
            let addVal1 = 0;
            if (vipCfg) {
                let cfg1: NewPrivilegeConfig = getConfigByNameId(ConfigName.NewPrivilege, vipCfg.privilege_id);
                addVal1 = this._proxy.getPrivilegeAdd(cfg1, this._selCfg.type);
            }
            this._view.btn_more1.labelDisplay.text = addVal1 + "%";

            //上清令加成
            let cfgs = StoreUtil.getDirectShopCfgListByType(DirectShopType.PrerogativeWrit);
            let productId2 = cfgs[PrerogativeWritType.Shangqing - 1].product_id;
            let cfgList = PayUtil.getPrivilegeCfgList(productId2);
            let cfg2 = cfgList[0] || null;
            let addVal2 = this._proxy.getPrivilegeAdd(cfg2, this._selCfg.type);
            this._view.btn_more2.labelDisplay.text = addVal2 + "%";

            //主角光环加成
            let cfg3: NewPrivilegeConfig = getConfigByNameId(ConfigName.NewPrivilege, PrivilegeIdx.RoleRing);
            let addVal3 = this._proxy.getPrivilegeAdd(cfg3, this._selCfg.type);
            this._view.btn_more3.labelDisplay.text = addVal3 + "%";
        }
    }
}