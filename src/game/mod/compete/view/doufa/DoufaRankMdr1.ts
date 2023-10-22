namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import MagicUpConfig = game.config.MagicUpConfig;
    import PropConfig = game.config.PropConfig;
    import MagicRankConfig = game.config.MagicRankConfig;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;

    export class DoufaRankMdr1 extends EffectMdrBase implements UpdateItem{
        private _view: RankView = this.mark("_view",RankView);

        private _itemList: ArrayCollection;
        private _rankType = RankCommonType.Type1;
        private _proxy: CompeteProxy;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Compete);

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = RankRewardRender;
            this._view.list_rank.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
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
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onRankUpdate(): void {
            this.updateShow();
            this.updateTime();
        }

        private initShow(): void {
            this._view.btn_god.visible = false;
            this._view.img_type2.source = "jifen";
            this._view.img_type3.source = "paimingjiangli";
            this._view.img_myRank.visible = false;
            this._view.lab_rank.x = this._view.img_myRank.x;
            this._view.timeItem.visible = true;

            let pCfg = GameConfig.getParamConfigById("doufa_runk_condition");
            let rankLimit: number = pCfg.value;
            let upCfg: MagicUpConfig = getConfigByNameId(ConfigName.MagicUp, rankLimit);
            let rankStr = StringUtil.substitute(getLanById(LanDef.doufa_tips9), [upCfg.name]);
            this._view.lab_rank.text = rankStr;

            let firstRankCfg: MagicRankConfig = getConfigByNameId(ConfigName.MagicRank, 1);
            let firstLimit = firstRankCfg.limit;
            let firstUpCfg: MagicUpConfig = getConfigByNameId(ConfigName.MagicUp, firstLimit);

            let index = firstRankCfg.other_reward[0][0];
            let propCfg: PropConfig = getConfigById(index);
            let propName = "“" + propCfg.name + "”";

            let tipsStr = StringUtil.substitute(getLanById(LanDef.doufa_tips8), [firstUpCfg.name, propName]);
            this._view.lab_tips.textFlow = TextUtil.parseHtml(TextUtil.addColor(tipsStr, WhiteColor.GREEN));
        }

        private updateShow(): void {
            let ranks = this._proxy.getRankList(this._rankType);
            let topInfo = this._proxy.getTopInfo(this._rankType);
            if(topInfo && topInfo.value) {
                this.updateRankUIRole(this._view.grp_eff, topInfo);
            }

            let lv = this._proxy.lv;
            let cfg: MagicUpConfig = getConfigByNameId(ConfigName.MagicUp, lv);
            this._view.lab_num.text = getLanById(LanDef.doufa_tips10) + "：" + cfg.name;//我的段位：白银

            let infos: RankRewardRenderData[] = [];
            for(let i = 0; i < MAX_RANK_SHOW; ++i){
                let rank = i + 1;
                let name = getLanById(LanDef.tishi_2);//虚位以待
                let hurtStr = "";
                let reward = this.getReward(rank);

                // let rankInfo = this.getRankInfo(rank, ranks);
                let rankInfo = ranks.length > i ? ranks[i] : null;
                if(rankInfo){
                    name = rankInfo.name;
                    hurtStr = StringUtil.getHurtNumStr(rankInfo.value.toNumber());
                }
                let rankStr;
                if(rank == MAX_RANK_SHOW){
                    //21名不显示名称和积分
                    name = hurtStr = "";
                    rankStr = MAX_RANK_SHOW + "+";
                }
                let info: RankRewardRenderData = {
                    rank: rank,
                    name: name,
                    hurtStr: hurtStr,
                    reward: reward,
                    rankStr: rankStr
                };
                infos.push(info);
            }
            this._itemList.replaceAll(infos);
        }

        private getReward(rank: number): number[][] {
            let cfgList: MagicRankConfig[] = getConfigListByName(ConfigName.MagicRank);
            for(let cfg of cfgList){
                let rankStart = cfg.rank_section[0];
                let rankEnd = cfg.rank_section[1];
                if(rank >= rankStart && rank <= rankEnd){
                    let reward = cfg.reward;
                    if(cfg.other_reward && cfg.other_reward.length){
                        reward = reward.concat(cfg.other_reward);
                    }
                    return reward.slice(0, 2);
                }
            }
            return [];
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let endTime = this._proxy.getEndTime(this._rankType);
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            if(leftTime == 0){
                this.reqRankInfo();
            }
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
        }

        private reqRankInfo(): void {
            this._proxy.c2s_pvp_battle_get_rank_info(this._rankType);
        }
    }
}