namespace game.mod.activity {

    import GameNT = base.GameNT;
    import c2s_chengshen_get_reward = msg.c2s_chengshen_get_reward;
    import s2c_chengshen_update_data = msg.s2c_chengshen_update_data;
    import OpenFunctionConfig = game.config.OpenFunctionConfig;
    import ParamConfig = game.config.ParamConfig;
    import TimeMgr = base.TimeMgr;

    export class ChengshenProxy extends ProxyBase {
        private _model: ChengshenModel;

        initialize(): void {
            super.initialize();
            this._model = new ChengshenModel();

            this.onProto(s2c_chengshen_update_data, this.s2c_chengshen_update_data, this);
        }

        public c2s_chengshen_get_reward(type: number): void {
            let msg: c2s_chengshen_get_reward = new c2s_chengshen_get_reward();
            msg.type = type;
            this.sendProto(msg);
        }

        private s2c_chengshen_update_data(n: GameNT): void {
            let msg: s2c_chengshen_update_data = n.body;
            if (!msg || !msg.list) {
                return;
            }
            if(!this._model.list || !this._model.list.length){
                this._model.list = msg.list;
            }
            else {
                for(let info of msg.list){
                    let pos = this.getInfoPos(info.type);
                    if(pos >= 0){
                        this._model.list[pos] = info;
                    }
                    else {
                        this._model.list.push(info);
                    }
                }
            }
            this.updateInfo();
            this.sendNt(ActivityEvent.ON_UPDATE_CHENGSHEN_REWARD);
        }

        //信息index
        private getInfoPos(type: number): number {
            if(!this._model.list){
                return -1;
            }
            for(let i = 0; i < this._model.list.length; ++i){
                let info = this._model.list[i];
                if(info.type == type){
                    return i;
                }
            }
            return -1;
        }

        public get type(): number {
            return this._model.type;
        }
        public set type(type: number) {
            this._model.type = type;
        }

        public getTaskList(type: number): number[] {
            let paramCfg: ParamConfig = GameConfig.getParamConfigById("chengshen_task");
            let pos = type - 1;
            let taskList: number[] = paramCfg.value[pos];
            return taskList;
        }

        public hasDraw(type: number): boolean {
            let pos = this.getInfoPos(type);
            if(pos < 0){
                return false;
            }
            let info = this._model.list[pos];
            return info && info.state == ChengshenRewardState.HasDraw;
        }

        public canDraw(type: number): boolean {
            let pos = this.getInfoPos(type);
            if(pos < 0){
                return false;
            }
            let info = this._model.list[pos];
            return info && info.state == ChengshenRewardState.CanDraw;
        }

        public getHintByType(type: number): boolean {
            if(this.canDraw(type)){
                return true;//奖励可领取
            }
            let taskList = this.getTaskList(type);
            for(let i = 0; i < taskList.length; ++i){
                let index = taskList[i];
                let task = TaskUtil.getTask(index);
                if(task && task.status == TaskStatus.Finish){
                    return true;//任务奖励可领取
                }
            }
            return false;
        }

        //是否领完所有奖励
        private hasDrawAllReward(): boolean {
            let typeList = [ChengshenType.Summon, ChengshenType.Pass];
            for(let type of typeList){
                if(!this.hasDraw(type)){
                    return false;//奖励未领取
                }
            }
            let taskList = TaskUtil.getTaskList(TaskType.Chengshen);//直接取所有任务
            for(let task of taskList){
                if(task.status != TaskStatus.Draw){
                    return false;//任务奖励未领取
                }
            }
            return true;
        }

        public getEndTime(): number {
            let cfg: OpenFunctionConfig = getConfigByNameId(ConfigName.OpenFunction, OpenIdx.Chengshen);
            let openDay = cfg.svr_open;//开服第几天开启，第1天
            let serverDay = RoleUtil.getServerDay();//当前开服天数
            let paramCfg: ParamConfig = GameConfig.getParamConfigById("chengshen_day");
            let continueDay = paramCfg && paramCfg.value;//活动持续天数，,13天
            let leftDay = openDay + continueDay - serverDay;
            if(leftDay <= 0){
                return 0;//活动已结束
            }
            let curTime = TimeMgr.time.serverTimeSecond;
            return TimeUtil.getNextDayTime(curTime, false, leftDay);
        }

        public isOpen(): boolean {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Chengshen)){
                return false;//功能未开启
            }
            let endTime = this.getEndTime();
            if(endTime <= 0){
                return false;//活动已结束
            }
            if(this.hasDrawAllReward()){
                return false;//领完所有奖励
            }
            return true;
        }

        private updateInfo(): void {
            this.updateHint();
            this.checkIsOpen();
        }

        private checkIsOpen(): void {
            let isOpen = this.isOpen();
            BtnIconMgr.insTop().updateOpen(BtnIconId.Chengshen, isOpen);
        }

        /**更新红点*/
        private updateHint(): void {
            if(!this.isOpen()){
                return;
            }
            let hint = false;
            let typeList = [ChengshenType.Summon, ChengshenType.Pass];
            for(let type of typeList){
                if(this.getHintByType(type)){
                    hint = true;
                    break;
                }
            }
            let hintType = this._model.hintType;
            HintMgr.setHint(hint, hintType);
        }

        protected onTaskHint(n: base.GameNT): void {
            let types: number[] = n.body;
            let type = TaskType.Chengshen;
            if(types.indexOf(type) < 0){
                return;
            }
            this.updateInfo();
        }
        protected onServerDayUpdate(n: GameNT): void {
            this.updateInfo();
        }
        /**功能开启刷新按钮*/
        protected onOpenFuncUpdate(n: GameNT): void {
            let addIdx: number[] = n.body;
            if (addIdx.indexOf(OpenIdx.Chengshen) > -1) {
                this.updateInfo();
            }
        }
        /**功能开启刷新按钮*/
        protected onOpenFuncInit(n: GameNT): void {
            let addIdx: number[] = n.body;
            if (addIdx.indexOf(OpenIdx.Chengshen) > -1) {
                this.updateInfo();
            }
        }
    }
}