namespace game.mod.more {


    import LanDef = game.localization.LanDef;

    export class XujieTansuoRankSectionMdr extends MdrBase {
        private _view: RankSectionView = this.mark("_view", RankSectionView);
        private _proxy: XujieTansuoProxy;
        /**排名范围*/
        private _rank: number[];
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);
            this._view.list.itemRenderer = XujieTansuoRankSectionItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();

            this._view.img_type2.source = `tansuojindu`;
            this._view.img_type2.horizontalCenter = 215;
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._rank = this._showArgs;
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;
        }

        //排名数据
        private getRankInfo(rankNo: number): msg.zhandui_legion_rank_struct {
            return this._proxy.getRankInfo(rankNo);
        }

        private updateView(): void {
            let list: IXujieTansuoRankItemData[] = [];
            for (let i = this._rank[0]; i <= this._rank[1]; i++) {
                let rankInfo = this.getRankInfo(i);
                let progress = rankInfo ? this._proxy.getRankProgressByRow(rankInfo.map_index, rankInfo.layer, rankInfo.row) : 0;
                list.push({
                    rank: [i],
                    info: this.getRankInfo(i),
                    progress: progress
                });
            }
            this._listData.replaceAll(list);

            let myRankInfo = this._proxy.my_team_rank;
            let progress = myRankInfo ? this._proxy.getRankProgressByRow(myRankInfo.map_index, myRankInfo.layer, myRankInfo.row) : 0;
            let cfg = this._proxy.getTypeCfg(myRankInfo && myRankInfo.map_index || 0);
            this._view.lab_score.textFlow = TextUtil.parseHtml(cfg && cfg.name + '：' + progress + '%');
            let myRankNo = myRankInfo ? myRankInfo.rank_num : 0;
            let myRankStr = getLanById(LanDef.compete_mars_16);
            if (0 < myRankNo && myRankNo <= MAX_RANK_NUM) {
                myRankStr = myRankNo + '';
            } else if (myRankNo > MAX_RANK_NUM) {
                myRankStr = MAX_RANK_NUM + '+';
            }
            this._view.lab_rank.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.xujietansuo_tips20), [myRankStr]));
        }
    }
}