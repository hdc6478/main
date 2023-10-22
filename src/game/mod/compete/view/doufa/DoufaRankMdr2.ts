namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import teammate = msg.teammate;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;

    export class DoufaRankMdr2 extends EffectMdrBase implements UpdateItem {
        private _view: RankView = this.mark("_view",RankView);

        private _itemList: ArrayCollection;
        private _maxRank: number = 16;//显示前16名
        private _rankType = RankCommonType.Type2;
        private _proxy: CompeteProxy;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Compete);

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = RankCommonRender;
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
            this._view.img_type2.visible = false;
            this._view.img_type3.source = "jifen";
            this._view.timeItem.visible = true;

            let tipsStr = StringUtil.substitute(getLanById(LanDef.doufa_tips11), [this._maxRank]);
            this._view.lab_tips.textFlow = TextUtil.parseHtml(TextUtil.addColor(tipsStr, WhiteColor.GREEN));
        }

        private updateShow(): void {
            let ranks = this._proxy.getRankList(this._rankType);
            let topInfo = this._proxy.getTopInfo(this._rankType);
            if(topInfo && topInfo.value) {
                this.updateRankUIRole(this._view.grp_eff, topInfo);
            }

            let rankStr = getLanById(LanDef.tishi_12) + "：";//我的排行：
            let myRankInfo = this.getMyRankInfo(ranks);
            rankStr += myRankInfo && myRankInfo.rank_num <= this._maxRank ? myRankInfo.rank_num : this._maxRank + "+";//16+
            this._view.lab_rank.text = rankStr;

            let score = this._proxy.score;
            this._view.lab_num.text = getLanById(LanDef.battle_cue46) + "：" + score;//我的积分：0

            let infos: RankCommonRenderData[] = [];
            for(let i = 0; i < this._maxRank; ++i){
                let rank = i + 1;
                let name = getLanById(LanDef.tishi_2);//虚位以待
                let powerStr = "";
                let hurtStr = "";

                let rankInfo = ranks.length > i ? ranks[i] : null;
                if(rankInfo){
                    name = rankInfo.name;
                    hurtStr = StringUtil.getHurtNumStr(rankInfo.value.toNumber());
                }
                let info: RankCommonRenderData = {
                    rank: rank,
                    name: name,
                    powerStr: powerStr,
                    hurtStr: hurtStr
                };
                infos.push(info);
            }
            this._itemList.replaceAll(infos);
        }

        private getMyRankInfo(ranks: teammate[]): teammate {
            for(let info of ranks){
                if(info.role_id.eq(RoleVo.ins.role_id)){
                    return info;
                }
            }
            return null;
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