namespace game.mod.activity {

    import DemonRewardConfig = game.config.DemonRewardConfig;
    import demon_reward_info = msg.demon_reward_info;

    export class KillBossModel {
        /**tab的index 调用getTypeByIndex拿到类型 */
        public tabIdx: number = 0;
        /**选中的bossindex */
        public bossIndex: number = 0;
        /**活动数据列表 */
        public list: demon_reward_info[] = [];

        /**是否已经初始化配置 */
        public initMap: boolean = false;
        /**根据类型保存boss表 */
        public cfgBossMap: { [type: number]: DemonRewardConfig[] } = {};
        /**根据类型保存boss开启条件 */
        public openMap: { [type: number]: number[] } = {};
        /**保存类型列表 */
        public typeList: number[] = [];
    }
}
