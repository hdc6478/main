namespace game.mod.activity {


    import TouchEvent = egret.TouchEvent;
    import ParamConfig = game.config.ParamConfig;
    import LanDef = game.localization.LanDef;
    import YaodiConfig = game.config.YaodiConfig;
    import HorseConfig = game.config.HorseConfig;
    import PropConfig = game.config.PropConfig;

    export class RoleRingUpMdr extends EffectMdrBase {
        private _view: RoleRingUpView = this.mark("_view", RoleRingUpView);
        private _proxy: RoleRingProxy;
        protected _showArgs: number;//RoleRingType
        private _effId: number;
        private _lastIndex: number;//上一次显示的外显
        private _canDraw: boolean;
        private _cost: number[];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.RoleRing);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);

            this.onNt(ActivityEvent.ON_ROLE_RING_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateShow();
            this.updateModel();
            this.updateInfo();
        }

        protected onHide(): void {
            this._effId = 0;
            this._lastIndex = 0;
            super.onHide();
        }

        private onClickUp(): void {
            let type = this._showArgs;
            if(!this._proxy.isRoleRingAct(type)){
                PromptBox.getIns().show(getLanById(LanDef.role_ring_tips10));
                return;//未激活不给培养
            }

            if(this._canDraw){
                this._proxy.c2s_role_ring_foster(type, RoleRingOpType.Type2);
                return;
            }
            if (!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                return;
            }
            this._proxy.c2s_role_ring_foster(type, RoleRingOpType.Type1);
        }

        private onClickReward(): void {
            let type = this._showArgs;
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.RoleRingReward, type);
        }

        private onInfoUpdate(): void {
            this.updateModel();
            this.updateInfo();
        }

        private updateShow(): void {
            let type = this._showArgs;

            let titleStr = type == RoleRingType.Type2 ? LanDef.role_ring_tips4 : LanDef.role_ring_tips5;
            this._view.secondPop.updateTitleStr(getLanById(titleStr));

            let chargeCfgStr = "halo_everyday_money" + type;
            let chargeCfg: ParamConfig = GameConfig.getParamConfigById(chargeCfgStr);
            let chargeInfo: number[] = chargeCfg && chargeCfg.value;
            let idx = chargeInfo[0];
            let cnt = chargeInfo[1];
            let maxVal = chargeInfo[2];

            let actCfgStr = "halo_money" + type;
            let cfg: ParamConfig = GameConfig.getParamConfigById(actCfgStr);
            let actVal = cfg && cfg.value;

            let totalCharge = RoleVo.ins.charge_rmb;
            let dayCharge = RoleVo.ins.day_charge_rmb;
            let curVal = Math.max(Math.min(totalCharge - actVal, dayCharge), 0);//math.min（累充金额-激活金额，今日充值金额）
            let moneyStr = TextUtil.addColor("(" + curVal + "/" + maxVal + ")", curVal >= maxVal ? WhiteColor.GREEN : WhiteColor.RED);
            let chargeStr = StringUtil.substitute(getLanById(LanDef.role_ring_tips7), [moneyStr]);
            let propCfg: PropConfig = GameConfig.getPropConfigById(idx);
            let propName = TextUtil.addColor(propCfg.name, ColorUtil.getColorByQuality1(propCfg.quality));
            chargeStr += "【" + propName + "】x" + cnt;
            this._view.lab_charge.textFlow = TextUtil.parseHtml(chargeStr);
        }

        private updateModel(): void {
            let type = this._showArgs;
            let index = this._proxy.getIndex(type);

            let surfaceCfgStr = "halo_model" + type;
            let cfg: ParamConfig = GameConfig.getParamConfigById(surfaceCfgStr);
            let surfaceInfo: number[] = cfg && cfg.value;
            let surfaceIndex = surfaceInfo[index - 1];
            if(surfaceIndex == this._lastIndex){
                return;
            }
            this._lastIndex = surfaceIndex;

            if(this._effId){
                this.removeEffect(this._effId);
            }
            this._effId = this.addAnimate(surfaceIndex, this._view.grp_eff);
        }

        public updateInfo(): void {
            let type = this._showArgs;
            let index = this._proxy.getIndex(type);

            let cfgName = type == RoleRingType.Type2 ? ConfigName.Yaodi : ConfigName.Yaoshen;
            let yaodiCfg: YaodiConfig = getConfigByNameId(cfgName, index);
            let maxVal = yaodiCfg.up_exp;
            let curVal = this._proxy.getYaoqiValue(type);
            let addVal = yaodiCfg.value;
            this._cost = yaodiCfg.cost_item;

            let addStr = TextUtil.addColor("+" + addVal, BlackColor.GREEN);
            let descStr = StringUtil.substitute(getLanById(LanDef.role_ring_tips6), [addStr]);
            let surfaceCfg = getConfigById(this._lastIndex) as HorseConfig;
            descStr += surfaceCfg.name;
            this._view.lab_desc.textFlow = TextUtil.parseHtml(descStr);

            this._view.bar.labelDisplay.visible = false;
            this._view.bar.show(curVal, maxVal);
            this._view.lab_val.text = getLanById(LanDef.role_ring_tips8) + "：" + curVal + "/" + maxVal;

            let status = this._proxy.getYaoqiStatus(type);
            let canDraw = status == RewardStatus.Finish;
            this._canDraw = canDraw;
            let hasDraw = status == RewardStatus.Draw;
            this._view.currentState = hasDraw ? "2" : "1";
            if(canDraw){
                this._view.btn_up.icon = "lingchi_lingqu";
            }
            else if(!hasDraw){
                this._view.btn_up.icon = "rolering_up";
            }
            this._view.btn_up.redPoint.visible = this._proxy.getEggHint(type);
        }
    }
}