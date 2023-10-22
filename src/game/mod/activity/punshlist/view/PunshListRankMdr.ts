namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import LanDef = game.localization.LanDef;
    import s2c_rank_info = msg.s2c_rank_info;
    import TouchEvent = egret.TouchEvent;

    export class PunshListRankMdr extends EffectMdrBase implements UpdateItem {
        private _view: PunshListRankView = this.mark("_view", PunshListRankView);

        private _itemList: ArrayCollection;
        private _proxy: PunshListProxy;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.PunshList);

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = RankRewardRender;
            this._view.list_rank.dataProvider = this._itemList;

            this._view.img_type3.source = "paimingjiangli";
            this._view.grp_num.right = 200;
            this._view.btn_go.visible = true;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_go, TouchEvent.TOUCH_TAP, this.onClickBtn);
            this.onNt(RankEvent.ON_NEW_RANK_INFO_UPDATE, this.onRankUpdate, this);
            this.onNt(RankEvent.ON_RANK_BASE_INFO_UPDATE, this.onRankUpdate, this);
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
            this.initShow();
            this.updateShow();
            this.updateTime();
        }

        private initShow(): void {
            this._view.timeItem.visible = true;
            this._view.lab_rank.textFlow = TextUtil.parseHtml(this._proxy.getRankStr(this._proxy.type));
            this._view.lab_num.textFlow = TextUtil.parseHtml(this._proxy.getRankScore(this._proxy.type));
        }

        private updateShow(): void {
            let info: s2c_rank_info = RankUtil.getNewRankInfo(this._proxy.type);
            let info_list = info && info.info_list ? info.info_list : [];

            let topInfo = info_list[0] && info_list[0].base_info;
            if (topInfo) {
                this.updateRankUIRole(this._view.grp_eff, topInfo);
            }

            let infos: RankRewardRenderData[] = this._proxy.getRankList();
            this._itemList.replaceAll(infos);
            // this._itemList.replaceAll(info_list);

            this._view.img_type2.source = `chongbang_power_${this._proxy.type}`;
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let endTime = this._proxy.getEndTime();
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime == 0) {
                this.reqRankInfo();
            }
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
        }

        private reqRankInfo(): void {
            RankUtil.c2s_rank_req_rank(this._proxy.type);
        }

        private onClickBtn(): void {
            let jumoIdx: number = this._proxy.getJumpIdxByType(this._proxy.type);
            if (!jumoIdx) {
                console.error("找不到跳转id", this._proxy.type, jumoIdx);
                return
            }
            ViewMgr.getIns().showViewByID(jumoIdx);
        }
    }
}