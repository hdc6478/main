namespace game.mod {

    import IProxy = base.IProxy;
    import prop_tips_data = msg.prop_tips_data;
    import prop_use = msg.prop_use;

    export interface IBagProxy extends IProxy {
        /**不要直接访问proxy数据，通过BagUtil访问*/
        c2s_bag_props(): void;
        //---------------------新接口----------------------------
        getBagByType(type: number): PropData[];
        getPropsByIndex(index: number): PropData[];
        c2s_prop_one_key_resolve(props: prop_tips_data[]): void;
        isHasItem(itemId:number|string):boolean;
        readonly meltTip: boolean;
        clickMelt(items?: PropData[]): void;
        autoUseBox(): void;
        c2s_prop_list_use(props: prop_use[]):void;
        getBagMaxCnt(type: number): number;
        easyUse:PropData;
    }
}