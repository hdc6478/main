namespace game.mod.shilian {


    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;
    import prop_tips_data = msg.prop_tips_data;

    export class YuanLingRewardMdr extends EffectMdrBase implements UpdateItem {
        private _view: YuanLingRewardView = this.mark("_view", YuanLingRewardView);
        private _proxy: YuanLingProxy;
        private _listData: eui.ArrayCollection;
        protected _showArgs: msg.s2c_instance_fin;
        private _endTime = 0;
        private _isSecondClick = false;//第二次点击关闭倒计时
        private _reward: { [row: number]: msg.prop_tips_data[] } = {};//每行对应的奖励
        private _rowAry = ['紫', '橙', '红'];

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.YuanlingFuben);
            this._view.list.itemRenderer = YuanLingRewardItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
        }

        protected onShow(): void {
            super.onShow();
            let msg = this._showArgs;
            if (!msg) {
                return;
            }
            let reward = msg.reward || [];

            for (let i = 0; i < 3; i++) {
                this._reward[i] = reward.slice(i * 4, (i + 1) * 4);
            }

            this._view.lb_cnt.text = (reward.length || 0) + '';
            let ary = ['', 'C', 'B', 'A', 'S', 'SS', 'SSS'];//对应的评分
            this.addBmpFont(ary[msg.params[0] || 0], BmpTextCfg[BmpTextType.Score], this._view.gr_eft, true, 1, true);
            this._view.lb_cd.text = StringUtil.substitute(getLanById(LanDef.yuanling_tips13), [10]);
            this._endTime = TimeMgr.time.serverTimeSecond + 10;
            TimeMgr.addUpdateItem(this, 1000);

            let source: any[] = [];
            source.length = 12;
            this._listData.replaceAll(source);
        }

        protected onHide(): void {
            super.onHide();
            SceneUtil.exitScene();
        }

        // 第一次点击是自动翻牌，第二次点击才是关闭
        protected doHide(disposeImmediately: boolean) {
            if (!this._isSecondClick) {
                this.autoOpenReward();
                return;
            }
            super.doHide(disposeImmediately);
        }

        private onClickList(e: eui.ItemTapEvent): void {
            //已翻牌
            if (e.item) {
                return;
            }

            let idx = e.itemIndex;
            let row = Math.floor(idx / 4);
            let reward = this._reward[row].pop();
            if (!reward) {
                let str = StringUtil.substitute(getLanById(LanDef.yuanling_tips14), [`${row * 4 + 1}-${(row + 1) * 4}`, this._rowAry[row]]);
                PromptBox.getIns().show(str);
                return;
            }
            this._listData.replaceItemAt(reward, idx);
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (!this._isSecondClick) {
                if (leftTime <= 0) {
                    this.autoOpenReward();
                    this._isSecondClick = true;
                    this._view.lb_cd.text = getLanById(LanDef.click_tips) + `(${10})`;
                    this._endTime = time.serverTimeSecond + 10;
                    return;
                }
                this._view.lb_cd.text = StringUtil.substitute(getLanById(LanDef.yuanling_tips13), [leftTime]);
            } else {
                if (leftTime <= 0) {
                    TimeMgr.removeUpdateItem(this);
                    this.hide();
                    return;
                }
                this._view.lb_cd.text = getLanById(LanDef.click_tips) + `(${leftTime})`;
            }
        }

        // 自动翻牌
        private autoOpenReward(): void {
            for (let i = 0; i < 12; i++) {
                let data = this._listData.source[i];
                //已翻牌
                if (data) {
                    continue;
                }
                let row = Math.floor(i / 4);
                let reward = this._reward[row].pop();
                reward && this._listData.replaceItemAt(reward, i);
            }
            this._isSecondClick = true;
        }


    }
}