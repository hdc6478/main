namespace game.mod.activity {

    import RewardPreviewConfig = game.config.RewardPreviewConfig;
    import LanDef = game.localization.LanDef;

    export class WonderfulActRewardMdr extends MdrBase {
        private _view: WonderfulActRewardView = this.mark("_view", WonderfulActRewardView);
        private _proxy: WonderfulActProxy;
        private _listData: eui.ArrayCollection;
        private _listData1: eui.ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.WonderfulAct);
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.list1.itemRenderer = Icon;
            this._view.list1.dataProvider = this._listData1 = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let paramCfg = GameConfig.getParamConfigById('cangzhengu_reward');
            let value: number[] = paramCfg ? paramCfg.value : [];
            let cfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, value[0]);
            if (cfg) {
                this._listData.replaceAll(cfg.content);
            }
            let cfg1: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, value[1]);
            if (cfg1) {
                this._listData1.replaceAll(cfg1.content);
            }

            let paramCfg1 = GameConfig.getParamConfigById('cangzhengu_gailv');
            let str = getLanById(LanDef.gailv_tips);
            this._view.lb_prob.textFlow = TextUtil.parseHtml(`(${str}:` + TextUtil.addColor(paramCfg1.value[0] + '%', WhiteColor.GREEN) + ')');
            this._view.lb_prob1.textFlow = TextUtil.parseHtml(`(${str}:` + TextUtil.addColor(paramCfg1.value[1] + '%', WhiteColor.GREEN) + ')');
        }
    }
}