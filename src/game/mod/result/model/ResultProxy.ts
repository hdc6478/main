namespace game.mod.result {

    import s2c_instance_fin = msg.s2c_instance_fin;
    import GameNT = base.GameNT;
    import delayCall = base.delayCall;
    import Handler = base.Handler;
    import facade = base.facade;
    import c2s_next_scene = msg.c2s_next_scene;
    import IProxy = base.IProxy;

    export class ResultProxy extends ProxyBase implements IProxy{

        private _model: ResultModel;
        //本次副本胜利还是失败
        is_success:boolean;

        public getModel(): ResultModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();

            this._model = new ResultModel();
            this.onProto(s2c_instance_fin, this.onResultBack, this);
        }

        /**结算信息返回*/
        private onResultBack(n: GameNT) {
            let msg: s2c_instance_fin = n.body;
            this.is_success = msg.is_success;
            let self = this;
            delayCall(Handler.alloc(this,function () {
                self.sendNt(ResultEvent.ON_RESULT_POPUP, msg);
            }), 1000);
            if(msg.is_success && msg.type == SceneType.HangUp2) {
                let _passProxy: IPassProxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
                _passProxy.curIndex = msg.index + 1;           // 闯关成功后，关卡数变化
            }
        }

        /**
         * 继续挑战
         */
        public c2s_next_scene(): void {
            let msg: c2s_next_scene = new c2s_next_scene();
            this.sendProto(msg);
        }
    }

}