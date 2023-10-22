namespace game.mod.yijie {

    import YijieConfig = game.config.YijieConfig;
    import yijie_ui_info = msg.yijie_ui_info;
    import s2c_yijie_open_ui_ret = msg.s2c_yijie_open_ui_ret;
    import GameNT = base.GameNT;
    import c2s_yijie_open_ui = msg.c2s_yijie_open_ui;
    import c2s_yijie_boss_challenge = msg.c2s_yijie_boss_challenge;
    import c2s_yijie_sanbei = msg.c2s_yijie_sanbei;
    import ParamConfig = game.config.ParamConfig;
    import s2c_yijie_update_date = msg.s2c_yijie_update_date;
    import c2s_yijie_show_reward = msg.c2s_yijie_show_reward;
    import s2c_yijie_show_reward_ret = msg.s2c_yijie_show_reward_ret;
    import c2s_yijie_boss_info = msg.c2s_yijie_boss_info;
    import s2c_yijie_boss_info_ret = msg.s2c_yijie_boss_info_ret;
    import yijie_boss_data = msg.yijie_boss_data;
    import s2c_yijie_rate_boss_update = msg.s2c_yijie_rate_boss_update;
    import facade = base.facade;
    import s2c_yijie_boss_roll_point = msg.s2c_yijie_boss_roll_point;
    import s2c_yijie_sanbei_ret = msg.s2c_yijie_sanbei_ret;
    import c2s_yongheng_boss_challenge = msg.c2s_yongheng_boss_challenge;
    import YonghengConfig = game.config.YonghengConfig;
    import yongheng_ui_info = msg.yongheng_ui_info;
    import c2s_yongheng_open_ui = msg.c2s_yongheng_open_ui;
    import s2c_yongheng_open_ui_ret = msg.s2c_yongheng_open_ui_ret;
    import s2c_yongheng_update_date = msg.s2c_yongheng_update_date;
    import c2s_yongheng_show_reward = msg.c2s_yongheng_show_reward;
    import s2c_yongheng_show_reward_ret = msg.s2c_yongheng_show_reward_ret;
    import c2s_yongheng_boss_info = msg.c2s_yongheng_boss_info;
    import s2c_yongheng_boss_info_ret = msg.s2c_yongheng_boss_info_ret;
    import yongheng_boss_data = msg.yongheng_boss_data;
    import Handler = base.Handler;

    export class YijieProxy extends ProxyBase{
        private _model: YijieModel;

        initialize(): void {
            super.initialize();
            this._model = new YijieModel();

            this.onProto(s2c_yijie_open_ui_ret, this.s2c_yijie_open_ui_ret, this);
            this.onProto(s2c_yijie_sanbei_ret, this.s2c_yijie_sanbei_ret, this);
            this.onProto(s2c_yijie_update_date, this.s2c_yijie_update_date, this);
            this.onProto(s2c_yijie_show_reward_ret, this.s2c_yijie_show_reward_ret, this);
            this.onProto(s2c_yijie_boss_info_ret, this.s2c_yijie_boss_info_ret, this);
            this.onProto(s2c_yijie_rate_boss_update, this.s2c_yijie_rate_boss_update, this);
            this.onProto(s2c_yijie_boss_roll_point, this.s2c_yijie_boss_roll_point, this);

            this.onProto(s2c_yongheng_open_ui_ret, this.s2c_yongheng_open_ui_ret, this);
            this.onProto(s2c_yongheng_update_date, this.s2c_yongheng_update_date, this);
            this.onProto(s2c_yongheng_show_reward_ret, this.s2c_yongheng_show_reward_ret, this);
            this.onProto(s2c_yongheng_boss_info_ret, this.s2c_yongheng_boss_info_ret, this);
        }

        public c2s_yijie_open_ui() {
            let msg = new c2s_yijie_open_ui();
            this.sendProto(msg);
        }

        public c2s_yijie_boss_challenge(stage: number) {
            let msg = new c2s_yijie_boss_challenge();
            msg.stage = stage;
            this.sendProto(msg);
        }

        public c2s_yijie_sanbei() {
            let msg = new c2s_yijie_sanbei();
            msg.state = !this.selState;
            this.sendProto(msg);
        }

        public c2s_yijie_show_reward() {
            let msg = new c2s_yijie_show_reward();
            this.sendProto(msg);
        }

        public c2s_yijie_boss_info() {
            let msg = new c2s_yijie_boss_info();
            this.sendProto(msg);
        }

        private s2c_yijie_open_ui_ret(n: GameNT) {
            let msg: s2c_yijie_open_ui_ret = n.body;
            if (!msg) {
                return;
            }
            if (msg.count != undefined) {
                this._model.count = msg.count;
            }
            if (msg.list) {
                this._model.bossInfos = msg.list;
            }
            if (msg.state != undefined) {
                this._model.selState = msg.state;
                this.updateBossHint();
            }
            this.sendNt(YijieEvent.ON_YIJIE_INFO_UPDATE);
        }

        private s2c_yijie_sanbei_ret(n: GameNT) {
            let msg: s2c_yijie_sanbei_ret = n.body;
            if (!msg) {
                return;
            }
            if (msg.state != undefined) {
                this._model.selState = msg.state;
                this.updateBossHint();
                this.sendNt(YijieEvent.ON_YIJIE_SEL_UPDATE);
            }
        }

        private s2c_yijie_update_date(n: GameNT) {
            let msg: s2c_yijie_update_date = n.body;
            if (!msg) {
                return;
            }
            if (msg.count != undefined) {
                this._model.count = msg.count;
            }
            if (msg.member_num != undefined) {
                this._model.memberNum = msg.member_num;
            }
            if (msg.value != undefined) {
                this._model.bossValue = msg.value;
            }
            this.sendNt(YijieEvent.ON_YIJIE_SCENE_UPDATE);
        }

        private s2c_yijie_show_reward_ret(n: GameNT) {
            let msg: s2c_yijie_show_reward_ret = n.body;
            ViewMgr.getIns().bossRewardShow(msg.props);
        }

        private s2c_yijie_boss_info_ret(n: GameNT) {
            let msg: s2c_yijie_boss_info_ret = n.body;
            if (!msg) {
                return;
            }
            if (msg.boss_list != undefined) {
                this._model.bossList = msg.boss_list;
                this.sendNt(YijieEvent.BOSS_LIST_INFO_UPDATE);
            }
        }

        private s2c_yijie_rate_boss_update(n: GameNT) {
            let msg: s2c_yijie_rate_boss_update = n.body;
            if (!msg) {
                return;
            }
            facade.showView(ModName.Yijie, YijieViewType.YijieBoss, msg);
        }

        private s2c_yijie_boss_roll_point(n: GameNT) {
            let msg: s2c_yijie_boss_roll_point = n.body;
            if (!msg) {
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.Yijie, YijieViewType.YijieLucky, msg);
        }

        /**boss信息*/
        public getBossInfo(stage: number, type?: number): yijie_ui_info | yongheng_ui_info {
            let infos = type == YijieBossType.YonghengYijie ? this._model.yonghengBossInfos : this._model.bossInfos;
            let len = infos.length;
            for (let i = 0; i < len; ++i) {
                let info = infos[i];
                if (info.stage == stage) {
                    return info;
                }
            }
            return null;
        }

        private getBossCfgs(type?: number): { [stage: number]: YijieConfig[] } | { [stage: number]: YonghengConfig[] } {
            let infos = type == YijieBossType.YonghengYijie ? this._model.yonghengBossCfgs : this._model.bossCfgs;
            let cfgName = type == YijieBossType.YonghengYijie ? ConfigName.Yongheng : ConfigName.Yijie;
            if (!infos) {
                infos = {};
                let stage = 1;
                while (stage) {
                    let cfgList: object = getConfigByNameId(cfgName, stage);
                    if (!cfgList) {
                        stage = 0;
                    } else {
                        for (let k in cfgList) {
                            let cfg = cfgList[k];
                            if (!infos[stage]) {
                                infos[stage] = [];
                            }
                            infos[stage].push(cfg);
                        }
                        stage++;
                    }
                }
            }
            return infos;
        }

        public getBossList(type?: number): YijieConfig[] | YonghengConfig[] {
            let bossList = [];
            let cfgs = this.getBossCfgs(type);
            for (let k in cfgs) {
                let cfg = cfgs[k][0];
                bossList.push(cfg);
            }
            return bossList;
        }

        public getBossCfg(stage: number, index: number, type?: number): YijieConfig | YonghengConfig {
            let cfgName = type == YijieBossType.YonghengYijie ? ConfigName.Yongheng : ConfigName.Yijie;
            let cfgList: object = getConfigByNameId(cfgName, stage);
            let cfg: YijieConfig | YonghengConfig = cfgList[index];
            return cfg;
        }

        public isBossOpen(cfg: YijieConfig | YonghengConfig, showTips?: boolean): boolean {
            let lv = cfg.open;
            let isOpen = ViewMgr.getIns().checkRebirth(lv);
            if (!isOpen && showTips) {
                let tips = ViewMgr.getIns().checkRebirthStr(lv);
                PromptBox.getIns().show(tips);
            }
            return isOpen;
        }

        public get count(): number {
            return this._model.count;
        }

        public get selState(): boolean {
            return this._model.selState;
        }

        public getCost(): number[] {
            let cfg: ParamConfig = GameConfig.getParamConfigById("yijie_cost");
            let index = cfg && cfg.value;
            let cnt = this.selState ? 3 : 1;//勾选三倍后消耗显示3
            return [index, cnt];
        }

        public getCostInfo(): number[] {
            let cfg: ParamConfig = GameConfig.getParamConfigById("yongheng_cost");
            return cfg && cfg.value;
        }

        public get memberNum(): number {
            return this._model.memberNum;
        }

        public get bossValue(): number {
            return this._model.bossValue;
        }

        public getBossMaxValue(): number {
            let cfg: ParamConfig = GameConfig.getParamConfigById("yijie_kill_num");
            return cfg && cfg.value;
        }

        public get bossList(): yijie_boss_data[] | yongheng_boss_data[] {
            return this._model.bossList;
        }

        /**更新红点*/
        private updateBossHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Yijie)) {
                return;
            }
            let hint = this.checkBossHint();
            let hintType = this._model.bossHint;
            HintMgr.setHint(hint, hintType, OpenIdx.Yijie);
        }

        private checkBossHint(): boolean {
            let cost = this.getCost();
            let index = cost[0];
            let cnt = cost[1];
            return BagUtil.getPropCntByIdx(index) >= cnt;
        }

        /** 通用背包事件监听 */
        protected onBagUpdateByPropIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            let cost = this.getCost();
            let index = cost[0];
            if (indexs.indexOf(index) >= 0) {
                this.updateBossHint();
                this.checkAutoChallengeYijie();
            }
            let costInfo = this.getCostInfo();
            let index2 = costInfo[0];
            if (indexs.indexOf(index2) >= 0) {
                this.updateYonghengBossHint();
            }
        }

        public get curType(): number {
            return this._model.curType;
        }

        public set curType(type: number) {
            this._model.curType = type;
        }

        /************************************永恒异界****************************************/
        public c2s_yongheng_open_ui() {
            let msg = new c2s_yongheng_open_ui();
            this.sendProto(msg);
        }

        public c2s_yongheng_boss_challenge(cfg: YonghengConfig) {
            let msg = new c2s_yongheng_boss_challenge();
            msg.stage = cfg["stage"];//字段定义没导出
            this.selCfg = cfg;
            this.sendProto(msg);
        }

        public c2s_yongheng_show_reward() {
            let msg = new c2s_yongheng_show_reward();
            this.sendProto(msg);
        }

        public c2s_yongheng_boss_info() {
            let msg = new c2s_yongheng_boss_info();
            this.sendProto(msg);
        }

        private s2c_yongheng_open_ui_ret(n: GameNT) {
            let msg: s2c_yongheng_open_ui_ret = n.body;
            if (!msg) {
                return;
            }
            if (msg.count != undefined) {
                this._model.yonghengCount = msg.count;
            }
            if (msg.good_count != undefined) {
                this._model.goodCount = msg.good_count;
            }
            if (msg.list) {
                this._model.yonghengBossInfos = msg.list;
            }
            this.sendNt(YijieEvent.ON_YONGHENG_YIJIE_INFO_UPDATE);
        }

        private s2c_yongheng_update_date(n: GameNT) {
            let msg: s2c_yongheng_update_date = n.body;
            if (!msg) {
                return;
            }
            if (msg.count != undefined) {
                this._model.yonghengCount = msg.count;
            }
            if (msg.member_num != undefined) {
                this._model.memberNum = msg.member_num;
            }
            if (msg.good_count != undefined) {
                this._model.goodCount = msg.good_count;
            }
            this.sendNt(YijieEvent.ON_YONGHENG_YIJIE_SCENE_UPDATE);
        }

        private s2c_yongheng_show_reward_ret(n: GameNT) {
            let msg: s2c_yongheng_show_reward_ret = n.body;
            ViewMgr.getIns().bossRewardShow(msg.props);
        }

        private s2c_yongheng_boss_info_ret(n: GameNT) {
            let msg: s2c_yongheng_boss_info_ret = n.body;
            if (!msg) {
                return;
            }
            if (msg.boss_list != undefined) {
                this._model.bossList = msg.boss_list;
                this.sendNt(YijieEvent.BOSS_LIST_INFO_UPDATE);
            }
        }

        public get yonghengCount(): number {
            return this._model.yonghengCount;
        }

        public get goodCount(): number {
            return this._model.goodCount;
        }

        public get selCfg(): YonghengConfig {
            return this._model.selCfg;
        }

        public set selCfg(cfg: YonghengConfig) {
            this._model.selCfg = cfg;
        }

        /**更新红点*/
        private updateYonghengBossHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.YonghengYijie)) {
                return;
            }
            let hint = this.checkYonghengBossHint();
            let hintType = this._model.yonghengBossHint;
            HintMgr.setHint(hint, hintType);
        }

        private checkYonghengBossHint(): boolean {
            let costInfo = this.getCostInfo();
            let index = costInfo[0];
            let cnt = costInfo[1];
            return BagUtil.getPropCntByIdx(index) >= cnt;
        }


        /**============== 修仙女仆自动挂机 ==============*/

        //能挑战的配置
        private getCanAutoChallengeYijieCfg(): YijieConfig {
            let cfgList = this.getBossList() as YijieConfig[];
            for (let cfg of cfgList) {
                if (cfg && this.isBossOpen(cfg)) {
                    return cfg;
                }
            }
            return null;
        }

        private canAutoChallengeYijie(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Yijie)) {
                return false;
            }
            let cost = this.getCost();
            if (!cost || !BagUtil.checkPropCnt(cost[0], cost[1])) {
                return false;
            }
            let cfg = this.getCanAutoChallengeYijieCfg();
            return !!cfg;
        }

        private sendAutoChallengeYijie(): void {
            let cfg = this.getCanAutoChallengeYijieCfg();
            if (cfg) {
                this.c2s_yijie_boss_challenge(cfg['stage']);
            }
        }

        private checkAutoChallengeYijie(): void {
            let cost = this.getCost();
            if ((!cost || !BagUtil.checkPropCnt(cost[0], cost[1]))
                && RoleUtil.getAutoChallengeEventType() == XiuxianNvpuEventType.Yijie) {
                SceneUtil.exitScene();
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.Yijie);
                return;
            }
            if (this.canAutoChallengeYijie()) {
                RoleUtil.addAutoChallengeEvent(XiuxianNvpuEventType.Yijie, Handler.alloc(this, this.sendAutoChallengeYijie));
            } else {
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.Yijie);
            }
        }

        protected onOpenFuncInit(n: GameNT) {
            this.checkFuncOpen(n);
        }

        protected onOpenFuncUpdate(n: GameNT) {
            this.checkFuncOpen(n);
        }

        private checkFuncOpen(n: GameNT): void {
            let addIdx = n.body as number[];
            if (addIdx.indexOf(OpenIdx.Yijie) > -1) {
                this.checkAutoChallengeYijie();
            }
        }

        /**============== 修仙女仆自动挂机 ==============*/

    }
}