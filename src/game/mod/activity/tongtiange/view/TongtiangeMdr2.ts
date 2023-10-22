namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class TongtiangeMdr2 extends MdrBase implements UpdateItem {
        private _view: TongtiangeView2 = this.mark("_view", TongtiangeView2);
        private _proxy: TongtiangeProxy;
        private _listData: eui.ArrayCollection;
        private _endTime: number;
        private _curStage = 0;//当前轮次

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Tongtiange);
            this._view.list.itemRenderer = TongtiangeItem2;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.img_banner.source = ResUtil.getUiJpg(`tongtiange_banner2`);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_left, egret.TouchEvent.TOUCH_TAP, this.onClickLeft, this);
            addEventListener(this._view.btn_right, egret.TouchEvent.TOUCH_TAP, this.onClickRight, this);
            this.onNt(ActivityEvent.ON_UPDATE_TONGTIANGE_INFO, this.onUpdateView, this);
            this.onNt(ActivityEvent.ON_UPDATE_TONGTIANGE_CHALLENGE_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._endTime = this._proxy.getEndTime();
            if (this._endTime) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            }
            this.onUpdateView();
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            this._endTime = 0;
            this._curStage = 0;
            super.onHide();
        }

        private onUpdateView(): void {
            let doneStage = this._proxy.getDoneStage();
            let totalStage = this._proxy.getTotalStage();
            let desc = TextUtil.addColor(doneStage + '/' + totalStage, UIColor.GREEN);
            this._view.lb_stage.textFlow = TextUtil.parseHtml(desc);

            let curStage = this._proxy.getCurStage();
            this._curStage = curStage;

            let cfgList = this._proxy.getPersonChallengeCfg(curStage);
            let list: ITongtiangeItemData2[] = [];
            let totalCnt = this._proxy.getBuildCnt() || 0;//总次数
            let lastStageCnt = this._proxy.getPreStagesCnt();//前面轮次的最大次数总和
            let buildCnt = Math.max(0, totalCnt - lastStageCnt);
            for (let cfg of cfgList) {
                list.push({
                    type: TongtiangeRankType.Personal,
                    cfg,
                    status: this._proxy.getPersonChallengeStatus(cfg.index),
                    val: buildCnt
                });
            }
            SortTools.sortReward(list);
            this._listData.replaceAll(list);

            this.updateStageView();
        }

        //更新轮次奖励
        private updateStageView(): void {
            this._view.stageItem.updateView(this._curStage);

            this._view.btn_left.visible = this._curStage > 1;
            let totalStage = this._proxy.getTotalStage();
            this._view.btn_right.visible = this._curStage < totalStage;

            this.updateBtnHint();
        }

        private onClickLeft(): void {
            this._curStage--;
            if (this._curStage < 1) {
                this._curStage = 1;
            }
            this.updateStageView();
        }

        private onClickRight(): void {
            this._curStage++;
            let totalStage = this._proxy.getTotalStage();
            if (this._curStage > totalStage) {
                this._curStage = totalStage;
            }
            this.updateStageView();
        }

        private updateBtnHint(): void {
            if (this._view.btn_left.visible) {
                let leftHint = false;
                for (let i = 1; i < this._curStage; i++) {
                    if (this._proxy.getStageHint(i)) {
                        leftHint = true;
                        break;
                    }
                }
                this._view.btn_left.setHint(leftHint);
            }
            if (this._view.btn_right.visible) {
                let totalStage = this._proxy.getTotalStage();
                let rightHint = false;
                for (let i = this._curStage + 1; i < totalStage; i++) {
                    if (this._proxy.getStageHint(i)) {
                        rightHint = true;
                        break;
                    }
                }
                this._view.btn_right.setHint(rightHint);
            }
        }

        update(time: base.Time) {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }
    }
}