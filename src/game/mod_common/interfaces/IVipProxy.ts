namespace game.mod {

    import IProxy = base.IProxy;

    export interface IVipProxy extends IProxy {
        /**是否已达最大vip等级*/
        isMaxVip(): boolean;

        /**当前vip等级索引*/
        getIdx(): number;

        /**当前vip经验*/
        getExp(): number;
    }

}