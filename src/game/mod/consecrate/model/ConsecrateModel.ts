namespace game.mod.consecrate {


    import consecrate_infos = msg.consecrate_infos;
    import amass_item = msg.amass_item;
    import AmassConfig = game.config.AmassConfig;

    export class ConsecrateModel {
        /**封魔列表 */
        public list: consecrate_infos[];
        /**封印存储时间 单位秒 */
        public storage_time: number;

        public readonly num: number = 7;

        public amassList: amass_item[];
        public amassCfgList: {[classId: number] : {[type: number] : number[]}};//模块类型_图鉴类型_图鉴index
        public amassCfg: {[index: number] : AmassConfig};//图鉴index_图鉴配置，方便反向获取数据
    }
}
