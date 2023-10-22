namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import SummonProxy = game.mod.activity.SummonProxy;
    import ParamConfig = game.config.ParamConfig;
    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;

    export class SummonRankMdr extends EffectMdrBase implements UpdateItem {
        private _view: RankView = this.mark("_view", RankView);

        private _itemList: ArrayCollection;
        private _proxy: SummonProxy;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Summon);

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = RankRewardRender;
            this._view.list_rank.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_god, TouchEvent.TOUCH_TAP, this.onJumpGod);
            this.onNt(ActivityEvent.ON_UPDATE_RANK, this.onRankUpdate, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onUpdateHint, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.onRankUpdate();//不确定服务端会不会返回数据
            this.reqRankInfo();

            TimeMgr.addUpdateItem(this, 1000);
        }

        private onJumpGod(): void {
            // this.showView();
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.SummonRankGods);
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
            this._view.btn_god.visible = true;
            let bool = HintMgr.getHint([ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonRank, MainActivityViewType.SummonRankGods]);
            this._view.btn_god.redPoint.visible = bool;
            this._view.img_type2.source = "zhaohuancishu";
            this._view.img_type3.source = "paimingjiangli";
            // this._view.img_myRank.visible = false;
            // this._view.lab_rank.x = this._view.img_myRank.x;
            this._view.timeItem.visible = true;

            let param: ParamConfig = getConfigByNameId(ConfigName.Param, "zhaohuan_rank");
            //
            if (+this._proxy.myRank > 0) {
                this._view.lab_rank.text = `我的排行：${this._proxy.myRank}`;
            } else {
                this._view.lab_rank.text = "召唤" + param.value + "次上榜";
            }
            this._view.lab_num.text = `我的次数：${this._proxy.myRankCount}`;
        }

        private updateShow(): void {
            let topInfo = this._proxy.getItemByRank(1);
            if (topInfo && topInfo.value) {
                this.updateRankUIRole(this._view.grp_eff, topInfo);
            }

            let infos: RankRewardRenderData[] = this._proxy.getRankList();
            this._itemList.replaceAll(infos);
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let endTime = this._proxy.model.end_time;
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime == 0) {
                this.reqRankInfo();
            }
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
        }

        private onUpdateHint(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType([ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonRank, MainActivityViewType.SummonRankGods])) {
                this._view.btn_god.redPoint.visible = data.value;
            }
        }

        private reqRankInfo(): void {
            this._proxy.c2s_draw_get_rank_info();
        }
    }
}