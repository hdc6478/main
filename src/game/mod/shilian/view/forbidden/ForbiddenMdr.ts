namespace game.mod.shilian {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import ForbiddenFubenConfig = game.config.ForbiddenFubenConfig;
    import ForbiddenGateConfig = game.config.ForbiddenGateConfig;
    import Monster1Config = game.config.Monster1Config;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;
    import ItemTapEvent = eui.ItemTapEvent;
    import forbidden_item = msg.forbidden_item;
    import facade = base.facade;

    export class ForbiddenMdr extends EffectMdrBase {

        private _view: ForbiddenView = this.mark("_view", ForbiddenView);

        private _proxy: ShilianProxy;

        private _listTypeData: ArrayCollection;
        private _listBigGateData: ArrayCollection;
        private _listAwdData: ArrayCollection;

        private _curTypeSelIdx: number;         // 当前选中的分类索引
        private _curBigGateSelIdx: number = 0;          // 当前选中的大关卡索引
        private _curBigGateData: { info: forbidden_item, cfg: ForbiddenFubenConfig, isOpen: boolean, isFinished: boolean };
        private _bigGateCfg: ForbiddenGateConfig;
        private _fubenCfgAry: ForbiddenGateConfig;
        private _effId: number;
        private readonly BTN_CENTER: number = 360;
        private readonly BTN_SAODANG: number = 250;
        private readonly BTN_FIGHT: number = 483;

        protected onInit(): void {
            super.onInit();

            this._view.touchEnabled = false;
            this._view.horizontalCenter = 0;

            this._proxy = this.retProxy(ProxyType.Shilian);

            this._listTypeData = new ArrayCollection();
            this._view.list_type.dataProvider = this._listTypeData;
            this._view.list_type.itemRenderer = TabSecondItem;

            this._listBigGateData = new ArrayCollection();
            this._view.list_big_gate.dataProvider = this._listBigGateData;
            this._view.list_big_gate.itemRenderer = ForbiddenGateItemRender;

            this._listAwdData = new ArrayCollection();
            this._view.list_awd.dataProvider = this._listAwdData;
            this._view.list_awd.itemRenderer = Icon;
        }

        protected addListeners(): void {
            super.addListeners();

            this.onNt(ShilianEvent.ON_FORBIDDEN_INFO_UPDATE, this.onInfoUpdate, this);
            this.onNt(ShilianEvent.ON_FORBIDDEN_AWD_UPDATE, this.onInfoUpdate, this);
            // this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);

            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickTypeList);
            addEventListener(this._view.list_big_gate, ItemTapEvent.ITEM_TAP, this.onClickBigGateList);
            addEventListener(this._view.gate_awd, TouchEvent.TOUCH_TAP, this.onClickGateAwd);
            addEventListener(this._view.btn_saodan, TouchEvent.TOUCH_TAP, this.onClickSaodan);
            addEventListener(this._view.btn_fight, TouchEvent.TOUCH_TAP, this.onClickFight);
        }

        protected onShow(): void {
            super.onShow();

            // let types = this._proxy.getFbdTypes();
            // if(this._listTypeData.length) {
            //     this._listTypeData.replaceAll(types);
            // } else {
            //     this._listTypeData.source = types;
            // }

            this.updateInfo(true);
        }

        protected onHide(): void {
            this._effId = 0;
            super.onHide();
        }

        private onInfoUpdate(): void {
            this.updateInfo();
        }

        private updateInfo(isInit?: boolean) {
            let typeDatas: TabBaseItemData[] = [];
            let bool: boolean = false;
            this._proxy.curFbdType = 1;
            for (let type = 1; type <= 5; type++) {
                let isOpen = this._proxy.isFbdTypeOpen(type);
                let tData: TabBaseItemData = {
                    icon: "fbd_type" + type,
                    nameIcon: "fbd_title" + type,
                    showHint: this._proxy.getFbdTypeHint(type),
                    gray: !isOpen
                };
                typeDatas.push(tData);

                let finish: boolean = this._proxy.isFinishByType(type);
                if ((!this._proxy.curFbdType || bool != finish) && isOpen) {
                    bool = finish;
                    this._proxy.curFbdType = type;
                    this._curTypeSelIdx = type - 1;
                }
            }
            this._listTypeData.replaceAll(typeDatas);

            if(isInit){
                //判断外部界面是否跳转进来，优先选中跳转的
                let selType = super.decodeShowArgs(true);
                if (selType != null) {
                    let type = selType;
                    this._proxy.curFbdType = type;
                    this._curTypeSelIdx = type - 1;
                }
            }
            this._view.list_type.selectedIndex = this._curTypeSelIdx;
            this.updateCurTypeInfo();
        }

        private clearShow() {
            this._listBigGateData.removeAll();
            this._view.lab_gate.text = "";
            this._view.lab_boss_name.text = "";
            this._view.gate_awd.visible = false;
            this._view.grp_eff.visible = false;
            // this._view.btn_saodan.visible = false;
            this._view.btn_fight.visible = false;
            // this._view.lab_saodang_times.text = "";
            this._view.grp_awd_list.visible = false;
            this._view.grp_saodang.visible = false;
        }

        /**
         * 更新当前选中类型数据
         */
        private updateCurTypeInfo() {
            let bgStr = "forbidden_bg_" + this._proxy.curFbdType;
            this.sendNt(MainEvent.UPDATE_WND_BASE_MDR_BG, bgStr);

            this._curBigGateData = null;
            let curInfo: forbidden_item = this._proxy.getFbdInfo(this._proxy.curFbdType);
            let fbdFubenCfgs: { [bigGateId: string]: ForbiddenFubenConfig } = this._proxy.getFbdFubenCfgByType(this._proxy.curFbdType);
            if (!curInfo || !fbdFubenCfgs) {
                this.clearShow();
                return;
            }

            let bigGateDatas: IFbdGateData[] = [];
            let flag = false;
            let oldFinished: boolean;           // 前一关已完成
            let lastOpen: boolean;
            let i = 0;
            for (let idx in fbdFubenCfgs) {
                let cfg = fbdFubenCfgs[idx];
                let info1: forbidden_item = (curInfo.index == cfg.index) ? curInfo : null;

                let isFinished: boolean = this._proxy.isBigGateFinished(this._proxy.curFbdType, cfg.index);
                let isLimitOpen = RoleUtil.isLimitOpen(cfg.open);//是否达到开启限制条件
                let isOpen: boolean = cfg.index <= curInfo.index || (oldFinished && isLimitOpen);
                // let isCur = (cfg.index == curInfo.index && !isFinished
                //     || (cfg.index > curInfo.index && oldFinished && RoleUtil.isLimitOpen(cfg.open)));       // 当前大关卡
                let isCur = cfg.index == curInfo.index//已完成的也可以选中，防止取不到数据
                    || (cfg.index > curInfo.index && oldFinished && isLimitOpen);       // 当前大关卡
                let gateData: IFbdGateData = {
                    info: info1,
                    cfg: cfg,
                    isOpen: isOpen,
                    isFinished: isFinished,
                    //showOpenStr: lastOpen && !isLimitOpen//限制条件开启后不显示文本
                    showOpenStr: lastOpen,
                    isLimitOpen: isLimitOpen
                };
                if (isCur && (!this._curBigGateData || isFinished != oldFinished)) {
                    this._curBigGateData = gateData;
                    this._curBigGateSelIdx = i;
                    this._proxy.curFbdBigGateId = this._curBigGateData.cfg.index;
                    flag = true;
                }
                bigGateDatas.push(gateData);
                oldFinished = isFinished;
                lastOpen = isOpen;
                i++;
            }

            this._listBigGateData.replaceAll(bigGateDatas);
            if (flag) {
                this._view.list_big_gate.selectedIndex = this._curBigGateSelIdx;
            }
            this.updateCurBigGateInfo();
        }

        /**
         * 更新大关卡数据
         */
        private updateCurBigGateInfo(): void {
            //已通关，扫荡和挑战
            //已通关的情况下，不显示挑战，（ForbiddenType.Type1显示已通关，其他的扫荡居中）

            let isFinished: boolean = this._proxy.isBigGateFinished(this._proxy.curFbdType, this._curBigGateData.cfg.index);
            this._view.btn_fight.visible = !isFinished;
            this._view.btn_fight.redPoint.visible = this._proxy.getChallengeHint(this._proxy.curFbdType);//挑战红点

            if (this._proxy.curFbdType == ForbiddenType.Type1) {
                //没有扫荡
                this._view.grp_saodang.visible = false;
                this._view.img_finished.visible = isFinished;
                this._view.btn_fight.x = this.BTN_CENTER;
            } else {
                //没有已完成
                this._view.img_finished.visible = false;

                this._view.grp_saodang.visible = true;
                this._view.grp_saodang.x = isFinished ? this.BTN_CENTER : this.BTN_SAODANG;
                this._view.btn_fight.x = this.BTN_FIGHT;
            }

            let bigGateCfg0 = getConfigByNameId(ConfigName.ForbiddenGate, this._curBigGateData.cfg.index);
            if (bigGateCfg0) {
                let smallGateId;
                if (this._curBigGateData.info) {
                    smallGateId = isFinished ? this._curBigGateData.info.id : this._curBigGateData.info.id + 1;
                }
                this._bigGateCfg = this._curBigGateData.info && bigGateCfg0[smallGateId] || bigGateCfg0[1];      // 默认取小关卡1的数据
            }

            if (!this._bigGateCfg) {
                return;
            }

            let cfg = this._proxy.getGateEndCfg(this._curBigGateData.cfg.index);
            this._view.lab_gate.text = `第${isFinished ? cfg.gate_id : this._bigGateCfg.gate_id}/${cfg.gate_id}关`;

            // boss
            let mcfg: Monster1Config = getConfigByNameId(ConfigName.Monster, this._curBigGateData.cfg.bossId[0]);
            this._view.lab_boss_name.text = mcfg ? mcfg.name : "";
            if (this._effId) {
                this.removeEffect(this._effId);
            }
            this._view.grp_eff.visible = true;
            this._effId = this.addMonster(this._curBigGateData.cfg.bossId[0], this._view.grp_eff);

            // 大奖数据
            this.updateBigAwd();

            // 列表奖励数据
            this._view.grp_awd_list.visible = true;
            let listAwdPreCfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, this._bigGateCfg.show_reward);
            listAwdPreCfg && this._listAwdData.replaceAll(listAwdPreCfg.content);

            let showpower = this._bigGateCfg.show_power
            this.addBmpFont(showpower + '', BmpTextCfg[BmpTextType.CommonPower], this._view.grp_font, true, 1, false, 0, true);

            let times = this._proxy.getSaodangTimes(this._proxy.curFbdType);

            //let str: string = "扫荡次数:" + TextUtil.addColor(`${times}/1`, WhiteColor.GREEN);
            //this._view.lab_saodang_times.textFlow = TextUtil.parseHtml(str);

            this._view.btn_saodan.label = `扫荡(${times})`;
            this._view.btn_saodan.redPoint.visible = this._proxy.getSaodangHint(this._proxy.curFbdType);
        }

        private updateBigAwd(): void {
            let type = this._proxy.curFbdType;
            let index = this._curBigGateData.cfg.index;
            let canGet = this._proxy.hasBigAwd(type, index);
            let cfg: ForbiddenGateConfig = this._proxy.getNearBigAwdCfg(index);
            this._view.gate_awd.setData(cfg, canGet);
            let maxGate = cfg.gate_id;
            let passGate = this._curBigGateData.info ? this._curBigGateData.info.id : 0;// 已通关的小关卡数
            let curInfo = this._proxy.getFbdInfo(type);
            if (curInfo && curInfo.index > index) {
                //已通关大关卡大于当前选中的关卡时，进度取最大值
                let cfg = this._proxy.getGateEndCfg(index);
                passGate = cfg.gate_id;
            }
            this._view.gate_awd.pro_rate.show(passGate, maxGate, false, 0, false);

            let hasDraw = this._proxy.hasDrawAwds(this._curBigGateData.cfg.index, maxGate);//是否领取完大奖
            this._view.gate_awd.visible = (passGate < maxGate || canGet) && !hasDraw;
        }

        // private onHintUpdate(n: GameNT) {
        //     let data: IHintData = n.body;
        // }

        private onClickTypeList(e: ItemTapEvent) {
            let itemIdx = e.itemIndex;
            let type = itemIdx + 1;
            if (type == this._proxy.curFbdType) {
                return;
            }
            let cfg = this._proxy.getFbdFirstFubenCfg(type);
            if (!cfg) {
                this._view.list_type.selectedIndex = this._curTypeSelIdx;
                PromptBox.getIns().show("即将开启");
                return;
            }
            let isOpen = this._proxy.isFbdTypeOpen(type, true);
            if (!isOpen) {
                this._view.list_type.selectedIndex = this._curTypeSelIdx;
                return;
            }

            this._proxy.curFbdType = type;
            this._curTypeSelIdx = itemIdx;
            this.updateCurTypeInfo();
        }

        private onClickBigGateList(e: ItemTapEvent) {
            let itemData: IFbdGateData = e.item;
            if (!itemData.isOpen) {
                let tips = "战力深不可测";
                if (itemData.showOpenStr) {
                    tips = itemData.isLimitOpen ? "请先通关前面关卡" : "暂未开启";
                }
                PromptBox.getIns().show(tips);
                this._view.list_big_gate.selectedIndex = this._curBigGateSelIdx;
                return;
            }
            this._curBigGateData = itemData;
            this._curBigGateSelIdx = e.itemIndex;
            this._proxy.curFbdBigGateId = this._curBigGateData.cfg.index;
            this.updateCurBigGateInfo();
        }

        private onClickGateAwd(e: TouchEvent) {
            let awd0 = this._proxy.getFbdAwd2(this._proxy.curFbdType, this._curBigGateData.cfg.index);
            if (!awd0 || !awd0.length || !this._view.gate_awd.canGet) {
                return;
            }
            let awd = awd0.shift();
            this._proxy.c2s_get_reward(awd.index, awd.id);
        }

        private onClickSaodan(e: TouchEvent) {
            let times = this._proxy.getSaodangTimes(this._proxy.curFbdType);
            let tips = `已通关${this._bigGateCfg.gate_id}层,扫荡可得:`;
            let tips1 = `层数越高,奖励越高`;
            let listAwdPreCfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, this._bigGateCfg.show_reward);
            if (times>0){
                ViewMgr.getIns().showBoxReward(tips,listAwdPreCfg.content,tips1);
                ViewMgr.getIns().showSecondPop(ModName.Shilian, ShilianViewType.ForbiddenSaodang, [this._proxy.curFbdType, this._curBigGateData]);
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.Shilian, ShilianViewType.ForbiddenSaodang, [this._proxy.curFbdType, this._curBigGateData]);
        }

        private onClickFight(e: TouchEvent) {
            if (!this._curBigGateData) {
                return;
            }
            this._proxy.c2s_forbidden_enter(this._proxy.curFbdType);
            facade.hideView(ModName.Shilian, ShilianViewType.ShilianMain);
        }

    }

    export interface IFbdGateData {
        info: forbidden_item;
        cfg: ForbiddenFubenConfig;
        isOpen: boolean;
        isFinished: boolean;
        showOpenStr: boolean;
        isLimitOpen: boolean//是否达到开启限制条件
    }
}