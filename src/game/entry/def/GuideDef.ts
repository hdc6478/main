namespace game {
    export const enum GuideEvent {
        ON_GUIDE_UPDATE = "on_guide_update",//引导刷新，任务切换会触发
        ON_GUIDE_TRIGGER = "on_guide_trigger",//触发指定指引，会携带指引ID
    }
    export const enum GuideType {
        Default = 0,//弱指引
        Force = 1,//强指引，所有点击视为触发
        Force2 = 2,//强指引，不允许其他点击
    }
    export const enum ArrowType {
        None = 0,//不操作
        Auto = 1,//自动指引（5秒后执行）
        Tips = 2,//10秒未操作时候提示
    }

    export const GuideFingerName: string = "guide_finger";//指引名字

    export const enum GuideKey {
        Task = 1,// 点击任务，此指引在任务完成状态才会触发
        Shenling,// 点击主界面神灵
        ShenlingAct,// 点击神灵激活
        Back,// 点击一级界面返回按钮，此指引在任务完成状态才会触发
        ShenlingOneUp,// 点击神灵一键升级
        Summon,// 点击主界面召唤
        SummonTen,// 点击召唤十连召唤
        Shilian,// 点击主界面试炼
        FubenChallege,// 点击封魔圣殿挑战
        Role,// 点击主界面角色
        RoleEquip,// 点击角色界面一键装备
        Boss,// 点击主界面BOSS
        RoleCollect,// 点击角色界面收集
        RoleCollectAct,// 点击羁绊装备界面激活
        Pass,// 点击主界面闯关
        PassChallege,// 点击闯关界面挑战
        Xianfa,// 点击主界面仙法
        XianfaOneUp,// 点击仙法界面一键升级
        RoleBody,// 点击角色界面时装
        Compete,// 点击主界面竞技
        CompeteYouli,// 点击竞技界面游历
        Xianlu,// 点击主界面仙路
        SecondBack,// 二级界面返回按钮，此指引在任务完成状态才会触发
        SurfaceAct,// 外显激活升星按钮
        ShenlingUpStar,// 神灵升星按钮
        More,// 主界面更多
        Consecrate,// 更多界面供奉按钮
        ConsecrateIcon,// 供奉界面第一个加号
        ConsecrateShelfItem,// 供奉角色属性第一个道具
        TaskClick,// 任务，此指引在任务未完成状态才会触发
        Union,// 更多界面仙宗按钮
        Yuling,// 主界面御灵
        YulingHorse,// 御灵界面坐骑
        RoleCollectIcon,// 羁绊装备界面奖励
        ShenlingOneUpAutoSel,// 点击神灵一键升级，此指引特殊处理，会默认选中等级第2大的神灵
        BossChallenge,// 点击多人BOSS挑战
        YouliChallenge,// 点击游历第二个角色
        ConsecrateSpeed,// 供奉界面加速按钮
        ConsecrateSpeedAll,// 供奉加速全部加速
        ConsecrateIconFinal,// 供奉界面最后一个加号
        HuaShengSkillIcon,//主界面化神技能按钮
        GivingShenLing,//送瑶姬仙子
        GivingShenLingRewardBtn,//送瑶姬仙子领取按钮

        Tips = 10001,//提示指引，提示点击任务，客户端用
        GongNengTips = 10002,//提示指引，客户端用
    }

    //特殊引导
    export const enum GuideKeySpecial {
        /**特殊引导*/
        Special1 = 1,
        Special2 = 2,
    }

    //todo,主界面的指引点击后需要手动clear下，防止策划只配置单个指引，打开界面后没有新的指引进来，导致旧指引未删除
    //todo,系统界面的指引点击后不需要手动clear，统一由任务完成状态去清除，界面onHide()的时候需要清除界面的指引
    //todo,入口刷新显示的时候，需要showGuide()一下，防止接收到任务时入口还未开启，导致没指引
    //todo,当前指引执行后，需要暂停的，pauseGuideKey传需要暂停执行的下一指引，恢复指引则当对应的界面关闭时，触发triggerGuide()
}