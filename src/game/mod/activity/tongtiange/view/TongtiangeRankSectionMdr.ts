namespace game.mod.activity {

    import LanDef = game.localization.LanDef;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class TongtiangeRankSectionMdr extends MdrBase implements UpdateItem {
        private _view: RankSectionView = this.mark("_view", RankSectionView);
        private _proxy: TongtiangeProxy;
        private _listData: eui.ArrayCollection;
        private _endTime: number;
        /**0是排行榜类型，1是排名范围*/
        _showArgs: any[];

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Tongtiange);
            this._view.list.itemRenderer = RankSectionItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();

            this._view.img_type2.source = `jianzaocishu`;
            this._view.timeItem.visible = true;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide);
            this.onNt(ActivityEvent.ON_UPDATE_TONGTIANGE_RANK_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs || !Array.isArray(this._showArgs)) {
                return;
            }
            this._view.secondPop.updateTitleStr(getLanById(LanDef.compete_mars_26));

            this._endTime = this._proxy.getEndTime();
            if (this._endTime) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            }
            let type = this._showArgs[0];
            let range = this._showArgs[1];
            this._proxy.c2s_attic_rank_show(type, range[0], range[1]);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;
        }

        private onUpdateView(): void {
            let type = this._showArgs[0];
            let range = this._showArgs[1];
            let model = this._proxy.model;
            let rankList = type == TongtiangeRankType.Personal ? model.role_rank_list : model.guild_rank_list;
            let list: IRankSectionData[] = [];
            for (let i = range[0]; i <= range[1]; i++) {
                let teammate = rankList[i];
                list.push({
                    rank: i,
                    name: teammate ? teammate.name : getLanById(LanDef.tishi_2),
                    value: teammate && teammate.value ? teammate.value.toNumber() : 0
                });
            }
            this._listData.replaceAll(list);

            this.updateView();
        }

        private updateView(): void {
            let isGuild = this._showArgs[0] == TongtiangeRankType.Guild;//是宗门

            let rankDesc = isGuild ? getLanById(LanDef.tongtiange_tips15) : getLanById(LanDef.tongtiange_tips16);
            let rankNo = this._proxy.getRankNo();
            let rankNoDesc = rankNo ? rankNo + '' : getLanById(LanDef.tishi_13);
            this._view.lab_rank.textFlow = TextUtil.parseHtml(StringUtil.substitute(rankDesc,
                [TextUtil.addColor(rankNoDesc, WhiteColor.GREEN)]));

            let cntDesc = isGuild ? getLanById(LanDef.tongtiange_tips17) : getLanById(LanDef.tongtiange_tips18);
            this._view.lab_score.textFlow = TextUtil.parseHtml(StringUtil.substitute(cntDesc,
                [TextUtil.addColor(this._proxy.getBuildCnt(isGuild) + '', WhiteColor.GREEN)]));
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