namespace game.mod.bag {

    import GameNT = base.GameNT;
    import c2s_bag_props = msg.c2s_bag_props;
    import s2c_bag_update_prop_attr = msg.s2c_bag_update_prop_attr;
    import s2c_bag_props = msg.s2c_bag_props;
    import bag_props = msg.bag_props;
    import c2s_melt_equip = msg.c2s_melt_equip;
    import c2s_prop_one_key_resolve = msg.c2s_prop_one_key_resolve;
    import SynthesisTypeConfig = game.config.SynthesisTypeConfig;
    import prop_tips_data = msg.prop_tips_data;
    import c2s_prop_synthesis = msg.c2s_prop_synthesis;
    import s2c_prop_synthesis = msg.s2c_prop_synthesis;
    import SynthesisConfig = game.config.SynthesisConfig;
    import s2c_prop_tips = msg.s2c_prop_tips;
    import delayCall = base.delayCall;
    import clearDelay = base.clearDelay;
    import Handler = base.Handler;
    import c2s_prop_list_use = msg.c2s_prop_list_use;
    import prop_use = msg.prop_use;
    import s2c_melt_equip_coin = msg.s2c_melt_equip_coin;
    import s2c_melt_equip = msg.s2c_melt_equip;
    import facade = base.facade;
    import prop_attributes = msg.prop_attributes;
    import LanDef = game.localization.LanDef;
    import PropConfig = game.config.PropConfig;
    import s2c_first_get_prop_check_use = msg.s2c_first_get_prop_check_use;


    export class BagProxy extends ProxyBase implements IBagProxy {
        private _model: BagModel;
        private _delayProp: number;

        /**恭喜获得掉落*/

        initialize(): void {
            super.initialize();
            this._model = new BagModel();
            this.onProto(s2c_bag_props, this.s2c_bag_props, this);
            this.onProto(s2c_bag_update_prop_attr, this.s2c_bag_update_prop_attr, this);
            this.onProto(s2c_melt_equip, this.s2c_melt_equip, this);
            this.onProto(s2c_melt_equip_coin, this.s2c_melt_equip_coin, this);
            this.onProto(s2c_prop_synthesis, this.s2c_prop_synthesis, this);
            this.onProto(s2c_prop_tips, this.s2c_prop_tips, this);
            this.onProto(s2c_first_get_prop_check_use, this.s2c_first_get_prop_check_use, this);

            facade.onNt(EquipEvent.EQUIP_UPDATE_BACK, this.equipUpdateBack, this);
        }

        onStartReconnect(): void {
            this._model.composeCfgs = null;
            super.onStartReconnect();
        }

        //判断是否有某个 id(index)
        public isHasItem(itemId: number | string): boolean {
            if (this.theItemNumber(itemId) > 0) {
                return true;
            }
            return false;
        }

        //获取特定 id(index) 的数量
        public theItemNumber(itemId: number | string): number {
            let items: PropData[] = this._model.bagIndexs[itemId + ""];
            if (items && items.length > 0) {
                return items.length;
            }
            return 0;
        }

        //-------------------------------------背包-----------------------------------------
        /**前端请求背包信息*/
        public c2s_bag_props() {
            let msg: c2s_bag_props = new c2s_bag_props();
            this.sendProto(msg);
        }

        private s2c_bag_props(n: GameNT) {
            let msg: s2c_bag_props = n.body;
            if (!msg || !msg.all_bag) {
                return;
            }
            this.updateBag(msg.all_bag);
        }

        /**更新物品协议*/
        private s2c_bag_update_prop_attr(n: GameNT) {
            let msg: s2c_bag_update_prop_attr = n.body;
            if (!msg || !msg.all_data) {
                return;
            }
            this.updateBag(msg.all_data, true);
        }

