namespace game.mod.activity {

    import c2s_xiannv_gift_get_rewards = msg.c2s_xiannv_gift_get_rewards;
    import GameNT = base.GameNT;
    import s2c_xiannv_gift_info = msg.s2c_xiannv_gift_info;
    import c2s_jingcai_cangzhenge_open = msg.c2s_jingcai_cangzhenge_open;
    import s2c_jingcai_cangzhenge_info = msg.s2c_jingcai_cangzhenge_info;
    import c2s_jingcai_keepcharge_get_rewards = msg.c2s_jingcai_keepcharge_get_rewards;
    import s2c_jingcai_keepcharge_info = msg.s2c_jingcai_keepcharge_info;
    import c2s_jingcai_addcharge_get_rewards = msg.c2s_jingcai_addcharge_get_rewards;
    import s2c_jingcai_addcharge_info = msg.s2c_jingcai_addcharge_info;
    import c2s_jingcai_login_get_rewards = msg.c2s_jingcai_login_get_rewards;
    import s2c_jingcai_login_info = msg.s2c_jingcai_login_info;
    import TimeMgr = base.TimeMgr;
    import CanzhengeConfig = game.config.CanzhengeConfig;
    import oper_act_item = msg.oper_act_item;
    import c2s_luckbless_button_click = msg.c2s_luckbless_button_click;
    import s2c_luckbless_info = msg.s2c_luckbless_info;
    import ParamConfig = game.config.ParamConfig;
    import s2c_tired_charge_info = msg.s2c_tired_charge_info;
    import s2c_tired_charge_update = msg.s2c_tired_charge_update;
    import c2s_tired_charge_receive = msg.c2s_tired_charge_receive;
    import TiannvchargeWealConfig = game.config.TiannvchargeWealConfig;
    import VipChargeConfig = game.config.VipChargeConfig;

    /**
     * @description 精彩活动
     */
    export class WonderfulActProxy extends ProxyBase {
        private _model: WonderfulActModel;

        public get model(): WonderfulActModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new WonderfulActModel();
            this.onProto(s2c_xiannv_gift_info, this.s2c_xiannv_gift_info, this);
            this.onProto(s2c_jingcai_cangzhenge_info, this.s2c_jingcai_cangzhenge_info, this);
            this.onProto(s2c_jingcai_keepcharge_info, this.s2c_jingcai_keepcharge_info, this);
            this.onProto(s2c_jingcai_addcharge_info, this.s2c_jingcai_addcharge_info, this);
            this.onProto(s2c_jingcai_login_info, this.s2c_jingcai_login_info, this);
            this.onProto(s2c_luckbless_info, this.s2c_luckbless_info, this);
            this.onProto(s2c_tired_charge_info, this.s2c_tired_charge_info, this);
            this.onProto(s2c_tired_charge_update, this.s2c_tired_charge_update, this);
        }

        //精彩活动-仙女送礼
        public c2s_xiannv_gift_get_rewards(): void {
            let msg = new c2s_xiannv_gift_get_rewards();
            this.sendProto(msg);
        }

        private s2c_xiannv_gift_info(n: GameNT): void {
            let msg = n.body as s2c_xiannv_gift_info;
            if (msg.status != null) {
                this._model.status = msg.status;
            }
            this._model.open_time = msg.open_time != null ? msg.open_time.toNumber() : 0;
            this.updateHint1();
            this.sendNt(ActivityEvent.ON_UPDATE_WONDERFUL_ACT_XIANNV_GIFT);
        }

