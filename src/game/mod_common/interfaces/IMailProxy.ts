namespace game.mod {
    import IProxy = base.IProxy;
    import oper_act_item = msg.oper_act_item;
    import Handler = base.Handler;

    export interface IMailProxy extends IProxy {
        mail_online_request_c2s():void;
        getTotalMailCnt():number;
    }
}