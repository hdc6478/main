namespace game.mod {

    import IProxy = base.IProxy;
    import pos_detail = msg.pos_detail;

    export interface IEquipProxy extends IProxy {

        equipInfo: pos_detail;
        readonly equips: PropData[];

        c2s_equip_operate(oper: number, prop_id: Long): void;

        c2s_equip_pos_detail(posId: number, roleId?: Long, serverId?: number): void;

        /**==========new=============*/
        c2s_new_equip_online_request(): void;

        getEquipByPos(pos: number): PropData;

        getRoleEquipIconHint(): string[];

        checkOneKey(): boolean;

        updateEquipAdvancedLv(pos: number, lv: number): void;

        checkEquipLimit(prop: PropData): boolean;

        checkEquipByPos(pos:number):boolean;
    }

}