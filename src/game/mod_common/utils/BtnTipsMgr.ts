namespace game.mod {
    import PoolObject = base.PoolObject;
    import Handler = base.Handler;
    import Pool = base.Pool;
    import TouchEvent = egret.TouchEvent;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Tween = base.Tween;

    export class BtnTipsMgr {
        private static _instance: BtnTipsMgr;

        public static getIns(): BtnTipsMgr {
            if (!this._instance) {
                this._instance = new BtnTipsMgr();
            }
            return this._instance;
        }

        private _tipsMap: { [idx: number]: BtnTipsData } = {};
        private _tips: { [idx: number]: BtnTipsBase } = {};

        public showTips(data: BtnTipsData, parent: DisplayObjectContainer = Layer.main): void {
            this._tipsMap[data.idx] = data;

            if (!this._tips[data.idx]) {
                this._tips[data.idx] = Pool.alloc(BtnTipsBase);
            }
            // this._tips[data.idx] = tips;
            this._tips[data.idx].show(data, parent);
        }

        /**移除弹窗调用 会走销毁流程 不要直接调用deletTips */
        public hideTips(idx: number): void {
            let tips = this._tips[idx];
            if (tips) {
                tips.dispose();
            }
        }

        //移除全部，在MainLeftActMidMdr移除的时候调用就行了
        public hideAllTips(): void {
            for (let k in this._tips) {
                let tips = this._tips[k];
                if (tips) {
                    tips.dispose();
                }
            }
        }

        public deletTips(idx: number): void {
            if (this._tipsMap && this._tipsMap[idx]) {
                delete this._tipsMap[idx];
            }
            if (this._tips && this._tips[idx]) {
                delete this._tips[idx];
            }
        }

        public updatePos(btnIcon: BtnIconBase): void {
            let data = btnIcon.data;
            let tipsItem = this._tips[data.id];
            if (tipsItem && tipsItem.parent) {
                let x: number = btnIcon.x + btnIcon.width + 20;
                let y: number = btnIcon.y + btnIcon.height - 20;
                tipsItem.x = x;
                tipsItem.y = y;
            }
        }
    }

    export class BtnTipsBase extends eui.Component implements PoolObject {
        private data: BtnTipsData;

        private img_bg: eui.Image;
        private img_jian: eui.Image;
        private lb_tips: eui.Label;

        private readonly tween_scale: number = 0.9;

        constructor() {
            super();
            this.skinName = "skins.activity.BtnTipsBaseSkin";
        }

        public show(data: BtnTipsData, parent: DisplayObjectContainer): void {
            this.data = data;
            if (this.data.handler) {
                this.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
            }
            this.lb_tips.textFlow = TextUtil.parseHtml(this.data.tips, true);
            this.lb_tips.maxWidth = 160;

            parent.addChild(this);
            this.x = this.data.x;
            this.y = this.data.y;
            // this.anchorOffsetX = 20;
            this.anchorOffsetY = this.height;

            // if (this.data.tween) {
            //     Tween.remove(this);
            //     Tween.get(this, {loop: true})
            //         .from({scaleX: this.tween_scale, scaleY: this.tween_scale}, 1000)
            //         .to({scaleX: this.tween_scale, scaleY: this.tween_scale}, 1000);
            // } else {
            //     Tween.remove(this);
            // }
            this.addTween(this.data.tween);

        }

        private addTween(tween: boolean): void {
            Tween.remove(this);
            if (!tween) {
                return
            }
            let scaleX = this.tween_scale;
            let scaleY = this.tween_scale;
            Tween.get(this, { loop: true })
                .from({ scaleX, scaleY }, 1000)
                .to({ scaleX, scaleY }, 1000);
        }

        /**
         * 更新tips气泡提示
         * @param tips
         * @param handler 点击事件，默认无
         * @param tween 缓动，默认无
         */
        public updateShow(tips: string, handler?: Handler, tween?: boolean): void {
            if (handler) {
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            }
            this.lb_tips.textFlow = TextUtil.parseHtml(tips, true);
            this.addTween(tween);
        }

        private onClick(): void {
            if (this.data.handler) {
                this.data.handler.exec();
            }
            this.dispose();
        }

        onAlloc(): void {
        };

        onRelease(): void {
            Tween.remove(this);
            if (this.parent) {
                this.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                this.parent.removeChild(this);
                BtnTipsMgr.getIns().deletTips(this.data.idx);
            }
        };

        public dispose(): void {
            this.onRelease();
        }
    }

    export interface BtnTipsData {
        idx: number,
        x: number,
        y: number,
        tips: string,
        handler: Handler,
        tween?: boolean,
    }
}