        private updateBag(all_bag: bag_props[], isUpdate?: boolean): void {
            let bags = this._model.bags;
            let items = this._model.items;
            let bagIndexs = this._model.bagIndexs;

            let types: number[] = [];//道具类型，仅限道具表
            let bagTypes: number[] = [];//背包类型
            let indexs: number[] = [];//道具index，仅限道具表物品类型
            let headTypes: number[] = [];//抛出非道具表表头
            let propTypeAndSubTypes: { [propType: number]: number[] } = {};//道具类型和子类型，仅限道具表
            let bagCntTypes: number[] = [];//背包类型，最大格子数更新使用
            let autoUses: prop_use[] = [];//自动使用道具
            for (let d of all_bag) {
                if (d.bag_cap) {
                    this._model.bagMaxCnt[d.bag_type] = d.bag_cap;//背包最大格子数
                    bagCntTypes.push(d.bag_type);
                }
                if (!d.update_info) {
                    continue;
                }
                if (!bags[d.bag_type]) {
                    bags[d.bag_type] = [];
                }

                for (let p of d.update_info) {
                    let prop_id = p.prop_id.toString();
                    let d2: PropData = items[prop_id];

                    if (!d2) {
                        //新增道具
                        if(!p.index){
                            console.error("服务端下发道具更新协议时，新增道具时缺少道具index：", JSON.stringify(msg));
                            continue;
                        }
                        let propData: PropData = PropData.fromData(p);
                        if (!propData || !propData.type || propData.count == 0) {
                            continue;
                        }
                        d2 = propData;//临时存储

                        //存储数据
                        items[prop_id] = propData;
                        bags[d.bag_type].push(propData);
                        if (!bagIndexs[propData.index]) {
                            bagIndexs[propData.index] = [];
                        }

                        bagIndexs[propData.index].push(propData);
                        // if (isUpdate) {
                        //     /**更新背包时，检测是否是外显*/
                        //     this.checkSurfaceProp(propData);
                        // }
                        if (d2.cfg.easyuse == PropEasyUseType.Auto) {
                            autoUses.push({prop_id: d2.prop_id, use_cnt: d2.count});
                        }
                        this.checkProp(d2);
                    } else {
                        this.checkPropUse(d2, p);//检测道具使用
                        if (p.count == 0) {
                            //删除
                            delete items[prop_id];
                            let idx: number = bags[d.bag_type].indexOf(d2);
                            let propIdx: number = bagIndexs[d2.index].indexOf(d2);

                            ArrayUtil.removeAt(bags[d.bag_type], idx);
                            ArrayUtil.removeAt(bagIndexs[d2.index], propIdx);
                            if (!bagIndexs[d2.index].length) {
                                delete bagIndexs[d2.index];
                            }
                            this.checkProp(PropData.create(d2.index, p.count));
                        } else {
                            //修改
                            //let oldCnt = d2.count;
                            d2.update(p, true);

                            this.checkProp(d2)
                            // if (isUpdate && oldCnt < d2.count) {
                            //     /**更新背包时，检测是否是外显*/
                            //     this.checkSurfaceProp(d2);
                            // }
                        }
                    }
                    if (d.bag_type == BagType.Goods || d.bag_type == BagType.Material) {
                        /**道具表才做类型判断*/
                        let type = d2.type;
                        let propType = d2.propType;
                        if (type != ConfigHead.Prop) {
                            /**非道具表的道具，用表头来判断*/
                            headTypes.push(type);
                        } else if (propType == PropType.Good || propType == PropType.ChallengeProp) {
                            /**道具类型为1和7，不做类型区分，判断具体index*/
                            if (indexs.indexOf(d2.index) < 0) {
                                indexs.push(d2.index);
                            }
                        } else if (PropListenerSubType.indexOf(propType) > -1) {
                            /**如果是需要区分子子类型的*/
                            let propSubType = d2.propSubType;
                            if (!propTypeAndSubTypes[propType]) {
                                propTypeAndSubTypes[propType] = [];
                            }
                            if (propTypeAndSubTypes[propType].indexOf(propSubType) < 0) {
                                propTypeAndSubTypes[propType].push(propSubType);
                            }
                        } else if (types.indexOf(propType) < 0) {
                            /**物品类型区分*/
                            types.push(propType);
                        }
                    }
                }
                if (bagTypes.indexOf(d.bag_type) < 0) {
                    bagTypes.push(d.bag_type);
                }
            }
            if (headTypes.length) {
                this.sendNt(BagEvent.ON_BAG_UPDATE_BY_HEAD_TYPE, headTypes);
            }
            if (indexs.length) {
                this.sendNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, indexs);
            }
            if (types.length) {
                this.sendNt(BagEvent.ON_BAG_UPDATE_BY_PROP_TYPE, types);
            }
            if (bagTypes.length) {
                this.sendNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, bagTypes);
            }
            if (RoleUtil.hasObj(propTypeAndSubTypes)) {
                this.sendNt(BagEvent.ON_BAG_UPDATE_BY_PROP_TYPE_AND_SUBTYPE, propTypeAndSubTypes);
            }
            if (bagCntTypes.length) {
                this.sendNt(BagEvent.ON_BAG_MAX_CNT_UPDATE, bagCntTypes);
            }
            if (autoUses.length) {
                this.c2s_prop_list_use(autoUses);
            }
            if (this._model.easyUse.length) {
                this.sendNt(MainEvent.ON_UPDATE_EASY_USE_PROP);
            }

