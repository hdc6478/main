namespace game.mod.activity {

    import act_reward = msg.act_reward;
    import activity_kuanghuan_gift_info = msg.activity_kuanghuan_gift_info;
    import teammate = msg.teammate;

    export class CarnivalModel {
        public mibaoList: {[actId: number]: number[]} = {};//秘宝已领取的奖励
        public giftList: {[actId: number]: activity_kuanghuan_gift_info[]} = {};

        public scoreList: {[actId: number]: number} = {};
        public indexList: {[actId: number]: number[]} = {};
        public loopNumList: {[actId: number]: number} = {};

        public zhaohuanScoreList: {[actId: number]: number} = {};
        public zhaohuanIndexList: {[actId: number]: number[]} = {};

        public rankList: {[actId: number]: teammate[]} = {};
        public myData: {[actId: number]: teammate} = {};
        public rewardStatus: {[actId: number]: number} = {};//1未领取   2已领取
        public lastRankList: {[actId: number]: teammate[]} = {};
        public lastMyData: {[actId: number]: teammate} = {};

        public clear(): void {
            this.mibaoList = {};
            this.giftList = {};
            this.scoreList = {};
            this.indexList = {};
            this.loopNumList = {};
            this.zhaohuanScoreList = {};
            this.zhaohuanIndexList = {};
            this.rankList = {};
            this.myData = {};
            this.rewardStatus = {};
            this.lastRankList = {};
            this.lastMyData = {};
        }
    }
    export interface CarnivalMibaoData {
        reward: act_reward,
        hasDraw: boolean,
        canDraw: boolean,
        hasLastDarw: boolean,
        isBig: boolean
    }
}
