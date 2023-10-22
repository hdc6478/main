namespace game.mod {

    import IProxy = base.IProxy;
    import setting = msg.setting;

    export interface IMiscProxy extends IProxy {

        lastSyncTick: number;

        isGou: boolean;

        intiGameSetting(settings: setting[]): void

        getSetting(key: string): string;
        getSettingN(key: string): number;


        setSetting(key: string, val: string, now?: boolean): void;

        sendGM(text: string): void;

        changeName(name: string, sex: number): void;

        syncTime(): void;

    }
}