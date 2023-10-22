namespace game.mod.activity {

    import TotalFubenConfig = game.config.TotalFubenConfig;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;
    import PropConfig = game.config.PropConfig;

    export class YjjsMdr3 extends EffectMdrBase {
        private _view: YjjsView3 = this.mark("_view", YjjsView3);
        private _proxy: YjjsProxy;
        private _listData: eui.ArrayCollection;
        private _fubenCfg: TotalFubenConfig;
        private _effId: number;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.gr_eff.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Yjjs);
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.lb_go.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(this._view.lb_go.text, WhiteColor.GREEN));
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.lb_go, egret.TouchEvent.TOUCH_TAP, this.onClickGo, this);
            addEventListener(this._view.btn_challenge, egret.TouchEvent.TOUCH_TAP, this.onClickChallenge, this);
            this.onNt(ActivityEvent.ON_YJJS_SHENQI_INFO_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._effId && this.removeEffect(this._effId);
            this._effId = null;
        }

        private updateView(): void {
            this._fubenCfg = this._proxy.getFubenCfg();
            if (!this._fubenCfg) {
                return;
            }

            this._view.lb_lvdesc.text = `第${StringUtil.ChineseNum[this._fubenCfg.barrier_index]}关奖励`;
            this.addBmpFont(this._fubenCfg.power_show + '', BmpTextCfg[BmpTextType.CommonPower], this._view.gr_font);

            this._view.lb_vipdesc.text = `VIP${this._fubenCfg.vip_level}可直接碾压通过`;
            // this._view.lb_progress.text = `${this._proxy.model.shenqi_count}/${this._proxy.getFubenMaxLv()}`;
            this._view.bar.show(this._proxy.model.shenqi_count, this._proxy.getFubenMaxLv(),
                false, 0, false, ProgressBarType.Value);

            let isMax = this._proxy.isFubenMax();
            this._view.img_finished.visible = isMax;
            this._view.btn_challenge.visible = !isMax;
            if(this._view.btn_challenge.visible){
                this._view.btn_challenge.setHint(this._proxy.canChallengeShenqi());
            }

            let cfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, this._fubenCfg.reward_big);
            if (!cfg || !cfg.content) {
                return;
            }
            this._listData.replaceAll([...cfg.content]);
            let bigReward = cfg.content[0];
            this._view.icon.data = bigReward;
            if (!this._effId) {
                let propCfg: PropConfig = GameConfig.getPropConfigById(bigReward[0]);
                if (propCfg && propCfg.param1) {
                    this._effId = this.addAnimate(propCfg.param1[0][0], this._view.gr_eff);
                }
            }
        }

        private onClickChallenge(): void {
            if (this._proxy.canChallengeShenqi(true)) {
                this._proxy.c2s_yaoji_shenqi_challenge();
            }
        }

        private onClickGo(): void {
            ViewMgr.getIns().showView(ModName.Vip, VipViewType.VipMain);
        }
    }
}