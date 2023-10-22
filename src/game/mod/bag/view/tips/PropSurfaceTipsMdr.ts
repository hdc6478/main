namespace game.mod.bag {

    import PropConfig = game.config.PropConfig;
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import ShenlingConfig = game.config.ShenlingConfig;
    import LanDef = game.localization.LanDef;

    export class PropSurfaceTipsMdr extends EffectMdrBase {
        private _view: PropSurfaceTipsView = this.mark("_view", PropSurfaceTipsView);
        private _proxy: BagProxy;
        public _showArgs: PropData;
        /**道具*/
        private _propData: PropData;
        /**道具*/
        private _index: number;//外显index
        private _listSkill: eui.ArrayCollection;
        private _cfg: ShenlingConfig;//神灵配置

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Bag);

            this._view.list_skill.itemRenderer = ShenLingSkillIconTap;
            this._view.list_skill.dataProvider = this._listSkill = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_skill, TouchEvent.TOUCH_TAP, this.onClickSkill);
            addEventListener(this._view.list_skill, eui.ItemTapEvent.ITEM_TAP, this.onClickTalent, this);

            this.onNt(ViewEvent.ON_VIEW_HIDE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateShow();
            this.updateShenling();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickSkill(e: egret.TouchEvent): void {
            let sData = e.currentTarget.data as ISLSkillIconData;
            let data: ISLSkillTipsData = {
                index: this._index,
                skill_index: sData.skill_index,
                skill_type: SLSkillType.PuGong
            };
            facade.showView(ModName.Shenling, ShenLingViewType.ShenLingSkill, data);
        }

        private onClickTalent(e: eui.ItemTapEvent): void {
            let sData = e.item as ISLSkillIconData;
            let data: ISLSkillTipsData = {
                index: this._cfg.index,
                skill_index: sData.skill_index,
                skill_type: SLSkillType.Talent
            };
            facade.showView(ModName.Shenling, ShenLingViewType.ShenLingSkill, data);
        }

        private updateShow(): void {
            this._propData = this._showArgs;
            let cfg = this._propData.cfg as PropConfig;
            this._view.basePropTips.updateShow(this._propData);

            let power = RoleUtil.getSurfacePower(cfg.god,cfg.showPower);

            this._view.power.setPowerValue(power);

            let index = cfg.param1 ? cfg.param1[0][0] : 0;
            this._index = index;
            if (index) {
                this._view.img_status.source = SurfaceUtil.isAct(index) ? "yijihuo" : "weijihuo";
                this._view.baseSurfaceItem.updateShow(index, cfg.god);
            }

            this._view.baseDescItem.updateShow(this._propData.desc);

            if (this._view.basePropGainList) {
                this._view.basePropGainList.updateShow(this._propData.gain_id);
            }
        }

        private updateShenling(): void {
            if (!this._index) {
                return;
            }
            let headType = PropData.getPropParse(this._index, PropParseType.Type);
            if (headType != ConfigHead.Shenling) {
                this._view.currentState = "default";
                return;
            }
            this._view.currentState = "shenling";
            let _proxy: IShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            let cfg = _proxy.getShenLingCfg(this._index);
            this._cfg = cfg;
            this._view.img_type.source = `shuxingtubiao_${cfg.type}`;

            this._view.btn_skill.data = {
                skill_index: cfg.common,
                is_act: true,
                skill_type: SLSkillType.PuGong
            };

            let starCfg = _proxy.getStarCfg(this._index, 1);
            let power = starCfg && starCfg.star_power || 0;
            this.addBmpFont(`+${power / 100}%`, BmpTextCfg[BmpTextType.CommonPower], this._view.gr_power);

            this._view.name0.setTitle(getLanById(LanDef.shenling_tips7));
            let list: ISLSkillIconData[] = [];
            for (let item of cfg.talent1) {
                list.push({
                    skill_index: item[1],
                    is_act: true
                });
            }
            this._listSkill.replaceAll(list);
        }
    }
}