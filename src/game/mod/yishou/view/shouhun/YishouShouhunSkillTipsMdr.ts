namespace game.mod.yishou {

    import BattleSkillConfig = game.config.BattleSkillConfig;
    import LanDef = game.localization.LanDef;

    export class YishouShouhunSkillTipsMdr extends MdrBase {
        private _view: YishouShouhunSkillTipsView = this.mark("_view", YishouShouhunSkillTipsView);
        private _proxy: YishouProxy;
        /** 类型,技能序号,激活等级,技能id */
        _showArgs: number[];

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
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(YishouEvent.ON_UPDATE_YISHOU_BASE_INFO, this.onSwitchState, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs || !Array.isArray(this._showArgs)) {
                return;
            }
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onSwitchState(): void {
            let type = this._showArgs[0];
            let skillId = this._showArgs[3];
            let isActed = this._proxy.checkSkillActed(type, skillId);
            this._view.currentState = isActed ? 'acted' : 'default';
        }

        private updateView(): void {
            let type = this._showArgs[0];
            let skillId = this._showArgs[3];
            let isActed = this._proxy.checkSkillActed(type, skillId);
            this._view.currentState = isActed ? 'acted' : 'default';

            let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
            if (!skillCfg) {
                return;
            }

            //技能效果
            this._view.descItem.updateShow(skillCfg.describe, getLanById(LanDef.sp_tips1));
            this._view.power.setPowerValue(skillCfg.powershow || 0);

            this._view.qualityTips.updateShow(skillCfg.quality);
            this._view.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(skillCfg.name, ColorUtil.getColorByQuality1(skillCfg.quality)));
            this._view.img_skillType.source = `jineng_show_type_${skillCfg.show_type}`;

            //激活条件
            let needLevel = this._showArgs[2];
            let level = this._proxy.getLevel(type);
            let color = level >= needLevel ? WhiteColor.GREEN : WhiteColor.RED;
            let desc = StringUtil.substitute(getLanById(LanDef.yishou_tips15), [needLevel])
                + TextUtil.addColor(`(${level}/${needLevel})`, color);
            this._view.lb_cond.textFlow = TextUtil.parseHtml(desc);

            if (!isActed) {
                this._view.btn_do.setHint(this._proxy.canActSkill(type, skillId));
            }
        }

        private onClick(): void {
            let type = this._showArgs[0];
            let skillId = this._showArgs[3];
            if (this._proxy.canActSkill(type, skillId, true)) {
                this._proxy.c2s_yishou_skill_active(type, skillId);
            }
        }
    }
}