declare namespace egret.sys {
    /**
     * Egret心跳计时器
     */
    interface SystemTicker {
        /**
         * @private
         * 执行一次刷新
         */
        update(forceUpdate?: boolean): void;
        fSTime: number;
    }
}
declare namespace egret {
    function getTimer(): number;
}
declare let newCount: number;
declare let frameCount: number;
declare let checkCountFrame: number;
