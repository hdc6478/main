namespace game.mod.yishou {

    import BattleSkillConfig = game.config.BattleSkillConfig;
    import LanDef = game.localization.LanDef;
    import SkillLevelConfig = game.config.SkillLevelConfig;

    export class YishouShouguSkillTipsMdr extends MdrBase {
        private _view: YishouShouguSkillTipsView = this.mark("_view", YishouShouguSkillTipsView);
        private _proxy: YishouProxy;
        _showArgs: YishouType;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Yishou);
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let type = this._showArgs;
            let typeCfg = this._proxy.getYishoucfg(type);

            let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, typeCfg.skill);
            if (!skillCfg) {
                return;
            }

            this._view.qualityTips.updateShow(skillCfg.quality);
            this._view.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(skillCfg.name, ColorUtil.getColorByQuality1(skillCfg.quality)));
            this._view.img_skillType.source = `jineng_show_type_${skillCfg.show_type}`;

            //技能效果
            this._view.descItem0.updateShow(skillCfg.describe, getLanById(LanDef.maid_cue15));

            //技能属性 todo

            //魂体进阶
            let skill = typeCfg.skill;
            let maxStage = this._proxy.getMaxStage(type);
            let curStage = this._proxy.getCurStage(type);
            let list: string[] = [];
            for (let i = 1; i <= maxStage; i++) {
                let skillLvCfg: SkillLevelConfig = getConfigByNameId(ConfigName.SkillLv, skill + i);
                if (!skillLvCfg) {
                    continue;
                }
                let desc = i + `阶：` + skillLvCfg.describe;
                let color = curStage >= i ? BlackColor.GREEN : BlackColor.GRAY;
                list.push(TextUtil.addColor(desc, color));
            }
            this._view.descList.updateShow(list, getLanById(LanDef.yishou_tips21));
        }
    }
}