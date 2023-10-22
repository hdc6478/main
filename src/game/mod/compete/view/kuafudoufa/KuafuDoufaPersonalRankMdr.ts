namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;
    import ParamConfig = game.config.ParamConfig;
    import DoufaGerenPaimingConfig = game.config.DoufaGerenPaimingConfig;

    export class KuafuDoufaPersonalRankMdr extends EffectMdrBase {
        private _view: RankView = this.mark("_view",RankView);

        private _itemList: ArrayCollection;
        private _proxy: CompeteProxy;
        private _type: number = KuafuDoufaOpType.PersonalRank;

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
            this.onNt(CompeteEvent.KUAFU_DOUFA_RANK_UPDATE, this.updateShow, this);
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
            this._view.img_type2.source = "jifen";
            this._view.img_type3.source = "paimingjiangli";
            this._view.img_myRank.visible = false;
            this._view.lab_rank.x = this._view.img_myRank.x;
            this._proxy.c2s_kuafudoufa_click(this._type);
        }

        private updateShow(): void {
            let cfg: ParamConfig = GameConfig.getParamConfigById("kuafu_doufa_geren_paiming");
            let limit = cfg && cfg.value;
            let rankStr = StringUtil.substitute(getLanById(LanDef.kuafu_doufa_tips12), [StringUtil.getHurtNumStr(limit)]);
            this._view.lab_rank.text = rankStr;

            let ranks = this._proxy.getRanks(this._type);
            let topInfo = ranks && ranks.length ? ranks[0] : null;
            if(topInfo && topInfo.value) {
                this.updateRankUIRole(this._view.grp_eff, topInfo);
            }

            let myRankInfo = this._proxy.getMyRank(this._type);
            let count = myRankInfo && myRankInfo.value ? myRankInfo.value.toNumber() : 0;
            this._view.lab_num.text = getLanById(LanDef.kuafu_doufa_tips14) + "：" + StringUtil.getHurtNumStr(count);//个人伤害：0

            let infos: RankRewardRenderData[] = [];
            for(let i = 0; i < MAX_RANK_NUM; ++i){
                let rank = i + 1;
                let name = getLanById(LanDef.tishi_2);//虚位以待
                let hurtStr = "";
                let reward = this.getReward(rank);

                let rankInfo = ranks.length > i ? ranks[i] : null;
                if(rankInfo){
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
            let cfgList: DoufaGerenPaimingConfig[] = getConfigListByName(ConfigName.DoufaGerenPaiming);
            for(let cfg of cfgList){
                let rankStart = cfg.rank_section[0];
                let rankEnd = cfg.rank_section[1];
                if(rank >= rankStart && rank <= rankEnd){
                    return cfg.reward.slice(0, 3);
                }
            }
            return [];
        }
    }
}