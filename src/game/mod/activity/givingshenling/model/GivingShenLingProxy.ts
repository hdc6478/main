namespace game.mod.activity {

    import c2s_yaoji_get_reward = msg.c2s_yaoji_get_reward;
    import GameNT = base.GameNT;
    import s2c_yaoji_online_info = msg.s2c_yaoji_online_info;
    import ParamConfig = game.config.ParamConfig;

    /**送瑶姬(在线领奖励活动) */
    export class GivingShenLingProxy extends ProxyBase {
        private _model: GivingShenLingModel;

        public get model() {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new GivingShenLingModel();

            this.onProto(s2c_yaoji_online_info, this.s2c_yaoji_online_info, this);
        }

        /**--------------------协议start-------------------- */

        public c2s_yaoji_get_reward(): void {
            let msg: c2s_yaoji_get_reward = new c2s_yaoji_get_reward();
            this.sendProto(msg);
            this._model.isClick = true;
        }

        private s2c_yaoji_online_info(n: GameNT): void {
            let msg: s2c_yaoji_online_info = n.body;
            if (msg.login_time) {
                this._model.login_time = msg.login_time;
            }
            if (msg.receive) {
                this._model.receive = msg.receive;
                if (this._model.isClick) {
                    //瑶姬降世跳转判断，需判断是否在开启中
                    let yjjsProxy: YjjsProxy = getProxy(ModName.Activity, ProxyType.Yjjs);
                    if (yjjsProxy.isOpen()) {
                        ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.YjjsFirstMain);
                    }
                }
            }
            if (msg.online_time) {
                this._model.online_time = msg.online_time;
            }
            this.onUpdateHint();
            this.checkOpen();
            this.sendNt(ActivityEvent.ON_UPDATE_GIVING_SHENLING_INFO);
        }

        /**--------------------协议end-------------------- */

        /**获得奖励需要的时间 */
        private get cfgTime(): number {
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "give_shenling_time");
            let time: number = cfg.value * Second.Minute;
            return time;
        }

        /**结束时间 */
        public getEndTime(): number {
            let time: number = this.cfgTime - this._model.online_time;
            return this._model.login_time + (time < 0 ? 0 : time);
        }

        /** */
        private onUpdateHint(): void {
            if (this.getEndTime() >= 0) {
                HintMgr.addTimeEvent(TimeEventType.GivingShenLing, this.getEndTime(), this, this.updateHint);
            }
            this.updateHint();
        }

        private updateHint(): void {
            let bool: boolean = this._model.online_time >= this.cfgTime && this._model.receive == 1;
            HintMgr.setHint(bool, [ModName.Activity, MainActivityViewType.GivingShenLing]);
        }

        public get isOpen(): boolean {
            return this._model.receive != 2
        }

        private checkOpen(): void {
            BtnIconMgr.insLeft().updateOpen(BtnIconId.GivingShenLing, this.isOpen);
        }
    }
}