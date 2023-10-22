namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import ParamConfig = game.config.ParamConfig;
    import TouchEvent = egret.TouchEvent;

    export class YhcsMdr extends EffectMdrBase {
        protected _view: YhcsView = this.mark("_view", YhcsView);
        protected _proxy: YhcsProxy;

        protected _listData: ArrayCollection = new ArrayCollection();

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Yhcs);

            this._view.list.itemRenderer = YhcsItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_recharge, TouchEvent.TOUCH_TAP, this.onRecharge, this);

            this.onNt(ActivityEvent.ON_UPDATE_YHCS_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this.onUpdateView();
            this.addEftByParentScale(this._view.btn_recharge.group_eft);

        }

        private onUpdateView(): void {
            let list = this._proxy.getList();
            this._listData.source = list;
            //按钮图片美术字资源
            this._view.btn_recharge.setImage("meishuzi_qianwangchongzhi");

            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "yuhuochongsheng_leichong");
            let str = TextUtil.addColor(`${this._proxy.model.num}/${cfg.value}`, this._proxy.isEnough ? Color.GREEN : Color.RED);
            this._view.lab_tips.textFlow = TextUtil.parseHtml(`已充值${str}元`);
        }

        private onRecharge(): void {
            ViewMgr.getIns().openCommonRechargeView();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}