namespace game.mod {

    import IProxy = base.IProxy;
    import s2c_yuanling_invita = msg.s2c_yuanling_invita;

    export interface IYuanLingProxy extends IProxy {
        /**获取邀请列表*/
        getInvitedTeamList(): s2c_yuanling_invita[];

        /**当前挑战层数*/
        curLayer(): number;

        /**有队伍*/
        onTeam(): boolean;

        onClearInvitedTeam(): void;//清除组队信息
    }

}