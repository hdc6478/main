namespace game.mod.hint {
    import Pool = base.Pool;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import Handler = base.Handler;

    export class HintProxy extends ProxyBase implements IHintProxy, UpdateItem {
        private _model: HintModel;
        private _eventList: {[type: number] : {time: number, handler: Handler}} = {};//定时器数据

        initialize(): void {
            super.initialize();
            this._model = new HintModel();
            this._model.tree = Pool.alloc(HintTree);
        }

        public onStartReconnect(): void {
            super.onStartReconnect();
            TimeMgr.removeUpdateItem(this);
        }

        update(time: base.Time) {
            let eventList = this._eventList;
            if(!eventList){
                TimeMgr.removeUpdateItem(this);
                return;
            }
            for(let k in eventList){
                let info = eventList[k];
                let leftTime = info.time - TimeMgr.time.serverTimeSecond;
                if (leftTime == 0) {
                    let handler = info.handler;
                    handler.exec();
                    Pool.release(handler);
                }
                if(leftTime <= 0){
                    delete eventList[k];
                }
            }
            if(!RoleUtil.hasObj(eventList)){
                TimeMgr.removeUpdateItem(this);
            }
            // if (JSON.stringify(eventList) == "{}") {
            //     TimeMgr.removeUpdateItem(this);
            // }
        }
        /**
         * 添加定时器事件
         * @param type：TimeEventType，定时器类型
         * @param time：到点执行的时间戳
         * @param proxy：自己的proxy
         * @param method：执行的方法
         * @param args：方法携带的参数
         */
        public addTimeEvent(type: number, time: number, proxy: any, method: Function, args?: any[]): void {
            let eventList = this._eventList;
            let oldInfo = eventList[type];
            if(!oldInfo){
                eventList[type] = {time: time, handler: Handler.alloc(proxy, method, args)};
            }
            else {
                if(oldInfo.time != time){
                    eventList[type] = {time: time, handler: Handler.alloc(proxy, method, args)};
                }
            }
            if (!TimeMgr.hasUpdateItem(this)) {
                TimeMgr.addUpdateItem(this, 1000);
            }
        }
        /**
         * 是否存在定时器事件
         * @param type：TimeEventType，定时器类型
         */
        public hasTimeEvent(type: number): boolean {
            let eventList = this._eventList;
            let oldInfo = eventList[type];
            return !!oldInfo;
        }
        /**
         * 移除定时器事件
         * @param type：TimeEventType，定时器类型
         */
        public removeTimeEvent(type: number): void {
            let eventList = this._eventList;
            delete eventList[type];
        }

        /**
         * 获取红点
         * @param node
         */
        public getHint(node: string[]): boolean {
            let tree: HintTree = this._model.tree;
            let key = "";
            for (let i = 0; i < node.length; i++) {
                key += node[i] as string;
                let children = tree.children[key];
                if (!children) {
                    return false;
                }
                tree = children;
            }
            return tree.value;
        }

        /**
         * 根据功能idx获取红点
         * @param openIdx
         */
        public getHintByOpenIdx(openIdx: number): boolean {
            let node = this._model.openIdxToNode[openIdx];
            if(!node){
                return false;
            }
            return this.getHint(node);
        }

        /**
         * 根据功能idx获取红点唯一key
         * @param openIdx
         */
        public getTypeByOpenIdx(openIdx: number): string {
            let node = this._model.openIdxToNode[openIdx];
            if(!node){
                return null;
            }
            return HintMgr.getType(node);
        }

        /**
         * 设置红点 （注意子节点key的唯一）
         * @param value，红点值
         * @param node 第一层为ModName，后序需要自身模块Def文件定义，例如ModName.Role_RoleViewType.RoleMain_RoleMainBtnType.BtnRole
         * @param openIdx，功能id，可缺省
         */
        public setHint(value: boolean, node:string[], openIdx?: number) {
            let tree: HintTree = this._model.tree;
            let key = "";
            for (let i = 0; i < node.length; i++) {
                /**向下寻找节点*/
                key += node[i] as string;
                let children = tree.children[key];
                if (!children) {
                    /**节点不存在时，只有触发红点才创建新的节点*/
                    if(!value){
                        return;
                    }
                    children = tree.children[key] = Pool.alloc(HintTree);
                    children.node = key;
                    children.parent = tree;
                    children.setValue(false);/**创建节点时，默认赋值false*/
                }
                if(value && children.value != value){
                    /**向下寻找节点的时候，触发节点红点时，则不再向上刷新节点树*/
                    children.setValue(value, true);/**发送事件*/
                }
                tree = children;
                /**功能idx关联红点*/
                if(i == node.length - 1 && openIdx){
                    this._model.openIdxToNode[openIdx] = node;
                }
            }
            /**判断子节点红点，红点由true转为false时，需要向上传递*/
            if (tree.value != value) {
                tree.setValue(value, true);/**发送事件*/
                /**更新父节点*/
                this.updateTreeHint(tree);
            }
        }

        /**
         * 更新父节点红点
         * @param tree
         */
        private updateTreeHint(tree: HintTree) {
            let parentTree = tree.parent;
            //做下限制，父节点存在node时才赋值
            while (parentTree && parentTree.node){
                let value = false;
                let keys = Object.keys(parentTree.children);
                for (let j = 0; j < keys.length; j++) {
                    if (parentTree.children[keys[j]].value) {
                        value = true;
                        break;/**任意子节点红点为true时，设置父节点红点为true*/
                    }
                }
                if (parentTree.value != value) {
                    /**父节点红点变更*/
                    parentTree.setValue(value, true);/**发送事件*/
                    /**父节点向上传递*/
                    parentTree = parentTree.parent;
                }
                else {
                    /**父节点红点不变时，停止向上传递*/
                    parentTree = null;
                }
            }
        }
    }
}