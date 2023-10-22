namespace game.mod.activity {

    import GameNT = base.GameNT;
    import s2c_activity_feishen_send_rank_info = msg.s2c_activity_feishen_send_rank_info;
    import oper_act_item = msg.oper_act_item;
    import teammate = msg.teammate;
    import act_reward = msg.act_reward;
    import prop_tips_data = msg.prop_tips_data;
    import c2s_activity_feishen_gift_info = msg.c2s_activity_feishen_gift_info;
    import s2c_activity_feishen_gift_info = msg.s2c_activity_feishen_gift_info;
    import c2s_activity_feishen_score_get_rewards = msg.c2s_activity_feishen_score_get_rewards;
    import s2c_activity_feishen_score_rewards_info = msg.s2c_activity_feishen_score_rewards_info;
    import c2s_activity_feishen_gameorder_get_rewards = msg.c2s_activity_feishen_gameorder_get_rewards;
    import s2c_activity_feishen_gameorder_info = msg.s2c_activity_feishen_gameorder_info;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;
    import Handler = base.Handler;

    export class FlyRankProxy extends ProxyBase implements IFlyRankProxy{
        private _model: FlyRankModel;

        initialize(): void {
            super.initialize();
            this._model = new FlyRankModel();

            this.onProto(s2c_activity_feishen_send_rank_info, this.s2c_activity_feishen_send_rank_info, this);
            this.onProto(s2c_activity_feishen_gift_info, this.s2c_activity_feishen_gift_info, this);
            this.onProto(s2c_activity_feishen_score_rewards_info, this.s2c_activity_feishen_score_rewards_info, this);
            this.onProto(s2c_activity_feishen_gameorder_info, this.s2c_activity_feishen_gameorder_info, this);
        }

        onStartReconnect(): void {
            super.onStartReconnect();
            this._model.clear();
        }

        private s2c_activity_feishen_send_rank_info(n: GameNT): void {
            let msg: s2c_activity_feishen_send_rank_info = n.body;
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
                this.sendNt(ActivityEvent.ON_FLY_RANK_UPDATE_LAST_RANK);
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
                this.updateRankHint();
            }
            this.sendNt(ActivityEvent.ON_FLY_RANK_UPDATE);
        }

        public getRankProp(actInfo: oper_act_item): number {
            return actInfo && actInfo.param ? actInfo.param[1] : 0;//进阶丹
        }

        //获取巅峰奖励所需积分
        //条件1：奖励类型，条件2：名次，条件3：巅峰积分
        public getTopScore(actInfo: oper_act_item): number {
            let rewardList = actInfo.reward_list;
            for(let reward of rewardList){
                if(!this.isReward(reward, FlyRankRewardType.Top)){
                    continue;
                }
                let score = reward.cond_3 && reward.cond_3[0];
                if(score){
                    return score;
                }
            }
            return 0;
        }
        //根据排名获取巅峰奖励
        public getTopRewards(actInfo: oper_act_item, curRank: number, maxRank: number): prop_tips_data[] {
            let rewardList = actInfo.reward_list;
            let topMaxRank = 0;//巅峰奖励配置的最大名次
            let topMaxReward: prop_tips_data[] = [];//巅峰奖励配置的最大名次奖励
            for(let i = 0; i < rewardList.length; ++i){
                let reward = rewardList[i];
                if(!this.isReward(reward, FlyRankRewardType.Top)){
                    continue;
                }
                let rank = this.getRank(reward);
                if(curRank == rank){
                    return reward.rewards;//取当前奖励
                }
                else if(curRank < rank){
                    return rewardList[i - 1].rewards;//取上一个奖励
                }
                if(rank > topMaxRank){
                    topMaxRank = rank;
                    topMaxReward = reward.rewards;
                }
            }
            if(curRank > maxRank && topMaxRank >= curRank){
                return topMaxReward;//取最大奖励
            }
            return [];
        }
        //配置51的话，取50，显示成50+
        public getMaxRank(actInfo: oper_act_item): number {
            let maxRank = 0;
            let rewardList = actInfo.reward_list;
            for(let reward of rewardList){
                if(!this.isReward(reward)){
                    continue;
                }
                let rank = this.getRank(reward);
                if(rank > maxRank){
                    maxRank = rank;
                }
            }
            return maxRank - 1;
        }

        //传4进来,配置了4、11的话，返回10
        public getNextRank(actInfo: oper_act_item, curRank: number): number {
            let rewardList = actInfo.reward_list;
            for(let reward of rewardList){
                if(!this.isReward(reward)){
                    continue;
                }
                let rank = this.getRank(reward);
                if(rank > curRank){
                    return rank - 1;
                }
            }
            return curRank;
        }

        //排名奖励列表
        public getRewardList(actInfo: oper_act_item): act_reward[] {
            let rewardList = actInfo.reward_list;
            let rewards: act_reward[] = [];
            for(let reward of rewardList){
                if(!this.isReward(reward)){
                    continue;
                }
                rewards.push(reward);
            }
            return rewards;
        }

        //是否对应类型的奖励，条件1：奖励类型
        private isReward(reward: act_reward, type: number = FlyRankRewardType.Rank): boolean {
            return reward.cond_1 && reward.cond_1[0] == type;
        }

        //条件2：名次
        private getRank(reward: act_reward): number {
            return reward.cond_2 && reward.cond_2[0];
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

        //榜一名字
        public getFirstRankName(actInfo: oper_act_item): string {
            let topInfo = this.getRankInfo(actInfo.act_id, 1);
            return topInfo && topInfo.name ? topInfo.name : getLanById(LanDef.tishi_2);
        }

        //更新排行榜红点，todo：需要注意的
        private updateRankHint(): void {
            let _proxy: ActivityProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            _proxy.setActHint(ActivityType.FlyRank, Handler.alloc(this, this.getRankHint));
        }

        private getRankHint(actInfo: oper_act_item): boolean {
            return this.canDraw(actInfo.act_id);
        }
        /********************************飞升礼包****************************************/
        public c2s_activity_feishen_gift_info(actId: number, index: number): void {
            let msg: c2s_activity_feishen_gift_info = new c2s_activity_feishen_gift_info();
            msg.act_id = actId;
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_activity_feishen_gift_info(n: GameNT): void {
            let msg: s2c_activity_feishen_gift_info = n.body;
            if (!msg || !msg.act_id) {
                return;
            }
            this._model.giftList[msg.act_id] = msg.list || [];//直接做数据覆盖，服务端跨天会清数据
            // if(!this._model.giftList[msg.act_id]){
            //     this._model.giftList[msg.act_id] = msg.list;
            // }
            // else {
            //     for(let info of msg.list){
            //         let pos = this.getInfoPos(msg.act_id, info.index);
            //         if(pos >= 0){
            //             this._model.giftList[msg.act_id][pos] = info;
            //         }
            //         else {
            //             this._model.giftList[msg.act_id].push(info);
            //         }
            //     }
            // }
            this.updateGiftHint();
            this.sendNt(ActivityEvent.ON_FLY_RANK_UPDATE_GIFT);
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
            _proxy.setActHint(ActivityType.FlyGift, Handler.alloc(this, this.getGiftHint));
        }

        private getGiftHint(actInfo: oper_act_item): boolean {
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
        /********************************飞升返利****************************************/
        public c2s_activity_feishen_score_get_rewards(actId: number, index: number): void {
            let msg: c2s_activity_feishen_score_get_rewards = new c2s_activity_feishen_score_get_rewards();
            msg.act_id = actId;
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_activity_feishen_score_rewards_info(n: GameNT): void {
            let msg: s2c_activity_feishen_score_rewards_info = n.body;
            if (!msg || !msg.act_id) {
                return;
            }
            if(msg.score != undefined){
                this._model.scoreList[msg.act_id] = msg.score;
            }
            this._model.indexList[msg.act_id] = msg.indexs || [];
            if(msg.loop_num != undefined){
                this._model.loopNumList[msg.act_id] = msg.loop_num;
            }
            this.updateRebateHint();
            this.sendNt(ActivityEvent.ON_FLY_RANK_UPDATE_REBATE);
        }

        public getScore(actId: number): number {
            if(!this._model.scoreList[actId]){
                return 0;
            }
            return this._model.scoreList[actId].toNumber();
        }

        public getLoopNum(actId: number): number {
            if(!this._model.loopNumList[actId]){
                return 0;
            }
            return this._model.loopNumList[actId];
        }

        public hasRebateDraw(actId: number, reward: act_reward): boolean {
            if(!this._model.indexList[actId]){
                return false;
            }
            let indexList = this._model.indexList[actId];
            return indexList.indexOf(reward.index) > -1;
        }

        public canRebateDraw(actId: number, reward: act_reward): boolean {
            if(this.hasRebateDraw(actId, reward)){
                return false;
            }
            let score = this.getScore(actId);
            //条件1：积分
            let limitScore = reward.cond_1 && reward.cond_1[0] || 0;
            return score >= limitScore;
        }

        //更新返利红点
        private updateRebateHint(): void {
            let _proxy: ActivityProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            _proxy.setActHint(ActivityType.FlyRebate, Handler.alloc(this, this.getRebateHint));
        }

        private getRebateHint(actInfo: oper_act_item): boolean {
            let rewardList = actInfo.reward_list;
            for(let reward of rewardList){
                if(this.canRebateDraw(actInfo.act_id, reward)){
                    return true;
                }
            }
            return false;
        }
        /********************************飞升特惠****************************************/
        public c2s_activity_feishen_gameorder_get_rewards(actId: number): void {
            let msg: c2s_activity_feishen_gameorder_get_rewards = new c2s_activity_feishen_gameorder_get_rewards();
            msg.act_id = actId;
            this.sendProto(msg);
        }

        private s2c_activity_feishen_gameorder_info(n: GameNT): void {
            let msg: s2c_activity_feishen_gameorder_info = n.body;
            if (!msg || !msg.act_id) {
                return;
            }
            if(msg.index1 != undefined){
                this._model.warIndex1[msg.act_id] = msg.index1;
            }
            if(msg.index2 != undefined){
                this._model.warIndex2[msg.act_id] = msg.index2;
            }
            if(msg.is_buy != undefined){
                this._model.warIsBuy[msg.act_id] = msg.is_buy;
            }
            this.updateWarHint();
            this.sendNt(ActivityEvent.ON_FLY_RANK_UPDATE_WAR);
        }

        public hasWarBuy(actId: number): boolean {
            if(!this._model.warIsBuy[actId]){
                return false;
            }
            return this._model.warIsBuy[actId] == 1;//1已购买
        }

        public getWarIndex1(actId: number): number {
            if(!this._model.warIndex1[actId]){
                return 0;
            }
            return this._model.warIndex1[actId];
        }

        public hasWarDraw1(actId: number, index: number): boolean {
            if(!this._model.warIndex1[actId]){
                return false;
            }
            return this._model.warIndex1[actId] >= index;
        }

        public hasWarDraw2(actId: number, index: number): boolean {
            if(!this._model.warIndex2[actId]){
                return false;
            }
            return this._model.warIndex2[actId] >= index;
        }

        public canWarDraw1(actId: number, reward: act_reward): boolean {
            if(this.hasWarDraw1(actId, reward.index)){
                return false;
            }
            //条件1：奖励类型，条件2：所需经验
            return this.checkExpEnough(reward);
        }

        public canWarDraw2(actId: number, reward: act_reward): boolean {
            if(!this.hasWarBuy(actId)){
                return false;
            }
            if(this.hasWarDraw2(actId, reward.index)){
                return false;
            }
            return this.checkExpEnough(reward);
        }

        private checkExpEnough(reward: act_reward): boolean {
            let limitExp = this.getLimitExp(reward);
            let curExp = BagUtil.getPropCntByIdx(PropIndex.Feishengjingyanzhi);
            return curExp >= limitExp;
        }

        //普通奖励列表
        public getNormalRewardList(actInfo: oper_act_item): act_reward[] {
            let rewardList = actInfo.reward_list;
            let rewards: act_reward[] = [];
            for(let reward of rewardList){
                if(!this.isNormalReward(reward)){
                    continue;
                }
                rewards.push(reward);
            }
            return rewards;
        }

        //战令奖励列表
        public getWarRewardList(actInfo: oper_act_item): act_reward[] {
            let rewardList = actInfo.reward_list;
            let rewards: act_reward[] = [];
            for(let reward of rewardList){
                if(this.isNormalReward(reward)){
                    continue;
                }
                rewards.push(reward);
            }
            return rewards;
        }

        private getNormalReward(actInfo: oper_act_item, index: number): act_reward {
            let rewardList = this.getNormalRewardList(actInfo);
            for(let reward of rewardList){
                if(reward.index == index){
                    return reward;
                }
            }
            return null;
        }

        public getWarRewardByNormalIndex(actInfo: oper_act_item, index: number): act_reward {
            //index是普通奖励的index
            let normalReward = this.getNormalReward(actInfo, index);
            let normalExp = this.getLimitExp(normalReward);
            let rewardList = this.getWarRewardList(actInfo);
            for(let reward of rewardList){
                let warExp = this.getLimitExp(reward);
                if(normalExp == warExp){
                    return reward;
                }
            }
            return null;
        }

        //是否对应类型的奖励，条件1：奖励类型
        private isNormalReward(reward: act_reward): boolean {
            return reward.cond_1 && reward.cond_1[0] == FlyWarRewardType.Normal;
        }
        //条件2：所需经验
        public getLimitExp(reward: act_reward): number {
            return reward && reward.cond_2 && reward.cond_2[0] || 0;
        }
        //条件3：奖励展示节点
        public isWarShow(reward: act_reward): boolean {
            return reward && reward.cond_3 && reward.cond_3.length && !!reward.cond_3[0];
        }

        //更新飞升特惠红点
        private updateWarHint(): void {
            let _proxy: ActivityProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            _proxy.setActHint(ActivityType.FlyWar, Handler.alloc(this, this.getWarHint));
        }

        private getWarHint(actInfo: oper_act_item): boolean {
            if(this.getWarRewardHint(actInfo)){
                return true;
            }
            return TaskUtil.getTaskHint(TaskType.Fly);
        }

        public getWarRewardHint(actInfo: oper_act_item): boolean {
            let rewardList = this.getNormalRewardList(actInfo);
            for(let reward of rewardList){
                if(this.canWarDraw1(actInfo.act_id, reward)){
                    return true;
                }
                let rewardInfo = this.getWarRewardByNormalIndex(actInfo, reward.index);//进阶奖励
                if(this.canWarDraw2(actInfo.act_id, rewardInfo)){
                    return true;
                }
            }
            return false;
        }

        protected onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.diamond) >= 0) {
                /**写死仙玉变更时候刷新，需要其他道具时再做支持*/
                this.updateGiftHint();
            }
            if (keys.indexOf(RolePropertyKey.feisheng_exp) >= 0) {
                this.updateWarHint();
            }
        }

        protected onTaskHint(n: base.GameNT): void {
            let types: number[] = n.body;
            let type = TaskType.Fly;
            if(types.indexOf(type) < 0){
                return;
            }
            this.updateWarHint();
        }
    }
}