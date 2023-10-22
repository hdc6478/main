namespace game.mod.shilian {

    import GameNT = base.GameNT;
    import s2c_yuanling_info = msg.s2c_yuanling_info;
    import s2c_yuanling_team_list = msg.s2c_yuanling_team_list;
    import c2s_yuanling_jion_team = msg.c2s_yuanling_jion_team;
    import c2s_yuanling_out_time = msg.c2s_yuanling_out_time;
    import s2c_yuanling_team_info = msg.s2c_yuanling_team_info;
    import c2s_yuanling_check = msg.c2s_yuanling_check;
    import c2s_yuanling_buyCount = msg.c2s_yuanling_buyCount;
    import c2s_yuanling_enter = msg.c2s_yuanling_enter;
    import s2c_yuanling_buff_info = msg.s2c_yuanling_buff_info;
    import c2s_yuanling_buyBuff = msg.c2s_yuanling_buyBuff;
    import s2c_yuanling_exit_team = msg.s2c_yuanling_exit_team;
    import YuanlingFubenConfig = game.config.YuanlingFubenConfig;
    import c2s_yuanling_invita = msg.c2s_yuanling_invita;
    import s2c_yuanling_invita = msg.s2c_yuanling_invita;
    import c2s_yuanling_info = msg.c2s_yuanling_info;
    import c2s_yuanling_team_list = msg.c2s_yuanling_team_list;
    import c2s_yuanling_role_list = msg.c2s_yuanling_role_list;
    import s2c_yuanling_role_list = msg.s2c_yuanling_role_list;
    import c2s_yuanling_create_team = msg.c2s_yuanling_create_team;
    import s2c_yuanling_fb_info = msg.s2c_yuanling_fb_info;
    import c2s_yuanling_exit_team = msg.c2s_yuanling_exit_team;
    import s2c_yuanling_damage = msg.s2c_yuanling_damage;
    import BuffConfig = game.config.BuffConfig;
    import s2c_yuanling_counts = msg.s2c_yuanling_counts;
    import c2s_yuanling_room_invita = msg.c2s_yuanling_room_invita;
    import facade = base.facade;

    /**
     * @description 元灵试炼系统
     */
    export class YuanLingProxy extends ProxyBase implements IYuanLingProxy {
        private _model: YuanLingModel;
        /**当前困难度*/
        public curDiffType = 1;
        /**收到组队邀请延迟回调*/
        private _delayId: number = null;
        /**被邀请时候，进入界面附带的参数。解决直接带参数打开界面，又打开其他界面，back的时候有参数*/
        public inviteParam: number[] = [];

        public get model(): YuanLingModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new YuanLingModel();
            this.onProto(s2c_yuanling_info, this.s2c_yuanling_info, this);
            this.onProto(s2c_yuanling_team_list, this.s2c_yuanling_team_list, this);
            this.onProto(s2c_yuanling_exit_team, this.s2c_yuanling_exit_team, this);
            this.onProto(s2c_yuanling_team_info, this.s2c_yuanling_team_info, this);
            this.onProto(s2c_yuanling_buff_info, this.s2c_yuanling_buff_info, this);
            this.onProto(s2c_yuanling_role_list, this.s2c_yuanling_role_list, this);
            this.onProto(s2c_yuanling_invita, this.s2c_yuanling_invita, this);
            this.onProto(s2c_yuanling_fb_info, this.s2c_yuanling_fb_info, this);
            this.onProto(s2c_yuanling_damage, this.s2c_yuanling_damage, this);
            this.onProto(s2c_yuanling_counts, this.s2c_yuanling_counts, this);

            facade.onNt(GiftEvent.ON_UPDATE_GIFT_HINT, this.onUpdateGiftHint, this);
        }

        /** 请求副本信息 */
        public c2s_yuanling_info(): void {
            this.sendProto(new c2s_yuanling_info());
        }

        /** 副本信息 */
        private s2c_yuanling_info(n: GameNT): void {
            let msg = n.body as s2c_yuanling_info;
            if (msg.count != null) {
                this._model.count = msg.count;
            }
            if (msg.diff != null) {
                this._model.diff = msg.diff;
            }
            if (msg.buy != null) {
                this._model.buy = msg.buy;
            }
            if (msg.info != null) {
                for (let info of msg.info) {
                    this._model.info[info.idx] = info;
                }
            }
            this.updateHint();
            this.sendNt(ShilianEvent.ON_YUANLING_INFO_UPDATE);
        }

        /** 创建队伍 */
        public c2s_yuanling_create_team(index: number): void {
            let msg = new c2s_yuanling_create_team();
            msg.index = index;
            this.sendProto(msg);
        }

        /** 加入队伍 */
        public c2s_yuanling_jion_team(team_id: number, index: number): void {
            let msg = new c2s_yuanling_jion_team();
            msg.team_id = team_id;
            msg.index = index;
            this.sendProto(msg);
        }

        /** 退出队伍 */
        public c2s_yuanling_exit_team(): void {
            this.sendProto(new c2s_yuanling_exit_team());
        }

        /** 返回退出队伍 */
        private s2c_yuanling_exit_team(n: GameNT): void {
            let msg = n.body as s2c_yuanling_exit_team;
            // 1被踢的。2正常
            if (msg.flag && msg.flag == 1) {
                this._model.kick_out_team[msg.team_id] = msg.time;
            }
            // 推出队伍后，就把个人的队伍信息清空
            this._model.own_team_id = 0;
            this._model.own_team_infos = [];
            this.sendNt(ShilianEvent.ON_YUANLING_JUMP_TO_VIEW, 1);
        }

        /** 踢出队伍 */
        public c2s_yuanling_out_time(role_id: Long): void {
            let msg = new c2s_yuanling_out_time();
            msg.role_id = role_id;
            this.sendProto(msg);
        }

        /** 自己的队伍信息 */
        private s2c_yuanling_team_info(n: GameNT): void {
            let msg = n.body as s2c_yuanling_team_info;
            this._model.own_index = msg.index != null ? msg.index : 0;
            this._model.own_team_id = msg.team_id != null ? msg.team_id : 0;
            this._model.own_team_infos = msg.infos != null ? msg.infos : [];

            // 队伍解散，返回自己的队伍信息为空，这时候需要切换回奖励界面1
            this.sendNt(ShilianEvent.ON_YUANLING_TEAM_INFO_UPDATE, [msg.index, msg.team_id != null ? 2 : 1]);
            // 加入队伍后，被邀请按钮不需要显示了
            if (Object.keys(this._model.be_invited_team).length > 0 && msg.team_id != null) {
                this._model.be_invited_team = {};
                this.sendNt(ShilianEvent.ON_YUANLING_TEAM_INVITE);
                this.sendNt(ShilianEvent.ON_YUANLING_TEAM_INVITE_BTN);
            }
        }

        /** 勾选收益次数 1选择；2取消 */
        public c2s_yuanling_check(check: number): void {
            let msg = new c2s_yuanling_check();
            msg.check = check;
            this.sendProto(msg);
        }

        /** 购买收益次数 */
        public c2s_yuanling_buyCount(): void {
            this.sendProto(new c2s_yuanling_buyCount());
        }

        /** 开始战斗;单人匹配也是这个 */
        public c2s_yuanling_enter(index: number): void {
            let msg = new c2s_yuanling_enter();
            msg.index = index;
            this.sendProto(msg);
        }

        /** 更新buff时间 */
        private s2c_yuanling_buff_info(n: GameNT): void {
            let msg = n.body as s2c_yuanling_buff_info;
            let idx = 0;
            let time = 0;
            if (msg.index != null) {
                this._model.buff_info[msg.index] = msg.time || 0;
                idx = msg.index;
                time = msg.time;
            }
            this.sendNt(ShilianEvent.ON_YUANLING_BUFF_INFO_UPDATE, [idx, time]);

            let cfg = this.getConfig(this.curDiffType);
            if (cfg && cfg.buff_info && cfg.buff_info[idx - 1]) {
                let buffId = cfg.buff_info[idx - 1][0];
                if (!buffId) {
                    return;
                }
                let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffId);
                if (!buffCfg) {
                    return;
                }
                PromptBox.getIns().show(RoleVo.ins.name + '激活了' + buffCfg.name);
            }
        }

        /** 购买buff */
        public c2s_yuanling_buyBuff(index: number): void {
            let msg = new c2s_yuanling_buyBuff();
            msg.index = index;
            this.sendProto(msg);
        }

        /** 邀请 */
        public c2s_yuanling_invita(role_id: Long, index: number): void {
            let msg = new c2s_yuanling_invita();
            msg.role_id = role_id;
            msg.index = index;
            this.sendProto(msg);
        }

        /** 聊天组队邀请 */
        public c2s_yuanling_room_invita(type: number): void {
            let msg = new c2s_yuanling_room_invita();
            msg.channel_type = type;
            this.sendProto(msg);
        }

        /** 收到组队邀请 */
        public s2c_yuanling_invita(n: GameNT): void {
            let msg = n.body as s2c_yuanling_invita;
            if (msg.team_id != null) {
                this._model.be_invited_team[msg.team_id] = msg;
            }
            this.sendNt(ShilianEvent.ON_YUANLING_TEAM_INVITE);
            this.sendNt(ShilianEvent.ON_YUANLING_TEAM_INVITE_BTN);
        }

        /** 请求可邀请列表 */
        public c2s_yuanling_role_list(index: number): void {
            let msg = new c2s_yuanling_role_list();
            msg.index = index;
            this.sendProto(msg);
        }

        /** 可邀请列表 */
        private s2c_yuanling_role_list(n: GameNT): void {
            let msg = n.body as s2c_yuanling_role_list;
            this._model.invite_list = [];
            if (msg.info != null) {
                for (let item of msg.info) {
                    //过滤自己
                    if (!item || item.role_id.eq(RoleVo.ins.role_id)) {
                        continue;
                    }
                    this._model.invite_list.push(item);
                }
            }
            this.sendNt(ShilianEvent.ON_YUANLING_ROLE_LIST_UPDATE);
        }

        /** 请求队伍列表 */
        public c2s_yuanling_team_list(idx: number): void {
            let msg = new c2s_yuanling_team_list();
            msg.index = idx;
            this.sendProto(msg);
        }

        /** 队伍列表 */
        private s2c_yuanling_team_list(n: GameNT): void {
            let msg = n.body as s2c_yuanling_team_list;
            this._model.team_list = msg.infos != null ? msg.infos : [];
            this.sendNt(ShilianEvent.ON_YUANLING_TEAM_LIST_UPDATE);
        }

        /** 更新副本内信息 */
        private s2c_yuanling_fb_info(n: GameNT): void {
            let msg = n.body as s2c_yuanling_fb_info;
            if (msg.index != null) {
                this._model.scene_index = msg.index;
            }
            if (msg.layer != null) {
                this._model.scene_layer = msg.layer;
            }
            this.sendNt(ShilianEvent.ON_YUANLING_FUBEN_INFO_UPDATE);
            ViewMgr.getIns().showChallengeTips(msg.layer);
        }

        private s2c_yuanling_damage(n: GameNT): void {
            let msg = n.body as s2c_yuanling_damage;
            this._model.damage_info = msg.infos != null ? msg.infos : [];
            this.sendNt(ShilianEvent.ON_YUANLING_DAMAGE_INFO_UPDATE, msg.infos);
        }

        // 通关次数
        private s2c_yuanling_counts(n: GameNT): void {
            let msg = n.body as s2c_yuanling_counts;
            if (msg.counts != null) {
                for (let item of msg.counts) {
                    this._model.challenge_counts[item.index] = item.count;
                }
            }
        }

        /**=================================协议 end=================================*/

        public getConfig(type: number): YuanlingFubenConfig {
            return getConfigByNameId(ConfigName.YuanLingFuben, type);
        }

        // 元灵副本组队上限
        public getTeamCount(): number {
            let cfg = GameConfig.getParamConfigById('yuanling_team_count');
            return cfg && cfg.value || 0;
        }

        // 元灵副本每日收益次数
        public getCount(): number {
            let cfg = GameConfig.getParamConfigById('yuanling_count');
            return cfg && cfg.value || 0;
        }

        // 元灵副本购买次数上限
        public getMaxBuy(): number {
            let cfg = GameConfig.getParamConfigById('yuanling_max_buy');
            return cfg && cfg.value || 0;
        }

        // 元灵副本购买次数消耗
        public getCost(): number[][] {
            let cfg = GameConfig.getParamConfigById('yuanling_cost');
            return cfg && cfg.value || [];
        }

        // 判断本人是否是队长
        public isMineLeader(): boolean {
            let team_infos = this._model.own_team_infos;
            let myId = RoleVo.ins.role_id;
            for (let info of team_infos) {
                if (!info || !info.leader) {
                    continue;
                }
                if (info.info[0] && info.info[0].role_id.eq(myId)) {
                    return true;
                }
            }
            return false;
        }

        /**获取邀请列表*/
        public getInvitedTeamList(): s2c_yuanling_invita[] {
            //已加入队伍，主界面不需要再出现按钮
            if (this._model.own_team_id) {
                DEBUG && console.log('s2c_yuanling_invita-getInvitedTeamList: 已有自己队伍', this._model.own_team_id);
                return null;
            }
            let team = this._model.be_invited_team;
            if (!team) {
                DEBUG && console.log('s2c_yuanling_invita-getInvitedTeamList: 没有队伍信息1');
                return null;
            }
            let list: s2c_yuanling_invita[] = [];
            let keys = Object.keys(team);
            if (!keys || !keys.length) {
                DEBUG && console.log('s2c_yuanling_invita-getInvitedTeamList: 没有队伍信息2');
                return null;
            }
            for (let key of keys) {
                let item = team[key];
                if (item) {
                    list.push(item);
                }
            }
            return list;
        }

        /**有队伍*/
        public onTeam(): boolean {
            return this._model.own_team_id != 0;
        }

        /**当前挑战层数*/
        public curLayer(): number {
            return this._model.scene_layer;
        }

        /**当前难度*/
        public getCurDiff(): number {
            let param = this.inviteParam || [];
            if (param[0] != null) {
                return param[0];
            }
            let idx = this._model.scene_index;
            this._model.scene_index = 0;
            this._model.scene_layer = 0;
            return idx || 1;
        }

        /**当前皮肤状态，1奖励，2组队*/
        public getCurState(): number {
            let param = this.inviteParam || [];
            if (param[1] != null) {
                return param[1];
            } else if (this._model.own_team_id) {
                return 2;
            }
            return 1;
        }

        public onClearInvitedTeam(): void {
            this._model.be_invited_team = {};
        }

        /**进去其他副本，或者掉线，默认全部拒绝邀请*/
        public clearInvitedTeam(team_id: number): void {
            let team = this._model.be_invited_team;
            if (team && team[team_id]) {
                team[team_id] = null;
                delete team[team_id];
            }
        }

        /**============================== hint ==============================*/

        /**收益次数红点*/
        public getCntHint(): boolean {
            let usedCnt = this._model.count;//已使用次数
            let bought = this._model.buy;//已购买次数
            let cfgCnt = this.getCount();//每日收益次数
            return cfgCnt + bought - usedCnt > 0;
        }

        //页签红点（次数红点，礼包红点）
        public getAllHint(): boolean {
            return this.getCntHint() || this.getGiftHint();
        }

        public updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Yuanling)) {
                return;
            }
            HintMgr.setHint(this.getAllHint(), this._model.hintPath);
        }

        //成就红点
        public getGiftHint(): boolean {
            let giftProxy: IGiftProxy = getProxy(ModName.Gift, ProxyType.Gift);
            return giftProxy.getHintByGiftType(GiftType.Yuanling);
        }

        private onUpdateGiftHint(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(GiftType.Yuanling) > -1) {
                this.updateHint();
            }
        }
    }
}