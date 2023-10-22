namespace game.mod.more {

    import GameNT = base.GameNT;
    import c2s_huanggu_nvshen_op = msg.c2s_huanggu_nvshen_op;
    import s2c_huanggu_nvshen_info = msg.s2c_huanggu_nvshen_info;
    import attributes = msg.attributes;
    import ParamConfig = game.config.ParamConfig;
    import HuangguRewardConfig = game.config.HuangguRewardConfig;
    import HuangguShuijingConfig = game.config.HuangguShuijingConfig;
    import HuangguGiftConfig = game.config.HuangguGiftConfig;
    import c2s_nvshen_get_chat = msg.c2s_nvshen_get_chat;
    import c2s_nvshen_save_chat = msg.c2s_nvshen_save_chat;
    import nvshen_chat = msg.nvshen_chat;
    import s2c_nvshen_chat = msg.s2c_nvshen_chat;
    import HuangguHaoganDuihuaConfig = game.config.HuangguHaoganDuihuaConfig;
    import HuangguShijianConfig = game.config.HuangguShijianConfig;
    import HuangguShijianTypeConfig = game.config.HuangguShijianTypeConfig;
    import NvshenDuihuaConfig = game.config.NvshenDuihuaConfig;

    export class HuangguProxy extends ProxyBase {
        private _model: HuangguModel;

        initialize(): void {
            super.initialize();
            this._model = new HuangguModel();

            this.onProto(s2c_huanggu_nvshen_info, this.s2c_huanggu_nvshen_info, this);
            this.onProto(s2c_nvshen_chat, this.s2c_nvshen_chat, this);
        }

        public c2s_huanggu_nvshen_op(type: number, index?: number, param?: number) {
            let msg = new c2s_huanggu_nvshen_op();
            msg.type = type;
            msg.index = index;
            msg.param = param;
            this.sendProto(msg);
        }

        public c2s_nvshen_get_chat(type: number) {
            let msg = new c2s_nvshen_get_chat();
            msg.type = type;
            this.sendProto(msg);
        }
        public c2s_nvshen_save_chat(type: number, list: nvshen_chat[]) {
            this.saveChat(type, list);
            let msg = new c2s_nvshen_save_chat();
            msg.type = type;
            msg.list = list;
            this.sendProto(msg);
        }

        private s2c_huanggu_nvshen_info(n: GameNT) {
            let msg: s2c_huanggu_nvshen_info = n.body;
            if (!msg) {
                return;
            }
            if (msg.gongfeng != undefined) {
                if (!this._model.consecrateInfo) {
                    this._model.consecrateInfo = msg.gongfeng;
                }
                else {
                    for (let k in msg.gongfeng) {
                        this._model.consecrateInfo[k] = msg.gongfeng[k];
                    }
                }
                this.sendNt(HuangguEvent.ON_UPDATE_GODDESS_CONSECRATE_INFO);
            }
            if (msg.hudong != undefined) {
                if (!this._model.chatInfo) {
                    this._model.chatInfo = msg.hudong;
                }
                else {
                    for (let k in msg.hudong) {
                        this._model.chatInfo[k] = msg.hudong[k];
                    }
                }
                this.sendNt(HuangguEvent.ON_UPDATE_GODDESS_CHAT_INFO);
            }
            if (msg.shijian != undefined) {
                if (!this._model.eventList) {
                    this._model.eventList = msg.shijian;
                }
                else {
                    for (let info of msg.shijian) {
                        let pos = this.getInfoPos(info.index);
                        if (pos >= 0) {
                            this._model.eventList[pos] = info;
                        }
                        else {
                            this._model.eventList.push(info);
                        }
                    }
                }
                this.sendNt(HuangguEvent.ON_UPDATE_GODDESS_EVENT_INFO);
            }
            if (msg.gift != undefined) {
                if (!this._model.targetInfo) {
                    this._model.targetInfo = msg.gift;
                }
                else {
                    for (let k in msg.gift) {
                        this._model.targetInfo[k] = msg.gift[k];
                    }
                }
                this.sendNt(HuangguEvent.ON_UPDATE_GODDESS_TARGET_INFO);
            }
            this.updateHint();
        }

        private getInfoPos(index: number): number {
            if (!this._model.eventList || !this._model.eventList.length) {
                return -1;
            }
            let len = this._model.eventList.length;
            for (let i = 0; i < len; ++i) {
                let info = this._model.eventList[i];
                if (info.index == index) {
                    return i;
                }
            }
            return -1;
        }

        private s2c_nvshen_chat(n: GameNT) {
            let msg: s2c_nvshen_chat = n.body;
            if (!msg) {
                return;
            }
            this._model.chatList[msg.type] = msg.list || [];
        }

        public get lv(): number {
            if (this._model.consecrateInfo) {
                return this._model.consecrateInfo.level;
            }
            return 1;//默认返回1级
        }
        public get exp(): number {
            if (this._model.consecrateInfo) {
                return this._model.consecrateInfo.exp;
            }
            return 0;
        }
        //计算供奉次数
        public get cnt(): number {
            // let cnt = 0;
            // let lv = this.lv;
            // while (lv > 0){
            //     lv--;
            //     let cfg: HuangguGongfengConfig = getConfigByNameId(ConfigName.HuangguGongfeng, lv);
            //     if(!cfg){
            //         break;
            //     }
            //     cnt += cfg.exp;
            // }
            // cnt += this.exp;
            // return cnt;
            if (this._model.consecrateInfo) {
                return this._model.consecrateInfo.times;
            }
            return 0;
        }

        public get haoganLv(): number {
            if (this._model.consecrateInfo) {
                return this._model.consecrateInfo.haogan_level;
            }
            return 1;//默认返回1级
        }
        public get haoganExp(): number {
            if (this._model.consecrateInfo) {
                return this._model.consecrateInfo.haogan_exp;
            }
            return 0;
        }

        public getSpecialAttrId():number{
            let cfg: ParamConfig = GameConfig.getParamConfigById("huanggu_nvshen_qiyueshuxing");
            let attrId = cfg && cfg.value;
            return attrId;
        }

        // public get attr(): attributes {
        //     // if(this._model.consecrateInfo){
        //     //     return this._model.consecrateInfo.attr;
        //     // }
        //     let cfg: ParamConfig = GameConfig.getParamConfigById("huanggu_qiyue");
        //     let attrId = cfg && cfg.value && cfg.value[2];//属性ID
        //     let attr = RoleUtil.getAttr(attrId);
        //     if (attr) {
        //         return TextUtil.calcAttr(attr, this.lv);
        //     }
        //     return null;
        // }

        public get isAct(): boolean {
            return this._model.consecrateInfo && this._model.consecrateInfo.is_act;
        }

        public getRewards(): number[][] {
            if (!this._model.rewards) {
                this._model.rewards = [];
                let cfgList = getConfigListByName(ConfigName.HuangguReward);
                for (let cfgs of cfgList) {
                    for (let k in cfgs) {
                        let cfg: HuangguRewardConfig = cfgs[k];
                        this._model.rewards.push(...cfg.item);
                    }
                }
                // for (let cfg of cfgList) {
                //     for (let item of cfg.item) {
                //         this._model.rewards.push(item);
                //     }
                // }

            }
            return this._model.rewards;
        }

        public getSummonRewards(): number[][] {
            if (!this._model.summonRewards) {
                this._model.summonRewards = [];
                let cfgList: HuangguShuijingConfig[] = getConfigListByName(ConfigName.HuangguShuijing);
                for (let cfg of cfgList) {
                    this._model.summonRewards = this._model.summonRewards.concat(cfg.item);
                }
            }
            return this._model.summonRewards;
        }

        public getSummonCost(): number[] {
            let cfg: ParamConfig = GameConfig.getParamConfigById("huanggu_shuijing");
            return cfg && cfg.value;
        }

        public isOpenSummon(): boolean {
            let hasPrivilege = RoleUtil.hasPrivilege(RolePrivilegeKey.huanggu_shuijing);
            return hasPrivilege;
        }

        public hasFreeDraw(index: number): boolean {
            return this._model.targetInfo && this._model.targetInfo.free_reward && this._model.targetInfo.free_reward.indexOf(index) > -1;
        }

        public hasBuyDraw(index: number): boolean {
            return this._model.targetInfo && this._model.targetInfo.buy_reward && this._model.targetInfo.buy_reward.indexOf(index) > -1;
        }

        public canDraw(cfg: HuangguGiftConfig): boolean {
            return this.cnt > cfg.times;
        }

        //当前对话的好感index
        public get chatLv(): number {
            if (this._model.chatInfo) {
                return this._model.chatInfo.level;
            }
            return 1;//默认返回1级
        }
        public isChatFinish(): boolean {
            return this._model.chatInfo && this._model.chatInfo.is_finish;
        }

        private saveChat(type: number, chatList: nvshen_chat[]): void {
            if (!this._model.chatList[type]) {
                this._model.chatList[type] = [];
            }
            this._model.chatList[type] = this._model.chatList[type].concat(chatList);
        }

        public getSelfChat(cfg: HuangguHaoganDuihuaConfig | NvshenDuihuaConfig, type: number = CommonChatType.Goddess): string {
            let level = cfg["level"];
            let index = cfg.index;
            let descList = this.getDescList(cfg.desc);
            let chatList = this._model.chatList[type];
            for (let i of chatList) {
                if (i.level == level && i.index == index) {
                    return descList[i.pos];
                }
            }
            return "";
        }

        public getDescList(desc: string): string[] {
            return desc.split("#N");
        }

        //是否可以继续对话
        public get chatMaxLv(): number {
            if (!this._model.maxChatLv) {
                let cfgList: any[] = getConfigListByName(ConfigName.HuangguHaoganDuihua);
                let cfg = cfgList[cfgList.length - 1][1] as HuangguHaoganDuihuaConfig;
                this._model.maxChatLv = cfg["level"];
            }
            return this._model.maxChatLv;
        }

        public get curChatType(): number {
            return this._model.curChatType;
        }
        public set curChatType(type: number) {
            this._model.curChatType = type;
        }

        public getEventStage(index: number): number {
            let pos = this.getInfoPos(index);
            if (pos >= 0) {
                return this._model.eventList[pos].stage;
            }
            return 0;
        }

        public getEventMaxStage(index: number): number {
            let maxStage = 0;
            let cfgList: object = getConfigByNameId(ConfigName.HuangguShijian, index);
            for (let k in cfgList) {
                let cfg: HuangguShijianConfig = cfgList[k];
                if (cfg.stage > maxStage) {
                    maxStage = cfg.stage;
                }
            }
            return maxStage;
        }

        public isEventOpen(index: number): boolean {
            let lastIndex = index - 1;
            if (lastIndex <= 0) {
                return true;
            }
            return this.isEventFinish(lastIndex);
        }

        public isEventFinish(index: number): boolean {
            let stage = this.getEventStage(index);
            if (stage <= 0) {
                return false;
            }
            let maxStage = this.getEventMaxStage(index);
            return stage >= maxStage;
        }

        private updateHint(): void {
            this.updateGoddessHint();
            this.updateTargetHint();
        }

        private updateGoddessHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Goddess)) {
                return;//功能未开启
            }
            let hint = this.checkGoddessHint();
            let hintType = this._model.goddessHint;
            HintMgr.setHint(hint, hintType);
        }

        private checkGoddessHint(): boolean {
            if (this.checkTargetHint()) {
                return true;
            }
            if (this.checkConsecrateHint()) {
                return true;
            }
            if (this.checkChatHint()) {
                return true;
            }
            if (this.checkEventHint()) {
                return true;
            }
            if (this.checkActHint()) {
                return true;
            }
            if (this.checkSummonHint()) {
                return true;
            }
            return false;
        }

        private get costIndex(): number {
            if (!this._model.costIndex) {
                let cfg: ParamConfig = GameConfig.getParamConfigById("huanggu_gongfeng_xiaohao");
                let cost = cfg.value;
                this._model.costIndex = cost[0];
            }
            return this._model.costIndex;
        }

        private checkConsecrateHint(): boolean {
            let cfg: ParamConfig = GameConfig.getParamConfigById("huanggu_gongfeng_xiaohao");
            let cost = cfg.value;
            let costIndex = cost[0];
            let costCnt = cost[1];
            let curCnt = BagUtil.getPropCntByIdx(costIndex);
            return curCnt >= costCnt;
        }

        public checkChatHint(): boolean {
            let isFinish = this.isChatFinish();
            if (isFinish) {
                return true;//已完成，可以领取奖励
            }
            let haoganLv = this.haoganLv;
            let chatLv = this.chatLv;
            let maxChatLv = this.chatMaxLv;
            return haoganLv >= chatLv && chatLv <= maxChatLv;
        }

        public checkEventHint(): boolean {
            let cfgList: HuangguShijianTypeConfig[] = getConfigListByName(ConfigName.HuangguShijianType);
            for (let i = 0; i < cfgList.length; ++i) {
                let cfg = cfgList[i];
                if (this.checkEventPerHint(cfg.index)) {
                    return true;
                }
            }
            return false;
        }

        public checkEventPerHint(index: number): boolean {
            let isOpen = this.isEventOpen(index);
            if (!isOpen) {
                return false;
            }
            let isFinish = this.isEventFinish(index);
            if (isFinish) {
                return false;
            }
            let canChallenge = ViewMgr.getIns().checkZhenrong();
            if (!canChallenge) {
                return false;
            }
            let stage = this.getEventStage(index);
            let curStage = stage + 1;
            let cfgList: object = getConfigByNameId(ConfigName.HuangguShijian, index);
            let cfg: HuangguShijianConfig = cfgList[curStage];
            if (!cfg) {
                return false;
            }
            return ViewMgr.getIns().checkZhenrongGod(cfg.god);
        }

        private get actIndex(): number {
            if (!this._model.actIndex) {
                let cfg: ParamConfig = GameConfig.getParamConfigById("huanggu_qiyue");
                let index = cfg && cfg.value && cfg.value[0];
                this._model.actIndex = index;
            }
            return this._model.actIndex;
        }

        public checkActHint(): boolean {
            if (this.isAct) {
                return false;
            }
            let cfg: ParamConfig = GameConfig.getParamConfigById("huanggu_qiyue");
            let index = cfg && cfg.value && cfg.value[0];
            let costCnt = cfg && cfg.value && cfg.value[1];
            return BagUtil.checkPropCnt(index, costCnt);
        }

        public get summonIndex(): number {
            if (!this._model.summonIndex) {
                let cost = this.getSummonCost();//荒古水晶
                let costIndex = cost[0];
                this._model.summonIndex = costIndex;
            }
            return this._model.summonIndex;
        }

        public checkSummonHint(): boolean {
            let isOpen = this.isOpenSummon();
            if (!isOpen) {
                return false;
            }
            let cost = this.getSummonCost();//荒古水晶
            let costIndex = cost[0];
            let costCnt = cost[1];
            let curCnt = BagUtil.getPropCntByIdx(costIndex);
            return curCnt >= costCnt;
        }

        public get targetHint(): string[] {
            return this._model.targetHint;
        }

        private updateTargetHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Goddess)) {
                return;//功能未开启
            }
            let hint = this.checkTargetHint();
            let hintType = this._model.targetHint;
            HintMgr.setHint(hint, hintType);
        }

        private checkTargetHint(): boolean {
            let cfgList: HuangguGiftConfig[] = getConfigListByName(ConfigName.HuangguGift);
            for (let cfg of cfgList) {
                let needCnt = cfg.times;
                if (this.cnt < needCnt) {
                    continue;
                }
                let index = cfg.index;
                if (!this.hasFreeDraw(index)) {
                    return true;
                }
                let hasBuyDraw = this.hasBuyDraw(index);
                if (hasBuyDraw) {
                    continue;
                }
                if (!cfg.gift_id) {
                    //消耗购买
                    let cost = cfg.cost[0];
                    if (BagUtil.checkPropCnt(cost[0], cost[1])) {
                        return true;
                    }
                }
            }
            return false;
        }

        protected onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.diamond) >= 0) {
                /**写死仙玉变更时候刷新，需要其他道具时再做支持*/
                this.updateTargetHint();
            }
        }

        protected onBagUpdateByPropIndex(n: base.GameNT): void {
            let indexs: number[] = n.body;
            if (indexs.indexOf(this.costIndex) > -1 || indexs.indexOf(this.actIndex) > -1 || indexs.indexOf(this.summonIndex) > -1) {
                this.updateGoddessHint();
            }
        }

        protected onRolePrivilegeUpdate(n: GameNT) {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePrivilegeKey.huanggu_shuijing) >= 0) {
                this.updateGoddessHint();
            }
        }

        protected onUpdateZhenrongInfo(n: GameNT): void {
            this.updateGoddessHint();
        }
    }
}