namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import MagicTopRankConfig = game.config.MagicTopRankConfig;
    import teammate = msg.teammate;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import TouchEvent = egret.TouchEvent;

    export class DoufaRankMdr3 extends EffectMdrBase implements UpdateItem {
        private _view: DoufaTopRankView = this.mark("_view",DoufaTopRankView);

        private _itemList: ArrayCollection;
        private _maxRank: number = 4;//显示前4名
        private _rankType = RankCommonType.Type3;
        private _proxy: CompeteProxy;
        private _topInfo: teammate;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Compete);

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = DoufaTopRankItem;
            this._view.list_rank.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.grp_first, TouchEvent.TOUCH_TAP, this.onClickFirst);

            this.onNt(CompeteEvent.UPDATE_DOUFA_RANK, this.onRankUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.onRankUpdate();//不确定服务端会不会返回数据
            this.reqRankInfo();

            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            this._topInfo = null;
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onClickFirst(): void {
            if(!this._topInfo){
                return;
            }
            ViewMgr.getIns().showRoleTips(this._topInfo.role_id, this._topInfo.server_id, this._topInfo.is_robot);
        }

        private onRankUpdate(): void {
            this.updateShow();
            this.updateTime();
        }

        private initShow(): void {
            let cfg: MagicTopRankConfig = getConfigByNameId(ConfigName.MagicTopRank, 1);
            let index = cfg.reward[0][0];
            this.removeEft();
            this.addEftByParent(ResUtil.getTitleSrc(index), this._view.grp_title);

            let tipsStr = StringUtil.substitute(getLanById(LanDef.doufa_tips12), [this._maxRank]);
            this._view.lab_tips.text = tipsStr;
        }

        private updateShow(): void {
            let ranks = this._proxy.getRankList(this._rankType);
            let topInfo = this._proxy.getTopInfo(this._rankType);
            let name = getLanById(LanDef.tishi_2);//虚位以待
            if(topInfo && topInfo.value) {
                this.updateRankUIRole(this._view.grp_eff, topInfo);
                name = topInfo.name;
                this._topInfo = topInfo;
            }
            this._view.lab_name.text = name;

            let infos: {cfg: MagicTopRankConfig, rankInfo: teammate}[] = [];
            /**从第2名开始*/
            for(let i = 1; i < this._maxRank; ++i){
                let rank = i + 1;
                let cfg: MagicTopRankConfig = getConfigByNameId(ConfigName.MagicTopRank, rank);
                let rankInfo = ranks.length > i ? ranks[i] : null;
                let info: {cfg: MagicTopRankConfig, rankInfo: teammate} = {
                    cfg: cfg,
                    rankInfo: rankInfo
                };
                infos.push(info);
            }
            this._itemList.replaceAll(infos);
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let endTime = this._proxy.getEndTime(this._rankType);
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            if(leftTime == 0){
                this._proxy.resetTopRank();
                this.reqRankInfo();
            }
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
        }

        private reqRankInfo(): void {
            let ranks = this._proxy.getRankList(this._rankType);
            if(!ranks.length){
                //巅峰排行榜存在数据时，不进行请求
                this._proxy.c2s_pvp_battle_get_rank_info(this._rankType);
            }
        }
    }
}