namespace game.mod {

    import IProxy = base.IProxy;
    import attributes = msg.attributes;

    export interface IXianluProxy extends IProxy {
        readonly xianpolevel: number;//仙魄等级
        readonly xianpoattr: attributes;//仙魄属性
    }

}