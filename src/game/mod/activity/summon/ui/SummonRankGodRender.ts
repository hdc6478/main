namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import DrawCountRewardsConfig = game.config.DrawCountRewardsConfig;

    export class SummonRankGodRender extends BaseListenerRenderer {

        public lab_title: eui.Label;
        public head: game.mod.Head;
        public lab_name: eui.Label;
        public btn_check: game.mod.Btn;
        public list_reward: eui.List;
        public img_get: eui.Image;
        public btn_get: game.mod.Btn;

        public data: ISummonFengYunData;
        private _itemList: ArrayCollection;

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
            let _proxy: SummonProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Summon);
            _proxy.c2s_draw_get_fengyun_rewards(this.data.cfg.index);
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }

            let rankInfo = data.rankInfo;
            this.currentState = rankInfo ? "2" : "1";
            if (this.currentState == "2") {
                //上榜玩家
                this.head.updateHeadShow(rankInfo.head, rankInfo.head_frame, rankInfo.sex, rankInfo.role_id, rankInfo.server_id, rankInfo.is_robot);
                this.lab_name.text = rankInfo.name;
            }

            let cfg: DrawCountRewardsConfig = this.data.cfg;
            this._itemList.source = cfg.rewards;//奖励

            this.lab_title.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById("zhaohuan_runk_cond"), [cfg.count]));

            let status = this.data.status;
            let canDraw = status == 1;
            let hasDraw = status == 2;
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