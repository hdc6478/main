namespace game.mod.activity {

    import TouchEvent = egret.TouchEvent;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import Tween = base.Tween;
    import Pool = base.Pool;
    import Handler = base.Handler;

    export class ZcxMdr3 extends MdrBase implements UpdateItem {
        private _view: ZcxView3 = this.mark("_view", ZcxView3);
        private _proxy: ZcxProxy;
        private _listData: eui.ArrayCollection;
        private _endTime = 0;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhaocaixian);
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.gr.mask = Pool.alloc(egret.Rectangle).setTo(0, 0, 170, 320);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(ActivityEvent.ON_ZCX_RAID_INFO_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();

            let cfg = this._proxy.getCurFubenCfg();
            this._listData.replaceAll(cfg.show_rewards);
            this.updateView();
            this.initGrView();
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
            let size = this._view.gr.numChildren;
            for (let i = 0; i < size; i++) {
                let item = this._view.gr.getChildAt(i) as ZcxItem3;
                if (item) {
                    Tween.remove(item);
                    Pool.release(item);
                }
            }
            this._view.gr.removeChildren();
            this._curIdx = 0;
        }

        private updateView(): void {
            let canChallenge = this._proxy.canChallenge();
            this._view.btn_challenge.visible = canChallenge;
            this._view.timeItem.visible = !this._view.btn_challenge.visible;
            this._view.btn_challenge.setHint(canChallenge);
            if (canChallenge) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._endTime = TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false, 1);
            this.update(TimeMgr.time);
        }

        private onClick(): void {
            if (this._proxy.canChallenge()) {
                this._proxy.c2s_zcx_raid_challenge();
            }
        }

        update(time: base.Time) {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime < 1) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }

        /**==============================跑马灯==============================*/

        private _initCnt = 10;//初始化数量
        private _initMax = 30;
        private _curIdx = 0;//当前选择

        private initGrView(): void {
            for (let i = 0; i < this._initCnt; i++) {
                this.doAddItem();
            }
        }

        private getItemY(): number {
            let size = this._view.gr.numChildren;
            if (!size) {
                return 10;
            }
            let lastItem = this._view.gr.getChildAt(size - 1) as ZcxItem3;
            return lastItem.y + lastItem.height + 20;
        }

        private doAddItem(): void {
            let item = Pool.alloc(ZcxItem3);
            item.name = `item${this._curIdx}`;
            item.updateView(this._proxy.getRecordTips(this._curIdx));
            item.x = 0;
            item.y = this.getItemY();
            this._view.gr.addChild(item);
            this.doItemTween(item);

            this._curIdx++;
            if (this._curIdx > this._initMax - 1) {
                this._curIdx = 0;
            }
        }

        private doItemTween(item: ZcxItem3): void {
            if (item.y + item.height < -20) {
                Tween.remove(item);
                Pool.release(item);
                this._view.gr.removeChild(item);
                this.doAddItem();
                return;
            }
            Tween.get(item)
                .to({y: item.y - 10}, 500)
                .exec(Handler.alloc(this, this.doItemTween, [item]));
        }
    }
}