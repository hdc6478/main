namespace game.mod {
    import IProxy = base.IProxy;
    import zhandui_legion_attribute = msg.zhandui_legion_attribute;

    export interface IXujieTansuoProxy extends IProxy {
        readonly shenling_list: Long[];
        readonly legion_attr: zhandui_legion_attribute;
    }

}