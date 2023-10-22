declare namespace game.mod.misc {
    class MiscMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.misc {
    import GameNT = base.GameNT;
    class GameConnectLostCmd extends CmdBase {
        exec(n: GameNT): void;
    }
}
declare namespace game.mod.misc {
    class InitMiscCmd extends CmdBase {
        exec(n: base.GameNT): void;
    }
}
declare namespace game.mod.misc {
    class OnRoleLoginCmd extends CmdBase {
        exec(n: base.GameNT): void;
    }
}
declare namespace game.mod.misc {
    class ServerErrCmd extends CmdBase {
        exec(n: base.GameNT): void;
    }
}
declare namespace game.mod.misc {
    import GameNT = base.GameNT;
    import UpdateItem = base.UpdateItem;
    class StartGameCmd extends CmdBase implements UpdateItem {
        private _list;
        exec(n: GameNT): void;
        update(): void;
        private initSetInfo;
    }
}
declare namespace game.mod.misc {
    class MiscModel {
        gameInit: boolean;
        lastSyncTick: number;
        gameSetting: object;
        isGou: boolean;
        setSetting(key: string, val: string): void;
        private _adCnt;
        readonly adCnt: number;
        setAdCnt(v: number): void;
    }
}
declare namespace game.mod.misc {
    import setting = msg.setting;
    class MiscProxy extends ProxyBase implements IMiscProxy {
        private _data;
        readonly data: MiscModel;
        intiGameSetting(settings: setting[]): void;
        private initSetting;
        private updateSetting;
        getSetting(key: string): string;
        getSettingN(key: string): number;
        lastSyncTick: number;
        isGou: boolean;
        initialize(): void;
        private onRoleLogin;
        private onTips;
        private onSyncTime;
        private onServerMsgBox;
        private onPing;
        setSetting(key: string, val: string, now?: boolean): void;
        sendGM(text: string): void;
        changeName(name: string, sex: number): void;
        syncTime(): void;
    }
}
declare namespace game.mod.misc {
    import Time = base.Time;
    import UpdateItem = base.UpdateItem;
    class MiscMdr extends EffectMdrBase implements UpdateItem {
        private _timeout;
        private _proxy;
        private _enableSyncTime;
        private static UpdateInterval;
        private _point;
        constructor();
        private init;
        protected newView(): void;
        show(obj?: any): void;
        protected addListeners(): void;
        private onTap;
        private onActivate;
        private onDeactivate;
        startSyncTime(): void;
        stopSyncTime(): void;
        update(time: Time): void;
        private onPaySuccess;
        private onGetOrderStart;
        private onGetOrderEnd;
        private onGetOrderError;
    }
}
