namespace game.mod.activity {

    import c2s_linghu_oper = msg.c2s_linghu_oper;
    import GameNT = base.GameNT;
    import s2c_linghu_info = msg.s2c_linghu_info;
    import HuanjingzhihaiIndexConfig = game.config.HuanjingzhihaiIndexConfig;
    import LanDef = game.localization.LanDef;
    import LinghuExtraBoxConfig = game.config.LinghuExtraBoxConfig;
    import HuanjingBaozangConfig = game.config.HuanjingBaozangConfig;
    import HuanjingLeichongConfig = game.config.HuanjingLeichongConfig;
    import HuanjingGiftConfig = game.config.HuanjingGiftConfig;
    import HuanjingZengliConfig = game.config.HuanjingZengliConfig;
    import Handler = base.Handler;

    /**
     * @description 浮尘灵壶系统
     */
    export class FuchenlinghuProxy extends ProxyBase implements IFuchenlinghuProxy {
        private _model: FuchenlinghuModel;

        initialize(): void {
            super.initialize();
            this._model = new FuchenlinghuModel();
            this.onProto(s2c_linghu_info, this.s2c_linghu_info, this);
        }

        //召唤特效界面点击召唤
        public getOperHandler(cnt: CommonCountType): Handler {
            let countType = cnt == CommonCountType.Once ? 1 : 2;
            return Handler.alloc(this, this.c2s_linghu_oper, [FuchenlinghuOperType.Oper1, countType]);
        }

        //召唤特效界面点击召唤
        public getOperHandlerSpecial(): Handler {
            return Handler.alloc(this, this.c2s_linghu_oper, [FuchenlinghuOperType.Oper4]);
        }

        /**
         * @param oper 1召唤（1单抽 2十连 3百连） 2切换卡池（类型） 3许愿（索引） 4特殊卡池召唤 5赠礼奖励 6宝藏奖励 7累充奖励 8礼包
         * @param param
         * @param ex_param oper==6使用 1领取免费档 2领取付费
         */
        public c2s_linghu_oper(oper: FuchenlinghuOperType, param?: number, ex_param?: number): void {
            let msg = new c2s_linghu_oper();
            msg.oper = oper;
            if (param) {
                msg.param = param;
            }
            if (ex_param) {
                msg.ex_param = ex_param;
            }
            this.sendProto(msg);
        }

        private s2c_linghu_info(n: GameNT): void {
            let msg = n.body as s2c_linghu_info;
            this._model.up = msg.up || 0;
            this._model.type = msg.type || SeaType.Sea1;
            this._model.count = msg.count || 0;
            this._model.forever_count = msg.forever_count || 0;
            this._model.total_count = msg.total_count || 0;
            this._model.zengli_data = msg.zengli_data || [];
            this._model.free_baozang_data = msg.free_baozang_data || [];
            this._model.buy_baozang_data = msg.buy_baozang_data || [];
            this._model.leichong_data = msg.leichong_data || [];
            this._model.gift_data = msg.gift_data || [];

            this.updateHint();
            this.sendNt(ActivityEvent.ON_UPDATE_FUCHENLINGHU_INFO);
        }

        /**============================= 协议end =============================*/

        //百连召唤
        public set isHundred(isSel: boolean) {
            this._model.isHundred = isSel;
        }

        public get isHundred(): boolean {
            return this._model.isHundred;
        }

        //默认类型1，或上一次选中类型
        public get type(): SeaType {
            return this._model.type || SeaType.Sea1;
        }

        //当前up的index，参数表第几个
        public get up(): number {
            return this._model.up || 0;
        }

        //周期累计召唤次数
        public get total_count(): number {
            return this._model.total_count || 0;
        }

        //界面展示道具
        public getShowProps(type: SeaType): number[][] {
            let id = `linghu${type}_show`;
            let cfg = GameConfig.getParamConfigById(id);
            return cfg ? cfg.value : [];
        }

        //up道具
        public getUpProps(type: SeaType): number[][] {
            let id = `linghu${type}_up`;
            let cfg = GameConfig.getParamConfigById(id);
            return cfg ? cfg.value : [];
        }

