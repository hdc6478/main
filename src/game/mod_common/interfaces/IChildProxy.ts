namespace game.mod {
    import IProxy = base.IProxy;
    import child_jiban_infos = msg.child_jiban_infos;
    import attributes = msg.attributes;

    export interface IChildProxy extends IProxy {
        /**激活羁绊*/
        c2s_child_oper_jiban(jiban_index: number, child_index: number): void;

        /**子女升星消耗*/
        getCost(index: number, star?: number): number[];

        /**羁绊信息*/
        getJibanInfo(jiban_index: number): child_jiban_infos;

        /**羁绊是否激活*/
        isActedJiban(jiban_index: number): boolean;

        /**羁绊红点*/
        getHintByJibanIndex(jiban_index: number): boolean;

        /**羁绊子女是否已激活*/
        isJibanChildActed(jiban_index: number, child_index: number): boolean;

        /**羁绊子女能否激活*/
        canActJibanChild(jiban_index: number, child_index: number): boolean;

        /**能否激活羁绊*/
        canActJiban(jiban_index: number, isTips?: boolean): boolean;

        /**总属性*/
        getAttr(): attributes;
    }

}