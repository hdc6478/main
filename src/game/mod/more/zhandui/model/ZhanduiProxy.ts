namespace game.mod.more {

    import ZhanduiQizhiConfig = game.config.ZhanduiQizhiConfig;
    import c2s_zhandui_button_click = msg.c2s_zhandui_button_click;
    import c2s_zhandui_get_day_rewards = msg.c2s_zhandui_get_day_rewards;
    import s2c_zhandui_base_info = msg.s2c_zhandui_base_info;
    import s2c_zhandui_apply_list = msg.s2c_zhandui_apply_list;
    import s2c_zhandui_team_role_apply_list = msg.s2c_zhandui_team_role_apply_list;
    import s2c_zhandui_get_thing_records = msg.s2c_zhandui_get_thing_records;
    import GameNT = base.GameNT;
    import zhandui_can_apply_struct = msg.zhandui_can_apply_struct;
    import teammate = msg.teammate;
    import ZhanduiDengjiConfig = game.config.ZhanduiDengjiConfig;

    /**
     * @description 战队系统
     */
    export class ZhanduiProxy extends ProxyBase implements IZhanduiProxy {
        private _model: ZhanduiModel;

        initialize(): void {
            super.initialize();
            this._model = new ZhanduiModel();
            this.onProto(s2c_zhandui_base_info, this.s2c_zhandui_base_info, this);
            this.onProto(s2c_zhandui_apply_list, this.s2c_zhandui_apply_list, this);
            this.onProto(s2c_zhandui_team_role_apply_list, this.s2c_zhandui_team_role_apply_list, this);
            this.onProto(s2c_zhandui_get_thing_records, this.s2c_zhandui_get_thing_records, this);
        }

        /**
         * 1为创建战队
         * @param flagIndex
         * @param teamName
         */
        public sendButtonClickCreate(flagIndex: number, teamName: string): void {
            this.c2s_zhandui_button_click(ZhanduiOperType.Oper1, flagIndex, null, teamName);
        }

        /**
         * 2为购买战队旗帜
         * 8战队使用旗帜（仅队长）
         * @param type
         * @param flagIndex 旗帜
         */
        public sendButtonClickQizhi(type: ZhanduiOperType, flagIndex: number): void {
            this.c2s_zhandui_button_click(type, flagIndex);
        }

        /**
         * 4申请加入
         * @param teamId
         */
        public sendButtonClickTeamId(teamId: Long): void {
            this.c2s_zhandui_button_click(ZhanduiOperType.Oper4, null, teamId);
        }

        /**
         * 6搜索战队
         * 7战队改名（仅队长）
         * @param type
         * @param teamName
         */
        public sendButtonClickTeamname(type: ZhanduiOperType, teamName: string): void {
            this.c2s_zhandui_button_click(type, null, null, teamName);
        }

        /**
         * 12转移队长（仅队长）
         * 13踢出战队（仅队长）
         * @param type
         * @param roleId
         */
        public sendButtonClickRoleId(type: ZhanduiOperType, roleId: Long): void {
            this.c2s_zhandui_button_click(type, null, null, null, roleId);
        }

        /**
         * 10操作申请人员（仅队长）
         * @param roleId
         * @param isPass 0为拒绝申请  1为同意申请
         */
        public sendButtonClickIspass(roleId: Long, isPass: number): void {
            this.c2s_zhandui_button_click(ZhanduiOperType.Oper10, null, null, null, roleId, isPass);

            for (let i = 0; i < this._model.role_apply_list.length; i++) {
                let item = this._model.role_apply_list[i];
                if (item && item.role_id.eq(roleId)) {
                    this._model.role_apply_list.splice(i, 1);
                    break;
                }
            }
            this.updateHint();
            this.sendNt(MoreEvent.ON_UPDATE_ZHANDUI_TEAM_ROLE_APPLY_LIST_INFO);
        }

        /**
         * 3请求战队列表，默认最多10个战队数据（用于查看可以加入哪些战队）
         * 5刷新战队列表
         * 9请求申请列表（仅队长）
         * 11发送招募聊天
         * 14玩家自己退出战队
         * 16设置申请审核（仅队长)
         * 17请求仙纪功绩
         * 18请求仙纪事件
         * 100 请求战队数据
         * @param type
         */
        public sendButtonClick(type: ZhanduiOperType): void {
            this.c2s_zhandui_button_click(type);
        }

        /**
         * 15设置进入战力条件（仅队长）
         * @param power
         */
        public sendButtonClickPower(power?: number): void {
            this.c2s_zhandui_button_click(ZhanduiOperType.Oper15, null, null, null, null, null, power);
        }

        /**
         * 战队操作 请使用上面的 sendButtonClick函数，不要外部调用这个
         * button_type字段备注
         *      1为创建战队
         *      2为购买战队旗帜
         *      3请求战队列表，默认最多10个战队数据（用于查看可以加入哪些战队）
         *      4申请加入
         *      5刷新战队列表
         *      6搜索战队
         *      7战队改名（仅队长）
         *      8战队使用旗帜（仅队长）
         *      9请求申请列表（仅队长）
         *      10操作申请人员（仅队长）
         *      11发送招募聊天
         *      12转移队长（仅队长）
         *      13踢出战队（仅队长）
         *      14玩家自己退出战队
         *      15设置进入要求的最低战力
         *      16设置申请审核（仅队长)
         *      17请求仙纪功绩
         *      18请求仙纪事件
         *      100 请求战队数据
         * @param type
         * @param index 旗帜索引（1创建战队、2购买战队、8旗帜使用旗帜需要)
         * @param teamId 战队id（4申请加入战队需要）
         * @param teamName 战队名称（6搜索战队  7战队改名需要)
         * @param roleId 10操作申请人员、12转移队长、13踢出战队 需要
         * @param isPass 0为拒绝申请  1为同意申请 10
         * @param setPower 15设置进入要求的最低战力
         * @private
         */
        private c2s_zhandui_button_click(type: ZhanduiOperType, index?: number, teamId?: Long, teamName?: string,
                                         roleId?: Long, isPass?: number, setPower?: number): void {
            let msg = new c2s_zhandui_button_click();
            msg.button_type = type;
            if (index) {
                msg.index = index;
            }
            if (teamId) {
                msg.team_id = teamId;
            }
            if (teamName) {
                msg.team_name = teamName;
            }
            if (roleId) {
                msg.role_id = roleId;
            }
            if (isPass != null) {
                msg.is_pass = isPass;
            }
            if (setPower) {
                msg.set_showpower = Long.fromNumber(setPower);
            }
            this.sendProto(msg);
        }

        /// 战队每日奖励领取
        public c2s_zhandui_get_day_rewards(): void {
            let msg = new c2s_zhandui_get_day_rewards();
            this.sendProto(msg);
        }

        /// 战队信息
        private s2c_zhandui_base_info(n: GameNT): void {
            let msg = n.body as s2c_zhandui_base_info;
            if (msg.team_id != null) {
                this._model.team_id = msg.team_id;
            }
            //退出队伍，清空数据
            if (msg.team_id != null && msg.team_id.eq(Long.ZERO)) {
                this.doExitTeam();

                this.sendNt(MoreEvent.ON_EXIT_ZHANDUI_TEAM);//退出战队抛出事件
            }
            if (msg.team_name != null) {
                this._model.team_name = msg.team_name;
            }
            if (msg.team_level != null) {
                this._model.team_level = msg.team_level;
            }
            if (msg.team_roles != null) {
                this._model.team_roles = msg.team_roles;
            }
            if (msg.today_is_get != null) {
                this._model.today_is_get = msg.today_is_get;
            }
            if (msg.total_team_count != null) {
                this._model.total_team_count = msg.total_team_count;
            }
            if (msg.is_check_apply != null) {
                this._model.is_check_apply = msg.is_check_apply;
            }
            if (msg.is_check_power != null) {
                this._model.is_check_power = msg.is_check_power;
            }
            if (msg.limit_showpower != null) {
                this._model.limit_showpower = msg.limit_showpower.toNumber();
            }
            if (msg.flag_list != null) {
                this._model.flag_list = msg.flag_list;
            }
            if (msg.flag_index != null) {
                this._model.flag_index = msg.flag_index;
            }
            if (msg.team_point != null) {
                this._model.team_point = msg.team_point;
            }
            if (msg.join_time != null) {
                this._model.join_time = msg.join_time;
            }
            this.updateHint();
            this.sendNt(MoreEvent.ON_UPDATE_ZHANDUI_BASE_INFO);
        }

        /// 可以申请的战队列表
        private s2c_zhandui_apply_list(n: GameNT): void {
            let msg = n.body as s2c_zhandui_apply_list;
            if (msg.can_apply_list != null) {
                this._model.can_apply_list = msg.can_apply_list;
            }
            this.sendNt(MoreEvent.ON_UPDATE_ZHANDUI_APPLY_LIST_INFO);
        }

        ///向该战队发了申请的 玩家申请列表
        private s2c_zhandui_team_role_apply_list(n: GameNT): void {
            let msg = n.body as s2c_zhandui_team_role_apply_list;
            if (msg.role_apply_list != null) {
                this._model.role_apply_list = msg.role_apply_list;
            } else {
                this._model.role_apply_list = [];
            }
            this.updateHint();
            this.sendNt(MoreEvent.ON_UPDATE_ZHANDUI_TEAM_ROLE_APPLY_LIST_INFO);
        }

        private s2c_zhandui_get_thing_records(n: GameNT): void {
            let msg = n.body as s2c_zhandui_get_thing_records;
            if (msg.strs1 != null) {
                this._model.strs1 = msg.strs1;
            }
            if (msg.strs2 != null) {
                this._model.strs2 = msg.strs2;
            }
            this.sendNt(MoreEvent.ON_UPDATE_ZHANDUI_RECORDS);
        }

        //退出战队数据清理
        private doExitTeam(): void {
            this._model.exitTeam();

            let xujiejitanProxy: XujieJitanProxy = getProxy(ModName.More, ProxyType.XujieJitan);
            if (xujiejitanProxy) {
                xujiejitanProxy.onExitZhanduiTeam();
            }

            let xujietansuoProxy: XujieTansuoProxy = getProxy(ModName.More, ProxyType.XujieTansuo);
            if (xujietansuoProxy) {
                xujietansuoProxy.onExitZhanduiTeam();
            }

            let miningProxy: MiningProxy = getProxy(ModName.More, ProxyType.Mining);
            if (miningProxy) {
                miningProxy.onExitZhanduiTeam();
            }
        }

        /**================================= 协议end =================================*/

        //战队旗帜，创建
        public getQizhiCfgList(): ZhanduiQizhiConfig[] {
            let cfgList: ZhanduiQizhiConfig[] = getConfigListByName(ConfigName.ZhanduiQizhi);
            let list: ZhanduiQizhiConfig[] = [];
            for (let cfg of cfgList) {
                if (cfg && !cfg.cond && !cfg.costs) {
                    list.push(cfg);
                }
            }
            return list;
        }

        //等级配置
        public getLevelCfg(lv: number): ZhanduiDengjiConfig {
            return getConfigByNameId(ConfigName.ZhanduiDengji, lv);
        }

        //已创建的战队数量
        public get total_team_count(): number {
            return this._model.total_team_count;
        }

        //可以申请的战队列表
        public get can_apply_list(): zhandui_can_apply_struct[] {
            return this._model.can_apply_list;
        }

        //战队名称
        public get team_name(): string {
            return this._model.team_name;
        }

        //战队等级
        public get team_level(): number {
            return this._model.team_level;
        }

        //战队成员
        public get team_roles(): teammate[] {
            return this._model.team_roles;
        }

        //玩家申请列表
        public get role_apply_list(): teammate[] {
            return this._model.role_apply_list;
        }

        // 进入要求的最低战力（0为不限制）
        public get limit_showpower(): number {
            return this._model.limit_showpower;
        }

        public set limit_showpower(power: number) {
            this._model.limit_showpower = power;
        }

        //是否需要审核 true为需要   false为不需要
        public get is_check_apply(): boolean {
            return this._model.is_check_apply;
        }

        public set is_check_apply(bool: boolean) {
            this._model.is_check_apply = bool;
        }

        //是否需要限制战力 true为需要   false为不需要
        public get is_check_power(): boolean {
            return this._model.is_check_power;
        }

        public set is_check_power(bool: boolean) {
            this._model.is_check_power = bool;
        }

        //当前使用的旗帜
        public get flag_index(): number {
            return this._model.flag_index;
        }

        public get flag_list(): number[] {
            return this._model.flag_list;
        }

        public get team_point(): number {
            return this._model.team_point;
        }

        public get join_time(): number {
            let joinTime = this._model.join_time;
            if (joinTime && joinTime.notEquals(Long.ZERO)) {
                return joinTime.toNumber();
            }
            return 0;
        }

        //是否是队长
        public isCaption(): boolean {
            let info = this._model.team_roles[0];
            return info && info.role_id.eq(RoleVo.ins.role_id);
        }

        //是否是本人
        public isMyself(mate: teammate): boolean {
            return mate && mate.role_id.eq(RoleVo.ins.role_id);
        }

        //拥有队伍
        public haveTeam(): boolean {
            return this._model.team_id && this._model.team_id.notEquals(Long.ZERO);
        }

        //战队ID
        public get team_id(): Long {
            return this._model.team_id;
        }

        //改名消耗
        public getRenameCost(): number[] {
            let paramCfg = GameConfig.getParamConfigById('zhandui_created');
            return paramCfg.value[1];
        }

        //创建战队消耗
        public getCreateCost(): number[] {
            let paramCfg = GameConfig.getParamConfigById('zhandui_created');
            return paramCfg.value[0];
        }

        //奖励是否领取
        public isGotReward(): boolean {
            return this._model.today_is_get == 2;
        }

        //能否获取奖励
        public canGetReward(): boolean {
            return this._model.today_is_get == 1;
        }

        //仙纪 1功绩 2事件
        public getStrs(type = 1): string[] {
            return type == 1 ? this._model.strs1 : this._model.strs2;
        }

        //申请列表有玩家的时候给队长显示红点
        public getApplyHint(): boolean {
            if (!this.isCaption()) {
                return false;
            }
            let list = this.role_apply_list;
            return list && list.length > 0;
        }

        public isMaxLv(): boolean {
            let cfgs: ZhanduiDengjiConfig[] = getConfigListByName(ConfigName.ZhanduiDengji);
            let lv = cfgs && cfgs.length;
            return lv <= this.team_level;
        }

        //每日福利
        public getRewardHint(): boolean {
            return this.canGetReward();
        }

        private updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Zhandui) || !this.haveTeam()) {
                return;
            }
            HintMgr.setHint(this.getApplyHint(), this._model.applyHintPath);
            HintMgr.setHint(this.getRewardHint(), this._model.rewardHintPath);
        }
    }
}