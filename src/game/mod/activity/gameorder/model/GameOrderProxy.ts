namespace game.mod.activity {

    import GameNT = base.GameNT;
    import s2c_game_order_info = msg.s2c_game_order_info;
    import c2s_game_order_get_rewards = msg.c2s_game_order_get_rewards;
    import GameOrderConfig = game.config.GameOrderConfig;
    import TimeMgr = base.TimeMgr;
    import common_reward_status = msg.common_reward_status;
    import game_order_data = msg.game_order_data;

    /**战令系统（赠送100召唤卷）*/
    export class GameOrderProxy extends ProxyBase {
        private _model: GameOrderModel;

        public get model() {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new GameOrderModel();

            this.onProto(s2c_game_order_info, this.s2c_game_order_info, this);
        }

        /**--------------------协议start-------------------- */
        /**战令信息 */
        private s2c_game_order_info(n: GameNT): void {
            let msg: s2c_game_order_info = n.body;
            if (msg.oper == 1) {
                // 1全部更新
                if (msg.act_list && msg.act_list.length) {
                    this.updateInfo(msg.act_list);
                } else {
                    // todo 清空数据，红点处理
                    this._model.list = {};
                    for (let type of this._model.showType) {
                        this.onUpdateHint(type);
                    }
                    this.sendNt(ActivityEvent.ON_UPDATE_GIVING_LIST, this._model.showType);
                }
            } else {
                // 2单个更新
                if (msg.act_list && msg.act_list.length) {
                    this.updateInfo(msg.act_list);
                }
            }
        }

        private updateInfo(act_list: msg.game_order_data[]): void {
            let types: number[] = []; //战令类型
            if (act_list && act_list.length) {
                for (let act of act_list) {
                    types.push(act.type);
                    this._model.list[act.type] = act;
                    this.onUpdateHint(act.type);

                    if (!this.getIsBought(act.type) && this.selType) {
                        ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.GameOrderUnlock,
                            [this.selType, this.getReward(this.selType), this.getRewardCanGet(this.selType)]);
                        this.selType = 0;
                    }
                }
            }
            this.sendNt(ActivityEvent.ON_UPDATE_GIVING_LIST, types);
        }

        //当前请求类型
        public set selType(type: number) {
            this._model.selType = type;
        }

        public get selType(): number {
            return this._model.selType;
        }

        /**请求领取战令奖励 */
        public c2s_game_order_get_rewards(type: number): void {
            let msg: c2s_game_order_get_rewards = new c2s_game_order_get_rewards();
            msg.type = this.selType = type;
            this.sendProto(msg);
        }

        /**--------------------协议end-------------------- */

        /**送100召唤卷显示的战令类型*/
        public getTypeListForMdr(): number[] {
            let showType = this._model.showType;
            let list: number[] = [];
            for (let type of showType) {
                let item = this._model.list[type];
                if (item && !this.isOver(item.type)) {
                    list.push(type);
                }
            }
            return list;
        }

        /**类型数据，结束的返回null*/
        public getInfoByType(type: GameOrderType): game_order_data {
            let item = this._model.list[type];
            if (!item || this.isOver(type)) {
                return null;
            }
            return item;
        }

        /**列表类型 */
        public getTypeList(): number[] {
            let list: number[] = [];
            for (let key in this._model.list) {
                let item = this._model.list[key];
                if (!this.isOver(item.type)) {
                    list.push(item.type);
                }
            }
            return list;
        }

        /**
         * 1前往挑战
         * 2全部领取
         * 3解锁战令
         * */
        public getBtnStatus(type: number): number {
            let item = this._model.list[type];
            if (!item || !item.list) {//没有解锁奖励
                return 1;
            }
            for (let data of item.list) {//可领取奖励
                if (data.status == 1 || data.status2 == 1) {
                    return 2;
                }
            }
            let cfgArr = this.getCfgArrByType(type);
            let len: number = 0;
            for (let key in cfgArr) {
                let cfg = cfgArr[key];
                len++;
                let status = this.getStatusByTypeIndex(type, cfg.index);
                if (!status) {
                    return 1;
                }
            }
            let isAll: boolean = len == item.list.length;
            if (!item.is_buy && isAll) {
                return 3;
            }
            return 0;
        }

        /**是否结束活动(全部已领取或者时间结束) */
        private isOver(type: number): boolean {
            let cfgArr = this.getCfgArrByType(type);
            let item = this._model.list[type];
            let bool: boolean = item.endtime && item.endtime.toNumber() != 0 && TimeMgr.time.serverTime > item.endtime.toNumber() * 1000;
            if (bool) {
                return bool;
            }
            for (let cfg of cfgArr) {
                for (let data of item.list) {
                    if (cfg.index == data.index.toNumber()) {
                        bool = data.status == 2 && data.status2 == 2;
                        break;
                    }
                }
                if (bool) {
                    return bool;
                }
            }
            return bool;
        }

        //奖励全部领取完成（免费和付费）
        public isRewardAllDraw(type: GameOrderType): boolean {
            let cfgObj = this.getCfgArrByType(type);
            let info = this._model.list[type];
            let map: { [index: number]: boolean } = {};//已全领取的配置
            if (info && info.list) {
                for (let item of info.list) {
                    if (item.status == RewardStatus.Draw && item.status2 == RewardStatus.Draw) {
                        map[item.index.toNumber()] = true;//已全领取了
                    }
                }
            }
            let isAllDraw = true;
            for (let key in cfgObj) {
                let cfg = cfgObj[key] as GameOrderConfig;
                if (!cfg) {
                    continue;
                }
                if (!map[cfg.index]) {
                    isAllDraw = false;
                    break;
                }
            }
            return isAllDraw;
        }

        /**获取列表数据 */
        public getListByType(type: number): IGameOrderItemData[] {
            let cfgArr = this.getCfgArrByType(type);
            let act_list = this._model.list[type];
            let list: IGameOrderItemData[] = [];
            for (let key in cfgArr) {
                let isBought = this.getIsBought(type);
                let val = this.getValueByType(type);
                let cfg = cfgArr[key];
                let status = this.getStatusByTypeIndex(type, cfg.index);
                let freeStatus = status && status.status != undefined ? status.status : RewardStatus.NotFinish;//免费奖励
                let payStatus = status && status.status2 != undefined ? status.status2 : RewardStatus.NotFinish;//付费奖励
                let cfgBefore = cfgArr[+key - 1];
                let cfgNext = cfgArr[+key + 1];
                let before: number;
                let next: number;
                if (type == GameOrderType.XiuXian) {
                    let target: number = RoleUtil.getRebirthLv(cfg.target);
                    let targetBefore: number = cfgBefore && RoleUtil.getRebirthLv(cfgBefore.target) || 0;
                    let targetNext: number = cfgNext && RoleUtil.getRebirthLv(cfgNext.target) || 0;
                    before = Math.floor((target - targetBefore) / 2) + targetBefore || 0;
                    next = Math.floor((targetNext - target) / 2) + target || 0;
                } else {
                    before = cfgBefore && Math.floor((cfg.target - cfgBefore.target) / 2) + cfgBefore.target || 0;
                    next = cfgNext && Math.floor((cfgNext.target - cfg.target) / 2) + cfg.target || 0;
                }
                // let before = cfgBefore && Math.floor((cfg.target - cfgBefore.target) / 2) + cfgBefore.target || 0;
                // let next = cfgNext && Math.floor((cfgNext.target - cfg.target) / 2) + cfg.target || 0;
                if (act_list.list) {
                    list.push({cfg, before, next, type, isBought, val, freeStatus, payStatus});
                } else {
                    list.push({cfg, before, next, type, isBought, val, freeStatus, payStatus});
                }
            }
            return list;
        }

        /**根据类型和索引获取状态 */
        public getStatusByTypeIndex(type: number, index: number): common_reward_status {
            let act_list = this._model.list[type];
            if (!act_list || !act_list.list) {
                return null;
            }
            for (let act of act_list.list) {
                if (act.index.toNumber() == index) {
                    return act;
                }
            }
            return null;
        }

        /**获取当前战令的值 */
        public getValueByType(type: number): number {
            let data = this._model.list[type];
            return data && data.value ? data.value.toNumber() : 0;
        }

        /**是否购买战令 */
        public getIsBought(type: number): boolean {
            let data = this._model.list[type];
            return data && data.is_buy == 1;
        }

        /**获取结束时间 */
        public getEndTime(type: number): number {
            return +this._model.list[type].endtime || 0;
        }

        /**根据类型获取配置数据 */
        public getCfgArrByType(type: number): GameOrderConfig[] {
            let cfgArr: GameOrderConfig[] = getConfigByNameId(ConfigName.GameOrder, type);
            return cfgArr;
        }

        /**获取解锁战令不可领取奖励 */
        public getReward(type: number): PropData[] {
            let list: PropData[] = [];
            let map: { [index: number]: number } = {};
            let cfgArr = this.getCfgArrByType(type);
            for (let key in cfgArr) {
                let cfg = cfgArr[key];
                if (cfg && cfg.rewad_1) {
                    for (let reward of cfg.rewad_1) {
                        map[reward[0]] = reward[1] + (map[reward[0]] || 0);
                    }
                }
            }
            for (let key in map) {
                list.push(PropData.create(+key, map[key]));
            }
            return list;
        }

        /**获取可领取奖励 */
        public getRewardCanGet(type: number): PropData[] {
            let list: PropData[] = [];
            let map: { [index: number]: number } = {};
            let cfgArr = this.getCfgArrByType(type);
            for (let key in cfgArr) {
                let cfg = cfgArr[key];
                let status = this.getStatusByTypeIndex(type, cfg.index);
                if (status && status.status2 < 2) {
                    for (let reward of cfg.rewad_1) {
                        map[reward[0]] = reward[1] + (map[reward[0]] || 0);
                    }
                }
            }
            for (let key in map) {
                list.push(PropData.create(+key, map[key]));
            }
            return list;
        }

        public getPosByType(type: number): number {
            let info = this._model.list[type];
            if (!info) {
                return 0;
            }
            let list = info.list;
            if (!list) {
                return 0;
            }
            list.sort((a, b) => {
                return a.index.toNumber() - b.index.toNumber();
            });
            for (let i = 0; i < list.length; i++) {
                if (list[i].status == 1 || list[i].status2 == 1) {
                    return i;
                }
            }
            return 0;
        }

        /**
         * 获取战令红点
         * @param type
         */
        public getHintByType(type: GameOrderType): boolean {
            return this.getBtnStatus(type) == 2;
        }

        private onUpdateHint(type: number): void {
            let hintPath = this._model.hintPath[type];
            if (!hintPath || !hintPath.length) {
                return;
            }
            HintMgr.setHint(this.getBtnStatus(type) == 2, hintPath);
        }

        /**战令类型*/
        public get mdrType(): GameOrderType {
            return this._model.mdrType;
        }

        public set mdrType(val: GameOrderType) {
            this._model.mdrType = val;
        }
    }
}