declare namespace game.mod.equip {
    class EquipMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.equip {
    import pos_detail = msg.pos_detail;
    class EquipModel {
        equips: PropData[];
        equipInfo: pos_detail;
        easyEquip: {
            [pos: number]: PropData;
        };
    }
}
declare namespace game.mod.equip {
    import GameNT = base.GameNT;
    import pos_detail = msg.pos_detail;
    class EquipProxy extends ProxyBase implements IEquipProxy {
        private _model;
        initialize(): void;
        onStartReconnect(): void;
        /**============================= 新增代码部分 =============================*/
        c2s_new_equip_online_request(): void;
        s2c_equip_online_equip_request(n: GameNT): void;
        /**
         * @param oper 1：穿  2：脱  3：一键穿戴
         * @param prop_id 装备的唯一id（一键穿戴可缺省）
         */
        c2s_equip_operate(oper: number, prop_id: Long): void;
        /**
         * 装备更新
         */
        private s2c_equip_update;
        private getEquipInfoPos;
        /**根据部位返回装备数据*/
        getEquipByPos(pos?: number): PropData;
        /**更新装备进阶等级*/
        updateEquipAdvancedLv(pos: number, lv: number): void;
        getEquipListByPos(pos: number): PropData[];
        /**检查对应的pos是否有装备可穿戴*/
        checkEquipByPos(pos: number): boolean;
        /**能否一键装备*/
        checkOneKey(): boolean;
        /**更新角色界面装备部位的红点*/
        private updateEquipIconHint;
        getRoleEquipIconHint(): string[];
        protected onBagUpdateByBagType(n: GameNT): void;
        checkEquipLimit(prop: PropData): boolean;
        /**============================= 新增代码部分 end =============================*/
        /**
         *
         * @param index
         * @param is_robot 1 是【只用于聊天展示装备信息的机器人】  /其他情况不发该字段  null / 0 不是
         */
        c2s_equip_get_info(index: number, is_robot: number): void;
        /**装备部位查看详情
         * @param posId 装备部位
         * @param roleId 点击查看他人装备时才使用该字段【选择目标的role_id】
         * @param serverId 点击查看他人装备时才使用该字段【服务器ID】
         */
        c2s_equip_pos_detail(posId: number, roleId?: Long, serverId?: number): void;
        /**
         *获取角色战备列表
         */
        readonly equips: PropData[];
        /**
         * 获取装备详情
         */
        equipInfo: pos_detail;
        protected onOpenFuncUpdate(n: GameNT): void;
    }
}
