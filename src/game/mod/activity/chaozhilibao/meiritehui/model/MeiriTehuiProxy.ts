namespace game.mod.activity {

    import GameNT = base.GameNT;
    import s2c_daily_tehui_all_info = msg.s2c_daily_tehui_all_info;
    import c2s_daily_tehui_get_reward = msg.c2s_daily_tehui_get_reward;
    import DirectShopConfig = game.config.DirectShopConfig;
    import TimeMgr = base.TimeMgr;

    /**
     * @description 每日特惠系统
     */
    export class MeiriTehuiProxy extends ProxyBase {
        private _model: MeiriTehuiModel;

        initialize(): void {
            super.initialize();
            this._model = new MeiriTehuiModel();
            this.onProto(s2c_daily_tehui_all_info, this.s2c_daily_tehui_all_info, this);
        }

        private s2c_daily_tehui_all_info(n: GameNT): void {
            let msg = n.body as s2c_daily_tehui_all_info;
            this._model.day = msg.day != null ? msg.day : 0;
            if (msg.list != null) {
                this._model.list = {};
                for (let item of msg.list) {
                    this._model.list[item.index] = item;
                }
            } else {
                this._model.list = {};
            }
            this.updateHint();
            this.sendNt(ActivityEvent.ON_UDPATE_MEIRI_TEHUI_INFO);
        }

        //index: (0.标识免费档位) 充值id索引
        public c2s_daily_tehui_get_reward(index: number): void {
            let msg = new c2s_daily_tehui_get_reward();
            msg.index = index;
            this.sendProto(msg);
        }

        //免费奖励
        public getFreeRewards(): number[][] {
            let cfg = GameConfig.getParamConfigById('daily_tehui_reward');
            return cfg ? cfg.value : [];
        }

        //购买配置，最后一个是购买10天的
        public getDirectShopCfgList(): DirectShopConfig[] {
            return StoreUtil.getDirectShopCfgListByType(DirectShopType.MeiriTehui);
        }

        //获取状态，1.可领取2.已领取
        public getStatus(id: number): RewardStatus {
            let data = this._model.list[id];
            if (data) {
                return data.state;
            }
            return RewardStatus.NotFinish;
        }

        //是否购买10天
        public isBuyTenDay(): boolean {
            return this._model.day > 0;
        }

        //结束时间戳 todo
        public getEndTime(): number {
            let day = this._model.day;
            if (!day) {
                return 0;
            }
            let leftDays = this.getLeftDays() + 1;
            return TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false, leftDays);
        }

        //购买10天后，剩余领取天数
        public getLeftDays(): number {
            return 10 - this._model.day;
        }

        //已购买过任一档位，则不能购买10天的档位
        public canBuyTenDay(): boolean {
            if (this.isBuyTenDay()) {
                return false;
            }
            let cfgList = this.getDirectShopCfgList();
            for (let i = 0; i < cfgList.length - 1; i++) {
                let cfg = cfgList[i];
                if (this._model.list[cfg.product_id]) {
                    return false;
                }
            }
            return true;
        }

        private _btnTenStr: string;

        //按钮文本：98元购买10天
        public getBtnTenStr(): string {
            if (this._btnTenStr) {
                return this._btnTenStr;
            }
            let cfgList = this.getDirectShopCfgList();
            if (!cfgList || !cfgList.length) {
                return '';
            }
            let lastCfg = cfgList[cfgList.length - 1];
            let rmb = PayUtil.getRmbValue(lastCfg.product_id) + PayUtil.getRmbUnit() + '购买10天';
            this._btnTenStr = rmb;
            return rmb;
        }

        private updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.MeiriTehui)) {
                return;
            }
            let hint = false;
            let map = this._model.list;
            for (let key in map) {
                let item = map[key];
                if (item && item.state == RewardStatus.Finish) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath);
        }
    }
}