namespace game.mod.xianfa {

    import TouchEvent = egret.TouchEvent;
    import XianfaSkillInitConfig = game.config.XianfaSkillInitConfig;
    import skill_item = msg.skill_item;
    import Handler = base.Handler;
    import SkillEftMgr = game.scene.SkillEftMgr;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import SkillEffect = game.scene.SkillEffect;
    import EftUIGroup = game.scene.EftUIGroup;

    export class XianfaSkillTipMdr extends EffectMdrBase {
        private _view: XianfaSkillTipView = this.mark("_view", XianfaSkillTipView);

        private _proxy: XianfaProxy;
        private _model: XianfaModel;

        private _id: number;
        private _cfg: XianfaSkillInitConfig;
        private _info: skill_item;
        private _cost: number[];

        /**
         * 穿戴状态，0-可穿戴，1-可卸下
         */
        private _wearState: number;

        /**
         * 升级或升星状态，0-可激活，1-可升级，2-可升星
         */
        private _upState: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.verticalCenter = 0;
            this._view.horizontalCenter = 0;

            this._proxy = this.retProxy(ProxyType.Xianfa);
            this._model = this._proxy.getModel();
        }

        protected addListeners(): void {
            super.addListeners();

            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
            this.onNt(XianfaEvent.UPDATE_XIANFA_INFO, this.updateInfo, this);

            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_play, TouchEvent.TOUCH_TAP, this.onClickPlay);
            addEventListener(this._view.btn_wear, TouchEvent.TOUCH_TAP, this.onClickWear);
            addEventListener(this._view.btn_study, TouchEvent.TOUCH_TAP, this.onClickStudy);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
        }

        protected onShow(): void {
            super.onShow();

            this._view.btn_play.visible = true;
            this._id = this._showArgs;
            this._view.grp_role_skill_eff.removeChildren();
            this.updateInfo();
        }

        protected onHide(): void {
            this._model.isInUpStar = false;
            this._view.grp_role_skill_eff.removeChildren();
            super.onHide();
        }
        
        private updateInfo() {
            if(!this._id) {
                return;
            }

            this.updateRole(0.7, Direction.DOWN,ActionName.STAND,true,true,null,true);

            this._cfg = this._model.getXianfaCfg(this._id);
            this._info = this._model.getInfoByType(this._cfg.type);
            if(this._model.isInUpStar) {            // 升星后，id会改变
                this._model.isInUpStar = false;
                this._id = this._info.index;
                this._cfg = this._model.getXianfaCfg(this._id);
            }

            let starCnt = this._model.getStarCnt(this._cfg.index);
            this._view.star.updateStar(starCnt, 5);
            this._view.currentState = (starCnt == 5 && this._info && this._info.lv >= this._cfg.max_level) ? "max" : "normal";
            
            this._view.lab_name.text = this._model.getXianfaShortName(this._cfg);

            let descStr = StringUtil.substitute(this._cfg.describe, 
                [TextUtil.addColor(this._cfg.skill_coefs / 100 + "", WhiteColor.GREEN),
                TextUtil.addColor(this._model.getLevelAttr(this._info ? this._info.lv : 1, this._cfg.skill_quality) + "", WhiteColor.GREEN)]);
            this._view.lab_desc.textFlow = TextUtil.parseHtml(descStr,true);
            
            let isWear = this._info ? this._model.isWear(this._info.index) : false;
            this._view.skill.setData(this._cfg, this._info, isWear ? 2 : 3);
            
            if(!this._info) {
                this._view.power.setPowerValue(0);
                this._view.btn_up.label = "激活";
                if(this._cfg.activate_material) {
                    this._cost = this._cfg.activate_material[0];
                    this._view.icon_cost.setData(this._cost[0]);
                    this._view.icon_cost.updateCostLab(this._cost);
                }
                this._upState = 0;
                this._view.btn_up.setHint(false);
                return;
            }

            this._view.power.setPowerValue(this._info.power);

            this._wearState = isWear ? 1 : 0;
            this._upState = (this._info.lv < this._cfg.max_level) ? 1 : 2;
            this._view.btn_wear.iconDisplay.source =  (this._wearState == 1) ? "xf_off" : "xf_wear";
            this._view.btn_up.label = (this._upState == 1) ? "升级" : "升星";
            
            if(this._upState == 1) {
                // 升级
                this._cost = this._model.getUpgradeCost(this._info.lv + 1, this._cfg.skill_quality);
                this._view.icon_cost.setData(this._cost);
            } else if(this._cfg.upgrade_material) {
                // 升星
                this._cost = this._cfg.upgrade_material[0];
                this._view.icon_cost.setData(this._cost[0]);
                this._view.icon_cost.updateCostLab(this._cost);
            }

            this.updateHint();
        }

        private onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if(keys.indexOf(RolePropertyKey.xianqi) >= 0){
                this.updateInfo();
            }
        }

        private updateRole(scale: number = 1.1, dir:number = Direction.DOWN, act: string = ActionName.STAND, isUi:boolean = true, isLoop:boolean = true, handler:Handler = null,isSingle: boolean = true): void {
            this.updateSelfUIRole(this._view.grp_role_eff,scale, dir, act, isUi,isSingle);
            this.updateUIRoleAtr(isLoop,handler);
        }
        
        private updateHint(): void {
            if(this._upState == 0) {            // 激活，仙法是自动激活，无需红点
                this._view.btn_up.setHint(false);
            } else if(this._upState == 1) {     // 升级
                let upgradeHint = this._proxy.updateUpgradeHint(this._info.index);
                this._view.btn_up.setHint(upgradeHint);
            } else {                            // 升星
                let upStarHint = this._proxy.updateUpStarHint(this._info.index);
                this._view.btn_up.setHint(upStarHint);
            }
            let studyHint = this._proxy.updateStudyHint(this._info.index);      // 精研
            this._view.btn_study.setHint(studyHint);
        }

        private onClickPlay(e: TouchEvent) {


            this._view.btn_play.visible = false;
            let self = this;
            this.updateRole(1.5, Direction.RIGHT_UP,ActionName.ATTACK+"1",false,false,Handler.alloc(this, () => {
                this.updateRole(0.7, Direction.DOWN,ActionName.STAND,true,true,null,true);
                self._view.btn_play.visible = true;
            }),false);

            let skillShowCfg = this._model.getSkillShowCfg(this._id);
            if(skillShowCfg) {

                if(!skillShowCfg.temporary){
                    console.error("技能表 skill_Show index "+ skillShowCfg.index+ " 字段 res 未配置");
                    return;
                }
                SkillEftMgr.ins.showGroupUIEft(skillShowCfg.res,0,0,Direction.RIGHT_UP,null,null,1,this._view.grp_role_skill_eff);
            }
        }

        private onClickWear(e: TouchEvent) {
            if(!this._info) {
                PromptBox.getIns().show("未激活");
                return;
            }
            if(this._wearState == 0) {          // 穿戴
                this._proxy.c2s_skill_takeon(XianfaType.Type1, 1, null, this._cfg.index);
            } else {                            // 卸下
                let pos = this._model.getWearPos(this._info.index);
                this._proxy.c2s_skill_takeoff(XianfaType.Type1, pos);
            }
        }

        private onClickStudy(e: TouchEvent) {
            ViewMgr.getIns().showSecondPop(ModName.Xianfa, XianfaViewType.XianfaStudyTip, this._id);
        }

        private onClickUp(e: TouchEvent) {
            if(!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])){
                return;
            }
            if(this._upState == 0) {            // 激活
                this._proxy.c2s_skill_levelup(XianfaType.Type1, 1, 4, this._cfg.index);
            } else if(this._upState == 1) {     // 升级
                this._proxy.c2s_skill_levelup(XianfaType.Type1, 1, 1, this._cfg.index);
            } else {                            // 升星
                this._model.isInUpStar = true;
                this._proxy.c2s_skill_levelup(XianfaType.Type1, 1, 2, this._cfg.index);
            }
        }
        
    }
}