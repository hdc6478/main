namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import Handler = base.Handler;
    import s2c_tour_dati_select = msg.s2c_tour_dati_select;
    import LanDef = game.localization.LanDef;

    export class YouliDatiResultMdr extends EffectMdrBase {
        private _view: YouliDatiResultView = this.mark("_view", YouliDatiResultView);

        private _proxy: CompeteProxy;

        private _itemList: ArrayCollection;
        protected _showArgs: s2c_tour_dati_select;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();

            this._itemList= new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Compete);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateShow();
            this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateShow(): void {
            let isTrue = this._showArgs.is_true;
            let tipStr = isTrue ? getLanById(LanDef.tourpvp_dati_tips1) : getLanById(LanDef.tourpvp_dati_tips2);
            let cfg = this._proxy.datiCfg;
            tipStr += "：" + TextUtil.addColor(cfg["option_" + cfg.ture_option], BlackColor.GREEN);
            this._view.lab_tip.textFlow = TextUtil.parseHtml(tipStr);

            //答对两个都给，答错只给积分
            let rewards: number[][] = [];
            if(isTrue){
                rewards = cfg.reward_option.concat();
            }
            rewards.push([PropIndex.Jingjichangjifen, cfg.reward]);//积分奖励
            this._itemList.source = rewards;
        }

    }
}