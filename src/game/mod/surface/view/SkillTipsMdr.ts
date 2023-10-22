namespace game.mod.surface {

    import BattleSkillConfig = game.config.BattleSkillConfig;
    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;

    export class SkillTipsMdr extends MdrBase {
        protected _view: SkillTipsView = this.mark("_view", SkillTipsView);
        /**被动技能id，是否激活， 激活回调，其他激活条件*/
        public _showArgs: SkillTipsData;
        protected _cost: number[];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickAct);
            this.onNt(SurfaceEvent.SURFACE_SKILL_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        protected onClickAct(): void {
            let condHandler = this._showArgs.condHandler;
            let condRst = true;//其他激活条件
            if (condHandler) {
                condRst = condHandler.exec();
            }
            if (!condRst || !BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                return;
            }
            let confirm = this._showArgs.confirm;
            confirm && confirm.exec();
        }

        private onInfoUpdate(n: GameNT): void {
            let isAct: boolean = n.body;
            this.updateAct(isAct)
        }

        protected updateView(): void {
            let skillId = this._showArgs.skillId;
            let isAct = this._showArgs.isAct;
            this._view.skill.setData(skillId);

            this.onUpdateItem();

            this.updateAct(isAct);

            this.onUpdateCost();
        }

        protected onUpdateItem(): void {
            let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, this._showArgs.skillId);
            this._view.lab_name.text = cfg.name;
            this._view.power.setPowerValue(cfg.powershow);
            this._view.baseDescItem.updateShow(cfg.describe, getLanById(LanDef.sp_tips1));
        }

        protected onUpdateCost(): void {
            let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, this._showArgs.skillId);
            this._cost = cfg.act_material[0];
            this._view.icon.setData(this._cost);
            this._view.icon.updateCostLab(this._cost);
            this._view.btn_act.redPoint.visible = BagUtil.checkPropCnt(this._cost[0], this._cost[1]);
        }

        protected updateAct(isAct: boolean): void {
            this._view.currentState = isAct ? "act" : "default";
        }
    }

    export interface SkillTipsData {
        skillId: number;
        isAct: boolean;
        confirm?: Handler;
        condHandler?: Handler;
    }
}