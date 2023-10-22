namespace game.mod.activity {

    import DrawLuckGiftConfig = game.config.DrawLuckGiftConfig;
    import ParamConfig = game.config.ParamConfig;
    import c2s_draw_get_rank_info = msg.c2s_draw_get_rank_info;
    import GameNT = base.GameNT;
    import s2c_draw_send_rank_info = msg.s2c_draw_send_rank_info;
    import s2c_draw_send_fengyun_info = msg.s2c_draw_send_fengyun_info;
    import c2s_draw_buy_gift = msg.c2s_draw_buy_gift;
    import s2c_draw_buy_gift_info = msg.s2c_draw_buy_gift_info;
    import c2s_draw_buy_luck_gift = msg.c2s_draw_buy_luck_gift;
    import s2c_draw_buy_luck_gift_info = msg.s2c_draw_buy_luck_gift_info;
    import c2s_draw_button_click = msg.c2s_draw_button_click;
    import s2c_draw_get_rewards = msg.s2c_draw_get_rewards;
    import s2c_draw_base_data = msg.s2c_draw_base_data;
    import draw_luck_gift_data = msg.draw_luck_gift_data;
    import DrawRankConfig = game.config.DrawRankConfig;
    import teammate = msg.teammate;
    import DrawCountRewardsConfig = game.config.DrawCountRewardsConfig;
    import c2s_draw_get_fengyun_rewards = msg.c2s_draw_get_fengyun_rewards;
    import DrawGiftConfig = game.config.DrawGiftConfig;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;

    export class SummonProxy extends ProxyBase {
        private _model: SummonModel;

        public get model() {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new SummonModel();

            this.onProto(s2c_draw_send_rank_info, this.s2c_draw_send_rank_info, this);
            this.onProto(s2c_draw_send_fengyun_info, this.s2c_draw_send_fengyun_info, this);
            this.onProto(s2c_draw_buy_gift_info, this.s2c_draw_buy_gift_info, this);
            this.onProto(s2c_draw_buy_luck_gift_info, this.s2c_draw_buy_luck_gift_info, this);
            this.onProto(s2c_draw_get_rewards, this.s2c_draw_get_rewards, this);
            this.onProto(s2c_draw_base_data, this.s2c_draw_base_data, this);
        }

        /**--------------------协议start-------------------- */

        /**
         * 点击抽奖
         * @param button_type 1单抽   2十连    3百抽
         * */
        public c2s_draw_button_click(button_type: number): void {
            let msg: c2s_draw_button_click = new c2s_draw_button_click();
            msg.button_type = button_type;
            this.sendProto(msg);
        }

        /**请求排行数据 */
        public c2s_draw_get_rank_info(): void {
            let msg: c2s_draw_get_rank_info = new c2s_draw_get_rank_info();
            this.sendProto(msg);
        }

        /**礼券购买奖励 */
        public c2s_draw_buy_gift(index: number): void {
            let msg: c2s_draw_buy_gift = new c2s_draw_buy_gift();
            msg.index = index;
            this.sendProto(msg);
        }

        /**购买命运豪礼 */
        public c2s_draw_buy_luck_gift(itype: number, index: number): void {
            let msg: c2s_draw_buy_luck_gift = new c2s_draw_buy_luck_gift();
            msg.itype = itype;
            msg.index = index;
            this.sendProto(msg);
        }

        /**领取风云录奖励 */
        public c2s_draw_get_fengyun_rewards(index: number): void {
            let msg: c2s_draw_get_fengyun_rewards = new c2s_draw_get_fengyun_rewards();
            msg.index = index;
            this.sendProto(msg);
        }

        /**积分排行 */
        private s2c_draw_send_rank_info(n: GameNT): void {
            let msg: s2c_draw_send_rank_info = n.body;
            if (msg.rank_List && msg.rank_List.length > 0) {
                this._model.rank_list = msg.rank_List;
            }
            if (msg.my_data) {
                this._model.my_data = msg.my_data;
            }
            if (msg.time) {
                this._model.end_time = msg.time.toNumber();
            }
            this.sendNt(ActivityEvent.ON_UPDATE_RANK);
        }

        /**风云录数据 */
        private s2c_draw_send_fengyun_info(n: GameNT): void {
            let msg: s2c_draw_send_fengyun_info = n.body;
            if (msg.list && msg.list.length > 0) {
                this._model.list = msg.list;
            }
            this.onUpdateHintByFengyun();
            this.sendNt(ActivityEvent.ON_UPDATE_FENGYUN_LIST);
        }

        /**礼券数据 */
        private s2c_draw_buy_gift_info(n: GameNT): void {
            let msg: s2c_draw_buy_gift_info = n.body;
            if (msg.item_list && msg.item_list.length > 0) {
                this._model.item_list = msg.item_list;
            }
            // this.onUpdateHintByExchange();
            this.sendNt(ActivityEvent.ON_UPDATE_EXCHANGE);
        }

        /**命运豪礼数据 */
        private s2c_draw_buy_luck_gift_info(n: GameNT): void {
            let msg: s2c_draw_buy_luck_gift_info = n.body;
            if (msg.gift_list) {
                for (let item of msg.gift_list) {
                    this._model.gift_list[item.itype] = item;
                }
            }
            this.onUpdateHintByGift();
            this.sendNt(ActivityEvent.ON_UPDATE_SUMMON_GIFT);
        }

        /**抽奖获得 */
        private s2c_draw_get_rewards(n: GameNT): void {
            let msg: s2c_draw_get_rewards = n.body;
            if (msg.item_list && msg.item_list.length > 0) {
                if (msg.luck_num) {
                    this.luck_num = msg.luck_num;
                }
                if (msg.item_list.length <= 10) {
                    let countType = msg.item_list.length == 1 ? CommonCountType.Once : CommonCountType.Ten;
                    let data: SummonEffectData = {
                        type: msg.type,
                        list: msg.item_list,
                        luckNum: msg.luck_num || 0,
                        cost: this.getSummonEffectCostPropData(msg.type, countType),
                        handler: this.getSummonEffectHandler(msg.type, countType)
                    };
                    facade.showView(ModName.Activity, MainActivityViewType.SummonEffect, data);
                    this.sendNt(ActivityEvent.ON_UPDATE_SUMMON_TWEEN, msg.item_list);
                }
                //返回的奖励如果有外显碎片时，则暂停外显弹窗
                for (let item of msg.item_list) {
                    let prop = PropData.create(item.idx);
                    if (prop.propType == PropType.Surface) {
                        PropTipsMgr.getIns().pauseSurface();//外显碎片时则暂停表现
                        break;
                    }
                }
            }
            // this.onUpdateHintByExchange();
        }

        //召唤特效界面的消耗 todo
        private getSummonEffectCostPropData(type: SummonEffectType, countType?: CommonCountType): PropData {
            if (type == SummonEffectType.Summon) {
                return this.getPropDataByType(this.model.type);
            } else if (type == SummonEffectType.Fuchenlinghu) {
                let fuchenlinghuProxy: FuchenlinghuProxy = getProxy(ModName.Activity, ProxyType.Fuchenlinghu);
                let cost = fuchenlinghuProxy.getCost(countType);
                return PropData.create(cost[0], cost[1]);
            } else if (type == SummonEffectType.Linghuxianling) {
                let fuchenlinghuProxy: FuchenlinghuProxy = getProxy(ModName.Activity, ProxyType.Fuchenlinghu);
                let cost = fuchenlinghuProxy.getCostSpecial();
                return PropData.create(cost[0], cost[1]);
            }
            return null;
        }

        //召唤特效界面的点击回调函数 todo
        private getSummonEffectHandler(type: SummonEffectType, countType?: CommonCountType): Handler {
            if (type == SummonEffectType.Summon) {
                return Handler.alloc(this, () => {
                    this.c2s_draw_button_click(this.model.type);
                });
            } else if (type == SummonEffectType.Fuchenlinghu) {
                let fuchenlinghuProxy: FuchenlinghuProxy = getProxy(ModName.Activity, ProxyType.Fuchenlinghu);
                return fuchenlinghuProxy.getOperHandler(countType);
            } else if (type == SummonEffectType.Linghuxianling) {
                let fuchenlinghuProxy: FuchenlinghuProxy = getProxy(ModName.Activity, ProxyType.Fuchenlinghu);
                return fuchenlinghuProxy.getOperHandlerSpecial();
            }
            return null;
        }

        /**抽奖数据 */
        private s2c_draw_base_data(n: GameNT): void {
            let msg: s2c_draw_base_data = n.body;
            if (msg.count) {
                this._model.count = msg.count;
            }
            if (msg.score) {
                this._model.score = msg.score;
            }
            if (msg.min_luck_score) {
                this._model.min_luck_score = msg.min_luck_score;
            }
            if (msg.max_luck_score) {
                this._model.max_luck_score = msg.max_luck_score;
            }
            this.sendNt(ActivityEvent.ON_UPDATE_SUMMON);
        }

        /**--------------------协议end-------------------- */

        /**获取风云录列表信息*/
        public getFengYunRankList(): ISummonFengYunData[] {
            let cfgArr: DrawCountRewardsConfig[] = getConfigListByName(ConfigName.DrawCountRewards);
            let list: ISummonFengYunData[] = [];
            outer: for (let cfg of cfgArr) {
                if (this._model.list && this._model.list.length > 0) {
                    for (let item of this._model.list) {
                        if (item.index == cfg.index) {
                            list.push({cfg, rankInfo: item.role_info, status: item.status});
                            continue outer;
                        }
                    }
                    list.push({cfg, status: 0});
                } else {
                    list.push({cfg, status: 0});
                }
            }
            list.sort((a, b) => {
                if (a.status == RewardStatus.Draw || b.status == RewardStatus.Draw) {
                    if (a.status != b.status) {
                        if (a.status == RewardStatus.Draw) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                }
                return a.cfg.index - b.cfg.index;
            })
            return list;
        }

        /**获取剩余购买数量 */
        public getCountByIndex(index: number): number {
            if (this._model.list) {
                for (let item of this._model.item_list) {
                    if (item.index == index) {
                        return item.count;
                    }
                }
            }
            return -1;
        }

        /**获取排名数据 */
        public getItemByRank(rank: number): teammate {
            return this._model.rank_list[rank - 1] || null;
        }

        /**获取区间排行榜列表 参数为排名 需要-1转换索引 */
        public getListBySection(rank: string): IRankSectionData[] {
            let strArr: string[] = rank.split("-");
            let arr = this._model.rank_list.slice(+strArr[0] - 1, +strArr[1] - 1);
            let list: IRankSectionData[] = [];
            if (arr && arr.length > 0) {
                for (let item of arr) {
                    list.push({
                        rank: item.rank_num,
                        name: item.name,
                        value: +item.value
                    });
                }
            }
            /**开始的排名 */
            let start: number = +strArr[0] + arr.length;
            if (start <= +strArr[1]) {
                let nobody: IRankSectionData[] = this.getNobodyListBySection(start, +strArr[1]);
                for (let item of nobody) {
                    list.push(item);
                }
                // list.concat(nobody);
            }
            return list;
        }

        /**无人上榜的空数组 参数为排名 */
        public getNobodyListBySection(start: number, end: number): IRankSectionData[] {
            let list: IRankSectionData[] = [];
            for (let i = start; i <= end; i++) {
                list.push({
                    rank: i,
                    name: "虚位以待",
                    value: 0
                });
            }
            return list;
        }

        /**获取排行榜展示列表 (查看排名)*/
        public getRankList(): RankRewardRenderData[] {
            let cfgArr: DrawRankConfig[] = getConfigListByName(ConfigName.DrawRank);
            let list: RankRewardRenderData[] = [];
            for (let cfg of cfgArr) {
                if (cfg.rank_section[0] == cfg.rank_section[1]) {
                    let rank: number = cfg.rank_section[0];
                    let item: teammate = this.getItemByRank(rank);
                    list.push({
                        rank: rank,
                        name: item && item.name || "虚位以待",
                        hurtStr: item && item.value.toString() || "",
                        reward: [cfg.rewards]
                    });
                } else {
                    let str: string = TextUtil.addLinkHtmlTxt(getLanById(LanDef.tongtiange_tips12), WhiteColor.DEFAULT, "");
                    let last: boolean = cfg.rank_section[1] > 100;
                    let rank: string = last ? `${cfg.rank_section[0] - 1}+` : `${cfg.rank_section[0]}-${cfg.rank_section[1]}`;
                    list.push({
                        rank,
                        name: "",
                        reward: [cfg.rewards],
                        lookHandler: base.Handler.alloc(this, () => {
                            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.SummonRankTips, {rank});
                        })
                    });
                }
            }
            return list;
        }

        /**根据类型获取积分 */
        public getScoreByType(type: number, min?: number): number {
            if (type == 1) {
                return this._model.score;
            } else if (type == 2) {
                return this._model.unluck_score;
            } else if (type == 3) {
                if (min == 1) {
                    return this._model.min_luck_score;
                } else if (min == 2) {
                    return this._model.max_luck_score;
                }
            }
            return 0;
        }

        /**根据类型获取配置 */
        public getGiftCfgByType(type: number, len: number = 8): ISummonGiftData[] {
            let cfgArr: { [key: string]: DrawLuckGiftConfig } = getConfigByNameId(ConfigName.DrawLuckGift, type) as { [key: string]: DrawLuckGiftConfig };
            let list: ISummonGiftData[] = [];
            for (let key in cfgArr) {
                let cfg = cfgArr[key];
                let status = this.getStatus(type, cfg.index);
                // if (status.status != 1) {
                //     list.push({ type, cfg, status });
                // }
                list.push({type, cfg, status});
            }
            list.sort((a, b) => {
                if (a.status.status != b.status.status) {
                    return a.status.status - b.status.status;
                }
                if (!a.status.status) {
                    return a.cfg.index - b.cfg.index;
                }
                return b.cfg.index - a.cfg.index;
            });
            return list.slice(0, len);
        }

        /**获取命运豪礼礼包状态 */
        private getStatus(type: number, index: number): draw_luck_gift_data {
            let info = this._model.gift_list[type];
            if (!info) {
                return null;
            }
            for (let item of info.list) {
                if (item.index == index) {
                    return item;
                }
            }
            return null;
        }

        /**剩余次数 保底剩余次数为1时显示下次必得  -1不显示保底*/
        public getCount(count: number): number {
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "zhaohuan_bottom");
            if (cfg && cfg.value) {
                for (let v of cfg.value) {
                    if (count < v[0]) {
                        return v[0] - count;
                    }
                }
            }
            return -1;
        }

        /**获取单抽/十连需要的道具和数量 */
        public getPropDataByType(type: CommonCountType): PropData {
            let count: number = CountByType[type];
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "zhaohuan_item");
            let item1 = cfg.value[count];
            if (item1) {
                let isEnough: boolean = BagUtil.checkPropCnt(item1[0], item1[1]);
                if (isEnough) {
                    return PropData.create(item1[0], item1[1]);
                }
            }
            let cfg2: ParamConfig = getConfigByNameId(ConfigName.Param, "zhaohuan_item_list");
            let item2 = cfg2.value[count];
            if (item2) {
                return PropData.create(item2[0], item2[1]);
            }
            console.error("检查参数表是否缺少配置");
            return PropData.create(PropIndex.Xianyu);
        }

        /**获取保底道具 */
        public getMustGetProp(): PropData {
            // let count: number = this.getCount(this._model.count);
            // if (count != -1) {
            //     let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "zhaohuan_bottom");
            //     for (let v of cfg.value) {
            //         if (count <= v[0]) {
            //             return PropData.create(v[1], v[2]);
            //         }
            //     }
            // }
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "zhaohuan_bottom");
            for (let v of cfg.value) {
                if (this._model.count < v[0]) {
                    return PropData.create(v[1], v[2]);
                }
            }
            return null;
        }

        /**我的排名 */
        public get myRank(): string | number {
            return this._model.my_data && this._model.my_data.rank_num;
        }

        /**我的排名次数 */
        public get myRankCount(): number {
            return this._model.my_data && +this._model.my_data.value || 0;
        }

        private onUpdateHintByGift(): void {
            let list = this.getGiftCfgByType(2);
            let root: string[] = [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonGift, MdrTabBtnType.TabBtnType02];
            if (list) {
                for (let item of list) {
                    if (this._model.unluck_score >= item.cfg.condition[0]) {
                        HintMgr.setHint(true, root);
                        return;
                    }
                }
            }
            HintMgr.setHint(false, root);
        }

        private onUpdateHintByFengyun(): void {
            for (let item of this._model.list) {
                if (item.status === 1) {
                    HintMgr.setHint(true, [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonRank, MainActivityViewType.SummonRankGods]);
                    return;
                }
            }
            HintMgr.setHint(false, [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonRank, MainActivityViewType.SummonRankGods]);
        }

        private onUpdateHintByExchange(): void {
            let root: string[] = [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonExchange];
            let cfgArr: DrawGiftConfig[] = getConfigListByName(ConfigName.DrawGift);
            for (let cfg of cfgArr) {
                if (BagUtil.checkPropCnt(cfg.cost[0], cfg.cost[1])) {
                    HintMgr.setHint(true, root);
                    return;
                }
            }
            HintMgr.setHint(false, root);
        }

        private onUpdateHintByProp(): void {
            let root: string[] = [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, "00"];
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "zhaohuan_item");
            let item1 = cfg.value[CountByType[CommonCountType.Once]];
            if (BagUtil.checkPropCnt(item1[0], item1[1])) {
                HintMgr.setHint(true, root);
                return;
            }
            HintMgr.setHint(false, root);
        }

        protected onBagUpdateByPropIndex(n: GameNT): void {
            let indexs: number[] = n.body;

            if (indexs.indexOf(PropIndex.SummonLiQuan) > -1) {
                this.onUpdateHintByExchange();
            }
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "zhaohuan_item");
            let item1 = cfg.value[CountByType[CommonCountType.Once]];
            if (indexs.indexOf(item1[0]) > -1) {
                this.onUpdateHintByProp();
            }

        }

        /**根据类型获取积分 类型3欧皇不显示 */
        public getCountByType(type: number): number {
            switch (type) {
                case 1:
                    return this._model.score;
                case 2:
                    return this._model.unluck_score;
                default:
                    return 0;
            }
        }

        /**获取提示 */
        public getTipsByType(type: number): string {
            switch (type) {
                case 1:
                    return LanDef.zhaohuan_tips1;
                case 2:
                    return LanDef.zhaohuan_tips2;
                case 3:
                    return LanDef.zhaohuan_tips3;
                default:
                    return "";
            }
        }

        public get luck_num(): number {
            return this._model.luck_num;
        }

        public set luck_num(val: number) {
            this._model.luck_num = val;
        }

        public get mdrType(): number {
            return this._model.mdrType;
        }

        public set mdrType(val: number) {
            this._model.mdrType = val;
        }

        public get count(): number {
            return this._model.count;
        }
    }

    export const CountByType = {
        [CommonCountType.Once]: 0,
        [CommonCountType.Ten]: 1,
        [CommonCountType.Hund]: 2
    };
}