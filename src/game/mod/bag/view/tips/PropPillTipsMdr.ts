namespace game.mod.bag {

    import PropConfig = game.config.PropConfig;
    import TouchEvent = egret.TouchEvent;
    import prop_use = msg.prop_use;
    import LanDef = game.localization.LanDef;
    import prop_use_params = msg.prop_use_params;

    export class PropPillTipsMdr extends MdrBase {
        private _view: PropPillTipsView = this.mark("_view", PropPillTipsView);
        private _proxy: BagProxy;
        public _showArgs: PropData;
        private _propData: PropData;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Bag);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_goto, TouchEvent.TOUCH_TAP, this.onClickGoto);

            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateAttr, this);
            this.onNt(ViewEvent.ON_VIEW_HIDE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateShow();
            this.updateAttr();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickGoto(): void {
            if (!this._propData) {
                return;
            }
            let propSubType = this._propData.propSubType;
            let jumpIdx = LianshendanToJumpIdx[propSubType];
            ViewMgr.getIns().showViewByID(jumpIdx);
        }

        private updateShow(): void {
            this._propData = this._showArgs;
            this._view.basePropTips.updateShow(this._propData);
            let curCnt = BagUtil.getPropCntByIdx(this._propData.index);
            let cntStr = "拥有数量：" + curCnt;
            this._view.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);
            this._view.baseDescItem.updateShow(this._propData.desc);//道具描述

            if (this._view.basePropGainList) {
                this._view.basePropGainList.updateShow(this._propData.gain_id);//获取途径
            }
        }

        private updateAttr(): void {
            let propCfg = this._propData.cfg as PropConfig;
            let attrIndex = propCfg.param1[0][0];
            let attr = RoleUtil.getAttr(attrIndex);
            if (!attr) {
                return;
            }
            this._view.power.setPowerValue(attr.showpower);
            this._view.baseAttrItem.updateShow(attr, true);
        }
    }
}