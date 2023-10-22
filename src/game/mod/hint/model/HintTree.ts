namespace game.mod.hint {

    import PoolObject = base.PoolObject;
    import Pool = base.Pool;
    import facade = base.facade;
    import delayCall = base.delayCall;
    import Handler = base.Handler;
    import clearDelay = base.clearDelay;

    export class HintTree implements PoolObject {
        public node: string;/**节点唯一key，与系统分页定义同值*/
        //例如角色模块里面的角色按钮ModName.Role + RoleViewType.RoleMain + RoleMainBtnType.BtnRole，060100
        public parent: HintTree;/**父节点*/
        public children: { [node: string]: HintTree } = {};/**子节点*/
        private _value: boolean;/**红点值*/
        private _timeOut: number = 0;/**延迟0.3秒派发事件，防止多次触发事件*/


        onAlloc(): void {
        }

        onRelease(): void {
            let self = this;
            self.node = null;
            self._value = null;
            if (self._timeOut) {
                clearDelay(self._timeOut);
                self._timeOut = 0;
            }
            for (let k in self.children) {
                let tree = self.children[k];
                Pool.release(tree);
                delete self.children[k];
            }
        }

        dispose(): void {
            this.onRelease();
        }

        public setValue(value: boolean, sendEvent?: boolean): void {
            this._value = value;
            if(!sendEvent){
                return;
            }
            if(this._timeOut){
                return;
            }
            this._timeOut = delayCall(Handler.alloc(this, () => {
                let data: IHintData = {node: this.node, value: this._value};
                facade.sendNt(HintEvent.ON_COMMON_HINT_UPDATE, data);
                this._timeOut = 0;
            }), 300);

        }
        public get value(): boolean {
            return this._value;
        }
    }
}