        // 精彩活动-藏珍阁
        public c2s_jingcai_cangzhenge_open(index: number): void {
            let msg = new c2s_jingcai_cangzhenge_open();
            msg.act_id = this._model.act_id_czg;
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_jingcai_cangzhenge_info(n: GameNT): void {
            let msg = n.body as s2c_jingcai_cangzhenge_info;
            if (msg.act_id != null) {
                this._model.act_id_czg = msg.act_id;
            }
            if (msg.big_box_status != null) {
                this._model.big_box_status = msg.big_box_status;
            }
            if (msg.box_list != null) {
                for (let item of msg.box_list) {
                    this._model.box_list[item.index] = item;
                }
            } else {
                this._model.box_list = {};//重置数据
            }
            this.updateHint2();
            this.sendNt(ActivityEvent.ON_UPDATE_WONDERFUL_ACT_CANGZHENGE);
        }

        //精彩活动-连续充值
        public c2s_jingcai_keepcharge_get_rewards(index: number): void {
            let msg = new c2s_jingcai_keepcharge_get_rewards();
            msg.act_id = this._model.act_id_keepcharge;
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_jingcai_keepcharge_info(n: GameNT): void {
            let msg = n.body as s2c_jingcai_keepcharge_info;
            if (msg.act_id != null) {
                this._model.act_id_keepcharge = msg.act_id;
            }
            if (msg.list != null) {
                for (let item of msg.list) {
                    this._model.list_keepcharge[item.type] = item;
                }
            } else {
                this._model.list_keepcharge = {};
            }
            this.updateHint3();
            this.sendNt(ActivityEvent.ON_UPDATE_WONDERFUL_ACT_KEEPCHARGE);
        }

        //精彩活动-累计充值
        public c2s_jingcai_addcharge_get_rewards(index: number): void {
            let msg = new c2s_jingcai_addcharge_get_rewards();
            msg.act_id = this._model.act_id_addcharge;
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_jingcai_addcharge_info(n: GameNT): void {
            let msg = n.body as s2c_jingcai_addcharge_info;
            if (msg.act_id != null) {
                this._model.act_id_addcharge = msg.act_id;
            }
            if (msg.num != null) {
                this._model.num_addcharge = msg.num.toNumber();
            }
            if (msg.list != null) {
                for (let item of msg.list) {
                    this._model.list_addcharge[item.index] = item;
                }
            } else {
                this._model.list_addcharge = {};
            }
            this.updateHintOther(4);
            this.sendNt(ActivityEvent.ON_UPDATE_WONDERFUL_ACT_ADDCHARGE);
        }

        //精彩活动-登录活动
        public c2s_jingcai_login_get_rewards(index: number): void {
            let msg = new c2s_jingcai_login_get_rewards();
            msg.act_id = this._model.act_id_login;
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_jingcai_login_info(n: GameNT): void {
            let msg = n.body as s2c_jingcai_login_info;
            if (msg.act_id != null) {
                this._model.act_id_login = msg.act_id;
            }
            if (msg.num != null) {
                this._model.num_login = msg.num.toNumber();
            }
            if (msg.list != null) {
                for (let item of msg.list) {
                    this._model.list_login[item.index] = item;
                }
            } else {
                this._model.list_login = {};
            }
            this.updateHintOther(5);
            this.sendNt(ActivityEvent.ON_UPDATE_WONDERFUL_ACT_LOGIN);
        }

        public c2s_luckbless_button_click(button_type: number): void {
            let msg: c2s_luckbless_button_click = new c2s_luckbless_button_click();
            msg.button_type = button_type;
            this.sendProto(msg);
        }

        private s2c_luckbless_info(n: GameNT): void {
            let msg: s2c_luckbless_info = n.body;
            if (msg.count) {
                this._model.count = msg.count;
            }
            this.sendNt(ActivityEvent.ON_UPDATE_WONDERFUL_ACT_6);
        }

        private _xiannvTimeObjList: { h: number, m: number }[];

        //时间段（开始时间，结束时间；开始时间，结束时间；......）
        public getXiannvTimeObjList(): { h: number, m: number }[] {
            if (this._xiannvTimeObjList) {
                return this._xiannvTimeObjList;
            }
            let list: { h: number, m: number }[] = [];
            let cfg = GameConfig.getParamConfigById('xiannvsongli_shijian');
            let timeList: number[][] = cfg.value;
            for (let item of timeList) {
                list.push({
                    h: item[0],
                    m: item[1]
                });
                list.push({
                    h: item[2],
                    m: item[3]
                });
            }
            this._xiannvTimeObjList = list;
            return list;
        }

        private getXiannvTimeSecondList(): number[] {
            let list: number[] = [];
            let timeList = this.getXiannvTimeObjList();
            let date = new Date(TimeMgr.time.serverTime);
            for (let i = 0; i < timeList.length; i += 2) {
                let startObj = timeList[i];
                date.setHours(startObj.h, startObj.m, 0, 0);
                list.push(Math.floor(date.getTime() / 1000));
                let endObj = timeList[i + 1];
                date.setHours(endObj.h, endObj.m, 0, 0);
                list.push(Math.floor(date.getTime() / 1000));
            }
            return list;
        }

        public inXiannvActTime(): boolean {
            let curTimeSec = TimeMgr.time.serverTimeSecond;
            let list = this.getXiannvTimeSecondList();
            for (let i = 0; i < list.length; i += 2) {
                let startTime = list[i];
                let endTime = list[i + 1];
                if (startTime <= curTimeSec && curTimeSec < endTime) {
                    return true;
                }
            }
            return false;
        }

        //仙女奖励，在活动时间内且未领取
        public canGetXiannvReward(): boolean {
            if (!this.inXiannvActTime()) {
                return false;
            }
            let status = this._model.status;
            return status != null && status == 0;
        }

        public getXiannvNextTimeSec(): number {
            let curTimeSec = TimeMgr.time.serverTimeSecond;
            let list = this.getXiannvTimeSecondList();
            for (let i = 0; i < list.length; i += 2) {
                let startTime = list[i];
                if (curTimeSec < startTime) {
                    return startTime;
                }
            }
            return list[0] + Second.Day;
        }

        public getCzgRewardGottenCnt(): number {
            let cnt = 0;
            for (let key in this._model.box_list) {
                let item = this._model.box_list[key];
                if (item && item.status == 1) {
                    cnt++;
                }
            }
            return cnt;
        }

        public getCzgRewardMaxCnt(): number {
            let list: CanzhengeConfig[] = getConfigListByName(ConfigName.Cangzhenge) || [];
            return list.length - 1;
        }

        public canOpenCzgReward(index: number, isTips = false): boolean {
            let box = this._model.box_list[index];
            if (box) {
                return false;
            }
            let cfg: CanzhengeConfig = getConfigByNameId(ConfigName.Cangzhenge, index);
            if (!cfg || !cfg.costs) {
                return false;
            }
            for (let cost of cfg.costs) {
                if (!BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None)) {
                    return false;
                }
            }
            return true;
        }

        //1藏珍阁，2连续充值，3累计豪礼，4登陆奖励
        public getActDataByType(type: ActivityType): oper_act_item {
            let actId = this.getActId(type);
            return this.getActData(actId);
        }

        public getActData(act_id: number): oper_act_item {
            let proxy: ActivityProxy = getProxy(ModName.Activity, ProxyType.Activity);
            return proxy.getActData(act_id);
        }

        //1藏珍阁，2连续充值，3累计豪礼，4登陆奖励
        public getActId(type: ActivityType): number {
            let model = this._model;
            let ary = [0, model.act_id_czg, model.act_id_keepcharge, model.act_id_addcharge, model.act_id_login];
            return ary[type] || 0;
        }

        //1藏珍阁，2连续充值，3累计豪礼，4登陆奖励
        public getEndTimeSec(type: ActivityType): number {
            let actId = this.getActId(type);
            let actData = this.getActData(actId);
            return actData && actData.c_end_time || 0;
        }

        //活动开启否
        public canOpen(type: ActivityType): boolean {
            let actData = this.getActDataByType(type);
            if (!actData) {
                return false;
            }
            let timeSec = TimeMgr.time.serverTimeSecond;
            return actData.c_begin_time <= timeSec && timeSec <= actData.c_end_time;
        }

        public canGetLoginReward(index: number): boolean {
            let info = this._model.list_login[index];
            return info && info.status == 1;
        }

        //0未开启   1可领取   2已领取
        public getKeepChargeStatus(type: number, index: number): number {
            let info = this._model.list_keepcharge[type];
            if (!info || !info.list) {
                return 0;
            }
            for (let item of info.list) {
                if (item && item.index == index) {
                    return item.status;
                }
            }
            return 0;
        }

        private _czgCostId = 0;
        private _cfgOneId = 0;
        private _cfgTenId = 0;

        public getCountOne(): number {

            if (this._cfgOneId) {
                return this._cfgOneId;
            }

            let cost: ParamConfig = getConfigByNameId(ConfigName.Param, "bless_cost");
            this._cfgOneId = cost.value[0][0];
            return this._cfgOneId;
        }

        public getCountTen(): number {

            if (this._cfgTenId) {
                return this._cfgTenId;
            }

            let cost: ParamConfig = getConfigByNameId(ConfigName.Param, "bless_cost");
            this._cfgTenId = cost.value[1][0];
            return this._cfgTenId;
        }

        public getCzgCostId(): number {
            if (this._czgCostId) {
                return this._czgCostId;
            }
            let cfg: CanzhengeConfig = getConfigByNameId(ConfigName.Cangzhenge, 1);
            if (cfg && cfg.costs[0]) {
                this._czgCostId = cfg.costs[0][0];
            }
            return this._czgCostId;
        }

        protected onBagUpdateByPropIndex(n: GameNT): void {
            let indexs = n.body as number[];
            if (indexs.indexOf(this.getCzgCostId()) > -1) {
                this.updateHint2();
            }

            if (indexs.indexOf(this.getCountOne()) > -1 || indexs.indexOf(this.getCountTen()) > -1) {
                this.updateHint6();
            }
        }

        private updateHint6(): void {
            let hint1 = this.oneIsHasHint();
            let hint2 = this.tenIsHasHint();
            HintMgr.setHint(hint1 || hint2, this._model.hintPath[6]);
        }

        public oneIsHasHint(): boolean {
            let cost: ParamConfig = getConfigByNameId(ConfigName.Param, "bless_cost");
            let hasNum = BagUtil.getPropCntByIdx(cost.value[0][0]);
            return hasNum > cost.value[0][1];
        }

        public tenIsHasHint(): boolean {
            let cost: ParamConfig = getConfigByNameId(ConfigName.Param, "bless_cost");
            let hasNum = BagUtil.getPropCntByIdx(cost.value[1][0]);
            return hasNum > cost.value[1][1];
        }

        private updateHint1(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.WonderfulAct)) {
                return;
            }
            let hint = this.canGetXiannvReward();
            HintMgr.setHint(hint, this._model.hintPath[1]);
        }

        private updateHint2(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.WonderfulAct1)) {
                return;
            }
            let hint = false;
            let cfgList: CanzhengeConfig[] = getConfigListByName(ConfigName.Cangzhenge);
            for (let cfg of cfgList) {
                //过滤大奖
                if (!cfg.index) {
                    continue;
                }
                //过滤已领取的
                let info = this._model.box_list[cfg.index];
                if (info && info.status == 1) {
                    continue;
                }
                if (this.canOpenCzgReward(cfg.index)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[2]);
        }

