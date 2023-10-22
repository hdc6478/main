namespace game.mod.activity {

    import GameNT = base.GameNT;
    import s2c_yaoji_sansheng_info = msg.s2c_yaoji_sansheng_info;
    import s2c_yaoji_sanshi_info = msg.s2c_yaoji_sanshi_info;
    import s2c_yaoji_shenqi_info = msg.s2c_yaoji_shenqi_info;
    import c2s_yaoji_shenqi_challenge = msg.c2s_yaoji_shenqi_challenge;
    import s2c_yaoji_baoku_info = msg.s2c_yaoji_baoku_info;
    import s2c_yaoji_charge_info = msg.s2c_yaoji_charge_info;
    import s2c_yaoji_haoli_info = msg.s2c_yaoji_haoli_info;
    import s2c_yaoji_ling_info = msg.s2c_yaoji_ling_info;
    import c2s_yaoji_receive_reward = msg.c2s_yaoji_receive_reward;
    import c2s_yaoji_target_reward = msg.c2s_yaoji_target_reward;
    import c2s_yaoji_buy = msg.c2s_yaoji_buy;
    import TotalTaskConfig = game.config.TotalTaskConfig;
    import yaoji_target = msg.yaoji_target;
    import task_data = msg.task_data;
    import TotalTask2Config = game.config.TotalTask2Config;
    import yaoji_baoku = msg.yaoji_baoku;
    import TotalCumulativeConfig = game.config.TotalCumulativeConfig;
    import TotalTargetConfig = game.config.TotalTargetConfig;
    import TotalFubenConfig = game.config.TotalFubenConfig;
    import TotalMainConfig = game.config.TotalMainConfig;
    import facade = base.facade;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    /**
     * @description 瑶姬降世系统
     */
    export class YjjsProxy extends ProxyBase implements IYjjsProxy {
        private _model: YjjsModel;
        //当前界面奖励全部领取完后：按天数顺序跳转至第一个有奖励可领取的天数
        public clickDrawReward = false;
        public clickDay = 0;

        public get model(): YjjsModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new YjjsModel();
            this.onProto(s2c_yaoji_sansheng_info, this.s2c_yaoji_sansheng_info, this);
            this.onProto(s2c_yaoji_sanshi_info, this.s2c_yaoji_sanshi_info, this);
            this.onProto(s2c_yaoji_shenqi_info, this.s2c_yaoji_shenqi_info, this);
            this.onProto(s2c_yaoji_baoku_info, this.s2c_yaoji_baoku_info, this);
            this.onProto(s2c_yaoji_charge_info, this.s2c_yaoji_charge_info, this);
            this.onProto(s2c_yaoji_haoli_info, this.s2c_yaoji_haoli_info, this);
            this.onProto(s2c_yaoji_ling_info, this.s2c_yaoji_ling_info, this);

            facade.onNt(ActivityEvent.ON_UPDATE_GIVING_SHENLING_INFO, this.checkOpen, this);
        }

        //三生修练
        private s2c_yaoji_sansheng_info(n: GameNT): void {
            let msg = n.body as s2c_yaoji_sansheng_info;
            if (msg.target_list != null) {
                this._model.sansheng_target_list = msg.target_list;
            }
            this.updateHint1();
            this.sendNt(ActivityEvent.ON_YJJS_SANSHENG_INFO_UPDATE);
        }

        //三世危机
        private s2c_yaoji_sanshi_info(n: GameNT): void {
            let msg = n.body as s2c_yaoji_sanshi_info;
            if (msg.target_list != null) {
                this._model.sanshi_target_list = msg.target_list;
            }
            if (msg.stage != null) {
                this._model.sanshi_stage = msg.stage;
            }
            if (msg.count != null) {
                this._model.sanshi_count = msg.count;
            }
            this.updateHint2();
            this.sendNt(ActivityEvent.ON_YJJS_SANSHI_INFO_UPDATE);
        }

        //神器挑战
        public c2s_yaoji_shenqi_challenge(): void {
            let msg = new c2s_yaoji_shenqi_challenge();
            this.sendProto(msg);
        }

        //神器修炼
        private s2c_yaoji_shenqi_info(n: GameNT): void {
            let msg = n.body as s2c_yaoji_shenqi_info;
            if (msg.count != null) {
                this._model.shenqi_count = msg.count;
            }
            this.updateHint3();
            this.sendNt(ActivityEvent.ON_YJJS_SHENQI_INFO_UPDATE);
        }

        //瑶姬宝库
        private s2c_yaoji_baoku_info(n: GameNT): void {
            let msg = n.body as s2c_yaoji_baoku_info;
            if (msg.list != null) {
                this._model.baoku_list = msg.list;
            }
            this.updateHint4();
            this.sendNt(ActivityEvent.ON_YJJS_BAOKU_INFO_UPDATE);
        }

        //累充礼包
        private s2c_yaoji_charge_info(n: GameNT): void {
            let msg = n.body as s2c_yaoji_charge_info;
            if (msg.list != null) {
                this._model.charge_list = msg.list;
            }
            this.updateHint5();
            this.sendNt(ActivityEvent.ON_YJJS_CHARGE_INFO_UPDATE);
        }

        //目标豪礼
        private s2c_yaoji_haoli_info(n: GameNT): void {
            let msg = n.body as s2c_yaoji_haoli_info;
            if (msg.buy_list != null) {
                this._model.haoli_list = msg.buy_list;
            }
            this.updateHint6();
            this.sendNt(ActivityEvent.ON_YJJS_HAOLI_INFO_UPDATE);
        }

        //瑶姬令
        private s2c_yaoji_ling_info(n: GameNT): void {
            let msg = n.body as s2c_yaoji_ling_info;
            if (msg.list != null) {
                this._model.ling_list = msg.list;
            }
            if (msg.ling_list != null) {
                for (let item of msg.ling_list) {
                    this._model.ling_list2[item.index] = item;
                }
            }
            if (msg.day != null) {
                this._model.ling_day = msg.day;
            }
            if (msg.is_ling != null) {
                this._model.is_ling_buy = msg.is_ling;
            }
            this.updateHint7();
            this.sendNt(ActivityEvent.ON_YJJS_LING_INFO_UPDATE);
        }

        /**
         * 奖励领取
         * @param type 1.三生修炼2.三世危机4.累充礼包5.目标豪礼6.瑶姬令
         * @param index 奖励索引
         */
        public c2s_yaoji_receive_reward(type: number, index: number): void {
            let msg = new c2s_yaoji_receive_reward();
            msg.type = type;
            if (index != null) {
                msg.index = index;
            }
            this.sendProto(msg);
        }

        /**
         * 达成次数奖励领取
         * @param type 1.三生修炼2.三世危机
         * @param index 奖励索引
         */
        public c2s_yaoji_target_reward(type: number, index: number): void {
            let msg = new c2s_yaoji_target_reward();
            msg.type = type;
            msg.index = index;
            this.sendProto(msg);
        }

        /**
         * 购买奖励
         * @param type 3.瑶姬宝库5.目标豪礼
         * @param index 奖励索引
         * @param count 购买次数
         */
        public c2s_yaoji_buy(type: number, index: number, count = 1): void {
            let msg = new c2s_yaoji_buy();
            msg.type = type;
            msg.index = index;
            msg.count = count;
            this.sendProto(msg);
        }

        /**================================= 协议end =================================*/

        //从创建角色时间开始算天数
        public getCurDay(): number {
            let createTime = RoleVo.ins.create_time;
            let day = new Date(createTime * 1000);
            day.setHours(0, 0, 0);
            createTime = Math.floor(day.getTime() / 1000);
            let todayTime = TimeMgr.time.serverTimeSecond;
            if (todayTime > createTime) {
                return Math.ceil((todayTime - createTime) / (24 * 60 * 60));
            }
            return 0;
        }

        //活动持续天数
        private getEndDay(): number {
            let paramCfg = GameConfig.getParamConfigById('yaoji_date');
            return paramCfg && paramCfg.value || 8;
        }

        public isOpenByDay(day: number): boolean {
            let curDay = this.getCurDay();
            return day <= curDay;
        }

        //是否开启 玩家领取了“送神灵”的活动奖励 且在活动时间内
        public isOpen(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Yaojijiangshi)) {
                return false;
            }
            let proxy: GivingShenLingProxy = getProxy(ModName.Activity, ProxyType.GivingShenLing);
            if (proxy && proxy.model.receive != 2) {
                return false;
            }
            let endDay = this.getEndDay();
            let curDay = this.getCurDay();
            return curDay <= endDay;
        }

        //某天的任务是否全部完成
        public isTaskFinishedByDay(day: number): boolean {
            let taskIdList: number[] = this.getSanshengTaskListByDay(day);
            let allFinished = true;
            for (let taskId of taskIdList) {
                if (!TaskUtil.canRewardDraw(TaskUtil.getTask(taskId))) {
                    allFinished = false;
                    break;
                }
            }
            return allFinished;
        }

        //某天的奖励是否全部领取
        public isTaskReceivedByDay(day: number): boolean {
            let taskIdList: number[] = this.getSanshengTaskListByDay(day);
            let allReceived = true;
            for (let taskId of taskIdList) {
                if (!TaskUtil.hasRewardDraw(TaskUtil.getTask(taskId))) {
                    allReceived = false;
                    break;
                }
            }
            return allReceived;
        }

        public getDrawDay(): number {
            let curDay = this.getCurDay();
            for (let i = 1; i <= curDay; i++) {
                if (this.getHintByDay(i)) {
                    return i;
                }
            }
            return 0;
        }

        private getNotFinishDay(): number {
            let curDay = this.getCurDay();
            for (let i = 1; i <= curDay; i++) {
                let val = this.getSanShengTaskFinishedCntByDay(i);
                let max = this.getSanshengTaskListByDay(i).length;
                if (val < max) {
                    return i;
                }
            }
            return 0;
        }

        /**
         * 当前选择天数页签
         * 显示按状态优先级：可领取＞未完成＞已领取；在同状态下天数越早优先级越高
         */
        public getSelDay(): number {
            let drawDay = this.getDrawDay();
            if (drawDay) {
                return drawDay;
            }
            let notFinishDay = this.getNotFinishDay();
            if (notFinishDay) {
                return notFinishDay;
            }
            return 1;
        }

        //活动时间为8天，活动周期为创角第一天开始~第九天的00:00:00结束
        public getEndTime(): number {
            let curDay = this.getCurDay();
            let endDay = this.getEndDay();
            if (curDay > endDay) {
                return 0;
            }
            let disDay = endDay + 1 - curDay;
            let left_time = TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false, disDay);
            return left_time;
        }

        /**三生修炼*/
        public getSanshengTaskListByDay(day: number): number[] {
            let cfgs = getConfigByNameId(ConfigName.TotalTask, TotalMainIdx.Yjjs);
            for (let key in cfgs) {
                let cfg: TotalTaskConfig = cfgs[key];
                if (cfg && cfg.days == day) {
                    return cfg.quest_list || [];
                }
            }
            return [];
        }

        //三生修炼某天完成的任务数量
        public getSanShengTaskFinishedCntByDay(day: number): number {
            let taskList = this.getSanshengTaskListByDay(day);
            let cnt = 0;
            for (let id of taskList) {
                if (TaskUtil.hasRewardDraw(TaskUtil.getTask(id))) {
                    cnt++;
                }
            }
            return cnt;
        }

        /**三世危机*/
        public getSanShiTaskListByStage(stage: number): any[] {
            let cfgs = getConfigByNameId(ConfigName.ToTalTask2, TotalMainIdx.Yjjs);
            for (let key in cfgs) {
                let cfg: TotalTask2Config = cfgs[key];
                if (cfg && cfg.main_index == stage) {
                    return cfg.quest_list || [];
                }
            }
            return [];
        }

        /**
         * 获取进度条奖励信息
         * @param type 1三生修炼，2三世危机
         * @param idx
         */
        public getTargetInfo(type: number, idx: number): yaoji_target {
            let list = type == 1 ? this._model.sansheng_target_list : this._model.sanshi_target_list;
            if (!list || !list.length) {
                return null;
            }
            for (let item of list) {
                if (item && item.index == idx) {
                    return item;
                }
            }
            return null;
        }

        /**
         * 获取完成的任务数量
         */
        public getFinishedTaskCnt(): number {
            let cfgs = getConfigByNameId(ConfigName.TotalTask, TotalMainIdx.Yjjs);
            let totalCnt = 0;
            let curDay = this.getCurDay();
            for (let key in cfgs) {
                let cfg = cfgs[key] as TotalTaskConfig;
                if (!cfg || !cfg.quest_list) {
                    continue;
                }
                if (cfg.days > curDay) {
                    continue;
                }
                for (let taskId of cfg.quest_list) {
                    let taskData: task_data = TaskUtil.getTask(taskId);
                    if (TaskUtil.hasRewardDraw(taskData)) {
                        totalCnt++;
                    }
                }
            }
            return totalCnt;
        }

        public getFinishedTaskCnt2(): number {
            let cfgs = getConfigByNameId(ConfigName.ToTalTask2, TotalMainIdx.Yjjs);
            let totalCnt = 0;
            for (let key in cfgs) {
                let cfg = cfgs[key] as TotalTask2Config;
                if (!cfg || !cfg.quest_list) {
                    continue;
                }
                if (cfg.main_index > this._model.sanshi_stage) {
                    continue;
                }
                for (let taskId of cfg.quest_list) {
                    let taskData: task_data = TaskUtil.getTask(taskId);
                    if (TaskUtil.hasRewardDraw(taskData)) {
                        totalCnt++;
                    }
                }
            }
            return totalCnt;
        }

        /**
         * 获取进度总数
         * @param type 1三生修炼，2三世危机
         */
        public getTotalTaskCnt(type: number): number {
            let cfg: TotalMainConfig = getConfigByNameId(ConfigName.TotalMain, TotalMainIdx.Yjjs);
            if (!cfg) {
                return 0;
            }
            let list = type == 1 ? cfg.gift_list : cfg.gift2_list;
            let max = 0;
            for (let item of list) {
                max = Math.max(max, item[2]);
            }
            return max;
        }

        private _fubenCfgAry: TotalFubenConfig[];

        public getFubenCfgList(): TotalFubenConfig[] {
            if (this._fubenCfgAry) {
                return this._fubenCfgAry;
            }
            this._fubenCfgAry = [];
            let cfgObj = getConfigByNameId(ConfigName.TotalFuben, TotalMainIdx.Yjjs);
            for (let key in cfgObj) {
                this._fubenCfgAry.push(cfgObj[key]);
            }
            return this._fubenCfgAry;
        }

        //神器，当前副本配置
        public getFubenCfg(): TotalFubenConfig {
            let lv = this._model.shenqi_count;
            let ary = this.getFubenCfgList();
            if (this.isFubenMax()) {
                lv = ary.length - 1;//通过全部后，选择最后一关
            }
            return ary[lv];
        }

        public getFubenMaxLv(): number {
            let ary = this.getFubenCfgList();
            return ary.length;
        }

        public isFubenMax(): boolean {
            let lv = this._model.shenqi_count;
            return lv >= this.getFubenMaxLv();
        }

        /**神器--能否挑战*/
        public canChallengeShenqi(isTips = false): boolean {
            if (this.isFubenMax()) {
                if (isTips) {
                    PromptBox.getIns().show(`已通关全部`);
                }
                return false;
            }
            let cfg = this.getFubenCfg();
            let power = RoleVo.ins.showpower;
            if (cfg && cfg.power_show > power.toNumber()) {
                if (isTips) {
                    let hurtStr = cfg.power_show;
                    PromptBox.getIns().show(StringUtil.substitute(getLanById(LanDef.yaoji_fighting_tips), [hurtStr]));
                }
                return false;
            }
            return true;
        }

        //获取瑶姬宝库购买信息
        public getStoreInfo(index: number): yaoji_baoku {
            let list = this._model.baoku_list || [];
            for (let item of list) {
                if (item && item.index == index) {
                    return item;
                }
            }
            return null;
        }

        //累充礼包数据
        public getChargeCfgList(): TotalCumulativeConfig[] {
            let cfgObj = getConfigByNameId(ConfigName.TotalCumulative, TotalMainIdx.Yjjs);
            let list: TotalCumulativeConfig[] = [];
            for (let key in cfgObj) {
                list.push(cfgObj[key]);
            }
            return list;
        }

        //累充礼包配置
        public getChargeCfgByIdx(index: number): TotalCumulativeConfig {
            let list = this.getChargeCfgList();
            for (let cfg of list) {
                if (cfg && cfg.index == index) {
                    return cfg;
                }
            }
            return null;
        }

        //累充礼包info
        public getChargeInfo(index: number): yaoji_target {
            let list = this._model.charge_list || [];
            for (let item of list) {
                if (item && item.index == index) {
                    return item;
                }
            }
            return null;
        }

        //目标豪礼配置
        public getHaoliCfgList(): TotalTargetConfig[] {
            let cfgObj = getConfigByNameId(ConfigName.TotalTarget, TotalMainIdx.Yjjs);
            let list: TotalTargetConfig[] = [];
            for (let key in cfgObj) {
                list.push(cfgObj[key]);
            }
            return list;
        }

        public getHaoliCfgByIdx(index: number): TotalTargetConfig {
            let list = this.getHaoliCfgList();
            for (let cfg of list) {
                if (cfg && cfg.index == index) {
                    return cfg;
                }
            }
            return null;
        }

        //目标豪礼购买状态，分仙玉购买和rmb购买 2已购买，0未购买
        public getHaoliStatus(index: number): number {
            let cfg = this.getHaoliCfgByIdx(index);
            if (!cfg) {
                return 0;
            }
            if (cfg.pay_type == 1) {
                if (this._model.haoli_list.indexOf(index) > -1) {
                    return 2;
                }
            } else {
                let proxy: IPayProxy = getProxy(ModName.Pay, ProxyType.Pay);
                if (proxy.hasReceived(cfg.pay_index)) {
                    return 2;
                }
            }
            return 0;
        }

        /**
         * 获取进度
         * 1三生修炼 2三世危机 3神器修行 4瑶姬宝库 5累充礼包 6目标豪礼 7瑶姬令
         */
        public getProgressVal(type: number): number[] {
            if (type == 4 || type == 5) {
                return [0, 0];
            }
            if (type == 1 || type == 2) {
                let max = this.getTotalTaskCnt(type);
                let finishedCnt = type == 1 ? this.getFinishedTaskCnt() : this.getFinishedTaskCnt2();
                return [finishedCnt, max];
            }
            if (type == 3) {
                let max = this.getFubenMaxLv();
                return [this._model.shenqi_count, max];
            }
            if (type == 6) {
                let cfgObj = getConfigByNameId(ConfigName.TotalTarget, TotalMainIdx.Yjjs);
                let max = Object.keys(cfgObj).length;
                let finishedCnt = 0;
                for (let key in cfgObj) {
                    let cfg: TotalTargetConfig = cfgObj[key];
                    if (!cfg || !cfg.quest_list) {
                        continue;
                    }
                    let taskId = cfg.quest_list[0];
                    let taskData = TaskUtil.getTask(taskId);
                    let isDraw = TaskUtil.hasRewardDraw(taskData);
                    if (isDraw) {
                        finishedCnt++;
                    }
                }
                return [finishedCnt, max];
            }
            if (type == 7) {
                let cfgObj = getConfigByNameId(ConfigName.GameOrder, GameOrderType.Yaojiling);
                let max = Object.keys(cfgObj).length;
                let finishedCnt = 0;
                for (let key in cfgObj) {
                    let cfg = cfgObj[key];
                    if (!cfg) {
                        continue;
                    }
                    let rewardStatus = this.getStatusByTypeIndex(+key);
                    if (rewardStatus && rewardStatus.state == 2) {
                        finishedCnt++;
                    }
                }
                return [finishedCnt, max];
            }
            return [0, 0];
        }


        /**============================== hint ==============================*/

        protected onTaskUpdate(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(TaskType.Yaojijiangshi) > -1) {
                this.updateHint1();
                this.updateHint2();
                this.updateHint6();
            }
        }

        //三生修炼某天红点
        public getHintByDay(day: number): boolean {
            if (day > this.getCurDay()) {
                return false;
            }
            let taskIdList = this.getSanshengTaskListByDay(day);
            for (let taskId of taskIdList) {
                if (TaskUtil.canRewardDraw(TaskUtil.getTask(taskId))) {
                    return true;
                }
            }
            return false;
        }

        //1三生修炼，2三世危机
        private getBarIconHint(type = 1): boolean {
            let cfg: TotalMainConfig = getConfigByNameId(ConfigName.TotalMain, TotalMainIdx.Yjjs);
            if (!cfg) {
                return false;
            }
            let list = type == 1 ? cfg.gift_list : cfg.gift2_list;
            if (!list || !list.length) {
                return false;
            }
            for (let i = 0; i < list.length; i++) {
                let info = this.getTargetInfo(type, i + 1);
                if (info && info.state && info.state == 1) {
                    return true;
                }
            }
            return false;
        }

        //三生修炼红点
        public updateHint1(): void {
            let cfgObj = getConfigByNameId(ConfigName.TotalTask, TotalMainIdx.Yjjs);
            let curDay = this.getCurDay();
            let hint = this.getBarIconHint(1);
            if (!hint) {
                for (let key in cfgObj) {
                    let cfg = cfgObj[key] as TotalTaskConfig;
                    if (cfg.days > curDay) {
                        continue;
                    }
                    if (this.getHintByDay(cfg.days)) {
                        hint = true;
                        break;
                    }
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[1]);
            this.updateFirstMainHint();
        }

        //三世危机某阶段红点
        public getHintByStage(stage: number): boolean {
            let taskIdList = this.getSanShiTaskListByStage(stage);
            for (let taskId of taskIdList) {
                if (TaskUtil.canRewardDraw(TaskUtil.getTask(taskId))) {
                    return true;
                }
            }
            return false;
        }

        //三世危机红点
        public updateHint2(): void {
            let cfgObj = getConfigByNameId(ConfigName.ToTalTask2, TotalMainIdx.Yjjs);
            let stage = this._model.sanshi_stage;
            let hint = this.getBarIconHint(2);
            if (!hint) {
                for (let key in cfgObj) {
                    let cfg = cfgObj[key] as TotalTask2Config;
                    if (cfg.main_index > stage) {
                        continue;
                    }
                    if (this.getHintByStage(cfg.main_index)) {
                        hint = true;
                        break;
                    }
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[2]);
            this.updateFirstMainHint();
        }

        //神器修行红点
        public updateHint3(): void {
            let hint = this.canChallengeShenqi();
            HintMgr.setHint(hint, this._model.hintPath[3]);
            this.updateFirstMainHint();
        }

        //瑶姬宝库红点
        public updateHint4(): void {
            let list = StoreUtil.getStoreCfgListByType(StoreType.Yaojibaoku);
            if (!list || !list.length) {
                return;
            }
            let hint = false;
            for (let cfg of list) {
                let info = this.getStoreInfo(cfg.index);
                let bought_cnt = info ? info.count : 0;
                let left_cnt = cfg.lmt_cnt - bought_cnt;
                let cost = cfg.price;
                if (cfg.discount) {
                    cost = Math.floor(cfg.price * cfg.discount / 10000);
                }
                if (BagUtil.checkPropCnt(cfg.coin_type, left_cnt * cost)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[4]);
            this.updateFirstMainHint();
        }

        //累充礼包红点
        public updateHint5(): void {
            let list = this.getChargeCfgList() || [];
            let hint = false;
            for (let cfg of list) {
                let info = this.getChargeInfo(cfg.index);
                if (info && info.state == 1) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[5]);
            this.updateFirstMainHint();
        }

        //目标豪礼红点
        public updateHint6(): void {
            let list = this.getHaoliCfgList();
            let hint = false;
            for (let cfg of list) {
                if (cfg && cfg.quest_list) {
                    let taskId = cfg.quest_list[0];
                    if (TaskUtil.canRewardDraw(TaskUtil.getTask(taskId))) {
                        hint = true;
                        break;
                    }
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[6]);
            this.updateFirstMainHint();
        }

        protected onUpdateGivingList(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(GameOrderType.Yaojiling) > -1) {
                this.updateHint7();
            }
        }

        public getBtnStatus(): number {
            let list: yaoji_target[] = this._model.ling_list;
            if (!list || !list.length) {//没有解锁奖励
                return 1;
            }
            for (let data of list) {//可领取奖励
                if (data.state == 1) {
                    return 2;
                }
            }
            if (this._model.is_ling_buy) {
                let list2 = this._model.ling_list2;
                for (let key in list2) {
                    let item = list2[key];
                    if (item && item.state == 1) {
                        return 2;
                    }
                }
            }
            let cfgObj = getConfigByNameId(ConfigName.GameOrder, GameOrderType.Yaojiling);
            let len: number = 0;
            for (let key in cfgObj) {
                let cfg = cfgObj[key];
                len++;
                let status = this.getStatusByTypeIndex(cfg.index);
                if (!status) {
                    return 1;
                }
            }
            //免费奖励都可领取或都已领取，但是还没购买瑶姬令
            let isAll: boolean = len == list.length;
            if (!this.model.is_ling_buy && isAll) {
                return 3;
            }
            return 0;
        }

        /**获取解锁战令不可领取奖励 */
        public getReward(): PropData[] {
            let list: PropData[] = [];
            let map: { [index: number]: number } = {};
            let cfgObj = getConfigByNameId(ConfigName.GameOrder, GameOrderType.Yaojiling);
            for (let key in cfgObj) {
                let cfg = cfgObj[key];
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

        /**获取可领取奖励，解锁瑶姬令可获得奖励 */
        public getRewardCanGet(): PropData[] {
            let list: PropData[] = [];
            let map: { [index: number]: number } = {};
            let cfgObj = getConfigByNameId(ConfigName.GameOrder, GameOrderType.Yaojiling);
            for (let key in cfgObj) {
                let cfg = cfgObj[key];
                let status = this.getStatusByTypeIndex(cfg.index);
                if (status && status.state >= 1) {
                    let status2 = this._model.ling_list2[status.index];//购买后可获得奖励状态
                    if (!status2 || status2.state != 2) {
                        for (let reward of cfg.rewad_1) {
                            map[reward[0]] = reward[1] + (map[reward[0]] || 0);
                        }
                    }
                }
            }
            for (let key in map) {
                list.push(PropData.create(+key, map[key]));
            }
            return list;
        }

        /**根据引获取状态 */
        public getStatusByTypeIndex(index: number): yaoji_target {
            let list: yaoji_target[] = this.model.ling_list;
            if (!list || !list.length) {
                return null;
            }
            for (let act of list) {
                if (act.index == index) {
                    return act;
                }
            }
            return null;
        }

        //瑶姬令红点
        public updateHint7(): void {
            let hint = this.getBtnStatus() == 2;
            HintMgr.setHint(hint, this._model.hintPath[7]);
            this.updateFirstMainHint();
        }

        /**
         * 根据按钮类型获取红点
         * 1三生修炼 2三世危机 3神器修行 4瑶姬宝库 5累充礼包 6目标豪礼 7瑶姬令
         * @param type
         */
        public getHintByBtnType(type: number): boolean {
            let hintPath = this._model.hintPath[type];
            return HintMgr.getHint(hintPath);
        }

        //统一入口界面的红点
        public updateFirstMainHint(): void {
            let hint = false;
            for (let i = 1; i <= 7; i++) {
                if (HintMgr.getHint(this._model.hintPath[i])) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, [ModName.Activity, MainActivityViewType.YjjsFirstMain, YjjsMainBtnType.Btn1]);
        }

        public checkOpen(): void {
            let isOpen = this.isOpen();
            BtnIconMgr.insLeft().updateOpen(BtnIconId.Yjjs, isOpen);
        }
    }
}