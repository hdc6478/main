namespace game.mod.activity {

    import LanDef = game.localization.LanDef;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import oper_act_item = msg.oper_act_item;

    export class CaiyunbangMdr2 extends EffectMdrBase implements UpdateItem {
        private _view: RankView = this.mark("_view", RankView);
        private _proxy: CaiyunbangProxy;
        private _listData: eui.ArrayCollection;
        private _endTime: number;
        private _actData: oper_act_item;
        private _actProxy: ActivityProxy;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._actProxy = this.retProxy(ProxyType.Activity);
            this._proxy = this.retProxy(ProxyType.Caiyunbang);
            this._view.list_rank.itemRenderer = CaiyunbangRankItem;
            this._view.list_rank.dataProvider = this._listData = new eui.ArrayCollection();

            this._view.btn_rule.visible = true;
            this._view.timeItem.visible = true;
            this._view.img_type2.source = 'caiyunyinji';
            this._view.img_type3.source = 'paimingjiangli';
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickRule, this);
            this.onNt(ActivityEvent.ON_CAIYUNBANG_RANK_INFO_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this._endTime = this._proxy.getEndTime();
            if (this._endTime) {
                this.update(TimeMgr.time);
                TimeMgr.addUpdateItem(this, 1000);
            }
            this._actData = this._proxy.getCurOpenAct();
            if (!this._actData) {
                DEBUG && console.log(`caiyunbang 财运榜没有排行数据`);//todo
                return;
            }
            this._actProxy.c2s_oper_act_get_info(this._actData.act_id, RankOpType.Reward);
            DEBUG && console.log(`caiyunbang ${this._actData.act_id} 财运榜请求排行奖励c2s_oper_act_get_info`);//todo

            //this._proxy.checkActTips(NotTipsType.CaiyunbangRank);

        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            DEBUG && console.log(`caiyunbang ${this._actData.act_id} 财运榜请求排行奖励回调s2c_activity_caiyun_rank_info`);//todo

            let yinjiIdx = this._actData.param[1];//货币id
            let propCfg = GameConfig.getPropConfigById(yinjiIdx);
            let name = propCfg && propCfg.name || '';
            this._view.lab_num.textFlow = TextUtil.parseHtml(getLanById(LanDef.rank_txt1) + name + '：'
                + StringUtil.getPowerNumStr(this._proxy.getMyScore()));
            // + TextUtil.addColor(StringUtil.getPowerNumStr(this._proxy.getMyScore()), WhiteColor.GREEN));

            let upNum = this._actData.param[2];//上榜所需数量
            this._view.lab_rank.text = name + upNum + getLanById(LanDef.shangbang);

            this._view.img_tips.visible = !!this._actData.desc;
            this._view.lab_tips.textFlow = TextUtil.parseHtml(TextUtil.addColor(this._actData.desc, WhiteColor.GREEN));

            let reward_list = this._actData.reward_list || [];
            let list: ICaiyunbangRankItemData[] = [];
            for (let i = 0; i < reward_list.length; i++) {
                let rankNo = reward_list[i].cond_1[0];
                let rankRange: number[] = [];
                let teammate: msg.teammate;
                if (i == reward_list.length - 1) {
                    rankRange = [rankNo - 1];//显示50+
                } else if (i < 3) {
                    rankRange = [rankNo, rankNo];//前三名
                    teammate = this._proxy.getRankTeammate(rankNo);
                } else {
                    let nextRankNo = reward_list[i + 1].cond_1[0];
                    rankRange = [rankNo, nextRankNo - 1];//显示范围[4,10]等
                }

                list.push({
                    actReward: reward_list[i],
                    rankRange,
                    teammate
                });
            }
            this._listData.replaceAll(list);

            let topPlayer = this._proxy.getRankTeammate(1);
            if (topPlayer) {
                this.updateRankUIRole(this._view.grp_eff, topPlayer);
            }
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.caiyunbang_tips2));
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }
    }
}