        private updateHint3(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.WonderfulAct1)) {
                return;
            }
            let list = this._model.list_keepcharge;
            for (let type in list) {
                let info = list[type];
                let hint = false;
                if (info && info.list) {
                    for (let item of info.list) {
                        if (item && item.status == 1) {
                            hint = true;
                            break;
                        }
                    }
                }
                HintMgr.setHint(hint, this._model.hintPath1[+type]);
            }
        }

        //4累计豪礼，5登陆奖励
        private updateHintOther(type: number): void {
            let isCharge = type == 4;//是否累计充值
            if(isCharge && !ViewMgr.getIns().checkViewOpen(OpenIdx.Leijicharge)){
                return;
            }
            if (!isCharge && !ViewMgr.getIns().checkViewOpen(OpenIdx.WonderfulAct1)) {
                return;
            }
            let list = isCharge ? this._model.list_addcharge : this._model.list_login;
            let hint = false;
            for (let key in list) {
                let item = list[key];
                if (item && item.status == 1) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[type]);
        }

        //连续充值金额
        public getKeepChargeRmb(): number[] {
            let paramCfg = GameConfig.getParamConfigById('wonderful_act_keepcharge');
            return paramCfg ? paramCfg.value : [30, 100];
        }

        /********************************天女赐福&&VIP5福利****************************************/
        public c2s_tired_charge_receive(type: number, index: number): void {
            let msg: c2s_tired_charge_receive = new c2s_tired_charge_receive();
            msg.type = type;
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_tired_charge_info(n: GameNT): void {
            let msg: s2c_tired_charge_info = n.body;
            if (!msg || !msg.type) {
                return;
            }
            if(!this._model.infos[msg.type]){
                this._model.infos[msg.type] = msg;
            }
            this._model.infos[msg.type] = msg;//数据直接覆盖，服务端会清空数据


            if(msg.type == TiannvWelfareOpType.Tiannv){
                this.updateTiannvHint();
                this.checkTiannvClose();
                this.sendNt(ActivityEvent.ON_UPDATE_TIANNV_WELFARE_INFO);
            }
            else {
                this.updateVipHint();
                this.checkVipClose();
                this.sendNt(ActivityEvent.ON_UPDATE_VIP_WELFARE_INFO);
            }
        }
        private s2c_tired_charge_update(n: GameNT): void {
            let msg: s2c_tired_charge_update = n.body;
            if (!msg || !msg.type) {
                return;
            }
            let info = this._model.infos[msg.type];
            for(let k in msg){
                info[k] = msg[k];
            }
            if(msg.type == TiannvWelfareOpType.Tiannv){
                this.updateTiannvHint();
                this.sendNt(ActivityEvent.ON_UPDATE_TIANNV_WELFARE_INFO);
            }
            else {
                this.updateVipHint();
                this.sendNt(ActivityEvent.ON_UPDATE_VIP_WELFARE_INFO);
            }
        }

        public getInfo(type: number): s2c_tired_charge_info {
            return this._model.infos[type] || null;
        }

        public getEndTime(type: number): number {
            let info = this.getInfo(type);
            return info && info.end_time || 0;
        }

        public getRmb(type: number): number {
            let info = this.getInfo(type);
            return info && info.total_value || 0;
        }

        private getRewardList(type: number): number[] {
            let info = this.getInfo(type);
            return info && info.list || [];
        }

        private checkOpen(openIdx: number, type: number): boolean {
            if(!ViewMgr.getIns().checkViewOpen(openIdx)){
                return false;
            }
            let endTime = this.getEndTime(type);
            return endTime > TimeMgr.time.serverTimeSecond;
        }

        public isTiannvOpen(): boolean {
            return this.checkOpen(OpenIdx.TiannvWelfare, TiannvWelfareOpType.Tiannv);
        }

        public isVipOpen(): boolean {
            return this.checkOpen(OpenIdx.VipWelfare, TiannvWelfareOpType.Vip);
        }

        private initTiannvCfgs(): void{
            if(!this._model.tiannvCfgs){
                this._model.tiannvCfgs = {};
                let cfgList: TiannvchargeWealConfig[] = getConfigListByName(ConfigName.TiannvChargeWeal);
                for(let cfg of cfgList){
                    let valueType = cfg.value;
                    if(!this._model.tiannvCfgs[valueType]){
                        this._model.tiannvCfgs[valueType] = [];
                        this._model.tiannvValueTypes.push(valueType);
                    }
                    this._model.tiannvCfgs[valueType].push(cfg);
                }
            }
        }

        public getValueTypes(): number[] {
            let types = this._model.tiannvValueTypes;
            if(!types || !types.length){
                this.initTiannvCfgs();
            }
            return types;
        }

        public getTiannvCfgs(valueType: number): TiannvchargeWealConfig[] {
            this.initTiannvCfgs();
            return this._model.tiannvCfgs[valueType];
        }

        public hasDraw(type: number, index: number): boolean {
            let rewardList = this.getRewardList(type);
            return rewardList.indexOf(index) > -1;
        }

        public canTiannvDraw(cfg: TiannvchargeWealConfig): boolean {
            let valueType = cfg.value;
            let cfgs = this.getTiannvCfgs(valueType);
            for(let i of cfgs){
                if(this.hasDraw(TiannvWelfareOpType.Tiannv, i.index)){
                    return false;//每档位奖励活动期内仅能领取一个且一次
                }
            }
            let rmb = this.getRmb(TiannvWelfareOpType.Tiannv);
            return rmb >= cfg.value;
        }

        public canVipDraw(cfg: VipChargeConfig): boolean {
            if(this.hasDraw(TiannvWelfareOpType.Vip, cfg.index)){
                return false;
            }
            let rmb = this.getRmb(TiannvWelfareOpType.Vip);
            return rmb >= cfg.value;
        }

        public getTiannvHintByValueType(valueType: number): boolean {
            let cfgList = this.getTiannvCfgs(valueType);
            for(let cfg of cfgList){
                if(this.canTiannvDraw(cfg)){
                    return true;
                }
            }
            return false;
        }

        private checkTiannvHint(): boolean {
            let types = this.getValueTypes();
            for(let valueType of types){
                if(this.getTiannvHintByValueType(valueType)){
                    return true;
                }
            }
            return false;
        }

        private updateTiannvHint(): void {
            if(!this.isTiannvOpen()){
                return;
            }
            let hint = this.checkTiannvHint();
            let hintType = this._model.tiannvHint;
            HintMgr.setHint(hint, hintType);
        }

        private updateVipHint(): void {
            if(!this.isVipOpen()){
                return;
            }
            let hint = this.checkVipHint();
            let hintType = this._model.vipHint;
            HintMgr.setHint(hint, hintType);
        }

        private checkVipHint(): boolean {
            let cfgList: VipChargeConfig[] = getConfigListByName(ConfigName.VipCharge);
            for(let cfg of cfgList) {
                let canDraw = this.canVipDraw(cfg);
                if(canDraw){
                    return true;
                }
            }
            return false;
        }

        private checkTiannvClose(): void {
            let nextTime = this.getEndTime(TiannvWelfareOpType.Tiannv);
            if(!nextTime){
                return;
            }
            HintMgr.addTimeEvent(TimeEventType.TiannvWelfare, nextTime, this, this.onTiannvClose);
        }

        private onTiannvClose(): void {
            let isOpen = this.isTiannvOpen();
            if(!isOpen){
                this.sendNt(ActivityEvent.ON_WONDERFUL_ACT_CLOSE, WonderfulActMainBtnType.Btn7);
            }
        }

        private checkVipClose(): void {
            let nextTime = this.getEndTime(TiannvWelfareOpType.Vip);
            if(!nextTime){
                return;
            }
            HintMgr.addTimeEvent(TimeEventType.VipWelfare, nextTime, this, this.onVipClose);
        }

        private onVipClose(): void {
            let isOpen = this.isVipOpen();
            if(!isOpen){
                this.sendNt(ActivityEvent.ON_WONDERFUL_ACT_CLOSE, WonderfulActMainBtnType.Btn8);
            }
        }

        /**功能开启刷新按钮*/
        protected onOpenFuncUpdate(n: GameNT): void {
            let addIdx: number[] = n.body;
            if (addIdx.indexOf(OpenIdx.WonderfulAct) > -1) {
                this.updateHint1();
            }
            if (addIdx.indexOf(OpenIdx.WonderfulAct1) > -1) {
                this.updateHint2();
                this.updateHint3();
                this.updateHintOther(5);
            }
            if (addIdx.indexOf(OpenIdx.Leijicharge) > -1) {
                this.updateHintOther(4);
            }
            if (addIdx.indexOf(OpenIdx.TiannvWelfare) > -1) {
                this.updateTiannvHint();
            }
            if (addIdx.indexOf(OpenIdx.VipWelfare) > -1) {
                this.updateVipHint();
            }
        }
    }
}