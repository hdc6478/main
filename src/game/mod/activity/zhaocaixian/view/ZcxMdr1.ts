namespace game.mod.activity {

    import ZcxLuckNumberConfig = game.config.ZcxLuckNumberConfig;
    import TimeMgr = base.TimeMgr;
    import delayCall = base.delayCall;
    import Handler = base.Handler;
    import clearDelay = base.clearDelay;
    import LanDef = game.localization.LanDef;

    export class ZcxMdr1 extends MdrBase {
        private _view: ZcxView1 = this.mark("_view", ZcxView1);
        private _proxy: ZcxProxy;
        private _listData: eui.ArrayCollection;
        private _firstShowX = false;
        private _directShowX = false;//第二次点击，过滤掉数字切换动画
        private _onClickX = false;
        private _numSize = 6;//幸运数字长度

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhaocaixian);
            this._view.list.itemRenderer = ZcxItem1;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.btn_get.setImage(`lingqu`);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_get, egret.TouchEvent.TOUCH_TAP, this.onClickGet, this);
            addEventListener(this._view.btn_winner, egret.TouchEvent.TOUCH_TAP, this.onClickWinner, this);
            addEventListener(this._view.gr_num, egret.TouchEvent.TOUCH_TAP, this.onClickNum, this);
            this.onNt(ActivityEvent.ON_ZCX_LUCK_NUM_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();

            let list: ZcxLuckNumberConfig[] = getConfigListByName(ConfigName.ZcxLuckNumber);
            this._listData.replaceAll(list.slice(0, 3));
        }

        protected onHide(): void {
            super.onHide();
            this._luckNumAry = [];
            this._delayIdAry = [];
            this._cntAry = [];
        }

        private updateLbNum(num: number | string, idx: number): void {
            let lb = this._view[`lb${idx}`] as eui.Label;
            if (!lb) {
                return;
            }
            lb.text = num + '';
        }

        private updateLuckNumView(): void {
            let luck_num = this._proxy.model.luck_num;
            this._view.redPoint.visible = this._proxy.canGetLuckNum();
            if (!luck_num) {
                this._firstShowX = true;
                this._directShowX = true;
                for (let i = 0; i < this._numSize; i++) {
                    this.updateLbNum('X', i);
                }
                return;
            }

            if (this._firstShowX && this._onClickX) {
                this._firstShowX = this._onClickX = false;
                for (let i = 0; i < this._numSize; i++) {
                    this.doTween(this._view[`lb${i}`], i);
                }
            } else {
                for (let i = 0; i < this._numSize; i++) {
                    this.updateLbNum(this.getLuckNum(i), i);
                }
            }
        }

        private _luckNumAry: number[] = [];
        private _delayIdAry: number[] = [];
        private _cntAry: number[] = [];
        private _timeAry: number[] = [6, 5, 4, 3, 2, 1];

        //直接展示幸运数字，不播放动画
        private showLuckNumDirect(): void {
            for (let t = 0; t < this._numSize; t++) {
                if (this._delayIdAry[t]) {
                    clearDelay(this._delayIdAry[t]);
                }
                this._view[`lb${t}`].text = '';
            }
            for (let i = 0; i < this._numSize; i++) {
                this.updateLbNum(this.getLuckNum(i), i);
            }
        }

        private doTween(lab: eui.Label, i = 0): void {
            if (!this._directShowX) {
                this.showLuckNumDirect();
                return;
            }

            if (this._luckNumAry[i] == null) {
                this._luckNumAry[i] = 0;
            }
            let num = this._luckNumAry[i] + 1;
            if (num > 9) {
                num = 0;
                this._cntAry[i] = (this._cntAry[i] || 0) + 1;
            }

            if (this._delayIdAry[i]) {
                clearDelay(this._delayIdAry[i]);
            }
            if (this._cntAry[i] >= this._timeAry[i] && num == Number(this.getLuckNum(i))) {
                this.updateLbNum(this.getLuckNum(i), i);
                return;
            }

            this._luckNumAry[i] = num;
            this.updateLbNum(num + '', i);
            this._delayIdAry[i] = delayCall(Handler.alloc(this, this.doTween, [lab, i]), 40);
        }

        //服务端返回的可能是小于6位的，不足6位则前面补0
        private getLuckNum(i: number): string {
            let num = this._proxy.model.luck_num || 0;
            let numStr = this._proxy.getSixLuckNum(num);
            if (num && numStr[i] != null) {
                return numStr[i];
            }
            return '0';
        }

        private updateView(): void {
            this.updateLuckNumView();

            let rank_num = this._proxy.model.rank_num;
            if (!rank_num) {
                let cfg = GameConfig.getParamConfigById('zcx_luncky_time');
                let val = cfg.value;
                let timeStr = val[0] + ':' + (val[1] < 10 ? '0' + val[1] : val[1]);
                let str = StringUtil.substitute(getLanById(LanDef.zcx_tips24), [TextUtil.addColor(timeStr, WhiteColor.GREEN)]);
                this._view.lb_rank.textFlow = TextUtil.parseHtml(str);
            } else {
                let txt = rank_num >= 4 ? getLanById(LanDef.zcx_tips25) : StringUtil.substitute(getLanById(LanDef.zcx_tips26), [StringUtil.ChineseNum[rank_num]]);
                this._view.lb_rank.textFlow = TextUtil.parseHtml(getLanById(LanDef.zcx_tips27) + txt);
            }

            let status = this._proxy.model.status;
            this._view.btn_get.visible = status == 1;
            this._view.btn_get.setHint(status == 1);
        }

        private onClickGet(): void {
            if (this._proxy.model.status == 1) {
                this._proxy.c2s_get_zcx_luck_number(2);
            }
        }

        //只能在20点-24点打开
        private onClickWinner(): void {
            let date = new Date(TimeMgr.time.serverTime);
            if (date.getHours() < 20) {
                PromptBox.getIns().show(getLanById(LanDef.zcx_tips28));
                return;
            }
            this.showView(MainActivityViewType.ZcxWinnerList);
        }

        // 判断是否充钱
        private onClickNum(): void {
            let luck_num = this._proxy.model.luck_num;
            if (luck_num) {
                //再次点击直接展示幸运数字
                if (this._directShowX) {
                    this._directShowX = false;
                    this.showLuckNumDirect();
                }
                return;
            }
            // 第一次点击获取幸运数字
            this._onClickX = true;
            this._proxy.c2s_get_zcx_luck_number(1);
        }
    }
}