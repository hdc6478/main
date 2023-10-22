namespace game.mod {

    import IProxy = base.IProxy;
    import lingchong_item = msg.lingchong_item;

    export interface ILingChongProxy extends IProxy {
        /**
         * 获取激活的灵宠信息
         * @param index 灵宠index
         */
        getInfo(index: number): lingchong_item;

        getMaxStar(index?: number): number;

        canUpStar(index: number, isTips?: boolean): boolean;
    }

}