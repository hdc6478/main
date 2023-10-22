namespace game.mod.boss {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;

    export class CrossBossPersonalRankMdr extends EffectMdrBase {
        private _view: RankView = this.mark("_view",RankView);

        private _itemList: ArrayCollection;
        private _proxy: BossProxy;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Boss);

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = RankRewardRender;
            this._view.list_rank.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(SceneEvent.ON_SCENE_RANK_UPDATE, this.updateShow, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateShow();
        }

        protected onHide(): void {
            super.onHide();
        }

        private initShow(): void {
            this._view.btn_god.visible = false;
            this._view.img_type2.source = "shanghai";
            this._view.img_type3.source = "paimingjiangli";
            this._view.img_myRank.visible = false;
            this._view.lab_rank.x = this._view.img_myRank.x;
        }

        private updateShow(): void {
            let limit = this._proxy.selCrossBossCfg.rank_limit2;
            let rankStr = StringUtil.substitute(getLanById(LanDef.cross_boss_tips6), [StringUtil.getHurtNumStr(limit)]);
            this._view.lab_rank.text = rankStr;

            let ranks = this._proxy.getPersonalRanks();
            let topInfo = ranks && ranks.length ? ranks[0] : null;
            if(topInfo && topInfo.value && (topInfo.value.toNumber() >= limit || !this._proxy.crossBossSceneRank)) {
                //场景排行榜做上榜限制
                this.updateRankUIRole(this._view.grp_eff, topInfo);
            }

            let myRankInfo = this._proxy.getMyPersonalRank();
            let count = myRankInfo && myRankInfo.value ? myRankInfo.value.toNumber() : 0;
            this._view.lab_num.text = getLanById(LanDef.cross_boss_tips8) + "：" + StringUtil.getHurtNumStr(count);//个人伤害：0

            let infos: RankRewardRenderData[] = [];
            for(let i = 0; i < MAX_RANK_NUM; ++i){
                let rank = i + 1;
                let name = getLanById(LanDef.tishi_2);//虚位以待
                let hurtStr = "";
                let reward = this.getReward(rank);

                let rankInfo = ranks.length > i ? ranks[i] : null;
                if(rankInfo && (rankInfo.value.toNumber() >= limit || !this._proxy.crossBossSceneRank)){
                    //场景排行榜做上榜限制
                    let guildName = rankInfo.guild_name || getLanById(LanDef.bag_cue20);
                    name = rankInfo.name + "\n" + getLanById(LanDef.zongmen) + "：" + guildName;
                    hurtStr = StringUtil.getHurtNumStr(rankInfo.value.toNumber());
                }
                let info: RankRewardRenderData = {
                    rank: rank,
                    name: name,
                    hurtStr: hurtStr,
                    reward: reward
                };
                infos.push(info);
            }
            this._itemList.replaceAll(infos);
        }

        private getReward(rank: number): number[][] {
            let rewards = this._proxy.selCrossBossCfg.rank_reward_show2;
            for(let info of rewards){
                let rankStart = info[0];
                let rankEnd = info[1];
                if(rank >= rankStart && rank <= rankEnd){
                    let rewardId = info[2];
                    let cfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, rewardId);
                    return cfg.content.slice(0, 3);
                }
            }
            return [];
        }
    }
}