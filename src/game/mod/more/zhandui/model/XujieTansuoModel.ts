namespace game.mod.more {

    import s2c_zhandui_kuanmai_pvp_ret = msg.s2c_zhandui_kuanmai_pvp_ret;

    export class XujieTansuoModel {
        /** 当前参与搜索的战队数量 */
        public team_count: number = 0;

        // /** 区域层数据 */
        // public map_datas: msg.xujietansuo_struct = null;
        // /**区域 数据缓存*/
        // public map_datas_map: { [type: number]: msg.xujietansuo_struct } = {};

        /**区域-层 数据缓存*/
        public map_layer_datas_map: { [type: number]: { [layer: number]: msg.xujietansuo_struct } } = {};

        /** 战利品记录 */
        public rewards_records: msg.xujietansuo_challenge_records[] = [];

        /** 探索最新进度的区域 */
        public now_map_index: number;

        /** 探索最新进度区域的层数 */
        public now_layer: number;

        /**正在远征格子的数据*/
        public expedition_info: msg.s2c_zhandui_xujietansuo_single_grid;

        /**阵容军团列表*/
        public legion_list: { [type: number]: msg.zhandui_legion_type_struct } = {};

        /** 军团属性 */
        public legion_attrs: msg.zhandui_legion_attribute;

        /** 战队探索排名 */
        public tansuo_ranks: msg.zhandui_legion_rank_struct[];

        /** 玩家所属战队数据 */
        public my_team_rank: msg.zhandui_legion_rank_struct;

        /** 战斗记录 */
        public round_records: msg.zhandui_battle_round_struct[];
        /** 我方信息 */
        public myself_info: msg.teammate;
        /** 怪物id    （对手是怪物则有该字段） */
        public boss_id: Long;
        /** 敌方玩家信息（对手是玩家则有该字段） */
        public target_info: msg.teammate;

        /**回合制结算数据*/
        public result_info: msg.s2c_zhandui_legion_result_info;

        //探索区域红点
        public hintPath1: string[] = [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.XujieTansuoMain, XujieTansuoMainBtnType.Btn1];
        //探索令红点
        public hintPath2: string[] = [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.XujieTansuoMain, XujieTansuoMainBtnType.Btn2];
        //探索层数红点
        public layerHintPath: string[] = [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.XujieTansuoMain, XujieTansuoMainBtnType.Btn1, MdrTabBtnType.TabBtnType01];

        public exitTeam(): void {
            this.team_count = 0;
            this.map_layer_datas_map = {};
            this.rewards_records = [];
            this.now_map_index = null;
            this.now_layer = null;
            this.expedition_info = null;
            this.legion_list = {};
            this.legion_attrs = null;
            this.tansuo_ranks = null;
            this.my_team_rank = null;
            this.round_records = null;
            this.myself_info = null;
            this.boss_id = null;
            this.target_info = null;

            HintMgr.setHint(false, this.hintPath1);
            HintMgr.setHint(false, this.hintPath2);
            HintMgr.setHint(false, this.layerHintPath);
        }

        public msg: s2c_zhandui_kuanmai_pvp_ret;

        //当前点击探索的区域
        public seledArea: number;
    }

}