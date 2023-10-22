namespace game {

    import Monster1Config = game.config.Monster1Config;
    import LanDef = game.localization.LanDef;

    export const enum SceneEvent {
        //场景相关
        INIT_SCENE_MDR = "init_scene_mdr",
        CLEAN_SCENE = "clean_scene",
        LOAD_SCENE_CFG = "load_scene_cfg",
        SCENE_CFG_LOADED = "scene_cfg_loaded",
        SCENE_BLUR_LOADED = "scene_blur_loaded",
        ON_SCENE_READY = "on_scene_ready",
        ON_SCENE_ENTER = "on_scene_enter",
        SCENE_CHANGE = "scene_change",
        ON_SCENE_CLICK = "on_scene_click",
        //实体相关
        ON_OBJ_ADD = "on_display_add",
        ON_OBJ_DEL = "on_display_del",
        ON_OBJ_UPDATE = "on_display_update",
        ON_OBJ_MOVE = "on_obj_move",
        ON_MAIN_PLAYER_MOVE = "on_main_player_move",
        /** 重置玩家位置*/
        ON_RESET_PLAYER_PT = "on_reset_player_pt",
        ON_OBJ_USE_SKILL = "on_obj_use_skill",
        /**玩家遥杆控制*/
        ON_CONTROL_MAIN_PLAYER_MOVE = "on_control_main_player_move",
        ON_MAIN_MOVE = "on_main_move",
        ON_REQUEST_MONSTER = "on_request_monster",
        ON_FIND_MONSTER = "on_find_monster",
        //PLAYER_GOD_SKILL_FLUS = "player_god_skill_flus",
        /** 设置是否挂机 */
        SET_HANG_UP = "set_hang_up",

        ON_AUTO_HANG_UP_UPDATE = "on_auto_hang_up_update",
        /** 点击技能 */
        ON_TAP_SKILL = "on_tap_skill",

        ON_BOSS_HP = "on_boss_hp",
        ON_BOSS_HP_FILTER = "on_boss_hp_filter",//通用boss血条过滤不展示时抛出此事件

        ON_NPC_HP = "on_npc_hp",

        ON_NPC_CAMP = "on_npc_camp",

        ON_BUFF_UPDATE = "on_buff_update",

        //ON_MAIN_PLAYER_BE_ATK = "on_main_player_be_atk",

        ON_MAIN_PLAYER_BE_MONSTER_ATK = "on_main_player_be_monster_atk",

        ON_SKILL_BUFF = "on_skill_buff",
        /**DBG调试*/
        ON_SCENE_DEBUG_MOVE = "ON_SCENE_DEBUG_MOVE",
        /**角色死亡*/
        ON_ROLE_DIE = "on_role_die",
        /**角色复活*/
        ON_ROLE_RELIVE = "on_role_relive",
        /** 移除客户端NPC */
        ON_DEL_CLIENT_NPC = "on_del_client_npc",
        /** 添加客户端NPC */
        ON_ADD_CLIENT_NPC = "on_add_client_npc",
        /** 删除场景所有客户端NPC */
        ON_CLEAR_CLIENT_NPC = "on_clear_all_client_npc",
        /** 添加客户端AI */
        ON_ADD_PLAYER_AI = "on_add_player_ai",
        /** 震屏效果 */
        ON_SCENE_SHAKE = "on_scene_shake",

        /** 引导客户端去到scene_index的地图 找到entity_id或者走到x,y */
        ON_SERVER_GUIDE_MOVE = "on_server_guide_move",
        ON_CLEAN_GUIDE_MOVE = "on_clean_guide_move",

        /** 技能飘字 */
        ON_SKILL_TEXT_SHOW = "on_skill_text_show",
        ON_SKILL_TEXT_SHOW2 = "on_skill_text_show2",
        ON_SKILL_BUF_SHOW = "on_skill_buf_show",

        /**测试贝塞尔曲线运动*/
        BEZAIER_START_MOVE = "bezaier_start_move",

        /**************新加的事件****************/
        FUBEN_CONTINUE_BATTLE = "fuben_continue_battle",//副本继续挑战时候会派发
        ON_SCENE_RANK_UPDATE = "on_scene_rank_update",//场景伤害排行榜更新，会携带排行榜数据：SceneRankData
        ON_SCENE_BELONG_UPDATE = "on_scene_belong_update",//场景归属者更新，会携带数据：teammate
        ON_SCENE_MAX_HURT_UPDATE = "on_scene_max_hurt_update",//最高伤害攻击者更新，会携带数据：teammate
        FOE_TARGET_CHANGE = "foe_target_change",//敌人目标变更
        PVP_ENTER_END = "pvp_enter_end",//pvp进场动画结束
        BIG_BOSS_HP_HIDE = "big_boss_hp_hide",//boss血量隐藏时发送
        ON_SCENE_DAMAGE_UPDATE = "on_scene_damage_update",//场景伤害更新，会携带伤害数据
    }

    /**寻找类型*/
    export const enum FindType {
        FIXATION = 0,
        FIND = 1,
    }

    /**场景类型*/
    export const enum SceneType {
        HangUp2 = 106,//主线挂机 */
        JiYuan = 107,//机缘 */
        Fuben = 108,//个人副本*/
        Forbidden = 109,//禁地副本*/
        Xianta = 110,//仙塔副本*/
        Yuanling = 111,//元灵副本*/
        ManyBoss = 113,//多人boss*/
        PersonalBoss = 114,//个人boss*/
        CrossBoss = 115,//跨服boss*/
        Doufa = 117,//斗法*/
        //招财仙副本 118
        Yjjs = 119,//瑶姬降世 119
        Yijie = 120,//异界
        YonghengYijie = 121,//永恒异界
        XianlvShilian = 122,//仙侣试炼
        Friend = 123,//好友切磋
        Abyss = 124,//坠魔深渊
        Fengmo = 125,//仙宗封魔
        Sea = 126,//幻境之海
        XianlvDoufa = 128,//仙侣斗法
        KuafuDoufa = 129,//跨服斗法
        XianjieLuandou = 130,//仙界乱斗
    }

    /**不显示玩家复活提示的场景*/
    export const NotShowRoleRevive: number[] = [SceneType.KuafuDoufa, SceneType.XianjieLuandou];

    /**特殊场景退出提示文本*/
    export const SceneExitTips = {
        [SceneType.XianjieLuandou]: LanDef.xianjieluandou_tips4
    };

    /**阵营类型*/
    export const enum CampType {
        MONSTER = 0,    //怪物
        // 其他定义客户端不用，具体阵营由服务端赋值
        RED = 1,     //红方阵营，跨服斗法敌人和怪物用
        BLUE = 2,    //蓝方阵营，跨服斗法敌人和怪物用
    }

    export const enum BuffIndex {
        Tie = 13001002,
        Dizzy = 13008002,
        Immune = 13012002,//免疫
        TeXiao = 213400511,
    }

    export const ViewWidthLimit = 720 * 3;
    export const SceneRedFrameTime = 10;//场景，副本红色倒计时

    export interface MapInfo {
        mW: number;//地图宽度
        mH: number;//地图高度
        sW: number;//地图块宽度，256
        sH: number;//地图块宽度，256
        cW: number;//网格宽度，32
        cH: number;//网格高度，32
        d: number[];//地图点，阻挡点、遮罩点之类的数据
        p: number[][];//路径
    }
    /**挂机地图移动类型*/
    export enum MapMoveType {
        Null = 0,//不移动
        Left = 1,//向左移动
        Right = 2,//向右移动
        Up = 3,//向上移动
        Down = 4,//向下移动
        LeftUp = 5,//向左上移动
        RightUp = 6,//向右上移动
        LeftDown = 7,//向左下移动
        RightDown = 8,//向右下移动
    }

    export enum SliceStatus {
        Disable = 0,// 障碍0
        Enable = 1 << 0,// 可通过1
        Shelter = 1 << 1,// 遮挡区域2
        Jump = 1 << 2,// 跳跃区域4
        Safety = 1 << 3,// 安全区域8
    }

    export const SliceColor: { [type: number]: number; } = {
        0: 0xFF0000,
        1: 0x00FFFF,
        2: 0xFFFF00,
        4: 0x0000FF,
        8: 0x00FF00,
    };
    export const DefaultSpeed: number = 120;

    export const enum HpColorType {
        Green,
        Red,
    }

    /** 配置表场景点击类型*/
    export const enum SceneClickType {
        Player = 1,
        Monster,
        NPC,
    }

    export const CameraOffsetY = 193;

    export const enum ControlAIType {
        Stop = 1,
        Start = 2,
    }

    /**boss血条结构接口*/
    export interface BossHpData {
        entity_id: Long,/**实体id */
        cfg: Monster1Config,/**怪物配置 */
        max_hp: Long,/** 最大血量 */
        percent: number,/** 血量万分比 */
    }
    /**战斗类型*/
    export const enum FightType {
        // 0:挂机场景
        PVP = 1,// 1：PVP场景
        // 2：PVE场景
        // 3：混合场景
        // 4：主城安全
    }

    export const enum SceneIndex {
        /**经验副本 */
        JingYan = 160540001,
    }
}
