namespace game.mod.activity {


    import ArrayCollection = eui.ArrayCollection;
    import ItemTapEvent = eui.ItemTapEvent;
    import TouchEvent = egret.TouchEvent;
    import ParamConfig = game.config.ParamConfig;
    import LanDef = game.localization.LanDef;
    import Tween = base.Tween;
    import HorseConfig = game.config.HorseConfig;
    import GameNT = base.GameNT;

    export class RoleRingMdr extends EffectMdrBase {
        private _view: RoleRingView = this.mark("_view", RoleRingView);
        private _proxy: RoleRingProxy;
        private _btnList: ArrayCollection;
        private _selType: number;/**当前选中的类型*/
        private _lastSelType: number;/**上一次选中的类型*/
        private _canDraw: boolean;
        private _isAct: boolean;
        private _canDrawExp: boolean;

        private _eftIdEgg: number;
        private _eftStrEgg: string;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.RoleRing);

            this._btnList = new ArrayCollection();
            this._view.list_type.itemRenderer = TabSecondItem;
            this._view.list_type.dataProvider = this._btnList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.grp_exp, TouchEvent.TOUCH_TAP, this.onClickExp);
            addEventListener(this._view.grp_egg, TouchEvent.TOUCH_TAP, this.onClickEgg);
            addEventListener(this._view.btn_god, TouchEvent.TOUCH_TAP, this.onClickGod);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);

            this.onNt(ActivityEvent.ON_ROLE_RING_UPDATE, this.onInfoUpdate, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initTypeList();
            this.updateViewState();
        }

        protected onHide(): void {
            //this.removeEggTween();
            this._lastSelType = 0;
            this._eftStrEgg = null;
            super.onHide();
        }

        private onClickExp(): void {
            if(!this._isAct){
                //未激活
                PromptBox.getIns().show(getLanById(LanDef.role_ring_tips3));
                return;
            }
            if(!this._canDrawExp){
                return;
            }

            let type = this._selType;
            this._proxy.c2s_role_ring_receive(type, RoleRingOpType.Type1);
        }

        private onClickEgg(): void {
            let type = this._selType;
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.RoleRingUp, type);
        }

        private onClickGod(): void {
            ViewMgr.getIns().showView(ModName.God,GodViewType.GodMain);
        }

        private onClickReward(): void {
            let type = this._selType;
            if(this._canDraw){
                this._proxy.c2s_role_ring_receive(type, RoleRingOpType.Type2);
                return;
            }
            ViewMgr.getIns().openCommonRechargeView();
        }

        private onClickType(e: ItemTapEvent) {
            let type = e.itemIndex + 1;
            if(type == this._selType){
                return;
            }
            this.setSelType(type);
            this.typeUpdateInfo();
        }

        private onInfoUpdate(): void {
            this.updateViewState();
        }

        private initTypeList(): void {
            let datas: TabBaseItemData[] = [];
            for(let i = RoleRingType.Type1; i <= RoleRingType.Type3; ++i){
                let type = i;
                let icon = "rolering_" + type;
                let nameIcon = "rolering_name_" + type;
                let hintType = this._proxy.getHintType(i - 1);
                let hint = HintMgr.getHint(hintType);
                datas.push({icon: icon, nameIcon: nameIcon, showHint: hint});
            }
            this._btnList.source = datas;
            let type = RoleRingType.Type1;
            let selType = super.decodeShowArgs(true);
            if (selType != null) {
                type = selType
            }

            this.setSelType(type);
            this._view.list_type.selectedIndex = this._selType - 1;
        }

        private setSelType(type: number): void {
            this._selType = type;
            //this._proxy.selType = this._selType;
            let titleStr = "role_ring_title" + type;
            this.sendNt(MainEvent.UPDATE_WND_BASE_MDR_TITLE, titleStr);
            ViewMgr.getIns().lastData = [MdrTabBtnType.TabBtnType01, this._selType + ""];
        }

        private updateViewState(): void {
            this._isAct = this._proxy.isRoleRingAct();
            //未激活
            this._view.currentState = !this._isAct ? "1" : "2";
            this._view.list_type.visible = this._isAct;

            this.typeUpdateInfo();
        }

        private typeUpdateInfo(): void {
            this.updateTypeShow();
            this.updateShow();
            this.updateModel();
            this.updateReward();
        }

        private updateTypeShow(): void {
            let type = this._selType;
            if(type == this._lastSelType){
                return;
            }
            this._lastSelType = type;

            this._view.img_num.source = "rolering_num" + type;
            this._view.scr.stopAnimation();
            this._view.scr.viewport.scrollV = 0;
            let txtStr = "rolering_txt" + type;
            this._view.img_txt.source = ResUtil.getUiPng(txtStr);
        }

        private updateShow(): void {
            let type = this._selType;

            let killReward: number[] = this._proxy.getKillReward(type);
            let killRewardIdx = killReward[0];
            let killRewardCnt = killReward[1];
            this._view.item.initIcon(killRewardIdx);
            let curVal = this._proxy.getValue(type);
            this._canDrawExp = curVal > 0;
            let maxCfgStr = "halo_max_value" + type;
            let maxCfg: ParamConfig = GameConfig.getParamConfigById(maxCfgStr);
            let maxVal = maxCfg && maxCfg.value;
            this._view.item.lab_cost.text = StringUtil.getHurtNumStr(curVal) + "/" + StringUtil.getHurtNumStr(maxVal);
            this._view.item.lab_cost.textColor = WhiteColor.DEFAULT;

            let showExp = type == RoleRingType.Type1;
            this._view.grp_exp.visible = showExp;
            this._view.grp_egg.visible = !showExp;

            //this.removeEggTween();
            if(showExp){
                let privilegeValue = RoleUtil.getPrivilegeValue(RolePrivilegeKey.main_add_maxexp);//万分比
                maxVal = maxVal * (1 + privilegeValue / 10000);
                this._view.bar.updateShow(curVal, maxVal);
                let barVal = Math.round(curVal / maxVal * 100);
                barVal = barVal == 0 && curVal > 0 ? 1 : barVal;//0%有进度时客户端特殊处理下：1%
                this._view.bar.labelDisplay.text = barVal + "%";
                //this._view.redPoint1.visible = this._canDrawExp;
            }
            else {
                //this._view.img_egg.source = "rolering_egg" + type;
                this._view.img_type.source = "rolering_type" + type;
                // this._view.img_egg.y = 0;
                // Tween.get(this._view.img_egg, {loop: true})
                //     .to({y: 30}, 800)
                //     .to({y: 0}, 800);
                let uiEftSrc = type == RoleRingType.Type2 ? UIEftSrc.RoleRing1 : UIEftSrc.RoleRing2;
                if(this._eftStrEgg != uiEftSrc){
                    this._eftStrEgg = uiEftSrc;
                    this.removeEffectEgg();
                    this._eftIdEgg = this.addEftByParent(uiEftSrc, this._view.grp_eft);
                }
                this._view.redPoint2.visible = this._proxy.getEggHint(type);
            }

            let addStr = "role_ring_add_tips" + type;
            this._view.lab_add.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(addStr), [StringUtil.getHurtNumStr(killRewardCnt)]));
        }

        private updateModel(): void {
            let type = this._selType;
            let index = this._proxy.getIndex(type);

            let bgStr = "rolering_bg" + type + "_" + index;
            this._view.img_bg.source = ResUtil.getUiJpg(bgStr);

            let surfaceCfgStr = "halo_model" + type;
            let cfg: ParamConfig = GameConfig.getParamConfigById(surfaceCfgStr);
            let surfaceInfo: number[] = cfg && cfg.value;
            let surfaceIndex = surfaceInfo[index - 1];

            let surfaceStr = "rolering_surface" + type + "_" + index;
            this._view.img_surface.source = surfaceStr;

            let surfaceCfg = getConfigById(surfaceIndex) as HorseConfig;
            let descStr = "role_ring_surface_tips" + type;
            this._view.lab_desc.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(descStr), [surfaceCfg.name]), true);
        }

        // private removeEggTween(): void {
        //     Tween.remove(this._view.img_egg);
        // }

        private removeEffectEgg(): void {
            if (this._eftIdEgg) {
                this.removeEffect(this._eftIdEgg);
                this._eftIdEgg = null;
            }
        }

        private updateReward(): void {
            let type = this._selType;
            let status = this._proxy.getStatus(type);
            let canDraw = status == RewardStatus.Finish;
            this._canDraw = canDraw;
            let hasDraw = status == RewardStatus.Draw;
            if(status == RewardStatus.NotFinish){
                //未激活
                this._view.btn_god.visible = false;
                this._view.btn_reward.img.source = "qianwang";
                let actCfgStr = "halo_money" + type;
                let cfg: ParamConfig = GameConfig.getParamConfigById(actCfgStr);
                let maxVal = cfg && cfg.value;
                let curVal = RoleVo.ins.charge_rmb;
                let actStr = StringUtil.substitute(getLanById(LanDef.role_ring_tips1), [maxVal]);
                actStr += TextUtil.addColor("(" + curVal + "/" + maxVal + ")", curVal >= maxVal ? WhiteColor.GREEN : WhiteColor.RED);
                this._view.lab_act.textFlow = TextUtil.parseHtml(actStr);
                this._view.redPoint1.visible = false;//未激活不显示红点
            }
            else {
                //已激活
                this._view.btn_god.visible = type == RoleRingType.Type1;
                this._view.lab_act.text = "";
                if(canDraw){
                    //可领取
                    this._view.btn_reward.img.source = "lingqujinrijiangli";
                }
                this._view.redPoint1.visible = this._canDrawExp;//激活后才显示红点
            }
            this._view.btn_reward.redPoint.visible = canDraw;
            this._view.btn_reward.visible = !hasDraw;
            this._view.img_get.visible = hasDraw;
            if( this._view.btn_god.visible){
                this._view.btn_god.setHint(HintMgr.getHint([ModName.God]));
            }else {
                this._view.btn_god.setHint(false);
            }
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            let list: TabBaseItemData[]  = this._btnList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                let btnData = list[i];
                let hintType = this._proxy.getHintType(i);
                let type = HintMgr.getType(hintType);/**转化为红点类型*/
                if (type != data.node) {
                    continue;
                }
                if(!!btnData.showHint != data.value){//过滤undefined!=false
                    btnData.showHint = data.value;
                    this._btnList.itemUpdated(btnData);
                }
                break;/**找到对应红点后则break，减少循环*/
            }
        }

    }
}