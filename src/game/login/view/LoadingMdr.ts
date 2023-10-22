/** @internal */ namespace game.login {
    import Mdr = base.Mdr;
    import Pool = base.Pool;
    import PreloadMgr = game.PreloadMgr;
    import Rectangle = egret.Rectangle;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class LoadingMdr extends Mdr implements UpdateItem {
        private _view: LoadingView = this.mark("_view", LoadingView);

        constructor() {
            super(Layer.main);
        }

        protected onShow(): void {
            BgMgr.getIns().setBg("1");
            let v = this._view;
            v.x = (v.parent.width - v.width) / 2;
            v.y = (v.parent.height - v.height) / 2;
            this._view.imgBar.scrollRect = Pool.alloc(Rectangle).setTo(0, 0, 1, this._view.imgBar.height);

            this._view.imgSingleBar.scrollRect = Pool.alloc(Rectangle).setTo(0, 0, 1, this._view.imgSingleBar.height);
            this.onProgress();
            TimeMgr.addUpdateItem(this);
        }

        protected onHide(): void {
            Pool.release(this._view.imgBar.scrollRect);
            this._view.imgBar.scrollRect = null;

            this.clearSingleBar();
        }

        protected addListeners(): void {
            let addEventListener = this.onEgret.bind(this);
            this.onNt(LoginEvent.PRELOAD_PROGRESS, this.onProgress, this);
        }

        /** @internal */ private onProgress(): void {
            let p: number = PreloadMgr.curPro;
            this._view.imgBar.scrollRect.width = (p / 100) * this._view.imgBar.width;
            this._view.imgPt.x = this._view.imgBar.x + (p / 100) * this._view.imgBar.width - (this._view.imgPt.width * 0.5);

            if (p >= 99) {
                this._singleCurPro = 100;
                this.update();
                this.clearSingleBar();
            }
        }

        private clearSingleBar() {
            Pool.release(this._view.imgSingleBar.scrollRect);
            this._view.imgSingleBar.scrollRect = null;
            TimeMgr.removeUpdateItem(this);
        }

        private _singleCurPro: number = 0;


        update(time?: base.Time): void {
            let img = this._view.imgSingleBar;
            if (!img.scrollRect) {
                return;
            }
            if (this._singleCurPro >= 100) {
                this._singleCurPro = 0;
            }
            img.scrollRect.width = (this._singleCurPro / 100) * img.width;
            this._singleCurPro += 5;
        }
    }
}
