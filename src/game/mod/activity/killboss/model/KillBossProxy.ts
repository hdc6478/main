namespace game.mod.activity {


    import DemonRewardConfig = game.config.DemonRewardConfig;
    import NewMultipleBossConfig = game.config.NewMultipleBossConfig;
    import s2c_demon_reward_data = msg.s2c_demon_reward_data;
    import GameNT = base.GameNT;
    import s2c_receive_demon_reward_ret = msg.s2c_receive_demon_reward_ret;
    import c2s_receive_demon_reward = msg.c2s_receive_demon_reward;
    import demon_reward_info = msg.demon_reward_info;
    import c2s_open_demon_reward = msg.c2s_open_demon_reward;

    /**斩妖福利（挑战多人boss获得奖励） */
    export class KillBossProxy extends ProxyBase {
        private _model: KillBossModel;

        public get model() {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new KillBossModel();

            this.onProto(s2c_demon_reward_data, this.s2c_demon_reward_data, this);
            this.onProto(s2c_receive_demon_reward_ret, this.s2c_receive_demon_reward_ret, this);
        }

        /**--------------------协议start-------------------- */

        private s2c_demon_reward_data(n: GameNT): void {
            let msg: s2c_demon_reward_data = n.body;
            if (msg && msg.list) {
                this._model.list = msg.list
            }
            this.onUpdateHint();
            this.sendNt(ActivityEvent.ON_UPDATE_KILLBOSS_INFO);
        }

        /**领取奖励结果 */
        private s2c_receive_demon_reward_ret(n: GameNT): void {
            let msg: s2c_receive_demon_reward_ret = n.body;
            if (msg.info) {
                this.onUpdateList(msg.info);
            }
            this.onUpdateHint();
            this.onUpdateWndTab();
        }

        /**领取奖励 */
        public c2s_receive_demon_reward(index: number, type: number): void {
            let msg: c2s_receive_demon_reward = new c2s_receive_demon_reward();
            msg.index = index;
            msg.type = type;
            this.sendProto(msg);
        }

        public c2s_open_demon_reward(): void {
            let msg: c2s_open_demon_reward = new c2s_open_demon_reward();
            this.sendProto(msg);
        }

        /**--------------------协议end-------------------- */

        private onUpdateList(status: demon_reward_info): void {
            if (!this._model.list) {
                this._model.list = [status];
                return;
            } else {
                for (let i = 0; i < this._model.list.length; i++) {
                    let item = this._model.list[i];
                    if (item.index == status.index) {
                        this._model.list[i] = status;
                        return;
                    }
                }
            }
            this._model.list.push(status);
        }

        /**重新归类配置 */
        private setCfgMap(): void {
            this._model.initMap = true;
            let cfgArr: DemonRewardConfig[] = getConfigListByName(ConfigName.DemonReward);
            let global: number = -1;
            for (let cfg of cfgArr) {
                let type: number = this.getTypeConverByIndex(cfg.index);
                if (!this._model.cfgBossMap[type]) {
                    this._model.cfgBossMap[type] = [];
                }
                this._model.cfgBossMap[type].push(cfg);

                /**改变类型添加开启条件 */
                if (global != type) {
                    global = type;
                    let cfgBoss: NewMultipleBossConfig = getConfigByNameId(ConfigName.NewMultipleBoss, cfg.index);
                    if (cfgBoss) {
                        this._model.openMap[type] = cfgBoss.open;
                    }
                }
            }
        }

        /**获取类型 */
        public getCfgListByType(type: number): DemonRewardConfig[] {
            if (!this._model.initMap) {
                this.setCfgMap();
            }
            return this._model.cfgBossMap[type];
        }

        /**根据类型获取开启条件 */
        public getOpenByType(type: number): number[] {
            if (!this._model.initMap) {
                this.setCfgMap();
            }
            return this._model.openMap[type];
        }

        /**获取类型 可用作tab列表 */
        public getMapKeyList(): number[] {
            if (!this._model.initMap) {
                this.setCfgMap();
            }
            if (!this._model.typeList || !this._model.typeList.length) {
                for (let key in this._model.cfgBossMap) {
                    this._model.typeList.push(+key);
                }
            }
            return this._model.typeList;
        }

        /**根据index获取类型 */
        public getTypeByIndex(index: number = this.tabIdx): number {
            return this.getMapKeyList()[index];
        }

        /**
         * 获取奖励列表配置和状态
         * @param index 配置index
         *  */
        public getRewardList(type: number, index: number): IKillBossData {
            let cfgArr: DemonRewardConfig[] = this.getCfgListByType(type);
            for (let cfg of cfgArr) {
                if (cfg.index == index) {
                    let status = this.getInfoByIndex(index);
                    return {cfg, status};
                }
            }
            console.error("检查配置或类型");
            return null;
        }

        /**根据index获取状态数据 */
        public getInfoByIndex(index: number): demon_reward_info {
            if (this._model.list && this._model.list.length > 0) {
                for (let item of this._model.list) {
                    if (item.index == index) {
                        return item;
                    }
                }
            }
            return null;
        }

        /**Wnd下的tab 选中的index */
        public get tabIdx(): number {
            return this._model.tabIdx;
        }

        public set tabIdx(val: number) {
            this._model.tabIdx = val;
        }

        public get bossIndex(): number {
            return this._model.bossIndex;
        }

        public set bossIndex(val: number) {
            this._model.bossIndex = val;
        }

        /**index转换type type=几转 */
        private getTypeConverByIndex(index: number): number {
            /**boss配置index前缀 */
            const prefix: number = 401010000;
            //todo 暂定余数除以100为类型（一转、二转之类）
            return Math.floor(index % prefix / 100);
        }

        private onUpdateWndTab(): void {
            this._model.list.sort((a, b) => {
                return a.index - b.index;
            });
            for (let item of this._model.list) {
                let type: number = this.getTypeConverByIndex(item.index);
                let btnType: string = `0${type}`;
                let bool: boolean = HintMgr.getHint([ModName.Activity, MainActivityViewType.KillBoss, btnType]);
                if (bool) {
                    if (+btnType == this.getTypeByIndex()) {
                        break;
                    }
                    this.sendNt(MainEvent.UPDATE_WND_BASE_MDR_SEL_TAB, btnType);
                    // console.error("跳转tab了", btnType);
                    return;
                }
            }
            let cfgArr = this.getCfgListByType(this.getTypeByIndex());
            for (let i = 0; i < cfgArr.length; i++) {
                let info = this.getInfoByIndex(cfgArr[i].index);
                if (info) {
                    if (info.first_reward == 1 || info.personal_reward == 1 || info.kill_reward == 1) {
                        this.sendNt(ActivityEvent.ON_UPDATE_KILLBOSS_SELECT_INDEX, i);
                        // console.error("跳转index了", i);
                        return;
                    }
                }
            }
            this.sendNt(ActivityEvent.ON_UPDATE_KILLBOSS_INFO);
            // console.error("没有跳转 直接刷新");
        }

        /**获取Wnd的tab页签 */
        public getInitTab(): string {
            this._model.list.sort((a, b) => {
                return a.index - b.index;
            });
            for (let item of this._model.list) {
                let type: number = this.getTypeConverByIndex(item.index);
                let btnType: string = `0${type}`;
                let bool: boolean = HintMgr.getHint([ModName.Activity, MainActivityViewType.KillBoss, btnType]);
                if (bool) {
                    return btnType;
                }
            }
            return MdrTabBtnType.TabBtnType01;
        }

        /** */
        public getInitIndex(type: number = this.getTypeByIndex()): number {
            let cfgArr = this.getCfgListByType(type);
            for (let i = 0; i < cfgArr.length; i++) {
                let info = this.getInfoByIndex(cfgArr[i].index);
                if (info) {
                    if (info.first_reward == 1 || info.personal_reward == 1 || info.kill_reward == 1) {
                        return i;
                    }
                }
            }
            return 0;
        }

        private onUpdateHint(): void {
            for (let item of this._model.list) {
                this.onSetHint(item);
            }
        }

        private onSetHint(info: demon_reward_info): void {
            let type: number = this.getTypeConverByIndex(info.index);
            let root: string[] = [ModName.Activity, MainActivityViewType.KillBoss, `0${type}`,`${info.index}`];
            let open = this.checkBossOpen(type);
            if (!open) {
                HintMgr.setHint(open, root);
                return;
            }
            let hint: boolean = HintMgr.getHint(root);
            let bool: boolean = info.first_reward == 1 || info.personal_reward == 1 || info.kill_reward == 1;
            if (hint != bool) {
                HintMgr.setHint(bool, root);
            }
        }

        /**
         * 根据bossindex获取红点
         * @param index bossindex
         * */
        public getBossItemHint(index: number): boolean {
            let type: number = this.getTypeConverByIndex(index);
            let open: boolean = this.checkBossOpen(type);
            if (!open) {
                return false;
            }
            let info = this.getInfoByIndex(index);
            if (!info) {
                return false;
            }
            return info.first_reward == 1 || info.personal_reward == 1 || info.kill_reward == 1;
        }

        /**先获取开启条件再判断 */
        public checkBossOpen(type: number): boolean {
            let open = this.getOpenByType(type);
            if (!open) {
                return false;
            }
            return ViewMgr.getIns().checkBossOpen(open[0], open[1]);
        }
    }
}