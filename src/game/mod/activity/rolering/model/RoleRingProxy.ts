namespace game.mod.activity {

    import GameNT = base.GameNT;
    import s2c_role_ring_data = msg.s2c_role_ring_data;
    import s2c_role_ring_update = msg.s2c_role_ring_update;
    import c2s_role_ring_receive = msg.c2s_role_ring_receive;
    import c2s_role_ring_foster = msg.c2s_role_ring_foster;
    import role_ring_info = msg.role_ring_info;
    import ParamConfig = game.config.ParamConfig;
    import YaodiConfig = game.config.YaodiConfig;
    import facade = base.facade;

    export class RoleRingProxy extends ProxyBase implements IRoleRingProxy {
        private _model: RoleRingModel;

        public get model() {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new RoleRingModel();

            this.onProto(s2c_role_ring_data, this.s2c_role_ring_data, this);
            this.onProto(s2c_role_ring_update, this.s2c_role_ring_update, this);

            facade.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.updateHintOfType1, this);
        }

        /**
         * 领取奖励
         * */
        public c2s_role_ring_receive(type: number, act_event: number): void {
            let msg: c2s_role_ring_receive = new c2s_role_ring_receive();
            msg.type = type;
            msg.act_event = act_event;
            this.sendProto(msg);
        }

        /**
         * 培育操作
         * */
        public c2s_role_ring_foster(type: number, act_event: number): void {
            let msg: c2s_role_ring_foster = new c2s_role_ring_foster();
            msg.type = type;
            msg.act_event = act_event;
            this.sendProto(msg);
        }

        private s2c_role_ring_data(n: GameNT): void {
            let msg: s2c_role_ring_data = n.body;
            if (!msg) {
                return;
            }
            this._model.infos = msg.list;
            this.updateHint();
            this.checkGodOpen();
            this.sendNt(ActivityEvent.ON_ROLE_RING_UPDATE);
        }

        private s2c_role_ring_update(n: GameNT): void {
            let msg: s2c_role_ring_update = n.body;
            if (!msg || !msg.info) {
                return;
            }
            let info = msg.info;
            let pos = this.getInfoPos(info.type);
            if (pos >= 0) {
                for (let k in info) {
                    this._model.infos[pos][k] = info[k];
                }
            }
            else {
                this._model.infos.push(info);
            }
            this.updateHint();
            this.checkGodOpen();
            this.sendNt(ActivityEvent.ON_ROLE_RING_UPDATE);
        }

        private getInfoPos(type: number): number {
            if (!this._model.infos || !this._model.infos.length) {
                return -1;
            }
            let len = this._model.infos.length;
            for (let i = 0; i < len; ++i) {
                let info = this._model.infos[i];
                if (info.type == type) {
                    return i;
                }
            }
            return -1;
        }

        private getInfo(type: number): role_ring_info {
            let pos = this.getInfoPos(type);
            if (pos >= 0) {
                return this._model.infos[pos];
            }
            return null;
        }

        public getStatus(type: number): number {
            let info = this.getInfo(type);
            return info && info.ring_reward ? info.ring_reward : RewardStatus.NotFinish;
        }

        /**主角光环是否激活*/
        public isRoleRingAct(type?: number): boolean {
            if (!type) {
                type = RoleRingType.Type1;
            }
            let status = this.getStatus(type);
            return status != RewardStatus.NotFinish;
        }

        public getKillReward(type: number): number[] {
            let killRewardCfgStr = "halo_kill_reward" + type;
            let killRewardCfg: ParamConfig = GameConfig.getParamConfigById(killRewardCfgStr);
            let killReward: number[] = killRewardCfg && killRewardCfg.value;
            return killReward;
        }

        public getValue(type: number): number {
            if (type == RoleRingType.Type1) {
                let info = this.getInfo(type);
                return info && info.ring_value || 0;
            }
            //取背包数量
            let killReward: number[] = this.getKillReward(type);
            let killRewardIdx = killReward[0];
            return BagUtil.getPropCntByIdx(killRewardIdx);
        }

        public getIndex(type: number): number {
            if (type == RoleRingType.Type1) {
                return 1;//主角光环没有阶段，默认1
            }
            let info = this.getInfo(type);
            return info && info.yaoqi_index ? info.yaoqi_index : 1;
        }

        public getYaoqiStatus(type: number): number {
            let info = this.getInfo(type);
            return info && info.yaoqi_reward ? info.yaoqi_reward : RewardStatus.NotFinish;
        }

        public getYaoqiValue(type: number): number {
            let info = this.getInfo(type);
            return info && info.yaoqi_value ? info.yaoqi_value : 0;
        }

        private updateHintOfType1(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType([ModName.God])) {
                let hint = this.getTypeHint(RoleRingType.Type1) || data.value;
                let hintType = this.getHintType(RoleRingType.Type1 - 1);
                HintMgr.setHint(hint, hintType);
            }
        }

        public getTypeHint(type: number): boolean {
            let status = this.getStatus(type);
            let canDraw = status == RewardStatus.Finish;
            if (canDraw) {
                return true;
            }
            if (!this.isRoleRingAct(type)) {
                return false;//未激活不提示红点
            }
            if (type == RoleRingType.Type1) {
                let curVal = this.getValue(type);
                return curVal > 0;
            }
            return this.getEggHint(type);
        }

        public getEggHint(type: number): boolean {
            let status = this.getYaoqiStatus(type);
            let canDraw = status == RewardStatus.Finish;
            if (canDraw) {
                return true;
            }
            let hasDraw = status == RewardStatus.Draw;
            if (!hasDraw) {
                let index = this.getIndex(type);
                let cfgName = type == RoleRingType.Type2 ? ConfigName.Yaodi : ConfigName.Yaoshen;
                let yaodiCfg: YaodiConfig = getConfigByNameId(cfgName, index);
                let cost = yaodiCfg.cost_item;
                return BagUtil.checkPropCnt(cost[0], cost[1]);
            }
            return false;
        }

        public getHintType(pos: number): string[] {
            return this._model.hints[pos];
        }

        /**更新红点*/
        public updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.RoleRing)) {
                return;
            }
            for (let i = RoleRingType.Type1; i <= RoleRingType.Type3; ++i) {
                let type = i;
                let hint = this.getTypeHint(type);
                let hintType = this.getHintType(type - 1);
                HintMgr.setHint(hint, hintType);
            }
        }

        protected onBagUpdateByPropIndex(n: base.GameNT): void {
            let indexs: number[] = n.body;
            if (indexs.indexOf(PropIndex.Yaoshoulingsui) >= 0 || indexs.indexOf(PropIndex.Moshoulingsui) >= 0) {
                this.updateHint();
            }
        }


        private checkGodOpen(): void {
            let bool: boolean = this.isRoleRingAct(RoleRingType.Type1);
            BtnIconMgr.insTop().updateOpen(BtnIconId.Tiandilu, bool);
        }
    }
}