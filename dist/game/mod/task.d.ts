declare namespace game.mod.task {
    class TaskMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.task {
    import task_data = msg.task_data;
    class TaskModel {
        /** 任务分类对象 */
        task_dic: {
            [task_id: number]: task_data;
        };
        /** 任务类型数据 */
        typeTasks: {
            [task_type: number]: task_data[];
        };
        /** 任务类型红点 */
        typeHints: {
            [task_type: number]: boolean;
        };
        /** 1 代表 （章节红点 and 可领取） */
        chapterHint: number;
        /** 执行中的任务id */
        curTaskId: number;
        /**暂停玩家战斗*/
        pauseFight: boolean;
        /**是否正在强制对话*/
        inNpcTaskFlag: boolean;
        /**自动执行任务结束时间*/
        autoEndTime: number;
        /**自动执行任务倒计时开始标志*/
        autoFlag: boolean;
        /**当前*/
        curDialogInfo: any;
        /**接取任务后，暂停玩家战斗时间*/
        pauseTime: number;
        /**去除主线任务暂停一分钟战斗标志*/
        continueMainTaskFlag: boolean;
        playEffectFlag: boolean;
        /** 引导key */
        guideKey: number;
        /** 引导index*/
        guideIdx: number;
        /**暂停主线任务*/
        stopMainTaskFlag: boolean;
    }
}
declare namespace game.mod.task {
    import task_data = msg.task_data;
    class TaskProxy extends ProxyBase implements ITaskProxy {
        private _model;
        getModel(): TaskModel;
        onStartReconnect(): void;
        initialize(): void;
        private cleanDataDict;
        /**
         * 请求任务信息
         * @param types，任务类型列表
         */
        all_task_info_c2s(types: number[]): void;
        /**
         * 快速完成任务
         * @param taskId
         */
        c2s_quick_task(taskId: number): void;
        /**
         * 领取奖励
         * @param taskId 任务完成后领取奖励
         */
        task_recv_reward_c2s(taskId: number): void;
        /**
         * 一键领取任务奖励
         * @param type 任务类型
         */
        c2s_one_key_task_recv_reward(type: number): void;
        /** 任务信息返回 */
        private all_task_info_s2c;
        private addTask;
        private getTaskPos;
        private updateHint;
        /**
         * 获取任务列表
         * @param type
         */
        getTaskList(type: number): task_data[];
        /**
         * 获取任务
         * @param taskId
         */
        getTask(taskId: number): task_data;
        /**
         * 获取任务红点
         * @param type
         */
        getTaskHint(type: number): boolean;
    }
}
