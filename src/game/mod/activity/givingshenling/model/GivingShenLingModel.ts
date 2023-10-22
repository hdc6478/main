namespace game.mod.activity {


    export class GivingShenLingModel {
        /**在线时间 */
        public online_time: number = 0;
        /**登录时间 */
        public login_time: number = 0;
        /**领取状态`1可领取 2已领取 */
        public receive: number = 0;

        public isClick: boolean = false;
    }
}
