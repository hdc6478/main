namespace game.mod {

    import facade = base.facade;
    import task_data = msg.task_data;
    import LanDef = game.localization.LanDef;
    import MainTask1Config = game.config.MainTask1Config;

    export class TaskUtil {
        /**
         *获取任务
         * @param taskId
         */
        public static getTask(taskId: number): task_data {
            let proxy: ITaskProxy = facade.retMod(ModName.Task).retProxy(ProxyType.Task);
            return proxy.getTask(taskId);
        }
        /**
         * 获取任务列表
         * @param type, 任务类型
         * @param isSort, 是否排序，默认排好序
         * @param isMerge, 是否合并任务，默认不合并
         */
        public static getTaskList(type: number, isSort: boolean = true, isMerge: boolean = false) {
            let proxy: ITaskProxy = facade.retMod(ModName.Task).retProxy(ProxyType.Task);
            let taskList = proxy.getTaskList(type).concat();
            if(isMerge){
                //合并同系列任务
                SortTools.sortMap(taskList, "task_id");//index从小到大排序

                let typePos = 1;
                let mergeList: {[type: number]: task_data[]} = {};//合并任务总分类
                let endMerge = 1;//结束标志

                for(let task of taskList){
                    let cfg: MainTask1Config = this.getCfg(task.task_id);
                    if(!cfg.merge){
                        continue;
                    }
                    let mergeType = this.getMergeType(task, mergeList);//当前任务所属的合并类型
                    if(mergeType < 0){
                        //当前类型未分类
                        mergeType = typePos;
                        if(!mergeList[mergeType]){
                            mergeList[mergeType] = [];
                        }
                        mergeList[mergeType].push(task);
                        typePos++;
                    }
                    let nextTaskId = cfg.merge;
                    if(nextTaskId == endMerge){
                        continue;//结束标志
                    }
                    let nextTask = this.getTask(nextTaskId);
                    if(!nextTask){
                        continue;
                    }
                    mergeList[mergeType].push(nextTask);
                }

                let curMergeList: number[] = [];//每个类型的合并任务取当前进行到的任务index
                for(let k in mergeList){
                    let taskMergeList = mergeList[k];
                    for(let task of taskMergeList){
                        if(task.status != TaskStatus.Draw){
                            //任务不是已领取状态时
                            curMergeList.push(task.task_id);
                            break;
                        }
                        else {
                            //已领取状态时，如果是结束
                            let cfg: MainTask1Config = this.getCfg(task.task_id);
                            if(cfg.merge == endMerge){
                                curMergeList.push(task.task_id);
                                break;
                            }
                        }
                    }
                }

                let tmpList = taskList.concat();
                taskList = [];
                for(let task of tmpList){
                    let cfg: MainTask1Config = this.getCfg(task.task_id);
                    if(cfg.merge && curMergeList.indexOf(cfg.index) < 0){
                        continue;
                    }
                    taskList.push(task);
                }

            }
            if(isSort){
                taskList.sort(SortTools.sortTask);
            }
            return taskList;
        }
        //判断是否已经在合并列表里面
        private static getMergeType(task: task_data, mergeList: {[type: number]: task_data[]}): number {
            for(let k in mergeList){
                let taskList = mergeList[k];
                for(let i of taskList){
                    if(i.task_id == task.task_id){
                        return parseInt(k);
                    }
                }
            }
            return -1;
        }
        /**
         * 获取任务列表红点
         * @param type, 任务类型
         */
        public static getTaskHint(type: number): boolean {
            let proxy: ITaskProxy = facade.retMod(ModName.Task).retProxy(ProxyType.Task);
            return proxy.getTaskHint(type);
        }

        /** 获取任务描述，包含进度（0/2）*/
        public static getTaskDesc(task: task_data, blackColor?: boolean): string {
            return this.getTaskDescNotSchedule(task) + this.getTaskSchedule(task, blackColor);
        }

        /** 获取任务描述，不包含进度 */
        public static getTaskDescNotSchedule(task: task_data): string {
            let cfg = this.getCfg(task.task_id);
            return StringUtil.substitute(cfg.desc, [task.target]);
        }

        /** 获取任务进度显示，（0/2） */
        public static getTaskSchedule(task: task_data, blackColor?: boolean): string{
            let redColor = blackColor ? BlackColor.RED : WhiteColor.RED;
            let greenColor = blackColor ? BlackColor.GREEN : WhiteColor.GREEN;
            let scheduleStr = TextUtil.addColor("(" + task.schedule + "/" + task.target + ")", task.schedule < task.target ? redColor : greenColor);
            return scheduleStr;
        }

        /**点击任务，eftBtn: 特效起始按钮*/
        public static clickTask(task: task_data, eftBtn?: eui.Component): void {
            if(!task){
                return;//todo，没有任务时候直接返回，个别任务需要提示的另外处理
            }
            if(task.status == TaskStatus.Draw){
            }
            else if(task.status == TaskStatus.Finish){
                let proxy: ITaskProxy = facade.retMod(ModName.Task).retProxy(ProxyType.Task);
                proxy.task_recv_reward_c2s(task.task_id);
                if(eftBtn){
                    facade.sendNt(MainEvent.COMMON_ADD_EFT, eftBtn);//领取奖励特效
                }
            }
            else if(task.status == TaskStatus.NotFinish){
                let cfg: MainTask1Config = getConfigByNameId(ConfigName.MainTask1, task.task_id);
                let jumpId = cfg.jump;//跳转ID
                let jumpProp = cfg.jump_prop;//跳转道具
                let hasJump: boolean = !!jumpId || !!jumpProp;
                if(!hasJump){
                    PromptBox.getIns().show(getLanById(LanDef.general3));
                    return;
                }
                if(jumpProp){
                    //优先跳转道具
                    ViewMgr.getIns().showGainWaysTips(jumpProp);
                    return;
                }
                if(jumpId == JumpIdx.Pass2){
                    //配置了跳转闯关
                    let _proxy: IPassProxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
                    _proxy.c2s_mainline_enter();
                    return;
                }
                let info = JumpDataList[jumpId];
                if(info && info.openIdx && !ViewMgr.getIns().checkViewOpen(info.openIdx,true)){
                    return;
                }
                ViewMgr.getIns().showViewByID(cfg.jump);
            }
        }

        /**快速完成任务*/
        public static quickTask(task: task_data): void {
            if(!task){
                return;
            }
            if(task.status == TaskStatus.NotFinish){
                let proxy: ITaskProxy = facade.retMod(ModName.Task).retProxy(ProxyType.Task);
                proxy.c2s_quick_task(task.task_id);
            }
        }

        /**任务奖励是否可领取*/
        public static canRewardDraw(task: task_data): boolean {
            if(!task){
                return false;
            }
            return task.status == TaskStatus.Finish;
        }

        /**任务奖励是否已领取*/
        public static hasRewardDraw(task: task_data): boolean {
            if(!task){
                return false;
            }
            return task.status == TaskStatus.Draw;
        }

        /**任务奖励是否已全部领取*/
        public static hasRewardAllDraw(type: number): boolean {
            let tasks = this.getTaskList(type, false);
            for(let task of tasks){
                if(task.status != TaskStatus.Draw){
                    return false;
                }
            }
            return true;
        }

        /** 获取任务类型*/
        public static getTaskType(taskId: number): number {
            let cfg = this.getCfg(taskId);
            return cfg.task_type;
        }

        /** 获取任务配置*/
        public static getCfg(taskId: number): MainTask1Config {
            let cfg: MainTask1Config = getConfigByNameId(ConfigName.MainTask1, taskId);
            return cfg;
        }

        /** 获取任务奖励 */
        public static getTaskReward(taskId: number): number[][] {
            let cfg = TaskUtil.getCfg(taskId);
            return cfg && cfg.rewards || []
        }

        /**
         *获取主线任务
         */
        public static getMainTask(): task_data {
            let tasks = this.getTaskList(TaskType.Main);
            return tasks.length ? tasks[0] : null;
        }

        //一键领取任务奖励，type：任务类型
        public static drawRewardByType(type: number): void {
            let proxy: ITaskProxy = facade.retMod(ModName.Task).retProxy(ProxyType.Task);
            proxy.c2s_one_key_task_recv_reward(type);
        }
    }
}