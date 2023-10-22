namespace game.mod.daily {

    import c2s_medal_info = msg.c2s_medal_info;
    import GameNT = base.GameNT;
    import c2s_medal_oper = msg.c2s_medal_oper;
    import s2c_medal_new_info = msg.s2c_medal_new_info;
    import s2c_medal_daily_reward = msg.s2c_medal_daily_reward;
    import c2s_medal_daily_reward = msg.c2s_medal_daily_reward;
    import ActiveAwardConfig = game.config.ActiveAwardConfig;
    import task_data = msg.task_data;
    import facade = base.facade;
    import DailyWanfaConfig = game.config.DailyWanfaConfig;

    export class DailyProxy extends ProxyBase implements IDailyProxy{

        private _model: DailyModel;

        initialize(): void {
            super.initialize();
            this._model = new DailyModel();

            this.onProto(s2c_medal_new_info, this.s2c_medal_new_info, this);
            this.onProto(s2c_medal_daily_reward, this.s2c_medal_daily_reward, this)
        }

        public getModel(): DailyModel {
            return this._model;
        }

        public c2s_medal_info(): void {
            let req: c2s_medal_info = new c2s_medal_info();
            this.sendProto(req);
        }

        /**
         * 新勋章信息协议
         * operate 1.全部 2.缺省
         * @param n
         */
        private s2c_medal_new_info(n: GameNT) {
            let msg: s2c_medal_new_info = n.body;
            if (!msg) return;
            if (msg.operate == 1) {
                this._model.curIndex = msg.cur_index;
                this._model.showPower = msg.show_power;
                this._model.curAttr = msg.attr;
                this._model.nextAttr = msg.next_attr;
                this._model.sumCup = msg.sum_cup_count;
                this._model.nextCup = msg.next_cup_count;
                this._model.curLv = msg.lv;
            } else {
                if (msg.cur_index) {
                    this._model.curIndex = msg.cur_index;
                }
                if (msg.show_power) {
                    this._model.showPower = msg.show_power;
                }
                if (msg.attr) {
                    this._model.curAttr = msg.attr;
                }
                if (msg.next_attr) {
                    this._model.nextAttr = msg.next_attr;
                }
                if (msg.sum_cup_count) {
                    this._model.sumCup = msg.sum_cup_count;
                }
                if (msg.next_cup_count) {
                    this._model.nextCup = msg.next_cup_count;
                }
                if (msg.lv) {
                    this._model.curLv = msg.lv;
                }
            }
            this.sendNt(LivenessEvent.MEDAL_INFO_UPDATE);
        }

        /**
         * 勋章操作
         * @param operate  1:升级勋章 2:特权领奖 3:激活勋章 4:幻化
         * @param index
         */
        public c2s_medal_oper(operate: number, index: number): void {
            let req: c2s_medal_oper = new c2s_medal_oper();
            req.oper = operate;
            req.medal_idx = index;
            this.sendProto(req);
        }

        public c2s_medal_daily_reward(index: number) {
            let req: c2s_medal_daily_reward = new c2s_medal_daily_reward();
            req.index = index;
            this.sendProto(req);
        }

        private s2c_medal_daily_reward(n: GameNT) {
            let msg: s2c_medal_daily_reward = n.body;
            if (!msg) {
                return;
            }

            if (msg.cur_experience != undefined) {      // 跨天重置后，可能归0
                this._model.curExp = msg.cur_experience;
            }
            if (msg.state) {
                this._model.awdState = msg.state;
            }
            if (msg.rwd_list) {
                this._model.awdList = msg.rwd_list;
            } else {
                this._model.awdList = [];
            }
            this.updateLivenessHint();
            this.sendNt(LivenessEvent.MEDAL_AWARD_UPDATE)
        }

        /**
         * 获取总战力
         */
        public get allPower(): number {
            let power: number = Number(this._model.showPower) || 0;
            return power;
        }

        protected onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.Liveness) == -1) {
                return;
            }
            this.updateLivenessHint();
        }

        private updateLivenessHint(): void {
            let hint: boolean = this.getBoxHint();
            if(!hint) {
                hint = this.getTaskHint();
            }
            HintMgr.setHint(hint, this._model.livenessHint);
        }

        /**
         * 获取宝箱奖励红点
         */
        private getBoxHint(): boolean {
            let cfgArr: ActiveAwardConfig[] = getConfigListByName(ConfigName.ActiveAward);
            let hint: boolean = false;
            for (let cfg of cfgArr) {
                let isGot: boolean = this.checkActRewardIsGot(cfg.index);
                if (!isGot && this._model.curExp >= cfg.activation) {
                    hint = true;
                    break;
                }
            }
            return hint;
        }

        /**
         * 获取任务奖励红点
         */
        private getTaskHint(): boolean {
            let hint = false;
            let tasks: task_data[] = TaskUtil.getTaskList(TaskType.Liveness);
            for(let task of tasks) {
                if(task.status == TaskStatus.Finish) {
                    hint = true;
                    break;
                }
            }
            return hint;
        }

        /**
         * 判断某档活跃度奖励是否已经领取
         * @param rewardId
         */
        public checkActRewardIsGot(rewardId: number): boolean {
            if (this._model.awdList) {
                return this._model.awdList.indexOf(rewardId) >= 0;
            }
            return false;
        }
        /**
         * 获取玩法系统外部系统红点
         */
        public getOtherHint(): boolean {
            let cfgList: DailyWanfaConfig[] = getConfigListByName(ConfigName.DailyWanfa);
            for(let cfg of cfgList){
                let openIdx = cfg.open_id;
                if(HintMgr.getHintByOpenIdx(openIdx)){
                    return true;
                }
            }
            return false;
        }
        /**
         * 是否是玩法系统外部系统红点
         */
        public isOtherHint(node: string): boolean {
            let cfgList: DailyWanfaConfig[] = getConfigListByName(ConfigName.DailyWanfa);
            for(let cfg of cfgList){
                let openIdx = cfg.open_id;
                let type = HintMgr.getTypeByOpenIdx(openIdx);
                if(type == node){
                    return true;
                }
            }
            return false;
        }
    }
}