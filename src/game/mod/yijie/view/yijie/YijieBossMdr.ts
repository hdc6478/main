namespace game.mod.yijie {

    import TouchEvent = egret.TouchEvent;
    import s2c_yijie_rate_boss_update = msg.s2c_yijie_rate_boss_update;
    import facade = base.facade;
    import YijieConfig = game.config.YijieConfig;

    export class YijieBossMdr extends EffectMdrBase {
        private _view: YijieBossView = this.mark("_view", YijieBossView);
        private _sceneProxy: ISceneProxy;
        private _proxy: YijieProxy;
        private _effId: number;
        public _showArgs: s2c_yijie_rate_boss_update;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._sceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            this._proxy = this.retProxy(ProxyType.Yijie);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_goto, TouchEvent.TOUCH_TAP, this.onClickGoto);
        }

        protected onShow(): void {
            super.onShow();

            this.updateBoss();
        }

        protected onHide(): void {
            this._effId = 0;
            super.onHide();
        }

        private onClickGoto(): void {
            let info = this._showArgs;
            this._sceneProxy.requestMonster(info.entity_id);
            this.hide();
        }

        private updateBoss(): void {
            let info = this._showArgs;
            let stage = info.stage;
            let index = info.index;
            let cfg = this._proxy.getBossCfg(stage, index);

            if(this._effId) {
                this.removeEffect(this._effId);
            }
            let monsterIndex = cfg.monster_index[0];
            this._effId = this.addMonster(monsterIndex, this._view.grp_eff);
        }
    }
}