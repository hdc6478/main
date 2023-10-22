namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class XianjieLuandouRankSectionMdr extends MdrBase {
        private _view: RankSectionView = this.mark("_view", RankSectionView);
        private _proxy: XianjieLuandouProxy;
        private _listData: eui.ArrayCollection;
        _showArgs: number[];//查看排名范围

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XianjieLuandou);
            this._view.secondPop.updateTitleStr(getLanById(LanDef.pass_rank));
            this._view.list.itemRenderer = RankSectionItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.img_type2.source = 'jifen';
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let section = this._showArgs;
            let list: IRankSectionData[] = [];
            for (let i = section[0]; i <= section[1]; i++) {
                let mate = this._proxy.getRankInfo(i);
                list.push({
                    rank: i,
                    name: mate ? mate.name : getLanById(LanDef.tishi_2),
                    value: mate && mate.value ? mate.value.toString() : ''
                });
            }
            this._listData.replaceAll(list);

            let myRank = this._proxy.my_rank;
            let rankNo = myRank && myRank.rank_num || 0;
            let myRankStr = rankNo ? rankNo + '' : getLanById(LanDef.tishi_13);
            this._view.lab_rank.textFlow = TextUtil.parseHtml(getLanById(LanDef.tishi_12) + "：" + myRankStr);
            let valueStr = myRank && myRank.value ? myRank.value.toString() : '0';
            this._view.lab_score.textFlow = TextUtil.parseHtml(getLanById(LanDef.battle_cue46) + '：' + valueStr);
        }
    }
}