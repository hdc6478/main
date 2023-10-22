namespace game.mod {

    import IProxy = base.IProxy;

    export interface IXiandiProxy extends IProxy {
        checkOpen(): boolean;
        c2s_xiandi_zhengba_oper(oper_type: number, params?: number, role_id?: Long): void;
        xiandi_open: number;
    }
}