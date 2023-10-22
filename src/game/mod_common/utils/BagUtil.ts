namespace game.mod {
    import PropConfig = game.config.PropConfig;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;

    export class BagUtil {
        /**
         *  根据背包类型获取背包数据
         * @param type 背包类型
         * @param isSort 是否排序，默认不排序
         */
        public static getBagsByType(type: BagType, isSort: boolean = false): PropData[] {
            let proxy: IBagProxy = facade.retMod(ModName.Bag).retProxy(ProxyType.Bag);
            let bags: PropData[] = proxy.getBagByType(type);
            let tmpBags = bags.concat();
            if (isSort) {
                tmpBags.sort(SortTools.sortProp);
            }
            return tmpBags;//防止背包数据被修改
        }

        /**
         *  根据背包类型，道具类型，获取背包数据
         * @param type 背包类型
         * @param propType 道具类型
         */
        public static getBagsByTypeAndPropType(type: BagType, propType: PropType): PropData[] {
            let tmpBags: PropData[] = [];
            let bags: PropData[] = this.getBagsByType(type);
            for (let prop of bags) {
                if (propType == prop.propType) {
                    tmpBags.push(prop);
                }
            }
            return tmpBags;
        }

        /**
         *  根据背包类型，道具子类型，获取背包数据
         * @param type 背包类型
         * @param propSubType 道具子类型
         * @param isSort 是否排序，默认不排序
         */
        public static getBagsByTypeAndPropSubType(type: BagType, propSubType: number, isSort: boolean = false): PropData[] {
            let tmpBags: PropData[] = [];
            let bags: PropData[] = this.getBagsByType(type, isSort);
            for (let prop of bags) {
                if (propSubType == prop.propSubType) {
                    tmpBags.push(prop);
                }
            }
            return tmpBags;
        }

        /**
         *  根据背包类型，品质，获取背包数据
         * @param type 背包类型
         * @param minQuality 道具品质，小于当前品质的不取
         * @param maxQuality 道具品质，大于当前品质的不取
         */
        public static getBagsByTypeAndQuality(type: BagType, minQuality: number, maxQuality: number = QualityType.COLOR): PropData[] {
            let tmpBags: PropData[] = [];
            let bags: PropData[] = this.getBagsByType(type);
            for (let prop of bags) {
                if (prop.quality >= minQuality && prop.quality <= maxQuality) {
                    tmpBags.push(prop);
                }
            }
            return tmpBags;
        }

        /**
         * 根据index获取背包内道具数量
         * @param index
         */
        public static getPropCntByIdx(index: number): number {
            /**虚拟道具*/
            let key = PropIndexToKey[index];
            if (key) {
                return Number(RoleVo.ins[key]) || 0;
            }
            let c: number = 0;
            let proxy: IBagProxy = facade.retMod(ModName.Bag).retProxy(ProxyType.Bag);
            let list: PropData[] = proxy.getPropsByIndex(index);
            for (let p of list) {
                c = c + p.count;
            }
            return c;
        }

        /**
         * 根据index获取背包内道具信息
         * @param index
         * @param isCalCount 是否统计数量，默认true
         */
        public static getPropDataByIdx(index: number, isCalCount: boolean = true): PropData {
            let proxy: IBagProxy = facade.retMod(ModName.Bag).retProxy(ProxyType.Bag);
            let list: PropData[] = proxy.getPropsByIndex(index);
            let propData: PropData = list.length ? list[0] : null;
            if (isCalCount) {
                for (let i = 1; i < list.length; ++i) {
                    let p = list[i];//从1开始
                    propData.count += p.count;//累加数量
                }
            }
            return propData;
        }

        /**
         * 计算道具扣除消耗后数量
         * @param index 当前消耗道具index
         * @param pos 当前消耗道具下标
         * @param costInfoList 消耗信息列表
         * @param calcEquip 是否计算身上的装备
         */
        public static calcPropCnt(index: number, pos: number, costInfoList: number[][], calcEquip?: boolean): number {
            let cnt = this.getPropCntByIdx(index);//当前道具数量
            if(calcEquip){
                let prop = PropData.create(index);
                let proxy: IEquipProxy = getProxy(ModName.Equip, ProxyType.Equip);
                let equip = proxy.getEquipByPos(prop.equipPos);
                if(equip && equip.index == index){
                    cnt++;
                }
            }
            let sameCnt = 0;//相同道具的数量
            for (let i = 0; i < costInfoList.length; ++i) {
                let costInfo = costInfoList[i];
                if (costInfo[0] == index) {
                    sameCnt++;
                }
            }
            let perCnt = Math.floor(cnt / sameCnt);
            let addCnt = cnt % sameCnt;
            if (addCnt > 0 && addCnt > pos) {
                //余位补值
                perCnt += 1;
            }
            return perCnt;
        }

        /**
         *检查道具数量是否足够，一般红点使用
         * @param {number} index  道具index
         * @param {number} cnt   满足道具数量，默认1
         * @param tipsType  道具不足提示类型，默认不提示
         */
        public static checkPropCnt(index: number, cnt: number = 1, tipsType: PropLackType = PropLackType.None): boolean {
            let curCnt: number = this.getPropCntByIdx(index);
            if (curCnt >= cnt) {
                return true;
            }
            if (tipsType == PropLackType.None) {
                return false;
            }

            let cfg: PropConfig = getConfigById(index);
            if (cfg.gain_id && cfg.gain_id.length) {
                //弹窗提示，来源获取
                ViewMgr.getIns().showGainWaysTips(index);
            } else {
                //文本提示，例如：元宝不足
                PromptBox.getIns().show(cfg.name + "数量不足");
            }
            return false;
        }

        /**
         *升级时候检查道具数量是否足够，会弹获取途径
         * @param {number} index  道具index
         * @param {number} cnt   满足道具数量
         */
        public static checkPropCntUp(index: number, cnt: number = 1): boolean {
            return this.checkPropCnt(index, cnt, PropLackType.Dialog);
        }

        /**
         *检测背包是否已满，装备背包会弹熔炼提示
         * @param type 背包类型，默认装备背包
         * @param tipsCnt 提示的数量
         */
        public static checkBagFull(type: number = BagType.RoleEquip, tipsCnt: number = BagEquipTipsCnt): boolean {
            let proxy: IBagProxy = facade.retMod(ModName.Bag).retProxy(ProxyType.Bag);
            let bags = BagUtil.getBagsByType(type);
            let maxCnt = proxy.getBagMaxCnt(type);
            let leftCnt = maxCnt - bags.length;
            let isFull = leftCnt < tipsCnt;//小于提示的数量时，表示已满
            if (isFull && type == BagType.RoleEquip) {
                //装备背包熔炼提示
                leftCnt = Math.max(leftCnt, 1);
                let tipsStr = StringUtil.substitute(getLanById(LanDef.bag_ronglian_tips), [leftCnt])
                ViewMgr.getIns().showConfirm(tipsStr, Handler.alloc(proxy, () => {
                    proxy.clickMelt();
                }));
            }
            return isFull;
        }

        /**
         *合并相同奖励道具
         * @param {PropData[]} rewards  奖励列表
         */
        public static mergeRewards(rewards: PropData[]): PropData[] {
            let tmpDatas: PropData[] = [];
            for (let i = 0; i < rewards.length; ++i) {
                let prop = rewards[i];
                if (prop.type == ConfigHead.Equip) {
                    //装备不合并
                    tmpDatas.push(prop);
                    continue;
                }
                let pos = -1;
                for (let j = 0; j < tmpDatas.length; ++j) {
                    let tmpData = tmpDatas[j];
                    if (prop.index == tmpData.index) {
                        pos = j;
                        break;
                    }
                }
                if (pos > -1) {
                    tmpDatas[pos].count += prop.count;
                } else {
                    tmpDatas.push(prop);
                }
            }
            tmpDatas.sort(SortTools.sortProp);
            return tmpDatas;
        }

        /**
         *转化奖励为PropData，并排序奖励
         * @param {PropData[]} rewards  奖励列表
         * @param sort 默认排序
         */
        public static changeRewards(rewards: msg.prop_tips_data[], sort: boolean = true): PropData[] {
            if (!rewards || !rewards.length) {
                return [];
            }
            let tmpRewards: PropData[] = [];
            for (let i of rewards) {
                let prop: PropData = PropData.create(i.idx, i.cnt);
                if (i.ex_params && i.ex_params.hunka_star) {
                    prop.update(i.ex_params);//魂卡数据
                }
                tmpRewards.push(prop);
            }
            if (sort) {
                tmpRewards.sort(SortTools.sortProp);
            }
            return tmpRewards;
        }

        /** */
        public static getEasyUse(): PropData {
            let proxy: IBagProxy = facade.retMod(ModName.Bag).retProxy(ProxyType.Bag);
            return proxy.easyUse;
        }
    }

}