namespace game.mod {

    import IProxy = base.IProxy;

    export interface IHintProxy extends IProxy {
        /**不要直接访问proxy数据，通过HintMgr访问*/
        getHint(node: string[]): boolean;/**获取红点*/
        setHint(value: boolean, node: string[], openIdx?: number): void;/**设置红点 （注意子节点key的唯一）*/
        getHintByOpenIdx(openIdx: number): boolean;/**根据功能idx获取红点*/
        getTypeByOpenIdx(openIdx: number): string;/**根据功能idx获取红点唯一key*/
        addTimeEvent(type: number, time: number, proxy: any, method: Function, args?: any[]): void;/**添加定时器事件*/
        hasTimeEvent(type: number): boolean;//是否存在定时器事件
        removeTimeEvent(type: number): void;//移除定时器事件
    }
}