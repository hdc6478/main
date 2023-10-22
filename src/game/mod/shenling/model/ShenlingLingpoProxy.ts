namespace game.mod.shenling {

    import c2s_god_brother_lingpo_click = msg.c2s_god_brother_lingpo_click;
    import GameNT = base.GameNT;
    import s2c_god_brother_lingpo_info = msg.s2c_god_brother_lingpo_info;
    import ShenlingLingpoConfig = game.config.ShenlingLingpoConfig;
    import ShenlingLingpoTypeConfig = game.config.ShenlingLingpoTypeConfig;
    import god_brother_lingpo_datas = msg.god_brother_lingpo_datas;
    import god_brother_lingpo_sturct = msg.god_brother_lingpo_sturct;
    import facade = base.facade;

    /**
     * @description 神灵灵魄系统
     */
    export class ShenlingLingpoProxy extends ProxyBase {
        private _model: ShenlingLingpoModel;

        public get model(): ShenlingLingpoModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new ShenlingLingpoModel();
            this.onProto(s2c_god_brother_lingpo_info, this.s2c_god_brother_lingpo_info, this);
            facade.onNt(ShenLingEvent.ON_SHEN_LING_UPDATE_TYPE, this.updateHint, this);
        }

        /**
         * @param button_type 1为指定激活/升星   2为一键激活/升星  3套装升级
         * @param id 灵魄id（配置表索引）
         * @param index 灵魄子索引（8个位置索引）
         */
        public c2s_god_brother_lingpo_click(button_type: number, id: number, index?: number): void {
            let msg = new c2s_god_brother_lingpo_click();
            msg.button_type = button_type;
            msg.id = id;
            if (index) {
                msg.index = index;
            }
            this.sendProto(msg);
        }

        private s2c_god_brother_lingpo_info(n: GameNT): void {
            let msg = n.body as s2c_god_brother_lingpo_info;
            if (msg.all_datas != null) {
                for (let item of msg.all_datas) {
                    this._model.all_datas[item.id] = item;
                }
            }
            this.updateHint();
            this.sendNt(ShenLingEvent.ON_SHEN_LING_LING_PO_UPDATE);
        }

        private checkShow(id: number): boolean {
            let info = this.getInfo(id);
            if (info && info.list && info.list.length) {
                return true;
            }
            let cfgObj = this.getCfgObj(id);
            if (!cfgObj || !cfgObj[id]) {
                return false;
            }
            let cfg = cfgObj[id];
            let cost = cfg.cost[0];
            if (BagUtil.checkPropCnt(cost[0], cost[1])) {
                return true;
            }
            return false;
        }

        private canShowTypeCfg(cfg: ShenlingLingpoTypeConfig): boolean {
            if (!cfg || !cfg.show) {
                return false;
            }
            if (cfg.show == 1 || (cfg.show == 2 && this.checkShow(cfg.id))) {
                return true;
            }
            return false;
        }

        public getShowTypeCfgList(type: ShenLingType): ShenlingLingpoTypeConfig[] {
            let showTypes = this.getShowShenlingTypes();
            if (showTypes.indexOf(type) < 0) {
                return [];
            }

            let cfgList = this.getTypeCfgList(type);
            let list: ShenlingLingpoTypeConfig[] = [];
            for (let cfg of cfgList) {
                if (this.canShowTypeCfg(cfg)) {
                    list.push(cfg);
                }
            }
            return list;
        }

        private _typeCfgMap: { [type: number]: ShenlingLingpoTypeConfig[] } = {};

        public getTypeCfgList(type: ShenLingType): ShenlingLingpoTypeConfig[] {
            if (this._typeCfgMap[type]) {
                return this._typeCfgMap[type];
            }
            this._typeCfgMap = {};
            let list = getConfigListByName(ConfigName.ShenlingLingpoType);
            for (let cfg of list) {
                if (!cfg) {
                    continue;
                }
                if (!this._typeCfgMap[cfg.itype]) {
                    this._typeCfgMap[cfg.itype] = [];
                }
                this._typeCfgMap[cfg.itype].push(cfg);
            }
            return this._typeCfgMap[type];
        }

        public getCfgObj(id: number): { [index: number]: ShenlingLingpoConfig } {
            return getConfigByNameId(ConfigName.ShenlingLingpo, id);
        }

        public getConfig(id: number, lv: number): ShenlingLingpoConfig {
            let cfgObj = this.getCfgObj(id);
            if (cfgObj && cfgObj[lv]) {
                return cfgObj[lv];
            }
            return null;
        }

        public getTypeCfg(id: number): ShenlingLingpoTypeConfig {
            return getConfigByNameId(ConfigName.ShenlingLingpoType, id);
        }

        public getInfo(id: number): god_brother_lingpo_datas {
            return this._model.all_datas[id];
        }

        public getIconInfo(id: number, idx: number): god_brother_lingpo_sturct {
            let info = this.getInfo(id);
            if (!info || !info.list) {
                return null;
            }
            for (let item of info.list) {
                if (item && item.index == idx) {
                    return item;
                }
            }
            return null;
        }

        //系列战力
        public getPowerByType(type: ShenLingType): number {
            let cfgList = this.getShowTypeCfgList(type);
            let power = 0;
            for (let cfg of cfgList) {
                let singlePower = this.getPower(cfg.id);
                power += singlePower;
            }
            return power;
        }

        public getPower(id: number): number {
            let info = this.getInfo(id);
            if (!info) {
                return 0;
            }
            let power = 0;
            if (info.suit_attrs && info.suit_attrs.showpower) {
                power += info.suit_attrs.showpower.toNumber();
            }
            if (info.list && info.list.length) {
                for (let item of info.list) {
                    if (item && item.base_attrs && item.base_attrs.showpower) {
                        power += item.base_attrs.showpower.toNumber();
                    }
                }
            }
            return power;
        }

        private _maxSuitLvMap: { [id: number]: number } = {};

        public getMaxLevel(id: number): number {
            return this.getMaxSuitLevel(id);
        }

        public getCurLevel(id: number, idx: number): number {
            let info = this.getIconInfo(id, idx);
            return info ? info.level : 0;
        }

        public isMaxLevel(id: number, idx: number): boolean {
            let maxLv = this.getMaxLevel(id);
            let curLv = this.getCurLevel(id, idx);
            return maxLv <= curLv;
        }

        public getMaxSuitLevel(id: number): number {
            if (this._maxSuitLvMap[id]) {
                return this._maxSuitLvMap[id];
            }
            let cfgObj = this.getCfgObj(id);
            if (!cfgObj) {
                return 0;
            }
            this._maxSuitLvMap[id] = Object.keys(cfgObj).length;
            return this._maxSuitLvMap[id];
        }

        public isSuitActed(id: number): boolean {
            let info = this.getInfo(id);
            return info && info.suit_level > 0;
        }

        public isSuitLevelMax(id: number): boolean {
            let suitLv = this.getSuitLevel(id);
            let maxLv = this.getMaxSuitLevel(id);
            return suitLv >= maxLv;
        }

        public getSuitLevel(id: number): number {
            let info = this.getInfo(id);
            return info && info.suit_level || 0;
        }

        public getSuitLevelProgressCnt(id: number, lv?: number): number {
            if (this.isSuitLevelMax(id)) {
                return LingPoMaxCnt;
            }
            let info = this.getInfo(id);
            if (!info || !info.list) {
                return 0;
            }
            if (lv == null) {
                lv = this.getSuitLevel(id);
            }
            let cnt = 0;
            for (let item of info.list) {
                if (item && item.level >= lv) {
                    cnt++;
                }
            }
            return cnt;
        }

        /**
         * @param id 灵魄id
         * @param idx 第几个灵魄icon，从1开始
         * @param isTips
         */
        public canActOrUp(id: number, idx: number, isTips = false): boolean {
            if (this.isMaxLevel(id, idx)) {
                return false;
            }
            let curLv = this.getCurLevel(id, idx);
            let nextCfg = this.getConfig(id, curLv + 1);
            if (!nextCfg) {
                return false;
            }
            let cost = nextCfg.cost[idx - 1];
            if (!cost || !BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Text : PropLackType.None)) {
                return false;
            }
            return true;
        }

        public canOneKey(id: number): boolean {
            for (let i = 1; i <= LingPoMaxCnt; i++) {
                if (this.canActOrUp(id, i)) {
                    return true;
                }
            }
            return false;
        }

        public canActOrUpSuit(id: number, isTips = false): boolean {
            if (this.isSuitLevelMax(id)) {
                return false;
            }
            let nextLv = this.getSuitLevel(id) + 1;
            let progressCnt = this.getSuitLevelProgressCnt(id, nextLv);
            if (progressCnt < LingPoMaxCnt) {
                if (isTips) {
                    PromptBox.getIns().show(`条件不足`);
                }
                return false;
            }
            return true;
        }

        public canOneKeySuit(id: number): boolean {
            return this.canActOrUpSuit(id);
        }

        public isActed(id: number): boolean {
            let info = this.getInfo(id);
            return info && info.list && info.list.length >= LingPoMaxCnt || false;
        }

        public isActedAllIcon(id: number): boolean {
            let info = this.getInfo(id);
            let actedLen = info && info.list && info.list.length || 0;
            let cfg = this.getConfig(id, 1);
            let allLen = cfg && cfg.cost && cfg.cost.length || LingPoMaxCnt;
            return actedLen >= allLen;
        }

        protected onBagUpdateByBagType(n: GameNT): void {
            let bagTypes = n.body as number[];
            if (bagTypes.indexOf(BagType.ShenlingEquip) > -1) {
                this.updateHint();
            }
        }

        public getIconHint(id: number, idx: number): boolean {
            return this.canActOrUp(id, idx);
        }

        public getHintById(id: number): boolean {
            if (this.canOneKeySuit(id)) {
                return true;
            }
            for (let i = 1; i <= LingPoMaxCnt; i++) {
                if (this.getIconHint(id, i)) {
                    return true;
                }
            }
            return false;
        }

        public getHintByType(type: ShenLingType): boolean {
            let list = this.getShowTypeCfgList(type);
            if (!list || !list.length) {
                return false;
            }
            for (let cfg of list) {
                if (cfg && this.getHintById(cfg.id)) {
                    return true;
                }
            }
            return false;
        }

        public canShowMdr(): boolean {
            let ary = this.getShowShenlingTypes();
            return ary && ary.length > 0;
        }

        public getShowShenlingTypes(): ShenLingType[] {
            let proxy: ShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            return proxy.getActedTypeList();
        }

        public updateHint(): void {
            if (!this.canShowMdr()) {
                return;
            }
            let hint = false;
            let types = this.getShowShenlingTypes();
            for (let type of types) {
                if (this.getHintByType(type)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath);
        }
    }
}