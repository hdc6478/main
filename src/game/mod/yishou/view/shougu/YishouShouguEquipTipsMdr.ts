namespace game.mod.yishou {

    import LanDef = game.localization.LanDef;
    import SkillLevelConfig = game.config.SkillLevelConfig;
    import attributes = msg.attributes;
    import EquipmentConfig = game.config.EquipmentConfig;

    export class YishouShouguEquipTipsMdr extends MdrBase {
        protected _view: YishouShouguEquipTipsView = this.mark("_view", YishouShouguEquipTipsView);
        protected _proxy: YishouProxy;
        _showArgs: number | PropData;//装备id

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
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateBaseAttr, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._view.currentState = 'default';
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        protected updateBaseAttr(): void {
            let index: number;
            let attr: attributes;
            if (this._showArgs instanceof PropData) {
                index = this._showArgs.index;
                let baseAttrId = (this._showArgs.cfg as EquipmentConfig).attr_id;
                attr = RoleUtil.getAttr(baseAttrId);
            } else {
                //兽骨界面打开，传入number
                index = this._showArgs;
                let ary = this._proxy.getAryByParserIndex(index);
                let type = ary[3];
                let pos = ary[2];
                let equipInfo = this._proxy.getEquipInfo(type, pos);
                if (!equipInfo) {
                    return;
                }
                attr = equipInfo.regular_attrs;
            }

            this._view.propTips.updateShow(index);
            this._view.power.setPowerValue(attr && attr.showpower ? attr.showpower : 0);

            let attrDesc = TextUtil.getAttrTextAdd(attr);
            this._view.descItem0.updateShow(attrDesc, getLanById(LanDef.base_attr));
        }

        protected updateView(): void {
            let index: number;
            if (this._showArgs instanceof PropData) {
                index = this._showArgs.index;
            } else {
                index = this._showArgs;
            }

            let ary = this._proxy.getAryByParserIndex(index);
            let type = ary[3];

            //更新基础属性
            this.updateBaseAttr();

            //技能阶数
            let curStage = this._proxy.getCurStage(type);
            let nextStage = curStage + 1;
            let cond = this._proxy.getStageCondition(type, nextStage);
            let str = '';
            if (cond) {
                //有下一阶
                str = StringUtil.substitute(getLanById(LanDef.yishou_tips19), [ColorUtil.getColorChineseStrByQua2(cond[1]), cond[2]]);
            } else {
                nextStage -= 1;
            }
            let titleDesc = nextStage + getLanById(LanDef.tishi_43)
                + TextUtil.addColor(str, WhiteColor.RED);

            let typeCfg = this._proxy.getYishoucfg(type);
            let skill = typeCfg.skill;
            let maxStage = this._proxy.getMaxStage(type);

            let list: string[] = [];
            let posNameList = this._proxy.getStagePosNameList(type);
            if (posNameList && posNameList.length) {
                list = list.concat(posNameList);
            }

            for (let i = 1; i <= maxStage; i++) {
                let skillLvCfg: SkillLevelConfig = getConfigByNameId(ConfigName.SkillLv, skill + i);
                if (!skillLvCfg) {
                    continue;
                }
                let desc = i + getLanById(LanDef.tishi_43) + `：` + skillLvCfg.describe;
                let color = curStage >= i ? BlackColor.GREEN : BlackColor.GRAY;
                list.push(TextUtil.addColor(desc, color));
            }

            this._view.descItem1.updateShow(list.join('\n'), titleDesc);
        }
    }
}