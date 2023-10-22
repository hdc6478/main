namespace game.mod {

    import IProxy = base.IProxy;
    import task_data = msg.task_data;

    export interface ITaskProxy extends IProxy {
        /**不要直接访问proxy数据，通过TaskUtil访问*/
        all_task_info_c2s(types: number[]): void;/**请求任务信息*/
        c2s_quick_task(taskId: number): void;/**快速完成任务*/
        task_recv_reward_c2s(taskId: number): void;/**领取奖励 */
        getTaskList(type: number): task_data[];/**获取任务列表*/
        getTask(taskId: number): task_data;/**获取任务*/
        getTaskHint(type: number): boolean;/**获取任务红点*/
        getTaskList(type: number): task_data[];/**获取任务列表*/
        c2s_one_key_task_recv_reward(type: number): void;//一键领取任务奖励
    }
}