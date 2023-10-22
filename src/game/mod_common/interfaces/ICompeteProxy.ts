namespace game.mod {

    import IProxy = base.IProxy;

    export interface ICompeteProxy extends IProxy {
        getCurVal(): number;
        getCurValDoufa(): number;
        readonly nextFightTime: number;
        readonly attackStatus: number;
        findCurMonsterIndex(camp: number): number;
        readonly noticeList: msg.s2c_scene_kill_notice[];
        clearNotice(): void;
    }
}