namespace game.mod {

    import IProxy = base.IProxy;
    import consecrate_infos = msg.consecrate_infos;
    import AmassConfig = game.config.AmassConfig;

    export interface IConsecrateProxy extends IProxy {
        getConsecrateCount(): number;

        getDoingInfo(): consecrate_infos;

        getEndTime(): number;

        c2s_amass_advance(classId: number, type: number, index: number): void;

        /**根据模块类型获取图鉴类型列表*/
        getAmassTypes(classId: number): number[];

        /**根据模块类型和图鉴类型，获取配置id列表*/
        getAmassIndexList(classId: number, type: number): number[];

        /**获取图鉴配置*/
        getAmassCfg(index: number): AmassConfig;

        getAmassLv(index: number): number;

        canAmassItemUp(index: number): boolean;

        canAmassTypeUp(classId: number, type: number): boolean;

        canAmassClassIdUp(classId: number): boolean;

        getAmassActNum(classId: number, type: number): number;
    }
}