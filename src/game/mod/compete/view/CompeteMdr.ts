namespace game.mod.compete {

    import TouchEvent = egret.TouchEvent;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;
    import ParamConfig = game.config.ParamConfig;
    import Handler = base.Handler;

    export class CompeteMdr extends EffectMdrBase implements UpdateItem{
        private _view: CompeteView = this.mark("_view", CompeteView);
        private _proxy: CompeteProxy;
        private _isDoufaOpen: boolean;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Compete);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.grp1, TouchEvent.TOUCH_TAP, this.onClickYouli);
            addEventListener(this._view.grp2, TouchEvent.TOUCH_TAP, this.onClickDoufa);
            addEventListener(this._view.grp3, TouchEvent.TOUCH_TAP, this.onClickXianjiezhengba);
            addEventListener(this._view.btn_shop, TouchEvent.TOUCH_TAP, this.onClickShop);

            this.onNt(RankEvent.ON_RANK_INFO_UPDATE, this.updateYouliRank, this);

            this.onNt(CompeteEvent.UPDATE_DOUFA_RANK, this.onDoufaRankUpdate, this);
            this.onNt(CompeteEvent.UPDATE_DOUFA_INFO, this.updateDoufaCnt, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateYouli();
            this.updateDoufa();
            this.updateShop();

            this.showGuide();
            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            GuideMgr.getIns().clear(GuideKey.CompeteYouli);//清除指引
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        /****************************************游历**************************************/
        private onClickYouli(): void {
            ViewMgr.getIns().showView(ModName.Compete, CompeteViewType.YouliMain);
        }

        private updateYouli(): void {
            this.reqYouliRankInfo();
            this.updateYouliTime();
            this.updateYouliRank();
            this.updateYouliCnt();
            this.updateYouliHint();
        }

        private reqYouliRankInfo(): void {
            RankUtil.c2s_new_rank_req_rank(RankType.Type4);
        }

        private updateYouliTime(): void {
            let endTime = this._proxy.rankEndTime;
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            this._view.timeItem1.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
        }

        private updateYouliRank(): void {
            let rankInfo = RankUtil.getRankInfo(RankType.Type4);
            let rankStr = getLanById(LanDef.tishi_12) + "：";//我的排行：
            let rankStr2 = rankInfo && rankInfo.my_info && rankInfo.my_info.rank_no <= MAX_RANK_NUM ? rankInfo.my_info.rank_no + "" : MAX_RANK_NUM + "+";//20+
            rankStr += TextUtil.addColor(rankStr2, BlackColor.GREEN);
            this._view.lab_rank1.textFlow = TextUtil.parseHtml(rankStr);
        }

        private updateYouliCnt(): void {
            let remainTimes: number = this._proxy.maxFightTimes - this._proxy.curFightTimes || 0;
            let timesStr = getLanById(LanDef.exp_tip0) + "：" + TextUtil.addColor(remainTimes + "/" + this._proxy.maxFightTimes, BlackColor.GREEN);
            this._view.lab_cnt1.textFlow = TextUtil.parseHtml(timesStr);
        }

        private updateYouliHint(): void {
            this._view.redPoint1.visible = HintMgr.getHint([ModName.Compete, CompeteViewType.CompeteMain, CompeteMainBtnType.Youli]);
        }

        /****************************************斗法**************************************/
        private onClickDoufa(): void {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Doufa, true)){
                return;
            }
            ViewMgr.getIns().showView(ModName.Compete, CompeteViewType.DoufaMain);
        }

        private onDoufaRankUpdate(): void {
            this.updateDoufaTime();
            this.updateDoufaRank();
        }

        private updateDoufa(): void {
            this._isDoufaOpen = ViewMgr.getIns().checkViewOpen(OpenIdx.Doufa);
            this.reqDoufaRankInfo();
            this.updateDoufaTime();//返回后刷新
            this.updateDoufaRank();
            this.updateDoufaCnt();
            this.updateDoufaOpen();
            this.updateDoufaHint();
        }

        private reqDoufaRankInfo(): void {
            if(!this._isDoufaOpen){
                return;
            }
            this._proxy.c2s_pvp_battle_get_rank_info(RankCommonType.Type1);
        }

        private updateDoufaTime(): void {
            if(!this._isDoufaOpen){
                this._view.timeItem2.visible = false;
                return;
            }
            this._view.timeItem2.visible = true;
            let endTime = this._proxy.getEndTime(RankCommonType.Type1);
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            this._view.timeItem2.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
        }

        private updateDoufaRank(): void {
            if(!this._isDoufaOpen){
                this._view.lab_rank2.text = "";
                return;
            }
            let rankStr = getLanById(LanDef.tishi_12) + "：";//我的排行：
            let myRankInfo = this._proxy.getMyRankInfo(RankCommonType.Type1);
            let rankStr2 = myRankInfo && myRankInfo.rank_num <= MAX_RANK_NUM ? myRankInfo.rank_num + "" : MAX_RANK_NUM + "+";//20+
            rankStr += TextUtil.addColor(rankStr2, BlackColor.GREEN);
            this._view.lab_rank2.textFlow = TextUtil.parseHtml(rankStr);
        }

        private updateDoufaCnt(): void {
            if(!this._isDoufaOpen){
                this._view.lab_cnt2.text = "";
                return;
            }
            let cfg: ParamConfig = GameConfig.getParamConfigById("doufa_count");
            let maxCnt = cfg && cfg.value;
            let cnt = this._proxy.cnt;
            let cntStr = getLanById(LanDef.exp_tip0) + "：" + TextUtil.addColor(cnt + "/" + maxCnt, BlackColor.GREEN);
            this._view.lab_cnt2.textFlow = TextUtil.parseHtml(cntStr);
        }

        private updateDoufaOpen(): void {
            if(this._isDoufaOpen){
                this._view.lab_open2.text = "";
                return;
            }
            this._view.lab_open2.text = ViewMgr.getIns().getOpenFuncShow(OpenIdx.Doufa);
        }

        private updateDoufaHint(): void {
            this._view.redPoint2.visible = HintMgr.getHint([ModName.Compete, CompeteViewType.CompeteMain, CompeteMainBtnType.Doufa]);
        }
        /****************************************仙界争霸**************************************/
        private onClickXianjiezhengba(): void {
            PromptBox.getIns().show("敬请期待");
        }

        /****************************************公共**************************************/
        private onClickShop(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.ExchangeType3);
        }

        private updateShop(): void {
            this._view.item.setData(PropIndex.Jingjibi);
        }

        update(time: base.Time): void {
            this.updateYouliTime();
            this.updateDoufaTime();
        }

        private showGuide(): void {
            GuideMgr.getIns().show(GuideKey.CompeteYouli, this._view.grp1, Handler.alloc(this, this.onClickYouli));//指引
        }
    }
}