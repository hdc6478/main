namespace game.mod.more {

    import attributes = msg.attributes;
    import HuangguShenqiConfig = game.config.HuangguShenqiConfig;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import HuangguShenqiBuweiConfig = game.config.HuangguShenqiBuweiConfig;
    import LanDef = game.localization.LanDef;

    export class ArtifactBuweiTipsMdr extends EffectMdrBase {
        protected _view: ArtifactBuweiTipsView = this.mark("_view", ArtifactBuweiTipsView);

        public _showArgs: ArtifactBuweiData;
        private _proxy: SkyPalaceProxy;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.SkyPalace);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_up, egret.TouchEvent.TOUCH_TAP, this.onClickBtn, this);

            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.onUpdateAttr, this);
            this.onNt(MoreEvent.ON_UPDATE_ARTIFACT_ATTR_INFO, this.updateView, this);
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
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;
        }

        protected onClickBtn(): void {
            let cost: number[] = this._proxy.getBuweiCost(this._showArgs.index, this._showArgs.pos);
            if (!BagUtil.checkPropCnt(cost[0], cost[1], PropLackType.Dialog)) {
                return;
            }
            this._proxy.c2s_huanggu_shenqi_oper(2, this._showArgs.index, this._showArgs.pos);
        }

        protected updateView(): void {
            this.updateTopView();
            this.updateMiddleView();
            this.updateBottomView();
        }

        protected updateTopView(): void {
            let cost: number[] = this._proxy.getBuweiCost(this._showArgs.index, this._showArgs.pos);
            let prop: PropData = PropData.create(cost[0]);
            let cfg = prop.cfg;
            if (!cfg) {
                return;
            }
            this._view.qualityTips.updateShow(cfg.quality);
            this._view.icon.setData(cfg.index, IconShowType.NotTips);
            this._view.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.name, ColorUtil.getColorByQuality1(cfg.quality)));
        }

        private onUpdateAttr(buwei_level: number): void {
            let attr: attributes = this._proxy.getBuweiAttr(this._showArgs.index, this._showArgs.pos);
            let color: number = buwei_level > 0 ? BlackColor.DEFAULT : WhiteColor.GRAY;
            this._view.baseAttrItem.updateShow(attr, true, getLanById(LanDef.ywl_baseAttr), color);
            this._view.power.setPowerValue(attr && attr.showpower && attr.showpower.toNumber() || 0);
        }

        protected updateMiddleView(): void {
            let info = this._proxy.getInfo(this._showArgs.index);
            let info_level: number = info && info.level || 0;
            let buwei_level: number = this._proxy.getBuweiLevel(this._showArgs.index, this._showArgs.pos);

            this.onUpdateAttr(buwei_level);

            let desc: string = "";
            let level: number = buwei_level || 1;
            let cfg: HuangguShenqiConfig = getConfigByNameId(ConfigName.HuangguShenqi, this._showArgs.index);
            let limit_level: number = cfg.level_condition[info_level];
            let cfg_buwei: HuangguShenqiBuweiConfig = this._proxy.getBuweiCfg(this._showArgs.index, level);
            for (let i in cfg_buwei.material) {
                let pos: number = +i + 1;
                let buwei = this._proxy.getBuwei(this._showArgs.index, pos);
                let prop = GameConfig.getPropConfigById(cfg_buwei.material[i][0]);
                if (desc.length) {
                    desc += "#N";
                }
                if (buwei && buwei.level) {
                    let color = buwei.level >= limit_level ? WhiteColor.GREEN : WhiteColor.RED;
                    desc += TextUtil.addColor(`[${buwei.level}阶]${prop.name}`, color);
                } else {
                    desc += TextUtil.addColor(`[1阶]${prop.name}`, WhiteColor.GRAY);
                }
            }
            // let title: string = "";
            this._view.taozhuangItem.updateShow(desc);

            let strs: string[][] = [];
            for (let id of cfg.skill_id) {
                let skill: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, id);
                let level: number = this._proxy.getSkillLevel(this._showArgs.index, id);
                let skillLvCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, id+level);
                let limit: number = this._proxy.getSkillAct(this._showArgs.index, id);
                let str_lv: string = TextUtil.addColor(level ? `(${level}级)` : `(${limit}阶激活)`, level ? WhiteColor.GREEN : WhiteColor.RED);
                let title: string = TextUtil.addColor(`[${skill.name}]`, level ? BlackColor.WHITE : WhiteColor.GRAY);
                let desc: string = TextUtil.addColor(TextUtil.getSkillDesc(skill, level, false,true), level ? BlackColor.WHITE : WhiteColor.GRAY);
                strs.push([title + str_lv, desc]);
            }
            this._view.skillItem.updateShow(strs, getLanById(LanDef.maid_cue15));
        }

        protected updateBottomView(): void {
            let next: number[] = this._proxy.getBuweiNextCost(this._showArgs.index, this._showArgs.pos);
            this._view.img_max.visible = !next || !next.length;
            this._view.btn_up.visible = !this._view.img_max.visible;
            this._view.cost.visible = !this._view.img_max.visible;
            if (!next || !next.length) {
                return;
            }
            let cnt: number = BagUtil.getPropCntByIdx(next[0]);
            this._view.cost.setData(next);
            this._view.cost.updateCnt(TextUtil.addEnoughColor(cnt, next[1]));

            let info = this._proxy.getInfo(this._showArgs.index);
            let info_level: number = info && info.level || 0;
            this._view.btn_up.label = info_level ? "升阶" : "激活";
        }
    }

    export interface ArtifactBuweiData {
        /**index */
        index: number;
        /**部位 */
        pos: number;
        /** */
        setHint?: boolean;
    }
}