        //仙灵稀有奖励池道具
        public getExtraProps(seaType: SeaType): number[][] {
            if (this._model.extraProps[seaType]) {
                return this._model.extraProps[seaType];
            }
            let list: number[][] = [];
            let cfgObj: { [index: number]: LinghuExtraBoxConfig } = getConfigByNameId(ConfigName.LinghuExtraBox, seaType);
            for (let key in cfgObj) {
                let cfg = cfgObj[key];
                if (cfg && cfg.items) {
                    list.push(cfg.items);
                }
            }
            this._model.extraProps[seaType] = list;
            return list;
        }

        //召唤消耗道具id列表
        public getCostIds(): number[] {
            let list: number[] = [];
            let zhaohuanCost = this.getCost(CommonCountType.Once);//召唤消耗
            let xianlingCost = this.getCostSpecial();//仙灵消耗
            if (zhaohuanCost && list.indexOf(zhaohuanCost[0]) < 0) {
                list.push(zhaohuanCost[0]);
            }
            if (xianlingCost && list.indexOf(xianlingCost[0]) < 0) {
                list.push(xianlingCost[0]);
            }
            return list;
        }

        //召唤消耗
        public getCost(type: CommonCountType): number[] {
            let cfg = GameConfig.getParamConfigById('linghu_cost');
            if (!cfg) {
                return [];
            }
            if (type == CommonCountType.Once) {
                return cfg.value[0];
            } else if (type == CommonCountType.Ten) {
                return cfg.value[1];
            } else {
                let val = cfg.value[1].concat();
                return [val[0], val[1] * 10];
            }
        }

        //特殊召唤消耗
        public getCostSpecial(): number[] {
            let cfg = GameConfig.getParamConfigById('linghu_extra_cost');
            return cfg ? cfg.value : [];
        }

        //开启百连召唤所需累计抽奖次数
        public getShowHundredCost(): number {
            let cfg = GameConfig.getParamConfigById('linghu_Hundred_Summons');
            return cfg && cfg.value || 300;
        }

        //是否展示百连checkbox
        public isShowHundredCheckBox(type: SeaType): boolean {
            if (type != this.type) {
                return false;
            }
            let cnt = this._model.forever_count || 0;
            let hundredCost = this.getShowHundredCost();
            return cnt >= hundredCost;
        }

        //召唤次数
        public getZhaohuanCnt(type: SeaType): number {
            if (type != this.type) {
                return 0;
            }
            return this._model.count || 0;
        }

        //up道具id
        public getUpIndex(type: SeaType): number {
            if (type != this.type || !this.up) {
                return 0;
            }
            let upProps = this.getUpProps(type);
            return upProps[this.up - 1][0];
        }

        //浮尘灵壶保底次数
        public getGuaranteeCnt(): number {
            let cfg = GameConfig.getParamConfigById('linghu_guarantees_times');
            return cfg && cfg.value || 350;
        }

