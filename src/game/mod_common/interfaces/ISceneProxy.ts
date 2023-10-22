namespace game.mod {

    import IProxy = base.IProxy;
    import SceneObjVo = game.scene.SceneObjVo;
    import MonsterVo = game.scene.MonsterVo;
    import ActorVo = game.scene.ActorVo;
    import GPlayerVo = game.scene.GPlayerVo;
    import battle_buff = msg.battle_buff;
    import teammate = msg.teammate;
    import scene_monster_data = msg.scene_monster_data;
    import MainGPlayer = game.scene.MainGPlayer;
    import MainGPlayerVo = game.scene.MainGPlayerVo;
    import Scene = game.scene.Scene;
    import CommonAi = game.scene.CommonAi;
    import s2c_battle_role_die = msg.s2c_battle_role_die;

    export interface ISceneProxy extends IProxy {
        readonly curSceneIdx: number;
        readonly scene: Scene;
        isMapOk: boolean;
        foeTargetId: Long;
        readonly isEnterScene: boolean;
        readonly lastSceneIdx: number;
        readonly mainPlayerVo: MainGPlayerVo;
        readonly mainPlayerObj: MainGPlayer;
        readonly mainPlayerBuffList: battle_buff[];
        readonly firstEnter: boolean;
        readonly curSceneType: number;
        readonly isAutoHangUp: boolean;
        readonly isServerControl: boolean;
        readonly voList: { [key: string]: SceneObjVo };
        enemyInfo: { id: Long, type: number };
        readonly isSceneEft: number;

        setFirstEnter(ret:boolean):void;

        getSceneType(id: number): number;

        isTargetAtkEnable(id: Long): boolean;

        getFoeTarget(camp?: number): GPlayerVo;

        addVo(vo: SceneObjVo, type: number): void;

        delVo(id: Long): SceneObjVo;

        getVosByCamp(camp: number): ActorVo[];

        getEnemyVos(type?: number): ActorVo[];

        getBossVo(): MonsterVo;

        getVosByType(type: number): SceneObjVo[];

        getVosByTeamId(teamId?: Long): GPlayerVo[];

        getVoByRoleId(roleId: Long, camp?: number): GPlayerVo;

        getVoById(id: Long): SceneObjVo;

        resetModel(): void;

        initialize(): void;

        onStartReconnect(): void;

        enterScene(mapId: number): void;

        confirmEnterMap(): void;

        doMove(list: { x: number, y: number }[], moveType?: number): void;


        useSkill(skillIdx: number, focus: Long, type?: number[], x?: number, y?: number, tx?: number, ty?: number): void;

        requestMonster(entity_id?: Long): void;

        setAutoHangUp(): void;

        clearFoeTarget(): void;

        getRoleVoById(id: Long): GPlayerVo;

        getVosTypeById(_id: Long): number;

        change_scene_c2s(scene_index?: number): void;

        scene_ride_oper_c2s(ride_state: number, ride_x?: number, ride_y?: number): void;

        pop_progressbar_c2s(id: number, ret?: number): void;

        addMonsterDataClient(data: scene_monster_data): void;

        play_conversation_c2s(index: number): void;


        clickExit(): void;
        exitScene(): void;

        belong: teammate;//归属者
        readonly maxHurt: teammate;//最高伤害攻击者
        curBossId: Long;//当前挑战的boss

        //通知后端开打或者停止
        requestControlAI(ret:ControlAIType):void;

        readonly mainAi: CommonAi;

        readonly endTime: number;//副本通用结束时间戳/

        readonly diedInfo: s2c_battle_role_die;//死亡复活信息

    }
}