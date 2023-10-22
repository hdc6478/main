namespace game {
    import BagTypeConfig = game.config.BagTypeConfig;
    import MainTask1Config = game.config.MainTask1Config;

    export const enum ArraySort {
        UPPER = 1,/**升序 */
        LOWER = 2,/**降序 */
    }

    export class SortTools {
        /**排序任务*/
        public static sortTask(a: msg.task_data, b: msg.task_data): number {
            let idx1: number = a.task_id;
            let idx2: number = b.task_id;

            let aCfg: MainTask1Config = getConfigByNameId(ConfigName.MainTask1, idx1);
            let aSort = aCfg ? aCfg.is_special : 0;
            let bCfg: MainTask1Config = getConfigByNameId(ConfigName.MainTask1, idx2);
            let bSort = bCfg ? bCfg.is_special : 0;
            if(aSort != bSort){
                return bSort - aSort;//特殊任务显示在首位
            }

            let aFinish: number = a.status == TaskStatus.Finish ? 1 : 0;
            let bFinish: number = b.status == TaskStatus.Finish ? 1 : 0;
            if (aFinish != bFinish) {
                return bFinish - aFinish;
            }
            let aDraw: number = a.status == TaskStatus.Draw ? 1 : 0;
            let bDraw: number = b.status == TaskStatus.Draw ? 1 : 0;
            if (aDraw != bDraw) {
                return aDraw - bDraw;
            }
            return idx1 - idx2;
        }

        /**通用道具排序*/
        public static sortProp(a: PropData, b: PropData): number {
            let aCfg: BagTypeConfig = getConfigByNameId(ConfigName.BagType, a.bigType);
            let aSort = aCfg ? aCfg.sort : 0;
            let bCfg: BagTypeConfig = getConfigByNameId(ConfigName.BagType, b.bigType);
            let bSort = bCfg ? bCfg.sort : 0;
            if(aSort != bSort){
                return aSort - bSort;
            }
            let aQuality = a.quality;
            let bQuality = b.quality;
            if(aQuality != bQuality){
                return bQuality - aQuality;
            }
            return a.index - b.index;
        }

        /**根据sort字段，从小到大排序，配置相关的跟策划约定好sort字段，从小到大排序*/
        public static sortByRort(a: { sort: number }, b: { sort: number }): number {
            return a.sort - b.sort;
        }

        /**默认从小到大排序*/
        public static sortNum(a: number, b: number, type: ArraySort = ArraySort.UPPER): number {
            if(type == ArraySort.UPPER){
                return a - b;
            }
            return b - a;
        }

        /**
         * 排序 [{age:11}, {age:12}]
         * @param arr 要排序的数组
         * @param key 排序的key 比如 age
         * @param type 排序类型，默认从小到大
         */
        public static sortMap(arr: Array<any>, key: string, type: ArraySort = ArraySort.UPPER) {
            arr.sort(function (a, b) {
                let aVal = a[key];
                let bVal = b[key];
                if (type == ArraySort.UPPER) {
                    if(aVal instanceof Long && bVal instanceof Long){
                        return aVal.toNumber() - bVal.toNumber();
                    }
                    return aVal - bVal;
                } else {
                    if(aVal instanceof Long && bVal instanceof Long){
                        return bVal.toNumber() - aVal.toNumber();
                    }
                    return b[key] - a[key];
                }
            });
        }

        /**
         * 奖励领取状态排序  （1可领取，0不可领取，2已领取）
         * @param arr 待排序的数组
         * @param key 排序的key，默认status
         */
        public static sortReward(arr: Array<any>, key: string = 'status') {
            arr.sort((a, b) => {
                let aVal = a[key];
                let bVal = b[key];
                let aFinish = aVal == 1 ? 1 : 0;
                let bFinish = bVal == 1 ? 1 : 0;
                if (aFinish != bFinish) {
                    return bFinish - aFinish;
                }
                let aDraw = aVal == 2 ? 1 : 0;
                let bDraw = bVal == 2 ? 1 : 0;
                if (aDraw != bDraw) {
                    return aDraw - bDraw;
                }
                return aVal - bVal;
            });
        }
        /**排序好友*/
        public static sortFriend(a: msg.friend_info, b: msg.friend_info): number {
            let aOnline: number = a.is_online ? 1 : 0;
            let bOnline: number = b.is_online ? 1 : 0;
            if (aOnline != bOnline) {
                return bOnline - aOnline;
            }
            return b.time - a.time;
        }
    }
}