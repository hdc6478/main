namespace game.mod {
    import IProxy = base.IProxy;
    import equip_strength_data = msg.equip_strength_data;
    import gem_data = msg.gem_data;
    import advanced_master_data = msg.advanced_master_data;

    export interface IEnhanceProxy extends IProxy {
        /**
         * 根据部位获取强化信息
         * @param pos
         */
        getStrengthInfo(pos: number): equip_strength_data;

        /**
         * 宝石数据
         * @param pos 部位，0~9
         * @returns
         */
        getGemInfo(pos: number): gem_data[];

        /**
         * 进阶大师属性（套装属性）
         */
        getAdvancedMaster(): advanced_master_data
    }
}