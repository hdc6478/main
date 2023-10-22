namespace game.mod.more {

    import c2s_xiandi_zhengba_oper = msg.c2s_xiandi_zhengba_oper;
    import c2s_tiandi_zhengba_ui_info = msg.c2s_tiandi_zhengba_ui_info;
    import s2c_xiandi_zhengba_rank = msg.s2c_xiandi_zhengba_rank;
    import s2c_xiandi_zhanshi_info = msg.s2c_xiandi_zhanshi_info;
    import s2c_tiandi_zhengba_ui_info = msg.s2c_tiandi_zhengba_ui_info;
    import s2c_xiandi_zhengba_challenge_info = msg.s2c_xiandi_zhengba_challenge_info;
    import c2s_tiandi_box_challenge = msg.c2s_tiandi_box_challenge;
    import c2s_tiandi_box_oper = msg.c2s_tiandi_box_oper;
    import s2c_tiandi_box_update = msg.s2c_tiandi_box_update;
    import ParamConfig = game.config.ParamConfig;
    import XiandiRankConfig = game.config.XiandiRankConfig;
    import ShopConfig = game.config.ShopConfig;
    import teammate = msg.teammate;
    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import GameNT = base.GameNT;
    import XiandiXianqiConfig = game.config.XiandiXianqiConfig;

    export class XiandiProxy extends ProxyBase implements IXiandiProxy {
        private _model: XiandiModel;

        initialize(): void {
            super.initialize();
            this._model = new XiandiModel();
            this.onProto(s2c_xiandi_zhengba_rank, this.s2c_xiandi_zhengba_rank, this);
            this.onProto(s2c_xiandi_zhanshi_info, this.s2c_xiandi_zhanshi_info, this);
            this.onProto(s2c_tiandi_zhengba_ui_info, this.s2c_tiandi_zhengba_ui_info, this);
            this.onProto(s2c_xiandi_zhengba_challenge_info, this.s2c_xiandi_zhengba_challenge_info, this);
            this.onProto(s2c_tiandi_box_update, this.s2c_tiandi_box_update, this);
        }

        /**------------------------协议------------------------- */

        public c2s_xiandi_zhengba_oper(oper_type: number, params?: number, role_id?: Long): void {
            let msg: c2s_xiandi_zhengba_oper = new c2s_xiandi_zhengba_oper();
            msg.oper_type = oper_type;
            if (params) {
                msg.params = params;
            }
            if (role_id) {
                msg.role_id = role_id;
            }
            this.sendProto(msg);
        }

        public c2s_tiandi_zhengba_ui_info(): void {
            let msg: c2s_tiandi_zhengba_ui_info = new c2s_tiandi_zhengba_ui_info();
            this.sendProto(msg);
        }

        private s2c_xiandi_zhengba_rank(n: base.GameNT): void {
            let msg: s2c_xiandi_zhengba_rank = n.body;
            this._model.free_times = msg.free_times || 0;
            if (msg.geren_ranks) {
                this._model.geren_ranks = msg.geren_ranks;
            }
            if (msg.guild_ranks) {
                this._model.guild_ranks = msg.guild_ranks;
            }
            if (msg.my_guild_rank) {
                this._model.my_guild_rank = msg.my_guild_rank;
            }
            if (msg.my_rank) {
                this._model.my_rank = msg.my_rank;
            }
            this.onUpdateActIcon();
            this.onUpdateHint();
            this.sendNt(HuangguEvent.ON_UPDATE_XIANDI_RANK);
        }

        /** */
        private s2c_xiandi_zhanshi_info(n: base.GameNT): void {
            let msg: s2c_xiandi_zhanshi_info = n.body;
            if (msg.param == 1) {
                this._model.click_count = msg.click_count || 0;
                this._model.is_click = msg.is_click || false;
                this._model.skill_lv = msg.skill_lv || 0;
                this._model.tiandi_info = msg.tiandi_info || null;
                this._model.tianwang_info = msg.tianwang_info || [];
                this._model.hongyan_info = msg.hongyan_info || null;
                this._model.xianhou_info = msg.xianhou_info || null;
                this._model.is_gongfeng = msg.is_gongfeng || false;
            } else {
                if (msg.click_count) {
                    this._model.click_count = msg.click_count;
                }
                if (msg.is_click) {
                    this._model.is_click = msg.is_click;
                }
                if (msg.skill_lv) {
                    this._model.skill_lv = msg.skill_lv;
                }
                if (msg.tiandi_info) {
                    this._model.tiandi_info = msg.tiandi_info;
                }
                if (msg.tianwang_info) {
                    this._model.tianwang_info = msg.tianwang_info;
                }
                if (msg.hongyan_info) {
                    this._model.hongyan_info = msg.hongyan_info;
                }
                if (msg.xianhou_info) {
                    this._model.xianhou_info = msg.xianhou_info;
                }
                this._model.is_gongfeng = msg.is_gongfeng || false;
            }
            this.onUpdateActIcon();
            this.onUpdateHint();
            this.sendNt(HuangguEvent.ON_UPDATE_XIANDI_INFO);
        }

        private s2c_tiandi_zhengba_ui_info(n: base.GameNT): void {
            let msg: s2c_tiandi_zhengba_ui_info = n.body;
            if (msg.flag) {
                ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XiandiTips, msg.flag);
            }
        }

        private s2c_xiandi_zhengba_challenge_info(n: base.GameNT): void {
            let msg: s2c_xiandi_zhengba_challenge_info = n.body;
            if (msg.player_info) {
                ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.CommonMatch, {
                    type: 1,
                    players: [{ name: RoleVo.ins.name, sex: RoleVo.ins.sex, showpower: RoleVo.ins.showpower }],
                    enemys: [msg.player_info],
                    handler: base.Handler.alloc(this, () => {
                        this.c2s_xiandi_zhengba_oper(1);
                    })
                });
            }
        }

        /**------------------------协议------------------------- */

        /**------------------------数据------------------------- */

        public get is_tiandi(): boolean {
            return this.tiandi_info && this.tiandi_info.role_id.eq(RoleVo.ins.role_id) || false;
        }

        public get is_king(): boolean {
            let king: teammate = this._model.tianwang_info && this._model.tianwang_info.find(v => { return v.role_id.eq(RoleVo.ins.role_id) });
            return !!king;
        }

        public get free_times(): number {
            return this._model.free_times || 0;
        }

        public get is_gongfeng(): boolean {
            return this._model.is_gongfeng || false;
        }

        public get geren_ranks(): teammate[] {
            return this._model.geren_ranks || null;
        }

        public get guild_ranks(): teammate[] {
            return this._model.guild_ranks || null;
        }

        public get is_job(): boolean {
            return this.is_tiandi || this.is_king;
        }

        public checkJob(role_id: Long): boolean {
            let king: teammate = this._model.tianwang_info && this._model.tianwang_info.find(v => { return v.role_id.eq(role_id) });
            if (king) {
                return true;
            }
            return this.tiandi_info && this.tiandi_info.role_id.eq(role_id);
        }

        public getRanks(type: number): teammate[] {
            if (type == XiandiRankType.Guild) {
                return this.guild_ranks;
            } else {
                return this.geren_ranks;
            }
        }

        public getRankList(type: number): RankRewardRenderData[] {
            let ranks = this.getRanks(type);
            let cfgArr = getConfigByNameId(ConfigName.XiandiRank, type);
            let list: RankRewardRenderData[] = [];
            for (let k in cfgArr) {
                let cfg: XiandiRankConfig = cfgArr[k];
                let start: number = cfg.rank_no[0];
                let end: number = cfg.rank_no[1];
                if (start == end) {
                    let item = ranks && ranks[start - 1];
                    let name: string = this.getRankItemName(item, type);
                    list.push({
                        rank: start,
                        name,
                        hurtStr: item && item.value.toString() || "",
                        reward: cfg.awards
                    })
                } else {
                    // let str: string = TextUtil.addLinkHtmlTxt(getLanById(LanDef.tongtiange_tips12), WhiteColor.DEFAULT, "");
                    let rank: string = start > MAX_RANK_NUM ? `${start - 1}+` : `${start}-${end}`
                    list.push({
                        rank,
                        name: "",
                        reward: cfg.awards,
                        lookHandler: base.Handler.alloc(this, () => {
                            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XiandiSection, { rank, type })
                        })
                    })
                }
            }
            return list;
        }

        public getRankItemName(item: teammate, type: number): string {
            if (!item) {
                return getLanById(LanDef.tishi_2);
            }
            if (type == XiandiRankType.Guild) {
                return `仙宗:${item.guild_name}\n宗主:${item.name}`;
            } else {
                return item.name;
            }
        }

        public getRankInfo(type: number): teammate {
            return type == XiandiRankType.Guild ? this._model.my_guild_rank : this._model.my_rank;
        }

        public getRankStr(type: number): string {
            let info: teammate = this.getRankInfo(type);
            // let str: string = "";
            // if (info && info.rank_num) {
            //     str = TextUtil.addColor(`${info.rank_num}`, WhiteColor.GREEN);
            // } else {
            //     str = getLanById(LanDef.compete_mars_16);
            // }
            // return StringUtil.substitute(lan, [str]);
            if (info && info.rank_num) {
                let str: string = TextUtil.addColor(`${info.rank_num}`, WhiteColor.GREEN);
                let lan: string = type == XiandiRankType.Person ? getLanById(LanDef.compete_mars_4) : getLanById(LanDef.xianzong_tips8);
                return StringUtil.substitute(lan, [str]);
            } else {
                let param: ParamConfig = GameConfig.getParamConfigById(`xiandi_rank`);
                let count: number = 0;
                let centent: string = "";
                if (type == XiandiRankType.Person) {
                    count = param.value[1];
                    centent = getLanById(LanDef.xiandi_tips15)
                } else {
                    count = param.value[0];
                    centent = getLanById(LanDef.xiandi_tips16)
                }
                return StringUtil.substitute(centent, [count]);
            }
        }

        public getRankCountStr(type: number): string {
            let info: teammate = this.getRankInfo(type);
            let str: string = TextUtil.addColor(`${info && info.value || 0}`, WhiteColor.GREEN);
            let centent: string = "";
            if (type == XiandiRankType.Person) {
                centent = getLanById(LanDef.xiandi_tips17)
            } else {
                centent = getLanById(LanDef.xiandi_tips18)
            }
            return StringUtil.substitute(centent, [str]);
        }

        /**获取区间排行榜列表 参数为排名 需要-1转换索引 */
        public getRankSection(rank: string, type: number): IRankSectionData[] {
            let strArr: string[] = rank.split("-");
            let start: number = +strArr[0];
            let end: number = +strArr[1];
            let ranks: teammate[] = this.getRanks(type);
            let list: IRankSectionData[] = [];
            for (let i = start - 1; i < end; i++) {
                let item = ranks && ranks[i];
                let name: string = this.getRankItemName(item, type);
                if (item) {
                    list.push({ rank: item.rank_num, name, value: +item.value });
                } else {
                    list.push({ rank: i + 1, name, value: 0 });
                }
            }
            return list;
        }

        public getKingInfo(index: number): teammate {
            if (!this._model.tianwang_info) {
                return null;
            }
            return this._model.tianwang_info.find(v => {
                return v.index == index;
            })
        }

        public get tiandi_info(): teammate {
            return this._model.tiandi_info || null;
        }

        public get hongyan_info(): teammate {
            return this._model.hongyan_info || null;
        }

        public get xianhou_info(): teammate {
            return this._model.xianhou_info || null;
        }

        public get click_count(): number {
            return this._model.click_count || 0;
        }

        public get is_click(): boolean {
            return this._model.is_click || false;
        }

        public get skill_lv(): number {
            return this._model.skill_lv || 0;
        }

        /**周日开启 */
        public checkOpen(): boolean {
            // if (DEBUG) {
            //     return true;
            // }
            let now_day = TimeUtil.formatWeekday(TimeMgr.time.serverTimeSecond * 1000);
            return !now_day && RoleUtil.getServerDay() >= this.xiandi_open;
        }

        public get king_index(): number {
            return this._model.king_index || 0;
        }

        public set king_index(v: number) {
            this._model.king_index = v;
        }

        /**------------------------数据------------------------- */

        /**-------------------------参数表配置------------------------ */

        public get tiandi_zhengba_tiaozhan_xiaohao(): number[] {
            if (!this._model.tiandi_zhengba_tiaozhan_xiaohao) {
                let param: ParamConfig = GameConfig.getParamConfigById("tiandi_zhengba_tiaozhan_xiaohao");
                this._model.tiandi_zhengba_tiaozhan_xiaohao = param.value;
            }
            return this._model.tiandi_zhengba_tiaozhan_xiaohao;
        }

        public get tiandi_zhengba_tiaozhan_duowei(): number[] {
            if (!this._model.tiandi_zhengba_tiaozhan_duowei) {
                let param: ParamConfig = GameConfig.getParamConfigById("tiandi_zhengba_tiaozhan_duowei");
                this._model.tiandi_zhengba_tiaozhan_duowei = param.value;
            }
            return this._model.tiandi_zhengba_tiaozhan_duowei;
        }

        public get tiandi_zhengba_tiaozhan_mianfei(): number {
            if (!this._model.tiandi_zhengba_tiaozhan_mianfei) {
                let param: ParamConfig = GameConfig.getParamConfigById("tiandi_zhengba_tiaozhan_mianfei");
                this._model.tiandi_zhengba_tiaozhan_mianfei = param.value;
            }
            return this._model.tiandi_zhengba_tiaozhan_mianfei;
        }

        public get xiandi_rank(): number[] {
            if (!this._model.xiandi_rank) {
                let param: ParamConfig = GameConfig.getParamConfigById("xiandi_rank");
                this._model.xiandi_rank = param.value;
            }
            return this._model.xiandi_rank;
        }

        public get xiandi_jiangli(): number[][] {
            if (!this._model.xiandi_jiangli) {
                let param: ParamConfig = GameConfig.getParamConfigById("xiandi_jiangli");
                this._model.xiandi_jiangli = [];
                for (let idx of param.value) {
                    this._model.xiandi_jiangli.push([idx]);
                }
            }
            return this._model.xiandi_jiangli;
        }

        public get xiandi_libao(): number {
            if (!this._model.xiandi_libao) {
                let param: ParamConfig = GameConfig.getParamConfigById("xiandi_libao");
                this._model.xiandi_libao = param.value;
            }
            return this._model.xiandi_libao;
        }

        public get huanggu_nvshen_buff(): number[][] {
            if (!this._model.huanggu_nvshen_buff) {
                let param: ParamConfig = GameConfig.getParamConfigById("huanggu_nvshen_buff");
                this._model.huanggu_nvshen_buff = param.value;
            }
            return this._model.huanggu_nvshen_buff;
        }

        public get tiandi_zhengba_gongfeng(): number[][] {
            if (!this._model.tiandi_zhengba_gongfeng) {
                let param: ParamConfig = GameConfig.getParamConfigById("tiandi_zhengba_gongfeng");
                this._model.tiandi_zhengba_gongfeng = param.value;
            }
            return this._model.tiandi_zhengba_gongfeng;
        }

        public getBuff(): number {
            if (!this.skill_lv) {
                return this.huanggu_nvshen_buff[0][1];
            }
            for (let info of this.huanggu_nvshen_buff) {
                if (info[0] == this.skill_lv) {
                    return info[1];
                }
            }
            return this.huanggu_nvshen_buff[this.huanggu_nvshen_buff.length - 1][1];
        }

        public get xiandi_open(): number {
            if (!this._model.xiandi_open) {
                let param: ParamConfig = GameConfig.getParamConfigById("xiandi_open");
                this._model.xiandi_open = param.value;
            }
            return this._model.xiandi_open;
        }

        /**-------------------------参数表配置------------------------ */

        /**------------------------红点-------------------------*/
        private onUpdateHint(): void {
            let roots: string[] = [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu, MoreViewType.Xiandi];
            let isOpen = this.checkOpen();
            if (isOpen) {
                HintMgr.setHint(this.free_times > 0, roots);
                return;
            }
            if (!this.tiandi_info) {
                HintMgr.setHint(false, roots);
                return;
            }
            if (this.is_job) {
                if (!this.is_gongfeng) {
                    HintMgr.setHint(true, roots);
                    return;
                }
            }
            if (!this.is_click) {
                HintMgr.setHint(true, roots);
                return;
            }
            HintMgr.setHint(false, roots);
        }

        protected onServerDayUpdate(): void {
            this.onUpdateActIcon();
        }

        protected onOpenFuncUpdate(n: GameNT): void {
            let idxs = n.body as number[];
            if (idxs.indexOf(OpenIdx.Xiandi) > -1) {
                this.onUpdateActIcon();
            }
        }

        private onUpdateActIcon(): void {
            let isOpen = this.checkOpen();
            if (!isOpen) {
                let server: number = RoleUtil.getServerDay();
                let param: ParamConfig = GameConfig.getParamConfigById("xiandi_first");
                isOpen = param.value == server;
            }
            BtnIconMgr.insTop().updateOpen(BtnIconId.Xiandi, isOpen);
        }
        /**------------------------红点-------------------------*/

        /**弑帝夺位 */
        public onCheckJockey(): void {
            let prop: number[] = this.tiandi_zhengba_tiaozhan_duowei;
            let cost: number = prop[1];
            let count: number = BagUtil.getPropCntByIdx(prop[0]);
            if (count < cost) {
                ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XiandiGift, this.xiandi_libao);
                return;
            }
            let content: string = StringUtil.substitute(getLanById(LanDef.xiandi_tips13), [TextUtil.addColor(`${count}`, BlackColor.GREEN)]);
            ViewMgr.getIns().showConfirm(content, base.Handler.alloc(this, () => {
                this.c2s_xiandi_zhengba_oper(3);
            }))
        }

        /**-----------------------------二期功能-----------------------------*/

        private s2c_tiandi_box_update(n: GameNT): void {
            let msg: s2c_tiandi_box_update = n.body;
            this._model.count = msg.count || 0;
            this._model.reward_status = msg.reward_status || 0;
            this._model.is_huanhua = msg.is_huanhua || false;
            this._model.is_activa = msg.is_activa || false;
            this.onUpdateHintByReward();
            this.sendNt(HuangguEvent.ON_UPDATE_XIANDI_TREASURE);
        }

        /**1.幻化2.激活仙器3.奖励领取 */
        public c2s_tiandi_box_oper(oper: number): void {
            let msg: c2s_tiandi_box_oper = new c2s_tiandi_box_oper();
            msg.oper = oper;
            this.sendProto(msg);
        }

        public c2s_tiandi_box_challenge(): void {
            let msg: c2s_tiandi_box_challenge = new c2s_tiandi_box_challenge();
            this.sendProto(msg);
        }

        public get count(): number {
            return this._model.count;
        }

        public get is_huanhua(): boolean {
            return this._model.is_huanhua;
        }

        public get is_activa(): boolean {
            return this._model.is_activa;
        }

        public get reward_status(): number {
            return this._model.reward_status;
        }

        public get tiandi_box_have(): number[] {
            if (!this._model.tiandi_box_have) {
                let param: ParamConfig = GameConfig.getParamConfigById("tiandi_box_have");
                this._model.tiandi_box_have = param.value;
            }
            return this._model.tiandi_box_have;
        }

        public get xianqi_fuben_reward(): number[] {
            if (!this._model.xianqi_fuben_reward) {
                let param: ParamConfig = GameConfig.getParamConfigById("xianqi_fuben_reward");
                this._model.xianqi_fuben_reward = param.value;
            }
            return this._model.xianqi_fuben_reward;
        }

        // public get xianqi_buff_property(): number[] {
        //     if (!this._model.xianqi_buff_property) {
        //         let param: ParamConfig = GameConfig.getParamConfigById("xianqi_buff_property");
        //         this._model.xianqi_buff_property = param.value;
        //     }
        //     return this._model.xianqi_buff_property;
        // }

        public get xianqi_waixian(): number {
            if (!this._model.xianqi_waixian) {
                let param: ParamConfig = GameConfig.getParamConfigById("xianqi_waixian");
                this._model.xianqi_waixian = param.value;
            }
            return this._model.xianqi_waixian;
        }

        public get tiandi_box_iteam(): number {
            if (!this._model.tiandi_box_iteam) {
                let param: ParamConfig = GameConfig.getParamConfigById("tiandi_box_iteam");
                this._model.tiandi_box_iteam = param.value;
            }
            return this._model.tiandi_box_iteam;
        }

        // public get xianqi_stage_list(): number[][] {
        //     if (!this._model.xianqi_stage_list) {
        //         let param: ParamConfig = GameConfig.getParamConfigById("xianqi_stage_list");
        //         this._model.xianqi_stage_list = param.value;
        //     }
        //     return this._model.xianqi_stage_list;
        // }

        // public get xianqi_buff_attr(): number[][] {
        //     if (!this._model.xianqi_buff_attr) {
        //         let param: ParamConfig = GameConfig.getParamConfigById("xianqi_buff_attr");
        //         this._model.xianqi_buff_attr = param.value;
        //     }
        //     return this._model.xianqi_buff_attr;
        // }

        public get xianqi_stage(): number {
            let cfgArr: XiandiXianqiConfig[] = getConfigListByName(ConfigName.TiandiXianqi);
            let stage: number = 1;
            let open_day: number = RoleUtil.getServerDay();
            for (let cfg of cfgArr) {
                if (cfg.open_day > open_day) {
                    break;
                }
                stage = cfg.index;
            }
            return stage;
        }

        public get shops(): Map<number, ShopConfig[]> {
            if (!this._model.shops) {
                this._model.shops = new Map();
            }
            if (!this._model.shops.size) {
                let cfgArr: ShopConfig[] = getConfigListByName(ConfigName.Store);
                for (let cfg of cfgArr) {
                    if (cfg.type != StoreType.Xiandi) {
                        continue;
                    }
                    let list: ShopConfig[] = [];
                    if (this._model.shops.has(cfg.unlock)) {
                        list = this._model.shops.get(cfg.unlock);
                    }
                    list.push(cfg);
                    this._model.shops.set(cfg.unlock, list);
                }
            }
            return this._model.shops;
        }

        public get list(): ShopConfig[] {
            let open: number = RoleUtil.getServerDay();
            let day: number = 0;

            let keys: number[] = Array.from(this.shops.keys());
            for (let key of keys) {
                if (+key > open) {
                    break;
                }
                day = +key;
            }
            return this.shops.get(day);
        }

        private onUpdateHintByReward(): void {
            HintMgr.setHint(this.reward_status == 1, [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu, MoreViewType.Xiandi, MoreViewType.XiandiWeapon]);
        }

        /**-----------------------------二期功能-----------------------------*/
    }
}