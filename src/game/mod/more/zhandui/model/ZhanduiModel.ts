namespace game.mod.more {

    export class ZhanduiModel {
        /** 战队id */
        public team_id: Long;

        /** 战队名称 */
        public team_name: string = '';

        /** 战队等级 */
        public team_level: number = 0;

        /** 战队成员（顺序1234，第一个为队长，其余成员依照加入时间顺延） */
        public team_roles: msg.teammate[] = [];

        /** 玩家申请列表 */
        public role_apply_list: msg.teammate[] = [];

        /** 战队每日奖励 当天是否可以领取  1可领取   2已领取 */
        public today_is_get: number = 0;

        /** 已创建的战队数量 */
        public total_team_count: number = 0;

        /** 进入要求的最低战力（0为不限制） */
        public limit_showpower: number = 0;

        /** 是否需要审核 true为需要   false为不需要 */
        public is_check_apply: boolean = false;

        /** 是否需要限制战力 true为需要   false为不需要 */
        public is_check_power: boolean = false;

        /** 已购买的旗帜 */
        public flag_list: number[] = [];

        /**当前使用的旗帜*/
        public flag_index: number = 0;

        /**累计活跃度*/
        public team_point: number = 0;

        /** 加入战队的时间 */
        public join_time: Long;

        /** 仙纪功绩 */
        public strs1: string[] = [];

        /** 仙纪事件 */
        public strs2: string[] = [];

        /** 可以申请的战队列表 */
        public can_apply_list: msg.zhandui_can_apply_struct[] = [];

        //退出队伍，清空数据
        public exitTeam(): void {
            this.team_id = null;
            this.team_name = '';
            this.team_level = 0;
            this.team_roles = [];
            this.role_apply_list = [];
            this.today_is_get = 0;
            this.total_team_count = 0;
            this.limit_showpower = null;
            this.is_check_apply = false;
            this.is_check_power = false;
            this.flag_list = [];
            this.can_apply_list = [];
            this.join_time = null;

            HintMgr.setHint(false, this.applyHintPath);
            HintMgr.setHint(false, this.rewardHintPath);
        }

        public applyHintPath: string[] = [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, 'apply'];
        public rewardHintPath: string[] = [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MdrTabBtnType.TabBtnType01];
    }

}