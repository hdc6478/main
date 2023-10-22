namespace game.mod.more {

    import GameNT = base.GameNT;
    import NvshenIndexConfig = game.config.NvshenIndexConfig;
    import NvshenShijianConfig = game.config.NvshenShijianConfig;
    import s2c_chuang_shi_nv_shen_base_info = msg.s2c_chuang_shi_nv_shen_base_info;
    import c2s_chuang_shi_nv_shen_system_click = msg.c2s_chuang_shi_nv_shen_system_click;
    import NvshenShijianTypeConfig = game.config.NvshenShijianTypeConfig;
    import NvshenDuihuaConfig = game.config.NvshenDuihuaConfig;
    import NvshenDuihuaLevelConfig = game.config.NvshenDuihuaLevelConfig;
    import s2c_chuang_shi_nv_shen_gongfeng_info = msg.s2c_chuang_shi_nv_shen_gongfeng_info;
    import zhandui_jitan_struct = msg.zhandui_jitan_struct;
    import TimeMgr = base.TimeMgr;
    import NvshenChoujiangConfig = game.config.NvshenChoujiangConfig;
    import c2s_chuang_shi_nv_shen_hun_ka_click = msg.c2s_chuang_shi_nv_shen_hun_ka_click;
    import s2c_chuang_shi_nv_shen_hun_ka_info = msg.s2c_chuang_shi_nv_shen_hun_ka_info;
    import nv_shen_hun_ka_struct = msg.nv_shen_hun_ka_struct;
    import nv_shen_hun_ka_pos_struct = msg.nv_shen_hun_ka_pos_struct;
    import NvshenHunkaScoreConfig = game.config.NvshenHunkaScoreConfig;
    import NvshenHunkaConfig = game.config.NvshenHunkaConfig;
    import LanDef = game.localization.LanDef;
    import s2c_chuang_shi_nv_shen_hun_ka_compose_viewer = msg.s2c_chuang_shi_nv_shen_hun_ka_compose_viewer;
    import facade = base.facade;

    export class GoddessRecordProxy extends ProxyBase {
        private _model: GoddessRecordModel;

        initialize(): void {
            super.initialize();
            this._model = new GoddessRecordModel();

            this.onProto(s2c_chuang_shi_nv_shen_base_info, this.s2c_chuang_shi_nv_shen_base_info, this);
            this.onProto(s2c_chuang_shi_nv_shen_gongfeng_info, this.s2c_chuang_shi_nv_shen_gongfeng_info, this);
            this.onProto(s2c_chuang_shi_nv_shen_hun_ka_info, this.s2c_chuang_shi_nv_shen_hun_ka_info, this);
            this.onProto(s2c_chuang_shi_nv_shen_hun_ka_compose_viewer, this.s2c_chuang_shi_nv_shen_hun_ka_compose_viewer, this);
        }

        public c2s_chuang_shi_nv_shen_system_click(type: number, pos?: number, idxs?: Long[]) {
            let msg = new c2s_chuang_shi_nv_shen_system_click();
            msg.button_type = type;
            msg.pos = pos;
            msg.idxs = idxs;
            this.sendProto(msg);
        }

        private s2c_chuang_shi_nv_shen_base_info(n: GameNT) {
            let msg: s2c_chuang_shi_nv_shen_base_info = n.body;
            if(!msg){
                return;
            }
            for(let k in msg){
                this._model[k] = msg[k];
            }
            if(msg.event_index != undefined || msg.event_stage != undefined){
                this.sendNt(GoddessRecordEvent.ON_UPDATE_TIME_GODDESS_EVENT_INFO);
            }
            if(msg.talk_level != undefined || msg.is_finish != undefined){
                this.sendNt(GoddessRecordEvent.ON_UPDATE_TIME_GODDESS_CHAT_INFO);
            }
            if(msg.level != undefined){
                this.sendNt(GoddessRecordEvent.ON_UPDATE_TIME_GODDESS_LV_INFO);
            }
            this.updateGoddessHint();
        }

        /**女神激活数量*/
        public getActNum(): number {
            let num = 0;
            let cfgList: NvshenIndexConfig[] = getConfigListByName(ConfigName.NvshenIndex);
            for(let cfg of cfgList){
                if(this.isAct(cfg.index)){
                    num++;
                }
            }
            return num;
        }

        /**女神是否激活*/
        public isAct(index: number): boolean {
            if(index == GoddessIndex.TimeGoddess){
                return true;//默认激活
            }
            return false;//todo
        }

        /**女神红点*/
        public getHint(index: number): boolean {
            if(index == GoddessIndex.TimeGoddess){
                let hintType = this._model.hint;
                return HintMgr.getHint(hintType);
            }
            return false;//todo
        }

        public get lv(): number {
            return this._model.level;//默认返回0级
        }

        //当前对话的index
        public get chatLv(): number {
            return this._model.talk_level;
        }
        public isChatFinish(): boolean {
            return this._model.is_finish;
        }
        //当前开启到的对话index
        public getChatOpenLv(): number {
            let lv = 0;
            let cfgList: NvshenDuihuaLevelConfig[] = getConfigListByName(ConfigName.NvshenDuihuaLevel);
            for(let cfg of cfgList){
                if(this.isEventFinishByStage(cfg.index, cfg.stage)){
                    lv = cfg.level;//事件已通过
                }
            }
            return lv;
        }

        //是否可以继续对话
        public get chatMaxLv(): number {
            if(!this._model.maxChatLv){
                let cfgList: any[] = getConfigListByName(ConfigName.NvshenDuihua);
                let cfg = cfgList[cfgList.length - 1][1] as NvshenDuihuaConfig;
                this._model.maxChatLv = cfg["level"];
            }
            return this._model.maxChatLv;
        }

        /***************************事件************************************/
        public getEventStage(index: number): number {
            if(index == this._model.event_index){
                return this._model.event_stage;
            }
            else if(index > this._model.event_index){
                return 0
            }
            else {
                return this.getEventMaxStage(index);
            }
        }

        public getEventMaxStage(index: number): number {
            let maxStage = 0;
            let cfgList: object = getConfigByNameId(ConfigName.NvshenShijian, index);
            for(let k in cfgList) {
                let cfg: NvshenShijianConfig = cfgList[k];
                if(cfg.stage > maxStage){
                    maxStage = cfg.stage;
                }
            }
            return maxStage;
        }

        public isEventOpen(index: number): boolean {
            let lastIndex = index - 1;
            if(lastIndex <= 0){
                return true;
            }
            return this.isEventFinish(lastIndex);
        }

        public isEventFinish(index: number): boolean {
            let stage = this.getEventStage(index);
            if(stage <= 0){
                return false;
            }
            let maxStage = this.getEventMaxStage(index);
            return stage >= maxStage;
        }

        private isEventFinishByStage(index: number, stage: number): boolean {
            if(this._model.event_index > index){
                return true;
            }
            else if(this._model.event_index == index){
                return this._model.event_stage >= stage;//事件已通过
            }
            return false;
        }

        public checkChatHint(): boolean {
            let isFinish = this.isChatFinish();
            if(isFinish){
                return true;//已完成，可以领取奖励
            }
            let openLv = this.getChatOpenLv();
            let chatLv = this.chatLv;
            let maxChatLv = this.chatMaxLv;
            return openLv >= chatLv && chatLv <= maxChatLv;
        }

        public checkEventHint(): boolean {
            let cfgList: NvshenShijianTypeConfig[] = getConfigListByName(ConfigName.NvshenShijianType);
            for(let i = 0; i < cfgList.length; ++i){
                let cfg = cfgList[i];
                if(this.checkEventPerHint(cfg.index)){
                    return true;
                }
            }
            return false;
        }

        public checkEventPerHint(index: number): boolean {
            let isOpen = this.isEventOpen(index);
            if(!isOpen){
                return false;
            }
            let isFinish = this.isEventFinish(index);
            if(isFinish){
                return false;
            }
            let canChallenge = ViewMgr.getIns().checkZhenrong();
            if(!canChallenge){
                return false;
            }
            let stage = this.getEventStage(index);
            let curStage = stage + 1;
            let cfgList: object = getConfigByNameId(ConfigName.NvshenShijian, index);
            let cfg: NvshenShijianConfig = cfgList[curStage];
            if(!cfg){
                return false;
            }
            return ViewMgr.getIns().checkZhenrongGod(cfg.god);
        }
        /***************************供奉************************************/
        private s2c_chuang_shi_nv_shen_gongfeng_info(n: GameNT): void {
            let msg = n.body as s2c_chuang_shi_nv_shen_gongfeng_info;
            this._model.prop_list = msg.prop_list || [];
            this._model.total_speed_time = msg.total_speed_time ? msg.total_speed_time.toNumber() : 0;
            RoleVo.ins.setValueByKey(RolePropertyKey.cs_nvshen_total_speed_time, this._model.total_speed_time);//设置到角色身上，用于mdr顶部道具变化
            this.sendNt(GoddessRecordEvent.ON_UPDATE_TIME_GODDESS_GONGFENG_INFO);
        }

        //供奉数据
        public get prop_list(): zhandui_jitan_struct[] {
            return this._model.prop_list || [];
        }

        //累计加速时间
        public get total_speed_time(): number {
            return this._model.total_speed_time;
        }

        public canIconDraw(info: zhandui_jitan_struct): boolean {
            let curTime = TimeMgr.time.serverTimeSecond;
            let endTime = info && info.endtime && info.endtime.toNumber();
            return endTime && endTime <= curTime;
        }

        public canIconAdd(info: zhandui_jitan_struct): boolean {
            if(info){
                return false;
            }
            let bags = BagUtil.getBagsByTypeAndPropSubType(BagType.TimeGoddess, PropSubType37.Jipin);
            return !!bags.length;
        }

        public gongfenging(info: zhandui_jitan_struct): boolean {
            let curTime = TimeMgr.time.serverTimeSecond;
            return info && info.endtime && info.endtime.toNumber() > curTime;
        }

        //有正在献祭的道具否
        public getGongfengInfo(): zhandui_jitan_struct {
            for (let info of this.prop_list) {
                if (this.gongfenging(info)) {
                    return info;
                }
            }
            return null;
        }

        //献祭完毕所有，所需时间
        public getTotalPropTime(): number {
            let propList = this.prop_list;
            if (!propList || !propList.length) {
                return 0;
            }
            let rst = 0;
            propList.forEach((a) => {
                let endTime = a.endtime.toNumber();
                if (endTime == 0) {
                    //为0表示正在排队的，读配置时间
                    let propCfg = GameConfig.getPropConfigById(a.idx.toNumber());
                    if (propCfg && propCfg.param1) {
                        let second = propCfg.param1[0][0];
                        rst += second;
                    }
                } else {
                    let dis = Math.max(0, endTime - TimeMgr.time.serverTimeSecond);
                    rst += dis;
                }
            });
            return rst;
        }

        /**获取空格数量 */
        public getSpaceCount(): number {
            let num = this.prop_list.length;
            return TimeGoddessGongfengCnt - num;
        }

        private checkGongfengHint(): boolean {
            let propList = this.prop_list;
            for (let i = 0; i < TimeGoddessGongfengCnt; i++) {
                let info = i < propList.length ? propList[i] : null;
                if (this.checkIconHint(info)) {
                    return true;
                }
            }
            return false;
        }

        private checkIconHint(info: zhandui_jitan_struct): boolean {
            let canDraw = this.canIconDraw(info);//可领奖
            if(canDraw){
                return true;
            }
            return this.canIconAdd(info);
        }
        /***************************抽奖************************************/
        public getMinVal(): number {
            if(!this._model.minVal){
                let cfgList: NvshenChoujiangConfig[] = getConfigListByName(ConfigName.NvshenChoujiang);
                for (let cfg of cfgList) {
                    let cnt = cfg.costs[0][1];
                    if(!this._model.minVal || cnt < this._model.minVal){
                        this._model.minVal = cnt;
                    }
                }
            }
            return this._model.minVal;
        }

        public isOpenSummon(): boolean {
            let hasPrivilege = RoleUtil.hasPrivilege(RolePrivilegeKey.cs_nvshen_open);
            return hasPrivilege;
        }

        public checkSummonHint(): boolean {
            let isOpen = this.isOpenSummon();
            if(!isOpen){
                return false;
            }
            let costCnt = this.getMinVal();
            let curCnt = BagUtil.getPropCntByIdx(PropIndex.Chuangshinengliang);
            return curCnt >= costCnt;
        }

        public getSummonRewards(): BasePreviewRewardData[] {
            if(!this._model.rewards){
                this._model.rewards = [];
                let cfgList: NvshenChoujiangConfig[] = getConfigListByName(ConfigName.NvshenChoujiang);
                for (let i = cfgList.length - 1; i >= 0; --i) {
                    let cfg = cfgList[i];
                    let award: number[][] = [];
                    for(let r of cfg.rewards){
                        //权重（万分比）_奖励道具_奖励数量
                        award.push([r[1], r[2]]);
                    }
                    let descStr = cfg.name;
                    let data: BasePreviewRewardData = {
                        award: award,
                        descStr: descStr
                    }
                    this._model.rewards.push(data);
                }
            }
            return this._model.rewards;
        }
        /***************************红点************************************/
        private updateGoddessHint(): void {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.GoddessRecord)){
                return;//功能未开启
            }
            let hint = this.checkHint();
            let hintType = this._model.hint;
            HintMgr.setHint(hint, hintType);
        }

        private checkHint(): boolean {
            if(this.checkChatHint()){
                return true;
            }
            if(this.checkEventHint()){
                return true;
            }
            if(this.checkGongfengHint()){
                return true;
            }
            if(this.checkSummonHint()){
                return true;
            }
            return false;
        }

        protected onUpdateZhenrongInfo(n: GameNT): void {
            this.updateGoddessHint();
        }


        protected onBagUpdateByBagType(n: GameNT) {
            let types = n.body as number[];
            if (types.indexOf(BagType.TimeGoddess) > -1) {
                this.updateGoddessHint();
            }
            if (types.indexOf(BagType.Hunka) > -1) {
                //魂卡变更时
                this.updateHunkaHint();
                this.updateHunkaComposeHint();
            }
        }

        protected onRolePrivilegeUpdate(n: GameNT) {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePrivilegeKey.cs_nvshen_open) >= 0) {
                this.updateGoddessHint();
            }
        }

        protected onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(AttrKey.god) >= 0) {
                this.updateHunkaHint();//仙力变更时刷新魂卡部位开启红点
            }
        }

        /***************************魂卡************************************/
        public c2s_chuang_shi_nv_shen_hun_ka_click(buttonType: number, type?: number, pos?: number, id?: Long, ids?: Long[]) {
            let msg = new c2s_chuang_shi_nv_shen_hun_ka_click();
            msg.button_type = buttonType;
            msg.type = type;
            msg.pos = pos;
            msg.id = id;
            msg.ids = ids;
            this.sendProto(msg);
        }

        private s2c_chuang_shi_nv_shen_hun_ka_info(n: GameNT) {
            let msg: s2c_chuang_shi_nv_shen_hun_ka_info = n.body;
            if(!msg || !msg.list){
                return;
            }
            for(let info of msg.list){
                let oldInfo = this.getHunkaTypeInfo(info.type);
                if(!oldInfo){
                    this._model.hunkaList[info.type] = info;
                    continue;
                }
                //更新
                if(info.lv != undefined){
                    oldInfo.lv = info.lv;
                }
                if(info.ka_list){
                    if(!oldInfo.ka_list){
                        oldInfo.ka_list = info.ka_list;
                        continue;
                    }
                    for(let posInfo of info.ka_list){
                        let pos = this.getInfoPos(posInfo.pos, oldInfo.ka_list);
                        if(pos >= 0){
                            oldInfo.ka_list[pos] = posInfo;
                        }
                        else {
                            oldInfo.ka_list.push(posInfo);
                        }
                    }
                }
            }
            this.updateHunkaHint();
            this.sendNt(GoddessRecordEvent.ON_UPDATE_HUNKA_INFO);
        }

        private getInfoPos(pos: number, infos: nv_shen_hun_ka_pos_struct[]): number {
            let len = infos.length;
            for(let i = 0; i < len; ++i){
                let info = infos[i];
                if(info.pos == pos){
                    return i;
                }
            }
            return -1;
        }

        private getHunkaTypeInfo(type: number): nv_shen_hun_ka_struct {
            return this._model.hunkaList[type] || null;
        }

        public getHunkaLv(type: number): number {
            let info = this.getHunkaTypeInfo(type);
            return info && info.lv || 0;
        }

        public getHunkaPosInfo(type: number, pos: number): nv_shen_hun_ka_pos_struct {
            let info = this.getHunkaTypeInfo(type);
            if(!info || !info.ka_list){
                return null;
            }
            for(let posInfo of info.ka_list){
                if(posInfo.pos == pos){
                    return posInfo;
                }
            }
            return null;
        }
        //魂卡部位是否解锁
        private isPosOpen(type: number, pos: number): boolean {
            let posInfo = this.getHunkaPosInfo(type, pos);
            return !!posInfo;//取到表示解锁
        }
        //魂卡部位是否解锁限制
        public isPosLimitOpen(type: number, pos: number, showTips?: boolean): boolean {
            let cfgList: object = getConfigByNameId(ConfigName.NvshenHunka, type);
            let cfg: NvshenHunkaConfig = cfgList[pos];
            let god = RoleVo.ins.getValueByKey(AttrKey.god);
            let isOpen = god >= cfg.god;
            if(!isOpen && showTips){
                let tips = StringUtil.substitute(getLanById(LanDef.hunka_tips8), [cfg.god]);
                PromptBox.getIns().show(tips);
            }
            return isOpen;
        }

        //魂卡可解锁最低部位
        public getMinPos(type: number): number {
            for(let i = 0; i < HunkaPosCnt; ++i){
                let pos = i + 1;
                if(!this.isPosOpen(type, pos)){
                    return pos;
                }
            }
            return 1;
        }

        public getHunkaTotalScore(type: number): number {
            let totalScore = 0;
            for(let i = 0; i < HunkaPosCnt; ++i){
                let pos = i + 1;
                let posInfo = this.getHunkaPosInfo(type, pos);
                if(!posInfo || !posInfo.hunka || !posInfo.hunka.index){
                    continue;
                }
                totalScore += posInfo.hunka.pingfen || 0;//取评分
            }
            return totalScore;
        }

        public getHunkaNeedScore(type: number, lv: number): number {
            let cfgList: object = getConfigByNameId(ConfigName.NvshenHunkaScore, type);
            let nextLv = lv + 1;
            let cfg: NvshenHunkaScoreConfig = cfgList[nextLv];
            if(!cfg){
                cfg = cfgList[lv];
            }
            return cfg.score;
        }
        //魂卡共鸣最大等级
        public isHunkaMaxLv(type: number): boolean {
            let lv = this.getHunkaLv(type);
            let cfgList: object = getConfigByNameId(ConfigName.NvshenHunkaScore, type);
            let nextLv = lv + 1;
            let cfg: NvshenHunkaScoreConfig = cfgList[nextLv];
            return !cfg;
        }

        public getHunkaScoreCfgList(type: number): NvshenHunkaScoreConfig[] {
            if(!this._model.hunkaScoreCfgList[type]){
                this._model.hunkaScoreCfgList[type] = [];
                let cfgList: object = getConfigByNameId(ConfigName.NvshenHunkaScore, type);
                for(let k in cfgList){
                    let cfg: NvshenHunkaScoreConfig = cfgList[k];
                    this._model.hunkaScoreCfgList[type].push(cfg);
                }
            }
            return this._model.hunkaScoreCfgList[type];
        }

        public getPosOpenCost(type: number, pos: number): number[] {
            let cfgList: object = getConfigByNameId(ConfigName.NvshenHunka, type);
            let cfg: NvshenHunkaConfig = cfgList[pos];
            return cfg.costs && cfg.costs[0] || null;
        }

        public set hunkaType(type: number){
            this._model.hunkaType = type;
        }
        public get hunkaType(): number {
            return this._model.hunkaType;
        }

        public set hunkaBagOpenType(type: number){
            this._model.hunkaBagOpenType = type;
        }
        public get hunkaBagOpenType(): number {
            return this._model.hunkaBagOpenType;
        }

        public set hunkaSelPos(pos: number){
            this._model.hunkaSelPos = pos;
        }
        public get hunkaSelPos(): number {
            return this._model.hunkaSelPos;
        }

        public get hunkaHint(): string[] {
            return this._model.hunkaHint;
        }

        //是否可以一键附魂
        public canHuankaOneKeyWear(type: number): boolean {
            let infos = BagUtil.getBagsByTypeAndPropSubType(BagType.Hunka, type);
            if(infos.length <= 0){
                return false;//没有魂卡时
            }
            for(let pos = 1; pos <= HunkaPosCnt; ++pos){
                if(this.getHunkaPosHint(type, pos, infos,true)){
                    return true;
                }
            }
            return false;
        }

        //是否可以免费激活魂卡部位
        public canHuankaPosAct(type: number): boolean {
            for(let pos = 1; pos <= HunkaPosCnt; ++pos){
                if(this.canPosOpen(type, pos)){
                    return true;
                }
            }
            return false;
        }

        private canPosOpen(type: number, pos: number): boolean {
            if(!this.isPosLimitOpen(type, pos)){
                //未达到限制要求
                return false;
            }
            if(!this.isPosOpen(type, pos)){
                //未解锁
                let cost = this.getPosOpenCost(type, pos);
                return !cost;//没有配置仙玉消耗的，提示解锁红点
            }
            return false;
        }

        //部位红点，可穿戴，可解锁，notCalcOpen：不计算解锁消耗逻辑，一键附魂用
        public getHunkaPosHint(type: number, pos: number, infos?: PropData[], notCalcOpen?: boolean): boolean {
            if(!this.isPosLimitOpen(type, pos)){
                //未达到限制要求
                return false;
            }
            if(!this.isPosOpen(type, pos)){
                //未解锁
                if(notCalcOpen){
                    return false;//不计算解锁消耗
                }
                let cost = this.getPosOpenCost(type, pos);
                if(cost){
                    let costIndex = cost[0];
                    let costCnt = cost[1];
                    return BagUtil.checkPropCnt(costIndex, costCnt);
                }
                return true;//没有配置仙玉消耗的，提示解锁红点
            }
            if(!infos){
                infos = BagUtil.getBagsByTypeAndPropSubType(BagType.Hunka, type);
            }
            //可穿戴
            for(let prop of infos){
                if(this.checkBestHunka(type, pos, prop)){
                    return true;
                }
            }
            return false;
        }

        //是否可以激活
        public canHuankaGongmingAct(type: number): boolean {
            let isMax = this.isHunkaMaxLv(type);
            if(isMax){
                return false;
            }
            let lv = this.getHunkaLv(type);
            let needScore = this.getHunkaNeedScore(type, lv);
            let totalScore = this.getHunkaTotalScore(type);
            let leftScore = needScore - totalScore;//所需积分-当前总积分
            return leftScore <= 0;
        }

        //是否可穿戴更好的魂卡
        public checkBestHunka(type: number, pos: number, prop: PropData): boolean {
            let posInfo = this.getHunkaPosInfo(type, pos);
            if(!posInfo || !posInfo.hunka || !posInfo.hunka.index){
                return true;
            }
            return prop.pingfen >= posInfo.hunka.pingfen;
        }

        /***************************魂卡合成************************************/
        private s2c_chuang_shi_nv_shen_hun_ka_compose_viewer(n: GameNT) {
            let msg: s2c_chuang_shi_nv_shen_hun_ka_compose_viewer = n.body;
            if (!msg || !msg.button_type) {
                return;
            }
            if(msg.button_type == HunkaOpType.Preview){
                //魂卡预览
                this._model.hunkaPreview = msg;
                this.sendNt(GoddessRecordEvent.ON_UPDATE_HUNKA_PREVIEW);
            }
            else{
                //合成成功
                facade.showView(ModName.More, MoreViewType.HunkaComposeTips, msg.hunka);
                this.clearComposeList();//合成成功后清除合成选择
                if(msg.button_type == HunkaOpType.Compose){
                    //合成成功后继续选中新的魂卡
                    let prop = PropData.fromData(msg.hunka);
                    this.setComposeSel(prop,0);
                }
                this.sendNt(GoddessRecordEvent.ON_UPDATE_HUNKA_COMPOSE);
            }
        }

        public get hunkaPreview(): s2c_chuang_shi_nv_shen_hun_ka_compose_viewer {
            return this._model.hunkaPreview;
        }

        public clearComposeList(): void {
            this._model.hunkaComposeList = {};
        }

        public get composeList(): {[pos: number] : PropData} {
            return this._model.hunkaComposeList;
        }
        //返回选中的其中一个魂卡
        public getComposeSel(): PropData {
            for(let k in this._model.hunkaComposeList) {
                let prop = this._model.hunkaComposeList[k];
                return prop;
            }
            return null;
        }

        //返回可能是空的数据
        public getComposeSelByPos(pos: number): PropData {
            return this._model.hunkaComposeList[pos] || null;
        }
        //选中的魂卡数量
        public getComposeSelNum(): number {
            let num = 0;
            for(let k in this._model.hunkaComposeList){
                num++;
            }
            return num;
        }

        public setComposeSel(propData: PropData, pos: number): void {
            this._model.hunkaComposeList[pos] = propData;
        }

        public set hunkaComposeSelPos(pos: number){
            this._model.hunkaComposeSelPos = pos;
        }
        public get hunkaComposeSelPos(): number {
            return this._model.hunkaComposeSelPos;
        }

        public canSelCompose(): boolean {
            let composeProp = this.getComposeSel();
            if(composeProp){
                let type = composeProp.propSubType;
                let infos = BagUtil.getBagsByTypeAndPropSubType(BagType.Hunka, type);
                return infos.length > 1;
            }
            return this.canCompose();
        }

        public set hunkaSelQuality(quality: number){
            this._model.hunkaSelQuality= quality;
        }
        public get hunkaSelQuality(): number {
            return this._model.hunkaSelQuality;
        }

        public getHunkaSelList(type: number, quality: number): PropData[] {
            let infos: PropData[];
            if(!type){
                //0表示全部
                infos = BagUtil.getBagsByType(BagType.Hunka, true);
            }
            else {
                infos = BagUtil.getBagsByTypeAndPropSubType(BagType.Hunka, type, true);
            }
            return infos.filter(v => {
                return v.quality == quality;
            });
        }

        private canCompose(): boolean {
            //是否有可合成魂卡，同类型的魂卡有两个即可合成
            let infos: PropData[] = BagUtil.getBagsByType(BagType.Hunka);
            let cntList: {[type: number] : number} = {
                [PropSubType38.Yaohun1] : 0,
                [PropSubType38.Xianhun2] : 0,
                [PropSubType38.Shenhun3] : 0
            };
            for(let i of infos){
                cntList[i.propSubType] += i.count;
                if(cntList[i.propSubType] >= 2){
                    return true;
                }
            }
            return false;
        }
        /***************************魂卡红点************************************/
        private updateHunkaHint(): void {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.GoddessRecord)){
                return;//功能未开启
            }
            for(let type = 1; type <= PropSubType38.Shenhun3; ++type){
                let hint = this.checkHunkaTypeHint(type);
                let hintType = this.getHunkaHintType(type);
                HintMgr.setHint(hint, hintType);
            }
        }

        public getHunkaHintType(type: number): string[] {
            return this._model.hunkaHintTypeList[type];
        }

        private checkHunkaTypeHint(type: number): boolean {
            if(this.canHuankaGongmingAct(type)){
                return true;
            }
            if(this.canHuankaPosAct(type)){
                return true;
            }
            return this.canHuankaOneKeyWear(type);
        }

        private updateHunkaComposeHint(): void {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.GoddessRecord)){
                return;//功能未开启
            }
            let hint = this.canCompose();
            let hintType = this._model.hunkaComposeHintType;
            HintMgr.setHint(hint, hintType);
        }
    }
}