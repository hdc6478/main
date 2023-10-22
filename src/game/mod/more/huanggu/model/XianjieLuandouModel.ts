namespace game.mod.more {

    import s2c_xianjie_pvp_kill_boss_info = msg.s2c_xianjie_pvp_kill_boss_info;
    import s2c_xianjie_pvp_scene_info = msg.s2c_xianjie_pvp_scene_info;
    import XianjiebrawlBaseConfig = game.config.XianjiebrawlBaseConfig;

    export class XianjieLuandouModel {
        /** 副本状态 1开启 2关闭 3冷却时间未到 */
        public state: number;
        /** 剩余cd时间 */
        public cd_sec: number;
        /** 是否首次开启 1是 2否 */
        public is_first_open: number;

        /** 全排名 */
        public rank: msg.teammate[];
        /** 玩家排名 */
        public my_rank: msg.teammate;

        /** 榜单顺序排名 */
        public scene_rank: msg.xianjie_pvp_scene_score_info[];
        /** 玩家排名 */
        public scene_my_rank: msg.xianjie_pvp_scene_score_info;

        /** 已领取的积分奖励列表 */
        public index: number[];

        /** boss血量信息 */
        public boss_list: { [index: number]: msg.xianjie_pvp_boss_info } = {};
        /** 中央灵石boss归属者信息 */
        public owner_info: msg.teammate;

        /** 战报 */
        public report_list: msg.xianjie_pvp_battle_report[];

        //击破灵石提示
        public kill_boss_info: s2c_xianjie_pvp_kill_boss_info;
        public pvp_scene_info: s2c_xianjie_pvp_scene_info;

        //技能使用cd
        public skill_cds: { [index: number]: msg.xianjie_luandou_scene_buff_index_cd } = {};


        //战场统计选中的类型，默认个人
        public sel_scene_rank: RankCommonType2 = RankCommonType2.Person;

        //怪物配置列表，灵石类型1在中间（2,3,1,4,5）
        public bossCfgList: XianjiebrawlBaseConfig[] = null;
        //怪物id列表
        public bossIdxList: number[] = null;

        //红点路径
        public hintPath: string[] = [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Hundun, MoreViewType.XianjieLuandouMain, XianjieLuandouMainBtnType.Btn1];
    }

}