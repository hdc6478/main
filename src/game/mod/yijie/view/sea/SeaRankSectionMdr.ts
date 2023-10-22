namespace game.mod.yijie {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;
    import teammate = msg.teammate;

    export class SeaRankSectionMdr extends MdrBase{
        private _view: RankSectionView = this.mark("_view", RankSectionView);

        private _itemList: ArrayCollection;
        private _proxy: SeaProxy;
        public _showArgs: {start: number, end: number};//排名区间
        private _start: number;//排名区间
        private _end: number;//排名区间

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list.itemRenderer = RankSectionItem;
            this._view.list.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Sea);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
        }

        protected onShow(): void {
            super.onShow();
            this._view.secondPop.updateTitleStr(getLanById(LanDef.pass_rank));
            this._view.img_type2.source = "leijijibai";
            this._start = this._showArgs && this._showArgs.start;
            this._end = this._showArgs && this._showArgs.end;
            this.updateRank();
        }

        protected onHide(): void {
            super.onHide();
        }

        //当前排名
        private updateRank(): void {
            let type = this._proxy.rankType;
            let myRankInfo = this._proxy.getMyRank(type);

            let rankStr = getLanById(LanDef.tishi_12) + "：";//我的排行：
            if(myRankInfo && myRankInfo.rank_num){
                let maxRank = this._proxy.getMaxRank(type);
                rankStr += myRankInfo.rank_num <= maxRank ? myRankInfo.rank_num : maxRank + "+";//10+
            }
            else {
                rankStr += getLanById(LanDef.tishi_13);//未上榜
            }
            this._view.lab_rank.text = rankStr;

            let count = myRankInfo && myRankInfo.value ? myRankInfo.value.toNumber() : 0;
            this._view.lab_score.text = getLanById(LanDef.sea_tips14) + "：" + StringUtil.getHurtNumStr(count);//我的击败：0

            let ranks = this._proxy.getRankList(type);
            let rankList: teammate[] = [];
            for(let rankInfo of ranks){
                if(rankInfo.rank_num >= this._start && rankInfo.rank_num <= this._end){
                    rankList.push(rankInfo);
                }
            }
            let showRank = this._end - this._start + 1;
            let list: IRankSectionData[] = [];
            for(let i = 0; i < showRank; ++i){
                let rankInfo = rankList.length > i ? rankList[i] : null;
                let rankNo = this._start ? i + this._start : i + 1;
                let rankData: IRankSectionData = {
                    rank: rankNo,
                    name: rankInfo ? rankInfo.name : getLanById(LanDef.tishi_2),
                    value: rankInfo && rankInfo.value ? rankInfo.value.toString() : ""
                };
                list.push(rankData);
            }
            if(this._itemList.source.length){
                this._itemList.replaceAll(list);
            }
            else {
                this._itemList.source = list;
            }
        }
    }
}