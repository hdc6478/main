namespace game.mod.activity {

    import oper_act_item = msg.oper_act_item;
    import c2s_activity_kuanghuan_mibao_get_reward = msg.c2s_activity_kuanghuan_mibao_get_reward;
    import s2c_activity_kuanghuan_mibao_info = msg.s2c_activity_kuanghuan_mibao_info;
    import GameNT = base.GameNT;
    import act_reward = msg.act_reward;
    import c2s_activity_kuanghuan_gift_buy = msg.c2s_activity_kuanghuan_gift_buy;
    import s2c_activity_kuanghuan_gift_info = msg.s2c_activity_kuanghuan_gift_info;
    import facade = base.facade;
    import Handler = base.Handler;
    import c2s_activity_kuanghuan_geren_zhaohuan_get_reward = msg.c2s_activity_kuanghuan_geren_zhaohuan_get_reward;
    import s2c_activity_kuanghuan_zhaohuan_status = msg.s2c_activity_kuanghuan_zhaohuan_status;
    import c2s_activity_kuanghuan_zongmen_zhaohuan_get_reward = msg.c2s_activity_kuanghuan_zongmen_zhaohuan_get_reward;
    import s2c_activity_kuanghuan_zhaohuan_state = msg.s2c_activity_kuanghuan_zhaohuan_state;
    import s2c_activity_kuanghuan_geren_rank_info = msg.s2c_activity_kuanghuan_geren_rank_info;
    import s2c_activity_kuanghuan_zongmen_rank_info = msg.s2c_activity_kuanghuan_zongmen_rank_info;
    import teammate = msg.teammate;

    export class CarnivalProxy extends ProxyBase{
        private _model: CarnivalModel;
        private _zhaohuanlibaoIsFirst = true;

        initialize(): void {
            super.initialize();
            this._model = new CarnivalModel();

            this.onProto(s2c_activity_kuanghuan_mibao_info, this.s2c_activity_kuanghuan_mibao_info, this);
            this.onProto(s2c_activity_kuanghuan_gift_info, this.s2c_activity_kuanghuan_gift_info, this);
            this.onProto(s2c_activity_kuanghuan_zhaohuan_status, this.s2c_activity_kuanghuan_zhaohuan_status, this);
            this.onProto(s2c_activity_kuanghuan_zhaohuan_state, this.s2c_activity_kuanghuan_zhaohuan_state, this);
            this.onProto(s2c_activity_kuanghuan_geren_rank_info, this.s2c_activity_kuanghuan_geren_rank_info, this);
            this.onProto(s2c_activity_kuanghuan_zongmen_rank_info, this.s2c_activity_kuanghuan_zongmen_rank_info, this);
        }

        onStartReconnect(): void {
            super.onStartReconnect();
            this._model.clear();
        }

        private s2c_activity_kuanghuan_mibao_info(n: GameNT): void {
            let msg: s2c_activity_kuanghuan_mibao_info = n.body;
            if (!msg || !msg.act_id) {
                return;
            }
            this._model.mibaoList[msg.act_id] = msg.list || [];
            this.updateMibaoHint();
            this.sendNt(ActivityEvent.ON_CARNIVAL_MIBAO_UPDATE);
        }

        public c2s_activity_kuanghuan_mibao_get_reward (actId: number, index: number): void {
            let msg: c2s_activity_kuanghuan_mibao_get_reward = new c2s_activity_kuanghuan_mibao_get_reward();
            msg.act_id = actId;
            msg.index = index;
            this.sendProto(msg);
        }
        //备用2：星石
        public getMibaoProp(actInfo: oper_act_item): number {
            return actInfo && actInfo.param && actInfo.param[1] || 0;
        }
        //条件1：兑换所需数量
        public getMibaoLimit(reward: act_reward): number {
            return reward.cond_1 && reward.cond_1[0] || 0;
        }

        public hasMibaoDraw(actId: number, index: number): boolean {
            if(!this._model.mibaoList[actId]){
                return false;
            }
            let mibaoList = this._model.mibaoList[actId];
            return mibaoList.indexOf(index) > -1;
        }
        //上一个奖励领取后才可以领取当前奖励
        public hasLastMibaoDraw(actId: number, index: number): boolean {
            let lastIndex = index - 1;
            return !lastIndex || this.hasMibaoDraw(actId, lastIndex);
        }

        public canMibaoDraw(actId: number, reward: act_reward): boolean {
            let index = reward.index;
            if(this.hasMibaoDraw(actId, index)){
                return false;
            }
            if(!this.hasLastMibaoDraw(actId, index)){
                return false;
            }
            let cnt = BagUtil.getPropCntByIdx(PropIndex.Xingshi);
            let limit = this.getMibaoLimit(reward);
            return cnt >= limit;
        }

        //更新红点
        private updateMibaoHint(): void {
            let _proxy: ActivityProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            _proxy.setActHint(ActivityType.CarnivalMibao, Handler.alloc(this, this.getMibaoHint));
        }

        private getMibaoHint(actInfo: oper_act_item): boolean {
            let rewardList = actInfo.reward_list;
            for(let reward of rewardList){
                let canDraw = this.canMibaoDraw(actInfo.act_id, reward);
                if(canDraw){
                    return true;
                }
            }
            return false;
        }

        /****************************************召唤礼包*********************************************/
        public c2s_activity_kuanghuan_gift_buy(actId: number, index: number): void {
            let msg: c2s_activity_kuanghuan_gift_buy = new c2s_activity_kuanghuan_gift_buy();
            msg.act_id = actId;
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_activity_kuanghuan_gift_info(n: GameNT): void {
            let msg: s2c_activity_kuanghuan_gift_info = n.body;
            if (!msg || !msg.act_id) {
                return;
            }
            this._model.giftList[msg.act_id] = msg.list || [];//直接做数据覆盖，服务端跨天会清数据
            this.updateGiftHint();
            this.sendNt(ActivityEvent.ON_CARNIVAL_GIFT_UPDATE);
        }
        private getInfoPos(actId: number, index: number): number {
            if(!this._model.giftList[actId]){
                return -1;
            }
            let len = this._model.giftList[actId].length;
            for(let i = 0; i < len; ++i){
                let oldInfo = this._model.giftList[actId][i];
                if(index == oldInfo.index){
                    return i;
                }
            }
            return -1;
        }
        public getGiftBuyCnt(actId: number, index: number): number {
            let pos = this.getInfoPos(actId, index);
            if(pos < 0){
                return 0;
            }
            return this._model.giftList[actId][pos].num;
        }
        public hasGiftBuy(actId: number, reward: act_reward): boolean {
            let buyCnt = this.getGiftBuyCnt(actId, reward.index);
            let limitCnt = reward.cond_3 && reward.cond_3[0] || 0;
            return buyCnt >= limitCnt;
        }

        //条件1购买类型
        public getGiftType(reward: act_reward): number {
            return reward && reward.cond_1 && reward.cond_1[0] || 0;
        }
        //条件2购买所需仙玉或者商品ID
        public getGiftCost(reward: act_reward): number {
            return reward && reward.cond_2 && reward.cond_2[0] || 0;
        }

        //更新排行榜红点
        private updateGiftHint(): void {
            let _proxy: ActivityProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            _proxy.setActHint(ActivityType.CarnivalGift, Handler.alloc(this, this.getGiftHint));
        }

        //设置召唤礼包非第一次登陆了。
        public setZhaohuanlibaoIsFirst(ret:boolean):void{
            this._zhaohuanlibaoIsFirst = ret;
            this.updateGiftHint();
        }

        private getGiftHint(actInfo: oper_act_item): boolean {

            if(this._zhaohuanlibaoIsFirst){
                return true;
            }

            let rewardList = actInfo.reward_list;
            for(let reward of rewardList){
                let hasBuy = this.hasGiftBuy(actInfo.act_id, reward);
                if(hasBuy){
                    continue;
                }
                let buyType = this.getGiftType(reward);
                if(buyType == GiftBuyType.Rmb){
                    continue;
                }
                let cnt = this.getGiftCost(reward);
                if(BagUtil.checkPropCnt(PropIndex.Xianyu, cnt)){
                    return true;
                }
            }
            return false;
        }

        /********************************狂欢节****************************************/
        public c2s_activity_kuanghuan_geren_zhaohuan_get_reward(actId: number): void {
            let msg: c2s_activity_kuanghuan_geren_zhaohuan_get_reward = new c2s_activity_kuanghuan_geren_zhaohuan_get_reward();
            msg.act_id = actId;
            this.sendProto(msg);
        }

        private s2c_activity_kuanghuan_zhaohuan_status(n: GameNT): void {
            let msg: s2c_activity_kuanghuan_zhaohuan_status = n.body;
            if (!msg || !msg.act_id) {
                return;
            }
            if(msg.count != undefined){
                this._model.scoreList[msg.act_id] = msg.count;
            }
            this._model.indexList[msg.act_id] = msg.list || [];
            if(msg.reward_number != undefined){
                this._model.loopNumList[msg.act_id] = msg.reward_number;
            }
            this.updateCarnivalHint();
            this.sendNt(ActivityEvent.ON_CARNIVAL_UPDATE);
        }

        public getScore(actId: number): number {
            if(!this._model.scoreList[actId]){
                return 0;
            }
            return this._model.scoreList[actId];
        }

        public getLoopNum(actId: number): number {
            if(!this._model.loopNumList[actId]){
                return 0;
            }
            return this._model.loopNumList[actId];
        }

        public hasCarnivalDraw(actId: number, reward: act_reward): boolean {
            if(!this._model.indexList[actId]){
                return false;
            }
            let indexList = this._model.indexList[actId];
            return indexList.indexOf(reward.index) > -1;
        }

        public canCarnivalDraw(actId: number, reward: act_reward): boolean {
            if(this.hasCarnivalDraw(actId, reward)){
                return false;
            }
            let score = this.getScore(actId);
            //条件1：召唤次数
            let limitScore = reward.cond_1 && reward.cond_1[0] || 0;
            return score >= limitScore;
        }

        //更新红点
        private updateCarnivalHint(): void {
            let _proxy: ActivityProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            _proxy.setActHint(ActivityType.Carnival, Handler.alloc(this, this.getCarnivalHint));
        }

        private getCarnivalHint(actInfo: oper_act_item): boolean {
            let rewardList = actInfo.reward_list;
            for(let reward of rewardList){
                if(this.canCarnivalDraw(actInfo.act_id, reward)){
                    return true;
                }
            }
            return false;
        }
        /********************************宗门召唤****************************************/
        public c2s_activity_kuanghuan_zongmen_zhaohuan_get_reward(actId: number): void {
            let msg: c2s_activity_kuanghuan_zongmen_zhaohuan_get_reward = new c2s_activity_kuanghuan_zongmen_zhaohuan_get_reward();
            msg.act_id = actId;
            this.sendProto(msg);
        }

        private s2c_activity_kuanghuan_zhaohuan_state(n: GameNT): void {
            let msg: s2c_activity_kuanghuan_zhaohuan_state = n.body;
            if (!msg || !msg.act_id) {
                return;
            }
            if(msg.count != undefined){
                this._model.zhaohuanScoreList[msg.act_id] = msg.count;
            }
            this._model.zhaohuanIndexList[msg.act_id] = msg.list || [];
            this.updateCarnivalZhaohuanHint();
            this.sendNt(ActivityEvent.ON_CARNIVAL_ZHAOHUAN_UPDATE);
        }

        public getZhaohuanScore(actId: number): number {
            if(!this._model.zhaohuanScoreList[actId]){
                return 0;
            }
            return this._model.zhaohuanScoreList[actId];
        }

        public hasCarnivalZhaohuanDraw(actId: number, reward: act_reward): boolean {
            if(!this._model.zhaohuanIndexList[actId]){
                return false;
            }
            let indexList = this._model.zhaohuanIndexList[actId];
            return indexList.indexOf(reward.index) > -1;
        }

        public canCarnivalZhaohuanDraw(actId: number, reward: act_reward): boolean {
            if(this.hasCarnivalZhaohuanDraw(actId, reward)){
                return false;
            }
            let score = this.getZhaohuanScore(actId);
            //条件1：召唤次数
            let limitScore = reward.cond_1 && reward.cond_1[0] || 0;
            return score >= limitScore;
        }

        //更新红点
        private updateCarnivalZhaohuanHint(): void {
            let _proxy: ActivityProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            _proxy.setActHint(ActivityType.CarnivalZhaohuan, Handler.alloc(this, this.getCarnivalZhaohuanHint));
        }

        private getCarnivalZhaohuanHint(actInfo: oper_act_item): boolean {
            let rewardList = actInfo.reward_list;
            for(let reward of rewardList){
                if(this.canCarnivalZhaohuanDraw(actInfo.act_id, reward)){
                    return true;
                }
            }
            return false;
        }
        //跨服排行榜
        private s2c_activity_kuanghuan_geren_rank_info(n: GameNT): void {
            let msg: s2c_activity_kuanghuan_geren_rank_info = n.body;
            this.updateRankInfo(msg);
        }
        //宗门排行榜
        private s2c_activity_kuanghuan_zongmen_rank_info(n: GameNT): void {
            let msg: s2c_activity_kuanghuan_zongmen_rank_info = n.body;
            this.updateRankInfo(msg);
        }

        private updateRankInfo(msg: s2c_activity_kuanghuan_geren_rank_info | s2c_activity_kuanghuan_zongmen_rank_info): void {
            if (!msg || !msg.act_id) {
                return;
            }
            if(msg.type == RankOpType.LastRank){
                if(msg.rank_list){
                    this._model.lastRankList[msg.act_id] = msg.rank_list;//上一期排行
                }
                if(msg.my_data){
                    this._model.lastMyData[msg.act_id] = msg.my_data;
                }
                this.sendNt(ActivityEvent.ON_CARNIVAL_RANK_UPDATE_LAST_RANK);
                return;
            }
            if(msg.rank_list && msg.type == RankOpType.Rank){
                this._model.rankList[msg.act_id] = msg.rank_list;//当前排行
            }
            if(msg.my_data){
                this._model.myData[msg.act_id] = msg.my_data;
            }
            if(msg.reward_status){
                this._model.rewardStatus[msg.act_id] = msg.reward_status;
                let isCross = msg instanceof s2c_activity_kuanghuan_geren_rank_info;
                let actType = isCross ? ActivityType.CarnivalCrossRank : ActivityType.CarnivalRank;
                this.updateRankHint(actType);
            }
            this.sendNt(ActivityEvent.ON_CARNIVAL_RANK_UPDATE);
        }

        public getMyData(actId: number): teammate {
            return this._model.myData[actId] || null;
        }

        public getLastMyData(actId: number): teammate {
            return this._model.lastMyData[actId] || null;
        }

        public getRankList(actId: number): teammate[] {
            return this._model.rankList[actId] || [];
        }

        public getLastRankList(actId: number): teammate[] {
            return this._model.lastRankList[actId] || [];
        }

        public canDraw(actId: number): boolean {
            let rewardStatus = this._model.rewardStatus[actId];
            return rewardStatus == RewardStatus.Finish;
        }

        public getRankInfo(actId: number, rank: number): teammate {
            let rankList = this._model.rankList[actId];
            if(!rankList){
                return null;
            }
            for(let info of rankList){
                if(info.rank_num == rank){
                    return info;
                }
            }
            return null;
        }

        private updateRankHint(actType: number): void {
            let _proxy: ActivityProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            _proxy.setActHint(actType, Handler.alloc(this, this.getRankHint));
        }

        private getRankHint(actInfo: oper_act_item): boolean {
            return this.canDraw(actInfo.act_id);
        }

        protected onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            // if (keys.indexOf(RolePropertyKey.diamond) >= 0) {
            //     /**写死仙玉变更时候刷新，需要其他道具时再做支持*/
            //     this.updateGiftHint();
            // }
            if (keys.indexOf(RolePropertyKey.xingshi) >= 0) {
                this.updateMibaoHint();
            }
        }
    }
}