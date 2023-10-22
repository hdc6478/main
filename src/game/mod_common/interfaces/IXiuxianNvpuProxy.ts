namespace game.mod {
    import IProxy = base.IProxy;
    import Handler = base.Handler;

    export interface IXiuxianNvpuProxy extends IProxy {
        /**女仆是否激活，true为激活。isTips是否飘字，showConfirm是否展示确定弹窗*/
        isActed(isTips?: boolean, showConfirm?: boolean): boolean;

        /**
         * 添加可挑战的副本事件
         */
        addAutoChallengeEvent(type: XiuxianNvpuEventType, handler: Handler): void;

        /**
         * 移除副本事件
         * @param type 事件类型
         * @param isReset 当前正在处理类型==type且是特殊情况，马上重置处理下一轮，默认false。一般不需要传，退出副本或者关闭扫荡界面等，会重置处理下一轮。
         */
        removeAutoChallengeEvent(type: XiuxianNvpuEventType, isReset?: boolean): void;

        /**
         * 当前正在处理的事件类型
         */
        readonly autoChallengeEventType: XiuxianNvpuEventType;

        //女仆的神灵幻化等级
        readonly show_index: number;

        //神灵id
        readonly shenlingId: number;

        /**判断挂机类型勾选状态*/
        isNvpuOnlineSelected(eventType: XiuxianNvpuEventType): boolean;

        /**修改勾选状态 selected表示勾选状态*/
        setNvpuOnlineSetting(eventType: XiuxianNvpuEventType, selected: boolean): void;
    }

}