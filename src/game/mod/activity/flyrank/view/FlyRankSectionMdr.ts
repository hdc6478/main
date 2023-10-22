namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import oper_act_item = msg.oper_act_item;
    import teammate = msg.teammate;

    export class FlyRankSectionMdr extends EffectMdrBase implements UpdateItem{
        private _view: RankSectionView = this.mark("_view", RankSectionView);

        private _itemList: ArrayCollection;

        private _proxy: ActivityProxy;
        private _flyRankProxy: FlyRankProxy;

        public _showArgs: {start: number, end: number};//排名区间
        private _lastRank: boolean;//是否是上期排行
        private _start: number;//排名区间
        private _end: number;//排名区间
        private _actInfo: oper_act_item;

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

            this._proxy = this.retProxy(ProxyType.Activity);
            this._flyRankProxy = this.retProxy(ProxyType.FlyRank);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            this.onNt(ActivityEvent.ON_FLY_RANK_UPDATE, this.onInfoUpdate, this);
            this.onNt(ActivityEvent.ON_FLY_RANK_UPDATE_LAST_RANK, this.onInfoUpdateLastRank, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.secondPop.updateTitleStr(getLanById(LanDef.pass_rank));
            this._view.img_type2.source = "jifen";
            this._lastRank = !this._showArgs || !this._showArgs.start;
            this._start = this._showArgs && this._showArgs.start;
            this._end = this._showArgs && this._showArgs.end;
            this._actInfo = this._proxy.curOpenAct;

            if(!this._lastRank){
                //当前排行榜
                this._view.lab_time.visible = true;
                this.updateTime();
                this.updateRank();
                TimeMgr.addUpdateItem(this, 1000);
            }
            else {
                //上一期排行榜
                this._view.lab_time.visible = false;
                let lastRankList = this._flyRankProxy.getLastRankList(this._actInfo.act_id);
                if(!lastRankList || !lastRankList.length){
                    this._proxy.c2s_oper_act_get_info(this._actInfo.act_id, RankOpType.LastRank);//请求上期排名
                }
                this.updateLastRank();
            }
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onInfoUpdate(): void {
            if(this._lastRank){
                return;
            }
            this.updateRank();
        }

        private onInfoUpdateLastRank(): void {
            if(!this._lastRank){
                return;
            }
            this.updateLastRank();
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let endTime = this._actInfo.c_end_time;
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            let timeStr = TimeUtil.formatSecond(leftTime, 'd天H时', true) + "后发放奖励";
            this._view.lab_time.text = timeStr;
            if(leftTime <= 0){
                this.hide();
            }
        }

        //当前排名
        private updateRank(): void {
            let myData = this._flyRankProxy.getMyData(this._actInfo.act_id);
            let rankList = this._flyRankProxy.getRankList(this._actInfo.act_id);
            let maxRank = this._end - this._start + 1;
            let tmpRankList: teammate[] = [];
            for(let rankInfo of rankList){
                if(rankInfo.rank_num >= this._start && rankInfo.rank_num <= this._end){
                    tmpRankList.push(rankInfo);
                }
            }
            this.updateRankList(myData, tmpRankList, maxRank, this._start);
        }

        //上期排名
        private updateLastRank(): void {
            let lastMyData = this._flyRankProxy.getLastMyData(this._actInfo.act_id);
            let lastRankList = this._flyRankProxy.getLastRankList(this._actInfo.act_id);
            let maxRank = this._flyRankProxy.getMaxRank(this._actInfo);
            this.updateRankList(lastMyData, lastRankList, maxRank);
        }

        private updateRankList(myData: teammate, rankList: teammate[], maxRank: number, start?: number): void {
            let rankStr = getLanById(LanDef.tishi_12) + "：";//我的排行：
            if(myData && myData.rank_num){
                rankStr += myData.rank_num <= maxRank ? myData.rank_num : maxRank + "+";//50+
            }
            else {
                rankStr += getLanById(LanDef.tishi_13);//未上榜
            }
            this._view.lab_rank.text = rankStr;

            let score = myData && myData.value && myData.value.toNumber() || 0;
            this._view.lab_score.text = getLanById(LanDef.battle_cue46) + "：" + score;//我的积分：0

            let list: IRankSectionData[] = [];
            for(let i = 0; i < maxRank; ++i){
                let rankInfo = rankList.length > i ? rankList[i] : null;
                let rankNo = start ? i + start : i + 1;
                let rankData: IRankSectionData = {
                    rank: rankNo,
                    name: rankInfo ? rankInfo.name : getLanById(LanDef.tishi_2),
                    value: rankInfo && rankInfo.value ? rankInfo.value.toString() : ""
                }
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