namespace game {
    export const enum TaskEvent {
        ON_TASK_UPDATE = "on_task_update",/**任务数据变更，数据携带任务类型列表*/
        ON_TASK_HINT = "on_task_hint",/**任务红点变更，只有变更时候才会派发，红点监听用，数据携带任务类型列表*/
    }

    export const enum TaskOpType {
        /** 全部 */
        All = 1,
        /** 部分更新 */
        Update = 2,
        /** 删除 */
        Del = 3,
    }

    export const enum TaskStatus {
        NotFinish = 0,/** 未完成 */
        Finish = 1,/** 完成 */
        Draw = 2,/** 领取 */
    }

    export const enum TaskType {
        Main = 1,/**主线任务*/
        Xiuxian = 3,/**修仙，转生任务*/
        Qiyuan = 34,/**奇缘任务*/
        Liveness = 35,/**日常活跃任务*/
        /**瑶姬降世*/
        Yaojijiangshi = 36,
        /**成神在即*/
        Chengshen = 37,
        /**仙侣*/
        Xianlv = 38,
        Achieve = 39,//成就系统
        Huashen = 40,//化神系统
        PunshList = 41,//新服冲榜
        ShenlingEvolve = 42,//神灵进化
        Fly = 43,//飞升任务
        HuashenZhilu = 44,//化神之路任务
        HuashenZhanshendian = 45,//化神战神殿任务
        UnionBeast = 47,
        Mining = 48,
        XujieTansuo = 49,//墟界探索
        Sea1 = 50,//幻境之海，仙界之海
        Sea2 = 51,//幻境之海，神界之海
        Sea3 = 52,//幻境之海，圣界之海
        KuafuDoufa = 53,//跨服斗法成就任务
        Honour = 55,//荣耀
    }
}
