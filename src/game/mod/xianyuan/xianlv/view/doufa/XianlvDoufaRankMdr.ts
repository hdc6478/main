namespace game.mod.xianyuan {

    import ArrayCollection = eui.ArrayCollection;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import LanDef = game.localization.LanDef;

    export class XianlvDoufaRankMdr extends EffectMdrBase implements UpdateItem {
        private _view: RankView = this.mark("_view", RankView);

        private _itemList: ArrayCollection;
        private _proxy: XianlvDoufaProxy;
        private _endTime: number;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.XianlvDoufa);

            this._view.grp_eff.x = 200;
            this._view.grp_eff.touchEnabled = false;
            this._view.grp_eff0.x = 520;
            this._view.grp_eff0.visible = true;
            this._view.grp_eff0.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = RankRewardRender;
            this._view.list_rank.dataProvider = this._itemList;

            this._view.btn_god.visible = false;
            this._view.timeItem.visible = true;

            this._view.img_type2.source = "jingjijifen";
            this._view.img_type3.source = "paimingjiangli";
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(XianyuanEvent.ON_UPDATE_XIANLV_DOUFA_RANK, this.onUpdateView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_xianlv_pvp_oper(2);
            super.onShow();
            this.onUpdateTime();
        }

        private onUpdateTime(): void {
            this._endTime = TimeUtil.getNextWeekTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
        }

        private onUpdateView(): void {
            // let list = this._proxy.ranks;
            // let topInfo = list && list[0];
            // if (topInfo && topInfo.value) {
            //     this.updateRankUIRole(this._view.grp_eff, topInfo);
            // }
            let first = this._proxy.first_info;
            if (first && first[0]) {
                this.updateRankUIRole(this._view.grp_eff, first[0]);
            }
            if (first && first[1]) {
                this.updateRankUIRole(this._view.grp_eff0, first[1], 1, true);
            }

            let infos: RankRewardRenderData[] = this._proxy.getRankList();
            this._itemList.replaceAll(infos);

            this._view.lab_rank.textFlow = TextUtil.parseHtml(this._proxy.getRankStr());
            this._view.lab_num.textFlow = TextUtil.parseHtml(this._proxy.getRankCountStr());
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
            }
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }
    }
}