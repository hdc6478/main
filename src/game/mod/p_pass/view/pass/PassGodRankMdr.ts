namespace game.mod.pass {

    import ChapterawardConfig = game.config.ChapterawardConfig;
    import TouchEvent = egret.TouchEvent;

    export class PassGodRankMdr extends MdrBase {
        private _view: PassGodRankView = this.mark("_view", PassGodRankView);
        private _coll: eui.ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            let self = this;
            self._view.horizontalCenter = 0;
            self._view.verticalCenter = 0;
            self._coll = new eui.ArrayCollection();
            self._view.list.itemRenderer = PassGodRankRander;
            this._view.list.dataProvider = this._coll;
        }

        protected onHide(): void {
            super.onHide();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            this.onNt(PassEvent.UPDATE_PASS_GOD_RANK_INFO, this.updateData, this);
            this.onNt(PassEvent.UPDATE_PASS_GOD_RANK_AWD_GOT_INFO, this.updateData, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateData();
        }
        
        private updateData(): void {
            let cfgs: ChapterawardConfig[] = getConfigListByName(ConfigName.Chapteraward);
            this._coll.replaceAll(cfgs);
        }

    }
}