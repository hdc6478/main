namespace game.mod.surface {

    import BattleSkillConfig = game.config.BattleSkillConfig;
    import LanDef = game.localization.LanDef;
    import XianfaSkillLevelConfig = game.config.XianfaSkillLevelConfig;
    import XianfaSkillInitConfig = game.config.XianfaSkillInitConfig;

    export class SkillNormalTipsMdr extends MdrBase {
        private _view: SkillNormalTipsView = this.mark("_view", SkillNormalTipsView);
        /**技能id，等级*/
        public _showArgs: { skillId: number, lv?: number, isXianfaSkill?: boolean };

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
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let skillId = this._showArgs.skillId;
            let lv = this._showArgs.lv;
            let isXianfaSkill = this._showArgs.isXianfaSkill;
            this._view.skill.setData(skillId);

            let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
            this._view.lab_name.text = cfg.name;
            let typeStr = cfg.type2 == SkillType2.Skill ? "jineng_show_type_4" : "jineng_show_type_2";
            this._view.img_type.source = typeStr;

            this._view.currentState = cfg.powershow ? "power" : "default";
            if (cfg.powershow) {
                this._view.power.setPowerValue(cfg.powershow);
            }

            if (lv) {

                let descStr = "";
                if (isXianfaSkill) {
                    let xianfaCfg: XianfaSkillInitConfig = getConfigByNameId(ConfigName.XianfaSkillInit, skillId);
                    descStr = StringUtil.substitute(xianfaCfg.describe,
                        [TextUtil.addColor(xianfaCfg.skill_coefs / 100 + "", WhiteColor.GREEN),
                        TextUtil.addColor(this.getLevelAttr(lv || 1, xianfaCfg.skill_quality) + "", WhiteColor.GREEN)]);
                } else {
                    descStr = TextUtil.getSkillDesc(cfg, lv);
                }

                this._view.baseDescItem.updateShow(descStr, getLanById(LanDef.sp_tips1));
            }
            else {
                this._view.baseDescItem.updateShow(cfg.describe, getLanById(LanDef.sp_tips1));
            }
        }

        /**
         * 等级属性
         * @param xianfaLv
         * @param quality 品质，1-4
         * @returns
         */
        public getLevelAttr(xianfaLv: number, quality: number): number {
            let cfg: XianfaSkillLevelConfig = this.getXianfaLevelCfg(xianfaLv);
            return (quality >= 1 && quality <= cfg.level_value.length) ? cfg.level_value[quality - 1] : cfg.level_value[0];
        }

        public getXianfaLevelCfg(xianfaLv: number): XianfaSkillLevelConfig {
            let cfg: XianfaSkillLevelConfig = getConfigByNameId(ConfigName.XianfaSkillLevel, xianfaLv);
            return cfg;
        }

    }
}