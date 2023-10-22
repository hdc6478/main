namespace game.mod.more {

    import BattleSkillConfig = game.config.BattleSkillConfig;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class HuanjingHuanlingSkillTipsMdr extends MdrBase {
        private _view: HuanjingZhushenSkillTipsView = this.mark("_view", HuanjingZhushenSkillTipsView);
        private _proxy: HuanjingProxy;
        _showArgs: { systemId: number, type: number, pos: number };

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
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickBtnDo, this);
            this.onNt(MoreEvent.ON_UPDATE_HUANJING_INFO, this.updateView, this);
            this.onNt(SurfaceEvent.SURFACE_SPECIAL_ATTR_UPDATE, this.updateSpecialAttr, this);
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
            let skillAry = this._proxy.getHuanlingSkillData(data.systemId, data.type, data.pos);
            let skillId = skillAry[3];
            if (!skillId) {
                return;
            }
            this._view.updateBaseView(skillId);

            let skillInfo = this._proxy.getHuanlingSkillInfo(data.systemId, data.type, data.pos);
            let isActed = !!skillInfo;

            let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
            this._view.baseDescItem0.updateShow(TextUtil.addColor(skillCfg.describe, isActed ? BlackColor.DEFAULT : BlackColor.GRAY), getLanById(LanDef.maid_cue15));

            this.updateSpecialAttr();

            if (isActed) {
                this._view.currentState = 'huanlingActed';
                return;
            }

            let cfg = this._proxy.getHuanjingParamCfg(data.systemId);
            let name = cfg.name2.split('_')[data.type - 1];
            let info = this._proxy.getHuanlingInfo(data.systemId, data.type);
            let stage = info && info.stage || 0;
            let canAct = stage >= skillAry[2];
            if (canAct) {
                this._view.currentState = 'huanlingAct';
                this._view.btn_do.setHint(true);
                return;
            }

            this._view.currentState = 'huanling';
            let str = name + skillAry[2] + '阶激活' + TextUtil.addColor(`(${stage}/${skillAry[2]})`,
                stage >= skillAry[2] ? BlackColor.GREEN : BlackColor.RED);
            this._view.lb_condition.textFlow = TextUtil.parseHtml(str);
        }

        // todo
        private updateSpecialAttr(): void {
            let data = this._showArgs;
            let skillInfo = this._proxy.getHuanlingSkillInfo(data.systemId, data.type, data.pos);
            let isActed = !!skillInfo;
            let color = isActed ? BlackColor.DEFAULT : BlackColor.GRAY;

            let specialId = this._proxy.getHuanlingSpecialId(data.systemId, data.type, data.pos);
            let surfaceProxy: ISurfaceProxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
            let desc = surfaceProxy.getSpecialAttrDesc(data.systemId, specialId);
            this._view.baseDescItem1.updateShow(TextUtil.addColor(desc, color), '激活数量');
        }

        private onClickBtnDo(): void {
            let data = this._showArgs;
            if (this._proxy.canHuanlingSkillAct(data.systemId, data.type, data.pos)) {
                this._proxy.c2s_huanjin_oper(data.systemId, 5, data.type, data.pos);
            }
        }
    }
}