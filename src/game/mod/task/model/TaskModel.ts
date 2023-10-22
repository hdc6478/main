namespace game.mod.task {

    import task_data = msg.task_data;

    export class TaskModel {
        /** 任务分类对象 */
        public task_dic: { [task_id: number]: task_data };
        /** 任务类型数据 */
        public typeTasks: { [task_type: number]: task_data[] };
        /** 任务类型红点 */
        public typeHints: { [task_type: number]: boolean };

        /** 1 代表 （章节红点 and 可领取） */
        public chapterHint: number;

        /** 执行中的任务id */
        public curTaskId: number;

        /**暂停玩家战斗*/
        public pauseFight: boolean = false;
        /**是否正在强制对话*/
        public inNpcTaskFlag: boolean = false;
        /**自动执行任务结束时间*/
        public autoEndTime: number;
        /**自动执行任务倒计时开始标志*/
        public autoFlag: boolean = false;

        /**当前*/
        public curDialogInfo: any;
        /**接取任务后，暂停玩家战斗时间*/
        public pauseTime: number;

        /**去除主线任务暂停一分钟战斗标志*/
        public continueMainTaskFlag: boolean = false;

        public playEffectFlag: boolean = false; //播放特效
        /** 引导key */
        public guideKey: number;
        /** 引导index*/
        public guideIdx: number;
        /**暂停主线任务*/
        public stopMainTaskFlag: boolean = false;
    }
}