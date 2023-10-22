namespace game.mod.activity {


    import chonglist_gift_data = msg.chonglist_gift_data;
    import c2s_chonglist_item_buy_gift = msg.c2s_chonglist_item_buy_gift;
    import GameNT = base.GameNT;
    import s2c_chonglist_base_info = msg.s2c_chonglist_base_info;
    import c2s_chonglist_receive_reward = msg.c2s_chonglist_receive_reward;
    import s2c_chonglist_receive_reward = msg.s2c_chonglist_receive_reward;
    import chonglist_revelry_data = msg.chonglist_revelry_data;
    import s2c_update_chonglist_revelry_data = msg.s2c_update_chonglist_revelry_data;
    import ParamConfig = game.config.ParamConfig;
    import TimeMgr = base.TimeMgr;
    import s2c_rank_info = msg.s2c_rank_info;
    import ChonglistRankConfig = game.config.ChonglistRankConfig;
    import rank_info = msg.rank_info;
    import s2c_chonglist_item_buy_gift = msg.s2c_chonglist_item_buy_gift;
    import ChonglistGiftConfig = game.config.ChonglistGiftConfig;
    import ShopConfig = game.config.ShopConfig;
    import GiftBagConfig = game.config.GiftBagConfig;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;

    export class PunshListProxy extends ProxyBase implements IPunshListProxy {
        private _model: PunshListModel;

        public get model(): PunshListModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new PunshListModel();

            this.onProto(s2c_chonglist_base_info, this.s2c_chonglist_base_info, this);
            this.onProto(s2c_chonglist_receive_reward, this.s2c_chonglist_receive_reward, this);
            this.onProto(s2c_update_chonglist_revelry_data, this.s2c_update_chonglist_revelry_data, this);
            this.onProto(s2c_chonglist_item_buy_gift, this.s2c_chonglist_item_buy_gift, this);

            // facade.onNt(TaskEvent.ON_TASK_UPDATE, this.onUpdateHint, this);
        }

        private s2c_chonglist_item_buy_gift(n: GameNT): void {
            let msg: s2c_chonglist_item_buy_gift = n.body;
            if (msg.data) {
                let gifts = this.getGifts(msg.type);
                let bool: boolean = false;
                if (gifts) {
                    for (let i = 0; i < gifts.length; i++) {
                        if (gifts[i].index == msg.data.index) {
                            gifts[i] = msg.data;
                            bool = true;
                            break;
                        }
                    }
                    if (!bool) {
                        gifts.push(msg.data);
                    }
                } else {
                    this._model.gifts[msg.type] = [msg.data];
                }
            }
            this.sendNt(ActivityEvent.ON_UPDATE_PUNSHLIST_INFO);
        }

        private s2c_chonglist_base_info(n: GameNT): void {
            let msg: s2c_chonglist_base_info = n.body;
            if (msg.gift_list) {
                this._model.gifts[msg.type] = msg.gift_list
            }
            if (msg.revelry_list) {
                this._model.datas[msg.type] = msg.revelry_list;
            }
            this._model.score = msg.score || 0;
            if (msg.type != this._model.type) {
                this._model.type = msg.type;
                this.sendNt(ActivityEvent.ON_UPDATE_PUNSHLIST_TYPE);
            }
            this.onUpdateHint();
            this.sendNt(ActivityEvent.ON_UPDATE_PUNSHLIST_INFO);
        }

        private s2c_chonglist_receive_reward(n: GameNT): void {
            let msg: s2c_chonglist_receive_reward = n.body;
            if (msg.data) {
                let datas: chonglist_revelry_data[] = this.getDatas(msg.type);
                if (datas) {
                    let bool: boolean = false;
                    for (let i = 0; i < datas.length; i++) {
                        if (datas[i].index == msg.data.index) {
                            datas[i] = msg.data;
                            bool = true;
                            break;
                        }
                    }
                    if (!bool) {
                        datas.push(msg.data);
                    }
                } else {
                    this._model.datas[msg.type] = [msg.data];
                }
            }
            this.onUpdateHint();
            this.sendNt(ActivityEvent.ON_UPDATE_PUNSHLIST_INFO);
        }

        private s2c_update_chonglist_revelry_data(n: GameNT): void {
            let msg: s2c_update_chonglist_revelry_data = n.body;
            if (msg.data) {
                let datas: chonglist_revelry_data[] = this.getDatas(msg.type);
                if (datas) {
                    let bool: boolean = false;
                    for (let i = 0; i < datas.length; i++) {
                        if (datas[i].index == msg.data.index) {
                            datas[i] = msg.data;
                            bool = true;
                            break;
                        }
                    }
                    if (!bool) {
                        datas.push(msg.data);
                    }
                } else {
                    this._model.datas[msg.type] = [msg.data];
                }
            }
            this._model.score = msg.score || 0;
            this.onUpdateHint();
            this.sendNt(ActivityEvent.ON_UPDATE_PUNSHLIST_INFO);
        }

        public c2s_chonglist_item_buy_gift(type: number, index: number): void {
            let msg: c2s_chonglist_item_buy_gift = new c2s_chonglist_item_buy_gift();
            msg.type = type;
            msg.index = index;
            this.sendProto(msg);
        }

        public c2s_chonglist_receive_reward(type: number, index: number): void {
            let msg: c2s_chonglist_receive_reward = new c2s_chonglist_receive_reward();
            msg.type = type;
            msg.index = index;
            this.sendProto(msg);
        }

        public getGifts(type: number) {
            return this._model.gifts[type];
        }

        public getGift(type: number, index: number): chonglist_gift_data {
            let datas: chonglist_gift_data[] = this.getGifts(type);
            if (!datas) {
                return null;
            }
            for (let data of datas) {
                if (data.index == index) {
                    return data;
                }
            }
            return null;
        }

        public get type(): number {
            return this._model.type;
        }

        public get surfaceType(): number[] {
            return this._model.surfaceType;
        }

        public get roleType(): number[] {
            return this._model.roleType;
        }

        public getDatas(type: number): chonglist_revelry_data[] {
            return this._model.datas[type];
        }

        public getData(type: number, index: number): chonglist_revelry_data {
            let datas: chonglist_revelry_data[] = this.getDatas(type);
            if (datas) {
                for (let data of datas) {
                    if (data.index == index) {
                        return data;
                    }
                }
            }
            return null;
        }

        public getRankTypeByOpenIdx(openIdx: number): number {
            return this._model.openIdxToRankType[openIdx] || 0;
        }

        public get openIdxs(): number[] {
            return this._model.openIdxs;
        }

        public getEndTime(): number {
            let cfg: ParamConfig = GameConfig.getParamConfigById("chonglist_open");
            for (let open of cfg.value) {
                if (open[0] == this.type) {
                    let day: number = open[2] - RoleUtil.getServerDay();
                    let next: number = day + 1;
                    return TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false, next);
                }
            }
            return 0;
        }

        /**活动最后一天提示*/
        public checkActTips(type: NotTipsType): void {
            let endTime = this.getEndTime();
            ViewMgr.getIns().showActTips(endTime, type);
        }

        public getBigReward(cfg: ChonglistGiftConfig): number[] {
            if (cfg.buy_type == 1) {
                let shop: ShopConfig = getConfigByNameId(ConfigName.Store, cfg.shop_index);
                return shop.prop[0]
            } else {
                let gift: GiftBagConfig = getConfigByNameId(ConfigName.GiftBag, cfg.shop_index);
                return gift.awards[0];
            }
        }

        public getRankStr(type: number): string {
            let info: s2c_rank_info = RankUtil.getNewRankInfo(type);
            let cfgs = getConfigByNameId(ConfigName.ChonglistRank, type);
            let maxRank: number = MAX_RANK_NUM;
            for (let k in cfgs) {
                let cfg: ChonglistRankConfig = cfgs[k];
                maxRank = cfg.rank_no;
            }
            let myRankNum: string = `${maxRank}+`;
            if (info && info.my_rank_num <= maxRank) {
                myRankNum = `${info.my_rank_num}`;
            }
            return StringUtil.substitute(getLanById(LanDef.compete_mars_4), [TextUtil.addColor(myRankNum, WhiteColor.GREEN)]);
        }

        public getRankScore(type: number): string {
            return RankUtil.getMyRankTypeDesc(type, true);
        }

        /**获取区间排行榜列表 参数为排名 需要-1转换索引 */
        public getListBySection(rank: string): IRankSectionData[] {
            let strArr: string[] = rank.split("-");
            let info: s2c_rank_info = RankUtil.getNewRankInfo(this.type);
            let info_list: rank_info[] = info && info.info_list ? info.info_list : [];
            let arr = info_list.slice(+strArr[0] - 1, +strArr[1] - 1);
            let list: IRankSectionData[] = [];
            let rank_no: number = +strArr[0];
            if (arr && arr.length > 0) {
                for (let item of arr) {
                    let teammate = item && item.base_info;
                    let power: Long = item && item[this._model.getRankPowerByType[this.type]];
                    let str: string = StringUtil.getHurtNumStr(power && power.toNumber() || 0);
                    list.push({
                        rank: rank_no++,
                        name: teammate.name,
                        value: str
                    })
                }
            }
            /**开始的排名 */
            let start: number = +strArr[0] + arr.length;
            if (start <= +strArr[1]) {
                let nobody: IRankSectionData[] = this.getNobodyListBySection(start, +strArr[1]);
                for (let item of nobody) {
                    list.push(item);
                }
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
                })
            }
            return list;
        }

        public getRankFirst(): rank_info {
            let info: s2c_rank_info = RankUtil.getNewRankInfo(this.type);
            let info_list: rank_info[] = info && info.info_list ? info.info_list : [];
            if (info_list && info_list.length) {
                return info_list[0]
            }
            return null;
        }

        public getRankList(type: number = this.type): RankRewardRenderData[] {
            let info: s2c_rank_info = RankUtil.getNewRankInfo(this.type);
            let info_list: rank_info[] = info && info.info_list ? info.info_list : [];
            let cfgs = getConfigByNameId(ConfigName.ChonglistRank, type);
            let list: RankRewardRenderData[] = [];
            let last_rank: number = 0;
            for (let k in cfgs) {
                let cfg: ChonglistRankConfig = cfgs[k];
                if (cfg.rank_no == last_rank + 1) {
                    let item = info_list[cfg.rank_no - 1];
                    let teammate = item && item.base_info;
                    let power: Long = item && item[this._model.getRankPowerByType[type]];
                    let str: string = StringUtil.getHurtNumStr(power && power.toNumber() || 0);
                    list.push({
                        rank: cfg.rank_no,
                        name: teammate && teammate.name || "虚位以待",
                        hurtStr: str,
                        reward: [...cfg.reward]
                    });
                    last_rank = cfg.rank_no;
                } else {
                    let rank: string = `${last_rank + 1}-${cfg.rank_no}`;
                    let lookHandler: Handler = null;
                    if (cfg.rank_no >= 999) {
                        rank = `${last_rank}+`;
                    } else {
                        lookHandler = Handler.alloc(this, () => {
                            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.PunshListRankSection, {
                                rank,
                                list: this.getListBySection(rank),
                                strRank: this.getRankStr(type),
                                strScore: this.getRankScore(type)
                            });
                        });
                    }
                    // let str: string = TextUtil.addLinkHtmlTxt(getLanById(LanDef.tongtiange_tips12), WhiteColor.DEFAULT, "");
                    // let name: string = cfg.rank_no >= 999 ? "" : str;
                    let name = '';
                    list.push({
                        rank,
                        name,
                        reward: [...cfg.reward],
                        lookHandler
                    });
                    last_rank = cfg.rank_no;
                }
            }
            return list;
        }

        public onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.PunshList) > -1) {
                this.onUpdateHint();
            }
        }

        private onUpdateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.PunshList)) {
                HintMgr.setHint(false, [ModName.Activity, MainActivityViewType.PunshList]);
                return;
            }
            let root: string[] = [ModName.Activity, MainActivityViewType.PunshList, MdrTabBtnType.TabBtnType01];
            let datas: chonglist_revelry_data[] = this.getDatas(this.type);
            if (datas) {
                for (let data of datas) {
                    if (data.status == 1) {
                        HintMgr.setHint(true, root);
                        this.setSurfaceHint(this.type, true);
                        return;
                    }
                }
            }
            // let tasks: task_data[] = TaskUtil.getTaskList(TaskType.PunshList, true, false);
            // for (let task of tasks) {
            //     if (task.status == TaskStatus.Finish) {
            //         HintMgr.setHint(true, root);
            //         this.setSurfaceHint(this.type, true);
            //         return;
            //     }
            // }
            let tasks_hint: boolean = TaskUtil.getTaskHint(TaskType.PunshList);
            if (tasks_hint) {
                HintMgr.setHint(tasks_hint, root);
                this.setSurfaceHint(this.type, tasks_hint);
                return;
            }
            HintMgr.setHint(false, root);
            this.setSurfaceHint(this.type, false);
        }

        private setSurfaceHint(type: number, bool: boolean): void {
            for (let k in this._model.hintsByType) {
                let root: string[] = this._model.hintsByType[k];
                let openIdx: number = this._model.getOpenIdxByRankType[k];
                if (!openIdx || !ViewMgr.getIns().checkViewOpen(openIdx)) {
                    HintMgr.setHint(false, root);
                    continue;
                }
                if (type == +k) {
                    HintMgr.setHint(bool, root);
                } else {
                    HintMgr.setHint(false, root);
                }
            }
        }

        public getSurfaceHintNodes(type: number): string[] {
            return this._model.hintsByType[type] || [];
        }

        public getJumpIdxByType(type: number): number {
            return this._model.getJumpIdxByType[type];
        }

        public getRankTitleByType(type: number): string {
            return this._model.getRankTitleByType[type];
        }

        public getOpenIdx(type: number): number {
            return this._model.getOpenIdxByRankType[type];
        }
    }
}