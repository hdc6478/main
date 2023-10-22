namespace game {
    //以下都是给首包本地化使用
    export const SignAccountMsg = {
        1: "表示登录成功",
        2: "没有账号",
        3: "密钥不正确",
        4: "协议版本不对",
        5: "登录时间戳超时",
        6: "地图资源错误"
    };

    export const DisConnectMsg = {
        1: "账号已在别处登录",        // 1  玩家顶号
        2: "版本号错误",        // 2  版本号不对
        3: "服务器已关闭",        // 3  服务器关闭
        4: "主动断开",        // 4  主动断开
        5: "登录错误",        // 5  登录错误
        6: "登录错误，角色为空",       // 6  登录错误，角色为空
        7: "未成年人每日累计游戏时长已达上限，请下线休息！",
        8: "每日22时至次日8时，不会为未成年人提供游戏服务！",
        9: "您已累计游戏时长1小时，请实名认证以保证正常游戏",
        10:"您已返回登陆界面",
    };

    export const CreateRoleMsg = {
        1: "创建成功",
        2: "标识系统错误",
        3: "角色名重复",
        4: "已经创建过角色",
        5: "包含屏蔽词",
        6: "系统繁忙"
    };

    export const ServerStatusName = {
        0: "未开服",
        1: "火爆",
        2: "推荐",
        3: "畅通",
        4: "维护",
        5: "新服"
    };

    export const UserStatusName = {
        0: "正常",
        1: "服务器维护中"
    };

    export const enum BtnLan {
        Exit = "退出",
        Share = "分享",
        Confirm = "确认",
        Cancel = "取消",
    }

    export const enum LoginLan {
        Tips = "提示",
        Confirm = "确定",
        Cancel = "取消",
        CloseTips = "点击其他区域关闭",

        ConnectionError = "与服务器连接出错",
        ConnectionBreak = "与服务器连接断开",

        ConnectionLost = "无法连接入口服务器",

        ServerMaintenance = "服务器维护中",
        ServerUrlError = "服务器地址错误，请重新进入游戏",

        UpdateTips = "游戏内容有更新，请重新进入游戏",

        UnknownError = "未知错误：%s",


        InputName = "请输入名字",
        InputSex = "请选择性别",

        CreateCountDown = "%s秒后自动创建",

        RecentLogin = "最近登录",
        ServerType = "%s-%s服",

        EnterTest = "是否进入灰度服？",
        EnterTestTips = "点开始游戏进入灰度服",

        GankCompany = "上海敢客网络科技有限公司",
        RiYiCompany = "广州日益网络科技有限公司",
        Copyright = "运营单位：海南阿斯加德网络科技有限公司  文号：国新出审[2020]2758号\nISBN：978-7-498-08424-8  著作权人：厦门市奉孝文化传播有限公司\n登记号：2020SR0416872  出版单位名称：杭州群游科技有限公司\n",
        Counsel = "适龄提示：本游戏适合18周岁以上参与\n抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。\n适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。\n审批文号：国新出审[2019]234号\n著作权登记号：2017SR693299\n出版物号：ISBN 978-7-498-05811-9",
        CustomerService = "\n客服QQ：800051345",
        LastServerTips = "最新服",
        AgreeTips = '我已阅读并同意',

        AgeTips1 = '1.本游戏是一款放置类型的仙侠游戏，适用于年满16周岁及以上的用户，建议未成年人在家长的监护下使用该游戏产品。\n\n2.本游戏基于国风仙侠故事为背景，画面风格唯美，人物和场景丰富多样，有丰富的音效来烘托游戏氛围；游戏主要玩法为跨服音技，需要玩家参与多人对抗，玩法具有一定的策性与趣味性；游戏中有基于玩家与陌生人聊天的社交系统，社交系统的管理遵循相关法律法规。\n\n3.本游戏中有用户实名认证系统，认证为未成年人的用户将接受以下管理:游戏中部分玩法和道具需要付费，未满8周岁的用户不能付费；8周岁以上未满16周岁的未成年人用户，单次充值金额不得超过50元人民币，每月充值金额累计不得超过200元人民币；16~18周岁以上的未成年人用户，单次充值金额不得超过100元人民币，每月充值金额累计不得超过400元人民币。未成年账号仅在周五、周六、周日和法定节假日的20时至21时拥有1小时游戏时间。\n\n4.本游戏以Q版仙侠为主题，在场景中的竞技有助于锻炼玩家的独立思考能力、空间感知能力和逻辑思维能力；酷炫的角色技能与特效，将带给用户良好的视觉享受与游戏代入感；基于团队竞技的协作玩法可以提升玩家的沟通能力、团队协作能力和大局观，鼓励玩家互帮互助、维持良好的社群关系。',
        shengye = "运营单位：广州小朋网络科技有限公司  文号：新广出审[2017]4801号\nISBN：978-7-7979-8143-9  著作权人：广州小朋网络科技有限公司\n出版单位名称：杭州润趣科技有限公司\n",
        Shouq = "运营单位：成都贪玩蛇科技有限公司  文号：新广出审[2018]460号\nISBN：978-7-498-03924-8  著作权人：成都贪玩蛇科技有限公司\n登记号：2017SR532579  出版单位名称：北京畅元国讯科技有限公司\n",
        Fuyao = "运营单位：上海趣侬网络科技有限公司  文号：国新出审[2020]1889号\nISBN 978-7-498-08033-2  著作权人：上海趣侬网络科技有限公司\n登记号：2019SR1061242  出版单位名称：成都哆可梦网络科技有限公司\n",
        WanjianShouq = "运营单位：徐州润达通信科技有限公司  文号：国新出审[2018]1089号\nISBN：978-7-498-05548-4  著作权人：广州恒祥网络科技有限公司\n登记号：2018SR812656  出版单位名称：北京伯通电子出版社  客服QQ：800821618",
        }
        export const enum ActivityLan {
            NianBeastTips0 = "年兽卡激活中，对年兽固定最高伤害",
            NianBeastTips1 = "第%s代年兽伤害排名",
            NianBeastTips2 = "年兽当前血量：",
            NianBeastTips3 = "后恢复1次挑战次数",
            NianBeastTips4 = "累伤值",
            NianBeastTips5 = "激活年兽卡可再领一次",
            NianBeastTips6 = "%s对年兽累计造成伤害%s可领取",
            NianBeastTips7 = "全服",
            NianBeastTips8 = "折后:",
            NianBeastTips9 = "我的累伤值",
            NianBeastTips10 = "数量不足",
            NianBeastTips11 = "未激活年兽卡",
            NianBeastTips12 = "(年兽卡已激活，对年兽固定最高伤害生效)",
            NianBeastTips13 = "(激活年兽卡可对年兽固定最高伤害)",
            NianBeastTips14 = "我对第%s代年兽伤害排行榜",
            NianBeastTips15 = "#G正在攻略中，快乐参与！#end",
            NianBeastTips16 = "#R没有参加该轮挑战#end",
            nianTips0 = "第%s代",
            nianTips1 = "剩余挑战次数：",
            LeftTime = "剩余时间：",
            LinkGameTip3 = "剩余数量:",
            JoinChallenge = "参与挑战",
            Activity_120 = "绝版",
            Act_45 = "选择你的兑换次数",
            Person = "个人",
            ActTip0 = "(充值可计入累计充值与vip)",
            Boss1 = "自己:%s",
            ActTip7 = "排名截止: #G%s (排行榜每5分钟刷新一次)#end",
            ActTip10 = "排名截止：已截止（数据已更新）",
    }

    export const enum CommonLan {
        MyRank = "我的排名",
        NotOnRank = "未上榜",
        OneKeyGet = "一键领取",
        Get = "领取",
        RankNumStr = "第%s名",
        Exchange = "兑换",
        Store_10 = "原价:",
        Daily_80 = "次数",
        Use = "使用",
        CommonCloseTip = "点击其他区域关闭",
        Role_303 = "拥有数量：",
        RushBuy = "立即抢购",
        Team = "帮派",
        Nothing = "无",

    }

    export const enum TimeLan {
        Day = "天",
        Hours = "时",
        Minute = "分",
        Second = "秒",
        TimeFmtCN = "HH时mm分ss秒",
        TimeFmtDHM = "d天H小时m分钟",
        TimeFmtDHM2 = "d天H时m分",
        TimeFmtMS = "mm分ss秒",
        TimeLong = "yyyy年MM月dd日",
        TimeFmtDHM3 = "dd天HH小时mm分钟",
        Years = "年",
        Month = "月",
        No = "号",
    }

}