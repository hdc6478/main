namespace game.mod.shenling {

    import c2s_god_brother_lingqi_click = msg.c2s_god_brother_lingqi_click;
    import GameNT = base.GameNT;
    import s2c_god_brother_lingqi_info = msg.s2c_god_brother_lingqi_info;
    import god_brother_lingqi_datas = msg.god_brother_lingqi_datas;
    import ShenlingLingqiConfig = game.config.ShenlingLingqiConfig;
    import god_brother_lingqi_sturct = msg.god_brother_lingqi_sturct;
    import LanDef = game.localization.LanDef;
    import EquipmentConfig = game.config.EquipmentConfig;

    /**
     * @description 神灵灵器系统
     */
    export class ShenLingLingQiProxy extends ProxyBase {
        private _model: ShenLingLingQiModel;

        public get model(): ShenLingLingQiModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new ShenLingLingQiModel();
            this.onProto(s2c_god_brother_lingqi_info, this.s2c_god_brother_lingqi_info, this);
        }

        /**
         * @param button_type 1为指定激活/升星   2为一键激活/升星
         * @param bro_index 神灵index
         * @param index 灵器索引 1,2,3
         */
        public c2s_god_brother_lingqi_click(button_type: number, bro_index: number, index?: number): void {
            let msg = new c2s_god_brother_lingqi_click();
            msg.button_type = button_type;
            msg.bro_index = Long.fromNumber(bro_index);
            if (index) {
                msg.index = index;
            }
            this.sendProto(msg);
        }

        private s2c_god_brother_lingqi_info(n: GameNT): void {
            let msg = n.body as s2c_god_brother_lingqi_info;
            if (msg.all_datas != null) {
                for (let data of msg.all_datas) {
                    this._model.all_datas[data.bro_index.toNumber()] = data;
                }
            }
            this.updateHint();
            this.sendNt(ShenLingEvent.ON_SHEN_LING_LING_QI_UPDATE);
        }

        private _maxUpStarMap: { [index: number]: number } = {};

        public getMaxUpStar(slIndex: number): number {
            if (this._maxUpStarMap[slIndex]) {
                return this._maxUpStarMap[slIndex];
            }
            let cfgObj = this.getLingQiCfgObj(slIndex);
            if (!cfgObj) {
                return 0;
            }
            let keys = Object.keys(cfgObj);
            let cfg = cfgObj[+keys[keys.length - 1]];
            if (!cfg) {
                return 0;
            }
            this._maxUpStarMap[slIndex] = cfg.index;
            return cfg.index;
        }

        private _buffIdMap: { [index: number]: number } = {};

        public getBuffId(slIndex: number): number {
            if (this._buffIdMap[slIndex]) {
                return this._buffIdMap[slIndex];
            }
            let cfgObj = this.getLingQiCfgObj(slIndex);
            if (!cfgObj) {
                return 0;
            }
            let buffId = 0;
            let keys = Object.keys(cfgObj);
            for (let i = keys.length - 1; i >= 0; i--) {
                let cfg: ShenlingLingqiConfig = cfgObj[keys[i]];
                if (cfg && cfg.suit_buff) {
                    buffId = cfg.suit_buff[0];
                    break;
                }
            }
            this._buffIdMap[slIndex] = buffId;
            return buffId;
        }

        private _lingqiMap: { [index: number]: number[] } = {};

        //灵器index列表
        public getLingQiIdList(slIndex: number): number[] {
            if (this._lingqiMap[slIndex]) {
                return this._lingqiMap[slIndex];
            }
            let cfgObj = this.getLingQiCfgObj(slIndex);
            if (!cfgObj || !cfgObj[1]) {
                return null;
            }
            let cfg: ShenlingLingqiConfig = cfgObj[1];
            let ary: number[] = [];
            for (let cost of cfg.cost) {
                ary.push(cost[0]);
            }
            this._lingqiMap[slIndex] = ary;
            return ary;
        }

        //获取灵器索引，从1开始
        public getLingqiIdx(index: number): number {
            let equipCfg: EquipmentConfig = GameConfig.getEquipmentCfg(index);
            let slIndex = equipCfg.parm1 && equipCfg.parm1[0] || 0;
            if (!slIndex) {
                return 1;
            }
            let lingqiCfg = this.getLingQiCfg(slIndex, 1);
            if (!lingqiCfg) {
                return 1;
            }
            for (let i = 0; i < lingqiCfg.cost.length; i++) {
                let cost = lingqiCfg.cost[0];
                if (cost && cost[0] == index) {
                    return i + 1;
                }
            }
            return 1;
        }

        private _showErrorMap: { [key: number]: boolean } = {};

        public getLingQiCfgObj(slIndex: number): { [star: number]: ShenlingLingqiConfig } {
            let obj = getConfigByNameId(ConfigName.ShenlingLingqi, slIndex);
            if (!obj) {
                if (!this._showErrorMap[slIndex]) {
                    DEBUG && console.error(`shenling_lingqi.json 没有${slIndex}的配置`);
                    this._showErrorMap[slIndex] = true;
                }
                return null;
            }
            return obj;
        }

        public getLingQiCfg(slIndex: number, star: number): ShenlingLingqiConfig {
            let cfgObj = this.getLingQiCfgObj(slIndex);
            if (!cfgObj || !cfgObj[star]) {
                return null;
            }
            return cfgObj[star];
        }

        public getLingQiInfos(slIndex: number): god_brother_lingqi_sturct[] {
            let slInfo = this.model.all_datas[slIndex];
            if (slInfo && slInfo.list) {
                return slInfo.list;
            }
            return null;
        }

        /**
         * @param slIndex 神灵index
         * @param idx 灵器索引(1,2,3)
         */
        public getLingQiInfo(slIndex: number, idx: number): god_brother_lingqi_sturct {
            let slInfo = this.model.all_datas[slIndex];
            if (!slInfo || !slInfo.list) {
                return null;
            }
            for (let item of slInfo.list) {
                if (item && item.index == idx) {
                    return item;
                }
            }
            return null;
        }

        //系列战力
        public getPowerByType(type: ShenLingType): number {
            let shenlingProxy: ShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            let cfgList = shenlingProxy.getShenLingCfgListByType(type);
            let power = 0;
            for (let cfg of cfgList) {
                let singlePower = this.getPower(cfg.index);
                power += singlePower;
            }
            return power;
        }

        public getPower(slIndex: number): number {
            let info: god_brother_lingqi_datas = this._model.all_datas[slIndex];
            if (!info) {
                return 0;
            }
            let power = 0;
            if (info.suit_attrs && info.suit_attrs.showpower) {
                power += info.suit_attrs.showpower.toNumber();
            }

            if (info.list && info.list.length) {
                let isActed = this.isShenlingActed(slIndex);
                for (let item of info.list) {
                    if (!item) {
                        continue;
                    }
                    //神灵未激活前，读取基础属性，激活后读取封印属性
                    if (isActed) {
                        if (item.fengyin_attrs && item.fengyin_attrs.showpower) {
                            power += item.fengyin_attrs.showpower.toNumber();
                        }
                    } else {
                        if (item.base_attrs && item.base_attrs.showpower) {
                            power += item.base_attrs.showpower.toNumber();
                        }
                    }
                }
            }
            return power;
        }

        /**
         * @param slIndex 神灵index
         * @param idx 灵器索引 (1,2,3)
         */
        public isMaxUpStar(slIndex: number, idx: number): boolean {
            let maxUpStar = this.getMaxUpStar(slIndex);
            let info = this.getLingQiInfo(slIndex, idx);
            return info && info.star >= maxUpStar;
        }

        public canOneKey(slIndex: number): boolean {
            for (let i = 1; i <= 3; i++) {
                if (this.canActOrUp(slIndex, i)) {
                    return true;
                }
            }
            return false;
        }

        public getShenlingStar(slIndex: number): number {
            let proxy: ShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            let info = proxy.getInfoByIndex(slIndex);
            return info ? info.star : 0;
        }

        public isShenlingActed(slIndex: number): boolean {
            let proxy: ShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            let info = proxy && proxy.getInfoByIndex(slIndex);
            return !!info;
        }

        //tips:激活/进阶条件不足，升星神灵可提高灵器进阶上限
        public canActOrUp(slIndex: number, idx: number, isTips = false): boolean {
            if (this.isMaxUpStar(slIndex, idx)) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.lingqi_tips8));
                }
                return false;
            }
            let info = this.getLingQiInfo(slIndex, idx);
            let curStar = info ? info.star : 0;
            let nextCfg = this.getLingQiCfg(slIndex, curStar + 1);
            if (!nextCfg) {
                return false;
            }
            let shenlingStar = this.getShenlingStar(slIndex);
            if (shenlingStar < nextCfg.lmt_star) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.lingqi_tips9));
                }
                return false;
            }
            let cost = nextCfg.cost[idx - 1];
            if (!BagUtil.checkPropCnt(cost[0], cost[1])) {
                if (isTips) {
                    let txt = getLanById(curStar == 0 ? LanDef.active : LanDef.rank_up);
                    PromptBox.getIns().show(StringUtil.substitute(getLanById(LanDef.lingqi_tips10), [txt]));
                }
                return false;
            }
            return true;
        }

        //只有存在一个灵器激活即可
        public haveOneLqActed(slIndex: number): boolean {
            let info = this.getLingQiInfos(slIndex);
            return !!(info && info.length);
        }

        //此神灵的最大星级套装buff属性是否激活
        public isActedSuit(slIndex: number): boolean {
            let cfgObj = this.getLingQiCfgObj(slIndex);
            let keys = Object.keys(cfgObj);
            for (let i = keys.length - 1; i >= 0; i--) {
                let cfg = cfgObj[+keys[i]];
                if (!cfg) {
                    continue;
                }
                if (cfg.suit_buff) {
                    return this.isStarAllActed(slIndex, cfg.index);
                }
            }
            return false;
        }

        public getLingQiActedCnt(slIndex: number, star: number): number {
            let info = this.getLingQiInfos(slIndex) || [];
            let cnt = 0;
            for (let item of info) {
                if (item && item.star >= star) {
                    cnt++;
                }
            }
            return cnt;
        }

        //三个灵器都达到star星级否
        public isStarAllActed(slIndex: number, star: number): boolean {
            let actedCnt = this.getLingQiActedCnt(slIndex, star);
            let idList = this.getLingQiIdList(slIndex) || [];
            return actedCnt >= idList.length;
        }

        public getHintByIndex(slIndex: number): boolean {
            return this.canOneKey(slIndex);
        }

        public getHintByType(type: ShenLingType): boolean {
            let proxy: ShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            let cfgList = proxy.getShenLingCfgListByType(type);
            for (let cfg of cfgList) {
                if (cfg && this.getHintByIndex(cfg.index)) {
                    return true;
                }
            }
            return false;
        }

        protected onBagUpdateByBagType(n: GameNT): void {
            let bagTypes = n.body as number[];
            if (bagTypes.indexOf(BagType.ShenlingEquip) > -1) {
                this.updateHint();
            }
        }

        public updateHint(): void {
            let hint = false;
            for (let type of ShenLingTypeAry) {
                if (this.getHintByType(type)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath);
        }
    }
}