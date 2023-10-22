namespace game {

    export const enum EnhanceEvent {
        ON_GEM_ATTR_BACK = "on_gem_attr_back",              // 宝石属性
        UPDATE_STRENGTH_INFO = "update_strength_info",
        UPDATE_STRENGTH_MASTER_INFO = "update_strength_master_info",        // 强化大师
        UPDATE_GEM_INFO = "update_gem_info",
        UPDATE_GEM_MASTER_INFO = "update_gem_master_info",
        UPDATE_GEM_ONE_KEY_INSET = "update_gem_one_key_inset",//宝石一键镶嵌
        UPDATE_ADVANCED_INFO = "update_advanced_info",
        UPDATE_ADVANCED_MASTER_INFO = "update_advance_master_info",
    }

    // 配置表的基础id值
    export const enum EnhanceCfgBaseId {
        STRENGTH_BASE = 150100000,                // 等级表，强化等级
        ADVANDE_BASE= 158101000,                 // 等级表，进阶等级
        STRENGTH_MASTER_BASE = 150200000,         // 等级表，强化大师等级
        GEM_BASE = 150300000,                     // 等级表，宝石等级
        ADVANCE_MASTER_BASE = 158000000,          // 等级表，进阶大师等级
    }

}