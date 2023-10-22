namespace game {
    export const enum LauncherEvent {
        ON_ACTIVATE = "on_activate",
        ON_DEACTIVATE = "on_deactivate",
        ON_RESIZE = "on_resize",
        ON_RELOAD = "on_reload",
        SHOW_START = "show_start",
        WEB_LOGIN_ERROR = "web_login_error"
    }

    export const enum LauncherLan {
        Week_0 = "星期日",
        Week_1 = "星期一",
        Week_2 = "星期二",
        Week_3 = "星期三",
        Week_4 = "星期四",
        Week_5 = "星期五",
        Week_6 = "星期六",

        Zhou_0 = "周日",
        Zhou_1 = "周一",
        Zhou_2 = "周二",
        Zhou_3 = "周三",
        Zhou_4 = "周四",
        Zhou_5 = "周五",
        Zhou_6 = "周六",
    }

    export const ApiUserStatus: { [key: string]: string } = {
        "0": "服务器维护中",
        "-1": "游戏内容有更新，请重新启动游戏",
        "100":"请求服务器列表未返回",
    };
}
