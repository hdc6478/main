namespace game.scene {
    import LanDef = game.localization.LanDef;

    export interface EftGroupChildCfg {
        id: string;
        x: number;
        y: number;
        ex: number;
        ey: number;
        sx: number;
        sy: number;
        r: number;
        delay: number;
        rDelay: number;
        times: number;
        duration: number;
        tw?: number[][]; //[[time,x,y,scaleX,scaleY,rotation,alpha]]
    }

    export interface EftGroupCfg {
        id: string;
        children: EftGroupChildCfg[];
    }

    export const enum ObjectType {
        NONE = 0,
        PLAYER = 1,
        NPC = 2,
        MONSTER = 3,
        PET = 4,
        DROP_ITEM = 5,
        TEAM_PLAYER = 6,
        /**采集对象*/
        COLLECT = 7,
        /** 触碰物 */
        TRIGGER = 8,
    }

    export const AllObjectType = [
        ObjectType.PLAYER,
        ObjectType.NPC,
        ObjectType.MONSTER,
        ObjectType.PET,
        ObjectType.DROP_ITEM,
        ObjectType.TEAM_PLAYER,
        ObjectType.COLLECT,
        ObjectType.TRIGGER
    ];

    export const ObjectVo = {
        [ObjectType.PLAYER]: GPlayerVo,
        [ObjectType.NPC]: NPCVo,
        [ObjectType.MONSTER]: MonsterVo,
        [ObjectType.PET]: PetVo,
        [ObjectType.DROP_ITEM]: DropItemVo,
        [ObjectType.TEAM_PLAYER]: GPlayerVo,
        [ObjectType.COLLECT]: CollectVo,
        [ObjectType.TRIGGER]: TriggerVo,
    };

    export const ObjectCls = {
        [ObjectType.PLAYER]: GPlayer,
        [ObjectType.NPC]: NPC,
        [ObjectType.MONSTER]: Monster,
        [ObjectType.DROP_ITEM]: DropItem,
        [ObjectType.TEAM_PLAYER]: TeamPlayer,
        [ObjectType.COLLECT]: CollectItem,
        [ObjectType.TRIGGER]: Trigger,
    };

    export const PetObjectCls = {
        [PetType.General]: General,
        [PetType.Ride]: Ride,
    };

    export const enum MoveType {
        Normal = 0, //正常
        Sprint = 1, //冲刺
        Back = 2,   //击退
        Find = 3,

        Jump = 6,//跳跃
        Push_Back = 7,//击退
        Push_Fly = 8,//击飞
        Bounce_Off = 9,//弹开

        Stop = 99,//前端遥杆松开
    }

    export const enum BuffType {
        Invincible = 37,
        Crit = 38,
    }


    //技能使用状态
    export const enum  SkillUseStatus{
        SUCCESS           = 0,
        NO_EFFECT         = 1,// -- 技能没有效果
        NEED_BUT_NO_FOCUS = 2,// -- 没有目标
        IN_CD             = 3, //-- 冷却中
        TOO_FAR           = 4,// -- 距离过远
        INVALID_FOCUS     = 5, //-- 无效目标
        NO_SKILL          = 6, //-- 无技能
        IN_PUBLIC_CD      = 7 //-- 公共cd
    }


    export const SPRINT_DIS_MAX: number = 15;
    export const SPRINT_DIS_MIN: number = 6;
    export const MOVE_AMEND_DIS: number = 3;


    export const enum SceneLayerType {
        Down = 1,
        Avatar = 2,
        Effect = 3,
    }

    export const enum MonsterType {
        Common = 1,
        Boss = 2,
        Architecture = 3,
        Collect = 4,
    }

    export const enum PetType {
        General = 1,//神灵
        Sprite ,
        Ride,
    }

    export const enum SkillType2 {
        NORMAL = 1,
        ROLE = 2,
        WUSHEN = 3,
        SHINV = 4,
        LINGCHONG = 5,
        SHENHUA = 12,//神化技能
        SHENJUE = 13,//神决
    }

    //export const FullScreenEft: string [] = ["eft_wanjian"];
    //export const OffYEft: string[] = ["eft_lingjian", "eft_pomo", "eft_yshuang1"];

    //export const DownLayerEft: string[] = ["jianzhen_xia2", "jianzhen_xia1", "eft_portal", "deemo_door", "deemo_fazhen","skill_hyzd"];
    //export const PreDownLayerEft: string = "sole_skill";

    export const BossHitEftSrc: string = "baodian_3";
    export const EnterSceneEft: string = "chuansong";
    export const BossDieEftSrc: string = "boss_die";
    export const TalentEftSrc: string = "talent_eft";
    export const TalentEftSrc2: string = "buff_eft";
    export const EnterPortal: string = "eft_portal"; //传送门

    export const enum GroupEftSrc {
        Buff = "12fz_dragon",
    }

    export const ATK_EFT_3: string = "1003";
    export const GuideLuoJian: string = "xinshou_luojian";
    export const LuoJianXie: string = "luojian_xie";
    export const BossEnterEft: string = "boss_enter";
    export const RoleLvUp: string = "role_lvup";
    export const MonsterEnterPortal: string = "deemo_door";
    export const XianShiFaZhen: string = "deemo_fazhen";

    export const DropItemY = [
        -1.1,
        -8.5,
        -14.8,
        -18.9,
        -23.1,
        -24.3,
        -22.2,
        -18.62,
        -13.7,
        -3.84,
        -2.04,
        -5.56,
        -6.24,
        -5.48,
        -1.73,
        -0.88,
        -1.35,
        0
    ];
    export const HuashenPt: { x: number, y: number } = {x: 50, y: 150};//化神模型偏移
    export const FaBaoRightPt: { x: number, y: number } = {x: 70, y: -170};
    export const DiBingRightPt: { x: number, y: number }[] = [
        {x: 60, y: 10},
        {x: 20, y: -30},
        {x: 20, y: 50},
        {x: -20, y: -70},
        {x: -20, y: 90},
    ];
    export const SoulWareAddX: number = 400;

    export const enum SoulWareDir {
        LEFT = 1,
        RIGHT = -1,
    }

    export const FaBaoMoveCfg = [
        [0.15, 0.15, 0],
        [0.35, 0.30, 148],
        [0.55, 0.45, 164],
        [0.80, 0.65, 169],
        [1.10, 0.90, 187],
        [1.45, 1.20, 203],
        [1.85, 1.55, 221],
        [2.35, 2.00, 237],
        [2.95, 2.45, 253],
        [3.65, 3.05, 270],
        [4.50, 3.70, 287],
        [5.50, 4.45, 303],
        [6.65, 5.35, 321],
        [8.10, 6.40, 337],
        [9.80, 7.65, 353],
        [11.90, 9.05, 369],
        [14.50, 10.75, 387],
        [17.90, 12.85, 403],
        [22.45, 15.35, 419],
        [27.55, 17.90, 437],
        [33.05, 20.35, 453],
        [38.95, 22.60, 469],
        [45.25, 24.70, 487],
        [51.90, 26.50, 503],
        [58.90, 28.00, 519],
        [66.10, 29.10, 538],
        [73.40, 29.75, 554],
        [80.75, 30.00, 570],
        [87.95, 29.80, 587],
        [94.85, 29.25, 603],
        [101.45, 28.40, 621],
        [107.65, 27.25, 637],
        [113.35, 25.90, 653],
        [118.55, 24.40, 671],
        [123.30, 22.85, 687],
        [127.60, 21.30, 703],
        [131.40, 19.70, 719],
        [134.85, 18.15, 737],
        [137.90, 16.70, 753],
        [140.65, 15.25, 769],
        [143.05, 13.95, 787],
        [145.25, 12.70, 803],
        [147.10, 11.55, 819],
        [148.70, 10.55, 837],
        [150.10, 9.60, 853],
        [151.35, 8.80, 869],
        [152.45, 8.00, 887],
        [153.50, 7.25, 903],
        [154.45, 6.60, 919],
        [155.30, 5.95, 938],
        [156.10, 5.35, 954],
        [156.80, 4.80, 970],
        [157.45, 4.30, 988],
        [158.05, 3.85, 1003],
        [158.60, 3.45, 1021],
        [159.05, 3.05, 1037],
        [159.45, 2.75, 1053],
        [160.00, 0.00, 1071],
    ];
}
