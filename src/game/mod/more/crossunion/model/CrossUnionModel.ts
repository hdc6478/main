namespace game.mod.more {

    import teammate = msg.teammate;
    import guild_pk_skill = msg.guild_pk_skill;
    import guild_pk_buff_data = msg.guild_pk_buff_data;
    import guild_pk_dead_data = msg.guild_pk_dead_data;
    import s2c_guild_pk_fight_show = msg.s2c_guild_pk_fight_show;

    export class CrossUnionModel {

        /**是否报名 */
        is_join: boolean = false;
        /**胜负奖励 1.可领取2.已领取(胜败奖励) */
        status: number = 0;
        /**战斗结果 1.成功2.失败(战斗结果) */
        ret: number = 0;
        /**是否你宗门在本次参加 */
        is_guild_join: boolean;

        /**仙宗数据 */
        my_base: msg.guild_pk_base;
        /**敌对仙宗数据 */
        target_base: msg.guild_pk_base;

        /**敌方队伍数据 */
        list_emeny: Map<number, Map<number, teammate>> = new Map();
        /**队伍数据 用于滑动列表展示外显 */
        list: Map<number, Map<number, teammate>> = new Map();
        /**队伍数据 用于调整阵型 */
        team_list: Map<number, msg.guild_pk_lineup_base> = new Map();

        zhanbao: msg.guild_pk_zhanbao[];

        /**开启日期 */
        // public readonly openDays: number[] = [3, 6];
        /**开启时间 */
        public readonly openHours: number = 20;

        /**更换队伍顺序选中的role_id */
        public select: number | Long;
        /**选择阵营 1本方2敌方 */
        public camp: number = 0;

        public guild_pk_win_rewar: number[][];
        public guild_pk_lose: number[][];
        public guild_pk_show: number[][];
        public guild_pk_see_reward: number[][];

        public guild_pk_open: number[][];
        public guild_mate_time: number[];

        public fight_infos: Map<number, s2c_guild_pk_fight_show> = new Map();

        /**-------------------战斗--------------------- */

        /**观战奖励状态:0未达成1可领取2已领取 */
        public reward_status: number;
        /**观战可领取的次数 */
        public reward_num: number;

        public fight_list: Map<number, teammate> = new Map();
        public skill_cd_list: guild_pk_skill[] = [];

        public fight_step: CUFightData[] = [];

        /**-------------------战斗--------------------- */
    }

    export interface CUFightData {
        /**技能类型 无则普通对线 */
        type?: number,
        /**扣血详情 */
        list?: guild_pk_buff_data[],
        /**是否死亡替换角色 */
        is_dead?: boolean,
        /**死亡替换列表 */
        list_dead?: guild_pk_dead_data[]
    }

}