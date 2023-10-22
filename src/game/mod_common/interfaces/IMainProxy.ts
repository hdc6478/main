namespace game.mod {
    import IProxy = base.IProxy;
    import attributes = msg.attributes;
    import prop_tips_data = msg.prop_tips_data;

    export interface IMainProxy extends IProxy {
        init(): void;

        readonly openFuncIdx: number[];

        saveSettingInfo(): void;

        /**统一通过RoleUtil访问*/
        getAttr(index: number, type?: number): attributes;

        /**统一通过RoleUtil访问*/
        getAttrList(indexList: number[], type?: number): attributes[];

        /**统一通过RoleUtil访问*/
        c2s_sys_attributes(openIdx: number): void;

        /**判断是否有某属性，只判断不请求，统一通过RoleUtil访问*/
        checkAttr(index: number): boolean;

        /**判断是否有某属性，只判断不请求，统一通过RoleUtil访问*/
        checkAttrList(indexList: number[]): boolean;

        /**不再提示*/
        getNotTipsType(type: number): boolean;

        readonly offlineTotalTime: number;
        readonly offlineMaxtime: number;
        readonly rewards: prop_tips_data[];

        c2s_hangup_get_rwd(type?: number): void;
    }
}