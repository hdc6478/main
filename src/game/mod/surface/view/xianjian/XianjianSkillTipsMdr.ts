namespace game.mod.surface {


    import BattleSkillConfig = game.config.BattleSkillConfig;
    import XianjianConfig = game.config.XianjianConfig;

    export class XianjianSkillTipsMdr extends SkillTipsMdr {

        public _showArgs: XianjianSkillTipsData;
        private _proxy: XianjianProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianjian);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(MoreEvent.ON_UPDATE_ARTIFACT_INFO, this.updateView, this);
        }

        protected onClickAct(): void {
            super.onClickAct();
            this.hide();
        }

        protected onUpdateItem(): void {
            /**飞剑index */
            let index: number = this._showArgs.index;
            /**飞机技能槽位置 */
            let pos: number = this._showArgs.pos;
            /**飞剑技能等级 */
            let level: number = this._proxy.getSkillLv(index, pos);

            let cfg: BattleSkillConfig;
            if (!level) {
                let skill_id: number = this._proxy.getCfgSkill(index, pos, level + 1);
                cfg = getConfigByNameId(ConfigName.Skill, skill_id);

                this._view.baseDescItem.updateShow(cfg.describe, "下阶效果", 10, BlackColor.GRAY);
                this._view.baseDescItem2.visible = false;
            } else {
                let skill_id: number = this._proxy.getCfgSkill(index, pos, level);
                cfg = getConfigByNameId(ConfigName.Skill, skill_id);
                this._view.baseDescItem.updateShow(cfg.describe, "本阶效果", 10, BlackColor.DEFAULT);

                let next_id: number = this._proxy.getCfgSkill(index, pos, level + 1);
                this._view.baseDescItem2.visible = !!next_id;
                if (this._view.baseDescItem2.visible) {
                    let next_cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, next_id);
                    this._view.baseDescItem2.updateShow(next_cfg.describe, "下阶效果", 10, BlackColor.GRAY);
                }
            }
            this._view.lab_name.text = cfg.name;
            this._view.power.setPowerValue(cfg.powershow);
        }

        protected onUpdateCost(): void {
            let index: number = this._showArgs.index;
            let pos: number = this._showArgs.pos;

            let skill_level: number = this._proxy.getSkillLv(index, pos);
            let next_id: number = this._proxy.getCfgSkill(index, pos, skill_level + 1);
            if (!next_id) {
                this.updateAct(true);
                this._view.img_act.source = "lvseyimanjie";
                return;
            }

            let cfg: XianjianConfig = getConfigByNameId(ConfigName.Xianjian, index);
            let limit: number = cfg.skill_condition[this._showArgs.pos - 1][1];
            let info = this._proxy.getInfo(index);
            let level: number = info && info.level || 0;
            if (limit > level) {
                this._view.btn_act.visible = false;
                this._view.icon.visible = false;
                this._view.lab_limit.visible = true;
                this._view.lab_limit.text = `锻炼${limit}级可激活(${level}/${limit})`;
            } else {
                this._view.btn_act.visible = true;
                this._view.icon.visible = true;
                this._view.lab_limit.visible = false;

                let lv: number = this._proxy.getSkillLv(index, pos);
                this._cost = this._proxy.getSkillCost(index, lv);
                this._view.icon.setData(this._cost);
                this._view.icon.updateCostLab(this._cost);
                this._view.btn_act.redPoint.visible = BagUtil.checkPropCnt(this._cost[0], this._cost[1]);
            }
        }
    }

    export interface XianjianSkillTipsData extends SkillTipsData {
        index: number;
        pos: number;
    }
}