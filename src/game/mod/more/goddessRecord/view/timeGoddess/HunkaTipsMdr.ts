namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import prop_attributes = msg.prop_attributes;
    import LanDef = game.localization.LanDef;
    import NvshenGudingAttrConfig = game.config.NvshenGudingAttrConfig;

    export class HunkaTipsMdr extends EffectMdrBase {
        private _view: HunkaTipsView = this.mark("_view", HunkaTipsView);
        private _proxy: GoddessRecordProxy;
        protected _showArgs: PropData | prop_attributes;
        private _propData: PropData;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.GoddessRecord);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_remove, TouchEvent.TOUCH_TAP, this.onClickRemove);
            addEventListener(this._view.btn_wear, TouchEvent.TOUCH_TAP, this.onClickWear);
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickRemove(): void {
            let type = this._proxy.hunkaType;
            let pos = this._proxy.hunkaSelPos;
            this._proxy.c2s_chuang_shi_nv_shen_hun_ka_click(HunkaOpType.Remove, type, pos);
            this.hide();
        }

        private onClickWear(): void {
            //替换，打开背包
            let type = this._proxy.hunkaType;
            this._proxy.hunkaBagOpenType = HunkaBagOpenType.Wear;
            this.hide();
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.HunkaBag, type);
        }

        private updateView(): void {
            if(this._showArgs instanceof prop_attributes){
                //部位点击进来的
                this._propData = PropData.fromData(this._showArgs);
                this._view.currentState = "wear";
            }
            else {
                this._propData = this._showArgs;
                this._view.currentState = "default";
            }

            this._view.basePropTips.updateShow(this._propData);
            let star = this._propData.hunka_star;
            this._view.starListView.updateStar(star, star);

            this._view.hunkaScore.setData(this._propData.pingfen);

            let title1 = getLanById(LanDef.hunka_tips19);
            let desc1 = title1 + " +" + this._propData.hunka_zizhi;

            this._view.baseDescItem1.updateShow(desc1, title1);

            let title2 = getLanById(LanDef.hunka_tips10);
            let guding = this._propData.guding;
            let cfg: NvshenGudingAttrConfig = getConfigByNameId(ConfigName.NvshenGudingAttr, guding.itype);
            let desc2 = cfg.type_name + TextUtil.getAttrTextAdd(guding.attr, BlackColor.GREEN);
            this._view.baseDescItem2.updateShow(desc2, title2);

            let desc3 = getLanById(LanDef.hunka_tips11);
            this._view.baseNameItem.setTitle(desc3);

            this._view.hunkaAttrListView.updateShow(this._propData.shuiji);
        }
    }
}