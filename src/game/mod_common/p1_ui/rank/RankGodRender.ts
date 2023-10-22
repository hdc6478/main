namespace game.mod {

    import TouchEvent = egret.TouchEvent;
    import ChapterawardConfig = game.config.ChapterawardConfig;
    import ArrayCollection = eui.ArrayCollection;
    import RankConfConfig = game.config.RankConfConfig;

    /**
     * 排行榜组件
     */
    export class RankGodRender extends BaseListenerRenderer {

        public lab_title: eui.Label;
        public head: game.mod.Head;
        public lab_name: eui.Label;
        public btn_check: game.mod.Btn;
        public list_reward: eui.List;
        public img_get: eui.Image;
        public btn_get: game.mod.Btn;

        public data: RankGodRenderData;//大神榜数据结构
        protected _itemList: ArrayCollection;

        protected onAddToStage() {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_check, this.onClickCheck, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_get, this.onClickGet, this);
            this._itemList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._itemList;
        }

        protected onClickCheck(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let rankInfo = data.rankInfo;
            ViewMgr.getIns().showRoleTips(rankInfo.role_id, rankInfo.server_id);
        }

        protected onClickGet(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let rankType = data.rankType;
            let cfg = data.cfg as ChapterawardConfig;
            RankUtil.c2s_first_rank_award(rankType, cfg.index);
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            let rankType = data.rankType;
            let cfg = data.cfg as ChapterawardConfig;
            let rankInfo = data.rankInfo;
            let status = data.status;

            let titleStr: string;
            let rankConfCfg: RankConfConfig = getConfigByNameId(ConfigName.RankConf, rankType);
            if (rankConfCfg) {
                titleStr = StringUtil.substitute(rankConfCfg.god_desc, [cfg.level]);
            } else {
                titleStr = getLanById("rank_tips" + rankType) + cfg.level;
            }
            this.lab_title.text = titleStr;

            this.currentState = rankInfo ? "2" : "1";
            if (this.currentState == "2") {
                //上榜玩家
                this.head.updateHeadShow(rankInfo.head, rankInfo.head_frame, rankInfo.sex, rankInfo.role_id, rankInfo.server_id, rankInfo.is_robot);
                this.lab_name.text = rankInfo.name;
            }

            this._itemList.source = cfg.award;//奖励

            let canDraw = status == RankRewardStatus.Finish;
            let hasDraw = status == RankRewardStatus.Draw;
            this.img_get.visible = hasDraw;
            this.btn_get.visible = !hasDraw;
            this.btn_get.redPoint.visible = canDraw;
            if (canDraw) {
                this.btn_get.setYellow();
            } else {
                this.btn_get.setDisabled();
            }
        }
    }
}