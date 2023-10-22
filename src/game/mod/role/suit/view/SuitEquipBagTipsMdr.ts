namespace game.mod.role {

    import EquipmentConfig = game.config.EquipmentConfig;
    import LanDef = game.localization.LanDef;

    export class SuitEquipBagTipsMdr extends MdrBase {
        private _view: SuitEquipBagTipsView = this.mark("_view", SuitEquipBagTipsView);
        private _proxy: SuitProxy;
        private _propData: PropData;
        _showArgs: PropData;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Suit);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateBaseAttr, this);
            this.onNt(ViewEvent.ON_VIEW_HIDE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._propData = this._showArgs;
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            this._view.basePropTips.updateShow(this._propData);

            this.updateBaseAttr();
            this.updateSuitAttr();

            let cfg = this._propData.cfg as EquipmentConfig;
            if (cfg && cfg.gain_id) {
                this._view.baseGain.updateShow(cfg.gain_id);
            }
        }

        private updateBaseAttr(): void {
            let cfg = this._propData.cfg as EquipmentConfig;
            let attr = RoleUtil.getAttr(cfg.attr_id);
            this._view.baseAttr.updateShow(TextUtil.getAttrTextAdd(attr, BlackColor.GREEN), getLanById(LanDef.base_attr));
            this._view.power.setPowerValue(attr && attr.showpower || 0);
        }

        private updateSuitAttr(): void {
            let index = this._propData.index;
            let suitType = Math.floor(index / 10000) % 10;
            let maxStage = this._proxy.getMaxStageByType(suitType);
            let maxStageCfg = this._proxy.getSuitStageCfg(suitType, maxStage);
            this._view.baseSuit.updateShow(this._proxy.getBuffDesc(maxStageCfg.buff_id), `${SuitTypeName[suitType]}套装 ${maxStage}阶效果`);
        }
    }
}