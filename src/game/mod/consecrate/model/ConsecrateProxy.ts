namespace game.mod.consecrate {


    import c2s_consecrate_putin = msg.c2s_consecrate_putin;
    import c2s_consecrate_speedup = msg.c2s_consecrate_speedup;
    import c2s_consecrate_get = msg.c2s_consecrate_get;
    import c2s_consecrate_draw = msg.c2s_consecrate_draw;
    import c2s_consecrate_info = msg.c2s_consecrate_info;
    import GameNT = base.GameNT;
    import s2c_consecrate_draw = msg.s2c_consecrate_draw;
    import s2c_consecrate_info = msg.s2c_consecrate_info;
    import c2s_consecrate_get_back = msg.c2s_consecrate_get_back;
    import consecrate_infos = msg.consecrate_infos;
    import c2s_amass_advance = msg.c2s_amass_advance;
    import s2c_amass_info = msg.s2c_amass_info;
    import amass_item = msg.amass_item;
    import AmassConfig = game.config.AmassConfig;
    import ParamConfig = game.config.ParamConfig;
    import AmassSuitConfig = game.config.AmassSuitConfig;

    export class ConsecrateProxy extends ProxyBase implements IConsecrateProxy {
        private _model: ConsecrateModel;

        public get model() {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new ConsecrateModel();

            this.onProto(s2c_consecrate_draw, this.s2c_consecrate_draw, this);
            this.onProto(s2c_consecrate_info, this.s2c_consecrate_info, this);

            this.onProto(s2c_amass_info, this.s2c_amass_info, this);
        }

        /**--------------------协议start-------------------- */

        /**
         * 放入封魂
         * @param prop_id
         * @param pos 0则一键放入
         * */
        public c2s_consecrate_putin(prop_id: number[]): void {
            let msg: c2s_consecrate_putin = new c2s_consecrate_putin();
            msg.prop_id = prop_id;
            this.sendProto(msg);
        }

        /**卸下 */
        public c2s_consecrate_get_back(pos: number): void {
            let msg: c2s_consecrate_get_back = new c2s_consecrate_get_back();
            msg.pos = pos;
            this.sendProto(msg);
        }

        /**
         * 加速封魂
         * @param oper 1为单个加速 2为全部加速
         * @param pos oper为1时需要传位置
         * */
        public c2s_consecrate_speedup(oper: number, pos?: number): void {
            let msg: c2s_consecrate_speedup = new c2s_consecrate_speedup();
            msg.oper = oper;
            msg.pos = pos;
            this.sendProto(msg);
        }

        /**领取宝箱 */
        public c2s_consecrate_get(oper: number, pos?: number): void {
            let msg: c2s_consecrate_get = new c2s_consecrate_get();
            msg.oper = oper;
            msg.pos = pos;
            this.sendProto(msg);
        }

        /**封魔珍宝(抽奖) */
        public c2s_consecrate_draw(): void {
            let msg: c2s_consecrate_draw = new c2s_consecrate_draw();
            this.sendProto(msg);
        }

        /**打开界面请求 */
        public c2s_consecrate_info(): void {
            let msg: c2s_consecrate_info = new c2s_consecrate_info();
            this.sendProto(msg);
        }

        /**抽奖返回 */
        private s2c_consecrate_draw(n: GameNT): void {
            let msg: s2c_consecrate_draw = n.body;
            this.sendNt(ConsecrateEvent.ON_TWEEN_CONSECRATE_OPEN, msg.index);
        }

        private s2c_consecrate_info(n: GameNT): void {
            let msg: s2c_consecrate_info = n.body;
            this._model.list = msg.list || [];
            this._model.storage_time = msg.storage_time || 0;
            RoleVo.ins.setValueByKey(RolePropertyKey.storage_time, this._model.storage_time);
            this.onUpdateHintSealDevil();
            this.sendNt(ConsecrateEvent.ON_UPDATE_CONSECRATE_INFO);
        }

        /**--------------------协议end-------------------- */

        /**是否有可领奖励 */
        public getIsReward(): boolean {
            if (!this._model.list) {
                return false;
            }
            for (let info of this._model.list) {
                if (info.state == 3) {
                    return true;
                }
            }
            return false;
        }

        /**正在封印的道具 */
        public getDoingInfo(): consecrate_infos {
            if (this._model.list) {
                for (let info of this._model.list) {
                    if (info.state == 1) {
                        return info;
                    }
                }
            }
            return null;
        }

        /**正在计算时间的道具 */
        public getEndTime(): number {
            let info = this.getDoingInfo();
            if (info) {
                let cfg = GameConfig.getPropConfigById(info.prop_id);
                let seconds: number = cfg.param1[0][0];
                return info.begin_time + seconds;
            }
            return 0;
        }

        /**根据位置获取数据 */
        public getInfoByPos(pos: number): consecrate_infos {
            if (this._model.list) {
                for (let info of this._model.list) {
                    if (info.pos == pos) {
                        return info;
                    }
                }
            }
            return null;
        }

        /**上架魔魂的总时间 显示需要减去当前封印已经过去的时间 */
        public getListSpeedUpTime(): number {
            if (!this._model.list) {
                return 0;
            }
            let time: number = 0;
            for (let info of this._model.list) {
                if (info.state == 3) {
                    continue;
                }
                let prop: PropData = PropData.create(info.prop_id);
                let seconds: number = prop.cfg.param1[0][0] || 0;
                time += seconds;
            }
            return time;
        }


        /**获取空格数量 */
        public getSpaceCount(): number {
            let num = this.getConsecrateCount();
            return this._model.num - num;
        }

        /**已经供奉的数量 */
        public getConsecrateCount(): number {
            return this._model.list && this._model.list.length || 0;
        }

        /**
         * 上架弹窗显示列表
         * type=1时间加速道具 param1 秒
         * type=2魔魂道具 param1 秒,积分,掉落id1_掉落id2
         * */
        public getPropList(type: number = 2): PropData[] {
            let propArr = BagUtil.getBagsByTypeAndPropType(BagType.Material, PropType.Consecrate);
            let list: PropData[] = [];
            for (let prop of propArr) {
                if (Math.floor(prop.index % 10000 / 1000) == type) {
                    list.push(prop);
                }
            }
            return list.sort(this.sortByQuality);
        }

        private sortByQuality(a: PropData, b: PropData): number {
            // todo 策划要求写死
            if (a.index == 1451202024 || a.index == 1451202029) {
                return -1;
            }
            if (b.index == 1451202024 || b.index == 1451202029) {
                return 1;
            }
            if (a.quality != b.quality) {
                return b.quality - a.quality;
            }
            return a.index - b.index;
        }

        protected onRoleUpdate(n: GameNT): void {
            let keys: string[] = n.body;
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "gongfeng_lottery");
            if (keys.indexOf(PropIndexToKey[cfg.value[0]]) > -1) {
                this.onUpdateHintSealDevil();
            }
        }

        protected onBagUpdateByBagType(n: GameNT): void {
            let bagTypes = n.body as number[];
            if (bagTypes.indexOf(BagType.Material) > -1) {
                this.onUpdateHintSealDevil();
            }
        }

        /**是否有空格且背包有道具使用 */
        public checkIsUse(): boolean {
            let cnt: number = this.getSpaceCount();
            if (!cnt) {
                return false;
            }
            let list: PropData[] = this.getPropList();
            if (list && list.length) {
                return true;
            }
            return false;
        }

        /**封魔红点 */
        private onUpdateHintSealDevil(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Consecrate)) {
                return;
            }
            let root: string[] = [ModName.Consecrate, ConsecrateViewType.Consecrate, MdrTabBtnType.TabBtnType01];
            let ing = this.getDoingInfo();
            let use: boolean = this.checkIsUse();
            let reward: boolean = this.getIsReward();
            let speedup: boolean = this._model.storage_time > 0 && !!ing;
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "gongfeng_lottery");
            let lottery: boolean = BagUtil.checkPropCnt(cfg.value[0], cfg.value[1]);
            let bool: boolean = use || reward || speedup || lottery;
            HintMgr.setHint(bool, root, OpenIdx.Consecrate)
        }

        /**--------------------异兽奇记start-------------------- */
        public c2s_amass_advance(classId: number, type: number, index: number): void {
            let msg: c2s_amass_advance = new c2s_amass_advance();
            msg.class_id = classId;
            msg.type = type;
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_amass_info(n: GameNT): void {
            let msg: s2c_amass_info = n.body;
            if (!msg || !msg.list) {
                return;
            }
            if (!this._model.amassList) {
                this._model.amassList = msg.list;
            } else {
                for (let info of msg.list) {
                    let pos = this.getInfoPos(info.index);
                    if (pos >= 0) {
                        this._model.amassList[pos] = info;
                    } else {
                        this._model.amassList.push(info);
                    }
                }
            }
            this.updateAmassHint();
            this.sendNt(ConsecrateEvent.ON_UPDATE_AMASS_INFO);
        }

        private getInfoPos(index: number): number {
            if (!this._model.amassList || !this._model.amassList.length) {
                return -1;
            }
            let len = this._model.amassList.length;
            for (let i = 0; i < len; ++i) {
                let info = this._model.amassList[i];
                if (info.index == index) {
                    return i;
                }
            }
            return -1;
        }

        private getAmassInfo(index: number): amass_item {
            let pos = this.getInfoPos(index);
            if (pos >= 0) {
                return this._model.amassList[pos];
            }
            return null;
        }

        public getAmassLv(index: number): number {
            let info = this.getAmassInfo(index);
            return info && info.star || 0;
        }

        private initAmassCfg(): void {
            if (this._model.amassCfgList) {
                return;
            }
            this._model.amassCfgList = {};
            this._model.amassCfg = {};

            let classId = 1;
            while (classId) {
                let cfgList: object = getConfigByNameId(ConfigName.Amass, classId);
                if (!cfgList) {
                    classId = 0;
                } else {
                    for (let k in cfgList) {
                        let cfg: AmassConfig = cfgList[k];
                        this._model.amassCfg[cfg.index] = cfg;//图鉴配置
                        if (!this._model.amassCfgList[classId]) {
                            this._model.amassCfgList[classId] = {};
                        }
                        if (!this._model.amassCfgList[classId][cfg.type]) {
                            this._model.amassCfgList[classId][cfg.type] = [];
                        }
                        this._model.amassCfgList[classId][cfg.type].push(cfg.index);
                    }
                    classId++;
                }
            }
        }

        public getAmassTypes(classId: number): number[] {
            this.initAmassCfg();

            let types: number[] = [];
            let info = this._model.amassCfgList[classId];
            for (let k in info) {
                let type = parseInt(k);
                let cfg: AmassSuitConfig = getConfigByNameId(ConfigName.AmassSuit, type);
                if(!cfg.show && !this.canAmassTypeUp(classId, type) && !this.getAmassActNum(classId, type)){
                    //配置默认不显示时，可升级已激活的时候才显示
                    continue;
                }
                types.push(type);
            }
            return types;
        }

        public getAmassIndexList(classId: number, type: number): number[] {
            this.initAmassCfg();
            return this._model.amassCfgList[classId][type];
        }

        public getAmassCfg(index: number): AmassConfig {
            this.initAmassCfg();
            return this._model.amassCfg[index];
        }

        public getAmassActNum(classId: number, type: number): number {
            let cnt = 0;
            let indexList = this.getAmassIndexList(classId, type);
            for (let index of indexList) {
                let lv = this.getAmassLv(index);
                if (lv > 0) {
                    cnt++;
                }
            }
            return cnt;
        }

        public canAmassItemUp(index: number): boolean {
            let cfg = this.getAmassCfg(index);
            let lv = this.getAmassLv(index);
            let maxLv = cfg.cost_num.length;
            let isMax = lv >= maxLv;//已满级
            if (isMax) {
                return false;
            }
            let costCnt = cfg.cost_num[lv];//升级消耗
            return BagUtil.checkPropCnt(index, costCnt);
        }

        public canAmassTypeUp(classId: number, type: number): boolean {
            let indexList = this.getAmassIndexList(classId, type);
            for (let index of indexList) {
                if (this.canAmassItemUp(index)) {
                    return true;
                }
            }
            return false;
        }

        public canAmassClassIdUp(classId: number): boolean {
            let types = this.getAmassTypes(classId);
            for (let i = 0; i < types.length; ++i) {
                let type = types[i];
                if (this.canAmassTypeUp(classId, type)) {
                    return true;
                }
            }
            return false;
        }

        /**更新红点*/
        private updateAmassHint(): void {
            this.setAmassHint(OpenIdx.Amass, AmassClassId.Amass, [ModName.Consecrate, ConsecrateViewType.Consecrate, MdrTabBtnType.TabBtnType02]);
            this.setAmassHint(OpenIdx.Amass2, AmassClassId.Amass2, [ModName.Consecrate, ConsecrateViewType.Consecrate, MdrTabBtnType.TabBtnType03])
        }

        private setAmassHint(openIdx: number, classId: number, hintType: string[]): void {
            if (!ViewMgr.getIns().checkViewOpen(openIdx)) {
                return;
            }
            let hint = this.canAmassClassIdUp(classId);
            HintMgr.setHint(hint, hintType);
        }

        /**--------------------异兽奇记end-------------------- */

        protected onBagUpdateByPropType(n: base.GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(PropType.Amass) < 0) {
                return;
            }
            this.updateAmassHint();
        }
    }
}