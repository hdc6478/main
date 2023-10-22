namespace game.mod.xianyuan {


    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    export class ShilianRankMdr extends EffectMdrBase implements UpdateItem {
        private _view: RankView = this.mark("_view", RankView);
        private _proxy: XianlvShilianProxy;
        private _endTime = 0;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._view.grp_eff.x = 200;
            this._view.grp_eff.touchEnabled = false;
            this._view.grp_eff0.x = 520;
            this._view.grp_eff0.visible = true;
            this._view.grp_eff0.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.XianlvShilian);
            this._view.btn_god.visible = true;
            this._view.timeItem.visible = true;
            this._view.img_type2.source = `shilianjifen`;
            this._view.img_type3.source = `paimingjiangli`;
            this._view.list_rank.itemRenderer = ShilianRankItem;
            this._view.list_rank.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_god, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(XianyuanEvent.ON_UPDATE_SHILIAN_RANK_INFO, this.updateView, this);
            this.onNt(XianyuanEvent.ON_UPDATE_SHILIAN_JIFEN_INFO, this.updateRankRewardHint, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.c2s_shilian_rank_info();
            this._endTime = TimeUtil.getNextWeekTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
        }

        private updateView(): void {
            let model = this._proxy.model;
            let rankShow = this._proxy.getRankShow();
            let rank_info = model.rank_info;
            if (!rank_info || rank_info.length < rankShow) {
                rank_info.length = rankShow + 1;//加多一条，显示20+
            }
            this._listData.source = rank_info;

            let myRankNo = model.my_rank_no;
            let rankNo = myRankNo + '';
            if (!myRankNo || myRankNo > rankShow) {
                rankNo = `${rankShow}+`;
            }
            this._view.lab_rank.text = '我的排行：' + rankNo;
            this._view.lab_num.text = getLanById(LanDef.immortal12) + model.my_score;

            let rank_one_info = model.rank_one_info;
            if (rank_one_info && rank_one_info[0]) {
                this.updateRankUIRole(this._view.grp_eff, rank_one_info[0]);
            }
            if (rank_one_info && rank_one_info[1]) {
                this.updateRankUIRole(this._view.grp_eff0, rank_one_info[1], 1.1, true);
            }

            this.updateRankRewardHint();
        }

        private onClick(): void {
            ViewMgr.getIns().showSecondPop(ModName.Xianyuan, XianyuanViewType.ShilianRankReward);
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                this._endTime = TimeUtil.getNextWeekTime();
            }
            this._view.timeItem.updateTime(this._endTime);
        }

        private updateRankRewardHint(): void {
            this._view.btn_god.setHint(this._proxy.getRankRewardHint());
        }
    }
}