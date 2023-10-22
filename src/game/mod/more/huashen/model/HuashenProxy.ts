namespace game.mod.more {

    import facade = base.facade;
    import GameNT = base.GameNT;
    import ParamConfig = game.config.ParamConfig;
    import LanDef = game.localization.LanDef;
    import c2s_huashen_levelup = msg.c2s_huashen_levelup;
    import c2s_huashen_road_get_rewards = msg.c2s_huashen_road_get_rewards;
    import s2c_huashen_data_info = msg.s2c_huashen_data_info;
    import HuashenZhiluConfig = game.config.HuashenZhiluConfig;
    import huashen_data = msg.huashen_data;
    import HuashenTianfuLeixingConfig = game.config.HuashenTianfuLeixingConfig;
    import HuashenTianfuConfig = game.config.HuashenTianfuConfig;

    export class HuashenProxy extends ProxyBase implements IHuashenProxy{
        private _model: HuashenModel;

        initialize(): void {
            super.initialize();
            this._model = new HuashenModel();

            this.onProto(s2c_huashen_data_info, this.s2c_huashen_data_info, this);
        }

        public get selIndex(): number {
            return this._model.selIndex;
        }
        public set selIndex(index: number) {
            this._model.selIndex = index;
        }

        /**更新红点*/
        private updateHint(): void {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Huashen)){
                return;//功能未开启
            }
            let hint = TaskUtil.getTaskHint(TaskType.Huashen);//任务可领取红点
            if(!hint){
                //任务全部完成后，需要判断激活红点
                let hasAllDraw = true;//是否全部领取奖励
                let tasks = TaskUtil.getTaskList(TaskType.Huashen);
                for(let task of tasks){
                    if(task.status != TaskStatus.Draw){
                        hasAllDraw = false;
                        break;
                    }
                }
                if(hasAllDraw){
                    let surfaceProxy: ISurfaceProxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
                    let isAct = surfaceProxy.isDefaultAct(ConfigHead.Huashen);
                    if(!isAct){
                        //未激活
                        let defaultIndex = surfaceProxy.getDefaultId(ConfigHead.Huashen);
                        let canAct = surfaceProxy.canUpStar(defaultIndex);
                        hint = canAct;//可激活
                    }
                }
            }
            let hintType = this._model.hintType;
            HintMgr.setHint(hint, hintType);
        }

        protected onTaskHint(n: GameNT): void {
            let types: number[] = n.body;
            if(types.indexOf(TaskType.Huashen) >= 0){
                this.updateHint();
            }
            if(types.indexOf(TaskType.HuashenZhilu) >= 0){
                this.updateRoadHint();
            }
            if(types.indexOf(TaskType.HuashenZhanshendian) >= 0){
                this.updateZhanshendianHint();
            }
        }

        protected onSurfaceInfoUpdate(n: GameNT): void {
            let type: number = n.body;
            if(type == ConfigHead.Huashen){
                this.updateHint();
                this.updateTianfuOpen();
            }
        }

        /***********************************化神之路*****************************************/
        public c2s_huashen_levelup(index: number) {
            let msg = new c2s_huashen_levelup();
            msg.index = index;
            this.sendProto(msg);
        }

        public c2s_huashen_road_get_rewards() {
            let msg = new c2s_huashen_road_get_rewards();
            this.sendProto(msg);
        }

        private s2c_huashen_data_info(n: GameNT) {
            let msg: s2c_huashen_data_info = n.body;
            if(!msg){
                return;
            }
            if(msg.road_index != undefined){
                this._model.roadIndex = msg.road_index;
                this.sendNt(HuashenEvent.ON_UPDATE_HUASHEN_ROAD_INFO);
            }
            if(msg.now_id != undefined){
                this._model.nowId = msg.now_id;
                this.updateZhanshendianHint();
                this.sendNt(HuashenEvent.ON_UPDATE_HUASHEN_ZHANSHENDIAN_INFO, this._model.nowId);
            }
            if(msg.list){
                if(!this._model.tianfuList){
                    this._model.tianfuList = msg.list;
                }
                else {
                    for(let info of msg.list){
                        let pos = this.getTianfuPos(info.index);
                        if(pos >= 0){
                            this._model.tianfuList[pos] = info;
                        }
                        else {
                            this._model.tianfuList.push(info);
                        }
                    }
                }
                this.updateTianfuHint();
                this.sendNt(HuashenEvent.ON_UPDATE_HUASHEN_TIANFU_INFO);
            }
        }

        private getTianfuPos(index: number): number {
            if(!this._model.tianfuList || !this._model.tianfuList.length){
                return -1;
            }
            let len = this._model.tianfuList.length;
            for(let i = 0; i < len; ++i){
                let info = this._model.tianfuList[i];
                if(info.index == index){
                    return i;
                }
            }
            return -1;
        }

        public checkRoadOpen(showTips?: boolean): boolean {
            let cfg: ParamConfig = GameConfig.getParamConfigById("huashenzhilu_open");
            let limitCnt = cfg && cfg.value || 2;
            let isOpen = this.checkActCnt(limitCnt);
            if(!isOpen && showTips){
                let tipsStr = StringUtil.substitute(getLanById(LanDef.huashen_zhilu_tips2), [limitCnt]);
                PromptBox.getIns().show(tipsStr);
            }
            return isOpen;
        }

        private checkActCnt(limitCnt: number): boolean {
            let surfaceProxy: ISurfaceProxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
            let cnt = surfaceProxy.getSurfaceActCnt(ConfigHead.Huashen);
            return cnt >= limitCnt;
        }

        public get roadIndex(): number {
            return this._model.roadIndex || 0;
        }

        //是否是最后一个节点，大奖励
        public isRoadEnd(index: number): boolean {
            return index != 0 && index % HuashenZhiluCnt == 0;
        }

        //是否位于起点
        public isCur(): boolean {
            let index = this.roadIndex;
            if(!index){
                return true;//0的时候就是起点
            }
            let hasAllDraw = this.hasAllDraw();//是否领完所有奖励
            if(hasAllDraw){
                return false;//领完所有奖励的时候位于终点，不在起点
            }
            return this.isRoadEnd(index);//每一段的终点就是下一段的起点
        }

        public getRoadStartIndex(): number {
            let index = this.roadIndex;
            //计算开启的index，当前领到10的话，显示11-20的，如果领完所有奖励，则不显示前面的
            let hasAllDraw = this.hasAllDraw();//是否领完所有奖励
            if(hasAllDraw){
                //比如30，则取29
                index--;
            }
            let startIndex = Math.floor(index / HuashenZhiluCnt) * HuashenZhiluCnt + 1;
            return startIndex;
        }

        public hasDraw(index: number): boolean {
            return this.roadIndex >= index;
        }

        public canDraw(index: number): boolean {
            // if(this.hasDraw(index)){
            //     return false;
            // }
            // if(index > this.roadIndex + 1){
            //     return false;//只能按循序领取奖励
            // }
            // let propIndex = PropIndex.Huashenzhilujifen;
            // let cfg: HuashenZhiluConfig = getConfigByNameId(ConfigName.HuashenZhilu, index);
            // return BagUtil.checkPropCnt(propIndex, cfg.point);
            return false;//改为自动领取奖励
        }

        //领完所有奖励
        public hasAllDraw(): boolean {
            let index = this.roadIndex;
            if(!index){
                return false;
            }
            let nextIndex = index + 1;
            let cfg: HuashenZhiluConfig = getConfigByNameId(ConfigName.HuashenZhilu, nextIndex);
            return !cfg;
        }

        /**更新红点*/
        private updateRoadHint(): void {
            if(!this.checkRoadOpen()){
                return;
            }
            let hint = TaskUtil.getTaskHint(TaskType.HuashenZhilu);//任务可领取红点
            let hintType = this._model.roadHint;
            HintMgr.setHint(hint, hintType);
        }

        public getRoadHint(): string[] {
            return this._model.roadHint;
        }

        /**************************************战神殿******************************************/
        public get nowId(): number {
            return this._model.nowId;
        }
        public checkShow(): boolean {
            //全部激活后入口消失
            let isOpen = this.checkOpen();
            if(isOpen && !this.nowId){
                return false;
            }
            //激活2个化神的时候显示入口图标
            let cfg: ParamConfig = GameConfig.getParamConfigById("zhanshendian_open");
            let limitCnt = cfg && cfg.value ? cfg.value - 1 : 2;
            let isShow = this.checkActCnt(limitCnt);
            return isShow;
        }
        public checkOpen(showTips?: boolean): boolean {
            let cfg: ParamConfig = GameConfig.getParamConfigById("zhanshendian_open");
            let limitCnt = cfg && cfg.value || 3;
            let isOpen = this.checkActCnt(limitCnt);
            if(!isOpen && showTips){
                let tipsStr = StringUtil.substitute(getLanById(LanDef.huashen_zhilu_tips2), [limitCnt]);
                PromptBox.getIns().show(tipsStr);
            }
            return isOpen;
        }

        /**更新红点*/
        private updateZhanshendianHint(): void {
            if(!this.checkOpen()){
                return;
            }
            let hint = TaskUtil.getTaskHint(TaskType.HuashenZhanshendian);//任务可领取红点
            if(!hint){
                //任务全部完成后，需要判断激活红点
                let hasAllDraw = true;//是否全部领取奖励
                let tasks = TaskUtil.getTaskList(TaskType.HuashenZhanshendian);
                for(let task of tasks){
                    if(task.status != TaskStatus.Draw){
                        hasAllDraw = false;
                        break;
                    }
                }
                if(hasAllDraw){
                    let surfaceProxy: ISurfaceProxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
                    let star = surfaceProxy.getSurfacePerStar(this.nowId);
                    if(!star){
                        //未激活
                        let canAct = surfaceProxy.canUpStar(this.nowId);
                        hint = canAct;//可激活
                    }
                }
            }
            let hintType = this._model.zhanshendianHint;
            HintMgr.setHint(hint, hintType);
        }

        public getZhanshendianHint(): string[] {
            return this._model.zhanshendianHint;
        }
        /**************************************天赋******************************************/
        private checkTianfuOpen(): boolean {
            let cfg: ParamConfig = GameConfig.getParamConfigById("huashentianfu_open");
            let limitCnt = cfg && cfg.value || 2;//激活2个化神后开启
            return this.checkActCnt(limitCnt);
        }

        private updateTianfuOpen(): void {
            if(this.tianfuOpen){
                return;//已经开启的话不再检测
            }
            let isOpen = this.checkTianfuOpen();
            if(isOpen != this.tianfuOpen){
                this._model.tianfuOpen = isOpen;
                this.sendNt(HuashenEvent.ON_UPDATE_HUASHEN_TIANFU_OPEN);
            }
        }

        public get tianfuOpen(): boolean {
            return this._model.tianfuOpen;
        }

        public getTianfuInfo(index: number): huashen_data {
            let pos = this.getTianfuPos(index);
            if(pos >= 0){
                return this._model.tianfuList[pos]
            }
            return null;
        }

        public isTianfuTypeOpen(cfg: HuashenTianfuLeixingConfig, showTips?: boolean): boolean {
            let index = RoleVo.ins.reincarnate;
            if(index < cfg.activate_condition){
                if(showTips){
                    let lv = RoleUtil.getRebirthLv(cfg.activate_condition);
                    let str = lv > 9 ? LanDef.common_act_tips5:LanDef.common_act_tips1;
                    lv = lv > 9?(lv-9):lv;
                    let tipsStr = StringUtil.substitute(getLanById(str), [lv]);
                    PromptBox.getIns().show(tipsStr);
                }
                return false;
            }
            return true;
        }

        public isTianfuOpen(cfg: HuashenTianfuConfig): boolean {
            let infos = cfg.premise;
            if(!infos){
                return true;
            }
            for(let info of infos){
                let index = info[0];
                let lv = info[1];
                let curInfo = this.getTianfuInfo(index);
                if(!curInfo || curInfo.lv < lv){
                    return false;
                }
            }
            return true;
        }

        public getTianfuCfgList(type: number): HuashenTianfuConfig[] {
            if(!this._model.tianfuCfgList[type]){
                let typeCfg: HuashenTianfuLeixingConfig = getConfigByNameId(ConfigName.HuashenTianfuLeixing, type);
                let indexList: number[] = typeCfg.tianfu_index;
                for(let i of indexList){
                    let cfg: HuashenTianfuConfig = getConfigByNameId(ConfigName.HuashenTianfu, i);
                    if(!this._model.tianfuCfgList[type]){
                        this._model.tianfuCfgList[type] = [];
                    }
                    this._model.tianfuCfgList[type].push(cfg);
                }
            }
            return this._model.tianfuCfgList[type];
        }

        public getTianfuHint(cfg: HuashenTianfuConfig): boolean {
            let isOpen = this.isTianfuOpen(cfg);
            if(!isOpen){
                return false;
            }
            let info = this.getTianfuInfo(cfg.index);
            let lv = info ? info.lv : 0;
            let maxLv = cfg.upgrade_item.length;
            let isMax = lv >= maxLv;
            if(isMax){
                return false;
            }
            let cost = cfg.upgrade_item[lv];
            return BagUtil.checkPropCnt(cost[0], cost[1]);
        }

        public getTianfuTypeHint(cfg: HuashenTianfuLeixingConfig): boolean {
            if(!this.isTianfuTypeOpen(cfg)){
                return false;
            }
            let cfgList = this.getTianfuCfgList(cfg.type);
            for(let cfg of cfgList){
                if(this.getTianfuHint(cfg)){
                    return true;
                }
            }
            return false;
        }

        private updateTianfuHint(): void {
            if(!this.tianfuOpen){
                return;
            }
            let cfgList: HuashenTianfuLeixingConfig[] = getConfigListByName(ConfigName.HuashenTianfuLeixing);
            let hint = false;
            for(let cfg of cfgList){
                if(this.getTianfuTypeHint(cfg)){
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.tianfuUpHint);
        }

        public get tianfuUpIndex(): number {
            if(!this._model.tianfuUpIndex){
                let cfgList: HuashenTianfuConfig[] = getConfigListByName(ConfigName.HuashenTianfu);
                let cfg = cfgList[0];
                this._model.tianfuUpIndex = cfg.upgrade_item[0][0];
            }
            return this._model.tianfuUpIndex;
        }

        protected onBagUpdateByPropIndex(n: base.GameNT): void {
            let indexs: number[] = n.body;
            if(indexs.indexOf(this.tianfuUpIndex) >= 0){
                this.updateTianfuHint();
            }
        }

        protected onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.reincarnate) >= 0) {
                this.updateTianfuHint();
            }
        }

    }

}