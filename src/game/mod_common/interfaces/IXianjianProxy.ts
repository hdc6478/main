namespace game.mod {

    import IProxy = base.IProxy;
    import fly_sword_info = msg.fly_sword_info;
    import attributes = msg.attributes;
    import XianjianJibanConfig = game.config.XianjianJibanConfig;
    import jiban_item = msg.jiban_item;

    export interface IXianjianProxy extends IProxy {
        c2s_fly_sword_operation(index: number, op: number, param: number): void

        getInfo(index:number):fly_sword_info;

        getAttr(): attributes;//仙剑总属性

        jibans:jiban_item[];

        skills:number[];

        canJibanAct(cfg:XianjianJibanConfig):boolean;

    }
}