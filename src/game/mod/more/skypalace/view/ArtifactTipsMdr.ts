namespace game.mod.more {

    import attributes = msg.attributes;
    import HuangguShenqiConfig = game.config.HuangguShenqiConfig;
    import BattleSkillConfig = game.config.BattleSkillConfig;

    export class ArtifactTipsMdr extends MdrBase {
        protected _view: ArtifactTipsView = this.mark("_view", ArtifactTipsView);

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

        protected updateView(): void {
            this.updateTopView();
            this.updateMiddleView();
        }

        protected updateTopView(): void {
            let cfg: HuangguShenqiConfig = getConfigByNameId(ConfigName.HuangguShenqi, this._showArgs.index);
            this._view.qualityTips.updateShow(cfg.quality);
            this._view.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.name, ColorUtil.getColorByQuality1(cfg.quality)));

            let info = this._proxy.getInfo(this._showArgs.index);
            // this._view.img_status.visible = !info || !info.level;
            this._view.img_status.source = !info || !info.level ? "weijihuo" : "yijihuo";

            this._view.img_icon.source = `shenqi_${cfg.index}`;
        }

        protected updateMiddleView(): void {
            let info = this._proxy.getInfo(this._showArgs.index);

            this._view.artifact_item.setData(this._showArgs.index);

            let attr: attributes = info && info.attr;
            this._view.power.setPowerValue(attr && attr.showpower && attr.showpower.toNumber() || 0);

            let strs: string[][] = [];
            let cfg: HuangguShenqiConfig = getConfigByNameId(ConfigName.HuangguShenqi, this._showArgs.index);
            for (let id of cfg.skill_id) {
                let skill: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, id);
                let level: number = this._proxy.getSkillLevel(this._showArgs.index, id);
                let limit: number = this._proxy.getSkillAct(this._showArgs.index, id);
                let str_lv: string = TextUtil.addColor(level ? `(${level}级)` : `(${limit}级激活)`, level ? WhiteColor.GREEN : WhiteColor.RED);
                let title: string = `[${skill.name}]` + str_lv;
                let desc: string = TextUtil.getSkillDesc(skill, level, false);
                strs.push([title, desc]);
            }
            this._view.skill_item.updateShow(strs, "技能效果")
        }

    }

}