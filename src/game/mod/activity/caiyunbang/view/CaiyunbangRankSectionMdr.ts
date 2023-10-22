namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    export class CaiyunbangRankSectionMdr extends MdrBase implements UpdateItem {
        private _view: RankSectionView = this.mark("_view", RankSectionView);
        private _proxy: CaiyunbangProxy;
        private _endTime: number;
        private _listData: eui.ArrayCollection;
        private _startRank = 4;//展示4-9
        private _endRank = 9;
        _showArgs: number[];//查看排名范围

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Caiyunbang);
            this._view.list.itemRenderer = RankSectionItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.lab_time.visible = true;
            this._view.img_type2.source = `caiyunyinji`;
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._startRank = this._showArgs[0];
            this._endRank = this._showArgs[1];

            this._view.secondPop.updateTitleStr(getLanById(LanDef.pass_rank));
            this._endTime = this._proxy.getCurOpenAct().c_end_time;
            if (this._endTime) {
                this.update(TimeMgr.time);
                TimeMgr.addUpdateItem(this, 1000);
            }
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;
        }

        private updateView(): void {
            let rankList = this._proxy.getRankList();
            let list: IRankSectionData[] = [];
            for (let i = this._startRank; i <= this._endRank; i++) {
                let mate = rankList[i];
                list.push({
                    rank: i,
                    name: mate ? mate.name : getLanById(LanDef.tishi_2),
                    value: mate && mate.value ? mate.value.toString() : ''
                });
            }
            this._listData.replaceAll(list);

            this._view.lab_score.textFlow = TextUtil.parseHtml(getLanById(LanDef.battle_cue46) + '：' + this._proxy.getMyScore());
            let myRank = this._proxy.getMyRankNo();
            let myRankStr = getLanById(LanDef.tishi_13);
            if (myRank) {
                myRankStr = myRank + '';
            }
            this._view.lab_rank.textFlow = TextUtil.parseHtml(getLanById(LanDef.tishi_12) + "：" + myRankStr);
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.lab_time.text = TimeUtil.formatSecond(leftTime, 'd天H时', true) + "后发放奖励";
        }
    }
}