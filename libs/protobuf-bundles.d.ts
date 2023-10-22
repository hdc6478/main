/** Namespace msg. */
declare namespace msg {

    /** 登陆帐号 */
    class c2s_signin_account {

        /** Constructs a new c2s_signin_account. */
        constructor();

        /** c2s_signin_account param. */
        public param: string;

        /** 渠道 */
        public channel: string;

        /** 协议版本号 */
        public pb_version: string;

        /** 地图版本号 */
        public map_version: string;
    }

    /** Represents a s2c_signin_account. */
    class s2c_signin_account {

        /** Constructs a new s2c_signin_account. */
        constructor();

        /** 登录结果 1表示登录成功 2没有账号 3密钥不正确 4表示协议版本不对 5登录时间戳超时 6地图资源版本错误 7进错服 8无role_id */
        public result: number;

        /** 帐号 */
        public account: string;

        /** 角色id */
        public role_id: Long;

        /** 名字 */
        public name: string;

        /** 等级 */
        public level: number;

        /** 性别 */
        public sex: number;

        /** 1:少年 2:成年 */
        public age_type: number;

        /** 门派 */
        public school: number;

        /** 造型 */
        public shape: number;

        /** 创建时间 */
        public create_time: number;

        /** 是否开启防沉迷 */
        public open_verify: boolean;
    }

    /** 创建角色 */
    class c2s_create_role {

        /** Constructs a new c2s_create_role. */
        constructor();

        /** c2s_create_role name. */
        public name: string;

        /** 男1女0 */
        public sex: number;

        /** 1:少年 2:成年 */
        public age_type: number;

        /** 门派 */
        public school: number;
    }

    /** Represents a s2c_create_role. */
    class s2c_create_role {

        /** Constructs a new s2c_create_role. */
        constructor();

        /** 登录结果 1表示创建角色 2标识系统错误 3角色名重复 4已经创建过角色 5包含屏蔽词 6系统繁忙 */
        public result: number;

        /** s2c_create_role role_id. */
        public role_id: Long;

        /** s2c_create_role create_time. */
        public create_time: number;
    }

    /** 更新飘字特殊属性 */
    class s2c_role_spattr {

        /** Constructs a new s2c_role_spattr. */
        constructor();

        /** 理由id */
        public reason_id: number;

        /** 战斗力 */
        public fight_power: number;

        /** 经验 */
        public exp: Long;

        /** 铜钱 */
        public copper: Long;

        /** 元宝 */
        public gold: Long;

        /** 灵气 */
        public spirit: Long;

        /** 经验 */
        public diff_exp: Long;
    }

    /** 登录角色 */
    class c2s_login_role {

        /** Constructs a new c2s_login_role. */
        constructor();

        /** 角色uuid */
        public role_id: Long;
    }

    /** Represents a ride_equip_item. */
    class ride_equip_item {

        /** Constructs a new ride_equip_item. */
        constructor();

        /** 部位 */
        public pos: number;

        /** 装备信息 */
        public equip_info?: (msg.prop_attributes|null);

        /** 强化等级 */
        public strength_lv: number;

        /** 强化经验 */
        public strength_exp: number;

        /** 强化升级所需经验 */
        public strength_lvup_exp: number;

        /** 强化属性 */
        public strength_attr?: (msg.attributes|null);

        /** 下级强化属性 */
        public next_strength_attr?: (msg.attributes|null);

        /** 强化消耗的道具 */
        public prop_index: number;
    }

    /** Represents a property. */
    class property {

        /** Constructs a new property. */
        constructor();

        /** 固定属性部分 */
        public role_id: Long;

        /** 经验 */
        public exp: Long;

        /** 名字 */
        public name: string;

        /** 等级 */
        public level: number;

        /** 性别 */
        public sex: number;

        /** 1:少年 2:成年 */
        public age_type: number;

        /** 门派 */
        public school: number;

        /** 时装 */
        public fashion: number;

        /** 神兵 */
        public weapon: number;

        /** 羽翼 */
        public wing: number;

        /** 头像 */
        public head: Long;

        /** property agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 头像框 */
        public head_frame: Long;

        /** 升级所需经验 */
        public levelup_exp: Long;

        /** 仙盟name */
        public guild_name: string;

        /** 称号index */
        public title_index: Long;

        /** 称号升星数 */
        public title_star: number;

        /** 角色创建时间 */
        public create_time: number;

        /** 服务器id */
        public server_id: number;

        /** 聊天框 */
        public chat_frame: number;

        /** 转生 */
        public reincarnate: number;

        /** 0 不坐   1坐 */
        public ride_state: number;

        /** 仙气 */
        public xianqi: number;

        /** VIP index */
        public vip_lv: number;

        /** 魅力 */
        public trearate: number;

        /** 伴侣ID */
        public mate_id: Long;

        /** 伴侣名字 */
        public mate_name: string;

        /** 0:没结婚 1：求婚者   2：被求婚者 */
        public marry_type: number;

        /** 结婚时间戳 */
        public marry_time: number;

        /** 仙盟职位 */
        public team_position: number;

        /** 累计充值人民币数 */
        public charge_rmb: number;

        /** true 荣耀会员 false 不是 */
        public honor_vip: boolean;

        /** true 至尊会员 false 不是 */
        public extreme_vip: boolean;

        /** 每天充值了多少rmb */
        public day_charge_rmb: number;

        /** property is_mojin. */
        public is_mojin: boolean;

        /** 货币和积分部分 */
        public copper: Long;

        /** 元宝 */
        public gold: Long;

        /** 仙玉 */
        public diamond: Long;

        /** 灵气 */
        public lingqi: Long;

        /** 神灵精华 */
        public godess: Long;

        /** 木材 */
        public wood: Long;

        /** 脉气 */
        public maiqi: Long;

        /** 封神古币 */
        public fscoin: Long;

        /** 游历古币 */
        public ylcoin: Long;

        /** 道侣仙石 */
        public dlcoin: Long;

        /** 灵脉灵石 */
        public lmcoin: Long;

        /** 星之魂石 */
        public xzcoin: Long;

        /** 声望 */
        public prestige: Long;

        /** 竞技币 */
        public jjb: Long;

        /** 时光币 */
        public sgcoin: Long;

        /** 供奉积分 */
        public gfjs: Long;

        /** 火系灵力点 */
        public huo_linglipoint: Long;

        /** 水系灵力点 */
        public shui_linglipoint: Long;

        /** 风系灵力点 */
        public feng_linglipoint: Long;

        /** 雷系灵力点 */
        public lei_linglipoint: Long;

        /** 暗系灵力点 */
        public an_linglipoint: Long;

        /** 光系灵力点 */
        public guang_linglipoint: Long;

        /** 天坛祭品 */
        public guild_tiantan: Long;

        /** 圣坛祭品 */
        public guild_shengtan: Long;

        /** 仙胎灵气 */
        public xtlqcoin: Long;

        /** 三生石 */
        public ssscoin: Long;

        /** 成就积分 */
        public chengjiu_jifen: Long;

        /** property attic_point. */
        public attic_point: Long;

        /** 飞升经验 */
        public feisheng_exp: Long;

        /** 化神经验 */
        public huashen_exp: Long;

        /** 修正笔记 */
        public xiuzhenbiji: Long;

        /** property caiyun_yinji. */
        public caiyun_yinji: Long;

        /** property xingshi. */
        public xingshi: Long;

        /** property guild_score. */
        public guild_score: Long;

        /** property guild_xianshou_exp. */
        public guild_xianshou_exp: Long;

        /** property zhandui_jitan_value. */
        public zhandui_jitan_value: Long;

        /** 战队祭坛水晶 */
        public zhandui_jitan_shuijin: Long;

        /** 创世女神亲密度 */
        public cs_nvshen_qinmi: Long;

        /** 创世女神创世能量 */
        public cs_nvshen_nengliang: Long;

        /** property fengmo_score. */
        public fengmo_score: Long;

        /** property xianmai_score. */
        public xianmai_score: Long;

        /** property xjzh_nl. */
        public xjzh_nl: Long;

        /** property sjzh_nl. */
        public sjzh_nl: Long;

        /** property sgjzh_nl. */
        public sgjzh_nl: Long;

        /** property guild_exp. */
        public guild_exp: Long;

        /** property huanggu_shuijing. */
        public huanggu_shuijing: Long;

        /** property xianqi_value. */
        public xianqi_value: Long;

        /** property xianwei_value. */
        public xianwei_value: Long;
    }

    /** Represents a privilege_info. */
    class privilege_info {

        /** Constructs a new privilege_info. */
        constructor();

        /** privilege_info key. */
        public key: string;

        /** privilege_info value. */
        public value: number;
    }

    /** Represents a s2c_privilege_info. */
    class s2c_privilege_info {

        /** Constructs a new s2c_privilege_info. */
        constructor();

        /** s2c_privilege_info list. */
        public list: msg.privilege_info[];
    }

    /** Represents an attributes. */
    class attributes {

        /** Constructs a new attributes. */
        constructor();

        /** 数值类 */
        public showpower: Long;

        /** "神力战力", -- 1001 */
        public godpower: Long;

        /** "攻击",     -- 1002 */
        public atk: Long;

        /** "最大生命", -- 1003 */
        public max_hp: Long;

        /** "当前生命", -- 1004 */
        public hp: Long;

        /** "防御",     -- 1005 */
        public armor: number;

        /** "破甲",     -- 1006 */
        public armor_break: number;

        /** "暴击",     -- 1007 */
        public crit: number;

        /** "抗暴",     -- 1008 */
        public recrit: number;

        /** "闪避",     -- 1009 */
        public dodge: number;

        /** "命中",     -- 1010 */
        public hit: number;

        /** "格挡",     -- 1011 */
        public block: number;

        /** "破击",     -- 1012 */
        public block_break: number;

        /** "绝对攻击", -- 1013 */
        public true_atk: number;

        /** "绝对防御", -- 1014 */
        public true_def: number;

        /** "神力",      --1015 */
        public god: number;

        /** "神力攻击",   --1016 */
        public god_atk: number;

        /** "神力防御",   --1017 */
        public god_def: number;

        /** "神力生命",   --1018 */
        public god_hp: number;

        /** "攻速",       --1019 */
        public atkspeed: number;

        /** "风系等级", -- 1020 */
        public wind_val: number;

        /** "雷系等级", -- 1021 */
        public mine_val: number;

        /** "水系等级", -- 1022 */
        public water_val: number;

        /** "火系等级", -- 1023 */
        public fire_val: number;

        /** "爆伤加成数值",-- 1023 */
        public crit_imprate: number;

        /** "爆伤减免数值",-- 1024 */
        public crit_ductrate: number;

        /** "风系攻击",   -- 1025 */
        public wind_atk: number;

        /** "雷系攻击",   -- 1026 */
        public mine_atk: number;

        /** "水系攻击",   -- 1027 */
        public water_atk: number;

        /** "火系攻击",   -- 1028 */
        public fire_atk: number;

        /** "坐骑伤害",   -- 1029 */
        public mount_val: number;

        /** "元灵伤害",   -- 1030 */
        public spirits_val: number;

        /** "子女伤害",     -- 1031 */
        public child_val: number;

        /** "飞剑伤害",     -- 1032 */
        public flysword_val: number;

        /** "法器伤害",     -- 1033 */
        public ritual_val: number;

        /** "坐骑攻击",     -- 1034 */
        public mount_atk: number;

        /** "元灵攻击",     -- 1035 */
        public yualing_atk: number;

        /** "子女攻击",     -- 1040 */
        public child_atk: number;

        /** "飞剑真实伤害",     -- 1041 */
        public flysword_real_val: number;

        /** "坐骑附加数值的伤害",   -- 1043 */
        public mount_append_val: number;

        /** "元灵附加数值的伤害",   -- 1044 */
        public spirits_append_val: number;

        /** 羽翼附加伤害      -- 1042 */
        public godwing_append_val: number;

        /** 神兵附加伤害      -- 1045 */
        public god_append_val: number;

        /** 飞剑攻击          -- 1046 */
        public flysword_atk: number;

        /** attributes theGod_atk. */
        public theGod_atk: number;

        /** 万分比 */
        public imprate: number;

        /** "伤害减免",       -- 2021 */
        public damdeductrate: number;

        /** "PK增伤",         -- 2022 */
        public pkdamrate: number;

        /** "PK减伤",         -- 2023 */
        public pkdedamrate: number;

        /** "暴击率加成" */
        public critrate: number;

        /** "暴击伤害加成",    -- 2025 */
        public critval: number;

        /** "闪避率",         -- 2026 */
        public dorate: number;

        /** "命中率",         -- 2027 */
        public hitrate: number;

        /** "格挡率",         -- 2028 */
        public block_rate: number;

        /** "格挡效果",       -- 2029 */
        public block_val: number;

        /** "破击率",         -- 2030 */
        public block_break_rate: number;

        /** "破击效果",       -- 2031 */
        public block_break_val: number;

        /** "斩魂伤害",       -- 2032 */
        public zhanhun_rate: number;

        /** "斩魂概率",       -- 2033 */
        public zhanhun_val: number;

        /** "背饰暴击率",     -- 2034 */
        public back_crit: number;

        /** "神兵暴击率",     -- 2035 */
        public dt_crit: number;

        /** "坐骑暴击率",     -- 2036 */
        public mount_crit: number;

        /** "元神暴击率",     -- 2037 */
        public purusa_crit: number;

        /** "子女暴击率",     -- 2038 */
        public child_crit: number;

        /** "飞剑暴击率",     -- 2039 */
        public flysword: number;

        /** "抗暴率加成",     -- 2040 */
        public un_critrate: number;

        /** "爆伤减免",       -- 2042 */
        public un_critval: number;

        /** "技能伤害加成",   -- 2043 */
        public skill_imprate: number;

        /** "技能伤害减免",   -- 2044 */
        public skill_ductrate: number;

        /** "兽灵一击",       -- 2045 */
        public animal_rate: number;

        /** "风系合击伤害增强万分比",  -- 2046 */
        public wind_together_val: number;

        /** "雷系合击伤害增强万分比",   -- 2047 */
        public mine_together_val: number;

        /** "水系合击伤害增强万分比",  -- 2048 */
        public water_together_val: number;

        /** "火系合击伤害增强万分比",   -- 2049 */
        public fire_together_val: number;

        /** "风系合击效果延长时间",  -- 2050 */
        public wind_rate: number;

        /** "雷系合击效果触发概率",  -- 2051 */
        public mine_rate: number;

        /** "水系合击效果触发概率",  -- 2052 */
        public water_rate: number;

        /** "火系合击效果触发概率",  -- 2053 */
        public fire_rate: number;

        /** "风系对boss伤害增加",  -- 2054 */
        public wind_boss_val: number;

        /** "雷系对boss伤害增加",  -- 2055 */
        public mine_boss_val: number;

        /** "水系对boss伤害增加",  -- 2056 */
        public water_boss_val: number;

        /** "火系对boss伤害增加",  -- 2057 */
        public fire_boss_val: number;

        /** "神将伤害加强", */
        public buddy_damage: number;

        /** "风属性抗性",  -- 5001 */
        public wind_res: number;

        /** "雷属性抗性",  -- 5002 */
        public mine_res: number;

        /** "水属性抗性",  -- 5003 */
        public water_res: number;

        /** "火属性抗性",  -- 5004 */
        public fire_res: number;

        /** "风属性伤害",  -- 5005 */
        public wind_damage: number;

        /** "雷属性伤害",  -- 5006 */
        public mine_damage: number;

        /** "水属性伤害",  -- 5007 */
        public water_damage: number;

        /** "火属性伤害",  -- 5008 */
        public fire_damage: number;

        /** "风属性暴击",  -- 5009 */
        public wind_crit: number;

        /** "雷属性暴击",  -- 5010 */
        public mine_crit: number;

        /** "水属性暴击",  -- 5011 */
        public water_crit: number;

        /** "火属性暴击",  -- 5012 */
        public fire_crit: number;

        /** "风属性爆伤",  -- 5013 */
        public wind_crit_val: number;

        /** "雷属性爆伤",  -- 5014 */
        public mine_crit_val: number;

        /** "水属性爆伤",  -- 5015 */
        public water_crit_val: number;

        /** "火属性爆伤",  -- 5016 */
        public fire_crit_val: number;

        /** attributes theGod_energy. */
        public theGod_energy: number;

        /** attributes theGod_addtime. */
        public theGod_addtime: number;

        /** attributes theGod_resume. */
        public theGod_resume: number;

        /** attributes theGod_resume_5. */
        public theGod_resume_5: number;

        /** attributes theGod_resume_rate. */
        public theGod_resume_rate: number;

        /** 生命加成 万分率 */
        public p_max_hp: number;

        /** 攻击加成 万分率 */
        public p_atk: number;

        /** 护甲加成 万分率 */
        public p_def: number;

        /** 经验获取增加 */
        public exp_up: number;

        /** 银两获取增加 */
        public money_up: number;

        /** 稀有掉率 */
        public item_up: number;

        /** 在线挂机收益 */
        public hanguprate: number;

        /** 在线挂机收益 */
        public offlinerate: number;

        /** 任务时间缩短x秒 */
        public task_retime: number;

        /** 任务时间缩短 */
        public p_task_retime: number;

        /** 任务宝地经验加成 */
        public p_baodi_exp: number;

        /** 任务产出翻倍概率 */
        public dbin_task_rate: number;

        /** 脉气获取速度 */
        public lingqi_add_speed: number;

        /** 共享道侣子女属性 */
        public child_share_rate: number;

        /** 坐骑伤害百分比 */
        public mount_append_rate: number;

        /** 元灵伤害百分比 */
        public spirits_append_rate: number;

        /** 羽翼伤害百分比 */
        public godwing_append_rate: number;

        /** 神兵伤害百分比 */
        public god_append_rate: number;

        /** 飞剑伤害百分比 */
        public flysword_atk_append_rate: number;

        /** 化神伤害百分比 */
        public thegod_atk_rate: number;

        /** 灭魔裁决触发概率(万分比） */
        public miemo_ratio: number;

        /** 灭魔裁决伤害加成(万分比） */
        public jewelry_atk_add_rate: number;
    }

    /** Represents a sys_attrs. */
    class sys_attrs {

        /** Constructs a new sys_attrs. */
        constructor();

        /** sys_attrs sys_id. */
        public sys_id: number;

        /** sys_attrs skill_add_damage. */
        public skill_add_damage: number;

        /** sys_attrs cd. */
        public cd: number;

        /** sys_attrs crit. */
        public crit: number;

        /** sys_attrs critval. */
        public critval: number;

        /** sys_attrs boss_damage. */
        public boss_damage: number;

        /** sys_attrs add_damage_rate. */
        public add_damage_rate: number;

        /** sys_attrs add_damage_val. */
        public add_damage_val: number;

        /** sys_attrs theGod_energy. */
        public theGod_energy: number;

        /** sys_attrs theGod_addtime. */
        public theGod_addtime: number;

        /** sys_attrs theGod_resume. */
        public theGod_resume: number;

        /** sys_attrs theGod_resume_5. */
        public theGod_resume_5: number;

        /** sys_attrs theGod_resume_rate. */
        public theGod_resume_rate: number;
    }

    /** Represents a s2c_sys_attributes. */
    class s2c_sys_attributes {

        /** Constructs a new s2c_sys_attributes. */
        constructor();

        /** s2c_sys_attributes attrs. */
        public attrs: msg.sys_attrs[];
    }

    /** Represents a c2s_sys_attributes. */
    class c2s_sys_attributes {

        /** Constructs a new c2s_sys_attributes. */
        constructor();

        /** c2s_sys_attributes sys_id. */
        public sys_id: number;
    }

    /** 前端配置数据项 */
    class setting {

        /** Constructs a new setting. */
        constructor();

        /** setting key. */
        public key: string;

        /** setting value. */
        public value: string;
    }

    /** Represents a s2c_login_role. */
    class s2c_login_role {

        /** Constructs a new s2c_login_role. */
        constructor();

        /** 基础属性 */
        public propertys?: (msg.property|null);

        /** 战斗属性 */
        public attrs?: (msg.attributes|null);

        /** s2c_login_role settings. */
        public settings: msg.setting[];

        /** 进程启动的UTC时间 时间戳 单位：秒 */
        public starttime: number;

        /** 服务器运行多久           单位：厘秒 */
        public now: number;

        /** 开服时间戳 */
        public server_open_date: number;

        /** 开服第几天 */
        public server_day: number;

        /** 累计登录天数 */
        public login_day: number;
    }

    /** 前端配置数据 */
    class c2s_setting {

        /** Constructs a new c2s_setting. */
        constructor();

        /** c2s_setting key. */
        public key: string;

        /** c2s_setting value. */
        public value: string;
    }

    /** 使用gm命令 */
    class c2s_gm_code {

        /** Constructs a new c2s_gm_code. */
        constructor();

        /** c2s_gm_code gm_str. */
        public gm_str: string;
    }

    /** 服务端主动发 */
    class c2s_ping {

        /** Constructs a new c2s_ping. */
        constructor();
    }

    /** Represents a s2c_ping. */
    class s2c_ping {

        /** Constructs a new s2c_ping. */
        constructor();
    }

    /** Represents a s2c_server_msgbox. */
    class s2c_server_msgbox {

        /** Constructs a new s2c_server_msgbox. */
        constructor();

        /** s2c_server_msgbox title. */
        public title: string;

        /** s2c_server_msgbox body. */
        public body: string;
    }

    /** Represents a s2c_disconnect. */
    class s2c_disconnect {

        /** Constructs a new s2c_disconnect. */
        constructor();

        /** 断开原因 */
        public reason: number;

        /** s2c_disconnect content. */
        public content: string;
    }

    /** 离线 */
    class c2s_disconnect {

        /** Constructs a new c2s_disconnect. */
        constructor();
    }

    /** 聊天装扮/////////// */
    class c2s_base_surface_open_ui {

        /** Constructs a new c2s_base_surface_open_ui. */
        constructor();
    }

    /** 基础外显结构体 */
    class base_surface_item {

        /** Constructs a new base_surface_item. */
        constructor();

        /** 装扮idx */
        public index: Long;

        /** 装扮等级 */
        public lv: number;

        /** 等级属性 */
        public attr?: (msg.attributes|null);
    }

    /** Represents a base_surface_suit. */
    class base_surface_suit {

        /** Constructs a new base_surface_suit. */
        constructor();

        /** 套装idx */
        public index: Long;

        /** 套装等级(取决于套装内最低等级的装扮) 0级表示没有激活 */
        public suit_lv: number;

        /** 套装属性 */
        public attr?: (msg.attributes|null);
    }

    /** Represents a s2c_base_surface_open_ui. */
    class s2c_base_surface_open_ui {

        /** Constructs a new s2c_base_surface_open_ui. */
        constructor();

        /** 当前穿戴头像idx */
        public head: Long;

        /** s2c_base_surface_open_ui agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 当前穿戴头像框idx */
        public head_frame: Long;

        /** 当前穿戴汽泡idx */
        public chat_frame: Long;

        /** 装扮列表 */
        public surface_list: msg.base_surface_item[];

        /** 套装列表 */
        public surface_suit_list: msg.base_surface_suit[];
    }

    /** Represents a c2s_base_surface_change. */
    class c2s_base_surface_change {

        /** Constructs a new c2s_base_surface_change. */
        constructor();

        /** 编号 */
        public index: Long;
    }

    /** 基础外显升级 */
    class c2s_base_surface_lvup {

        /** Constructs a new c2s_base_surface_lvup. */
        constructor();

        /** 装扮idx */
        public index: Long;

        /** 消耗idx */
        public cost_idx: Long;
    }

    /** 修改玩家名字 */
    class c2s_change_name_sex {

        /** Constructs a new c2s_change_name_sex. */
        constructor();

        /** c2s_change_name_sex new_name. */
        public new_name: string;

        /** c2s_change_name_sex new_sex. */
        public new_sex: number;

        /** 1:少年 2:成年 */
        public new_age_type: number;
    }

    /** 客户端请求同步时间 */
    class c2s_sync_time {

        /** Constructs a new c2s_sync_time. */
        constructor();
    }

    /** 服务端返回同步时间 */
    class s2c_sync_time {

        /** Constructs a new s2c_sync_time. */
        constructor();

        /** 服务器运行多久 单位：厘秒 */
        public now: number;
    }

    /** Represents a s2c_sync_role_attr. */
    class s2c_sync_role_attr {

        /** Constructs a new s2c_sync_role_attr. */
        constructor();

        /** 基础属性 */
        public propertys?: (msg.property|null);

        /** 战斗属性 */
        public attrs?: (msg.attributes|null);
    }

    /** Represents a s2c_on_new_day. */
    class s2c_on_new_day {

        /** Constructs a new s2c_on_new_day. */
        constructor();

        /** 开服第几天 */
        public server_day: number;

        /** 累计登录天数 */
        public login_day: number;
    }

    /** 确定框发送给前端 */
    class s2c_pop_box {

        /** Constructs a new s2c_pop_box. */
        constructor();

        /** 确定框样式 1、下线通知 */
        public box_style: number;

        /** 标题 */
        public box_head: string;

        /** 内容 */
        public box_body: string;

        /** 确认框id */
        public box_id: number;

        /** 结束时间 */
        public end_time: number;

        /** 按钮列表 */
        public button_names: string[];

        /** s2c_pop_box is_cross. */
        public is_cross: number;
    }

    /** 确定框返回给服务端 */
    class c2s_pop_box {

        /** Constructs a new c2s_pop_box. */
        constructor();

        /** 确认框id */
        public box_id: number;

        /** 按钮id */
        public button_id: number;

        /** c2s_pop_box is_cross. */
        public is_cross: number;
    }

    /** Represents a jipin_attrs_data. */
    class jipin_attrs_data {

        /** Constructs a new jipin_attrs_data. */
        constructor();

        /** 极品属性 */
        public jipin_attrs?: (msg.attributes|null);

        /** 品质 */
        public quality: number;
    }

    /** Represents a nvshen_hunka_struct. */
    class nvshen_hunka_struct {

        /** Constructs a new nvshen_hunka_struct. */
        constructor();

        /** 类型索引 */
        public itype: number;

        /** 词条属性 */
        public attr?: (msg.attributes|null);

        /** 词条等级 */
        public level: number;

        /** 魂卡合成所需字段，用于显示成功率 万分比 */
        public rate: number;
    }

    /** 需要发送到客户端的物品属性 */
    class prop_attributes {

        /** Constructs a new prop_attributes. */
        constructor();

        /** 基础相关 */
        public prop_id: Long;

        /** 物品编号 */
        public index: Long;

        /** 数量 */
        public count: number;

        /** 绑定类型 0:不绑定 1:绑定 */
        public bind_type: number;

        /** 添加到背包的时间 */
        public add_time: number;

        /** 打造者名字 */
        public maker: string;

        /** prop_attributes born_login_days. */
        public born_login_days: number;

        /** 属性及技能相关 */
        public jipin_list: msg.jipin_attrs_data[];

        /** 增幅属性等级 */
        public zengfu_lv: number;

        /** 固定属性 */
        public regular_attrs?: (msg.attributes|null);

        /** 下一阶固定属性 */
        public next_regular_attrs?: (msg.attributes|null);

        /** prop_attributes zengfu_attrs. */
        public zengfu_attrs?: (msg.attributes|null);

        /** 查看玩家信息需要用强化/宝石/进阶的结构/////////// */
        public strength: number;

        /** 强化属性 */
        public strength_attrs?: (msg.attributes|null);

        /** 宝石列表 */
        public gems: msg.gem_data[];

        /** 进阶等级 */
        public advanced_lv: number;

        /** 进阶属性 */
        public advanced_attrs?: (msg.attributes|null);

        /** prop_attributes advanced_master_attrs. */
        public advanced_master_attrs?: (msg.attributes|null);

        /** 魂卡相关数据//////////////////////// */
        public hunka_star: number;

        /** 魂卡资质 */
        public hunka_zizhi: number;

        /** 固定词条 */
        public guding?: (msg.nvshen_hunka_struct|null);

        /** 随机词条 */
        public shuiji: msg.nvshen_hunka_struct[];

        /** 魂卡评分 */
        public pingfen: number;
    }

    /** Represents a recast_item. */
    class recast_item {

        /** Constructs a new recast_item. */
        constructor();

        /** recast_item attr. */
        public attr?: (msg.attributes|null);

        /** recast_item rare_mark. */
        public rare_mark: number;

        /** 是否极品属性 */
        public is_excellent: boolean;
    }

    /** Represents a recast_suit. */
    class recast_suit {

        /** Constructs a new recast_suit. */
        constructor();

        /** recast_suit attr. */
        public attr?: (msg.attributes|null);

        /** recast_suit rare_mark. */
        public rare_mark: number;

        /** recast_suit suit_count. */
        public suit_count: number;
    }

    /** Represents an element_info. */
    class element_info {

        /** Constructs a new element_info. */
        constructor();

        /** 五行类型 1-5:火水金木土 */
        public element_type: number;

        /** 星级 */
        public star: number;

        /** 当前进度万分比 */
        public schedule: number;
    }

    /** 请求扩展背包 */
    class c2s_expand_bag_cap {

        /** Constructs a new c2s_expand_bag_cap. */
        constructor();

        /** 背包类型 */
        public bag_type: number;

        /** 扩展个数 */
        public expand_cnt: number;
    }

    /** Represents a prop_tips_data. */
    class prop_tips_data {

        /** Constructs a new prop_tips_data. */
        constructor();

        /** prop_tips_data idx. */
        public idx: Long;

        /** prop_tips_data cnt. */
        public cnt: number;

        /** 自定义参数 */
        public param1: number;

        /** 自定义参数 */
        public param2: number;

        /** 可选参数 */
        public quality: number;

        /** 道具提示需要道具的某些字段 */
        public ex_params?: (msg.prop_attributes|null);
    }

    /** Represents a s2c_prop_tips. */
    class s2c_prop_tips {

        /** Constructs a new s2c_prop_tips. */
        constructor();

        /** s2c_prop_tips reason_id. */
        public reason_id: number;

        /** s2c_prop_tips props. */
        public props: msg.prop_tips_data[];

        /** 0或nil:普通(居中全部覆盖恭喜获得) 1:掉落获得   2获得奖励弹窗（底下显示下面的恭喜获得） */
        public reason_type: number;
    }

    /** Represents a box_tips_data. */
    class box_tips_data {

        /** Constructs a new box_tips_data. */
        constructor();

        /** box_tips_data idx. */
        public idx: number;

        /** box_tips_data cnt. */
        public cnt: number;

        /** 稀有度(怕以后出超稀有，所以用int)，1：稀有，其他：非稀有 */
        public rare: number;
    }

    /** 使用物品后返回效果(显示获得了什么物品) */
    class s2c_prop_use {

        /** Constructs a new s2c_prop_use. */
        constructor();

        /** s2c_prop_use props. */
        public props: msg.prop_tips_data[];
    }

    /** 出售物品 */
    class c2s_prop_sell {

        /** Constructs a new c2s_prop_sell. */
        constructor();

        /** 唯一id */
        public prop_id: Long;

        /** 数量 */
        public del_cnt: number;
    }

    /** 预览道具信息 */
    class c2s_prop_preview {

        /** Constructs a new c2s_prop_preview. */
        constructor();

        /** 道具编号 */
        public prop_index: number;
    }

    /** Represents a s2c_prop_preview. */
    class s2c_prop_preview {

        /** Constructs a new s2c_prop_preview. */
        constructor();

        /** 物品信息 */
        public prop?: (msg.prop_attributes|null);
    }

    /** 装备 相关 */
    class eq_item {

        /** Constructs a new eq_item. */
        constructor();

        /** 唯一id */
        public prop_id: Long;

        /** 数量 */
        public count: number;
    }

    /** 装备分解                   /// 返回s2c_prop_resolve */
    class c2s_equip_resolve {

        /** Constructs a new c2s_equip_resolve. */
        constructor();

        /** c2s_equip_resolve eq. */
        public eq: msg.eq_item[];

        /** 物品大类 */
        public prop_big_type: number;
    }

    /** 装备碎片材料 打造 */
    class c2s_equip_chip_build {

        /** Constructs a new c2s_equip_chip_build. */
        constructor();

        /** 打造编号 */
        public build_idx: number;

        /** 是否完美打造    true[完美] / false(或缺省)[普通打造] */
        public is_per: boolean;

        /** 是否卓越打造 */
        public is_zhuoyue: boolean;
    }

    /** Represents a s2c_equip_chip_build. */
    class s2c_equip_chip_build {

        /** Constructs a new s2c_equip_chip_build. */
        constructor();

        /** 碎片打造获得装备 */
        public eq?: (msg.prop_tips_data|null);
    }

    /** 仓库相关//////////// */
    class storehouse_props {

        /** Constructs a new storehouse_props. */
        constructor();

        /** 仓库类型 */
        public storehouse_type: number;

        /** 仓库各页最大格子数 */
        public max_cnt: number;

        /** 物品表 */
        public props: msg.prop_attributes[];

        /** 已经扩展次数 */
        public expand_times: number;
    }

    /** Represents a c2s_storehouse_props. */
    class c2s_storehouse_props {

        /** Constructs a new c2s_storehouse_props. */
        constructor();
    }

    /** Represents a s2c_storehouse_props. */
    class s2c_storehouse_props {

        /** Constructs a new s2c_storehouse_props. */
        constructor();

        /** s2c_storehouse_props all_storehouse. */
        public all_storehouse: msg.storehouse_props[];
    }

    /** 更新仓库物品属性 */
    class s2c_storehouse_update_prop_attr {

        /** Constructs a new s2c_storehouse_update_prop_attr. */
        constructor();

        /** 背包类型 */
        public storehouse_type: number;

        /** 背包各页最大格子数 */
        public max_cnt: number;

        /** 更新某个物品的多个属性 */
        public update_info: msg.prop_attributes[];

        /** 已经扩展次数 */
        public expand_times: number;
    }

    /** Represents a c2s_storehouse_putin. */
    class c2s_storehouse_putin {

        /** Constructs a new c2s_storehouse_putin. */
        constructor();

        /** 仓库类型 */
        public storehouse_type: number;

        /** 道具唯一id */
        public prop_id: Long;
    }

    /** Represents a c2s_storehouse_putout. */
    class c2s_storehouse_putout {

        /** Constructs a new c2s_storehouse_putout. */
        constructor();

        /** 0/nil:单件取出 1:全部取出 */
        public oper: number;

        /** 仓库类型 */
        public storehouse_type: number;

        /** 道具唯一id */
        public prop_id: Long;
    }

    /** Represents a c2s_storehouse_expand. */
    class c2s_storehouse_expand {

        /** Constructs a new c2s_storehouse_expand. */
        constructor();

        /** 仓库类型 */
        public storehouse_type: number;

        /** 扩展个数 */
        public expand_cnt: number;
    }

    /** 提示 */
    class s2c_tips {

        /** Constructs a new s2c_tips. */
        constructor();

        /** 提示编号 */
        public index: number;

        /** 参数 */
        public params: string[];
    }

    /** 战斗中提示 */
    class s2c_war_tips {

        /** Constructs a new s2c_war_tips. */
        constructor();

        /** 提示编号 */
        public index: number;

        /** 参数 */
        public params: string[];
    }

    /** 邮件系统//////////////// */
    class mail_attachments {

        /** Constructs a new mail_attachments. */
        constructor();

        /** mail_attachments idx. */
        public idx: Long;

        /** mail_attachments cnt. */
        public cnt: number;
    }

    /** Represents a mail_data. */
    class mail_data {

        /** Constructs a new mail_data. */
        constructor();

        /** 邮件id */
        public mail_id: Long;

        /** 邮件名 */
        public title: string;

        /** 邮件正文 */
        public content: string;

        /** 邮件类型  1、系统邮件 2、GM邮件 */
        public mail_type: number;

        /** 邮件发送时间 */
        public send_time: number;

        /** 邮件过期时间 */
        public expired_time: number;

        /** 是否已经浏览过 0 没读  1已读 */
        public is_readed: number;

        /** 是否已领取附件 0 没领  1领了 */
        public is_taken: number;

        /** 邮件附件 */
        public attachments: msg.mail_attachments[];

        /** 是否是意见反馈 */
        public is_feedback: boolean;
    }

    /** 上线请求邮件 */
    class c2s_mail_online_request {

        /** Constructs a new c2s_mail_online_request. */
        constructor();
    }

    /** 读取邮件 */
    class c2s_mail_read {

        /** Constructs a new c2s_mail_read. */
        constructor();

        /** c2s_mail_read mail_id. */
        public mail_id: Long;

        /** c2s_mail_read mail_type. */
        public mail_type: number;
    }

    /** 领取附件 */
    class c2s_mail_take {

        /** Constructs a new c2s_mail_take. */
        constructor();

        /** c2s_mail_take mail_id. */
        public mail_id: Long;

        /** c2s_mail_take mail_type. */
        public mail_type: number;
    }

    /** 删除邮件 */
    class c2s_mail_delete {

        /** Constructs a new c2s_mail_delete. */
        constructor();

        /** c2s_mail_delete mail_id. */
        public mail_id: Long;

        /** c2s_mail_delete mail_type. */
        public mail_type: number;
    }

    /** 一键删除 */
    class c2s_mail_onekey_delete {

        /** Constructs a new c2s_mail_onekey_delete. */
        constructor();
    }

    /** 一键领取 */
    class c2s_mail_onekey_take {

        /** Constructs a new c2s_mail_onekey_take. */
        constructor();
    }

    /** 所有邮件 */
    class s2c_mail_all {

        /** Constructs a new s2c_mail_all. */
        constructor();

        /** s2c_mail_all mails. */
        public mails: msg.mail_data[];

        /** 1普通 2挂机 3活动 */
        public caps: number[];
    }

    /** 更新邮件 */
    class s2c_mail_update {

        /** Constructs a new s2c_mail_update. */
        constructor();

        /** s2c_mail_update mails. */
        public mails: msg.mail_data[];
    }

    /** 删除邮件 */
    class s2c_mail_delete {

        /** Constructs a new s2c_mail_delete. */
        constructor();

        /** 删除邮件id数组 */
        public mail_ids: Long[];
    }

    /** Represents a c2s_role_choose_school. */
    class c2s_role_choose_school {

        /** Constructs a new c2s_role_choose_school. */
        constructor();

        /** 门派 */
        public school: number;
    }

    /** Represents a role_skill_info. */
    class role_skill_info {

        /** Constructs a new role_skill_info. */
        constructor();

        /** 技能编号 */
        public skill_index: number;

        /** 技能等级 */
        public skill_lv: number;
    }

    /** Represents a role_war_skill_info. */
    class role_war_skill_info {

        /** Constructs a new role_war_skill_info. */
        constructor();

        /** 技能编号 */
        public skill_index: number;

        /** 位置编号 */
        public pos: number;
    }

    /** 玩家上线发送技能 */
    class s2c_role_skill_online {

        /** Constructs a new s2c_role_skill_online. */
        constructor();

        /** s2c_role_skill_online all_skill_info. */
        public all_skill_info: msg.role_skill_info[];

        /** s2c_role_skill_online all_war_skill_info. */
        public all_war_skill_info: msg.role_war_skill_info[];

        /** s2c_role_skill_online all_attr_skill_info. */
        public all_attr_skill_info: msg.role_skill_info[];
    }

    /** 场景操作坐骑 */
    class c2s_scene_ride_oper {

        /** Constructs a new c2s_scene_ride_oper. */
        constructor();

        /** 0不坐 1坐 */
        public ride_state: number;

        /** c2s_scene_ride_oper ride_x. */
        public ride_x: number;

        /** c2s_scene_ride_oper ride_y. */
        public ride_y: number;
    }

    /** 准备进入 第一次握手 */
    class c2s_scene_prepare_enter {

        /** Constructs a new c2s_scene_prepare_enter. */
        constructor();

        /** c2s_scene_prepare_enter scene_index. */
        public scene_index: number;
    }

    /** 准备进入 第一次握手 返回 */
    class s2c_scene_prepare_enter {

        /** Constructs a new s2c_scene_prepare_enter. */
        constructor();

        /** s2c_scene_prepare_enter scene_index. */
        public scene_index: number;

        /** s2c_scene_prepare_enter role_info. */
        public role_info?: (msg.scene_role_data|null);

        /** s2c_scene_prepare_enter scene_id. */
        public scene_id: number;

        /** s2c_scene_prepare_enter server_ctrl. */
        public server_ctrl: boolean;

        /** 是否播放切换场景效果  默认播放，  0不播放 */
        public sceneEft: number;
    }

    /** 进入 第二次握手 副本 */
    class c2s_scene_enter {

        /** Constructs a new c2s_scene_enter. */
        constructor();

        /** c2s_scene_enter scene_index. */
        public scene_index: number;

        /** 分线 */
        public scene_id: number;
    }

    /** Represents a s2c_scene_enter. */
    class s2c_scene_enter {

        /** Constructs a new s2c_scene_enter. */
        constructor();
    }

    /** 副本持续时间（可选协议,用于前端展示副本倒计时） */
    class s2c_scene_fuben_end_time {

        /** Constructs a new s2c_scene_fuben_end_time. */
        constructor();

        /** 当前副本结束时间戳 */
        public endtime: Long;
    }

    /** Represents a coordinate. */
    class coordinate {

        /** Constructs a new coordinate. */
        constructor();

        /** coordinate x. */
        public x: number;

        /** coordinate y. */
        public y: number;
    }

    /** Represents a c2s_scene_move. */
    class c2s_scene_move {

        /** Constructs a new c2s_scene_move. */
        constructor();

        /** 移动类型 1：冲锋, 2：击退  4：前冲  5：后撤 */
        public move_type: number;

        /** c2s_scene_move coordinate_list. */
        public coordinate_list: msg.coordinate[];

        /** 额外移动类型 0：寻怪移动  1：杀怪移动 */
        public ex_move_type: number;
    }

    /** Represents an entity_coordinate_data. */
    class entity_coordinate_data {

        /** Constructs a new entity_coordinate_data. */
        constructor();

        /** 移动类型 正常移动没有此参数，1：冲锋, 2：击退  4：前冲  5：后撤 */
        public move_type: number;

        /** entity_coordinate_data entity_id. */
        public entity_id: Long;

        /** entity_coordinate_data coordinate_list. */
        public coordinate_list: msg.coordinate[];

        /** 击退的时间,毫秒 */
        public time: number;
    }

    /** Represents a s2c_scene_entity_move. */
    class s2c_scene_entity_move {

        /** Constructs a new s2c_scene_entity_move. */
        constructor();

        /** s2c_scene_entity_move entity_coordinates. */
        public entity_coordinates: msg.entity_coordinate_data[];
    }

    /** Represents a scene_skill. */
    class scene_skill {

        /** Constructs a new scene_skill. */
        constructor();

        /** 技能编号 */
        public skill_idx: number;

        /** 当前使用时间 */
        public use_time: number;

        /** 下次使用技能时间  厘秒 */
        public next_use_time: number;
    }

    /** Represents a s2c_scene_add_effect. */
    class s2c_scene_add_effect {

        /** Constructs a new s2c_scene_add_effect. */
        constructor();

        /** s2c_scene_add_effect entity_id. */
        public entity_id: Long;

        /** s2c_scene_add_effect effect_id. */
        public effect_id: number;
    }

    /** Represents a s2c_scene_del_effect. */
    class s2c_scene_del_effect {

        /** Constructs a new s2c_scene_del_effect. */
        constructor();

        /** s2c_scene_del_effect entity_id. */
        public entity_id: Long;

        /** s2c_scene_del_effect effect_id. */
        public effect_id: number;
    }

    /** 场景中的 实体数据 */
    class scene_entity_data {

        /** Constructs a new scene_entity_data. */
        constructor();

        /** scene_entity_data entity_id. */
        public entity_id: Long;

        /** scene_entity_data name. */
        public name: string;

        /** scene_entity_data x. */
        public x: number;

        /** scene_entity_data y. */
        public y: number;
    }

    /** 场景中的 可以交互的实体 */
    class scene_trigger_data {

        /** Constructs a new scene_trigger_data. */
        constructor();

        /** scene_trigger_data index. */
        public index: number;

        /** scene_trigger_data walk_entity_info. */
        public walk_entity_info?: (msg.scene_walk_entity_data|null);

        /** 1野外boss传送点、 */
        public trigger_type: number;
    }

    /** 场景中的 移动实体数据 */
    class scene_walk_entity_data {

        /** Constructs a new scene_walk_entity_data. */
        constructor();

        /** 移动类型 正常移动没有此参数，1：冲锋, 2：击退 */
        public move_type: number;

        /** scene_walk_entity_data speed. */
        public speed: number;

        /** scene_walk_entity_data direction. */
        public direction: number;

        /** 当前血量 */
        public hp: Long;

        /** 最大血量（缺省） */
        public max_hp: Long;

        /** scene_walk_entity_data entity_info. */
        public entity_info?: (msg.scene_entity_data|null);

        /** buff列表 */
        public buffs: msg.battle_buff[];

        /** scene_walk_entity_data coordinate_list. */
        public coordinate_list: msg.coordinate[];

        /** 阵营 0表示怪物, 其余是玩家 */
        public camp: number;

        /** 血量百分比 */
        public percent: number;

        /** buff列表清空时为true */
        public is_buff_empty: boolean;

        /** 天赋列表 */
        public talents: number[];

        /** 提示编号 */
        public say_index: number;

        /** 提示参数 */
        public say_params: string[];

        /** 战斗力 */
        public showpower: Long;

        /** 额外血条万分比 */
        public ex_hp_percent: number;

        /** 效果 */
        public effects: msg.effect[];

        /** 归属者信息 */
        public owner_info?: (msg.teammate|null);

        /** 归属抢夺者的entityID */
        public robber_entity_id: Long[];

        /** 怪物波次 暂时只有主线挂机场景有用 */
        public monster_wave: number;
    }

    /** 场景中的 人物数据 */
    class scene_role_data {

        /** Constructs a new scene_role_data. */
        constructor();

        /** scene_role_data role_id. */
        public role_id: Long;

        /** scene_role_data sex. */
        public sex: number;

        /** 1:少年 2:成年 */
        public age_type: number;

        /** scene_role_data school. */
        public school: number;

        /** scene_role_data level. */
        public level: number;

        /** 神兵 */
        public weapon: number;

        /** 时装 */
        public fashion: number;

        /** 称号index */
        public title_index: Long;

        /** 称号星数 */
        public title_star: number;

        /** 头像 */
        public head: Long;

        /** scene_role_data agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 头像框 */
        public head_frame: Long;

        /** 伴侣role_id */
        public mate_id: Long;

        /** 伴侣名字 */
        public mate_name: string;

        /** 声望等级 */
        public credit_lv: number;

        /** scene_role_data walk_entity_info. */
        public walk_entity_info?: (msg.scene_walk_entity_data|null);

        /** 宗门id */
        public guild_id: number;

        /** 宗门名字 */
        public guild_name: string;

        /** 服务器ID */
        public server_id: number;

        /** 元神的武器 */
        public ys_weapon_idx: number;

        /** 技能列表 */
        public skills: msg.scene_skill[];

        /** 神冕外显编号 */
        public crown: number;

        /** scene_role_data team_id. */
        public team_id: Long;

        /** 羽翼 */
        public wing: number;

        /** 气泡 */
        public chat_frame: Long;

        /** 头像星级 */
        public head_star: number;

        /** 头像框星级 */
        public head_frame_star: number;

        /** 气泡星级 */
        public chat_frame_star: number;

        /** 坐骑编号 */
        public ride: number;

        /** 0 不坐   1坐 */
        public ride_state: number;

        /** 骑战技能是否已经激活 1:是 */
        public ride_skill_act: number;

        /** 战队徽章 */
        public guild_team_badge_no: number;

        /** VIP index */
        public vip_lv: number;

        /** 化神id */
        public the_god: number;
    }

    /** 场景中的 Npc数据 */
    class scene_npc_data {

        /** Constructs a new scene_npc_data. */
        constructor();

        /** scene_npc_data index. */
        public index: number;

        /** scene_npc_data walk_entity_info. */
        public walk_entity_info?: (msg.scene_walk_entity_data|null);
    }

    /** 场景中的 怪物数据 */
    class scene_monster_data {

        /** Constructs a new scene_monster_data. */
        constructor();

        /** scene_monster_data index. */
        public index: Long;

        /** scene_monster_data walk_entity_info. */
        public walk_entity_info?: (msg.scene_walk_entity_data|null);

        /** 飞升等级 */
        public soaring_index: number;
    }

    /** Represents a scene_buddy_data. */
    class scene_buddy_data {

        /** Constructs a new scene_buddy_data. */
        constructor();

        /** scene_buddy_data index. */
        public index: Long;

        /** 伙伴类型 1:神灵 */
        public buddy_type: number;

        /** 武器编号 */
        public weapon: number;

        /** 坐骑编号 */
        public ride: number;

        /** 法阵 */
        public circle: number;

        /** 头衔 */
        public title: number;

        /** scene_buddy_data master_id. */
        public master_id: Long;

        /** scene_buddy_data walk_entity_info. */
        public walk_entity_info?: (msg.scene_walk_entity_data|null);

        /** 主人名称 */
        public master_name: string;

        /** 角色id */
        public role_id: Long;

        /** buddy_type=1时，神灵进化次数 */
        public evolve: number;
    }

    /** 场景中的 掉落数据 */
    class scene_drop_data {

        /** Constructs a new scene_drop_data. */
        constructor();

        /** scene_drop_data index. */
        public index: Long;

        /** scene_drop_data prop_cnt. */
        public prop_cnt: number;

        /** scene_drop_data entity_id. */
        public entity_id: Long;

        /** 源坐标点 */
        public src_coord?: (msg.coordinate|null);

        /** 目标坐标点 */
        public dest_coord?: (msg.coordinate|null);

        /** 飞向哪一个人 */
        public owner_entity_id: Long;
    }

    /** 场景中的 采集物数据 */
    class scene_collect_data {

        /** Constructs a new scene_collect_data. */
        constructor();

        /** scene_collect_data index. */
        public index: number;

        /** scene_collect_data walk_entity_info. */
        public walk_entity_info?: (msg.scene_walk_entity_data|null);
    }

    /** Represents a s2c_scene_entity_add. */
    class s2c_scene_entity_add {

        /** Constructs a new s2c_scene_entity_add. */
        constructor();

        /** s2c_scene_entity_add role_infos. */
        public role_infos: msg.scene_role_data[];

        /** s2c_scene_entity_add monster_infos. */
        public monster_infos: msg.scene_monster_data[];

        /** s2c_scene_entity_add npc_infos. */
        public npc_infos: msg.scene_npc_data[];

        /** s2c_scene_entity_add buddy_infos. */
        public buddy_infos: msg.scene_buddy_data[];

        /** s2c_scene_entity_add drop_infos. */
        public drop_infos: msg.scene_drop_data[];

        /** s2c_scene_entity_add collect_infos. */
        public collect_infos: msg.scene_collect_data[];

        /** 可交互的entity */
        public trigger_infos: msg.scene_trigger_data[];
    }

    /** Represents a s2c_scene_entity_update. */
    class s2c_scene_entity_update {

        /** Constructs a new s2c_scene_entity_update. */
        constructor();

        /** s2c_scene_entity_update role_infos. */
        public role_infos: msg.scene_role_data[];

        /** s2c_scene_entity_update monster_infos. */
        public monster_infos: msg.scene_monster_data[];

        /** s2c_scene_entity_update npc_infos. */
        public npc_infos: msg.scene_npc_data[];

        /** s2c_scene_entity_update buddy_infos. */
        public buddy_infos: msg.scene_buddy_data[];

        /** s2c_scene_entity_update drop_infos. */
        public drop_infos: msg.scene_drop_data[];

        /** s2c_scene_entity_update collect_infos. */
        public collect_infos: msg.scene_collect_data[];

        /** 可交互的entity */
        public trigger_infos: msg.scene_trigger_data[];
    }

    /** Represents a s2c_scene_entity_delete. */
    class s2c_scene_entity_delete {

        /** Constructs a new s2c_scene_entity_delete. */
        constructor();

        /** s2c_scene_entity_delete entity_ids. */
        public entity_ids: Long[];
    }

    /** 当客户端与服务端起始点不一样时，告诉客户端 */
    class s2c_scene_reset_coordinate {

        /** Constructs a new s2c_scene_reset_coordinate. */
        constructor();

        /** s2c_scene_reset_coordinate entity_id. */
        public entity_id: Long;

        /** s2c_scene_reset_coordinate x. */
        public x: number;

        /** s2c_scene_reset_coordinate y. */
        public y: number;
    }

    /** Represents a s2c_scene_entity_stop_moving. */
    class s2c_scene_entity_stop_moving {

        /** Constructs a new s2c_scene_entity_stop_moving. */
        constructor();

        /** s2c_scene_entity_stop_moving entity_id. */
        public entity_id: Long;

        /** s2c_scene_entity_stop_moving x. */
        public x: number;

        /** s2c_scene_entity_stop_moving y. */
        public y: number;
    }

    /** 离开场景 */
    class c2s_role_scene_leave {

        /** Constructs a new c2s_role_scene_leave. */
        constructor();
    }

    /** 通用飘字协议 */
    class s2c_fly_bool {

        /** Constructs a new s2c_fly_bool. */
        constructor();

        /** s2c_fly_bool entity_id. */
        public entity_id: Long;

        /** 飘血类型 */
        public type: number;

        /** 值 */
        public value: number;
    }

    /** Represents a system_team_members. */
    class system_team_members {

        /** Constructs a new system_team_members. */
        constructor();

        /** system_team_members role_id. */
        public role_id: Long;

        /** system_team_members name. */
        public name: string;

        /** system_team_members sex. */
        public sex: number;

        /** 1:少年 2:成年 */
        public age_type: number;

        /** system_team_members school. */
        public school: number;

        /** system_team_members speed. */
        public speed: number;

        /** system_team_members mate_name. */
        public mate_name: string;

        /** system_team_members credit_lv. */
        public credit_lv: number;

        /** system_team_members title_index. */
        public title_index: number;

        /** system_team_members weapon. */
        public weapon: number;

        /** system_team_members wing. */
        public wing: number;

        /** system_team_members ride. */
        public ride: number;

        /** system_team_members fashion. */
        public fashion: number;
    }

    /** BOSS血横幅更新 */
    class s2c_scene_entity_hp_banner {

        /** Constructs a new s2c_scene_entity_hp_banner. */
        constructor();

        /** s2c_scene_entity_hp_banner entity_id. */
        public entity_id: Long;

        /** s2c_scene_entity_hp_banner name. */
        public name: string;

        /** 血量百分比 */
        public percent: number;
    }

    /** Represents a c2s_scene_print_entity. */
    class c2s_scene_print_entity {

        /** Constructs a new c2s_scene_print_entity. */
        constructor();

        /** c2s_scene_print_entity entity_ids. */
        public entity_ids: Long[];
    }

    /** Represents a s2c_scene_print_entity. */
    class s2c_scene_print_entity {

        /** Constructs a new s2c_scene_print_entity. */
        constructor();

        /** s2c_scene_print_entity print_entitys. */
        public print_entitys: msg.scene_entity_data[];
    }

    /** 切换场景 目前只能在挂机场景之间切换 */
    class c2s_change_scene {

        /** Constructs a new c2s_change_scene. */
        constructor();

        /** c2s_change_scene scene_index. */
        public scene_index: number;
    }

    /** Represents a s2c_pvp_enter_inst_info. */
    class s2c_pvp_enter_inst_info {

        /** Constructs a new s2c_pvp_enter_inst_info. */
        constructor();

        /** 结束时间戳 */
        public end_time: number;
    }

    /** Represents a c2s_instance_find_monster. */
    class c2s_instance_find_monster {

        /** Constructs a new c2s_instance_find_monster. */
        constructor();

        /** c2s_instance_find_monster entity_id. */
        public entity_id: Long;
    }

    /** Represents a s2c_instance_find_monster. */
    class s2c_instance_find_monster {

        /** Constructs a new s2c_instance_find_monster. */
        constructor();

        /** s2c_instance_find_monster path_coords. */
        public path_coords: msg.coordinate[];

        /** 0固定路线   1是寻路 */
        public find_type: number;

        /** 目标 entity_id(缺省为没有) */
        public entity_id: Long;

        /** 0/nil普通目标 1仇杀者 2~可扩展 */
        public target_type: number;

        /** 目标波次 挂机场景需要 */
        public target_wave: number;
    }

    /** 清除追击特定 entity 的状态 */
    class s2c_instance_clear_find_entity {

        /** Constructs a new s2c_instance_clear_find_entity. */
        constructor();

        /** 清除追击 entity_id */
        public entity_id: Long;
    }

    /** 客户端移动类型   默认为1   0用户能点击移动   1用户不能点击移动 */
    class c2s_instance_client_move_type {

        /** Constructs a new c2s_instance_client_move_type. */
        constructor();
    }

    /** 客户端移动类型 返回  默认为1   0用户能点击移动   1用户不能点击移动 */
    class s2c_instance_client_move_type {

        /** Constructs a new s2c_instance_client_move_type. */
        constructor();

        /** s2c_instance_client_move_type is_hangup. */
        public is_hangup: number;
    }

    /** 停止挂机  告诉前端，人物停止攻击 */
    class s2c_instance_stop_hangup {

        /** Constructs a new s2c_instance_stop_hangup. */
        constructor();
    }

    /** 开始挂机  告诉前端，人物开始攻击 */
    class s2c_instance_start_hangup {

        /** Constructs a new s2c_instance_start_hangup. */
        constructor();
    }

    /** 挂机场景停止刷新怪物 */
    class s2c_instance_stop_refresh_monster {

        /** Constructs a new s2c_instance_stop_refresh_monster. */
        constructor();
    }

    /** 通用进入下一层 */
    class c2s_next_scene {

        /** Constructs a new c2s_next_scene. */
        constructor();
    }

    /** 挑战挂机boss */
    class c2s_level_boss_challenge {

        /** Constructs a new c2s_level_boss_challenge. */
        constructor();
    }

    /** 设置是否自动挑战boss */
    class c2s_level_boss_auto_type {

        /** Constructs a new c2s_level_boss_auto_type. */
        constructor();
    }

    /** 返回是否自动挑战boss */
    class s2c_level_boss_auto_type {

        /** Constructs a new s2c_level_boss_auto_type. */
        constructor();

        /** 1 停止挂机  2开始挂机 */
        public auto_type: number;
    }

    /** 拾取物品 */
    class c2s_instance_pickup_drop {

        /** Constructs a new c2s_instance_pickup_drop. */
        constructor();

        /** c2s_instance_pickup_drop entity_ids. */
        public entity_ids: Long[];
    }

    /** 拾取物品 返回 */
    class s2c_instance_pickup_drop {

        /** Constructs a new s2c_instance_pickup_drop. */
        constructor();

        /** s2c_instance_pickup_drop entity_ids. */
        public entity_ids: Long[];
    }

    /** 进入下一关 */
    class c2s_instance_next_stage {

        /** Constructs a new c2s_instance_next_stage. */
        constructor();
    }

    /** 关卡结算 */
    class s2c_instance_fin {

        /** Constructs a new s2c_instance_fin. */
        constructor();

        /** 关卡编号 */
        public index: number;

        /** 副本类型 */
        public type: number;

        /** 是否成功 */
        public is_success: boolean;

        /** 奖励 */
        public reward: msg.prop_tips_data[];

        /** 缺省参数 */
        public params: number[];

        /** 伤害排名奖励 */
        public dmg_reward: msg.prop_tips_data[];

        /** 归属奖励 */
        public owner_reward: msg.prop_tips_data[];

        /** 缺省 or false：退出(发退出)  ture:不退出 */
        public not_exit: boolean;

        /** 64位缺省参数 */
        public long_params: Long[];

        /** s2c_instance_fin name. */
        public name: string;

        /** 尾刀奖励(首通) */
        public final_straw_reward: msg.prop_tips_data[];

        /** 必掉奖励 */
        public certainly_reward: msg.prop_tips_data[];

        /** 概率奖励 */
        public uncertainly_reward: msg.prop_tips_data[];

        /** 归属者 */
        public owner?: (msg.teammate|null);

        /** 可选参数 */
        public value: number;

        /** 伤害统计列表 */
        public damage_list: msg.boss_srefresh_damage[];
    }

    /** 关卡奖励 */
    class s2c_instance_reward {

        /** Constructs a new s2c_instance_reward. */
        constructor();

        /** 关卡编号 */
        public index: number;
    }

    /** 推送当前关卡 */
    class s2c_instance_cur_stage {

        /** Constructs a new s2c_instance_cur_stage. */
        constructor();

        /** 关卡编号 */
        public index: number;

        /** 关卡收益，每小时获得量 */
        public bonus?: (msg.stage_bonus|null);

        /** 关卡收益，每小时获得量 */
        public next_bonus?: (msg.stage_bonus|null);

        /** 小关奖励 */
        public reward: msg.prop_tips_data[];

        /** 大关奖励 */
        public big_reward: msg.prop_tips_data[];

        /** 大关奖励的关卡号，如第72关，这个字段就是72 */
        public big_reward_num: number;

        /** 推荐战力 */
        public showpower: Long;

        /** 最大关数 */
        public is_end_mainline: number;

        /** 杀几波小怪才能闯关 */
        public target_wave_cnt: number;

        /** 当前杀了几波小怪 */
        public now_wave_cnt: number;
    }

    /** 关卡收益结构体 */
    class stage_bonus {

        /** Constructs a new stage_bonus. */
        constructor();

        /** stage_bonus exp. */
        public exp: number;

        /** 金币 */
        public copper: number;

        /** 灵气 */
        public spirit: number;

        /** 装备 */
        public equip: number;
    }

    /** 离线收益 */
    class c2s_offline_gain {

        /** Constructs a new c2s_offline_gain. */
        constructor();
    }

    /** Represents a s2c_offline_gain. */
    class s2c_offline_gain {

        /** Constructs a new s2c_offline_gain. */
        constructor();

        /** 累积离线时间 */
        public offline_time: number;

        /** 离线时的等级 */
        public old_level: number;

        /** 上线获取收益后的等级 */
        public new_level: number;

        /** 装备分解数量 */
        public resolve_cnt: number;

        /** 离线收益获取 */
        public offline_reward: msg.prop_tips_data[];

        /** vip加成经验 */
        public vip_exp: number;

        /** vip加成铜币 */
        public vip_copper: number;

        /** 总的加成 */
        public bonus: number;
    }

    /** 获取跨服闯关排行榜 */
    class c2s_instance_mainline_rank {

        /** Constructs a new c2s_instance_mainline_rank. */
        constructor();
    }

    /** 跨服闯关排行榜 */
    class s2c_instance_mainline_rank {

        /** Constructs a new s2c_instance_mainline_rank. */
        constructor();

        /** 闯关排行榜信息 */
        public rank_list: msg.cross_rank_item[];

        /** 超过的万分比 */
        public higher: number;
    }

    /** 闯关登榜推送 */
    class s2c_instance_mainline_rankup {

        /** Constructs a new s2c_instance_mainline_rankup. */
        constructor();

        /** s2c_instance_mainline_rankup my_rank. */
        public my_rank: number;
    }

    /** 闯关排行榜对象结构体 */
    class cross_rank_item {

        /** Constructs a new cross_rank_item. */
        constructor();

        /** 角色id */
        public role_id: Long;

        /** 闯关数 */
        public stage: number;

        /** 角色名称 */
        public role_name: string;

        /** 战力 */
        public showpower: Long;
    }

    /** 求助信息 */
    class s2c_instance_help_info {

        /** Constructs a new s2c_instance_help_info. */
        constructor();

        /** 已用次数 */
        public times: number;

        /** 下次求助时间 */
        public next_time: number;

        /** 最大求助次数 */
        public max_times: number;
    }

    /** 求助 */
    class c2s_instance_seek_help {

        /** Constructs a new c2s_instance_seek_help. */
        constructor();

        /** 1:跨服，2:本服 */
        public type: number;
    }

    /** 获取求助列表 */
    class c2s_instance_help_list {

        /** Constructs a new c2s_instance_help_list. */
        constructor();
    }

    /** 返回求助列表 */
    class s2c_instance_help_list {

        /** Constructs a new s2c_instance_help_list. */
        constructor();

        /** s2c_instance_help_list help_list. */
        public help_list: msg.help_item[];
    }

    /** 求助结构体 */
    class help_item {

        /** Constructs a new help_item. */
        constructor();

        /** 副本编号 */
        public index: number;

        /** 求助者role_id */
        public seek_id: Long;

        /** 求助者名称 */
        public seek_name: string;
    }

    /** 协助 */
    class c2s_instance_offer_help {

        /** Constructs a new c2s_instance_offer_help. */
        constructor();

        /** 求助者role_id(获取求助列表时会返回) */
        public seek_id: Long;

        /** 副本编号 */
        public index: number;
    }

    /** 挑战boss */
    class c2s_instance_mainline_boss {

        /** Constructs a new c2s_instance_mainline_boss. */
        constructor();
    }

    /** Represents a yuanling_item. */
    class yuanling_item {

        /** Constructs a new yuanling_item. */
        constructor();

        /** 难度 */
        public idx: number;

        /** 最高通关层数 */
        public max_layer: number;

        /** 首次通关玩家信息 */
        public info: msg.teammate[];
    }

    /** 副本信息 */
    class s2c_yuanling_info {

        /** Constructs a new s2c_yuanling_info. */
        constructor();

        /** 收益次数 */
        public count: number;

        /** 勾选状态 */
        public check: number;

        /** 已通关的难度 */
        public diff: number;

        /** 已经购买次数 */
        public buy: number;

        /** 单个难度信息 */
        public info: msg.yuanling_item[];
    }

    /** Represents a c2s_yuanling_info. */
    class c2s_yuanling_info {

        /** Constructs a new c2s_yuanling_info. */
        constructor();
    }

    /** Represents a yuanling_counts. */
    class yuanling_counts {

        /** Constructs a new yuanling_counts. */
        constructor();

        /** yuanling_counts index. */
        public index: number;

        /** yuanling_counts count. */
        public count: number;
    }

    /** 通关次数 */
    class s2c_yuanling_counts {

        /** Constructs a new s2c_yuanling_counts. */
        constructor();

        /** s2c_yuanling_counts counts. */
        public counts: msg.yuanling_counts[];
    }

    /** 可邀请列表 */
    class s2c_yuanling_role_list {

        /** Constructs a new s2c_yuanling_role_list. */
        constructor();

        /** 玩家信息 */
        public info: msg.teammate[];
    }

    /** 请求可邀请列表 */
    class c2s_yuanling_role_list {

        /** Constructs a new c2s_yuanling_role_list. */
        constructor();

        /** c2s_yuanling_role_list index. */
        public index: number;
    }

    /** 队伍列表 */
    class s2c_yuanling_team_list {

        /** Constructs a new s2c_yuanling_team_list. */
        constructor();

        /** 难度 */
        public index: number;

        /** 列表信息 */
        public infos: msg.yuanling_team[];
    }

    /** Represents a yuanling_team. */
    class yuanling_team {

        /** Constructs a new yuanling_team. */
        constructor();

        /** 队伍id */
        public team_id: number;

        /** 队长信息 */
        public info: msg.teammate[];

        /** 队伍人数 */
        public count: number;

        /** 是否在战斗 */
        public fight: boolean;
    }

    /** 请求队伍列表 */
    class c2s_yuanling_team_list {

        /** Constructs a new c2s_yuanling_team_list. */
        constructor();

        /** 难度 */
        public index: number;
    }

    /** 创建队伍 */
    class c2s_yuanling_create_team {

        /** Constructs a new c2s_yuanling_create_team. */
        constructor();

        /** c2s_yuanling_create_team index. */
        public index: number;
    }

    /** 加入队伍 */
    class c2s_yuanling_jion_team {

        /** Constructs a new c2s_yuanling_jion_team. */
        constructor();

        /** 队伍id */
        public team_id: number;

        /** c2s_yuanling_jion_team index. */
        public index: number;
    }

    /** 退出队伍 */
    class c2s_yuanling_exit_team {

        /** Constructs a new c2s_yuanling_exit_team. */
        constructor();
    }

    /** 返回退出队伍 */
    class s2c_yuanling_exit_team {

        /** Constructs a new s2c_yuanling_exit_team. */
        constructor();

        /** 1被踢的。2正常 */
        public flag: number;

        /** s2c_yuanling_exit_team team_id. */
        public team_id: number;

        /** s2c_yuanling_exit_team time. */
        public time: number;
    }

    /** 踢出队伍 */
    class c2s_yuanling_out_time {

        /** Constructs a new c2s_yuanling_out_time. */
        constructor();

        /** 角色id */
        public role_id: Long;
    }

    /** 邀请 */
    class c2s_yuanling_invita {

        /** Constructs a new c2s_yuanling_invita. */
        constructor();

        /** c2s_yuanling_invita role_id. */
        public role_id: Long;

        /** 难度 */
        public index: number;
    }

    /** 收到组队邀请 */
    class s2c_yuanling_invita {

        /** Constructs a new s2c_yuanling_invita. */
        constructor();

        /** 队伍id */
        public team_id: number;

        /** 时间戳 */
        public time: number;

        /** 难度 */
        public index: number;

        /** 队伍人数 */
        public count: number;

        /** 队长信息 */
        public leader: msg.teammate[];
    }

    /** Represents a yuanling_team_info. */
    class yuanling_team_info {

        /** Constructs a new yuanling_team_info. */
        constructor();

        /** 是否队长 */
        public leader: boolean;

        /** 队员信息 */
        public info: msg.teammate[];
    }

    /** 自己的队伍信息 */
    class s2c_yuanling_team_info {

        /** Constructs a new s2c_yuanling_team_info. */
        constructor();

        /** s2c_yuanling_team_info team_id. */
        public team_id: number;

        /** s2c_yuanling_team_info index. */
        public index: number;

        /** s2c_yuanling_team_info infos. */
        public infos: msg.yuanling_team_info[];
    }

    /** 勾选收益次数 */
    class c2s_yuanling_check {

        /** Constructs a new c2s_yuanling_check. */
        constructor();

        /** 1选择；2取消 */
        public check: number;
    }

    /** 购买收益次数 */
    class c2s_yuanling_buyCount {

        /** Constructs a new c2s_yuanling_buyCount. */
        constructor();
    }

    /** 开始战斗;单人匹配也是这个 */
    class c2s_yuanling_enter {

        /** Constructs a new c2s_yuanling_enter. */
        constructor();

        /** c2s_yuanling_enter index. */
        public index: number;
    }

    /** 更新buff时间 */
    class s2c_yuanling_buff_info {

        /** Constructs a new s2c_yuanling_buff_info. */
        constructor();

        /** s2c_yuanling_buff_info index. */
        public index: number;

        /** s2c_yuanling_buff_info time. */
        public time: number;
    }

    /** 更新副本内信息 */
    class s2c_yuanling_fb_info {

        /** Constructs a new s2c_yuanling_fb_info. */
        constructor();

        /** 难度 */
        public index: number;

        /** 第几层 */
        public layer: number;
    }

    /** 购买buff */
    class c2s_yuanling_buyBuff {

        /** Constructs a new c2s_yuanling_buyBuff. */
        constructor();

        /** 索引 */
        public index: number;
    }

    /** Represents a yuanling_damage_info. */
    class yuanling_damage_info {

        /** Constructs a new yuanling_damage_info. */
        constructor();

        /** yuanling_damage_info role_id. */
        public role_id: Long;

        /** yuanling_damage_info damage. */
        public damage: Long;

        /** yuanling_damage_info name. */
        public name: string;
    }

    /** Represents a s2c_yuanling_damage. */
    class s2c_yuanling_damage {

        /** Constructs a new s2c_yuanling_damage. */
        constructor();

        /** s2c_yuanling_damage infos. */
        public infos: msg.yuanling_damage_info[];
    }

    /** 元灵试炼超链接 聊天邀请 */
    class c2s_yuanling_room_invita {

        /** Constructs a new c2s_yuanling_room_invita. */
        constructor();

        /** 聊天频道类型 */
        public channel_type: number;
    }

    /** 副本信息结构体 */
    class material_item {

        /** Constructs a new material_item. */
        constructor();

        /** 副本类型 */
        public type: number;

        /** 历史最高层 */
        public history_lv: number;

        /** 当前层数 */
        public lvl: number;

        /** 免费重置次数 */
        public free: number;
    }

    /** 副本信息更新 */
    class s2c_material_update {

        /** Constructs a new s2c_material_update. */
        constructor();

        /** s2c_material_update infos. */
        public infos: msg.material_item[];
    }

    /** Represents a c2s_material_get_info. */
    class c2s_material_get_info {

        /** Constructs a new c2s_material_get_info. */
        constructor();
    }

    /** Represents a c2s_material_enter. */
    class c2s_material_enter {

        /** Constructs a new c2s_material_enter. */
        constructor();

        /** 副本类型 */
        public type: number;
    }

    /** 单层里面信息更新 */
    class s2c_material_lvl {

        /** Constructs a new s2c_material_lvl. */
        constructor();

        /** 副本类型 */
        public type: number;

        /** 当前层数 */
        public lv: number;

        /** 累计奖励数量 */
        public total_count: number;
    }

    /** 请求重置副本 */
    class c2s_material_reset {

        /** Constructs a new c2s_material_reset. */
        constructor();

        /** 副本类型 */
        public type: number;
    }

    /** 可扫荡之前的快速通关 */
    class s2c_material_skip {

        /** Constructs a new s2c_material_skip. */
        constructor();

        /** s2c_material_skip type. */
        public type: number;

        /** s2c_material_skip st_lv. */
        public st_lv: number;

        /** s2c_material_skip end_lv. */
        public end_lv: number;
    }

    /** 请求扫荡 */
    class c2s_material_sweep {

        /** Constructs a new c2s_material_sweep. */
        constructor();

        /** 副本类型 */
        public type: number;
    }

    /** 副本信息结构体 */
    class forbidden_item {

        /** Constructs a new forbidden_item. */
        constructor();

        /** 页签ID */
        public tab_id: number;

        /** 当前大关id */
        public index: number;

        /** 当前小关id */
        public id: number;

        /** 免费重置次数 */
        public free: number;
    }

    /** 副本信息更新 */
    class s2c_forbidden_update {

        /** Constructs a new s2c_forbidden_update. */
        constructor();

        /** s2c_forbidden_update infos. */
        public infos: msg.forbidden_item[];
    }

    /** Represents a c2s_forbidden_get_info. */
    class c2s_forbidden_get_info {

        /** Constructs a new c2s_forbidden_get_info. */
        constructor();
    }

    /** 未能领取的不在这个列表 */
    class forbidden_reward_list {

        /** Constructs a new forbidden_reward_list. */
        constructor();

        /** 当前大关id */
        public index: number;

        /** 当前小关id */
        public id: number;

        /** 奖励标识 1可以领取；2已经领取 */
        public flag: number;
    }

    /** 通关大奖推送 */
    class s2c_forbidden_reward {

        /** Constructs a new s2c_forbidden_reward. */
        constructor();

        /** s2c_forbidden_reward infos. */
        public infos: msg.forbidden_reward_list[];
    }

    /** 领取通关大奖 */
    class c2s_get_reward {

        /** Constructs a new c2s_get_reward. */
        constructor();

        /** 大关id */
        public index: number;

        /** 小关id */
        public id: number;
    }

    /** Represents a c2s_forbidden_enter. */
    class c2s_forbidden_enter {

        /** Constructs a new c2s_forbidden_enter. */
        constructor();

        /** 页签id */
        public index: number;
    }

    /** 请求扫荡 */
    class c2s_forbidden_sweep {

        /** Constructs a new c2s_forbidden_sweep. */
        constructor();

        /** c2s_forbidden_sweep tab_id. */
        public tab_id: number;
    }

    /** 挑战副本 */
    class c2s_challenge_xiantower {

        /** Constructs a new c2s_challenge_xiantower. */
        constructor();

        /** 副本类型 */
        public type: number;
    }

    /** 继续挑战 */
    class c2s_challenge_next_xiantower {

        /** Constructs a new c2s_challenge_next_xiantower. */
        constructor();
    }

    /** 副本扫荡 */
    class c2s_xiantower_sweep {

        /** Constructs a new c2s_xiantower_sweep. */
        constructor();

        /** 副本类型 */
        public type: number;
    }

    /** 领取层数大奖 */
    class c2s_xiantower_get_rewards {

        /** Constructs a new c2s_xiantower_get_rewards. */
        constructor();

        /** 副本类型 */
        public type: number;
    }

    /** Represents a xiantower_dajiang_data. */
    class xiantower_dajiang_data {

        /** Constructs a new xiantower_dajiang_data. */
        constructor();

        /** 层数 */
        public layer: number;

        /** 领奖状态 1表示已领取 */
        public status: number;
    }

    /** Represents a xiantower_info. */
    class xiantower_info {

        /** Constructs a new xiantower_info. */
        constructor();

        /** 副本类型 */
        public type: number;

        /** 可用扫荡次数 */
        public count: number;

        /** 已挑战过的层数 */
        public layer: number;

        /** 已领取的奖励 */
        public reward?: (msg.xiantower_dajiang_data|null);
    }

    /** Represents a s2c_xiantower_info. */
    class s2c_xiantower_info {

        /** Constructs a new s2c_xiantower_info. */
        constructor();

        /** s2c_xiantower_info list. */
        public list: msg.xiantower_info[];
    }

    /** Represents a c2s_battle_use_skill. */
    class c2s_battle_use_skill {

        /** Constructs a new c2s_battle_use_skill. */
        constructor();

        /** c2s_battle_use_skill skill_index. */
        public skill_index: number;

        /** 动作类型 前端发后 广播给场景内其他人 */
        public client_type: number[];

        /** 选中目标的entity_id */
        public focus: Long;

        /** c2s_battle_use_skill x. */
        public x: number;

        /** c2s_battle_use_skill y. */
        public y: number;

        /** c2s_battle_use_skill focus_x. */
        public focus_x: number;

        /** c2s_battle_use_skill focus_y. */
        public focus_y: number;
    }

    /** Represents a s2c_battle_info. */
    class s2c_battle_info {

        /** Constructs a new s2c_battle_info. */
        constructor();

        /** s2c_battle_info skill_list. */
        public skill_list: msg.battle_use_skill[];

        /** 当前x坐标 */
        public x: number;

        /** 当前y坐标 */
        public y: number;

        /** 第几轮 */
        public round: number;

        /** s2c_battle_info show_x. */
        public show_x: number;

        /** s2c_battle_info show_y. */
        public show_y: number;

        /** 选中目标的entity_id */
        public focus: Long;
    }

    /** Represents a battle_use_skill. */
    class battle_use_skill {

        /** Constructs a new battle_use_skill. */
        constructor();

        /** battle_use_skill skill_index. */
        public skill_index: number;

        /** 是否使用成功，0：成功，其他为错误代码 */
        public reason: number;

        /** battle_use_skill x. */
        public x: number;

        /** battle_use_skill y. */
        public y: number;

        /** 动作类型 前端发后 广播给场景内其他人 */
        public client_type: number[];

        /** 施法者id 【技能对象id，buff对象id的命名空间】 */
        public caster: Long;

        /** 选中目标id */
        public focus: Long;

        /** 影响列表 */
        public effect_list: msg.battle_effect[];

        /** battle_use_skill cure_info. */
        public cure_info?: (msg.battle_value|null);

        /** 当前使用时间 */
        public use_time: number;

        /** 下次使用时间 */
        public next_use_time: number;
    }

    /** Represents a battle_effect. */
    class battle_effect {

        /** Constructs a new battle_effect. */
        constructor();

        /** 受影响目标id */
        public target: Long;

        /** 战斗数字结构体 */
        public b_value: msg.battle_value[];

        /** 是否致死攻击 */
        public is_dead: boolean;

        /** 击退点 */
        public push_x: number;

        /** 击退点 */
        public push_y: number;
    }

    /** Represents a battle_buff. */
    class battle_buff {

        /** Constructs a new battle_buff. */
        constructor();

        /** buff唯一id */
        public buff_id: number;

        /** battle_buff buff_index. */
        public buff_index: number;

        /** 来源 skill_index */
        public source: number;

        /** 结束时间/秒（没有代表永久） */
        public end_time: number;

        /** 开始时间/秒（没有代表永久） */
        public beg_time: number;

        /** battle_buff level. */
        public level: number;
    }

    /** Represents an element_value. */
    class element_value {

        /** Constructs a new element_value. */
        constructor();

        /** 元素类型  41:金 42:木 43:水 44:火 45:土 */
        public element_type: number;

        /** 值 */
        public value: Long;
    }

    /** Represents a battle_value. */
    class battle_value {

        /** Constructs a new battle_value. */
        constructor();

        /** 值类型 1:普通 2:穿甲 3:暴击 4:格挡（守方） 5:卓越一击 6:超神一击 7:治疗 8:闪避 9:精灵伤害 10:侍女 11:武将  17 灵器 */
        public value_type: number[];

        /** 值 */
        public value: Long;

        /** battle_value element_values. */
        public element_values: msg.element_value[];
    }

    /** Represents a battle_cure. */
    class battle_cure {

        /** Constructs a new battle_cure. */
        constructor();

        /** 治疗数字 */
        public cure: number;

        /** 是否暴击 */
        public crit: number;
    }

    /** Represents a battle_add_buff. */
    class battle_add_buff {

        /** Constructs a new battle_add_buff. */
        constructor();

        /** battle_add_buff target. */
        public target: Long;

        /** battle_add_buff buff. */
        public buff?: (msg.battle_buff|null);
    }

    /** Represents a battle_del_buff. */
    class battle_del_buff {

        /** Constructs a new battle_del_buff. */
        constructor();

        /** battle_del_buff buff_id. */
        public buff_id: number;

        /** battle_del_buff target. */
        public target: Long;
    }

    /** 效果 */
    class effect {

        /** Constructs a new effect. */
        constructor();

        /** id    同一个entity的效果id不会重复 */
        public effect_id: number;

        /** 效果编号 */
        public effect_index: number;

        /** 开始时间/秒 */
        public beg_time: number;

        /** 结束时间/秒 */
        public end_time: number;
    }

    /** 角色死亡 */
    class s2c_battle_role_die {

        /** Constructs a new s2c_battle_role_die. */
        constructor();

        /** 复活时间戳 */
        public relife_time: number;

        /** 杀死该角色的角色id */
        public from_entity_id: Long;

        /** 杀死该角色的角色名字 */
        public from_entity_name: string;

        /** 消耗的道具 */
        public items?: (msg.prop_tips_data|null);
    }

    /** 复仇协议   对应副本需要显示复仇的人，则需要添加该协议 */
    class s2c_atk_role_max_hurt_role_info {

        /** Constructs a new s2c_atk_role_max_hurt_role_info. */
        constructor();

        /** 最高伤害攻击者 */
        public maxhurt_player?: (msg.teammate|null);
    }

    /** Represents a s2c_bethegod_time. */
    class s2c_bethegod_time {

        /** Constructs a new s2c_bethegod_time. */
        constructor();

        /** 持续时间 */
        public time: number;
    }

    /** 场景中点击复活按钮 */
    class c2s_battle_role_relife {

        /** Constructs a new c2s_battle_role_relife. */
        constructor();
    }

    /** 复活 */
    class s2c_battle_role_relife {

        /** Constructs a new s2c_battle_role_relife. */
        constructor();
    }

    /** 客户端发付费复活协议 */
    class c2s_battle_revive {

        /** Constructs a new c2s_battle_revive. */
        constructor();
    }

    /** 服务端复活推送 */
    class s2c_battle_revive {

        /** Constructs a new s2c_battle_revive. */
        constructor();
    }

    /** 触发天赋提示 */
    class s2c_battle_trigger_talent {

        /** Constructs a new s2c_battle_trigger_talent. */
        constructor();

        /** s2c_battle_trigger_talent index. */
        public index: number;
    }

    /** BOSS抢夺归属模式变化 */
    class c2s_instance_set_fight_type {

        /** Constructs a new c2s_instance_set_fight_type. */
        constructor();

        /** 0:优先boss  1:优先抢夺归属 */
        public fight_type: number;
    }

    /** boss抢夺归属模式状态返回协议 */
    class s2c_instance_set_fight_type {

        /** Constructs a new s2c_instance_set_fight_type. */
        constructor();

        /** 1优先抢夺归属  0优先boss */
        public fight_type: number;

        /** 可缺省， 当优先boss模式切换到抢夺归属模式时会发送，用来延迟一段时间才能切回优先boss模式 */
        public delay_end_time: number;
    }

    /** Represents a teammate. */
    class teammate {

        /** Constructs a new teammate. */
        constructor();

        /** 角色id */
        public role_id: Long;

        /** 姓名 */
        public name: string;

        /** 头像 */
        public head: Long;

        /** 头像框 */
        public head_frame: Long;

        /** 性别 1:男 2:女 */
        public sex: number;

        /** 战队名字 */
        public team_name: string;

        /** 战力 */
        public showpower: Long;

        /** teammate entity_id. */
        public entity_id: Long;

        /** teammate vip. */
        public vip: number;

        /** 可选参数(如:伤害值) */
        public value: Long;

        /** 可选参数（如：名次） */
        public rank_num: number;

        /** teammate weapon. */
        public weapon: number;

        /** teammate fashion. */
        public fashion: number;

        /** 仙宗名称 */
        public guild_name: string;

        /** 仙宗id */
        public guild_id: number;

        /** 服务器id */
        public server_id: number;

        /** 仙力值 */
        public god: Long;

        /** 可选参数值 */
        public index: number;

        /** 转生index */
        public reincarnate: Long;

        /** 1 是    null / 0 不是 */
        public is_robot: number;

        /** 羽翼 */
        public wing: number;

        /** 称号index */
        public title_index: Long;

        /** 0不在线  1在线 */
        public is_online: number;

        /** 等级 */
        public level: number;

        /** 所在仙宗首座的名字 */
        public zongzhu_name: string;

        /** 聊天框 */
        public chat_frame: Long;

        /** 战队id */
        public team_id: Long;

        /** teammate xianlv_name. */
        public xianlv_name: string;

        /** 军团战斗所需数据 */
        public legion_data?: (msg.zhandui_battle_entity|null);

        /** 军团单位为boss的时候需要该字段 */
        public boss_id: Long;
    }

    /** 成为归属拥有者 */
    class s2c_instance_change_owner {

        /** Constructs a new s2c_instance_change_owner. */
        constructor();

        /** s2c_instance_change_owner owner. */
        public owner?: (msg.teammate|null);
    }

    /** Represents a c2s_control_ai. */
    class c2s_control_ai {

        /** Constructs a new c2s_control_ai. */
        constructor();

        /** 1停止，2开始 */
        public type: number;

        /** 场景id */
        public scene_id: number;
    }

    /** 功能开启/////////////// */
    class s2c_open_func_info {

        /** Constructs a new s2c_open_func_info. */
        constructor();

        /** 已开启功能index */
        public open: number[];

        /** 可以开启广告功能index */
        public ad_open: number[];
    }

    /** 手动功能开启 */
    class c2s_ad_can_open_func {

        /** Constructs a new c2s_ad_can_open_func. */
        constructor();

        /** c2s_ad_can_open_func index. */
        public index: number;
    }

    /** Represents a s2c_preview_online_request. */
    class s2c_preview_online_request {

        /** Constructs a new s2c_preview_online_request. */
        constructor();

        /** 已经购买了的编号 */
        public unreward: number[];
    }

    /** Represents a c2s_preview. */
    class c2s_preview {

        /** Constructs a new c2s_preview. */
        constructor();

        /** 领取奖励 */
        public index: number;
    }

    /** Represents a s2c_preview_ret. */
    class s2c_preview_ret {

        /** Constructs a new s2c_preview_ret. */
        constructor();

        /** s2c_preview_ret index. */
        public index: number;

        /** 状态false未购买   true已购买 */
        public state: boolean;
    }

    /** 2022.11.29 修改聊天协议 */
    class c2s_chat {

        /** Constructs a new c2s_chat. */
        constructor();

        /** 聊天频道类型 */
        public channel_type: number;

        /** 内容 */
        public content: string;

        /** 快捷语编号 没有的时候不发 */
        public quick_speak_idx: number;
    }

    /** Represents a s2c_chat. */
    class s2c_chat {

        /** Constructs a new s2c_chat. */
        constructor();

        /** s2c_chat info. */
        public info: msg.chat_info[];
    }

    /** Represents a chat_info. */
    class chat_info {

        /** Constructs a new chat_info. */
        constructor();

        /** 聊天频道类型 */
        public channel_type: number;

        /** chat_info sender. */
        public sender?: (msg.teammate|null);

        /** chat_info content. */
        public content: string;
    }

    /** 私聊 */
    class c2s_private_chat {

        /** Constructs a new c2s_private_chat. */
        constructor();

        /** 内容 */
        public content: string;

        /** 目标id */
        public target_role_id: Long;

        /** 目标所在的服务器id */
        public server_id: number;
    }

    /** Represents a private_chat_struct. */
    class private_chat_struct {

        /** Constructs a new private_chat_struct. */
        constructor();

        /** 内容 */
        public content: string;

        /** 内容的发送者(自己或者别人) */
        public sender?: (msg.teammate|null);
    }

    /** 请求对方聊天信息 */
    class c2s_get_private_chat {

        /** Constructs a new c2s_get_private_chat. */
        constructor();

        /** 目标id */
        public target_role_id: Long;

        /** 目标所在的服务器id */
        public server_id: number;
    }

    /** 请求对方聊天信息后返回 */
    class s2c_private_chat {

        /** Constructs a new s2c_private_chat. */
        constructor();

        /** 与该聊天人的私聊记录 */
        public infos: msg.private_chat_struct[];

        /** 对方（基于自身的私聊对象） */
        public target_role_id: Long;
    }

    /** 聊天信息更新结构 */
    class private_chat_update_struct {

        /** Constructs a new private_chat_update_struct. */
        constructor();

        /** 与该聊天人的私聊记录 */
        public infos: msg.private_chat_struct[];

        /** 对方（基于自身的私聊对象） */
        public target_role?: (msg.teammate|null);
    }

    /** 聊天信息更新双方 */
    class s2c_private_chat_update {

        /** Constructs a new s2c_private_chat_update. */
        constructor();

        /** 与该聊天人的私聊记录 */
        public all_infos: msg.private_chat_update_struct[];
    }

    /** 已读对方聊天信息 */
    class c2s_read_private_chat {

        /** Constructs a new c2s_read_private_chat. */
        constructor();

        /** 目标id */
        public target_role_id: Long;

        /** 目标所在的服务器id */
        public server_id: number;
    }

    /** 请求对方聊天信息后返回 */
    class c2s_private_chat_role_online_status {

        /** Constructs a new c2s_private_chat_role_online_status. */
        constructor();

        /** 传输的字段:server_id, role_id */
        public infos: msg.teammate[];
    }

    /** 更新的字段 */
    class s2c_private_chat_role_online_status {

        /** Constructs a new s2c_private_chat_role_online_status. */
        constructor();

        /** 传输的字段:server_id, role_id, is_online */
        public infos: msg.teammate[];
    }

    /** 打开设置界面 */
    class c2s_chat_open_setting {

        /** Constructs a new c2s_chat_open_setting. */
        constructor();
    }

    /** Represents a chat_setting_data. */
    class chat_setting_data {

        /** Constructs a new chat_setting_data. */
        constructor();

        /** 1屏蔽配置等级以下玩家  2屏蔽vip2以下发言 3屏蔽陌生人发言 */
        public set_type: number;

        /** 0：不屏蔽    1 屏蔽 */
        public val: number;
    }

    /** Represents a s2c_chat_open_setting. */
    class s2c_chat_open_setting {

        /** Constructs a new s2c_chat_open_setting. */
        constructor();

        /** 1打开界面   2设置后返回 */
        public type: number;

        /** s2c_chat_open_setting settings. */
        public settings: msg.chat_setting_data[];
    }

    /** Represents a c2s_chat_setting. */
    class c2s_chat_setting {

        /** Constructs a new c2s_chat_setting. */
        constructor();

        /** 1屏蔽配置等级以下玩家  2屏蔽vip2以下发言 3屏蔽陌生人发言 */
        public set_type: number;
    }

    /** 添加聊天黑名用户 */
    class c2s_chat_add_blackuser {

        /** Constructs a new c2s_chat_add_blackuser. */
        constructor();

        /** c2s_chat_add_blackuser server_id. */
        public server_id: number;

        /** c2s_chat_add_blackuser role_id. */
        public role_id: Long;

        /** 1 是    null / 0 不是 */
        public is_robot: number;
    }

    /** 打开聊天黑名单 */
    class c2s_chat_open_blacklist {

        /** Constructs a new c2s_chat_open_blacklist. */
        constructor();
    }

    /** 打开聊天黑名单 返回 */
    class s2c_chat_open_blacklist {

        /** Constructs a new s2c_chat_open_blacklist. */
        constructor();

        /** 1打开界面   2添加用户   3删除用户 */
        public type: number;

        /** s2c_chat_open_blacklist blackusers. */
        public blackusers: msg.teammate[];
    }

    /** 删除聊天黑名用户 */
    class c2s_chat_del_blackuser {

        /** Constructs a new c2s_chat_del_blackuser. */
        constructor();

        /** c2s_chat_del_blackuser role_id. */
        public role_id: Long;
    }

    /** 点击超链接 */
    class c2s_click_hyperlink {

        /** Constructs a new c2s_click_hyperlink. */
        constructor();

        /** 超链接index */
        public link_index: number;

        /** 发送超链接的role_id */
        public send_link_role_id: Long;

        /** 字符串参数,后端使用  例如："1-2-3"  分隔符 "-" */
        public str_agrs: string;

        /** 渠道 */
        public channel: number;

        /** link_id */
        public link_id: Long;

        /** 道具编号 */
        public prop_index: number;

        /** server_id */
        public server_id: number;
    }

    /** Represents a s2c_click_hyperlink. */
    class s2c_click_hyperlink {

        /** Constructs a new s2c_click_hyperlink. */
        constructor();

        /** link_id */
        public link_id: Long;

        /** 跳转id */
        public jump_id: number;
    }

    /** Represents a showpower_check_data. */
    class showpower_check_data {

        /** Constructs a new showpower_check_data. */
        constructor();

        /** 类型 */
        public head_type: number;

        /** 玩家自己的战力 */
        public self_showpower: Long;

        /** 比拼玩家的战力 */
        public role_showpower: Long;
    }

    /** Represents a s2c_chat_showpower_check_info. */
    class s2c_chat_showpower_check_info {

        /** Constructs a new s2c_chat_showpower_check_info. */
        constructor();

        /** s2c_chat_showpower_check_info info. */
        public info: msg.showpower_check_data[];

        /** 比拼玩家信息 */
        public check_role?: (msg.teammate|null);
    }

    /** Represents a c2s_chat_look_user. */
    class c2s_chat_look_user {

        /** Constructs a new c2s_chat_look_user. */
        constructor();

        /** c2s_chat_look_user role_id. */
        public role_id: Long;

        /** c2s_chat_look_user server_id. */
        public server_id: number;

        /** c2s_chat_look_user is_robot. */
        public is_robot: number;

        /** 1战力比拼   2展示信息 */
        public request_type: number;
    }

    /** Represents a s2c_chat_look_user. */
    class s2c_chat_look_user {

        /** Constructs a new s2c_chat_look_user. */
        constructor();

        /** 0失败   1成功 */
        public is_success: number;

        /** 查看的玩家信息 */
        public check_role?: (msg.teammate|null);

        /** s2c_chat_look_user shenling_list. */
        public shenling_list: msg.god_brother_type_data[];

        /** 装备 */
        public equips: msg.prop_attributes[];

        /** 当前坑位技能 */
        public godallskill: msg.skill_item[];

        /** 进阶系统信息及技能 */
        public sp_skill_info: msg.ride_info[];
    }

    /** 封号或禁言时 后端通知前端删除某个玩家的聊天记录 */
    class s2c_chat_del_record {

        /** Constructs a new s2c_chat_del_record. */
        constructor();

        /** s2c_chat_del_record role_id. */
        public role_id: Long;
    }

    /** Represents a s2c_prop_look_info. */
    class s2c_prop_look_info {

        /** Constructs a new s2c_prop_look_info. */
        constructor();

        /** 背包装备的展示 */
        public prop_info?: (msg.prop_attributes|null);

        /** s2c_prop_look_info takeon_eq. */
        public takeon_eq?: (msg.pos_detail|null);
    }

    /** 发起展示物品超链接 */
    class c2s_prop_look_info {

        /** Constructs a new c2s_prop_look_info. */
        constructor();

        /** 聊天频道类型 */
        public channel_type: number;

        /** 道具id */
        public prop_id: Long;

        /** 身上装备部位(用于身上穿戴的装备进行展示时发) */
        public pos: number;
    }

    /** 超看信息  返回 s2c_obj_look_info */
    class c2s_obj_look_info {

        /** Constructs a new c2s_obj_look_info. */
        constructor();

        /** 服务器id */
        public server_id: number;

        /** 类型  1人物  2宠物 */
        public type: number;

        /** 目标id */
        public target_id: Long;

        /** 1基础属性  2战斗属性 */
        public parts: number[];

        /** 1 是    null / 0 不是 */
        public is_robot: number;
    }

    /** 查看信息返回 */
    class s2c_obj_look_info {

        /** Constructs a new s2c_obj_look_info. */
        constructor();

        /** 类型  1人物 */
        public type: number;

        /** s2c_obj_look_info propertys. */
        public propertys?: (msg.property|null);

        /** achievement:盗墓宝典总成就点数 、  guild_position:九门职位 、  guild_team_name:帮派 、  team_position:所在帮派的职位 */
        public attrs?: (msg.attributes|null);

        /** 聊天发送当前身上装备信息预览    查询详细数据：  c2s_equip_pos_detail */
        public equip_msg: msg.equips_preview[];

        /** 1 是, null / 0 不是 */
        public is_robot: number;
    }

    /** Represents a special_equip. */
    class special_equip {

        /** Constructs a new special_equip. */
        constructor();

        /** 剑意 */
        public is_jianyi: number;

        /** 乾坤袋 */
        public is_qiankunbag: number;

        /** 混沌手套 */
        public is_hundunglove: number;
    }

    /** Represents an equips_preview. */
    class equips_preview {

        /** Constructs a new equips_preview. */
        constructor();

        /** 部位 */
        public pos: number;

        /** 只发index(装备index)，god_lv(神化lv)，bless_type(启灵lv) */
        public prop_info?: (msg.prop_attributes|null);

        /** 宝石  【其中宝石属性不会发】 */
        public gems?: (msg.equip_gem_data|null);
    }

    /** 充值//////////////////// */
    class c2s_open_charge_ui {

        /** Constructs a new c2s_open_charge_ui. */
        constructor();
    }

    /** Represents a s2c_open_charge_ui. */
    class s2c_open_charge_ui {

        /** Constructs a new s2c_open_charge_ui. */
        constructor();

        /** 存在代表没有倍数 */
        public no_multi_product_ids: number[];

        /** 1 代表没有 */
        public no_first_charge: number;

        /** 1代表更新 no_multi_product_ids 字段   2 缺省 */
        public oper: number;

        /** 每日礼包领取状态 1:已领取 0:未领取 */
        public daily_reward_state: number;
    }

    /** 购前验证是否可购买 */
    class c2s_check_product_id {

        /** Constructs a new c2s_check_product_id. */
        constructor();

        /** 商品编号 */
        public product_id: number;
    }

    /** Represents a s2c_check_product_id. */
    class s2c_check_product_id {

        /** Constructs a new s2c_check_product_id. */
        constructor();

        /** 商品编号 */
        public product_id: number;

        /** 是否可购买 */
        public can_buy: boolean;
    }

    /** Represents a c2s_charge_get_daily_reward. */
    class c2s_charge_get_daily_reward {

        /** Constructs a new c2s_charge_get_daily_reward. */
        constructor();
    }

    /** 获取兑换元宝信息 */
    class c2s_exchange_gold_info {

        /** Constructs a new c2s_exchange_gold_info. */
        constructor();
    }

    /** 点击兑换元宝 */
    class c2s_exchange_gold_click {

        /** Constructs a new c2s_exchange_gold_click. */
        constructor();

        /** 兑换的档位 num */
        public num: number;
    }

    /** 兑换元宝信息 */
    class s2c_exchange_gold_info {

        /** Constructs a new s2c_exchange_gold_info. */
        constructor();

        /** 已兑换仙玉数量 */
        public use_cnt: number;
    }

    /** Represents a c2s_mainline_open_ui. */
    class c2s_mainline_open_ui {

        /** Constructs a new c2s_mainline_open_ui. */
        constructor();
    }

    /** Represents a s2c_mainline_open_ui. */
    class s2c_mainline_open_ui {

        /** Constructs a new s2c_mainline_open_ui. */
        constructor();

        /** 杀几只小怪才能闯关 */
        public target_wave_cnt: number;

        /** 当前杀了几只小怪 */
        public now_wave_cnt: number;

        /** 是否自动闯关 */
        public is_auto_fin: boolean;

        /** 主线关卡最大的编号 */
        public max_mainline_idx: number;

        /** 当前关卡 （已挑战过） */
        public cur_index: number;
    }

    /** Represents a s2c_mainline_first_lose. */
    class s2c_mainline_first_lose {

        /** Constructs a new s2c_mainline_first_lose. */
        constructor();
    }

    /** Represents a c2s_mainline_enter. */
    class c2s_mainline_enter {

        /** Constructs a new c2s_mainline_enter. */
        constructor();

        /** 进行闯关的关卡index */
        public index: number;
    }

    /** Represents a c2s_mainline_rank. */
    class c2s_mainline_rank {

        /** Constructs a new c2s_mainline_rank. */
        constructor();
    }

    /** Represents a rank_role_info. */
    class rank_role_info {

        /** Constructs a new rank_role_info. */
        constructor();

        /** 排行的序位 */
        public rank_no: number;

        /** 玩家的名字 */
        public name: string;

        /** rank_role_info head. */
        public head: number;

        /** rank_role_info agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 闯关数 */
        public count: number;

        /** 战力 */
        public power: Long;
    }

    /** Represents a s2c_mainline_rank. */
    class s2c_mainline_rank {

        /** Constructs a new s2c_mainline_rank. */
        constructor();

        /** 排行榜前二十名的信息 */
        public infos: msg.rank_role_info[];

        /** 玩家的当前排行 */
        public my_rank: number;

        /** 玩家当前闯关数 */
        public my_count: number;

        /** s2c_mainline_rank top_info. */
        public top_info?: (msg.teammate|null);
    }

    /** 自动闯关 */
    class c2s_mainline_task_auto {

        /** Constructs a new c2s_mainline_task_auto. */
        constructor();

        /** c2s_mainline_task_auto is_auto_fin. */
        public is_auto_fin: boolean;
    }

    /** 开始挑战boss */
    class s2c_mainline_challenge_stage {

        /** Constructs a new s2c_mainline_challenge_stage. */
        constructor();

        /** 进入的关卡 */
        public challenge_stage: number;
    }

    /** 大神榜 */
    class c2s_mainline_rank_server_award {

        /** Constructs a new c2s_mainline_rank_server_award. */
        constructor();
    }

    /** Represents a mainline_rank_award_info. */
    class mainline_rank_award_info {

        /** Constructs a new mainline_rank_award_info. */
        constructor();

        /** mainline_rank_award_info index. */
        public index: number;

        /** 玩家id */
        public role_id: Long;

        /** mainline_rank_award_info name. */
        public name: string;

        /** mainline_rank_award_info icon. */
        public icon: number;

        /** mainline_rank_award_info sex. */
        public sex: number;

        /** mainline_rank_award_info icon_frame. */
        public icon_frame: number;
    }

    /** Represents a s2c_mainline_rank_server_award. */
    class s2c_mainline_rank_server_award {

        /** Constructs a new s2c_mainline_rank_server_award. */
        constructor();

        /** s2c_mainline_rank_server_award infos. */
        public infos: msg.mainline_rank_award_info[];
    }

    /** Represents a c2s_mainline_rank_award. */
    class c2s_mainline_rank_award {

        /** Constructs a new c2s_mainline_rank_award. */
        constructor();

        /** c2s_mainline_rank_award index. */
        public index: number;
    }

    /** Represents a s2c_mainline_rank_award. */
    class s2c_mainline_rank_award {

        /** Constructs a new s2c_mainline_rank_award. */
        constructor();

        /** s2c_mainline_rank_award server_award. */
        public server_award: number[];
    }

    /** 世界地图 */
    class c2s_mainline_wroldmap {

        /** Constructs a new c2s_mainline_wroldmap. */
        constructor();

        /** c2s_mainline_wroldmap index. */
        public index: number;
    }

    /** 个人领取情况 */
    class s2c_mainline_wroldmap {

        /** Constructs a new s2c_mainline_wroldmap. */
        constructor();

        /** s2c_mainline_wroldmap award. */
        public award: number[];
    }

    /** 机缘 */
    class c2s_qiyuan_enter {

        /** Constructs a new c2s_qiyuan_enter. */
        constructor();

        /** c2s_qiyuan_enter index. */
        public index: number;
    }

    /** 奇缘 副本结构数据 */
    class qiyuan_raid_data {

        /** Constructs a new qiyuan_raid_data. */
        constructor();

        /** 已挑战过x个副本(副本数量为配置表中配置的副本index数量) */
        public raid_count: number;

        /** 奇缘配置表的index(配置表备注是任务ID) */
        public index: number;
    }

    /** Represents a s2c_qiyuan_award. */
    class s2c_qiyuan_award {

        /** Constructs a new s2c_qiyuan_award. */
        constructor();

        /** s2c_qiyuan_award award. */
        public award: number[];

        /** 任务类型1的副本通关数据 */
        public list: msg.qiyuan_raid_data[];
    }

    /** Represents a c2s_mainline_topthree. */
    class c2s_mainline_topthree {

        /** Constructs a new c2s_mainline_topthree. */
        constructor();

        /** c2s_mainline_topthree index. */
        public index: number;
    }

    /** Represents a mainline_topthree_info. */
    class mainline_topthree_info {

        /** Constructs a new mainline_topthree_info. */
        constructor();

        /** 玩家id */
        public role_id: Long;

        /** mainline_topthree_info name. */
        public name: string;

        /** mainline_topthree_info icon. */
        public icon: Long;

        /** mainline_topthree_info sex. */
        public sex: number;

        /** mainline_topthree_info icon_frame. */
        public icon_frame: Long;
    }

    /** Represents a s2c_mainline_topthree. */
    class s2c_mainline_topthree {

        /** Constructs a new s2c_mainline_topthree. */
        constructor();

        /** s2c_mainline_topthree infos. */
        public infos: msg.mainline_topthree_info[];
    }

    /** Represents a c2s_scene_exit. */
    class c2s_scene_exit {

        /** Constructs a new c2s_scene_exit. */
        constructor();
    }

    /** Represents a s2c_city_war_fight_update. */
    class s2c_city_war_fight_update {

        /** Constructs a new s2c_city_war_fight_update. */
        constructor();

        /** s2c_city_war_fight_update status. */
        public status: number;

        /** s2c_city_war_fight_update my_hp. */
        public my_hp: number;

        /** s2c_city_war_fight_update enemy_hp. */
        public enemy_hp: number;

        /** s2c_city_war_fight_update enemy_info. */
        public enemy_info?: (msg.teammate|null);
    }

    /** Represents a s2c_city_moment_fight_update. */
    class s2c_city_moment_fight_update {

        /** Constructs a new s2c_city_moment_fight_update. */
        constructor();

        /** s2c_city_moment_fight_update atk_hp. */
        public atk_hp: number;

        /** s2c_city_moment_fight_update enemy_hp. */
        public enemy_hp: number;

        /** s2c_city_moment_fight_update enemy_info. */
        public enemy_info?: (msg.teammate|null);

        /** s2c_city_moment_fight_update props. */
        public props: msg.prop_tips_data[];
    }

    /** 客户端请求 */
    class c2s_new_equip_online_request {

        /** Constructs a new c2s_new_equip_online_request. */
        constructor();
    }

    /** 客户端请求才发 */
    class s2c_equip_online_equip_request {

        /** Constructs a new s2c_equip_online_equip_request. */
        constructor();

        /** 装备 */
        public equips: msg.prop_attributes[];
    }

    /** 装备操作 */
    class c2s_equip_operate {

        /** Constructs a new c2s_equip_operate. */
        constructor();

        /** 1：穿  2：脱  3：一键穿戴 */
        public oper: number;

        /** 装备的唯一id（一键穿戴可缺省） */
        public prop_id: Long;
    }

    /** 装备更新 */
    class s2c_equip_update {

        /** Constructs a new s2c_equip_update. */
        constructor();

        /** 装备属性 */
        public update_info: msg.prop_attributes[];
    }

    /** Represents a c2s_equip_get_info. */
    class c2s_equip_get_info {

        /** Constructs a new c2s_equip_get_info. */
        constructor();

        /** c2s_equip_get_info index. */
        public index: number;

        /** 1 是【只用于聊天展示装备信息的机器人】  /其他情况不发该字段  null / 0 不是 */
        public is_robot: number;
    }

    /** Represents a s2c_equip_info. */
    class s2c_equip_info {

        /** Constructs a new s2c_equip_info. */
        constructor();

        /** s2c_equip_info info. */
        public info?: (msg.pos_detail|null);
    }

    /** 客户端请求 */
    class c2s_equip_online_request {

        /** Constructs a new c2s_equip_online_request. */
        constructor();
    }

    /** 装备继承 */
    class c2s_equip_inherit {

        /** Constructs a new c2s_equip_inherit. */
        constructor();

        /** c2s_equip_inherit pos. */
        public pos: number;

        /** 新装备的id */
        public equip_id: Long;
    }

    /** 强化信息 */
    class s2c_equip_online_strength_request {

        /** Constructs a new s2c_equip_online_strength_request. */
        constructor();

        /** 强化信息 */
        public strengths: msg.equip_strength_data[];

        /** 强化大师 */
        public strength_master?: (msg.strength_master_data|null);

        /** 当前需强化的位置 */
        public cur_pos: number;
    }

    /** 宝石信息 */
    class s2c_equip_online_gem_request {

        /** Constructs a new s2c_equip_online_gem_request. */
        constructor();

        /** 宝石信息 */
        public gems: msg.equip_gem_data[];

        /** 宝石大师 */
        public gem_master?: (msg.gem_master_data|null);
    }

    /** 进阶信息 */
    class s2c_equip_online_advanced_request {

        /** Constructs a new s2c_equip_online_advanced_request. */
        constructor();

        /** 进阶信息 */
        public advanceds: msg.equip_advanced_data[];

        /** 进阶大师 */
        public advanced_master?: (msg.advanced_master_data|null);

        /** 当前需强化的位置 */
        public cur_pos: number;
    }

    /** 强化升级 */
    class c2s_equip_strength {

        /** Constructs a new c2s_equip_strength. */
        constructor();

        /** 1强化   2一键强化 */
        public buttontype: number;

        /** 选择的位置 */
        public pos: number;
    }

    /** Represents a s2c_equip_update_strength. */
    class s2c_equip_update_strength {

        /** Constructs a new s2c_equip_update_strength. */
        constructor();

        /** 强化信息 */
        public strengths: msg.equip_strength_data[];

        /** 当前需强化的位置 */
        public cur_pos: number;
    }

    /** 强化 */
    class equip_strength_data {

        /** Constructs a new equip_strength_data. */
        constructor();

        /** 部位 */
        public equip_type: number;

        /** 等级 */
        public strength_lv: number;

        /** 属性 */
        public attrs?: (msg.attributes|null);

        /** equip_strength_data next_attrs. */
        public next_attrs?: (msg.attributes|null);
    }

    /** 强化大师升级 */
    class c2s_equip_strength_master {

        /** Constructs a new c2s_equip_strength_master. */
        constructor();
    }

    /** Represents a strength_master_data. */
    class strength_master_data {

        /** Constructs a new strength_master_data. */
        constructor();

        /** 阶级 */
        public level: number;

        /** 进阶时, 每个装备需要达标的等级 */
        public reach_level: number;

        /** 当前属性 */
        public attrs?: (msg.attributes|null);

        /** 下一级属性 */
        public next_attrs?: (msg.attributes|null);
    }

    /** Represents a s2c_equip_strength_master. */
    class s2c_equip_strength_master {

        /** Constructs a new s2c_equip_strength_master. */
        constructor();

        /** s2c_equip_strength_master info. */
        public info?: (msg.strength_master_data|null);
    }

    /** 宝石相关//////////////////// */
    class c2s_equip_operate_gem {

        /** Constructs a new c2s_equip_operate_gem. */
        constructor();

        /** 1一键升级，2一键镶嵌 */
        public op_type: number;

        /** 1-10装备部位 */
        public equip_type: number;
    }

    /** Represents a s2c_equip_update_gem. */
    class s2c_equip_update_gem {

        /** Constructs a new s2c_equip_update_gem. */
        constructor();

        /** s2c_equip_update_gem gem. */
        public gem: msg.equip_gem_data[];
    }

    /** Represents a gem_data. */
    class gem_data {

        /** Constructs a new gem_data. */
        constructor();

        /** 宝石类型 */
        public gem_type: number;

        /** 宝石编号 */
        public index: number;

        /** 宝石位是否已解锁 */
        public is_lock: boolean;

        /** 宝石增加属性 */
        public attrs?: (msg.attributes|null);
    }

    /** Represents an equip_gem_data. */
    class equip_gem_data {

        /** Constructs a new equip_gem_data. */
        constructor();

        /** 1-10装备部位 */
        public equip_type: number;

        /** equip_gem_data gems. */
        public gems: msg.gem_data[];
    }

    /** 镶嵌宝石 */
    class c2s_equip_gem_takeon {

        /** Constructs a new c2s_equip_gem_takeon. */
        constructor();

        /** 1-10装备部位 */
        public equip_type: number;

        /** 宝石类型 */
        public gem_type: number;

        /** 宝石的物品唯一id */
        public gem_id: Long;
    }

    /** 拆除宝石 */
    class c2s_equip_gem_takeoff {

        /** Constructs a new c2s_equip_gem_takeoff. */
        constructor();

        /** 1-10装备部位 */
        public equip_type: number;

        /** 宝石类型 */
        public gem_type: number;
    }

    /** 合成宝石（一键合成，合成） */
    class c2s_equip_gem_combine {

        /** Constructs a new c2s_equip_gem_combine. */
        constructor();

        /** 1-10装备部位 只有合成身上的宝石时才发 */
        public equip_type: number;

        /** 宝石类型 */
        public gem_type: number;

        /** 宝石编号 */
        public gem_index: number;

        /** 1:合成 2:单类型一键合成 3:所有一键合成 */
        public flag: number;
    }

    /** Represents a c2s_equip_gem_attrs. */
    class c2s_equip_gem_attrs {

        /** Constructs a new c2s_equip_gem_attrs. */
        constructor();

        /** 宝石index */
        public index: number;
    }

    /** Represents a s2c_equip_gem_attrs. */
    class s2c_equip_gem_attrs {

        /** Constructs a new s2c_equip_gem_attrs. */
        constructor();

        /** 属性 */
        public attrs?: (msg.attributes|null);
    }

    /** 宝石大师 */
    class c2s_equip_gem_master {

        /** Constructs a new c2s_equip_gem_master. */
        constructor();
    }

    /** Represents a gem_master_data. */
    class gem_master_data {

        /** Constructs a new gem_master_data. */
        constructor();

        /** 宝石等级 */
        public level: number;

        /** 当前阶所需宝石总等级 */
        public gem_lv: number;

        /** 下一阶所需宝石总等级 */
        public next_gem_lv: number;

        /** 当前等级属性 */
        public attrs?: (msg.attributes|null);

        /** 下一等级属性 */
        public next_attrs?: (msg.attributes|null);
    }

    /** Represents a s2c_equip_gem_master. */
    class s2c_equip_gem_master {

        /** Constructs a new s2c_equip_gem_master. */
        constructor();

        /** s2c_equip_gem_master info. */
        public info?: (msg.gem_master_data|null);
    }

    /** 装备进阶////////////////////// */
    class c2s_equip_advanced {

        /** Constructs a new c2s_equip_advanced. */
        constructor();

        /** 选择的位置 */
        public equiptype: number;
    }

    /** Represents a s2c_equip_update_advanced. */
    class s2c_equip_update_advanced {

        /** Constructs a new s2c_equip_update_advanced. */
        constructor();

        /** 强化信息 */
        public advanceds: msg.equip_advanced_data[];
    }

    /** 进阶 */
    class equip_advanced_data {

        /** Constructs a new equip_advanced_data. */
        constructor();

        /** 部位 */
        public equip_type: number;

        /** 等级 */
        public advanced_lv: number;

        /** 属性 */
        public attrs?: (msg.attributes|null);

        /** 下一级属性 */
        public next_attrs?: (msg.attributes|null);
    }

    /** 进阶大师升级 */
    class c2s_equip_advanced_master {

        /** Constructs a new c2s_equip_advanced_master. */
        constructor();
    }

    /** Represents an advanced_master_data. */
    class advanced_master_data {

        /** Constructs a new advanced_master_data. */
        constructor();

        /** 阶级 */
        public level: number;

        /** 进阶时, 每个装备需要达标的等级 */
        public rench_level: number;

        /** 当前属性 */
        public attrs?: (msg.attributes|null);

        /** 下一级属性 */
        public next_attrs?: (msg.attributes|null);
    }

    /** Represents a s2c_equip_advanced_master. */
    class s2c_equip_advanced_master {

        /** Constructs a new s2c_equip_advanced_master. */
        constructor();

        /** s2c_equip_advanced_master info. */
        public info?: (msg.advanced_master_data|null);
    }

    /** 点击装备部位查看详情 */
    class c2s_equip_pos_detail {

        /** Constructs a new c2s_equip_pos_detail. */
        constructor();

        /** 装备部位 */
        public pos: number;

        /** 点击查看他人装备时才使用该字段【选择目标的role_id】 / 其他情况默认缺省不发 */
        public choose_id: Long;

        /** 点击查看他人装备时才使用该字段【服务器ID】 */
        public server_id: number;
    }

    /** Represents a pos_detail. */
    class pos_detail {

        /** Constructs a new pos_detail. */
        constructor();

        /** 装备 */
        public equips?: (msg.prop_attributes|null);

        /** 强化 */
        public strengths?: (msg.equip_strength_data|null);

        /** 宝石 */
        public gems?: (msg.equip_gem_data|null);

        /** 升星 */
        public upstar?: (msg.equip_upstar_data|null);

        /** 套装 */
        public suit?: (msg.equip_suit_data|null);

        /** 品阶 */
        public general?: (msg.equip_general_data|null);
    }

    /** 装备部位详情信息 */
    class s2c_equip_pos_detail {

        /** Constructs a new s2c_equip_pos_detail. */
        constructor();

        /** s2c_equip_pos_detail show. */
        public show?: (msg.pos_detail|null);
    }

    /** 升星 4 */
    class equip_upstar_data {

        /** Constructs a new equip_upstar_data. */
        constructor();

        /** 部位 */
        public equip_type: number;

        /** 等级 */
        public level: number;

        /** 当前升星成功率 */
        public success_rate: number;

        /** 属性增加百分比 */
        public percent: number;

        /** 下一次升星属性增加百分比 */
        public next_percent: number;

        /** 战斗力 */
        public showpower: Long;

        /** 是否升级成功，成功返回1， 失败返回2 */
        public state: number;

        /** 升星消耗物品 */
        public cost_props: msg.prop_tips_data[];
    }

    /** 套装 */
    class equip_suit_data {

        /** Constructs a new equip_suit_data. */
        constructor();

        /** 精炼等级 */
        public lv: number;

        /** 激活了哪些部位 */
        public equip_type: number[];

        /** 套装属性 */
        public attr_list: msg.suit_attr[];
    }

    /** Represents a suit_attr. */
    class suit_attr {

        /** Constructs a new suit_attr. */
        constructor();

        /** 几件套 */
        public num: number;

        /** 套装index */
        public suit_index: number;

        /** 是否激活 */
        public is_act: boolean;

        /** 基础属性 */
        public base_attr?: (msg.attributes|null);

        /** 精炼增加属性 */
        public cut_attr?: (msg.attributes|null);
    }

    /** 激活多个外显/////////////// */
    class s2c_role_surface_info {

        /** Constructs a new s2c_role_surface_info. */
        constructor();

        /** s2c_role_surface_info fashion. */
        public fashion: number;

        /** s2c_role_surface_info weapon. */
        public weapon: number;

        /** s2c_role_surface_info wing. */
        public wing: number;
    }

    /** 请求羽翼信息 */
    class c2s_wings_info {

        /** Constructs a new c2s_wings_info. */
        constructor();
    }

    /** Represents a swal_item. */
    class swal_item {

        /** Constructs a new swal_item. */
        constructor();

        /** 仙晶种类 */
        public swal_type: number;

        /** 吞噬上限 */
        public swal_lmt: number;

        /** 吞噬进度 */
        public swal_exp: number;

        /** 仙晶属性 */
        public swal_attr?: (msg.attributes|null);
    }

    /** 羽翼技能结构体 */
    class wings_skill_item {

        /** Constructs a new wings_skill_item. */
        constructor();

        /** 技能编号 */
        public idx: number;

        /** 技能位置 */
        public pos: number;

        /** 技能等级 */
        public lv: number;

        /** 技能升级所需羽翼等级 */
        public levelup_wings_lv: number;

        /** 属性 */
        public attr?: (msg.attributes|null);

        /** 下一级属性 */
        public next_attr?: (msg.attributes|null);

        /** 被动技能 */
        public buff: number;

        /** 下一级被动技能 */
        public next_buff: number;
    }

    /** 羽翼结构体 */
    class wings_item {

        /** Constructs a new wings_item. */
        constructor();

        /** 羽翼编号 */
        public index: number;

        /** 羽翼星数 */
        public star: number;

        /** 当前属性 */
        public attr?: (msg.attributes|null);

        /** 下一星级属性 */
        public next_attr?: (msg.attributes|null);

        /** 特殊属性 */
        public special_attr?: (msg.attributes|null);
    }

    /** 发送全部信息 */
    class s2c_wings_info {

        /** Constructs a new s2c_wings_info. */
        constructor();

        /** 1:全部 2:缺省 */
        public oper: number;

        /** 当前幻化的羽翼 */
        public cur_wings: number;

        /** 激活列表 */
        public active_list: msg.wings_item[];

        /** 总战力值 */
        public showpower: Long;

        /** 等级 */
        public lv: number;

        /** 经验值 */
        public lucky: number;

        /** 升级所需经验值 */
        public levelup_lucky: number;

        /** 当前属性 */
        public attr?: (msg.attributes|null);

        /** 下级属性 */
        public next_attr?: (msg.attributes|null);

        /** 技能列表 */
        public skill_list: msg.wings_skill_item[];

        /** 灵身装备 */
        public equip_list: msg.prop_attributes[];

        /** 仙晶列表 */
        public swal_list: msg.swal_item[];

        /** 升级消耗 */
        public lvup_cost: msg.prop_tips_data[];
    }

    /** Represents a c2s_wings_oper. */
    class c2s_wings_oper {

        /** Constructs a new c2s_wings_oper. */
        constructor();

        /** 1:技能激活/升级 2:仙晶吞噬 3:装备一键穿戴 4:等级培养 5:羽翼幻化 6:翼灵合成/激活/升星 */
        public oper: number;

        /** oper=1时,技能编号 oper=2时,吞噬类型123 oper=6时,合成的目标羽翼编号 */
        public index: number;

        /** 是否自动购买 */
        public is_onekey: boolean;
    }

    /** 羽翼装备一键合成 */
    class c2s_wings_equip_onekey_synthesis {

        /** Constructs a new c2s_wings_equip_onekey_synthesis. */
        constructor();
    }

    /** 任务结构体 */
    class task_item {

        /** Constructs a new task_item. */
        constructor();

        /** 任务编号 */
        public index: number;

        /** 任务进度 */
        public schedule: number;

        /** 任务状态  0:未完成，1:已完成未领取，2:已领取 */
        public status: number;

        /** 任务失效时间戳，缺省为不限时间 */
        public time_out: number;

        /** 目标 */
        public target: number;

        /** 跳转编号 */
        public jump: number;

        /** 指引箭头 */
        public arrow: number[];

        /** 任务名称 */
        public name: string;

        /** 任务描述 */
        public desc: string;

        /** 任务奖励 */
        public task_reward: msg.prop_tips_data[];

        /** 是否自动点击 */
        public auto: number;

        /** 条件类型 99999 是最后一个任务 */
        public cond_type: number;

        /** 任务类型 */
        public task_type: number;

        /** 任务小类型 */
        public sub_type: number;

        /** 任务位置(护宝勋章) */
        public pos: number;

        /** 刷新时间(护宝勋章) */
        public refresh_time: number;

        /** 任务星级(古冢倒斗) */
        public star: number;

        /** 结婚任务自己的进度 */
        public self_schedule: number;

        /** 结婚任务对方的进度 */
        public else_schedule: number;
    }

    /** Represents a npc_data. */
    class npc_data {

        /** Constructs a new npc_data. */
        constructor();

        /** 唯一编号 */
        public npc_id: number;

        /** 配表编号 */
        public npc_index: number;

        /** 名字 */
        public name: string;

        /** 场景编号 */
        public scene_index: number;

        /** npc_data x. */
        public x: number;

        /** npc_data y. */
        public y: number;

        /** 朝向 */
        public direction: number;

        /** 模型 */
        public shape: string;

        /** true 永久 */
        public permanent: boolean;
    }

    /** Represents a task_data. */
    class task_data {

        /** Constructs a new task_data. */
        constructor();

        /** 任务ID */
        public task_id: number;

        /** 0未完成  1完成  2领取 */
        public status: number;

        /** 目标 */
        public target: number;

        /** 任务进度 */
        public schedule: number;
    }

    /** Represents a c2s_all_task_info. */
    class c2s_all_task_info {

        /** Constructs a new c2s_all_task_info. */
        constructor();

        /** c2s_all_task_info task_types. */
        public task_types: number[];
    }

    /** Represents a s2c_all_task_info. */
    class s2c_all_task_info {

        /** Constructs a new s2c_all_task_info. */
        constructor();

        /** 默认或者1是全部  2是部分更新  3删除 */
        public oper: number;

        /** s2c_all_task_info tasks. */
        public tasks: msg.task_data[];

        /** 章节最大任务数 */
        public max_chapter_task_no: number;

        /** 1 代表 （章节红点 and 可领取） */
        public chapter_hint: number;
    }

    /** 点击任务 */
    class c2s_task_trigger {

        /** Constructs a new c2s_task_trigger. */
        constructor();

        /** 唯一ID */
        public task_id: number;
    }

    /** 执行任务事件 */
    class s2c_task_event_script {

        /** Constructs a new s2c_task_event_script. */
        constructor();

        /** 唯一ID */
        public task_id: number;

        /** s2c_task_event_script scripts. */
        public scripts: string[];
    }

    /** 前端执行成功返回 */
    class c2s_task_event_script {

        /** Constructs a new c2s_task_event_script. */
        constructor();

        /** 唯一ID */
        public task_id: number;

        /** 返回脚本 */
        public scripts: string;
    }

    /** 点击触发NPC (NPC对话  NPC采集  NPC战斗 与NPC交互都用这条) */
    class c2s_npc_trigger {

        /** Constructs a new c2s_npc_trigger. */
        constructor();

        /** 触发NPC */
        public npc_id: number;
    }

    /** 收集公共道具 */
    class c2s_task_collect_prop {

        /** Constructs a new c2s_task_collect_prop. */
        constructor();

        /** c2s_task_collect_prop entity_id. */
        public entity_id: Long;
    }

    /** 读条 使用道具 采集道具 */
    class s2c_pop_progressbar {

        /** Constructs a new s2c_pop_progressbar. */
        constructor();

        /** 读条文本 */
        public title: string;

        /** 开始时间戳 */
        public beg_time: number;

        /** 结束时间戳 */
        public end_time: number;

        /** 读条id 需要成功返回给后端 */
        public bar_id: number;

        /** 读条类型 1长条  2转圈 */
        public bar_type: number;
    }

    /** 读条成功返回 */
    class c2s_pop_progressbar {

        /** Constructs a new c2s_pop_progressbar. */
        constructor();

        /** 读条id */
        public bar_id: number;

        /** 0失败 1成功 */
        public ret: number;
    }

    /** Represents a chat_contents. */
    class chat_contents {

        /** Constructs a new chat_contents. */
        constructor();

        /** chat_contents shape. */
        public shape: string;

        /** chat_contents content. */
        public content: string;

        /** 对话者名称 */
        public name: string;
    }

    /** 对话选择框 */
    class s2c_pop_select_box {

        /** Constructs a new s2c_pop_select_box. */
        constructor();

        /** 需要返回 */
        public uid: number;

        /** 对话内容 */
        public contents: msg.chat_contents[];

        /** 按钮类型 空就是默认 */
        public button_type: number;

        /** 任务类型   副本里面没有类型 */
        public task_type: number;

        /** 任务编号 */
        public task_idx: number;
    }

    /** 对话选择框 */
    class c2s_pop_select_box {

        /** Constructs a new c2s_pop_select_box. */
        constructor();

        /** 需要返回 */
        public uid: number;

        /** 选择的按钮 */
        public select_no: number;
    }

    /** 领取奖励 */
    class c2s_task_recv_reward {

        /** Constructs a new c2s_task_recv_reward. */
        constructor();

        /** 任务完成后领取奖励 */
        public task_id: number;
    }

    /** 领取奖励 */
    class c2s_one_key_task_recv_reward {

        /** Constructs a new c2s_one_key_task_recv_reward. */
        constructor();

        /** 一键领取任务奖励 */
        public task_type: number;
    }

    /** Represents a plot_contents. */
    class plot_contents {

        /** Constructs a new plot_contents. */
        constructor();

        /** plot_contents shape. */
        public shape: string;

        /** 说话者名字 */
        public name: string;

        /** 冒泡对象类型 1:主角 2:伙伴 3:灵宠 4:兽宠 5:NPC 6:场景BOSS */
        public obj_type: number;

        /** 冒泡对象编号 */
        public obj_index: number;

        /** 内容 */
        public content: string;

        /** 剧情类型 */
        public plot_type: number;
    }

    /** 任务剧情 */
    class s2c_task_plot {

        /** Constructs a new s2c_task_plot. */
        constructor();

        /** s2c_task_plot delay_time. */
        public delay_time: number;

        /** 对话内容 */
        public contents: msg.plot_contents[];

        /** 任务类型   副本里面没有类型 */
        public task_type: number;

        /** 任务编号 */
        public task_idx: number;
    }

    /** 快速完成任务 */
    class c2s_quick_task {

        /** Constructs a new c2s_quick_task. */
        constructor();

        /** c2s_quick_task task_idx. */
        public task_idx: number;
    }

    /** 客户端请求 */
    class c2s_medal_info {

        /** Constructs a new c2s_medal_info. */
        constructor();
    }

    /** Represents a medal_item. */
    class medal_item {

        /** Constructs a new medal_item. */
        constructor();

        /** 勋章编号 1~3 */
        public medal_idx: number;

        /** 是否已激活 1:是 其他:否 */
        public is_act: number;

        /** 战斗力 */
        public showpower: Long;

        /** 等级 */
        public lv: number;

        /** 升级所需功勋 */
        public next_exp: number;

        /** 单个勋章属性 */
        public attr?: (msg.attributes|null);

        /** 下一级属性 */
        public next_attr?: (msg.attributes|null);

        /** 当前的任务 */
        public cur_tasks: msg.task_item[];

        /** 是否领过特权奖励 1:已领 */
        public rewarded: number;
    }

    /** Represents a s2c_medal_new_info. */
    class s2c_medal_new_info {

        /** Constructs a new s2c_medal_new_info. */
        constructor();

        /** 1：全部 2：缺省 */
        public operate: number;

        /** 勋章等级 */
        public lv: number;

        /** 当前通用任务 */
        public cur_tasks: msg.task_item[];

        /** 主系统属性 */
        public attr?: (msg.attributes|null);

        /** 下一级属性 */
        public next_attr?: (msg.attributes|null);

        /** 主系统战力 */
        public show_power: Long;

        /** 升级所需奖杯数 */
        public next_cup_count: number;

        /** 当前勋章 */
        public cur_index: number;

        /** 奖杯总值 */
        public sum_cup_count: number;
    }

    /** 勋章操作 */
    class c2s_medal_oper {

        /** Constructs a new c2s_medal_oper. */
        constructor();

        /** 1:升级勋章 2:特权领奖 3:激活勋章 4:幻化 */
        public oper: number;

        /** 勋章编号 */
        public medal_idx: number;
    }

    /** Represents a c2s_medal_daily_reward. */
    class c2s_medal_daily_reward {

        /** Constructs a new c2s_medal_daily_reward. */
        constructor();

        /** c2s_medal_daily_reward index. */
        public index: number;
    }

    /** Represents a s2c_medal_daily_reward. */
    class s2c_medal_daily_reward {

        /** Constructs a new s2c_medal_daily_reward. */
        constructor();

        /** s2c_medal_daily_reward cur_experience. */
        public cur_experience: number;

        /** s2c_medal_daily_reward state. */
        public state: number;

        /** s2c_medal_daily_reward rwd_list. */
        public rwd_list: number[];
    }

    /** Represents a c2s_spirit_pet_core_info. */
    class c2s_spirit_pet_core_info {

        /** Constructs a new c2s_spirit_pet_core_info. */
        constructor();
    }

    /** Represents a s2c_spirit_pet_core_info. */
    class s2c_spirit_pet_core_info {

        /** Constructs a new s2c_spirit_pet_core_info. */
        constructor();

        /** s2c_spirit_pet_core_info core_info. */
        public core_info: msg.spirit_pet_core[];
    }

    /** Represents a spirit_pet_core. */
    class spirit_pet_core {

        /** Constructs a new spirit_pet_core. */
        constructor();

        /** spirit_pet_core prop_id. */
        public prop_id: Long;

        /** spirit_pet_core index. */
        public index: number;

        /** 装配位置 */
        public pos: number;

        /** spirit_pet_core level. */
        public level: number;

        /** spirit_pet_core attr. */
        public attr?: (msg.attributes|null);

        /** spirit_pet_core next_attr. */
        public next_attr?: (msg.attributes|null);

        /** spirit_pet_core lvup_cost. */
        public lvup_cost?: (msg.prop_tips_data|null);
    }

    /** 装配灵晶 */
    class c2s_spirit_pet_takeon_core {

        /** Constructs a new c2s_spirit_pet_takeon_core. */
        constructor();

        /** c2s_spirit_pet_takeon_core prop_id. */
        public prop_id: Long;
    }

    /** 升级灵晶 */
    class c2s_spirit_pet_levelup_core {

        /** Constructs a new c2s_spirit_pet_levelup_core. */
        constructor();

        /** c2s_spirit_pet_levelup_core pos. */
        public pos: number;
    }

    /** 分解灵晶 */
    class c2s_spirit_pet_recycle_core {

        /** Constructs a new c2s_spirit_pet_recycle_core. */
        constructor();

        /** c2s_spirit_pet_recycle_core prop_ids. */
        public prop_ids: Long[];
    }

    /** Represents a s2c_spirit_pet_recycle_core. */
    class s2c_spirit_pet_recycle_core {

        /** Constructs a new s2c_spirit_pet_recycle_core. */
        constructor();

        /** s2c_spirit_pet_recycle_core is_success. */
        public is_success: boolean;
    }

    /** Represents a spirit_pet_shrine. */
    class spirit_pet_shrine {

        /** Constructs a new spirit_pet_shrine. */
        constructor();

        /** spirit_pet_shrine index. */
        public index: number;

        /** spirit_pet_shrine level. */
        public level: number;

        /** spirit_pet_shrine attr. */
        public attr?: (msg.attributes|null);

        /** spirit_pet_shrine next_attr. */
        public next_attr?: (msg.attributes|null);

        /** spirit_pet_shrine lvup_cost. */
        public lvup_cost: msg.prop_tips_data[];
    }

    /** Represents a c2s_spirit_pet_shrine_open_ui. */
    class c2s_spirit_pet_shrine_open_ui {

        /** Constructs a new c2s_spirit_pet_shrine_open_ui. */
        constructor();
    }

    /** Represents a s2c_spirit_pet_shrine_info. */
    class s2c_spirit_pet_shrine_info {

        /** Constructs a new s2c_spirit_pet_shrine_info. */
        constructor();

        /** s2c_spirit_pet_shrine_info oper. */
        public oper: number;

        /** s2c_spirit_pet_shrine_info shrines. */
        public shrines: msg.spirit_pet_shrine[];

        /** s2c_spirit_pet_shrine_info showpower. */
        public showpower: Long;

        /** s2c_spirit_pet_shrine_info hint. */
        public hint: boolean;
    }

    /** Represents a c2s_spirit_pet_shrine_lvup. */
    class c2s_spirit_pet_shrine_lvup {

        /** Constructs a new c2s_spirit_pet_shrine_lvup. */
        constructor();

        /** c2s_spirit_pet_shrine_lvup index. */
        public index: number;
    }

    /** 请求时装信息 */
    class c2s_fashion_open_ui {

        /** Constructs a new c2s_fashion_open_ui. */
        constructor();
    }

    /** 时装结构体 */
    class fashion_item {

        /** Constructs a new fashion_item. */
        constructor();

        /** 时装编号 */
        public index: number;

        /** 时装星数 */
        public star: number;

        /** 当前属性 */
        public attr?: (msg.attributes|null);

        /** 下一星级属性 */
        public next_attr?: (msg.attributes|null);

        /** 特殊属性 */
        public special_attr?: (msg.attributes|null);

        /** 时装战力 */
        public showpower: Long;
    }

    /** 发送时装的全部信息 */
    class s2c_fashion_info {

        /** Constructs a new s2c_fashion_info. */
        constructor();

        /** 1：全部 2：缺省 */
        public oper: number;

        /** 当前装备的时装 */
        public cur_fashion: number;

        /** 激活列表 */
        public active_list: msg.fashion_item[];

        /** 当前等级 */
        public level: number;

        /** 当前经验 */
        public cur_exp: number;

        /** 升级经验 */
        public levelup_exp: number;

        /** 当前等级属性 */
        public level_attr?: (msg.attributes|null);

        /** 下一级等级属性 */
        public next_level_attr?: (msg.attributes|null);

        /** 升级消耗 */
        public lvup_cost?: (msg.prop_tips_data|null);
    }

    /** Represents a c2s_role_fashion_oper. */
    class c2s_role_fashion_oper {

        /** Constructs a new c2s_role_fashion_oper. */
        constructor();

        /** 1：时装幻化 2：时装激活/升星 3: 卸下 4：升级 */
        public oper: number;

        /** 时装编号 */
        public index: number;

        /** 升级是是否自动购买 */
        public is_auto_buy: boolean;
    }

    /** 请求觉醒概况 */
    class c2s_reinc_open_ui {

        /** Constructs a new c2s_reinc_open_ui. */
        constructor();
    }

    /** 觉醒概况 */
    class s2c_reinc_open_ui {

        /** Constructs a new s2c_reinc_open_ui. */
        constructor();

        /** 1:全部 2:缺省 */
        public oper: number;

        /** 当前转生编号 */
        public index: number;

        /** 下一转生编号 */
        public next_index: number;

        /** 当前转生/突破重数属性 */
        public attr?: (msg.attributes|null);

        /** 下级转生/突破重数属性 */
        public next_attr?: (msg.attributes|null);

        /** 是否已使用转生丹  该字段为空：没有使用转生丹 / 1:使用转生丹 */
        public used_dan: number;

        /** 觉醒累计被动技能ID */
        public skill_indexes: number[];
    }

    /** 请求觉醒操作 */
    class c2s_reinc_oper {

        /** Constructs a new c2s_reinc_oper. */
        constructor();

        /** 1:完成并领取任务奖励 2:一键完成所有任务 3:觉醒 */
        public oper: number;

        /** 任务编号 */
        public index: number;
    }

    /** 请求觉醒排行榜 */
    class c2s_reinc_rank {

        /** Constructs a new c2s_reinc_rank. */
        constructor();
    }

    /** 觉醒排行榜信息 */
    class s2c_reinc_rank {

        /** Constructs a new s2c_reinc_rank. */
        constructor();

        /** 20名  按顺序 */
        public reinc_rank: msg.rank_info[];
    }

    /** Represents a rank_reward. */
    class rank_reward {

        /** Constructs a new rank_reward. */
        constructor();

        /** rank_reward rank_type. */
        public rank_type: number;

        /** rank_reward index. */
        public index: number;

        /** rank_reward status. */
        public status: number;
    }

    /** Represents a rank_info. */
    class rank_info {

        /** Constructs a new rank_info. */
        constructor();

        /** 排名 */
        public rank_no: number;

        /** 角色基本参数 */
        public base_info?: (msg.teammate|null);

        /** 角色总战斗力 */
        public showpower: Long;

        /** 神灵战力 */
        public shenling_showpower: Long;

        /** 等级 */
        public level: number;

        /** 仙路(索引排行) */
        public xiuxian: number;

        /** 坐骑战力 */
        public ride_showpower: Long;

        /** 飞剑战力 */
        public feijian_showpower: Long;

        /** 羽翼战力 */
        public wings_showpower: Long;

        /** 神兵战力 */
        public weapon_showpower: Long;

        /** 时装战力 */
        public fashion_showpower: Long;

        /** 元灵战力 */
        public yuanling_showpower: Long;

        /** 被赞次数 */
        public worshiped_times: number;
    }

    /** 获取排行榜信息 */
    class c2s_rank_req_rank {

        /** Constructs a new c2s_rank_req_rank. */
        constructor();

        /** 排行榜编号 */
        public index: number;

        /** c2s_rank_req_rank event_type. */
        public event_type: number;

        /** c2s_rank_req_rank start_num. */
        public start_num: number;

        /** c2s_rank_req_rank end_num. */
        public end_num: number;
    }

    /** 推送排行榜信息 */
    class s2c_rank_info {

        /** Constructs a new s2c_rank_info. */
        constructor();

        /** s2c_rank_info index. */
        public index: number;

        /** s2c_rank_info event_type. */
        public event_type: number;

        /** s2c_rank_info info_list. */
        public info_list: msg.rank_info[];

        /** s2c_rank_info my_rank_num. */
        public my_rank_num: number;

        /** s2c_rank_info my_value. */
        public my_value: Long;

        /** s2c_rank_info reward_list. */
        public reward_list: msg.rank_reward[];
    }

    /** 点赞 */
    class c2s_rank_worship {

        /** Constructs a new c2s_rank_worship. */
        constructor();

        /** 排行榜编号 */
        public index: number;
    }

    /** 点赞返回 */
    class s2c_rank_worship {

        /** Constructs a new s2c_rank_worship. */
        constructor();

        /** s2c_rank_worship rank_type. */
        public rank_type: number;
    }

    /** 登录下发和跨天下发 */
    class s2c_rank_base_info {

        /** Constructs a new s2c_rank_base_info. */
        constructor();

        /** s2c_rank_base_info reward_list. */
        public reward_list: msg.rank_reward[];

        /** s2c_rank_base_info worship_list. */
        public worship_list: number[];
    }

    /** 更新奖励信息 */
    class s2c_rank_update_reward {

        /** Constructs a new s2c_rank_update_reward. */
        constructor();

        /** s2c_rank_update_reward reward_list. */
        public reward_list: msg.rank_reward[];
    }

    /** 请求领取大神榜 奖励 */
    class c2s_dashen_rank_award {

        /** Constructs a new c2s_dashen_rank_award. */
        constructor();

        /** c2s_dashen_rank_award ranktype. */
        public ranktype: number;

        /** c2s_dashen_rank_award index. */
        public index: number;
    }

    /** Represents a c2s_single_boss_get_info. */
    class c2s_single_boss_get_info {

        /** Constructs a new c2s_single_boss_get_info. */
        constructor();
    }

    /** Represents a single_boss. */
    class single_boss {

        /** Constructs a new single_boss. */
        constructor();

        /** 关卡编号 */
        public index: number;

        /** 已使用次数 */
        public used_cnt: number;

        /** 复活时间 */
        public revive_time: number;
    }

    /** Represents a s2c_single_boss_info. */
    class s2c_single_boss_info {

        /** Constructs a new s2c_single_boss_info. */
        constructor();

        /** 个人BOSS关卡列表 */
        public infos: msg.single_boss[];
    }

    /** 请求进入对应BOSS关卡 */
    class c2s_single_boss_enter {

        /** Constructs a new c2s_single_boss_enter. */
        constructor();

        /** 关卡编号 */
        public index: number;
    }

    /** 扫荡 */
    class c2s_single_boss_sweep {

        /** Constructs a new c2s_single_boss_sweep. */
        constructor();
    }

    /** Represents a title_info. */
    class title_info {

        /** Constructs a new title_info. */
        constructor();

        /** 称号index */
        public index: Long;

        /** 到期时间      其中0：永久 */
        public del_time: number;

        /** 星数          0：未激活 1：激活 */
        public star: number;

        /** 是否可升星    true升星 / false不能升星 */
        public can_star: boolean;

        /** 是否激活红点提示  true有红点提示/false无红点提示 */
        public red_point: boolean;

        /** 永久属性 */
        public attrs?: (msg.attributes|null);

        /** 升星下一级属性 */
        public next_attrs?: (msg.attributes|null);

        /** 激活时间戳 秒 无激活时间则空 */
        public act_time: number;
    }

    /** Represents a c2s_title_info. */
    class c2s_title_info {

        /** Constructs a new c2s_title_info. */
        constructor();
    }

    /** Represents a c2s_title_operate. */
    class c2s_title_operate {

        /** Constructs a new c2s_title_operate. */
        constructor();

        /** 称号index */
        public index: Long;

        /** 操作  0:取消红点的提示，1:升星，2:幻化，3:卸下，4：佩戴，5：取消幻化，6：激活 */
        public operate: number;
    }

    /** Represents a s2c_title_info. */
    class s2c_title_info {

        /** Constructs a new s2c_title_info. */
        constructor();

        /** 当前幻化index   0表示未幻化称号 */
        public using: Long;

        /** 称号列表 */
        public title_list: msg.title_info[];
    }

    /** Represents a s2c_title_update. */
    class s2c_title_update {

        /** Constructs a new s2c_title_update. */
        constructor();

        /** 当前幻化index    0表示未幻化称号 */
        public using: Long;

        /** 称号列表 */
        public title_item?: (msg.title_info|null);
    }

    /** 打开战队界面 */
    class c2s_guild_open_team_ui {

        /** Constructs a new c2s_guild_open_team_ui. */
        constructor();
    }

    /** 请求战队列表信息 */
    class c2s_guild_all_team_info {

        /** Constructs a new c2s_guild_all_team_info. */
        constructor();

        /** c2s_guild_all_team_info head_num. */
        public head_num: number;

        /** c2s_guild_all_team_info tail_num. */
        public tail_num: number;
    }

    /** 创建战队 */
    class c2s_guild_create_team {

        /** Constructs a new c2s_guild_create_team. */
        constructor();

        /** 战队名字 */
        public team_name: string;

        /** 战队徽章id */
        public badge_no: number;
    }

    /** 申请加入战队、一键申请 */
    class c2s_guild_apply_to_join_team {

        /** Constructs a new c2s_guild_apply_to_join_team. */
        constructor();

        /** oper = 1 表示申请一个战队； oper = 2 表示一键申请 */
        public oper: number;

        /** c2s_guild_apply_to_join_team team_id_list. */
        public team_id_list: Long[];
    }

    /** 针对战队成员的操作 */
    class c2s_guild_team_member_oper {

        /** Constructs a new c2s_guild_team_member_oper. */
        constructor();

        /** oper = 1 : 退出战队； oper = 2 ： 踢人； oper = 3 ： 任命； */
        public oper: number;

        /** 玩家id (oper = 2, 3) */
        public role_id: Long;

        /** 战队职位：1：队长 2：副队长 3：成员 (oper = 3) */
        public position: number;
    }

    /** 打开战队申请列表 */
    class c2s_guild_apply_open_ui {

        /** Constructs a new c2s_guild_apply_open_ui. */
        constructor();

        /** 战队id */
        public team_id: Long;
    }

    /** 打开战队技能界面 */
    class c2s_guild_open_team_skill_ui {

        /** Constructs a new c2s_guild_open_team_skill_ui. */
        constructor();
    }

    /** 战队仓库信息 */
    class c2s_guild_team_depot_info {

        /** Constructs a new c2s_guild_team_depot_info. */
        constructor();
    }

    /** 仓库装备捐献、兑换 */
    class c2s_guild_team_depot_oper {

        /** Constructs a new c2s_guild_team_depot_oper. */
        constructor();

        /** oper = 1 ： 捐献; oper = 2 ; 兑换 */
        public oper: number;

        /** c2s_guild_team_depot_oper equip_id. */
        public equip_id: Long;
    }

    /** 设置战队加入限制，不会返回数据； */
    class c2s_guild_infomation_setting {

        /** Constructs a new c2s_guild_infomation_setting. */
        constructor();

        /** oper = 1: 战队准入设置； oper = 2 战队公告设置 */
        public oper: number;

        /** （oper = 1 的时候传输这个。）是否自动加入 */
        public is_auto: boolean;

        /** （oper = 1 的时候传输这个。）战力限制 */
        public limit_showpower: Long;

        /** （oper = 2 的时候传输这个。）战队公告 */
        public announcement: string;
    }

    /** 战队申请批量批复操作 */
    class c2s_guild_apply_deal {

        /** Constructs a new c2s_guild_apply_deal. */
        constructor();

        /** oper = 1 ： 同意;, oper = 2 : 拒绝 */
        public oper: number;

        /** 玩家id列表 */
        public role_id_list: Long[];
    }

    /** Represents a c2s_guild_team_skill_oper. */
    class c2s_guild_team_skill_oper {

        /** Constructs a new c2s_guild_team_skill_oper. */
        constructor();

        /** oper = 1 时升级被动技能 oper = 2 时激活主动技能 oper = 3 时开启主动技能 */
        public oper: number;

        /** 技能id */
        public skill_index: number;
    }

    /** Represents a c2s_query_guild_team. */
    class c2s_query_guild_team {

        /** Constructs a new c2s_query_guild_team. */
        constructor();

        /** 搜索字段 */
        public query_message: string;
    }

    /** 打开战队成员列表 */
    class c2s_guild_team_member_infos {

        /** Constructs a new c2s_guild_team_member_infos. */
        constructor();
    }

    /** 关闭战队界面 */
    class c2s_close_guild_team_ui {

        /** Constructs a new c2s_close_guild_team_ui. */
        constructor();
    }

    /** 检查名字是否存在 */
    class c2s_guild_team_check_name {

        /** Constructs a new c2s_guild_team_check_name. */
        constructor();

        /** c2s_guild_team_check_name guild_team_name. */
        public guild_team_name: string;
    }

    /** 打开总战队界面 返回 */
    class s2c_guild_open_team_ui {

        /** Constructs a new s2c_guild_open_team_ui. */
        constructor();

        /** 1全部  2缺省 */
        public operate: number;

        /** 战队总数量 */
        public total_team_nums: number;

        /** 战队信息 */
        public teams: msg.guild_team_data[];
    }

    /** 打开自己战队界面 返回（如通没有加入战队，返回team_id = 0） */
    class s2c_guild_open_self_team_ui {

        /** Constructs a new s2c_guild_open_self_team_ui. */
        constructor();

        /** 战队id */
        public team_id: Long;

        /** 战队名字 */
        public team_name: string;

        /** 等级 */
        public team_lv: number;

        /** 资金（即经验） */
        public team_exp: number;

        /** 升级所需资金(经验) */
        public lvup_team_exp: number;

        /** 队长id */
        public leader_id: Long;

        /** 队长玩家名 */
        public leader_name: string;

        /** 最大成员数量 */
        public max_member_cnt: number;

        /** 当前战队人员数量 */
        public cur_member_cnt: number;

        /** 今天捐献了的道具编号， 未捐献发0 */
        public donated: number;

        /** 战队总战力 */
        public total_showpower: Long;

        /** 公告 */
        public announcement: string;

        /** 是否开启自动审批 */
        public is_auto: boolean;

        /** 战队准入限制 */
        public limit_showpower: Long;

        /** 战队徽章id */
        public badge_no: number;
    }

    /** 点击特权  buff界面 返回 */
    class s2c_guild_open_team_skill_ui {

        /** Constructs a new s2c_guild_open_team_skill_ui. */
        constructor();

        /** 当前战队拥有的技能值 */
        public team_skill_point: number;

        /** 誓盟水晶 */
        public guild_team_crystal: number;

        /** 主动技能 */
        public active_skill_list: msg.guild_team_active_skill_item[];

        /** 被动技能 */
        public passive_skill_list: msg.guild_team_passive_skill_item[];
    }

    /** 仓库库存信息 */
    class s2c_guild_team_depot_msg {

        /** Constructs a new s2c_guild_team_depot_msg. */
        constructor();

        /** oper = 1 : 发送全部， oper = 2 ： 捐献（增加） oper = 3 : 兑换（减少） */
        public oper: number;

        /** s2c_guild_team_depot_msg info. */
        public info?: (msg.guild_team_depot_info|null);
    }

    /** 战队申请列表 */
    class s2c_guild_apply_info {

        /** Constructs a new s2c_guild_apply_info. */
        constructor();

        /** 战队申请列表 */
        public apply_list_info: msg.apply_person_data[];
    }

    /** Represents a s2c_guild_team_member_infos. */
    class s2c_guild_team_member_infos {

        /** Constructs a new s2c_guild_team_member_infos. */
        constructor();

        /** oper = 1 的时候全部发送， oper = 2 的时候 添加， oper = 3 的时候删除 */
        public oper: number;

        /** 各成员信息 */
        public members: msg.guild_team_member_data[];
    }

    /** Represents a s2c_guild_team_check_name. */
    class s2c_guild_team_check_name {

        /** Constructs a new s2c_guild_team_check_name. */
        constructor();

        /** s2c_guild_team_check_name is_can_use. */
        public is_can_use: boolean;
    }

    /** 战队数据结构 */
    class guild_team_data {

        /** Constructs a new guild_team_data. */
        constructor();

        /** 战队id */
        public team_id: Long;

        /** 战队名字 */
        public team_name: string;

        /** 战队等级 */
        public team_lv: number;

        /** 战队队长id */
        public leader_id: Long;

        /** 战队队长角色名字 */
        public leader_name: string;

        /** 战队最大人数 */
        public max_member_cnt: number;

        /** 战队当前人数 */
        public cur_member_cnt: number;

        /** 战队排行 */
        public rank_no: number;

        /** 战队总战力 */
        public total_showpower: Long;

        /** 战队徽章id */
        public badge_no: number;

        /** 战力限制 */
        public limit_showpower: Long;

        /** 0 可申请  1 已申请 */
        public apply_state: number;
    }

    /** 战队成员信息 */
    class guild_team_member_data {

        /** Constructs a new guild_team_member_data. */
        constructor();

        /** 角色id */
        public role_id: Long;

        /** 角色名 */
        public name: string;

        /** 1队长  2副队长  3成员 */
        public position: number;

        /** 1在线   2不在线 */
        public online_state: number;

        /** 总贡献 */
        public all_contri: number;

        /** 角色性别 */
        public sex: number;

        /** 角色头像 */
        public head: number;

        /** guild_team_member_data agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 角色头像框 */
        public head_frame: number;

        /** 角色战队id */
        public team_id: Long;

        /** 战力 */
        public showpower: Long;

        /** vip等级 */
        public vip_lv: number;

        /** 人物等级 */
        public level: number;

        /** 离线时间 */
        public last_offline_time: number;
    }

    /** 战队被动技能数据结构 */
    class guild_team_passive_skill_item {

        /** Constructs a new guild_team_passive_skill_item. */
        constructor();

        /** 技能编号 */
        public skill_index: number;

        /** 技能等级 */
        public skill_level: number;

        /** 技能当前等级属性 */
        public cur_level_attr?: (msg.attributes|null);

        /** 技能下一级等级属性 */
        public next_level_attr?: (msg.attributes|null);
    }

    /** 战队主动技能数据结构 */
    class guild_team_active_skill_item {

        /** Constructs a new guild_team_active_skill_item. */
        constructor();

        /** 技能编号 */
        public skill_index: number;

        /** 技能等级 */
        public skill_level: number;

        /** cd时间，时间戳 */
        public next_time: number;

        /** 技能持续时间 */
        public hold_time: number;
    }

    /** 战队仓库日志 */
    class guild_team_depot_log {

        /** Constructs a new guild_team_depot_log. */
        constructor();

        /** 1捐献日志  2兑换日志 */
        public log_type: number;

        /** 日志记录时间戳 */
        public timestamp: number;

        /** 1队长  2副队长  3成员 */
        public position: number;

        /** 角色名字 */
        public role_name: string;

        /** 装备index */
        public equip_idx: number;
    }

    /** Represents a guild_team_depot_info. */
    class guild_team_depot_info {

        /** Constructs a new guild_team_depot_info. */
        constructor();

        /** 仓库容量 */
        public capacity: number;

        /** 所有装备详情信息 */
        public equips: msg.prop_attributes[];

        /** 捐献/兑换记录 */
        public logs: msg.guild_team_depot_log[];
    }

    /** 申请加入战队玩家信息 */
    class apply_person_data {

        /** Constructs a new apply_person_data. */
        constructor();

        /** 玩家信息 */
        public role_id: Long;

        /** 玩家名字 */
        public name: string;

        /** 玩家等级 */
        public role_lv: number;

        /** 玩家战力 */
        public showpower: Long;
    }

    /** Represents a c2s_guild_team_impeach. */
    class c2s_guild_team_impeach {

        /** Constructs a new c2s_guild_team_impeach. */
        constructor();
    }

    /** Represents a s2c_guild_team_impeach_role_info. */
    class s2c_guild_team_impeach_role_info {

        /** Constructs a new s2c_guild_team_impeach_role_info. */
        constructor();

        /** 被弹劾人（队长）信息 */
        public leader_id: Long;

        /** 是否弹劾 1 ； 开始弹劾； 0 ： 未开始弹劾 */
        public is_impeach: number;

        /** 弹劾终止时间戳 */
        public impeach_deadline: number;

        /** s2c_guild_team_impeach_role_info is_online. */
        public is_online: number;

        /** 上次离线时间戳 */
        public offline_time: number;
    }

    /** 只会发送本人的 */
    class c2s_guild_team_task_open_ui {

        /** Constructs a new c2s_guild_team_task_open_ui. */
        constructor();
    }

    /** Represents a s2c_guild_team_task_open_ui. */
    class s2c_guild_team_task_open_ui {

        /** Constructs a new s2c_guild_team_task_open_ui. */
        constructor();

        /** 日贡献度 */
        public day_contri: number;

        /** 本周贡献 */
        public week_contri: number;

        /** 任务列表 */
        public task_list: msg.task_data[];

        /** 周津贴奖励 */
        public weekly_subsidy_drop_list: msg.subsidy_reward_item[];

        /** 当前日津贴 */
        public cur_step_daily_drop?: (msg.subsidy_reward_item|null);

        /** 下一级日津贴奖励 */
        public next_step_daily_drop?: (msg.subsidy_reward_item|null);
    }

    /** 领取阶段奖励（周、日） */
    class c2s_get_guild_team_contri_reward {

        /** Constructs a new c2s_get_guild_team_contri_reward. */
        constructor();

        /** 操作 ： oper == 1 时,领取周奖励；oper == 2 时， 领取日奖励 */
        public oper: number;

        /** 领取奖励的等级 */
        public step: number;
    }

    /** Represents a subsidy_reward_item. */
    class subsidy_reward_item {

        /** Constructs a new subsidy_reward_item. */
        constructor();

        /** 第几阶段（只有日津贴需要） */
        public step: number;

        /** status = 0 表示可以领取，status = 1 表示已经领取， status = 2 表示不能领取 */
        public status: number;

        /** subsidy_reward_item props. */
        public props: msg.prop_tips_data[];
    }

    /** 队伍信息 */
    class team_room {

        /** Constructs a new team_room. */
        constructor();

        /** 房间id */
        public room_id: number;

        /** 战力 */
        public showpower: Long;

        /** 房间人数 */
        public cnt: number;

        /** 房间人数上限 */
        public max_cnt: number;

        /** 队长名字 */
        public leader_name: string;

        /** 队长头像 */
        public head: number;

        /** team_room agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 队长头像框 */
        public head_frame: number;

        /** 队长性别 */
        public sex: number;

        /** 队长年龄类型1:少年 2:成年 */
        public age_type: number;
    }

    /** 房间成员 */
    class team_room_member {

        /** Constructs a new team_room_member. */
        constructor();

        /** 角色ID */
        public role_id: Long;

        /** 角色名字 */
        public name: string;

        /** 角色头像 */
        public head: number;

        /** team_room_member agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 头像等级 */
        public head_lv: number;

        /** 角色头像框 */
        public head_frame: number;

        /** 角色头像框等级 */
        public head_frame_lv: number;

        /** 角色性别 */
        public sex: number;

        /** 队长年龄类型1:少年 2:成年 */
        public age_type: number;

        /** 角色战力 */
        public showpower: Long;

        /** 1：队长  2：队员 */
        public position: number;

        /** 个人最佳记录 */
        public best_stage: number;

        /** 转生编号 */
        public reincarnate: number;

        /** 等级 */
        public level: number;
    }

    /** 匹配 */
    class c2s_arena_match {

        /** Constructs a new c2s_arena_match. */
        constructor();
    }

    /** 匹配更新 */
    class s2c_arena_match_update {

        /** Constructs a new s2c_arena_match_update. */
        constructor();

        /** s2c_arena_match_update begin_time. */
        public begin_time: number;

        /** 最后一个是真正的匹配结果 */
        public enemy: msg.arena_player[];
    }

    /** Represents an arena_player. */
    class arena_player {

        /** Constructs a new arena_player. */
        constructor();

        /** arena_player role_id. */
        public role_id: Long;

        /** arena_player name. */
        public name: string;

        /** arena_player head. */
        public head: number;

        /** arena_player agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** arena_player head_frame. */
        public head_frame: number;

        /** arena_player sex. */
        public sex: number;

        /** arena_player showpower. */
        public showpower: Long;

        /** 段位 1-18 */
        public division: number;

        /** 转生index */
        public reincarnate: number;
    }

    /** 请求本人信息 */
    class c2s_arena_info {

        /** Constructs a new c2s_arena_info. */
        constructor();
    }

    /** 本人信息 */
    class s2c_arena_info {

        /** Constructs a new s2c_arena_info. */
        constructor();

        /** 段位 */
        public division: number;

        /** 剩余挑战次数 */
        public left_cnt: number;

        /** 最大挑战次数 */
        public max_cnt: number;

        /** 下次恢复时间 */
        public regain_time: number;

        /** 净胜场 */
        public only_win: number;

        /** 赛季是否结束 */
        public is_end_match: boolean;

        /** 今日看视频次数 */
        public look_video_cnt: number;
    }

    /** 天梯竞技看视频完成 */
    class c2s_arena_look_video_finish {

        /** Constructs a new c2s_arena_look_video_finish. */
        constructor();
    }

    /** 购买挑战次数 */
    class c2s_arena_buy_cnt {

        /** Constructs a new c2s_arena_buy_cnt. */
        constructor();
    }

    /** Represents a c2s_arena_rank. */
    class c2s_arena_rank {

        /** Constructs a new c2s_arena_rank. */
        constructor();

        /** 1:当前排行，2:上周排行，3:跨服王者 */
        public rank_type: number;
    }

    /** Represents a s2c_arena_rank. */
    class s2c_arena_rank {

        /** Constructs a new s2c_arena_rank. */
        constructor();

        /** s2c_arena_rank rank_type. */
        public rank_type: number;

        /** s2c_arena_rank info. */
        public info: msg.arena_rank_info[];

        /** s2c_arena_rank top_rank. */
        public top_rank?: (msg.arena_rank_detail|null);
    }

    /** Represents an arena_rank_info. */
    class arena_rank_info {

        /** Constructs a new arena_rank_info. */
        constructor();

        /** 排名 */
        public rank_no: number;

        /** arena_rank_info role_id. */
        public role_id: Long;

        /** arena_rank_info name. */
        public name: string;

        /** arena_rank_info head. */
        public head: number;

        /** arena_rank_info agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** arena_rank_info head_frame. */
        public head_frame: number;

        /** arena_rank_info sex. */
        public sex: number;

        /** arena_rank_info showpower. */
        public showpower: Long;

        /** 段位 1-18 */
        public division: number;

        /** 净胜场 */
        public only_win: number;
    }

    /** Represents an arena_rank_detail. */
    class arena_rank_detail {

        /** Constructs a new arena_rank_detail. */
        constructor();

        /** 排名 */
        public rank_no: number;

        /** arena_rank_detail name. */
        public name: string;

        /** arena_rank_detail sex. */
        public sex: number;

        /** 1:少年 2:成年 */
        public age_type: number;

        /** arena_rank_detail weapon. */
        public weapon: number;

        /** arena_rank_detail wing. */
        public wing: number;

        /** arena_rank_detail fashion. */
        public fashion: number;

        /** 段位 1-18 */
        public division: number;

        /** 净胜场 */
        public only_win: number;

        /** 是否已膜拜 */
        public is_worship: boolean;

        /** arena_rank_detail agent_info. */
        public agent_info?: (msg.agent_ex_info|null);
    }

    /** 膜拜 */
    class c2s_arena_rank_worship {

        /** Constructs a new c2s_arena_rank_worship. */
        constructor();
    }

    /** Represents a s2c_arena_map_enter. */
    class s2c_arena_map_enter {

        /** Constructs a new s2c_arena_map_enter. */
        constructor();

        /** 开始战斗的时间 */
        public begin_time: number;

        /** 结束战斗的时间 */
        public end_time: number;

        /** 对手信息 */
        public enemy?: (msg.arena_player|null);
    }

    /** 确认进入场景协议 */
    class c2s_arena_do_enter {

        /** Constructs a new c2s_arena_do_enter. */
        constructor();
    }

    /** 取消匹配 */
    class c2s_arena_cancel {

        /** Constructs a new c2s_arena_cancel. */
        constructor();
    }

    /** 天梯竞技 届结算 */
    class s2c_arena_term_reward {

        /** Constructs a new s2c_arena_term_reward. */
        constructor();

        /** s2c_arena_term_reward rank. */
        public rank: number;

        /** s2c_arena_term_reward begin_time. */
        public begin_time: number;

        /** s2c_arena_term_reward end_time. */
        public end_time: number;

        /** 段位 */
        public division: number;

        /** 段奖励 */
        public division_reward: msg.prop_tips_data[];

        /** 排名奖励 */
        public rank_reward: msg.prop_tips_data[];

        /** 跨服王者奖励 */
        public king_reward: msg.prop_tips_data[];
    }

    /** 打开界面 */
    class c2s_immortal_evil_open_ui {

        /** Constructs a new c2s_immortal_evil_open_ui. */
        constructor();
    }

    /** Represents an immortal_evil_topone. */
    class immortal_evil_topone {

        /** Constructs a new immortal_evil_topone. */
        constructor();

        /** immortal_evil_topone camp. */
        public camp: number;

        /** immortal_evil_topone name. */
        public name: string;

        /** immortal_evil_topone sex. */
        public sex: number;

        /** 1:少年 2:成年 */
        public age_type: number;

        /** immortal_evil_topone head. */
        public head: number;

        /** immortal_evil_topone agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** immortal_evil_topone head_frame. */
        public head_frame: number;

        /** immortal_evil_topone weapon. */
        public weapon: number;

        /** immortal_evil_topone wing. */
        public wing: number;

        /** immortal_evil_topone fashion. */
        public fashion: number;
    }

    /** 打开界面返回 */
    class s2c_immortal_evil_open_ui {

        /** Constructs a new s2c_immortal_evil_open_ui. */
        constructor();

        /** s2c_immortal_evil_open_ui topones. */
        public topones: msg.immortal_evil_topone[];

        /** 本期活动期间是否进入过 */
        public had_enter: boolean;
    }

    /** 进入副本 */
    class c2s_immortal_evil_enter {

        /** Constructs a new c2s_immortal_evil_enter. */
        constructor();
    }

    /** Represents an immortal_evil_camp_data. */
    class immortal_evil_camp_data {

        /** Constructs a new immortal_evil_camp_data. */
        constructor();

        /** immortal_evil_camp_data camp. */
        public camp: number;

        /** immortal_evil_camp_data camp_score. */
        public camp_score: number;
    }

    /** 进入副本返回的副本信息 */
    class s2c_immortal_evil_enter {

        /** Constructs a new s2c_immortal_evil_enter. */
        constructor();

        /** 自己阵营 */
        public camp: number;

        /** 个人积分贡献 */
        public role_score: number;

        /** 杀敌人数 */
        public kill_cnt: number;

        /** 积分贡献排行榜 */
        public rank_no: number;

        /** 技能点 */
        public skill_exp: number;

        /** 剩余时间 */
        public left_time: number;

        /** s2c_immortal_evil_enter camps. */
        public camps: msg.immortal_evil_camp_data[];
    }

    /** 打开个人排行榜 */
    class c2s_immortal_evil_open_rank_ui {

        /** Constructs a new c2s_immortal_evil_open_rank_ui. */
        constructor();

        /** 1阵营1   2阵营2   3个人 */
        public rank_type: number;
    }

    /** Represents an immortal_evil_rank_data. */
    class immortal_evil_rank_data {

        /** Constructs a new immortal_evil_rank_data. */
        constructor();

        /** immortal_evil_rank_data camp. */
        public camp: number;

        /** immortal_evil_rank_data role_id. */
        public role_id: Long;

        /** immortal_evil_rank_data name. */
        public name: string;

        /** immortal_evil_rank_data role_score. */
        public role_score: number;

        /** immortal_evil_rank_data rank_no. */
        public rank_no: number;

        /** immortal_evil_rank_data kill_cnt. */
        public kill_cnt: number;
    }

    /** 打开个人排行榜 返回 */
    class s2c_immortal_evil_open_rank_ui {

        /** Constructs a new s2c_immortal_evil_open_rank_ui. */
        constructor();

        /** s2c_immortal_evil_open_rank_ui rank_info. */
        public rank_info: msg.immortal_evil_rank_data[];

        /** s2c_immortal_evil_open_rank_ui self_rank_no. */
        public self_rank_no: number;

        /** 1阵营1   2阵营2   3个人 */
        public rank_type: number;
    }

    /** Represents a c2s_immortal_evil_use_skill. */
    class c2s_immortal_evil_use_skill {

        /** Constructs a new c2s_immortal_evil_use_skill. */
        constructor();

        /** 1双倍积分 23倍输出 3改变阵营 4十倍输出 5十秒无敌 */
        public skill_idx: number;
    }

    /** Represents a s2c_immortal_evil_use_skill. */
    class s2c_immortal_evil_use_skill {

        /** Constructs a new s2c_immortal_evil_use_skill. */
        constructor();

        /** 1双倍积分 23倍输出 3改变阵营 4十倍输出 5十秒无敌 */
        public skill_idx: number;

        /** s2c_immortal_evil_use_skill end_time. */
        public end_time: number;
    }

    /** Represents an immortal_evil_rank_member. */
    class immortal_evil_rank_member {

        /** Constructs a new immortal_evil_rank_member. */
        constructor();

        /** immortal_evil_rank_member role_id. */
        public role_id: Long;

        /** immortal_evil_rank_member name. */
        public name: string;

        /** 伤害 */
        public damage: Long;
    }

    /** 请求伤害排行榜 返回 */
    class s2c_immortal_evil_damage_ranks {

        /** Constructs a new s2c_immortal_evil_damage_ranks. */
        constructor();

        /** s2c_immortal_evil_damage_ranks members. */
        public members: msg.immortal_evil_rank_member[];

        /** s2c_immortal_evil_damage_ranks boss_pos. */
        public boss_pos: number;
    }

    /** 打开界面 */
    class c2s_monster_invade_open_ui {

        /** Constructs a new c2s_monster_invade_open_ui. */
        constructor();
    }

    /** 关闭界面 */
    class c2s_monster_invade_close_ui {

        /** Constructs a new c2s_monster_invade_close_ui. */
        constructor();
    }

    /** 返回信息 */
    class s2c_monster_invade_open_ui {

        /** Constructs a new s2c_monster_invade_open_ui. */
        constructor();

        /** 1：全发   2：缺省 */
        public operate: number;

        /** 最大挑战次数 */
        public max_cnt: number;

        /** 剩余挑战次数 */
        public cnt: number;

        /** 自己的room_id */
        public room_id: number;

        /** 房间信息(返回这个时，房间成员信息缺省) */
        public rooms: msg.team_room[];

        /** 房间成员信息(返回这个时，房间信息缺省) */
        public members: msg.team_room_member[];

        /** 匹配状态 1:匹配中 0:否 */
        public match_status: number;

        /** 活动时间外 下次开启时间 */
        public open_time: number;

        /** 活动时间内 结束时间 */
        public end_time: number;

        /** 击杀boss数量 */
        public kill_boss_cnt: number;

        /** 已领取过的奖励idx */
        public rewarded_idx_list: number[];
    }

    /** Represents a c2s_monster_invade_reward. */
    class c2s_monster_invade_reward {

        /** Constructs a new c2s_monster_invade_reward. */
        constructor();

        /** 奖励编号 */
        public index: number;
    }

    /** Represents a monster_invade_inspire. */
    class monster_invade_inspire {

        /** Constructs a new monster_invade_inspire. */
        constructor();

        /** 1:银两 2:元宝 */
        public inspire_type: number;

        /** 已鼓舞次数 */
        public times: number;
    }

    /** Represents a s2c_monster_invade_inst_update. */
    class s2c_monster_invade_inst_update {

        /** Constructs a new s2c_monster_invade_inst_update. */
        constructor();

        /** 1:全部 2:缺省 */
        public oper: number;

        /** 第几回合 */
        public round: number;

        /** 剩余几只 */
        public rest_cnt: number;

        /** 全队鼓舞次数 */
        public inspire_all: number;

        /** 全队减速次数 */
        public slow_all: number;

        /** 怪物减速结束时间 */
        public slow_end_time: number;

        /** 我的鼓舞列表 */
        public inspire_list: msg.monster_invade_inspire[];

        /** 我的减速结束时间 */
        public my_slow_end_time: number;

        /** 是否自动鼓舞 */
        public auto_inspire: boolean;

        /** 是否自动减速 */
        public auto_slow: boolean;

        /** boss当前血量万分比 每5秒更新一次 */
        public cur_npc_hp: number;

        /** 驻守点 123刷怪点 4水晶 */
        public target_pos: number;

        /** 各条路剩余几只怪 */
        public pos_rest_cnt: number[];

        /** 下个回合开始时间戳 */
        public next_round_times: number;
    }

    /** Represents a c2s_monster_invade_inst_oper. */
    class c2s_monster_invade_inst_oper {

        /** Constructs a new c2s_monster_invade_inst_oper. */
        constructor();

        /** 1:鼓舞 2:减速 */
        public oper: number;

        /** 1:银两 2:元宝 */
        public inspire_type: number;

        /** 是否自动鼓舞 */
        public auto_inspire: boolean;

        /** 是否自动减速 */
        public auto_slow: boolean;

        /** 驻守点 123刷怪点 4水晶 */
        public target_pos: number;
    }

    /** 创建房间 */
    class c2s_monster_invade_create_room {

        /** Constructs a new c2s_monster_invade_create_room. */
        constructor();
    }

    /** 删除房间内某人 */
    class s2c_monster_invade_delete_member {

        /** Constructs a new s2c_monster_invade_delete_member. */
        constructor();

        /** s2c_monster_invade_delete_member role_id. */
        public role_id: Long;

        /** 平均战力 */
        public average_showpower: Long;
    }

    /** 加入房间 */
    class c2s_monster_invade_join_room {

        /** Constructs a new c2s_monster_invade_join_room. */
        constructor();

        /** 房间id   0为快速加入 */
        public room_id: number;
    }

    /** 队长踢人 */
    class c2s_monster_invade_expel {

        /** Constructs a new c2s_monster_invade_expel. */
        constructor();

        /** c2s_monster_invade_expel role_id. */
        public role_id: Long;
    }

    /** 退出房间 */
    class c2s_monster_invade_drop_out {

        /** Constructs a new c2s_monster_invade_drop_out. */
        constructor();
    }

    /** 开始匹配 */
    class c2s_monster_invade_inst_match {

        /** Constructs a new c2s_monster_invade_inst_match. */
        constructor();
    }

    /** 开始战斗 */
    class c2s_monster_invade_inst_start {

        /** Constructs a new c2s_monster_invade_inst_start. */
        constructor();
    }

    /** 查看邀请列表 */
    class c2s_monster_invade_invite_info {

        /** Constructs a new c2s_monster_invade_invite_info. */
        constructor();

        /** 1:仙盟 2:好友 3:师门 */
        public role_type: number;
    }

    /** Represents a s2c_monster_invade_invite_info. */
    class s2c_monster_invade_invite_info {

        /** Constructs a new s2c_monster_invade_invite_info. */
        constructor();

        /** 1:仙盟 2:好友 3:师门 */
        public role_type: number;

        /** 可邀请列表 */
        public can_invite_list: msg.team_room_member[];
    }

    /** 发送房间组队请求 */
    class c2s_monster_invade_room_invite {

        /** Constructs a new c2s_monster_invade_room_invite. */
        constructor();

        /** 1:仙盟 2:好友 3:师门 */
        public role_type: number;

        /** 0=一键邀请 */
        public role_id: Long;
    }

    /** 房间成员 */
    class trainroom_member {

        /** Constructs a new trainroom_member. */
        constructor();

        /** 角色ID */
        public role_id: Long;

        /** 角色名字 */
        public name: string;

        /** 角色头像 */
        public head: number;

        /** trainroom_member agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 角色头像框 */
        public head_frame: number;

        /** 角色性别 */
        public sex: number;

        /** 角色战力 */
        public showpower: Long;

        /** 帮派名字 */
        public team_name: string;

        /** 1：队长  2：队员 */
        public position: number;

        /** 服务器id */
        public server_id: number;

        /** 转生 */
        public reincarnate: number;

        /** 等级 */
        public level: number;

        /** vip等级 */
        public vip_lv: number;

        /** vip index */
        public vip_index: number;
    }

    /** Represents an inspire_info. */
    class inspire_info {

        /** Constructs a new inspire_info. */
        constructor();

        /** 1:元宝 3:仙玉 */
        public coin_type: number;

        /** 剩余鼓舞次数 */
        public left_cnt: number;

        /** 最大鼓舞次数 */
        public max_cnt: number;
    }

    /** 队伍信息 */
    class guild_train_room {

        /** Constructs a new guild_train_room. */
        constructor();

        /** 房间id */
        public room_id: number;

        /** 战力 */
        public showpower: Long;

        /** 房间人数 */
        public cnt: number;

        /** 房间人数上限 */
        public max_cnt: number;

        /** 队长名字 */
        public leader_name: string;

        /** 队长头像 */
        public head: number;

        /** guild_train_room agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 队长头像框 */
        public head_frame: number;

        /** 队长性别 */
        public sex: number;

        /** 帮派名 */
        public team_name: string;

        /** 等级 */
        public level: number;

        /** vip index */
        public vip_index: number;
    }

    /** 魔门遗址伤害排行榜 */
    class s2c_momen_damage_rank_info {

        /** Constructs a new s2c_momen_damage_rank_info. */
        constructor();
    }

    /** 魔门遗址 发送组队请求 */
    class c2s_momen_room_invite {

        /** Constructs a new c2s_momen_room_invite. */
        constructor();

        /** c2s_momen_room_invite channel_type. */
        public channel_type: number;
    }

    /** 英豪///////////////////////////19083 */
    class c2s_brother_info {

        /** Constructs a new c2s_brother_info. */
        constructor();
    }

    /** Represents a brother_skill_item. */
    class brother_skill_item {

        /** Constructs a new brother_skill_item. */
        constructor();

        /** 技能idx */
        public index: number;

        /** 技能等级 */
        public level: number;

        /** 技能等级属性 */
        public attr?: (msg.attributes|null);

        /** 下一级技能等级属性 */
        public next_attr?: (msg.attributes|null);

        /** 升级消耗 */
        public lvup_cost: msg.prop_tips_data[];
    }

    /** Represents a brother_item. */
    class brother_item {

        /** Constructs a new brother_item. */
        constructor();

        /** 英豪idx */
        public index: number;

        /** 星级 */
        public star: number;

        /** 星级属性 */
        public attr?: (msg.attributes|null);

        /** 下一级星级属性 */
        public next_attrs?: (msg.attributes|null);

        /** 是否是特殊英豪 */
        public is_special: boolean;
    }

    /** Represents a s2c_brother_info. */
    class s2c_brother_info {

        /** Constructs a new s2c_brother_info. */
        constructor();

        /** s2c_brother_info oper. */
        public oper: number;

        /** 当前出战英豪 */
        public cur_warrior_index: number;

        /** 等级 */
        public lv: number;

        /** 升级经验 */
        public exp: number;

        /** 升级所需经验 */
        public lvup_exp: number;

        /** 等级属性 */
        public lv_attr?: (msg.attributes|null);

        /** 下一级等级属性 */
        public next_lv_attr?: (msg.attributes|null);

        /** 升级消耗 */
        public lvup_cost: msg.prop_tips_data[];

        /** 英豪技能 */
        public skills: msg.brother_skill_item[];

        /** 英豪 */
        public brothers: msg.brother_item[];

        /** 战力 */
        public showpower: Long;
    }

    /** 升星 */
    class c2s_brother_starup {

        /** Constructs a new c2s_brother_starup. */
        constructor();

        /** 英豪idx */
        public index: number;

        /** 是否是碎片 */
        public use_fragment: boolean;
    }

    /** 升级 */
    class c2s_brother_lvup {

        /** Constructs a new c2s_brother_lvup. */
        constructor();

        /** c2s_brother_lvup auto_buy. */
        public auto_buy: boolean;
    }

    /** 技能升级 */
    class c2s_brother_skill_lvup {

        /** Constructs a new c2s_brother_skill_lvup. */
        constructor();

        /** 技能编号 */
        public index: number;
    }

    /** 英豪幻化 */
    class c2s_brother_equip {

        /** Constructs a new c2s_brother_equip. */
        constructor();

        /** 幻化外显 */
        public index: number;
    }

    /** 龙珠装配信息 */
    class c2s_scripture_info {

        /** Constructs a new c2s_scripture_info. */
        constructor();
    }

    /** Represents a s2c_scripture_info. */
    class s2c_scripture_info {

        /** Constructs a new s2c_scripture_info. */
        constructor();

        /** 每一个已镶嵌的龙珠信息 */
        public symbols: msg.symbol_item[];

        /** 每一頁最新index 若无index，则0 */
        public master: number[];

        /** 每一页总战力 */
        public showpower: Long[];
    }

    /** Represents a symbol_item. */
    class symbol_item {

        /** Constructs a new symbol_item. */
        constructor();

        /** 镶嵌的龙珠道具ID */
        public prop_id: Long;

        /** 镶嵌的龙珠道具index */
        public index: number;

        /** 龙珠页 */
        public type: number;

        /** 龙珠孔 */
        public pos: number;

        /** 龙珠等级 */
        public level: number;

        /** 强化当前等级属性 */
        public attr?: (msg.attributes|null);

        /** 强化下一级属性 */
        public next_attr?: (msg.attributes|null);

        /** 强化消耗品 */
        public lvup_cost: msg.prop_tips_data[];

        /** 觉醒等级 */
        public arouse_lv: number;

        /** 觉醒当前经验 */
        public arouse_exp: number;

        /** 觉醒满经验 */
        public arouse_lvup_exp: number;

        /** 觉醒当前等级属性 */
        public arouse_attr?: (msg.attributes|null);

        /** 觉醒下一级属性 */
        public arouse_next_attr?: (msg.attributes|null);
    }

    /** 装配龙珠 */
    class c2s_scripture_takeon {

        /** Constructs a new c2s_scripture_takeon. */
        constructor();

        /** 嵌的龙珠道具ID */
        public prop_id: Long;

        /** 龙珠孔 */
        public pos: number;
    }

    /** 升级龙珠 */
    class c2s_scripture_level_up {

        /** Constructs a new c2s_scripture_level_up. */
        constructor();

        /** 龙珠页 */
        public type: number;

        /** 龙珠孔 */
        public pos: number;
    }

    /** 龙珠共鸣 */
    class c2s_scripture_master {

        /** Constructs a new c2s_scripture_master. */
        constructor();

        /** 龙珠共鸣index */
        public index: number;
    }

    /** 龙珠觉醒 */
    class c2s_scripture_arouse {

        /** Constructs a new c2s_scripture_arouse. */
        constructor();

        /** 龙珠页 */
        public type: number;

        /** 龙珠孔 */
        public pos: number;

        /** 选中龙珠的prop_id(数组) */
        public symbols: Long[];
    }

    /** 分解龙珠 */
    class c2s_scripture_spirit {

        /** Constructs a new c2s_scripture_spirit. */
        constructor();

        /** c2s_scripture_spirit prop_ids. */
        public prop_ids: Long[];
    }

    /** Represents a s2c_scripture_spirit. */
    class s2c_scripture_spirit {

        /** Constructs a new s2c_scripture_spirit. */
        constructor();

        /** s2c_scripture_spirit is_success. */
        public is_success: boolean;
    }

    /** 打开王者争霸界面 */
    class c2s_pvp_god_open_ui {

        /** Constructs a new c2s_pvp_god_open_ui. */
        constructor();
    }

    /** 打开王者争霸界面 返回 */
    class s2c_pvp_god_open_ui {

        /** Constructs a new s2c_pvp_god_open_ui. */
        constructor();

        /** 0:已结束 1:报名中 2:预选赛 3:淘汰赛 */
        public status: number;

        /** 是否参赛 */
        public is_join: boolean;

        /** 参赛人数 */
        public player_cnt: number;

        /** 参赛上限 */
        public player_lmt: number;

        /** 王者争霸信息 */
        public player?: (msg.pvp_god_player|null);

        /** 排名 */
        public rank_no: number;

        /** 王者争霸次数 */
        public god_cnt: number;

        /** 是否领取奖励 */
        public is_take_reward: boolean;

        /** 是否托管 */
        public entrust: boolean;

        /** s2c_pvp_god_open_ui timestamp. */
        public timestamp: number;

        /** s2c_pvp_god_open_ui bet_info. */
        public bet_info: msg.elimination_bet_info[];

        /** s2c_pvp_god_open_ui matches. */
        public matches: msg.elimination_match[];
    }

    /** 打开战报 */
    class c2s_pvp_god_battle_report {

        /** Constructs a new c2s_pvp_god_battle_report. */
        constructor();
    }

    /** 打开战报 返回 */
    class s2c_pvp_god_battle_report {

        /** Constructs a new s2c_pvp_god_battle_report. */
        constructor();

        /** 战报信息数组 */
        public tips: string[];

        /** s2c_pvp_god_battle_report matches. */
        public matches: msg.elimination_match[];
    }

    /** 王者争霸报名成功 */
    class s2c_pvp_god_enroll_success {

        /** Constructs a new s2c_pvp_god_enroll_success. */
        constructor();
    }

    /** 王者争霸结构 */
    class pvp_god_player {

        /** Constructs a new pvp_god_player. */
        constructor();

        /** pvp_god_player role_id. */
        public role_id: Long;

        /** pvp_god_player name. */
        public name: string;

        /** pvp_god_player head. */
        public head: number;

        /** pvp_god_player agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** pvp_god_player head_frame. */
        public head_frame: number;

        /** pvp_god_player sex. */
        public sex: number;

        /** pvp_god_player age_type. */
        public age_type: number;

        /** pvp_god_player weapon. */
        public weapon: number;

        /** pvp_god_player wing. */
        public wing: number;

        /** pvp_god_player title. */
        public title: number;

        /** pvp_god_player fashion. */
        public fashion: number;

        /** pvp_god_player showpower. */
        public showpower: Long;
    }

    /** 排行榜结构 */
    class pvp_god_rank_detail {

        /** Constructs a new pvp_god_rank_detail. */
        constructor();

        /** pvp_god_rank_detail rank_no. */
        public rank_no: number;

        /** pvp_god_rank_detail role_id. */
        public role_id: Long;

        /** pvp_god_rank_detail name. */
        public name: string;

        /** pvp_god_rank_detail head. */
        public head: number;

        /** pvp_god_rank_detail agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** pvp_god_rank_detail head_frame. */
        public head_frame: number;

        /** pvp_god_rank_detail sex. */
        public sex: number;

        /** pvp_god_rank_detail score. */
        public score: number;

        /** pvp_god_rank_detail showpower. */
        public showpower: Long;

        /** 王者争霸次数 */
        public god_cnt: number;
    }

    /** 打开排行榜 */
    class c2s_pvp_god_rank {

        /** Constructs a new c2s_pvp_god_rank. */
        constructor();
    }

    /** 打开排行榜 返回 */
    class s2c_pvp_god_rank {

        /** Constructs a new s2c_pvp_god_rank. */
        constructor();

        /** s2c_pvp_god_rank rank_no. */
        public rank_no: number;

        /** s2c_pvp_god_rank rank. */
        public rank: msg.pvp_god_rank_detail[];
    }

    /** 领取奖励 */
    class c2s_pvp_god_take_reward {

        /** Constructs a new c2s_pvp_god_take_reward. */
        constructor();

        /** 1:最终奖励 2:投注奖励 */
        public type: number;
    }

    /** 进入预选赛 */
    class c2s_pvp_god_selective_enter {

        /** Constructs a new c2s_pvp_god_selective_enter. */
        constructor();

        /** 1:报名 2:进入 */
        public op_type: number;
    }

    /** 预选赛通知 开始，结束通知 */
    class s2c_pvp_god_selective_announce {

        /** Constructs a new s2c_pvp_god_selective_announce. */
        constructor();

        /** 结束时间 */
        public end_timestamp: number;
    }

    /** 预赛场景内排名结构 */
    class pvp_god_selective_rank_member {

        /** Constructs a new pvp_god_selective_rank_member. */
        constructor();

        /** pvp_god_selective_rank_member name. */
        public name: string;

        /** 积分 */
        public score: number;

        /** 名次 */
        public rank_no: number;
    }

    /** 预赛场景内排名返回 */
    class s2c_pvp_god_selective_rank {

        /** Constructs a new s2c_pvp_god_selective_rank. */
        constructor();

        /** 自己积分 */
        public score: number;

        /** 自己名次 */
        public rank_no: number;

        /** 结束时间 */
        public end_timestamp: number;

        /** 前三 */
        public members: msg.pvp_god_selective_rank_member[];
    }

    /** 购买buff */
    class c2s_pvp_god_selective_buy_buff {

        /** Constructs a new c2s_pvp_god_selective_buy_buff. */
        constructor();

        /** c2s_pvp_god_selective_buy_buff index. */
        public index: number;
    }

    /** 自动购买buff */
    class c2s_pvp_god_selective_auto_buff {

        /** Constructs a new c2s_pvp_god_selective_auto_buff. */
        constructor();

        /** 不缺省 */
        public indexs: number[];
    }

    /** 自动购买buff 返回 */
    class s2c_pvp_god_selective_auto_buff {

        /** Constructs a new s2c_pvp_god_selective_auto_buff. */
        constructor();

        /** 不缺省 */
        public indexs: number[];
    }

    /** 托管参赛 */
    class c2s_pvp_god_auto {

        /** Constructs a new c2s_pvp_god_auto. */
        constructor();
    }

    /** 打开投注界面 */
    class c2s_pvp_god_bet_member {

        /** Constructs a new c2s_pvp_god_bet_member. */
        constructor();

        /** c2s_pvp_god_bet_member role_id. */
        public role_id: Long;
    }

    /** 打开投注界面 返回 */
    class s2c_pvp_god_bet_member {

        /** Constructs a new s2c_pvp_god_bet_member. */
        constructor();

        /** s2c_pvp_god_bet_member role_id. */
        public role_id: Long;

        /** s2c_pvp_god_bet_member name. */
        public name: string;

        /** s2c_pvp_god_bet_member level. */
        public level: number;

        /** s2c_pvp_god_bet_member head. */
        public head: number;

        /** s2c_pvp_god_bet_member agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** s2c_pvp_god_bet_member age_type. */
        public age_type: number;

        /** s2c_pvp_god_bet_member head_lv. */
        public head_lv: number;

        /** s2c_pvp_god_bet_member head_frame. */
        public head_frame: number;

        /** s2c_pvp_god_bet_member head_frame_lv. */
        public head_frame_lv: number;

        /** s2c_pvp_god_bet_member vip_lv. */
        public vip_lv: number;

        /** s2c_pvp_god_bet_member state_lv. */
        public state_lv: number;

        /** s2c_pvp_god_bet_member reincarnate. */
        public reincarnate: number;

        /** s2c_pvp_god_bet_member god_cnt. */
        public god_cnt: number;

        /** s2c_pvp_god_bet_member showpower. */
        public showpower: Long;

        /** s2c_pvp_god_bet_member sex. */
        public sex: number;

        /** 荣耀会员 */
        public honor_vip: boolean;

        /** 至尊会员 */
        public extreme_vip: boolean;
    }

    /** Represents a match_player_data. */
    class match_player_data {

        /** Constructs a new match_player_data. */
        constructor();

        /** 角色id */
        public role_id: Long;

        /** 名字 */
        public name: string;

        /** 头像 */
        public head: number;

        /** match_player_data agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 头像框 */
        public head_frame: number;

        /** 性别 */
        public sex: number;
    }

    /** Represents an elimination_match. */
    class elimination_match {

        /** Constructs a new elimination_match. */
        constructor();

        /** 场次id */
        public match_id: number;

        /** player1  可能会缺省 */
        public player1?: (msg.match_player_data|null);

        /** player2  可能会缺省 */
        public player2?: (msg.match_player_data|null);

        /** 1未开始  2进行中  3已结束 */
        public match_state: number;

        /** 1或2  没有的话是0 */
        public winner: number;
    }

    /** 1v1阶段 淘汰赛数据 */
    class s2c_pvp_god_elimination_battle_list {

        /** Constructs a new s2c_pvp_god_elimination_battle_list. */
        constructor();

        /** s2c_pvp_god_elimination_battle_list matches. */
        public matches: msg.elimination_match[];

        /** 下轮开始时间 */
        public start_time: number;
    }

    /** 进行新的一轮比赛（16强、8强、4强 、决赛……）时给全服广播比赛数据 */
    class s2c_pvp_god_elimination_bc_match {

        /** Constructs a new s2c_pvp_god_elimination_bc_match. */
        constructor();

        /** s2c_pvp_god_elimination_bc_match matches. */
        public matches: msg.elimination_match[];

        /** s2c_pvp_god_elimination_bc_match rotation. */
        public rotation: number;
    }

    /** 淘汰赛推送 */
    class s2c_pvp_god_elimination_announce {

        /** Constructs a new s2c_pvp_god_elimination_announce. */
        constructor();

        /** 下一场的开始时间 */
        public beg_timestamp: number;
    }

    /** 淘汰赛 进入比赛场景 */
    class c2s_pvp_god_elimination_enter_scene {

        /** Constructs a new c2s_pvp_god_elimination_enter_scene. */
        constructor();
    }

    /** 淘汰赛 点击弃权 */
    class c2s_pvp_god_elimination_giveup {

        /** Constructs a new c2s_pvp_god_elimination_giveup. */
        constructor();
    }

    /** Represents a s2c_pvp_god_elimination_giveup. */
    class s2c_pvp_god_elimination_giveup {

        /** Constructs a new s2c_pvp_god_elimination_giveup. */
        constructor();

        /** 操作成功 */
        public code: number;
    }

    /** 收到战胜或战败结果 */
    class s2c_pvp_god_elimination_result {

        /** Constructs a new s2c_pvp_god_elimination_result. */
        constructor();

        /** s2c_pvp_god_elimination_result matches. */
        public matches: msg.elimination_match[];

        /** 场次id */
        public match_id: number;

        /** 1赢  2输 */
        public result: number;

        /** 奖励 */
        public reward: msg.prop_tips_data[];

        /** 是否预选赛结算 */
        public is_selective: boolean;

        /** 当前阶段人数 2, 4, 8, 16 */
        public role_num_stage: number;
    }

    /** 投注了哪个玩家 */
    class elimination_bet_info {

        /** Constructs a new elimination_bet_info. */
        constructor();

        /** 角色id */
        public role_id: Long;

        /** elimination_bet_info bet_rank. */
        public bet_rank: number;

        /** 中奖状态  0未知  1中奖  2没中 */
        public state: number;

        /** 领奖状态  0为领  1已领 */
        public reward_state: number;
    }

    /** 投注 */
    class c2s_pvp_god_elimination_bet {

        /** Constructs a new c2s_pvp_god_elimination_bet. */
        constructor();

        /** 角色id */
        public role_id: Long;

        /** 1、2、4、8； 表示第一,第二,四强,八强 */
        public bet_rank: number;
    }

    /** 投注成功返回 */
    class s2c_pvp_god_elimination_bet {

        /** Constructs a new s2c_pvp_god_elimination_bet. */
        constructor();

        /** 角色id */
        public role_id: Long;

        /** s2c_pvp_god_elimination_bet bet_rank. */
        public bet_rank: number;
    }

    /** Represents an elimination_player_data. */
    class elimination_player_data {

        /** Constructs a new elimination_player_data. */
        constructor();

        /** 角色id */
        public role_id: Long;

        /** 名字 */
        public name: string;

        /** 头像 */
        public head: number;

        /** elimination_player_data agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 头像框 */
        public head_frame: number;

        /** 显示战斗力 */
        public showpower: Long;

        /** 性别 */
        public sex: number;
    }

    /** 比赛场景数据（玩家进出时会发、新的一轮比赛开始前会发) */
    class s2c_pvp_god_elimination_scene_update {

        /** Constructs a new s2c_pvp_god_elimination_scene_update. */
        constructor();

        /** 对手是否在场景 1不在场景  2在场景 */
        public opponent_in_scene: number;

        /** 1上一轮进行中； 2等待开始   3战斗中   4已结束 */
        public state: number;

        /** 战斗开始时间 */
        public start_time: number;

        /** 战斗结束时间 */
        public end_time: number;

        /** 对手数据  轮空时没有对手数据 */
        public oppoent?: (msg.elimination_player_data|null);
    }

    /** 打开组织界面 */
    class c2s_guild_open_guild_ui {

        /** Constructs a new c2s_guild_open_guild_ui. */
        constructor();
    }

    /** Represents a guild_cheif_info. */
    class guild_cheif_info {

        /** Constructs a new guild_cheif_info. */
        constructor();

        /** 首领id */
        public role_id: Long;

        /** 首领名字 */
        public name: string;

        /** 首领性别 */
        public sex: number;

        /** 首领头像 */
        public head: number;

        /** guild_cheif_info agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 首领头像框 */
        public head_frame: number;

        /** 战翼 */
        public wing: number;

        /** 飞剑 */
        public ride: number;

        /** guild_cheif_info weapon. */
        public weapon: number;

        /** guild_cheif_info fashion. */
        public fashion: number;

        /** 1:少年 2:成年 */
        public age_type: number;
    }

    /** Represents a guild_max_team. */
    class guild_max_team {

        /** Constructs a new guild_max_team. */
        constructor();

        /** 最强帮派等级 */
        public team_lv: number;

        /** 最强帮派名字 */
        public team_name: string;

        /** 最强帮派首席名字 */
        public chief_name: string;

        /** 最强帮派首席战力 */
        public showpower: Long;

        /** 最强帮派ID */
        public team_id: Long;
    }

    /** 打开组织界面 返回 */
    class s2c_guild_open_guild_ui {

        /** Constructs a new s2c_guild_open_guild_ui. */
        constructor();

        /** 组织名字 */
        public name: string;

        /** 等级 */
        public level: number;

        /** 经验 */
        public exp: number;

        /** 公告 */
        public tenet: string;

        /** s2c_guild_open_guild_ui chief_info. */
        public chief_info?: (msg.guild_cheif_info|null);

        /** 在线成员数 */
        public online_member_cnt: number;

        /** 总成员数 */
        public all_member_cnt: number;

        /** s2c_guild_open_guild_ui team_info. */
        public team_info?: (msg.guild_max_team|null);

        /** s2c_guild_open_guild_ui members. */
        public members: msg.guild_member_data[];

        /** 1全部 2缺省 */
        public oper: number;

        /** 修改组织名字次数默认只能修改一次 */
        public alter_guild_name: number;
    }

    /** 修改公告 */
    class c2s_guild_modify_tenet {

        /** Constructs a new c2s_guild_modify_tenet. */
        constructor();

        /** c2s_guild_modify_tenet new_tenet. */
        public new_tenet: string;
    }

    /** 修改组织名字 */
    class c2s_guild_modify_guild_name {

        /** Constructs a new c2s_guild_modify_guild_name. */
        constructor();

        /** c2s_guild_modify_guild_name new_guild_name. */
        public new_guild_name: string;
    }

    /** 打开成员UI  分页请求 */
    class c2s_guild_member_ui {

        /** Constructs a new c2s_guild_member_ui. */
        constructor();

        /** 从 head_num 到 tail_num 的成员信息 */
        public head_num: number;

        /** c2s_guild_member_ui tail_num. */
        public tail_num: number;
    }

    /** 成员信息 */
    class guild_member_data {

        /** Constructs a new guild_member_data. */
        constructor();

        /** guild_member_data role_id. */
        public role_id: Long;

        /** guild_member_data name. */
        public name: string;

        /** guild_member_data showpower. */
        public showpower: Long;

        /** guild_member_data sex. */
        public sex: number;

        /** guild_member_data head. */
        public head: number;

        /** guild_member_data agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** guild_member_data head_frame. */
        public head_frame: number;

        /** guild_member_data head_frame_lv. */
        public head_frame_lv: number;

        /** 1首领  2太上长老  3长老 */
        public position: number;

        /** guild_member_data guild_team_name. */
        public guild_team_name: string;

        /** guild_member_data guild_team_id. */
        public guild_team_id: Long;

        /** guild_member_data guild_team_lv. */
        public guild_team_lv: number;

        /** 黄钻等级 */
        public qq_yellow_lv: number;

        /** 是否年钻 */
        public is_qq_yellow_year: boolean;

        /** 1在线   2不在线 */
        public online_state: number;

        /** 上一次离线时间 */
        public last_offline_time: Long;

        /** 转生 */
        public reincarnate: number;

        /** 总的组织贡献 */
        public feats: number;

        /** 当前的组织贡献 */
        public cur_feats: number;

        /** vip等级 */
        public vip_lv: number;

        /** 荣耀会员 */
        public honor_vip: boolean;

        /** 至尊会员 */
        public extreme_vip: boolean;

        /** 个人祭祀值/总祭祀值 */
        public self_wish: Long;

        /** 剩余祭祀值 */
        public left_self_wish: Long;
    }

    /** Represents a s2c_guild_member_ui. */
    class s2c_guild_member_ui {

        /** Constructs a new s2c_guild_member_ui. */
        constructor();

        /** 从 head_num 到 tail_num 的成员信息 */
        public head_num: number;

        /** s2c_guild_member_ui tail_num. */
        public tail_num: number;

        /** s2c_guild_member_ui members. */
        public members: msg.guild_member_data[];
    }

    /** 加入组织 */
    class c2s_guild_join {

        /** Constructs a new c2s_guild_join. */
        constructor();
    }

    /** 打开组织等级奖励界面 */
    class c2s_guild_open_lv_reward {

        /** Constructs a new c2s_guild_open_lv_reward. */
        constructor();
    }

    /** Represents a guild_lv_reward. */
    class guild_lv_reward {

        /** Constructs a new guild_lv_reward. */
        constructor();

        /** 组织等级 */
        public level: number;

        /** null没达到等级  0达到等级没领取  1达到等级领取了 */
        public state: number;
    }

    /** 领取组织奖励 */
    class c2s_guild_recv_lv_reward {

        /** Constructs a new c2s_guild_recv_lv_reward. */
        constructor();

        /** c2s_guild_recv_lv_reward level. */
        public level: number;
    }

    /** 领取组织奖励 返回 */
    class s2c_guild_recv_lv_reward {

        /** Constructs a new s2c_guild_recv_lv_reward. */
        constructor();

        /** s2c_guild_recv_lv_reward level. */
        public level: number;
    }

    /** 神像///////////////// */
    class c2s_guild_deity_open_ui {

        /** Constructs a new c2s_guild_deity_open_ui. */
        constructor();
    }

    /** Represents a s2c_guild_deity_info. */
    class s2c_guild_deity_info {

        /** Constructs a new s2c_guild_deity_info. */
        constructor();

        /** 神像信息 */
        public deitys_info: msg.deity_info_item[];

        /** 是否更新 1:更新  0:非更新 */
        public is_update: number;
    }

    /** Represents a deity_info_item. */
    class deity_info_item {

        /** Constructs a new deity_info_item. */
        constructor();

        /** 外显idx */
        public index: number;

        /** 等级 */
        public lv: number;

        /** 当前属性 */
        public cur_attr?: (msg.attributes|null);

        /** 下级属性 */
        public next_attr?: (msg.attributes|null);

        /** 消耗 */
        public cost: msg.prop_tips_data[];

        /** 今日是否膜拜 */
        public is_today_worship: boolean;

        /** 今日是否领取 */
        public is_today_reward: boolean;

        /** 是否激活 */
        public is_active: boolean;

        /** 当前膜拜属性 */
        public worship_attr?: (msg.attributes|null);
    }

    /** 升级、激活 */
    class c2s_guild_deity_lvup {

        /** Constructs a new c2s_guild_deity_lvup. */
        constructor();

        /** 神像index */
        public index: number;

        /** 1:激活/升级 2:膜拜 3:额外领取 */
        public type: number;
    }

    /** 打开宗主争夺UI */
    class c2s_chief_compete_open_ui {

        /** Constructs a new c2s_chief_compete_open_ui. */
        constructor();
    }

    /** 购买挑战次数 */
    class c2s_buy_chief_compete_cnt {

        /** Constructs a new c2s_buy_chief_compete_cnt. */
        constructor();
    }

    /** 匹配对手 */
    class c2s_chief_compete_match {

        /** Constructs a new c2s_chief_compete_match. */
        constructor();
    }

    /** 进入场景 */
    class c2s_start_compete {

        /** Constructs a new c2s_start_compete. */
        constructor();
    }

    /** 膜拜宗主 */
    class c2s_worship_chief {

        /** Constructs a new c2s_worship_chief. */
        constructor();
    }

    /** 宗主争夺开始 */
    class s2c_chief_compete_open {

        /** Constructs a new s2c_chief_compete_open. */
        constructor();

        /** 宗主争夺结束时间戳 */
        public end_time: number;
    }

    /** 宗主争夺结束 */
    class s2c_chief_compete_close {

        /** Constructs a new s2c_chief_compete_close. */
        constructor();
    }

    /** Represents a s2c_role_online_chief_compete. */
    class s2c_role_online_chief_compete {

        /** Constructs a new s2c_role_online_chief_compete. */
        constructor();

        /** 膜拜次数 */
        public worship_cnt: number;

        /** 宗主信息 */
        public chief?: (msg.chief_data|null);

        /** 职位属性 */
        public title_attr: msg.attributes[];
    }

    /** 对手结构体 */
    class opponent {

        /** Constructs a new opponent. */
        constructor();

        /** 时装 */
        public fashion: number;

        /** 名字 */
        public name: string;

        /** 性别 */
        public sex: number;

        /** 头像 */
        public head: number;

        /** opponent agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 头像框 */
        public head_frame: number;
    }

    /** 匹配结果 */
    class s2c_chief_compete_match_result {

        /** Constructs a new s2c_chief_compete_match_result. */
        constructor();

        /** 匹配对手列表，最后一个为真的对手 */
        public opponent: msg.opponent[];
    }

    /** Represents a chief_data. */
    class chief_data {

        /** Constructs a new chief_data. */
        constructor();

        /** 宗主id */
        public role_id: Long;

        /** 宗主名称 */
        public name: string;

        /** 宗主等级 */
        public level: number;

        /** 声望等级 */
        public credit_lv: number;

        /** vip等级 */
        public vip_lv: number;

        /** 战力 */
        public showpower: Long;

        /** 净胜场 */
        public victory: number;

        /** 神兵 */
        public weapon: number;

        /** 时装 */
        public fashion: number;

        /** 称号 */
        public title: number;

        /** 性别 */
        public sex: number;

        /** 1:少年 2:成年 */
        public age_type: number;

        /** chief_data agent_info. */
        public agent_info?: (msg.agent_ex_info|null);
    }

    /** 膜拜宗主(宗主争夺未开始) */
    class s2c_chief_worship_ui {

        /** Constructs a new s2c_chief_worship_ui. */
        constructor();

        /** 第几届 */
        public session: number;

        /** 宗主争夺开始时间戳 */
        public open_time: number;

        /** 膜拜次数 */
        public worship_cnt: number;

        /** 自己的排行 */
        public rank_no: number;
    }

    /** 宗主争夺(宗主争夺期间) */
    class s2c_chief_compete_ui {

        /** Constructs a new s2c_chief_compete_ui. */
        constructor();

        /** 第几届 */
        public session: number;

        /** 九门提督 */
        public chief?: (msg.chief_data|null);

        /** 自己排第几名 */
        public rank_no: number;

        /** 剩余可挑战 */
        public compete_cnt: number;

        /** 挑战恢复 */
        public recovery_time: number;

        /** 宗主争夺结束时间戳 */
        public end_time: number;

        /** 净胜场数 */
        public my_victory: number;

        /** s2c_chief_compete_ui oper. */
        public oper: number;
    }

    /** Represents a candidate. */
    class candidate {

        /** Constructs a new candidate. */
        constructor();

        /** candidate role_id. */
        public role_id: Long;

        /** candidate name. */
        public name: string;

        /** candidate level. */
        public level: number;

        /** candidate showpower. */
        public showpower: Long;

        /** candidate victory. */
        public victory: number;

        /** candidate vip_lv. */
        public vip_lv: number;

        /** candidate head. */
        public head: number;

        /** candidate agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** candidate head_frame. */
        public head_frame: number;

        /** candidate rank_no. */
        public rank_no: number;

        /** candidate sex. */
        public sex: number;
    }

    /** 请求排行榜信息  分页请求 */
    class c2s_chief_compete_rank {

        /** Constructs a new c2s_chief_compete_rank. */
        constructor();

        /** 开始NO. */
        public head_num: number;

        /** 结束NO. */
        public tail_num: number;
    }

    /** Represents a s2c_chief_compete_rank. */
    class s2c_chief_compete_rank {

        /** Constructs a new s2c_chief_compete_rank. */
        constructor();

        /** 我的胜场 */
        public my_victory: number;

        /** 开始NO. */
        public head_num: number;

        /** 结束NO. */
        public tail_num: number;

        /** 候选人列表 */
        public candidates: msg.candidate[];
    }

    /** 获取神铸信息 */
    class c2s_equip_god_info {

        /** Constructs a new c2s_equip_god_info. */
        constructor();
    }

    /** Represents a s2c_equip_god_info. */
    class s2c_equip_god_info {

        /** Constructs a new s2c_equip_god_info. */
        constructor();

        /** 装备神铸信息列表 */
        public god_message_list: msg.equip_god_item[];
    }

    /** Represents an equip_god_item. */
    class equip_god_item {

        /** Constructs a new equip_god_item. */
        constructor();

        /** 装备类别（位置：1 ~ 10） */
        public equip_type: number;

        /** 当前等级 */
        public cur_level: number;

        /** 当前神铸属性 */
        public cur_attr?: (msg.attributes|null);

        /** 下一级神铸属性 */
        public next_attr?: (msg.attributes|null);

        /** 产出 */
        public cost_props?: (msg.prop_tips_data|null);
    }

    /** Represents a c2s_equip_god. */
    class c2s_equip_god {

        /** Constructs a new c2s_equip_god. */
        constructor();

        /** 装备类别（ 位置：1~10 ） */
        public equip_type: number;
    }

    /** 神铸剥离 */
    class c2s_equip_ungod {

        /** Constructs a new c2s_equip_ungod. */
        constructor();

        /** 装备类别（ 位置：1~10 ） */
        public equip_type: number;
    }

    /** 神铸剥离请求产出 */
    class c2s_equip_ungod_info {

        /** Constructs a new c2s_equip_ungod_info. */
        constructor();

        /** 装备类别（ 位置：1~10 ） */
        public equip_type: number;
    }

    /** 神铸剥离请求产出返回 */
    class s2c_equip_ungod_info {

        /** Constructs a new s2c_equip_ungod_info. */
        constructor();

        /** 装备类别（ 位置：1~10 ） */
        public equip_type: number;

        /** 产出 */
        public output?: (msg.prop_tips_data|null);
    }

    /** 接取悬赏 */
    class c2s_wanted_boss_choose {

        /** Constructs a new c2s_wanted_boss_choose. */
        constructor();
    }

    /** 刷新悬赏 */
    class c2s_wanted_boss_refresh {

        /** Constructs a new c2s_wanted_boss_refresh. */
        constructor();
    }

    /** 提升品质 */
    class c2s_wanted_boss_upgrade {

        /** Constructs a new c2s_wanted_boss_upgrade. */
        constructor();

        /** 是否一键传说 */
        public is_onekey: boolean;
    }

    /** 领取积分奖励 */
    class c2s_wanted_boss_reward {

        /** Constructs a new c2s_wanted_boss_reward. */
        constructor();
    }

    /** 仙盟求助 */
    class c2s_wanted_boss_seek_help {

        /** Constructs a new c2s_wanted_boss_seek_help. */
        constructor();

        /** c2s_wanted_boss_seek_help only_teammate. */
        public only_teammate: boolean;
    }

    /** 放弃任务 */
    class c2s_wanted_boss_give_up {

        /** Constructs a new c2s_wanted_boss_give_up. */
        constructor();
    }

    /** 开始任务 */
    class c2s_wanted_boss_start {

        /** Constructs a new c2s_wanted_boss_start. */
        constructor();
    }

    /** 购买挑战次数 */
    class c2s_wanted_boss_buy_cnt {

        /** Constructs a new c2s_wanted_boss_buy_cnt. */
        constructor();

        /** 1:元宝 2：悬赏令 */
        public buy_type: number;
    }

    /** 队伍信息 */
    class s2c_wanted_boss_team {

        /** Constructs a new s2c_wanted_boss_team. */
        constructor();

        /** s2c_wanted_boss_team end_time. */
        public end_time: number;

        /** s2c_wanted_boss_team members. */
        public members: msg.team_room_member[];
    }

    /** vip 奖励结构体 */
    class vip_reward_info {

        /** Constructs a new vip_reward_info. */
        constructor();

        /** vip等级idx */
        public idx: number;

        /** 领取状态 1:表示没有领取 2:表示已领取 */
        public state: number;

        /** vip_reward_info timer. */
        public timer: number;
    }

    /** Represents a c2s_vip_info. */
    class c2s_vip_info {

        /** Constructs a new c2s_vip_info. */
        constructor();
    }

    /** Represents a s2c_vip_info. */
    class s2c_vip_info {

        /** Constructs a new s2c_vip_info. */
        constructor();

        /** 当前vip等级索引 */
        public idx: number;

        /** 当前vip经验 */
        public exp: number;

        /** vip奖励信息 */
        public reward_list: msg.vip_reward_info[];
    }

    /** Represents a c2s_vip_receive_gift. */
    class c2s_vip_receive_gift {

        /** Constructs a new c2s_vip_receive_gift. */
        constructor();

        /** c2s_vip_receive_gift type. */
        public type: number;

        /** c2s_vip_receive_gift idx. */
        public idx: number;
    }

    /** 请求商品信息 */
    class c2s_store_prop_info {

        /** Constructs a new c2s_store_prop_info. */
        constructor();
    }

    /** 购买商品 */
    class c2s_store_buy_prop {

        /** Constructs a new c2s_store_buy_prop. */
        constructor();

        /** 商品编号 */
        public index: number;

        /** 购买数量 */
        public buy_cnt: number;

        /** 是否使用仙玉代替元宝 1 使用 */
        public is_diamond_instead: number;
    }

    /** 返回商品信息 */
    class s2c_store_prop_info {

        /** Constructs a new s2c_store_prop_info. */
        constructor();

        /** s2c_store_prop_info infos. */
        public infos: msg.store_prop_info[];

        /** 初次开启解锁类型 */
        public first_open_func: number[];
    }

    /** 商品信息 */
    class store_prop_info {

        /** Constructs a new store_prop_info. */
        constructor();

        /** 商品编号 */
        public index: number;

        /** 已购买数量 */
        public bought_cnt: number;

        /** 限时商品结束时间 */
        public end_time: number;
    }

    /** Represents a special_product. */
    class special_product {

        /** Constructs a new special_product. */
        constructor();

        /** 商品编号 */
        public index: number;

        /** 商品的位置 */
        public pos: number;

        /** 已购买的数量 */
        public buyed: number;

        /** 0为未购买 1为已购买 */
        public status: number;
    }

    /** Represents a c2s_main_city_jump. */
    class c2s_main_city_jump {

        /** Constructs a new c2s_main_city_jump. */
        constructor();
    }

    /** 伤害排行榜结构体 */
    class boss_rank_item {

        /** Constructs a new boss_rank_item. */
        constructor();

        /** 角色排名 */
        public rank_no: number;

        /** 角色id */
        public role_id: Long;

        /** 角色名字 */
        public name: string;

        /** 头像 */
        public head: number;

        /** boss_rank_item agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 头像框 */
        public head_frame: number;

        /** 性别 */
        public sex: number;

        /** 角色伤害 */
        public damage: Long;

        /** 角色收到点赞数 */
        public liked_cnt: number;

        /** 1 全部 2 缺省 */
        public oper: number;
    }

    /** 试炼boss排名结构 */
    class trial_boss_rank {

        /** Constructs a new trial_boss_rank. */
        constructor();

        /** boss序号(对应相应关卡及排行榜) */
        public boss_no: number;

        /** 个人排名 (缺省未上榜) */
        public self_rank_no: number;

        /** 个人分数 */
        public self_damage: Long;

        /** 个人点赞状态 0-没有点赞, 1-已点赞 */
        public like_state: number;

        /** 单只boss伤害前10排名 */
        public ranks: msg.boss_rank_item[];

        /** 最大的页数 */
        public max_page_no: number;
    }

    /** Represents a c2s_trial_boss_open_ui. */
    class c2s_trial_boss_open_ui {

        /** Constructs a new c2s_trial_boss_open_ui. */
        constructor();
    }

    /** Represents a s2c_trial_boss_open_ui. */
    class s2c_trial_boss_open_ui {

        /** Constructs a new s2c_trial_boss_open_ui. */
        constructor();

        /** 当前关卡boss序号(对应相应关卡及排行榜) */
        public boss_no: number;

        /** 当前boss剩余血量 */
        public boss_hp: number;

        /** 剩余挑战次数 */
        public challenge_cnt: number;

        /** 已购买挑战次数 */
        public challenge_buy_cnt: number;

        /** 个人伤害buff值 */
        public buff_value: number;

        /** 已购买buff次数 */
        public buff_buy_cnt: number;

        /** 已领取击杀boss奖励序号列表（参数表序号） */
        public received_list: number[];

        /** 当前boss伤害排名信息 */
        public rank_info?: (msg.trial_boss_rank|null);

        /** 1 全部 2 缺省 */
        public oper: number;
    }

    /** 组织历练关闭界面 */
    class c2s_trial_boss_close_ui {

        /** Constructs a new c2s_trial_boss_close_ui. */
        constructor();
    }

    /** 组织历练查看某只boss伤害排名信息 */
    class c2s_trial_boss_look_rank {

        /** Constructs a new c2s_trial_boss_look_rank. */
        constructor();

        /** boss序号 */
        public boss_no: number;

        /** 页号 （一页十个） */
        public page_no: number;
    }

    /** Represents a s2c_trial_boss_look_rank. */
    class s2c_trial_boss_look_rank {

        /** Constructs a new s2c_trial_boss_look_rank. */
        constructor();

        /** 查看的boss伤害排名信息 */
        public rank_info?: (msg.trial_boss_rank|null);

        /** 页号 （一页十个） */
        public page_no: number;
    }

    /** 组织历练进入挑战 */
    class c2s_trial_boss_enter {

        /** Constructs a new c2s_trial_boss_enter. */
        constructor();
    }

    /** 组织历练进入场景信息 */
    class s2c_trial_boss_inst_info {

        /** Constructs a new s2c_trial_boss_inst_info. */
        constructor();

        /** 当前关卡boss序号(对应相应关卡及排行榜) */
        public boss_no: number;

        /** 挑战结束时间戳 */
        public end_timestamp: number;
    }

    /** 组织历练排行榜人物点赞 */
    class c2s_trial_boss_rank_like {

        /** Constructs a new c2s_trial_boss_rank_like. */
        constructor();

        /** 要点赞的关卡boss序号(对应相应关卡及排行榜) */
        public boss_no: number;

        /** 点赞的排名 */
        public rank_no: number;

        /** 对方的角色id */
        public role_id: Long;
    }

    /** 组织历练领取通关奖励 */
    class c2s_trial_boss_receive_over_reward {

        /** Constructs a new c2s_trial_boss_receive_over_reward. */
        constructor();

        /** 领取的奖励序号 */
        public received_no: number;
    }

    /** 组织历练购买buff */
    class c2s_trial_boss_buy_buff {

        /** Constructs a new c2s_trial_boss_buy_buff. */
        constructor();
    }

    /** 组织历练购买挑战次数 */
    class c2s_trial_boss_buy_challenge {

        /** Constructs a new c2s_trial_boss_buy_challenge. */
        constructor();
    }

    /** Represents a trial_boss_rank_member. */
    class trial_boss_rank_member {

        /** Constructs a new trial_boss_rank_member. */
        constructor();

        /** trial_boss_rank_member role_id. */
        public role_id: Long;

        /** trial_boss_rank_member name. */
        public name: string;

        /** 伤害 */
        public damage: Long;
    }

    /** 请求伤害排行榜 返回 */
    class s2c_trial_boss_damage_ranks {

        /** Constructs a new s2c_trial_boss_damage_ranks. */
        constructor();

        /** s2c_trial_boss_damage_ranks members. */
        public members: msg.trial_boss_rank_member[];
    }

    /** Represents a c2s_eight_diagrams_get_info. */
    class c2s_eight_diagrams_get_info {

        /** Constructs a new c2s_eight_diagrams_get_info. */
        constructor();
    }

    /** 副本信息 */
    class s2c_eight_diagrams_info {

        /** Constructs a new s2c_eight_diagrams_info. */
        constructor();

        /** 1:全部 2:缺省 */
        public oper: number;

        /** 当前关卡 */
        public index: number;

        /** 已用次数                      （旧:已用免费次数） */
        public used_free: number;

        /** 当前免费次数+已购次数          (旧:最大免费次数) */
        public max_free: number;

        /** s2c_eight_diagrams_info master. */
        public master?: (msg.eight_diagrams_master|null);

        /** 最大可购买次数 */
        public max_buy: number;
    }

    /** 伪排行榜 */
    class eight_diagrams_master {

        /** Constructs a new eight_diagrams_master. */
        constructor();

        /** eight_diagrams_master role_id. */
        public role_id: Long;

        /** eight_diagrams_master sex. */
        public sex: number;

        /** eight_diagrams_master name. */
        public name: string;

        /** 头像 */
        public image: number;

        /** 头像框 */
        public image_frame: number;

        /** 找到生门所用时间 */
        public record: number;

        /** eight_diagrams_master agent_info. */
        public agent_info?: (msg.agent_ex_info|null);
    }

    /** 进入副本 */
    class c2s_eight_diagrams_enter {

        /** Constructs a new c2s_eight_diagrams_enter. */
        constructor();
    }

    /** 返回场景数据 */
    class s2c_eight_diagrams_enter {

        /** Constructs a new s2c_eight_diagrams_enter. */
        constructor();

        /** 1:全部 2:缺省 */
        public oper: number;

        /** 关卡编号 */
        public index: number;

        /** 结束时间戳 */
        public end_timestamp: number;

        /** 八卦阵信息 */
        public entrance_info: msg.entrance_item[];

        /** 是否首次进入 */
        public is_newbie: boolean;

        /** 位置 */
        public cur_kill_pos: number;

        /** 棺材entity_id */
        public guancai_entity_id: Long;
    }

    /** 八卦阵结构体 */
    class entrance_item {

        /** Constructs a new entrance_item. */
        constructor();

        /** entrance_item entity_id. */
        public entity_id: Long;

        /** x坐标 */
        public x: number;

        /** y坐标 */
        public y: number;

        /** 门类型 */
        public type: number;
    }

    /** 直接找到生门位置 */
    class c2s_eight_diagrams_find {

        /** Constructs a new c2s_eight_diagrams_find. */
        constructor();
    }

    /** 播放角色对话 */
    class c2s_play_conversation {

        /** Constructs a new c2s_play_conversation. */
        constructor();

        /** 对话编号 */
        public index: number;
    }

    /** 购买次数 */
    class c2s_eight_diagrams_buy {

        /** Constructs a new c2s_eight_diagrams_buy. */
        constructor();
    }

    /** Represents a s2c_break_down_machine. */
    class s2c_break_down_machine {

        /** Constructs a new s2c_break_down_machine. */
        constructor();
    }

    /** Represents a bronze_player. */
    class bronze_player {

        /** Constructs a new bronze_player. */
        constructor();

        /** 角色id */
        public role_id: Long;

        /** 名字 */
        public name: string;

        /** 性别 */
        public sex: number;

        /** bronze_player age_type. */
        public age_type: number;

        /** 仙盟名字 */
        public guild_name: string;

        /** 神兵 */
        public weapon: number;

        /** 时装 */
        public fashion: number;

        /** bronze_player showpower. */
        public showpower: Long;

        /** bronze_player agent_info. */
        public agent_info?: (msg.agent_ex_info|null);
    }

    /** Represents a c2s_bronze_open_ui. */
    class c2s_bronze_open_ui {

        /** Constructs a new c2s_bronze_open_ui. */
        constructor();
    }

    /** Represents a s2c_bronze_info. */
    class s2c_bronze_info {

        /** Constructs a new s2c_bronze_info. */
        constructor();

        /** s2c_bronze_info guild_name. */
        public guild_name: string;

        /** s2c_bronze_info showpower. */
        public showpower: Long;

        /** s2c_bronze_info guild_players. */
        public guild_players: msg.bronze_player[];

        /** s2c_bronze_info rank_nos. */
        public rank_nos: number[];

        /** s2c_bronze_info can_join. */
        public can_join: number;

        /** 我的仙盟排名 */
        public my_guild_team_rank: number;
    }

    /** Represents a bronze_rank. */
    class bronze_rank {

        /** Constructs a new bronze_rank. */
        constructor();

        /** bronze_rank role_id. */
        public role_id: string;

        /** bronze_rank name. */
        public name: string;

        /** bronze_rank guild_name. */
        public guild_name: string;

        /** bronze_rank rank_no. */
        public rank_no: number;

        /** bronze_rank kill_cnt. */
        public kill_cnt: number;

        /** bronze_rank battle_score. */
        public battle_score: number;

        /** bronze_rank damage. */
        public damage: Long;

        /** bronze_rank agent_info. */
        public agent_info?: (msg.agent_ex_info|null);
    }

    /** Represents a bronze_role_rank. */
    class bronze_role_rank {

        /** Constructs a new bronze_role_rank. */
        constructor();

        /** bronze_role_rank rank_type. */
        public rank_type: number;

        /** bronze_role_rank my_rank. */
        public my_rank: number;

        /** bronze_role_rank status. */
        public status: number;
    }

    /** Represents a c2s_bronze_open_rank. */
    class c2s_bronze_open_rank {

        /** Constructs a new c2s_bronze_open_rank. */
        constructor();
    }

    /** Represents a s2c_bronze_role_rank_info. */
    class s2c_bronze_role_rank_info {

        /** Constructs a new s2c_bronze_role_rank_info. */
        constructor();

        /** s2c_bronze_role_rank_info ranks. */
        public ranks: msg.bronze_role_rank[];
    }

    /** Represents a c2s_bronze_open_battle_rank. */
    class c2s_bronze_open_battle_rank {

        /** Constructs a new c2s_bronze_open_battle_rank. */
        constructor();

        /** c2s_bronze_open_battle_rank rank_type. */
        public rank_type: number;
    }

    /** Represents a s2c_bronze_rank_info. */
    class s2c_bronze_rank_info {

        /** Constructs a new s2c_bronze_rank_info. */
        constructor();

        /** s2c_bronze_rank_info rank_type. */
        public rank_type: number;

        /** s2c_bronze_rank_info my_rank. */
        public my_rank?: (msg.bronze_rank|null);

        /** s2c_bronze_rank_info ranks. */
        public ranks: msg.bronze_rank[];
    }

    /** Represents a c2s_bronze_receive_rank_reward. */
    class c2s_bronze_receive_rank_reward {

        /** Constructs a new c2s_bronze_receive_rank_reward. */
        constructor();

        /** c2s_bronze_receive_rank_reward rank_type. */
        public rank_type: number;
    }

    /** Represents a c2s_bronze_enter. */
    class c2s_bronze_enter {

        /** Constructs a new c2s_bronze_enter. */
        constructor();
    }

    /** Represents a c2s_bronze_battle_operate. */
    class c2s_bronze_battle_operate {

        /** Constructs a new c2s_bronze_battle_operate. */
        constructor();

        /** c2s_bronze_battle_operate oper_type. */
        public oper_type: number;
    }

    /** Represents a s2c_bronze_announce. */
    class s2c_bronze_announce {

        /** Constructs a new s2c_bronze_announce. */
        constructor();

        /** s2c_bronze_announce camp. */
        public camp: number;

        /** s2c_bronze_announce end_timestamp. */
        public end_timestamp: number;
    }

    /** Represents a s2c_bronze_monster_status. */
    class s2c_bronze_monster_status {

        /** Constructs a new s2c_bronze_monster_status. */
        constructor();

        /** s2c_bronze_monster_status boss. */
        public boss: boolean;

        /** s2c_bronze_monster_status left_guard. */
        public left_guard: boolean;

        /** s2c_bronze_monster_status right_guard. */
        public right_guard: boolean;
    }

    /** Represents a c2s_bronze_find_monster. */
    class c2s_bronze_find_monster {

        /** Constructs a new c2s_bronze_find_monster. */
        constructor();

        /** c2s_bronze_find_monster target. */
        public target: number;
    }

    /** Represents a s2c_bronze_time_to_change_camp. */
    class s2c_bronze_time_to_change_camp {

        /** Constructs a new s2c_bronze_time_to_change_camp. */
        constructor();

        /** s2c_bronze_time_to_change_camp timestamp. */
        public timestamp: number;
    }

    /** 每日通关奖励，首通奖励，关卡奖励 */
    class pass_status {

        /** Constructs a new pass_status. */
        constructor();

        /** 指定关卡数 */
        public index: number;

        /** 星星数      get_info 或 通关后会更新 */
        public star: number;

        /** 状态：true已领取  false 未领取  -- 首通 */
        public first_pass: boolean;

        /** 状态：true已领取  false 未领取  -- 每日 */
        public day_pass: boolean;
    }

    /** Represents a star_status. */
    class star_status {

        /** Constructs a new star_status. */
        constructor();

        /** 6表示6星档   12表示12星档   18表示18星档 */
        public star_type: number;

        /** 状态：true已领取  false 未领取 */
        public status: boolean;
    }

    /** 累计星数奖励 */
    class star_accumulate {

        /** Constructs a new star_accumulate. */
        constructor();

        /** 第N张藏宝图 */
        public map_type: number;

        /** 状态：true已领取  false 未领取    -- 指定关卡 */
        public assign_pass: boolean;

        /** 详细关卡奖励信息 */
        public pass_info: msg.pass_status[];

        /** 星星累计奖励 */
        public star_info: msg.star_status[];
    }

    /** 阶段奖励 */
    class stage_reward {

        /** Constructs a new stage_reward. */
        constructor();

        /** 星级 */
        public star: number;

        /** 是否领取 1:已领取 0:未领取 */
        public have_receive: number;

        /** 是否可以领取 1:可以领取 0:不可领取 */
        public can_receive: number;
    }

    /** 获取 藏宝图信息 */
    class c2s_treasure_map_info {

        /** Constructs a new c2s_treasure_map_info. */
        constructor();
    }

    /** 藏宝图信息 */
    class s2c_treasure_map_info {

        /** Constructs a new s2c_treasure_map_info. */
        constructor();

        /** 当前 第N张藏宝图 */
        public cur_map_type: number;

        /** 当前关卡数 */
        public cur_index: number;

        /** 关卡奖励信息 */
        public pass: msg.star_accumulate[];

        /** 阶段奖励 */
        public stage_rewards: msg.stage_reward[];

        /** 最高星 */
        public max_star: number;
    }

    /** 更新藏宝图信息 */
    class s2c_treasure_map_update {

        /** Constructs a new s2c_treasure_map_update. */
        constructor();

        /** 当前 第N张藏宝图 */
        public cur_map_type: number;

        /** 当前关卡数 */
        public cur_index: number;

        /** 关卡奖励信息 */
        public pass?: (msg.star_accumulate|null);
    }

    /** 领取个人奖励 */
    class c2s_treasure_map_take {

        /** Constructs a new c2s_treasure_map_take. */
        constructor();

        /** 星数 */
        public star: number;
    }

    /** Represents a c2s_treasure_every_map_take. */
    class c2s_treasure_every_map_take {

        /** Constructs a new c2s_treasure_every_map_take. */
        constructor();

        /** 第N张藏宝图 */
        public map_type: number;

        /** 星数 */
        public star: number;
    }

    /** 挖宝 */
    class c2s_treasure_map_dig {

        /** Constructs a new c2s_treasure_map_dig. */
        constructor();

        /** 指定地图 */
        public map_type: number;

        /** 指定关卡数 */
        public index: number;

        /** true 一键挖宝 ，false 挖宝 */
        public is_onekey: boolean;
    }

    /** Represents a s2c_treasure_map_enter. */
    class s2c_treasure_map_enter {

        /** Constructs a new s2c_treasure_map_enter. */
        constructor();

        /** 进入副本时间 */
        public begin_time: number;

        /** 结束副本时间 */
        public end_time: number;

        /** 关卡index */
        public index: number;

        /** 是否自动鼓舞 */
        public auto_inspire: boolean;
    }

    /** 藏宝请求鼓舞信息 */
    class c2s_treasure_inspire_info {

        /** Constructs a new c2s_treasure_inspire_info. */
        constructor();
    }

    /** Represents a treasure_inspire_info. */
    class treasure_inspire_info {

        /** Constructs a new treasure_inspire_info. */
        constructor();

        /** 1:元宝 2：仙玉 */
        public coin_type: number;

        /** 剩余鼓舞次数 */
        public left_cnt: number;

        /** 最大鼓舞次数 */
        public max_cnt: number;
    }

    /** 鼓舞信息 */
    class s2c_treasure_inspire_info {

        /** Constructs a new s2c_treasure_inspire_info. */
        constructor();

        /** s2c_treasure_inspire_info infos. */
        public infos: msg.treasure_inspire_info[];

        /** s2c_treasure_inspire_info is_auto_inspire. */
        public is_auto_inspire: boolean;
    }

    /** Represents a c2s_treasure_inspire. */
    class c2s_treasure_inspire {

        /** Constructs a new c2s_treasure_inspire. */
        constructor();

        /** 1:手动鼓舞 2：自动鼓舞 3：状态转换 --todo暂时没解决 */
        public coin_type: number;
    }

    /** 一键鼓舞 （弃用） */
    class c2s_treasure_inspire_auto {

        /** Constructs a new c2s_treasure_inspire_auto. */
        constructor();

        /** 是否自动鼓舞,需要更改为的鼓舞状态 */
        public auto_inspire: boolean;
    }

    /** 打开异域BOSS界面 */
    class c2s_foreign_boss_open_ui {

        /** Constructs a new c2s_foreign_boss_open_ui. */
        constructor();

        /** 1:本服 2:跨服 */
        public room_type: number;

        /** 是否上线请求数据 此时只返回简单数据s2c_foreign_boss_open_ui.hint和s2c_foreign_boss_summon */
        public is_online: number;
    }

    /** Represents a foreign_boss_obj_info. */
    class foreign_boss_obj_info {

        /** Constructs a new foreign_boss_obj_info. */
        constructor();

        /** 服务器id */
        public server_id: number;

        /** 房间号 一个服最多可以开n个房间 从1到n */
        public room_pos: number;

        /** 召唤者角色名 */
        public summoner_name: string;

        /** boss类型 未定 暂时定为1宝石 2外显 */
        public boss_type: number;

        /** 本服参与人数 */
        public my_server_role: number;

        /** 外服参与人数 */
        public other_server_role: number;

        /** 结束时间戳 */
        public end_timestamp: number;

        /** 是否传说boss 1:是 0或缺省:否 */
        public is_legend: number;
    }

    /** 打开异域BOSS界面 返回 */
    class s2c_foreign_boss_open_ui {

        /** Constructs a new s2c_foreign_boss_open_ui. */
        constructor();

        /** 红点提示 可单独发此字段告知前端显示红点 1代表有红点 2代表取消红点 */
        public hint: number;

        /** s2c_foreign_boss_open_ui instance_list. */
        public instance_list: msg.foreign_boss_obj_info[];

        /** 已获奖励次数 */
        public foreign_boss_times: number;

        /** 我的击杀数 */
        public my_kill_count: number;
    }

    /** 关闭异域BOSS界面 */
    class c2s_foreign_boss_close_ui {

        /** Constructs a new c2s_foreign_boss_close_ui. */
        constructor();
    }

    /** 进行召唤 */
    class c2s_foreign_boss_summon {

        /** Constructs a new c2s_foreign_boss_summon. */
        constructor();

        /** 是否传说召唤 1:是 0或缺省:否 */
        public is_legend: number;
    }

    /** 进入异域BOSS */
    class c2s_foreign_boss_enter {

        /** Constructs a new c2s_foreign_boss_enter. */
        constructor();

        /** 用server_id + room_pos来区分各个副本 */
        public server_id: number;

        /** c2s_foreign_boss_enter room_pos. */
        public room_pos: number;

        /** 突袭时使用 如果true则自动购买突袭券 */
        public is_auto_buy: boolean;
    }

    /** 呼叫帮助 */
    class c2s_foreign_boss_seek_help {

        /** Constructs a new c2s_foreign_boss_seek_help. */
        constructor();
    }

    /** Represents a summoner_info. */
    class summoner_info {

        /** Constructs a new summoner_info. */
        constructor();

        /** summoner_info name. */
        public name: string;

        /** 性别 */
        public sex: number;

        /** 头像 */
        public head: number;

        /** summoner_info agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 头像框 */
        public head_frame: number;

        /** summoner_info role_id. */
        public role_id: Long;
    }

    /** 进入异域BOSS 返回 */
    class s2c_foreign_boss_enter {

        /** Constructs a new s2c_foreign_boss_enter. */
        constructor();

        /** 1全部  2缺省 */
        public operate: number;

        /** 1本服  2跨服 */
        public room_type: number;

        /** 本服参与人数 */
        public my_server_role: number;

        /** 外服参与人数 */
        public other_server_role: number;

        /** 结束时间戳 */
        public end_timestamp: number;

        /** 召唤者信息 */
        public summoner_info?: (msg.summoner_info|null);

        /** 击杀人数 */
        public kill_count: number;
    }

    /** boss出现/消失时推送给前端 玩家上线时也用这条协议推送 */
    class s2c_foreign_boss_summon {

        /** Constructs a new s2c_foreign_boss_summon. */
        constructor();

        /** 1:boss出现 2:boss消失 */
        public operate: number;

        /** s2c_foreign_boss_summon server_id. */
        public server_id: number;

        /** s2c_foreign_boss_summon room_pos. */
        public room_pos: number;

        /** 召唤者角色名 */
        public summoner_name: string;

        /** boss类型 */
        public boss_type: number;

        /** 是否传说boss 1:是 0或缺省:否 */
        public is_legend: number;
    }

    /** 请求伤害排行榜 */
    class c2s_foreign_boss_damage_ranks {

        /** Constructs a new c2s_foreign_boss_damage_ranks. */
        constructor();
    }

    /** Represents a foreign_boss_rank_member. */
    class foreign_boss_rank_member {

        /** Constructs a new foreign_boss_rank_member. */
        constructor();

        /** foreign_boss_rank_member role_id. */
        public role_id: Long;

        /** foreign_boss_rank_member name. */
        public name: string;

        /** 伤害 */
        public damage: Long;
    }

    /** 请求伤害排行榜 返回 */
    class s2c_foreign_boss_damage_ranks {

        /** Constructs a new s2c_foreign_boss_damage_ranks. */
        constructor();

        /** s2c_foreign_boss_damage_ranks members. */
        public members: msg.foreign_boss_rank_member[];

        /** s2c_foreign_boss_damage_ranks boss_pos. */
        public boss_pos: number;
    }

    /** 更换目标 */
    class c2s_foreign_boss_change_target {

        /** Constructs a new c2s_foreign_boss_change_target. */
        constructor();

        /** 可缺省 无此字段时 后端寻找entity_id发前端 前端再次发送有此字段的协议 后端会发s2c_instance_find_monster协议进攻 */
        public entity_id: Long;
    }

    /** Represents a s2c_foreign_boss_change_target. */
    class s2c_foreign_boss_change_target {

        /** Constructs a new s2c_foreign_boss_change_target. */
        constructor();

        /** 目标id */
        public entity_id: Long;
    }

    /** 屠戮榜获取排名 */
    class c2s_foreign_boss_req_rank {

        /** Constructs a new c2s_foreign_boss_req_rank. */
        constructor();

        /** 类型1:击杀榜 类型2:死亡榜 */
        public type: number;
    }

    /** Represents a foreign_boss_rank_data. */
    class foreign_boss_rank_data {

        /** Constructs a new foreign_boss_rank_data. */
        constructor();

        /** foreign_boss_rank_data role_id. */
        public role_id: Long;

        /** foreign_boss_rank_data name. */
        public name: string;

        /** 性别 */
        public sex: number;

        /** 头像 */
        public head: number;

        /** foreign_boss_rank_data agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 头像框 */
        public head_frame: number;

        /** VIP index */
        public vip_lv: number;

        /** 击杀人数/死亡次数 */
        public count: number;

        /** 排名 */
        public rank_no: number;
    }

    /** Represents a s2c_foreign_boss_req_rank. */
    class s2c_foreign_boss_req_rank {

        /** Constructs a new s2c_foreign_boss_req_rank. */
        constructor();

        /** 类型1:击杀榜 类型2:死亡榜 */
        public type: number;

        /** s2c_foreign_boss_req_rank datas. */
        public datas: msg.foreign_boss_rank_data[];

        /** 自己名次 */
        public myself_rank_no: number;

        /** 自己的击杀人数/死亡次数 */
        public myself_count: number;

        /** 下次刷新时间 */
        public next_refresh_timestamp: number;
    }

    /** 击杀奖励 */
    class c2s_foreign_boss_kill_reward {

        /** Constructs a new c2s_foreign_boss_kill_reward. */
        constructor();

        /** 奖励序号，如果缺省为打开界面 */
        public index: number;
    }

    /** 仙盟奖励信息 */
    class s2c_foreign_boss_kill_reward {

        /** Constructs a new s2c_foreign_boss_kill_reward. */
        constructor();

        /** 没有达到击杀数的时候缺省那一个阶段的奖励 */
        public indexs: number[];

        /** 我的击杀数 */
        public my_kill_count: number;
    }

    /** 获取本服排行榜信息 */
    class c2s_foreign_boss_kill_rank {

        /** Constructs a new c2s_foreign_boss_kill_rank. */
        constructor();

        /** 排行榜类型 1:召唤排行 2:击杀排行 */
        public type: number;
    }

    /** Represents a s2c_foreign_boss_kill_rank. */
    class s2c_foreign_boss_kill_rank {

        /** Constructs a new s2c_foreign_boss_kill_rank. */
        constructor();

        /** 类型1:召唤榜 类型2:击杀榜 */
        public type: number;

        /** s2c_foreign_boss_kill_rank datas. */
        public datas: msg.foreign_boss_rank_data[];

        /** 自己名次 */
        public myself_rank_no: number;

        /** 自己的击杀人数/死亡次数 */
        public myself_count: number;
    }

    /** boss复活提示弹窗/////////// */
    class boss_relife_item {

        /** Constructs a new boss_relife_item. */
        constructor();

        /** 1:个人boss 2：墓群BOSS 3：皇陵BOSS 4：跨服BOSS */
        public boss_type: number;

        /** 勾选关注boss_index列表 */
        public index_list: number[];
    }

    /** Represents a s2c_boss_relife_info. */
    class s2c_boss_relife_info {

        /** Constructs a new s2c_boss_relife_info. */
        constructor();

        /** 玩家对应关注的boss复活提示 */
        public boss_info: msg.boss_relife_item[];

        /** 1全部 2缺省 */
        public oper: number;
    }

    /** 手动勾选关注 */
    class c2s_boss_relife_info {

        /** Constructs a new c2s_boss_relife_info. */
        constructor();

        /** 1:个人boss 2：墓群BOSS 3：皇陵BOSS 4：跨服BOSS */
        public boss_type: number;

        /** 对应boss的index */
        public boss_index: number;

        /** 0：取消勾选 1:勾选 */
        public click_type: number;
    }

    /** 点击关闭boss复活提示弹窗 */
    class c2s_close_boss_relife_tips {

        /** Constructs a new c2s_close_boss_relife_tips. */
        constructor();

        /** 1:个人boss 2：墓群BOSS 3：皇陵BOSS 4：跨服BOSS */
        public boss_type: number;
    }

    /** 推送给前端显示的数据 */
    class s2c_boss_relife_info_tips {

        /** Constructs a new s2c_boss_relife_info_tips. */
        constructor();

        /** 1:个人boss 2：墓群BOSS 3：皇陵BOSS 4：跨服BOSS */
        public boss_type: number;

        /** 推送的显示boss_index */
        public index: number;
    }

    /** Represents a c2s_copy_daily_online_info. */
    class c2s_copy_daily_online_info {

        /** Constructs a new c2s_copy_daily_online_info. */
        constructor();
    }

    /** Represents a c2s_copy_daily_online_get_reward. */
    class c2s_copy_daily_online_get_reward {

        /** Constructs a new c2s_copy_daily_online_get_reward. */
        constructor();

        /** 奖励编号 */
        public rewards: number[];
    }

    /** 删除活动 */
    class s2c_oper_act_delete {

        /** Constructs a new s2c_oper_act_delete. */
        constructor();

        /** s2c_oper_act_delete act_id. */
        public act_id: number;
    }

    /** Represents a s2c_oper_act_info. */
    class s2c_oper_act_info {

        /** Constructs a new s2c_oper_act_info. */
        constructor();

        /** s2c_oper_act_info act_list. */
        public act_list: msg.oper_act_item[];
    }

    /** Represents a s2c_oper_act_update. */
    class s2c_oper_act_update {

        /** Constructs a new s2c_oper_act_update. */
        constructor();

        /** s2c_oper_act_update act_list. */
        public act_list: msg.oper_act_item[];
    }

    /** Represents an oper_act_item. */
    class oper_act_item {

        /** Constructs a new oper_act_item. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 活动名称 */
        public name: string;

        /** 排序 */
        public sort_num: number;

        /** 活动类型 */
        public type: number;

        /** 是否独立图标 */
        public is_single_icon: boolean;

        /** 入口图标 */
        public entrance: string;

        /** 活动图标 */
        public icon: string;

        /** 活动横幅 */
        public banner: string;

        /** 描述 */
        public desc: string;

        /** 活动开始显示时间 */
        public c_begin_time: number;

        /** 活动结束显示时间 */
        public c_end_time: number;

        /** 真正活动开始 */
        public s_begin_time: number;

        /** 真正活动结束 */
        public s_end_time: number;

        /** 活动参数 */
        public param: number[];

        /** oper_act_item reward_list. */
        public reward_list: msg.act_reward[];

        /** 默认值1 活动子类型 用法:同样type的活动 需要不同的界面展示 用这个来区分 后端仅做转发 活动逻辑不变 */
        public typeson: number;
    }

    /** Represents an act_reward. */
    class act_reward {

        /** Constructs a new act_reward. */
        constructor();

        /** 奖励index */
        public index: number;

        /** 条件1 */
        public cond_1: number[];

        /** 条件2 */
        public cond_2: number[];

        /** 条件3 */
        public cond_3: number[];

        /** act_reward cond_4. */
        public cond_4: number[];

        /** 可领次数，缺省为不限次数 */
        public count: number;

        /** act_reward desc. */
        public desc: string;

        /** act_reward rewards. */
        public rewards: msg.prop_tips_data[];
    }

    /** Represents a s2c_oper_act_open. */
    class s2c_oper_act_open {

        /** Constructs a new s2c_oper_act_open. */
        constructor();

        /** s2c_oper_act_open act_id. */
        public act_id: number;
    }

    /** Represents a s2c_oper_act_close. */
    class s2c_oper_act_close {

        /** Constructs a new s2c_oper_act_close. */
        constructor();

        /** s2c_oper_act_close act_id. */
        public act_id: number;
    }

    /** 请求推送中控活动的某个活动数据 */
    class c2s_oper_act_get_info {

        /** Constructs a new c2s_oper_act_get_info. */
        constructor();

        /** c2s_oper_act_get_info act_id. */
        public act_id: number;

        /** 可选参数 */
        public params_1: number;
    }

    /** 特权卡结构体 */
    class privilege_card_info {

        /** Constructs a new privilege_card_info. */
        constructor();

        /** true:已买过周卡 ， false:没买 */
        public buy_week: boolean;

        /** true:已买过月卡 ， false:没买 */
        public buy_month: boolean;

        /** true:已买至尊卡 ， false:没买 */
        public buy_halo: boolean;

        /** 购买周卡的时间                      0:已过期或未购买 */
        public week_time: number;

        /** 购买月卡的时间                      0:已过期或未购买 */
        public month_time: number;

        /** true:已购买过一次周卡， false:没有购买过周卡  用来判断是否展示月卡及至尊卡 */
        public first_take: boolean;

        /** true:已领       ， false:没领       购买至尊卡后的每日领奖 */
        public day_halo: boolean;

        /** true:已领       ， false:没领       购买周卡后的每日领奖 */
        public un_week: boolean;

        /** true:已领       ， false:没领       购买月卡后的每日领奖 */
        public un_month: boolean;

        /** true:可购买打折月卡     false:不满足购买打折月卡 */
        public discount_month: boolean;

        /** 周卡延长天数 */
        public week_delay_day: number;

        /** privilege_card_info month_delay_day. */
        public month_delay_day: number;
    }

    /** Represents a c2s_privilege_card_info. */
    class c2s_privilege_card_info {

        /** Constructs a new c2s_privilege_card_info. */
        constructor();
    }

    /** Represents a s2c_privilege_card_info. */
    class s2c_privilege_card_info {

        /** Constructs a new s2c_privilege_card_info. */
        constructor();

        /** 特权卡购买信息 */
        public card_info?: (msg.privilege_card_info|null);
    }

    /** Represents a c2s_privilege_card_take_reward. */
    class c2s_privilege_card_take_reward {

        /** Constructs a new c2s_privilege_card_take_reward. */
        constructor();

        /** 1:周卡       2:月卡         3:至尊卡 */
        public card_flag: number;

        /** 领取奖励index */
        public index: number;
    }

    /** 购买周卡 */
    class c2s_privilege_card_buy_week {

        /** Constructs a new c2s_privilege_card_buy_week. */
        constructor();
    }

    /** 特权会员结构体 */
    class privilege_vip_info {

        /** Constructs a new privilege_vip_info. */
        constructor();

        /** bool buy_honor          = 1; /// true:已买过荣耀会员 ， false:没买 */
        public buy_extreme: boolean;

        /** 购买至尊会员的时间 0:已过期或未购买 */
        public extreme_time: number;

        /** 至尊会员的属性buff编号 */
        public extreme_buff_idx: number;

        /** privilege_vip_info extreme_delay_day. */
        public extreme_delay_day: number;
    }

    /** 查看会员特权信息 */
    class c2s_privilege_vip_info {

        /** Constructs a new c2s_privilege_vip_info. */
        constructor();
    }

    /** 返回会员信息 */
    class s2c_privilege_vip_info {

        /** Constructs a new s2c_privilege_vip_info. */
        constructor();

        /** 特权卡购买信息 */
        public vip_info?: (msg.privilege_vip_info|null);
    }

    /** 购买荣耀会员 */
    class c2s_privilege_buy_honor_vip {

        /** Constructs a new c2s_privilege_buy_honor_vip. */
        constructor();
    }

    /** 打包特权会员 */
    class s2c_tequan_pack_info {

        /** Constructs a new s2c_tequan_pack_info. */
        constructor();

        /** true:已买过会员 ， false:没买 */
        public buy_tequan_pack: boolean;

        /** 时间戳 */
        public buy_times: number;
    }

    /** 查看打包特权信息 */
    class c2s_tequan_pack_info {

        /** Constructs a new c2s_tequan_pack_info. */
        constructor();
    }

    /** Represents a def_item. */
    class def_item {

        /** Constructs a new def_item. */
        constructor();

        /** 编号 */
        public index: number;

        /** 状态 1:不可激活 2可激活 3已激活 */
        public status: number;

        /** 加的属性 */
        public attr?: (msg.attributes|null);
    }

    /** 仙玉转盘（y5金砖转盘)//////// */
    class gold_bar_record {

        /** Constructs a new gold_bar_record. */
        constructor();

        /** 名字 */
        public name: string;

        /** 档数 */
        public grade: number;

        /** 金条数量 */
        public cnt: number;
    }

    /** Represents a c2s_gold_bar_draw_info. */
    class c2s_gold_bar_draw_info {

        /** Constructs a new c2s_gold_bar_draw_info. */
        constructor();

        /** c2s_gold_bar_draw_info act_id. */
        public act_id: number;
    }

    /** Represents a s2c_gold_bar_draw_info. */
    class s2c_gold_bar_draw_info {

        /** Constructs a new s2c_gold_bar_draw_info. */
        constructor();

        /** s2c_gold_bar_draw_info act_id. */
        public act_id: number;

        /** 已充值金额 */
        public charged: number;

        /** 已经抽奖的次数 */
        public drawed: number;

        /** 抽奖记录 */
        public records: msg.gold_bar_record[];
    }

    /** Represents a c2s_gold_bar_draw_use. */
    class c2s_gold_bar_draw_use {

        /** Constructs a new c2s_gold_bar_draw_use. */
        constructor();

        /** c2s_gold_bar_draw_use act_id. */
        public act_id: number;
    }

    /** Represents a s2c_gold_bar_draw_use. */
    class s2c_gold_bar_draw_use {

        /** Constructs a new s2c_gold_bar_draw_use. */
        constructor();

        /** s2c_gold_bar_draw_use act_id. */
        public act_id: number;

        /** 已经抽奖的次数 */
        public drawed: number;

        /** 档次 */
        public grade: number;
    }

    /** Represents a c2s_gold_bar_receive. */
    class c2s_gold_bar_receive {

        /** Constructs a new c2s_gold_bar_receive. */
        constructor();

        /** c2s_gold_bar_receive act_id. */
        public act_id: number;
    }

    /** Represents a c2s_task_active_shenbin. */
    class c2s_task_active_shenbin {

        /** Constructs a new c2s_task_active_shenbin. */
        constructor();
    }

    /** Represents a c2s_king_bank_info. */
    class c2s_king_bank_info {

        /** Constructs a new c2s_king_bank_info. */
        constructor();

        /** c2s_king_bank_info act_id. */
        public act_id: number;
    }

    /** Represents a c2s_king_bank_invest. */
    class c2s_king_bank_invest {

        /** Constructs a new c2s_king_bank_invest. */
        constructor();

        /** c2s_king_bank_invest act_id. */
        public act_id: number;
    }

    /** Represents a c2s_king_bank_reward. */
    class c2s_king_bank_reward {

        /** Constructs a new c2s_king_bank_reward. */
        constructor();

        /** c2s_king_bank_reward act_id. */
        public act_id: number;

        /** c2s_king_bank_reward index. */
        public index: number;
    }

    /** Represents a s2c_king_bank_info. */
    class s2c_king_bank_info {

        /** Constructs a new s2c_king_bank_info. */
        constructor();

        /** s2c_king_bank_info act_id. */
        public act_id: number;

        /** 是否符合投资条件 */
        public can_invest: number;

        /** 0表示未投资 大于0表示投资的时间戳 */
        public invest_timestamp: number;

        /** 已领取的奖励index */
        public rewarded: number[];
    }

    /** Represents a c2s_super_bank_info. */
    class c2s_super_bank_info {

        /** Constructs a new c2s_super_bank_info. */
        constructor();

        /** c2s_super_bank_info act_id. */
        public act_id: number;
    }

    /** Represents a c2s_super_bank_invest. */
    class c2s_super_bank_invest {

        /** Constructs a new c2s_super_bank_invest. */
        constructor();

        /** c2s_super_bank_invest act_id. */
        public act_id: number;
    }

    /** Represents a c2s_super_bank_reward. */
    class c2s_super_bank_reward {

        /** Constructs a new c2s_super_bank_reward. */
        constructor();

        /** c2s_super_bank_reward act_id. */
        public act_id: number;

        /** c2s_super_bank_reward index. */
        public index: number;
    }

    /** Represents a s2c_super_bank_info. */
    class s2c_super_bank_info {

        /** Constructs a new s2c_super_bank_info. */
        constructor();

        /** s2c_super_bank_info act_id. */
        public act_id: number;

        /** 是否符合投资条件 */
        public can_invest: number;

        /** 0表示未投资 大于0表示投资的时间戳 */
        public invest_timestamp: number;

        /** 已领取的奖励index */
        public rewarded: number[];
    }

    /** 请求限时活动 */
    class c2s_limit_act_open_ui {

        /** Constructs a new c2s_limit_act_open_ui. */
        constructor();
    }

    /** 上线后会发当天的全部活动 */
    class s2c_limit_act_info {

        /** Constructs a new s2c_limit_act_info. */
        constructor();

        /** 1开始的  2缺省删除  3缺省增加 */
        public oper: number;

        /** s2c_limit_act_info indexs. */
        public indexs: number[];
    }

    /** Represents a celebration_record. */
    class celebration_record {

        /** Constructs a new celebration_record. */
        constructor();

        /** 名字 */
        public name: string;

        /** 抽到的道具idx */
        public idx: number;

        /** 道具数量 */
        public cnt: number;
    }

    /** 新服主题寻宝/////////////////// */
    class ctrl_find_treasure {

        /** Constructs a new ctrl_find_treasure. */
        constructor();

        /** 活动奖励 reward_list下的每一组 index */
        public idx: number;

        /** true已领取，false 未领取 */
        public is_taken: boolean;
    }

    /** 点击抽奖 */
    class c2s_theme_find_treasure_use {

        /** Constructs a new c2s_theme_find_treasure_use. */
        constructor();

        /** 活动标志 */
        public act_id: number;

        /** 抽取次数 1 - 12        普通抽取发 1 */
        public batch_cnt: number;
    }

    /** Represents a c2s_theme_find_treasure_info. */
    class c2s_theme_find_treasure_info {

        /** Constructs a new c2s_theme_find_treasure_info. */
        constructor();

        /** 活动标志 */
        public act_id: number;
    }

    /** Represents a s2c_theme_find_treasure_info. */
    class s2c_theme_find_treasure_info {

        /** Constructs a new s2c_theme_find_treasure_info. */
        constructor();

        /** 活动标志 */
        public act_id: number;

        /** 可抽奖次数 */
        public cnt: number;

        /** 转盘信息 展示道具 全发 */
        public show: msg.ctrl_find_treasure[];

        /** 已充值/使用 数量            ///会缺省，涨进度时才发 */
        public schedule: number;

        /** 阈值                        ///会缺省，涨进度时才发 */
        public limit: number;

        /** 奖励道P具 reward_list下的每一组 index */
        public reward_idxs: number[];

        /** 抽奖记录 */
        public record: msg.celebration_record[];
    }

    /** Represents a c2s_theme_find_treasure_record. */
    class c2s_theme_find_treasure_record {

        /** Constructs a new c2s_theme_find_treasure_record. */
        constructor();

        /** 活动标志 */
        public act_id: number;
    }

    /** Represents a c2s_sum_charge_info. */
    class c2s_sum_charge_info {

        /** Constructs a new c2s_sum_charge_info. */
        constructor();

        /** c2s_sum_charge_info act_id. */
        public act_id: number;
    }

    /** Represents a c2s_sum_charge_reward. */
    class c2s_sum_charge_reward {

        /** Constructs a new c2s_sum_charge_reward. */
        constructor();

        /** c2s_sum_charge_reward act_id. */
        public act_id: number;

        /** c2s_sum_charge_reward index. */
        public index: number;
    }

    /** Represents a s2c_sum_charge_info. */
    class s2c_sum_charge_info {

        /** Constructs a new s2c_sum_charge_info. */
        constructor();

        /** s2c_sum_charge_info act_id. */
        public act_id: number;

        /** 累计充值数 */
        public schedule: number;

        /** 已领取的奖励index */
        public rewarded: number[];
    }

    /** Represents a c2s_single_charge_info. */
    class c2s_single_charge_info {

        /** Constructs a new c2s_single_charge_info. */
        constructor();

        /** c2s_single_charge_info act_id. */
        public act_id: number;
    }

    /** Represents a c2s_single_charge_reward. */
    class c2s_single_charge_reward {

        /** Constructs a new c2s_single_charge_reward. */
        constructor();

        /** c2s_single_charge_reward act_id. */
        public act_id: number;

        /** c2s_single_charge_reward index. */
        public index: number;
    }

    /** Represents a s2c_single_charge_info. */
    class s2c_single_charge_info {

        /** Constructs a new s2c_single_charge_info. */
        constructor();

        /** s2c_single_charge_info act_id. */
        public act_id: number;

        /** 领取状态列表 */
        public rewarded: msg.sc_reward_item[];
    }

    /** Represents a sc_reward_item. */
    class sc_reward_item {

        /** Constructs a new sc_reward_item. */
        constructor();

        /** sc_reward_item index. */
        public index: number;

        /** 本档位充值次数 */
        public schedule: number;

        /** 已领奖次数 */
        public rewarded: number;
    }

    /** Represents a c2s_sum_consume_info. */
    class c2s_sum_consume_info {

        /** Constructs a new c2s_sum_consume_info. */
        constructor();

        /** c2s_sum_consume_info act_id. */
        public act_id: number;
    }

    /** Represents a s2c_sum_consume_info. */
    class s2c_sum_consume_info {

        /** Constructs a new s2c_sum_consume_info. */
        constructor();

        /** s2c_sum_consume_info act_id. */
        public act_id: number;

        /** 今日消耗金额 */
        public consume: number;

        /** 已领取奖励(数组) */
        public received: number[];
    }

    /** 领取活动奖励 */
    class c2s_sum_consume_reward {

        /** Constructs a new c2s_sum_consume_reward. */
        constructor();

        /** c2s_sum_consume_reward act_id. */
        public act_id: number;

        /** 奖励编号 */
        public reward_idx: number;
    }

    /** 签到信息 */
    class s2c_sign_info {

        /** Constructs a new s2c_sign_info. */
        constructor();

        /** s2c_sign_info list. */
        public list: number[];

        /** s2c_sign_info index. */
        public index: number;

        /** s2c_sign_info count. */
        public count: number;
    }

    /** 签到 */
    class c2s_sign {

        /** Constructs a new c2s_sign. */
        constructor();

        /** c2s_sign index. */
        public index: number;
    }

    /** 领取福利礼包 */
    class c2s_rec_welfare_bag {

        /** Constructs a new c2s_rec_welfare_bag. */
        constructor();

        /** c2s_rec_welfare_bag key. */
        public key: string;
    }

    /** 查看数据 */
    class c2s_crowdfunding_get_info {

        /** Constructs a new c2s_crowdfunding_get_info. */
        constructor();

        /** 活动id */
        public act_id: number;
    }

    /** 购买礼包的数据 */
    class crowdfunding_buy_gift {

        /** Constructs a new crowdfunding_buy_gift. */
        constructor();

        /** 礼包编号 */
        public index: number;

        /** 限购数量 */
        public limit_cnt: number;

        /** 已购数量 */
        public bought_cnt: number;
    }

    /** 奖励礼包（普天同庆、阳光普照） */
    class crowdfunding_reward_gift {

        /** Constructs a new crowdfunding_reward_gift. */
        constructor();

        /** 礼包编号 */
        public index: number;

        /** 0未领取  1已领取 */
        public received: number;
    }

    /** Represents a s2c_crowdfunding_get_info. */
    class s2c_crowdfunding_get_info {

        /** Constructs a new s2c_crowdfunding_get_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 礼包 */
        public buy_gifts: msg.crowdfunding_buy_gift[];

        /** 奖励礼包 */
        public reward_gifts: msg.crowdfunding_reward_gift[];

        /** 全服购买次数 */
        public buy_cnt: number;

        /** 最大团购次数 */
        public buy_cond: number;

        /** 活动期间是否充值任意金条 */
        public charged: boolean;

        /** 活动期间是否购买任意众筹礼包 */
        public bouhgt_gift: boolean;

        /** 活动期间是否购买任意至尊礼包 */
        public bouhgt_vip_gift: boolean;

        /** 1全部数据  2缺省 */
        public oper: number;
    }

    /** 购买礼包 crowdfunding_buy_gift */
    class c2s_crowdfunding_buy {

        /** Constructs a new c2s_crowdfunding_buy. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 礼包编号 */
        public index: number;
    }

    /** 领取 crowdfunding_reward_gift */
    class c2s_crowdfunding_get_reward {

        /** Constructs a new c2s_crowdfunding_get_reward. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 礼包编号 */
        public index: number;
    }

    /** 查看数据 */
    class c2s_rushpurchase_get_info {

        /** Constructs a new c2s_rushpurchase_get_info. */
        constructor();

        /** 活动id */
        public act_id: number;
    }

    /** 商品数据 */
    class rushpurchase_goods {

        /** Constructs a new rushpurchase_goods. */
        constructor();

        /** 道具index */
        public prop_idx: number;

        /** 服务器剩余数量 */
        public prop_cnt: number;

        /** 玩家个人限购数量 */
        public limit_cnt: number;

        /** 玩家个人已购数量 */
        public bought_cnt: number;

        /** 用什么货币购买 */
        public buy_prop_idx: number;

        /** 价格 */
        public price: number;

        /** 商品序号 */
        public good_index: number;

        /** 购买的道具数量 */
        public prop_buy_cnt: number;
    }

    /** 秒杀场次 */
    class rushpurchase {

        /** Constructs a new rushpurchase. */
        constructor();

        /** 场次编号 */
        public index: number;

        /** rushpurchase start_hour. */
        public start_hour: number;

        /** rushpurchase start_min. */
        public start_min: number;

        /** rushpurchase end_min. */
        public end_min: number;

        /** rushpurchase end_hour. */
        public end_hour: number;

        /** 商品 */
        public goods: msg.rushpurchase_goods[];
    }

    /** Represents a s2c_rushpurchase_get_info. */
    class s2c_rushpurchase_get_info {

        /** Constructs a new s2c_rushpurchase_get_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 场次 */
        public acts: msg.rushpurchase[];
    }

    /** 购买商品  购买成功返回 s2c_rushpurchase_get_info 更新对应的一个 rushpurchase */
    class c2s_rushpurchase_buy {

        /** Constructs a new c2s_rushpurchase_buy. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 场次编号 */
        public index: number;

        /** 商品序号 1、2、3…… */
        public good_index: number;
    }

    /** 请求排行榜数据 */
    class c2s_theme_rush_rank_info {

        /** Constructs a new c2s_theme_rush_rank_info. */
        constructor();

        /** 活动id */
        public act_id: number;
    }

    /** Represents a theme_rush_rank_data. */
    class theme_rush_rank_data {

        /** Constructs a new theme_rush_rank_data. */
        constructor();

        /** 性别 */
        public sex: number;

        /** 姓名 */
        public name: string;

        /** 头像 */
        public head: number;

        /** theme_rush_rank_data agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 羽翼 */
        public wings: number;

        /** 神兵 */
        public weapon: number;

        /** 时装 */
        public fashion: number;

        /** 角色名 */
        public role_id: Long;

        /** 年龄 */
        public age_type: number;

        /** 玩家模块战力 */
        public showpower: Long;

        /** 头像框 */
        public head_frame: number;

        /** 帮派名 */
        public guild_team_name: string;
    }

    /** Represents a s2c_theme_rush_rank_info. */
    class s2c_theme_rush_rank_info {

        /** Constructs a new s2c_theme_rush_rank_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 自己该模块的战力 */
        public showpower: Long;

        /** 自己名次 */
        public myself_rank_no: number;

        /** 榜单 */
        public rank_list: msg.theme_rush_rank_data[];
    }

    /** 请求消费排行榜数据 */
    class c2s_theme_consume_rank_info {

        /** Constructs a new c2s_theme_consume_rank_info. */
        constructor();

        /** 活动id */
        public act_id: number;
    }

    /** Represents a theme_consume_rank_data. */
    class theme_consume_rank_data {

        /** Constructs a new theme_consume_rank_data. */
        constructor();

        /** 性别 */
        public sex: number;

        /** 姓名 */
        public name: string;

        /** 头像 */
        public head: number;

        /** theme_consume_rank_data agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 羽翼 */
        public wings: number;

        /** 神兵 */
        public weapon: number;

        /** 时装 */
        public fashion: number;

        /** 角色名 */
        public role_id: Long;

        /** 年龄 */
        public age_type: number;

        /** 玩家消费 */
        public showconsume: Long;

        /** 玩家模块战力 */
        public showpower: Long;

        /** 头像框 */
        public head_frame: number;

        /** 帮派名 */
        public guild_team_name: string;
    }

    /** Represents a s2c_theme_consume_rank_info. */
    class s2c_theme_consume_rank_info {

        /** Constructs a new s2c_theme_consume_rank_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 自己的消费 */
        public consume: Long;

        /** 自己名次 */
        public myself_rank_no: number;

        /** 榜单 */
        public rank_list: msg.theme_consume_rank_data[];
    }

    /** 主题领取信息请求 */
    class c2s_rebate_get_info {

        /** Constructs a new c2s_rebate_get_info. */
        constructor();

        /** 活动id */
        public act_id: number;
    }

    /** Represents a rebate_receive_info. */
    class rebate_receive_info {

        /** Constructs a new rebate_receive_info. */
        constructor();

        /** 序号 */
        public index: number;

        /** 已领取次数 */
        public received_cnt: number;
    }

    /** Represents a s2c_rebate_get_info. */
    class s2c_rebate_get_info {

        /** Constructs a new s2c_rebate_get_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 主题领取信息列表 */
        public receive_list: msg.rebate_receive_info[];

        /** 我的主题战力 */
        public showpower: Long;
    }

    /** 领取奖励 */
    class c2s_rebate_receive_reward {

        /** Constructs a new c2s_rebate_receive_reward. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 领取序号 */
        public index: number;
    }

    /** Represents a c2s_theme_discount_store_info. */
    class c2s_theme_discount_store_info {

        /** Constructs a new c2s_theme_discount_store_info. */
        constructor();

        /** 活动标志 */
        public act_id: number;
    }

    /** Represents a s2c_theme_discount_store_info. */
    class s2c_theme_discount_store_info {

        /** Constructs a new s2c_theme_discount_store_info. */
        constructor();

        /** 活动标志 */
        public act_id: number;

        /** 玩家剩余购买次数 */
        public role_cnt: number;

        /** 全服剩余数量 */
        public server_cnt: number;
    }

    /** 点击购买 */
    class c2s_theme_discount_store_use {

        /** Constructs a new c2s_theme_discount_store_use. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 购买数量 */
        public buy_cnt: number;
    }

    /** 充值豪礼结构体 */
    class ctrl_charge_gifts_reward {

        /** Constructs a new ctrl_charge_gifts_reward. */
        constructor();

        /** 活动奖励idx */
        public index: number;

        /** 可缺省，缺省：没领    1：已领 */
        public state: number;
    }

    /** 请求充值豪礼信息 */
    class c2s_ctrl_charge_gifts_info {

        /** Constructs a new c2s_ctrl_charge_gifts_info. */
        constructor();

        /** c2s_ctrl_charge_gifts_info act_id. */
        public act_id: number;
    }

    /** 充值豪礼信息 */
    class s2c_ctrl_charge_gifts_info {

        /** Constructs a new s2c_ctrl_charge_gifts_info. */
        constructor();

        /** s2c_ctrl_charge_gifts_info act_id. */
        public act_id: number;

        /** s2c_ctrl_charge_gifts_info total_charge. */
        public total_charge: number;

        /** s2c_ctrl_charge_gifts_info receiveds. */
        public receiveds: msg.ctrl_charge_gifts_reward[];
    }

    /** 充值豪礼领取奖励 */
    class c2s_ctrl_charge_gifts_get_reward {

        /** Constructs a new c2s_ctrl_charge_gifts_get_reward. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 活动奖励idx */
        public index: number;
    }

    /** 更新豪礼领取信息 */
    class s2c_ctrl_charge_gifts_update {

        /** Constructs a new s2c_ctrl_charge_gifts_update. */
        constructor();

        /** s2c_ctrl_charge_gifts_update act_id. */
        public act_id: number;

        /** s2c_ctrl_charge_gifts_update total_charge. */
        public total_charge: number;

        /** s2c_ctrl_charge_gifts_update received. */
        public received?: (msg.ctrl_charge_gifts_reward|null);
    }

    /** 消费豪礼结构体 */
    class ctrl_cost_charge_reward {

        /** Constructs a new ctrl_cost_charge_reward. */
        constructor();

        /** 活动奖励idx */
        public index: number;

        /** 可缺省，缺省：没领    1：已领 */
        public state: number;
    }

    /** 请求消费豪礼信息 */
    class c2s_ctrl_cost_charge_info {

        /** Constructs a new c2s_ctrl_cost_charge_info. */
        constructor();

        /** c2s_ctrl_cost_charge_info act_id. */
        public act_id: number;
    }

    /** 消费豪礼信息 */
    class s2c_ctrl_cost_charge_info {

        /** Constructs a new s2c_ctrl_cost_charge_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 已消耗仙玉数目 */
        public diamond_charge: number;

        /** 已消耗元宝数目 */
        public gold_charge: number;

        /** s2c_ctrl_cost_charge_info receiveds. */
        public receiveds: msg.ctrl_cost_charge_reward[];
    }

    /** 消费豪礼领取奖励 */
    class c2s_ctrl_cost_charge_get_reward {

        /** Constructs a new c2s_ctrl_cost_charge_get_reward. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 活动奖励idx */
        public index: number;
    }

    /** 更新消费豪礼领取信息 */
    class s2c_ctrl_cost_charge_update {

        /** Constructs a new s2c_ctrl_cost_charge_update. */
        constructor();

        /** s2c_ctrl_cost_charge_update act_id. */
        public act_id: number;

        /** s2c_ctrl_cost_charge_update received. */
        public received?: (msg.ctrl_cost_charge_reward|null);
    }

    /** 限时折扣结构体 */
    class ctrl_limit_discount_reward {

        /** Constructs a new ctrl_limit_discount_reward. */
        constructor();

        /** 商品idx */
        public index: number;

        /** 已经购买过的次数 */
        public buy_count: number;
    }

    /** 请求限时折扣信息 */
    class c2s_ctrl_limit_discount_info {

        /** Constructs a new c2s_ctrl_limit_discount_info. */
        constructor();

        /** c2s_ctrl_limit_discount_info act_id. */
        public act_id: number;
    }

    /** 限时折扣信息 */
    class s2c_ctrl_limit_discount_info {

        /** Constructs a new s2c_ctrl_limit_discount_info. */
        constructor();

        /** s2c_ctrl_limit_discount_info act_id. */
        public act_id: number;

        /** s2c_ctrl_limit_discount_info receiveds. */
        public receiveds: msg.ctrl_limit_discount_reward[];
    }

    /** 限时折扣购买物品 */
    class c2s_ctrl_limit_discount_get_reward {

        /** Constructs a new c2s_ctrl_limit_discount_get_reward. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 商品idx */
        public index: number;

        /** 购买数量 */
        public buy_cnt: number;
    }

    /** 更新限时折扣领取信息 */
    class s2c_ctrl_limit_discount_update {

        /** Constructs a new s2c_ctrl_limit_discount_update. */
        constructor();

        /** s2c_ctrl_limit_discount_update act_id. */
        public act_id: number;

        /** s2c_ctrl_limit_discount_update received. */
        public received?: (msg.ctrl_limit_discount_reward|null);
    }

    /** Represents a c2s_sum_charge_extreme_info. */
    class c2s_sum_charge_extreme_info {

        /** Constructs a new c2s_sum_charge_extreme_info. */
        constructor();

        /** c2s_sum_charge_extreme_info act_id. */
        public act_id: number;
    }

    /** Represents a c2s_sum_charge_extreme_reward. */
    class c2s_sum_charge_extreme_reward {

        /** Constructs a new c2s_sum_charge_extreme_reward. */
        constructor();

        /** c2s_sum_charge_extreme_reward act_id. */
        public act_id: number;

        /** c2s_sum_charge_extreme_reward index. */
        public index: number;
    }

    /** Represents a s2c_sum_charge_extreme_info. */
    class s2c_sum_charge_extreme_info {

        /** Constructs a new s2c_sum_charge_extreme_info. */
        constructor();

        /** s2c_sum_charge_extreme_info act_id. */
        public act_id: number;

        /** 累计充值数 */
        public schedule: number;

        /** 已领取的奖励index */
        public rewarded: number[];
    }

    /** 尊享福利结构体 */
    class ctrl_enjoy_welfare_reward {

        /** Constructs a new ctrl_enjoy_welfare_reward. */
        constructor();

        /** 活动奖励idx */
        public index: number;

        /** 可缺省，缺省：没领    1：已领 */
        public state: number;
    }

    /** 请求尊享福利信息 */
    class c2s_ctrl_enjoy_welfare_info {

        /** Constructs a new c2s_ctrl_enjoy_welfare_info. */
        constructor();

        /** c2s_ctrl_enjoy_welfare_info act_id. */
        public act_id: number;
    }

    /** 尊享福利信息 */
    class s2c_ctrl_enjoy_welfare_info {

        /** Constructs a new s2c_ctrl_enjoy_welfare_info. */
        constructor();

        /** s2c_ctrl_enjoy_welfare_info act_id. */
        public act_id: number;

        /** 充值天数 */
        public charge_day: number;

        /** 消费天数 */
        public cost_day: number;

        /** 当天充值金额 */
        public charge_num: number;

        /** 当天消费金额 */
        public cost_num: number;

        /** s2c_ctrl_enjoy_welfare_info receiveds. */
        public receiveds: msg.ctrl_enjoy_welfare_reward[];
    }

    /** 尊享福利领取奖励 */
    class c2s_ctrl_enjoy_welfare_get_reward {

        /** Constructs a new c2s_ctrl_enjoy_welfare_get_reward. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 活动奖励idx */
        public index: number;
    }

    /** 更新尊享福利领取信息 */
    class s2c_ctrl_enjoy_welfare_update {

        /** Constructs a new s2c_ctrl_enjoy_welfare_update. */
        constructor();

        /** s2c_ctrl_enjoy_welfare_update act_id. */
        public act_id: number;

        /** s2c_ctrl_enjoy_welfare_update received. */
        public received?: (msg.ctrl_enjoy_welfare_reward|null);
    }

    /** Represents a sz_draw_store. */
    class sz_draw_store {

        /** Constructs a new sz_draw_store. */
        constructor();

        /** 道具index */
        public idx: number;

        /** 道具cnt */
        public cnt: number;

        /** 用于标识的数字, 装备才发,对于后端而言是索引 */
        public store_id: number;

        /** 仓库类型 1-普通 2-折扣卷 */
        public type: number;

        /** 外显index */
        public sys_index: number;
    }

    /** 装备夺宝(原Y5 古墓寻宝) /////////// */
    class c2s_tomb_draw_request {

        /** Constructs a new c2s_tomb_draw_request. */
        constructor();
    }

    /** Represents a s2c_tomb_draw_info. */
    class s2c_tomb_draw_info {

        /** Constructs a new s2c_tomb_draw_info. */
        constructor();

        /** 夺宝信息 */
        public info?: (msg.sz_draw_info|null);
    }

    /** 抽奖 */
    class c2s_tomb_draw_search {

        /** Constructs a new c2s_tomb_draw_search. */
        constructor();

        /** 1: 1次（免费）    2: 10次     3: 50次 */
        public type: number;
    }

    /** Represents a s2c_tomb_draw_search. */
    class s2c_tomb_draw_search {

        /** Constructs a new s2c_tomb_draw_search. */
        constructor();

        /** s2c_tomb_draw_search info. */
        public info?: (msg.sz_draw_info|null);

        /** 抽取道具列表 */
        public reward: msg.sz_prop_tips_data[];
    }

    /** 仓库请求信息 */
    class c2s_tomb_draw_storehouse_info {

        /** Constructs a new c2s_tomb_draw_storehouse_info. */
        constructor();

        /** 1:请求信息    2:全部取出 */
        public operate: number;
    }

    /** Represents a s2c_tomb_draw_storehouse_info. */
    class s2c_tomb_draw_storehouse_info {

        /** Constructs a new s2c_tomb_draw_storehouse_info. */
        constructor();

        /** 仓库道具 */
        public reward: msg.sz_draw_store[];
    }

    /** Represents a sz_prop_tips_data. */
    class sz_prop_tips_data {

        /** Constructs a new sz_prop_tips_data. */
        constructor();

        /** sz_prop_tips_data idx. */
        public idx: number;

        /** sz_prop_tips_data cnt. */
        public cnt: number;

        /** 稀有道具 [是]:true, [不是]:不发该字段 */
        public is_rare: boolean;
    }

    /** Represents a sz_draw_info. */
    class sz_draw_info {

        /** Constructs a new sz_draw_info. */
        constructor();

        /** 可免费使用次数 */
        public can_free: number;

        /** 已抽奖次数 */
        public use: number;

        /** 50连 true[首次]   该字段不发表示[非首次] */
        public is_first: boolean;

        /** 已有积分  --兑换成功的情况只返回该字段 */
        public score: number;

        /** 寻宝记录 */
        public record: msg.celebration_record[];
    }

    /** 异火夺宝 /////////// */
    class c2s_yihuo_draw_request {

        /** Constructs a new c2s_yihuo_draw_request. */
        constructor();
    }

    /** Represents a s2c_yihuo_draw_info. */
    class s2c_yihuo_draw_info {

        /** Constructs a new s2c_yihuo_draw_info. */
        constructor();

        /** 夺宝信息 */
        public info?: (msg.sz_draw_info|null);
    }

    /** 抽奖 */
    class c2s_yihuo_draw_search {

        /** Constructs a new c2s_yihuo_draw_search. */
        constructor();

        /** 1: 1次（免费）    2: 10次     3: 50次 */
        public type: number;
    }

    /** Represents a s2c_yihuo_draw_search. */
    class s2c_yihuo_draw_search {

        /** Constructs a new s2c_yihuo_draw_search. */
        constructor();

        /** s2c_yihuo_draw_search info. */
        public info?: (msg.sz_draw_info|null);

        /** 抽取道具列表 */
        public reward: msg.sz_prop_tips_data[];
    }

    /** 仓库请求信息 */
    class c2s_yihuo_draw_storehouse_info {

        /** Constructs a new c2s_yihuo_draw_storehouse_info. */
        constructor();

        /** 1:请求信息    2:全部取出 */
        public operate: number;
    }

    /** Represents a s2c_yihuo_draw_storehouse_info. */
    class s2c_yihuo_draw_storehouse_info {

        /** Constructs a new s2c_yihuo_draw_storehouse_info. */
        constructor();

        /** 仓库道具 */
        public reward: msg.sz_draw_store[];
    }

    /** Represents a c2s_ctrl_reincarnate_charge_info. */
    class c2s_ctrl_reincarnate_charge_info {

        /** Constructs a new c2s_ctrl_reincarnate_charge_info. */
        constructor();

        /** c2s_ctrl_reincarnate_charge_info act_id. */
        public act_id: number;
    }

    /** Represents a s2c_ctrl_reincarnate_charge_info. */
    class s2c_ctrl_reincarnate_charge_info {

        /** Constructs a new s2c_ctrl_reincarnate_charge_info. */
        constructor();

        /** s2c_ctrl_reincarnate_charge_info act_id. */
        public act_id: number;

        /** 2缺省 */
        public oper: number;

        /** true 可领取充值奖励 */
        public is_charge: boolean;

        /** 普通奖励 已领取 */
        public normal_receiveds: number[];

        /** 充值奖励 已领取 */
        public charge_receiveds: number[];
    }

    /** Represents a c2s_ctrl_reincarnate_charge_get_reward. */
    class c2s_ctrl_reincarnate_charge_get_reward {

        /** Constructs a new c2s_ctrl_reincarnate_charge_get_reward. */
        constructor();

        /** c2s_ctrl_reincarnate_charge_get_reward act_id. */
        public act_id: number;

        /** c2s_ctrl_reincarnate_charge_get_reward index. */
        public index: number;
    }

    /** Represents a c2s_million_gold_gift_info. */
    class c2s_million_gold_gift_info {

        /** Constructs a new c2s_million_gold_gift_info. */
        constructor();

        /** c2s_million_gold_gift_info act_id. */
        public act_id: number;
    }

    /** Represents a c2s_million_gold_gift_reward. */
    class c2s_million_gold_gift_reward {

        /** Constructs a new c2s_million_gold_gift_reward. */
        constructor();

        /** c2s_million_gold_gift_reward act_id. */
        public act_id: number;
    }

    /** Represents a s2c_million_gold_gift_info. */
    class s2c_million_gold_gift_info {

        /** Constructs a new s2c_million_gold_gift_info. */
        constructor();

        /** s2c_million_gold_gift_info act_id. */
        public act_id: number;

        /** 累计充值数 */
        public schedule: number;

        /** 已领取的返利数 */
        public received: number;
    }

    /** Represents a c2s_red_award_info. */
    class c2s_red_award_info {

        /** Constructs a new c2s_red_award_info. */
        constructor();
    }

    /** Represents a c2s_red_award_get_reward. */
    class c2s_red_award_get_reward {

        /** Constructs a new c2s_red_award_get_reward. */
        constructor();

        /** 奖励编号 */
        public index: number;
    }

    /** Represents a s2c_red_award_info. */
    class s2c_red_award_info {

        /** Constructs a new s2c_red_award_info. */
        constructor();

        /** 1:全部 2:缺省 */
        public oper: number;

        /** 特权卡开通状态 */
        public card: boolean;

        /** 已领取奖励 */
        public received: number[];
    }

    /** 客户端请求协议 */
    class c2s_daily_gift_info {

        /** Constructs a new c2s_daily_gift_info. */
        constructor();
    }

    /** Represents a c2s_daily_gift_get_reward. */
    class c2s_daily_gift_get_reward {

        /** Constructs a new c2s_daily_gift_get_reward. */
        constructor();

        /** 礼包index */
        public idx: number;
    }

    /** Represents a daily_gift. */
    class daily_gift {

        /** Constructs a new daily_gift. */
        constructor();

        /** 礼包index */
        public idx: number;

        /** 0:没有购买   1：可领取  2:已领取 */
        public states: number;
    }

    /** Represents a s2c_daily_gift_info. */
    class s2c_daily_gift_info {

        /** Constructs a new s2c_daily_gift_info. */
        constructor();

        /** s2c_daily_gift_info info. */
        public info: msg.daily_gift[];

        /** 七天打包购买倒计时 */
        public seven_times: number;

        /** 0可领取 1领取、 */
        public free_gift: number;
    }

    /** Represents a s2c_daily_gift_is_open. */
    class s2c_daily_gift_is_open {

        /** Constructs a new s2c_daily_gift_is_open. */
        constructor();

        /** 1表示未开启  2表示开启 */
        public is_open: number;
    }

    /** 客户端请求领取每日免费礼包 */
    class c2s_get_daily_free_gift {

        /** Constructs a new c2s_get_daily_free_gift. */
        constructor();
    }

    /** 领取奖励 */
    class c2s_new_qiankun_drwa {

        /** Constructs a new c2s_new_qiankun_drwa. */
        constructor();

        /** 1 领取取单个 2 一键领取 */
        public drwa_type: number;
    }

    /** 激活乾坤袋 */
    class c2s_new_qiankun_active {

        /** Constructs a new c2s_new_qiankun_active. */
        constructor();
    }

    /** 请求面板 */
    class c2s_new_qiankun_ui_req {

        /** Constructs a new c2s_new_qiankun_ui_req. */
        constructor();
    }

    /** 面板信息 */
    class s2c_new_qiankun_ui {

        /** Constructs a new s2c_new_qiankun_ui. */
        constructor();

        /** 0否1是 购买 */
        public is_buy: number;

        /** 当前关卡 （已挑战过） */
        public cur_mainline_index: number;

        /** 已领取列表 */
        public index: number[];
    }

    /** 通知客户端开启活动 */
    class s2c_direct_buy_info {

        /** Constructs a new s2c_direct_buy_info. */
        constructor();

        /** s2c_direct_buy_info infos. */
        public infos: msg.direct_buy_item[];
    }

    /** 直购礼包结构体 */
    class direct_buy_item {

        /** Constructs a new direct_buy_item. */
        constructor();

        /** 商品编号 */
        public product_id: number;

        /** 是否已领取 */
        public received: boolean;

        /** 是否可领取 */
        public can_received: boolean;

        /** 结束时间戳 */
        public end_time: number;

        /** direct_buy_item buy_times. */
        public buy_times: number;
    }

    /** 领取奖励 */
    class c2s_direct_buy_reward {

        /** Constructs a new c2s_direct_buy_reward. */
        constructor();

        /** 商品编号 */
        public product_id: number;
    }

    /** Represents a s2c_require_open_bags. */
    class s2c_require_open_bags {

        /** Constructs a new s2c_require_open_bags. */
        constructor();

        /** s2c_require_open_bags bag_type. */
        public bag_type: number;
    }

    /** 打开神位UI */
    class c2s_open_throne_ui {

        /** Constructs a new c2s_open_throne_ui. */
        constructor();
    }

    /** Represents a role_message. */
    class role_message {

        /** Constructs a new role_message. */
        constructor();

        /** 排名 */
        public rank_no: number;

        /** 名字 */
        public name: string;

        /** 等级 */
        public level: number;

        /** 战力 */
        public showpower: Long;

        /** 头像 */
        public head: number;

        /** role_message agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 头像等级 */
        public head_lv: number;

        /** 头像框 */
        public head_frame: number;

        /** 头像框等级 */
        public head_frame_lv: number;

        /** 时装 */
        public fashion: number;

        /** 神兵 */
        public weapon: number;

        /** 羽翼 */
        public wings: number;

        /** 性别 */
        public sex: number;

        /** 1:少年 2:成年 */
        public age_type: number;

        /** 角色ID */
        public role_id: Long;

        /** 积分 */
        public point: Long;
    }

    /** Represents a throne. */
    class throne {

        /** Constructs a new throne. */
        constructor();

        /** 编号 */
        public index: number;

        /** 积分 */
        public point: number;
    }

    /** 返回神位UI */
    class s2c_open_throne_ui {

        /** Constructs a new s2c_open_throne_ui. */
        constructor();

        /** 我的排名 */
        public my_rank: number;

        /** 我的积分 */
        public my_point: number;

        /** 积分排名 */
        public rank: msg.role_message[];

        /** 我的积分具体来源 */
        public source: msg.throne[];
    }

    /** Represents a c2s_gods_relics_info. */
    class c2s_gods_relics_info {

        /** Constructs a new c2s_gods_relics_info. */
        constructor();
    }

    /** 每日首充///////////////// */
    class c2s_daily_first_charge_reward {

        /** Constructs a new c2s_daily_first_charge_reward. */
        constructor();
    }

    /** Represents a s2c_daily_first_charge_reward. */
    class s2c_daily_first_charge_reward {

        /** Constructs a new s2c_daily_first_charge_reward. */
        constructor();

        /** 1代表已充值  NULL 为未充值 */
        public is_charge: number;

        /** 1代表已经领取 NULL为未领取 */
        public is_receive: number;

        /** 配置编号 */
        public conf_index: number;
    }

    /** Represents a super_first_charge_item. */
    class super_first_charge_item {

        /** Constructs a new super_first_charge_item. */
        constructor();

        /** 首充编号 */
        public index: number;

        /** 当前领取到第几天 */
        public day: number;

        /** super_first_charge_item time. */
        public time: number;
    }

    /** Represents a s2c_super_first_charge_info. */
    class s2c_super_first_charge_info {

        /** Constructs a new s2c_super_first_charge_info. */
        constructor();

        /** 累计充值数量 */
        public charged: number;

        /** s2c_super_first_charge_info infos. */
        public infos: msg.super_first_charge_item[];

        /** 开服天数 */
        public open_day: number;
    }

    /** Represents a c2s_super_first_charge_reward. */
    class c2s_super_first_charge_reward {

        /** Constructs a new c2s_super_first_charge_reward. */
        constructor();

        /** 福利大厅编号 */
        public index: number;

        /** 领取第几天的奖励 */
        public day_no: number;
    }

    /** 告诉客户端是时候弹一波广告了 */
    class s2c_super_first_charge_advertise {

        /** Constructs a new s2c_super_first_charge_advertise. */
        constructor();
    }

    /** Represents a s2c_first_charge. */
    class s2c_first_charge {

        /** Constructs a new s2c_first_charge. */
        constructor();

        /** 一生首充标志  true:已首充 / false:未首充 */
        public one_first: boolean;
    }

    /** Represents a c2s_ask_operate_rank_info. */
    class c2s_ask_operate_rank_info {

        /** Constructs a new c2s_ask_operate_rank_info. */
        constructor();

        /** c2s_ask_operate_rank_info act_id. */
        public act_id: number;

        /** 分页请求 从 head_num 到 tail_num 的成员信息 */
        public head_num: number;

        /** c2s_ask_operate_rank_info tail_num. */
        public tail_num: number;
    }

    /** Represents an operate_rank_data. */
    class operate_rank_data {

        /** Constructs a new operate_rank_data. */
        constructor();

        /** operate_rank_data role_id. */
        public role_id: Long;

        /** operate_rank_data name. */
        public name: string;

        /** 性别 */
        public sex: number;

        /** 年龄 */
        public age_type: number;

        /** 头像 */
        public head: number;

        /** operate_rank_data agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 头像等级 */
        public head_lv: number;

        /** 头像框 */
        public head_frame: number;

        /** 头像框等级 */
        public head_frame_lv: number;

        /** operate_rank_data guild_team_name. */
        public guild_team_name: string;

        /** 神兵 */
        public weapon: number;

        /** 战翼 */
        public wing: number;

        /** 时装 */
        public fashion: number;

        /** 分数 */
        public client_score: Long;

        /** 排名 */
        public rank_no: number;
    }

    /** Represents a s2c_ask_operate_rank_info. */
    class s2c_ask_operate_rank_info {

        /** Constructs a new s2c_ask_operate_rank_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** s2c_ask_operate_rank_info datas. */
        public datas: msg.operate_rank_data[];

        /** 自己名次 */
        public rank_no: number;

        /** 自己的分数 */
        public client_score: Long;

        /** 是否统计完积分 */
        public is_stop_refresh: boolean;
    }

    /** 请求返利数据 */
    class c2s_ask_operate_rank_gift_info {

        /** Constructs a new c2s_ask_operate_rank_gift_info. */
        constructor();

        /** 活动id */
        public act_id: number;
    }

    /** 返回返利数据 */
    class s2c_ask_operate_rank_gift_info {

        /** Constructs a new s2c_ask_operate_rank_gift_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 已经领取的编号 */
        public index_list: number[];

        /** 自己的分数 */
        public client_score: Long;
    }

    /** 领取冲榜豪礼数据 */
    class c2s_operate_rank_receive_gift {

        /** Constructs a new c2s_operate_rank_receive_gift. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 编号 */
        public index: number;
    }

    /** 更新冲榜豪礼数据 */
    class s2c_operate_rank_gift_update {

        /** Constructs a new s2c_operate_rank_gift_update. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 编号 */
        public index: number;
    }

    /** 红点协议 */
    class s2c_operate_rank_gift_hint {

        /** Constructs a new s2c_operate_rank_gift_hint. */
        constructor();

        /** 活动id */
        public act_id: number;
    }

    /** Represents a marry_wall_item. */
    class marry_wall_item {

        /** Constructs a new marry_wall_item. */
        constructor();

        /** marry_wall_item role_id. */
        public role_id: Long;

        /** marry_wall_item head_frame. */
        public head_frame: number;

        /** marry_wall_item head. */
        public head: number;

        /** marry_wall_item agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** marry_wall_item name. */
        public name: string;

        /** marry_wall_item sex. */
        public sex: number;

        /** 礼金 */
        public cash_gift: number;

        /** 文本内容 */
        public content: string;

        /** 发帖人server_id */
        public server_id: number;

        /** 发帖人server_id */
        public vip_lv: number;
    }

    /** 请求仙缘墙信息 */
    class c2s_marry_wall_info {

        /** Constructs a new c2s_marry_wall_info. */
        constructor();

        /** 0:打开界面请求 */
        public page: number;
    }

    /** Represents a c2s_marry_wall_colse_ui. */
    class c2s_marry_wall_colse_ui {

        /** Constructs a new c2s_marry_wall_colse_ui. */
        constructor();
    }

    /** 返回仙缘墙信息 */
    class s2c_marry_wall_info {

        /** Constructs a new s2c_marry_wall_info. */
        constructor();

        /** s2c_marry_wall_info page. */
        public page: number;

        /** s2c_marry_wall_info total_page. */
        public total_page: number;

        /** s2c_marry_wall_info infos. */
        public infos: msg.marry_wall_item[];
    }

    /** Represents a c2s_marry_select. */
    class c2s_marry_select {

        /** Constructs a new c2s_marry_select. */
        constructor();

        /** c2s_marry_select name. */
        public name: string;
    }

    /** 发起征婚 */
    class c2s_marry_seeking {

        /** Constructs a new c2s_marry_seeking. */
        constructor();

        /** 礼金 */
        public cash_gift: number;

        /** 文本内容 */
        public content: string;
    }

    /** 求婚 */
    class c2s_marry_propose {

        /** Constructs a new c2s_marry_propose. */
        constructor();

        /** c2s_marry_propose role_id. */
        public role_id: Long;

        /** 戒指 道具index */
        public ring_idx: number;

        /** 礼盒 index */
        public props: number[];
    }

    /** 求婚成功提示 */
    class s2c_marry_success {

        /** Constructs a new s2c_marry_success. */
        constructor();

        /** s2c_marry_success head_frame. */
        public head_frame: number;

        /** s2c_marry_success head. */
        public head: number;

        /** s2c_marry_success agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** s2c_marry_success name. */
        public name: string;

        /** s2c_marry_success sex. */
        public sex: number;

        /** 奖励 */
        public gift: msg.prop_tips_data[];
    }

    /** 离婚信息 */
    class c2s_marry_divorce_info {

        /** Constructs a new c2s_marry_divorce_info. */
        constructor();
    }

    /** 离婚信息 */
    class s2c_marry_divorce_info {

        /** Constructs a new s2c_marry_divorce_info. */
        constructor();

        /** 结婚了多少天 */
        public marry_day: number;
    }

    /** 离婚 */
    class c2s_marry_divorce {

        /** Constructs a new c2s_marry_divorce. */
        constructor();
    }

    /** Represents a c2s_marry_task_info. */
    class c2s_marry_task_info {

        /** Constructs a new c2s_marry_task_info. */
        constructor();
    }

    /** Represents a s2c_marry_task_info. */
    class s2c_marry_task_info {

        /** Constructs a new s2c_marry_task_info. */
        constructor();

        /** s2c_marry_task_info tasks. */
        public tasks: msg.marry_task_item[];

        /** 永久任务完成次数 */
        public life_task_done_cnt: number;

        /** 永久任务总次数 */
        public daily_task_all_cnt: number;

        /** 每天任务完成次数 */
        public daily_task_done_cnt: number;

        /** 每天任务总次数 */
        public life_task_all_cnt: number;
    }

    /** 任务结构体 */
    class marry_task_item {

        /** Constructs a new marry_task_item. */
        constructor();

        /** 10：终生成就    11：每日成就 */
        public task_type: number;

        /** 任务编号 */
        public index: number;

        /** 任务进度 */
        public schedule: number;

        /** 任务状态  0:未完成，1:已完成未领取，2:已领取 */
        public status: number;

        /** 任务失效时间戳，缺省为不限时间 */
        public time_out: number;

        /** 目标 */
        public target: number;

        /** 跳转编号 */
        public jump: number;

        /** 指引箭头 */
        public arrow: number;

        /** 任务名称 */
        public name: string;

        /** 任务描述 */
        public desc: string;

        /** 任务奖励 */
        public task_reward: msg.prop_tips_data[];

        /** marry_task_item self_schedule. */
        public self_schedule: number;

        /** marry_task_item else_schedule. */
        public else_schedule: number;
    }

    /** Represents a c2s_marry_task_finish. */
    class c2s_marry_task_finish {

        /** Constructs a new c2s_marry_task_finish. */
        constructor();

        /** c2s_marry_task_finish index. */
        public index: number;
    }

    /** 结婚养成///////// */
    class c2s_marry_read_chat {

        /** Constructs a new c2s_marry_read_chat. */
        constructor();
    }

    /** 请求双修信息 */
    class c2s_marry_open_ui {

        /** Constructs a new c2s_marry_open_ui. */
        constructor();
    }

    /** 返回双修信息 */
    class marry_studying_info {

        /** Constructs a new marry_studying_info. */
        constructor();

        /** 双修等级 */
        public level: number;

        /** 当前双修值 */
        public exp: number;

        /** 当前等级的双修值上限 */
        public max_exp: number;

        /** 属性加成 */
        public attr?: (msg.attributes|null);

        /** 已经领到了哪一级的奖励 */
        public received: number;

        /** 是否满级 */
        public is_max: boolean;
    }

    /** 领取突破奖励 */
    class c2s_marry_studying_receive {

        /** Constructs a new c2s_marry_studying_receive. */
        constructor();
    }

    /** Represents a s2c_marry_open_ui. */
    class s2c_marry_open_ui {

        /** Constructs a new s2c_marry_open_ui. */
        constructor();

        /** s2c_marry_open_ui operate. */
        public operate: number;

        /** s2c_marry_open_ui infos. */
        public infos?: (msg.marry_studying_info|null);

        /** 时装index */
        public fashion_index: number;

        /** 伴侣性别 */
        public sex: number;

        /** s2c_marry_open_ui mate_online. */
        public mate_online: boolean;

        /** s2c_marry_open_ui has_read. */
        public has_read: boolean;

        /** s2c_marry_open_ui agent_info. */
        public agent_info?: (msg.agent_ex_info|null);
    }

    /** 突破双修 */
    class c2s_marry_studying_upgrade {

        /** Constructs a new c2s_marry_studying_upgrade. */
        constructor();

        /** true：自动购买 false：不自动购买 */
        public is_auto_buy: boolean;
    }

    /** 请求婚戒界面信息 */
    class c2s_marry_ring_open_ui {

        /** Constructs a new c2s_marry_ring_open_ui. */
        constructor();
    }

    /** 婚戒技能 */
    class ring_skill_item {

        /** Constructs a new ring_skill_item. */
        constructor();

        /** 位置 */
        public pos: number;

        /** 技能idx */
        public idx: number;

        /** 技能等级 */
        public lv: number;

        /** 技能类型 1:基础技能 2:类型技能 */
        public skill_type: number;

        /** 升级条件 */
        public condition: number;

        /** 当前等级属性 */
        public attr?: (msg.attributes|null);

        /** 下一等级属性 */
        public next_attr?: (msg.attributes|null);

        /** 升级所需 */
        public cost?: (msg.prop_tips_data|null);
    }

    /** 婚戒返还 */
    class s2c_marry_ring_return {

        /** Constructs a new s2c_marry_ring_return. */
        constructor();

        /** 消耗婚戒 */
        public index: number;

        /** 1:求婚者   2:被求婚者 */
        public marry_type: number;

        /** 对象名字 */
        public mate_name: string;

        /** 返还物品 */
        public prop?: (msg.prop_tips_data|null);
    }

    /** 升级消耗 */
    class starup_cost {

        /** Constructs a new starup_cost. */
        constructor();

        /** 物品idx */
        public idx: number;

        /** 一次消耗最少数量 */
        public cnt: number;

        /** 每次得到经验 */
        public per_exp: number;

        /** 商店idx */
        public goods_idx: number;
    }

    /** 返回婚戒界面信息 */
    class s2c_marry_ring_open_ui {

        /** Constructs a new s2c_marry_ring_open_ui. */
        constructor();

        /** 1:全发 2:缺省 */
        public send_type: number;

        /** 婚戒index */
        public index: number;

        /** 婚戒等级 */
        public level: number;

        /** 戒指总属性 */
        public attr?: (msg.attributes|null);

        /** 当前经验 */
        public exp: number;

        /** 当前等级经验上限 */
        public max_exp: number;

        /** 消耗 */
        public cost?: (msg.starup_cost|null);

        /** 婚戒技能 */
        public skill: msg.ring_skill_item[];

        /** 婚戒共鸣等级 */
        public resonance_level: number;

        /** 是否是第一次结婚， true：是第一次，不是第一次不发 */
        public is_first: boolean;
    }

    /** 婚戒升级 */
    class c2s_marry_ring_upgrade {

        /** Constructs a new c2s_marry_ring_upgrade. */
        constructor();

        /** true：自动购买 false：不自动购买 */
        public is_auto_buy: boolean;
    }

    /** 婚戒技能升级 */
    class c2s_marry_ring_skill_upgrade {

        /** Constructs a new c2s_marry_ring_skill_upgrade. */
        constructor();

        /** 技能位置 */
        public pos: number;
    }

    /** 激活婚戒 */
    class c2s_marry_ring_active {

        /** Constructs a new c2s_marry_ring_active. */
        constructor();

        /** 婚戒index */
        public index: number;
    }

    /** 请求婚戒信息 */
    class c2s_marry_ring_info {

        /** Constructs a new c2s_marry_ring_info. */
        constructor();
    }

    /** 婚戒结构体 */
    class marry_ring {

        /** Constructs a new marry_ring. */
        constructor();

        /** 婚戒index */
        public index: number;

        /** 战力 */
        public showpower: Long;

        /** 婚戒等级 */
        public level: number;

        /** 婚戒星级 */
        public star: number;

        /** 角色名字 */
        public role_name: string;

        /** 伴侣名字 */
        public mate_name: string;

        /** 婚戒基础属性 */
        public base_attr?: (msg.attributes|null);

        /** 婚戒升级属性 */
        public level_attr?: (msg.attributes|null);

        /** 婚戒技能 */
        public skill: msg.ring_skill_item[];

        /** 婚戒共鸣等级 */
        public resonance_level: number;

        /** 婚戒共鸣属性 */
        public resonance_attr?: (msg.attributes|null);

        /** 佩戴时间 */
        public take_time: number;

        /** 额外战力 */
        public extra_showpower: Long;
    }

    /** 返回婚戒信息 */
    class s2c_marry_ring_info {

        /** Constructs a new s2c_marry_ring_info. */
        constructor();

        /** s2c_marry_ring_info ring. */
        public ring?: (msg.marry_ring|null);
    }

    /** 婚戒共鸣打开界面 */
    class c2s_ring_resonance_open_ui {

        /** Constructs a new c2s_ring_resonance_open_ui. */
        constructor();
    }

    /** Represents a s2c_ring_resonance_open_ui. */
    class s2c_ring_resonance_open_ui {

        /** Constructs a new s2c_ring_resonance_open_ui. */
        constructor();

        /** 1:全部 2:缺省 */
        public operate: number;

        /** 共鸣等级 */
        public resonance_level: number;

        /** 当前等级经验 */
        public resonance_exp: number;

        /** 共鸣属性(含战力) */
        public resonance_attr?: (msg.attributes|null);

        /** 当前共鸣等级所需总经验 */
        public resonance_max_exp: number;

        /** 下一等级共鸣属性(含战力) */
        public next_resonance_attr?: (msg.attributes|null);
    }

    /** 婚戒共鸣升级 */
    class c2s_ring_resonance_upgrade {

        /** Constructs a new c2s_ring_resonance_upgrade. */
        constructor();

        /** 唯一id列表 */
        public prop_ids: Long[];
    }

    /** 仙玉购买礼包 */
    class marry_gift {

        /** Constructs a new marry_gift. */
        constructor();

        /** 礼包idx */
        public idx: number;

        /** 0 未购买 / 1 可领取 / 2 已领取 */
        public state: number;
    }

    /** Represents a c2s_marry_cost_gift_operate. */
    class c2s_marry_cost_gift_operate {

        /** Constructs a new c2s_marry_cost_gift_operate. */
        constructor();

        /** 0 查看 / 1 购买 2 领取 */
        public operate: number;

        /** 礼包idx 【operate 为 1 时该字段才发】 */
        public idx: number;
    }

    /** Represents a s2c_marry_cost_gift_info. */
    class s2c_marry_cost_gift_info {

        /** Constructs a new s2c_marry_cost_gift_info. */
        constructor();

        /** 购买的状态 */
        public gift_state: msg.marry_gift[];
    }

    /** 累充礼包 */
    class c2s_marry_sum_gift_operate {

        /** Constructs a new c2s_marry_sum_gift_operate. */
        constructor();

        /** 0 查看 / 1 领取 */
        public operate: number;

        /** 礼包idx 【operate 为 1 时该字段才发】 */
        public idx: number;
    }

    /** Represents a s2c_marry_sum_gift_info. */
    class s2c_marry_sum_gift_info {

        /** Constructs a new s2c_marry_sum_gift_info. */
        constructor();

        /** 结束时间 以秒为单位的时间戳 */
        public end_time: number;

        /** 礼包idx */
        public idx: number;

        /** 0 未购买 / 1 可领取 / 2 已领取 */
        public state: number;

        /** 累充进度 */
        public schedule: number;
    }

    /** 打开结婚副本界面 */
    class c2s_marry_instance_open_ui {

        /** Constructs a new c2s_marry_instance_open_ui. */
        constructor();
    }

    /** Represents a s2c_marry_instance_open_ui. */
    class s2c_marry_instance_open_ui {

        /** Constructs a new s2c_marry_instance_open_ui. */
        constructor();

        /** s2c_marry_instance_open_ui left_challenge_cnt. */
        public left_challenge_cnt: number;

        /** 仙缘副本记录点 */
        public ring_no: number;
    }

    /** 发起邀请者进行邀请或取消 被邀请者接受或拒绝 */
    class c2s_marry_instance_invite {

        /** Constructs a new c2s_marry_instance_invite. */
        constructor();

        /** 1邀请 2被邀请 3花费仙玉召唤分身进入 */
        public type: number;

        /** 当type==1代表1邀请 2取消 当type==2代表1接受 2拒绝 当type==3代表1愿意 2放弃 */
        public operate: number;
    }

    /** 邀请信息 */
    class s2c_marry_instance_invite_info {

        /** Constructs a new s2c_marry_instance_invite_info. */
        constructor();

        /** 1邀请 2被邀请 3关闭窗口 4伴侣不在线 是否愿意花费xx仙玉召唤分身进行 */
        public operate: number;

        /** s2c_marry_instance_invite_info mate_name. */
        public mate_name: string;

        /** s2c_marry_instance_invite_info end_time. */
        public end_time: number;
    }

    /** 购买挑战次数 */
    class c2s_marry_instance_buy_times {

        /** Constructs a new c2s_marry_instance_buy_times. */
        constructor();
    }

    /** Represents a s2c_marry_instance_enter. */
    class s2c_marry_instance_enter {

        /** Constructs a new s2c_marry_instance_enter. */
        constructor();

        /** 1全部  2缺省 */
        public operate: number;

        /** s2c_marry_instance_enter beg_timestamp. */
        public beg_timestamp: number;

        /** s2c_marry_instance_enter end_tiemstamp. */
        public end_tiemstamp: number;

        /** s2c_marry_instance_enter ring_no. */
        public ring_no: number;
    }

    /** Represents a s2c_marry_instance_ring_tips. */
    class s2c_marry_instance_ring_tips {

        /** Constructs a new s2c_marry_instance_ring_tips. */
        constructor();

        /** s2c_marry_instance_ring_tips limit_time. */
        public limit_time: number;

        /** s2c_marry_instance_ring_tips ring_no. */
        public ring_no: number;
    }

    /** Represents a c2s_marry_instance_mvp_rank. */
    class c2s_marry_instance_mvp_rank {

        /** Constructs a new c2s_marry_instance_mvp_rank. */
        constructor();
    }

    /** Represents a marry_instance_mvp_rank. */
    class marry_instance_mvp_rank {

        /** Constructs a new marry_instance_mvp_rank. */
        constructor();

        /** marry_instance_mvp_rank name. */
        public name: string;

        /** marry_instance_mvp_rank damage. */
        public damage: Long;
    }

    /** Represents a s2c_marry_instance_mvp_rank. */
    class s2c_marry_instance_mvp_rank {

        /** Constructs a new s2c_marry_instance_mvp_rank. */
        constructor();

        /** s2c_marry_instance_mvp_rank ranks. */
        public ranks: msg.marry_instance_mvp_rank[];
    }

    /** Represents a marry_role_info. */
    class marry_role_info {

        /** Constructs a new marry_role_info. */
        constructor();

        /** marry_role_info sex. */
        public sex: number;

        /** marry_role_info head. */
        public head: number;

        /** marry_role_info agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** marry_role_info head_frame. */
        public head_frame: number;

        /** marry_role_info name. */
        public name: string;
    }

    /** Represents a marry_redpack. */
    class marry_redpack {

        /** Constructs a new marry_redpack. */
        constructor();

        /** 结婚ID */
        public marry_id: Long;

        /** marry_redpack role_info. */
        public role_info: msg.marry_role_info[];

        /** 奖励 */
        public reward_info: msg.prop_tips_data[];
    }

    /** 发送结婚红包 */
    class s2c_marry_redpack {

        /** Constructs a new s2c_marry_redpack. */
        constructor();

        /** s2c_marry_redpack info. */
        public info: msg.marry_redpack[];
    }

    /** 领取结婚红包 */
    class c2s_marry_recv_redpack {

        /** Constructs a new c2s_marry_recv_redpack. */
        constructor();

        /** 结婚ID */
        public marry_id: Long;
    }

    /** 领取结婚红包 成功 */
    class s2c_marry_recv_redpack {

        /** Constructs a new s2c_marry_recv_redpack. */
        constructor();

        /** 结婚ID */
        public marry_id: Long;
    }

    /** 打开界面 */
    class c2s_marry_xinwu_open_ui {

        /** Constructs a new c2s_marry_xinwu_open_ui. */
        constructor();
    }

    /** Represents a xinwu_donate_prop. */
    class xinwu_donate_prop {

        /** Constructs a new xinwu_donate_prop. */
        constructor();

        /** 物品编号 */
        public idx: number;

        /** 当前捐献的个数 */
        public cnt: number;

        /** 最大捐献数 */
        public max_cnt: number;
    }

    /** Represents a marry_xinwu_data. */
    class marry_xinwu_data {

        /** Constructs a new marry_xinwu_data. */
        constructor();

        /** marry_xinwu_data xinwu_idx. */
        public xinwu_idx: number;

        /** marry_xinwu_data level. */
        public level: number;

        /** int32 max_level              = 3; ///当前等级上限 */
        public lv_attr?: (msg.attributes|null);

        /** 下一等级属性 */
        public next_lv_attr?: (msg.attributes|null);

        /** 战力加成 */
        public extra_val: number;

        /** 伴侣的信物等级 */
        public mate_xinwu_level: number;

        /** 当前已捐献的物品 */
        public prop: msg.xinwu_donate_prop[];

        /** 觉醒等级 */
        public awake_lv: number;

        /** 伴侣的觉醒等级 */
        public mate_awake_lv: number;

        /** 当前信物所有属性 */
        public all_attrs?: (msg.attributes|null);

        /** 伴侣属性（不包含技能属性） */
        public mate_attrs?: (msg.attributes|null);
    }

    /** 打开界面返回 */
    class s2c_marry_xinwu_open_ui {

        /** Constructs a new s2c_marry_xinwu_open_ui. */
        constructor();

        /** s2c_marry_xinwu_open_ui info. */
        public info: msg.marry_xinwu_data[];

        /** 1全部  2缺省 */
        public operate: number;
    }

    /** 信物捐献 （弃用） */
    class c2s_marry_xinwu_donate_prop {

        /** Constructs a new c2s_marry_xinwu_donate_prop. */
        constructor();

        /** 返回的是 s2c_marry_xinwu_open_ui */
        public prop: msg.prop_tips_data[];

        /** c2s_marry_xinwu_donate_prop xinwu_idx. */
        public xinwu_idx: number;
    }

    /** 激活或者升阶 */
    class c2s_marry_xinwu_lv_up {

        /** Constructs a new c2s_marry_xinwu_lv_up. */
        constructor();

        /** 返回的是 s2c_marry_xinwu_open_ui */
        public xinwu_idx: number;
    }

    /** 打开觉醒界面 */
    class c2s_marry_xinwu_awake_open_ui {

        /** Constructs a new c2s_marry_xinwu_awake_open_ui. */
        constructor();

        /** 返回的是 s2c_marry_xinwu_awake_open_ui */
        public xinwu_idx: number;
    }

    /** 技能结构体 */
    class xinwu_skill_item {

        /** Constructs a new xinwu_skill_item. */
        constructor();

        /** xinwu_skill_item skill_idx. */
        public skill_idx: number;

        /** 当前等级 */
        public level: number;

        /** xinwu_skill_item attr. */
        public attr?: (msg.attributes|null);

        /** xinwu_skill_item next_attr. */
        public next_attr?: (msg.attributes|null);

        /** 升级所需材料 */
        public cost?: (msg.prop_tips_data|null);
    }

    /** Represents a s2c_marry_xinwu_awake_open_ui. */
    class s2c_marry_xinwu_awake_open_ui {

        /** Constructs a new s2c_marry_xinwu_awake_open_ui. */
        constructor();

        /** s2c_marry_xinwu_awake_open_ui xinwu_idx. */
        public xinwu_idx: number;

        /** 当前觉醒等级 */
        public level: number;

        /** 觉醒属性 */
        public awake_attr?: (msg.attributes|null);

        /** 下一觉醒属性 */
        public next_awake_attr?: (msg.attributes|null);

        /** 技能列表 */
        public skill_list: msg.xinwu_skill_item[];
    }

    /** Represents a xinwu_awake_data. */
    class xinwu_awake_data {

        /** Constructs a new xinwu_awake_data. */
        constructor();

        /** xinwu_awake_data xinwu_idx. */
        public xinwu_idx: number;

        /** 当前觉醒等级 */
        public level: number;

        /** 技能列表 */
        public skill_list: msg.xinwu_skill_item[];
    }

    /** Represents a s2c_marry_online_xinwu_awake. */
    class s2c_marry_online_xinwu_awake {

        /** Constructs a new s2c_marry_online_xinwu_awake. */
        constructor();

        /** s2c_marry_online_xinwu_awake info. */
        public info: msg.xinwu_awake_data[];
    }

    /** 觉醒升级 */
    class c2s_marry_xinwu_awake_lv_up {

        /** Constructs a new c2s_marry_xinwu_awake_lv_up. */
        constructor();

        /** 返回的是 s2c_marry_xinwu_awake_open_ui */
        public xinwu_idx: number;
    }

    /** 觉醒技能升级 */
    class c2s_marry_xinwu_skill_lv_up {

        /** Constructs a new c2s_marry_xinwu_skill_lv_up. */
        constructor();

        /** 返回的是 s2c_marry_xinwu_awake_open_ui */
        public xinwu_idx: number;

        /** c2s_marry_xinwu_skill_lv_up skill_idx. */
        public skill_idx: number;
    }

    /** 帮派引导奖励///////////////////////// */
    class c2s_guild_team_lead_reward {

        /** Constructs a new c2s_guild_team_lead_reward. */
        constructor();
    }

    /** 洗练///////////////////////// */
    class c2s_equip_baptize_info {

        /** Constructs a new c2s_equip_baptize_info. */
        constructor();
    }

    /** Represents an equip_baptize_attr. */
    class equip_baptize_attr {

        /** Constructs a new equip_baptize_attr. */
        constructor();

        /** 只有当前属性或保存才会传id */
        public id: number;

        /** equip_baptize_attr attr_name. */
        public attr_name: string;

        /** equip_baptize_attr attr_value. */
        public attr_value: number;

        /** equip_baptize_attr up_value. */
        public up_value: number;

        /** equip_baptize_attr down_value. */
        public down_value: number;

        /** equip_baptize_attr is_lock. */
        public is_lock: boolean;

        /** equip_baptize_attr is_full. */
        public is_full: boolean;

        /** equip_baptize_attr is_advanced. */
        public is_advanced: boolean;

        /** equip_baptize_attr showpower. */
        public showpower: Long;
    }

    /** Represents a pos_equip_baptize. */
    class pos_equip_baptize {

        /** Constructs a new pos_equip_baptize. */
        constructor();

        /** pos_equip_baptize pos. */
        public pos: number;

        /** pos_equip_baptize attrs. */
        public attrs: msg.equip_baptize_attr[];

        /** pos_equip_baptize gen_attrs. */
        public gen_attrs: msg.equip_baptize_attr[];

        /** pos_equip_baptize showpower. */
        public showpower: Long;

        /** pos_equip_baptize gen_showpower. */
        public gen_showpower: Long;
    }

    /** Represents a s2c_equip_baptize_info. */
    class s2c_equip_baptize_info {

        /** Constructs a new s2c_equip_baptize_info. */
        constructor();

        /** s2c_equip_baptize_info equips. */
        public equips: msg.pos_equip_baptize[];
    }

    /** Represents a c2s_equip_baptize_use. */
    class c2s_equip_baptize_use {

        /** Constructs a new c2s_equip_baptize_use. */
        constructor();

        /** c2s_equip_baptize_use auto_buy. */
        public auto_buy: boolean;

        /** c2s_equip_baptize_use pos. */
        public pos: number;

        /** c2s_equip_baptize_use use_special. */
        public use_special: number;
    }

    /** Represents a c2s_equip_baptize_lock. */
    class c2s_equip_baptize_lock {

        /** Constructs a new c2s_equip_baptize_lock. */
        constructor();

        /** c2s_equip_baptize_lock pos. */
        public pos: number;

        /** c2s_equip_baptize_lock id. */
        public id: number;
    }

    /** Represents a c2s_equip_baptize_save. */
    class c2s_equip_baptize_save {

        /** Constructs a new c2s_equip_baptize_save. */
        constructor();

        /** c2s_equip_baptize_save pos. */
        public pos: number;
    }

    /** Represents a c2s_active_slot_pos. */
    class c2s_active_slot_pos {

        /** Constructs a new c2s_active_slot_pos. */
        constructor();

        /** 部位 */
        public pos: number;

        /** 槽位 */
        public slot_pos: number;
    }

    /** 请求信息 */
    class c2s_ctrl_baodian_info {

        /** Constructs a new c2s_ctrl_baodian_info. */
        constructor();

        /** c2s_ctrl_baodian_info act_id. */
        public act_id: number;
    }

    /** Represents a s2c_ctrl_baodian_info. */
    class s2c_ctrl_baodian_info {

        /** Constructs a new s2c_ctrl_baodian_info. */
        constructor();

        /** s2c_ctrl_baodian_info act_id. */
        public act_id: number;

        /** 当前挑战的宝殿层数 */
        public floor: number;

        /** 是否已领取通关奖励 */
        public got_big_reward: boolean;

        /** 个人已通关的宝殿层数  0表示未通关 */
        public pass: number;
    }

    /** 请求进入场景 */
    class c2s_ctrl_baodian_enter {

        /** Constructs a new c2s_ctrl_baodian_enter. */
        constructor();

        /** c2s_ctrl_baodian_enter act_id. */
        public act_id: number;
    }

    /** Represents a s2c_ctrl_baodian_enter. */
    class s2c_ctrl_baodian_enter {

        /** Constructs a new s2c_ctrl_baodian_enter. */
        constructor();

        /** s2c_ctrl_baodian_enter act_id. */
        public act_id: number;

        /** 结束时间戳 */
        public end_timestamp: number;
    }

    /** 领取大奖 */
    class c2s_ctrl_baodian_reward {

        /** Constructs a new c2s_ctrl_baodian_reward. */
        constructor();

        /** c2s_ctrl_baodian_reward act_id. */
        public act_id: number;
    }

    /** Represents a baodian_rank_info. */
    class baodian_rank_info {

        /** Constructs a new baodian_rank_info. */
        constructor();

        /** 排名 */
        public rank_no: number;

        /** 层数 */
        public floor: number;

        /** 通关时间  (毫秒级别) */
        public pass_time: number;

        /** 名字 */
        public name: string;

        /** 头像 */
        public head: number;

        /** baodian_rank_info agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 头像框 */
        public head_frame: number;

        /** 性别 */
        public sex: number;
    }

    /** Represents a c2s_ctrl_baodian_rank_ui. */
    class c2s_ctrl_baodian_rank_ui {

        /** Constructs a new c2s_ctrl_baodian_rank_ui. */
        constructor();

        /** c2s_ctrl_baodian_rank_ui act_id. */
        public act_id: number;
    }

    /** Represents a s2c_ctrl_baodian_rank_ui. */
    class s2c_ctrl_baodian_rank_ui {

        /** Constructs a new s2c_ctrl_baodian_rank_ui. */
        constructor();

        /** s2c_ctrl_baodian_rank_ui act_id. */
        public act_id: number;

        /** s2c_ctrl_baodian_rank_ui ranks. */
        public ranks: msg.baodian_rank_info[];

        /** 个人 0:未上榜，其他按照上榜 */
        public my_rank_no: number;

        /** 个人已通关的宝殿层数  0表示未通关 */
        public pass: number;

        /** (毫秒级别)  个人通关时间 未通1关 该字段为空 */
        public pass_time: number;
    }

    /** Represents a c2s_daily_vip_gift_info. */
    class c2s_daily_vip_gift_info {

        /** Constructs a new c2s_daily_vip_gift_info. */
        constructor();
    }

    /** Represents a s2c_daily_vip_gift_is_open. */
    class s2c_daily_vip_gift_is_open {

        /** Constructs a new s2c_daily_vip_gift_is_open. */
        constructor();

        /** 1表示未开启  2表示开启 */
        public is_open: number;
    }

    /** Represents a c2s_daily_vip_gift_get_reward. */
    class c2s_daily_vip_gift_get_reward {

        /** Constructs a new c2s_daily_vip_gift_get_reward. */
        constructor();

        /** 礼包类型 32 33 34 35 36   36代表 打包礼包 */
        public gift_type: number;
    }

    /** Represents a vip_daily_gift. */
    class vip_daily_gift {

        /** Constructs a new vip_daily_gift. */
        constructor();

        /** 礼包类型 */
        public gift_type: number;

        /** 1：可领取  2:已领取 */
        public states: number;
    }

    /** Represents a s2c_daily_vip_gift_info. */
    class s2c_daily_vip_gift_info {

        /** Constructs a new s2c_daily_vip_gift_info. */
        constructor();

        /** s2c_daily_vip_gift_info info. */
        public info: msg.vip_daily_gift[];

        /** 免费礼包 0可领取1已领取 */
        public free_gift: number;

        /** 0否1是已购买打包礼包 */
        public is_buy_pack: number;
    }

    /** 领取每日礼包 */
    class c2s_daily_vip_free_gift {

        /** Constructs a new c2s_daily_vip_free_gift. */
        constructor();
    }

    /** Represents a relic_debris. */
    class relic_debris {

        /** Constructs a new relic_debris. */
        constructor();

        /** 碎片下标 */
        public relic_debris_index: number;

        /** 碎片等级 0表示未激活 */
        public relic_debris_lv: number;

        /** 碎片属性 */
        public attr?: (msg.attributes|null);
    }

    /** Represents a relic_info. */
    class relic_info {

        /** Constructs a new relic_info. */
        constructor();

        /** relic_info relic_id. */
        public relic_id: number;

        /** 圣物属性 */
        public relic_attr?: (msg.attributes|null);

        /** 碎片列表 */
        public relic_debrises: msg.relic_debris[];

        /** 圣物激活状态 */
        public active_state: number;

        /** 圣物完整度等级 */
        public integrity_lv: number;

        /** 圣物完整度当前进度 */
        public integrity_exp: number;

        /** 圣物完整度升级进度 */
        public integrity_uplv_exp: number;
    }

    /** 打开界面 */
    class c2s_relic_open_ui {

        /** Constructs a new c2s_relic_open_ui. */
        constructor();
    }

    /** 打开界面 返回 */
    class s2c_relic_open_ui {

        /** Constructs a new s2c_relic_open_ui. */
        constructor();

        /** 1全部  2缺省 */
        public oper: number;

        /** s2c_relic_open_ui show_power. */
        public show_power: Long;

        /** 圣物列表 */
        public relic_infos: msg.relic_info[];

        /** 圣物碎片属性 */
        public relic_debris_attr?: (msg.attributes|null);

        /** 圣物进阶属性 */
        public relic_up_attr?: (msg.attributes|null);

        /** 圣物族谱属性 */
        public relic_fetter_attr?: (msg.attributes|null);
    }

    /** 打开威能池界面 */
    class c2s_power_pool_open_ui {

        /** Constructs a new c2s_power_pool_open_ui. */
        constructor();
    }

    /** 打开界面 返回 */
    class s2c_power_pool_open_ui {

        /** Constructs a new s2c_power_pool_open_ui. */
        constructor();

        /** 1全部  2缺省 */
        public oper: number;

        /** 威能池等级 */
        public power_pool_lv: number;

        /** 威能池经验 */
        public power_pool_cur_exp: number;

        /** s2c_power_pool_open_ui power_pool_lvup_exp. */
        public power_pool_lvup_exp: number;

        /** 威能池升级消耗 */
        public power_pool_lvup_cost: msg.prop_tips_data[];

        /** 威能池等级属性 */
        public power_pool_lv_attr?: (msg.attributes|null);

        /** 威能池下一级属性 */
        public power_pool_uplv_attr?: (msg.attributes|null);

        /** 威能下一阶池属性 */
        public power_pool_upPhase_attr?: (msg.attributes|null);

        /** 威能池阶级属性 */
        public power_pool_phase_attr?: (msg.attributes|null);

        /** 威能池当前能量值 */
        public power_pool_cur_power: number;

        /** 威能池阶级等级 */
        public power_pool_phase_lv: number;

        /** s2c_power_pool_open_ui show_power. */
        public show_power: Long;
    }

    /** 解锁圣物 */
    class c2s_relic_active {

        /** Constructs a new c2s_relic_active. */
        constructor();

        /** c2s_relic_active relic_id. */
        public relic_id: number;
    }

    /** 升级/解锁圣物碎片 */
    class c2s_relic_debris_up_lv {

        /** Constructs a new c2s_relic_debris_up_lv. */
        constructor();

        /** c2s_relic_debris_up_lv relic_id. */
        public relic_id: number;

        /** 碎片id */
        public index: number;
    }

    /** 圣物完整度等级升阶 */
    class c2s_relic_up_integrity_lv {

        /** Constructs a new c2s_relic_up_integrity_lv. */
        constructor();

        /** c2s_relic_up_integrity_lv relic_id. */
        public relic_id: number;
    }

    /** 升级威能池 */
    class c2s_power_pool_up_lv {

        /** Constructs a new c2s_power_pool_up_lv. */
        constructor();

        /** 0表示一键升级 */
        public type: number;

        /** 0：不自动购买  1：自动购买 */
        public is_auto_buy: number;
    }

    /** 升阶威能池 */
    class c2s_power_pool_up_phase {

        /** Constructs a new c2s_power_pool_up_phase. */
        constructor();
    }

    /** 打开圣物属性界面 */
    class c2s_open_relic_attr_ui {

        /** Constructs a new c2s_open_relic_attr_ui. */
        constructor();

        /** c2s_open_relic_attr_ui relic_id. */
        public relic_id: number;
    }

    /** Represents a s2c_open_relic_attr_ui. */
    class s2c_open_relic_attr_ui {

        /** Constructs a new s2c_open_relic_attr_ui. */
        constructor();

        /** s2c_open_relic_attr_ui relic_id. */
        public relic_id: number;

        /** 圣物属性 */
        public relic_attr?: (msg.attributes|null);
    }

    /** Represents a c2s_relic_fetter_open_ui. */
    class c2s_relic_fetter_open_ui {

        /** Constructs a new c2s_relic_fetter_open_ui. */
        constructor();
    }

    /** Represents a c2s_relic_fetter_reward. */
    class c2s_relic_fetter_reward {

        /** Constructs a new c2s_relic_fetter_reward. */
        constructor();

        /** 羁绊idx */
        public index: number;
    }

    /** Represents a s2c_relic_fetter_info. */
    class s2c_relic_fetter_info {

        /** Constructs a new s2c_relic_fetter_info. */
        constructor();

        /** s2c_relic_fetter_info fetters. */
        public fetters: number[];
    }

    /** Represents a c2s_super_cont_charge_info. */
    class c2s_super_cont_charge_info {

        /** Constructs a new c2s_super_cont_charge_info. */
        constructor();
    }

    /** Represents a super_cont_charge. */
    class super_cont_charge {

        /** Constructs a new super_cont_charge. */
        constructor();

        /** super_cont_charge super_type. */
        public super_type: number;

        /** super_cont_charge cont_day. */
        public cont_day: number;

        /** super_cont_charge protect_day. */
        public protect_day: number;

        /** super_cont_charge states. */
        public states: number[];

        /** super_cont_charge ex_cont_day. */
        public ex_cont_day: number;
    }

    /** Represents a s2c_super_cont_charge_info. */
    class s2c_super_cont_charge_info {

        /** Constructs a new s2c_super_cont_charge_info. */
        constructor();

        /** s2c_super_cont_charge_info oper. */
        public oper: number;

        /** s2c_super_cont_charge_info charge_info. */
        public charge_info: msg.super_cont_charge[];
    }

    /** Represents a c2s_super_cont_receive_reward. */
    class c2s_super_cont_receive_reward {

        /** Constructs a new c2s_super_cont_receive_reward. */
        constructor();

        /** c2s_super_cont_receive_reward super_type. */
        public super_type: number;

        /** c2s_super_cont_receive_reward day_no. */
        public day_no: number;
    }

    /** 公告系统///////////////////////// */
    class s2c_system_notice_info {

        /** Constructs a new s2c_system_notice_info. */
        constructor();

        /** s2c_system_notice_info infos. */
        public infos: msg.system_notice_item[];
    }

    /** Represents a system_notice_item. */
    class system_notice_item {

        /** Constructs a new system_notice_item. */
        constructor();

        /** 公告类型（1:第一列公告，2:第二列公告） */
        public notice_type: number;

        /** 描述文本 */
        public desc: string;

        /** 优先级 */
        public priority_no: number;
    }

    /** 界面信息 */
    class c2s_daily_train_reward_info {

        /** Constructs a new c2s_daily_train_reward_info. */
        constructor();
    }

    /** 界面信息 */
    class s2c_daily_train_reward_info {

        /** Constructs a new s2c_daily_train_reward_info. */
        constructor();

        /** 活动天数 */
        public ad_day: number;

        /** 已领奖励编号 */
        public rewarded: number[];
    }

    /** 领奖 */
    class c2s_daily_train_reward_get {

        /** Constructs a new c2s_daily_train_reward_get. */
        constructor();

        /** c2s_daily_train_reward_get idx. */
        public idx: number;
    }

    /** Represents a c2s_follow_us_receive. */
    class c2s_follow_us_receive {

        /** Constructs a new c2s_follow_us_receive. */
        constructor();

        /** 38:订阅 39:收藏 40:彩签 */
        public follow_type: number;

        /** 1:成功订阅或成功,彩签收藏 2:领取奖励 */
        public flag: number;

        /** 平台账户 */
        public openid: string;
    }

    /** Represents a follow_info. */
    class follow_info {

        /** Constructs a new follow_info. */
        constructor();

        /** 38:订阅 39:收藏 40:彩签 */
        public follow_type: number;

        /** 0:还没订阅 1:可以领取 2:已经领取了 */
        public status: number;

        /** 0:需要弹窗 1:不需要弹窗 */
        public popup: number;
    }

    /** 订阅,收藏,彩签 数据列表 */
    class s2c_follow_us_info {

        /** Constructs a new s2c_follow_us_info. */
        constructor();

        /** s2c_follow_us_info follow_list. */
        public follow_list: msg.follow_info[];
    }

    /** 上传qq号 */
    class c2s_upload_qq_account {

        /** Constructs a new c2s_upload_qq_account. */
        constructor();

        /** c2s_upload_qq_account qq_account. */
        public qq_account: string;
    }

    /** Represents a c2s_sq_rechargeredpack_info. */
    class c2s_sq_rechargeredpack_info {

        /** Constructs a new c2s_sq_rechargeredpack_info. */
        constructor();

        /** c2s_sq_rechargeredpack_info act_id. */
        public act_id: number;
    }

    /** Represents a sq_rechargeredpack_data. */
    class sq_rechargeredpack_data {

        /** Constructs a new sq_rechargeredpack_data. */
        constructor();

        /** 编号 */
        public index: number;

        /** 0 未充值  1 已充值  2 已提现 */
        public charge_state: number;

        /** 0 未领取  1 已领取 */
        public gift_state: number;

        /** 已经充值的次数 */
        public had_charge_cnt: number;
    }

    /** Represents a s2c_sq_rechargeredpack_info. */
    class s2c_sq_rechargeredpack_info {

        /** Constructs a new s2c_sq_rechargeredpack_info. */
        constructor();

        /** s2c_sq_rechargeredpack_info act_id. */
        public act_id: number;

        /** 1全部  2更新部分 */
        public oper: number;

        /** s2c_sq_rechargeredpack_info charge_info. */
        public charge_info: msg.sq_rechargeredpack_data[];

        /** s2c_sq_rechargeredpack_info charge_cnts. */
        public charge_cnts: number[];

        /** 是否上传了qq账号 */
        public have_qq_account: boolean;
    }

    /** 领取奖励 */
    class c2s_sq_rechargeredpack_recv_reward {

        /** Constructs a new c2s_sq_rechargeredpack_recv_reward. */
        constructor();

        /** c2s_sq_rechargeredpack_recv_reward act_id. */
        public act_id: number;

        /** 编号 */
        public index: number;
    }

    /** 提现 */
    class c2s_sq_rechargeredpack_drwa_cash {

        /** Constructs a new c2s_sq_rechargeredpack_drwa_cash. */
        constructor();

        /** c2s_sq_rechargeredpack_drwa_cash act_id. */
        public act_id: number;

        /** c2s_sq_rechargeredpack_drwa_cash index. */
        public index: number;
    }

    /** 弹窗 */
    class s2c_sq_rechargeredpack_pop_box {

        /** Constructs a new s2c_sq_rechargeredpack_pop_box. */
        constructor();
    }

    /** Represents a c2s_sq_loginredpack_info. */
    class c2s_sq_loginredpack_info {

        /** Constructs a new c2s_sq_loginredpack_info. */
        constructor();

        /** c2s_sq_loginredpack_info act_id. */
        public act_id: number;
    }

    /** Represents a sq_loginredpack_data. */
    class sq_loginredpack_data {

        /** Constructs a new sq_loginredpack_data. */
        constructor();

        /** 编号 */
        public index: number;

        /** 1 可提现  2 已提现 */
        public state: number;

        /** 金额 */
        public rmb: number;
    }

    /** Represents a s2c_sq_loginredpack_info. */
    class s2c_sq_loginredpack_info {

        /** Constructs a new s2c_sq_loginredpack_info. */
        constructor();

        /** s2c_sq_loginredpack_info act_id. */
        public act_id: number;

        /** 1全部  2更新部分 */
        public oper: number;

        /** s2c_sq_loginredpack_info charge_info. */
        public charge_info: msg.sq_loginredpack_data[];

        /** 账户余额 */
        public left_cash: number;

        /** 是否上传了qq账号 */
        public have_qq_account: boolean;
    }

    /** 领取红包 */
    class c2s_sq_loginredpack_recv {

        /** Constructs a new c2s_sq_loginredpack_recv. */
        constructor();

        /** c2s_sq_loginredpack_recv act_id. */
        public act_id: number;

        /** c2s_sq_loginredpack_recv index. */
        public index: number;
    }

    /** 提现 */
    class c2s_sq_loginredpack_drwa_cash {

        /** Constructs a new c2s_sq_loginredpack_drwa_cash. */
        constructor();

        /** c2s_sq_loginredpack_drwa_cash act_id. */
        public act_id: number;
    }

    /** 弹窗 */
    class s2c_sq_loginredpack_pop_box {

        /** Constructs a new s2c_sq_loginredpack_pop_box. */
        constructor();
    }

    /** 符文夺宝（cv装备夺宝） /////////// */
    class c2s_rune_draw_request {

        /** Constructs a new c2s_rune_draw_request. */
        constructor();
    }

    /** Represents a s2c_rune_draw_info. */
    class s2c_rune_draw_info {

        /** Constructs a new s2c_rune_draw_info. */
        constructor();

        /** 夺宝信息 */
        public info?: (msg.sz_draw_info|null);
    }

    /** 抽奖 */
    class c2s_rune_draw_search {

        /** Constructs a new c2s_rune_draw_search. */
        constructor();

        /** 1: 1次（免费）    2: 10次     3: 50次 */
        public type: number;
    }

    /** Represents a s2c_rune_draw_search. */
    class s2c_rune_draw_search {

        /** Constructs a new s2c_rune_draw_search. */
        constructor();

        /** s2c_rune_draw_search info. */
        public info?: (msg.sz_draw_info|null);

        /** 抽取道具列表 */
        public reward: msg.sz_prop_tips_data[];
    }

    /** 仓库请求信息 */
    class c2s_rune_draw_storehouse_info {

        /** Constructs a new c2s_rune_draw_storehouse_info. */
        constructor();

        /** 1:请求信息    2:全部取出 */
        public operate: number;
    }

    /** Represents a s2c_rune_draw_storehouse_info. */
    class s2c_rune_draw_storehouse_info {

        /** Constructs a new s2c_rune_draw_storehouse_info. */
        constructor();

        /** 仓库道具 */
        public reward: msg.sz_draw_store[];
    }

    /** 至尊寻宝（cv符文夺宝） /////////// */
    class c2s_supreme_draw_request {

        /** Constructs a new c2s_supreme_draw_request. */
        constructor();
    }

    /** Represents a s2c_supreme_draw_info. */
    class s2c_supreme_draw_info {

        /** Constructs a new s2c_supreme_draw_info. */
        constructor();

        /** 夺宝信息 */
        public info?: (msg.sz_draw_info|null);
    }

    /** 抽奖 */
    class c2s_supreme_draw_search {

        /** Constructs a new c2s_supreme_draw_search. */
        constructor();

        /** 1: 1次（免费）    2: 10次     3: 50次 */
        public type: number;
    }

    /** Represents a s2c_supreme_draw_search. */
    class s2c_supreme_draw_search {

        /** Constructs a new s2c_supreme_draw_search. */
        constructor();

        /** s2c_supreme_draw_search info. */
        public info?: (msg.sz_draw_info|null);

        /** 抽取道具列表 */
        public reward: msg.sz_prop_tips_data[];
    }

    /** 仓库请求信息 */
    class c2s_supreme_draw_storehouse_info {

        /** Constructs a new c2s_supreme_draw_storehouse_info. */
        constructor();

        /** 1:请求信息    2:全部取出 */
        public operate: number;
    }

    /** Represents a s2c_supreme_draw_storehouse_info. */
    class s2c_supreme_draw_storehouse_info {

        /** Constructs a new s2c_supreme_draw_storehouse_info. */
        constructor();

        /** 仓库道具 */
        public reward: msg.sz_draw_store[];
    }

    /** 巅峰寻宝 /////////// */
    class c2s_peak_draw_request {

        /** Constructs a new c2s_peak_draw_request. */
        constructor();
    }

    /** Represents a s2c_peak_draw_info. */
    class s2c_peak_draw_info {

        /** Constructs a new s2c_peak_draw_info. */
        constructor();

        /** 夺宝信息 */
        public info?: (msg.sz_draw_info|null);
    }

    /** 抽奖 */
    class c2s_peak_draw_search {

        /** Constructs a new c2s_peak_draw_search. */
        constructor();

        /** 1: 1次（免费）    2: 10次     3: 50次 */
        public type: number;
    }

    /** Represents a s2c_peak_draw_search. */
    class s2c_peak_draw_search {

        /** Constructs a new s2c_peak_draw_search. */
        constructor();

        /** s2c_peak_draw_search info. */
        public info?: (msg.sz_draw_info|null);

        /** 抽取道具列表 */
        public reward: msg.sz_prop_tips_data[];
    }

    /** 仓库请求信息 */
    class c2s_peak_draw_storehouse_info {

        /** Constructs a new c2s_peak_draw_storehouse_info. */
        constructor();

        /** 1:请求信息    2:全部取出 */
        public operate: number;
    }

    /** Represents a s2c_peak_draw_storehouse_info. */
    class s2c_peak_draw_storehouse_info {

        /** Constructs a new s2c_peak_draw_storehouse_info. */
        constructor();

        /** 仓库道具 */
        public reward: msg.sz_draw_store[];
    }

    /** 八卦寻宝（cv符文夺宝） /////////// */
    class c2s_bagua_draw_request {

        /** Constructs a new c2s_bagua_draw_request. */
        constructor();
    }

    /** Represents a s2c_bagua_draw_info. */
    class s2c_bagua_draw_info {

        /** Constructs a new s2c_bagua_draw_info. */
        constructor();

        /** 夺宝信息 */
        public info?: (msg.sz_draw_info|null);
    }

    /** 抽奖 */
    class c2s_bagua_draw_search {

        /** Constructs a new c2s_bagua_draw_search. */
        constructor();

        /** 1: 1次（免费）    2: 10次     3: 50次 */
        public type: number;
    }

    /** Represents a s2c_bagua_draw_search. */
    class s2c_bagua_draw_search {

        /** Constructs a new s2c_bagua_draw_search. */
        constructor();

        /** s2c_bagua_draw_search info. */
        public info?: (msg.sz_draw_info|null);

        /** 抽取道具列表 */
        public reward: msg.sz_prop_tips_data[];
    }

    /** 仓库请求信息 */
    class c2s_bagua_draw_storehouse_info {

        /** Constructs a new c2s_bagua_draw_storehouse_info. */
        constructor();

        /** 1:请求信息    2:全部取出 */
        public operate: number;
    }

    /** Represents a s2c_bagua_draw_storehouse_info. */
    class s2c_bagua_draw_storehouse_info {

        /** Constructs a new s2c_bagua_draw_storehouse_info. */
        constructor();

        /** 仓库道具 */
        public reward: msg.sz_draw_store[];
    }

    /** Represents a makesInfo. */
    class makesInfo {

        /** Constructs a new makesInfo. */
        constructor();

        /** 类型 */
        public type: number;

        /** 1是0否已买高级战令 */
        public is_buy: number;

        /** 普通领取列表 （战令表 奖励编号） */
        public get_list: number[];

        /** 高级领取列表 （战令表 */
        public super_get_list: number[];

        /** 战令进度 */
        public schedule: number;
    }

    /** Represents a s2c_fight_rwd_info. */
    class s2c_fight_rwd_info {

        /** Constructs a new s2c_fight_rwd_info. */
        constructor();

        /** s2c_fight_rwd_info info. */
        public info: msg.makesInfo[];

        /** 当前等级 */
        public level_index: number;

        /** 当前已闯关 */
        public gate_index: number;

        /** 当前仙符塔 */
        public futa_index: number;

        /** 当前战令经验 */
        public score: number;

        /** 竟技战令当前期数 */
        public task_season_id: number;
    }

    /** 请求信息 */
    class c2s_fight_rwd_req {

        /** Constructs a new c2s_fight_rwd_req. */
        constructor();

        /** 1-3:请求类型 0:全部 */
        public type: number;
    }

    /** 一键领取奖励 */
    class c2s_fight_rwd_get {

        /** Constructs a new c2s_fight_rwd_get. */
        constructor();

        /** 1-3:请求类型 */
        public type: number;

        /** 按列表领取 */
        public list: number[];
    }

    /** 战令 竟技任务 */
    class c2s_fight_task_info {

        /** Constructs a new c2s_fight_task_info. */
        constructor();
    }

    /** Represents a fight_task_item. */
    class fight_task_item {

        /** Constructs a new fight_task_item. */
        constructor();

        /** 状态 0不可领取 1可领取 2已领取 */
        public status: number;

        /** fight_task_item task_index. */
        public task_index: number;
    }

    /** 战令 返回竟技任务 */
    class s2c_fight_task_info {

        /** Constructs a new s2c_fight_task_info. */
        constructor();

        /** 当前战令经验 */
        public score: number;

        /** s2c_fight_task_info daily_tasks. */
        public daily_tasks: msg.fight_task_item[];

        /** s2c_fight_task_info season_tasks. */
        public season_tasks: msg.fight_task_item[];

        /** s2c_fight_task_info daily_end_time. */
        public daily_end_time: number;

        /** s2c_fight_task_info season_end_time. */
        public season_end_time: number;
    }

    /** 爱微游疯狂-获得特殊奖励 */
    class c2s_aiweiyou_rwd_get {

        /** Constructs a new c2s_aiweiyou_rwd_get. */
        constructor();

        /** 1关注 2分享 3初级svip 4高级svip */
        public op: number;

        /** 客户端使用 */
        public client_op: number;
    }

    /** Represents a c2s_aiweiyou_client_set. */
    class c2s_aiweiyou_client_set {

        /** Constructs a new c2s_aiweiyou_client_set. */
        constructor();

        /** 客户端使用 */
        public client_op: number;
    }

    /** Represents a s2c_aiweiyou_rwd_info. */
    class s2c_aiweiyou_rwd_info {

        /** Constructs a new s2c_aiweiyou_rwd_info. */
        constructor();

        /** 0未关注 1可关注 其它已领取 */
        public guanzhu: number;

        /** 0未分享 1-n 已领取次数 */
        public fenxian: number;

        /** 客户端使用 */
        public client_op: number;

        /** 初级svip 0未领取  1可领取 其它已领取 */
        public primary_svip: number;

        /** 高级svip 0未领取  1可领取 其它已领取 */
        public senior_svip: number;
    }

    /** 开局送VIP奖励请求 */
    class c2s_welcome_reward_info {

        /** Constructs a new c2s_welcome_reward_info. */
        constructor();
    }

    /** 开局送VIP奖励应答 */
    class s2c_welcome_reward_gift {

        /** Constructs a new s2c_welcome_reward_gift. */
        constructor();
    }

    /** Represents a prop_tips_box. */
    class prop_tips_box {

        /** Constructs a new prop_tips_box. */
        constructor();

        /** prop_tips_box index. */
        public index: number;

        /** prop_tips_box reward. */
        public reward: msg.prop_tips_data[];
    }

    /** Represents a c2s_task_card_open_ui. */
    class c2s_task_card_open_ui {

        /** Constructs a new c2s_task_card_open_ui. */
        constructor();

        /** 任务卡id */
        public task_index: number;
    }

    /** Represents a c2s_task_card_open_all. */
    class c2s_task_card_open_all {

        /** Constructs a new c2s_task_card_open_all. */
        constructor();
    }

    /** Represents a s2c_task_card_info. */
    class s2c_task_card_info {

        /** Constructs a new s2c_task_card_info. */
        constructor();

        /** 任务卡信息 */
        public items?: (msg.task_card_item|null);
    }

    /** Represents a c2s_task_card_receive_stage_reward. */
    class c2s_task_card_receive_stage_reward {

        /** Constructs a new c2s_task_card_receive_stage_reward. */
        constructor();

        /** c2s_task_card_receive_stage_reward task_index. */
        public task_index: number;

        /** c2s_task_card_receive_stage_reward stage. */
        public stage: number;
    }

    /** Represents a c2s_task_card_direct_completion. */
    class c2s_task_card_direct_completion {

        /** Constructs a new c2s_task_card_direct_completion. */
        constructor();

        /** c2s_task_card_direct_completion task_index. */
        public task_index: number;

        /** c2s_task_card_direct_completion task_id. */
        public task_id: number;

        /** c2s_task_card_direct_completion is_use_score. */
        public is_use_score: boolean;
    }

    /** Represents a task_array_info. */
    class task_array_info {

        /** Constructs a new task_array_info. */
        constructor();

        /** task_array_info task_ids. */
        public task_ids: number[];

        /** 任务小类型 */
        public array_type: number;
    }

    /** Represents a stage_reward_info. */
    class stage_reward_info {

        /** Constructs a new stage_reward_info. */
        constructor();

        /** 阶段 */
        public stage: number;

        /** 状态 0不可领取 1可领取 2已领取 */
        public status: number;
    }

    /** Represents a task_card_item. */
    class task_card_item {

        /** Constructs a new task_card_item. */
        constructor();

        /** task_card_item open_time. */
        public open_time: number;

        /** task_card_item end_time. */
        public end_time: number;

        /** task_card_item rewards. */
        public rewards: msg.stage_reward_info[];

        /** repeated task_array_info task_id_tables = 4; /// 任务id */
        public task_index: number;

        /** 是否激活 */
        public is_buy: boolean;

        /** 1全部 2缺省 */
        public oper: number;

        /** 积分（用于直接完成任务） */
        public score: number;
    }

    /** Represents a s2c_pay_tips_guide. */
    class s2c_pay_tips_guide {

        /** Constructs a new s2c_pay_tips_guide. */
        constructor();

        /** 1死亡 2失败 */
        public tips_reason: number;

        /** 1是2否已购买超值首充 */
        public buy_super_first_charge: number;

        /** 1是2否已购买特权卡打包 */
        public buy_tequan_card: number;
    }

    /** ==========   外观体验功能    ========== */
    class expriences {

        /** Constructs a new expriences. */
        constructor();

        /** id */
        public index: number;

        /** 1幻化中2未幻化 */
        public show: number;
    }

    /** 外观体验 弹窗 */
    class s2c_outline_exprience {

        /** Constructs a new s2c_outline_exprience. */
        constructor();

        /** 体验剩余时间 秒 */
        public timesLeft: number;

        /** 体验过期时间戳 */
        public outTimes: number;

        /** 当前体验中数据列表 */
        public items?: (msg.expriences|null);

        /** s2c_outline_exprience attrs. */
        public attrs?: (msg.attributes|null);
    }

    /** 外观体验 激活 */
    class c2s_outline_exprience {

        /** Constructs a new c2s_outline_exprience. */
        constructor();
    }

    /** 外观体验 过期 */
    class s2c_outline_exprience_over {

        /** Constructs a new s2c_outline_exprience_over. */
        constructor();
    }

    /** 购买礼包 弹窗 */
    class s2c_outline_exprience_product {

        /** Constructs a new s2c_outline_exprience_product. */
        constructor();

        /** 当前可购买商品序号 */
        public curId: number;

        /** 购买过期时间戳 */
        public buyLeftTimes: number;

        /** 商品id */
        public product: number;

        /** 当前礼包战力 */
        public showpower: number;

        /** 1礼包售卖已完成 */
        public gift_over: number;

        /** 1登录时发送 */
        public login_tips: number;
    }

    /** 新服主题冲榜提示 */
    class s2c_rank_buuble_msg {

        /** Constructs a new s2c_rank_buuble_msg. */
        constructor();

        /** s2c_rank_buuble_msg msg. */
        public msg: string;

        /** s2c_rank_buuble_msg entrance. */
        public entrance: string;
    }

    /** 同步客户端加载成功 */
    class c2s_client_ready {

        /** Constructs a new c2s_client_ready. */
        constructor();

        /** 用户id */
        public role_id: Long;

        /** 微信 */
        public weixin_openid: string;
    }

    /** 挂机收益 */
    class s2c_hangup_info {

        /** Constructs a new s2c_hangup_info. */
        constructor();

        /** 当前挂机时间(秒) */
        public hangup_times: number;

        /** 奖励列表 */
        public items: msg.prop_tips_data[];

        /** 当前1是0否可领取 */
        public is_can_get: number;

        /** 可用加速次数 */
        public jia_shu_cn: number;

        /** 加速奖励列表 */
        public speed_list: msg.prop_tips_data[];

        /** 当前加速消耗元宝数量 */
        public jia_shu_cost: number;

        /** 挂机获得的装备数量 */
        public item_count: number;
    }

    /** Represents a s2c_hangup_day_is_max_get. */
    class s2c_hangup_day_is_max_get {

        /** Constructs a new s2c_hangup_day_is_max_get. */
        constructor();

        /** 每日第一满挂机收益标识  0为当日未弹   1为当日已弹 */
        public day_is_pop: number;
    }

    /** Represents a c2s_hangup_get_rwd. */
    class c2s_hangup_get_rwd {

        /** Constructs a new c2s_hangup_get_rwd. */
        constructor();

        /** 1请求挂机收益信息2领取奖励 */
        public op: number;
    }

    /** 挂机收益领取返回 */
    class s2c_hangup_rwd {

        /** Constructs a new s2c_hangup_rwd. */
        constructor();

        /** 领取挂机收益时间(秒) */
        public hangup_times: number;

        /** 奖励列表 */
        public items: msg.prop_tips_data[];

        /** 返回收益类型 1挂机2加速 */
        public rtype: number;
    }

    /** 加速获得收益 */
    class c2s_hangup_rate_rwd {

        /** Constructs a new c2s_hangup_rate_rwd. */
        constructor();
    }

    /** 请求返利数据 */
    class c2s_ask_operate_vip_gift_info {

        /** Constructs a new c2s_ask_operate_vip_gift_info. */
        constructor();

        /** 活动id */
        public act_id: number;
    }

    /** Represents a vip_gift_item. */
    class vip_gift_item {

        /** Constructs a new vip_gift_item. */
        constructor();

        /** vip_gift_item index. */
        public index: number;

        /** vip_gift_item cnt. */
        public cnt: number;
    }

    /** 返回返利数据 */
    class s2c_ask_operate_vip_gift_info {

        /** Constructs a new s2c_ask_operate_vip_gift_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 已经领取的编号 */
        public index_list: msg.vip_gift_item[];
    }

    /** 请求返利 */
    class c2s_ask_operate_get_vip_gift_rwd {

        /** Constructs a new c2s_ask_operate_get_vip_gift_rwd. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** c2s_ask_operate_get_vip_gift_rwd index. */
        public index: number;
    }

    /** Represents a c2s_set_phone_os. */
    class c2s_set_phone_os {

        /** Constructs a new c2s_set_phone_os. */
        constructor();

        /** 1 ios 2 android */
        public os_type: number;
    }

    /** Represents a s2c_set_phone_os. */
    class s2c_set_phone_os {

        /** Constructs a new s2c_set_phone_os. */
        constructor();

        /** 1成功  2.监听此条不成功则重发 */
        public ans: number;
    }

    /** 请求返利数据 */
    class c2s_ask_operate_draw_diamond {

        /** Constructs a new c2s_ask_operate_draw_diamond. */
        constructor();

        /** 活动id */
        public act_id: number;
    }

    /** Represents a draw_daimond_item. */
    class draw_daimond_item {

        /** Constructs a new draw_daimond_item. */
        constructor();

        /** 抽奖档位 */
        public draw_index: number;

        /** 当前可抽奖次数 */
        public draw_cur_num: number;

        /** 剩余可参与次数 */
        public draw_join_num: number;
    }

    /** 记录 */
    class draw_rwd_record {

        /** Constructs a new draw_rwd_record. */
        constructor();

        /** 名字 */
        public name: string;

        /** 档数 */
        public grade: number;

        /** 数量 */
        public cnt: number;

        /** 时间 */
        public times: number;
    }

    /** 返回返利数据 */
    class s2c_ask_operate_draw_diamond {

        /** Constructs a new s2c_ask_operate_draw_diamond. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 档位信息 */
        public list: msg.draw_daimond_item[];

        /** 中奖记录 */
        public records: msg.draw_rwd_record[];
    }

    /** 抽奖滚动消息更新 */
    class s2c_operate_draw_diamond_update {

        /** Constructs a new s2c_operate_draw_diamond_update. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 中奖记录 */
        public records?: (msg.draw_rwd_record|null);
    }

    /** 请求抽奖 */
    class c2s_ask_operate_draw_rwd {

        /** Constructs a new c2s_ask_operate_draw_rwd. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 抽奖档位 */
        public index: number;
    }

    /** 抽奖结果 */
    class s2c_ask_operate_draw_result {

        /** Constructs a new s2c_ask_operate_draw_result. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 抽奖档位 */
        public index: number;

        /** 抽中转盘档位 */
        public rwd_index: number;

        /** 实际奖励金额 */
        public rwd_cnt: number;

        /** 档位信息 */
        public list?: (msg.draw_daimond_item|null);
    }

    /** 品阶相关//////////////////// */
    class c2s_general_infos {

        /** Constructs a new c2s_general_infos. */
        constructor();
    }

    /** Represents a s2c_general_infos. */
    class s2c_general_infos {

        /** Constructs a new s2c_general_infos. */
        constructor();

        /** 品阶信息 */
        public generals: msg.equip_general_data[];
    }

    /** 升级阶部位 */
    class c2s_equip_general {

        /** Constructs a new c2s_equip_general. */
        constructor();

        /** 部位idx */
        public equip_type: number;

        /** 有用到，就发id */
        public percent_id: number;
    }

    /** 升级阶部位返回 */
    class s2c_equip_update_general {

        /** Constructs a new s2c_equip_update_general. */
        constructor();

        /** 品阶信息 */
        public general?: (msg.equip_general_data|null);

        /** 是否升阶成功(成功才会传 品阶信息)   1成功 2.概率不成 3.其他原因(不够消费) */
        public success: number;
    }

    /** 品阶数据 */
    class equip_general_data {

        /** Constructs a new equip_general_data. */
        constructor();

        /** 部位 */
        public equip_type: number;

        /** 等级 */
        public general_lv: number;

        /** 属性 */
        public attrs?: (msg.attributes|null);

        /** 下一级属性 */
        public next_attrs?: (msg.attributes|null);

        /** 需要消耗物品 */
        public cost_props?: (msg.prop_tips_data|null);

        /** 是否可以开始升级  1.开 */
        public is_open: number;

        /** idx */
        public index: number;
    }

    /** 品阶大师升级 */
    class c2s_equip_general_master {

        /** Constructs a new c2s_equip_general_master. */
        constructor();
    }

    /** Represents a general_master_data. */
    class general_master_data {

        /** Constructs a new general_master_data. */
        constructor();

        /** 等级 */
        public index: number;

        /** 下一阶，需要全部等级. 为 0 时,阶级已达到最大 */
        public next_index: number;

        /** 当前属性    0级为空 */
        public attrs?: (msg.attributes|null);

        /** 下一级属性  最高级为空 */
        public next_attrs?: (msg.attributes|null);

        /** 达到标准的件数 */
        public have_get_cnt: number;
    }

    /** Represents a s2c_equip_general_master. */
    class s2c_equip_general_master {

        /** Constructs a new s2c_equip_general_master. */
        constructor();

        /** s2c_equip_general_master info. */
        public info?: (msg.general_master_data|null);
    }

    /** 礼包具体信息 */
    class giftbag {

        /** Constructs a new giftbag. */
        constructor();

        /** 对应礼包index */
        public index: number;

        /** 是否领取 */
        public is_taken: boolean;
    }

    /** 获取返利相关信息 */
    class c2s_invest_info {

        /** Constructs a new c2s_invest_info. */
        constructor();

        /** 42:登录返利 43:闯关返利 */
        public act_type: number;
    }

    /** 领取返利 */
    class c2s_invest_oper {

        /** Constructs a new c2s_invest_oper. */
        constructor();

        /** 42:登录返利 43:闯关返利  44:成长返利 */
        public act_type: number;

        /** 领取对应返利index 投资时缺省 */
        public index: number;

        /** 1:投资 2:领取返利 */
        public oper_type: number;
    }

    /** 返回对应返利所有信息 */
    class s2c_invest_info {

        /** Constructs a new s2c_invest_info. */
        constructor();

        /** 42:登录返利 43:闯关返利 */
        public act_type: number;

        /** s2c_invest_info info. */
        public info: msg.giftbag[];

        /** 当前登录返利、成长返利达到值 */
        public val: number;

        /** true:已经投资 false：没投资 */
        public is_invested: boolean;
    }

    /** 好友/////////////////////////// */
    class friend_info {

        /** Constructs a new friend_info. */
        constructor();

        /** friend_info role_id. */
        public role_id: Long;

        /** friend_info name. */
        public name: string;

        /** friend_info head. */
        public head: Long;

        /** friend_info head_frame. */
        public head_frame: Long;

        /** friend_info sex. */
        public sex: number;

        /** friend_info level. */
        public level: number;

        /** friend_info friendship. */
        public friendship: number;

        /** friend_info guild_name. */
        public guild_name: string;

        /** friend_info is_online. */
        public is_online: number;

        /** friend_info time. */
        public time: number;

        /** friend_info server_name. */
        public server_name: string;

        /** friend_info server_id. */
        public server_id: number;

        /** friend_info showpower. */
        public showpower: Long;

        /** friend_info vip_lv. */
        public vip_lv: number;

        /** friend_info is_friend. */
        public is_friend: boolean;
    }

    /** Represents a c2s_friend_list. */
    class c2s_friend_list {

        /** Constructs a new c2s_friend_list. */
        constructor();

        /** c2s_friend_list type. */
        public type: number;
    }

    /** Represents a s2c_friend_list. */
    class s2c_friend_list {

        /** Constructs a new s2c_friend_list. */
        constructor();

        /** s2c_friend_list type. */
        public type: number;

        /** s2c_friend_list info_list. */
        public info_list: msg.friend_info[];

        /** s2c_friend_list gift_count. */
        public gift_count: number;
    }

    /** Represents an update_friend_data. */
    class update_friend_data {

        /** Constructs a new update_friend_data. */
        constructor();

        /** update_friend_data type. */
        public type: number;

        /** update_friend_data event. */
        public event: number;

        /** update_friend_data info. */
        public info?: (msg.friend_info|null);
    }

    /** Represents a s2c_update_friend_data. */
    class s2c_update_friend_data {

        /** Constructs a new s2c_update_friend_data. */
        constructor();

        /** s2c_update_friend_data list. */
        public list: msg.update_friend_data[];
    }

    /** Represents a c2s_change_recommond_friend. */
    class c2s_change_recommond_friend {

        /** Constructs a new c2s_change_recommond_friend. */
        constructor();
    }

    /** Represents a friend_add_data. */
    class friend_add_data {

        /** Constructs a new friend_add_data. */
        constructor();

        /** friend_add_data role_id. */
        public role_id: Long;

        /** friend_add_data server_id. */
        public server_id: number;
    }

    /** Represents a c2s_friend_apply. */
    class c2s_friend_apply {

        /** Constructs a new c2s_friend_apply. */
        constructor();

        /** c2s_friend_apply role_list. */
        public role_list: msg.friend_add_data[];
    }

    /** Represents a c2s_friend_delete. */
    class c2s_friend_delete {

        /** Constructs a new c2s_friend_delete. */
        constructor();

        /** c2s_friend_delete role_id. */
        public role_id: Long;

        /** c2s_friend_delete server_id. */
        public server_id: number;
    }

    /** Represents a c2s_friend_give_gift. */
    class c2s_friend_give_gift {

        /** Constructs a new c2s_friend_give_gift. */
        constructor();

        /** c2s_friend_give_gift role_id. */
        public role_id: Long;

        /** c2s_friend_give_gift index. */
        public index: number;

        /** c2s_friend_give_gift count. */
        public count: number;
    }

    /** Represents a qiecuo_param_data. */
    class qiecuo_param_data {

        /** Constructs a new qiecuo_param_data. */
        constructor();

        /** qiecuo_param_data type. */
        public type: number;

        /** qiecuo_param_data target_id. */
        public target_id: Long;
    }

    /** Represents a c2s_friend_pvp_challenge. */
    class c2s_friend_pvp_challenge {

        /** Constructs a new c2s_friend_pvp_challenge. */
        constructor();

        /** c2s_friend_pvp_challenge role_id. */
        public role_id: Long;

        /** c2s_friend_pvp_challenge data. */
        public data?: (msg.qiecuo_param_data|null);
    }

    /** 购买 */
    class c2s_realy_bag_buy {

        /** Constructs a new c2s_realy_bag_buy. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** c2s_realy_bag_buy page_idx. */
        public page_idx: number;

        /** c2s_realy_bag_buy buy_idx. */
        public buy_idx: number;
    }

    /** 请求拉取接力礼包信息 */
    class c2s_realy_bag_info {

        /** Constructs a new c2s_realy_bag_info. */
        constructor();

        /** 活动id */
        public act_id: number;
    }

    /** Represents a realy_bag_product. */
    class realy_bag_product {

        /** Constructs a new realy_bag_product. */
        constructor();

        /** realy_bag_product id. */
        public id: number;

        /** 1没买不可买 2 可买 3 已买 */
        public buy_state: number;
    }

    /** 返回信息 */
    class s2c_realy_bag_info {

        /** Constructs a new s2c_realy_bag_info. */
        constructor();

        /** 返回所有已购买id */
        public items: msg.realy_bag_product[];

        /** s2c_realy_bag_info open_day. */
        public open_day: number;
    }

    /** Represents a c2s_first_daily_charge. */
    class c2s_first_daily_charge {

        /** Constructs a new c2s_first_daily_charge. */
        constructor();

        /** c2s_first_daily_charge act_id. */
        public act_id: number;
    }

    /** Represents a s2c_first_daily_charge_info. */
    class s2c_first_daily_charge_info {

        /** Constructs a new s2c_first_daily_charge_info. */
        constructor();

        /** 序号 */
        public index: number;

        /** 0不可领取  1可领取  2已领取 */
        public receive_state: number;
    }

    /** Represents a c2s_first_daily_charge_reward. */
    class c2s_first_daily_charge_reward {

        /** Constructs a new c2s_first_daily_charge_reward. */
        constructor();

        /** c2s_first_daily_charge_reward act_id. */
        public act_id: number;
    }

    /** 小资有礼 //////////////////// */
    class three_int32 {

        /** Constructs a new three_int32. */
        constructor();

        /** three_int32 param1. */
        public param1: number;

        /** three_int32 param2. */
        public param2: number;

        /** three_int32 param3. */
        public param3: number;
    }

    /** Represents a c2s_petty_bourgeois_info. */
    class c2s_petty_bourgeois_info {

        /** Constructs a new c2s_petty_bourgeois_info. */
        constructor();
    }

    /** Represents a s2c_petty_bourgeois_info. */
    class s2c_petty_bourgeois_info {

        /** Constructs a new s2c_petty_bourgeois_info. */
        constructor();

        /** 每日结束时间戳 */
        public daily_time: number;

        /** 赛季结束时间戳 */
        public season_time: number;

        /** 是否购买了银卡 */
        public is_buy_silver: number;

        /** 是否购买了金卡 */
        public is_buy_gold: number;

        /** 是否购买了双卡 */
        public is_buy_all: number;

        /** 赛季ID */
        public season_id: number;

        /** 主界面显示结束时间(这个客户端是否需要？赏金令有) */
        public show_time: number;

        /** 金卡任务状态 param1 第几天（10x表示累计x天的任务，103 105 107） param2 任务ID param2 任务状态(0未完成 1完成 2已领) */
        public list1: msg.three_int32[];

        /** 银卡任务状态 param1 第几天（10x表示累计x天的任务，103 105 107） param2 任务ID param2 任务状态(0未完成 1完成 2已领) */
        public list2: msg.three_int32[];
    }

    /** Represents a c2s_petty_bourgeois_reward. */
    class c2s_petty_bourgeois_reward {

        /** Constructs a new c2s_petty_bourgeois_reward. */
        constructor();

        /** 1:银卡 2:金卡 3:双卡 */
        public card_type: number;

        /** 第几天任务（10x表示累计x天的任务）的奖励 */
        public task_index: number;
    }

    /** Represents a s2c_petty_bourgeois_reward. */
    class s2c_petty_bourgeois_reward {

        /** Constructs a new s2c_petty_bourgeois_reward. */
        constructor();

        /** 1:银卡 2:金卡 3:双卡 */
        public card_type: number;

        /** 第几天任务（10x表示累计x天的任务）的奖励 */
        public task_index: number;

        /** 获得的奖励 */
        public reward: msg.prop_tips_data[];
    }

    /** Represents a c2s_double_eleven_open_ui. */
    class c2s_double_eleven_open_ui {

        /** Constructs a new c2s_double_eleven_open_ui. */
        constructor();

        /** c2s_double_eleven_open_ui act_id. */
        public act_id: number;
    }

    /** Represents a s2c_double_eleven_info. */
    class s2c_double_eleven_info {

        /** Constructs a new s2c_double_eleven_info. */
        constructor();

        /** 每一夺宝类型详情 */
        public items: msg.double_elevent_item[];

        /** 自己消费的夺宝券 */
        public self_coupon: number;

        /** 1全部  2缺省 */
        public oper: number;

        /** 开奖记录 */
        public record: msg.lottery_record[];
    }

    /** Represents a lottery_record. */
    class lottery_record {

        /** Constructs a new lottery_record. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 夺宝类型（配置条件 */
        public index: number;

        /** 开奖时间 */
        public open_time: number;

        /** 获得者 */
        public winner_name: string;

        /** 第几轮 */
        public stage: number;

        /** lottery_record is_robot. */
        public is_robot: boolean;

        /** lottery_record prize_id. */
        public prize_id: number;

        /** lottery_record prize. */
        public prize?: (msg.prop_tips_data|null);
    }

    /** Represents a double_elevent_item. */
    class double_elevent_item {

        /** Constructs a new double_elevent_item. */
        constructor();

        /** 活动类型 */
        public index: number;

        /** 活动目标 */
        public activity_target: number;

        /** 活动进度 */
        public activity_schedule: number;

        /** 结束时间 */
        public end_time: number;

        /** 消耗团购券排名 */
        public datas: msg.operate_rank_data[];

        /** 第几轮 */
        public stage: number;

        /** 当前大奖id（配置序号 */
        public cur_prize_index: number;

        /** 下一轮大奖id */
        public next_prize_index: number;

        /** 自身排名 */
        public self_rank_no: number;

        /** 自身消耗数量 */
        public self_coupon_cnt: number;
    }

    /** Represents a c2s_double_eleven_join_in. */
    class c2s_double_eleven_join_in {

        /** Constructs a new c2s_double_eleven_join_in. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 活动类型 */
        public index: number;

        /** 消费多少券 */
        public coupon_cnt: number;
    }

    /** 请求数据 */
    class c2s_double_eleven_rebate {

        /** Constructs a new c2s_double_eleven_rebate. */
        constructor();

        /** c2s_double_eleven_rebate act_id. */
        public act_id: number;
    }

    /** 返回数据 */
    class s2c_double_eleven_rebate {

        /** Constructs a new s2c_double_eleven_rebate. */
        constructor();

        /** 个人进度（个人返利 */
        public self_schedule: number;

        /** 个人返利 */
        public self_infos: msg.egg_rebate_info[];

        /** 全服进度（全服返利 */
        public full_schedule: number;

        /** 全服返利 */
        public full_infos: msg.egg_rebate_info[];
    }

    /** 获得 */
    class c2s_double_eleven_rebate_reward {

        /** Constructs a new c2s_double_eleven_rebate_reward. */
        constructor();

        /** c2s_double_eleven_rebate_reward act_id. */
        public act_id: number;

        /** --- */
        public index: number;

        /** 返利类型 1全服返利 2个人返利 */
        public rebate_type: number;
    }

    /** Represents an egg_rebate_info. */
    class egg_rebate_info {

        /** Constructs a new egg_rebate_info. */
        constructor();

        /** 目标分数 */
        public target_score: number;

        /** 状态 0未完成 1可领取 2已领取 */
        public state: number;

        /** --- */
        public index: number;
    }

    /** y5 act_type 48 */
    class exchange_info {

        /** Constructs a new exchange_info. */
        constructor();

        /** 兑换的index */
        public index: number;

        /** 已兑换次数  初始为0表示没有兑换过 */
        public cnt: number;

        /** 最大兑换次数 */
        public max_cnt: number;
    }

    /** 获取限时兑换信息 */
    class c2s_limit_exchange_info {

        /** Constructs a new c2s_limit_exchange_info. */
        constructor();

        /** 活动标志 */
        public act_id: number;
    }

    /** 点击兑换 */
    class c2s_limit_exchange_click {

        /** Constructs a new c2s_limit_exchange_click. */
        constructor();

        /** 活动标志 */
        public act_id: number;

        /** 兑换的index */
        public index: number;

        /** 兑换几次 */
        public cnt: number;
    }

    /** 兑换信息 */
    class s2c_limit_exchange_info {

        /** Constructs a new s2c_limit_exchange_info. */
        constructor();

        /** 活动标志 */
        public act_id: number;

        /** 兑换信息，index 可能无序 (点击兑换只发兑换更新的) */
        public info: msg.exchange_info[];
    }

    /** y5 act_type 45 */
    class s2c_all_high {

        /** Constructs a new s2c_all_high. */
        constructor();

        /** s2c_all_high high. */
        public high: number;

        /** s2c_all_high index. */
        public index: number[];

        /** s2c_all_high tasks. */
        public tasks: msg.task_info[];

        /** s2c_all_high act_id. */
        public act_id: number;
    }

    /** Represents a task_info. */
    class task_info {

        /** Constructs a new task_info. */
        constructor();

        /** task_info idx. */
        public idx: number;

        /** task_info cnt_now. */
        public cnt_now: number;

        /** task_info cnt_sum. */
        public cnt_sum: number;
    }

    /** Represents a c2s_all_high. */
    class c2s_all_high {

        /** Constructs a new c2s_all_high. */
        constructor();

        /** c2s_all_high index. */
        public index: number;

        /** c2s_all_high act_id. */
        public act_id: number;
    }

    /** Represents a c2s_all_high_ui. */
    class c2s_all_high_ui {

        /** Constructs a new c2s_all_high_ui. */
        constructor();

        /** c2s_all_high_ui act_id. */
        public act_id: number;
    }

    /** y5 act_type 46 */
    class c2s_kaiyuntie_ui {

        /** Constructs a new c2s_kaiyuntie_ui. */
        constructor();

        /** c2s_kaiyuntie_ui act_id. */
        public act_id: number;
    }

    /** Represents a s2c_kaiyuntie_info. */
    class s2c_kaiyuntie_info {

        /** Constructs a new s2c_kaiyuntie_info. */
        constructor();

        /** 活动标志 */
        public act_id: number;

        /** 可抽奖次数 */
        public cnt: number;

        /** 转盘信息 */
        public show: msg.ctrl_find_treasure[];
    }

    /** Represents a c2s_kaiyuntie_draw. */
    class c2s_kaiyuntie_draw {

        /** Constructs a new c2s_kaiyuntie_draw. */
        constructor();

        /** c2s_kaiyuntie_draw act_id. */
        public act_id: number;
    }

    /** 获取信息 */
    class c2s_cornucopia_info {

        /** Constructs a new c2s_cornucopia_info. */
        constructor();

        /** c2s_cornucopia_info act_id. */
        public act_id: number;
    }

    /** 领取奖励 */
    class c2s_cornucopia_reward {

        /** Constructs a new c2s_cornucopia_reward. */
        constructor();

        /** c2s_cornucopia_reward act_id. */
        public act_id: number;
    }

    /** 返回信息 */
    class s2c_cornucopia_info {

        /** Constructs a new s2c_cornucopia_info. */
        constructor();

        /** s2c_cornucopia_info act_id. */
        public act_id: number;

        /** 昨天消耗数量 昨天不可领取发nil */
        public yesterday_cost_cnt: number;

        /** 今天消耗数量 今天没消耗：0 */
        public today_cost_cnt: number;
    }

    /** y5 act_type 43 */
    class january_sign {

        /** Constructs a new january_sign. */
        constructor();

        /** january_sign day_num. */
        public day_num: number;

        /** 1可领未领 2已领 */
        public status: number;
    }

    /** 签到信息 */
    class s2c_january_login_info {

        /** Constructs a new s2c_january_login_info. */
        constructor();

        /** s2c_january_login_info act_id. */
        public act_id: number;

        /** 已签到天数 */
        public signs: msg.january_sign[];

        /** 已领取累计签到奖励 */
        public reward: number[];

        /** 当前可以签到的天数 */
        public can_sign: number;
    }

    /** 打开UI请求签到信息 */
    class c2s_january_login_open_ui {

        /** Constructs a new c2s_january_login_open_ui. */
        constructor();

        /** c2s_january_login_open_ui act_id. */
        public act_id: number;
    }

    /** 领取每日奖励 */
    class c2s_january_login_recv_sign {

        /** Constructs a new c2s_january_login_recv_sign. */
        constructor();

        /** c2s_january_login_recv_sign act_id. */
        public act_id: number;

        /** c2s_january_login_recv_sign day_num. */
        public day_num: number;
    }

    /** 补签 */
    class c2s_january_login_sign {

        /** Constructs a new c2s_january_login_sign. */
        constructor();

        /** c2s_january_login_sign act_id. */
        public act_id: number;

        /** 签到日期 */
        public day_num: number;
    }

    /** 领取累计签到奖励 */
    class c2s_january_login_cumulate_reward {

        /** Constructs a new c2s_january_login_cumulate_reward. */
        constructor();

        /** c2s_january_login_cumulate_reward act_id. */
        public act_id: number;

        /** 累计签到奖励(阶段) */
        public stage: number;
    }

    /** y5 act_type 41 */
    class c2s_limit_free_order_ui {

        /** Constructs a new c2s_limit_free_order_ui. */
        constructor();

        /** c2s_limit_free_order_ui act_id. */
        public act_id: number;
    }

    /** Represents a c2s_limit_free_order_buy. */
    class c2s_limit_free_order_buy {

        /** Constructs a new c2s_limit_free_order_buy. */
        constructor();

        /** c2s_limit_free_order_buy index. */
        public index: number;

        /** c2s_limit_free_order_buy act_id. */
        public act_id: number;
    }

    /** Represents a c2s_limit_free_order_cnt. */
    class c2s_limit_free_order_cnt {

        /** Constructs a new c2s_limit_free_order_cnt. */
        constructor();

        /** c2s_limit_free_order_cnt act_id. */
        public act_id: number;
    }

    /** Represents a s2c_limit_free_order_lucky. */
    class s2c_limit_free_order_lucky {

        /** Constructs a new s2c_limit_free_order_lucky. */
        constructor();

        /** s2c_limit_free_order_lucky index. */
        public index: number;

        /** s2c_limit_free_order_lucky is_lucky. */
        public is_lucky: number;

        /** s2c_limit_free_order_lucky act_id. */
        public act_id: number;
    }

    /** Represents a s2c_limit_free_order_info. */
    class s2c_limit_free_order_info {

        /** Constructs a new s2c_limit_free_order_info. */
        constructor();

        /** s2c_limit_free_order_info goods. */
        public goods: msg.limit_free_info[];

        /** s2c_limit_free_order_info cnt. */
        public cnt: number;

        /** s2c_limit_free_order_info refresh_cnt. */
        public refresh_cnt: number;

        /** s2c_limit_free_order_info vip_cnt. */
        public vip_cnt: number;

        /** s2c_limit_free_order_info act_id. */
        public act_id: number;
    }

    /** Represents a limit_free_info. */
    class limit_free_info {

        /** Constructs a new limit_free_info. */
        constructor();

        /** limit_free_info index. */
        public index: number;

        /** limit_free_info cnt. */
        public cnt: number;
    }

    /** Represents a c2s_redpack_rain_info. */
    class c2s_redpack_rain_info {

        /** Constructs a new c2s_redpack_rain_info. */
        constructor();

        /** c2s_redpack_rain_info act_id. */
        public act_id: number;
    }

    /** Represents a s2c_redpack_rain_info. */
    class s2c_redpack_rain_info {

        /** Constructs a new s2c_redpack_rain_info. */
        constructor();

        /** s2c_redpack_rain_info act_id. */
        public act_id: number;

        /** 当前获得红包次数 */
        public get_count: number;
    }

    /** 打开一个红包 */
    class c2s_redpack_rain_select {

        /** Constructs a new c2s_redpack_rain_select. */
        constructor();

        /** c2s_redpack_rain_select act_id. */
        public act_id: number;
    }

    /** Represents a s2c_redpack_rain_select. */
    class s2c_redpack_rain_select {

        /** Constructs a new s2c_redpack_rain_select. */
        constructor();

        /** s2c_redpack_rain_select act_id. */
        public act_id: number;

        /** s2c_redpack_rain_select get_count. */
        public get_count: number;
    }

    /** 红包榜 /////////////////// */
    class two_int32 {

        /** Constructs a new two_int32. */
        constructor();

        /** two_int32 param1. */
        public param1: number;

        /** two_int32 param2. */
        public param2: number;
    }

    /** Represents a c2s_redpack_rank_open_ui. */
    class c2s_redpack_rank_open_ui {

        /** Constructs a new c2s_redpack_rank_open_ui. */
        constructor();

        /** c2s_redpack_rank_open_ui act_id. */
        public act_id: number;
    }

    /** Represents a s2c_redpack_rank_open_ui. */
    class s2c_redpack_rank_open_ui {

        /** Constructs a new s2c_redpack_rank_open_ui. */
        constructor();

        /** s2c_redpack_rank_open_ui act_id. */
        public act_id: number;

        /** 充值红包数据 param1:红包类型 param2:红包个数 */
        public charge_list: msg.two_int32[];

        /** 拜年红包已发次数 */
        public send_count: number;

        /** 默认金额 */
        public def_payment: number;

        /** 默认个数 */
        public def_count: number;
    }

    /** Represents a c2s_redpack_rank_send. */
    class c2s_redpack_rank_send {

        /** Constructs a new c2s_redpack_rank_send. */
        constructor();

        /** c2s_redpack_rank_send act_id. */
        public act_id: number;

        /** 红包类型 0拜年红包 其他的对应商品ID */
        public rp_type: number;

        /** 红包金额(拜年红包) */
        public payment: number;

        /** 红包个数(拜年红包) */
        public count: number;
    }

    /** Represents a str_int32. */
    class str_int32 {

        /** Constructs a new str_int32. */
        constructor();

        /** str_int32 str_param. */
        public str_param: string;

        /** str_int32 num_param. */
        public num_param: number;
    }

    /** 红包封面数据 */
    class redpack_title_page {

        /** Constructs a new redpack_title_page. */
        constructor();

        /** 红包ID */
        public redpack_id: number;

        /** 红包类型 0拜年红包 其他的对应商品ID */
        public redpack_type: number;

        /** 发送者名字 */
        public name: string;

        /** 红包结束时间 */
        public end_time: number;
    }

    /** 红包内容数据 */
    class redpack_info {

        /** Constructs a new redpack_info. */
        constructor();

        /** 红包ID */
        public redpack_id: number;

        /** 红包类型 0拜年红包 其他的对应商品ID */
        public redpack_type: number;

        /** 红包结束时间 */
        public end_time: number;

        /** 头像框 */
        public head: number;

        /** redpack_info agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 头像 */
        public head_frame: number;

        /** 性别 */
        public sex: number;

        /** 发送者名字 */
        public name: string;

        /** 我获得的 */
        public my_count: number;

        /** 已领取数量 */
        public get_count: number;

        /** 红包总数 */
        public max_count: number;

        /** 领取红包的玩家信息 str_param:玩家名 num_param:获得的数量 */
        public role_list: msg.str_int32[];

        /** 领取状态 0正常领取  1已被全部领取 2已过期 */
        public result: number;
    }

    /** Represents a c2s_redpack_rank_list. */
    class c2s_redpack_rank_list {

        /** Constructs a new c2s_redpack_rank_list. */
        constructor();

        /** c2s_redpack_rank_list act_id. */
        public act_id: number;
    }

    /** Represents a s2c_redpack_rank_list. */
    class s2c_redpack_rank_list {

        /** Constructs a new s2c_redpack_rank_list. */
        constructor();

        /** s2c_redpack_rank_list act_id. */
        public act_id: number;

        /** 当前可打开的红包 */
        public list: msg.redpack_title_page[];
    }

    /** Represents a s2c_redpack_rank_update. */
    class s2c_redpack_rank_update {

        /** Constructs a new s2c_redpack_rank_update. */
        constructor();

        /** s2c_redpack_rank_update act_id. */
        public act_id: number;

        /** 获得一个红包 */
        public info?: (msg.redpack_title_page|null);
    }

    /** Represents a c2s_redpack_rank_open_redpack. */
    class c2s_redpack_rank_open_redpack {

        /** Constructs a new c2s_redpack_rank_open_redpack. */
        constructor();

        /** c2s_redpack_rank_open_redpack act_id. */
        public act_id: number;

        /** 红包ID */
        public redpack_id: number;
    }

    /** Represents a s2c_redpack_rank_open_redpack. */
    class s2c_redpack_rank_open_redpack {

        /** Constructs a new s2c_redpack_rank_open_redpack. */
        constructor();

        /** s2c_redpack_rank_open_redpack act_id. */
        public act_id: number;

        /** s2c_redpack_rank_open_redpack info. */
        public info?: (msg.redpack_info|null);
    }

    /** Represents a c2s_redpack_rank_task. */
    class c2s_redpack_rank_task {

        /** Constructs a new c2s_redpack_rank_task. */
        constructor();

        /** c2s_redpack_rank_task act_id. */
        public act_id: number;
    }

    /** Represents a s2c_redpack_rank_task. */
    class s2c_redpack_rank_task {

        /** Constructs a new s2c_redpack_rank_task. */
        constructor();

        /** s2c_redpack_rank_task act_id. */
        public act_id: number;

        /** 我的积分 */
        public score: number;

        /** 返利奖状态 param1返利ID param2状态 0不可领1可领2已领 */
        public reward: msg.two_int32[];
    }

    /** Represents a c2s_redpack_rank_get_prize. */
    class c2s_redpack_rank_get_prize {

        /** Constructs a new c2s_redpack_rank_get_prize. */
        constructor();

        /** c2s_redpack_rank_get_prize act_id. */
        public act_id: number;

        /** 返利ID */
        public index: number;
    }

    /** Represents a c2s_redpack_rank_rank_info. */
    class c2s_redpack_rank_rank_info {

        /** Constructs a new c2s_redpack_rank_rank_info. */
        constructor();

        /** c2s_redpack_rank_rank_info act_id. */
        public act_id: number;
    }

    /** Represents a s2c_redpack_rank_rank_info. */
    class s2c_redpack_rank_rank_info {

        /** Constructs a new s2c_redpack_rank_rank_info. */
        constructor();

        /** s2c_redpack_rank_rank_info act_id. */
        public act_id: number;

        /** s2c_redpack_rank_rank_info datas. */
        public datas: msg.operate_rank_data[];

        /** 自己名次 */
        public rank_no: number;

        /** 自己的分数 */
        public client_score: Long;
    }

    /** Represents a c2s_jianxianzhiyi_req. */
    class c2s_jianxianzhiyi_req {

        /** Constructs a new c2s_jianxianzhiyi_req. */
        constructor();
    }

    /** Represents a s2c_jianxianzhiyi_info_rep. */
    class s2c_jianxianzhiyi_info_rep {

        /** Constructs a new s2c_jianxianzhiyi_info_rep. */
        constructor();

        /** s2c_jianxianzhiyi_info_rep isupdate. */
        public isupdate: boolean;

        /** s2c_jianxianzhiyi_info_rep infos. */
        public infos: msg.jianxianzhiyi_info[];
    }

    /** Represents a jianxianzhiyi_info. */
    class jianxianzhiyi_info {

        /** Constructs a new jianxianzhiyi_info. */
        constructor();

        /** 命格index */
        public index: number;

        /** 镶嵌的二进制槽位 00000000000000000000000000001111 已经镶嵌的位 */
        public slots: number;

        /** jianxianzhiyi_info slot_info. */
        public slot_info: msg.jianxianzhiyi_slot[];
    }

    /** Represents a jianxianzhiyi_slot. */
    class jianxianzhiyi_slot {

        /** Constructs a new jianxianzhiyi_slot. */
        constructor();

        /** jianxianzhiyi_slot slot. */
        public slot: number;

        /** 命格等级 */
        public level: number;

        /** jianxianzhiyi_slot exp. */
        public exp: number;

        /** jianxianzhiyi_slot max_exp. */
        public max_exp: number;

        /** 当前等级属性 */
        public level_attrs?: (msg.attributes|null);

        /** 镶嵌部位属性 */
        public inlay_attrs?: (msg.attributes|null);

        /** 下一等级属性 */
        public next_level_attrs?: (msg.attributes|null);

        /** 升级消耗 */
        public next_level_cost: msg.prop_tips_data[];
    }

    /** Represents a c2s_jianxianzhiyi_level_up_req. */
    class c2s_jianxianzhiyi_level_up_req {

        /** Constructs a new c2s_jianxianzhiyi_level_up_req. */
        constructor();

        /** c2s_jianxianzhiyi_level_up_req index. */
        public index: number;

        /** c2s_jianxianzhiyi_level_up_req slot. */
        public slot: number;
    }

    /** Represents a c2s_jianxianzhiyi_inlay_req. */
    class c2s_jianxianzhiyi_inlay_req {

        /** Constructs a new c2s_jianxianzhiyi_inlay_req. */
        constructor();

        /** c2s_jianxianzhiyi_inlay_req index. */
        public index: number;
    }

    /** s2c_lucky_break_egg_draw 只有lucky_score */
    class c2s_lucky_break_egg_open_ui {

        /** Constructs a new c2s_lucky_break_egg_open_ui. */
        constructor();

        /** c2s_lucky_break_egg_open_ui act_id. */
        public act_id: number;

        /** 1黄金蛋池，2铂金蛋池，3钻石蛋池 */
        public type: number;
    }

    /** Represents a c2s_lucky_break_egg_draw. */
    class c2s_lucky_break_egg_draw {

        /** Constructs a new c2s_lucky_break_egg_draw. */
        constructor();

        /** c2s_lucky_break_egg_draw act_id. */
        public act_id: number;

        /** c2s_lucky_break_egg_draw type. */
        public type: number;

        /** 1次或者10次 */
        public draw_cnt: number;
    }

    /** Represents a s2c_lucky_break_egg_draw. */
    class s2c_lucky_break_egg_draw {

        /** Constructs a new s2c_lucky_break_egg_draw. */
        constructor();

        /** s2c_lucky_break_egg_draw lucky_score. */
        public lucky_score: number;

        /** s2c_lucky_break_egg_draw rewards. */
        public rewards: msg.sz_prop_tips_data[];

        /** s2c_lucky_break_egg_draw type. */
        public type: number;
    }

    /** Represents a c2s_lucky_break_egg_rank_info. */
    class c2s_lucky_break_egg_rank_info {

        /** Constructs a new c2s_lucky_break_egg_rank_info. */
        constructor();

        /** c2s_lucky_break_egg_rank_info act_id. */
        public act_id: number;
    }

    /** Represents a s2c_lucky_break_egg_rank_info. */
    class s2c_lucky_break_egg_rank_info {

        /** Constructs a new s2c_lucky_break_egg_rank_info. */
        constructor();

        /** s2c_lucky_break_egg_rank_info client_score. */
        public client_score: number;

        /** 自己排名 */
        public myself_rank_no: number;

        /** s2c_lucky_break_egg_rank_info datas. */
        public datas: msg.operate_rank_data[];
    }

    /** 砸蛋返利/////////////////////////////// */
    class c2s_lucky_break_egg_rebate {

        /** Constructs a new c2s_lucky_break_egg_rebate. */
        constructor();

        /** c2s_lucky_break_egg_rebate act_id. */
        public act_id: number;
    }

    /** Represents a s2c_lucky_break_egg_rebate. */
    class s2c_lucky_break_egg_rebate {

        /** Constructs a new s2c_lucky_break_egg_rebate. */
        constructor();

        /** s2c_lucky_break_egg_rebate client_score. */
        public client_score: number;

        /** s2c_lucky_break_egg_rebate infos. */
        public infos: msg.egg_rebate_info[];
    }

    /** Represents a c2s_lucky_break_egg_rebate_reward. */
    class c2s_lucky_break_egg_rebate_reward {

        /** Constructs a new c2s_lucky_break_egg_rebate_reward. */
        constructor();

        /** c2s_lucky_break_egg_rebate_reward act_id. */
        public act_id: number;

        /** --- */
        public index: number;
    }

    /** 砸蛋宝库/////////////////////////////// */
    class c2s_egg_exchange_open_ui {

        /** Constructs a new c2s_egg_exchange_open_ui. */
        constructor();

        /** c2s_egg_exchange_open_ui act_id. */
        public act_id: number;
    }

    /** Represents a s2c_egg_exchange_info. */
    class s2c_egg_exchange_info {

        /** Constructs a new s2c_egg_exchange_info. */
        constructor();

        /** 兑换信息 */
        public items: msg.egg_exchange_item[];
    }

    /** Represents an egg_exchange_item. */
    class egg_exchange_item {

        /** Constructs a new egg_exchange_item. */
        constructor();

        /** egg_exchange_item index. */
        public index: number;

        /** 兑换消耗的道具信息 */
        public props: msg.prop_tips_data[];

        /** 可兑换次数 */
        public can_exchange_cnt: number;

        /** 最大兑换次数 */
        public max_exchange_cnt: number;

        /** 是否兑换提醒 */
        public is_notice: boolean;
    }

    /** Represents a c2s_egg_exchange. */
    class c2s_egg_exchange {

        /** Constructs a new c2s_egg_exchange. */
        constructor();

        /** c2s_egg_exchange act_id. */
        public act_id: number;

        /** c2s_egg_exchange index. */
        public index: number;

        /** 兑换多少次 */
        public exchange_cnt: number;
    }

    /** Represents a c2s_egg_exchange_notice. */
    class c2s_egg_exchange_notice {

        /** Constructs a new c2s_egg_exchange_notice. */
        constructor();

        /** c2s_egg_exchange_notice act_id. */
        public act_id: number;

        /** c2s_egg_exchange_notice index. */
        public index: number;

        /** 1提醒 0不提醒 */
        public notice_type: number;
    }

    /** 盲盒抽奖 /////////////////// */
    class rush_buy_page_info {

        /** Constructs a new rush_buy_page_info. */
        constructor();

        /** rush_buy_page_info index. */
        public index: number;

        /** rush_buy_page_info round. */
        public round: number;

        /** rush_buy_page_info is_specil. */
        public is_specil: number;

        /** rush_buy_page_info big_prize. */
        public big_prize?: (msg.prop_tips_data|null);

        /** rush_buy_page_info model. */
        public model?: (msg.operate_rank_data|null);

        /** rush_buy_page_info box_info. */
        public box_info: msg.three_int32[];
    }

    /** Represents a c2s_rush_to_buy_open_ui. */
    class c2s_rush_to_buy_open_ui {

        /** Constructs a new c2s_rush_to_buy_open_ui. */
        constructor();

        /** c2s_rush_to_buy_open_ui act_id. */
        public act_id: number;
    }

    /** Represents a s2c_rush_to_buy_open_ui. */
    class s2c_rush_to_buy_open_ui {

        /** Constructs a new s2c_rush_to_buy_open_ui. */
        constructor();

        /** s2c_rush_to_buy_open_ui page_info. */
        public page_info: msg.rush_buy_page_info[];
    }

    /** Represents a c2s_rush_to_buy_close_ui. */
    class c2s_rush_to_buy_close_ui {

        /** Constructs a new c2s_rush_to_buy_close_ui. */
        constructor();

        /** c2s_rush_to_buy_close_ui act_id. */
        public act_id: number;
    }

    /** Represents a c2s_rush_to_buy_select_page. */
    class c2s_rush_to_buy_select_page {

        /** Constructs a new c2s_rush_to_buy_select_page. */
        constructor();

        /** c2s_rush_to_buy_select_page act_id. */
        public act_id: number;

        /** c2s_rush_to_buy_select_page page_index. */
        public page_index: number;
    }

    /** Represents a s2c_rush_to_buy_page_update. */
    class s2c_rush_to_buy_page_update {

        /** Constructs a new s2c_rush_to_buy_page_update. */
        constructor();

        /** s2c_rush_to_buy_page_update page_info. */
        public page_info?: (msg.rush_buy_page_info|null);
    }

    /** Represents a c2s_rush_to_buy_page_info. */
    class c2s_rush_to_buy_page_info {

        /** Constructs a new c2s_rush_to_buy_page_info. */
        constructor();

        /** c2s_rush_to_buy_page_info act_id. */
        public act_id: number;

        /** c2s_rush_to_buy_page_info page_index. */
        public page_index: number;

        /** c2s_rush_to_buy_page_info count. */
        public count: number;

        /** c2s_rush_to_buy_page_info box_id. */
        public box_id: number;

        /** c2s_rush_to_buy_page_info round. */
        public round: number;
    }

    /** Represents a s2c_rush_to_buy_page_info. */
    class s2c_rush_to_buy_page_info {

        /** Constructs a new s2c_rush_to_buy_page_info. */
        constructor();

        /** s2c_rush_to_buy_page_info page_index. */
        public page_index: number;

        /** s2c_rush_to_buy_page_info reward. */
        public reward: msg.prop_tips_data[];

        /** s2c_rush_to_buy_page_info lave_count. */
        public lave_count: number;

        /** s2c_rush_to_buy_page_info box_id. */
        public box_id: number;

        /** s2c_rush_to_buy_page_info get_score. */
        public get_score: number;
    }

    /** Represents a c2s_rush_to_buy_history_list. */
    class c2s_rush_to_buy_history_list {

        /** Constructs a new c2s_rush_to_buy_history_list. */
        constructor();

        /** c2s_rush_to_buy_history_list act_id. */
        public act_id: number;

        /** c2s_rush_to_buy_history_list page_index. */
        public page_index: number;
    }

    /** Represents a s2c_rush_to_buy_history_list. */
    class s2c_rush_to_buy_history_list {

        /** Constructs a new s2c_rush_to_buy_history_list. */
        constructor();

        /** s2c_rush_to_buy_history_list page_index. */
        public page_index: number;

        /** s2c_rush_to_buy_history_list record. */
        public record: msg.lottery_record[];
    }

    /** Represents a c2s_rush_to_buy_bet_double. */
    class c2s_rush_to_buy_bet_double {

        /** Constructs a new c2s_rush_to_buy_bet_double. */
        constructor();

        /** c2s_rush_to_buy_bet_double act_id. */
        public act_id: number;

        /** c2s_rush_to_buy_bet_double page_index. */
        public page_index: number;
    }

    /** Represents a s2c_rush_to_buy_bet_double. */
    class s2c_rush_to_buy_bet_double {

        /** Constructs a new s2c_rush_to_buy_bet_double. */
        constructor();

        /** s2c_rush_to_buy_bet_double odd_number. */
        public odd_number: number;

        /** s2c_rush_to_buy_bet_double even_number. */
        public even_number: number;

        /** s2c_rush_to_buy_bet_double bet_count. */
        public bet_count?: (msg.prop_tips_data|null);

        /** s2c_rush_to_buy_bet_double page_index. */
        public page_index: number;
    }

    /** Represents a c2s_rush_to_buy_bet_score. */
    class c2s_rush_to_buy_bet_score {

        /** Constructs a new c2s_rush_to_buy_bet_score. */
        constructor();

        /** c2s_rush_to_buy_bet_score act_id. */
        public act_id: number;

        /** c2s_rush_to_buy_bet_score page_index. */
        public page_index: number;

        /** c2s_rush_to_buy_bet_score bet_type. */
        public bet_type: number;

        /** c2s_rush_to_buy_bet_score bet_score. */
        public bet_score: number;
    }

    /** Represents a shop_item_info. */
    class shop_item_info {

        /** Constructs a new shop_item_info. */
        constructor();

        /** shop_item_info index. */
        public index: number;

        /** shop_item_info item. */
        public item?: (msg.prop_tips_data|null);

        /** shop_item_info price. */
        public price: number;

        /** shop_item_info buy_type. */
        public buy_type: number;

        /** shop_item_info buy_limit. */
        public buy_limit: number;

        /** shop_item_info buy_count. */
        public buy_count: number;

        /** shop_item_info notice_type. */
        public notice_type: number;
    }

    /** Represents a c2s_rush_to_buy_store. */
    class c2s_rush_to_buy_store {

        /** Constructs a new c2s_rush_to_buy_store. */
        constructor();

        /** c2s_rush_to_buy_store act_id. */
        public act_id: number;
    }

    /** Represents a s2c_rush_to_buy_store. */
    class s2c_rush_to_buy_store {

        /** Constructs a new s2c_rush_to_buy_store. */
        constructor();

        /** s2c_rush_to_buy_store list. */
        public list: msg.shop_item_info[];
    }

    /** Represents a c2s_rush_to_buy_shopping. */
    class c2s_rush_to_buy_shopping {

        /** Constructs a new c2s_rush_to_buy_shopping. */
        constructor();

        /** c2s_rush_to_buy_shopping act_id. */
        public act_id: number;

        /** c2s_rush_to_buy_shopping goods_idx. */
        public goods_idx: number;

        /** c2s_rush_to_buy_shopping count. */
        public count: number;
    }

    /** Represents a c2s_rush_to_buy_notice. */
    class c2s_rush_to_buy_notice {

        /** Constructs a new c2s_rush_to_buy_notice. */
        constructor();

        /** c2s_rush_to_buy_notice act_id. */
        public act_id: number;

        /** c2s_rush_to_buy_notice index. */
        public index: number;

        /** c2s_rush_to_buy_notice notice_type. */
        public notice_type: number;
    }

    /** Represents a c2s_rush_to_buy_preview. */
    class c2s_rush_to_buy_preview {

        /** Constructs a new c2s_rush_to_buy_preview. */
        constructor();

        /** c2s_rush_to_buy_preview act_id. */
        public act_id: number;

        /** c2s_rush_to_buy_preview page_index. */
        public page_index: number;
    }

    /** Represents a preview_item. */
    class preview_item {

        /** Constructs a new preview_item. */
        constructor();

        /** preview_item reward. */
        public reward?: (msg.prop_tips_data|null);

        /** preview_item last. */
        public last: number;

        /** preview_item total. */
        public total: number;

        /** preview_item param. */
        public param: number;
    }

    /** Represents a s2c_rush_to_buy_preview. */
    class s2c_rush_to_buy_preview {

        /** Constructs a new s2c_rush_to_buy_preview. */
        constructor();

        /** s2c_rush_to_buy_preview page_index. */
        public page_index: number;

        /** s2c_rush_to_buy_preview list. */
        public list: msg.preview_item[];
    }

    /** 幻兽 /////////////// */
    class unrealbeast_skill {

        /** Constructs a new unrealbeast_skill. */
        constructor();

        /** 技能idx */
        public index: number;

        /** 等级 */
        public level: number;
    }

    /** Represents a c2s_unrealbeast_info. */
    class c2s_unrealbeast_info {

        /** Constructs a new c2s_unrealbeast_info. */
        constructor();
    }

    /** Represents an unreal_beast_info. */
    class unreal_beast_info {

        /** Constructs a new unreal_beast_info. */
        constructor();

        /** 幻兽idx */
        public index: number;

        /** 是否激活 */
        public active: boolean;

        /** 是否附身 */
        public possess: boolean;

        /** 战力 */
        public showpower: Long;

        /** 属性 */
        public attr?: (msg.attributes|null);

        /** 专有技能 */
        public skill: number;

        /** 装备 */
        public equips: msg.prop_attributes[];
    }

    /** Represents a s2c_unrealbeast_info. */
    class s2c_unrealbeast_info {

        /** Constructs a new s2c_unrealbeast_info. */
        constructor();

        /** 当前附身数量 */
        public possess_cnt: number;

        /** 最大附身数量 */
        public possess_max: number;

        /** 通用技能 */
        public skills: msg.unrealbeast_skill[];

        /** 幻兽信息列表 */
        public beasts: msg.unreal_beast_info[];
    }

    /** Represents a c2s_unrealbeast_possess. */
    class c2s_unrealbeast_possess {

        /** Constructs a new c2s_unrealbeast_possess. */
        constructor();

        /** 幻兽idx */
        public index: number;
    }

    /** Represents a c2s_unrealbeast_add_possess. */
    class c2s_unrealbeast_add_possess {

        /** Constructs a new c2s_unrealbeast_add_possess. */
        constructor();
    }

    /** Represents a c2s_unrealbeast_skill_up. */
    class c2s_unrealbeast_skill_up {

        /** Constructs a new c2s_unrealbeast_skill_up. */
        constructor();

        /** 技能idx */
        public skill_idx: number;
    }

    /** Represents a c2s_unrealbeast_equip_oper. */
    class c2s_unrealbeast_equip_oper {

        /** Constructs a new c2s_unrealbeast_equip_oper. */
        constructor();

        /** 1：穿  2：脱  3：一键穿戴 4:一键卸载 5:合成 6:一键合成 7:分解 8:强化 9:分解查询 */
        public oper_type: number;

        /** 幻兽idx */
        public beast_idx: number;

        /** 幻兽装备prop_id */
        public prop_id: Long[];
    }

    /** Represents an unrealbeast_prop_info. */
    class unrealbeast_prop_info {

        /** Constructs a new unrealbeast_prop_info. */
        constructor();

        /** unrealbeast_prop_info idx. */
        public idx: number;

        /** unrealbeast_prop_info cnt. */
        public cnt: number;
    }

    /** Represents a s2c_unrealbeast_equip_oper. */
    class s2c_unrealbeast_equip_oper {

        /** Constructs a new s2c_unrealbeast_equip_oper. */
        constructor();

        /** s2c_unrealbeast_equip_oper props. */
        public props: msg.unrealbeast_prop_info[];
    }

    /** boss伤害 无序 */
    class huan_shou_boss_damage {

        /** Constructs a new huan_shou_boss_damage. */
        constructor();

        /** 名字 */
        public name: string;

        /** 伤害 */
        public damage: Long;

        /** 角色id */
        public role_id: Long;

        /** 角色区服 */
        public server_id: number;

        /** 角色entity_id */
        public entity_id: number;
    }

    /** boss 伤害列表 无序 */
    class s2c_huan_shou_boss_damage_rep {

        /** Constructs a new s2c_huan_shou_boss_damage_rep. */
        constructor();

        /** s2c_huan_shou_boss_damage_rep damages. */
        public damages: msg.huan_shou_boss_damage[];
    }

    /** 请求boss 伤害列表 请求1次后该boss受到伤害会主动推 */
    class c2s_huan_shou_boss_damage_req {

        /** Constructs a new c2s_huan_shou_boss_damage_req. */
        constructor();
    }

    /** 幻兽boss信息 */
    class c2s_huan_shou_boss_info_req {

        /** Constructs a new c2s_huan_shou_boss_info_req. */
        constructor();
    }

    /** Represents a s2c_huan_shou_boss_info_rep. */
    class s2c_huan_shou_boss_info_rep {

        /** Constructs a new s2c_huan_shou_boss_info_rep. */
        constructor();

        /** 今天进入玩法的次数 */
        public today_enter_cnt: number;

        /** 今天购买次数 */
        public today_buy_cnt: number;

        /** 可进入次数 */
        public today_total_cnt: number;

        /** boss信息 */
        public infos: msg.huan_shou_boss_info[];
    }

    /** Represents a huan_shou_boss_info. */
    class huan_shou_boss_info {

        /** Constructs a new huan_shou_boss_info. */
        constructor();

        /** huan_shou_boss_info boss_index. */
        public boss_index: number;

        /** huan_shou_boss_info last_guishu_role_id. */
        public last_guishu_role_id: number;

        /** huan_shou_boss_info last_guishu_role_name. */
        public last_guishu_role_name: string;

        /** 上一次归属性别 */
        public last_guishu_role_sex: number;

        /** 上一次归属头像 */
        public last_guishu_role_head: number;

        /** huan_shou_boss_info agent_info. */
        public agent_info?: (msg.agent_ex_info|null);

        /** 上一次头像框 */
        public last_guishu_role_head_frame: number;

        /** huan_shou_boss_info die_time. */
        public die_time: number;
    }

    /** 请求进入幻兽boss */
    class c2s_huan_shou_boss_enter_req {

        /** Constructs a new c2s_huan_shou_boss_enter_req. */
        constructor();

        /** c2s_huan_shou_boss_enter_req boss_index. */
        public boss_index: number;
    }

    /** 购买幻兽boss挑战次数 */
    class c2s_huan_shou_boss_buy_enter_cnt {

        /** Constructs a new c2s_huan_shou_boss_buy_enter_cnt. */
        constructor();
    }

    /** 装备 */
    class lianhun_item {

        /** Constructs a new lianhun_item. */
        constructor();

        /** lianhun_item prop_id. */
        public prop_id: Long;

        /** 部位 1 - 6 */
        public pos: number;

        /** 炼魂id */
        public index: number;

        /** lianhun_item level. */
        public level: number;

        /** 当前属性 */
        public cur_attr?: (msg.attributes|null);

        /** lianhun_item next_attr. */
        public next_attr?: (msg.attributes|null);

        /** 升级消耗 */
        public lvup_cost?: (msg.prop_tips_data|null);

        /** 当前觉醒阶数 */
        public star: number;

        /** 当前经验值 */
        public star_exp: number;

        /** 升阶需要的经验值 */
        public star_exp_lmt: number;

        /** 当前阶属性 */
        public star_attr?: (msg.attributes|null);

        /** 下一阶属性 */
        public next_star_attr?: (msg.attributes|null);

        /** 是否完整 true为完整 其他缺省 */
        public operate: boolean;
    }

    /** 打开界面 */
    class c2s_lianhun_open_ui {

        /** Constructs a new c2s_lianhun_open_ui. */
        constructor();
    }

    /** Represents a s2c_lianhun_open_ui. */
    class s2c_lianhun_open_ui {

        /** Constructs a new s2c_lianhun_open_ui. */
        constructor();

        /** s2c_lianhun_open_ui lianhun_list. */
        public lianhun_list: msg.lianhun_item[];
    }

    /** Represents a c2s_lianhun_operate. */
    class c2s_lianhun_operate {

        /** Constructs a new c2s_lianhun_operate. */
        constructor();

        /** 1:穿戴/替换 2：升级 3：升华 4：分解 */
        public type: number;

        /** 装备的唯一id */
        public prop_id: Long;

        /** 升华材料 / 分解材料 */
        public prop_list: Long[];
    }

    /** Represents a s2c_lianhun_operate. */
    class s2c_lianhun_operate {

        /** Constructs a new s2c_lianhun_operate. */
        constructor();

        /** 1:穿戴/替换 2：升级 3：升华 4：分解 */
        public type: number;

        /** 操作结果 */
        public result: boolean;
    }

    /** Represents an agent_ex_info. */
    class agent_ex_info {

        /** Constructs a new agent_ex_info. */
        constructor();

        /** 蓝钻等级 */
        public blue_vip_level: number;

        /** 是不是蓝钻 */
        public is_blue_vip: boolean;

        /** 是不是豪华蓝钻 */
        public is_super_blue_vip: boolean;

        /** 是不是年费蓝钻 */
        public is_blue_year_vip: boolean;
    }

    /** QQ大厅 /////////////////////// */
    class c2s_qq_blue_vip_gain_info_req {

        /** Constructs a new c2s_qq_blue_vip_gain_info_req. */
        constructor();
    }

    /** Represents a s2c_qq_blue_vip_gain_info_rep. */
    class s2c_qq_blue_vip_gain_info_rep {

        /** Constructs a new s2c_qq_blue_vip_gain_info_rep. */
        constructor();

        /** s2c_qq_blue_vip_gain_info_rep isupdate. */
        public isupdate: boolean;

        /** s2c_qq_blue_vip_gain_info_rep gain_indexs. */
        public gain_indexs: number[];
    }

    /** Represents a c2s_qq_blue_vip_gain_req. */
    class c2s_qq_blue_vip_gain_req {

        /** Constructs a new c2s_qq_blue_vip_gain_req. */
        constructor();

        /** c2s_qq_blue_vip_gain_req index. */
        public index: number;
    }

    /** 分享活动 //////////////////// */
    class c2s_activity_share_info {

        /** Constructs a new c2s_activity_share_info. */
        constructor();
    }

    /** Represents a s2c_activity_share_info. */
    class s2c_activity_share_info {

        /** Constructs a new s2c_activity_share_info. */
        constructor();

        /** 总分享次数 */
        public share_cnt: number;

        /** 今日分享次数 */
        public today_share_cnt: number;

        /** 邀请注册人数 */
        public reg_cnt: number;

        /** s2c_activity_share_info sum_charge. */
        public sum_charge: number;

        /** 已领取的奖励id */
        public gain_indexs: number[];
    }

    /** Represents a c2s_activity_shagre_gain_req. */
    class c2s_activity_shagre_gain_req {

        /** Constructs a new c2s_activity_shagre_gain_req. */
        constructor();

        /** 奖励id */
        public gain_index: number;
    }

    /** Represents a c2s_activity_share_succeed. */
    class c2s_activity_share_succeed {

        /** Constructs a new c2s_activity_share_succeed. */
        constructor();
    }

    /** 公共协议////////////////////// */
    class c2s_open_system_info {

        /** Constructs a new c2s_open_system_info. */
        constructor();

        /** 功能开启id,策划定的 */
        public openIdx: number[];
    }

    /** Represents a c2s_common_attr_getinfo. */
    class c2s_common_attr_getinfo {

        /** Constructs a new c2s_common_attr_getinfo. */
        constructor();

        /** 属性索引列表 */
        public attrindex: number[];

        /** 不传该字段 表示请求默认的属性     传1表示请求军团属性 */
        public type: number;
    }

    /** Represents a common_attr_struct. */
    class common_attr_struct {

        /** Constructs a new common_attr_struct. */
        constructor();

        /** 属性 */
        public attr?: (msg.attributes|null);

        /** 属性索引 */
        public attrindex: number;

        /** 军团属性 */
        public legion_attr?: (msg.zhandui_legion_attribute|null);
    }

    /** Represents a s2c_common_attr_sendinfo. */
    class s2c_common_attr_sendinfo {

        /** Constructs a new s2c_common_attr_sendinfo. */
        constructor();

        /** 返回请求的属性列表 */
        public list: msg.common_attr_struct[];
    }

    /** 仙路-转生///////////////////// */
    class s2c_xianlu_reinc_info {

        /** Constructs a new s2c_xianlu_reinc_info. */
        constructor();

        /** 当前转生索引 */
        public index: number;

        /** 仙魄属性 */
        public xianpo_attr?: (msg.attributes|null);

        /** 下级仙魄属性 */
        public xianpo_nextattr?: (msg.attributes|null);

        /** 当前仙魄等级 */
        public xianpolevel: number;

        /** 当前领取的转生奖励索引 */
        public rewardindex: number;

        /** 当前领取的转生奖励状态 0不可领取  1可以领取   2已领取 */
        public rewardstatus: number;
    }

    /** 破境 */
    class c2s_xianlu_reinc_levelup {

        /** Constructs a new c2s_xianlu_reinc_levelup. */
        constructor();
    }

    /** 领取转生进阶奖励 */
    class c2s_xianlu_reinc_getreward {

        /** Constructs a new c2s_xianlu_reinc_getreward. */
        constructor();
    }

    /** 一键服用 */
    class c2s_xian_dan_use_pill {

        /** Constructs a new c2s_xian_dan_use_pill. */
        constructor();

        /** 仙丹配置索引 */
        public pillindex: number;
    }

    /** Represents a xian_dan_data. */
    class xian_dan_data {

        /** Constructs a new xian_dan_data. */
        constructor();

        /** 该仙丹配置索引 */
        public pillindex: number;

        /** 该仙丹使用数量 */
        public usecount: number;
    }

    /** 所有仙丹信息(如果单个仙丹更新也是走该协议, 协议数据内容是单仙丹的数据) */
    class s2c_xian_dan_all_info {

        /** Constructs a new s2c_xian_dan_all_info. */
        constructor();

        /** s2c_xian_dan_all_info pill_list. */
        public pill_list: msg.xian_dan_data[];
    }

    /** 领取灵池收益 */
    class c2s_lingpool_time_reward {

        /** Constructs a new c2s_lingpool_time_reward. */
        constructor();
    }

    /** 灵池升级 */
    class c2s_lingpool_levelup {

        /** Constructs a new c2s_lingpool_levelup. */
        constructor();

        /** 灵池类型 */
        public pooltype: number;
    }

    /** 灵池放入单位 */
    class c2s_lingpool_add_unit {

        /** Constructs a new c2s_lingpool_add_unit. */
        constructor();

        /** 灵池类型 */
        public pooltype: number;

        /** 单位id */
        public unitid: Long;
    }

    /** Represents a c2s_lingpool_onekey_unit. */
    class c2s_lingpool_onekey_unit {

        /** Constructs a new c2s_lingpool_onekey_unit. */
        constructor();

        /** 灵池类型 */
        public pooltype: number;
    }

    /** Represents a lingpool_unit_data. */
    class lingpool_unit_data {

        /** Constructs a new lingpool_unit_data. */
        constructor();

        /** 放入位置 */
        public pos: number;

        /** 放入单位id */
        public unitid: Long;
    }

    /** Represents a lingpool_type_data. */
    class lingpool_type_data {

        /** Constructs a new lingpool_type_data. */
        constructor();

        /** lingpool_type_data pooltype. */
        public pooltype: number;

        /** 灵池上次奖励时间戳(奖励累计45分钟, 领取30分钟奖励, 那么时间戳应该是当前时间减15分钟) */
        public opentime: number;

        /** 灵池等级 */
        public level: number;

        /** 单位列表 */
        public unitlist: msg.lingpool_unit_data[];
    }

    /** 单个灵池更新也走该协议 */
    class s2c_lingpool_data_info {

        /** Constructs a new s2c_lingpool_data_info. */
        constructor();

        /** 灵池列表 */
        public poollist: msg.lingpool_type_data[];
    }

    /** 仙路-灵脉/////////////// */
    class lingmai_data {

        /** Constructs a new lingmai_data. */
        constructor();

        /** 灵脉类型 */
        public type: number;

        /** 灵脉重数 */
        public splv: number;

        /** 灵脉等级 */
        public lv: number;

        /** 该灵脉等级属性 */
        public attr?: (msg.attributes|null);
    }

    /** Represents a s2c_lingmai_data_info. */
    class s2c_lingmai_data_info {

        /** Constructs a new s2c_lingmai_data_info. */
        constructor();

        /** 灵脉列表 */
        public list: msg.lingmai_data[];
    }

    /** Represents a c2s_lingmai_levelup. */
    class c2s_lingmai_levelup {

        /** Constructs a new c2s_lingmai_levelup. */
        constructor();

        /** 灵脉类型 */
        public type: number;
    }

    /** 仙路-灵根/////////////// */
    class linggen_data {

        /** Constructs a new linggen_data. */
        constructor();

        /** 灵根索引 */
        public index: number;

        /** 灵根等级 */
        public lv: number;
    }

    /** Represents a s2c_linggen_data_info. */
    class s2c_linggen_data_info {

        /** Constructs a new s2c_linggen_data_info. */
        constructor();

        /** 灵根列表 */
        public list: msg.linggen_data[];
    }

    /** Represents a c2s_linggen_levelup. */
    class c2s_linggen_levelup {

        /** Constructs a new c2s_linggen_levelup. */
        constructor();

        /** 灵根索引 */
        public index: number;
    }

    /** 熔炼装备 */
    class c2s_melt_equip {

        /** Constructs a new c2s_melt_equip. */
        constructor();
    }

    /** 前端请求才发送背包信息 */
    class s2c_melt_equip_coin {

        /** Constructs a new s2c_melt_equip_coin. */
        constructor();

        /** 上限 */
        public up_value: number;

        /** 当前值 */
        public value: number;
    }

    /** 熔炼装备返回 */
    class s2c_melt_equip {

        /** Constructs a new s2c_melt_equip. */
        constructor();

        /** s2c_melt_equip props. */
        public props: msg.prop_tips_data[];

        /** 特权加成 */
        public value: number;
    }

    /** 前端请求背包信息 */
    class c2s_bag_props {

        /** Constructs a new c2s_bag_props. */
        constructor();
    }

    /** Represents a bag_props. */
    class bag_props {

        /** Constructs a new bag_props. */
        constructor();

        /** 背包类型 */
        public bag_type: number;

        /** 背包各页最大格子数 */
        public bag_cap: number;

        /** bag_props update_info. */
        public update_info: msg.prop_attributes[];
    }

    /** 前端请求才发送背包信息 */
    class s2c_bag_props {

        /** Constructs a new s2c_bag_props. */
        constructor();

        /** s2c_bag_props all_bag. */
        public all_bag: msg.bag_props[];
    }

    /** 更新背包物品属性 */
    class s2c_bag_update_prop_attr {

        /** Constructs a new s2c_bag_update_prop_attr. */
        constructor();

        /** s2c_bag_update_prop_attr all_data. */
        public all_data: msg.bag_props[];
    }

    /** 道具分解 */
    class c2s_prop_resolve {

        /** Constructs a new c2s_prop_resolve. */
        constructor();

        /** 唯一id */
        public prop_id: Long;

        /** 数量 */
        public count: number;
    }

    /** 道具一键分解 */
    class c2s_prop_one_key_resolve {

        /** Constructs a new c2s_prop_one_key_resolve. */
        constructor();

        /** c2s_prop_one_key_resolve props. */
        public props: msg.prop_tips_data[];
    }

    /** Represents a prop_use_params. */
    class prop_use_params {

        /** Constructs a new prop_use_params. */
        constructor();

        /** choose_box 选择宝箱 选择掉落中的 【param1字段排序编号】 */
        public choose: number;
    }

    /** Represents a prop_use. */
    class prop_use {

        /** Constructs a new prop_use. */
        constructor();

        /** 物品唯一Id */
        public prop_id: Long;

        /** 使用数量 */
        public use_cnt: number;

        /** 特殊道具的参数 */
        public use_params?: (msg.prop_use_params|null);
    }

    /** 一建 使用多个物品 */
    class c2s_prop_list_use {

        /** Constructs a new c2s_prop_list_use. */
        constructor();

        /** c2s_prop_list_use props. */
        public props: msg.prop_use[];
    }

    /** 使用物品 */
    class c2s_prop_use {

        /** Constructs a new c2s_prop_use. */
        constructor();

        /** 物品唯一Id */
        public prop_id: Long;

        /** 使用数量 */
        public use_cnt: number;

        /** 特殊道具的参数 */
        public use_params?: (msg.prop_use_params|null);
    }

    /** 道具合成 */
    class c2s_prop_synthesis {

        /** Constructs a new c2s_prop_synthesis. */
        constructor();

        /** 合成表分类编号 index */
        public index: Long;

        /** 合成物品数量 */
        public count: number;
    }

    /** Represents a s2c_prop_synthesis. */
    class s2c_prop_synthesis {

        /** Constructs a new s2c_prop_synthesis. */
        constructor();

        /** s2c_prop_synthesis index. */
        public index: Long;
    }

    /** Represents a c2s_god_brother_levelup. */
    class c2s_god_brother_levelup {

        /** Constructs a new c2s_god_brother_levelup. */
        constructor();

        /** c2s_god_brother_levelup postype. */
        public postype: number;

        /** c2s_god_brother_levelup buttontype. */
        public buttontype: number;
    }

    /** Represents a c2s_god_brother_starup. */
    class c2s_god_brother_starup {

        /** Constructs a new c2s_god_brother_starup. */
        constructor();

        /** c2s_god_brother_starup index. */
        public index: Long;
    }

    /** Represents a c2s_god_brother_groupup. */
    class c2s_god_brother_groupup {

        /** Constructs a new c2s_god_brother_groupup. */
        constructor();

        /** c2s_god_brother_groupup groupindex. */
        public groupindex: number;

        /** c2s_god_brother_groupup rewardindex. */
        public rewardindex: number[];

        /** c2s_god_brother_groupup unitindex. */
        public unitindex: Long;
    }

    /** Represents a c2s_god_brother_levelrewards. */
    class c2s_god_brother_levelrewards {

        /** Constructs a new c2s_god_brother_levelrewards. */
        constructor();

        /** c2s_god_brother_levelrewards index. */
        public index: Long;

        /** c2s_god_brother_levelrewards rewardindex. */
        public rewardindex: number;
    }

    /** Represents a c2s_god_brother_s_skill. */
    class c2s_god_brother_s_skill {

        /** Constructs a new c2s_god_brother_s_skill. */
        constructor();

        /** c2s_god_brother_s_skill postype. */
        public postype: number;

        /** c2s_god_brother_s_skill slot. */
        public slot: number;
    }

    /** Represents a c2s_god_brother_uporchange. */
    class c2s_god_brother_uporchange {

        /** Constructs a new c2s_god_brother_uporchange. */
        constructor();

        /** c2s_god_brother_uporchange postype. */
        public postype: number;

        /** c2s_god_brother_uporchange index. */
        public index: Long;
    }

    /** Represents a god_brother_data. */
    class god_brother_data {

        /** Constructs a new god_brother_data. */
        constructor();

        /** god_brother_data index. */
        public index: Long;

        /** god_brother_data star. */
        public star: number;

        /** god_brother_data attrs. */
        public attrs?: (msg.attributes|null);

        /** god_brother_data evolutions. */
        public evolutions: number;

        /** 神灵拥有的军团属性 */
        public legion_attr?: (msg.zhandui_legion_attribute|null);
    }

    /** Represents a god_brother_type_data. */
    class god_brother_type_data {

        /** Constructs a new god_brother_type_data. */
        constructor();

        /** god_brother_type_data postype. */
        public postype: number;

        /** god_brother_type_data level. */
        public level: number;

        /** god_brother_type_data exp. */
        public exp: number;

        /** god_brother_type_data upindex. */
        public upindex: Long;

        /** god_brother_type_data skilllevel. */
        public skilllevel: number;

        /** god_brother_type_data splevel_list. */
        public splevel_list: number[];

        /** god_brother_type_data skill_list. */
        public skill_list: number[];

        /** god_brother_type_data list. */
        public list: msg.god_brother_data[];

        /** god_brother_type_data now_attrs. */
        public now_attrs?: (msg.attributes|null);
    }

    /** 单个类型神灵也是用该协议更新 */
    class s2c_god_brother_info {

        /** Constructs a new s2c_god_brother_info. */
        constructor();

        /** s2c_god_brother_info list. */
        public list: msg.god_brother_type_data[];
    }

    /** Represents a god_brother_group_data. */
    class god_brother_group_data {

        /** Constructs a new god_brother_group_data. */
        constructor();

        /** god_brother_group_data groupindex. */
        public groupindex: number;

        /** god_brother_group_data level. */
        public level: number;

        /** god_brother_group_data attrs. */
        public attrs?: (msg.attributes|null);

        /** god_brother_group_data nextattrs. */
        public nextattrs?: (msg.attributes|null);

        /** god_brother_group_data reward_list. */
        public reward_list: number[];

        /** god_brother_group_data idlist. */
        public idlist: Long[];
    }

    /** Represents a s2c_god_brother_group_list. */
    class s2c_god_brother_group_list {

        /** Constructs a new s2c_god_brother_group_list. */
        constructor();

        /** s2c_god_brother_group_list list. */
        public list: msg.god_brother_group_data[];
    }

    /** Represents a god_brother_unit_reward_data. */
    class god_brother_unit_reward_data {

        /** Constructs a new god_brother_unit_reward_data. */
        constructor();

        /** god_brother_unit_reward_data index. */
        public index: Long;

        /** god_brother_unit_reward_data status. */
        public status: number[];
    }

    /** 单个神灵奖励状态更新也走该协议 */
    class s2c_god_brother_unit_reward_list {

        /** Constructs a new s2c_god_brother_unit_reward_list. */
        constructor();

        /** s2c_god_brother_unit_reward_list list. */
        public list: msg.god_brother_unit_reward_data[];
    }

    /** Represents a god_brother_lingqi_sturct. */
    class god_brother_lingqi_sturct {

        /** Constructs a new god_brother_lingqi_sturct. */
        constructor();

        /** 星级 */
        public star: number;

        /** 灵器索引 */
        public index: number;

        /** 当前基础属性 */
        public base_attrs?: (msg.attributes|null);

        /** 当前封印属性 */
        public fengyin_attrs?: (msg.attributes|null);
    }

    /** Represents a god_brother_lingqi_datas. */
    class god_brother_lingqi_datas {

        /** Constructs a new god_brother_lingqi_datas. */
        constructor();

        /** 灵器列表 */
        public list: msg.god_brother_lingqi_sturct[];

        /** 当前套装属性 */
        public suit_attrs?: (msg.attributes|null);

        /** 神灵index */
        public bro_index: Long;
    }

    /** Represents a s2c_god_brother_lingqi_info. */
    class s2c_god_brother_lingqi_info {

        /** Constructs a new s2c_god_brother_lingqi_info. */
        constructor();

        /** 各神灵灵器数据 */
        public all_datas: msg.god_brother_lingqi_datas[];
    }

    /** Represents a c2s_god_brother_lingqi_click. */
    class c2s_god_brother_lingqi_click {

        /** Constructs a new c2s_god_brother_lingqi_click. */
        constructor();

        /** 1为指定激活/升星   2为一键激活/升星 */
        public button_type: number;

        /** 神灵index */
        public bro_index: Long;

        /** 灵器索引 */
        public index: number;
    }

    /** 神灵灵魄 */
    class god_brother_lingpo_sturct {

        /** Constructs a new god_brother_lingpo_sturct. */
        constructor();

        /** 等级 */
        public level: number;

        /** 灵魄子索引（8个位置索引） */
        public index: number;

        /** 当前基础属性 */
        public base_attrs?: (msg.attributes|null);
    }

    /** Represents a god_brother_lingpo_datas. */
    class god_brother_lingpo_datas {

        /** Constructs a new god_brother_lingpo_datas. */
        constructor();

        /** 灵魄列表 */
        public list: msg.god_brother_lingpo_sturct[];

        /** 当前套装属性 */
        public suit_attrs?: (msg.attributes|null);

        /** 灵魄id（配置表索引） */
        public id: number;

        /** 套装等级 */
        public suit_level: number;
    }

    /** Represents a s2c_god_brother_lingpo_info. */
    class s2c_god_brother_lingpo_info {

        /** Constructs a new s2c_god_brother_lingpo_info. */
        constructor();

        /** 各灵魄数据 */
        public all_datas: msg.god_brother_lingpo_datas[];
    }

    /** Represents a c2s_god_brother_lingpo_click. */
    class c2s_god_brother_lingpo_click {

        /** Constructs a new c2s_god_brother_lingpo_click. */
        constructor();

        /** 1为指定激活/升星   2为一键激活/升星  3套装升级 */
        public button_type: number;

        /** 灵魄id（配置表索引） */
        public id: number;

        /** 灵魄子索引（8个位置索引） */
        public index: number;
    }

    /** 神灵灵力 */
    class c2s_god_brother_lingli_click {

        /** Constructs a new c2s_god_brother_lingli_click. */
        constructor();

        /** 类型 */
        public itype: number;

        /** 灵力索引  999为主动技能的索引 */
        public index: number;
    }

    /** Represents a c2s_god_brother_lingli_reset_point. */
    class c2s_god_brother_lingli_reset_point {

        /** Constructs a new c2s_god_brother_lingli_reset_point. */
        constructor();

        /** 类型 */
        public itype: number;
    }

    /** Represents a god_brother_lingli_struct. */
    class god_brother_lingli_struct {

        /** Constructs a new god_brother_lingli_struct. */
        constructor();

        /** 999为主动技能的索引 */
        public index: number;

        /** 等级 */
        public level: number;
    }

    /** Represents a god_brother_lingli_datas. */
    class god_brother_lingli_datas {

        /** Constructs a new god_brother_lingli_datas. */
        constructor();

        /** 类型 */
        public itype: number;

        /** god_brother_lingli_datas list. */
        public list: msg.god_brother_lingli_struct[];
    }

    /** Represents a s2c_god_brother_lingli_info. */
    class s2c_god_brother_lingli_info {

        /** Constructs a new s2c_god_brother_lingli_info. */
        constructor();

        /** 灵力数据 */
        public all_datas: msg.god_brother_lingli_datas[];
    }

    /** Represents a c2s_god_brother_evolve. */
    class c2s_god_brother_evolve {

        /** Constructs a new c2s_god_brother_evolve. */
        constructor();

        /** c2s_god_brother_evolve index. */
        public index: Long;
    }

    /** Represents a skill_item. */
    class skill_item {

        /** Constructs a new skill_item. */
        constructor();

        /** skill_item index. */
        public index: number;

        /** 等级 */
        public lv: number;

        /** 研习 */
        public cultivate_level: number;

        /** 战力 */
        public power: number;

        /** 技能类型 */
        public index_type: number;
    }

    /** 技能升级（激活也发这个） */
    class c2s_skill_levelup {

        /** Constructs a new c2s_skill_levelup. */
        constructor();

        /** 1仙法 */
        public type: number;

        /** 1:单次 2:一键（一键不用传index） */
        public oper: number;

        /** 技能编号 */
        public index: number;

        /** 升级种类 1升级，2升星，3精研，4激活 */
        public oper_type: number;
    }

    /** 装配技能 */
    class c2s_skill_takeon {

        /** Constructs a new c2s_skill_takeon. */
        constructor();

        /** 1仙法 */
        public type: number;

        /** 技能编号 */
        public index: number;

        /** 装配到的位置 */
        public pos: number;

        /** 1:单次 2:一键（一键不用传index、pos） */
        public oper_type: number;
    }

    /** 卸下技能 */
    class c2s_skill_takeoff {

        /** Constructs a new c2s_skill_takeoff. */
        constructor();

        /** 1:仙法 */
        public type: number;

        /** 位置 */
        public pos: number;
    }

    /** 1 仙法 */
    class s2c_normalskill_info {

        /** Constructs a new s2c_normalskill_info. */
        constructor();

        /** s2c_normalskill_info godallskill. */
        public godallskill: msg.skill_item[];

        /** 坑位上的技能(空位用0) */
        public pos_godskill: number[];
    }

    /** 单个操作成功给这个ok，穿戴问题 */
    class s2c_normalskill_ok {

        /** Constructs a new s2c_normalskill_ok. */
        constructor();

        /** s2c_normalskill_ok godallskill. */
        public godallskill?: (msg.skill_item|null);

        /** 坑位上的技能(空位用0) */
        public pos_godskill: number[];

        /** 用在判断是否自动激活技能 传1 */
        public is_auto: number;
    }

    /** Represents a ride_item. */
    class ride_item {

        /** Constructs a new ride_item. */
        constructor();

        /** 坐骑幻形编号 */
        public index: number;

        /** 星级 */
        public star: number;

        /** ride_item attr. */
        public attr?: (msg.attributes|null);

        /** 化神系统需要用到显示军团属性： */
        public legion_attr?: (msg.zhandui_legion_attribute|null);
    }

    /** Represents a jiban_item. */
    class jiban_item {

        /** Constructs a new jiban_item. */
        constructor();

        /** 羁绊编号 */
        public index: number;

        /** 是否激活套羁绊套 */
        public is_active_jiban: boolean;

        /** 激活羁绊的外显编号 */
        public ride_index: number[];
    }

    /** Represents a huashen_unit_data. */
    class huashen_unit_data {

        /** Constructs a new huashen_unit_data. */
        constructor();

        /** 放入位置 */
        public pos: number;

        /** 放入单位id */
        public unitid: number;
    }

    /** Represents a ride_info. */
    class ride_info {

        /** Constructs a new ride_info. */
        constructor();

        /** 当前幻化 */
        public cur_ride: number;

        /** 等级 */
        public level: number;

        /** 经验值 */
        public exp: number;

        /** 升级所需经验 */
        public levelup_exp: number;

        /** 总属性 */
        public all_attr?: (msg.attributes|null);

        /** 坐骑已经激活的被动技能id */
        public skill_index: number[];

        /** 类型 */
        public head_type: number;

        /** 激活幻形列表 */
        public ride_list: msg.ride_item[];

        /** 羁绊列表 */
        public jiban_list: msg.jiban_item[];

        /** 化神上阵列表（化神功能，前端就不用cur_ride字段） */
        public pos_list: msg.huashen_unit_data[];
    }

    /** Represents a s2c_ride_info. */
    class s2c_ride_info {

        /** Constructs a new s2c_ride_info. */
        constructor();

        /** 幻形列表 */
        public info?: (msg.ride_info|null);
    }

    /** 升级突破 */
    class c2s_ride_oper_up {

        /** Constructs a new c2s_ride_oper_up. */
        constructor();

        /** 1:单次升级，2:一键升级 */
        public oper: number;

        /** 类型 */
        public head_type: number;
    }

    /** 激活被动技能 */
    class c2s_ride_oper_skill_active {

        /** Constructs a new c2s_ride_oper_skill_active. */
        constructor();

        /** 坐骑技能ID */
        public skill_index: number;

        /** 类型 */
        public head_type: number;
    }

    /** 幻化激活/升星 */
    class c2s_ride_oper_up_star {

        /** Constructs a new c2s_ride_oper_up_star. */
        constructor();

        /** 1:幻形激活/升星 2:幻化 */
        public oper: number;

        /** 坐骑编号 */
        public index: number;

        /** 类型 */
        public head_type: number;

        /** 化神功能用，推送上阵的位置（发0则表示一键上阵，1、2、3、4表示上阵的位置） */
        public pos: number;
    }

    /** Represents a c2s_ride_oper_jiban. */
    class c2s_ride_oper_jiban {

        /** Constructs a new c2s_ride_oper_jiban. */
        constructor();

        /** 类型 */
        public head_type: number;

        /** 羁绊编号 */
        public index: number;

        /** 外显id */
        public ride_index: number;
    }

    /** 化神天赋 */
    class huashen_data {

        /** Constructs a new huashen_data. */
        constructor();

        /** 化神天赋索引 */
        public index: number;

        /** 化神天赋等级 */
        public lv: number;
    }

    /** Represents a s2c_huashen_data_info. */
    class s2c_huashen_data_info {

        /** Constructs a new s2c_huashen_data_info. */
        constructor();

        /** 化神天赋索引 */
        public list: msg.linggen_data[];

        /** 化神之路索引 */
        public road_index: number;

        /** 化神 战神殿 当前激活可以激活的化神id，没有就推送0 */
        public now_id: number;
    }

    /** Represents a c2s_huashen_levelup. */
    class c2s_huashen_levelup {

        /** Constructs a new c2s_huashen_levelup. */
        constructor();

        /** 化神天赋索引 */
        public index: number;
    }

    /** 化神之路奖励领取 点击一次领取一次奖励（离起点最近的一个未领取奖励 */
    class c2s_huashen_road_get_rewards {

        /** Constructs a new c2s_huashen_road_get_rewards. */
        constructor();
    }

    /** 吞噬 */
    class c2s_lianshendan_swal {

        /** Constructs a new c2s_lianshendan_swal. */
        constructor();

        /** 对应每一个玩家的助手 */
        public surface_index: number;

        /** 炼神编号 */
        public index: number;

        /** 1：单次  2：一键 */
        public oper_type: number;
    }

    /** Represents a lianshendan_swal_data. */
    class lianshendan_swal_data {

        /** Constructs a new lianshendan_swal_data. */
        constructor();

        /** 炼神编号 */
        public index: number;

        /** 吞噬了多少个 */
        public swal_cnt: number;

        /** 属性 */
        public attrs?: (msg.attributes|null);
    }

    /** Represents a lianshendan_surface_data. */
    class lianshendan_surface_data {

        /** Constructs a new lianshendan_surface_data. */
        constructor();

        /** 对应每一个玩家的助手 */
        public surface_index: number;

        /** lianshendan_surface_data datas. */
        public datas: msg.lianshendan_swal_data[];
    }

    /** 上线发送，或者更新发送 */
    class s2c_lianshendan_surface_info {

        /** Constructs a new s2c_lianshendan_surface_info. */
        constructor();

        /** s2c_lianshendan_surface_info datas. */
        public datas: msg.lianshendan_surface_data[];
    }

    /** 购买礼包 */
    class c2s_buy_reward {

        /** Constructs a new c2s_buy_reward. */
        constructor();

        /** 类型 */
        public head_type: number;

        /** 购买礼包的突破等级 */
        public index: number;
    }

    /** Represents a buy_reward_item. */
    class buy_reward_item {

        /** Constructs a new buy_reward_item. */
        constructor();

        /** 类型 */
        public head_type: number;

        /** 礼包索引 */
        public index: number;
    }

    /** Represents a s2c_buy_reward_lisrt. */
    class s2c_buy_reward_lisrt {

        /** Constructs a new s2c_buy_reward_lisrt. */
        constructor();

        /** 购买礼包列表 */
        public buy_reward_lisrt: msg.buy_reward_item[];
    }

    /** 外显激活通用协议 */
    class s2c_surface_active {

        /** Constructs a new s2c_surface_active. */
        constructor();

        /** 一般由前端自行处理 如果有不方便处理的 就用这条 */
        public index: number;
    }

    /** 模块完成事件增加属性////////////////// */
    class module_event_add_attr_data {

        /** Constructs a new module_event_add_attr_data. */
        constructor();

        /** 坐骑index or (该值必须是可以唯一标识某模块某个添加事件的实例) */
        public index: Long;

        /** 特殊属性index */
        public specialindex: number;

        /** 该属性事件进度 */
        public step: number;
    }

    /** Represents a s2c_module_event_add_attr_info. */
    class s2c_module_event_add_attr_info {

        /** Constructs a new s2c_module_event_add_attr_info. */
        constructor();

        /** s2c_module_event_add_attr_info list. */
        public list: msg.module_event_add_attr_data[];
    }

    /** Represents a lingchong_item. */
    class lingchong_item {

        /** Constructs a new lingchong_item. */
        constructor();

        /** 灵宠编号 */
        public index: Long;

        /** 领取状态，1为可领，2为已领 */
        public state: number;

        /** 星级 */
        public star: number;

        /** 当前灵宠属性 */
        public attr?: (msg.attributes|null);
    }

    /** Represents a s2c_lingchong_item. */
    class s2c_lingchong_item {

        /** Constructs a new s2c_lingchong_item. */
        constructor();

        /** 已激活的灵宠列表，以及是否领取 */
        public lingchong_list: msg.lingchong_item[];
    }

    /** 幻化激活/升星、领取激活礼包 */
    class c2s_lingchong_oper {

        /** Constructs a new c2s_lingchong_oper. */
        constructor();

        /** 1为激活升星，2为领取激活礼包 */
        public oper: number;

        /** 灵宠编号 */
        public index: Long;
    }

    /** Represents a lingchong_task_item. */
    class lingchong_task_item {

        /** Constructs a new lingchong_task_item. */
        constructor();

        /** 触发次数 */
        public step: number;

        /** 任务id */
        public task_index: number;

        /** 灵宠id */
        public lingchong_id: Long;

        /** 已领取次数 */
        public get_count: number;
    }

    /** Represents a s2c_lingchong_task_list. */
    class s2c_lingchong_task_list {

        /** Constructs a new s2c_lingchong_task_list. */
        constructor();

        /** 任务列表 */
        public task_item: msg.lingchong_task_item[];
    }

    /** Represents a c2s_lingchong_get_task_reward. */
    class c2s_lingchong_get_task_reward {

        /** Constructs a new c2s_lingchong_get_task_reward. */
        constructor();

        /** 灵宠编号 */
        public index: Long;
    }

    /** 装备激活进阶 */
    class c2s_yuanling_equip_levelup {

        /** Constructs a new c2s_yuanling_equip_levelup. */
        constructor();

        /** 品质 */
        public quality: number;

        /** 位置 */
        public pos: number;
    }

    /** Represents a yuanling_equip_data. */
    class yuanling_equip_data {

        /** Constructs a new yuanling_equip_data. */
        constructor();

        /** 品质 */
        public quality: number;

        /** 位置 */
        public pos: number;

        /** 装备索引id */
        public index: Long;

        /** 当前属性 */
        public attrs?: (msg.attributes|null);

        /** 下一阶属性 */
        public nextattrs?: (msg.attributes|null);
    }

    /** Represents a s2c_yuanling_equip_info. */
    class s2c_yuanling_equip_info {

        /** Constructs a new s2c_yuanling_equip_info. */
        constructor();

        /** s2c_yuanling_equip_info equiplist. */
        public equiplist: msg.yuanling_equip_data[];
    }

    /** Represents a c2s_yuanling_equip_suit_levelup. */
    class c2s_yuanling_equip_suit_levelup {

        /** Constructs a new c2s_yuanling_equip_suit_levelup. */
        constructor();

        /** 品质 */
        public quality: number;
    }

    /** Represents a yuanling_equip_suit. */
    class yuanling_equip_suit {

        /** Constructs a new yuanling_equip_suit. */
        constructor();

        /** 品质 */
        public quality: number;

        /** 当前套装阶数 */
        public level: number;

        /** 下一阶套装阶数 */
        public nextlevel: number;

        /** 当前属性 */
        public attrs?: (msg.attributes|null);

        /** 下一阶属性 */
        public nextattrs?: (msg.attributes|null);
    }

    /** Represents a s2c_yuanling_equip_suit_info. */
    class s2c_yuanling_equip_suit_info {

        /** Constructs a new s2c_yuanling_equip_suit_info. */
        constructor();

        /** s2c_yuanling_equip_suit_info suitlist. */
        public suitlist: msg.yuanling_equip_suit[];
    }

    /** 某种大神榜数据，首位达标数据 */
    class first_rank_award_data {

        /** Constructs a new first_rank_award_data. */
        constructor();

        /** first_rank_award_data ranktype. */
        public ranktype: number;

        /** first_rank_award_data infos. */
        public infos: msg.teammate[];
    }

    /** 各种大神榜数据 */
    class s2c_first_rank_server_award {

        /** Constructs a new s2c_first_rank_server_award. */
        constructor();

        /** s2c_first_rank_server_award list. */
        public list: msg.first_rank_award_data[];
    }

    /** 请求领取大神榜 奖励 */
    class c2s_first_rank_award {

        /** Constructs a new c2s_first_rank_award. */
        constructor();

        /** c2s_first_rank_award ranktype. */
        public ranktype: number;

        /** c2s_first_rank_award index. */
        public index: number;
    }

    /** 推送大神榜领取奖励状态数据 */
    class s2c_first_rank_award {

        /** Constructs a new s2c_first_rank_award. */
        constructor();

        /** s2c_first_rank_award ranktype. */
        public ranktype: number;

        /** 已领取index */
        public index_list: number[];
    }

    /** Represents a rank_common_struct. */
    class rank_common_struct {

        /** Constructs a new rank_common_struct. */
        constructor();

        /** 排名 */
        public rank_no: number;

        /** 名字 */
        public name: string;

        /** 战斗力 */
        public showpower: Long;

        /** 通关层数 */
        public count: number;
    }

    /** Represents a c2s_new_rank_req_rank. */
    class c2s_new_rank_req_rank {

        /** Constructs a new c2s_new_rank_req_rank. */
        constructor();

        /** 排行榜类型 */
        public ranktype: number;
    }

    /** 推送排行榜信息 */
    class s2c_new_rank_info {

        /** Constructs a new s2c_new_rank_info. */
        constructor();

        /** 排行榜类型 */
        public ranktype: number;

        /** 排行榜信息 */
        public info_list: msg.rank_common_struct[];

        /** 我的信息 */
        public my_info?: (msg.rank_common_struct|null);

        /** s2c_new_rank_info top_info. */
        public top_info?: (msg.teammate|null);
    }

    /** 请求进入对应BOSS关卡 */
    class c2s_new_vip_boss_enter {

        /** Constructs a new c2s_new_vip_boss_enter. */
        constructor();

        /** 关卡编号 */
        public index: number;
    }

    /** Represents a new_vip_boss. */
    class new_vip_boss {

        /** Constructs a new new_vip_boss. */
        constructor();

        /** vip_boss编号 */
        public boss_id: Long;

        /** 下次挑战时间,(boss复活) */
        public next_boss_time: number;

        /** 是否挑战过 */
        public is_finished: boolean;
    }

    /** Represents a s2c_new_vip_boss_info. */
    class s2c_new_vip_boss_info {

        /** Constructs a new s2c_new_vip_boss_info. */
        constructor();

        /** vipBOSS关卡列表 */
        public infos: msg.new_vip_boss[];
    }

    /** 碾压 返回 s2c_new_vip_boss_info */
    class c2s_new_vip_boss_sweep {

        /** Constructs a new c2s_new_vip_boss_sweep. */
        constructor();

        /** 关卡编号 */
        public index: number;
    }

    /** 刷新场景的伤害统计 */
    class s2c_boss_srefresh_damage {

        /** Constructs a new s2c_boss_srefresh_damage. */
        constructor();

        /** 伤害信息 */
        public damage_list: msg.boss_srefresh_damage[];
    }

    /** 排行榜单人信息 */
    class boss_srefresh_damage {

        /** Constructs a new boss_srefresh_damage. */
        constructor();

        /** roleid 或者 神灵id */
        public index: Long;

        /** 总伤害 */
        public damage: Long;

        /** 秒害 */
        public damage_s: Long;
    }

    /** 请求挑战对应BOSS */
    class c2s_new_multiple_boss_challenge {

        /** Constructs a new c2s_new_multiple_boss_challenge. */
        constructor();

        /** 副本配置索引编号 */
        public index: number;
    }

    /** Represents a new_multiple_boss_data. */
    class new_multiple_boss_data {

        /** Constructs a new new_multiple_boss_data. */
        constructor();

        /** 副本配置索引编号 */
        public index: number;

        /** boss血量(百分比) */
        public hp: number;

        /** boss复活时间戳 */
        public recover_time: Long;

        /** 归属者信息 */
        public owerinfo?: (msg.teammate|null);
    }

    /** Represents a s2c_new_multiple_boss_list. */
    class s2c_new_multiple_boss_list {

        /** Constructs a new s2c_new_multiple_boss_list. */
        constructor();

        /** boss信息列表 */
        public bosslit: msg.new_multiple_boss_data[];

        /** 可用挑战次数 */
        public count: number;

        /** 下次恢复次数时间戳 */
        public recover_count_time: Long;

        /** 剩余可用 */
        public use_luck_count: number;
    }

    /** 请求boss信息 */
    class c2s_new_multiple_boss_info {

        /** Constructs a new c2s_new_multiple_boss_info. */
        constructor();
    }

    /** Represents a s2c_new_multiple_boss_hurt_rank. */
    class s2c_new_multiple_boss_hurt_rank {

        /** Constructs a new s2c_new_multiple_boss_hurt_rank. */
        constructor();

        /** 伤害排名列表(已排序) */
        public hurtlist: msg.teammate[];

        /** 当前归属者 */
        public now_owner?: (msg.teammate|null);

        /** 我的信息 */
        public my_info?: (msg.teammate|null);
    }

    /** Represents a tour_role_info. */
    class tour_role_info {

        /** Constructs a new tour_role_info. */
        constructor();

        /** 站位 */
        public pos: number;

        /** 名字 */
        public name: string;

        /** 等级 */
        public level: number;

        /** 战力 */
        public showpower: Long;

        /** 时装 */
        public fashion: number;

        /** 神兵 */
        public weapon: number;

        /** 性别 */
        public sex: number;

        /** 角色ID */
        public role_id: Long;

        /** 积分 */
        public score: number;

        /** 索引ID */
        public index: number;

        /** 翅膀 */
        public wing: number;

        /** 积分杀手 奖励宝箱 会传对应的索引 答题 题号索引 选项索引 */
        public param1: number[];
    }

    /** Represents a s2c_tour_update_list. */
    class s2c_tour_update_list {

        /** Constructs a new s2c_tour_update_list. */
        constructor();

        /** 今日已购买次数 */
        public buy: number;

        /** 已挑战次数 */
        public done_times: number;

        /** 下次挑战次数恢复 1次时间 */
        public next_time: number;

        /** 排行榜结束时间戳 */
        public rank_end_time: number;

        /** 积分 */
        public score: number;

        /** - 1,2,3,4名 */
        public top_rank: msg.tour_role_info[];

        /** 0 正常 1 宝箱  2宝藏 3异形 4杀手 5答题 */
        public type: number;

        /** 奖励宝藏对应的礼包id */
        public gift_index: number;

        /** 今日胜场 */
        public today_win_cnt: number;

        /** 已领取胜场奖励列表 */
        public award_list: number[];
    }

    /** Represents a c2s_tour_win_get_list. */
    class c2s_tour_win_get_list {

        /** Constructs a new c2s_tour_win_get_list. */
        constructor();

        /** 奖励索引 */
        public index: number;
    }

    /** 答题请求 */
    class c2s_tour_dati_select {

        /** Constructs a new c2s_tour_dati_select. */
        constructor();

        /** 1 2 3 4 */
        public index: number;
    }

    /** 答题返回 */
    class s2c_tour_dati_select {

        /** Constructs a new s2c_tour_dati_select. */
        constructor();

        /** true正确 */
        public is_true: boolean;
    }

    /** 许愿宝箱返回 */
    class s2c_tour_wish_get_list {

        /** Constructs a new s2c_tour_wish_get_list. */
        constructor();

        /** 奖励列表 */
        public list: msg.tour_wish_reward_status[];
    }

    /** Represents a tour_wish_reward_status. */
    class tour_wish_reward_status {

        /** Constructs a new tour_wish_reward_status. */
        constructor();

        /** 宝箱索引id */
        public index: number;

        /** 0未1可领取2已领取 */
        public status: number;

        /** 对应宝箱奖励 */
        public props?: (msg.prop_tips_data|null);
    }

    /** 点击挑战 */
    class c2s_tour_challenge {

        /** Constructs a new c2s_tour_challenge. */
        constructor();

        /** 位置 */
        public rank_no: number;

        /** 0 正常 1 宝箱  2宝藏 3异形 4杀手 5答题 */
        public type: number;
    }

    /** 刷新守方对手 返回s2c_tour_update_list */
    class c2s_tour_refresh_defender {

        /** Constructs a new c2s_tour_refresh_defender. */
        constructor();
    }

    /** 购买次数  返回s2c_tour_update_list */
    class c2s_tour_buy_times {

        /** Constructs a new c2s_tour_buy_times. */
        constructor();

        /** 购买×次 */
        public cnt: number;
    }

    /** 点击阶段奖励信息 */
    class c2s_tour_stage_get_list {

        /** Constructs a new c2s_tour_stage_get_list. */
        constructor();
    }

    /** Represents a s2c_tour_stage_get_list. */
    class s2c_tour_stage_get_list {

        /** Constructs a new s2c_tour_stage_get_list. */
        constructor();

        /** 累计完成游历次数 */
        public challenge_cnt: number;

        /** 可以领取的列表（包含已领取的） */
        public list: msg.common_reward_status[];
    }

    /** 购买阶段奖励 返回 s2c_tour_stage_get_list */
    class c2s_tour_stage_buy {

        /** Constructs a new c2s_tour_stage_buy. */
        constructor();

        /** 奖励索引 */
        public index: number;
    }

    /** 点击阶段奖励信息 */
    class c2s_tour_fuli_get_list {

        /** Constructs a new c2s_tour_fuli_get_list. */
        constructor();
    }

    /** Represents a s2c_tour_fuli_get_list. */
    class s2c_tour_fuli_get_list {

        /** Constructs a new s2c_tour_fuli_get_list. */
        constructor();

        /** 今日获得分数 */
        public tourpvp_day_score: number;

        /** 可以领取的列表（包含已领取的） */
        public list: msg.common_reward_status[];
    }

    /** 购买阶段奖励 返回 s2c_tour_fuli_get_list */
    class c2s_tour_fuli_buy {

        /** Constructs a new c2s_tour_fuli_buy. */
        constructor();

        /** 奖励索引 */
        public index: number;
    }

    /** 跨服boss/////////////// */
    class guild_hurt_rank {

        /** Constructs a new guild_hurt_rank. */
        constructor();

        /** 公会名称 */
        public guild_name: string;

        /** 总伤害 */
        public value: Long;

        /** 会长信息 */
        public leaderinfo?: (msg.teammate|null);

        /** guild_hurt_rank rank_num. */
        public rank_num: number;
    }

    /** Represents a c2s_new_cross_boss_challenge. */
    class c2s_new_cross_boss_challenge {

        /** Constructs a new c2s_new_cross_boss_challenge. */
        constructor();

        /** 副本配置索引编号 */
        public index: number;
    }

    /** Represents a s2c_new_cross_boss. */
    class s2c_new_cross_boss {

        /** Constructs a new s2c_new_cross_boss. */
        constructor();

        /** 副本配置索引编号 */
        public index: number;

        /** boss血量(百分比) */
        public hp: number;

        /** boss下一次复活时间戳（开启） */
        public next_recover_time: Long;

        /** 0说明boss未开，有时间表示boss已开，时间为本次结束时间 */
        public endtime: Long;

        /** 可用次数 */
        public count: number;

        /** 已购买次数 */
        public buycount: number;
    }

    /** 请求boss信息 */
    class c2s_new_cross_boss {

        /** Constructs a new c2s_new_cross_boss. */
        constructor();

        /** 副本配置索引编号 */
        public index: number;

        /** 1基础信息  2排行信息 */
        public button_type: number;
    }

    /** 场景主动更新排行数据 */
    class s2c_new_cross_boss_scene {

        /** Constructs a new s2c_new_cross_boss_scene. */
        constructor();

        /** s2c_new_cross_boss_scene player_ranks. */
        public player_ranks: msg.teammate[];

        /** s2c_new_cross_boss_scene my_info. */
        public my_info?: (msg.teammate|null);

        /** s2c_new_cross_boss_scene guild_ranks. */
        public guild_ranks: msg.guild_hurt_rank[];

        /** s2c_new_cross_boss_scene my_guild_info. */
        public my_guild_info?: (msg.guild_hurt_rank|null);
    }

    /** 跨服boss上期排行信息 */
    class s2c_new_cross_boss_ranks_list {

        /** Constructs a new s2c_new_cross_boss_ranks_list. */
        constructor();

        /** s2c_new_cross_boss_ranks_list player_ranks. */
        public player_ranks: msg.teammate[];

        /** s2c_new_cross_boss_ranks_list my_info. */
        public my_info?: (msg.teammate|null);

        /** s2c_new_cross_boss_ranks_list guild_ranks. */
        public guild_ranks: msg.guild_hurt_rank[];

        /** s2c_new_cross_boss_ranks_list my_guild_info. */
        public my_guild_info?: (msg.guild_hurt_rank|null);
    }

    /** 幸运大奖 */
    class s2c_new_cross_boss_roll_point {

        /** Constructs a new s2c_new_cross_boss_roll_point. */
        constructor();

        /** 参数表万分比数值 */
        public percent: number;

        /** 自己点数 */
        public my_roll_point: number;

        /** 玩家点数列表 */
        public point_list: msg.teammate[];
    }

    /** 可复用奖励结构 */
    class common_reward_status {

        /** Constructs a new common_reward_status. */
        constructor();

        /** common_reward_status index. */
        public index: Long;

        /** 0未1可领取2已领取 */
        public status: number;

        /** 目前已完成次数 用于进阶奖励显示 */
        public finish_cnt: number;

        /** 可选参数 */
        public status2: number;
    }

    /** 领取达标奖励 */
    class c2s_new_cross_boss_hurt_reward {

        /** Constructs a new c2s_new_cross_boss_hurt_reward. */
        constructor();

        /** 奖励索引 */
        public index: Long;

        /** 挑战的boss索引 */
        public boss_index: number;
    }

    /** 达标奖励列表 */
    class s2c_new_cross_boss_hurt_reward {

        /** Constructs a new s2c_new_cross_boss_hurt_reward. */
        constructor();

        /** 可以领取的列表（包含已领取的） */
        public list: msg.common_reward_status[];
    }

    /** 购买跨服boss挑战次数 */
    class c2s_new_cross_boss_buy_count {

        /** Constructs a new c2s_new_cross_boss_buy_count. */
        constructor();
    }

    /** Represents a suit_item. */
    class suit_item {

        /** Constructs a new suit_item. */
        constructor();

        /** suit_item type. */
        public type: number;

        /** 装备 */
        public equips: msg.suit_equip[];

        /** 强化属性 */
        public master_attr?: (msg.attributes|null);

        /** 套装属性 */
        public suit_attr?: (msg.attributes|null);

        /** 强化大师等级 */
        public master_lv: number;

        /** 套装升阶等级 */
        public suit_lv: number;
    }

    /** Represents a suit_equip. */
    class suit_equip {

        /** Constructs a new suit_equip. */
        constructor();

        /** 部位 */
        public pos: number;

        /** suit_equip equipment_id. */
        public equipment_id: Long;

        /** 阶数 */
        public stage: number;

        /** 强化等级 */
        public level: number;

        /** 单个装备属性 */
        public attr?: (msg.attributes|null);

        /** 强化属性 */
        public lv_attr?: (msg.attributes|null);

        /** 强化下一级属性 */
        public next_lv_attr?: (msg.attributes|null);

        /** 强化消耗道具 */
        public prop_data: msg.prop_tips_data[];
    }

    /** 苍天 炎天信息 */
    class s2c_suit_equip_info {

        /** Constructs a new s2c_suit_equip_info. */
        constructor();

        /** 苍天 炎天信息 */
        public infos: msg.suit_item[];
    }

    /** 穿戴苍天 炎天装备 */
    class c2s_suit_equip_takeon {

        /** Constructs a new c2s_suit_equip_takeon. */
        constructor();

        /** 装备id */
        public equipment_id: Long;

        /** 1苍天 2炎天 */
        public type: number;

        /** 0-7部位 */
        public pos: number;
    }

    /** 一键穿戴 (s2c_suit_equip_info) */
    class c2s_suit_equip_onekey {

        /** Constructs a new c2s_suit_equip_onekey. */
        constructor();

        /** 1苍天 2炎天 */
        public type: number;

        /** 装备id 装备id最后一位是位置 */
        public equipment_id: Long[];
    }

    /** 装备强化 */
    class c2s_suit_equip_lvup {

        /** Constructs a new c2s_suit_equip_lvup. */
        constructor();

        /** 0单件强化 1:一键强化 */
        public opear: number;

        /** 1苍天 2炎天 */
        public type: number;

        /** 0-7部位 */
        public pos: number;
    }

    /** 装备强化大师升级 */
    class c2s_suit_equip_master_lvup {

        /** Constructs a new c2s_suit_equip_master_lvup. */
        constructor();

        /** 1苍天 2炎天 */
        public type: number;
    }

    /** 套装装备合成 */
    class c2s_suit_equip_synthesis {

        /** Constructs a new c2s_suit_equip_synthesis. */
        constructor();

        /** 装备id */
        public equipment_id: Long;

        /** 1苍天 2炎天 */
        public type: number;

        /** 0-7部位 */
        public pos: number;

        /** 合成数量 */
        public cnt: number;
    }

    /** Represents a s2c_suit_equip_synthesis. */
    class s2c_suit_equip_synthesis {

        /** Constructs a new s2c_suit_equip_synthesis. */
        constructor();
    }

    /** Represents an attr_and_next. */
    class attr_and_next {

        /** Constructs a new attr_and_next. */
        constructor();

        /** 部位 */
        public pos: number;

        /** 当前等级 */
        public lv: number;

        /** 属性 */
        public attr?: (msg.attributes|null);

        /** 下一级属性 */
        public next_attr?: (msg.attributes|null);
    }

    /** Represents a suit_two_item. */
    class suit_two_item {

        /** Constructs a new suit_two_item. */
        constructor();

        /** suit_two_item type. */
        public type: number;

        /** 装备 */
        public equips: msg.suit_two_equip[];
    }

    /** Represents a suit_two_equip. */
    class suit_two_equip {

        /** Constructs a new suit_two_equip. */
        constructor();

        /** 1 进阶 2 锻造 3 精铸 */
        public oper_type: number;

        /** 装备属性和消耗材料 部位 */
        public attr_list: msg.attr_and_next[];
    }

    /** 颢天、玄天、钧天信息 */
    class s2c_suit_two_equip_info {

        /** Constructs a new s2c_suit_two_equip_info. */
        constructor();

        /** 颢天、玄天、钧天信息 */
        public infos: msg.suit_two_item[];
    }

    /** 穿戴颢天、玄天、钧天装备 */
    class c2s_suit_two_equip_takeon {

        /** Constructs a new c2s_suit_two_equip_takeon. */
        constructor();

        /** 3颢天 4玄天 5钧天 */
        public type: number;

        /** 0-9部位 */
        public pos: number;

        /** 装备id */
        public equipment_id: Long;
    }

    /** 装备强化 */
    class c2s_suit_two_equip_lvup {

        /** Constructs a new c2s_suit_two_equip_lvup. */
        constructor();

        /** 0单件 1:一键 */
        public opear: number;

        /** 1 进阶 2 锻造 3 精铸 */
        public opear_type: number;

        /** 3颢天 4玄天 5钧天 */
        public type: number;

        /** 0-9部位 */
        public pos: number;
    }

    /** 请求匹配挑战者 */
    class c2s_pvp_battle_get_player_challenge_info {

        /** Constructs a new c2s_pvp_battle_get_player_challenge_info. */
        constructor();
    }

    /** 匹配到的玩家信息 */
    class s2c_pvp_battle_get_player_challenge_info {

        /** Constructs a new s2c_pvp_battle_get_player_challenge_info. */
        constructor();

        /** 玩家信息 */
        public player_info?: (msg.teammate|null);

        /** 是否匹配成功 */
        public is_success: boolean;
    }

    /** 斗技挑战,真正进入战斗 */
    class c2s_pvp_battle_rank_challenge {

        /** Constructs a new c2s_pvp_battle_rank_challenge. */
        constructor();
    }

    /** 碾压结果 */
    class s2c_pvp_battle_more_power_end {

        /** Constructs a new s2c_pvp_battle_more_power_end. */
        constructor();

        /** s2c_pvp_battle_more_power_end addscore. */
        public addscore: number;

        /** 奖励 */
        public reward: msg.prop_tips_data[];
    }

    /** 领取连胜奖励 */
    class c2s_pvp_battle_keep_win_rewards {

        /** Constructs a new c2s_pvp_battle_keep_win_rewards. */
        constructor();

        /** c2s_pvp_battle_keep_win_rewards index. */
        public index: number;
    }

    /** 领取阶段奖励 */
    class c2s_pvp_battle_win_count_rewards {

        /** Constructs a new c2s_pvp_battle_win_count_rewards. */
        constructor();

        /** c2s_pvp_battle_win_count_rewards index. */
        public index: number;
    }

    /** 购买挑战次数 */
    class c2s_pvp_battle_buy_count {

        /** Constructs a new c2s_pvp_battle_buy_count. */
        constructor();

        /** c2s_pvp_battle_buy_count buycount. */
        public buycount: number;
    }

    /** 请求斗技基础信息 */
    class c2s_pvp_battle_get_base_info {

        /** Constructs a new c2s_pvp_battle_get_base_info. */
        constructor();
    }

    /** 基础信息 */
    class s2c_pvp_battle_base_info {

        /** Constructs a new s2c_pvp_battle_base_info. */
        constructor();

        /** 积分 */
        public score: number;

        /** 连胜次数 */
        public keepwin_num: number;

        /** 可用挑战次数 */
        public count: number;

        /** 已购买次数 */
        public buycount: number;

        /** 已挑战次数 */
        public use_count: number;

        /** 连胜奖励列表（包含已领取的） */
        public keep_win_list: msg.common_reward_status[];

        /** 阶段奖励列表（包含已领取的） */
        public count_list: msg.common_reward_status[];

        /** 1表示全部，不推或者其他表示缺省 */
        public oper: number;
    }

    /** 请求某个斗技排行数据 */
    class c2s_pvp_battle_get_rank_info {

        /** Constructs a new c2s_pvp_battle_get_rank_info. */
        constructor();

        /** 1为本服  2为跨服  3为巅峰 */
        public rank_type: number;
    }

    /** 排行信息(该协议只返回其中某个排行) */
    class s2c_pvp_battle_rank_info {

        /** Constructs a new s2c_pvp_battle_rank_info. */
        constructor();

        /** 1为本服  2为跨服  3为巅峰 */
        public rank_type: number;

        /** 1本服排行 2跨服排行 3巅峰排行 */
        public server_player_ranks: msg.teammate[];

        /** 第一名信息 */
        public top_one?: (msg.teammate|null);

        /** 排行结束时间 */
        public endtime: Long;
    }

    /** Represents a pvp_battle_pk_data. */
    class pvp_battle_pk_data {

        /** Constructs a new pvp_battle_pk_data. */
        constructor();

        /** pvp_battle_pk_data name. */
        public name: string;

        /** 服务器id */
        public server_id: number;

        /** 角色id */
        public role_id: Long;

        /** 头像 */
        public head: Long;

        /** 头像框 */
        public head_frame: Long;

        /** 性别 0：女 1:男 */
        public sex: number;

        /** 增加的积分或者减少的积分 */
        public addscore: number;

        /** 挑战结果 */
        public result: boolean;

        /** VIP */
        public vip: number;

        /** 挑战时间 */
        public pktime: Long;
    }

    /** 请求战报 */
    class c2s_pvp_battle_get_pk_info {

        /** Constructs a new c2s_pvp_battle_get_pk_info. */
        constructor();
    }

    /** 战报信息 */
    class s2c_pvp_battle_pk_info {

        /** Constructs a new s2c_pvp_battle_pk_info. */
        constructor();

        /** s2c_pvp_battle_pk_info list. */
        public list: msg.pvp_battle_pk_data[];
    }

    /** 决赛竞猜 */
    class c2s_pvp_battle_guess {

        /** Constructs a new c2s_pvp_battle_guess. */
        constructor();

        /** c2s_pvp_battle_guess role_id. */
        public role_id: Long;
    }

    /** 已竞猜的玩家id列表 */
    class s2c_pvp_battle_guess_list {

        /** Constructs a new s2c_pvp_battle_guess_list. */
        constructor();

        /** s2c_pvp_battle_guess_list role_id_list. */
        public role_id_list: Long[];
    }

    /** Represents a pvp_battle_group_role_info. */
    class pvp_battle_group_role_info {

        /** Constructs a new pvp_battle_group_role_info. */
        constructor();

        /** pk左边玩家 */
        public role_info1?: (msg.teammate|null);

        /** pk右边玩家 */
        public role_info2?: (msg.teammate|null);

        /** 1，2，3各场战斗，1对16为一场  8-9为一场， 2场战斗胜利者战斗再为一场（如1-8），按照顺序推送给前端 */
        public match_num: number;

        /** 胜利者id */
        public win_roleid: Long;
    }

    /** 每组信息 */
    class pvp_battle_group_pk {

        /** Constructs a new pvp_battle_group_pk. */
        constructor();

        /** 1 2 3 4   5表示是决赛的分组 */
        public group_type: number;

        /** 3场对战信息1，2，3各场战斗，1对16为一场  8-9为一场， 2场战斗胜利者战斗再为一场（如1-8），按照顺序推送给前端 */
        public info: msg.pvp_battle_group_role_info[];
    }

    /** 小组赛每组信息 */
    class s2c_pvp_battle_group_pk {

        /** Constructs a new s2c_pvp_battle_group_pk. */
        constructor();

        /** 0积分赛 1小组赛   2决赛 */
        public type: number;

        /** s2c_pvp_battle_group_pk list. */
        public list: msg.pvp_battle_group_pk[];

        /** 开始时间 */
        public pktime: Long;
    }

    /** 小组赛未开启时，请求每组信息(该请求只会推送pvp_battle_group_role_info结构下面的role_info信息)，用于显示哪些玩家参与小组赛 */
    class c2s_pvp_battle_group_pk_info {

        /** Constructs a new c2s_pvp_battle_group_pk_info. */
        constructor();
    }

    /** 点击阶段奖励信息 */
    class c2s_jinjie_stage_get_list {

        /** Constructs a new c2s_jinjie_stage_get_list. */
        constructor();

        /** 1元灵 2 苍天 3 炎天 4 颢天 5 玄天 6 钧天 */
        public type: number;
    }

    /** Represents a c2s_jinjie_stage_get_reward. */
    class c2s_jinjie_stage_get_reward {

        /** Constructs a new c2s_jinjie_stage_get_reward. */
        constructor();

        /** 1元灵 2 苍天 3 炎天 4 颢天 5 玄天 6 钧天 */
        public type: number;

        /** 奖励索引 */
        public index: number;
    }

    /** Represents a s2c_jinjie_stage_get_list. */
    class s2c_jinjie_stage_get_list {

        /** Constructs a new s2c_jinjie_stage_get_list. */
        constructor();

        /** s2c_jinjie_stage_get_list list. */
        public list: msg.jinjie_list[];

        /** 0全发 1缺省 */
        public oper: number;
    }

    /** Represents a jinjie_list. */
    class jinjie_list {

        /** Constructs a new jinjie_list. */
        constructor();

        /** 1 元灵 2 苍天 3 炎天 4 颢天 5 玄天 6 钧天 */
        public type: number;

        /** 奖励列表 */
        public reward_list: msg.common_reward_status[];

        /** 已完成次数 */
        public finish_cnt: number;
    }

    /** Represents a power_dia_info. */
    class power_dia_info {

        /** Constructs a new power_dia_info. */
        constructor();

        /** power_dia_info id_list. */
        public id_list: number[];

        /** power_dia_info count. */
        public count: number;
    }

    /** Represents a c2s_power_dia_draw. */
    class c2s_power_dia_draw {

        /** Constructs a new c2s_power_dia_draw. */
        constructor();
    }

    /** Represents a s2c_power_dia_draw_ret. */
    class s2c_power_dia_draw_ret {

        /** Constructs a new s2c_power_dia_draw_ret. */
        constructor();

        /** s2c_power_dia_draw_ret info. */
        public info?: (msg.power_dia_info|null);

        /** s2c_power_dia_draw_ret index. */
        public index: number;
    }

    /** Represents a s2c_power_dia_info. */
    class s2c_power_dia_info {

        /** Constructs a new s2c_power_dia_info. */
        constructor();

        /** s2c_power_dia_info info. */
        public info?: (msg.power_dia_info|null);
    }

    /** Represents a huanhua_datas. */
    class huanhua_datas {

        /** Constructs a new huanhua_datas. */
        constructor();

        /** 套装index */
        public index: number;

        /** 已激活列表 外显id */
        public waixian_id: number[];

        /** 激活三件套属性 */
        public suit_attr?: (msg.attributes|null);

        /** 是否已激活 0 未 1 可激活 2 已激活 */
        public is_act: number;
    }

    /** Represents a s2c_huanhua_get_list. */
    class s2c_huanhua_get_list {

        /** Constructs a new s2c_huanhua_get_list. */
        constructor();

        /** s2c_huanhua_get_list list. */
        public list: msg.huanhua_datas[];
    }

    /** 激活 */
    class c2s_huanhua_act {

        /** Constructs a new c2s_huanhua_act. */
        constructor();

        /** 激活类型 0 激活单件 1 激活套装 */
        public oper: number;

        /** 套装index */
        public index: number;

        /** 外显id */
        public waixian_id: number;
    }

    /** Represents an equip_gather_datas. */
    class equip_gather_datas {

        /** Constructs a new equip_gather_datas. */
        constructor();

        /** 套装index */
        public index: number;

        /** 已收集列表 */
        public gather_id: number[];

        /** 当前激活属性 */
        public suit_attr?: (msg.attributes|null);

        /** 当前激活×件 */
        public act_cnt: number;

        /** 是否领取大奖 0 未领取 1可领取 2 已领取 */
        public is_get: number;
    }

    /** Represents a s2c_equip_gather_get_list. */
    class s2c_equip_gather_get_list {

        /** Constructs a new s2c_equip_gather_get_list. */
        constructor();

        /** s2c_equip_gather_get_list list. */
        public list: msg.equip_gather_datas[];
    }

    /** 激活 */
    class c2s_equip_gather_act {

        /** Constructs a new c2s_equip_gather_act. */
        constructor();

        /** 套装index */
        public index: number;

        /** 1 激活 2 领取大奖 */
        public oper: number;
    }

    /** 请求排行数据 */
    class c2s_draw_get_rank_info {

        /** Constructs a new c2s_draw_get_rank_info. */
        constructor();
    }

    /** 次数排行 */
    class s2c_draw_send_rank_info {

        /** Constructs a new s2c_draw_send_rank_info. */
        constructor();

        /** 玩家排行 字段value:次数 */
        public rank_List: msg.teammate[];

        /** s2c_draw_send_rank_info my_data. */
        public my_data?: (msg.teammate|null);

        /** 排行结束时间戳 */
        public time: Long;
    }

    /** Represents a draw_fengyun_data. */
    class draw_fengyun_data {

        /** Constructs a new draw_fengyun_data. */
        constructor();

        /** 首位达标玩家 */
        public role_info?: (msg.teammate|null);

        /** 奖励状态0不可领取  1可以领取  2已领取 */
        public status: number;

        /** 奖励索引 */
        public index: number;
    }

    /** 风云录数据 */
    class s2c_draw_send_fengyun_info {

        /** Constructs a new s2c_draw_send_fengyun_info. */
        constructor();

        /** s2c_draw_send_fengyun_info list. */
        public list: msg.draw_fengyun_data[];
    }

    /** 领取风云录奖励 */
    class c2s_draw_get_fengyun_rewards {

        /** Constructs a new c2s_draw_get_fengyun_rewards. */
        constructor();

        /** c2s_draw_get_fengyun_rewards index. */
        public index: number;
    }

    /** 购买礼券 */
    class c2s_draw_buy_gift {

        /** Constructs a new c2s_draw_buy_gift. */
        constructor();

        /** 礼券索引 */
        public index: number;
    }

    /** 单个礼券数据 */
    class draw_gift_data {

        /** Constructs a new draw_gift_data. */
        constructor();

        /** 礼券索引 */
        public index: number;

        /** 剩余可买次数 */
        public count: number;
    }

    /** 礼券数据 */
    class s2c_draw_buy_gift_info {

        /** Constructs a new s2c_draw_buy_gift_info. */
        constructor();

        /** s2c_draw_buy_gift_info item_list. */
        public item_list: msg.draw_gift_data[];
    }

    /** 购买命运豪礼 */
    class c2s_draw_buy_luck_gift {

        /** Constructs a new c2s_draw_buy_luck_gift. */
        constructor();

        /** 豪礼类型 */
        public itype: number;

        /** 某类型豪礼的索引 */
        public index: number;
    }

    /** Represents a draw_luck_gift_data. */
    class draw_luck_gift_data {

        /** Constructs a new draw_luck_gift_data. */
        constructor();

        /** 索引 */
        public index: number;

        /** 0未购买  1已购买 */
        public status: number;
    }

    /** Represents a draw_itype_luck_gift_data. */
    class draw_itype_luck_gift_data {

        /** Constructs a new draw_itype_luck_gift_data. */
        constructor();

        /** 类型豪礼下各个子礼包购买情况 */
        public list: msg.draw_luck_gift_data[];

        /** 豪礼类型 */
        public itype: number;
    }

    /** 命运豪礼数据 */
    class s2c_draw_buy_luck_gift_info {

        /** Constructs a new s2c_draw_buy_luck_gift_info. */
        constructor();

        /** 各类型豪礼数据 */
        public gift_list: msg.draw_itype_luck_gift_data[];
    }

    /** 抽奖获得 */
    class s2c_draw_get_rewards {

        /** Constructs a new s2c_draw_get_rewards. */
        constructor();

        /** 抽奖获得道具 */
        public item_list: msg.prop_tips_data[];

        /** 欧气值 */
        public luck_num: number;

        /** 抽奖类型区分 1召唤系统 2浮沉灵壶抽奖 3浮沉灵壶特殊池抽奖 */
        public type: number;
    }

    /** 点击抽奖 */
    class c2s_draw_button_click {

        /** Constructs a new c2s_draw_button_click. */
        constructor();

        /** 1为单抽   2为10连  3为100抽 */
        public button_type: number;
    }

    /** 抽奖数据 */
    class s2c_draw_base_data {

        /** Constructs a new s2c_draw_base_data. */
        constructor();

        /** 抽奖次数 */
        public count: number;

        /** 积分 */
        public score: number;

        /** 非酋积分 */
        public unluck_score: number;

        /** 最小幸运值 */
        public min_luck_score: number;

        /** 最大幸运值 */
        public max_luck_score: number;
    }

    /** 请求商品信息 */
    class c2s_treasure_house_info {

        /** Constructs a new c2s_treasure_house_info. */
        constructor();
    }

    /** 购买商品 */
    class c2s_treasure_house_buy_prop {

        /** Constructs a new c2s_treasure_house_buy_prop. */
        constructor();

        /** 商品编号 */
        public index: number;

        /** 购买数量 */
        public buy_cnt: number;
    }

    /** 返回商品信息 */
    class s2c_treasure_house_info {

        /** Constructs a new s2c_treasure_house_info. */
        constructor();

        /** s2c_treasure_house_info infos. */
        public infos: msg.treasure_house_info[];
    }

    /** 商品信息 */
    class treasure_house_info {

        /** Constructs a new treasure_house_info. */
        constructor();

        /** 商品编号 */
        public index: number;

        /** 已购买数量 */
        public bought_cnt: number;
    }

    /** 请求商品信息 */
    class c2s_daily_mall_info {

        /** Constructs a new c2s_daily_mall_info. */
        constructor();
    }

    /** 领取大奖 */
    class c2s_daily_mall_get_award {

        /** Constructs a new c2s_daily_mall_get_award. */
        constructor();

        /** 1 每日 2 每周 */
        public type: number;
    }

    /** 返回商品信息 */
    class s2c_daily_mall_info {

        /** Constructs a new s2c_daily_mall_info. */
        constructor();

        /** s2c_daily_mall_info infos. */
        public infos: msg.daily_mall_info[];

        /** 1就是跨天 */
        public is_new_day: number;
    }

    /** 商品信息 */
    class daily_mall_info {

        /** Constructs a new daily_mall_info. */
        constructor();

        /** 1 每日 2 每周 */
        public type: number;

        /** daily_mall_info shop_info. */
        public shop_info: msg.treasure_house_info[];

        /** 充值金额 */
        public change: number;
    }

    /** 返回商品信息 */
    class s2c_supreme_git_info {

        /** Constructs a new s2c_supreme_git_info. */
        constructor();

        /** s2c_supreme_git_info infos. */
        public infos: msg.supreme_git_info[];
    }

    /** 商品信息 */
    class supreme_git_info {

        /** Constructs a new supreme_git_info. */
        constructor();

        /** 商品id */
        public id: number;

        /** 已经购买次数 */
        public count: number;
    }

    /** 送100召唤券(战令)////// */
    class game_order_data {

        /** Constructs a new game_order_data. */
        constructor();

        /** 战令类型 */
        public type: number;

        /** 当前战令拥有的目标值（如：闯关数，活跃值。。） */
        public value: Long;

        /** 可以领取的列表（包含已领取的） */
        public list: msg.common_reward_status[];

        /** 是否购买战令 0未购买   1已购买 */
        public is_buy: number;

        /** 战令如果周期开启，则有结束时间 */
        public endtime: Long;
    }

    /** 战令信息 */
    class s2c_game_order_info {

        /** Constructs a new s2c_game_order_info. */
        constructor();

        /** 战令列表 */
        public act_list: msg.game_order_data[];

        /** 1全部更新   2单个更新 */
        public oper: number;
    }

    /** 请求领取战令奖励 */
    class c2s_game_order_get_rewards {

        /** Constructs a new c2s_game_order_get_rewards. */
        constructor();

        /** 战令类型 */
        public type: number;
    }

    /** Represents a demon_reward_info. */
    class demon_reward_info {

        /** Constructs a new demon_reward_info. */
        constructor();

        /** demon_reward_info index. */
        public index: number;

        /** demon_reward_info first_reward. */
        public first_reward: number;

        /** demon_reward_info personal_reward. */
        public personal_reward: number;

        /** demon_reward_info kill_reward. */
        public kill_reward: number;

        /** demon_reward_info first_name. */
        public first_name: string;
    }

    /** Represents a s2c_demon_reward_data. */
    class s2c_demon_reward_data {

        /** Constructs a new s2c_demon_reward_data. */
        constructor();

        /** s2c_demon_reward_data list. */
        public list: msg.demon_reward_info[];
    }

    /** Represents a c2s_open_demon_reward. */
    class c2s_open_demon_reward {

        /** Constructs a new c2s_open_demon_reward. */
        constructor();
    }

    /** Represents a c2s_receive_demon_reward. */
    class c2s_receive_demon_reward {

        /** Constructs a new c2s_receive_demon_reward. */
        constructor();

        /** c2s_receive_demon_reward index. */
        public index: number;

        /** c2s_receive_demon_reward type. */
        public type: number;
    }

    /** Represents a s2c_receive_demon_reward_ret. */
    class s2c_receive_demon_reward_ret {

        /** Constructs a new s2c_receive_demon_reward_ret. */
        constructor();

        /** s2c_receive_demon_reward_ret info. */
        public info?: (msg.demon_reward_info|null);
    }

    /** Represents a c2s_zero_buy_get. */
    class c2s_zero_buy_get {

        /** Constructs a new c2s_zero_buy_get. */
        constructor();

        /** 礼包id */
        public index: number;
    }

    /** Represents a s2c_zero_buy_info. */
    class s2c_zero_buy_info {

        /** Constructs a new s2c_zero_buy_info. */
        constructor();

        /** 领取的列表 */
        public infos: msg.common_reward_status[];
    }

    /** 幸运数字 */
    class s2c_zcx_luck_number {

        /** Constructs a new s2c_zcx_luck_number. */
        constructor();

        /** 幸运数字 */
        public luck_num: number;

        /** 0不可领取   1可领取   2已领取 */
        public status: number;

        /** 第x等奖   0表示未开奖 */
        public rank_num: number;

        /** 字段value为幸运数字 获奖列表 第一位为一等奖玩家 */
        public list: msg.teammate[];
    }

    /** Represents a c2s_get_zcx_luck_number. */
    class c2s_get_zcx_luck_number {

        /** Constructs a new c2s_get_zcx_luck_number. */
        constructor();

        /** 1获得幸运数字  2领奖   3请求获奖名单 */
        public button_type: number;
    }

    /** 进宝钱庄 */
    class s2c_zcx_coins_bank_info {

        /** Constructs a new s2c_zcx_coins_bank_info. */
        constructor();

        /** 存储的货币数 */
        public value: Long;

        /** 收益重新开始的时间戳 */
        public save_time: Long;

        /** 收益道具 */
        public item_list: msg.prop_tips_data[];
    }

    /** Represents a c2s_zcx_coins_bank_button. */
    class c2s_zcx_coins_bank_button {

        /** Constructs a new c2s_zcx_coins_bank_button. */
        constructor();

        /** 1为存   2为取 */
        public button_type: number;
    }

    /** 领取收益 */
    class c2s_zcx_coins_bank_get_rewards {

        /** Constructs a new c2s_zcx_coins_bank_get_rewards. */
        constructor();
    }

    /** 请求计算收益 */
    class c2s_zcx_coins_bank_refresh {

        /** Constructs a new c2s_zcx_coins_bank_refresh. */
        constructor();
    }

    /** 兑换 */
    class c2s_zcx_exchange_button {

        /** Constructs a new c2s_zcx_exchange_button. */
        constructor();

        /** 索引 */
        public index: number;

        /** 兑换数量 */
        public num: number;
    }

    /** Represents a zcx_exchange_data. */
    class zcx_exchange_data {

        /** Constructs a new zcx_exchange_data. */
        constructor();

        /** 索引 */
        public index: number;

        /** 剩余次数 */
        public count: number;
    }

    /** Represents a s2c_zcx_exchange_info. */
    class s2c_zcx_exchange_info {

        /** Constructs a new s2c_zcx_exchange_info. */
        constructor();

        /** 列表 */
        public list: msg.zcx_exchange_data[];
    }

    /** 财神副本 */
    class zcx_raid_record {

        /** Constructs a new zcx_raid_record. */
        constructor();

        /** zcx_raid_record name. */
        public name: string;

        /** 奖励道具 */
        public item_list: msg.prop_tips_data[];
    }

    /** Represents a s2c_zcx_raid_info. */
    class s2c_zcx_raid_info {

        /** Constructs a new s2c_zcx_raid_info. */
        constructor();

        /** s2c_zcx_raid_info count. */
        public count: number;

        /** 获得奖励记录 */
        public records: msg.zcx_raid_record[];
    }

    /** 请求挑战财神副本 */
    class c2s_zcx_raid_challenge {

        /** Constructs a new c2s_zcx_raid_challenge. */
        constructor();
    }

    /** 招财仙基金: 数据下发 */
    class s2c_zcx_fund_update {

        /** Constructs a new s2c_zcx_fund_update. */
        constructor();

        /** 1.福利基金2.超级基金 */
        public type: number;

        /** 已签到的索引 */
        public get_index: number;

        /** 当前可签到的索引 */
        public index: number;

        /** 1.可领取2.已领取 */
        public box_status: number;

        /** 礼包重置时间戳 */
        public reset_time: number;

        /** 是否购买：true购买 */
        public is_buy: boolean;
    }

    /** 招财仙基金: 领取宝箱奖励 */
    class c2s_zcx_fund_box_reward {

        /** Constructs a new c2s_zcx_fund_box_reward. */
        constructor();

        /** 1.福利基金2.超级基金 */
        public type: number;
    }

    /** 招财仙基金: 领取天数奖励 */
    class c2s_zcx_fund_day_reward {

        /** Constructs a new c2s_zcx_fund_day_reward. */
        constructor();

        /** 1.福利基金2.超级基金 */
        public type: number;
    }

    /** 招财仙基金: 打开宝箱界面 */
    class c2s_zcx_fund_box_show {

        /** Constructs a new c2s_zcx_fund_box_show. */
        constructor();

        /** 1.福利基金2.超级基金 */
        public type: number;
    }

    /** 招财仙基金: 打开宝箱界面 返回 */
    class s2c_zcx_fund_box_show {

        /** Constructs a new s2c_zcx_fund_box_show. */
        constructor();

        /** 1.福利基金2.超级基金 */
        public type: number;

        /** 购买人数 */
        public count: number;
    }

    /** 招财仙基金： 请求奖励界面 */
    class c2s_zcx_fund_reward_show {

        /** Constructs a new c2s_zcx_fund_reward_show. */
        constructor();

        /** 1.福利基金2.超级基金 */
        public type: number;
    }

    /** 招财仙基金： 请求奖励界面 返回 */
    class s2c_zcx_fund_reward_show {

        /** Constructs a new s2c_zcx_fund_reward_show. */
        constructor();

        /** 1.福利基金2.超级基金 */
        public type: number;

        /** 购买后获得的索引奖励 */
        public index: number;
    }

    /** Represents a role_ring_info. */
    class role_ring_info {

        /** Constructs a new role_ring_info. */
        constructor();

        /** role_ring_info type. */
        public type: number;

        /** role_ring_info ring_value. */
        public ring_value: number;

        /** role_ring_info yaoqi_value. */
        public yaoqi_value: number;

        /** role_ring_info ring_reward. */
        public ring_reward: number;

        /** role_ring_info yaoqi_reward. */
        public yaoqi_reward: number;

        /** role_ring_info yaoqi_index. */
        public yaoqi_index: number;
    }

    /** Represents a s2c_role_ring_data. */
    class s2c_role_ring_data {

        /** Constructs a new s2c_role_ring_data. */
        constructor();

        /** s2c_role_ring_data list. */
        public list: msg.role_ring_info[];
    }

    /** Represents a s2c_role_ring_update. */
    class s2c_role_ring_update {

        /** Constructs a new s2c_role_ring_update. */
        constructor();

        /** s2c_role_ring_update info. */
        public info?: (msg.role_ring_info|null);
    }

    /** Represents a c2s_role_ring_receive. */
    class c2s_role_ring_receive {

        /** Constructs a new c2s_role_ring_receive. */
        constructor();

        /** c2s_role_ring_receive type. */
        public type: number;

        /** c2s_role_ring_receive act_event. */
        public act_event: number;
    }

    /** Represents a c2s_role_ring_foster. */
    class c2s_role_ring_foster {

        /** Constructs a new c2s_role_ring_foster. */
        constructor();

        /** c2s_role_ring_foster type. */
        public type: number;

        /** c2s_role_ring_foster act_event. */
        public act_event: number;
    }

    /** 请求商品信息 */
    class c2s_exchange_shop_info {

        /** Constructs a new c2s_exchange_shop_info. */
        constructor();

        /** 商店类型 */
        public shop_type: number;
    }

    /** 购买商品 */
    class c2s_exchange_shop_buy_prop {

        /** Constructs a new c2s_exchange_shop_buy_prop. */
        constructor();

        /** 商品编号 */
        public index: number;

        /** 购买数量 */
        public buy_cnt: number;

        /** 商店类型 */
        public shop_type: number;
    }

    /** 刷新商店 */
    class c2s_exchange_shop_refresh_prop {

        /** Constructs a new c2s_exchange_shop_refresh_prop. */
        constructor();

        /** 商店类型 */
        public shop_type: number;
    }

    /** 返回商品信息 */
    class s2c_exchange_shop_info {

        /** Constructs a new s2c_exchange_shop_info. */
        constructor();

        /** 1为全更 2为缺省 */
        public oper: number;

        /** s2c_exchange_shop_info infos. */
        public infos: msg.exchange_shop_info[];
    }

    /** 商品信息 */
    class exchange_shop_info {

        /** Constructs a new exchange_shop_info. */
        constructor();

        /** exchange_shop_info info. */
        public info: msg.treasure_house_info[];

        /** 商店类型 */
        public shop_type: number;

        /** 是否为随机出来商店 */
        public is_random: boolean;

        /** 今日免费刷新次数 目前只有shop_type 等于2才有 */
        public refresh_cnt: number;
    }

    /** Represents a yaoji_target. */
    class yaoji_target {

        /** Constructs a new yaoji_target. */
        constructor();

        /** yaoji_target index. */
        public index: number;

        /** yaoji_target state. */
        public state: number;
    }

    /** Represents a s2c_yaoji_sansheng_info. */
    class s2c_yaoji_sansheng_info {

        /** Constructs a new s2c_yaoji_sansheng_info. */
        constructor();

        /** s2c_yaoji_sansheng_info target_list. */
        public target_list: msg.yaoji_target[];
    }

    /** Represents a s2c_yaoji_sanshi_info. */
    class s2c_yaoji_sanshi_info {

        /** Constructs a new s2c_yaoji_sanshi_info. */
        constructor();

        /** s2c_yaoji_sanshi_info target_list. */
        public target_list: msg.yaoji_target[];

        /** s2c_yaoji_sanshi_info stage. */
        public stage: number;

        /** s2c_yaoji_sanshi_info count. */
        public count: number;
    }

    /** Represents a s2c_yaoji_shenqi_info. */
    class s2c_yaoji_shenqi_info {

        /** Constructs a new s2c_yaoji_shenqi_info. */
        constructor();

        /** s2c_yaoji_shenqi_info count. */
        public count: number;
    }

    /** Represents a c2s_yaoji_shenqi_challenge. */
    class c2s_yaoji_shenqi_challenge {

        /** Constructs a new c2s_yaoji_shenqi_challenge. */
        constructor();
    }

    /** Represents a yaoji_baoku. */
    class yaoji_baoku {

        /** Constructs a new yaoji_baoku. */
        constructor();

        /** yaoji_baoku index. */
        public index: number;

        /** yaoji_baoku count. */
        public count: number;
    }

    /** Represents a s2c_yaoji_baoku_info. */
    class s2c_yaoji_baoku_info {

        /** Constructs a new s2c_yaoji_baoku_info. */
        constructor();

        /** s2c_yaoji_baoku_info list. */
        public list: msg.yaoji_baoku[];
    }

    /** Represents a s2c_yaoji_charge_info. */
    class s2c_yaoji_charge_info {

        /** Constructs a new s2c_yaoji_charge_info. */
        constructor();

        /** s2c_yaoji_charge_info list. */
        public list: msg.yaoji_target[];
    }

    /** Represents a s2c_yaoji_haoli_info. */
    class s2c_yaoji_haoli_info {

        /** Constructs a new s2c_yaoji_haoli_info. */
        constructor();

        /** s2c_yaoji_haoli_info buy_list. */
        public buy_list: number[];
    }

    /** Represents a s2c_yaoji_ling_info. */
    class s2c_yaoji_ling_info {

        /** Constructs a new s2c_yaoji_ling_info. */
        constructor();

        /** s2c_yaoji_ling_info list. */
        public list: msg.yaoji_target[];

        /** s2c_yaoji_ling_info ling_list. */
        public ling_list: msg.yaoji_target[];

        /** s2c_yaoji_ling_info day. */
        public day: number;

        /** s2c_yaoji_ling_info is_ling. */
        public is_ling: boolean;
    }

    /** Represents a c2s_yaoji_receive_reward. */
    class c2s_yaoji_receive_reward {

        /** Constructs a new c2s_yaoji_receive_reward. */
        constructor();

        /** c2s_yaoji_receive_reward type. */
        public type: number;

        /** c2s_yaoji_receive_reward index. */
        public index: number;
    }

    /** Represents a c2s_yaoji_target_reward. */
    class c2s_yaoji_target_reward {

        /** Constructs a new c2s_yaoji_target_reward. */
        constructor();

        /** c2s_yaoji_target_reward type. */
        public type: number;

        /** c2s_yaoji_target_reward index. */
        public index: number;
    }

    /** Represents a c2s_yaoji_buy. */
    class c2s_yaoji_buy {

        /** Constructs a new c2s_yaoji_buy. */
        constructor();

        /** c2s_yaoji_buy type. */
        public type: number;

        /** c2s_yaoji_buy index. */
        public index: number;

        /** c2s_yaoji_buy count. */
        public count: number;
    }

    /** Represents a c2s_yaoji_get_reward. */
    class c2s_yaoji_get_reward {

        /** Constructs a new c2s_yaoji_get_reward. */
        constructor();
    }

    /** Represents a s2c_yaoji_online_info. */
    class s2c_yaoji_online_info {

        /** Constructs a new s2c_yaoji_online_info. */
        constructor();

        /** 已累计的在线时长 */
        public online_time: number;

        /** 登录时间(时间戳) */
        public login_time: number;

        /** 1 可领取 2已领取 */
        public receive: number;
    }

    /** 请求商品信息 */
    class c2s_daolv_house_info {

        /** Constructs a new c2s_daolv_house_info. */
        constructor();
    }

    /** 购买商品 */
    class c2s_daolv_house_buy_prop {

        /** Constructs a new c2s_daolv_house_buy_prop. */
        constructor();

        /** 商品编号 */
        public index: number;

        /** 购买数量 */
        public buy_cnt: number;
    }

    /** 返回商品信息 */
    class s2c_daolv_house_info {

        /** Constructs a new s2c_daolv_house_info. */
        constructor();

        /** s2c_daolv_house_info infos. */
        public infos: msg.daolv_house_info[];
    }

    /** 商品信息 */
    class daolv_house_info {

        /** Constructs a new daolv_house_info. */
        constructor();

        /** 商品编号 */
        public index: number;

        /** 周购买数量 */
        public week_cnt: number;

        /** 终生购买数量 */
        public life_cnt: number;

        /** 最大可购买次数 */
        public max_cnt: number;
    }

    /** Represents a guild_reward. */
    class guild_reward {

        /** Constructs a new guild_reward. */
        constructor();

        /** guild_reward role_id. */
        public role_id: Long;

        /** guild_reward index. */
        public index: number;

        /** guild_reward state. */
        public state: number;

        /** guild_reward name. */
        public name: string;
    }

    /** Represents a guild_draw. */
    class guild_draw {

        /** Constructs a new guild_draw. */
        constructor();

        /** guild_draw index. */
        public index: number;

        /** guild_draw count. */
        public count: number;
    }

    /** Represents a guild_draw_data. */
    class guild_draw_data {

        /** Constructs a new guild_draw_data. */
        constructor();

        /** guild_draw_data stage. */
        public stage: number;

        /** guild_draw_data list. */
        public list: msg.guild_draw[];
    }

    /** Represents a guild_shengtan. */
    class guild_shengtan {

        /** Constructs a new guild_shengtan. */
        constructor();

        /** guild_shengtan count. */
        public count: number;

        /** guild_shengtan value. */
        public value: number;

        /** guild_shengtan list. */
        public list: msg.guild_reward[];
    }

    /** Represents a member_data. */
    class member_data {

        /** Constructs a new member_data. */
        constructor();

        /** member_data role_id. */
        public role_id: Long;

        /** member_data name. */
        public name: string;

        /** member_data level. */
        public level: number;

        /** member_data sex. */
        public sex: number;

        /** member_data head. */
        public head: Long;

        /** member_data power. */
        public power: Long;

        /** member_data vip. */
        public vip: number;

        /** member_data guild_job. */
        public guild_job: number;

        /** member_data is_xianzong. */
        public is_xianzong: boolean;

        /** member_data is_online. */
        public is_online: boolean;

        /** member_data last_time. */
        public last_time: number;

        /** member_data head_frame. */
        public head_frame: number;

        /** member_data shenbing. */
        public shenbing: number;

        /** member_data wing. */
        public wing: number;

        /** member_data fashion. */
        public fashion: number;
    }

    /** Represents a function_data. */
    class function_data {

        /** Constructs a new function_data. */
        constructor();

        /** function_data is_set. */
        public is_set: boolean;

        /** function_data value. */
        public value: number;
    }

    /** Represents a guild_data. */
    class guild_data {

        /** Constructs a new guild_data. */
        constructor();

        /** guild_data id. */
        public id: number;

        /** guild_data guild_name. */
        public guild_name: string;

        /** guild_data level. */
        public level: number;

        /** guild_data num. */
        public num: number;

        /** guild_data header_name. */
        public header_name: string;

        /** guild_data content. */
        public content: string;

        /** guild_data exp. */
        public exp: number;

        /** guild_data power. */
        public power: Long;

        /** guild_data condition. */
        public condition?: (msg.function_data|null);
    }

    /** Represents a c2s_ask_guild_info. */
    class c2s_ask_guild_info {

        /** Constructs a new c2s_ask_guild_info. */
        constructor();
    }

    /** Represents a s2c_ask_guild_info_ret. */
    class s2c_ask_guild_info_ret {

        /** Constructs a new s2c_ask_guild_info_ret. */
        constructor();

        /** s2c_ask_guild_info_ret info. */
        public info?: (msg.guild_data|null);

        /** s2c_ask_guild_info_ret header. */
        public header?: (msg.member_data|null);

        /** s2c_ask_guild_info_ret xianzun. */
        public xianzun?: (msg.member_data|null);
    }

    /** Represents a c2s_ask_guild_member. */
    class c2s_ask_guild_member {

        /** Constructs a new c2s_ask_guild_member. */
        constructor();
    }

    /** Represents a s2c_ask_guild_member_ret. */
    class s2c_ask_guild_member_ret {

        /** Constructs a new s2c_ask_guild_member_ret. */
        constructor();

        /** s2c_ask_guild_member_ret member_list. */
        public member_list: msg.member_data[];
    }

    /** Represents a c2s_ask_guild_apply_info. */
    class c2s_ask_guild_apply_info {

        /** Constructs a new c2s_ask_guild_apply_info. */
        constructor();
    }

    /** Represents a s2c_ask_guild_apply_info_ret. */
    class s2c_ask_guild_apply_info_ret {

        /** Constructs a new s2c_ask_guild_apply_info_ret. */
        constructor();

        /** s2c_ask_guild_apply_info_ret apply_info. */
        public apply_info: msg.member_data[];
    }

    /** Represents a c2s_ask_guild_list. */
    class c2s_ask_guild_list {

        /** Constructs a new c2s_ask_guild_list. */
        constructor();
    }

    /** Represents a s2c_ask_guild_list_ret. */
    class s2c_ask_guild_list_ret {

        /** Constructs a new s2c_ask_guild_list_ret. */
        constructor();

        /** s2c_ask_guild_list_ret guild_list. */
        public guild_list: msg.guild_data[];

        /** s2c_ask_guild_list_ret apply_list. */
        public apply_list: number[];
    }

    /** Represents a s2c_guild_role_data. */
    class s2c_guild_role_data {

        /** Constructs a new s2c_guild_role_data. */
        constructor();

        /** s2c_guild_role_data id. */
        public id: number;

        /** s2c_guild_role_data name. */
        public name: string;

        /** s2c_guild_role_data guild_job. */
        public guild_job: number;

        /** s2c_guild_role_data quit_cd. */
        public quit_cd: number;

        /** s2c_guild_role_data create_cd. */
        public create_cd: number;

        /** s2c_guild_role_data is_create. */
        public is_create: boolean;

        /** s2c_guild_role_data apply_list. */
        public apply_list: number[];

        /** s2c_guild_role_data apply_record. */
        public apply_record: Long[];

        /** s2c_guild_role_data is_get_reward. */
        public is_get_reward: boolean;

        /** s2c_guild_role_data charge_list. */
        public charge_list: msg.guild_reward[];

        /** s2c_guild_role_data shengtan_info. */
        public shengtan_info?: (msg.guild_shengtan|null);

        /** s2c_guild_role_data xianyu_count. */
        public xianyu_count: number;

        /** s2c_guild_role_data guild_lv. */
        public guild_lv: number;
    }

    /** Represents a c2s_quit_guild. */
    class c2s_quit_guild {

        /** Constructs a new c2s_quit_guild. */
        constructor();
    }

    /** Represents a c2s_set_guild_member_job. */
    class c2s_set_guild_member_job {

        /** Constructs a new c2s_set_guild_member_job. */
        constructor();

        /** c2s_set_guild_member_job type. */
        public type: number;

        /** c2s_set_guild_member_job role_id. */
        public role_id: Long;
    }

    /** Represents a s2c_set_guild_member_job_ret. */
    class s2c_set_guild_member_job_ret {

        /** Constructs a new s2c_set_guild_member_job_ret. */
        constructor();

        /** s2c_set_guild_member_job_ret target_info. */
        public target_info?: (msg.member_data|null);

        /** s2c_set_guild_member_job_ret self_info. */
        public self_info?: (msg.member_data|null);
    }

    /** Represents a c2s_guild_kick_member. */
    class c2s_guild_kick_member {

        /** Constructs a new c2s_guild_kick_member. */
        constructor();

        /** c2s_guild_kick_member role_id. */
        public role_id: Long;
    }

    /** Represents a c2s_agree_or_refuse_guild. */
    class c2s_agree_or_refuse_guild {

        /** Constructs a new c2s_agree_or_refuse_guild. */
        constructor();

        /** c2s_agree_or_refuse_guild type. */
        public type: number;

        /** c2s_agree_or_refuse_guild role_id. */
        public role_id: Long;
    }

    /** Represents a s2c_agree_or_refuse_guild_ret. */
    class s2c_agree_or_refuse_guild_ret {

        /** Constructs a new s2c_agree_or_refuse_guild_ret. */
        constructor();

        /** s2c_agree_or_refuse_guild_ret type. */
        public type: number;

        /** s2c_agree_or_refuse_guild_ret info. */
        public info?: (msg.member_data|null);
    }

    /** Represents a c2s_guild_open_status. */
    class c2s_guild_open_status {

        /** Constructs a new c2s_guild_open_status. */
        constructor();

        /** c2s_guild_open_status condition. */
        public condition?: (msg.function_data|null);
    }

    /** Represents a s2c_guild_open_status_ret. */
    class s2c_guild_open_status_ret {

        /** Constructs a new s2c_guild_open_status_ret. */
        constructor();

        /** s2c_guild_open_status_ret condition. */
        public condition?: (msg.function_data|null);
    }

    /** Represents a c2s_choice_apply_guild. */
    class c2s_choice_apply_guild {

        /** Constructs a new c2s_choice_apply_guild. */
        constructor();

        /** c2s_choice_apply_guild id. */
        public id: number;
    }

    /** Represents a c2s_create_guild. */
    class c2s_create_guild {

        /** Constructs a new c2s_create_guild. */
        constructor();

        /** c2s_create_guild type. */
        public type: number;

        /** c2s_create_guild name. */
        public name: string;

        /** c2s_create_guild content. */
        public content: string;
    }

    /** Represents a c2s_change_guild_name. */
    class c2s_change_guild_name {

        /** Constructs a new c2s_change_guild_name. */
        constructor();

        /** c2s_change_guild_name name. */
        public name: string;
    }

    /** 帮派超链接 聊天邀请 */
    class c2s_guild_invita {

        /** Constructs a new c2s_guild_invita. */
        constructor();

        /** 聊天频道类型 */
        public channel_type: number;
    }

    /** Represents a c2s_random_guild_name. */
    class c2s_random_guild_name {

        /** Constructs a new c2s_random_guild_name. */
        constructor();
    }

    /** Represents a s2c_random_guild_name_ret. */
    class s2c_random_guild_name_ret {

        /** Constructs a new s2c_random_guild_name_ret. */
        constructor();

        /** s2c_random_guild_name_ret name. */
        public name: string;
    }

    /** Represents a c2s_set_guild_xianzong. */
    class c2s_set_guild_xianzong {

        /** Constructs a new c2s_set_guild_xianzong. */
        constructor();

        /** c2s_set_guild_xianzong role_id. */
        public role_id: Long;
    }

    /** Represents a s2c_set_guild_xianzong_ret. */
    class s2c_set_guild_xianzong_ret {

        /** Constructs a new s2c_set_guild_xianzong_ret. */
        constructor();

        /** s2c_set_guild_xianzong_ret old_info. */
        public old_info?: (msg.member_data|null);

        /** s2c_set_guild_xianzong_ret new_info. */
        public new_info?: (msg.member_data|null);
    }

    /** Represents a c2s_guild_donate. */
    class c2s_guild_donate {

        /** Constructs a new c2s_guild_donate. */
        constructor();
    }

    /** Represents a s2c_guild_donate_ret. */
    class s2c_guild_donate_ret {

        /** Constructs a new s2c_guild_donate_ret. */
        constructor();

        /** s2c_guild_donate_ret info. */
        public info?: (msg.guild_data|null);
    }

    /** Represents a c2s_guild_daily_reward. */
    class c2s_guild_daily_reward {

        /** Constructs a new c2s_guild_daily_reward. */
        constructor();
    }

    /** Represents a c2s_guild_get_charge_reward. */
    class c2s_guild_get_charge_reward {

        /** Constructs a new c2s_guild_get_charge_reward. */
        constructor();

        /** c2s_guild_get_charge_reward index. */
        public index: number;

        /** c2s_guild_get_charge_reward role_id. */
        public role_id: Long;
    }

    /** Represents a c2s_guild_charge_ui. */
    class c2s_guild_charge_ui {

        /** Constructs a new c2s_guild_charge_ui. */
        constructor();
    }

    /** Represents a s2c_guild_charge_ui_ret. */
    class s2c_guild_charge_ui_ret {

        /** Constructs a new s2c_guild_charge_ui_ret. */
        constructor();

        /** s2c_guild_charge_ui_ret info. */
        public info?: (msg.member_data|null);

        /** s2c_guild_charge_ui_ret list. */
        public list: msg.guild_reward[];

        /** s2c_guild_charge_ui_ret count. */
        public count: number;
    }

    /** Represents a s2c_guild_draw_info. */
    class s2c_guild_draw_info {

        /** Constructs a new s2c_guild_draw_info. */
        constructor();

        /** s2c_guild_draw_info info. */
        public info?: (msg.guild_draw_data|null);

        /** s2c_guild_draw_info list. */
        public list: number[];
    }

    /** Represents a c2s_guild_draw. */
    class c2s_guild_draw {

        /** Constructs a new c2s_guild_draw. */
        constructor();

        /** c2s_guild_draw type. */
        public type: number;

        /** c2s_guild_draw mod_type. */
        public mod_type: number;
    }

    /** Represents a c2s_guild_draw_reset. */
    class c2s_guild_draw_reset {

        /** Constructs a new c2s_guild_draw_reset. */
        constructor();
    }

    /** Represents a c2s_guild_draw_open. */
    class c2s_guild_draw_open {

        /** Constructs a new c2s_guild_draw_open. */
        constructor();
    }

    /** Represents a shengtai_data. */
    class shengtai_data {

        /** Constructs a new shengtai_data. */
        constructor();

        /** shengtai_data role_id. */
        public role_id: Long;

        /** shengtai_data index. */
        public index: number;

        /** shengtai_data name. */
        public name: string;

        /** shengtai_data time. */
        public time: number;

        /** shengtai_data type. */
        public type: number;
    }

    /** Represents a s2c_guild_shengtan_info. */
    class s2c_guild_shengtan_info {

        /** Constructs a new s2c_guild_shengtan_info. */
        constructor();

        /** s2c_guild_shengtan_info info. */
        public info?: (msg.guild_shengtan|null);

        /** s2c_guild_shengtan_info list. */
        public list: msg.shengtai_data[];
    }

    /** Represents a c2s_guild_shengtan_ui. */
    class c2s_guild_shengtan_ui {

        /** Constructs a new c2s_guild_shengtan_ui. */
        constructor();
    }

    /** Represents a s2c_guild_shengtan_ui_ret. */
    class s2c_guild_shengtan_ui_ret {

        /** Constructs a new s2c_guild_shengtan_ui_ret. */
        constructor();

        /** s2c_guild_shengtan_ui_ret draw_list. */
        public draw_list: msg.shengtai_data[];

        /** s2c_guild_shengtan_ui_ret item_list. */
        public item_list: msg.shengtai_data[];

        /** s2c_guild_shengtan_ui_ret trigger_list. */
        public trigger_list: msg.shengtai_data[];
    }

    /** Represents a c2s_guild_shengtan_score_reward. */
    class c2s_guild_shengtan_score_reward {

        /** Constructs a new c2s_guild_shengtan_score_reward. */
        constructor();

        /** c2s_guild_shengtan_score_reward index. */
        public index: number;
    }

    /** Represents a c2s_guild_mibao_ui. */
    class c2s_guild_mibao_ui {

        /** Constructs a new c2s_guild_mibao_ui. */
        constructor();
    }

    /** Represents a s2c_guild_mibao_ui_ret. */
    class s2c_guild_mibao_ui_ret {

        /** Constructs a new s2c_guild_mibao_ui_ret. */
        constructor();

        /** s2c_guild_mibao_ui_ret info. */
        public info?: (msg.member_data|null);

        /** s2c_guild_mibao_ui_ret list. */
        public list: number[];
    }

    /** Represents a c2s_guild_mibao_swap. */
    class c2s_guild_mibao_swap {

        /** Constructs a new c2s_guild_mibao_swap. */
        constructor();

        /** c2s_guild_mibao_swap index. */
        public index: number;

        /** c2s_guild_mibao_swap count. */
        public count: number;
    }

    /** 宗门-仙宗遗宝 */
    class c2s_guild_yibao_request {

        /** Constructs a new c2s_guild_yibao_request. */
        constructor();

        /** 1请求仙宗遗宝信息  2请求排行信息(params字段为1宗门排名 2个人排名)  3请求协助信息 */
        public oper_type: number;

        /** 可选参数 */
        public params: number;
    }

    /** Represents a c2s_guild_yibao_click. */
    class c2s_guild_yibao_click {

        /** Constructs a new c2s_guild_yibao_click. */
        constructor();

        /** 1单次挑战  2一键扫荡  3解锁宝箱  4开启宝箱   5邀请加速  6单个加速  7一键加速  8领取全民奖励 */
        public button_type: number;

        /** 可选参数(可用于标识操作哪个宝箱) */
        public params: number;

        /** 加速协助信息的标识id */
        public u_id: Long;
    }

    /** Represents a guild_yibao_box_struct. */
    class guild_yibao_box_struct {

        /** Constructs a new guild_yibao_box_struct. */
        constructor();

        /** boss索引(宝箱品质跟boss索引挂钩,怪物死亡的时候会掉落他们品质对应的宝箱) */
        public boss_index: number;

        /** 未解锁的时候为0；开启解锁之后，为解锁倒计时结束的时间戳 */
        public time: Long;

        /** guild_yibao_box_struct count. */
        public count: number;
    }

    /** Represents a guild_yibao_help_struct. */
    class guild_yibao_help_struct {

        /** Constructs a new guild_yibao_help_struct. */
        constructor();

        /** boss索引(宝箱品质跟boss索引挂钩,怪物死亡的时候会掉落他们品质对应的宝箱) */
        public boss_index: number;

        /** 请求加速玩家的名字 */
        public name: string;

        /** 玩家所在服务器 */
        public server_id: number;

        /** 宗门职位id */
        public guild_job: number;

        /** 协助信息的唯一标识id */
        public u_id: Long;
    }

    /** Represents a guild_yibao_task_struct. */
    class guild_yibao_task_struct {

        /** Constructs a new guild_yibao_task_struct. */
        constructor();

        /** 配置任务索引 */
        public task_index: number;

        /** 进度 */
        public step: number;
    }

    /** Represents a s2c_guild_yibao_base_info. */
    class s2c_guild_yibao_base_info {

        /** Constructs a new s2c_guild_yibao_base_info. */
        constructor();

        /** boss索引 */
        public boss_index: number;

        /** boss剩余数值血量 */
        public boss_hp: number;

        /** 宝箱列表（顺序） */
        public box_list: msg.guild_yibao_box_struct[];

        /** 任务进度列表 */
        public task_list: msg.guild_yibao_task_struct[];

        /** s2c_guild_yibao_base_info task_rewards_status. */
        public task_rewards_status: number;

        /** 挑战道具恢复时间戳（没有恢复倒计时则为0） */
        public recover_time: Long;
    }

    /** Represents a s2c_guild_yibao_help. */
    class s2c_guild_yibao_help {

        /** Constructs a new s2c_guild_yibao_help. */
        constructor();

        /** 请求协助加速的列表 */
        public request_help_list: msg.guild_yibao_help_struct[];
    }

    /** Represents a c2s_guild_zhanyaotai_request. */
    class c2s_guild_zhanyaotai_request {

        /** Constructs a new c2s_guild_zhanyaotai_request. */
        constructor();

        /** 1请求斩妖台信息  2请求排行信息(params字段为1宗门排名 2个人排名) */
        public oper_type: number;

        /** 可选参数 */
        public params: number;
    }

    /** Represents a c2s_guild_zhanyaotai_click. */
    class c2s_guild_zhanyaotai_click {

        /** Constructs a new c2s_guild_zhanyaotai_click. */
        constructor();

        /** 1召唤  2斩妖  3一键领取 */
        public button_type: number;

        /** 斩妖信息索引id(斩妖时需要传入该id) */
        public id: Long;

        /** 召唤传入需要召唤的bossindex */
        public boss_index: number;
    }

    /** 发送协助信息 */
    class c2s_guild_zhanyaotai_help_chat {

        /** Constructs a new c2s_guild_zhanyaotai_help_chat. */
        constructor();

        /** 斩妖信息索引id(斩妖时需要传入该id) */
        public id: Long;
    }

    /** Represents a guild_zhanyaotai_boss_struct. */
    class guild_zhanyaotai_boss_struct {

        /** Constructs a new guild_zhanyaotai_boss_struct. */
        constructor();

        /** boss索引 */
        public index: number;

        /** 唯一标识id */
        public id: Long;

        /** boss血量(boss血量为0表示,可以领取击杀奖励) */
        public boss_hp: number;

        /** 倒计时结束的时间戳 */
        public endtime: Long;

        /** 召唤者名字 */
        public name: string;
    }

    /** Represents a guild_zhanyaotai_zhaohuan_struct. */
    class guild_zhanyaotai_zhaohuan_struct {

        /** Constructs a new guild_zhanyaotai_zhaohuan_struct. */
        constructor();

        /** boss索引 */
        public index: number;

        /** 召唤了x次 */
        public count: number;
    }

    /** Represents a s2c_guild_zhanyaotai_info. */
    class s2c_guild_zhanyaotai_info {

        /** Constructs a new s2c_guild_zhanyaotai_info. */
        constructor();

        /** 各boss索引召唤次数数据 */
        public list: msg.guild_zhanyaotai_zhaohuan_struct[];

        /** 自己的召唤boss数据 */
        public my_boss_data?: (msg.guild_zhanyaotai_boss_struct|null);

        /** 可以斩妖以及领取奖励列表 */
        public boss_list: msg.guild_zhanyaotai_boss_struct[];

        /** 宗门内排名第一玩家 */
        public mvp?: (msg.teammate|null);
    }

    /** 遗宝 斩妖台  仙兽  仙宗封魔  使用该协议 */
    class s2c_guild_type_rank_list {

        /** Constructs a new s2c_guild_type_rank_list. */
        constructor();

        /** 排行类型 1宗门遗宝排行   2宗门斩妖台排行 3宗门仙兽排行 4仙宗封魔 */
        public rank_type: number;

        /** 可选参数    可以标识  1宗门排行   2个人排行 */
        public button_type: number;

        /** 榜单各方排行数据 */
        public all_ranks: msg.teammate[];

        /** s2c_guild_type_rank_list my_rank. */
        public my_rank?: (msg.teammate|null);

        /** 宗门排行所需 */
        public last_rank_num: number;

        /** 可领取奖励 */
        public props: msg.prop_tips_data[];
    }

    /** 请求领取上期排行奖励 */
    class c2s_guild_type_rank_rewards {

        /** Constructs a new c2s_guild_type_rank_rewards. */
        constructor();

        /** 排行类型 1宗门遗宝排行   2宗门斩妖台排行 3宗门仙兽排行 */
        public rank_type: number;
    }

    /** Represents a guild_ware_donate. */
    class guild_ware_donate {

        /** Constructs a new guild_ware_donate. */
        constructor();

        /** guild_ware_donate server_id. */
        public server_id: number;

        /** guild_ware_donate name. */
        public name: string;

        /** guild_ware_donate item_id. */
        public item_id: Long;

        /** guild_ware_donate time. */
        public time: number;
    }

    /** Represents a c2s_guild_ware_show. */
    class c2s_guild_ware_show {

        /** Constructs a new c2s_guild_ware_show. */
        constructor();
    }

    /** Represents a s2c_guild_ware_show. */
    class s2c_guild_ware_show {

        /** Constructs a new s2c_guild_ware_show. */
        constructor();

        /** s2c_guild_ware_show item_list. */
        public item_list: msg.prop_attributes[];

        /** s2c_guild_ware_show donate_logs. */
        public donate_logs: msg.guild_ware_donate[];

        /** s2c_guild_ware_show guild_score. */
        public guild_score: number;
    }

    /** Represents a c2s_guild_ware_oper. */
    class c2s_guild_ware_oper {

        /** Constructs a new c2s_guild_ware_oper. */
        constructor();

        /** c2s_guild_ware_oper type. */
        public type: number;

        /** c2s_guild_ware_oper props. */
        public props: Long[];
    }

    /** Represents a s2c_guild_ware_oper. */
    class s2c_guild_ware_oper {

        /** Constructs a new s2c_guild_ware_oper. */
        constructor();

        /** s2c_guild_ware_oper guild_score. */
        public guild_score: number;
    }

    /** Represents a c2s_guild_ware_exchange. */
    class c2s_guild_ware_exchange {

        /** Constructs a new c2s_guild_ware_exchange. */
        constructor();

        /** c2s_guild_ware_exchange prop_index. */
        public prop_index: Long;

        /** c2s_guild_ware_exchange count. */
        public count: number;
    }

    /** Represents a s2c_guild_ware_exchange. */
    class s2c_guild_ware_exchange {

        /** Constructs a new s2c_guild_ware_exchange. */
        constructor();

        /** s2c_guild_ware_exchange item. */
        public item?: (msg.prop_attributes|null);
    }

    /** Represents a c2s_guild_auction_show. */
    class c2s_guild_auction_show {

        /** Constructs a new c2s_guild_auction_show. */
        constructor();
    }

    /** Represents a guild_auction_data. */
    class guild_auction_data {

        /** Constructs a new guild_auction_data. */
        constructor();

        /** guild_auction_data id. */
        public id: Long;

        /** guild_auction_data item_id. */
        public item_id: Long;

        /** guild_auction_data time. */
        public time: number;

        /** guild_auction_data name. */
        public name: string;
    }

    /** Represents a s2c_guild_auction_show. */
    class s2c_guild_auction_show {

        /** Constructs a new s2c_guild_auction_show. */
        constructor();

        /** s2c_guild_auction_show list. */
        public list: msg.guild_auction_data[];
    }

    /** Represents a c2s_guild_auction_buy. */
    class c2s_guild_auction_buy {

        /** Constructs a new c2s_guild_auction_buy. */
        constructor();

        /** c2s_guild_auction_buy id. */
        public id: Long;
    }

    /** Represents a s2c_guild_auction_buy. */
    class s2c_guild_auction_buy {

        /** Constructs a new s2c_guild_auction_buy. */
        constructor();

        /** s2c_guild_auction_buy id. */
        public id: Long;
    }

    /** Represents a c2s_guild_baoku_show. */
    class c2s_guild_baoku_show {

        /** Constructs a new c2s_guild_baoku_show. */
        constructor();
    }

    /** Represents a s2c_guild_baoku_show. */
    class s2c_guild_baoku_show {

        /** Constructs a new s2c_guild_baoku_show. */
        constructor();

        /** s2c_guild_baoku_show list. */
        public list: msg.guild_draw[];
    }

    /** Represents a c2s_guild_baoku_buy. */
    class c2s_guild_baoku_buy {

        /** Constructs a new c2s_guild_baoku_buy. */
        constructor();

        /** c2s_guild_baoku_buy index. */
        public index: number;

        /** c2s_guild_baoku_buy count. */
        public count: number;
    }

    /** Represents a s2c_guild_baoku_buy. */
    class s2c_guild_baoku_buy {

        /** Constructs a new s2c_guild_baoku_buy. */
        constructor();

        /** s2c_guild_baoku_buy data. */
        public data?: (msg.guild_draw|null);
    }

    /** Represents a c2s_guild_exchange_item. */
    class c2s_guild_exchange_item {

        /** Constructs a new c2s_guild_exchange_item. */
        constructor();

        /** c2s_guild_exchange_item num. */
        public num: number;
    }

    /** Represents a s2c_guild_exchange_item. */
    class s2c_guild_exchange_item {

        /** Constructs a new s2c_guild_exchange_item. */
        constructor();

        /** s2c_guild_exchange_item count. */
        public count: number;
    }

    /** Represents a c2s_guild_study_show. */
    class c2s_guild_study_show {

        /** Constructs a new c2s_guild_study_show. */
        constructor();
    }

    /** Represents a guild_study_data. */
    class guild_study_data {

        /** Constructs a new guild_study_data. */
        constructor();

        /** guild_study_data index. */
        public index: number;

        /** guild_study_data stage. */
        public stage: number;

        /** guild_study_data level. */
        public level: number;

        /** guild_study_data attrs. */
        public attrs?: (msg.attributes|null);
    }

    /** Represents a s2c_guild_study_show. */
    class s2c_guild_study_show {

        /** Constructs a new s2c_guild_study_show. */
        constructor();

        /** s2c_guild_study_show list. */
        public list: msg.guild_study_data[];
    }

    /** Represents a c2s_guild_study_oper. */
    class c2s_guild_study_oper {

        /** Constructs a new c2s_guild_study_oper. */
        constructor();

        /** c2s_guild_study_oper index. */
        public index: number;
    }

    /** Represents a s2c_guild_study_oper. */
    class s2c_guild_study_oper {

        /** Constructs a new s2c_guild_study_oper. */
        constructor();

        /** s2c_guild_study_oper data. */
        public data?: (msg.guild_study_data|null);
    }

    /** Represents a c2s_guild_xianshou_show. */
    class c2s_guild_xianshou_show {

        /** Constructs a new c2s_guild_xianshou_show. */
        constructor();
    }

    /** Represents a s2c_guild_xianshou_show. */
    class s2c_guild_xianshou_show {

        /** Constructs a new s2c_guild_xianshou_show. */
        constructor();

        /** s2c_guild_xianshou_show stage. */
        public stage: number;

        /** s2c_guild_xianshou_show total_exp. */
        public total_exp: number;

        /** s2c_guild_xianshou_show week_rewards. */
        public week_rewards: number[];

        /** s2c_guild_xianshou_show base_attrs. */
        public base_attrs?: (msg.attributes|null);

        /** s2c_guild_xianshou_show extra_attrs. */
        public extra_attrs?: (msg.attributes|null);
    }

    /** Represents a c2s_guild_xianshou_up_level. */
    class c2s_guild_xianshou_up_level {

        /** Constructs a new c2s_guild_xianshou_up_level. */
        constructor();
    }

    /** Represents a s2c_guild_xianshou_update_exp. */
    class s2c_guild_xianshou_update_exp {

        /** Constructs a new s2c_guild_xianshou_update_exp. */
        constructor();

        /** s2c_guild_xianshou_update_exp stage. */
        public stage: number;

        /** s2c_guild_xianshou_update_exp total_exp. */
        public total_exp: number;

        /** s2c_guild_xianshou_update_exp base_attrs. */
        public base_attrs?: (msg.attributes|null);

        /** s2c_guild_xianshou_update_exp extra_attrs. */
        public extra_attrs?: (msg.attributes|null);
    }

    /** Represents a c2s_guild_xianshou_receive. */
    class c2s_guild_xianshou_receive {

        /** Constructs a new c2s_guild_xianshou_receive. */
        constructor();

        /** c2s_guild_xianshou_receive index. */
        public index: number;
    }

    /** Represents a s2c_guild_xianshou_receive. */
    class s2c_guild_xianshou_receive {

        /** Constructs a new s2c_guild_xianshou_receive. */
        constructor();

        /** s2c_guild_xianshou_receive week_rewards. */
        public week_rewards: number[];
    }

    /** Represents a c2s_guild_xianshou_rank_show. */
    class c2s_guild_xianshou_rank_show {

        /** Constructs a new c2s_guild_xianshou_rank_show. */
        constructor();

        /** c2s_guild_xianshou_rank_show type. */
        public type: number;
    }

    /** Represents a c2s_guild_chat_tips_text. */
    class c2s_guild_chat_tips_text {

        /** Constructs a new c2s_guild_chat_tips_text. */
        constructor();
    }

    /** Represents a s2c_guild_chat_tips_text. */
    class s2c_guild_chat_tips_text {

        /** Constructs a new s2c_guild_chat_tips_text. */
        constructor();

        /** s2c_guild_chat_tips_text oper. */
        public oper: number;

        /** s2c_guild_chat_tips_text list. */
        public list: string[];
    }

    /** 领取特权令奖励 */
    class c2s_prerogative_writ_get {

        /** Constructs a new c2s_prerogative_writ_get. */
        constructor();

        /** 1 玉清 2 上清 3 太清 */
        public type: number;
    }

    /** Represents a prerogative_writ_infos. */
    class prerogative_writ_infos {

        /** Constructs a new prerogative_writ_infos. */
        constructor();

        /** 1 玉清 2 上清 3 太清 */
        public type: number;

        /** 已领取天数 */
        public day: number;

        /** 领奖状态 1表示可领取 2 已领取 */
        public status: number;
    }

    /** 返回特权令信息 */
    class s2c_prerogative_writ_info {

        /** Constructs a new s2c_prerogative_writ_info. */
        constructor();

        /** 存在代表已购买 */
        public info: msg.prerogative_writ_infos[];
    }

    /** 精彩活动-仙女送礼////////////////////// */
    class c2s_xiannv_gift_get_rewards {

        /** Constructs a new c2s_xiannv_gift_get_rewards. */
        constructor();
    }

    /** Represents a s2c_xiannv_gift_info. */
    class s2c_xiannv_gift_info {

        /** Constructs a new s2c_xiannv_gift_info. */
        constructor();

        /** 领取状态  0未领取   1已领取 */
        public status: number;

        /** 开启时间戳 */
        public open_time: Long;
    }

    /** 精彩活动-藏珍阁////////////////////// */
    class c2s_jingcai_cangzhenge_open {

        /** Constructs a new c2s_jingcai_cangzhenge_open. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 宝箱索引 */
        public index: number;
    }

    /** Represents a cangzhenge_struct. */
    class cangzhenge_struct {

        /** Constructs a new cangzhenge_struct. */
        constructor();

        /** 宝箱索引 */
        public index: number;

        /** 0未开启   1已开启 */
        public status: number;
    }

    /** Represents a s2c_jingcai_cangzhenge_info. */
    class s2c_jingcai_cangzhenge_info {

        /** Constructs a new s2c_jingcai_cangzhenge_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** s2c_jingcai_cangzhenge_info box_list. */
        public box_list: msg.cangzhenge_struct[];

        /** 大奖状态 0未开启   1已开启 */
        public big_box_status: number;
    }

    /** Represents a keepcharge_struct. */
    class keepcharge_struct {

        /** Constructs a new keepcharge_struct. */
        constructor();

        /** 索引 */
        public index: number;

        /** 0未开启   1可领取   2已领取 */
        public status: number;
    }

    /** 精彩活动-连续充值////////////////////// */
    class c2s_jingcai_keepcharge_get_rewards {

        /** Constructs a new c2s_jingcai_keepcharge_get_rewards. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 索引 */
        public index: number;
    }

    /** Represents a keepcharge_data. */
    class keepcharge_data {

        /** Constructs a new keepcharge_data. */
        constructor();

        /** keepcharge_data list. */
        public list: msg.keepcharge_struct[];

        /** x元类型 */
        public type: number;

        /** 今日充值累计金额 */
        public num: Long;
    }

    /** Represents a s2c_jingcai_keepcharge_info. */
    class s2c_jingcai_keepcharge_info {

        /** Constructs a new s2c_jingcai_keepcharge_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 各类型数据 */
        public list: msg.keepcharge_data[];
    }

    /** 精彩活动-累计充值////////////////////// */
    class c2s_jingcai_addcharge_get_rewards {

        /** Constructs a new c2s_jingcai_addcharge_get_rewards. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 索引 */
        public index: number;
    }

    /** Represents a s2c_jingcai_addcharge_info. */
    class s2c_jingcai_addcharge_info {

        /** Constructs a new s2c_jingcai_addcharge_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** s2c_jingcai_addcharge_info list. */
        public list: msg.keepcharge_struct[];

        /** 充值累计金额 */
        public num: Long;
    }

    /** 精彩活动-登录活动////////////////////// */
    class c2s_jingcai_login_get_rewards {

        /** Constructs a new c2s_jingcai_login_get_rewards. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 索引 */
        public index: number;
    }

    /** Represents a s2c_jingcai_login_info. */
    class s2c_jingcai_login_info {

        /** Constructs a new s2c_jingcai_login_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** s2c_jingcai_login_info list. */
        public list: msg.keepcharge_struct[];

        /** 今日充值累计金额 */
        public num: Long;
    }

    /** 请求挑战对应BOSS */
    class c2s_yijie_boss_challenge {

        /** Constructs a new c2s_yijie_boss_challenge. */
        constructor();

        /** c2s_yijie_boss_challenge stage. */
        public stage: number;
    }

    /** Represents a yijie_boss_data. */
    class yijie_boss_data {

        /** Constructs a new yijie_boss_data. */
        constructor();

        /** yijie_boss_data stage. */
        public stage: number;

        /** 副本配置索引编号 */
        public index: number;

        /** boss血量(百分比) */
        public hp: number;

        /** boss复活时间戳 */
        public recover_time: Long;

        /** 归属者信息 */
        public owerinfo?: (msg.teammate|null);

        /** boss实体id */
        public entity_id: Long;
    }

    /** 场景内请求boss信息 */
    class c2s_yijie_boss_info {

        /** Constructs a new c2s_yijie_boss_info. */
        constructor();
    }

    /** 场景内请求boss信息返回结果 */
    class s2c_yijie_boss_info_ret {

        /** Constructs a new s2c_yijie_boss_info_ret. */
        constructor();

        /** s2c_yijie_boss_info_ret boss_list. */
        public boss_list: msg.yijie_boss_data[];
    }

    /** Represents a s2c_yijie_boss_hurt_rank. */
    class s2c_yijie_boss_hurt_rank {

        /** Constructs a new s2c_yijie_boss_hurt_rank. */
        constructor();

        /** boss实体id */
        public entity_id: Long;

        /** 伤害排名列表(已排序) */
        public hurtlist: msg.teammate[];

        /** 当前归属者 */
        public now_owner?: (msg.teammate|null);

        /** 我的信息 */
        public my_info?: (msg.teammate|null);
    }

    /** 更新场景个人数据 */
    class s2c_yijie_update_date {

        /** Constructs a new s2c_yijie_update_date. */
        constructor();

        /** s2c_yijie_update_date count. */
        public count: number;

        /** s2c_yijie_update_date member_num. */
        public member_num: number;

        /** s2c_yijie_update_date value. */
        public value: number;
    }

    /** 打开ui界面 */
    class c2s_yijie_open_ui {

        /** Constructs a new c2s_yijie_open_ui. */
        constructor();
    }

    /** 界面信息参数 */
    class yijie_ui_info {

        /** Constructs a new yijie_ui_info. */
        constructor();

        /** yijie_ui_info stage. */
        public stage: number;

        /** yijie_ui_info time. */
        public time: Long;
    }

    /** 打开ui界面返回结果 */
    class s2c_yijie_open_ui_ret {

        /** Constructs a new s2c_yijie_open_ui_ret. */
        constructor();

        /** s2c_yijie_open_ui_ret list. */
        public list: msg.yijie_ui_info[];

        /** s2c_yijie_open_ui_ret count. */
        public count: number;

        /** s2c_yijie_open_ui_ret state. */
        public state: boolean;
    }

    /** 是否勾选 */
    class c2s_yijie_sanbei {

        /** Constructs a new c2s_yijie_sanbei. */
        constructor();

        /** c2s_yijie_sanbei state. */
        public state: boolean;
    }

    /** 是否勾选返回 */
    class s2c_yijie_sanbei_ret {

        /** Constructs a new s2c_yijie_sanbei_ret. */
        constructor();

        /** s2c_yijie_sanbei_ret state. */
        public state: boolean;
    }

    /** 查看战利品 */
    class c2s_yijie_show_reward {

        /** Constructs a new c2s_yijie_show_reward. */
        constructor();
    }

    /** 查看战利品返回结果 */
    class s2c_yijie_show_reward_ret {

        /** Constructs a new s2c_yijie_show_reward_ret. */
        constructor();

        /** s2c_yijie_show_reward_ret props. */
        public props: msg.prop_tips_data[];
    }

    /** 稀有boss刷新，下发场景内所有玩家 */
    class s2c_yijie_rate_boss_update {

        /** Constructs a new s2c_yijie_rate_boss_update. */
        constructor();

        /** s2c_yijie_rate_boss_update stage. */
        public stage: number;

        /** 副本配置索引编号 */
        public index: number;

        /** boss实体id */
        public entity_id: Long;
    }

    /** 幸运大奖 */
    class s2c_yijie_boss_roll_point {

        /** Constructs a new s2c_yijie_boss_roll_point. */
        constructor();

        /** s2c_yijie_boss_roll_point stage. */
        public stage: number;

        /** 副本配置索引编号 */
        public index: number;

        /** 自己点数 */
        public my_roll_point: number;

        /** 玩家点数列表 */
        public point_list: msg.teammate[];
    }

    /** Represents a c2s_yuhuochongsheng_get_rewards. */
    class c2s_yuhuochongsheng_get_rewards {

        /** Constructs a new c2s_yuhuochongsheng_get_rewards. */
        constructor();

        /** 索引 */
        public index: number;
    }

    /** Represents a s2c_yuhuochongsheng_info. */
    class s2c_yuhuochongsheng_info {

        /** Constructs a new s2c_yuhuochongsheng_info. */
        constructor();

        /** 已领取列表 */
        public list: number[];

        /** 累计金额 */
        public num: number;

        /** 开服天数 */
        public open_day: number;
    }

    /** 请求挑战对应BOSS */
    class c2s_yongheng_boss_challenge {

        /** Constructs a new c2s_yongheng_boss_challenge. */
        constructor();

        /** c2s_yongheng_boss_challenge stage. */
        public stage: number;
    }

    /** Represents a yongheng_boss_data. */
    class yongheng_boss_data {

        /** Constructs a new yongheng_boss_data. */
        constructor();

        /** yongheng_boss_data stage. */
        public stage: number;

        /** 副本配置索引编号 */
        public index: number;

        /** boss血量(百分比) */
        public hp: number;

        /** boss复活时间戳 */
        public recover_time: Long;

        /** 归属者信息 */
        public owerinfo?: (msg.teammate|null);

        /** boss实体id */
        public entity_id: Long;
    }

    /** 场景内请求boss信息 */
    class c2s_yongheng_boss_info {

        /** Constructs a new c2s_yongheng_boss_info. */
        constructor();
    }

    /** 场景内请求boss信息返回结果 */
    class s2c_yongheng_boss_info_ret {

        /** Constructs a new s2c_yongheng_boss_info_ret. */
        constructor();

        /** s2c_yongheng_boss_info_ret boss_list. */
        public boss_list: msg.yongheng_boss_data[];
    }

    /** Represents a s2c_yongheng_boss_hurt_rank. */
    class s2c_yongheng_boss_hurt_rank {

        /** Constructs a new s2c_yongheng_boss_hurt_rank. */
        constructor();

        /** boss实体id */
        public entity_id: Long;

        /** 伤害排名列表(已排序) */
        public hurtlist: msg.teammate[];

        /** 当前归属者 */
        public now_owner?: (msg.teammate|null);

        /** 我的信息 */
        public my_info?: (msg.teammate|null);
    }

    /** 更新场景个人数据 */
    class s2c_yongheng_update_date {

        /** Constructs a new s2c_yongheng_update_date. */
        constructor();

        /** s2c_yongheng_update_date count. */
        public count: number;

        /** s2c_yongheng_update_date member_num. */
        public member_num: number;

        /** s2c_yongheng_update_date good_count. */
        public good_count: number;
    }

    /** 打开ui界面 */
    class c2s_yongheng_open_ui {

        /** Constructs a new c2s_yongheng_open_ui. */
        constructor();
    }

    /** 界面信息参数 */
    class yongheng_ui_info {

        /** Constructs a new yongheng_ui_info. */
        constructor();

        /** yongheng_ui_info stage. */
        public stage: number;

        /** yongheng_ui_info time. */
        public time: Long;
    }

    /** 打开ui界面返回结果 */
    class s2c_yongheng_open_ui_ret {

        /** Constructs a new s2c_yongheng_open_ui_ret. */
        constructor();

        /** s2c_yongheng_open_ui_ret list. */
        public list: msg.yongheng_ui_info[];

        /** s2c_yongheng_open_ui_ret count. */
        public count: number;

        /** s2c_yongheng_open_ui_ret good_count. */
        public good_count: number;
    }

    /** 查看战利品 */
    class c2s_yongheng_show_reward {

        /** Constructs a new c2s_yongheng_show_reward. */
        constructor();
    }

    /** 查看战利品返回结果 */
    class s2c_yongheng_show_reward_ret {

        /** Constructs a new s2c_yongheng_show_reward_ret. */
        constructor();

        /** s2c_yongheng_show_reward_ret props. */
        public props: msg.prop_tips_data[];
    }

    /** 放入封魂 */
    class c2s_consecrate_putin {

        /** Constructs a new c2s_consecrate_putin. */
        constructor();

        /** 放入封魂的道具表id */
        public prop_id: number[];
    }

    /** 取出封魂 */
    class c2s_consecrate_get_back {

        /** Constructs a new c2s_consecrate_get_back. */
        constructor();

        /** c2s_consecrate_get_back pos. */
        public pos: number;
    }

    /** 加速封魂 */
    class c2s_consecrate_speedup {

        /** Constructs a new c2s_consecrate_speedup. */
        constructor();

        /** 1为单个加速 2为全部加速 */
        public oper: number;

        /** oper为1时需要传位置 */
        public pos: number;
    }

    /** 领取宝箱 */
    class c2s_consecrate_get {

        /** Constructs a new c2s_consecrate_get. */
        constructor();

        /** 1为单个奖励 2为全部领取 */
        public oper: number;

        /** oper为1时需要传位置 */
        public pos: number;
    }

    /** 封魔珍宝 */
    class c2s_consecrate_draw {

        /** Constructs a new c2s_consecrate_draw. */
        constructor();
    }

    /** Represents a s2c_consecrate_draw. */
    class s2c_consecrate_draw {

        /** Constructs a new s2c_consecrate_draw. */
        constructor();

        /** 索引 */
        public index: number[];
    }

    /** Represents a consecrate_infos. */
    class consecrate_infos {

        /** Constructs a new consecrate_infos. */
        constructor();

        /** 道具表id */
        public prop_id: number;

        /** 位置 */
        public pos: number;

        /** 状态 0空 1封印中 2等待封印中 3 封印完毕 */
        public state: number;

        /** 封印开始时间戳 只有状态为1时才有这个字段 */
        public begin_time: number;
    }

    /** 打开界面 */
    class c2s_consecrate_info {

        /** Constructs a new c2s_consecrate_info. */
        constructor();
    }

    /** Represents a s2c_consecrate_info. */
    class s2c_consecrate_info {

        /** Constructs a new s2c_consecrate_info. */
        constructor();

        /** s2c_consecrate_info list. */
        public list: msg.consecrate_infos[];

        /** 封印存储时间 单位秒 */
        public storage_time: number;
    }

    /** Represents an amass_item. */
    class amass_item {

        /** Constructs a new amass_item. */
        constructor();

        /** amass_item index. */
        public index: number;

        /** amass_item star. */
        public star: number;
    }

    /** Represents a s2c_amass_info. */
    class s2c_amass_info {

        /** Constructs a new s2c_amass_info. */
        constructor();

        /** s2c_amass_info class_id. */
        public class_id: number;

        /** s2c_amass_info list. */
        public list: msg.amass_item[];
    }

    /** Represents a c2s_amass_advance. */
    class c2s_amass_advance {

        /** Constructs a new c2s_amass_advance. */
        constructor();

        /** c2s_amass_advance class_id. */
        public class_id: number;

        /** c2s_amass_advance type. */
        public type: number;

        /** c2s_amass_advance index. */
        public index: number;
    }

    /** 求婚 */
    class c2s_xianlv_propose {

        /** Constructs a new c2s_xianlv_propose. */
        constructor();

        /** c2s_xianlv_propose role_id. */
        public role_id: Long;

        /** 1强制 2普通 */
        public oper: number;

        /** 强制结婚对方的服务器Id */
        public server_id: number;
    }

    /** 邀请记录 */
    class c2s_xianlv_seeking_info {

        /** Constructs a new c2s_xianlv_seeking_info. */
        constructor();
    }

    /** 返回邀请记录 */
    class s2c_xianlv_seeking_info {

        /** Constructs a new s2c_xianlv_seeking_info. */
        constructor();

        /** s2c_xianlv_seeking_info infos. */
        public infos: msg.teammate[];
    }

    /** 是否同意 */
    class c2s_xianlv_seeking {

        /** Constructs a new c2s_xianlv_seeking. */
        constructor();

        /** c2s_xianlv_seeking role_id. */
        public role_id: Long;

        /** 1同意 2拒绝 */
        public oper: number;
    }

    /** 返回伴侣信息 */
    class s2c_xianlv_banlv_info {

        /** Constructs a new s2c_xianlv_banlv_info. */
        constructor();

        /** 伴侣信息 */
        public infos?: (msg.teammate|null);

        /** 同修天数 */
        public days: number;
    }

    /** 离婚 */
    class c2s_xianlv_lihun {

        /** Constructs a new c2s_xianlv_lihun. */
        constructor();
    }

    /** 抽奖 */
    class c2s_xianlv_choujiang {

        /** Constructs a new c2s_xianlv_choujiang. */
        constructor();

        /** 1 低级 2 高级 */
        public oper: number;
    }

    /** Represents a xianlv_child_infos. */
    class xianlv_child_infos {

        /** Constructs a new xianlv_child_infos. */
        constructor();

        /** 子女索引id */
        public child_index: number;

        /** 子女星级 */
        public star_lv: number;

        /** 当前星级属性 */
        public star_attr?: (msg.attributes|null);

        /** 被动技能索引 */
        public act_skill_index: number[];

        /** 装备index */
        public equip_list: number[];
    }

    /** 子女升星 */
    class c2s_xianlv_child_starup {

        /** Constructs a new c2s_xianlv_child_starup. */
        constructor();

        /** 子女索引id */
        public child_index: number;
    }

    /** 子女信息返回 */
    class s2c_xianlv_child_info {

        /** Constructs a new s2c_xianlv_child_info. */
        constructor();

        /** s2c_xianlv_child_info infos. */
        public infos: msg.xianlv_child_infos[];
    }

    /** 子女羁绊 */
    class c2s_child_oper_jiban {

        /** Constructs a new c2s_child_oper_jiban. */
        constructor();

        /** 羁绊编号 */
        public jiban_index: number;

        /** 子女id */
        public child_index: number;
    }

    /** Represents a child_jiban_infos. */
    class child_jiban_infos {

        /** Constructs a new child_jiban_infos. */
        constructor();

        /** 已激活子女索引id */
        public child_index: number[];

        /** 羁绊编号 */
        public jiban_index: number;

        /** 羁绊总属性 */
        public jiban_attr?: (msg.attributes|null);

        /** 羁绊激活， true false */
        public is_acted: boolean;
    }

    /** 子女羁绊返回 */
    class s2c_child_oper_jiban {

        /** Constructs a new s2c_child_oper_jiban. */
        constructor();

        /** s2c_child_oper_jiban infos. */
        public infos: msg.child_jiban_infos[];
    }

    /** 激活/升星 神兵 */
    class c2s_child_oper_shenbin {

        /** Constructs a new c2s_child_oper_shenbin. */
        constructor();

        /** 神兵类型 1 飞剑 2羽翼 */
        public shenbin_type: number;

        /** 神兵index */
        public shenbin_index: number;
    }

    /** Represents a child_shenbin_info. */
    class child_shenbin_info {

        /** Constructs a new child_shenbin_info. */
        constructor();

        /** 神兵类型 1 飞剑 2羽翼 */
        public shenbin_type: number;

        /** 神兵index */
        public shenbin_index: number;

        /** 神兵激活属性属性 */
        public shenbin_attr?: (msg.attributes|null);

        /** 神兵等级 */
        public shenbin_lv: number;
    }

    /** 子女神兵返回 */
    class s2c_child_shenbin_info {

        /** Constructs a new s2c_child_shenbin_info. */
        constructor();

        /** s2c_child_shenbin_info infos. */
        public infos: msg.child_shenbin_info[];
    }

    /** 子女共享技能激活 */
    class c2s_child_share_skill_act {

        /** Constructs a new c2s_child_share_skill_act. */
        constructor();

        /** c2s_child_share_skill_act skill_index. */
        public skill_index: number;
    }

    /** 子女装备神兵灵翼 */
    class c2s_child_equip {

        /** Constructs a new c2s_child_equip. */
        constructor();

        /** 子女索引id */
        public child_index: number;

        /** 一键装备，1就是一键，null就传下面两个数据 */
        public is_onekey: number;

        /** 神兵类型 1 飞剑 2羽翼 */
        public shenbin_type: number;

        /** 神兵index */
        public shenbin_index: number;
    }

    /** 子女上阵 */
    class c2s_child_into_battle {

        /** Constructs a new c2s_child_into_battle. */
        constructor();

        /** 子女索引id */
        public child_index: number;

        /** 位置 */
        public pos: number;
    }

    /** 子女共享返回 */
    class s2c_child_share_info {

        /** Constructs a new s2c_child_share_info. */
        constructor();

        /** 上阵的子女id */
        public child_list: number[];

        /** 激活的技能 */
        public skill_list: number[];
    }

    /** Represents a ring_struct. */
    class ring_struct {

        /** Constructs a new ring_struct. */
        constructor();

        /** 当前幻化 */
        public ring_index: number;

        /** 等级 */
        public level: number;

        /** 经验值 */
        public exp: number;

        /** 激活升级属性 */
        public attr?: (msg.attributes|null);
    }

    /** Represents a ring_item. */
    class ring_item {

        /** Constructs a new ring_item. */
        constructor();

        /** 幻化index */
        public ring_index: number;

        /** 星级 */
        public star: number;

        /** 当前幻化属性 */
        public attr?: (msg.attributes|null);
    }

    /** 升级 */
    class c2s_ring_uplv {

        /** Constructs a new c2s_ring_uplv. */
        constructor();

        /** 升级类型 1单点，2一键 */
        public type: number;
    }

    /** 升星 */
    class c2s_ring_upstar {

        /** Constructs a new c2s_ring_upstar. */
        constructor();

        /** c2s_ring_upstar index. */
        public index: number;
    }

    /** 幻化 */
    class c2s_ring_huanhua {

        /** Constructs a new c2s_ring_huanhua. */
        constructor();

        /** c2s_ring_huanhua index. */
        public index: number;
    }

    /** 领取激活礼包 */
    class c2s_ring_act_libao {

        /** Constructs a new c2s_ring_act_libao. */
        constructor();

        /** c2s_ring_act_libao index. */
        public index: number;
    }

    /** 领取2阶奖励 */
    class c2s_ring_get_reward {

        /** Constructs a new c2s_ring_get_reward. */
        constructor();
    }

    /** Represents a s2c_ring_info. */
    class s2c_ring_info {

        /** Constructs a new s2c_ring_info. */
        constructor();

        /** 婚戒 */
        public ring_struct?: (msg.ring_struct|null);

        /** 已幻化列表 */
        public ring_list: msg.ring_item[];

        /** 已领取激活礼包列表 */
        public ring_act_libao: number[];

        /** 是否领取2阶奖励 默认false */
        public is_get_class_reward: boolean;
    }

    /** Represents a c2s_xianlv_libao. */
    class c2s_xianlv_libao {

        /** Constructs a new c2s_xianlv_libao. */
        constructor();
    }

    /** Represents a s2c_xianlv_libao. */
    class s2c_xianlv_libao {

        /** Constructs a new s2c_xianlv_libao. */
        constructor();

        /** 已购买列表 1为仙玉 2 为直购 */
        public info: number[];
    }

    /** 请求主界面 */
    class c2s_xianlv_shilian_openui {

        /** Constructs a new c2s_xianlv_shilian_openui. */
        constructor();
    }

    /** 挑战副本 */
    class c2s_challenge_shilian {

        /** Constructs a new c2s_challenge_shilian. */
        constructor();

        /** 副本类型 */
        public type: number;
    }

    /** 副本扫荡 */
    class c2s_shilian_sweep {

        /** Constructs a new c2s_shilian_sweep. */
        constructor();

        /** 副本类型 */
        public type: number;

        /** 扫荡次数 */
        public cnt: number;
    }

    /** 领取类型奖励 */
    class c2s_shilian_get_reward {

        /** Constructs a new c2s_shilian_get_reward. */
        constructor();

        /** 副本类型 */
        public type: number;
    }

    /** Represents a shilian_info. */
    class shilian_info {

        /** Constructs a new shilian_info. */
        constructor();

        /** 副本类型 */
        public type: number;

        /** 当前层数 */
        public layer: number;

        /** 剩余血量百分比 */
        public left_hp: number;

        /** 当前层奖励领取状态 0不可领取 1可领取 2 已领取 */
        public status: number;

        /** 最高伤害记录 */
        public max_damage_record: number;
    }

    /** 试炼数据 */
    class s2c_shilian_info {

        /** Constructs a new s2c_shilian_info. */
        constructor();

        /** s2c_shilian_info list. */
        public list: msg.shilian_info[];

        /** 当前分数 */
        public score: number;
    }

    /** Represents a s2c_shilian_damage. */
    class s2c_shilian_damage {

        /** Constructs a new s2c_shilian_damage. */
        constructor();

        /** 伤害 */
        public damage: Long;
    }

    /** 排行榜请求 */
    class c2s_shilian_rank_info {

        /** Constructs a new c2s_shilian_rank_info. */
        constructor();
    }

    /** Represents a s2c_shilian_rank_info. */
    class s2c_shilian_rank_info {

        /** Constructs a new s2c_shilian_rank_info. */
        constructor();

        /** s2c_shilian_rank_info rank_info. */
        public rank_info: msg.marry_rank_info[];

        /** 我的分数 */
        public my_score: number;

        /** 我的排名 */
        public my_rank_no: number;

        /** s2c_shilian_rank_info rank_one_info. */
        public rank_one_info: msg.teammate[];
    }

    /** Represents a marry_rank_info. */
    class marry_rank_info {

        /** Constructs a new marry_rank_info. */
        constructor();

        /** 角色名称 */
        public role_name: string;

        /** 伴侣名称 */
        public role_name_2: string;

        /** marry_rank_info rank_no. */
        public rank_no: number;

        /** marry_rank_info score. */
        public score: number;
    }

    /** Represents a c2s_shilian_jifen_info. */
    class c2s_shilian_jifen_info {

        /** Constructs a new c2s_shilian_jifen_info. */
        constructor();
    }

    /** Represents a c2s_shilian_jifen_oper. */
    class c2s_shilian_jifen_oper {

        /** Constructs a new c2s_shilian_jifen_oper. */
        constructor();

        /** 奖励编号 */
        public index: number;
    }

    /** Represents a s2c_shilian_jifen_info. */
    class s2c_shilian_jifen_info {

        /** Constructs a new s2c_shilian_jifen_info. */
        constructor();

        /** s2c_shilian_jifen_info info. */
        public info: number[];
    }

    /** 天帝供奉 */
    class c2s_tiandi_gongfeng {

        /** Constructs a new c2s_tiandi_gongfeng. */
        constructor();

        /** 1:单次供奉，2:10次供奉(天帝一个个顺序解锁) */
        public button_type: number;
    }

    /** 天帝升级 */
    class c2s_tiandi_level_up {

        /** Constructs a new c2s_tiandi_level_up. */
        constructor();

        /** 1:单次升品，2:一键升品 */
        public button_type: number;

        /** 天帝类型 */
        public itype: number;
    }

    /** Represents a c2s_tiandi_get_level_rewards. */
    class c2s_tiandi_get_level_rewards {

        /** Constructs a new c2s_tiandi_get_level_rewards. */
        constructor();

        /** 天帝类型 */
        public itype: number;

        /** 配置表索引（第几个升品奖励） */
        public index: number;
    }

    /** Represents a tiandi_level_data. */
    class tiandi_level_data {

        /** Constructs a new tiandi_level_data. */
        constructor();

        /** 当前天帝等级 */
        public level: number;

        /** 当前等级已升级x次 */
        public exp: number;

        /** 天帝类型 */
        public itype: number;

        /** tiandi_level_data attrs. */
        public attrs?: (msg.attributes|null);

        /** 升品豪礼状态列表 */
        public rewards: msg.common_reward_status[];

        /** 十方化身 激活的天赋(里面的值为十方化身配置的索引而不是天赋技能id) */
        public indexs: number[];
    }

    /** Represents a s2c_tiandi_list. */
    class s2c_tiandi_list {

        /** Constructs a new s2c_tiandi_list. */
        constructor();

        /** 天帝列表 */
        public tian_di_list: msg.tiandi_level_data[];

        /** 当前供奉的天帝类型 */
        public now_itype: number;

        /** 当前供奉值 */
        public value: number;
    }

    /** 点击签到 */
    class c2s_tiandi_yuhuang_qiandao {

        /** Constructs a new c2s_tiandi_yuhuang_qiandao. */
        constructor();

        /** 发这个字段则表示领取签到次数vip额外奖励， 不发该字段则表示签到 */
        public index: number;
    }

    /** Represents a s2c_tiandi_yuhuang_qiandao. */
    class s2c_tiandi_yuhuang_qiandao {

        /** Constructs a new s2c_tiandi_yuhuang_qiandao. */
        constructor();

        /** 已签到几次 */
        public num: number;

        /** 今天是否签到 0未签到   1已签到 */
        public is_sign: number;

        /** vip额外奖励领取状态(结构里面的index为签到次数) */
        public rewards: msg.common_reward_status[];
    }

    /** 请求确认激活图鉴(前端播完战斗动画再请求该协议) */
    class c2s_tiandi_fengdu_baiguilu {

        /** Constructs a new c2s_tiandi_fengdu_baiguilu. */
        constructor();

        /** 请求激活的图鉴index */
        public index: number;
    }

    /** Represents a s2c_tiandi_fengdu_baiguilu. */
    class s2c_tiandi_fengdu_baiguilu {

        /** Constructs a new s2c_tiandi_fengdu_baiguilu. */
        constructor();

        /** 已激活的图鉴 */
        public ids: number[];
    }

    /** 八部天龙 一键升级 */
    class c2s_tiandi_tianlong_level_up {

        /** Constructs a new c2s_tiandi_tianlong_level_up. */
        constructor();

        /** 图鉴类型 */
        public itype: number;

        /** 1为激活   2为一键进阶 */
        public button_type: number;
    }

    /** 八部天龙列表 */
    class s2c_tiandi_tianlong_list {

        /** Constructs a new s2c_tiandi_tianlong_list. */
        constructor();

        /** 图鉴列表 */
        public tianlong_list: msg.tiandi_level_data[];
    }

    /** 十方化身 一键升级 */
    class c2s_tiandi_shifang_level_up {

        /** Constructs a new c2s_tiandi_shifang_level_up. */
        constructor();

        /** 单位类型 */
        public itype: number;

        /** 1为激活   2为一键进阶 */
        public button_type: number;
    }

    /** Represents a c2s_tiandi_shifang_skill_active. */
    class c2s_tiandi_shifang_skill_active {

        /** Constructs a new c2s_tiandi_shifang_skill_active. */
        constructor();

        /** 单位类型 */
        public itype: number;

        /** 第几个被动技能(配置表顺序索引) */
        public index: number;
    }

    /** 十方化身列表 */
    class s2c_tiandi_shifang_list {

        /** Constructs a new s2c_tiandi_shifang_list. */
        constructor();

        /** 单位列表 */
        public shifang_list: msg.tiandi_level_data[];
    }

    /** Represents a tiandi_youli_data. */
    class tiandi_youli_data {

        /** Constructs a new tiandi_youli_data. */
        constructor();

        /** 所需派遣的地图索引(十方游历的配置地图索引) */
        public map_type: number;

        /** 十方化身的单位索引 */
        public index: number;
    }

    /** 十方游历 派遣 */
    class c2s_tiandi_youli_paiqian {

        /** Constructs a new c2s_tiandi_youli_paiqian. */
        constructor();

        /** 请求派遣的列表 */
        public request_list: msg.tiandi_youli_data[];
    }

    /** 游历奖励 */
    class tiandi_youli_paiqian_struct {

        /** Constructs a new tiandi_youli_paiqian_struct. */
        constructor();

        /** 所需派遣的地图索引(十方游历的配置地图索引) */
        public map_type: number;

        /** 十方化身的单位索引 */
        public index: number;

        /** 本次派遣完成的时间戳 */
        public endtime: number;
    }

    /** 领取游历奖励 */
    class c2s_tiandi_youli_get_rewards {

        /** Constructs a new c2s_tiandi_youli_get_rewards. */
        constructor();

        /** 所需派遣的地图索引(十方游历的配置地图索引) */
        public map_type: number;
    }

    /** Represents a s2c_tiandi_youli_paiqian_list. */
    class s2c_tiandi_youli_paiqian_list {

        /** Constructs a new s2c_tiandi_youli_paiqian_list. */
        constructor();

        /** 派遣列表 */
        public list: msg.tiandi_youli_paiqian_struct[];
    }

    /** 一键开启 */
    class c2s_baozangbox_onekey_open {

        /** Constructs a new c2s_baozangbox_onekey_open. */
        constructor();

        /** 带该字段表示只开启该宝箱   不带该字段表示开启全部宝箱 */
        public box_index: number;
    }

    /** Represents a chengshen_reward. */
    class chengshen_reward {

        /** Constructs a new chengshen_reward. */
        constructor();

        /** chengshen_reward type. */
        public type: number;

        /** chengshen_reward state. */
        public state: number;
    }

    /** Represents a s2c_chengshen_update_data. */
    class s2c_chengshen_update_data {

        /** Constructs a new s2c_chengshen_update_data. */
        constructor();

        /** s2c_chengshen_update_data list. */
        public list: msg.chengshen_reward[];
    }

    /** Represents a c2s_chengshen_get_reward. */
    class c2s_chengshen_get_reward {

        /** Constructs a new c2s_chengshen_get_reward. */
        constructor();

        /** c2s_chengshen_get_reward type. */
        public type: number;
    }

    /** 点击抽奖 */
    class c2s_luckbless_button_click {

        /** Constructs a new c2s_luckbless_button_click. */
        constructor();

        /** 1为单抽   2为10连 */
        public button_type: number;
    }

    /** 鸿运祈福抽奖信息 */
    class s2c_luckbless_info {

        /** Constructs a new s2c_luckbless_info. */
        constructor();

        /** 已抽奖次数 */
        public count: number;
    }

    /** Represents a daily_tehui_reward. */
    class daily_tehui_reward {

        /** Constructs a new daily_tehui_reward. */
        constructor();

        /** daily_tehui_reward index. */
        public index: number;

        /** daily_tehui_reward state. */
        public state: number;
    }

    /** Represents a s2c_daily_tehui_all_info. */
    class s2c_daily_tehui_all_info {

        /** Constructs a new s2c_daily_tehui_all_info. */
        constructor();

        /** s2c_daily_tehui_all_info day. */
        public day: number;

        /** s2c_daily_tehui_all_info list. */
        public list: msg.daily_tehui_reward[];
    }

    /** Represents a c2s_daily_tehui_get_reward. */
    class c2s_daily_tehui_get_reward {

        /** Constructs a new c2s_daily_tehui_get_reward. */
        constructor();

        /** c2s_daily_tehui_get_reward index. */
        public index: number;
    }

    /** 成就////////////////////// */
    class s2c_achievement_info {

        /** Constructs a new s2c_achievement_info. */
        constructor();

        /** 阶数 */
        public level: number;

        /** 大奖状态(该阶)大奖已领取状态，只下发2 */
        public status: number;
    }

    /** Represents a c2s_achievement_get_big_rewards. */
    class c2s_achievement_get_big_rewards {

        /** Constructs a new c2s_achievement_get_big_rewards. */
        constructor();
    }

    /** Represents a c2s_attic_storey_show. */
    class c2s_attic_storey_show {

        /** Constructs a new c2s_attic_storey_show. */
        constructor();

        /** c2s_attic_storey_show act_id. */
        public act_id: number;

        /** c2s_attic_storey_show start_num. */
        public start_num: number;

        /** c2s_attic_storey_show end_num. */
        public end_num: number;

        /** c2s_attic_storey_show type. */
        public type: number;
    }

    /** Represents a s2c_attic_storey_show. */
    class s2c_attic_storey_show {

        /** Constructs a new s2c_attic_storey_show. */
        constructor();

        /** s2c_attic_storey_show first_data. */
        public first_data?: (msg.teammate|null);

        /** s2c_attic_storey_show role_list. */
        public role_list: msg.teammate[];
    }

    /** Represents a c2s_attic_rank_show. */
    class c2s_attic_rank_show {

        /** Constructs a new c2s_attic_rank_show. */
        constructor();

        /** c2s_attic_rank_show act_id. */
        public act_id: number;

        /** c2s_attic_rank_show type. */
        public type: number;

        /** c2s_attic_rank_show start_num. */
        public start_num: number;

        /** c2s_attic_rank_show end_num. */
        public end_num: number;
    }

    /** Represents a s2c_attic_rank_show. */
    class s2c_attic_rank_show {

        /** Constructs a new s2c_attic_rank_show. */
        constructor();

        /** s2c_attic_rank_show rank_no. */
        public rank_no: number;

        /** s2c_attic_rank_show my_value. */
        public my_value: number;

        /** s2c_attic_rank_show role_list. */
        public role_list: msg.teammate[];

        /** s2c_attic_rank_show guild_list. */
        public guild_list: msg.teammate[];
    }

    /** Represents a c2s_attic_done_rank_show. */
    class c2s_attic_done_rank_show {

        /** Constructs a new c2s_attic_done_rank_show. */
        constructor();

        /** c2s_attic_done_rank_show act_id. */
        public act_id: number;

        /** c2s_attic_done_rank_show type. */
        public type: number;

        /** c2s_attic_done_rank_show start_num. */
        public start_num: number;

        /** c2s_attic_done_rank_show end_num. */
        public end_num: number;
    }

    /** Represents a s2c_attic_done_rank_show. */
    class s2c_attic_done_rank_show {

        /** Constructs a new s2c_attic_done_rank_show. */
        constructor();

        /** s2c_attic_done_rank_show rank_no. */
        public rank_no: number;

        /** s2c_attic_done_rank_show my_value. */
        public my_value: number;

        /** s2c_attic_done_rank_show role_list. */
        public role_list: msg.teammate[];

        /** s2c_attic_done_rank_show guild_list. */
        public guild_list: msg.teammate[];
    }

    /** Represents a c2s_attic_build. */
    class c2s_attic_build {

        /** Constructs a new c2s_attic_build. */
        constructor();

        /** c2s_attic_build act_id. */
        public act_id: number;

        /** c2s_attic_build type. */
        public type: number;
    }

    /** Represents a s2c_attic_build. */
    class s2c_attic_build {

        /** Constructs a new s2c_attic_build. */
        constructor();

        /** s2c_attic_build num. */
        public num: number;

        /** s2c_attic_build role_list. */
        public role_list: msg.teammate[];
    }

    /** Represents an attic_challenge_data. */
    class attic_challenge_data {

        /** Constructs a new attic_challenge_data. */
        constructor();

        /** attic_challenge_data index. */
        public index: number;

        /** attic_challenge_data type. */
        public type: number;

        /** attic_challenge_data status. */
        public status: number;
    }

    /** Represents an attic_reward_stage_data. */
    class attic_reward_stage_data {

        /** Constructs a new attic_reward_stage_data. */
        constructor();

        /** attic_reward_stage_data stage. */
        public stage: number;

        /** attic_reward_stage_data num. */
        public num: number;

        /** attic_reward_stage_data status. */
        public status: number;

        /** attic_reward_stage_data is_finish. */
        public is_finish: boolean;
    }

    /** Represents an attic_exchange_data. */
    class attic_exchange_data {

        /** Constructs a new attic_exchange_data. */
        constructor();

        /** attic_exchange_data index. */
        public index: number;

        /** attic_exchange_data list. */
        public list: number[];
    }

    /** Represents an attic_Login_reward. */
    class attic_Login_reward {

        /** Constructs a new attic_Login_reward. */
        constructor();

        /** attic_Login_reward index. */
        public index: number;

        /** attic_Login_reward status. */
        public status: number;
    }

    /** Represents an attic_gift_data. */
    class attic_gift_data {

        /** Constructs a new attic_gift_data. */
        constructor();

        /** attic_gift_data index. */
        public index: number;

        /** attic_gift_data count. */
        public count: number;
    }

    /** Represents a s2c_attic_role_info. */
    class s2c_attic_role_info {

        /** Constructs a new s2c_attic_role_info. */
        constructor();

        /** s2c_attic_role_info num. */
        public num: number;

        /** s2c_attic_role_info role_challenge_list. */
        public role_challenge_list: msg.attic_challenge_data[];

        /** s2c_attic_role_info guild_challenge_list. */
        public guild_challenge_list: msg.attic_challenge_data[];

        /** s2c_attic_role_info stage_list. */
        public stage_list: msg.attic_reward_stage_data[];

        /** s2c_attic_role_info exchange_list. */
        public exchange_list: msg.attic_exchange_data[];

        /** s2c_attic_role_info login_reward_list. */
        public login_reward_list: msg.attic_Login_reward[];

        /** s2c_attic_role_info gift_list. */
        public gift_list: msg.attic_gift_data[];
    }

    /** Represents a s2c_update_attic_challenge_data. */
    class s2c_update_attic_challenge_data {

        /** Constructs a new s2c_update_attic_challenge_data. */
        constructor();

        /** s2c_update_attic_challenge_data challenge_list. */
        public challenge_list: msg.attic_challenge_data[];

        /** s2c_update_attic_challenge_data stage_list. */
        public stage_list: msg.attic_reward_stage_data[];
    }

    /** Represents a c2s_attic_guild_challenge_show. */
    class c2s_attic_guild_challenge_show {

        /** Constructs a new c2s_attic_guild_challenge_show. */
        constructor();
    }

    /** Represents a s2c_attic_guild_challenge_show. */
    class s2c_attic_guild_challenge_show {

        /** Constructs a new s2c_attic_guild_challenge_show. */
        constructor();

        /** s2c_attic_guild_challenge_show num. */
        public num: number;

        /** s2c_attic_guild_challenge_show challenge_list. */
        public challenge_list: msg.attic_challenge_data[];
    }

    /** Represents a c2s_attic_exchange. */
    class c2s_attic_exchange {

        /** Constructs a new c2s_attic_exchange. */
        constructor();

        /** c2s_attic_exchange index. */
        public index: number;

        /** c2s_attic_exchange place. */
        public place: number;
    }

    /** Represents a s2c_attic_exchange. */
    class s2c_attic_exchange {

        /** Constructs a new s2c_attic_exchange. */
        constructor();

        /** s2c_attic_exchange list. */
        public list: msg.attic_exchange_data[];
    }

    /** Represents a s2c_update_attic_login_reward. */
    class s2c_update_attic_login_reward {

        /** Constructs a new s2c_update_attic_login_reward. */
        constructor();

        /** s2c_update_attic_login_reward list. */
        public list: msg.attic_Login_reward[];
    }

    /** Represents a c2s_attic_get_reward. */
    class c2s_attic_get_reward {

        /** Constructs a new c2s_attic_get_reward. */
        constructor();

        /** c2s_attic_get_reward type. */
        public type: number;

        /** c2s_attic_get_reward index. */
        public index: number;
    }

    /** Represents a c2s_attic_item_buy_gift. */
    class c2s_attic_item_buy_gift {

        /** Constructs a new c2s_attic_item_buy_gift. */
        constructor();

        /** c2s_attic_item_buy_gift index. */
        public index: number;
    }

    /** Represents a s2c_attic_item_buy_gift. */
    class s2c_attic_item_buy_gift {

        /** Constructs a new s2c_attic_item_buy_gift. */
        constructor();

        /** s2c_attic_item_buy_gift data. */
        public data?: (msg.attic_gift_data|null);
    }

    /** Represents a c2s_fly_sword_operation. */
    class c2s_fly_sword_operation {

        /** Constructs a new c2s_fly_sword_operation. */
        constructor();

        /** c2s_fly_sword_operation index. */
        public index: number;

        /** c2s_fly_sword_operation op. */
        public op: number;

        /** c2s_fly_sword_operation param. */
        public param: number;
    }

    /** Represents a fly_sword_buwei_info. */
    class fly_sword_buwei_info {

        /** Constructs a new fly_sword_buwei_info. */
        constructor();

        /** fly_sword_buwei_info index. */
        public index: number;

        /** fly_sword_buwei_info level. */
        public level: number;

        /** fly_sword_buwei_info attr. */
        public attr?: (msg.attributes|null);
    }

    /** Represents a fly_sword_skill_info. */
    class fly_sword_skill_info {

        /** Constructs a new fly_sword_skill_info. */
        constructor();

        /** fly_sword_skill_info index. */
        public index: number;

        /** fly_sword_skill_info level. */
        public level: number;
    }

    /** Represents a fly_sword_info. */
    class fly_sword_info {

        /** Constructs a new fly_sword_info. */
        constructor();

        /** fly_sword_info index. */
        public index: number;

        /** fly_sword_info level. */
        public level: number;

        /** fly_sword_info exp. */
        public exp: number;

        /** fly_sword_info skill_index. */
        public skill_index: msg.fly_sword_skill_info[];

        /** fly_sword_info buwei_info. */
        public buwei_info: msg.fly_sword_buwei_info[];

        /** fly_sword_info all_attr. */
        public all_attr?: (msg.attributes|null);

        /** fly_sword_info active_skill_level. */
        public active_skill_level: number;

        /** fly_sword_info star. */
        public star: number;
    }

    /** Represents a s2c_fly_sword_info. */
    class s2c_fly_sword_info {

        /** Constructs a new s2c_fly_sword_info. */
        constructor();

        /** s2c_fly_sword_info info. */
        public info: msg.fly_sword_info[];

        /** 羁绊列表 */
        public jiban_list: msg.jiban_item[];
    }

    /** Represents a c2s_fly_sword_into_battle. */
    class c2s_fly_sword_into_battle {

        /** Constructs a new c2s_fly_sword_into_battle. */
        constructor();

        /** c2s_fly_sword_into_battle pos. */
        public pos: number;

        /** c2s_fly_sword_into_battle index. */
        public index: number;
    }

    /** Represents a fly_sword_battle_pos_info. */
    class fly_sword_battle_pos_info {

        /** Constructs a new fly_sword_battle_pos_info. */
        constructor();

        /** fly_sword_battle_pos_info pos. */
        public pos: number;

        /** fly_sword_battle_pos_info index. */
        public index: number;
    }

    /** Represents a s2c_fly_sword_battle_pos. */
    class s2c_fly_sword_battle_pos {

        /** Constructs a new s2c_fly_sword_battle_pos. */
        constructor();

        /** s2c_fly_sword_battle_pos info. */
        public info: msg.fly_sword_battle_pos_info[];
    }

    /** 首次获得14511类型道具, 判断数量足够,发该协议给前端,数据为道具的params */
    class s2c_first_get_prop_check_use {

        /** Constructs a new s2c_first_get_prop_check_use. */
        constructor();

        /** s2c_first_get_prop_check_use ids. */
        public ids: Long[];
    }

    /** Represents a chonglist_revelry_data. */
    class chonglist_revelry_data {

        /** Constructs a new chonglist_revelry_data. */
        constructor();

        /** chonglist_revelry_data index. */
        public index: number;

        /** chonglist_revelry_data status. */
        public status: number;
    }

    /** Represents a chonglist_gift_data. */
    class chonglist_gift_data {

        /** Constructs a new chonglist_gift_data. */
        constructor();

        /** chonglist_gift_data index. */
        public index: number;

        /** chonglist_gift_data count. */
        public count: number;
    }

    /** Represents a s2c_chonglist_base_info. */
    class s2c_chonglist_base_info {

        /** Constructs a new s2c_chonglist_base_info. */
        constructor();

        /** s2c_chonglist_base_info type. */
        public type: number;

        /** s2c_chonglist_base_info score. */
        public score: number;

        /** s2c_chonglist_base_info revelry_list. */
        public revelry_list: msg.chonglist_revelry_data[];

        /** s2c_chonglist_base_info gift_list. */
        public gift_list: msg.chonglist_gift_data[];
    }

    /** Represents a c2s_chonglist_receive_reward. */
    class c2s_chonglist_receive_reward {

        /** Constructs a new c2s_chonglist_receive_reward. */
        constructor();

        /** c2s_chonglist_receive_reward type. */
        public type: number;

        /** c2s_chonglist_receive_reward index. */
        public index: number;
    }

    /** Represents a s2c_chonglist_receive_reward. */
    class s2c_chonglist_receive_reward {

        /** Constructs a new s2c_chonglist_receive_reward. */
        constructor();

        /** s2c_chonglist_receive_reward type. */
        public type: number;

        /** s2c_chonglist_receive_reward data. */
        public data?: (msg.chonglist_revelry_data|null);
    }

    /** Represents a s2c_update_chonglist_revelry_data. */
    class s2c_update_chonglist_revelry_data {

        /** Constructs a new s2c_update_chonglist_revelry_data. */
        constructor();

        /** s2c_update_chonglist_revelry_data type. */
        public type: number;

        /** s2c_update_chonglist_revelry_data score. */
        public score: number;

        /** s2c_update_chonglist_revelry_data data. */
        public data?: (msg.chonglist_revelry_data|null);
    }

    /** Represents a c2s_chonglist_item_buy_gift. */
    class c2s_chonglist_item_buy_gift {

        /** Constructs a new c2s_chonglist_item_buy_gift. */
        constructor();

        /** c2s_chonglist_item_buy_gift type. */
        public type: number;

        /** c2s_chonglist_item_buy_gift index. */
        public index: number;
    }

    /** Represents a s2c_chonglist_item_buy_gift. */
    class s2c_chonglist_item_buy_gift {

        /** Constructs a new s2c_chonglist_item_buy_gift. */
        constructor();

        /** s2c_chonglist_item_buy_gift type. */
        public type: number;

        /** s2c_chonglist_item_buy_gift data. */
        public data?: (msg.chonglist_gift_data|null);
    }

    /** 荒古start//////////////////// */
    class c2s_huanggu_shenqi_oper {

        /** Constructs a new c2s_huanggu_shenqi_oper. */
        constructor();

        /** c2s_huanggu_shenqi_oper oper_type. */
        public oper_type: number;

        /** c2s_huanggu_shenqi_oper index. */
        public index: number;

        /** c2s_huanggu_shenqi_oper pos. */
        public pos: number;
    }

    /** Represents a huanggu_shenqi_pos_info. */
    class huanggu_shenqi_pos_info {

        /** Constructs a new huanggu_shenqi_pos_info. */
        constructor();

        /** huanggu_shenqi_pos_info pos. */
        public pos: number;

        /** huanggu_shenqi_pos_info level. */
        public level: number;

        /** huanggu_shenqi_pos_info attr. */
        public attr?: (msg.attributes|null);
    }

    /** Represents a huanggu_shenqi_skill_info. */
    class huanggu_shenqi_skill_info {

        /** Constructs a new huanggu_shenqi_skill_info. */
        constructor();

        /** huanggu_shenqi_skill_info index. */
        public index: number;

        /** huanggu_shenqi_skill_info level. */
        public level: number;
    }

    /** Represents a huanggu_shenqi_info. */
    class huanggu_shenqi_info {

        /** Constructs a new huanggu_shenqi_info. */
        constructor();

        /** huanggu_shenqi_info index. */
        public index: number;

        /** huanggu_shenqi_info level. */
        public level: number;

        /** huanggu_shenqi_info pos_info. */
        public pos_info: msg.huanggu_shenqi_pos_info[];

        /** huanggu_shenqi_info skill_info. */
        public skill_info: msg.huanggu_shenqi_skill_info[];

        /** huanggu_shenqi_info attr. */
        public attr?: (msg.attributes|null);
    }

    /** Represents a s2c_huanggu_shenqi_info. */
    class s2c_huanggu_shenqi_info {

        /** Constructs a new s2c_huanggu_shenqi_info. */
        constructor();

        /** s2c_huanggu_shenqi_info info. */
        public info: msg.huanggu_shenqi_info[];
    }

    /** 请求领取返利奖励 */
    class c2s_activity_feishen_score_get_rewards {

        /** Constructs a new c2s_activity_feishen_score_get_rewards. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 领取index */
        public index: number;
    }

    /** 飞升返利 */
    class s2c_activity_feishen_score_rewards_info {

        /** Constructs a new s2c_activity_feishen_score_rewards_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 当前拥有的飞升积分（飞升返利） */
        public score: Long;

        /** 当前已经领取的index索引（飞升返利） */
        public indexs: number[];

        /** 轮次 */
        public loop_num: number;
    }

    /** 一键领取战令奖励 */
    class c2s_activity_feishen_gameorder_get_rewards {

        /** Constructs a new c2s_activity_feishen_gameorder_get_rewards. */
        constructor();

        /** 活动id */
        public act_id: number;
    }

    /** 飞升战令（飞升经验为投放的货币，飞升战令关闭活动时，需要清除货币） */
    class s2c_activity_feishen_gameorder_info {

        /** Constructs a new s2c_activity_feishen_gameorder_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 战令普通奖励已领取最高索引（飞升战令） */
        public index1: number;

        /** 战令充值奖励已领取的最高索引（飞升战令） */
        public index2: number;

        /** 是否购买战令 0未购买   1已购买（飞升战令） */
        public is_buy: number;
    }

    /** 飞升礼包 */
    class activity_feishen_gift_struct {

        /** Constructs a new activity_feishen_gift_struct. */
        constructor();

        /** 礼包索引 */
        public index: number;

        /** 已购买次数 */
        public num: number;
    }

    /** Represents a s2c_activity_feishen_gift_info. */
    class s2c_activity_feishen_gift_info {

        /** Constructs a new s2c_activity_feishen_gift_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 购买列表 */
        public list: msg.activity_feishen_gift_struct[];
    }

    /** 消耗货币，购买礼包 */
    class c2s_activity_feishen_gift_info {

        /** Constructs a new c2s_activity_feishen_gift_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 购买第几个礼包（消耗货币）（充值礼包走充值协议） */
        public index: number;
    }

    /** 排行信息(活动的开启关闭时间用中控活动协议推送的) */
    class s2c_activity_feishen_send_rank_info {

        /** Constructs a new s2c_activity_feishen_send_rank_info. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 玩家排行 字段value:积分  rank_num为排名（第一名有外观相关字段，其他名次没有） */
        public rank_list: msg.teammate[];

        /** 玩家自己数据 字段value:积分  rank_num为排名 */
        public my_data?: (msg.teammate|null);

        /** 1未领取   2已领取 */
        public reward_status: number;

        /** 1为当前排行  2为上期排行 */
        public type: number;
    }

    /** Represents a yishou_equip_data. */
    class yishou_equip_data {

        /** Constructs a new yishou_equip_data. */
        constructor();

        /** yishou_equip_data type. */
        public type: number;

        /** 装备 */
        public equips: msg.prop_attributes[];
    }

    /** Represents a yishou_base_data. */
    class yishou_base_data {

        /** Constructs a new yishou_base_data. */
        constructor();

        /** yishou_base_data type. */
        public type: number;

        /** yishou_base_data stage. */
        public stage: number;

        /** yishou_base_data level. */
        public level: number;

        /** yishou_base_data exp. */
        public exp: number;

        /** yishou_base_data skill_list. */
        public skill_list: number[];

        /** yishou_base_data attrs. */
        public attrs?: (msg.attributes|null);
    }

    /** Represents a yishou_shouling_data. */
    class yishou_shouling_data {

        /** Constructs a new yishou_shouling_data. */
        constructor();

        /** yishou_shouling_data index. */
        public index: Long;

        /** yishou_shouling_data star. */
        public star: number;
    }

    /** Represents a yishou_shouling_group_data. */
    class yishou_shouling_group_data {

        /** Constructs a new yishou_shouling_group_data. */
        constructor();

        /** yishou_shouling_group_data group_id. */
        public group_id: number;

        /** yishou_shouling_group_data is_active. */
        public is_active: boolean;

        /** yishou_shouling_group_data list. */
        public list: msg.yishou_shouling_data[];
    }

    /** Represents a yishou_shouying_data. */
    class yishou_shouying_data {

        /** Constructs a new yishou_shouying_data. */
        constructor();

        /** yishou_shouying_data index. */
        public index: number;

        /** yishou_shouying_data star. */
        public star: number;
    }

    /** Represents a yishou_jiban_data. */
    class yishou_jiban_data {

        /** Constructs a new yishou_jiban_data. */
        constructor();

        /** yishou_jiban_data index. */
        public index: number;

        /** yishou_jiban_data is_active. */
        public is_active: boolean;

        /** yishou_jiban_data list. */
        public list: number[];
    }

    /** 登录下发 */
    class s2c_yishou_base_info {

        /** Constructs a new s2c_yishou_base_info. */
        constructor();

        /** s2c_yishou_base_info info_list. */
        public info_list: msg.yishou_base_data[];

        /** s2c_yishou_base_info shouling_list. */
        public shouling_list: msg.yishou_shouling_group_data[];

        /** s2c_yishou_base_info equip_list. */
        public equip_list: msg.yishou_equip_data[];

        /** s2c_yishou_base_info shouying_list. */
        public shouying_list: msg.yishou_shouying_data[];

        /** s2c_yishou_base_info jiban_list. */
        public jiban_list: msg.yishou_jiban_data[];
    }

    /** 单项更新（装备进阶，兽魂升阶，技能激活） */
    class s2c_yishou_base_update {

        /** Constructs a new s2c_yishou_base_update. */
        constructor();

        /** s2c_yishou_base_update data. */
        public data?: (msg.yishou_base_data|null);
    }

    /** 装备操作 */
    class c2s_yishou_equip_operate {

        /** Constructs a new c2s_yishou_equip_operate. */
        constructor();

        /** c2s_yishou_equip_operate type. */
        public type: number;

        /** 1：穿  2：一键穿戴 */
        public oper: number;

        /** 装备的唯一id（一键穿戴可缺省） */
        public prop_id: Long;
    }

    /** 装备更新 */
    class s2c_yishou_equip_update {

        /** Constructs a new s2c_yishou_equip_update. */
        constructor();

        /** s2c_yishou_equip_update equip_data. */
        public equip_data?: (msg.yishou_equip_data|null);
    }

    /** 装备进阶，返回 s2c_yishou_base_update */
    class c2s_yishou_equip_up_level {

        /** Constructs a new c2s_yishou_equip_up_level. */
        constructor();

        /** c2s_yishou_equip_up_level type. */
        public type: number;
    }

    /** 合成 */
    class c2s_yishou_equip_synthese {

        /** Constructs a new c2s_yishou_equip_synthese. */
        constructor();

        /** c2s_yishou_equip_synthese type. */
        public type: number;

        /** c2s_yishou_equip_synthese index. */
        public index: Long;

        /** c2s_yishou_equip_synthese count. */
        public count: number;
    }

    /** 合成返回 */
    class s2c_yishou_equip_synthese {

        /** Constructs a new s2c_yishou_equip_synthese. */
        constructor();

        /** s2c_yishou_equip_synthese type. */
        public type: number;
    }

    /** 分解 */
    class c2s_yishou_equip_resolve {

        /** Constructs a new c2s_yishou_equip_resolve. */
        constructor();

        /** c2s_yishou_equip_resolve type. */
        public type: number;

        /** c2s_yishou_equip_resolve list. */
        public list: Long[];
    }

    /** 兽魂升阶操作，返回 s2c_yishou_base_update */
    class c2s_yishou_shouhun_operate {

        /** Constructs a new c2s_yishou_shouhun_operate. */
        constructor();

        /** c2s_yishou_shouhun_operate type. */
        public type: number;

        /** 1：进阶  2：一键进阶 */
        public oper: number;
    }

    /** 技能激活，返回 s2c_yishou_base_update */
    class c2s_yishou_skill_active {

        /** Constructs a new c2s_yishou_skill_active. */
        constructor();

        /** c2s_yishou_skill_active type. */
        public type: number;

        /** c2s_yishou_skill_active skill_id. */
        public skill_id: number;
    }

    /** 兽灵：激活或者升级 */
    class c2s_yishou_shouling_up_level {

        /** Constructs a new c2s_yishou_shouling_up_level. */
        constructor();

        /** c2s_yishou_shouling_up_level group_id. */
        public group_id: number;

        /** c2s_yishou_shouling_up_level index. */
        public index: Long;
    }

    /** 兽灵：激活或者升级返回 */
    class s2c_yishou_shouling_up_level {

        /** Constructs a new s2c_yishou_shouling_up_level. */
        constructor();

        /** s2c_yishou_shouling_up_level data. */
        public data?: (msg.yishou_shouling_group_data|null);
    }

    /** 兽灵: 激活兽灵组 */
    class c2s_yishou_shouling_active {

        /** Constructs a new c2s_yishou_shouling_active. */
        constructor();

        /** c2s_yishou_shouling_active group_id. */
        public group_id: number;
    }

    /** 兽灵: 激活兽灵组返回 */
    class s2c_yishou_shouling_active {

        /** Constructs a new s2c_yishou_shouling_active. */
        constructor();

        /** s2c_yishou_shouling_active data. */
        public data?: (msg.yishou_shouling_group_data|null);
    }

    /** 兽印: 激活或者升星 */
    class c2s_yishou_shouying_up_star {

        /** Constructs a new c2s_yishou_shouying_up_star. */
        constructor();

        /** c2s_yishou_shouying_up_star index. */
        public index: number;
    }

    /** 兽印: 激活或者升星返回 */
    class s2c_yishou_shouying_up_star {

        /** Constructs a new s2c_yishou_shouying_up_star. */
        constructor();

        /** s2c_yishou_shouying_up_star data. */
        public data?: (msg.yishou_shouying_data|null);
    }

    /** Represents a c2s_yishou_shouying_jiban. */
    class c2s_yishou_shouying_jiban {

        /** Constructs a new c2s_yishou_shouying_jiban. */
        constructor();

        /** 羁绊编号 */
        public index: number;

        /** 外显id(激活组不要传数值) */
        public id: number;
    }

    /** Represents a s2c_yishou_shouying_jiban. */
    class s2c_yishou_shouying_jiban {

        /** Constructs a new s2c_yishou_shouying_jiban. */
        constructor();

        /** s2c_yishou_shouying_jiban data. */
        public data?: (msg.yishou_jiban_data|null);
    }

    /** Represents a s2c_cheap_gift_info. */
    class s2c_cheap_gift_info {

        /** Constructs a new s2c_cheap_gift_info. */
        constructor();

        /** s2c_cheap_gift_info type. */
        public type: number;

        /** s2c_cheap_gift_info index. */
        public index: number;
    }

    /** Represents a s2c_tianfu_giftbag_info. */
    class s2c_tianfu_giftbag_info {

        /** Constructs a new s2c_tianfu_giftbag_info. */
        constructor();

        /** s2c_tianfu_giftbag_info index. */
        public index: number;
    }

    /** 仙池祈愿/////////////////////// */
    class xian_chi_qi_yuan_struct {

        /** Constructs a new xian_chi_qi_yuan_struct. */
        constructor();

        /** 第x个 */
        public index: number;

        /** 获得的道具奖励 */
        public props: msg.prop_tips_data[];
    }

    /** 信息 */
    class s2c_xian_chi_qi_yuan_info {

        /** Constructs a new s2c_xian_chi_qi_yuan_info. */
        constructor();

        /** 奖励层数 */
        public layer: number;

        /** 获得的道具奖励 */
        public get_rewards: msg.xian_chi_qi_yuan_struct[];
    }

    /** 点击祈愿抽奖 */
    class c2s_xian_chi_qi_yuan_click {

        /** Constructs a new c2s_xian_chi_qi_yuan_click. */
        constructor();

        /** 1为抽奖  2为领取大奖 */
        public button_type: number;
    }

    /** Represents a s2c_tired_charge_info. */
    class s2c_tired_charge_info {

        /** Constructs a new s2c_tired_charge_info. */
        constructor();

        /** s2c_tired_charge_info type. */
        public type: number;

        /** s2c_tired_charge_info end_time. */
        public end_time: number;

        /** s2c_tired_charge_info total_value. */
        public total_value: number;

        /** s2c_tired_charge_info list. */
        public list: number[];
    }

    /** Represents a s2c_tired_charge_update. */
    class s2c_tired_charge_update {

        /** Constructs a new s2c_tired_charge_update. */
        constructor();

        /** s2c_tired_charge_update type. */
        public type: number;

        /** s2c_tired_charge_update total_value. */
        public total_value: number;

        /** s2c_tired_charge_update list. */
        public list: number[];
    }

    /** Represents a c2s_tired_charge_receive. */
    class c2s_tired_charge_receive {

        /** Constructs a new c2s_tired_charge_receive. */
        constructor();

        /** c2s_tired_charge_receive type. */
        public type: number;

        /** c2s_tired_charge_receive index. */
        public index: number;
    }

    /** 飞升礼包/////////////////////// */
    class s2c_feisheng_giftbag_info {

        /** Constructs a new s2c_feisheng_giftbag_info. */
        constructor();

        /** s2c_feisheng_giftbag_info index. */
        public index: number[];
    }

    /** Represents a c2s_activity_caiyun_qifu. */
    class c2s_activity_caiyun_qifu {

        /** Constructs a new c2s_activity_caiyun_qifu. */
        constructor();

        /** c2s_activity_caiyun_qifu act_id. */
        public act_id: number;

        /** c2s_activity_caiyun_qifu type. */
        public type: number;
    }

    /** Represents a s2c_activity_caiyun_qifu_info. */
    class s2c_activity_caiyun_qifu_info {

        /** Constructs a new s2c_activity_caiyun_qifu_info. */
        constructor();

        /** s2c_activity_caiyun_qifu_info item_list. */
        public item_list: msg.prop_tips_data[];

        /** s2c_activity_caiyun_qifu_info times. */
        public times: number;
    }

    /** Represents a reward_state. */
    class reward_state {

        /** Constructs a new reward_state. */
        constructor();

        /** reward_state id. */
        public id: number;

        /** reward_state statue. */
        public statue: number;
    }

    /** Represents a c2s_activity_caiyun_leichong_reward. */
    class c2s_activity_caiyun_leichong_reward {

        /** Constructs a new c2s_activity_caiyun_leichong_reward. */
        constructor();

        /** c2s_activity_caiyun_leichong_reward act_id. */
        public act_id: number;

        /** c2s_activity_caiyun_leichong_reward id. */
        public id: number;
    }

    /** Represents a s2c_activity_caiyun_leichong. */
    class s2c_activity_caiyun_leichong {

        /** Constructs a new s2c_activity_caiyun_leichong. */
        constructor();

        /** s2c_activity_caiyun_leichong num. */
        public num: Long;

        /** s2c_activity_caiyun_leichong info. */
        public info: msg.reward_state[];
    }

    /** Represents a c2s_activity_caiyun_duihuan. */
    class c2s_activity_caiyun_duihuan {

        /** Constructs a new c2s_activity_caiyun_duihuan. */
        constructor();

        /** c2s_activity_caiyun_duihuan act_id. */
        public act_id: number;

        /** c2s_activity_caiyun_duihuan id. */
        public id: number;

        /** c2s_activity_caiyun_duihuan cnt. */
        public cnt: number;
    }

    /** Represents a goods_buy_times. */
    class goods_buy_times {

        /** Constructs a new goods_buy_times. */
        constructor();

        /** goods_buy_times id. */
        public id: number;

        /** goods_buy_times times. */
        public times: number;
    }

    /** Represents a s2c_activity_caiyun_duihuan. */
    class s2c_activity_caiyun_duihuan {

        /** Constructs a new s2c_activity_caiyun_duihuan. */
        constructor();

        /** s2c_activity_caiyun_duihuan info. */
        public info: msg.goods_buy_times[];
    }

    /** Represents a c2s_activity_caiyun_login. */
    class c2s_activity_caiyun_login {

        /** Constructs a new c2s_activity_caiyun_login. */
        constructor();

        /** c2s_activity_caiyun_login act_id. */
        public act_id: number;

        /** c2s_activity_caiyun_login id. */
        public id: number;
    }

    /** Represents a s2c_activity_caiyun_login. */
    class s2c_activity_caiyun_login {

        /** Constructs a new s2c_activity_caiyun_login. */
        constructor();

        /** s2c_activity_caiyun_login info. */
        public info: msg.reward_state[];
    }

    /** Represents a s2c_activity_caiyun_rank_info. */
    class s2c_activity_caiyun_rank_info {

        /** Constructs a new s2c_activity_caiyun_rank_info. */
        constructor();

        /** s2c_activity_caiyun_rank_info act_id. */
        public act_id: number;

        /** s2c_activity_caiyun_rank_info rank_list. */
        public rank_list: msg.teammate[];

        /** s2c_activity_caiyun_rank_info my_score. */
        public my_score: number;

        /** s2c_activity_caiyun_rank_info my_rank_no. */
        public my_rank_no: number;
    }

    /** 战队操作 */
    class c2s_zhandui_button_click {

        /** Constructs a new c2s_zhandui_button_click. */
        constructor();

        /** 207 请求战队祭坛供奉信息 */
        public button_type: number;

        /** 旗帜索引（1创建战队、2购买战队、8旗帜使用旗帜需要， 206领取等级礼包) */
        public index: number;

        /** 战队id（4申请加入战队需要） */
        public team_id: Long;

        /** 战队名称（1为创建战队 6搜索战队  7战队改名需要) */
        public team_name: string;

        /** 10操作申请人员、12转移队长、13踢出战队 需要 */
        public role_id: Long;

        /** 0为拒绝申请  1为同意申请 10 */
        public is_pass: number;

        /** 15设置进入要求的最低战力 */
        public set_showpower: Long;

        /** (204幻化激活升级 205使用幻化传0表示卸下) */
        public use_id: Long;

        /** 放入供奉id的列表(200供奉道具和一键放入) */
        public idxs: Long[];

        /** 202战队祭坛供奉加速：1表示单个加速，2表示全部加速   203领取道具供奉奖励1单个领取 2全部领取 */
        public oper: number;

        /** 201回收道具的位置  203领取道具的位置 */
        public pos: number;
    }

    /** 战队每日奖励领取 */
    class c2s_zhandui_get_day_rewards {

        /** Constructs a new c2s_zhandui_get_day_rewards. */
        constructor();
    }

    /** 战队信息 */
    class s2c_zhandui_base_info {

        /** Constructs a new s2c_zhandui_base_info. */
        constructor();

        /** 战队id */
        public team_id: Long;

        /** 战队名称 */
        public team_name: string;

        /** 战队等级 */
        public team_level: number;

        /** 战队成员（顺序1234，第一个为队长，其余成员依照加入时间顺延） */
        public team_roles: msg.teammate[];

        /** 战队每日奖励 当天是否可以领取  1可领取   2已领取 */
        public today_is_get: number;

        /** 已创建的战队数量 */
        public total_team_count: number;

        /** 是否需要审核 true为需要   false为不需要 */
        public is_check_apply: boolean;

        /** 是否需要限制战力 true为需要   false为不需要 */
        public is_check_power: boolean;

        /** 进入要求的最低战力（0为不限制） */
        public limit_showpower: Long;

        /** 已购买的旗帜 */
        public flag_list: number[];

        /** 当前使用的旗帜 */
        public flag_index: number;

        /** 累计活跃度 */
        public team_point: number;

        /** 加入战队的时间 */
        public join_time: Long;
    }

    /** 可以申请的战队列表结构 */
    class zhandui_can_apply_struct {

        /** Constructs a new zhandui_can_apply_struct. */
        constructor();

        /** 战队id */
        public team_id: Long;

        /** 战队名字 */
        public team_name: string;

        /** 队长名字 */
        public name: string;

        /** 队伍人数 */
        public role_count: number;

        /** 队伍总战力 */
        public total_showpower: Long;

        /** 进入要求的最低战力（0为不限制） */
        public limit_showpower: Long;

        /** 旗帜索引 */
        public flag_index: number;
    }

    /** Represents a s2c_zhandui_apply_list. */
    class s2c_zhandui_apply_list {

        /** Constructs a new s2c_zhandui_apply_list. */
        constructor();

        /** 可以申请的战队列表 */
        public can_apply_list: msg.zhandui_can_apply_struct[];
    }

    /** Represents a s2c_zhandui_team_role_apply_list. */
    class s2c_zhandui_team_role_apply_list {

        /** Constructs a new s2c_zhandui_team_role_apply_list. */
        constructor();

        /** 向该战队发了申请的 玩家申请列表 */
        public role_apply_list: msg.teammate[];
    }

    /** Represents a s2c_zhandui_get_thing_records. */
    class s2c_zhandui_get_thing_records {

        /** Constructs a new s2c_zhandui_get_thing_records. */
        constructor();

        /** 仙纪功绩 */
        public strs1: string[];

        /** 仙纪事件 */
        public strs2: string[];
    }

    /** 战队祭坛 */
    class zhandui_jitan_struct {

        /** Constructs a new zhandui_jitan_struct. */
        constructor();

        /** 道具id */
        public idx: Long;

        /** 结束时间戳 */
        public endtime: Long;
    }

    /** Represents a zhandui_jitan_huanhua_struct. */
    class zhandui_jitan_huanhua_struct {

        /** Constructs a new zhandui_jitan_huanhua_struct. */
        constructor();

        /** 幻化id */
        public id: Long;

        /** 星级 */
        public star: number;
    }

    /** Represents a s2c_zhandui_jitan_base_info. */
    class s2c_zhandui_jitan_base_info {

        /** Constructs a new s2c_zhandui_jitan_base_info. */
        constructor();

        /** 战队拥有的能源石（公共的） */
        public value: Long;

        /** 已激活幻化的列表 */
        public ids: msg.zhandui_jitan_huanhua_struct[];

        /** 当前使用的幻化id */
        public now_use_id: Long;

        /** 已经领取过的礼包索引列表（前端根据等级和列表判断是否可以领取） */
        public index_get_list: number[];

        /** 祭坛等级 */
        public jitan_level: number;

        /** 战队拥有的水晶数量（公共的） */
        public shuijin_value: Long;
    }

    /** Represents a s2c_zhandui_jitan_gongfeng_info. */
    class s2c_zhandui_jitan_gongfeng_info {

        /** Constructs a new s2c_zhandui_jitan_gongfeng_info. */
        constructor();

        /** 供奉的道具列表（顺序的） */
        public prop_list: msg.zhandui_jitan_struct[];

        /** 累计加速时间 */
        public total_speed_time: Long;
    }

    /** boss战报/ 战利品信息 */
    class xujietansuo_challenge_records {

        /** Constructs a new xujietansuo_challenge_records. */
        constructor();

        /** 战报文本或者战利品文本 */
        public str: string;

        /** 攻击者 */
        public atk_role?: (msg.teammate|null);

        /** 完成挑战的时间戳 */
        public time: Long;

        /** 奖励 */
        public props: msg.prop_tips_data[];
    }

    /** 单个格子数据 */
    class xujietansuo_row_grid_struct {

        /** Constructs a new xujietansuo_row_grid_struct. */
        constructor();

        /** 格子位置 */
        public grid_pos: number;

        /** 格子类型 */
        public grid_type: number;

        /** 远征结束时间戳 */
        public endtime: Long;

        /** boss的血量 */
        public boss_hp: Long;

        /** 是否挑战过该boss */
        public is_challenge: number;

        /** 战报 */
        public records: msg.xujietansuo_challenge_records[];

        /** 上阵神灵列表 */
        public unitlist: Long[];

        /** boss满血量值 */
        public boss_max_hp: Long;

        /** 最近伤害值 */
        public last_hurt_value: Long;
    }

    /** 排数据 */
    class xujietansuo_layer_row_struct {

        /** Constructs a new xujietansuo_layer_row_struct. */
        constructor();

        /** 所属排 */
        public row: number;

        /** 各格子数据 */
        public grid_list: msg.xujietansuo_row_grid_struct[];
    }

    /** Represents a xujietansuo_struct. */
    class xujietansuo_struct {

        /** Constructs a new xujietansuo_struct. */
        constructor();

        /** 地图索引 */
        public map_index: number;

        /** 当前区域所属层数 */
        public layer: number;

        /** 该层所有排数据 */
        public row_list: msg.xujietansuo_layer_row_struct[];
    }

    /** 请求某个地图区域信息 */
    class c2s_zhandui_xujietansuo_quyu_info {

        /** Constructs a new c2s_zhandui_xujietansuo_quyu_info. */
        constructor();

        /** 地图索引 */
        public map_index: number;

        /** 层数 */
        public layer: number;
    }

    /** 推送当前所属战队探索信息（当前最新进度） */
    class s2c_zhandui_xujietansuo_base_info {

        /** Constructs a new s2c_zhandui_xujietansuo_base_info. */
        constructor();

        /** 当前参与搜索的战队数量 */
        public team_count: number;

        /** 区域层数据 */
        public map_datas?: (msg.xujietansuo_struct|null);

        /** 探索最新进度的区域 */
        public now_map_index: number;

        /** 探索最新进度区域的层数 */
        public now_layer: number;

        /** 1表示全部更新   2表示单个更新 */
        public oper: number;
    }

    /** 更新单个格子数据 */
    class s2c_zhandui_xujietansuo_single_grid {

        /** Constructs a new s2c_zhandui_xujietansuo_single_grid. */
        constructor();

        /** 区域 */
        public map_index: number;

        /** 层数 */
        public layer: number;

        /** 排数 */
        public row: number;

        /** 位置 */
        public pos: number;

        /** 单个格子数据 */
        public grid?: (msg.xujietansuo_row_grid_struct|null);

        /** 不传该字段标识其他格子更新数据， 1表示更新远征的相关信息（该数据用于前端显示） */
        public update_type: number;
    }

    /** Represents a s2c_zhandui_xujietansuo_records_info. */
    class s2c_zhandui_xujietansuo_records_info {

        /** Constructs a new s2c_zhandui_xujietansuo_records_info. */
        constructor();

        /** 战利品记录 */
        public rewards_records: msg.xujietansuo_challenge_records[];
    }

    /** 玩家操作墟界探索 */
    class c2s_zhandui_xujietansuo_role_click {

        /** Constructs a new c2s_zhandui_xujietansuo_role_click. */
        constructor();

        /** 1为领取战利品  2商店格子购买  3上阵神灵 4领取远征奖励 5挑战怪物 6扫荡  7请求排行榜（默认20条数据） */
        public button_type: number;

        /** 地图索引 */
        public map_index: number;

        /** 层数 */
        public layer: number;

        /** 排数 */
        public row: number;

        /** 位置 */
        public pos: number;

        /** 上阵神灵列表 */
        public unitlist: Long[];

        /** 选择使用x次扫荡次数 */
        public use_sweep_cnt: number;
    }

    /** 战队军团阵容协议 */
    class zhandui_legion_type_struct {

        /** Constructs a new zhandui_legion_type_struct. */
        constructor();

        /** 军团单位类型  1神灵   2化神   3女神 */
        public itype: number;

        /** 上阵单位列表 */
        public unitlist: Long[];
    }

    /** Represents a c2s_zhandui_legion_shangzheng. */
    class c2s_zhandui_legion_shangzheng {

        /** Constructs a new c2s_zhandui_legion_shangzheng. */
        constructor();

        /** 上阵单位列表 */
        public list?: (msg.zhandui_legion_type_struct|null);

        /** 1全部一键上阵   2某类一键上阵  3某类手动上阵或者下载 */
        public button_type: number;
    }

    /** Represents a s2c_zhandui_legion_shangzheng_list. */
    class s2c_zhandui_legion_shangzheng_list {

        /** Constructs a new s2c_zhandui_legion_shangzheng_list. */
        constructor();

        /** s2c_zhandui_legion_shangzheng_list list. */
        public list: msg.zhandui_legion_type_struct[];

        /** 军团属性 */
        public attrs?: (msg.zhandui_legion_attribute|null);
    }

    /** Represents a zhandui_legion_attribute. */
    class zhandui_legion_attribute {

        /** Constructs a new zhandui_legion_attribute. */
        constructor();

        /** 军团生命（满血血量上限） */
        public legion_max_hp: Long;

        /** 军团攻击 */
        public legion_atk: Long;

        /** 军团防御 */
        public legion_def: Long;

        /** 军团神力 */
        public legion_god: Long;

        /** 暴击率（万分比） */
        public crit_rate: Long;

        /** 暴击伤害（万分比） */
        public crit_hurt_rate: Long;

        /** 军团速度 */
        public legion_speed: Long;
    }

    /** 需要显示的单位的数据 */
    class zhandui_legion_entity {

        /** Constructs a new zhandui_legion_entity. */
        constructor();

        /** 单位id或者怪物id */
        public id: Long;

        /** 0玩家 1神灵  2化神  3女神 4怪物 */
        public entity_type: number;
    }

    /** 军团数据 */
    class zhandui_battle_entity {

        /** Constructs a new zhandui_battle_entity. */
        constructor();

        /** 军团总生命（满血血量上限） */
        public legion_max_hp: Long;

        /** 军团神力 */
        public legion_god: Long;

        /** 军团速度 */
        public legion_speed: Long;

        /** 开始进入战斗时,实体拥有的血量 */
        public hp: Long;

        /** 需要显示的单位列表 */
        public entity_list: msg.zhandui_legion_entity[];
    }

    /** Represents a zhandui_unit_data. */
    class zhandui_unit_data {

        /** Constructs a new zhandui_unit_data. */
        constructor();

        /** 我方或者敌方id */
        public id: Long;

        /** 军团当前的血量(军团在战斗中被攻击之后的血量) */
        public hp: Long;
    }

    /** Represents a zhandui_battle_records. */
    class zhandui_battle_records {

        /** Constructs a new zhandui_battle_records. */
        constructor();

        /** 动作方 */
        public actor?: (msg.zhandui_unit_data|null);

        /** 目标方 */
        public target?: (msg.zhandui_unit_data|null);

        /** 本次行动改变的数值（伤害/回血） */
        public value: Long;

        /** 本次攻击类型  0普通攻击   1回血   2反弹伤害   3直接伤害 */
        public hit_type: number;
    }

    /** Represents a zhandui_battle_round_struct. */
    class zhandui_battle_round_struct {

        /** Constructs a new zhandui_battle_round_struct. */
        constructor();

        /** 第x回合 */
        public round: number;

        /** 该回合下所有动作 */
        public now_list: msg.zhandui_battle_records[];
    }

    /** 各个回合战斗记录 */
    class s2c_zhandui_legion_battle_info {

        /** Constructs a new s2c_zhandui_legion_battle_info. */
        constructor();

        /** 战斗记录（顺序的1-15） */
        public round_records: msg.zhandui_battle_round_struct[];

        /** 我方信息（zhandui_battle_entity结构 军团数据） */
        public myself_info?: (msg.teammate|null);

        /** 敌方信息 */
        public target_info?: (msg.teammate|null);
    }

    /** 战斗结束，结算界面信息 */
    class s2c_zhandui_legion_result_info {

        /** Constructs a new s2c_zhandui_legion_result_info. */
        constructor();

        /** 玩家信息 */
        public role_info?: (msg.teammate|null);

        /** 造成伤害值 */
        public damage_value: Long;

        /** 剩余血量 */
        public remaining_hp: Long;

        /** 敌方军团总生命 */
        public max_hp: Long;

        /** 被攻击方名字（对手玩家名称或者怪物名称等等） */
        public target_name: string;

        /** 挑战奖励 */
        public challenge_rewards: msg.prop_tips_data[];

        /** 击杀奖励 */
        public kill_rewards: msg.prop_tips_data[];
    }

    /** 战队探索排行 */
    class zhandui_legion_rank_struct {

        /** Constructs a new zhandui_legion_rank_struct. */
        constructor();

        /** 战队旗帜 */
        public flag_index: number;

        /** 战队id */
        public team_id: Long;

        /** 战队名称(需要拼接上所属服务器) */
        public team_name: string;

        /** 队长名称 */
        public caption_name: string;

        /** 地图索引 */
        public map_index: number;

        /** 层数 */
        public layer: number;

        /** 排数(该排数为已挑战成功的排数，并非最新可以挑战的排数) */
        public row: number;

        /** 排名 */
        public rank_num: number;
    }

    /** Represents a s2c_zhandui_legion_rank_list. */
    class s2c_zhandui_legion_rank_list {

        /** Constructs a new s2c_zhandui_legion_rank_list. */
        constructor();

        /** 战队探索排名 */
        public tansuo_ranks: msg.zhandui_legion_rank_struct[];

        /** 玩家所属战队数据 */
        public my_team_rank?: (msg.zhandui_legion_rank_struct|null);
    }

    /** Represents a zhandui_oper. */
    class zhandui_oper {

        /** Constructs a new zhandui_oper. */
        constructor();

        /** zhandui_oper role_id. */
        public role_id: Long;

        /** zhandui_oper list. */
        public list: number[];
    }

    /** Represents a zhandui_kuanzhu_data. */
    class zhandui_kuanzhu_data {

        /** Constructs a new zhandui_kuanzhu_data. */
        constructor();

        /** zhandui_kuanzhu_data kuanzhu. */
        public kuanzhu?: (msg.teammate|null);

        /** zhandui_kuanzhu_data memeber. */
        public memeber?: (msg.teammate|null);

        /** zhandui_kuanzhu_data members. */
        public members: msg.teammate[];

        /** zhandui_kuanzhu_data oper_list. */
        public oper_list: msg.zhandui_oper[];
    }

    /** Represents a c2s_zhandui_kuanzhu_show. */
    class c2s_zhandui_kuanzhu_show {

        /** Constructs a new c2s_zhandui_kuanzhu_show. */
        constructor();

        /** c2s_zhandui_kuanzhu_show type. */
        public type: number;
    }

    /** Represents a s2c_zhandui_kuanzhu_show. */
    class s2c_zhandui_kuanzhu_show {

        /** Constructs a new s2c_zhandui_kuanzhu_show. */
        constructor();

        /** s2c_zhandui_kuanzhu_show list. */
        public list: msg.zhandui_kuanzhu_data[];

        /** s2c_zhandui_kuanzhu_show total. */
        public total: number;

        /** s2c_zhandui_kuanzhu_show conquer_num. */
        public conquer_num: number;

        /** s2c_zhandui_kuanzhu_show rescue_num. */
        public rescue_num: number;
    }

    /** Represents a zhandui_zhanbao_data. */
    class zhandui_zhanbao_data {

        /** Constructs a new zhandui_zhanbao_data. */
        constructor();

        /** zhandui_zhanbao_data one_name. */
        public one_name: string;

        /** zhandui_zhanbao_data two_name. */
        public two_name: string;

        /** zhandui_zhanbao_data index. */
        public index: number;
    }

    /** Represents a c2s_zhandui_zhanbao_show. */
    class c2s_zhandui_zhanbao_show {

        /** Constructs a new c2s_zhandui_zhanbao_show. */
        constructor();
    }

    /** Represents a s2c_zhandui_zhanbao_show. */
    class s2c_zhandui_zhanbao_show {

        /** Constructs a new s2c_zhandui_zhanbao_show. */
        constructor();

        /** s2c_zhandui_zhanbao_show logs. */
        public logs: msg.zhandui_zhanbao_data[];
    }

    /** Represents a zhandui_conquer_data. */
    class zhandui_conquer_data {

        /** Constructs a new zhandui_conquer_data. */
        constructor();

        /** zhandui_conquer_data name. */
        public name: string;

        /** zhandui_conquer_data role_id. */
        public role_id: Long;

        /** zhandui_conquer_data data. */
        public data?: (msg.teammate|null);
    }

    /** Represents a c2s_zhandui_conquer_show. */
    class c2s_zhandui_conquer_show {

        /** Constructs a new c2s_zhandui_conquer_show. */
        constructor();
    }

    /** Represents a s2c_zhandui_conquer_show. */
    class s2c_zhandui_conquer_show {

        /** Constructs a new s2c_zhandui_conquer_show. */
        constructor();

        /** s2c_zhandui_conquer_show list. */
        public list: msg.zhandui_conquer_data[];

        /** s2c_zhandui_conquer_show conquer_num. */
        public conquer_num: number;

        /** s2c_zhandui_conquer_show juntuan_power. */
        public juntuan_power: number;

        /** s2c_zhandui_conquer_show dail_buy_num. */
        public dail_buy_num: number;
    }

    /** Represents a s2c_zhandui_kuanmai_pvp_ret. */
    class s2c_zhandui_kuanmai_pvp_ret {

        /** Constructs a new s2c_zhandui_kuanmai_pvp_ret. */
        constructor();

        /** s2c_zhandui_kuanmai_pvp_ret type. */
        public type: number;

        /** s2c_zhandui_kuanmai_pvp_ret is_success. */
        public is_success: boolean;

        /** s2c_zhandui_kuanmai_pvp_ret name. */
        public name: string;
    }

    /** Represents a c2s_zhandui_buy_conquer_num. */
    class c2s_zhandui_buy_conquer_num {

        /** Constructs a new c2s_zhandui_buy_conquer_num. */
        constructor();

        /** c2s_zhandui_buy_conquer_num count. */
        public count: number;
    }

    /** Represents a s2c_zhandui_buy_conquer_num. */
    class s2c_zhandui_buy_conquer_num {

        /** Constructs a new s2c_zhandui_buy_conquer_num. */
        constructor();

        /** s2c_zhandui_buy_conquer_num conquer_num. */
        public conquer_num: number;

        /** s2c_zhandui_buy_conquer_num dail_buy_num. */
        public dail_buy_num: number;
    }

    /** Represents a c2s_zhandui_helot_operate. */
    class c2s_zhandui_helot_operate {

        /** Constructs a new c2s_zhandui_helot_operate. */
        constructor();

        /** c2s_zhandui_helot_operate kuanzhu_id. */
        public kuanzhu_id: Long;

        /** c2s_zhandui_helot_operate role_id. */
        public role_id: Long;

        /** c2s_zhandui_helot_operate type. */
        public type: number;
    }

    /** Represents a c2s_zhandui_helot_target_show. */
    class c2s_zhandui_helot_target_show {

        /** Constructs a new c2s_zhandui_helot_target_show. */
        constructor();
    }

    /** Represents a s2c_zhandui_helot_target_show. */
    class s2c_zhandui_helot_target_show {

        /** Constructs a new s2c_zhandui_helot_target_show. */
        constructor();

        /** s2c_zhandui_helot_target_show buy_list. */
        public buy_list: number[];
    }

    /** Represents a c2s_zhandui_target_buy. */
    class c2s_zhandui_target_buy {

        /** Constructs a new c2s_zhandui_target_buy. */
        constructor();

        /** c2s_zhandui_target_buy index. */
        public index: number;
    }

    /** Represents a c2s_zhandui_lingbao. */
    class c2s_zhandui_lingbao {

        /** Constructs a new c2s_zhandui_lingbao. */
        constructor();
    }

    /** Represents a s2c_zhandui_update_call_num. */
    class s2c_zhandui_update_call_num {

        /** Constructs a new s2c_zhandui_update_call_num. */
        constructor();

        /** s2c_zhandui_update_call_num num. */
        public num: number;
    }

    /** Represents a reward_find_data. */
    class reward_find_data {

        /** Constructs a new reward_find_data. */
        constructor();

        /** reward_find_data type. */
        public type: number;

        /** reward_find_data prop_list. */
        public prop_list: msg.prop_tips_data[];
    }

    /** Represents a s2c_reward_find_info. */
    class s2c_reward_find_info {

        /** Constructs a new s2c_reward_find_info. */
        constructor();

        /** s2c_reward_find_info list. */
        public list: msg.reward_find_data[];
    }

    /** Represents a c2s_reward_find_draw. */
    class c2s_reward_find_draw {

        /** Constructs a new c2s_reward_find_draw. */
        constructor();
    }

    /** Represents a c2s_activity_kuanghuan_mibao_get_reward. */
    class c2s_activity_kuanghuan_mibao_get_reward {

        /** Constructs a new c2s_activity_kuanghuan_mibao_get_reward. */
        constructor();

        /** c2s_activity_kuanghuan_mibao_get_reward act_id. */
        public act_id: number;

        /** c2s_activity_kuanghuan_mibao_get_reward index. */
        public index: number;
    }

    /** Represents a s2c_activity_kuanghuan_mibao_info. */
    class s2c_activity_kuanghuan_mibao_info {

        /** Constructs a new s2c_activity_kuanghuan_mibao_info. */
        constructor();

        /** s2c_activity_kuanghuan_mibao_info act_id. */
        public act_id: number;

        /** s2c_activity_kuanghuan_mibao_info list. */
        public list: number[];
    }

    /** Represents a c2s_activity_kuanghuan_gift_buy. */
    class c2s_activity_kuanghuan_gift_buy {

        /** Constructs a new c2s_activity_kuanghuan_gift_buy. */
        constructor();

        /** c2s_activity_kuanghuan_gift_buy act_id. */
        public act_id: number;

        /** c2s_activity_kuanghuan_gift_buy index. */
        public index: number;
    }

    /** Represents an activity_kuanghuan_gift_info. */
    class activity_kuanghuan_gift_info {

        /** Constructs a new activity_kuanghuan_gift_info. */
        constructor();

        /** activity_kuanghuan_gift_info index. */
        public index: number;

        /** activity_kuanghuan_gift_info num. */
        public num: number;
    }

    /** Represents a s2c_activity_kuanghuan_gift_info. */
    class s2c_activity_kuanghuan_gift_info {

        /** Constructs a new s2c_activity_kuanghuan_gift_info. */
        constructor();

        /** s2c_activity_kuanghuan_gift_info act_id. */
        public act_id: number;

        /** s2c_activity_kuanghuan_gift_info list. */
        public list: msg.activity_kuanghuan_gift_info[];
    }

    /** Represents a c2s_activity_kuanghuan_geren_zhaohuan_get_reward. */
    class c2s_activity_kuanghuan_geren_zhaohuan_get_reward {

        /** Constructs a new c2s_activity_kuanghuan_geren_zhaohuan_get_reward. */
        constructor();

        /** c2s_activity_kuanghuan_geren_zhaohuan_get_reward act_id. */
        public act_id: number;
    }

    /** Represents a s2c_activity_kuanghuan_zhaohuan_status. */
    class s2c_activity_kuanghuan_zhaohuan_status {

        /** Constructs a new s2c_activity_kuanghuan_zhaohuan_status. */
        constructor();

        /** s2c_activity_kuanghuan_zhaohuan_status act_id. */
        public act_id: number;

        /** s2c_activity_kuanghuan_zhaohuan_status reward_number. */
        public reward_number: number;

        /** s2c_activity_kuanghuan_zhaohuan_status list. */
        public list: number[];

        /** s2c_activity_kuanghuan_zhaohuan_status count. */
        public count: number;
    }

    /** Represents a c2s_activity_kuanghuan_zongmen_zhaohuan_get_reward. */
    class c2s_activity_kuanghuan_zongmen_zhaohuan_get_reward {

        /** Constructs a new c2s_activity_kuanghuan_zongmen_zhaohuan_get_reward. */
        constructor();

        /** c2s_activity_kuanghuan_zongmen_zhaohuan_get_reward act_id. */
        public act_id: number;
    }

    /** Represents a s2c_activity_kuanghuan_zhaohuan_state. */
    class s2c_activity_kuanghuan_zhaohuan_state {

        /** Constructs a new s2c_activity_kuanghuan_zhaohuan_state. */
        constructor();

        /** s2c_activity_kuanghuan_zhaohuan_state act_id. */
        public act_id: number;

        /** s2c_activity_kuanghuan_zhaohuan_state count. */
        public count: number;

        /** s2c_activity_kuanghuan_zhaohuan_state list. */
        public list: number[];
    }

    /** Represents a s2c_activity_kuanghuan_geren_rank_info. */
    class s2c_activity_kuanghuan_geren_rank_info {

        /** Constructs a new s2c_activity_kuanghuan_geren_rank_info. */
        constructor();

        /** s2c_activity_kuanghuan_geren_rank_info act_id. */
        public act_id: number;

        /** s2c_activity_kuanghuan_geren_rank_info rank_list. */
        public rank_list: msg.teammate[];

        /** s2c_activity_kuanghuan_geren_rank_info my_data. */
        public my_data?: (msg.teammate|null);

        /** s2c_activity_kuanghuan_geren_rank_info type. */
        public type: number;

        /** s2c_activity_kuanghuan_geren_rank_info reward_status. */
        public reward_status: number;
    }

    /** Represents a s2c_activity_kuanghuan_zongmen_rank_info. */
    class s2c_activity_kuanghuan_zongmen_rank_info {

        /** Constructs a new s2c_activity_kuanghuan_zongmen_rank_info. */
        constructor();

        /** s2c_activity_kuanghuan_zongmen_rank_info act_id. */
        public act_id: number;

        /** s2c_activity_kuanghuan_zongmen_rank_info rank_list. */
        public rank_list: msg.teammate[];

        /** s2c_activity_kuanghuan_zongmen_rank_info my_data. */
        public my_data?: (msg.teammate|null);

        /** s2c_activity_kuanghuan_zongmen_rank_info type. */
        public type: number;

        /** s2c_activity_kuanghuan_zongmen_rank_info reward_status. */
        public reward_status: number;
    }

    /** 荒古女神start//////////////////////// */
    class c2s_huanggu_nvshen_op {

        /** Constructs a new c2s_huanggu_nvshen_op. */
        constructor();

        /** c2s_huanggu_nvshen_op type. */
        public type: number;

        /** c2s_huanggu_nvshen_op index. */
        public index: number;

        /** c2s_huanggu_nvshen_op param. */
        public param: number;
    }

    /** Represents a huanggu_nvshen_gongfeng. */
    class huanggu_nvshen_gongfeng {

        /** Constructs a new huanggu_nvshen_gongfeng. */
        constructor();

        /** huanggu_nvshen_gongfeng level. */
        public level: number;

        /** huanggu_nvshen_gongfeng exp. */
        public exp: number;

        /** huanggu_nvshen_gongfeng haogan_level. */
        public haogan_level: number;

        /** huanggu_nvshen_gongfeng haogan_exp. */
        public haogan_exp: number;

        /** huanggu_nvshen_gongfeng is_act. */
        public is_act: boolean;

        /** huanggu_nvshen_gongfeng times. */
        public times: number;
    }

    /** Represents a huanggu_nvhshen_get_reward. */
    class huanggu_nvhshen_get_reward {

        /** Constructs a new huanggu_nvhshen_get_reward. */
        constructor();

        /** huanggu_nvhshen_get_reward level. */
        public level: number;

        /** huanggu_nvhshen_get_reward is_finish. */
        public is_finish: boolean;
    }

    /** Represents a huanggu_shijian. */
    class huanggu_shijian {

        /** Constructs a new huanggu_shijian. */
        constructor();

        /** huanggu_shijian index. */
        public index: number;

        /** huanggu_shijian stage. */
        public stage: number;
    }

    /** Represents a huanggu_nvshen_gift. */
    class huanggu_nvshen_gift {

        /** Constructs a new huanggu_nvshen_gift. */
        constructor();

        /** huanggu_nvshen_gift free_reward. */
        public free_reward: number[];

        /** huanggu_nvshen_gift buy_reward. */
        public buy_reward: number[];
    }

    /** Represents a s2c_huanggu_nvshen_info. */
    class s2c_huanggu_nvshen_info {

        /** Constructs a new s2c_huanggu_nvshen_info. */
        constructor();

        /** s2c_huanggu_nvshen_info gongfeng. */
        public gongfeng?: (msg.huanggu_nvshen_gongfeng|null);

        /** s2c_huanggu_nvshen_info hudong. */
        public hudong?: (msg.huanggu_nvhshen_get_reward|null);

        /** s2c_huanggu_nvshen_info shijian. */
        public shijian: msg.huanggu_shijian[];

        /** s2c_huanggu_nvshen_info gift. */
        public gift?: (msg.huanggu_nvshen_gift|null);
    }

    /** Represents a c2s_nvshen_get_chat. */
    class c2s_nvshen_get_chat {

        /** Constructs a new c2s_nvshen_get_chat. */
        constructor();

        /** c2s_nvshen_get_chat type. */
        public type: number;
    }

    /** Represents a s2c_nvshen_chat. */
    class s2c_nvshen_chat {

        /** Constructs a new s2c_nvshen_chat. */
        constructor();

        /** s2c_nvshen_chat type. */
        public type: number;

        /** s2c_nvshen_chat list. */
        public list: msg.nvshen_chat[];
    }

    /** Represents a nvshen_chat. */
    class nvshen_chat {

        /** Constructs a new nvshen_chat. */
        constructor();

        /** nvshen_chat level. */
        public level: number;

        /** nvshen_chat index. */
        public index: number;

        /** nvshen_chat pos. */
        public pos: number;
    }

    /** Represents a c2s_nvshen_save_chat. */
    class c2s_nvshen_save_chat {

        /** Constructs a new c2s_nvshen_save_chat. */
        constructor();

        /** c2s_nvshen_save_chat list. */
        public list: msg.nvshen_chat[];

        /** c2s_nvshen_save_chat type. */
        public type: number;
    }

    /** 女神录/////////////////////////// */
    class c2s_chuang_shi_nv_shen_system_click {

        /** Constructs a new c2s_chuang_shi_nv_shen_system_click. */
        constructor();

        /** 20 创世能量抽奖（女神馈赠） */
        public button_type: number;

        /** 放入供奉id的列表（10供奉） */
        public idxs: Long[];

        /** （11供奉道具回收，15领取供奉奖励, 20创世能量抽奖） */
        public pos: number;
    }

    /** Represents a s2c_chuang_shi_nv_shen_base_info. */
    class s2c_chuang_shi_nv_shen_base_info {

        /** Constructs a new s2c_chuang_shi_nv_shen_base_info. */
        constructor();

        /** 事件索引 */
        public event_index: number;

        /** 事件阶段 */
        public event_stage: number;

        /** 对话等级 */
        public talk_level: number;

        /** 当前对话等级，对话是否完成 */
        public is_finish: number;

        /** 创世女神亲密度等级 */
        public level: number;
    }

    /** 创世女神供奉列表 */
    class s2c_chuang_shi_nv_shen_gongfeng_info {

        /** Constructs a new s2c_chuang_shi_nv_shen_gongfeng_info. */
        constructor();

        /** 供奉的道具列表（顺序的） */
        public prop_list: msg.zhandui_jitan_struct[];

        /** 累计加速时间 */
        public total_speed_time: Long;
    }

    /** 魂卡操作 */
    class nv_shen_hun_ka_pos_struct {

        /** Constructs a new nv_shen_hun_ka_pos_struct. */
        constructor();

        /** 所属位置 */
        public pos: number;

        /** 单个魂卡信息，空表示未穿戴 */
        public hunka?: (msg.prop_attributes|null);
    }

    /** Represents a nv_shen_hun_ka_struct. */
    class nv_shen_hun_ka_struct {

        /** Constructs a new nv_shen_hun_ka_struct. */
        constructor();

        /** 魂卡类型 */
        public type: number;

        /** 评价，默认0开始,卸下魂卡不会影响评价，评价可激活共鸣 */
        public lv: number;

        /** 魂卡部位信息 */
        public ka_list: msg.nv_shen_hun_ka_pos_struct[];
    }

    /** Represents a s2c_chuang_shi_nv_shen_hun_ka_info. */
    class s2c_chuang_shi_nv_shen_hun_ka_info {

        /** Constructs a new s2c_chuang_shi_nv_shen_hun_ka_info. */
        constructor();

        /** 三种类型魂卡 */
        public list: msg.nv_shen_hun_ka_struct[];
    }

    /** Represents a c2s_chuang_shi_nv_shen_hun_ka_click. */
    class c2s_chuang_shi_nv_shen_hun_ka_click {

        /** Constructs a new c2s_chuang_shi_nv_shen_hun_ka_click. */
        constructor();

        /** 1解锁魂卡阵位   2上阵、替换魂卡 3卸下魂卡   4激活评分  5魂卡预览   6魂卡合成 7魂卡一键合成 */
        public button_type: number;

        /** 魂卡类型 */
        public type: number;

        /** 位置（1解锁魂卡阵位   2上阵、替换魂卡 3卸下魂卡） */
        public pos: number;

        /** 魂卡唯一id (2上阵、替换魂卡，上阵不传id时表示一键上阵) */
        public id: Long;

        /** 魂卡预览和魂卡合成都需要传该字段 */
        public ids: Long[];
    }

    /** Represents a s2c_chuang_shi_nv_shen_hun_ka_compose_viewer. */
    class s2c_chuang_shi_nv_shen_hun_ka_compose_viewer {

        /** Constructs a new s2c_chuang_shi_nv_shen_hun_ka_compose_viewer. */
        constructor();

        /** 5魂卡预览   6魂卡合成 7魂卡一键合成 */
        public button_type: number;

        /** s2c_chuang_shi_nv_shen_hun_ka_compose_viewer hunka. */
        public hunka?: (msg.prop_attributes|null);

        /** 随机继承x个词条上限 */
        public attr_count_up: number;

        /** 随机继承x个词条下限 */
        public attr_count_down: number;
    }

    /** 请求挑战对应BOSS */
    class c2s_zhuimo_boss_challenge {

        /** Constructs a new c2s_zhuimo_boss_challenge. */
        constructor();
    }

    /** Represents a zhuimo_boss_data. */
    class zhuimo_boss_data {

        /** Constructs a new zhuimo_boss_data. */
        constructor();

        /** 副本配置索引编号 */
        public index: number;

        /** boss血量(百分比) */
        public hp: number;

        /** boss复活时间戳 */
        public recover_time: Long;

        /** boss实体id */
        public entity_id: Long;
    }

    /** 场景内请求boss信息 */
    class c2s_zhuimo_boss_info {

        /** Constructs a new c2s_zhuimo_boss_info. */
        constructor();
    }

    /** 场景内请求boss信息返回结果 */
    class s2c_zhuimo_boss_info_ret {

        /** Constructs a new s2c_zhuimo_boss_info_ret. */
        constructor();

        /** s2c_zhuimo_boss_info_ret boss_list. */
        public boss_list: msg.zhuimo_boss_data[];
    }

    /** Represents a s2c_zhuimo_boss_hurt_rank. */
    class s2c_zhuimo_boss_hurt_rank {

        /** Constructs a new s2c_zhuimo_boss_hurt_rank. */
        constructor();

        /** boss实体id */
        public entity_id: Long;

        /** 伤害排名列表(已排序) */
        public hurtlist: msg.teammate[];

        /** 我的信息 */
        public my_info?: (msg.teammate|null);
    }

    /** 更新场景个人数据 */
    class s2c_zhuimo_update_date {

        /** Constructs a new s2c_zhuimo_update_date. */
        constructor();

        /** s2c_zhuimo_update_date member_num. */
        public member_num: number;

        /** s2c_zhuimo_update_date total. */
        public total: number;
    }

    /** 打开ui界面 */
    class c2s_zhuimo_open_ui {

        /** Constructs a new c2s_zhuimo_open_ui. */
        constructor();
    }

    /** 打开ui界面返回结果 */
    class s2c_zhuimo_open_ui_ret {

        /** Constructs a new s2c_zhuimo_open_ui_ret. */
        constructor();

        /** s2c_zhuimo_open_ui_ret reward_name_list. */
        public reward_name_list: string[];
    }

    /** 查看战利品 */
    class c2s_zhuimo_show_reward {

        /** Constructs a new c2s_zhuimo_show_reward. */
        constructor();
    }

    /** 查看战利品返回结果 */
    class s2c_zhuimo_show_reward_ret {

        /** Constructs a new s2c_zhuimo_show_reward_ret. */
        constructor();

        /** s2c_zhuimo_show_reward_ret props. */
        public props: msg.prop_tips_data[];
    }

    /** 幸运大奖(摇骰子) */
    class s2c_zhuimo_boss_roll_point {

        /** Constructs a new s2c_zhuimo_boss_roll_point. */
        constructor();

        /** 副本配置索引编号 */
        public index: number;

        /** 自己点数 */
        public my_roll_point: number;

        /** 玩家点数列表 */
        public point_list: msg.teammate[];
    }

    /** 队伍界面显示 */
    class c2s_zhuimo_army_ui_show {

        /** Constructs a new c2s_zhuimo_army_ui_show. */
        constructor();

        /** c2s_zhuimo_army_ui_show type. */
        public type: number;
    }

    /** 队伍数据 */
    class zhuimo_army_data {

        /** Constructs a new zhuimo_army_data. */
        constructor();

        /** zhuimo_army_data army_id. */
        public army_id: number;

        /** zhuimo_army_data total. */
        public total: number;

        /** zhuimo_army_data lead. */
        public lead?: (msg.teammate|null);
    }

    /** 队伍界面显示 返回 */
    class s2c_zhuimo_army_ui_show {

        /** Constructs a new s2c_zhuimo_army_ui_show. */
        constructor();

        /** s2c_zhuimo_army_ui_show army_id. */
        public army_id: number;

        /** 没有队伍的玩家列表 */
        public duiyou_list: msg.teammate[];

        /** s2c_zhuimo_army_ui_show army_list. */
        public army_list: msg.zhuimo_army_data[];

        /** s2c_zhuimo_army_ui_show my_team. */
        public my_team: msg.teammate[];
    }

    /** 队伍界面操作 */
    class c2s_zhuimo_army_oper {

        /** Constructs a new c2s_zhuimo_army_oper. */
        constructor();

        /** c2s_zhuimo_army_oper type. */
        public type: number;

        /** c2s_zhuimo_army_oper army_id. */
        public army_id: number;

        /** c2s_zhuimo_army_oper role_id. */
        public role_id: Long;
    }

    /** 玩家buff更新 */
    class s2c_zhuimo_update_buff_info {

        /** Constructs a new s2c_zhuimo_update_buff_info. */
        constructor();

        /** s2c_zhuimo_update_buff_info army_step. */
        public army_step: number;

        /** s2c_zhuimo_update_buff_info guild_step. */
        public guild_step: number;
    }

    /** Represents a c2s_guild_fengmo_battle. */
    class c2s_guild_fengmo_battle {

        /** Constructs a new c2s_guild_fengmo_battle. */
        constructor();

        /** c2s_guild_fengmo_battle type. */
        public type: number;

        /** c2s_guild_fengmo_battle param. */
        public param: number;
    }

    /** Represents a c2s_guild_fengmo_get_reward. */
    class c2s_guild_fengmo_get_reward {

        /** Constructs a new c2s_guild_fengmo_get_reward. */
        constructor();

        /** c2s_guild_fengmo_get_reward type. */
        public type: number;

        /** c2s_guild_fengmo_get_reward index. */
        public index: number;
    }

    /** Represents a c2s_guild_fengmo_get_info. */
    class c2s_guild_fengmo_get_info {

        /** Constructs a new c2s_guild_fengmo_get_info. */
        constructor();
    }

    /** Represents a s2c_guild_fengmo_info. */
    class s2c_guild_fengmo_info {

        /** Constructs a new s2c_guild_fengmo_info. */
        constructor();

        /** s2c_guild_fengmo_info times. */
        public times: number;

        /** s2c_guild_fengmo_info buy_times. */
        public buy_times: number;

        /** s2c_guild_fengmo_info damage_value. */
        public damage_value: Long;

        /** s2c_guild_fengmo_info my_max_damage. */
        public my_max_damage: Long;

        /** s2c_guild_fengmo_info mvp_info. */
        public mvp_info?: (msg.teammate|null);

        /** s2c_guild_fengmo_info total_times. */
        public total_times: number;

        /** s2c_guild_fengmo_info damage_index. */
        public damage_index: number[];

        /** s2c_guild_fengmo_info cishu_index. */
        public cishu_index: number[];

        /** s2c_guild_fengmo_info param. */
        public param: number;

        /** 奖励 */
        public reward: msg.prop_tips_data[];
    }

    /** Represents a c2s_guild_fengmo_get_rank. */
    class c2s_guild_fengmo_get_rank {

        /** Constructs a new c2s_guild_fengmo_get_rank. */
        constructor();

        /** c2s_guild_fengmo_get_rank type. */
        public type: number;
    }

    /** Represents a c2s_buy_fengmo_tiaozhan_times. */
    class c2s_buy_fengmo_tiaozhan_times {

        /** Constructs a new c2s_buy_fengmo_tiaozhan_times. */
        constructor();

        /** c2s_buy_fengmo_tiaozhan_times buy_times. */
        public buy_times: number;
    }

    /** Represents an ayah_fuben_data. */
    class ayah_fuben_data {

        /** Constructs a new ayah_fuben_data. */
        constructor();

        /** ayah_fuben_data type. */
        public type: number;

        /** ayah_fuben_data count. */
        public count: number;
    }

    /** Represents a s2c_update_ayah_info. */
    class s2c_update_ayah_info {

        /** Constructs a new s2c_update_ayah_info. */
        constructor();

        /** s2c_update_ayah_info time. */
        public time: number;

        /** s2c_update_ayah_info level. */
        public level: number;

        /** s2c_update_ayah_info exp. */
        public exp: number;

        /** s2c_update_ayah_info show_index. */
        public show_index: number;

        /** s2c_update_ayah_info buy_list. */
        public buy_list: number[];

        /** s2c_update_ayah_info finish_list. */
        public finish_list: msg.ayah_fuben_data[];

        /** s2c_update_ayah_info offline_list. */
        public offline_list: number[];

        /** s2c_update_ayah_info online_list. */
        public online_list: number[];
    }

    /** Represents a s2c_ayah_offline_reward_show. */
    class s2c_ayah_offline_reward_show {

        /** Constructs a new s2c_ayah_offline_reward_show. */
        constructor();

        /** s2c_ayah_offline_reward_show list. */
        public list: msg.ayah_fuben_data[];

        /** s2c_ayah_offline_reward_show items. */
        public items: msg.prop_tips_data[];
    }

    /** Represents a c2s_ayah_buy_gift. */
    class c2s_ayah_buy_gift {

        /** Constructs a new c2s_ayah_buy_gift. */
        constructor();

        /** c2s_ayah_buy_gift index. */
        public index: number;
    }

    /** Represents a c2s_ayah_edit_show. */
    class c2s_ayah_edit_show {

        /** Constructs a new c2s_ayah_edit_show. */
        constructor();

        /** c2s_ayah_edit_show oper. */
        public oper: number;

        /** c2s_ayah_edit_show list. */
        public list: number[];
    }

    /** Represents a c2s_ayah_apparent. */
    class c2s_ayah_apparent {

        /** Constructs a new c2s_ayah_apparent. */
        constructor();

        /** c2s_ayah_apparent level. */
        public level: number;
    }

    /** Represents a c2s_ayah_get_reward. */
    class c2s_ayah_get_reward {

        /** Constructs a new c2s_ayah_get_reward. */
        constructor();

        /** c2s_ayah_get_reward oper. */
        public oper: number;
    }

    /** 仙帝争霸start/////////////////////////////////////////// */
    class c2s_xiandi_zhengba_oper {

        /** Constructs a new c2s_xiandi_zhengba_oper. */
        constructor();

        /** c2s_xiandi_zhengba_oper oper_type. */
        public oper_type: number;

        /** c2s_xiandi_zhengba_oper params. */
        public params: number;

        /** c2s_xiandi_zhengba_oper role_id. */
        public role_id: Long;
    }

    /** Represents a s2c_xiandi_zhengba_challenge_info. */
    class s2c_xiandi_zhengba_challenge_info {

        /** Constructs a new s2c_xiandi_zhengba_challenge_info. */
        constructor();

        /** s2c_xiandi_zhengba_challenge_info player_info. */
        public player_info?: (msg.teammate|null);
    }

    /** Represents a s2c_xiandi_zhengba_rank. */
    class s2c_xiandi_zhengba_rank {

        /** Constructs a new s2c_xiandi_zhengba_rank. */
        constructor();

        /** s2c_xiandi_zhengba_rank guild_ranks. */
        public guild_ranks: msg.teammate[];

        /** s2c_xiandi_zhengba_rank geren_ranks. */
        public geren_ranks: msg.teammate[];

        /** s2c_xiandi_zhengba_rank my_guild_rank. */
        public my_guild_rank?: (msg.teammate|null);

        /** s2c_xiandi_zhengba_rank my_rank. */
        public my_rank?: (msg.teammate|null);

        /** s2c_xiandi_zhengba_rank free_times. */
        public free_times: number;
    }

    /** Represents a s2c_xiandi_zhanshi_info. */
    class s2c_xiandi_zhanshi_info {

        /** Constructs a new s2c_xiandi_zhanshi_info. */
        constructor();

        /** s2c_xiandi_zhanshi_info tiandi_info. */
        public tiandi_info?: (msg.teammate|null);

        /** s2c_xiandi_zhanshi_info xianhou_info. */
        public xianhou_info?: (msg.teammate|null);

        /** s2c_xiandi_zhanshi_info hongyan_info. */
        public hongyan_info?: (msg.teammate|null);

        /** s2c_xiandi_zhanshi_info tianwang_info. */
        public tianwang_info: msg.teammate[];

        /** s2c_xiandi_zhanshi_info click_count. */
        public click_count: number;

        /** s2c_xiandi_zhanshi_info is_click. */
        public is_click: boolean;

        /** s2c_xiandi_zhanshi_info skill_lv. */
        public skill_lv: number;

        /** s2c_xiandi_zhanshi_info param. */
        public param: number;

        /** s2c_xiandi_zhanshi_info is_gongfeng. */
        public is_gongfeng: boolean;
    }

    /** Represents a c2s_tiandi_zhengba_ui_info. */
    class c2s_tiandi_zhengba_ui_info {

        /** Constructs a new c2s_tiandi_zhengba_ui_info. */
        constructor();
    }

    /** Represents a s2c_tiandi_zhengba_ui_info. */
    class s2c_tiandi_zhengba_ui_info {

        /** Constructs a new s2c_tiandi_zhengba_ui_info. */
        constructor();

        /** s2c_tiandi_zhengba_ui_info flag. */
        public flag: number;
    }

    /** Represents a s2c_tiandi_box_update. */
    class s2c_tiandi_box_update {

        /** Constructs a new s2c_tiandi_box_update. */
        constructor();

        /** s2c_tiandi_box_update count. */
        public count: number;

        /** s2c_tiandi_box_update is_huanhua. */
        public is_huanhua: boolean;

        /** s2c_tiandi_box_update is_activa. */
        public is_activa: boolean;

        /** s2c_tiandi_box_update reward_status. */
        public reward_status: number;
    }

    /** Represents a c2s_tiandi_box_oper. */
    class c2s_tiandi_box_oper {

        /** Constructs a new c2s_tiandi_box_oper. */
        constructor();

        /** c2s_tiandi_box_oper oper. */
        public oper: number;
    }

    /** Represents a c2s_tiandi_box_challenge. */
    class c2s_tiandi_box_challenge {

        /** Constructs a new c2s_tiandi_box_challenge. */
        constructor();
    }

    /** 幻境之海////////////////// */
    class c2s_huanjingzhihai_click {

        /** Constructs a new c2s_huanjingzhihai_click. */
        constructor();

        /** 1激活解锁区域  2领取挂机收益  3挑战区域关卡  4攻击幻境boss   5请求排行信息  6领取全民奖励 */
        public button_type: number;

        /** 区域索引 */
        public index: number;
    }

    /** Represents a huanjinzhihai_quyu_shuju. */
    class huanjinzhihai_quyu_shuju {

        /** Constructs a new huanjinzhihai_quyu_shuju. */
        constructor();

        /** 区域索引 */
        public index: number;

        /** 当前大关id */
        public big_gate: number;

        /** 已通关的小关id */
        public small_gate: number;

        /** 本次挂机收益开始时间戳 */
        public reward_time: Long;

        /** 当前已参与区域人数 */
        public count: number;

        /** 是否解锁该区域 */
        public is_open: number;

        /** 当前幻境boss索引 */
        public boss_index: number;

        /** 当前幻境boss剩余血量 */
        public boss_hp: number;

        /** 全民奖励状态  1可领取   2已领取 */
        public is_get: number;
    }

    /** Represents a s2c_huanjingzhihai_info. */
    class s2c_huanjingzhihai_info {

        /** Constructs a new s2c_huanjingzhihai_info. */
        constructor();

        /** 各区域数据 */
        public datas: msg.huanjinzhihai_quyu_shuju[];
    }

    /** Represents a s2c_huanjingzhihai_single_rank_info. */
    class s2c_huanjingzhihai_single_rank_info {

        /** Constructs a new s2c_huanjingzhihai_single_rank_info. */
        constructor();

        /** 区域索引 */
        public index: number;

        /** s2c_huanjingzhihai_single_rank_info all_ranks. */
        public all_ranks: msg.teammate[];

        /** s2c_huanjingzhihai_single_rank_info my_rank. */
        public my_rank?: (msg.teammate|null);
    }

    /** Represents a c2s_xianmai_stage_show. */
    class c2s_xianmai_stage_show {

        /** Constructs a new c2s_xianmai_stage_show. */
        constructor();

        /** c2s_xianmai_stage_show stage. */
        public stage: number;
    }

    /** Represents a xianmai_role_data. */
    class xianmai_role_data {

        /** Constructs a new xianmai_role_data. */
        constructor();

        /** xianmai_role_data stage. */
        public stage: number;

        /** xianmai_role_data index. */
        public index: number;

        /** xianmai_role_data data. */
        public data?: (msg.teammate|null);

        /** xianmai_role_data defend_time. */
        public defend_time: number;

        /** xianmai_role_data end_time. */
        public end_time: number;

        /** xianmai_role_data hp. */
        public hp: number;
    }

    /** Represents a s2c_update_xianmai_data. */
    class s2c_update_xianmai_data {

        /** Constructs a new s2c_update_xianmai_data. */
        constructor();

        /** s2c_update_xianmai_data list. */
        public list: msg.xianmai_role_data[];
    }

    /** Represents a s2c_xianmai_stage_show. */
    class s2c_xianmai_stage_show {

        /** Constructs a new s2c_xianmai_stage_show. */
        constructor();

        /** s2c_xianmai_stage_show mvp_role. */
        public mvp_role?: (msg.teammate|null);

        /** s2c_xianmai_stage_show role_list. */
        public role_list: msg.xianmai_role_data[];

        /** s2c_xianmai_stage_show attack_time. */
        public attack_time: number;
    }

    /** Represents a c2s_xianmai_buy_time. */
    class c2s_xianmai_buy_time {

        /** Constructs a new c2s_xianmai_buy_time. */
        constructor();
    }

    /** Represents a s2c_xianmai_buy_time. */
    class s2c_xianmai_buy_time {

        /** Constructs a new s2c_xianmai_buy_time. */
        constructor();

        /** s2c_xianmai_buy_time attack_time. */
        public attack_time: number;
    }

    /** Represents a c2s_xianmai_my_show. */
    class c2s_xianmai_my_show {

        /** Constructs a new c2s_xianmai_my_show. */
        constructor();
    }

    /** Represents a s2c_xianmai_my_show. */
    class s2c_xianmai_my_show {

        /** Constructs a new s2c_xianmai_my_show. */
        constructor();

        /** s2c_xianmai_my_show my_data. */
        public my_data?: (msg.xianmai_role_data|null);

        /** s2c_xianmai_my_show penglai_score. */
        public penglai_score: number;

        /** s2c_xianmai_my_show lingshi. */
        public lingshi: number;
    }

    /** Represents a c2s_xianmai_check_other. */
    class c2s_xianmai_check_other {

        /** Constructs a new c2s_xianmai_check_other. */
        constructor();

        /** 目标角色id */
        public target_id: Long;
    }

    /** Represents a s2c_xianmai_check_other. */
    class s2c_xianmai_check_other {

        /** Constructs a new s2c_xianmai_check_other. */
        constructor();

        /** s2c_xianmai_check_other oneself. */
        public oneself?: (msg.xianmai_role_data|null);

        /** s2c_xianmai_check_other other. */
        public other?: (msg.xianmai_role_data|null);
    }

    /** Represents a c2s_xianmai_search. */
    class c2s_xianmai_search {

        /** Constructs a new c2s_xianmai_search. */
        constructor();
    }

    /** Represents a s2c_xianmai_search. */
    class s2c_xianmai_search {

        /** Constructs a new s2c_xianmai_search. */
        constructor();

        /** s2c_xianmai_search stage. */
        public stage: number;

        /** s2c_xianmai_search index. */
        public index: number;
    }

    /** Represents a c2s_xianmai_pvp_oper. */
    class c2s_xianmai_pvp_oper {

        /** Constructs a new c2s_xianmai_pvp_oper. */
        constructor();

        /** c2s_xianmai_pvp_oper type. */
        public type: number;

        /** c2s_xianmai_pvp_oper stage. */
        public stage: number;

        /** c2s_xianmai_pvp_oper index. */
        public index: number;
    }

    /** Represents a s2c_xianmai_reward_show. */
    class s2c_xianmai_reward_show {

        /** Constructs a new s2c_xianmai_reward_show. */
        constructor();

        /** s2c_xianmai_reward_show items. */
        public items: msg.prop_tips_data[];
    }

    /** Represents a c2s_xianmai_get_reward. */
    class c2s_xianmai_get_reward {

        /** Constructs a new c2s_xianmai_get_reward. */
        constructor();
    }

    /** Represents a c2s_xianmai_list_show. */
    class c2s_xianmai_list_show {

        /** Constructs a new c2s_xianmai_list_show. */
        constructor();
    }

    /** Represents a xianmai_stage_data. */
    class xianmai_stage_data {

        /** Constructs a new xianmai_stage_data. */
        constructor();

        /** xianmai_stage_data stage. */
        public stage: number;

        /** xianmai_stage_data guild_num. */
        public guild_num: number;
    }

    /** Represents a s2c_xianmai_list_show. */
    class s2c_xianmai_list_show {

        /** Constructs a new s2c_xianmai_list_show. */
        constructor();

        /** s2c_xianmai_list_show list. */
        public list: msg.xianmai_stage_data[];
    }

    /** Represents a c2s_xianmai_guild_invite. */
    class c2s_xianmai_guild_invite {

        /** Constructs a new c2s_xianmai_guild_invite. */
        constructor();
    }

    /** Represents a c2s_xianmai_zhanbao. */
    class c2s_xianmai_zhanbao {

        /** Constructs a new c2s_xianmai_zhanbao. */
        constructor();

        /** c2s_xianmai_zhanbao type. */
        public type: number;
    }

    /** Represents a xianmai_zhanbao_data. */
    class xianmai_zhanbao_data {

        /** Constructs a new xianmai_zhanbao_data. */
        constructor();

        /** xianmai_zhanbao_data first_name. */
        public first_name?: (msg.teammate|null);

        /** xianmai_zhanbao_data two_name. */
        public two_name: string;

        /** xianmai_zhanbao_data time. */
        public time: number;

        /** xianmai_zhanbao_data is_success. */
        public is_success: boolean;
    }

    /** Represents a s2c_xianmai_zhanbao. */
    class s2c_xianmai_zhanbao {

        /** Constructs a new s2c_xianmai_zhanbao. */
        constructor();

        /** s2c_xianmai_zhanbao type. */
        public type: number;

        /** s2c_xianmai_zhanbao logs. */
        public logs: msg.xianmai_zhanbao_data[];
    }

    /** Represents a c2s_xianmai_rank_show. */
    class c2s_xianmai_rank_show {

        /** Constructs a new c2s_xianmai_rank_show. */
        constructor();

        /** c2s_xianmai_rank_show type. */
        public type: number;

        /** c2s_xianmai_rank_show start_pos. */
        public start_pos: number;

        /** c2s_xianmai_rank_show end_pos. */
        public end_pos: number;
    }

    /** Represents a s2c_xianmai_rank_show. */
    class s2c_xianmai_rank_show {

        /** Constructs a new s2c_xianmai_rank_show. */
        constructor();

        /** 宗门排名(value为积分) */
        public guild_ranks: msg.teammate[];

        /** 个人排名(value为积分) */
        public person_ranks: msg.teammate[];

        /** 玩家宗门排名数据 */
        public my_guild_rank?: (msg.teammate|null);

        /** 玩家个人排名数据 */
        public my_rank?: (msg.teammate|null);
    }

    /** 仙侣斗法start/////////////////// */
    class c2s_xianlv_pvp_oper {

        /** Constructs a new c2s_xianlv_pvp_oper. */
        constructor();

        /** c2s_xianlv_pvp_oper type. */
        public type: number;
    }

    /** Represents a s2c_xianlv_pvp_base_info. */
    class s2c_xianlv_pvp_base_info {

        /** Constructs a new s2c_xianlv_pvp_base_info. */
        constructor();

        /** s2c_xianlv_pvp_base_info max_win_count. */
        public max_win_count: number;

        /** s2c_xianlv_pvp_base_info count. */
        public count: number;

        /** s2c_xianlv_pvp_base_info buy_count. */
        public buy_count: number;

        /** s2c_xianlv_pvp_base_info reward. */
        public reward: number;

        /** s2c_xianlv_pvp_base_info total_score. */
        public total_score: number;

        /** s2c_xianlv_pvp_base_info total_count. */
        public total_count: number;
    }

    /** Represents a s2c_xianlv_pvp_rank_info. */
    class s2c_xianlv_pvp_rank_info {

        /** Constructs a new s2c_xianlv_pvp_rank_info. */
        constructor();

        /** s2c_xianlv_pvp_rank_info first_info. */
        public first_info: msg.teammate[];

        /** s2c_xianlv_pvp_rank_info geren_rank. */
        public geren_rank: msg.teammate[];

        /** s2c_xianlv_pvp_rank_info my_rank. */
        public my_rank?: (msg.teammate|null);
    }

    /** Represents a c2s_xianlv_pvp_challenge. */
    class c2s_xianlv_pvp_challenge {

        /** Constructs a new c2s_xianlv_pvp_challenge. */
        constructor();

        /** c2s_xianlv_pvp_challenge type. */
        public type: number;
    }

    /** Represents a s2c_xianlv_pvp_challenge_info. */
    class s2c_xianlv_pvp_challenge_info {

        /** Constructs a new s2c_xianlv_pvp_challenge_info. */
        constructor();

        /** s2c_xianlv_pvp_challenge_info player_info. */
        public player_info: msg.teammate[];

        /** s2c_xianlv_pvp_challenge_info is_success. */
        public is_success: boolean;
    }

    /** Represents a s2c_xianlv_pvp_nianya_win. */
    class s2c_xianlv_pvp_nianya_win {

        /** Constructs a new s2c_xianlv_pvp_nianya_win. */
        constructor();

        /** s2c_xianlv_pvp_nianya_win score. */
        public score: number;

        /** s2c_xianlv_pvp_nianya_win reward. */
        public reward: msg.prop_tips_data[];
    }

    /** 跨服斗法/////////////////////////// */
    class c2s_kuafudoufa_click {

        /** Constructs a new c2s_kuafudoufa_click. */
        constructor();

        /** 1表示报名或者参与玩法  2请求宗门排行数据  3请求个人排行  4请求战场排名 5领取战场积分奖励 6切换场景攻击驻守状态 */
        public button_type: number;
    }

    /** Represents a s2c_kuafudoufa_rank_info. */
    class s2c_kuafudoufa_rank_info {

        /** Constructs a new s2c_kuafudoufa_rank_info. */
        constructor();

        /** 1宗门排行数据 2个人排行 */
        public button_type: number;

        /** s2c_kuafudoufa_rank_info all_ranks. */
        public all_ranks: msg.teammate[];

        /** s2c_kuafudoufa_rank_info my_rank. */
        public my_rank?: (msg.teammate|null);
    }

    /** Represents a kuafudoufa_zhanchang_paiming. */
    class kuafudoufa_zhanchang_paiming {

        /** Constructs a new kuafudoufa_zhanchang_paiming. */
        constructor();

        /** 玩家名 */
        public name: string;

        /** 击杀数 */
        public kill_num: number;

        /** 助攻数 */
        public help_kill_num: number;

        /** 积分 */
        public score: number;

        /** 阵营 */
        public camp: number;
    }

    /** 战场排名 */
    class s2c_kuafudoufa_zhanchang_paiming {

        /** Constructs a new s2c_kuafudoufa_zhanchang_paiming. */
        constructor();

        /** 顺序排名 */
        public rank_list: msg.kuafudoufa_zhanchang_paiming[];
    }

    /** Represents a s2c_kuafudoufa_base_info. */
    class s2c_kuafudoufa_base_info {

        /** Constructs a new s2c_kuafudoufa_base_info. */
        constructor();

        /** 剩余参与次数 */
        public count: number;

        /** 活动状态1开启报名  2关闭报名，准备开启  3副本开启  4未开启（关闭） */
        public status: number;

        /** 0未报名   1已报名 */
        public is_sgin: number;

        /** 本场活动是否参与 0未参与  1已参与 */
        public is_join: number;
    }

    /** Represents a s2c_kuafudoufa_score_info. */
    class s2c_kuafudoufa_score_info {

        /** Constructs a new s2c_kuafudoufa_score_info. */
        constructor();

        /** 个人积分 */
        public my_score: number;

        /** 红方阵营积分 */
        public red_camp_score: number;

        /** 红方阵营人数 */
        public red_camp_num: number;

        /** 蓝方阵营人数 */
        public blue_camp_num: number;

        /** 蓝方阵营积分 */
        public blue_camp_score: number;
    }

    /** Represents a s2c_kuafudoufa_zhanchang_jifen. */
    class s2c_kuafudoufa_zhanchang_jifen {

        /** Constructs a new s2c_kuafudoufa_zhanchang_jifen. */
        constructor();

        /** 已领取的积分奖励索引 */
        public ids: number[];
    }

    /** Represents a kuafudoufa_boss_info. */
    class kuafudoufa_boss_info {

        /** Constructs a new kuafudoufa_boss_info. */
        constructor();

        /** boss索引 */
        public index: Long;

        /** 血量万分比，最大10000，死亡为0 */
        public percent: number;
    }

    /** Represents a s2c_kuafudoufa_boss_info. */
    class s2c_kuafudoufa_boss_info {

        /** Constructs a new s2c_kuafudoufa_boss_info. */
        constructor();

        /** boss血量信息，变更推送支持更单个 */
        public boss_list: msg.kuafudoufa_boss_info[];
    }

    /** Represents a s2c_kuafudoufa_attack_status. */
    class s2c_kuafudoufa_attack_status {

        /** Constructs a new s2c_kuafudoufa_attack_status. */
        constructor();

        /** 场景攻击驻守状态，1攻击，2驻守，默认攻击状态 */
        public status: number;
    }

    /** 场景击杀公告 */
    class s2c_scene_kill_notice {

        /** Constructs a new s2c_scene_kill_notice. */
        constructor();

        /** s2c_scene_kill_notice kill_info. */
        public kill_info?: (msg.teammate|null);

        /** s2c_scene_kill_notice kill_num. */
        public kill_num: number;

        /** s2c_scene_kill_notice be_kill_info. */
        public be_kill_info?: (msg.teammate|null);
    }

    /** Represents a c2s_kuafudoufa_scene_use_buff. */
    class c2s_kuafudoufa_scene_use_buff {

        /** Constructs a new c2s_kuafudoufa_scene_use_buff. */
        constructor();

        /** 跨服斗法buff 配置表的索引 */
        public index: number;
    }

    /** Represents a kuafudoufa_scene_buff_index_cd. */
    class kuafudoufa_scene_buff_index_cd {

        /** Constructs a new kuafudoufa_scene_buff_index_cd. */
        constructor();

        /** 跨服斗法buff 配置表的索引 */
        public index: number;

        /** cd时间戳（没有使用的时候，默认为0） */
        public cd_time: Long;
    }

    /** Represents a s2c_kuafudoufa_scene_buff_index_cd. */
    class s2c_kuafudoufa_scene_buff_index_cd {

        /** Constructs a new s2c_kuafudoufa_scene_buff_index_cd. */
        constructor();

        /** 1全部更新    2单个更新 */
        public oper: number;

        /** 索引cd时间 */
        public idx_cds: msg.kuafudoufa_scene_buff_index_cd[];
    }

    /** Represents a huanjin_star_data. */
    class huanjin_star_data {

        /** Constructs a new huanjin_star_data. */
        constructor();

        /** huanjin_star_data pos. */
        public pos: number;

        /** huanjin_star_data star. */
        public star: number;
    }

    /** Represents a huanjin_skill_data. */
    class huanjin_skill_data {

        /** Constructs a new huanjin_skill_data. */
        constructor();

        /** huanjin_skill_data pos. */
        public pos: number;

        /** huanjin_skill_data skill_id. */
        public skill_id: number;
    }

    /** Represents a huanjin_huanling_data. */
    class huanjin_huanling_data {

        /** Constructs a new huanjin_huanling_data. */
        constructor();

        /** huanjin_huanling_data type. */
        public type: number;

        /** huanjin_huanling_data stage. */
        public stage: number;

        /** huanjin_huanling_data skill_list. */
        public skill_list: msg.huanjin_skill_data[];
    }

    /** Represents a s2c_update_huanjin_info. */
    class s2c_update_huanjin_info {

        /** Constructs a new s2c_update_huanjin_info. */
        constructor();

        /** s2c_update_huanjin_info system_id. */
        public system_id: number;

        /** s2c_update_huanjin_info jilian_level. */
        public jilian_level: number;

        /** s2c_update_huanjin_info tianxing_level. */
        public tianxing_level: number;

        /** s2c_update_huanjin_info star_list. */
        public star_list: msg.huanjin_star_data[];

        /** s2c_update_huanjin_info huanling_list. */
        public huanling_list: msg.huanjin_huanling_data[];

        /** s2c_update_huanjin_info zushen_list. */
        public zushen_list: msg.huanjin_star_data[];
    }

    /** Represents a c2s_huanjin_oper. */
    class c2s_huanjin_oper {

        /** Constructs a new c2s_huanjin_oper. */
        constructor();

        /** c2s_huanjin_oper system_id. */
        public system_id: number;

        /** c2s_huanjin_oper oper. */
        public oper: number;

        /** c2s_huanjin_oper pos. */
        public pos: number;

        /** c2s_huanjin_oper place. */
        public place: number;
    }

    /** Represents a s2c_huanjin_attr_update. */
    class s2c_huanjin_attr_update {

        /** Constructs a new s2c_huanjin_attr_update. */
        constructor();

        /** s2c_huanjin_attr_update system_id. */
        public system_id: number;

        /** s2c_huanjin_attr_update value. */
        public value: number;
    }

    /** 浮尘灵壶start/////////////////// */
    class c2s_linghu_oper {

        /** Constructs a new c2s_linghu_oper. */
        constructor();

        /** 1召唤（1单抽 2十连 3百连） 2切换卡池（类型） 3许愿（索引） 4特殊卡池召唤 5赠礼奖励 6宝藏奖励 7累充奖励 8礼包 9请求信息 */
        public oper: number;

        /** c2s_linghu_oper param. */
        public param: number;

        /** oper==6使用 1领取免费档 2领取付费 */
        public ex_param: number;
    }

    /** Represents a buy_gift_data. */
    class buy_gift_data {

        /** Constructs a new buy_gift_data. */
        constructor();

        /** buy_gift_data index. */
        public index: number;

        /** 已购买次数 */
        public count: number;
    }

    /** Represents a s2c_linghu_info. */
    class s2c_linghu_info {

        /** Constructs a new s2c_linghu_info. */
        constructor();

        /** 当前up的index，参数表第几个 */
        public up: number;

        /** 当前卡池类型, 1仙界之海 2神界之海 3圣界之海 */
        public type: number;

        /** 当前卡池召唤次数 */
        public count: number;

        /** 周期累计召唤次数 */
        public total_count: number;

        /** 已领取的幻境赠礼index */
        public zengli_data: number[];

        /** 已领取的免费档宝藏index */
        public free_baozang_data: number[];

        /** 已领取的付费档宝藏index */
        public buy_baozang_data: number[];

        /** 已领取的累充index */
        public leichong_data: number[];

        /** 已领取的礼包 */
        public gift_data: msg.buy_gift_data[];

        /** 累计召唤次数，不重置 */
        public forever_count: number;
    }

    /** 入口 */
    class c2s_guild_pk_root {

        /** Constructs a new c2s_guild_pk_root. */
        constructor();
    }

    /** Represents a guild_pk_end_data. */
    class guild_pk_end_data {

        /** Constructs a new guild_pk_end_data. */
        constructor();

        /** 对方宗门名称 */
        public target_guild_name: string;

        /** true成功 */
        public is_success: boolean;
    }

    /** 入口返回 */
    class s2c_guild_pk_root {

        /** Constructs a new s2c_guild_pk_root. */
        constructor();

        /** true参加 */
        public is_join: boolean;

        /** 1.可领取2.已领取(胜败奖励) */
        public status: number;

        /** 1.成功2.失败(战斗结果) */
        public ret: number;

        /** 是否你宗门在本次参加 */
        public is_guild_join: boolean;

        /** 结果信息 */
        public end_data?: (msg.guild_pk_end_data|null);
    }

    /** 请求队伍主界面 */
    class c2s_guild_pk_team_show {

        /** Constructs a new c2s_guild_pk_team_show. */
        constructor();

        /** 1.本方2.敌方 */
        public type: number;
    }

    /** Represents a guild_pk_base. */
    class guild_pk_base {

        /** Constructs a new guild_pk_base. */
        constructor();

        /** 服务器id */
        public server_id: number;

        /** 宗门名称 */
        public guild_name: string;

        /** 宗门人数 */
        public num: number;

        /** 宗门等级 */
        public level: number;

        /** 百分比血量 */
        public hp: number;
    }

    /** Represents a guild_pk_team_data. */
    class guild_pk_team_data {

        /** Constructs a new guild_pk_team_data. */
        constructor();

        /** 队伍编号 */
        public team_index: number;

        /** 队伍成员数据 */
        public list: msg.teammate[];
    }

    /** 请求队伍主界面返回 */
    class s2c_guild_pk_team_show {

        /** Constructs a new s2c_guild_pk_team_show. */
        constructor();

        /** 1.本方2.敌方 */
        public type: number;

        /** 本方宗门的基础数据 */
        public my_base?: (msg.guild_pk_base|null);

        /** 敌方宗门的基础数据 */
        public target_base?: (msg.guild_pk_base|null);

        /** 1.可领取2.已领取(胜败奖励) */
        public status: number;

        /** 1.成功2.失败(战斗结果) */
        public ret: number;

        /** 成员只给每个队伍前四个位置 */
        public team_list: msg.guild_pk_team_data[];
    }

    /** 滑动队伍界面的队伍数据 */
    class c2s_guild_pk_team_slide {

        /** Constructs a new c2s_guild_pk_team_slide. */
        constructor();

        /** 1.本方2.敌方 */
        public type: number;

        /** 起始位置 */
        public start_pos: number;

        /** 终点位置 */
        public end_pos: number;
    }

    /** 滑动队伍界面的队伍数据 返回 */
    class s2c_guild_pk_team_slide {

        /** Constructs a new s2c_guild_pk_team_slide. */
        constructor();

        /** 1.本方2.敌方 */
        public type: number;

        /** s2c_guild_pk_team_slide team_list. */
        public team_list: msg.guild_pk_team_data[];
    }

    /** 阵型成员数据 */
    class guild_pk_lineup_member {

        /** Constructs a new guild_pk_lineup_member. */
        constructor();

        /** 服务器id */
        public server_id: number;

        /** 成员名称 */
        public name: string;

        /** 成员战力 */
        public power: Long;

        /** 所在宗门的职位 */
        public guild_job: number;

        /** 玩家id */
        public role_id: Long;
    }

    /** 阵型基本数据 */
    class guild_pk_lineup_base {

        /** Constructs a new guild_pk_lineup_base. */
        constructor();

        /** 队伍编号 */
        public team_index: number;

        /** 成员列表 */
        public members: msg.guild_pk_lineup_member[];
    }

    /** 请求调整阵型主界面 */
    class c2s_guild_pk_lineup_show {

        /** Constructs a new c2s_guild_pk_lineup_show. */
        constructor();
    }

    /** 调整阵型主界面显示 返回 */
    class s2c_guild_pk_lineup_show {

        /** Constructs a new s2c_guild_pk_lineup_show. */
        constructor();

        /** s2c_guild_pk_lineup_show team_list. */
        public team_list: msg.guild_pk_lineup_base[];
    }

    /** Represents a guild_pk_zhanbao. */
    class guild_pk_zhanbao {

        /** Constructs a new guild_pk_zhanbao. */
        constructor();

        /** 本方人数 */
        public my_num: number;

        /** 目标人数 */
        public target_num: number;

        /** 目标服务器id */
        public target_server_id: number;

        /** 目标仙宗名称 */
        public target_name: string;

        /** 日期 */
        public time: number;

        /** true成功 */
        public ret: boolean;

        /** 我的宗门名称 */
        public my_guild_name: string;
    }

    /** 请求战报 */
    class c2s_guild_pk_zhanbao {

        /** Constructs a new c2s_guild_pk_zhanbao. */
        constructor();
    }

    /** 请求战报返回 */
    class s2c_guild_pk_zhanbao {

        /** Constructs a new s2c_guild_pk_zhanbao. */
        constructor();

        /** s2c_guild_pk_zhanbao list. */
        public list: msg.guild_pk_zhanbao[];
    }

    /** 操作 */
    class c2s_guild_pk_oper {

        /** Constructs a new c2s_guild_pk_oper. */
        constructor();

        /** 1.报名2.加入队伍3.调整位置4.领取奖励(胜败奖励)5.领取观战奖励6.进入战斗场景7.退出场景 */
        public oper: number;

        /** 2 */
        public index: number;

        /** 玩家id oper3时需要 */
        public start_id: Long;

        /** 玩家id oper3时需要 */
        public end_id: Long;
    }

    /** 操作返回 */
    class s2c_guild_pk_oper {

        /** Constructs a new s2c_guild_pk_oper. */
        constructor();

        /** 1.报名2.加入队伍3.调整位置4.领取奖励(胜败奖励)5.领取观战奖励7.退出场景 */
        public oper: number;

        /** oper为3就读这个字段 */
        public lineup_list?: (msg.guild_pk_lineup_base|null);

        /** 1.可领取2.已领取：oper为4和5 */
        public status: number;
    }

    /** Represents a guild_pk_scene_data. */
    class guild_pk_scene_data {

        /** Constructs a new guild_pk_scene_data. */
        constructor();

        /** 队伍编号 */
        public team_index: number;

        /** 本方第一个对战玩家(value为血量百分比) */
        public role?: (msg.teammate|null);

        /** 目标第一个对战玩家(value为血量百分比) */
        public target?: (msg.teammate|null);
    }

    /** 技能信息 */
    class guild_pk_skill {

        /** Constructs a new guild_pk_skill. */
        constructor();

        /** 配置表的技能索引 */
        public skill_id: number;

        /** CD时间戳 */
        public time: number;
    }

    /** 进入场景 */
    class s2c_guild_pk_enter {

        /** Constructs a new s2c_guild_pk_enter. */
        constructor();

        /** 本方宗门的基础数据 */
        public my_base?: (msg.guild_pk_base|null);

        /** 敌方宗门的基础数据 */
        public target_base?: (msg.guild_pk_base|null);

        /** 对战角色信息 */
        public list: msg.guild_pk_scene_data[];

        /** 技能信息 */
        public skill_cd_list: msg.guild_pk_skill[];

        /** 观战奖励状态:0未达成1可领取2已领取 */
        public reward_status: number;

        /** 观战可领取的次数 */
        public reward_num: number;
    }

    /** 更新观战奖励信息 */
    class s2c_guild_pk_update_reward {

        /** Constructs a new s2c_guild_pk_update_reward. */
        constructor();

        /** 观战奖励状态:0未达成1可领取2已领取 */
        public reward_status: number;

        /** 观战可领取的次数 */
        public reward_num: number;
    }

    /** Represents a guild_pk_buff_data. */
    class guild_pk_buff_data {

        /** Constructs a new guild_pk_buff_data. */
        constructor();

        /** 1.本方2.敌方 : 目标是仙兽情况下才有值 */
        public type: number;

        /** 对该目标造成的效果 */
        public target_id: Long;

        /** buff产出的数值 */
        public value: Long;

        /** 血量百分比 */
        public hp: number;
    }

    /** 死亡信息 */
    class guild_pk_dead_data {

        /** Constructs a new guild_pk_dead_data. */
        constructor();

        /** 死亡的角色id */
        public dead_id: Long;

        /** 补位的角色 */
        public supply_data?: (msg.teammate|null);
    }

    /** 使用技能 */
    class c2s_guild_pk_use_skill {

        /** Constructs a new c2s_guild_pk_use_skill. */
        constructor();

        /** 技能索引 */
        public skill_id: number;
    }

    /** 使用技能 返回 */
    class s2c_guild_pk_use_skill {

        /** Constructs a new s2c_guild_pk_use_skill. */
        constructor();

        /** 技能索引 */
        public skill_id: number;

        /** 技能cd时间戳 */
        public cd_time: number;
    }

    /** 更新技能buff对场景角色的影响 */
    class s2c_guild_pk_update_buff {

        /** Constructs a new s2c_guild_pk_update_buff. */
        constructor();

        /** 技能类型:只有1和2技能才会出现buff。type为空表示为普通攻击效果 */
        public type: number;

        /** 附加目标的列表 */
        public list: msg.guild_pk_buff_data[];

        /** 死亡列表 */
        public dead_list: msg.guild_pk_dead_data[];
    }

    /** 战斗详情 */
    class c2s_guild_pk_fight_show {

        /** Constructs a new c2s_guild_pk_fight_show. */
        constructor();

        /** 队伍编号 */
        public team_index: number;
    }

    /** 阵型成员数据 */
    class guild_pk_details {

        /** Constructs a new guild_pk_details. */
        constructor();

        /** 服务器id */
        public server_id: number;

        /** 成员名称 */
        public name: string;

        /** 成员战力 */
        public power: Long;

        /** 疲劳等级 */
        public buff_lv: number;

        /** true死亡 */
        public is_dead: boolean;
    }

    /** 战斗详情 返回 */
    class s2c_guild_pk_fight_show {

        /** Constructs a new s2c_guild_pk_fight_show. */
        constructor();

        /** 队伍编号 */
        public team_index: number;

        /** s2c_guild_pk_fight_show my_list. */
        public my_list: msg.guild_pk_details[];

        /** s2c_guild_pk_fight_show enemy_list. */
        public enemy_list: msg.guild_pk_details[];
    }

    /** 击杀信息 */
    class guild_pk_finally {

        /** Constructs a new guild_pk_finally. */
        constructor();

        /** guild_pk_finally server_id. */
        public server_id: number;

        /** 玩家名称 */
        public name: string;

        /** 击杀人数 */
        public kill_num: number;

        /** 1.本方2.敌方 */
        public type: number;
    }

    /** 战斗结束 */
    class s2c_guild_pk_ret {

        /** Constructs a new s2c_guild_pk_ret. */
        constructor();

        /** true我方赢 */
        public is_win: boolean;

        /** s2c_guild_pk_ret list. */
        public list: msg.guild_pk_finally[];
    }

    /** 仙界乱斗start//////////////////// */
    class c2s_xianjie_pvp_oper {

        /** Constructs a new c2s_xianjie_pvp_oper. */
        constructor();

        /** 5发送宗门邀请 6获取战场战报(s2c_xianjie_pvp_battle_report) */
        public type: number;

        /** c2s_xianjie_pvp_oper param. */
        public param: number;
    }

    /** Represents a s2c_xianjie_pvp_base_info. */
    class s2c_xianjie_pvp_base_info {

        /** Constructs a new s2c_xianjie_pvp_base_info. */
        constructor();

        /** 副本状态 1开启 2关闭 3冷却时间未到 */
        public state: number;

        /** 剩余cd时间 */
        public cd_sec: number;

        /** 是否首次开启 1是 2否 */
        public is_first_open: number;
    }

    /** Represents a s2c_xianjie_pvp_rank_info. */
    class s2c_xianjie_pvp_rank_info {

        /** Constructs a new s2c_xianjie_pvp_rank_info. */
        constructor();

        /** 1活动上期排名 2活动本期排名 */
        public type: number;

        /** 全排名 */
        public rank: msg.teammate[];

        /** 玩家排名 */
        public my_rank?: (msg.teammate|null);
    }

    /** Represents a s2c_xianjie_pvp_scene_rank_info. */
    class s2c_xianjie_pvp_scene_rank_info {

        /** Constructs a new s2c_xianjie_pvp_scene_rank_info. */
        constructor();

        /** 1个人 2宗门 */
        public type: number;

        /** 榜单顺序排名 */
        public rank: msg.xianjie_pvp_scene_score_info[];

        /** 玩家排名 */
        public my_rank?: (msg.xianjie_pvp_scene_score_info|null);
    }

    /** Represents a xianjie_pvp_scene_score_info. */
    class xianjie_pvp_scene_score_info {

        /** Constructs a new xianjie_pvp_scene_score_info. */
        constructor();

        /** 玩家名字 */
        public name: string;

        /** 宗门名字 */
        public guild_name: string;

        /** 击杀数 */
        public kill: number;

        /** 助攻数 */
        public help_kill: number;

        /** 积分 */
        public score: number;

        /** 宗门id */
        public guild_id: number;

        /** 排名 */
        public rank_num: number;
    }

    /** 已领取的积分奖励列表 */
    class s2c_xianjie_pvp_score_reward {

        /** Constructs a new s2c_xianjie_pvp_score_reward. */
        constructor();

        /** s2c_xianjie_pvp_score_reward index. */
        public index: number[];
    }

    /** Represents a c2s_xianjie_pvp_scene_use_buff. */
    class c2s_xianjie_pvp_scene_use_buff {

        /** Constructs a new c2s_xianjie_pvp_scene_use_buff. */
        constructor();

        /** 仙界乱斗配置index */
        public index: number;
    }

    /** Represents a s2c_xianjie_pvp_boss_info. */
    class s2c_xianjie_pvp_boss_info {

        /** Constructs a new s2c_xianjie_pvp_boss_info. */
        constructor();

        /** boss血量信息 */
        public boss_list: msg.xianjie_pvp_boss_info[];

        /** 中央灵石boss归属者信息 */
        public owner_info?: (msg.teammate|null);

        /** 1更新owner_info 空则不更新owner_info */
        public is_update: number;
    }

    /** Represents a xianjie_pvp_boss_info. */
    class xianjie_pvp_boss_info {

        /** Constructs a new xianjie_pvp_boss_info. */
        constructor();

        /** bossid */
        public index: Long;

        /** 血量万分比，最大10000，死亡为0 */
        public percent: number;

        /** 场景实体id */
        public entity_id: Long;
    }

    /** Represents a xianjie_pvp_battle_report. */
    class xianjie_pvp_battle_report {

        /** Constructs a new xianjie_pvp_battle_report. */
        constructor();

        /** bossid */
        public boss_id: Long;

        /** 归属者名字 */
        public kill_name: string;
    }

    /** boss击杀归属战报 */
    class s2c_xianjie_pvp_battle_report {

        /** Constructs a new s2c_xianjie_pvp_battle_report. */
        constructor();

        /** 战报 */
        public report_list: msg.xianjie_pvp_battle_report[];
    }

    /** 击破灵石提示 */
    class s2c_xianjie_pvp_kill_boss_info {

        /** Constructs a new s2c_xianjie_pvp_kill_boss_info. */
        constructor();

        /** s2c_xianjie_pvp_kill_boss_info guild_name. */
        public guild_name: string;

        /** s2c_xianjie_pvp_kill_boss_info guild_id. */
        public guild_id: number;

        /** s2c_xianjie_pvp_kill_boss_info boss_id. */
        public boss_id: Long;
    }

    /** Represents a s2c_xianjie_pvp_scene_info. */
    class s2c_xianjie_pvp_scene_info {

        /** Constructs a new s2c_xianjie_pvp_scene_info. */
        constructor();

        /** 玩家的宗门参与人数 */
        public guild_count: number;

        /** 宗门获得的积分 */
        public guild_score: number;

        /** 玩家获得的积分 */
        public my_score: number;

        /** 夺得的灵石数 */
        public boss_kill_count: number;
    }

    /** Represents a xianjie_luandou_scene_buff_index_cd. */
    class xianjie_luandou_scene_buff_index_cd {

        /** Constructs a new xianjie_luandou_scene_buff_index_cd. */
        constructor();

        /** 跨服斗法buff 配置表的索引 */
        public index: number;

        /** cd时间戳（没有使用的时候，默认为0） */
        public cd_time: Long;
    }

    /** Represents a s2c_xianjie_luandou_scene_buff_index_cd. */
    class s2c_xianjie_luandou_scene_buff_index_cd {

        /** Constructs a new s2c_xianjie_luandou_scene_buff_index_cd. */
        constructor();

        /** 1全部更新    2单个更新 */
        public oper: number;

        /** 索引cd时间 */
        public idx_cds: msg.xianjie_luandou_scene_buff_index_cd[];
    }

    /** Represents a xianwei_place_data. */
    class xianwei_place_data {

        /** Constructs a new xianwei_place_data. */
        constructor();

        /** 层 */
        public stage: number;

        /** 层下面的索引 */
        public index: number;

        /** 积分 */
        public score: number;

        /** 历练币 */
        public coin: number;

        /** 攻击时间 */
        public attack_time: number;

        /** 开始占领时间戳 */
        public start_time: number;

        /** 结束占领时间戳 */
        public end_time: number;
    }

    /** Represents a xianwei_common_log_data. */
    class xianwei_common_log_data {

        /** Constructs a new xianwei_common_log_data. */
        constructor();

        /** 成功人的名称 */
        public win_name: string;

        /** 失败人的名称 */
        public lose_name: string;

        /** 层 */
        public stage: number;

        /** 层下面的索引 */
        public index: number;
    }

    /** Represents a xianwei_reward_data. */
    class xianwei_reward_data {

        /** Constructs a new xianwei_reward_data. */
        constructor();

        /** xianwei_reward_data items. */
        public items: msg.prop_tips_data[];

        /** 占领的时间 */
        public time: number;
    }

    /** 主界面显示 */
    class c2s_xianwei_root_show {

        /** Constructs a new c2s_xianwei_root_show. */
        constructor();
    }

    /** Represents a xianwei_member_data. */
    class xianwei_member_data {

        /** Constructs a new xianwei_member_data. */
        constructor();

        /** xianwei_member_data data. */
        public data?: (msg.teammate|null);

        /** 层 */
        public stage: number;

        /** 部门 */
        public index: number;

        /** 部门下面位置 */
        public pos: number;

        /** 开始占领时间戳 */
        public start_time: number;

        /** 结束占领时间戳 */
        public end_time: number;
    }

    /** 主界面显示 返回 */
    class s2c_xianwei_root_show {

        /** Constructs a new s2c_xianwei_root_show. */
        constructor();

        /** 只给前面三位 */
        public list: msg.xianwei_member_data[];

        /** 公共战报列表 */
        public log_list: msg.xianwei_common_log_data[];

        /** 我的位置信息 */
        public my_place?: (msg.xianwei_place_data|null);

        /** 奖励数据 */
        public reward_data?: (msg.xianwei_reward_data|null);
    }

    /** 请求部门下面信息 */
    class c2s_xianwei_branch_show {

        /** Constructs a new c2s_xianwei_branch_show. */
        constructor();

        /** 层 */
        public stage: number;

        /** 层下面的索引 */
        public index: number;
    }

    /** 请求部门下面信息 返回 */
    class s2c_xianwei_branch_show {

        /** Constructs a new s2c_xianwei_branch_show. */
        constructor();

        /** s2c_xianwei_branch_show list. */
        public list: msg.xianwei_member_data[];
    }

    /** 请求战报 */
    class c2s_xianwei_zhanbao_show {

        /** Constructs a new c2s_xianwei_zhanbao_show. */
        constructor();
    }

    /** Represents a xianwei_log_data. */
    class xianwei_log_data {

        /** Constructs a new xianwei_log_data. */
        constructor();

        /** 对方信息 */
        public target?: (msg.teammate|null);

        /** 1.我是发起方2.对方是发起方 */
        public act: number;

        /** 层 */
        public stage: number;

        /** 层下面的索引 */
        public index: number;

        /** true成功 相对于自己的结果 */
        public is_success: boolean;
    }

    /** 请求战报 返回 */
    class s2c_xianwei_zhanbao_show {

        /** Constructs a new s2c_xianwei_zhanbao_show. */
        constructor();

        /** s2c_xianwei_zhanbao_show list. */
        public list: msg.xianwei_log_data[];
    }

    /** 请求排行榜 */
    class c2s_xianwei_rank_show {

        /** Constructs a new c2s_xianwei_rank_show. */
        constructor();
    }

    /** 请求排行榜 返回 */
    class s2c_xianwei_rank_show {

        /** Constructs a new s2c_xianwei_rank_show. */
        constructor();

        /** (value为积分) */
        public ranks: msg.teammate[];

        /** 玩家个人排名数据 */
        public my_rank?: (msg.teammate|null);
    }

    /** 购买重置冷却时间 */
    class c2s_xianwei_buy_time {

        /** Constructs a new c2s_xianwei_buy_time. */
        constructor();
    }

    /** 购买重置冷却时间 返回 */
    class s2c_xianwei_buy_time {

        /** Constructs a new s2c_xianwei_buy_time. */
        constructor();

        /** s2c_xianwei_buy_time attack_time. */
        public attack_time: number;
    }

    /** 挑战对方 */
    class c2s_xianwei_challenge {

        /** Constructs a new c2s_xianwei_challenge. */
        constructor();

        /** 层 */
        public stage: number;

        /** 层下面的索引 */
        public index: number;

        /** 位置 */
        public pos: number;
    }

    /** 荣耀系统start///////////////////////// */
    class c2s_honour_get_info {

        /** Constructs a new c2s_honour_get_info. */
        constructor();

        /** honour配置表大类 */
        public type: number;
    }

    /** Represents an honour_info. */
    class honour_info {

        /** Constructs a new honour_info. */
        constructor();

        /** 已领取次数 */
        public count: number;

        /** 第一个领取的玩家信息 value为领取时间戳 */
        public owner_info?: (msg.teammate|null);

        /** 是否已领完 1是 2否 */
        public is_finish: number;

        /** honour配置表index */
        public index: number;
    }

    /** Represents an honour_reward_info. */
    class honour_reward_info {

        /** Constructs a new honour_reward_info. */
        constructor();

        /** honour配置表大类 */
        public type: number;

        /** honour_reward_info info. */
        public info: msg.honour_info[];
    }

    /** Represents a s2c_honour_get_reward. */
    class s2c_honour_get_reward {

        /** Constructs a new s2c_honour_get_reward. */
        constructor();

        /** s2c_honour_get_reward info. */
        public info: msg.honour_reward_info[];
    }

    /** 九幽挑战 */
    class c2s_activity_jiuyou_tiaozhan {

        /** Constructs a new c2s_activity_jiuyou_tiaozhan. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 1召唤 2挑战 3领取奖励 4查看伤害排行(s2c_activity_jiuyou_boss_rank) 5购买挑战次数 */
        public oper_type: number;

        /** c2s_activity_jiuyou_tiaozhan param. */
        public param: number;
    }

    /** Represents an activity_jiuyou_boss_info. */
    class activity_jiuyou_boss_info {

        /** Constructs a new activity_jiuyou_boss_info. */
        constructor();

        /** activity_jiuyou_boss_info index. */
        public index: number;

        /** 召唤者名字 */
        public role_name: string;

        /** 血量万分比 */
        public hp_percent: number;

        /** boss阶数 */
        public boss_num: number;

        /** bossId */
        public boss_id: number;
    }

    /** Represents a s2c_activity_jiuyou_tiaozhan. */
    class s2c_activity_jiuyou_tiaozhan {

        /** Constructs a new s2c_activity_jiuyou_tiaozhan. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 已购买的次数 */
        public buy_count: number;

        /** 可挑战次数 */
        public count: number;

        /** 存活的boss信息 */
        public boss_info: msg.activity_jiuyou_boss_info[];

        /** 可领取的boss奖励 */
        public reward: number[];

        /** 下次恢复次数时间戳 */
        public next_time: number;
    }

    /** Represents a s2c_activity_jiuyou_boss_rank. */
    class s2c_activity_jiuyou_boss_rank {

        /** Constructs a new s2c_activity_jiuyou_boss_rank. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 全排名 */
        public ranks: msg.teammate[];

        /** 玩家排名 */
        public my_rank?: (msg.teammate|null);
    }

    /** 九幽排行 */
    class c2s_activity_jiuyou_rank {

        /** Constructs a new c2s_activity_jiuyou_rank. */
        constructor();

        /** 活动id */
        public act_id: number;
    }

    /** Represents a s2c_activity_jiuyou_rank. */
    class s2c_activity_jiuyou_rank {

        /** Constructs a new s2c_activity_jiuyou_rank. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 全排名 */
        public ranks: msg.teammate[];

        /** 玩家排名 */
        public my_rank?: (msg.teammate|null);
    }

    /** Represents a c2s_activity_jiuyou_duihuan. */
    class c2s_activity_jiuyou_duihuan {

        /** Constructs a new c2s_activity_jiuyou_duihuan. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 商品index 999为领取大奖 */
        public index: number;

        /** 购买次数 */
        public count: number;
    }

    /** Represents a goods_info. */
    class goods_info {

        /** Constructs a new goods_info. */
        constructor();

        /** 商品index */
        public index: number;

        /** 已购买次数 */
        public count: number;
    }

    /** Represents a s2c_activity_jiuyou_duihuan. */
    class s2c_activity_jiuyou_duihuan {

        /** Constructs a new s2c_activity_jiuyou_duihuan. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 当前奖励层数 */
        public reward_num: number;

        /** 已购买商品信息 */
        public info: msg.goods_info[];

        /** 当前已领取的大奖层数 */
        public reward_info: number;
    }

    /** 九幽战令 一键领取奖励 */
    class c2s_activity_jiuyou_zhanling {

        /** Constructs a new c2s_activity_jiuyou_zhanling. */
        constructor();

        /** 活动id */
        public act_id: number;
    }

    /** Represents a s2c_activity_jiuyou_zhanling. */
    class s2c_activity_jiuyou_zhanling {

        /** Constructs a new s2c_activity_jiuyou_zhanling. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 已领取的免费奖励index */
        public index1: number;

        /** 已领取的付费奖励index */
        public index2: number;

        /** 战令状态 1购买 2未购买 */
        public is_buy: number;
    }

    /** 九幽礼包 */
    class c2s_activity_jiuyou_gift {

        /** Constructs a new c2s_activity_jiuyou_gift. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 礼包index */
        public index: number;
    }

    /** Represents a jiuyou_gift. */
    class jiuyou_gift {

        /** Constructs a new jiuyou_gift. */
        constructor();

        /** 礼包index */
        public index: number;

        /** 已购买次数 */
        public count: number;
    }

    /** Represents a s2c_activity_jiuyou_gift. */
    class s2c_activity_jiuyou_gift {

        /** Constructs a new s2c_activity_jiuyou_gift. */
        constructor();

        /** 活动id */
        public act_id: number;

        /** 已购买的礼包 */
        public info: msg.jiuyou_gift[];
    }
}