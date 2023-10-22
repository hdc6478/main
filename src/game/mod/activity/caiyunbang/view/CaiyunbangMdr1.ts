namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;
    import Tween = base.Tween;
    import Handler = base.Handler;

    export class CaiyunbangMdr1 extends MdrBase implements UpdateItem {
        private _view: CaiyunbangView1 = this.mark("_view", CaiyunbangView1);
        private _proxy: CaiyunbangProxy;
        private _endTime: number;
        private _lastPos: number = 0;//上一轮缓动目标位置，默认0
        private _maxSize = 8;//icon个数
        private _roundNum = 0;//缓动个数

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Caiyunbang);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do1, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            addEventListener(this._view.btn_do10, egret.TouchEvent.TOUCH_TAP, this.onClickTen, this);
            this.onNt(ActivityEvent.ON_CAIYUNBANG_QIFU_INFO_UPDATE, this.onUpdateView, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateByPropIndex, this);
        }

        protected onShow(): void {
            super.onShow();
            let actType = ActivityType.CaiyunbangTurntable;
            this._proxy.clearLoginHint(actType);
            this._endTime = this._proxy.getCurOpenAct().c_end_time;
            if (this._endTime) {
                this.update(TimeMgr.time);
                TimeMgr.addUpdateItem(this, 1000);
            }
            this.updateView();

            this._proxy.checkActTips(NotTipsType.CaiyunbangTurntable);

        }

        protected onHide(): void {
            super.onHide();
        }

        //特效处理
        private onUpdateView(): void {
            //目标位置
            let targetIdx = this._proxy.getQifuTargetIdx();
            let dis: number;
            if (this._lastPos > targetIdx) {
                dis = this._maxSize - this._lastPos + targetIdx;
            } else {
                dis = targetIdx - this._lastPos;
            }
            //缓动个数
            this._roundNum = this._maxSize + dis;
            // console.log(`caiyunbang targetIdx: ${this._lastPos} ${targetIdx}, ${this._roundNum}`);

            this.setTween(1);
        }

        private setTween(idx: number): void {
            let lastIcon: IconReward = this._view[`icon${this._lastPos}`];
            let lastIconData = lastIcon.data;
            lastIconData.sel = false;
            lastIcon.data = lastIconData;

            this._lastPos++;
            if (this._lastPos >= this._maxSize) {
                this._lastPos = 0;
            }
            let curIcon: IconReward = this._view[`icon${this._lastPos}`];
            let curIconData = curIcon.data;
            curIconData.sel = true;
            curIcon.data = curIconData;

            //结束
            if (idx >= this._roundNum) {
                this.onTweenEnd();
                return;
            }
            Tween.get(this).delay(100).exec(Handler.alloc(this, this.setTween, [idx + 1]));
        }

        //缓动结束
        private onTweenEnd(): void {
            PropTipsMgr.getIns().showBestPropCenter(this._proxy.getQifuProp());
            this.updateCost();
            this._roundNum = 0;//清除
            Tween.remove(this);
        }

        private updateView(): void {
            this.updateReward();
            this.updateCost();
        }

        private updateReward(): void {
            let rewards = this._proxy.getQifuRewards();
            for (let i = 0; i < rewards.length; i++) {
                let item = this._view[`icon${i}`] as IconReward;
                if (item) {
                    let prop = PropData.create(rewards[i].idx, rewards[i].cnt);
                    item.data = {prop, sel: this._lastPos == i};
                }
            }
        }

        private updateCost(): void {
            let cost = this._proxy.getQifuCost();
            this._view.costIcon1.updateShow(cost);
            let cost1 = this._proxy.getQifuCost(CommonCountType.Ten);
            this._view.costIcon10.updateShow(cost1);

            this._view.btn_do1.setHint(this._proxy.getQifuHint());
            this._view.btn_do10.setHint(this._proxy.getQifuHint(CommonCountType.Ten));

            let times = this._proxy.getQifuTimes();
            let timesStr = TextUtil.addColor(times + '', BlackColor.GREEN);
            let str = StringUtil.substitute(getLanById(LanDef.caiyunbang_tips1), [timesStr]);
            this._view.lb_desc.textFlow = TextUtil.parseHtml(str);
        }

        private onClick(): void {
            if (this._proxy.canQifu(CommonCountType.Once, true)) {
                this._proxy.c2s_activity_caiyun_qifu(CommonCountType.Once);
            }
        }

        private onClickTen(): void {
            if (this._proxy.canQifu(CommonCountType.Ten, true)) {
                this._proxy.c2s_activity_caiyun_qifu(CommonCountType.Ten);
            }
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }

        private onBagUpdateByPropIndex(n: GameNT) {
            let indexs = n.body as number[];
            let qifuCost = this._proxy.getQifuCost();
            if (indexs.indexOf(qifuCost[0]) > -1) {
                this.updateCost();
            }
        }
    }
}