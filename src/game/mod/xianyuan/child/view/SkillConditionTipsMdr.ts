namespace game.mod.xianyuan {

    import BattleSkillConfig = game.config.BattleSkillConfig;
    import LanDef = game.localization.LanDef;

    /**技能激活条件*/
    export class SkillConditionTipsMdr extends MdrBase {
        private _view: SkillConditionTipsView = this.mark("_view", SkillConditionTipsView);

        /**技能index，是否激活，激活条件*/
        _showArgs: { skillId: number, isActed: boolean, actStr: string };

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let args = this._showArgs;
            let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, args.skillId);
            if (!skillCfg) {
                return;
            }
            this._view.skill.setData(args.skillId);
            this._view.lab_name.text = skillCfg.name;
            this._view.img_type.source = `jineng_show_type_${skillCfg.show_type}`;
            let color = args.isActed ? BlackColor.DEFAULT : BlackColor.GRAY;
            this._view.baseDescItem.updateShow(TextUtil.addColor(skillCfg.describe || '', color), getLanById(LanDef.sp_tips1));

            this._view.currentState = args.isActed ? 'act' : 'default';
            if (!args.isActed) {
                this._view.lb_act.textFlow = TextUtil.parseHtml(args.actStr || '');
            }
        }

    }
}