namespace game.mod {
    import IProxy = base.IProxy;

    export interface IZhanduiProxy extends IProxy {
        /**拥有队伍*/
        haveTeam(): boolean;
        readonly team_id: Long;//战队ID，//外部访问时通过RoleUtil访问
    }

}