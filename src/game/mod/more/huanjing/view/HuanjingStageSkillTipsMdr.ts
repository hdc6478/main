namespace game.mod.more {

    import BattleSkillConfig = game.config.BattleSkillConfig;
    import LanDef = game.localization.LanDef;
    import BuffConfig = game.config.BuffConfig;

    export class HuanjingStageSkillTipsMdr extends MdrBase {
        private _view: HuanjingStageSkillTipsView = this.mark("_view", HuanjingStageSkillTipsView);
        private _proxy: HuanjingProxy;
        private _systemId: number;

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
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._systemId = this._showArgs;
            if (!this._systemId) {
                return;
            }
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._systemId = null;
        }

        private updateView(): void {
            let cfg = this._proxy.getHuanjingParamCfg(this._systemId);
            let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, cfg.stage_skill);
            this._view.skillItem.setIcon(skillCfg.icon);
            let stageNum = this._proxy.getStageNum(this._systemId);
            this._view.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(skillCfg.name + ' ' + stageNum + '阶', ColorUtil.getColorByQuality2(skillCfg.quality)));
            this._view.img_skilltype.source = ResUtil.getSkillShowType(cfg.stage_skill);

            this._view.baseDescItem.updateShow(skillCfg.describe, getLanById(LanDef.sp_tips1));

            // 技能属性 todo
            this._view.skillAttrList.visible = false;

            // 被动效果
            let descList: string[][] = [];
            descList.push(this.getStageDesc());
            descList.push(this.getHuanlingDesc());
            descList.push(this.getZhushenDesc());
            this._view.baseDescList2.updateShow(descList, getLanById(LanDef.skill_tips2));
        }

        //升星
        private getStageDesc(): string[] {
            let stageLv = this._proxy.getStarLv(this._systemId);
            let cfg = this._proxy.getHuanjingParamCfg(this._systemId);
            let buffId = cfg.star_buff[stageLv == 0 ? stageLv : stageLv - 1];
            let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffId);
            let color = stageLv > 0 ? BlackColor.WHITE : BlackColor.GRAY;
            let str = TextUtil.addColor(buffCfg && buffCfg.des || '', color);
            return [getLanById(LanDef.huanjing_tips7), str];
        }

        //幻灵
        private getHuanlingDesc(): string[] {
            let str = '';
            for (let i = 1; i <= ShenLingTypeAry.length; i++) {
                let info = this._proxy.getHuanlingInfo(this._systemId, i);
                let stage = info && info.stage || 0;
                let cfg = this._proxy.getHuanlingCfg(this._systemId, i, stage || 1);
                let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, cfg.buff_id);
                str = str + TextUtil.addColor(`【${buffCfg.name}】` + buffCfg.des, stage > 0 ? BlackColor.WHITE : BlackColor.GRAY);
                if (i != ShenLingTypeAry.length) {
                    str += '\n';
                }
            }
            return [getLanById(LanDef.huanjing_tips1), str];
        }

        //驻神
        private getZhushenDesc(): string[] {
            let cfg = this._proxy.getHuanjingParamCfg(this._systemId);
            let stageLv = this._proxy.getZhushenStageLv(this._systemId);
            let attrId = cfg.zushen_attr[stageLv == 0 ? 0 : stageLv - 1];
            let attr = RoleUtil.getAttr(attrId);
            let color = stageLv > 0 ? BlackColor.WHITE : BlackColor.GRAY;
            let strDesc = '';
            if (attr) {
                strDesc = TextUtil.getAttrTextInfos(attr, color, '\n', '+', color).join('\n');
            }
            return [getLanById(LanDef.huanjing_tips2), strDesc];
        }
    }
}