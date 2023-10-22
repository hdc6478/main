namespace game {

    //技能参数类型
    export const enum SkillType {
        firstSword = 1,   //初阶剑技
        HighSword = 2,//高阶剑技
        RoleHighSkill = 33,//高阶剑技
        YuLing = 37
    }

    //技能类型1
    // 策划给的:
    //     1.仙法
    // 2.火合击
    // 3.水合击
    // 4.雷合击
    // 5.风合击
    // 0.普攻
    // 6.神灵普攻
    // 7.坐骑技能
    // 8.元灵技能
    // 9.羽翼技能
    // 10.神兵技能
    // 11.飞剑技能
    // 12.子女技能
    // 13,神灵天赋,火
    // 14,神灵天赋,水
    // 15,神灵天赋,雷
    // 16,神灵天赋,风
    export const enum SkillType1 {
        Immortal = 1,//仙法
        Xianjian = 11,// 仙剑
        Shenbing = 10,//神兵
        Zuoqi = 7, //坐骑
        YuanLing = 8, //元灵
        HuashengCommon = 17, //化神普工
        Huasheng = 18, //化神技能(形态变化)
    }

    //技能类型2
    export const enum SkillType2 {
        Skill = 1,// 1：主动技能
        PassiveSkill = 2// 2：被动技能
        // 3：光环技能
    }

    /**SpecialSkillData结构接口*/
    export interface SpecialSkillData {
        preTime:number; //上一次释放技能的时间戳
        preSkillId:number; //上次释放技能Id
        delay:number; //技能之间间隔最短时间
    }

    //需要特殊处理的技能类型
    export const SpecialSkillList: { [skillType: number]:SpecialSkillData} = {
        [SkillType1.Immortal]:{preTime:0,preSkillId:0,delay:2000},
        [SkillType1.Xianjian]:{preTime:0,preSkillId:0,delay:2000}
    };

    export const SpecialSkillList2 = {
        skillTypes:[SkillType1.Shenbing,SkillType1.Zuoqi,SkillType1.YuanLing],
        preTime:0,
        preSkillId:0,
        delay:2000
    };
}