        //是否开启
        public isOpenSea(seaType: SeaType, isTips = false): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Fuchenlinghu, isTips)) {
                return false;
            }
            let seaProxy: ISeaProxy = getProxy(ModName.Yijie, ProxyType.Sea);
            let isEnter = seaProxy && seaProxy.isEnter(seaType);
            if (!isEnter && isTips) {
                let seaName = this.getSeaNameByType(seaType);
                PromptBox.getIns().show(StringUtil.substitute(getLanById(LanDef.fuchenlinghu_tips17), [seaName]));
            }
            return isEnter;
        }

        //能否召唤
        public canZhaohuan(seaType: SeaType, countType: CommonCountType = CommonCountType.Once, isTips = false): boolean {
            if (!this.isOpenSea(seaType, isTips)) {
                return false;
            }
            let cost = this.getCost(countType);
            return cost && BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        //幻境之海区域名称
        public getSeaNameByType(seaType: SeaType): string {
            let cfg: HuanjingzhihaiIndexConfig = getConfigByNameId(ConfigName.HuanjingzhihaiIndex, seaType);
            return cfg && cfg.name || '';
        }

        //仙灵界面获取奖励
        public canXianling(seaType: SeaType, isTips = false): boolean {
            if (!this.isOpenSea(seaType, isTips)) {
                return false;
            }
            let cost = this.getCostSpecial();
            return cost && BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        //仙灵总红点
        public canXianlingAllType(): boolean {
            for (let type of SeaTypeAry) {
                if (this.canXianling(type)) {
                    return true;
                }
            }
            return false;
        }

        //幻境赠礼状态
        public getZengliStatus(index: number): RewardStatus {
            let list = this._model.zengli_data || [];
            if (list.indexOf(index) > -1) {
                return RewardStatus.Draw;
            }
            let cnt = this.total_count;
            let cfg: HuanjingBaozangConfig = getConfigByNameId(ConfigName.HuanjingZengli, index);
            if (!cfg) {
                return RewardStatus.NotFinish;
            }
            return cnt >= cfg.times ? RewardStatus.Finish : RewardStatus.NotFinish;
        }

        //幻境赠礼领取红点
        public getZengliHint(index: number): boolean {
            if (!this.isOpenSea(SeaType.Sea1)) {
                return false;
            }
            let status = this.getZengliStatus(index);
            return status == RewardStatus.Finish;
        }

        //幻境宝藏奖励状态
        public getBaozangStatus(index: number, isFree = false): RewardStatus {
            let list = (isFree ? this._model.free_baozang_data : this._model.buy_baozang_data) || [];
            if (list.indexOf(index) > -1) {
                return RewardStatus.Draw;
            }
            let cfg: HuanjingBaozangConfig = getConfigByNameId(ConfigName.HuanjingBaozang, index);
            let cnt = this.total_count;
            return cnt >= cfg.times ? RewardStatus.Finish : RewardStatus.NotFinish;
        }

        //幻境宝藏领取红点
        public getBaozangHint(index: number, isFree = false): boolean {
            if (!this.isOpenSea(SeaType.Sea1)) {
                return false;
            }
            let status = this.getBaozangStatus(index, isFree);
            if (status != RewardStatus.Finish) {
                return false;
            }
            if (isFree) {
                return true;
            }
            let cfg: HuanjingBaozangConfig = getConfigByNameId(ConfigName.HuanjingBaozang, index);
            if (cfg && cfg.cost) {
                return BagUtil.checkPropCnt(cfg.cost[0][0], cfg.cost[0][1]);
            }
            return false;
        }

        //幻境累充状态
        public getLeichongStatus(index: number): RewardStatus {
            let list = this._model.leichong_data || [];
            if (list.indexOf(index) > -1) {
                return RewardStatus.Draw;
            }
            let cfg: HuanjingLeichongConfig = getConfigByNameId(ConfigName.HuanjingLeichong, index);
            if (!cfg) {
                return RewardStatus.NotFinish;
            }
            if (cfg.value == 0) {
                return RewardStatus.Finish;//免费领取
            }
            let dayChargeRmb = RoleVo.ins.day_charge_rmb;
            return dayChargeRmb >= cfg.value ? RewardStatus.Finish : RewardStatus.NotFinish;
        }

        //幻境礼包信息
        public getLibaoBoughtCnt(index: number): number {
            let list = this._model.gift_data || [];
            for (let item of list) {
                if (item && item.index == index) {
                    return item.count;
                }
            }
            return 0;
        }

        //幻境礼包状态
        public getLibaoStatus(index: number): RewardStatus {
            let boughtCnt = this.getLibaoBoughtCnt(index);
            let cfg: HuanjingGiftConfig = getConfigByNameId(ConfigName.HuanjingGift, index);
            if (!cfg) {
                return RewardStatus.NotFinish;
            }
            let cnt = cfg.count || 0;
            if (boughtCnt >= cnt) {
                return RewardStatus.Draw;
            }
            if (cfg.type == 1 && cfg.cost && BagUtil.checkPropCnt(cfg.cost[0], cfg.cost[1])) {
                return RewardStatus.Finish;
            }
            if (cfg.type == 2 && cfg.product_id) {
                let haveBuy = PayUtil.hasBuy(cfg.product_id);
                let rmb = PayUtil.getRmbValue(cfg.product_id);
                if (rmb == 0 && !haveBuy) {
                    return RewardStatus.Finish;
                }
            }
            return RewardStatus.NotFinish;
        }

        /**============================= hint start =============================*/

        private updateHint(): void {
            this.updateFuchenlinghuHint();
            this.updateZengliHint();
            this.updateBaozangHint();
            this.updateLeichongHint();
            this.updateLibaoHint();
        }

        //浮尘灵壶
        private updateFuchenlinghuHint(): void {
            if (!this.isOpenSea(SeaType.Sea1)) {
                return;
            }
            let hint = false;
            for (let type of SeaTypeAry) {
                hint = this.canZhaohuan(type) || this.canXianling(type);
                if (hint) {
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[SummonMainBtnType.Fuchenlinghu]);
        }

        //幻境赠礼
        private updateZengliHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Huanjingzengli) || !this.isOpenSea(SeaType.Sea1)) {
                return;
            }
            let cfgList: HuanjingZengliConfig[] = getConfigListByName(ConfigName.HuanjingZengli);
            let hint = false;
            for (let cfg of cfgList) {
                if (this.getZengliHint(cfg.index)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[SummonMainBtnType.Huanjingzengli]);
        }

        //幻境宝藏
        private updateBaozangHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Huanjingbaozang) || !this.isOpenSea(SeaType.Sea1)) {
                return;
            }
            let cfgList: HuanjingBaozangConfig[] = getConfigListByName(ConfigName.HuanjingBaozang);
            let hint = false;
            for (let cfg of cfgList) {
                hint = this.getBaozangHint(cfg.index, true) || this.getBaozangHint(cfg.index);
                if (hint) {
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[SummonMainBtnType.Huanjingbaozang]);
        }

        //幻境累充
        private updateLeichongHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Huanjingleichong)) {
                return;
            }
            let cfgList: HuanjingLeichongConfig[] = getConfigListByName(ConfigName.HuanjingLeichong);
            let hint = false;
            for (let cfg of cfgList) {
                if (this.getLeichongStatus(cfg.index) == RewardStatus.Finish) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.leichongHintPath);
        }

        //幻境礼包
        private updateLibaoHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Huanjinglibao)) {
                return;
            }
            let cfgList: HuanjingGiftConfig[] = getConfigListByName(ConfigName.HuanjingGift);
            let hint = false;
            for (let cfg of cfgList) {
                if (this.getLibaoStatus(cfg.index) == RewardStatus.Finish) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.libaoHintPath);
        }

        protected onBagUpdateByPropIndex(n: GameNT) {
            if (!this.isOpenSea(SeaType.Sea1)) {
                return;
            }
            let indexs = n.body as number[];
            let zhaohuanCost = this.getCost(CommonCountType.Once);//召唤消耗
            let xianlingCost = this.getCostSpecial();//仙灵消耗
            if ((zhaohuanCost && indexs.indexOf(zhaohuanCost[0]) > -1) || (xianlingCost && indexs.indexOf(xianlingCost[0]) > -1)) {
                this.updateFuchenlinghuHint();
            }
        }

        protected onRoleUpdate(n: GameNT) {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.diamond) > -1) {
                this.updateLibaoHint();
                this.updateBaozangHint();
            }
            if (keys.indexOf(RolePropertyKey.day_charge_rmb) > -1) {
                this.updateLeichongHint();
            }
        }

        protected onOpenFuncUpdate(n: GameNT) {
            let indexs = n.body as number[];
            let ary = [OpenIdx.Fuchenlinghu, OpenIdx.Huanjingzengli, OpenIdx.Huanjingbaozang, OpenIdx.Huanjingleichong, OpenIdx.Huanjinglibao];
            for (let idx of ary) {
                if (indexs.indexOf(idx) > -1) {
                    this.updateHint();
                    break;
                }
            }
        }

        protected onSeaInfoUpdate(n: GameNT) {
            let types = n.body as number[];
            if (types.indexOf(SeaType.Sea1) > -1) {
                this.updateFuchenlinghuHint();
                this.updateZengliHint();
                this.updateBaozangHint();
            }
        }

        /**============================= hint end =============================*/
    }
}