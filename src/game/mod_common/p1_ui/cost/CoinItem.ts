namespace game.mod {

    import PropConfig = game.config.PropConfig;

    export class CoinItem extends BaseListenerRenderer  {
        public img_cost: eui.Image;
        public lab_cost: eui.Label;

        private _index: number;//道具index
        private _clickable: boolean = true;//可点击

        constructor() {
            super();
            this.skinName = "skins.common.CoinItemSkin";
        }
        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.img_cost, this.onClick, this);
        }

        /**点击弹出道具tips*/
        protected onClick(): void {
            if(!this._clickable){
                return;
            }
            if (this._index) {
                ViewMgr.getIns().showPropTips(this._index);
            }
        }

        /**设置显示的道具index*/
        public setData(index: number, clickable: boolean = true): void {
            this.initIcon(index, clickable);
            this.updateShow();
        }

        /**获取显示道具index*/
        public get index(): number {
            return this._index;
        }

        /**刷新图标显示*/
        public initIcon(index: number, clickable: boolean = true): void {
            this._index = index;
            this._clickable = clickable;
            let cfg: PropConfig = GameConfig.getPropConfigById(this._index);
            this.img_cost.source = cfg.icon;
        }

        /**刷新显示，外部监听时候会调用*/
        public updateShow(): void {
            this.lab_cost.text = BagUtil.getPropCntByIdx(this._index) + "";
        }
    }

}