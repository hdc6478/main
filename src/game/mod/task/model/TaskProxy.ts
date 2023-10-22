namespace game.mod.task {
    import c2s_all_task_info = msg.c2s_all_task_info;
    import GameNT = base.GameNT;
    import s2c_all_task_info = msg.s2c_all_task_info;
    import c2s_quick_task = msg.c2s_quick_task;
    import c2s_task_recv_reward = msg.c2s_task_recv_reward;
    import task_data = msg.task_data;
    import c2s_one_key_task_recv_reward = msg.c2s_one_key_task_recv_reward;

    export class TaskProxy extends ProxyBase implements ITaskProxy {
        private _model: TaskModel;

        public getModel(): TaskModel {
            return this._model;
        }

        onStartReconnect(): void {
            let self = this;
            self.cleanDataDict();
            super.onStartReconnect();
        }

        initialize(): void {
            super.initialize();
            let self = this;
            self._model = new TaskModel();
            self.cleanDataDict();
            self.onProto(s2c_all_task_info, self.all_task_info_s2c, self);
        }

        private cleanDataDict(): void {
            this._model.task_dic = {};
            this._model.typeTasks = {};
            this._model.typeHints = {};
        }

        /**
         * 请求任务信息
         * @param types，任务类型列表
         */
        public all_task_info_c2s(types: number[]) {
            let msg: c2s_all_task_info = new c2s_all_task_info();
            msg.task_types = types;
            this.sendProto(msg);
        }

        /**
         * 快速完成任务
         * @param taskId
         */
        public c2s_quick_task(taskId: number) {
            let msg: c2s_quick_task = new c2s_quick_task();
            msg.task_idx = taskId;
            this.sendProto(msg);
        }

        /**
         * 领取奖励
         * @param taskId 任务完成后领取奖励
         */
        public task_recv_reward_c2s(taskId: number) {
            let msg: c2s_task_recv_reward = new c2s_task_recv_reward();
            msg.task_id = taskId;
            this.sendProto(msg);
        }

        /**
         * 一键领取任务奖励
         * @param type 任务类型
         */
        public c2s_one_key_task_recv_reward(type: number) {
            let msg: c2s_one_key_task_recv_reward = new c2s_one_key_task_recv_reward();
            msg.task_type = type;
            this.sendProto(msg);
        }

        /** 任务信息返回 */
        private all_task_info_s2c(n: GameNT) {
            let msg: s2c_all_task_info = n.body;
            if(!msg || !msg.tasks || !msg.tasks.length){
                console.error("任务数据下发异常，没有数据！");
                return;
            }
            let task_list = msg.tasks;
            let types: number[] = [];
            if (msg.oper == TaskOpType.All) {
                /**接收所有任务*/
                for (let task of task_list) {
                    this._model.task_dic[task.task_id] = task;

                    this.addTask(task);

                    let type = TaskUtil.getTaskType(task.task_id);
                    if(types.indexOf(type) < 0){
                        types.push(type);
                    }
                }
                this.updateHint(types);
                this.sendNt(TaskEvent.ON_TASK_UPDATE, types);
                return;
            }

            /**更新删除任务时，统一刷新事件*/
            if (msg.oper == TaskOpType.Update) {
                for (let task of task_list) {
                    let old_task = this._model.task_dic[task.task_id];
                    if(!old_task){
                        this._model.task_dic[task.task_id] = old_task = task;

                        this.addTask(task);
                    }
                    else {
                        let type = TaskUtil.getTaskType(old_task.task_id);
                        if(type == TaskType.Main && old_task.status == TaskStatus.Finish && task.status == TaskStatus.Draw){
                            //主线任务从已完成状态切换到已领取状态时候，弹窗任务完成特效
                            ViewMgr.getIns().showSuccessTips(SuccessTipsType.Task);
                        }
                        for (let key in task) {
                            old_task[key] = task[key];
                        }

                        let pos = this.getTaskPos(old_task);
                        if(pos >= 0){
                            this._model.typeTasks[type][pos] = old_task;
                        }
                    }
                    let type = TaskUtil.getTaskType(old_task.task_id);
                    if(types.indexOf(type) < 0){
                        types.push(type);
                    }
                }
            }
            else if (msg.oper == TaskOpType.Del) {
                for (let task of task_list) {
                    let old_task = this._model.task_dic[task.task_id];
                    if(!old_task){
                        console.error("服务端删除了不存在的任务，任务ID：", task.task_id);
                        continue;
                    }
                    let type = TaskUtil.getTaskType(old_task.task_id);
                    if(types.indexOf(type) < 0){
                        types.push(type);
                    }

                    let pos = this.getTaskPos(old_task);
                    if(pos >= 0){
                        this._model.typeTasks[type].splice(pos,1);
                    }

                    if(!this._model.typeTasks[type].length){
                        delete this._model.typeTasks[type];
                    }
                    delete this._model.task_dic[task.task_id];
                }
            }
            this.updateHint(types);
            this.sendNt(TaskEvent.ON_TASK_UPDATE, types);
        }

        private addTask(task: task_data): void {
            let type = TaskUtil.getTaskType(task.task_id);
            if(!this._model.typeTasks[type]){
                this._model.typeTasks[type] = [];
            }
            this._model.typeTasks[type].push(task);
        }

        private getTaskPos(task: task_data): number {
            let type = TaskUtil.getTaskType(task.task_id);
            let typeTasks = this._model.typeTasks[type];
            for(let i = 0; i < typeTasks.length; ++i){
                let t = typeTasks[i];
                if(t.task_id == task.task_id){
                    return i;
                }
            }
            return -1;
        }

        private updateHint(types: number[]): void {
            let tmpTypes: number[] = [];
            for(let type of types){
                let tasks = this.getTaskList(type);
                let oldHint = this._model.typeHints[type] || false;
                let hint = false;
                for(let task of tasks){
                    if(task.status == TaskStatus.Finish){
                        hint = true;
                        break;
                    }
                }
                if(oldHint != hint){
                    this._model.typeHints[type] = hint;
                    tmpTypes.push(type);
                }
            }
            this.sendNt(TaskEvent.ON_TASK_HINT, tmpTypes);
        }

        /**
         * 获取任务列表
         * @param type
         */
        public getTaskList(type: number): task_data[] {
            return this._model.typeTasks[type] || [];
        }

        /**
         * 获取任务
         * @param taskId
         */
        public getTask(taskId: number): task_data {
            let task = this._model.task_dic[taskId];
            return task;
        }

        /**
         * 获取任务红点
         * @param type
         */
        public getTaskHint(type: number): boolean {
            return this._model.typeHints[type] || false;;
        }
    }
}