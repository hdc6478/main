namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import TourpvpPaimingConfig = game.config.TourpvpPaimingConfig;

    export class YouliRankMdr extends EffectMdrBase implements UpdateItem {
        private _view: RankView = this.mark("_view",RankView);
        private _proxy: CompeteProxy;

        private _itemList: ArrayCollection;
        private _rankType: number = RankType.Type4;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Compete);

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = RankRewardRender;
            this._view.list_rank.dataProvider = this._itemList;
            
            this._view.btn_god.visible = false;
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();
            RankUtil.c2s_new_rank_req_rank(RankType.Type4);
            this.updateShow();
            this.updateTime();
            this._view.timeItem.visible = true;
            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private updateShow(): void {
            let rankInfo = RankUtil.getRankInfo(this._rankType);
            let topInfo = rankInfo ? rankInfo.top_info : null;
            if(topInfo) {
                this.updateRankUIRole(this._view.grp_eff, topInfo);
            }

            let param = getConfigByNameId(ConfigName.Param, "youli_runk_min");
            let rankStr = getLanById(LanDef.tishi_12) + "：";//我的排行：
            if(rankInfo && rankInfo.my_info && rankInfo.my_info.rank_no <= MAX_RANK_NUM){
                rankStr += rankInfo.my_info.rank_no;
                this._view.lab_rank.text = rankStr;
            }else {
                rankStr = `游历积分${param.value}上榜`;
                this._view.lab_rank.text = rankStr;
            }

            let infos = rankInfo && rankInfo.info_list ? rankInfo.info_list : [];
            let len = infos.length;
            let infos1: RankRewardRenderData[] = [];
            for(let i = 0; i < MAX_RANK_SHOW; ++i){
                let rank = i + 1;
                let name = getLanById(LanDef.tishi_2);//虚位以待
                let hurtStr = "";
                
                let rankInfo = i < len ? infos[i] : null;
                if(rankInfo){
                    rank = rankInfo.rank_no;
                    name = rankInfo.name;
                    hurtStr = rankInfo.count + "";
                }
                let rankCfg: TourpvpPaimingConfig = this._proxy.getRankCfg(rank);
                let reward = rankCfg.reward;
                let rankStr;
                if(rank == MAX_RANK_SHOW){
                    //21名不显示名称和积分
                    name = hurtStr = "";
                    rankStr = MAX_RANK_NUM + "+";
                }
                let info: RankRewardRenderData = {
                    rank: rank,
                    name: name,
                    hurtStr: hurtStr,
                    reward: reward,
                    rankStr: rankStr
                };
                infos1.push(info);
            }
            this._itemList.replaceAll(infos1);

            let count = rankInfo && rankInfo.my_info && rankInfo.my_info.count ? rankInfo.my_info.count : 0;
            this._view.img_type2.source = "youlijifen";
            this._view.img_type3.source = "paimingjiangli";
            let score = BagUtil.getPropCntByIdx(PropIndex.Ylcoin);//改成读角色身上的货币
            this._view.lab_num.text = getLanById(LanDef.immortal12) + score;//我的积分：0
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let endTime = this._proxy.rankEndTime;
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
        }

    }
}