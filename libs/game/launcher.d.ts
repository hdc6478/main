declare namespace game {
    const enum LauncherEvent {
        ON_ACTIVATE = "on_activate",
        ON_DEACTIVATE = "on_deactivate",
        ON_RESIZE = "on_resize",
        ON_RELOAD = "on_reload",
        SHOW_START = "show_start",
        WEB_LOGIN_ERROR = "web_login_error"
    }
    const enum LauncherLan {
        Week_0 = "\u661F\u671F\u65E5",
        Week_1 = "\u661F\u671F\u4E00",
        Week_2 = "\u661F\u671F\u4E8C",
        Week_3 = "\u661F\u671F\u4E09",
        Week_4 = "\u661F\u671F\u56DB",
        Week_5 = "\u661F\u671F\u4E94",
        Week_6 = "\u661F\u671F\u516D",
        Zhou_0 = "\u5468\u65E5",
        Zhou_1 = "\u5468\u4E00",
        Zhou_2 = "\u5468\u4E8C",
        Zhou_3 = "\u5468\u4E09",
        Zhou_4 = "\u5468\u56DB",
        Zhou_5 = "\u5468\u4E94",
        Zhou_6 = "\u5468\u516D"
    }
    const ApiUserStatus: {
        [key: string]: string;
    };
}
declare namespace game {
    import Handler = base.Handler;
    class AssetsMgr {
        static readonly ins: AssetsMgr;
        loadConfig(handler: Handler): void;
        getRes(key: string): any;
        getGroup(name: string): string[];
        getResAsync(key: string, onSucc: Handler): void;
        addRef(key: string): void;
        decRef(key: string): void;
        loadGroup(name: string, onComp: Handler, onProg?: Handler): void;
    }
}
declare namespace game {
}
declare namespace game {
    import Handler = base.Handler;
    let protoVersion: string;
    function initProto(handler: Handler, url?: string): void;
    function createMsg(): void;
}
declare namespace game {
    const SignAccountMsg: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
    };
    const DisConnectMsg: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
    };
    const CreateRoleMsg: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
    };
    const ServerStatusName: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
    };
    const UserStatusName: {
        0: string;
        1: string;
    };
    const enum BtnLan {
        Exit = "\u9000\u51FA",
        Share = "\u5206\u4EAB",
        Confirm = "\u786E\u8BA4",
        Cancel = "\u53D6\u6D88"
    }
    const enum LoginLan {
        Tips = "\u63D0\u793A",
        Confirm = "\u786E\u5B9A",
        Cancel = "\u53D6\u6D88",
        CloseTips = "\u70B9\u51FB\u5176\u4ED6\u533A\u57DF\u5173\u95ED",
        ConnectionError = "\u4E0E\u670D\u52A1\u5668\u8FDE\u63A5\u51FA\u9519",
        ConnectionBreak = "\u4E0E\u670D\u52A1\u5668\u8FDE\u63A5\u65AD\u5F00",
        ConnectionLost = "\u65E0\u6CD5\u8FDE\u63A5\u5165\u53E3\u670D\u52A1\u5668",
        ServerMaintenance = "\u670D\u52A1\u5668\u7EF4\u62A4\u4E2D",
        ServerUrlError = "\u670D\u52A1\u5668\u5730\u5740\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8FDB\u5165\u6E38\u620F",
        UpdateTips = "\u6E38\u620F\u5185\u5BB9\u6709\u66F4\u65B0\uFF0C\u8BF7\u91CD\u65B0\u8FDB\u5165\u6E38\u620F",
        UnknownError = "\u672A\u77E5\u9519\u8BEF\uFF1A%s",
        InputName = "\u8BF7\u8F93\u5165\u540D\u5B57",
        InputSex = "\u8BF7\u9009\u62E9\u6027\u522B",
        CreateCountDown = "%s\u79D2\u540E\u81EA\u52A8\u521B\u5EFA",
        RecentLogin = "\u6700\u8FD1\u767B\u5F55",
        ServerType = "%s-%s\u670D",
        EnterTest = "\u662F\u5426\u8FDB\u5165\u7070\u5EA6\u670D\uFF1F",
        EnterTestTips = "\u70B9\u5F00\u59CB\u6E38\u620F\u8FDB\u5165\u7070\u5EA6\u670D",
        GankCompany = "\u4E0A\u6D77\u6562\u5BA2\u7F51\u7EDC\u79D1\u6280\u6709\u9650\u516C\u53F8",
        RiYiCompany = "\u5E7F\u5DDE\u65E5\u76CA\u7F51\u7EDC\u79D1\u6280\u6709\u9650\u516C\u53F8",
        Copyright = "\u8FD0\u8425\u5355\u4F4D\uFF1A\u6D77\u5357\u963F\u65AF\u52A0\u5FB7\u7F51\u7EDC\u79D1\u6280\u6709\u9650\u516C\u53F8  \u6587\u53F7\uFF1A\u56FD\u65B0\u51FA\u5BA1[2020]2758\u53F7\nISBN\uFF1A978-7-498-08424-8  \u8457\u4F5C\u6743\u4EBA\uFF1A\u53A6\u95E8\u5E02\u5949\u5B5D\u6587\u5316\u4F20\u64AD\u6709\u9650\u516C\u53F8\n\u767B\u8BB0\u53F7\uFF1A2020SR0416872  \u51FA\u7248\u5355\u4F4D\u540D\u79F0\uFF1A\u676D\u5DDE\u7FA4\u6E38\u79D1\u6280\u6709\u9650\u516C\u53F8\n",
        Counsel = "\u9002\u9F84\u63D0\u793A\uFF1A\u672C\u6E38\u620F\u9002\u540818\u5468\u5C81\u4EE5\u4E0A\u53C2\u4E0E\n\u62B5\u5236\u4E0D\u826F\u6E38\u620F\uFF0C\u62D2\u7EDD\u76D7\u7248\u6E38\u620F\u3002\u6CE8\u610F\u81EA\u6211\u4FDD\u62A4\uFF0C\u8C28\u9632\u53D7\u9A97\u4E0A\u5F53\u3002\n\u9002\u5EA6\u6E38\u620F\u76CA\u8111\uFF0C\u6C89\u8FF7\u6E38\u620F\u4F24\u8EAB\u3002\u5408\u7406\u5B89\u6392\u65F6\u95F4\uFF0C\u4EAB\u53D7\u5065\u5EB7\u751F\u6D3B\u3002\n\u5BA1\u6279\u6587\u53F7\uFF1A\u56FD\u65B0\u51FA\u5BA1[2019]234\u53F7\n\u8457\u4F5C\u6743\u767B\u8BB0\u53F7\uFF1A2017SR693299\n\u51FA\u7248\u7269\u53F7\uFF1AISBN 978-7-498-05811-9",
        CustomerService = "\n\u5BA2\u670DQQ\uFF1A800051345",
        LastServerTips = "\u6700\u65B0\u670D",
        AgreeTips = "\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F",
        AgeTips1 = "1.\u672C\u6E38\u620F\u662F\u4E00\u6B3E\u653E\u7F6E\u7C7B\u578B\u7684\u4ED9\u4FA0\u6E38\u620F\uFF0C\u9002\u7528\u4E8E\u5E74\u6EE116\u5468\u5C81\u53CA\u4EE5\u4E0A\u7684\u7528\u6237\uFF0C\u5EFA\u8BAE\u672A\u6210\u5E74\u4EBA\u5728\u5BB6\u957F\u7684\u76D1\u62A4\u4E0B\u4F7F\u7528\u8BE5\u6E38\u620F\u4EA7\u54C1\u3002\n\n2.\u672C\u6E38\u620F\u57FA\u4E8E\u56FD\u98CE\u4ED9\u4FA0\u6545\u4E8B\u4E3A\u80CC\u666F\uFF0C\u753B\u9762\u98CE\u683C\u552F\u7F8E\uFF0C\u4EBA\u7269\u548C\u573A\u666F\u4E30\u5BCC\u591A\u6837\uFF0C\u6709\u4E30\u5BCC\u7684\u97F3\u6548\u6765\u70D8\u6258\u6E38\u620F\u6C1B\u56F4\uFF1B\u6E38\u620F\u4E3B\u8981\u73A9\u6CD5\u4E3A\u8DE8\u670D\u97F3\u6280\uFF0C\u9700\u8981\u73A9\u5BB6\u53C2\u4E0E\u591A\u4EBA\u5BF9\u6297\uFF0C\u73A9\u6CD5\u5177\u6709\u4E00\u5B9A\u7684\u7B56\u6027\u4E0E\u8DA3\u5473\u6027\uFF1B\u6E38\u620F\u4E2D\u6709\u57FA\u4E8E\u73A9\u5BB6\u4E0E\u964C\u751F\u4EBA\u804A\u5929\u7684\u793E\u4EA4\u7CFB\u7EDF\uFF0C\u793E\u4EA4\u7CFB\u7EDF\u7684\u7BA1\u7406\u9075\u5FAA\u76F8\u5173\u6CD5\u5F8B\u6CD5\u89C4\u3002\n\n3.\u672C\u6E38\u620F\u4E2D\u6709\u7528\u6237\u5B9E\u540D\u8BA4\u8BC1\u7CFB\u7EDF\uFF0C\u8BA4\u8BC1\u4E3A\u672A\u6210\u5E74\u4EBA\u7684\u7528\u6237\u5C06\u63A5\u53D7\u4EE5\u4E0B\u7BA1\u7406:\u6E38\u620F\u4E2D\u90E8\u5206\u73A9\u6CD5\u548C\u9053\u5177\u9700\u8981\u4ED8\u8D39\uFF0C\u672A\u6EE18\u5468\u5C81\u7684\u7528\u6237\u4E0D\u80FD\u4ED8\u8D39\uFF1B8\u5468\u5C81\u4EE5\u4E0A\u672A\u6EE116\u5468\u5C81\u7684\u672A\u6210\u5E74\u4EBA\u7528\u6237\uFF0C\u5355\u6B21\u5145\u503C\u91D1\u989D\u4E0D\u5F97\u8D85\u8FC750\u5143\u4EBA\u6C11\u5E01\uFF0C\u6BCF\u6708\u5145\u503C\u91D1\u989D\u7D2F\u8BA1\u4E0D\u5F97\u8D85\u8FC7200\u5143\u4EBA\u6C11\u5E01\uFF1B16~18\u5468\u5C81\u4EE5\u4E0A\u7684\u672A\u6210\u5E74\u4EBA\u7528\u6237\uFF0C\u5355\u6B21\u5145\u503C\u91D1\u989D\u4E0D\u5F97\u8D85\u8FC7100\u5143\u4EBA\u6C11\u5E01\uFF0C\u6BCF\u6708\u5145\u503C\u91D1\u989D\u7D2F\u8BA1\u4E0D\u5F97\u8D85\u8FC7400\u5143\u4EBA\u6C11\u5E01\u3002\u672A\u6210\u5E74\u8D26\u53F7\u4EC5\u5728\u5468\u4E94\u3001\u5468\u516D\u3001\u5468\u65E5\u548C\u6CD5\u5B9A\u8282\u5047\u65E5\u768420\u65F6\u81F321\u65F6\u62E5\u67091\u5C0F\u65F6\u6E38\u620F\u65F6\u95F4\u3002\n\n4.\u672C\u6E38\u620F\u4EE5Q\u7248\u4ED9\u4FA0\u4E3A\u4E3B\u9898\uFF0C\u5728\u573A\u666F\u4E2D\u7684\u7ADE\u6280\u6709\u52A9\u4E8E\u953B\u70BC\u73A9\u5BB6\u7684\u72EC\u7ACB\u601D\u8003\u80FD\u529B\u3001\u7A7A\u95F4\u611F\u77E5\u80FD\u529B\u548C\u903B\u8F91\u601D\u7EF4\u80FD\u529B\uFF1B\u9177\u70AB\u7684\u89D2\u8272\u6280\u80FD\u4E0E\u7279\u6548\uFF0C\u5C06\u5E26\u7ED9\u7528\u6237\u826F\u597D\u7684\u89C6\u89C9\u4EAB\u53D7\u4E0E\u6E38\u620F\u4EE3\u5165\u611F\uFF1B\u57FA\u4E8E\u56E2\u961F\u7ADE\u6280\u7684\u534F\u4F5C\u73A9\u6CD5\u53EF\u4EE5\u63D0\u5347\u73A9\u5BB6\u7684\u6C9F\u901A\u80FD\u529B\u3001\u56E2\u961F\u534F\u4F5C\u80FD\u529B\u548C\u5927\u5C40\u89C2\uFF0C\u9F13\u52B1\u73A9\u5BB6\u4E92\u5E2E\u4E92\u52A9\u3001\u7EF4\u6301\u826F\u597D\u7684\u793E\u7FA4\u5173\u7CFB\u3002",
        shengye = "\u8FD0\u8425\u5355\u4F4D\uFF1A\u5E7F\u5DDE\u5C0F\u670B\u7F51\u7EDC\u79D1\u6280\u6709\u9650\u516C\u53F8  \u6587\u53F7\uFF1A\u65B0\u5E7F\u51FA\u5BA1[2017]4801\u53F7\nISBN\uFF1A978-7-7979-8143-9  \u8457\u4F5C\u6743\u4EBA\uFF1A\u5E7F\u5DDE\u5C0F\u670B\u7F51\u7EDC\u79D1\u6280\u6709\u9650\u516C\u53F8\n\u51FA\u7248\u5355\u4F4D\u540D\u79F0\uFF1A\u676D\u5DDE\u6DA6\u8DA3\u79D1\u6280\u6709\u9650\u516C\u53F8\n",
        Shouq = "\u8FD0\u8425\u5355\u4F4D\uFF1A\u6210\u90FD\u8D2A\u73A9\u86C7\u79D1\u6280\u6709\u9650\u516C\u53F8  \u6587\u53F7\uFF1A\u65B0\u5E7F\u51FA\u5BA1[2018]460\u53F7\nISBN\uFF1A978-7-498-03924-8  \u8457\u4F5C\u6743\u4EBA\uFF1A\u6210\u90FD\u8D2A\u73A9\u86C7\u79D1\u6280\u6709\u9650\u516C\u53F8\n\u767B\u8BB0\u53F7\uFF1A2017SR532579  \u51FA\u7248\u5355\u4F4D\u540D\u79F0\uFF1A\u5317\u4EAC\u7545\u5143\u56FD\u8BAF\u79D1\u6280\u6709\u9650\u516C\u53F8\n",
        Fuyao = "\u8FD0\u8425\u5355\u4F4D\uFF1A\u4E0A\u6D77\u8DA3\u4FAC\u7F51\u7EDC\u79D1\u6280\u6709\u9650\u516C\u53F8  \u6587\u53F7\uFF1A\u56FD\u65B0\u51FA\u5BA1[2020]1889\u53F7\nISBN 978-7-498-08033-2  \u8457\u4F5C\u6743\u4EBA\uFF1A\u4E0A\u6D77\u8DA3\u4FAC\u7F51\u7EDC\u79D1\u6280\u6709\u9650\u516C\u53F8\n\u767B\u8BB0\u53F7\uFF1A2019SR1061242  \u51FA\u7248\u5355\u4F4D\u540D\u79F0\uFF1A\u6210\u90FD\u54C6\u53EF\u68A6\u7F51\u7EDC\u79D1\u6280\u6709\u9650\u516C\u53F8\n",
        WanjianShouq = "\u8FD0\u8425\u5355\u4F4D\uFF1A\u5F90\u5DDE\u6DA6\u8FBE\u901A\u4FE1\u79D1\u6280\u6709\u9650\u516C\u53F8  \u6587\u53F7\uFF1A\u56FD\u65B0\u51FA\u5BA1[2018]1089\u53F7\nISBN\uFF1A978-7-498-05548-4  \u8457\u4F5C\u6743\u4EBA\uFF1A\u5E7F\u5DDE\u6052\u7965\u7F51\u7EDC\u79D1\u6280\u6709\u9650\u516C\u53F8\n\u767B\u8BB0\u53F7\uFF1A2018SR812656  \u51FA\u7248\u5355\u4F4D\u540D\u79F0\uFF1A\u5317\u4EAC\u4F2F\u901A\u7535\u5B50\u51FA\u7248\u793E  \u5BA2\u670DQQ\uFF1A800821618"
    }
    const enum ActivityLan {
        NianBeastTips0 = "\u5E74\u517D\u5361\u6FC0\u6D3B\u4E2D\uFF0C\u5BF9\u5E74\u517D\u56FA\u5B9A\u6700\u9AD8\u4F24\u5BB3",
        NianBeastTips1 = "\u7B2C%s\u4EE3\u5E74\u517D\u4F24\u5BB3\u6392\u540D",
        NianBeastTips2 = "\u5E74\u517D\u5F53\u524D\u8840\u91CF\uFF1A",
        NianBeastTips3 = "\u540E\u6062\u590D1\u6B21\u6311\u6218\u6B21\u6570",
        NianBeastTips4 = "\u7D2F\u4F24\u503C",
        NianBeastTips5 = "\u6FC0\u6D3B\u5E74\u517D\u5361\u53EF\u518D\u9886\u4E00\u6B21",
        NianBeastTips6 = "%s\u5BF9\u5E74\u517D\u7D2F\u8BA1\u9020\u6210\u4F24\u5BB3%s\u53EF\u9886\u53D6",
        NianBeastTips7 = "\u5168\u670D",
        NianBeastTips8 = "\u6298\u540E:",
        NianBeastTips9 = "\u6211\u7684\u7D2F\u4F24\u503C",
        NianBeastTips10 = "\u6570\u91CF\u4E0D\u8DB3",
        NianBeastTips11 = "\u672A\u6FC0\u6D3B\u5E74\u517D\u5361",
        NianBeastTips12 = "(\u5E74\u517D\u5361\u5DF2\u6FC0\u6D3B\uFF0C\u5BF9\u5E74\u517D\u56FA\u5B9A\u6700\u9AD8\u4F24\u5BB3\u751F\u6548)",
        NianBeastTips13 = "(\u6FC0\u6D3B\u5E74\u517D\u5361\u53EF\u5BF9\u5E74\u517D\u56FA\u5B9A\u6700\u9AD8\u4F24\u5BB3)",
        NianBeastTips14 = "\u6211\u5BF9\u7B2C%s\u4EE3\u5E74\u517D\u4F24\u5BB3\u6392\u884C\u699C",
        NianBeastTips15 = "#G\u6B63\u5728\u653B\u7565\u4E2D\uFF0C\u5FEB\u4E50\u53C2\u4E0E\uFF01#end",
        NianBeastTips16 = "#R\u6CA1\u6709\u53C2\u52A0\u8BE5\u8F6E\u6311\u6218#end",
        nianTips0 = "\u7B2C%s\u4EE3",
        nianTips1 = "\u5269\u4F59\u6311\u6218\u6B21\u6570\uFF1A",
        LeftTime = "\u5269\u4F59\u65F6\u95F4\uFF1A",
        LinkGameTip3 = "\u5269\u4F59\u6570\u91CF:",
        JoinChallenge = "\u53C2\u4E0E\u6311\u6218",
        Activity_120 = "\u7EDD\u7248",
        Act_45 = "\u9009\u62E9\u4F60\u7684\u5151\u6362\u6B21\u6570",
        Person = "\u4E2A\u4EBA",
        ActTip0 = "(\u5145\u503C\u53EF\u8BA1\u5165\u7D2F\u8BA1\u5145\u503C\u4E0Evip)",
        Boss1 = "\u81EA\u5DF1:%s",
        ActTip7 = "\u6392\u540D\u622A\u6B62: #G%s (\u6392\u884C\u699C\u6BCF5\u5206\u949F\u5237\u65B0\u4E00\u6B21)#end",
        ActTip10 = "\u6392\u540D\u622A\u6B62\uFF1A\u5DF2\u622A\u6B62\uFF08\u6570\u636E\u5DF2\u66F4\u65B0\uFF09"
    }
    const enum CommonLan {
        MyRank = "\u6211\u7684\u6392\u540D",
        NotOnRank = "\u672A\u4E0A\u699C",
        OneKeyGet = "\u4E00\u952E\u9886\u53D6",
        Get = "\u9886\u53D6",
        RankNumStr = "\u7B2C%s\u540D",
        Exchange = "\u5151\u6362",
        Store_10 = "\u539F\u4EF7:",
        Daily_80 = "\u6B21\u6570",
        Use = "\u4F7F\u7528",
        CommonCloseTip = "\u70B9\u51FB\u5176\u4ED6\u533A\u57DF\u5173\u95ED",
        Role_303 = "\u62E5\u6709\u6570\u91CF\uFF1A",
        RushBuy = "\u7ACB\u5373\u62A2\u8D2D",
        Team = "\u5E2E\u6D3E",
        Nothing = "\u65E0"
    }
    const enum TimeLan {
        Day = "\u5929",
        Hours = "\u65F6",
        Minute = "\u5206",
        Second = "\u79D2",
        TimeFmtCN = "HH\u65F6mm\u5206ss\u79D2",
        TimeFmtDHM = "d\u5929H\u5C0F\u65F6m\u5206\u949F",
        TimeFmtDHM2 = "d\u5929H\u65F6m\u5206",
        TimeFmtMS = "mm\u5206ss\u79D2",
        TimeLong = "yyyy\u5E74MM\u6708dd\u65E5",
        TimeFmtDHM3 = "dd\u5929HH\u5C0F\u65F6mm\u5206\u949F",
        Years = "\u5E74",
        Month = "\u6708",
        No = "\u53F7"
    }
}
declare namespace game {
    class BgMgr {
        static getIns(): BgMgr;
        private _imgLoader;
        setBigBg(res: string): void;
        setBg(res: string): void;
        updateBg(): void;
        getloadRes(urlname: string): string;
    }
}
declare namespace game {
    import Sprite = egret.Sprite;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import DisplayObject = egret.DisplayObject;
    import Mdr = base.Mdr;
    interface UILayer extends DisplayObjectContainer {
        idx: number;
        onResize(): void;
    }
    const enum LayerIndex {
        sceneBottom = 0,
        scene = 1,
        main = 2,
        window = 3,
        upperWin = 4,
        modal = 5,
        bossReliveTip = 6,
        tip = 7,
        top = 8
    }
    class Layer extends DisplayObjectContainer {
        static winSp: Sprite;
        static modalSp: Sprite;
        static readonly ins: Layer;
        static init(): void;
        /** 场景 */
        static readonly sceneBottom: UILayer;
        /** 场景 */
        static readonly scene: UILayer;
        /** 主界面 */
        static readonly main: UILayer;
        /** 一般界面 */
        static readonly window: UILayer;
        /** 一般界面上一层 */
        static readonly upperWin: UILayer;
        /** 压黑弹窗 */
        static readonly modal: UILayer;
        /**boss复活提示*/
        static readonly bossReliveTip: UILayer;
        /** 飘字提示 */
        static readonly tip: UILayer;
        /** 最顶层，用于强制指引 */
        static readonly top: UILayer;
        static setLyr(layer: UILayer): void;
        static remLyr(layer: UILayer): void;
        static getViewMdr(view: DisplayObject): Mdr;
        static hideMdr(layer: UILayer, exclude?: DisplayObject): void;
        static onSpTap(): void;
        static onHideModalLayer(): void;
        onResize(): void;
    }
}
declare namespace game {
    class LogUtil {
        static printLogin(str: string): void;
        static printBattle(str: string): void;
        static printBeatBack(str: string): void;
        static printIsLoginAccount(str: string): void;
        static printSkill(str: string): void;
        static printNvpuChallenge(str: string): void;
    }
}
declare namespace game {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    enum BoneResType {
        TYPE_JSON = "_tex.json",
        TYPE_TEX = "_tex.png",
        TYPE_SKE = "_ske.json"
    }
    class DragonBonesEx extends DisplayObjectContainer {
        textureData: any;
        texture: any;
        skeletonData: any;
        resName: string;
        private _paths;
        private _paths2;
        armatureName: string;
        armatureDisplay: dragonBones.EgretArmatureDisplay;
        armatureDisplay_dict: {
            [key: string]: dragonBones.EgretArmatureDisplay;
        };
        animationName: string;
        playTimes: number;
        playing: boolean;
        timeScale: number;
        private _parentContainer;
        private isDisposed;
        constructor();
        setResName(name: string): void;
        loadResourceByName(parent: DisplayObjectContainer, name: string): void;
        private onFail;
        private onSucc;
        createArmatureDisplay(): void;
        play(parent: DisplayObjectContainer, armatureName?: string, animationName?: string, playTimes?: number): void;
        stop(): void;
        setTimeScale(scale: number): void;
        dispose(): void;
    }
}
declare namespace game {
    import Handler = base.Handler;
    import ObjBase = base.ObjBase;
    import PoolObject = base.PoolObject;
    class AnimCtrl extends ObjBase implements PoolObject {
        private _url;
        private _durations;
        private _startTimes;
        private _curFrame;
        private _playing;
        private _loop;
        private _curTime;
        private _totalTime;
        private _finalFrame;
        private _speed;
        private _compHandler;
        compHandler: Handler;
        private _changeHandler;
        changeHandler: Handler;
        init(durations: number[], url: string, speed?: number, isLoop?: boolean, isStart?: boolean): void;
        curFrame: number;
        loop: boolean;
        readonly isPlaying: boolean;
        readonly isComplete: boolean;
        play(): void;
        stop(): void;
        readonly playing: boolean;
        advanceTime(elapseTime: number): void;
        private onFrameChange;
        private onComplete;
        dispose(): void;
        onAlloc(): void;
        onRelease(): void;
    }
}
declare namespace game {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Time = base.Time;
    import UpdateItem = base.UpdateItem;
    import PoolObject = base.PoolObject;
    import Handler = base.Handler;
    class UIAnimate extends DisplayObjectContainer implements UpdateItem, PoolObject {
        private _bmp;
        private _scaleXBmp;
        private _scaleXBmpOffX;
        private _ctrl;
        private _data;
        private _source;
        private _rate;
        private _failTimes;
        private _curTimes;
        times: number;
        complete: Handler;
        id: number;
        id2: number;
        speed: number;
        _playing: boolean;
        constructor();
        private init;
        load(source: string, frameRate?: number, isFailBack?: boolean, isMirror?: boolean, scaleXBmpOffX?: number): void;
        private onLoaded;
        private removeCurrent;
        play(): void;
        stop(): void;
        readonly bmp: BitmapBase;
        readonly playing: boolean;
        update(time: Time): void;
        private onFrameChange;
        private onComplete;
        dispose(): void;
        onAlloc(): void;
        onRelease(): void;
    }
}
declare namespace game {
    import Bitmap = egret.Bitmap;
    import PoolObject = base.PoolObject;
    import Texture = egret.Texture;
    class BitmapBase extends Bitmap implements PoolObject {
        keepOnRem: boolean;
        constructor(value?: Texture);
        /**
         * 设置显示内容，支持贴图地址，贴图对象
         */
        source: string | Texture;
        protected onLoaded(): void;
        removeFromParent(): void;
        verCenter(): void;
        dispose(): void;
        onAlloc(): void;
        onRelease(): void;
    }
}
declare namespace game {
    import UpdateItem = base.UpdateItem;
    import Time = base.Time;
    import Handler = base.Handler;
    class JsonTask implements UpdateItem {
        constructor();
        start(source: string[], onStep: Handler, onDone?: Handler): void;
        stop(): void;
        update(time: Time): void;
    }
}
declare namespace game {
    const LoadPri: {
        Map: number;
        CreateRole: number;
        UIScene: number;
        UI: number;
        Init: number;
        SceneMain: number;
        SceneMainPet: number;
        Scene: number;
        Max: number;
    };
    const MergeCfgType: {
        Bin: string;
        Json: string;
    };
    /**
     * 微信小游戏用到
     */
    enum ResType {
        IMAGE = "image",
        JSON = "json",
        ZIP = "zip",
        TEXT = "text",
        SOUND = "sound",
        BINARY = "binary",
        KTX = "ktx"
    }
    function parseObj(obj: any): any;
    function getUrlExt(url: string): string;
    function getResType(ext: string): string;
    /**
     * 微信重载此方法
     */
    function getTypeLdr(source: string, type: string): (url: string, source: string) => egret.EventDispatcher;
    /**
     * 微信重载此方法
     */
    function getTypeDcd(source: string, type: string): (loader: egret.EventDispatcher, url?: string) => any;
}
declare namespace game {
    import Handler = base.Handler;
    import UpdateItem = base.UpdateItem;
    import Time = base.Time;
    class LoadMgr implements UpdateItem {
        static readonly ins: LoadMgr;
        static SheetData: string;
        static VCfg: string;
        static FailList: {
            [key: string]: number;
        };
        private _releaseTime;
        private _aniReleaseTime;
        private _mapReleaseTime;
        private _commonUIReleaseTime;
        private _UIReleaseTime;
        loadJsonList(jsonList: string[], onProg: Handler, onComp: Handler): void;
        loadPreData(url: string): void;
        getRealUrl(url: string, ext: string): string;
        exists(url: string): boolean;
        getRes(url: string): any;
        setUIShow(value: boolean): void;
        getAnimDur(url: string): number[];
        /**检测是否还需要再次下载*/
        checkNeedLoad(url: string): boolean;
        /**已经加载过的资源，重复加载是不会执行onSucc回调的*/
        load(url: string, onSucc: Handler, priority: number, onFail?: Handler): void;
        unload(url: string): void;
        addJsonRes(url: string, res: any): void;
        loadMerge(url: string, onSucc: Handler, priority: number, frameRate?: number): void;
        addRef(url: string): void;
        decRef(url: string): void;
        checkNow(): void;
        loadGroup(list: string[], onComp: Handler, priority: number, onProg?: Handler): number;
        update(time: Time): void;
    }
}
declare namespace game {
    import PoolObject = base.PoolObject;
    import Texture = egret.Texture;
    import Bitmap = egret.Bitmap;
    class MergedBmp implements PoolObject {
        readonly scale: number;
        readonly numFrames: number;
        readonly isLoaded: boolean;
        getTexture(frame: string | number): Texture;
        drawTo(bmp: Bitmap, frame: string | number, scaleX?: number): void;
        getVal(frame: string | number, key: FrameKey): number;
        dispose(): void;
        onAlloc(): void;
        onRelease(): void;
    }
}
declare namespace game {
    import Handler = base.Handler;
    import UpdateItem = base.UpdateItem;
    import Time = base.Time;
    class SoundMgr implements UpdateItem {
        static readonly ins: SoundMgr;
        soundEftEnabled: boolean;
        isMute: boolean;
        enableSound(value: boolean): void;
        setBg(url: string): void;
        update(time: Time): void;
        playBg(): void;
        stopBg(): void;
        playEffect(url: string, onComplete?: Handler, isUI?: boolean): void;
        stopEffect(url: string): void;
    }
}
declare namespace game {
    class ArrayUtil {
        static insertAt<T>(array: Array<T>, index: number, object: T): void;
        static removeAt<T>(array: Array<T>, index: number): T;
    }
}
declare namespace game {
    import Point = egret.Point;
    class BezierUtil {
        /**
         *
         * @param ctrlPosArr 贝塞尔曲线控制点坐标
         * @param precison 精度，需要计算的该条贝塞尔曲线上的点的数目
         * @param resArr 该条贝塞尔曲线上的点（二维坐标）
         */
        static getBezierPos(ctrlPosArr: Array<Point>, precison: number): Array<Point>;
        /**
         * 获取杨辉三角对应阶数的值
         * @param num 杨辉三角阶数
         */
        static getYangHuiTriangle(num: number): Array<number>;
    }
}
declare namespace game {
    /** 旧颜色*/
    const enum Color {
        WHITE = 16777215,
        GREEN = 1022764,
        BLUE = 31431,
        PURPLE = 10617087,
        ORANGE = 12150784,
        RED = 13895688,
        YELLOW = 15577620,
        PINK = 15577620,
        DARKGREEN = 32283,
        GRAY = 8618626
    }
    const UIColorStr: {
        GRAY: string;
        YELLOW: string;
        WHITE: string;
        GREEN: string;
        BLUE: string;
        PURPLE: string;
        ORANGE: string;
        RED: string;
        PINK: string;
        DARK_YELLOW: string;
    };
    const enum UIColor {
        GRAY = 11056826,
        YELLOW = 16776960,
        WHITE = 16777215,
        GREEN = 65280,
        BLUE = 54527,
        PURPLE = 15739903,
        ORANGE = 16742400,
        RED = 16711680,
        PINK = 16728466,
        DARK_YELLOW = 15454614
    }
    const UIColor2Str: {
        GRAY: string;
        YELLOW: string;
        WHITE: string;
        GREEN: string;
        BLUE: string;
        PURPLE: string;
        ORANGE: string;
        RED: string;
        PINK: string;
        DARK_YELLOW: string;
    };
    /** 白底颜色*/
    const enum WhiteColor {
        DEFAULT = 3496307,
        DEFAULT2 = 2904685,
        WHITE = 16777215,
        GREEN = 2330156,
        BLUE = 31431,
        PURPLE = 10617087,
        ORANGE = 16748553,
        RED = 16719376,
        YELLOW = 15855403,
        GRAY = 8618626
    }
    /****************************新颜色分界线********************************/
    /** 黑底颜色*/
    const enum BlackColor {
        DEFAULT = 4435385,
        WHITE = 15262666,
        GREEN = 8585074,
        BLUE = 5893887,
        PURPLE = 15763967,
        ORANGE = 16757068,
        RED = 16731212,
        YELLOW = 16773203,
        GRAY = 7835024
    }
}
declare namespace game {
    class DisplayUtils {
        static UnParent(node: egret.DisplayObject): void;
    }
}
declare namespace game {
    class StringUtil {
        static ChineseNum: string[];
        static ChineseWeekNum: string[];
        static ChineseWeekNum2: string[];
        /**
         * 拼接字符串，比如将 "1" 拼成 "0001"
         * @param {string} str
         * @param {number} totalLen
         * @param {string} paddingChar
         * @returns {string}
         */
        static padString(str: string, totalLen: number, paddingChar?: string): string;
        /**
         * 替代字符串
         * @param str
         * @param params
         */
        static substitute(str: string, params: (string | number)[]): string;
        /**
         * 颜色符号替换颜色
         * @param str
         * @param isWhite
         */
        static replaceColorCode(str: string, isWhite?: boolean): string;
        static getNumByString(str: string): number[];
        /**
         * 伤害数值   转成带单位
         * @param hurt
         */
        static getHurtNumStr(hurt: number): string;
        /**
         * 战力数值转换，带有单位
         * 超过百万显示“万”，超过亿显示“亿”
         * @param power 战力值
         * @param fractionDigits 保留小数点后几位，默认不保留
         * @param preStr 战力值前文本，默认空
         * @param minionNum 默认百万才显示万，7
         */
        static getPowerNumStr(power: number, fractionDigits?: number, preStr?: string, minionNum?: number): string;
        private static units;
        private static chars;
        /**阿拉伯转中文 */
        static getCNBynumber(number: number): string;
    }
}
declare namespace game {
    const Second: {
        Day: number;
        Hour: number;
        Minute: number;
    };
    class TimeUtil {
        static getSyncTimer(): number;
        /**
         * 格式化时间戳，毫秒
         * @param {number} time 时间戳，毫秒
         * @param {string} [format=yyyy-MM-dd HH:mm:ss.SSS] y年，q季，M月，E星期，d日，h时（12小时），H时，m分，s秒，S毫秒
         * @returns {string}
         */
        static formatTime(time: number, format?: string): string;
        /**
         * 格式化时间戳，秒
         * @param {number} second 时间戳，秒
         * @param {string} [format=yyyy-MM-dd HH:mm:ss] y年，q季，M月，E星期，d日，h时（12小时），H时，m分，s秒，S毫秒
         * @returns {string}
         */
        static formatTimeSecond(second: number, format?: string): string;
        /**
         * 格式化剩余时间，秒
         * @param {number} second 时间，秒
         * @param {string} [format=dd:HH:mm:ss] d日，H时，m分，s秒
         * @param {boolean} adaption 是否自适应，比如显示d日，H时的，小于一小时时显示成m分，s秒
         * @returns {string}
         */
        static formatSecond(second: number, format?: string, adaption?: boolean): string;
        /**
         * 格式化时间戳，周几（0~6：周日~周六）
         * @param {number} time 时间戳，毫秒
         * @returns {number}
         */
        static formatWeekday(time: number): number;
        /**
         * 格式化时间戳，小时（0~23）
         * @param {number} time 时间戳，毫秒
         * @returns {number}
         */
        static formatHours(time: number): number;
        /**服务器时间*/
        static getServerTime(): Date;
        /**
         * 获取几天后的时间戳，会初始化到0点
         * @param {number} begin 开始时间戳
         * @param {boolean} isMillisecond 是否毫秒
         * @param {number} day 几天后
         * @returns {number}
         */
        static getNextDayTime(begin: number, isMillisecond?: boolean, day?: number): number;
        /**获取星期一0点时间戳(秒) */
        static getNextWeekTime(): number;
        /**time 单位为秒 */
        static getSecondByTomorrow(time: number): number;
        /**
         * 离线多久
         * */
        static getLeaveTime(lastTime: number): string;
        /**
         * 供奉时间文本转换
         * */
        static getConsecrateTime(seconds: number): string;
    }
}
