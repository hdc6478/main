namespace game.mod.xianyuan {

    import c2s_ring_uplv = msg.c2s_ring_uplv;
    import c2s_ring_upstar = msg.c2s_ring_upstar;
    import s2c_ring_info = msg.s2c_ring_info;
    import c2s_ring_huanhua = msg.c2s_ring_huanhua;
    import ring_item = msg.ring_item;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import RingConfig = game.config.RingConfig;
    import ring_struct = msg.ring_struct;
    import RingDengjiConfig = game.config.RingDengjiConfig;
    import c2s_ring_act_libao = msg.c2s_ring_act_libao;
    import c2s_ring_get_reward = msg.c2s_ring_get_reward;

    /**
     * @description 仙侣-仙戒系统
     */
    export class RingProxy extends ProxyBase implements IRingProxy {
        private _model: RingModel;
        /**初始升级index*/
        public defaultIndex = 604000001;
        private _login = true;

        initialize(): void {
            super.initialize();
            this._model = new RingModel();
            this.onProto(s2c_ring_info, this.s2c_ring_info, this);
        }

        // 升级类型 1单点，2一键
        public c2s_ring_uplv(type: number): void {
            let msg = new c2s_ring_uplv();
            msg.type = type;
            this.sendProto(msg);
        }

        // 升星
        public c2s_ring_upstar(index: number): void {
            let msg = new c2s_ring_upstar();
            msg.index = index;
            this.sendProto(msg);
        }

        // 幻化
        public c2s_ring_huanhua(index: number): void {
            let msg = new c2s_ring_huanhua();
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_ring_info(n: GameNT): void {
            let msg = n.body as s2c_ring_info;
            if (msg.ring_struct != null) {
                this._model.ring_struct = msg.ring_struct;
            }
            if (msg.ring_list != null) {
                if (!this._login) {
                    for (let item of msg.ring_list) {
                        let oldInfo = this.getInfo(item.ring_index);
                        if (!oldInfo && item && item.star == 1) {
                            ViewMgr.getIns().showSurfaceTips(item.ring_index);
                        }
                    }
                }
                for (let item of msg.ring_list) {
                    this._model.ring_list[item.ring_index] = item;
                }
                this._login = false;
            }
            if (msg.ring_act_libao != null) {
                this._model.ring_act_libao = msg.ring_act_libao;
            }
            if (msg.is_get_class_reward != null) {
                this._model.is_get_class_reward = msg.is_get_class_reward;
            }
            this.updateHint();
            this.sendNt(XianyuanEvent.ON_UPDATE_RING_INFO);
        }

        // 领取激活礼包
        public c2s_ring_act_libao(index: number): void {
            let msg = new c2s_ring_act_libao();
            msg.index = index;
            this.sendProto(msg);
        }

        /// 领取2阶奖励
        public c2s_ring_get_reward(): void {
            this.sendProto(new c2s_ring_get_reward());
        }

        /**=========================协议end*/

        public isGetReward(index: number): boolean {
            let list = this._model.ring_act_libao;
            return list.indexOf(index) > -1;
        }

        public canGetReward(index: number): boolean {
            let list = this._model.ring_act_libao;
            if (list.indexOf(index) > -1) {
                return false;
            }
            let info = this.getInfo(index);
            return info && info.star >= 1;
        }

        public getInfo(index: number): ring_item {
            return this._model.ring_list[index];
        }

        public isActed(index: number): boolean {
            let info = this.getInfo(index);
            return info && info.star > 0;
        }

        public isHuanhua(index: number): boolean {
            let idx = this.getHuanhuaIndex();
            return idx == index;
        }

        public canShowHuanhua(index: number): boolean {
            if (!this.isActed(index)) {
                return false;
            }
            let idx = this.getHuanhuaIndex();
            return idx != index;
        }

        public isMaxStar(index: number): boolean {
            let info = this.getInfo(index);
            let star = info ? info.star : 0;
            let maxStar = this.getMaxStar(index);
            return star >= maxStar;
        }

        private _cfgMap: { [type: number]: RingConfig[] } = {};

        public getCfgListByType(type: number): RingConfig[] {
            if (this._cfgMap[type]) {
                return this._cfgMap[type];
            }
            let cfgList: RingConfig[] = getConfigListByName(ConfigName.Ring);
            for (let cfg of cfgList) {
                if (!cfg || !cfg.show) {
                    continue;
                }
                if (!this._cfgMap[cfg.type]) {
                    this._cfgMap[cfg.type] = [];
                }
                this._cfgMap[cfg.type].push(cfg);
            }
            return this._cfgMap[type];
        }

        public getConfig(index: number): RingConfig {
            return getConfigByNameId(ConfigName.Ring, index);
        }

        public getMaxStar(index: number): number {
            let cfg = this.getConfig(index);
            return cfg ? cfg.material.length : 0;
        }

        public getStar(index: number): number {
            let info = this.getInfo(index);
            return info && info.star || 0;
        }

        public getUpstarCost(index: number): number[] {
            let star = this.getStar(index);
            let cfg = this.getConfig(index);
            if (!cfg || !cfg.material) {
                return null;
            }
            return cfg.material[star];
        }

        public getUplvInfo(): ring_struct {
            return this._model.ring_struct;
        }

        //当前进阶等级
        public getStage(): number {
            let info = this.getUplvInfo();
            return info ? info.level : 0;
        }

        public getStagePerLv(): number {
            return 10;
        }

        public getHuanhuaIndex(): number {
            let info = this._model.ring_struct;
            if (info && info.ring_index) {
                return info.ring_index;
            }
            return 0;
        }

        public getUplvIndex(): number {
            let index = this.getHuanhuaIndex();
            if (index) {
                return index;
            }
            return this.defaultIndex;
        }

        private _maxLv = 0;

        public getMaxLv(): number {
            if (this._maxLv) {
                return this._maxLv;
            }
            let cfgList = getConfigListByName(ConfigName.RingDengji);
            return this._maxLv = cfgList.length - 1;
        }

        public isMaxLv(): boolean {
            let info = this.getUplvInfo();
            let lv = info && info.level || 0;
            return lv >= this.getMaxLv();
        }

        public getLvConfig(lv: number): RingDengjiConfig {
            return getConfigByNameId(ConfigName.RingDengji, lv);
        }

        public getLvCost(lv: number): number[] {
            let cfg = this.getLvConfig(lv);
            return cfg ? cfg.consume : null;
        }

        public canUplv(isTips = false): boolean {
            if (this.isMaxLv()) {
                return false;
            }
            let lv = this.getStage();
            let cost = this.getLvCost(lv);
            return cost && BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        public canOnekey(isTips = false): boolean {
            return this.canUplv(isTips);
        }

        public canUpstar(index: number, isTips = false): boolean {
            if (this.isMaxStar(index)) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.maxstar));
                }
                return false;
            }
            let cost = this.getUpstarCost(index);
            if (!cost) {
                return false;
            }
            return BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        public getPower(): number {
            let map = this._model.ring_list;
            let power = 0;
            for (let key in map) {
                let item = map[key];
                if (item && item.attr && item.attr.showpower) {
                    power += item.attr.showpower.toNumber();
                }
            }
            return power;
        }

        //升星红点+激活礼包红点
        public getUpstarHintByIndex(index: number): boolean {
            return this.canUpstar(index) || this.canGetReward(index);
        }

        //进阶礼包红点
        public getGiftHint(): boolean {
            let giftProxy: IGiftProxy = getProxy(ModName.Gift, ProxyType.Gift);
            return this.canGetClassReward() || giftProxy.getHintByGiftType(GiftType.Ring);
        }

        //升级红点+礼包红点
        public getUplvHint(): boolean {
            return this.canUplv() || this.getGiftHint();
        }

        private updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XianlvRing)) {
                return;
            }
            let starHint = false;
            let cfgList: RingConfig[] = getConfigListByName(ConfigName.Ring);
            for (let cfg of cfgList) {
                if (cfg && cfg.show && this.getUpstarHintByIndex(cfg.index)) {
                    starHint = true;
                    break;
                }
            }
            HintMgr.setHint(starHint, this._model.hintPath[2]);

            HintMgr.setHint(this.getUplvHint(), this._model.hintPath[1]);
        }

        protected onBagUpdateByBagType(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(BagType.Material) > -1) {
                this.updateHint();
            }
        }

        //进阶豪礼的仙戒碎片id和数量
        public getGiftProp(): number[] {
            let cfg = GameConfig.getParamConfigById('xianlv_jinjiehaoli_gift');
            return cfg.value as number[];
        }

        //进阶豪礼需要达成的仙戒阶数
        public getGiftStage(): number {
            let cfg = GameConfig.getParamConfigById('xianlv_jinjiehaoli_target');
            return cfg.value;
        }

        //是否领取了开启奖励
        public get is_get_class_reward(): boolean {
            return this._model.is_get_class_reward;
        }

        //能否领取开启经历
        public canGetClassReward(): boolean {
            if (this.is_get_class_reward) {
                return false;
            }
            let stage = this.getStage();
            stage = SurfaceUtil.calcSurfaceStage(stage, ConfigHead.Ring);
            return stage >= this.getGiftStage();
        }

        //能否打开进阶礼包界面
        public canOpenGift(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XianlvRing)) {
                return false;
            }
            return !!this.is_get_class_reward;
        }
    }

}