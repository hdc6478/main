namespace game {
    export interface ILoginProxy extends base.IProxy {
        role_id: Long;
        create_time: number;
        disConnectPopBox: msg.s2c_pop_box;
    }

    /** @internal */
    export interface ServerHost {
        server_id: number;
        name: string;
        status: string;
        onlinedate: number;
        level: number;
    }

    /** @internal */
    export interface ServerType {
        name: string,
        min: number,
        max: number
    }

    export function GetLoginUrl(url: string): string {
        return `assets/login/${url}.png`;
    }

    export function GetCreateRoleUrl(url: string): string {
        return `assets/create_role/${url}`;
    }

    export const enum LoginEvent {
        UPDATE_CURRENT_SERVER = "update_current_server",
        TAP_SELECT_SERVER = "tap_select_server",
        TAP_SERVER_TYPE = "tap_server_type",
        SHOW_NOTICE = "show_notice",

        ON_GOT_SERVER_INFO = "on_got_server_info",

        PRELOAD_PROGRESS = "preload_progress",
        LOAD_GAME_RES = "load_game_res",
        ENTER_MAIN = "enter_main",

        START_CONNECT = "start_connect",
        ON_ACCOUNT_LOGIN = "on_account_login",
        ON_ROLE_CREATE = "on_role_create",
        TRY_RECONNECT = "try_reconnect",
        GAME_CONNECT_LOST = "game_connect_lost",
        BACK_TO_START_VIEW = "reconnect_cmd",
        ADULT_CHANGE = "adult_change",
        USER_ARGREEMENT_TIP_CONFIRM = "USER_ARGREEMENT_TIP_CONFIRM",
    }

    export const enum Sex {
        /**男*/
        Male = 1,
        /**女*/
        Female = 2,
    }

    export const enum AgeType {
        /** 青年 */
        Young = 1,
        /** 成年 */
        Youth = 2,
    }


    /** @internal */ export const ReConnectMax = 8;


    //0未开服 1维护hui  2火爆hong（开服大于1天而且不是最新服） 3推荐黄色（今日开的服） 4最新服绿色
    /** @internal */ export const ServerStatusImg = {
        "0": "huang",
        "1": "hong",
        "2": "lv",
        "3": "lv",
        "4": "huang",
        "5": "hong"
    };

    /** @internal */ export const ServerStatusColor = {
        "0": 0x595959,
        "1": 0xff0000,
        "2": 0x00fd1f,
        "3": 0x00fd1f,
        "4": 0x595959,
        "5": 0xff0000
    };

    export const enum AlertCheckType {
        Youli = 1,//游历
    }

}
