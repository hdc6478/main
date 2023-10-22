namespace game.mod.xianfa {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import XianfaSkillInitConfig = game.config.XianfaSkillInitConfig;
    import XianfaSkillCultivateConfig = game.config.XianfaSkillCultivateConfig;
    import skill_item = msg.skill_item;
    import GameNT = base.GameNT;

    export class XianfaStudyTipMdr extends MdrBase {
        private _view: XianfaStudyTipView = this.mark("_view", XianfaStudyTipView);

        private _proxy: XianfaProxy;
        private _model: XianfaModel;

        private _id: number;
        private _cfg: XianfaSkillInitConfig;
        private _info: skill_item;

        private _cost: number[][];
        private _lvReached: boolean;

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
            addEventListener(this._view.btn_study, TouchEvent.TOUCH_TAP, this.onClickStudy);
        }

        protected onShow(): void {
            super.onShow();

            this._id = this._showArgs;
            this._lvReached = false;
            this.updateInfo();
        }

        protected onHide(): void {
            super.onHide();
        }
        
        private updateInfo() {
            this._cfg = this._model.getXianfaCfg(this._id);
            this._info = this._model.getInfo(this._id);

            if(!this._id || !this._cfg) {
                return;
            }

            let xfLv = this._info ? this._info.lv : 1;
            let culLv = this._info ? this._info.cultivate_level : 0;
            this._view.currentState = culLv == 5 ? "max" : "normal";
            this._view.skill.setData(this._cfg, this._info, 4);
            this._view.img_quality_bg.source = ResUtil.getBgQuality(this._cfg.skill_quality);
            
            let nameStr: string = this._model.getXianfaShortName(this._cfg) + TextUtil.addColor(" +" + culLv, WhiteColor.GREEN);
            this._view.lab_skill_name.textFlow = TextUtil.parseHtml(nameStr);
            
            let starCnt = this._model.getStarCnt(this._cfg.index);
            this._view.star.updateStar(starCnt);
            for(let i = 0; i < 5; i++) {
                let bigStar = this._view["star_big" + i];
                bigStar.visible = (i >= culLv);
            }
            
            this._view.lab_lv.text = "等级: " + xfLv;

            let culCfg = this._model.getXianfaCultivateCfg(culLv);
            let nextCfg = this._model.getXianfaCultivateCfg(culLv + 1);
            
            let curRate = !culLv || !culCfg ? 0 : (culCfg.update_rate + culCfg.update_rate * culCfg.xianfa_jingyan / 10000) / 100;
            let nextRate = !nextCfg ? curRate : (nextCfg.update_rate + nextCfg.update_rate * nextCfg.xianfa_jingyan / 10000) / 100;
            this._view.lab_attr1.text = `精研 ${culLv}\n仙法伤害 ${curRate}%`;
            this._view.lab_attr2.text = `+${culLv + 1}\n+${nextRate}%`;

            let effCfg: XianfaSkillCultivateConfig = this._model.getStudyEffCfg(culLv);
            let str: string = effCfg ? "精研" + TextUtil.addColor(`+${effCfg.cultivate_level}`, WhiteColor.GREEN)
                + "额外激活:精研效果提升" + TextUtil.addColor(`${effCfg.xianfa_jingyan/100}%`, WhiteColor.GREEN) : "";
            this._view.lab_desc.textFlow = TextUtil.parseHtml(str);

            if(!nextCfg) {
                return;
            }
            let nextCondition = nextCfg.yanxi_condition[this._cfg.skill_quality - 1];
            let condStr: string = "精研条件: 仙法等级达到" + nextCondition
                + TextUtil.addColor(`(${xfLv}/${nextCondition})`
                , xfLv >= nextCondition ? WhiteColor.GREEN : WhiteColor.RED);
            this._view.lab_condition.textFlow = TextUtil.parseHtml(condStr);
            this._view.icon_cost.setData(nextCfg.yanxi_cost[0]);
            this._view.icon_cost.updateCostLab(nextCfg.yanxi_cost[0]);
            this._cost = nextCfg.yanxi_cost;
            this._lvReached = (xfLv >= nextCondition);

            if(!this._info) {
                return;
            }
            this.updateHint();
        }

        private onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if(keys.indexOf(RolePropertyKey.xianqi) >= 0){
                this.updateInfo();
            }
        }
        
        private updateHint(): void {
            let studyHint = this._proxy.updateStudyHint(this._info.index);
            this._view.btn_study.setHint(studyHint);
        }

        private onClickStudy(e: TouchEvent) {
            let isEnough: boolean = BagUtil.checkPropCnt(this._cost[0][0], this._cost[0][1], PropLackType.Dialog);
            if(!isEnough) {
                return;
            }
            if(!this._lvReached) {
                PromptBox.getIns().show("条件未满足");
                return;
            }

            this._proxy.c2s_skill_levelup(XianfaType.Type1, 1, 3, this._cfg.index);
        }
        
    }
}