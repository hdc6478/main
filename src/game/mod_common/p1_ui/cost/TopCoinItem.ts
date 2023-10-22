namespace game.mod {

    import PropConfig = game.config.PropConfig;
    import Event = egret.Event;
    import TouchEvent = egret.TouchEvent;
    import Tween = base.Tween;
    import Handler = base.Handler;

    export class TopCoinItem extends eui.Component {
        private img_cost: eui.Image;
        private lab_cost: eui.Label;
        private lab_add: eui.Label;
        private btn_add: game.mod.Btn;

        private _index: number;//道具index
        private _lastCnt: number;//上一次数量
        private _perAdd: number;//单次增加减少的数量
        private _curCnt: number;//当前显示的数量
        private _endCnt: number;//目标数量
        private _isAdd: boolean;//是否增加，否的话就是减少

        constructor() {
            super();
            this.skinName = "skins.common.TopCoinItemSkin";

            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);
        }

        private onAddToStage() {
            this.btn_add.addEventListener(TouchEvent.TOUCH_TAP, this.onClickAdd, this);
        }

        private onRemove() {
            this.btn_add.removeEventListener(TouchEvent.TOUCH_TAP, this.onClickAdd, this);
            this.removeTween();
        }

        private onClickAdd(): void {
            if (!this._index) {
                return;
            }
            if (this._index == PropIndex.Xianyu) {
                //仙玉的话跳转仙玉商城
                ViewMgr.getIns().openCommonRechargeView();
                return;
            }
            ViewMgr.getIns().showGainWaysTips(this._index);
        }

        /**设置显示的道具index*/
        public setData(index: number, currentState?: string): void {
            this._index = index;

            let cfg: PropConfig = GameConfig.getPropConfigById(this._index);
            this.img_cost.source = cfg.icon;

            this.updateShow();

            if(currentState){
                this.currentState = currentState;
            }
        }
        //黄色加按钮
        public setDataYellow(index: number): void {
            this.setData(index, "2");
        }

        /**获取显示道具index*/
        public get index(): number {
            return this._index;
        }

        /**刷新显示，外部监听时候会调用，是否显示增加文本*/
        public updateShow(showAdd?: boolean): void {
            let cnt = BagUtil.getPropCntByIdx(this._index);
            let cntStr = cnt + "";
            if (PropCntShowTimeStr.indexOf(this._index) > -1) {
                cntStr = TimeUtil.formatSecond(cnt, "d天H时", true);
            } else {
                cntStr = StringUtil.getPowerNumStr(cnt, 0, "", 6);
            }
            if(showAdd && (this._index == PropIndex.Xianyu || this._index == PropIndex.Yuanbao)){
                //仙玉、元宝增加提示
                let addCnt = cnt - this._lastCnt;
                if(addCnt != 0){
                    this._isAdd = addCnt > 0;
                    let addStr = (this._isAdd ? "+" :"") + addCnt;
                    this.lab_add.text = addStr;

                    this.removeTween();
                    this.lab_add.y = 36;
                    this.lab_add.alpha = 1;
                    Tween.get(this.lab_add)
                        .to({y: 10, alpha: 0.5}, 500)
                        .exec(Handler.alloc(this, () => {
                            this.lab_add.text = "";
                        }));
                    this._curCnt = this._lastCnt;//设置为当前
                    this._perAdd = Math.max(Math.floor(Math.abs(addCnt) / 100), 1) * (this._isAdd ? 1 : -1);//可能是负的
                    this._endCnt = cnt;
                    this.playCntTween();
                }
            }
            else {
                this.lab_cost.text = cntStr;
            }
            this._lastCnt = cnt;
        }

        private removeTween(): void {
            Tween.remove(this.lab_add);
            Tween.remove(this.lab_cost);
        }

        private playCntTween(): void {
            if(this._isAdd){
                this._curCnt = Math.min(this._curCnt + this._perAdd, this._endCnt);
            }
            else {
                this._curCnt = Math.max(this._curCnt + this._perAdd, this._endCnt);
            }

            let cntStr = StringUtil.getPowerNumStr(this._curCnt, 0, "", 6);
            this.lab_cost.text = cntStr;

            if((this._isAdd && this._curCnt < this._endCnt)
                || (!this._isAdd && this._curCnt > this._endCnt)){
                Tween.get(this.lab_cost)
                    .delay(15)
                    .exec(Handler.alloc(this, this.playCntTween));
            }
        }
    }
}