namespace game.mod.role {

    import GameNT = base.GameNT;
    import s2c_update_ayah_info = msg.s2c_update_ayah_info;
    import s2c_ayah_offline_reward_show = msg.s2c_ayah_offline_reward_show;
    import c2s_ayah_buy_gift = msg.c2s_ayah_buy_gift;
    import c2s_ayah_edit_show = msg.c2s_ayah_edit_show;
    import c2s_ayah_apparent = msg.c2s_ayah_apparent;
    import c2s_ayah_get_reward = msg.c2s_ayah_get_reward;
    import AyahTargetConfig = game.config.AyahTargetConfig;
    import AyahOfflineConfig = game.config.AyahOfflineConfig;
    import ShenlingConfig = game.config.ShenlingConfig;
    import facade = base.facade;
    import AyahEventFuncConfig = game.config.AyahEventFuncConfig;
    import OpenFunctionConfig = game.config.OpenFunctionConfig;
    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import ParamConfig = game.config.ParamConfig;
    import Handler = base.Handler;
    import delayCall = base.delayCall;
    import clearDelay = base.clearDelay;

    /**
     * @description 修仙女仆系统 Fairy maid
     */
    export class XiuxianNvpuProxy extends ProxyBase implements IXiuxianNvpuProxy {
        private _model: XiuxianNvpuModel;

        onStartReconnect() {
            super.onStartReconnect();
            this.clearAllCall();
            this.autoChallengeEventType = null;
            this._model.offlineRewardShow = true;
        }

        initialize(): void {
            super.initialize();
            this._model = new XiuxianNvpuModel();

            this.onProto(s2c_update_ayah_info, this.s2c_update_ayah_info, this);
            this.onProto(s2c_ayah_offline_reward_show, this.s2c_ayah_offline_reward_show, this);

            facade.onNt(PassEvent.UPDATE_MAIN_PASS_INFO, this.onUpdateMainPassInfo, this);
            facade.onNt(RoleEvent.ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT, this.onSpecialChallengeNext, this);
        }

        private s2c_update_ayah_info(n: GameNT): void {
            let msg = n.body as s2c_update_ayah_info;
            if (msg.time != null) {
                this._model.time = msg.time;
            }
            if (msg.level != null) {
                this._model.level = msg.level;
            }
            if (msg.exp != null) {
                this._model.exp = msg.exp;
            }
            if (msg.show_index != null) {
                this._model.show_index = msg.show_index;
            }
            if (msg.buy_list != null) {
                this._model.buy_list = msg.buy_list;
            }
            if (msg.finish_list != null) {
                this._model.finish_list = msg.finish_list;
            } else {
                this._model.finish_list = [];
            }
            if (msg.offline_list != null) {
                this._model.offline_list = msg.offline_list;
            } else {
                this._model.offline_list = [];
            }
            if (msg.online_list != null) {
                this._model.online_list = msg.online_list;
            } else {
                this._model.online_list = [];
            }

            this.dealAutoEventFunc();
            this.updateHint();
            this.sendNt(RoleEvent.ON_XIUXIANNVPU_INFO_UPDATE);
        }

        //离线挂机弹框界面
        private s2c_ayah_offline_reward_show(n: GameNT): void {
            let msg = n.body as s2c_ayah_offline_reward_show;
            if (msg.list != null) {
                this._model.reward_list = msg.list;
            }
            if (msg.items != null) {
                this._model.reward_items = msg.items;
            }
            this.sendNt(RoleEvent.ON_XIUXIANNVPU_OFFLINE_REWARD_UPDATE);

            //离线收益界面
            if (msg.list != null && this._model.offlineRewardShow) {
                this._model.offlineRewardShow = false;
                facade.showView(ModName.Role, NewRoleViewType.XiuxianNvpuResult, 2);
            }
        }

        //购买礼包
        public c2s_ayah_buy_gift(index: number): void {
            let msg = new c2s_ayah_buy_gift();
            msg.index = index;
            this.sendProto(msg);
        }

        //编辑挂机框 oper: 1.离线挂机框编辑2.在线挂机框编辑
        public c2s_ayah_edit_show(oper: number, list: number[]): void {
            let msg = new c2s_ayah_edit_show();
            msg.oper = oper;
            msg.list = list;
            this.sendProto(msg);
        }

