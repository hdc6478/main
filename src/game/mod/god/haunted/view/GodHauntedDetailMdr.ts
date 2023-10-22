namespace game.mod.god {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import TiandiFengduBaiguiluConfig = game.config.TiandiFengduBaiguiluConfig;

    export class GodHauntedDetailMdr extends EffectMdrBase {
        private _view: GodHauntedDetailView = this.mark("_view", GodHauntedDetailView);
        private _proxy: GodProxy;
        private _rewardDatas: ArrayCollection;
        private _cfg: TiandiFengduBaiguiluConfig;

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

            this._proxy = this.retProxy(ProxyType.God);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClick);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
            this.addEftByParentScale(this._view.btn_get.group_eft);
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateView(): void {
            this._cfg = getConfigByNameId(ConfigName.TiandiFengduBaiguilu, this._showArgs);
            this._rewardDatas.replaceAll(this._cfg.challenge_award);

            this._view.grp_desc.visible = this._cfg.text != "";
            if (this._cfg.text) {
                this._view.lab_desc.textFlow = TextUtil.parseHtml(this._cfg.text);
            }

            this.addBmpFont(StringUtil.getPowerNumStr(this._cfg.limit_power,1,"",7), BmpTextCfg[BmpTextType.Layer], this._view.grp_power, true, 0.8, false, 0, true);
        }


        private onClick(): void {
            let power = RoleVo.ins.showpower.toNumber();
            if (power < this._cfg.limit_power) {
                PromptBox.getIns().show("对方实力深不可测，暂且避其锋芒");
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.God, GodViewType.GodHauntedFight, this._cfg.index);
            this.hide();
        }

    }
}