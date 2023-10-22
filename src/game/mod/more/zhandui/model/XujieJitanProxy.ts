namespace game.mod.more {

    import GameNT = base.GameNT;
    import s2c_zhandui_jitan_base_info = msg.s2c_zhandui_jitan_base_info;
    import ZhanduiJitanLibaoConfig = game.config.ZhanduiJitanLibaoConfig;
    import zhandui_jitan_struct = msg.zhandui_jitan_struct;
    import ZhanduiJitanHuanhuaConfig = game.config.ZhanduiJitanHuanhuaConfig;
    import zhandui_jitan_huanhua_struct = msg.zhandui_jitan_huanhua_struct;
    import s2c_zhandui_jitan_gongfeng_info = msg.s2c_zhandui_jitan_gongfeng_info;
    import TimeMgr = base.TimeMgr;
    import ZhanduiJitanDengjiConfig = game.config.ZhanduiJitanDengjiConfig;
    import c2s_zhandui_button_click = msg.c2s_zhandui_button_click;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    /**
     * @description 墟界祭坛系统
     */
    export class XujieJitanProxy extends ProxyBase {
        private _model: XujieJitanModel;

        initialize(): void {
            super.initialize();
            this._model = new XujieJitanModel();
            this.onProto(s2c_zhandui_jitan_base_info, this.s2c_zhandui_jitan_base_info, this);
            this.onProto(s2c_zhandui_jitan_gongfeng_info, this.s2c_zhandui_jitan_gongfeng_info, this);
            facade.onNt(ConsecrateEvent.ON_UPDATE_AMASS_INFO, this.updateLingbaoHint, this);
        }

        //退出战队
        public onExitZhanduiTeam(): void {
            if (this._model) {
                this._model.exitTeam();
            }
        }

        /**
         * 200 供奉道具和一键放入
         * 201回收道具
         * 202道具加速
         * 203领取道具供奉奖励
         * 204幻化激活升级
         * 205使用幻化
         * 206领取等级礼包
         * 207请求战队祭坛供奉信息
         * @param type
         * @param index 206领取等级礼包
         * @param use_id (204幻化激活升级 205使用幻化传0表示卸下)
         * @param idxs 放入供奉id的列表(200供奉道具和一键放入)
         * @param oper 202战队祭坛供奉加速：1表示单个加速，2表示全部加速   203领取道具供奉奖励1单个领取 2全部领取
         * @param pos 201回收道具的位置  203领取道具的位置
         */
        public sendJitanButtonClick(type: ZhanduiOperType, index?: number, use_id?: number, idxs?: number[], oper?: number, pos?: number): void {
            let msg = new c2s_zhandui_button_click();
            msg.button_type = type;
            if (index != null) {
                msg.index = index;
            }
            if (use_id != null) {
                msg.use_id = Long.fromValue(use_id);
            }
            if (idxs != null) {
                let longIdxs: Long[] = [];
                for (let idx of idxs) {
                    longIdxs.push(Long.fromValue(idx));
                }
                msg.idxs = longIdxs;
            }
            if (oper != null) {
                msg.oper = oper;
            }
            if (pos != null) {
                msg.pos = pos;
            }
            this.sendProto(msg);
        }

        private s2c_zhandui_jitan_base_info(n: GameNT): void {
            let msg = n.body as s2c_zhandui_jitan_base_info;
            if (msg.value != null) {
                this._model.value = msg.value;
            }
            if (msg.now_use_id != null) {
                this._model.now_use_id = msg.now_use_id;
            }
            if (msg.index_get_list != null) {
                this._model.index_get_list = msg.index_get_list;
            }
            if (msg.jitan_level != null) {
                this._model.jitan_level = msg.jitan_level;
            }
            if (msg.ids != null) {
                for (let item of msg.ids) {
                    this._model.ids[item.id.toNumber()] = item;
                }
            }
            if (msg.shuijin_value != null) {
                this._model.shuijin_value = msg.shuijin_value;
            }
            this.updateJitanHint();
            this.sendNt(MoreEvent.ON_UPDATE_ZHANDUI_JITAN_BASE_INFO);
        }

        private s2c_zhandui_jitan_gongfeng_info(n: GameNT): void {
            let msg = n.body as s2c_zhandui_jitan_gongfeng_info;
            this._model.prop_list = msg.prop_list != null ? msg.prop_list : [];
            this._model.total_speed_time = msg.total_speed_time != null ? msg.total_speed_time : null;
            RoleVo.ins.setValueByKey(RolePropertyKey.zhandui_jitan_total_speed_time, this.total_speed_time);//设置到角色身上，用于mdr顶部道具变化
            this.updateJitanHint();
            this.sendNt(MoreEvent.ON_UPDATE_ZHANDUI_JITAN_GONGFENG_INFO);
        }

        /**================================ 协议end ================================*/

        //todo 待处理
        public getGainId(): number {
            return 1453502001;
        }

        //礼包是否已领取
        public isGiftReceived(idx: number): boolean {
            return this._model.index_get_list.indexOf(idx) > -1;
        }

        //礼包配置
        public getGiftConfig(idx: number): ZhanduiJitanLibaoConfig {
            return getConfigByNameId(ConfigName.ZhanduiJitanLibao, idx);
        }

        //礼包可否领取
        public canReceiveGift(idx: number): boolean {
            if (this.isGiftReceived(idx)) {
                return false;
            }
            let cfg = this.getGiftConfig(idx);
            if (!cfg) {
                return false;
            }
            let needLv = cfg.level;
            let curLv = this.jitan_level;
            return curLv >= needLv;
        }

        //祭坛等级
        public get jitan_level(): number {
            return this._model.jitan_level;
        }

        //战队拥有的能源石
        public get value(): number {
            return this._model.value && this._model.value.toNumber() || 0;
        }

        //战队拥有的水晶数量
        public get shuijin_value(): number {
            return this._model.shuijin_value && this._model.shuijin_value.toNumber() || 0;
        }

        //供奉数据
        public get prop_list(): zhandui_jitan_struct[] {
            return this._model.prop_list || [];
        }

        //累计加速时间
        public get total_speed_time(): number {
            return this._model.total_speed_time ? this._model.total_speed_time.toNumber() : 0;
        }

        //当前使用的幻化id
        public get now_use_id(): number {
            return this._model.now_use_id ? this._model.now_use_id.toNumber() : 0;
        }

        //获取展示模型配置
        public getHuanhuaCfg(index?: number): ZhanduiJitanHuanhuaConfig {
            if (index) {
                return getConfigByNameId(ConfigName.ZhanduiJitanHuanhua, index);
            }
            let curIndex = this._model.now_use_id;
            if (curIndex && curIndex.notEquals(Long.ZERO)) {
                return getConfigByNameId(ConfigName.ZhanduiJitanHuanhua, curIndex.toNumber());
            }
            let list: ZhanduiJitanHuanhuaConfig[] = getConfigListByName(ConfigName.ZhanduiJitanHuanhua);
            return list[0];
        }

        //是否激活
        public isHuanhuaActed(index: number): boolean {
            let item = this._model.ids[index];
            return item && item.star > 0;
        }

        //幻化信息
        public getHuanhuaInfo(index: number): zhandui_jitan_huanhua_struct {
            return this._model.ids[index];
        }

        //最大幻化星级
        public isMaxHuanhuaStar(index: number): boolean {
            let info = this.getHuanhuaInfo(index);
            let star = info && info.star || 0;
            let cfg = this.getHuanhuaCfg(index);
            if (!cfg || !cfg.costs) {
                return false;
            }
            let maxStar = cfg.costs.length;
            return star >= maxStar;
        }

        //幻化，能否激活或升星
        public canActOrUpstar(index: number, isTips = false): boolean {
            //队长判断
            let zhanduiPorxy: ZhanduiProxy = getProxy(ModName.More, ProxyType.Zhandui);
            if (zhanduiPorxy && !zhanduiPorxy.isCaption()) {
                //仅队长可操作点击激活和升星
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.zhandui_tips10));
                }
                return false;
            }

            //星级判断
            let info = this.getHuanhuaInfo(index);
            let star = info && info.star || 0;
            let huanhuaCfg = this.getHuanhuaCfg(index);
            let maxStar = huanhuaCfg.costs.length;
            if (star >= maxStar) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.lingqi_tips8));
                }
                return false;
            }

            //消耗判断
            let cost = huanhuaCfg.costs[star];
            let costCnt = cost[1];//升星所需值
            let curCnt = this.shuijin_value;//战队拥有的水晶数量
            if (curCnt < costCnt) {
                if (isTips) {
                    ViewMgr.getIns().showGainWaysTips(cost[0]);
                }
                return false;
            }
            return curCnt >= costCnt;
        }

        //是否祭坛等级满级
        public isMaxLv(): boolean {
            let lv = this.jitan_level;
            let maxLv = this.getMaxLv();
            return lv >= maxLv;
        }

        //最大祭坛等级
        public getMaxLv(): number {
            let cfgs: ZhanduiJitanDengjiConfig[] = getConfigListByName(ConfigName.ZhanduiJitanDengji);
            return cfgs && cfgs.length || 0;
        }

        //等级配置，
        public getLvConfig(lv?: number): ZhanduiJitanDengjiConfig {
            if (lv == null) {
                lv = this.jitan_level + 1;
            }
            return getConfigByNameId(ConfigName.ZhanduiJitanDengji, lv);
        }

        //祭坛等级提升
        public canUpstar(isTips = false): boolean {
            let nextCfg: ZhanduiJitanDengjiConfig = this.getLvConfig();
            if (!nextCfg) {
                if (isTips) {
                    PromptBox.getIns().show(`当前祭主已满星`);
                }
                return false;
            }

            //消耗判断
            let costCnt = nextCfg.cost[1];//当次提升所需值
            let curCnt = this.value;//战队拥有的能源石
            if (curCnt < costCnt) {
                if (isTips) {
                    ViewMgr.getIns().showGainWaysTips(nextCfg.cost[0]);
                }
                return false;
            }
            return curCnt >= costCnt;
        }

        //获取空格数量
        public getSpaceCount(): number {
            let listCnt = this.prop_list.length;
            return XujieJitanSacrificeCnt - listCnt;
        }

        //有正在献祭的道具否
        public getSacrificeInfo(): zhandui_jitan_struct {
            if (!this.prop_list || !this.prop_list.length) {
                return null;
            }
            let curTime = TimeMgr.time.serverTimeSecond;
            for (let item of this.prop_list) {
                if (item && item.endtime.toNumber() > curTime) {
                    return item;
                }
            }
            return null;
        }

        //9类型背包数据，1为加速道具，2为献祭道具
        public getBagDatas(subType: number = 2): PropData[] {
            let datas = BagUtil.getBagsByType(BagType.XujieJitan) || [];
            // let rst: PropData[] = [];
            // for (let item of datas) {
            //     if (item.propSubType == subType) {
            //         rst.push(item);
            //     }
            // }
            // return rst;
            return datas.filter((a) => a.propSubType == subType);
        }

        //献祭完毕所有，所需时间
        public getTotalPropTime(): number {
            let propList = this.prop_list;
            if (!propList || !propList.length) {
                return 0;
            }
            let rst = 0;
            // for (let prop of propList) {
            //     if (!prop) {
            //         continue;
            //     }
            //     let endTime = prop.endtime.toNumber();
            //     let disTime = Math.max(0, endTime - TimeMgr.time.serverTimeSecond);
            //     rst += disTime;
            // }
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

        //礼包红点
        public getLibaoHint(): boolean {
            let curLv = this.jitan_level;
            let cfgs: ZhanduiJitanLibaoConfig[] = getConfigListByName(ConfigName.ZhanduiJitanLibao);
            let receivedList = this._model.index_get_list || [];
            if (receivedList.length >= cfgs.length) {
                return false;
            }
            for (let cfg of cfgs) {
                if (receivedList.indexOf(cfg.index) > -1) {
                    continue;
                }
                if (curLv >= cfg.level) {
                    return true;
                }
            }
            return false;
        }

        //幻化红点
        public getHuanhuaHint(): boolean {
            let cfgs: ZhanduiJitanHuanhuaConfig[] = getConfigListByName(ConfigName.ZhanduiJitanHuanhua);
            for (let cfg of cfgs) {
                if (this.canActOrUpstar(cfg.index)) {
                    return true;
                }
            }
            return false;
        }

        //献祭红点
        public getSacrificeHint(): boolean {
            let propList = this.prop_list;
            let curTime = TimeMgr.time.serverTimeSecond;
            for (let item of propList) {
                if (!item) {
                    continue;
                }
                let endTime = item.endtime.toNumber();
                if (endTime && curTime >= endTime) {
                    return true;//领取奖励红点
                }
            }
            let spaceCnt = this.getSpaceCount();
            if (spaceCnt <= 0) {
                return false;
            }
            //背包有道具时候，可献祭红点
            let bagDatas = this.getBagDatas();
            return bagDatas && bagDatas.length > 0;
        }

        //祭坛红点
        private updateJitanHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XujieJitan)) {
                return;
            }
            let hint = this.getLibaoHint() || this.getHuanhuaHint() || this.getSacrificeHint();
            HintMgr.setHint(hint, this._model.jitanHintPath);
        }

        //灵宝红点
        private updateLingbaoHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XujieJitan)) {
                return;
            }
            let classId = AmassClassId.Amass3;
            let proxy: IConsecrateProxy = getProxy(ModName.Consecrate, ProxyType.Consecrate);
            let types = proxy.getAmassTypes(classId) || [];
            for (let i = 0; i < types.length; i++) {
                let type = types[i];
                let hint = proxy.canAmassTypeUp(classId, type);
                HintMgr.setHint(hint, this._model.lingbaoHintPaths[i + 1]);
            }
        }

        protected onBagUpdateByBagType(n: GameNT) {
            let types = n.body as number[];
            if (types.indexOf(BagType.XujieJitan) > -1) {
                this.updateJitanHint();
            }
        }

        protected onBagUpdateByPropType(n: base.GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(PropType.ZhanduiLingbao) > -1) {
                this.updateLingbaoHint();
            }
        }
    }
}