namespace game.mod.rank {

    import LanDef = game.localization.LanDef;
    import s2c_rank_info = msg.s2c_rank_info;
    import GameNT = base.GameNT;
    import Tween = base.Tween;

    export class NewRankMdr extends EffectMdrBase {
        private _view: NewRankView = this.mark("_view", NewRankView);
        private _proxy: NewRankProxy;
        private _type: RankType = RankType.Zhanli;
        private _listRankType: eui.ArrayCollection;
        private _listRank: eui.ArrayCollection;
        private _titleId: number;
        //文本展示否
        private _clickTypes: number[] = [];
        private _selIdx = 0;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.gr_eft.touchEnabled = false;
            this._view.gr_efttitle.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.NewRank);
            this._view.list_ranktype.itemRenderer = BtnTabItem;
            this._view.list_ranktype.dataProvider = this._listRankType = new eui.ArrayCollection();
            this._view.list_rank.itemRenderer = NewRankItem;
            this._view.list_rank.dataProvider = this._listRank = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_like, egret.TouchEvent.TOUCH_TAP, this.onClickLike, this);
            addEventListener(this._view.btn_record, egret.TouchEvent.TOUCH_TAP, this.onClickRecord, this);
            addEventListener(this._view.list_ranktype, eui.ItemTapEvent.ITEM_TAP, this.onClickRankType, this);
            addEventListener(this._view.frameItem, egret.TouchEvent.TOUCH_TAP, this.onClickBubbleFrameItem, this);
            this.onNt(RankEvent.ON_NEW_RANK_INFO_UPDATE, this.onUpdateView, this);
            this.onNt(RankEvent.ON_RANK_BASE_INFO_UPDATE, this.onUpdateView, this);
            this.onNt(RankEvent.ON_RANK_WORSHIP_UPDATE, this.onUpdateLikeTime, this);
            this.onNt(RankEvent.ON_RANK_REWARD_UPDATE, this.updateBtnHint, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.scroller.viewport.scrollV = 0;
            this.updateRankTypeList();
            this.sendRankType();
        }

        private sendRankType(): void {
            // if (this._proxy.inOneHour(this._type)) {
            //     this.onUpdateView();
            //     return;
            // }
            this._proxy.c2s_rank_req_rank(this._type, 1);
        }

        protected onHide(): void {
            super.onHide();
            this._clickTypes = [];
            this._type = RankType.Zhanli;
            this._selIdx = 0;
            Tween.remove(this._view.scroller);
        }

        //排行榜类型按钮
        private updateRankTypeList(): void {
            let typeList: RankType[] = this._proxy.getRankTypeList();
            let list: BtnTabItemData[] = [];
            for (let type of typeList) {
                list.push({
                    name: getLanById(RankTypeName[type]) + '榜',
                    showHint: this._proxy.getHintByType(type),
                    param: type//类型
                });
            }
            this._listRankType.replaceAll(list);
            this._view.list_ranktype.selectedIndex = this._selIdx;
        }

        private onUpdateView(): void {
            this.updateTopInfo();
        }

        private updateTopInfo(): void {
            let info: s2c_rank_info = this._proxy.getRankInfo(this._type);
            let info_list = info && info.info_list ? info.info_list : [];
            let listRank: INewRankItemData[] = [];
            for (let i = 1; i < info_list.length; i++) {
                let info = info_list[i];
                listRank.push({
                    info,
                    type: this._type
                });
            }
            listRank.length = MAX_RANK_NUM - 1;
            this._listRank.replaceAll(listRank);

            this.updateBtnHint();

            //个人战力和排名
            let myRankNum: string = MAX_RANK_NUM + '+';//20+
            if (info && info.my_rank_num && info.my_rank_num <= MAX_RANK_NUM) {
                myRankNum = info.my_rank_num + '';
            }
            this._view.lb_myrank.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.compete_mars_4), [myRankNum]));
            this._view.lb_mypower.textFlow = TextUtil.parseHtml(this._proxy.getMyRankTypeDesc(this._type));

            //模型
            let topPlayer = info && info.info_list ? info.info_list[0] : null;
            this._view.gr_eft.removeChildren();
            if (!topPlayer) {
                this.notTopPlayerView();
            } else {
                this.updateTopPlayerView();
            }
        }

        //没有第一名玩家
        private notTopPlayerView(): void {
            this._view.gr_eft.removeChildren();
            this.removeEffect(this._titleId);
            this._view.nameItem.updateShow(getLanById(LanDef.tishi_2));
            this._view.lb_liketime.text = '0';
            this._view.power.visible = this._view.frameItem.visible = false;
            this._view.gr_value.visible = false;
            this._view.img_sketch.visible = true;
        }

        private updateTopPlayerView(): void {
            let info: s2c_rank_info = this._proxy.getRankInfo(this._type);
            if (!info || !info.info_list) {
                return;
            }
            let topPlayer = info.info_list[0];
            let teammate = topPlayer.base_info;
            let data: RankUIRoleData = {
                fashion: teammate.fashion,
                weapon: teammate.weapon,
                wing: teammate.wing,
                sex: teammate.sex
            };
            this.updateRankUIRole(this._view.gr_eft, data);

            this._view.img_sketch.visible = false;
            let clicked = this._clickTypes.indexOf(this._type) > -1;
            this._view.frameItem.visible = !clicked;
            let cfg = this._proxy.getConfCfg(this._type);
            if (cfg && this._view.frameItem.visible) {
                this._view.frameItem.updateShow(cfg.desc);
            }
            if (cfg && cfg.title_id) {
                this.removeEffect(this._titleId);
                this._titleId = this.addEftByParent(ResUtil.getTitleSrc(cfg.title_id, 0), this._view.gr_efttitle);
            }
            this._view.nameItem.updateShow(teammate.name);
            this.updateLikeTime(topPlayer.worshiped_times || 0);

            this._view.gr_value.visible = this._type == RankType.Dengji || this._type == RankType.Xiuxian;
            this._view.power.visible = !this._view.gr_value.visible;
            let valueDesc = this._proxy.getPowerByRankInfo(this._type, topPlayer);
            if (this._view.power.visible) {
                this._view.power.setPowerValue(valueDesc);
            } else {
                this._view.lb_value.text = valueDesc;
            }
        }

        //点赞前端自行更次数，重新请求再刷新
        private onUpdateLikeTime(n: GameNT): void {
            //跳转到下一个可以点赞的类型
            let worshipList = this._proxy.getWorshipList();
            if (worshipList && worshipList.length) {
                this._type = worshipList[0];
                let typeList = this._proxy.getRankTypeList();
                this._selIdx = typeList.indexOf(this._type);
                this.sendRankType();
                //滚动
                if (this._selIdx > 7) {
                    egret.callLater(() => {
                        ScrollUtil.moveVToAssign(this._view.scroller, this._selIdx, 66);
                    }, this);
                }
                return;
            }

            //没有下一个可点赞的，停留在当前
            let type = n.body as number;
            if (type != this._type) {
                return;
            }
            let info = this._proxy.getRankInfo(type);
            if (!info || !info.info_list) {
                return;
            }
            let topPlayer = info.info_list[0];
            topPlayer.worshiped_times = (topPlayer.worshiped_times || 0) + 1;
            this.updateLikeTime(topPlayer.worshiped_times);
            this.updateBtnHint();
        }

        private updateLikeTime(cnt: number): void {
            this._view.lb_liketime.text = cnt + '';
        }

        private onClickLike(): void {
            if (this._proxy.canWorship(this._type)) {
                this._proxy.c2s_rank_worship(this._type);
            }
        }

        private onClickRecord(): void {
            ViewMgr.getIns().showSecondPop(ModName.Rank, RankViewType.NewRankGod, this._type);
        }

        private onClickRankType(e: eui.ItemTapEvent): void {
            let item = e.item as BtnTabItemData;
            if (!item || item.param == this._type) {
                return;
            }
            this._type = item.param;
            let typeList = this._proxy.getRankTypeList();
            this._selIdx = typeList.indexOf(this._type);
            this.sendRankType();
        }

        //点击后隐藏
        private onClickBubbleFrameItem(): void {
            this._view.frameItem.visible = false;
            if (this._clickTypes.indexOf(this._type) < 0) {
                this._clickTypes.push(this._type);
            }
        }

        private updateBtnHint(): void {
            this._view.btn_like.setHint(this._proxy.canWorship(this._type));
            this._view.btn_record.setHint(this._proxy.canGetReward(this._type));
            this.updateRankTypeList();
        }
    }
}