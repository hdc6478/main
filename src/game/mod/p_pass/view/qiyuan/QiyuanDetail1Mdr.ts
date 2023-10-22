namespace game.mod.pass {

    import ArrayCollection = eui.ArrayCollection;
    import QiyuanConfig = game.config.QiyuanConfig;
    import TouchEvent = egret.TouchEvent;
    import QiyuanFubenConfig = game.config.QiyuanFubenConfig;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class QiyuanDetail1Mdr extends MdrBase {
        private _view: QiyuanDetail1View = this.mark("_view", QiyuanDetail1View);

        private _proxy: PassProxy;
        private _model: PassModel;

        private _cfg: QiyuanConfig;
        private _fbCfg: QiyuanFubenConfig;

        private _rewardDatas: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();

            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;

            this._rewardDatas = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._rewardDatas;

            this._proxy = this.retProxy(ProxyType.Pass);
            this._model = this._proxy.getModel();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn_fight, TouchEvent.TOUCH_TAP, this.onFightBtnClick);
        }

        protected onShow(): void {
            super.onShow();

            this._cfg = this._showArgs;
            if (!this._cfg) {
                return;
            }

            if (this._cfg.event_type == 1) {
                let index: number = this._proxy.getIndexByCfgIndex(this._cfg.index);
                this._fbCfg = getConfigByNameId(ConfigName.QiyuanFuben, this._cfg.param1[index]);
            } else {
                this._fbCfg = getConfigByNameId(ConfigName.QiyuanFuben, this._cfg.param1[0]);
            }

            this._view.recommendPower.visible = !!this._fbCfg.power;
            this._view.recommendPower.setPowerValue(this._fbCfg.power);

            this.updateData();
        }

        protected onHide(): void {
            super.onHide();
        }

        protected updateData() {
            if (this._fbCfg.show_rewards.length > 0) {
                this._view.awd_icon.setData(this._fbCfg.show_rewards[0]);
            }
            // this._view.pro_awd.value = this._model.qyFbGotsAwdCnt;
            // this._view.pro_awd.maximum = this._model.qyFbTotalAwdCnt;
            let index: number = this._proxy.getIndexByCfgIndex(this._cfg.index);
            this._view.pro_awd.show(index, this._cfg.param1.length, false, 0, false);

            this._view.lab_desc.text = this._fbCfg.dec;

            if (this._cfg.event_type == 1) {
                //读取数组的值，转换成索引值
                let index2 = this._cfg.param1.indexOf(this._fbCfg.index);
                this._view.lab_awd_title.text = StringUtil.substitute(getLanById(LanDef.pass_qiyuan_3)
                    , [index2 + 1]);
            } else {
                this._view.lab_awd_title.text = StringUtil.substitute(getLanById(LanDef.pass_qiyuan_3)
                    , [this._cfg.limit]);
            }

            // if (this._rewardDatas.length) {
            //     this._rewardDatas.replaceAll(this._fbCfg.show_rewards);
            // } else {
            //     this._rewardDatas.source = this._fbCfg.show_rewards;
            // }
            this._rewardDatas.source = this._fbCfg.show_rewards;

            // let isFinish = this._model.qyFbFinishIds.indexOf(this._cfg.index) != -1;
            let isFinish = this._showArgs.isFinish;
            this._view.btn_fight.visible = !isFinish;

            //玩家战力
            let power = RoleVo.ins.showpower.toNumber();
            //玩家战力大于推荐战力显示红点
            if (power >= this._fbCfg.power) {
                this._view.btn_fight.redPoint.visible = true;
            } else {
                this._view.btn_fight.redPoint.visible = false;
            }
        }

        private onFightBtnClick(e: TouchEvent): void {
            if (this._cfg.event_type == 1) {
                this._proxy.c2s_qiyuan_enter(this._cfg.index);
                facade.hideView(ModName.Pass, PassViewType.PassMain);
                this.hide();
            } else {
                let power = RoleVo.ins.showpower.toNumber();
                if (power < this._fbCfg.power) {
                    PromptBox.getIns().show("对方实力深不可测，暂且避其锋芒");
                    return;
                }
                this.showView(PassViewType.QiyuanFigth, this._cfg.index);
            }
        }

    }
}