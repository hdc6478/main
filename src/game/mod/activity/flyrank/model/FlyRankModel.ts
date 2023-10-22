namespace game.mod.activity {

    import teammate = msg.teammate;
    import activity_feishen_gift_struct = msg.activity_feishen_gift_struct;
    import act_reward = msg.act_reward;

    export class FlyRankModel {
        public rankList: {[actId: number]: teammate[]} = {};
        public myData: {[actId: number]: teammate} = {};
        public rewardStatus: {[actId: number]: number} = {};//1未领取   2已领取
        public lastRankList: {[actId: number]: teammate[]} = {};
        public lastMyData: {[actId: number]: teammate} = {};

        /**************飞升礼包***************/
        public giftList: {[actId: number]: activity_feishen_gift_struct[]} = {};

        /**************飞升返利***************/
        public scoreList: {[actId: number]: Long} = {};
        public indexList: {[actId: number]: number[]} = {};
        public loopNumList: {[actId: number]: number} = {};

        /**************飞升令***************/
        public warIndex1: {[actId: number]: number} = {};////战令普通奖励已领取最高索引（飞升战令）
        public warIndex2: {[actId: number]: number} = {};////战令充值奖励已领取的最高索引（飞升战令）
        public warIsBuy: {[actId: number]: number} = {};//0未购买   1已购买

        public clear(): void {
            this.rankList = {};
            this.myData = {};
            this.rewardStatus = {};
            this.lastRankList = {};
            this.lastMyData = {};
            this.giftList = {};
            this.scoreList = {};
            this.indexList = {};
            this.loopNumList = {};
            this.warIndex1 = {};
            this.warIndex2 = {};
            this.warIsBuy = {};
        }
    }
}
