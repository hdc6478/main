namespace game.mod.activity {

    import GameNT = base.GameNT;
    import s2c_zcx_luck_number = msg.s2c_zcx_luck_number;
    import c2s_get_zcx_luck_number = msg.c2s_get_zcx_luck_number;
    import s2c_zcx_coins_bank_info = msg.s2c_zcx_coins_bank_info;
    import c2s_zcx_coins_bank_button = msg.c2s_zcx_coins_bank_button;
    import c2s_zcx_exchange_button = msg.c2s_zcx_exchange_button;
    import s2c_zcx_exchange_info = msg.s2c_zcx_exchange_info;
    import ZcxCoinsBankConfig = game.config.ZcxCoinsBankConfig;
    import zcx_exchange_data = msg.zcx_exchange_data;
    import ZcxExchangeConfig = game.config.ZcxExchangeConfig;
    import c2s_zcx_coins_bank_get_rewards = msg.c2s_zcx_coins_bank_get_rewards;
    import c2s_zcx_raid_challenge = msg.c2s_zcx_raid_challenge;
    import s2c_zcx_raid_info = msg.s2c_zcx_raid_info;
    import RoleNameConfig = game.config.RoleNameConfig;
    import ZcxFubenConfig = game.config.ZcxFubenConfig;
    import s2c_zcx_fund_update = msg.s2c_zcx_fund_update;
    import c2s_zcx_fund_box_reward = msg.c2s_zcx_fund_box_reward;
    import c2s_zcx_fund_day_reward = msg.c2s_zcx_fund_day_reward;
    import c2s_zcx_fund_box_show = msg.c2s_zcx_fund_box_show;
    import s2c_zcx_fund_box_show = msg.s2c_zcx_fund_box_show;
    import ZcxFundConfig = game.config.ZcxFundConfig;
    import c2s_zcx_fund_reward_show = msg.c2s_zcx_fund_reward_show;
    import s2c_zcx_fund_reward_show = msg.s2c_zcx_fund_reward_show;

    /**
     * @description 招财仙系统
     */
    export class ZcxProxy extends ProxyBase {
        private _model: ZcxModel;

        public get model(): ZcxModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new ZcxModel();
            this.onProto(s2c_zcx_luck_number, this.s2c_zcx_luck_number, this);
            this.onProto(s2c_zcx_coins_bank_info, this.s2c_zcx_coins_bank_info, this);
            this.onProto(s2c_zcx_exchange_info, this.s2c_zcx_exchange_info, this);
            this.onProto(s2c_zcx_raid_info, this.s2c_zcx_raid_info, this);
            this.onProto(s2c_zcx_fund_update, this.s2c_zcx_fund_update, this);
            this.onProto(s2c_zcx_fund_box_show, this.s2c_zcx_fund_box_show, this);
            this.onProto(s2c_zcx_fund_reward_show, this.s2c_zcx_fund_reward_show, this);
        }

        /** 幸运数字 */
        private s2c_zcx_luck_number(n: GameNT): void {
            let msg = n.body as s2c_zcx_luck_number;
            if (msg.luck_num != null) {
                this._model.luck_num = msg.luck_num;
            }
            if (msg.status != null) {
                this._model.status = msg.status;
            }
            if (msg.rank_num != null) {
                this._model.rank_num = msg.rank_num;
            }
            if (msg.list != null) {
                this._model.list = msg.list;
            }
            this.updateLuckNumHint();
            this.sendNt(ActivityEvent.ON_ZCX_LUCK_NUM_UPDATE);
        }

        /** 1获得幸运数字  2领奖   3请求获奖名单 */
        public c2s_get_zcx_luck_number(type: number): void {
            let msg = new c2s_get_zcx_luck_number();
            msg.button_type = type;
            this.sendProto(msg);
        }

        /** 进宝钱庄 */
        private s2c_zcx_coins_bank_info(n: GameNT): void {
            let msg = n.body as s2c_zcx_coins_bank_info;
            if (msg.value != null) {
                this._model.value = msg.value;
            }
            if (msg.save_time != null) {
                this._model.save_time = msg.save_time.toNumber();
            }
            this._model.item_list = msg.item_list != null ? msg.item_list : [];
            this.updateBankHint();
            this.sendNt(ActivityEvent.ON_ZCX_COINS_BANK_UPDATE);
        }

        /** 1为存   2为取 */
        public c2s_zcx_coins_bank_button(type: number): void {
            let msg = new c2s_zcx_coins_bank_button();
            msg.button_type = type;
            this.sendProto(msg);
        }

        /**进宝钱庄 领取收益*/
        public c2s_zcx_coins_bank_get_rewards(): void {
            let msg = new c2s_zcx_coins_bank_get_rewards();
            this.sendProto(msg);
        }

        /** 兑换 */
        public c2s_zcx_exchange_button(index: number, num: number): void {
            let msg = new c2s_zcx_exchange_button();
            msg.index = index;
            msg.num = num;
            this.sendProto(msg);
        }

        /**财神兑换*/
        private s2c_zcx_exchange_info(n: GameNT): void {
            let msg = n.body as s2c_zcx_exchange_info;
            if (msg.list != null) {
                for (let item of msg.list) {
                    this._model.exchange_list[item.index] = item;
                }
            } else {
                this._model.exchange_list = {};
            }
            this.updateExchangeHint();
            this.sendNt(ActivityEvent.ON_ZCX_EXCHANGE_UPDATE);
        }

        /**请求挑战财神副本*/
        public c2s_zcx_raid_challenge(): void {
            this.sendProto(new c2s_zcx_raid_challenge());
        }

        private s2c_zcx_raid_info(n: GameNT): void {
            let msg = n.body as s2c_zcx_raid_info;
            if (msg.records != null) {
                this._model.records = msg.records;
            }
            if (msg.count != null) {
                this._model.count = msg.count;
            }
            this.updateFubenHint();
            this.sendNt(ActivityEvent.ON_ZCX_RAID_INFO_UPDATE);
        }

        /**================================ 协议end ================================*/

        //转换成6位字符串
        public getSixLuckNum(num: number): string {
            let numStr = num + '';
            if (numStr.length < 6) {
                numStr = `000000${numStr}`.substr(numStr.length);
            }
            return numStr;
        }

        //判断是否充值，充值前后界面不一样
        public isOpen(): boolean {
            return PayUtil.checkFirstCharge();
        }

        private _maxBankVal = 0;

        //存款上限
        public getMaxBankVal(): number {
            if (this._maxBankVal) {
                return this._maxBankVal;
            }
            let list: ZcxCoinsBankConfig[] = getConfigListByName(ConfigName.ZcxCoinsBank);
            let maxCfg = list[list.length - 1];
            this._maxBankVal = maxCfg.base_value;
            return maxCfg.base_value;
        }

        //是否达到最大的存款上限
        public isMaxBankSave(): boolean {
            return this._model.value.toNumber() >= this.getMaxBankVal();
        }

        //能否领取钱庄收益
        public canGetBankInterest(): boolean {
            let item_list = this._model.item_list;
            if (!item_list || !item_list.length) {
                return false;
            }
            for (let item of item_list) {
                if (item.cnt > 0) {
                    return true;
                }
            }
            return false;
        }

        //钱庄倒计时
        public getBankEndTime(): number {
            let save_time = this._model.save_time || 0;
            let cfg = GameConfig.getParamConfigById('zcx_reward_time');
            return save_time + cfg.value * 60 * 60;
        }

        //兑换信息
        public getExchangeInfo(index: number): zcx_exchange_data {
            return this._model.exchange_list[index];
        }

        //获得兑换的剩余次数
        public getExchangeLeftCnt(index: number): number {
            let info = this.getExchangeInfo(index);
            if (info) {
                return info.count;
            }
            let cfg: ZcxExchangeConfig = getConfigByNameId(ConfigName.ZcxExchange, index);
            return cfg.count;
        }

        public canExchange(index: number): boolean {
            let cfg: ZcxExchangeConfig = getConfigByNameId(ConfigName.ZcxExchange, index);
            if (!cfg) {
                return false;
            }
            let leftCnt = this.getExchangeLeftCnt(index);
            if (leftCnt <= 0) {
                return false;
            }
            let costs = cfg.costs || [];
            for (let cost of costs) {
                if (!BagUtil.checkPropCnt(cost[0], cost[1])) {
                    return false;
                }
            }
            return true;
        }

        //当前挑战的副本
        public getCurFubenCfg(): ZcxFubenConfig {
            let cfgs: ZcxFubenConfig[] = getConfigListByName(ConfigName.ZcxFuben);
            if (!cfgs || !cfgs.length) {
                return null;
            }
            let rebirthLv = RoleUtil.getRebirthLv();
            for (let i = cfgs.length - 1; i >= 0; i--) {
                let cfg = cfgs[i];
                if (cfg && cfg.level_condition <= rebirthLv) {
                    return cfg;
                }
            }
            DEBUG && console.error(`招财仙没有可挑战的副本配置，玩家转生等级:${rebirthLv}`);
            return null;
        }

        //副本能否挑战
        public canChallenge(): boolean {
            let cfgs: ZcxFubenConfig[] = getConfigListByName(ConfigName.ZcxFuben);
            if (!cfgs || !cfgs.length) {
                return false;
            }
            let can = this.getCurFubenCfg() != null;
            return can && this._model.count > 0;
        }

        //获取区间随机整数
        public getRandomNum(start: number, end: number): number {
            let range = end + 1 - start;
            return start + Math.floor(Math.random() * range);
        }

        //恭喜%s获得%s
        public getRandomTipsStrKey(): string {
            let random = Math.floor(this.getRandomNum(1, 3));
            return getLanById(`zcx_challenge_tips${random}`);
        }

        public getRandomName(): string {
            let cfgs: RoleNameConfig[] = getConfigListByName(ConfigName.RoleName);
            let random = this.getRandomNum(1, cfgs.length);
            let cfg: RoleNameConfig = getConfigByNameId(ConfigName.RoleName, random);
            if (cfg) {
                let genderNum = this.getRandomNum(1, 2);
                return cfg.name_f + cfg[`name_${genderNum}`];
            }
            return '';
        }

        public getRandomRewardTips(): string {
            let cfg = this.getCurFubenCfg();
            let reward = cfg ? cfg.show_rewards[0] : [];
            let propCfg = GameConfig.getPropConfigById(reward[0]);
            if (!propCfg) {
                return '';
            }
            return propCfg.name + '*' + reward[1];
        }

        //服务端下发的记录文本
        public getRecordTipStr(index: number): string {
            let tipsStr = this.getRandomTipsStrKey();
            let record = this._model.records[index];
            if (record) {
                let rst: string[] = [];
                rst.push(TextUtil.addColor(`[${record.name}]`, WhiteColor.ORANGE));
                let str = '';
                for (let i = 0; i < record.item_list.length; i++) {
                    let item = record.item_list[i];
                    let cfg = GameConfig.getPropConfigById(item.idx.toNumber());
                    str += TextUtil.addColor((cfg.name + '*' + item.cnt), WhiteColor.GREEN);
                    if (i != record.item_list.length - 1) {
                        str += ',';
                    }
                }
                rst.push(str);
                return StringUtil.substitute(tipsStr, rst);
            }
            return '';
        }

        //不足30条，随机的文本
        public getRandomTipsStr(index: number): string {
            if (this._recordTipsAry[index]) {
                return this._recordTipsAry[index];
            }
            let tipsStr = this.getRandomTipsStrKey();
            let nameStr = TextUtil.addColor(`[${this.getRandomName()}]`, WhiteColor.ORANGE);
            let rewardStr = TextUtil.addColor(this.getRandomRewardTips(), WhiteColor.GREEN);
            let str = StringUtil.substitute(tipsStr, [nameStr, rewardStr]);
            this._recordTipsAry[index] = str;
            return str;
        }

        private _recordTipsAry: string[] = [];

        //副本记录文本
        public getRecordTips(index: number): string {
            if (index < this._model.records.length) {
                return this.getRecordTipStr(index);
            }
            return this.getRandomTipsStr(index);
        }

        private _rewardMap: { [coin: number]: number[][] } = {};

        //存款利息
        public getBankReward(coin: number): number[][] {
            if (this._rewardMap[coin]) {
                return this._rewardMap[coin];
            }
            let cfgList: ZcxCoinsBankConfig[] = getConfigListByName(ConfigName.ZcxCoinsBank);
            for (let i = 0; i < cfgList.length; i++) {
                let cfg = cfgList[i];
                this._rewardMap[cfg.base_value] = [cfg.rewards, cfg.rewards2];
            }
            if (this._rewardMap[coin]) {
                return this._rewardMap[coin];
            }
            let rewards: number[][] = [];
            let firstCfg = cfgList[0];
            if (firstCfg) {
                rewards.push([firstCfg.rewards[0], 1]);
                rewards.push([firstCfg.rewards2[0], 1]);
            }
            this._rewardMap[coin] = rewards;
            return rewards;
        }

        /**================================= hint =================================*/

        //能否获取幸运数字，首充了且未获得幸运数字
        public canGetLuckNum(): boolean {
            if (!this.isOpen()) {
                return false;
            }
            return !this._model.luck_num;
        }

        private _exchangeCostIds: number[] = [];

        /**兑换消耗id*/
        public getExchangeCostIds(): number[] {
            let cfgs: ZcxExchangeConfig[] = getConfigListByName(ConfigName.ZcxExchange);
            for (let cfg of cfgs) {
                if (!cfg || !cfg.costs) {
                    continue;
                }
                for (let cost of cfg.costs) {
                    if (cost && this._exchangeCostIds.indexOf(cost[0]) < 0) {
                        this._exchangeCostIds.push(cost[0]);
                    }
                }
            }
            return this._exchangeCostIds;
        }

        protected onBagUpdateByPropIndex(n: GameNT): void {
            let indexs = n.body as number[];
            if (!indexs || !indexs.length) {
                return;
            }
            let costIds = this.getExchangeCostIds();
            for (let idx of indexs) {
                if (costIds.indexOf(idx) > -1) {
                    this.sendNt(ActivityEvent.ON_ZCX_EXCHANGE_UPDATE);
                    this.updateExchangeHint();
                    break;
                }
            }
        }

        //幸运数字红点
        private updateLuckNumHint(): void {
            if (!this.isOpen()) {
                return;
            }
            let hint = this._model.status == 1 || this.canGetLuckNum();
            HintMgr.setHint(hint, this._model.hintPath[ZcxMainBtnType.LuckNum]);
        }

        //进宝钱庄红点
        private updateBankHint(): void {
            if (!this.isOpen()) {
                return;
            }
            HintMgr.setHint(this.canGetBankInterest(), this._model.hintPath[ZcxMainBtnType.Bank]);
        }

        //财神副本红点
        private updateFubenHint(): void {
            if (!this.isOpen()) {
                return;
            }
            HintMgr.setHint(this.canChallenge(), this._model.hintPath[ZcxMainBtnType.Fuben]);
        }

        //兑换红点
        private updateExchangeHint(): void {
            if (!this.isOpen()) {
                return;
            }
            let cfgs: ZcxExchangeConfig[] = getConfigListByName(ConfigName.ZcxExchange);
            let hint = false;
            for (let cfg of cfgs) {
                if (this.canExchange(cfg.index)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[ZcxMainBtnType.Exchange]);
        }

        /**============================ 基金start ============================*/

        //招财仙基金: 领取宝箱奖励
        public c2s_zcx_fund_box_reward(type: ZcxFundType): void {
            let msg = new c2s_zcx_fund_box_reward();
            msg.type = type;
            this.sendProto(msg);
        }

        //招财仙基金: 领取天数奖励
        public c2s_zcx_fund_day_reward(type: ZcxFundType): void {
            let msg = new c2s_zcx_fund_day_reward();
            msg.type = type;
            this.sendProto(msg);
        }

        //招财仙基金: 打开宝箱界面
        public c2s_zcx_fund_box_show(type: ZcxFundType): void {
            let msg = new c2s_zcx_fund_box_show();
            msg.type = type;
            this.sendProto(msg);
        }

        //招财仙基金: 数据下发
        private s2c_zcx_fund_update(n: GameNT): void {
            let msg = n.body as s2c_zcx_fund_update;
            if (msg.type != null) {
                this._model.fundMap[msg.type] = msg;
            }
            this.updateFundHint();
            this.sendNt(ActivityEvent.ON_ZCX_FUND_UPDATE);
        }

        //招财仙基金: 打开宝箱界面 返回
        private s2c_zcx_fund_box_show(n: GameNT): void {
            let msg = n.body as s2c_zcx_fund_box_show;
            if (msg.type != null) {
                this._model.fundBoxShowMap[msg.type] = msg.count || 0;
            }
            this.sendNt(ActivityEvent.ON_ZCX_FUND_BOX_SHOW);
        }

        //招财仙基金： 请求奖励界面
        public c2s_zcx_fund_reward_show(type: ZcxFundType): void {
            let msg = new c2s_zcx_fund_reward_show();
            msg.type = type;
            this.sendProto(msg);
        }

        //招财仙基金： 请求奖励界面 返回
        private s2c_zcx_fund_reward_show(n: GameNT): void {
            let msg = n.body as s2c_zcx_fund_reward_show;
            if (msg.type != null) {
                this.model.fundRewardShowMap[msg.type] = msg.index;
            }
            this.sendNt(ActivityEvent.ON_ZCX_FUND_REWARD_SHOW);
        }

        //获取购买人数（真实购买+虚假购买）
        public getBoughtNum(type: ZcxFundType): number {
            let info = this._model.fundBoxShowMap[type];
            return info || 0;
        }

        //宝箱状态 1.可领取2.已领取
        public getBoxStatus(type: ZcxFundType): RewardStatus {
            let info = this._model.fundMap[type];
            return info && info.box_status ? info.box_status : RewardStatus.NotFinish;
        }

        // //是否已领取宝箱奖励
        // public isReceiveBoxReward(type: ZcxFundType): boolean {
        //     let status = this.getBoxStatus(type);
        //     return status == RewardStatus.Draw;
        // }
        //
        // //可否领取宝箱奖励
        // public canReceiveBoxReward(type: ZcxFundType): boolean {
        //     let status = this.getBoxStatus(type);
        //     return status == RewardStatus.Finish;
        // }

        //是否购买了
        public isBought(type: ZcxFundType): boolean {
            let info = this._model.fundMap[type];
            return info && info.is_buy && info.is_buy == true;
        }

        //今天是否已领取
        public isReceiveToday(type: ZcxFundType): boolean {
            if (!this.isBought(type)) {
                return false;
            }
            let info = this._model.fundMap[type];
            if (!info) {
                return false;
            }
            return info.index == 0;//领取后服务端重置为0
        }

        //是否已领取所有
        public isReceiveAll(type: ZcxFundType): boolean {
            if (!this.isBought(type)) {
                return false;
            }
            let info = this._model.fundMap[type];
            if (!info) {
                return false;
            }
            let receivedSize = info.get_index || 0;
            let cfgList = this.getFundCfgList(type);
            let totalSize = cfgList.length;
            return receivedSize >= totalSize;
        }

        //领取状态
        public getReceiveStatus(type: ZcxFundType, day: number): RewardStatus {
            let info = this._model.fundMap[type];
            if (!info) {
                return RewardStatus.NotFinish;
            }
            let receivedDay = info.get_index || 0;
            if (day <= receivedDay) {
                return RewardStatus.Draw;//已领取
            }
            let today = info.index || 0;
            return day <= today ? RewardStatus.Finish : RewardStatus.NotFinish;
        }

        //基金配置
        public getFundCfgList(type: ZcxFundType): ZcxFundConfig[] {
            if (this._model.fundCfgMap && this._model.fundCfgMap[type]) {
                return this._model.fundCfgMap[type];
            }
            let cfgObj: { [index: number]: ZcxFundConfig } = getConfigByNameId(ConfigName.ZcxFund, type);
            let list: ZcxFundConfig[] = [];
            for (let key in cfgObj) {
                list.push(cfgObj[key]);
            }
            this._model.fundCfgMap[type] = list;
            return list;
        }

        //基金宝箱奖励
        public getFundBoxReward(type: ZcxFundType): number[] {
            let id = 'zhaocai_box_reward' + type;
            let cfg = GameConfig.getParamConfigById(id);
            return cfg ? cfg.value : [];
        }

        //基金重置时间，秒
        public getFundResetTime(type: ZcxFundType): number {
            let id = 'zhaocai_reset_time' + type;
            let cfg = GameConfig.getParamConfigById(id);
            return cfg ? cfg.value : 0;
        }

        //基金购买人数目标
        public getFundTargetNum(type: ZcxFundType): number {
            let id = 'zhaocai_box_target' + type;
            let cfg = GameConfig.getParamConfigById(id);
            return cfg ? cfg.value : 0;
        }

        //基金的商品id
        public getFundProductId(type: ZcxFundType): number {
            let list = [ProductId.Id201901, ProductId.Id201902];
            return list[type - 1];
        }

        //所有奖励
        public getAllRewards(type: ZcxFundType): number[][] {
            let cfgList = this.getFundCfgList(type);
            let obj: { [index: number]: number } = {};
            for (let cfg of cfgList) {
                if (cfg && cfg.reward) {
                    obj[cfg.reward[0]] = cfg.reward[1] + (obj[cfg.reward[0]] || 0);
                }
            }
            let list: number[][] = [];
            for (let key in obj) {
                list.push([+key, obj[key]]);
            }
            return list;
        }

        //当前购买可一次性获得的奖励
        public getRewardsAfterPay(type: ZcxFundType): number[][] {
            let cfgList = this.getFundCfgList(type);
            let obj: { [index: number]: number } = {};
            let showDay = this._model.fundRewardShowMap[type] || 0;
            for (let cfg of cfgList) {
                if (cfg.index <= showDay && cfg.reward) {
                    obj[cfg.reward[0]] = cfg.reward[1] + (obj[cfg.reward[0]] || 0);
                }
            }
            let list: number[][] = [];
            for (let key in obj) {
                list.push([+key, obj[key]]);
            }
            return list;
        }

        //战令红点
        protected onUpdateGivingList(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(GameOrderType.Chaojilicai) > -1 || types.indexOf(GameOrderType.Zhizunlicai) > -1) {
                this.updateGameorderHint();
            }
        }

        //战令红点
        private updateGameorderHint(): void {
            let gameOrderProxy: GameOrderProxy = getProxy(ModName.Activity, ProxyType.GameOrder);
            if (ViewMgr.getIns().checkViewOpen(OpenIdx.Chaojilicai)) {
                let hint1 = gameOrderProxy.getHintByType(GameOrderType.Chaojilicai);
                HintMgr.setHint(hint1, this._model.hintPath[ZcxMainBtnType.Chaojilicai]);
            }
            if (ViewMgr.getIns().checkViewOpen(OpenIdx.Zhizunlicai)) {
                let hint2 = gameOrderProxy.getHintByType(GameOrderType.Zhizunlicai);
                HintMgr.setHint(hint2, this._model.hintPath[ZcxMainBtnType.Zhizunlicai]);
            }
        }

        //基金红点
        public getFundHint(type: ZcxFundType): boolean {
            let info = this._model.fundMap[type];
            if (!info || !info.index) {
                return false;
            }
            return info.index != 0;
        }

        //基金红点
        private updateFundHint(): void {
            //福利基金
            if (ViewMgr.getIns().checkViewOpen(OpenIdx.Fulijijin)) {
                let hint = this.getFundHint(ZcxFundType.Fuli);
                HintMgr.setHint(hint, this.model.hintPath[ZcxMainBtnType.Fulijijin]);
            }
            //超级基金
            if (ViewMgr.getIns().checkViewOpen(OpenIdx.Chaojijijin)) {
                let hint = this.getFundHint(ZcxFundType.Chaoji);
                HintMgr.setHint(hint, this.model.hintPath[ZcxMainBtnType.Chaojijijin]);
            }
        }

        /**============================ 基金end ============================*/

    }
}