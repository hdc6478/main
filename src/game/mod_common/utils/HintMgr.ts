namespace game.mod {

    import facade = base.facade;

    export class HintMgr {
        /**
         * 设置红点 （注意子节点key的唯一）
         * @param value，红点值
         * @param node 第一层为ModName，后序需要自身模块Def文件定义，例如ModName.Role_RoleViewType.RoleMain_RoleMainBtnType.BtnRole
         * @param openIdx，功能id，可缺省
         */
        public static setHint(value: boolean, node: string[], openIdx?: number): void {
            let proxy: IHintProxy = facade.retMod(ModName.Hint).retProxy(ProxyType.Hint);
            proxy.setHint(value, node, openIdx);
        }

        /**
         * 获取红点
         * @param node
         */
        public static getHint(node: string[]): boolean {
            let proxy: IHintProxy = facade.retMod(ModName.Hint).retProxy(ProxyType.Hint);
            return proxy.getHint(node);
        }

        /**
         * 根据功能idx获取红点
         * @param openIdx
         */
        public static getHintByOpenIdx(openIdx: number): boolean {
            let proxy: IHintProxy = facade.retMod(ModName.Hint).retProxy(ProxyType.Hint);
            return proxy.getHintByOpenIdx(openIdx);
        }

        /**
         * 根据功能idx获取红点唯一key
         * @param openIdx
         */
        public static getTypeByOpenIdx(openIdx: number): string{
            let proxy: IHintProxy = facade.retMod(ModName.Hint).retProxy(ProxyType.Hint);
            return proxy.getTypeByOpenIdx(openIdx);
        }

        /**红点类型转换*/
        public static getType(node: string[]): string {
            if(!node || !node.length){
                return "";//防报错处理
            }
            return node.toString().replace(/\,/g,'');/**转化为红点类型*/
        }

        /**
         * 添加定时器事件
         * @param type：TimeEventType，定时器类型
         * @param time：到点执行的时间戳
         * @param proxy：自己的proxy
         * @param method：执行的方法
         * @param args：方法携带的参数
         */
        public static addTimeEvent(type: number, time: number, proxy: any, method: Function, args?: any[]): void {
            let hintProxy: IHintProxy = facade.retMod(ModName.Hint).retProxy(ProxyType.Hint);
            hintProxy.addTimeEvent(type, time, proxy, method, args);
        }
        /**
         * 是否存在定时器事件
         * @param type：TimeEventType，定时器类型
         */
        public static hasTimeEvent(type: number): boolean {
            let hintProxy: IHintProxy = facade.retMod(ModName.Hint).retProxy(ProxyType.Hint);
            return hintProxy.hasTimeEvent(type);
        }
        /**
         * 移除定时器事件
         * @param type：TimeEventType，定时器类型
         */
        public static removeTimeEvent(type: number): void {
            let hintProxy: IHintProxy = facade.retMod(ModName.Hint).retProxy(ProxyType.Hint);
            hintProxy.removeTimeEvent(type);
        }

    }
}