namespace game.mod {
    import IProxy = base.IProxy;
    import oper_act_item = msg.oper_act_item;

    export interface IActivityProxy extends IProxy {
        getOperActList(actType: number): oper_act_item[];
    }
}