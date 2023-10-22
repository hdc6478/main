namespace game.mod.rank {

    import RankConfConfig = game.config.RankConfConfig;
    import RankRewardConfig = game.config.RankRewardConfig;

    export class NewRankGodRender extends RankGodRender {

        data: RankGodRenderData;
        private _proxy: NewRankProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Rank, ProxyType.NewRank);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let confCfg: RankConfConfig = getConfigByNameId(ConfigName.RankConf, data.rankType);
            let cfg = data.cfg as RankRewardConfig;
            let desc = this._proxy.getGodCondition(data.rankType, cfg.level);
            this.lab_title.text = StringUtil.substitute(confCfg.god_desc, [desc]);

            let rankInfo = data.rankInfo;
            this.currentState = rankInfo ? "2" : "1";
            if (this.currentState == "2") {
                //上榜玩家
                this.head.updateHeadShow(rankInfo.head, rankInfo.head_frame, rankInfo.sex, rankInfo.role_id, rankInfo.server_id, rankInfo.is_robot);
                this.lab_name.text = rankInfo.name;
            }

            this._itemList.source = cfg.award;

            let canDraw = data.status == RankRewardStatus.Finish;
            let hasDraw = data.status == RankRewardStatus.Draw;
            this.img_get.visible = hasDraw;
            this.btn_get.visible = !hasDraw;
            this.btn_get.redPoint.visible = canDraw;
            if (canDraw) {
                this.btn_get.setYellow();
            } else {
                this.btn_get.setDisabled();
            }
        }

        protected onClickGet() {
            if (!this.data) {
                return;
            }
            let data = this.data;
            this._proxy.c2s_dashen_rank_award(data.rankType, data.cfg.index);
        }
    }
}