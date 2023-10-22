namespace game.mod.gift {

    import c2s_jinjie_stage_get_list = msg.c2s_jinjie_stage_get_list;
    import c2s_jinjie_stage_get_reward = msg.c2s_jinjie_stage_get_reward;
    import GameNT = base.GameNT;
    import s2c_jinjie_stage_get_list = msg.s2c_jinjie_stage_get_list;
    import jinjie_list = msg.jinjie_list;
    import common_reward_status = msg.common_reward_status;
    import DabiaojiangliConfig = game.config.DabiaojiangliConfig;

    /**
     * @description 进阶礼包
     */
    export class GiftProxy extends ProxyBase implements IGiftProxy {
        private _model: GiftModel;

        initialize(): void {
            super.initialize();
            this._model = new GiftModel();
            this.onProto(s2c_jinjie_stage_get_list, this.s2c_jinjie_stage_get_list, this);
        }

        /** 点击阶段奖励信息 */
        public c2s_jinjie_stage_get_list(type: GiftType): void {
            let msg = new c2s_jinjie_stage_get_list();
            msg.type = type;
            this.sendProto(msg);
        }

        /**领取奖励*/
        public c2s_jinjie_stage_get_reward(type: GiftType, index: number): void {
            let msg = new c2s_jinjie_stage_get_reward();
            msg.type = type;
            msg.index = index;
            this.sendProto(msg);
        }

        /**奖励列表*/
        private s2c_jinjie_stage_get_list(n: GameNT): void {
            let msg = n.body as s2c_jinjie_stage_get_list;
            let types: number[] = [];//抛出 GiftType 类型
            if (msg.list != null) {
                for (let item of msg.list) {
                    this._model.giftMap[item.type] = item;
                    if (types.indexOf(item.type) < 0) {
                        types.push(item.type);
                    }
                }
            }
            this.updateHint(types);
            this.sendNt(GiftEvent.ON_UPDATE_GIFT_INFO, types);
        }

        /**================================== 协议 end ==================================*/

        /**根据类型，获取对应的进阶奖励列表*/
        public getGiftInfo(type: GiftType): jinjie_list {
            return this._model.giftMap[type];
        }

        /**根据类型和索引，获取对应的奖励状态信息*/
        public getGiftStatus(type: GiftType, index: number): common_reward_status {
            let info = this.getGiftInfo(type);

            let rewardStatus = new common_reward_status();
            rewardStatus.finish_cnt = 0;
            rewardStatus.status = 0;//默认未完成

            if (!info || !info.reward_list) {
                return rewardStatus;
            }

            if (type == GiftType.Yuanling) {
                //todo 更 common_reward_status 的 finish_cnt 次数
                for (let item of info.reward_list) {
                    if (item && item.index.eq(index)) {
                        return item;
                    }
                }
            } else {
                //todo 只更类型 jinjie_list 的 finish_cnt，单项的不更
                for (let item of info.reward_list) {
                    if (item && item.index.eq(index)) {
                        item.finish_cnt = info.finish_cnt;//类型的已完成次数
                        return item;
                    }
                }
                rewardStatus.finish_cnt = info && info.finish_cnt || 0;//类型的已完成次数
            }
            return rewardStatus;
        }

        private _cfgMap: { [type: number]: DabiaojiangliConfig[] } = {};

        /**根据 GiftType 获取对应配置*/
        public getCfgListByType(type: GiftType): DabiaojiangliConfig[] {
            if (this._cfgMap[type]) {
                return this._cfgMap[type];
            }
            this._cfgMap[type] = [];
            let cfgObj = getConfigByNameId(ConfigName.Dabiaojiangli, type);
            for (let idx in cfgObj) {
                this._cfgMap[type].push(cfgObj[idx]);
            }
            return this._cfgMap[type];
        }

        /**根据 GiftType 获取红点*/
        public getHintByGiftType(type: GiftType): boolean {
            let cfgList = this.getCfgListByType(type);
            let hint = false;
            for (let cfg of cfgList) {
                if (!cfg) {
                    continue;
                }
                let status = this.getGiftStatus(type, cfg.index);
                let cost = cfg.award_buy[0];
                if (status && status.status == 1 && cost && BagUtil.checkPropCnt(cost[0], cost[1])) {
                    hint = true;
                    break;
                }
            }
            return hint;
        }

        private updateHint(types: number[]): void {
            if (!types || !types.length) {
                return;
            }
            let changeTypes: number[] = [];
            for (let type of types) {
                let hint = this.getHintByGiftType(type);
                let hintTypes = this.getHintTypes(type);
                if (hintTypes && hintTypes.length) {
                    let lastHint = HintMgr.getHint(hintTypes);
                    if (lastHint != undefined && lastHint != hint) {
                        changeTypes.push(type);//红点变更
                    }
                    HintMgr.setHint(hint, hintTypes);
                }
            }
            //抛出红点变更的类型
            if (changeTypes && changeTypes.length) {
                this.sendNt(GiftEvent.ON_UPDATE_GIFT_HINT, changeTypes);
            }
        }

        protected onRoleUpdate(n: GameNT) {
            let ary = [GiftType.Yuanling, GiftType.SuitType1, GiftType.SuitType2,
                GiftType.SuitType3, GiftType.SuitType4, GiftType.SuitType5, GiftType.Ring];
            let keys = n.body as string[];
            if (keys.indexOf(RolePropertyKey.diamond) > -1) {
                this.updateHint(ary);
            }
        }

        /**获取红点路径*/
        public getHintTypes(type: GiftType): string[] {
            return this._model.giftTypes[type];
        }

        /**icon资源*/
        public getIcon(type: GiftType): string {
            return this._model.iconTypes[type];
        }

        /**标题*/
        public getTitle(type: GiftType): string {
            return this._model.titleTypes[type];
        }

        /**banner资源，默认png*/
        public getBanner(type: GiftType): string {
            return this._model.bannerTypes[type];
        }
    }
}