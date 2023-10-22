declare namespace game.mod.hint {
    class HintMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.hint {
    class HintModel {
        /**
         * 红点树
         */
        tree: HintTree;
        openIdxToNode: {
            [openIdx: number]: string[];
        };
    }
}
declare namespace game.mod.hint {
    import UpdateItem = base.UpdateItem;
    class HintProxy extends ProxyBase implements IHintProxy, UpdateItem {
        private _model;
        private _eventList;
        initialize(): void;
        onStartReconnect(): void;
        update(time: base.Time): void;
        /**
         * 添加定时器事件
         * @param type：TimeEventType，定时器类型
         * @param time：到点执行的时间戳
         * @param proxy：自己的proxy
         * @param method：执行的方法
         * @param args：方法携带的参数
         */
        addTimeEvent(type: number, time: number, proxy: any, method: Function, args?: any[]): void;
        /**
         * 是否存在定时器事件
         * @param type：TimeEventType，定时器类型
         */
        hasTimeEvent(type: number): boolean;
        /**
         * 移除定时器事件
         * @param type：TimeEventType，定时器类型
         */
        removeTimeEvent(type: number): void;
        /**
         * 获取红点
         * @param node
         */
        getHint(node: string[]): boolean;
        /**
         * 根据功能idx获取红点
         * @param openIdx
         */
        getHintByOpenIdx(openIdx: number): boolean;
        /**
         * 根据功能idx获取红点唯一key
         * @param openIdx
         */
        getTypeByOpenIdx(openIdx: number): string;
        /**
         * 设置红点 （注意子节点key的唯一）
         * @param value，红点值
         * @param node 第一层为ModName，后序需要自身模块Def文件定义，例如ModName.Role_RoleViewType.RoleMain_RoleMainBtnType.BtnRole
         * @param openIdx，功能id，可缺省
         */
        setHint(value: boolean, node: string[], openIdx?: number): void;
        /**
         * 更新父节点红点
         * @param tree
         */
        private updateTreeHint;
    }
}
declare namespace game.mod.hint {
    import PoolObject = base.PoolObject;
    class HintTree implements PoolObject {
        node: string; /**节点唯一key，与系统分页定义同值*/
        parent: HintTree; /**父节点*/
        children: {
            [node: string]: HintTree;
        }; /**子节点*/
        private _value; /**红点值*/
        private _timeOut; /**延迟0.3秒派发事件，防止多次触发事件*/
        onAlloc(): void;
        onRelease(): void;
        dispose(): void;
        setValue(value: boolean, sendEvent?: boolean): void;
        readonly value: boolean;
    }
}
