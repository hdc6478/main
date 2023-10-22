namespace game.mod.surface {

    import XianjianProxy = game.mod.surface.XianjianProxy;
    import attributes = msg.attributes;
    import JianfaConfig = game.config.JianfaConfig;
    import XianjianConfig = game.config.XianjianConfig;
    import BattleSkillConfig = game.config.BattleSkillConfig;

    export class XianjianBuweiTipsMdr extends EffectMdrBase {
        protected _view: XianjianBuweiTipsView = this.mark("_view", XianjianBuweiTipsView);
        protected _proxy: XianjianProxy;

        public _showArgs: XianJianBuweiData;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianjian);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_up, egret.TouchEvent.TOUCH_TAP, this.onClickBtn, this);

            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.onUpdateAttr, this);
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
            let next: number[] = this._proxy.getBuweiNext(this._showArgs);
            if (!BagUtil.checkPropCnt(next[0], next[1], PropLackType.Dialog)) {
                return;
            }
            this._proxy.c2s_fly_sword_operation(this._showArgs.index, 4, this._showArgs.pos);
            this.hide();
        }

        protected updateView(): void {
            this.updateTopView();
            this.updateMiddleView();
            this.updateBottomView();
        }

        protected updateTopView(): void {
            let buwei: JianfaConfig = this._proxy.getXianjianBuwei(this._showArgs);
            let prop: PropData = PropData.create(buwei.cost[0][0]);
            let cfg = prop.cfg;
            if (!cfg) {
                return;
            }
            this._view.qualityTips.updateShow(cfg.quality);
            this._view.icon.setData(cfg.index, IconShowType.NotTips);
            this._view.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.name, ColorUtil.getColorByQuality1(cfg.quality)));
        }

        private onUpdateAttr(): void {
            let buwei = this._proxy.getBuwei(this._showArgs);

            let buwei_cfg: JianfaConfig = this._proxy.getXianjianBuwei(this._showArgs);
            let attr: attributes = buwei && buwei.attr || RoleUtil.getAttr(buwei_cfg.attrs[0]);
            this._view.baseAttrItem.updateShow(attr);
            this._view.power.setPowerValue(attr && attr.showpower && attr.showpower.toNumber() || 0);
        }

        protected updateMiddleView(): void {
            let info = this._proxy.getInfo(this._showArgs.index);

            this.onUpdateAttr();

            let desc: string = "";
            let cfgs = getConfigByNameId(ConfigName.Jianfa, this._showArgs.index);
            for (let k in cfgs) {
                let cfg: JianfaConfig = cfgs[k];
                let bool: boolean = false;
                if (info && info.buwei_info) {
                    for (let data of info.buwei_info) {
                        if (data.index == +k) {
                            let prop = GameConfig.getPropConfigById(cfg.cost[0][0]);
                            desc += TextUtil.addColor(`${desc.length == 0 ? "" : "#N"}[${data.level}阶]${prop.name}`, WhiteColor.GREEN);
                            bool = true;
                        }
                    }
                }
                if (!bool) {
                    let prop = GameConfig.getPropConfigById(cfg.cost[0][0]);
                    desc += TextUtil.addColor(`${desc.length == 0 ? "" : "#N"}[1阶]${prop.name}`, WhiteColor.GRAY);
                }
            }
            this._view.taozhuangItem.updateShow(desc);

            let xianjian: XianjianConfig = getConfigByNameId(ConfigName.Xianjian, this._showArgs.index);
            let skill: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, xianjian.skill);
            this._view.skillItem.updateShow(skill.describe, skill.name);
        }

        protected updateBottomView(): void {
            let next: number[] = this._proxy.getBuweiNext(this._showArgs);
            this._view.img_max.visible = !next;
            this._view.btn_up.visible = !this._view.img_max.visible;
            let buwei_cfg: JianfaConfig = this._proxy.getXianjianBuwei(this._showArgs);
            this._view.btn_up.setHint(this._proxy.getBuweiUp(this._showArgs.index, buwei_cfg));
            this._view.cost.visible = !this._view.img_max.visible;
            this._view.grp_bar.visible = !this._view.img_max.visible;
            if (!next) {
                return;
            }
            this._view.cost.setData(next);
            let cnt: number = BagUtil.getPropCntByIdx(next[0]);
            this._view.bar.show(cnt, next[1], false, 0, false, ProgressBarType.Value);
        }
    }

    export interface XianJianBuweiData {
        /**仙剑index */
        index: number;
        /**仙剑部位 */
        pos: number;
    }
}