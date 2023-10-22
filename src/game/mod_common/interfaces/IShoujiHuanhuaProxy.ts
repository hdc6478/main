namespace game.mod {

    import IProxy = base.IProxy;

    export interface IShoujiHuanhuaProxy extends IProxy {
        canTaskActGather(): boolean;//任务收集指引
    }

}