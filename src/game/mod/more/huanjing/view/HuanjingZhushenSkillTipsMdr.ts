namespace game.mod.more {

    import BattleSkillConfig = game.config.BattleSkillConfig;
    import LanDef = game.localization.LanDef;
    import SkillLevelConfig = game.config.SkillLevelConfig;

    export class HuanjingZhushenSkillTipsMdr extends MdrBase {
        private _view: HuanjingZhushenSkillTipsView = this.mark("_view", HuanjingZhushenSkillTipsView);
        private _proxy: HuanjingProxy;
        _showArgs: { systemId: number, pos: number, skillId: number };

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Huanjing);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateAttr, this);
            this.onNt(MoreEvent.ON_UPDATE_HUANJING_INFO, this.updateView, this);
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
            let data = this._showArgs;
            let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, data.skillId);
            if (!skillCfg) {
                return;
            }
            this._view.updateBaseView(data.skillId);
            let info = this._proxy.getZhushenInfo(data.systemId, data.pos);
            let star = info && info.star || 0;
            if (star > 0) {
                this._view.btn_do.label = "进阶";
            }else {
                this._view.btn_do.label = "激活";
            }
            let str = (skillCfg.name || '') + ' ' + star + '阶';
            this._view.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(str, ColorUtil.getColorByQuality2(skillCfg.quality)));

            this.updateAttr();

            let skillLvCfg: SkillLevelConfig = getConfigByNameId(ConfigName.SkillLv, data.skillId + star);
            let desc = skillCfg.describe;
            if (skillLvCfg) {
                desc = skillLvCfg.describe;
            }
            this._view.baseDescItem1.updateShow(desc, getLanById(LanDef.huanjing_tips8));

            let isMax = this._proxy.isZhushenSkillMax(data.systemId, data.pos);
            this._view.currentState = isMax ? 'zhushenMax' : 'zhushen';
            if (!isMax) {
                let cfg = this._proxy.getZhushenCfg(data.systemId, data.pos, star + 1);
                this._view.icon.data = cfg.cost;
                this._view.icon.updateCostLab(cfg.cost);
                this._view.btn_do.setHint(this._proxy.canActOrUpZhushen(data.systemId, data.pos));
            }
        }

        private updateAttr(): void {
            let data = this._showArgs;
            let info = this._proxy.getZhushenInfo(data.systemId, data.pos);
            let lv = info && info.star || 1;
            let cfg = this._proxy.getZhushenCfg(data.systemId, data.pos, lv);
            if (!cfg) {
                return;
            }
            let attr = RoleUtil.getAttr(cfg.attr_id);
            this._view.baseDescItem0.updateShow(TextUtil.getAttrTextAdd(attr), getLanById(LanDef.ywl_baseAttr));
        }

        private onClick(): void {
            let data = this._showArgs;
            if (this._proxy.canActOrUpZhushen(data.systemId, data.pos, true)) {
                this._proxy.c2s_huanjin_oper(data.systemId, 6, data.pos);
            }
        }
    }
}