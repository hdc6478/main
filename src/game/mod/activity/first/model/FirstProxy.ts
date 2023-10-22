namespace game.mod.activity {

    import s2c_super_first_charge_info = msg.s2c_super_first_charge_info;
    import GameNT = base.GameNT;
    import s2c_super_first_charge_advertise = msg.s2c_super_first_charge_advertise;
    import c2s_super_first_charge_reward = msg.c2s_super_first_charge_reward;
    import ShouchongConfig = game.config.ShouchongConfig;
    import facade = base.facade;
    import s2c_first_charge = msg.s2c_first_charge;
    import TimeMgr = base.TimeMgr;

    export class FirstProxy extends ProxyBase implements IFirstProxy {
        private _model: FirstModel;

        public get model() {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new FirstModel();

            this.onProto(s2c_super_first_charge_info, this.s2c_super_first_charge_info, this);
            this.onProto(s2c_super_first_charge_advertise, this.s2c_super_first_charge_advertise, this);
            this.onProto(s2c_first_charge, this.s2c_first_charge, this)
        }

        /**--------------------协议start-------------------- */

        private s2c_super_first_charge_info(n: GameNT): void {
            let msg: s2c_super_first_charge_info = n.body;
            if (msg) {
                this._model.charged = msg.charged || 0;
                this._model.infos = msg.infos || [];
                // this._model.open_day = msg.open_day || 1;
            }
            this.onUpdatHint();
            this.checkOpen();
            this.sendNt(ActivityEvent.ON_UPDATE_FIRST_RECHARGE_INFO);
        }

        private s2c_first_charge(n: GameNT): void {
            let msg: s2c_first_charge = n.body;
            if (msg) {
                this._model.one_first = msg.one_first;
            }
        }

        /**后端通知打开弹窗 */
        private s2c_super_first_charge_advertise(): void {
            if (ViewMgr.getIns().checkModOpen(ModName.Shenling)) {
                this._model.cache_times = true;
                return;
            }
            facade.showView(ModName.Activity, MainActivityViewType.FirstCharge);
        }

        /**
         * 领取奖励
         * @param index 福利大厅编号
         * @param day_no 领取第几天的奖励
         * */
        public c2s_super_first_charge_reward(index: number, day_no: number): void {
            let msg: c2s_super_first_charge_reward = new c2s_super_first_charge_reward();
            msg.index = index;
            msg.day_no = day_no;
            this.sendProto(msg);
        }

        /**--------------------协议end-------------------- */

        public getIndex(type?: number): number {
            if (type) {
                let day: number = this.getDayByType(type);
                if (day < this._model.receive) {
                    return type - 1;
                }
            }
            let cfgArr: ShouchongConfig[] = getConfigListByName(ConfigName.Shouchong);
            for (let cfg of cfgArr) {
                let type: number = cfg.index % 100;
                let day: number = this.getDayByType(type);
                let index: number = type - 1;
                if (day < this._model.receive && index >= 0) {
                    return index;
                }
            }
            return 0;
        }

        /**根据类型获取配置 */
        public getCfgByType(type: number): ShouchongConfig {
            let cfgArr: ShouchongConfig[] = getConfigListByName(ConfigName.Shouchong);
            for (let cfg of cfgArr) {
                if (cfg.index % 100 == type) {
                    return cfg;
                }
            }
            return null;
        }

        /**获取已领取天数 */
        public getDayByType(type: number): number {
            if (!this._model.infos) {
                return 0;
            }
            for (let info of this._model.infos) {
                if (info.index % 100 == type) {
                    return info.day;
                }
            }
            return 0;
        }

        private onUpdatHint(): void {
            let cfgArr: ShouchongConfig[] = getConfigListByName(ConfigName.Shouchong);
            let setHint: boolean = false;
            for (let cfg of cfgArr) {
                let type: number = cfg.index % 100;
                let day: number = this.getDayByType(type);
                let bool: boolean = this._model.charged >= cfg.cost;
                //总领取天数 > 已领取天数 && 达标开始时间到当前时间的天数 > 已领取天数
                let bool_day: boolean = this._model.receive > day && this.getRewardDay(cfg.index) > day;
                let hint: boolean = bool && bool_day;
                if (hint && !setHint) {
                    this.type = type;
                    setHint = true;
                }
                HintMgr.setHint(hint, this.getHintType(type));
            }
        }

        /**获取红点类型 */
        public getHintType(type: number): string[] {
            return this._model.hintType[type];
        }

        public get one_first(): boolean {
            return this._model.one_first
        }

        public get type(): number {
            return this._model.type;
        }

        public set type(val: number) {
            this._model.type = val;
        }

        public get cache_times(): boolean {
            return this._model.cache_times;
        }

        public set cache_times(val: boolean) {
            this._model.cache_times = val;
        }

        public getRewardDay(index: number): number {
            if (!this._model.infos) {
                return 0;
            }
            for (let info of this._model.infos) {
                if (info.index == index) {
                    let second = TimeMgr.time.serverTimeSecond - info.time;
                    let second_tomorro = TimeUtil.getSecondByTomorrow(info.time);
                    if (second > second_tomorro) {
                        return Math.ceil((second - second_tomorro) / Second.Day) + 1;
                    } else {
                        return 1;
                    }
                }
            }
            return 0;
        }

        public get isOpen(): boolean {
            let cfgArr: ShouchongConfig[] = getConfigListByName(ConfigName.Shouchong);
            for (let cfg of cfgArr) {
                if (this.getDayByType(cfg.index % 100) < this._model.receive) {
                    return true;
                }
            }
            return false;
        }

        private checkOpen(): void {
            BtnIconMgr.insLeft().updateOpen(BtnIconId.FirstCharge, this.isOpen);
        }
    }
}