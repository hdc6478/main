namespace game.mod.yijie {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;
    import HuanjingzhihaiIndexConfig = game.config.HuanjingzhihaiIndexConfig;
    import HuanjingzhihaiTypeConfig = game.config.HuanjingzhihaiTypeConfig;
    import GameNT = base.GameNT;
    import HuanjinParamConfig = game.config.HuanjinParamConfig;

    export class SeaBaseMdr extends EffectMdrBase {
        private _view: SeaBaseView = this.mark("_view", SeaBaseView);
        private _proxy: SeaProxy;
        private _canEnter: boolean;
        private _itemList: SeaFubenItem[] = [];

        private _fuchenlinghuHint = [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Fuchenlinghu];
        private _huanjingMainHint= [ModName.More, MoreViewType.HuanjingMain, HuanjingMainBtnType.Btn1];
        private _huanjingGrowMainHint: string[];

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Sea);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.grp_task, TouchEvent.TOUCH_TAP, this.onClickTask);
            addEventListener(this._view.btn_enter, TouchEvent.TOUCH_TAP, this.onClickEnter);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_boss, TouchEvent.TOUCH_TAP, this.onClickBoss);
            addEventListener(this._view.btn1, TouchEvent.TOUCH_TAP, this.onClick1);
            addEventListener(this._view.btn2, TouchEvent.TOUCH_TAP, this.onClick2);
            addEventListener(this._view.btn3, TouchEvent.TOUCH_TAP, this.onClick3);

            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);//属性刷新，有货币
            this.onNt(SeaEvent.ON_SEA_INFO_UPDATE, this.updateView, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onTaskUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            let proxy:IHuanjingProxy = facade.retMod(ModName.More).retProxy(ProxyType.Huanjing);
            //配置表 huanjin_param 配置的
            let system_id = 1;
            this._huanjingGrowMainHint = proxy.getGrowHintPath(system_id);

            this.removeEft();
            this.initShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickTask(): void {
            if (this._canEnter) {
                return;//可以进入的时候，不能打开
            }
            facade.showView(ModName.Yijie, YijieViewType.SeaTask);
        }

        private onClickEnter(): void {
            let type = this._proxy.type;
            this._proxy.c2s_huanjingzhihai_click(SeaOpType.Enter, type);
        }

        private onClickReward(): void {
            facade.showView(ModName.Yijie, YijieViewType.SeaReward);
        }

        private onClickBoss(): void {
            ViewMgr.getIns().showView(ModName.Yijie, YijieViewType.SeaBossMain);
        }

        private onClick1(): void {
            let linghuProxy: IFuchenlinghuProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Fuchenlinghu);
            if (linghuProxy.isOpenSea(SeaType.Sea1, true)) {
                ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Fuchenlinghu);
            }
        }

        private onClick2(): void {
            if (ViewMgr.getIns().checkViewOpen(OpenIdx.Huanjing, true)) {
                ViewMgr.getIns().showView(ModName.More, MoreViewType.HuanjingMain);
            }
        }

        private onClick3(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Huanjing, true)) {
                return;
            }
            let systemId = this._proxy.type;
            let cfg: HuanjinParamConfig = getConfigByNameId(ConfigName.HuanJingParam, systemId);
            if (cfg && cfg.open_id && ViewMgr.getIns().checkViewOpen(cfg.open_id, true)) {
                let huanjingProxy: IHuanjingProxy = facade.retMod(ModName.More).retProxy(ProxyType.Huanjing);
                if (!huanjingProxy.getSurfaceActedNum(systemId)) {
                    PromptBox.getIns().show(getLanById(LanDef.xiandi_tips21));
                } else {
                    ViewMgr.getIns().showView(ModName.More, MoreViewType.HuanjingGrowMain, [HuanjingGrowMainBtnType.Btn1, systemId]);
                }
            }
        }

        private onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            let roleKey = SeaTypeToRoleKey[this._proxy.type];
            if (keys.indexOf(roleKey) >= 0) {
                this.updateDefault();
            }
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            let type = this._proxy.type;
            let hintType = this._proxy.getRewardHintType(type);
            let bossHintType = this._proxy.getBossHintType(type);
            if (data.node == HintMgr.getType(hintType)) {
                this.updateRewardHint(data.value);
            } else if (data.node == HintMgr.getType(bossHintType)) {
                this.updateBossHint(data.value);
            }else if(data.node == HintMgr.getType(this._fuchenlinghuHint)){
                this.updateLinghuHint(data.value);
            }else if(data.node == HintMgr.getType(this._huanjingMainHint)){
                this.updateHuanjingMainHint(data.value);
            }
            // else if(data.node == HintMgr.getType(this.huanjingGrowMainHint)){
            //     this.updateHuanjingGrowMainHint(data.value);
            // }
        }

        private onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            let taskType = SeaTypeToTaskType[this._proxy.type];
            if (types.indexOf(taskType) > -1) {
                this.updateTaskHint();
            }
        }

        private initShow(): void {
            let type = this._proxy.type;
            let cfg: HuanjingzhihaiIndexConfig = getConfigByNameId(ConfigName.HuanjingzhihaiIndex, type);
            let descStr = StringUtil.substitute(getLanById(LanDef.sea_tips3), [cfg.name]);
            this._view.lab_desc.text = descStr;

            let item = this._view.btn_boss["item"] as CoinItem;
            item.setData(PropIndex.HuanjingBossTiaozhanling);
            this._view.img_icon1.source = "sea" + type + "_icon1";
            this._view.img_icon2.source = "sea" + type + "_icon2";
            this._view.img_icon3.source = "sea" + type + "_icon3";

            this._view.btn3.iconDisplay.source = "sea" + type + "_btn3";

            this._itemList = [
                this._view.item1,
                this._view.item2,
                this._view.item3,
                this._view.item4,
                this._view.item5
            ];
        }

        private updateView(): void {
            let type = this._proxy.type;
            let isEnter = this._proxy.isEnter(type);
            this._view.grp_enter.visible = isEnter;
            this._view.grp_default.visible = !isEnter;
            if (isEnter) {
                this.updateEnter();
                this.updateHint();
                this._view.group_eft.removeChildren();
                this.sendNt(MainEvent.UPDATE_WND_BASE_MDR_BG, "sea_enter_bg1");//todo，只有一个背景
            } else {
                this.updateDefault();
                this.updateTaskHint();
                this.sendNt(MainEvent.UPDATE_WND_BASE_MDR_BG, "sea_bg1");//todo，只有一个背景
                this._view.group_eft.removeChildren();
                this.addEftByParent(UIEftSrc.HuanJingFangDian, this._view.group_eft);
            }
        }

        private updateDefault(): void {
            let type = this._proxy.type;
            let cfg: HuanjingzhihaiIndexConfig = getConfigByNameId(ConfigName.HuanjingzhihaiIndex, type);
            let cost = cfg.active_cost[0];
            let costIndex = cost[0];
            let costCnt = cost[1];
            let curCnt = BagUtil.getPropCntByIdx(costIndex);
            let needCnt = costCnt - curCnt;
            this._canEnter = needCnt <= 0;//可以进入幻境之海

            this._view.btn_enter.visible = this._view.btn_enter.redPoint.visible = this._canEnter;
            this.addEftByParent(UIEftSrc.XiTongJiHuo, this._view.btn_enter.group_eft);
            let tips1 = "";
            if (this._canEnter) {
                //可以进入
                tips1 = TextUtil.addColor(getLanById(LanDef.sea_tips6), BlackColor.GREEN) + getLanById(LanDef.sea_tips);
            } else {
                let needCntStr = TextUtil.addColor(needCnt + "", BlackColor.RED);
                tips1 = StringUtil.substitute(getLanById(LanDef.sea_tips4), [needCntStr]);
            }
            this._view.lab_tips1.textFlow = TextUtil.parseHtml(tips1);

            let cnt = this._proxy.getEnterCnt(type);
            let cntStr = TextUtil.addColor(cnt + "", BlackColor.GREEN);
            let tips2 = StringUtil.substitute(getLanById(LanDef.sea_tips5), [cntStr]) + cfg.name;
            this._view.lab_tips2.textFlow = TextUtil.parseHtml(tips2);

            let taskVal = Math.round(curCnt * 100 / costCnt);
            this._view.lab_task.text = taskVal + "%";
        }

        private updateEnter(): void {
            let type = this._proxy.type;
            let cfgList: HuanjingzhihaiTypeConfig[] = [];
            let cfgInfos: object = getConfigByNameId(ConfigName.HuanjingzhihaiType, type);
            for (let k in cfgInfos) {
                let cfg: HuanjingzhihaiTypeConfig = cfgInfos[k];
                cfgList.push(cfg);
            }

            for (let i = 0; i < this._itemList.length && i < cfgList.length; ++i) {
                let item = this._itemList[i];
                let cfg = cfgList[i];
                item.data = cfg;
            }
        }

        private updateHint(): void {
            let type = this._proxy.type;
            let hintType = this._proxy.getRewardHintType(type);
            this.updateRewardHint(HintMgr.getHint(hintType));

            let bossHintType = this._proxy.getBossHintType(type);
            this.updateBossHint(HintMgr.getHint(bossHintType));

            this.updateLinghuHint(HintMgr.getHint(this._fuchenlinghuHint));
            this.updateHuanjingMainHint(HintMgr.getHint(this._huanjingMainHint));
            this.updateHuanjingGrowMainHint(HintMgr.getHint(this._huanjingGrowMainHint));

        }

        private updateRewardHint(hint: boolean): void {
            this._view.btn_reward.redPoint.visible = hint;
        }

        private updateBossHint(hint: boolean): void {
            this._view.btn_boss.redPoint.visible = hint;
        }

        private updateTaskHint(): void {
            let type = this._proxy.type;
            let taskType = SeaTypeToTaskType[type];
            let taskHint = TaskUtil.getTaskHint(taskType);
            this._view.redPoint.visible = taskHint && !this._canEnter;
        }

        private updateLinghuHint(hint: boolean){
            this._view.btn1.redPoint.visible = hint;
        }

        private updateHuanjingMainHint(hint: boolean){
            this._view.btn2.redPoint.visible = hint;
        }

        private updateHuanjingGrowMainHint(hint: boolean){
            this._view.btn3.redPoint.visible = hint;
        }
    }
}