        //幻化
        public c2s_ayah_apparent(lv: number): void {
            let msg = new c2s_ayah_apparent();
            msg.level = lv;
            this.sendProto(msg);
        }

        //领取挂机奖励 oper:1.在线领取2.离线领取
        public c2s_ayah_get_reward(oper: number): void {
            let msg = new c2s_ayah_get_reward();
            msg.oper = oper;
            this.sendProto(msg);
        }

        /**====================== 协议end ======================*/

        /**女仆是否激活，true为激活。isTips是否飘字，showConfirm是否展示确定弹窗*/
        public isActed(isTips = false, showConfirm = false): boolean {
            let isActed = this.isBought();
            if (!isActed) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.xiuxiannvpu_tips9));
                }
                if (showConfirm) {
                    ViewMgr.getIns().showConfirm(getLanById(LanDef.xiuxiannvpu_tips14), Handler.alloc(this, () => {
                        ViewMgr.getIns().showSecondPop(ModName.Role, NewRoleViewType.XiuxianNvpuBuy);
                    }));
                }
                return false;
            }
            return true;
        }

        //是否已购买
        public isBought(): boolean {
            let time = this._model.time;
            return time && time > 0;
        }

        //续费天数
        public get day(): number {
            let curTime = TimeMgr.time.serverTimeSecond;
            let endTime = this._model.time ? this._model.time : 0;
            let leftTime = endTime - curTime;
            if (leftTime > 0) {
                return Math.floor(leftTime / Second.Day);
            }
            return 0;
        }

        public get show_index(): number {
            return this._model.show_index || 0;
        }

        public get level(): number {
            return this._model.level || 0;
        }

        public get exp(): number {
            return this._model.exp || 0;
        }

        public get online_list(): number[] {
            return this._model.online_list || [];
        }

        public get offline_list(): number[] {
            return this._model.offline_list || [];
        }

        public get buy_list(): number[] {
            return this._model.buy_list || [];
        }

        public get reward_list(): msg.ayah_fuben_data[] {
            return this._model.reward_list || [];
        }

        public get finish_list(): msg.ayah_fuben_data[] {
            return this._model.finish_list || [];
        }

        //礼包是否购买
        public isGiftBought(index: number): boolean {
            return this.buy_list.indexOf(index) > -1;
        }

        public isMaxLevel(): boolean {
            let cfgList = getConfigListByName(ConfigName.XiuxianNvpuLevel);
            let maxLevel = cfgList.length;
            return this.level >= maxLevel;
        }

        //神灵id
        public get shenlingId(): number {
            let paramCfg = GameConfig.getParamConfigById('ayah_show');
            if (paramCfg && paramCfg.value) {
                return paramCfg.value[0];
            }
            return 0;
        }

        public get shenlingCfg(): ShenlingConfig {
            let id = this.shenlingId;
            return getConfigByNameId(ConfigName.Shenling, id);
        }

        //天帝是否激活
        public isTiandiActed(type: number): boolean {
            let tiandiProxy: IGodProxy = getProxy(ModName.God, ProxyType.God);
            return tiandiProxy.getActivate(type);
        }

        //天帝类型
        public getTiandiList(): number[] {
            if (this._model.tiandiList) {
                return this._model.tiandiList;
            }
            this.buildTiandi();
            return this._model.tiandiList || [];
        }

        //天帝事件类型
        public getTiandiEventList(id: number): number[] {
            if (this._model.tiandiMap[id]) {
                return this._model.tiandiMap[id];
            }
            this.buildTiandi();
            return this._model.tiandiMap[id] || [];
        }

        private buildTiandi(): void {
            let list: number[] = [];
            let cfgList: AyahOfflineConfig[] = getConfigListByName(ConfigName.XiuxianNvpuOffline);
            for (let cfg of cfgList) {
                if (!cfg.time) {
                    continue;
                }
                let id = cfg.time[0];
                if (list.indexOf(id) < 0) {
                    list.push(id);
                }
                if (!this._model.tiandiMap[id]) {
                    this._model.tiandiMap[id] = [];
                }
                this._model.tiandiMap[id].push(cfg.type);
            }
            this._model.tiandiList = list;
        }

        //获取事件类型名字
        public getEventName(event: number): string {
            let cfg: AyahEventFuncConfig = getConfigByNameId(ConfigName.XiuxianNvpuEventFunc, event);
            if (!cfg) {
                return '';
            }
            let funCfg: OpenFunctionConfig = getConfigByNameId(ConfigName.OpenFunction, cfg.open_func);
            return funCfg && funCfg.name || '';
        }

        //获取事件类型可领取次数
        public getEventCnt(event: number): number {
            let list = this.finish_list;
            for (let item of list) {
                if (item && item.type == event) {
                    return item.count;
                }
            }
            return 0;
        }

        /**====================== hint start ======================*/

        //礼包红点
        public getGiftHint(): boolean {
            let cfgList: AyahTargetConfig[] = getConfigListByName(ConfigName.XiuxianNvpuTarget);
            let hint = false;
            let level = this.level;
            for (let cfg of cfgList) {
                if (!cfg || cfg.level > level) {
                    continue;
                }
                if (this.isGiftBought(cfg.index)) {
                    continue;
                }
                if (cfg.type == 2 && cfg.product_id) {
                    let rmb = PayUtil.getRmbValue(cfg.product_id);
                    if (rmb == 0) {
                        hint = true;
                        break;
                    }
                }
                if (cfg.type == 1 && cfg.cost && BagUtil.checkPropCnt(cfg.cost[0], cfg.cost[1])) {
                    hint = true;
                    break;
                }
            }
            return hint;
        }

        //todo
        private updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XiuxianNvpu) || !this.isActed()) {
                return;
            }
            HintMgr.setHint(this.getGiftHint(), this._model.giftHintPath);
        }

        /**====================== hint end ======================*/

        /**====================== 在线挂机 start ======================*/

        protected onOpenFuncUpdate(n: GameNT) {
            let addIdx: number[] = n.body;
            if (addIdx.indexOf(OpenIdx.XiuxianNvpu) > -1) {
                this.dealAutoEventFunc();
            }
        }

        /**
         * 需要做重置，然后重新处理
         *      （比如扫荡界面关闭时候）
         *      （比如个人副本发送重置协议后，需要重新处理才可以挑战或扫荡）
         *      （比如仙塔不会出现扫荡结算界面，监听协议扫荡完成）
         *      （比如异界boss手动退出，有30秒的限制进入时间）
         */
        private onSpecialChallengeNext(n: GameNT): void {
            let bool = n.body as boolean;
            if (bool) {
                this._firstTime30 = 0;//手动退出，重新计算30秒。用于异界boss复活等
            }
            this.onUpdateSceneEnter();
        }

        /**
         * 从副本退出或者扫荡结束等等，继续处理下一个自动挑战或扫荡
         */
        protected onUpdateSceneEnter(): void {
            if (!SceneUtil.isShowMain()) {
                this.clearAllCall();
                return;
            }
            if (this.autoChallengeEventType) {
                LogUtil.printNvpuChallenge(`结束处理副本: ${this.autoChallengeEventType}`);
            }
            this.autoChallengeEventType = null;
            this.dealAutoEventFunc();//继续处理下一个
        }

        //闯关更新
        private onUpdateMainPassInfo(): void {
            this.dealAutoEventFunc();
        }

        /**当前正在处理的事件类型*/
        public get autoChallengeEventType(): XiuxianNvpuEventType {
            return this._model.autoChallengeEventType;
        }

        public set autoChallengeEventType(type: XiuxianNvpuEventType) {
            this._model.autoChallengeEventType = type;
        }

        /**可处理的事件类型集合*/
        public get autoChallengeEventMap(): Map<XiuxianNvpuEventType, Handler> {
            if (!this._model.autoChallengeEventMap) {
                this._model.autoChallengeEventMap = new Map();
            }
            return this._model.autoChallengeEventMap;
        }

        //排序后的挂机事件类型（可插队、优先级从高到低）
        public get sort_online_list(): number[] {
            let list = this.online_list.concat();
            list.sort((a, b) => {
                let aLimit = this.isLimitType(a);
                let bLimit = this.isLimitType(b);
                let aPri = this.getPriority(a);
                let bPri = this.getPriority(b);
                if (aLimit != bLimit) {
                    return aLimit ? -1 : 1;
                }
                return bPri - aPri;
            });
            return list;
        }

        //主城等待时间
        private getWaitTime(type: number = 0): number {
            let cfg: ParamConfig = GameConfig.getParamConfigById('ayah_waittime');
            return cfg && cfg.value && cfg.value[type] ? cfg.value[type] : (type == 0 ? 30 : 5);
        }

        //获取处理优先级，优先级高的先执行
        private getPriority(type: number): number {
            let cfg: AyahEventFuncConfig = getConfigByNameId(ConfigName.XiuxianNvpuEventFunc, type);
            return cfg && cfg.rank || 0;
        }

        //是否是限时副本
        private isLimitType(type: number): boolean {
            let cfg: AyahEventFuncConfig = getConfigByNameId(ConfigName.XiuxianNvpuEventFunc, type);
            return cfg && cfg.limit_activity && cfg.limit_activity != 0;
        }

        private _firstTime30 = 0;//0表示没有，1表示执行1次了，
        private _delayCall30: number;
        private _delayCall5: number;

        private clearAllCall(): void {
            if (this._delayCall30) {
                clearDelay(this._delayCall30);
                this._delayCall30 = null;
                LogUtil.printNvpuChallenge(`清理${this.getWaitTime(0)}秒倒计时`);
            }
            if (this._delayCall5) {
                clearDelay(this._delayCall5);
                this._delayCall5 = null;
                LogUtil.printNvpuChallenge(`清理${this.getWaitTime(1)}秒倒计时`);
            }
        }

        /**处理自动挂机事件*/
        private dealAutoEventFunc(): void {
            if (DEBUG && window['stopNvpu']) { //todo debug，停止事件
                return;
            }

            //功能未开启
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XiuxianNvpu)) {
                return;
            }
            //未激活
            if (!this.isActed()) {
                return;
            }

            //自动挂机不处理
            let mainProxy: IPassProxy = getProxy(ModName.Pass, ProxyType.Pass);
            if (mainProxy && mainProxy.passIsAuto) {
                this.clearAllCall();
                this.autoChallengeEventType = null;
                return;
            }

            //没有可执行的
            let notExist = this.checkNotExistEventType();
            if (notExist) {
                this.clearAllCall();
                this.autoChallengeEventType = null;
                return;
            }

            //有正在处理的事件类型
            if (this.autoChallengeEventType) {
                return;
            }

            //主城挂机等待时间不足，等待时间已经处理过，无需再处理
            if (this._firstTime30 == 0) {
                let time0 = this.getWaitTime(0);
                if (!this._delayCall30) {
                    LogUtil.printNvpuChallenge(`开启${time0}秒倒计时`);
                    this._delayCall30 = delayCall(Handler.alloc(this, this.delayCall30Func), time0 * 1000);
                }
                return;
            }
            //5秒等待
            if (this._firstTime30 == 1) {
                let time1 = this.getWaitTime(1);
                if (!this._delayCall5) {
                    LogUtil.printNvpuChallenge(`开启${time1}秒倒计时`);
                    this._delayCall5 = delayCall(Handler.alloc(this, this.delayCall5Func), time1 * 1000);
                }
                return;
            }
        }

        private delayCall30Func(): void {
            this._firstTime30 = 1;
            if (this._delayCall30) {
                clearDelay(this._delayCall30);
                this._delayCall30 = null;
            }
            let time0 = this.getWaitTime(0);
            LogUtil.printNvpuChallenge(`结束${time0}秒倒计时`);
            this.execAutoEvent();
        }

        private delayCall5Func(): void {
            if (this._delayCall5) {
                clearDelay(this._delayCall5);
                this._delayCall5 = null;
            }
            let time1 = this.getWaitTime(1);
            LogUtil.printNvpuChallenge(`结束${time1}秒倒计时`);
            this.execAutoEvent();
        }

        /**执行副本事件*/
        private execAutoEvent(): void {
            //不在主城
            if (!SceneUtil.isShowMain() || !this._autoChallengeMap) {
                return;
            }

            let list = this.sort_online_list;
            for (let type of list) {
                if (!this.checkFunOpen(type) || !this._autoChallengeMap.has(type)) {
                    continue;
                }
                // //正在挑战的是非限时，这个时候要处理限时的
                // if (this.isLimitType(type) && this._curExtEventType && !this.isLimitType(this._curExtEventType)) {
                //     SceneUtil.exitScene();
                // }
                LogUtil.printNvpuChallenge(`开始处理副本: ${type}`);
                let handler = this._autoChallengeMap.get(type);
                handler.exec();
                this.autoChallengeEventType = type;
                // 新增一个处理，请求挑战副本后，n秒没有进入对应场景的，移除此事件 todo
                break;
            }
        }

        //待执行副本没有勾选的，无需开启
        private checkNotExistEventType(): boolean {
            let onlineList = this.online_list;
            if (onlineList && onlineList.length && this._autoChallengeMap && this._autoChallengeMap.size) {
                let notExist = true;//没有可执行的
                for (let type of onlineList) {
                    if (this._autoChallengeMap.has(type)) {
                        notExist = false;
                        break;
                    }
                }
                return notExist;
            }
            return false;
        }

        //对应功能开启否，加多层判断
        private checkFunOpen(type: number): boolean {
            let cfg: AyahEventFuncConfig = getConfigByNameId(ConfigName.XiuxianNvpuEventFunc, type);
            if (!cfg || !cfg.open_func) {
                return false;
            }
            return ViewMgr.getIns().checkViewOpen(cfg.open_func);
        }

        public _autoChallengeMap: Map<number, Handler>;

        /**
         * 添加可挑战的副本事件
         */
        public addAutoChallengeEvent(type: XiuxianNvpuEventType, handler: Handler): void {
            if (!this._autoChallengeMap) {
                this._autoChallengeMap = new Map();
            }
            this._autoChallengeMap.set(type, handler);

            //没有正在执行的，马上判断执行
            if (this.autoChallengeEventType == null) {
                this.dealAutoEventFunc();
            } else {
                //有正在挑战，且是是非限时，待处理是限时的，马上终止当前挑战的
                if (this.autoChallengeEventType && !this.isLimitType(this.autoChallengeEventType) && this.isLimitType(type)) {
                    SceneUtil.exitScene();
                    this.clearAllCall();
                    this.autoChallengeEventType = null;
                    this.dealAutoEventFunc();
                }
            }
        }

        /**
         * 移除副本事件
         * @param type 事件类型
         * @param isReset 当前正在处理类型==type且是特殊情况，马上重置处理下一轮，默认false。一般不需要传，退出副本或者关闭扫荡界面等，会重置处理下一轮。
         *          比如：正在处理仙侣试炼或仙侣斗法匹配，但是被离婚了，那就马上移除当前事件，开始处理下一轮
         *               正在处理仙宗封魔，但是被移除仙宗，也是同上处理
         */
        public removeAutoChallengeEvent(type: XiuxianNvpuEventType, isReset = false): void {
            let exist = false;
            if (this._autoChallengeMap && this._autoChallengeMap.get(type)) {
                exist = true;
                // let handler = this._autoChallengeMap.get(type);
                // Pool.release(handler);
                this._autoChallengeMap.delete(type);
            }
            if (exist) {
                if (this.autoChallengeEventType == type && isReset) {
                    //移除的正是当前正在处理的，需要重置继续处理下一轮 todo 正在场景内的不处理
                    this.onUpdateSceneEnter();
                }
                let size = this._autoChallengeMap ? this._autoChallengeMap.size : 0;
                if (!size) {
                    this.clearAllCall();
                    this.autoChallengeEventType = null;
                }
            }
        }

        /**判断挂机类型勾选状态*/
        public isNvpuOnlineSelected(eventType: XiuxianNvpuEventType): boolean {
            let onlineList = this.online_list;
            return onlineList && onlineList.indexOf(eventType) > -1;
        }

        /**修改勾选状态 selected表示勾选状态*/
        public setNvpuOnlineSetting(eventType: XiuxianNvpuEventType, selected: boolean): void {
            let onlineList = this.online_list.concat();
            let idx = onlineList.indexOf(eventType);
            if (idx > -1) {
                //存在
                if (!selected) {
                    onlineList.splice(idx, 1);
                    this.c2s_ayah_edit_show(2, onlineList);
                }
            } else {
                //不存在
                if (selected) {
                    onlineList.push(eventType);
                    this.c2s_ayah_edit_show(2, onlineList);
                }
            }
        }

        /**====================== 在线挂机 end ======================*/

    }
}