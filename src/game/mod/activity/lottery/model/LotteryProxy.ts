namespace game.mod.activity {

    import c2s_power_dia_draw = msg.c2s_power_dia_draw;
    import GameNT = base.GameNT;
    import s2c_power_dia_draw_ret = msg.s2c_power_dia_draw_ret;
    import s2c_power_dia_info = msg.s2c_power_dia_info;
    import PowerDiaTargetConfig = game.config.PowerDiaTargetConfig;
    import PowerDiaRewardConfig = game.config.PowerDiaRewardConfig;

    export class LotteryProxy extends ProxyBase implements ILotteryProxy {
        private _model: LotteryModel;

        public get model() {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new LotteryModel();

            this.onProto(s2c_power_dia_draw_ret, this.s2c_power_dia_draw_ret, this);
            this.onProto(s2c_power_dia_info, this.s2c_power_dia_info, this);
        }

        /**--------------------转盘协议start-------------------- */
        /**抽奖 */
        public c2s_power_dia_draw(): void {
            let msg: c2s_power_dia_draw = new c2s_power_dia_draw;
            this.sendProto(msg);
        }

        /**抽奖返回结果 */
        private s2c_power_dia_draw_ret(n: GameNT): void {
            let msg: s2c_power_dia_draw_ret = n.body;
            if (msg) {
                this._model.count = msg.info.count || 0;
                this._model.id_list = msg.info.id_list || [];

                this.sendNt(ActivityEvent.ON_OPEN_LOTTERY_TWEEN, msg.index);
            }
            this.onUpdateHint();
        }

        /**活动详情（实时更新） */
        private s2c_power_dia_info(n: GameNT): void {
            let msg: s2c_power_dia_info = n.body;
            if (msg) {
                this._model.count = msg.info.count || 0;
                this._model.id_list = msg.info.id_list || [];
            }
            this.onUpdateHint();
            this.sendNt(ActivityEvent.ON_OPEN_LOTTERY_TWEEN);
            this.sendNt(ActivityEvent.ON_UPDATE_LOTTERY_INFO);
        }

        /**--------------------转盘协议end-------------------- */

        public onUpdateHint(): void {
            HintMgr.setHint(this._model.count > 0, [ModName.Activity, MainActivityViewType.Lottery]);
        }

        /**获取目标战力 */
        public get targetPower(): number {
            let cfgArr: PowerDiaTargetConfig[] = getConfigListByName(ConfigName.PowerDiaTarget);
            for (let cfg of cfgArr) {
                if (RoleVo.ins.showpower.toNumber() < cfg.power_target) {
                    return cfg.power_target
                }
            }
            return cfgArr[cfgArr.length - 1].power_target;
        }

        /**是否全部奖励领取 */
        public get isOver(): boolean {
            let cfgArr: PowerDiaTargetConfig[] = getConfigListByName(ConfigName.PowerDiaTarget);
            return this.id_list.length >= cfgArr.length;
        }

        /**根据文档显示第4个奖励为大奖 */
        public get cfgReward(): PowerDiaRewardConfig {
            return getConfigByNameId(ConfigName.PowerDiaReward, 4);
        }

        public get id_list(): number[] {
            return this._model.id_list;
        }

        public getRewardGot(index: number): boolean {
            return this.id_list.indexOf(index) > -1;
        }

        public isOpen(): boolean {
            return !this.isOver;
        }
    }
}