namespace game.mod.activity {


    import c2s_yuhuochongsheng_get_rewards = msg.c2s_yuhuochongsheng_get_rewards;
    import GameNT = base.GameNT;
    import s2c_yuhuochongsheng_info = msg.s2c_yuhuochongsheng_info;
    import YuhuoRewardConfig = game.config.YuhuoRewardConfig;
    import ParamConfig = game.config.ParamConfig;

    export class YhcsProxy extends ProxyBase {
        private _model: YhcsModel;

        public get model() {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new YhcsModel();

            this.onProto(s2c_yuhuochongsheng_info, this.s2c_yuhuochongsheng_info, this);
        }

        /**--------------------协议start-------------------- */

        public c2s_yuhuochongsheng_get_rewards(index: number): void {
            let msg: c2s_yuhuochongsheng_get_rewards = new c2s_yuhuochongsheng_get_rewards();
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_yuhuochongsheng_info(n: GameNT): void {
            let msg: s2c_yuhuochongsheng_info = n.body;
            if (msg.list) {
                this._model.list = msg.list;
            }
            if (msg.open_day) {
                this._model.open_day = msg.open_day;
            }
            this._model.num = msg.num || 0;

            this.onUpdateHint();
            this.sendNt(ActivityEvent.ON_UPDATE_YHCS_INFO);
        }

        /**--------------------协议end-------------------- */

        /**获取奖励列表 */
        public getList(): YuhuoRewardConfig[] {
            let cfgArr: YuhuoRewardConfig[] = getConfigListByName(ConfigName.YuhuoReward);
            let self = this;
            return cfgArr.sort((a: YuhuoRewardConfig, b: YuhuoRewardConfig) => {
                if (!self._model.list) {
                    return a.index - b.index;
                }
                let b1: boolean = self._model.list.indexOf(a.index) > -1;
                let b2: boolean = self._model.list.indexOf(b.index) > -1;
                if (b1 != b2) {
                    if (b1) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
                return a.index - b.index;
            });
        }

        /**是否充值达标 */
        public get isEnough(): boolean {
            if (this._model.isEnough) {
                return this._model.isEnough;
            }
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "yuhuochongsheng_leichong");
            return this._model.isEnough = this._model.num >= cfg.value;
        }

        /**是否已领取 */
        public isReceived(index: number): boolean {
            return this._model.list && this._model.list.indexOf(index) > -1;
        }

        /**用于判断活动图标隐藏 */
        public isActivityEnd(): boolean {
            let cfgArr: YuhuoRewardConfig[] = getConfigListByName(ConfigName.YuhuoReward);
            for (let cfg of cfgArr) {
                if (!this.isReceived(cfg.index)) {
                    return false;
                }
            }
            return true;
        }

        private onUpdateHint(): void {
            if (!this.isEnough) {
                HintMgr.setHint(false, [ModName.Activity, MainActivityViewType.Yhcs]);
                return;
            }
            let cfgArr: YuhuoRewardConfig[] = getConfigListByName(ConfigName.YuhuoReward);
            for (let cfg of cfgArr) {
                let bool: boolean = this._model.open_day >= cfg.open_day && !this.isReceived(cfg.index);
                if (bool) {
                    HintMgr.setHint(bool, [ModName.Activity, MainActivityViewType.Yhcs]);
                    return;
                }
            }
            HintMgr.setHint(false, [ModName.Activity, MainActivityViewType.Yhcs]);
        }

        public isOpen(): boolean {
            if (!this._model.list) {
                return true;
            }
            let cfgArr: YuhuoRewardConfig[] = getConfigListByName(ConfigName.YuhuoReward);
            for (let cfg of cfgArr) {
                if (this._model.list.indexOf(cfg.index) < 0) {
                    return true;
                }
            }
            return false;
        }
    }
}