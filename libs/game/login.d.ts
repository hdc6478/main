declare namespace game {
    class PreloadMgr {
        static onResPro(p: number): void;
        static onResComp(): void;
    }
}
/** @internal */
/** @internal */
/** @internal */
declare namespace game.login {
    import UIComponent = uilib.UIComponent;
    import TextFieldBase = uilib.TextFieldBase;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Button = uilib.Button;
    class PrivacyAlertView extends UIComponent {
        btnClose: Button;
        btnConfirm: Button;
        btnCancel: Button;
        labelContainer: DisplayObjectContainer;
        labAgree: TextFieldBase;
        constructor();
        protected _setup(): void;
    }
}
declare namespace game.login {
    import UIComponent = uilib.UIComponent;
    import TextFieldBase = uilib.TextFieldBase;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Button = uilib.Button;
    class PrivacyView extends UIComponent {
        btnClose: Button;
        btnConfirm: Button;
        btnCancel: Button;
        labelContainer: DisplayObjectContainer;
        lab_tips: TextFieldBase;
        constructor();
        protected _setup(): void;
    }
}
/** @internal */
/** @internal */
declare namespace game {
    interface ILoginProxy extends base.IProxy {
        role_id: Long;
        create_time: number;
        disConnectPopBox: msg.s2c_pop_box;
    }
    function GetLoginUrl(url: string): string;
    function GetCreateRoleUrl(url: string): string;
    const enum LoginEvent {
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
        USER_ARGREEMENT_TIP_CONFIRM = "USER_ARGREEMENT_TIP_CONFIRM"
    }
    const enum Sex {
        /**男*/
        Male = 1,
        /**女*/
        Female = 2
    }
    const enum AgeType {
        /** 青年 */
        Young = 1,
        /** 成年 */
        Youth = 2
    }
    const enum AlertCheckType {
        Youli = 1
    }
}
declare namespace game.login {
    import Cmd = base.Cmd;
    import GameNT = base.GameNT;
    class BackToStartView extends Cmd {
        exec(n: GameNT): void;
    }
}
/** @internal */
/** @internal */
/** @internal */
/** @internal */
declare namespace game.login {
    import Mdr = base.Mdr;
    class PrivacyAlertMdr extends Mdr {
        private _view;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private clearLabContainer;
        protected onHide(): void;
        private onTapLink;
    }
}
declare namespace game.login {
    import Mdr = base.Mdr;
    import UpdateItem = base.UpdateItem;
    class PrivacyMdr extends Mdr implements UpdateItem {
        private _view;
        private _txt;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private getLabStr;
        private privacyTxt;
        private setTxt;
        private clearLabContainer;
        protected onHide(): void;
        update(time: base.Time): void;
        private updateLabY;
        private cancel;
        private onRefuse;
        private confirm;
    }
}
