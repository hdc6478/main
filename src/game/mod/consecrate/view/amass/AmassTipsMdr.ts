namespace game.mod.consecrate {

    import PropConfig = game.config.PropConfig;
    import TouchEvent = egret.TouchEvent;

    export class AmassTipsMdr extends EffectMdrBase {
        private _view: AmassTipsView = this.mark("_view", AmassTipsView);
        private _proxy: ConsecrateProxy;
        public _showArgs: PropData;
        private _propData: PropData;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Consecrate);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_goto, TouchEvent.TOUCH_TAP, this.onClickGoto);
            //this.onNt(ViewEvent.ON_VIEW_HIDE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateShow();
            this.updateGoto();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickGoto(): void {
            if(!this._propData){
                this.hide();
                return;
            }
            let index = this._propData.index;
            let cfg = this._proxy.getAmassCfg(index);
            let classId = cfg["class_id"];//客户端没有导出字段定义
            let jumpIdx = classId == AmassClassId.Amass ? JumpIdx.Amass : JumpIdx.Amass2;
            ViewMgr.getIns().showViewByID(jumpIdx);
            this.hide();
        }

        private updateShow(): void {
            this._propData = this._showArgs;
            let cfg = this._propData.cfg as PropConfig;
            this._view.basePropTips.updateShow(this._propData);

            this._view.power.setPowerValue(cfg.showPower);

            let cnt = BagUtil.getPropCntByIdx(this._propData.index);
            this._view.lab_cnt.text = "拥有数量：" + cnt;

            let bgStr = ResUtil.getBigIcon(cfg.icon);
            this._view.img_bg.source = ResUtil.getUiPng(bgStr);

            let index = this._propData.index;
            this._view.img_status.source = this._proxy.getAmassLv(index) ? "yijihuo" : "weijihuo";

            this._view.baseDescItem.updateShow(this._propData.desc);
        }

        private updateGoto(): void {
            let iconShowType = this._propData.iconShowType;
            let showGoto = iconShowType == IconShowType.Bag;
            this._view.btn_goto.visible = showGoto;
        }
    }
}