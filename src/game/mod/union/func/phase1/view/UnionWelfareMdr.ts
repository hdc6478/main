namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import ParamConfig = game.config.ParamConfig;
    import LanDef = game.localization.LanDef;

    /**福利大厅 */
    export class UnionWelfareMdr extends EffectMdrBase {
        private _view: UnionWelfareView = this.mark("_view", UnionWelfareView);
        private _proxy: UnionProxy;

        private eft_id: number;

        private _listData: ArrayCollection = new ArrayCollection();

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = UnionWelfareItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_explain, egret.TouchEvent.TOUCH_TAP, this.onClickExplain);

            this.onNt(UnionEvent.ON_UPDATE_WELFARE_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_guild_charge_ui();
            super.onShow();
        }

        private onUpdateView(): void {
            let model = this._proxy.model;
            if (!model.mvp_count) {
                this._view.lab_nobody.visible = true;
                this._view.img_nobody.visible = true;
                this._view.lab_count.visible = false;
                this._view.lab_name.visible = false;
                this._view.head.visible = false;

                this.eft_id && this.removeEffect(this.eft_id);
            } else {
                this._view.lab_nobody.visible = false;
                this._view.img_nobody.visible = false;
                this._view.lab_count.visible = true;
                this._view.lab_name.visible = true;
                this._view.head.visible = true;

                let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "guiid_charge");
                this.eft_id = this.addEftByParent(ResUtil.getTitleSrc(cfg.value[0], 0), this._view.gr_eft);
                this._view.head.updateShow(model.mvp.head, model.mvp.head_frame, model.mvp.sex, model.mvp.vip);
                this._view.lab_name.text = model.mvp.name;
                this._view.lab_count.textFlow = TextUtil.parseHtml(`为宗门发放${TextUtil.addColor(`${model.mvp_count}`, "0xeca240")}次福利`);
            }

            let list = this._proxy.getWelfareList();
            this._listData.source = list;
            this._view.img_ditu.visible = !list.length;
        }

        private onClickExplain(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.xianzong_tips16));
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}