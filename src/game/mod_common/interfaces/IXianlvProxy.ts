namespace game.mod {
    import IProxy = base.IProxy;
    import teammate = msg.teammate;

    export interface IXianlvProxy extends IProxy {
        //能否开启试炼
        isOpenShilian(): boolean;

        getBanlvInfo(): teammate;//获取伴侣信息，//外部访问时通过RoleUtil访问
    }

}