namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import BuffConfig = game.config.BuffConfig;

    export class HuanjingStarSkillTipsMdr extends MdrBase {
        private _view: HuanjingZhushenSkillTipsView = this.mark("_view", HuanjingZhushenSkillTipsView);
        private _proxy: HuanjingProxy;
        private _listCost: eui.ArrayCollection;
        _showArgs: { systemId: number, pos: number };

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Huanjing);
            this._view.img_skilltype.visible = false;

            this._view.list_cost.itemRenderer = CostIcon;
            this._view.list_cost.dataProvider = this._listCost = new eui.ArrayCollection();
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
            let isMax = this._proxy.isStarPosMax(data.systemId, data.pos);


            let info = this._proxy.getStarPosData(data.systemId, data.pos);
            let star = info && info.star || 0;
            let buffId: number;
            if (isMax) {
                this._view.currentState = 'zhushenMax';
                let cfg = this._proxy.getStarCfg(data.systemId, data.pos, star);
                buffId = cfg.starlevel_buff;
            } else {
                this._view.currentState = 'starAct';
                let cfg = this._proxy.getStarCfg(data.systemId, data.pos, star + 1);
                this._listCost.replaceAll(cfg.cost);
                buffId = cfg.starlevel_buff;
                this._view.btn_do.setHint(this._proxy.canActOrUpStarPos(data.systemId, data.pos));
                this._view.btn_do.labelDisplay.text = star > 0 ? '进阶' : '激活';
            }

            let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffId);
            this._view.baseDescItem1.updateShow(buffCfg && buffCfg.des || '', getLanById(LanDef.huanjing_tips9), 10, star > 0 ? BlackColor.DEFAULT : BlackColor.GRAY);
            this._view.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(buffCfg.name + ' ' + star + '阶', ColorUtil.getColorByQuality2(buffCfg.buff_quality)));
            this._view.baseQualityTips.updateShow(buffCfg.buff_quality);
            this._view.skillItem.setIcon(buffCfg.icon);


            this.updateAttr();
        }

        //todo
        private onClick(): void {
            let data = this._showArgs;
            if (this._proxy.canActOrUpStarPos(data.systemId, data.pos, true)) {
                this._proxy.c2s_huanjin_oper(data.systemId, 2, data.pos);
            }
        }

        private updateAttr(): void {
            let data = this._showArgs;
            let info = this._proxy.getStarPosData(data.systemId, data.pos);
            let star = info && info.star || 0;
            let cfg = this._proxy.getStarCfg(data.systemId, data.pos, star || 1);
            let color = star > 0 ? BlackColor.DEFAULT : BlackColor.GRAY;
            let attr = RoleUtil.getAttr(cfg ? cfg.attr_id : 0);
            this._view.baseDescItem0.updateShow(TextUtil.getAttrTextAdd(attr), getLanById(LanDef.ywl_baseAttr), 10, color);
        }
    }
}