namespace game.mod.activity {

    export class SignGiftModel {
        /**签到的索引集合*/
        public list: number[] = [];
        /**当前可签到的索引*/
        public index: number = 0;
        /**已总共签到的天数*/
        public count: number = 0;
    }

}