namespace game.mod {
    import IProxy = base.IProxy;
    import oper_act_item = msg.oper_act_item;

    export interface IFlyRankProxy extends IProxy {
        getRankProp(actInfo: oper_act_item): number
    }
}