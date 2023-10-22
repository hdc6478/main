namespace game.mod.shenling {

    import BattleSkillConfig = game.config.BattleSkillConfig;
    import ShenlingConfig = game.config.ShenlingConfig;
    import Pool = base.Pool;
    import SkillLevelConfig = game.config.SkillLevelConfig;
    import LanDef = game.localization.LanDef;
    import BuffConfig = game.config.BuffConfig;

    /**神灵技能tips*/
    export class ShenLingSkillTipsMdr extends MdrBase {
        private _view: ShenLingSkillTipsView = this.mark("_view", ShenLingSkillTipsView);
        private _proxy: ShenLingProxy;

        _showArgs: ISLSkillTipsData;
        private _cfg: BattleSkillConfig;
        private _type: number;//神灵类型

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.verticalCenter = 0;
            this._view.horizontalCenter = 0;
            this._proxy = this.retProxy(ProxyType.Shenling);
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();
            let data = this._showArgs;
            if (!data) {
                return;
            }

            this._type = this._proxy.getShenLingType(data.index);
            this._cfg = getConfigByNameId(ConfigName.Skill, data.skill_index);
            if (!this._cfg) {
                return;
            }

            this.updateTopInfo();
            this.addBaseInfo();
            let type = data.skill_type;
            if (type == SLSkillType.Talent) {
                this._view.currentState = 'talent';
            } else {
                this._view.currentState = 'normal';
            }

            if (type == SLSkillType.Talent) {
                this.updateTalent();
            } else if (type == SLSkillType.PuGong) {
                this.updatePuGong();
            } else if (type == SLSkillType.HeJi) {
                this.updateHeJi();
            }
        }

        /**顶部基础信息*/
        private updateTopInfo(): void {
            let data = this._showArgs;
            this._view.icon.data = {
                skill_index: data.skill_index,
                is_act: true,
                skill_type: data.skill_type
            };

            let txt = '';
            if (data.skill_type == SLSkillType.HeJi) {
                let info = this._proxy.getTypeInfo(this._type);
                if (info && info.skilllevel) {
                    txt = `${info.skilllevel}${getLanById(LanDef.tishi_43)}`;
                }
            }

            this._view.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(this._cfg.name + ' ' + txt, ColorUtil.getColorByQuality1(this._cfg.quality)));
            this._view.tips.updateShow(this._cfg.quality);
            this._view.img_showType.source = `jineng_show_type_${this._cfg.show_type}`;
        }

        /**通用的【技能效果】*/
        private addBaseInfo(): void {
            let txt = this._cfg.describe;
            let skillLv = 1;//技能等级，默认1
            if (this._showArgs.skill_type == SLSkillType.HeJi) {
                let typeInfo = this._proxy.getTypeInfo(this._type);
                skillLv = typeInfo && typeInfo.skilllevel || 1;//合计技能等级
                txt = TextUtil.getSkillDesc(this._cfg, skillLv, false, true);
            } else if (this._showArgs.skill_type == SLSkillType.Talent) {
                let isAct = false;
                let info = this._proxy.getInfoByIndex(this._showArgs.index);
                let curStar = info ? info.star : 0;
                let slCfg = this._proxy.getShenLingCfg(this._showArgs.index);
                if (slCfg && slCfg.talent1) {
                    for (let talent of slCfg.talent1) {
                        if (talent && talent[1] == this._showArgs.skill_index) {
                            isAct = talent[0] <= curStar;
                            break;
                        }
                    }
                }
                txt = TextUtil.addColor(txt, isAct ? BlackColor.GREEN : BlackColor.GRAY);
            }
            let descItem = Pool.alloc(BaseDescItem);
            descItem.updateShow(txt, getLanById(LanDef.sp_tips1));
            this.addToScroller(descItem);
        }

        /**普攻技能*/
        private updatePuGong(): void {
            let cfg: SkillLevelConfig = getConfigByNameId(ConfigName.SkillLv, this._cfg.index + 1);
            if (!cfg) {
                return;
            }

            let attrComp = new SkillAttrList();
            let txtList: string[][] = [];
            for (let i = 0; i < ShenLingPuGongAttr.length; i++) {
                txtList.push([ShenLingPuGongAttrName[i], this.getVal(ShenLingPuGongAttr[i])]);
            }
            attrComp.updateAttr(txtList);
            this.addToScroller(attrComp);
        }

        /**ShenLingPuGongAttr 前两项来源 ConfigName.SkillLv，后一项来源 ConfigName.Skill*/
        private getVal(key: string): string {
            let cfg: SkillLevelConfig = getConfigByNameId(ConfigName.SkillLv, this._cfg.index + 1);
            let rst: string = '';
            switch (key) {
                case 'skill_coefs':
                    rst = ((cfg.skill_coefs && cfg.skill_coefs[0] || 0) / 100) + '%';
                    break;
                case 'fixdma':
                    rst = `${cfg.fixdma && cfg.fixdma[0] || 0}`;
                    break;
                case 'next_cd':
                    rst = `${this._cfg.cd / 1000}${getLanById(LanDef.shijian_4)}`;
                    break;
            }
            return rst;
        }

        /**天赋技能*/
        private updateTalent(): void {
            let item = Pool.alloc(BaseLabelItem);
            item.setLabel(TextUtil.addColor(getLanById(LanDef.shenling_tips8), BlackColor.ORANGE));
            this.addToScroller(item);
            this._view.img_acted.visible = this._view.lb_actDesc.visible = false;
            let args = this._showArgs;
            let cfg: ShenlingConfig = this._proxy.getShenLingCfg(args.index);
            if (!cfg) {
                return;
            }
            let info = this._proxy.getInfoByIndex(cfg.index);
            let num = 0;//激活所需星级
            for (let item of cfg.talent1) {
                if (item[1] == args.skill_index) {
                    num = item[0];
                    break;
                }
            }
            if (info && info.star >= num) {
                this._view.img_acted.visible = true;
                return;
            }

            let str = `(${info && info.star || 0}/${num})`;
            let txt = StringUtil.substitute(getLanById(LanDef.shenling_tips9), [cfg.name + num, TextUtil.addColor(str, WhiteColor.RED)]);
            this._view.lb_actDesc.textFlow = TextUtil.parseHtml(txt);
            this._view.lb_actDesc.visible = true;
        }

        /**合击技能*/
        private updateHeJi(): void {
            let attrKeys = ShenLingHeJiAttrType[this._type];
            let names = ShenLingHeJiAttrTypeName[this._type];
            let attrComp = new SkillAttrList();
            let txtList: string[][] = [];
            for (let i = 0; i < attrKeys.length; i++) {
                let name: string;
                if (i == 0) {
                    name = TextUtil.getAttrsText(attrKeys[i]);
                } else {
                    name = names[i];
                }
                txtList.push([name, this.getHeJiVal(attrKeys[i])]);
            }
            attrComp.updateAttr(txtList);
            this.addToScroller(attrComp);

            let nameItem = Pool.alloc(BaseNameItem);
            nameItem.setTitle(getLanById(LanDef.shenling_tips10));
            this.addToScroller(nameItem);

            let cfg = this._proxy.getTypeCfg(this._type);
            if (!cfg) {
                return;
            }
            let info = this._proxy.getTypeInfo(this._type);
            let actedSkillList = info ? info.skill_list : [];
            for (let index of cfg.skill_array) {
                let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, index);
                if (!cfg) {
                    continue;
                }
                let isAct = actedSkillList.indexOf(index) > -1;
                let color = isAct ? BlackColor.GREEN : BlackColor.GRAY;
                let item = Pool.alloc(BaseZhuangShiDescItem);
                item.updateShow(TextUtil.addColor(cfg.name, color), TextUtil.addColor(cfg.describe, color));
                this.addToScroller(item);
            }
        }

        private getHeJiVal(key: string): string {
            let rst = '0';
            switch (key) {
                case 'cd':
                    rst = (this._cfg.cd / 1000) + getLanById(LanDef.shijian_4);
                    break;
                case 'probability':
                    let prob = this.getSkillProbability(this._cfg.index);
                    let info = this._proxy.getTypeInfo(this._type);
                    let actedSkillList = info ? info.skill_list : [];
                    for (let skillId of actedSkillList) {
                        if (skillId) {
                            prob += this.getSkillProbability(skillId);
                        }
                    }
                    rst = Math.floor(prob / 100) + '%';
                    break;
                default:
                    let attrs = this._proxy.getAttrByType(this._type);
                    if (attrs && attrs[key]) {
                        rst = attrs[key] + '';
                    }
            }
            return rst;
        }

        private getSkillProbability(skill_index: number): number {
            let skillLv: SkillLevelConfig = getConfigByNameId(ConfigName.SkillLv, skill_index + 1);
            if (!skillLv || !skillLv.buff_effect) {
                return 0;
            }
            let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, skillLv.buff_effect[0]);
            if (buffCfg && buffCfg.probability != null) {
                return buffCfg.probability;
            }
            return 0;
        }

        /**添加到scroller的滚动区域内*/
        private addToScroller(com: egret.DisplayObject): void {
            if (com) {
                this._view.gr_attr.addChild(com);
            }
        }

        protected onHide(): void {
            super.onHide();
            this._view.gr_attr.removeChildren();
        }
    }
}