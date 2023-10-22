namespace game.mod {

    import IProxy = base.IProxy;

    export interface IBossProxy extends IProxy {
        c2s_new_multiple_boss_info(): void;

        getCurVal(): number;

        readonly bossTime: number;

        isBossOpen(type: number, showTips?: boolean): boolean;

        onUpdateTips(): void;

        updateCrossBossTips(): void;
    }
}