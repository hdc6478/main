namespace game.mod.pass {

    import ArrayCollection = eui.ArrayCollection;
    import WorldmapConfig = game.config.WorldmapConfig;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class WorldMapBoxAwdMdr extends MdrBase {
        private _view: WorldMapBoxAwdView = this.mark("_view", WorldMapBoxAwdView);

        private _proxy: PassProxy;
        private _model: PassModel;

        private _cfg: WorldmapConfig;

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
            addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onBtnClick);
        }

        protected onShow(): void {
            super.onShow();

            this._cfg = this._showArgs[0];
            let hasAwd: boolean = this._showArgs[1];
            if(!this._cfg) {
                return;
            }

            this._rewardDatas.source = this._cfg.award;
            this._view.btn_get.visible = hasAwd;
            this._view.btn_get.redPoint.visible = hasAwd;
            this._view.lab_tip.visible = !hasAwd;
            let curChapter = this._proxy.getChapterByIdx(this._model.curWorldMapCfg.index) - 1;
            this._view.lab_tip.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.pass_condition_1), [this._cfg.name])
                +  TextUtil.addColor("(" + curChapter + "/" + this._proxy.getChapterByIdx(this._cfg.index) + ")", WhiteColor.RED));
        }

        protected onHide(): void {
            super.onHide();
        }

        private onBtnClick(e: TouchEvent): void {
            this._proxy.c2s_mainline_wroldmap(this._cfg.index);
            this.hide();
        }

    }
}