            this.bagUpdateComposeHint(bagTypes, types);//合成红点
            this.bagUpdatePropHint(types);//道具红点
            this.updateMeltTip(bagTypes, bagCntTypes);//熔炼提示
        }

        /**更新背包时，检测是否是外显*/
        // private checkSurfaceProp(prop: PropData): void {
        //     if (prop.propType != PropType.Surface) {
        //         //非外显则返回
        //         return;
        //     }
        //     let cfg: PropConfig = prop.cfg;
        //     let cost: number[] = cfg.param1 ? cfg.param1[0] : null;
        //     if(!cost || !cost.length){
        //         return;
        //     }
        //     let surfaceIndex = cost[0];
        //     if(SurfaceUtil.isAct(surfaceIndex)){
        //         //已激活的不提示
        //         return;
        //     }
        //     let costCnt = cost.length > 1 ? cost[1] : 20;//读不到配置时，默认20个碎片激活
        //     let curCnt = prop.count;
        //     if(curCnt >= costCnt){
        //         //可激活
        //         ViewMgr.getIns().showSurfaceTips(surfaceIndex);
        //     }
        // }

        /**更新物品时，检测道具使用*/
        private checkPropUse(oldProp: PropData, prop: prop_attributes): void {
            let propType = oldProp.propType;
            let headType = oldProp.type;
            if (headType == ConfigHead.Prop && propType == PropType.VipExp) {
                //VIP经验券使用时跳转vip界面
                if (oldProp.count > prop.count) {
                    ViewMgr.getIns().openVipView();
                }
            }
        }

        //-------------------------------------熔炼-----------------------------------------
        public c2s_melt_equip() {
            let msg: c2s_melt_equip = new c2s_melt_equip();
            this.sendProto(msg);
        }

        private s2c_melt_equip(n: GameNT) {
            let msg: s2c_melt_equip = n.body;
            if (!msg) {
                return;
            }
            /**成功提示*/
            //ViewMgr.getIns().showSuccessTips(SuccessTipsType.Melt);
            facade.showView(ModName.Bag, BagViewType.MeltTips, msg);
        }

        private s2c_melt_equip_coin(n: GameNT) {
            let msg: s2c_melt_equip_coin = n.body;
            if (msg.value) {
                this._model.meltVal = msg.value;
            }
            if (msg.up_value) {
                this._model.meltMaxVal = msg.up_value;
            }
            this.sendNt(BagEvent.ON_BAG_MELT_VALUE_UPDATE);
        }

        public get meltVal(): number {
            return this._model.meltVal;
        }

        public get meltMaxVal(): number {
            return this._model.meltMaxVal;
        }

        private updateMeltTip(bagTypes: number[], bagCntTypes: number[]): void {
            let type = BagType.RoleEquip;
            if (bagTypes.indexOf(type) < 0 && bagCntTypes.indexOf(type) < 0) {
                return;
            }
            let meltTip: boolean = this.checkMeltTip(type);
            if (meltTip != this._model.meltTip) {
                this._model.meltTip = meltTip;
                this.sendNt(BagEvent.ON_BAG_MELT_TIP);
            }
            HintMgr.setHint(meltTip, this._model.meltHint);
        }

        public get meltHint(): string[] {
            return this._model.meltHint;
        }

        private checkMeltTip(type: number): boolean {
            let bags = this.getBagByType(type);
            let maxCnt = this.getBagMaxCnt(type);
            let leftCnt = maxCnt - bags.length;
            if (leftCnt >= BagEquipTipsCnt) {
                /**装备背包剩余数量小于20时提示熔炼*/
                return false;
            }
            let meltBag = this.getMeltBag();//有可熔炼装备时
            return meltBag.length > 0;
        }

        /**熔炼背包*/
        public getMeltBag(): PropData[] {
            return BagUtil.getBagsByTypeAndQuality(BagType.RoleEquip, 1, EquipMeltQuality);
        }

        /**熔炼提示*/
        public get meltTip(): boolean {
            return this._model.meltTip;
        }

        /**点击熔炼*/
        public clickMelt(items?: PropData[]): void {
            if (!items) {
                items = this.getMeltBag();
            }
            for (let p of items) {
                this._model.useProps.push(p.index);
            }
            this.c2s_melt_equip();
        }

        //-------------------------------------分解-----------------------------------------
        public c2s_prop_one_key_resolve(props: prop_tips_data[]) {
            let msg: c2s_prop_one_key_resolve = new c2s_prop_one_key_resolve();
            msg.props = props;
            this.sendProto(msg);
        }

        //-------------------------------------合成-----------------------------------------
        public c2s_prop_synthesis(index: Long, cnt: number) {
            let msg: c2s_prop_synthesis = new c2s_prop_synthesis();
            msg.index = index;
            msg.count = cnt;
            this.sendProto(msg);
        }

        private s2c_prop_synthesis(n: GameNT) {
            //let msg: s2c_prop_synthesis = n.body;
            /**成功提示*/
            ViewMgr.getIns().showSuccessTips(SuccessTipsType.Compose);
            this.sendNt(BagEvent.ON_PROP_COMPOSE_SUCCESS);//合成成功
        }

        public get selTypeCfg(): SynthesisTypeConfig {
            return this._model.selTypeCfg;
        }

        public set selTypeCfg(cfg: SynthesisTypeConfig) {
            this._model.selTypeCfg = cfg;
        }

        public get selIndex(): number {
            return this._model.selIndex;
        }

        public set selIndex(index: number) {
            this._model.selIndex = index;
        }

        public get lastSelIndex(): number {
            return this._model.lastSelIndex;
        }

        public set lastSelIndex(index: number) {
            this._model.lastSelIndex = index;
        }

        public get selSub(): boolean {
            return this._model.selSub;
        }

        public set selSub(sel: boolean) {
            this._model.selSub = sel;
        }

        public initComposeCfgs(): void {
            if (this._model.composeCfgs) {
                return;
            }
            this._model.composeCfgs = {};
            let cfgList: SynthesisTypeConfig[] = getConfigListByName(ConfigName.SynthesisType);

            for (let cfg of cfgList) {
                this._model.composeCfgs[cfg.index] = {};
                for (let i = 0; i < cfg.prop.length; ++i) {
                    let star = this.calcStar(cfg, i);//道具设置star为0，表示是道具
                    if (!this._model.composeCfgs[cfg.index][star]) {
                        this._model.composeCfgs[cfg.index][star] = [];
                    }
                    this._model.composeCfgs[cfg.index][star].push(cfg.prop[i]);
                }
            }
        }

        /**计算星级*/
        public calcStar(cfg: SynthesisTypeConfig, pos: number): number {
            let star = 0;//道具设置star为0，表示是道具
            if (!cfg.is_prop) {
                let index = cfg.prop[pos];
                let equip = PropData.create(index);
                star = equip.equipStar;
            }
            return star;
        }

        public getStarList(type: number): number[] {
            this.initComposeCfgs();
            let starList: number[] = [];
            let infos = this._model.composeCfgs[type];
            for (let k in infos) {
                starList.push(parseInt(k));
            }
            return starList;
        }

        //获取星级对应的合成道具
        public getItemList(type: number, star: number): number[] {
            this.initComposeCfgs();
            let infos = this._model.composeCfgs[type];
            return infos[star];
        }

        public canComposeByTypeCfg(cfg: SynthesisTypeConfig): boolean {
            for (let index of cfg.prop) {
                if (this.canComposeByIndex(index)) {
                    return true;
                }
            }
            return false;
        }

        public canComposeByStar(type: number, star: number): boolean {
            let indexList = this.getItemList(type, star);
            for (let i of indexList) {
                if (this.canComposeByIndex(i)) {
                    return true;
                }
            }
            return false;
        }

        public canComposeByIndex(index: number): boolean {
            let cfg: SynthesisConfig = getConfigByNameId(ConfigName.Synthesis, index);
            if (!cfg) {
                return false;
            }
            let propCost = cfg.synthesis_prop;
            for (let i = 0; i < propCost.length; ++i) {
                let info = propCost[i];
                let idx = info[0];
                let costCnt = info[1];
                let cnt = BagUtil.calcPropCnt(idx, i, propCost, true);
                if (cnt < costCnt) {
                    return false;
                }
            }
            let cost = cfg.consume;
            if (cost && cost.length) {
                for (let info of cost) {
                    let idx = info[0];
                    let costCnt = info[1];
                    if (!BagUtil.checkPropCnt(idx, costCnt)) {
                        return false;
                    }
                }
            }
            return true;
        }

        /**刷新合成的红点*/
        private bagUpdateComposeHint(bagTypes: number[], types: number[]): void {
            if (bagTypes.indexOf(BagType.RoleEquip) < 0 && types.indexOf(PropType.Compose) < 0) {
                return;
            }
            this.updateComposeHint();
        }

        //展示的合成大类型
        public getShowComposeCfgs(): SynthesisTypeConfig[] {
            let cfgs: SynthesisTypeConfig[] = getConfigListByName(ConfigName.SynthesisType);
            let list: SynthesisTypeConfig[] = [];
            let rein = RoleVo.ins.reincarnate || 0;
            for (let cfg of cfgs) {
                if (rein >= cfg.open_level) {
                    list.push(cfg)
                }
            }
            return list;
        }

        /**刷新合成的红点*/
        private updateComposeHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.BagCompose)) {
                return;
            }
            let cfgList: SynthesisTypeConfig[] = this.getShowComposeCfgs();
            let hint = false;
            for (let cfg of cfgList) {
                if (this.canComposeByTypeCfg(cfg)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.composeHint);
        }

        /**刷新道具红点，道具类型为3*/
        private bagUpdatePropHint(types: number[]): void {
            if (types.indexOf(PropType.Box) < 0) {
                return;
            }
            this.updatePropHint();
        }

        /**刷新道具红点，道具类型为3*/
        private updatePropHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Bag)) {
                return;
            }
            let hint = false;
            let bags = BagUtil.getBagsByType(BagType.Goods);
            for (let i of bags) {
                if (this.getPropHint(i)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.propHint);
        }

        //道具红点，目前只做道具类型3的
        public getPropHint(prop: PropData): boolean {
            if (!prop || prop.type != ConfigHead.Prop || prop.propType != PropType.Box) {
                return false;
            }
            let cfg = prop.cfg as PropConfig;
            let useStr = this.getUseStr(cfg.condition, prop);
            return useStr == "";//返回空的时候，表示能使用
        }

        //使用限制文本，返回空的时候，表示能使用
        public getUseStr(condition: number[][], propData?: PropData): string {
            let useStr = "";
            if (!condition || !condition.length) {
                return useStr;
            }
            for (let info of condition) {
                let type = info[0];
                let limitValue = info[1];
                switch (type) {
                    case PropUseLimitType.VIP_INDEX:
                        //vip
                        if (limitValue > RoleVo.ins.vip_lv) {
                            useStr = VipUtil.getVipStr(limitValue) + getLanById(LanDef.bag_use_tips1);
                        }
                        break;
                    case PropUseLimitType.LOGINDAY :
                        //登录天数
                        let leftDay = limitValue - RoleUtil.getLoginDay();
                        if (leftDay > 0) {
                            useStr = StringUtil.substitute(getLanById(LanDef.bag_use_tips3), [leftDay]);
                        }
                        break;
                    case PropUseLimitType.OwnLoginDay:
                        let ownLoginDay = propData.born_login_days || 0;//得到时候玩家的登录天数
                        let loginDay = RoleUtil.getLoginDay() - ownLoginDay + 1 - limitValue;
                        if (loginDay < 0) {
                            useStr = StringUtil.substitute(getLanById(LanDef.bag_use_tips3), [Math.abs(loginDay)]);
                        }
                        break;
                }
            }
            return useStr;
        }

        protected onRoleUpdate(n: GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.vip_lv) >= 0) {
                this.updatePropHint();
            }
            if (keys.indexOf(RolePropertyKey.reincarnate) >= 0) {
                this.updateComposeHint();
            }
        }

        protected onServerDayUpdate(n: GameNT): void {
            this.updatePropHint();
        }

        //-------------------------------------合成-----------------------------------------
        //-------------------------------------使用道具-----------------------------------------
        /**返回统一走下面：s2c_prop_tips*/
        public c2s_prop_list_use(props: prop_use[]) {
            let msg: c2s_prop_list_use = new c2s_prop_list_use();
            msg.props = props;
            this.sendProto(msg);
        }

        /**自动使用宝箱*/
        public autoUseBox(): void {
            let bags = BagUtil.getBagsByTypeAndPropType(BagType.Goods, PropType.Box);
            //快速开启背包宝箱（除自选宝箱外的所有宝箱）
            let props: prop_use[] = [];
            for (let p of bags) {
                if (p.propSubType != PropSubType3.Type2) {
                    props.push({prop_id: p.prop_id, use_cnt: p.count});
                    this._model.useProps.push(p.index);
                }
            }
            if (props.length) {
                this.c2s_prop_list_use(props);
            }
        }

        private equipUpdateBack(): void {
            this.onCheckEasyUseEquip();
            this.updateComposeHint();
        }

        private onCheckEasyUseEquip(): void {
            let proxy: IEquipProxy = getProxy(ModName.Equip, ProxyType.Equip);
            for (let i = this._model.easyUse.length - 1; i > 0; i--) {
                let p = this._model.easyUse[i];
                if (p.equipPos && p.propType == EquipPropType.RoleEquip) {
                    let equip: PropData = proxy.getEquipByPos(p.equipPos);
                    let power1: number = p && p.regular_attrs && p.regular_attrs.showpower.toNumber() || 0;
                    let power2: number = equip && equip.regular_attrs && equip.regular_attrs.showpower.toNumber() || 0;
                    if (power2 >= power1) {
                        this._model.easyUse.splice(i, 1);
                    }
                }
            }
            this.sendNt(MainEvent.ON_UPDATE_EASY_USE_PROP);
        }

        /** */
        public checkProp(p: PropData): void {
            if (p.cfg.easyuse == PropEasyUseType.Easy) {
                if (p.propType == EquipPropType.RoleEquip) {
                    this.checkEquip(p);
                } else {
                    this.checkUse(p);
                    this.sendNt(MainEvent.ON_UPDATE_EASY_USE_PROP_COUNT, p);
                }
            }
        }

        private checkUse(p: PropData): void {
            let idx: number = this._model.easyUse.findIndex(v => {
                return v.index == p.index;
            });
            if (!p.count) {
                if (idx > -1) {
                    this._model.easyUse.splice(idx, 1);
                }
            } else {
                if (idx > -1) {
                    this._model.easyUse[idx] = p;
                } else {
                    this._model.easyUse.push(p);
                }
            }
        }

        private checkEquip(p: PropData): void {
            let proxy: IEquipProxy = getProxy(ModName.Equip, ProxyType.Equip);
            if (!proxy.checkEquipLimit(p)) {
                return;
            }
            let equip: PropData = proxy.getEquipByPos(p.equipPos);
            let power1: number = p && p.regular_attrs && p.regular_attrs.showpower.toNumber() || 0;
            let power2: number = equip && equip.regular_attrs && equip.regular_attrs.showpower.toNumber() || 0;
            if (power2 >= power1) {
                return;
            }
            for (let i in this._model.easyUse) {
                let prop: PropData = this._model.easyUse[i];
                if (!p.equipPos || p.equipPos !== prop.equipPos) {
                    continue;
                }
                let power3: number = prop && prop.regular_attrs && prop.regular_attrs.showpower.toNumber() || 0;
                if (power1 > power3) {
                    this._model.easyUse[i] = p;
                }
                return;
            }
            this._model.easyUse.push(p);
        }

        public get easyUse(): PropData {
            this._model.easyUse.sort((a, b) => {
                if (a.propType == b.propType && a.propType == EquipPropType.RoleEquip) {
                    return a.equipPos - b.equipPos;
                } else {
                    if (a.propType == EquipPropType.RoleEquip) {
                        return -1;
                    } else if (b.propType == EquipPropType.RoleEquip) {
                        return 1;
                    } else {
                        return a.index - b.index;
                    }
                }
            });
            return this._model.easyUse.shift();
        }

        //-------------------------------------掉落提示-----------------------------------------
        private s2c_prop_tips(n: GameNT) {
            let msg: s2c_prop_tips = n.body;
            if (!msg.reason_type) {
                //居中的恭喜获得
                PropTipsMgr.getIns().showBestPropCenter(msg.props);
            } else if (msg.reason_type == 1) {
                //掉落黑底提示
                if (!SceneUtil.isShowMain) {
                    PropTipsMgr.getIns().show(msg.props);//主界面挂机时候不提示
                }
            } else if (msg.reason_type == 2) {
                //下方的恭喜获得
                this._model.props = this._model.props.concat(msg.props);
                if (this._delayProp) {
                    clearDelay(this._delayProp);
                }
                this._delayProp = delayCall(Handler.alloc(this, this.showPropTips), 400);
            }
        }

        private showPropTips(): void {
            //恭喜获得的道具需要过滤掉熔炼的装备
            if (this._model.useProps && this._model.useProps.length) {
                let len = this._model.props.length;
                for (let i = len - 1; i >= 0; --i) {
                    let prop = this._model.props[i];
                    if (this._model.useProps.indexOf(prop.idx.toNumber()) > -1) {
                        this._model.props.splice(i, 1);
                    }
                }
                this._model.useProps = [];
            }
            if (this._model.props.length) {
                PropTipsMgr.getIns().showBestProp(this._model.props.concat());
            }
            this._model.props = [];
        }

        /**
         * 通过背包类型获取基础背包格子数量
         * @param type：背包类型
         */
        public getBagBaseCnt(type: number): number {
            if (!this._model.bagBaseCnt[type]) {
                let cfg = GameConfig.getParamConfigById("bag_capacity");
                let infos: number[][] = cfg ? cfg.value : [];
                for (let info of infos) {
                    if (info[0] == type) {
                        this._model.bagBaseCnt[type] = info[1];
                        break;
                    }
                }
            }
            return this._model.bagBaseCnt[type];
        }

        /**
         * 通过背包类型获取背包最大格子数量
         * @param type：背包类型
         */
        public getBagMaxCnt(type: number): number {
            return this._model.bagMaxCnt[type] || 0;
        }

        //外显弹窗
        private s2c_first_get_prop_check_use(n: GameNT) {
            let msg: s2c_first_get_prop_check_use = n.body;
            if (!msg || !msg.ids) {
                return;
            }
            for (let i of msg.ids) {
                ViewMgr.getIns().showSurfaceTips(i, false);
            }
        }

        //---------------------对外接口----------------------------
        /**
         * 通过背包类型获取背包数据
         * @param type：背包类型
         */
        public getBagByType(type: number): PropData[] {
            return this._model.bags[type] || [];
        }

        /**
         * 通过index获取背包道具
         * @param index：配置表index
         */
        public getPropsByIndex(index: number): PropData[] {
            return this._model.bagIndexs[index] || [];
        }
    }
}