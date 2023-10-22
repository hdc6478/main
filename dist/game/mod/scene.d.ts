declare namespace game.mod.scene {
    import GPlayerVo = game.scene.GPlayerVo;
    import SceneObjVo = game.scene.SceneObjVo;
    import battle_buff = msg.battle_buff;
    import MonsterVo = game.scene.MonsterVo;
    import ActorVo = game.scene.ActorVo;
    import Scene = game.scene.Scene;
    import MainGPlayerVo = game.scene.MainGPlayerVo;
    import teammate = msg.teammate;
    import s2c_battle_role_die = msg.s2c_battle_role_die;
    import NPCVo = game.scene.NPCVo;
    import scene_monster_data = msg.scene_monster_data;
    import MainGPlayer = game.scene.MainGPlayer;
    import Time = base.Time;
    import CommonAi = game.scene.CommonAi;
    /** 场景通用Proxy*/
    class SceneProxy extends ProxyBase implements ISceneProxy {
        private _model;
        private _ntData;
        private _scene_drop_datas;
        getModel(): SceneModel;
        initialize(): void;
        readonly curSceneIdx: number;
        readonly isEnterScene: boolean;
        isMapOk: boolean;
        readonly lastSceneIdx: number;
        readonly mainPlayerObj: MainGPlayer;
        readonly scene: Scene;
        readonly mainPlayerVo: MainGPlayerVo;
        enemyInfo: {
            id: Long;
            type: number;
        };
        readonly mainPlayerBuffList: battle_buff[];
        readonly firstEnter: boolean;
        setFirstEnter(ret: boolean): void;
        readonly curSceneType: number;
        readonly isAutoHangUp: boolean;
        readonly isServerControl: boolean;
        readonly isSceneEft: number;
        readonly voList: {
            [key: string]: SceneObjVo;
        };
        getSceneType(id: number): number;
        isTargetAtkEnable(id: Long): boolean;
        /** 获取仇恨目标 */
        getFoeTarget(camp?: number): GPlayerVo;
        addVo(vo: SceneObjVo, type: number): void;
        delVo(id: Long): SceneObjVo;
        getVosByCamp(camp: number): ActorVo[];
        /**
         * 获取可攻击的敌人
         * @param {number} type 指定返回敌人的类型
         * @returns {game.scene.ActorVo[]}
         */
        getEnemyVos(type?: number): ActorVo[];
        getBossVo(): MonsterVo;
        getVosByType(type: number): SceneObjVo[];
        getVoById(id: Long): SceneObjVo;
        getVosTypeById(_id: Long): number;
        getVosByTeamId(teamId?: Long): GPlayerVo[];
        getRoleVoById(id: Long): GPlayerVo;
        getVoByRoleId(roleId: Long, camp?: number): GPlayerVo;
        resetModel(): void;
        /** 骑乘    0不坐 1坐 */
        scene_ride_oper_c2s(ride_state: number, ride_x?: number, ride_y?: number): void;
        onStartReconnect(): void;
        enterScene(mapId: number): void;
        confirmEnterMap(): void;
        doMove(list: {
            x: number;
            y: number;
        }[], moveType?: number): void;
        useSkill(skillIdx: number, focus: Long, type?: number[], x?: number, y?: number, tx?: number, ty?: number): void;
        requestMonster(entity_id?: Long): void;
        requestControlAI(type?: number): void;
        setAutoHangUp(): void;
        clearFoeTarget(): void;
        getMaxAtkDistance(): number;
        private onSceneReady;
        addMainEntity(): void;
        private onSceneEnter;
        private onEntityUpdate;
        private updateVo;
        clearSceneDropDatas(): void;
        update(time: Time): void;
        private onEntityAdd;
        private addEntity;
        private onEntityDel;
        private onStopMove;
        private onEntityMove;
        private doObjMove;
        private resetPoint;
        private onResetMainPoint;
        private onUseSkill;
        skillBattleFigure(skillId: number): number;
        private onFindMonster;
        private onClearCurTarget;
        private onStopHangUp;
        private onStartHangUp;
        private onAutoHangUpUpdate;
        /** 添加客户端怪物数据 */
        addMonsterDataClient(data: scene_monster_data): void;
        /** 请求播放剧情对话*/
        play_conversation_c2s(index: number): void;
        /**
         * 读条成功返回
         * @param id
         * @param ret
         */
        pop_progressbar_c2s(id: number, ret?: number): void;
        /** 场景DEBUG */
        private scene_print_entity_s2c;
        /** 场景DEBUG */
        scene_print_entity_c2s(list: Long[]): void;
        /** 角色死亡*/
        private battle_role_die_s2c;
        /** 角色复活*/
        private battle_role_relife_s2c;
        /** 复活角色*/
        battle_role_relife_c2s(): void;
        /** 切换场景,默认不需要发场景index */
        change_scene_c2s(scene_index?: number): void;
        /***
         * 获取客户端NPCVo
         * @param npc_id
         */
        getClientSceneNpc(npc_id: number): NPCVo;
        /** 获取新的NPC ID */
        getNpcEntityId(): Long;
        private s2c_fly_bool;
        private scene_add_effect;
        private scene_del_effect;
        clickExit(): void;
        exitScene(): void;
        curBossId: Long;
        /**攻击目标*/
        foeTargetId: Long;
        belong: teammate;
        readonly maxHurt: teammate;
        private s2c_new_multiple_boss_hurt_rank;
        private updateHurtRank;
        private s2c_atk_role_max_hurt_role_info;
        private updateRoleInfo;
        private s2c_yijie_boss_hurt_rank;
        private s2c_yongheng_boss_hurt_rank;
        private s2c_zhuimo_boss_hurt_rank;
        private s2c_boss_srefresh_damage;
        readonly mainAi: CommonAi;
        private s2c_scene_fuben_end_time;
        readonly endTime: number;
        readonly diedInfo: s2c_battle_role_die;
    }
}
declare namespace game.mod.scene {
    class BelongPlayerView extends eui.Component {
        grp_base: eui.Group;
        head1: Head;
        bar1: ProgressBarComp;
        img_tips1: eui.Image;
        btn_belong: game.mod.Btn;
        grp_belong: eui.Group;
        lab_name: eui.Label;
        lab_power: eui.Label;
        lab_guild: eui.Label;
        head2: Head;
        bar2: ProgressBarComp;
        btn_enemy: game.mod.Btn;
        head3: Head;
        bar3: ProgressBarComp;
        constructor();
    }
}
declare namespace game.mod.scene {
    class InitSceneMdrCmd extends CmdBase {
        exec(n: base.GameNT): void;
    }
}
declare namespace game.mod.scene {
    import GameNT = base.GameNT;
    class LoadCfgCmd extends CmdBase {
        private _proxy;
        exec(n: GameNT): void;
        private getCurMapId;
        private onLoadCfg;
        private onLoadBlur;
    }
}
declare namespace game.mod.scene {
    /** 添加客户端NPC */
    class OnAddClientNpcCmd extends CmdBase {
        private _proxy;
        exec(n: base.GameNT): void;
        private addDataNpc;
    }
}
declare namespace game.mod.scene {
    /** 删除场景所有客户端NPC */
    class OnClearClientNpcCmd extends CmdBase {
        exec(n: base.GameNT): void;
    }
}
declare namespace game.mod.scene {
    /** 删除客户端NPC */
    class OnDelClientNpcCmd extends CmdBase {
        exec(n: base.GameNT): void;
    }
}
declare namespace game.mod.scene {
    import GameNT = base.GameNT;
    class AutoHangUpChangedCmd extends CmdBase {
        exec(n: GameNT): void;
    }
}
declare namespace game.mod.scene {
    /**不同场景类型Ai*/
    const SceneTypeAi: {
        [type: number]: any;
    };
    /** 添加客户端AI */
    class OnAddPlayerAiCmd extends CmdBase {
        exec(n: base.GameNT): void;
    }
}
declare namespace game.mod.scene {
    class OnResetPlayerPtCmd extends CmdBase {
        exec(n: base.GameNT): void;
        private resetActor;
    }
}
declare namespace game.mod.scene {
    class OnTapSkillCmd extends CmdBase {
        exec(n: base.GameNT): void;
    }
}
declare namespace game.mod.scene {
    /**
     *场景点击对象
     */
    class OnSceneClickCmd extends CmdBase {
        exec(n: base.GameNT): void;
    }
}
declare namespace game.mod.scene {
    class OnSceneEnterCmd extends CmdBase {
        private _proxy;
        private _cfg;
        exec(n: base.GameNT): void;
        /**
         * 检测上一个场景，用于关闭界面或者保存界面数据
         * @param {number} type 当前
         * @param {number} lastType 上一次
         */
        private checkLastScene;
        /**
         * 进入场景(打开界面)
         * @param {number} type
         */
        private showView;
        /**场景类型映射副本界面，没有自己场景界面的不需要处理，todo*/
        private sceneTypeToViewData;
        private pvpTypeToViewData;
    }
}
declare namespace game.mod.scene {
    import GameNT = base.GameNT;
    class OnSceneReadyCmd extends CmdBase {
        exec(n: GameNT): void;
        /**
         * 进入场景关闭界面，资源为加载
         * @param {number} type
         */
        private checkEnter;
    }
}
declare namespace game.mod.scene {
    import SceneObjVo = game.scene.SceneObjVo;
    import MainGPlayerVo = game.scene.MainGPlayerVo;
    import Scene = game.scene.Scene;
    import MainGPlayer = game.scene.MainGPlayer;
    import NPCVo = game.scene.NPCVo;
    import CommonAi = game.scene.CommonAi;
    import teammate = msg.teammate;
    import s2c_battle_role_die = msg.s2c_battle_role_die;
    class SceneModel {
        mainPlayerVo: MainGPlayerVo;
        scene: Scene;
        mainPlayer: MainGPlayer;
        mainAi: CommonAi;
        isFirstEnter: boolean;
        role_info: msg.scene_role_data;
        isAutoHangUp: boolean;
        voList: {
            [p: string]: SceneObjVo;
        };
        private _isAutoHangUp;
        isServerControl: boolean;
        isEnterScene: boolean;
        isMapOk: boolean;
        lastSceneIdx: number;
        curSceneIdx: number;
        sceneId: number;
        isSceneEft: number;
        readonly typeVoMap: {
            [type: number]: SceneObjVo[];
        };
        private _voList;
        constructor();
        foeTargetId: Long;
        enemyInfo: {
            id: Long;
            type: number;
        };
        /** 客户端NPC */
        npcDic: {
            [p: string]: NPCVo;
        };
        private clientId;
        private client_entity_num;
        genClientEntityId(): Long;
        curBossId: Long; /** 当前攻击BossId */
        belong: teammate;
        maxHurt: teammate;
        endTime: number;
        diedInfo: s2c_battle_role_die;
    }
}
declare namespace game.mod.scene {
    class AiTools {
    }
}
declare namespace game.mod.scene {
    class SceneMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
        private initPlayerCmd;
        private initNpcCmd;
    }
}
declare namespace game.mod.scene {
    class BigBossHpView extends eui.Component {
        img_hp1: eui.Image;
        img_mask: eui.Image;
        img_bai: eui.Image;
        img_hp0: eui.Image;
        lab_name: eui.Label;
        lab_hp: eui.Label;
        img_type: eui.Image;
        img_icon: eui.Image;
        btn_reward: game.mod.Btn;
        grp_rank: eui.Group;
        grp_myRank: eui.Group;
        lab_myRank: eui.Label;
        lab_myHurt: eui.Label;
        grp_rank2: eui.Group;
        list_rank: eui.List;
        btn_rank: game.mod.Btn;
        grp_damage: eui.Group;
        grp_allDamage: eui.Group;
        lab_allDamage: eui.Label;
        lab_perDamage: eui.Label;
        grp_damage2: eui.Group;
        list_damage: eui.List;
        btn_damage: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.scene {
    class ChallengeTipsView extends eui.Component {
        grp_lv: eui.Group;
        constructor();
    }
}
declare namespace game.mod.scene {
    import GPlayerVo = game.scene.GPlayerVo;
    class EnemyItem extends BaseListenerRenderer {
        head: Head;
        lab_name: eui.Label;
        lab_team: eui.Label;
        lab_power: eui.Label;
        bar: ProgressBarComp;
        lab_tips: eui.Label;
        btn_attack: game.mod.Btn;
        private _proxy;
        data: GPlayerVo;
        protected onAddToStage(): void;
        private onClick;
        protected dataChanged(): void;
        /**更新血量*/
        updateEnemyHp(percent: number): void;
    }
}
declare namespace game.mod.scene {
    class EnemyView extends eui.Component {
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.scene {
    class PvpFightView extends eui.Component {
        grp1: eui.Group;
        lab_name1: eui.Label;
        powerLabel1: game.mod.PowerLabel;
        img_hp1: eui.Image;
        head1: game.mod.HeadVip;
        grp2: eui.Group;
        lab_name2: eui.Label;
        powerLabel2: game.mod.PowerLabel;
        img_hp2: eui.Image;
        head2: game.mod.HeadVip;
        grp3: eui.Group;
        img_vs: eui.Image;
        gr_eft: eui.Group;
        gr_eft2: eui.Group;
        constructor();
    }
}
declare namespace game.mod.scene {
    class RoleReviveView extends eui.Component {
        gr_time: eui.Group;
        gr_btn: eui.Group;
        btnRelife: Btn;
        lab_killBy: eui.Label;
        lab_btn: eui.Label;
        lab_cnt: eui.Label;
        img_icon: eui.Image;
        lab_tips: eui.Label;
        constructor();
    }
}
declare namespace game.mod.scene {
    import boss_srefresh_damage = msg.boss_srefresh_damage;
    class SceneDamageItem extends eui.ItemRenderer {
        lab_rank: eui.Label;
        lab_allDamage: eui.Label;
        lab_perDamage: eui.Label;
        data: boss_srefresh_damage;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.scene {
    import teammate = msg.teammate;
    class SceneRankItem extends eui.ItemRenderer {
        lab_rank: eui.Label;
        lab_name: eui.Label;
        lab_hurt: eui.Label;
        data: teammate;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.scene {
    import UpdateItem = base.UpdateItem;
    class BelongPlayerMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _isMyBelong;
        private _belongVo;
        private _openBelong;
        private _curEnemyVo;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initShow;
        /**点击归属者*/
        private onClickBelong;
        /**点击查看归属者信息*/
        private onClickBelongInfo;
        /**点击敌人*/
        private onClickEnemy;
        /**打开敌人列表*/
        private onClickEnemyList;
        private onObjAdd;
        private onObjDel;
        private onBelongUpdate;
        /**更新归属者*/
        private updateBelong;
        /**更新归属者头像*/
        private updateBelongInfo;
        /**更新归属者血量*/
        private updateBelongHp;
        /**更新附近敌人*/
        private updateEnemy;
        /**更新敌人血量*/
        private updateEnemyHp;
        /**反击敌人*/
        private onClickMaxHurt;
        private onMaxHurtUpdate;
        /**更新复仇敌人*/
        private updateMaxHurt;
        /**更新复仇敌人血量*/
        private updateMaxHurtHp;
        private updateViewState;
        private setBelongGrp;
        private updateBelongGrp;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.scene {
    import UpdateItem = base.UpdateItem;
    class BigBossHpMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        protected _showArgs: BossHpData;
        private _curBossInfo;
        private _lastBossId;
        private _rewardId;
        private _rankList;
        private _damageList;
        /**旧代码*/
        private _isClearBoss;
        private _record;
        private _lastPer;
        private _lastNum;
        private _isTweening;
        private _maxLine;
        /**旧代码*/
        private _showList;
        private _maxRank;
        private _rankInfo;
        private _damageInfo;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initShow;
        private hideHp;
        /** 检测BOSS是否存活 */
        private onObjDel;
        private onBossHpChanged;
        private setBossInfo;
        private updateBossShow;
        private setBossHpTweenInfo;
        private getHpLimit;
        private setHpTweenShow;
        private showProTween;
        private showHpFull;
        private checkToShowNext;
        private showRecordInfo;
        private setOverShow;
        update(time: base.Time): void;
        private onClickReward;
        private updateReward;
        private onClickRank;
        private onRankUpdate;
        private updateRank;
        private onBelongUpdate;
        private onClickDamage;
        private onDamageUpdate;
        private updateDamage;
        private sortDamage;
    }
}
declare namespace game.mod.scene {
    class ChallengeTipsMdr extends EffectMdrBase {
        private _view;
        protected _showArgs: number;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateLv;
    }
}
declare namespace game.mod.scene {
    import UpdateItem = base.UpdateItem;
    class EnemyMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _itemList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onObjAdd;
        private onObjDel;
        /**更新附近敌人*/
        private updateEnemy;
        /**更新敌人血量*/
        private updateEnemyHp;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.scene {
    import GPlayerVo = game.scene.GPlayerVo;
    class PvpFightEnterMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _curEnemyVo;
        protected _showArgs: GPlayerVo;
        private readonly HP_WIDTH;
        private readonly GRP_POS10;
        private readonly GRP_POS11;
        private readonly GRP_POS20;
        private readonly GRP_POS21;
        private readonly GRP_Y30;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /**更新自己*/
        private updateSelf;
        /**更新敌人*/
        private updateEnemy;
        private showTween;
    }
}
declare namespace game.mod.scene {
    import UpdateItem = base.UpdateItem;
    class PvpFightMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _curEnemyVo;
        private readonly HP_WIDTH;
        private _showEnter;
        private _delayEnter;
        private readonly DELAY_TICK;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onObjAdd;
        /**更新自己*/
        private updateSelf;
        /**更新自己血量*/
        private updateSelfHp;
        /**更新敌人*/
        private updateEnemy;
        /**更新敌人血量*/
        private updateEnemyHp;
        update(time: base.Time): void;
        private onPvpEnterEnd;
        private clearDelayEnter;
    }
}
declare namespace game.mod.scene {
    import s2c_battle_role_die = msg.s2c_battle_role_die;
    class RoleReviveMdr extends EffectMdrBase {
        private _view;
        protected _showArgs: s2c_battle_role_die;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        private updateKillName;
        protected onShow(): void;
        private onBtnRelive;
        private reliveRole;
        private _reliveEndTime;
        protected onHide(): void;
        update(time: base.Time): void;
        private setTimeDown;
    }
}
declare namespace game.mod.scene {
    import UpdateItem = base.UpdateItem;
    class SceneMdr extends MdrBase implements UpdateItem {
        private _scene;
        private _proxy;
        private _model;
        private _mainPlayer;
        private _headLineGroup;
        constructor();
        protected onInit(): void;
        private addMainPlayer;
        private clearMainPlayer;
        private clearMainPlayerAi;
        private _bezierPosArr;
        private _idx;
        private _starP;
        private _midP;
        private _endP;
        testBezierMove(): void;
        private moveBezierPoint;
        update(time: base.Time): void;
        protected addListeners(): void;
        private onActivate;
        private clearDropItems;
        private onDeactivate;
        /**
         * 通知玩家移动
         * @param n
         */
        private onMainPlayerMove;
        /**
         * 玩家移动
         * @param endX
         * @param endY
         * @param moveType
         * @param cb
         * @param isOptPath
         * @param dis
         */
        private moveMainPlayer;
        private onControlMainPlayerMove;
        private onBossHpChanged;
        private onNpcCampChanged;
        private requestMonster;
        private _timeOut;
        private _tmpMsg;
        private _focusPt;
        private moveSceneToObj;
        private updateFocus;
        private onFindMonster;
        private delayCallFind;
        private findMonster;
        private onFindMonsterMoveEnd;
        private sendMainPlayerMove;
        private onObjSkillBuff;
        private showSkillTips;
        private onObjUseSkill;
        private useSkillDirectly;
        private updateMainPlayerCD;
        private onStageResize;
        private onCleanScene;
        private onObjMove;
        private onObjAdd;
        private addObj;
        private onObjDel;
        /**攻击目标变更时，清除AI curTarget*/
        private onFoeTargetChange;
        /** 震屏 */
        private onSceneShake;
        private onObjUpdate;
        private updateAllPlayerCamp;
        private playCSE;
        private onCSEComp;
        private onCfgLoaded;
        private showHeadline;
        private onBlurLoaded;
        private onUpdateHangUp;
        /** 设置是否挂机 */
        private onSetHangUp;
        private dbgTime;
        private dbgCount;
        /**调试场景对象位置*/
        private debugSceneMove;
        private updateSceneDebugMove;
        private _checkHideOtherObj;
        private refreshSettingInfo;
        private updateOtherPartnerShow;
        private updateOtherPlayerShow;
        private fpsTime;
        private fps;
        private fpsCount;
        private checkFps;
        private onSkillTextShow;
        private onSkillTextShow2;
        private onObjSkillBuffShow;
        private showActiveSkillsTxt;
    }
}
