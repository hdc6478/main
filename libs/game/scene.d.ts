declare namespace game.scene {
    import ObjBase = base.ObjBase;
    import PoolObject = base.PoolObject;
    class BaseItem extends ObjBase implements PoolObject {
        private _parent;
        protected _isInit: boolean;
        protected _updateEnabled: boolean;
        constructor();
        parent: BaseCont;
        updateEnabled: boolean;
        protected init(): void;
        dispose(): void;
        onAlloc(): void;
        onRelease(): void;
        advanceTime(elapseTime: number): void;
        protected onAdded(): void;
    }
}
declare namespace game.scene {
    class BaseCont extends BaseItem {
        protected _children: BaseItem[];
        constructor();
        protected init(): void;
        readonly numChildren: number;
        readonly children: BaseItem[];
        add(child: BaseItem): void;
        remove(child: BaseItem): void;
        removeAll(): void;
        advanceTime(elapseTime: number): void;
        onAlloc(): void;
        onRelease(): void;
    }
}
declare namespace game.scene {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    class BaseDraw extends BaseCont {
        protected _dsp: DisplayObjectContainer;
        constructor();
        protected init(): void;
        protected initDsp(): void;
        dsp: DisplayObjectContainer;
        add(child: BaseItem): void;
        protected addDsp(child: BaseDraw): void;
        remove(child: BaseItem): void;
        protected removeDsp(child: BaseDraw): void;
        x: number;
        y: number;
        alpha: number;
        scale: number;
        scaleX: number;
        scaleY: number;
        onAlloc(): void;
        onRelease(): void;
    }
}
declare namespace game.scene {
    class BaseSceneObj extends BaseDraw {
        protected _vo: SceneObjVo;
        protected _isShowShadow: boolean;
        private readonly _updateCb;
        vo: SceneObjVo;
        protected initUpdateCb(): void;
        protected regUpdateCb(key: string, cb: () => any): void;
        applyUpdate(keys: string[]): void;
        onAlloc(): void;
        onRelease(): void;
        protected onAdded(): void;
        updateVo(): void;
        setWorldPos(wx: number, wy: number): void;
        setTilePos(tx: number, ty: number, updateWorld?: boolean): void;
    }
}
declare namespace game.scene {
    import Point = egret.Point;
    import ObjBase = base.ObjBase;
    class SceneObjVo extends ObjBase {
        private _worldPt;
        type: number;
        entity_id: Long;
        x: number;
        y: number;
        name: string;
        readonly worldPt: Point;
        protected _cfg: any;
        readonly cfg: any;
        constructor(type: number);
        private _res;
        applyUpdate(data: any): string[];
    }
}
declare namespace game.scene {
    import Point = egret.Point;
    import Handler = base.Handler;
    import battle_value = msg.battle_value;
    class BaseActor extends BaseSceneObj {
        avatar: Avatar;
        protected _act: string;
        protected _dir: number;
        protected _actMgr: ActMgr;
        protected _headMgr: HeadMgr;
        protected _eftTopMgr: ActorEftMgr;
        protected _eftBottomMgr: ActorEftMgr;
        protected _chatTxt: ChatText;
        protected _taskChatTxt: ChatText;
        protected _dying: boolean;
        dieDel: boolean;
        protected _atkList: number[];
        protected _fixFrame: number;
        protected _enType: number;
        constructor();
        readonly enType: number;
        vo: ActorVo;
        protected initUpdateCb(): void;
        private _curBuffIdx;
        bodyIsShow(): boolean;
        setBodyIsShow(ret: boolean): void;
        protected onChatTxtChanged(): void;
        protected setChatTxt(content: string): void;
        protected removeChatTxt(): void;
        setTaskChatTxt(content: string): void;
        removeTaskChatTxt(): void;
        protected onSpeedUpdate(): void;
        setShowShadow(isShow: boolean): void;
        protected onAdded(): void;
        updateVo(): void;
        readonly headMgr: HeadMgr;
        readonly actMgr: ActMgr;
        act: string;
        dir: number;
        readonly isDying: boolean;
        readonly isDead: boolean;
        readonly isMoving: boolean;
        setBody(id: string, func?: Handler): void;
        private onDirChange;
        protected getBodyHeight(): number;
        protected onHpChanged(): void;
        protected changeHpShow(): void;
        protected onReborn(): void;
        protected onCampChanged(): void;
        protected changeCampShow(): void;
        onNameChanged(): void;
        /**添加角色表面特效*/
        addEft(eftId: string, x?: number, y?: number, dir?: number, scale?: number, cb?: Handler, loop?: boolean, isRotation?: boolean, isScene?: boolean): number;
        /**添加角色底下特效*/
        addBottomEft(eftId: string, x?: number, y?: number, dir?: number, scale?: number, cb?: Handler): number;
        hit(dir: number): void;
        onHitStart(isChangedAct?: boolean): void;
        onHitEnd(): void;
        addBlood(battleValue: battle_value): void;
        addImmune(battleValue: battle_value): void;
        attack(idx: number, actIdx: number[], dir: number, list: SkillEffectVo[], focusPt?: Point): void;
        onAttackStart(type: number[], dir: number, eftId: string): void;
        protected attackStart(type: number, dir: number, eftId: string): void;
        onAttackEnd(): void;
        checkAct(): void;
        setActStand(): void;
        onAnimComp(): void;
        onDie(): void;
        onDieEnd(): void;
        /** 最后一击 */
        onFatalAtk(): void;
        /** 击杀 */
        killBy(attacker: BaseActor): void;
        movePath(path: Point[], onMoveEnd?: Handler, moveType?: number, moveTime?: number): void;
        onBackStart(): void;
        onMoveStart(): void;
        onMoveEnd(keepRun?: boolean): void;
        setTilePos(tx: number, ty: number, updateWorld?: boolean): void;
        /**
         * 遮挡效果
         */
        protected refreshTileChange(): void;
        getMoveSpeed(mType: number): number;
        onAlloc(): void;
        updateHeadMgrY(): void;
        _shadow: ActorShadow;
        setShadow(shadow: ActorShadow): void;
        setWorldPos(wx: number, wy: number): void;
        onRelease(): void;
        setFixFrame(frame: number): void;
        readonly fixFrame: number;
    }
}
declare namespace game.scene {
    import Point = egret.Point;
    import battle_buff = msg.battle_buff;
    class ActorVo extends SceneObjVo {
        speed: number;
        direction: number;
        coordinate_list: Point[];
        percent: number;
        ex_hp_percent: number;
        buffs: battle_buff[];
        is_buff_empty: boolean;
        hp: Long;
        max_hp: Long;
        showpower: Long;
        camp: number;
        isTarget: boolean;
        getBuffByType(type: BuffType): battle_buff;
        getBuffByIndex(index: number): battle_buff;
        applyUpdate(data: any): string[];
    }
}
declare namespace game.utils {
    import Point = egret.Point;
    class GDirUtil {
        private static PI8;
        private static tan22_5;
        private static tan67_5;
        static Dir_Res_Num: number;
        static dir2idx: number[];
        static getMir(dir: number): number;
        static reversalDir(dir: number): number;
        static rad2Dir(rad: number): number;
        static angle2Dir(angle: number): number;
        static dir2Rad(dir: number): number;
        static randDir(): number;
        private static calcTan;
        static getRadian2(p1X: number, p1Y: number, p2X: number, p2Y: number): number;
        static calcDirection(pt0: Point, pt1: Point): number;
        static directionByTan2(x0: number, y0: number, x1: number, y1: number): number;
        static moveDirectionByTan2(x0: number, y0: number, x1: number, y1: number): number;
        static getDirByAngle(angle: number): Direction;
        /** 新方向资源处理 **/
        static getBmpScaleXFor2(dir: number): number;
        static getBmpScaleXFor3(dir: number): number;
        static getMir2(dir: number): number;
        static getMir3(dir: number): number;
        private static MIR2_DIRECTIONS;
        static directionByTanMir2(x0: number, y0: number, x1: number, y1: number): number;
        /**
         * 一个x,y坐标的一个dir方向dis距离的点（
         * @param x
         * @param y
         * @param dir 方向
         * @param dis 距离
         */
        static getDirPoint(x: number, y: number, dir: Direction, dis: number): Point;
    }
}
declare namespace game.scene {
    class Partner extends BaseActor {
        constructor();
        vo: PetVo;
        onAlloc(): void;
        protected onAdded(): void;
        protected initUpdateCb(): void;
        onNameChanged(): void;
        protected changeHpShow(): void;
        protected getBodyHeight(): number;
        protected updateIndex(): void;
        onMoveStart(): void;
        getMoveSpeed(mType: number): number;
        onDie(): void;
        onDieEnd(): void;
        /*** 切换主视角 */
        setWorldPos(wx: number, wy: number): void;
        act: string;
    }
}
declare namespace game.scene {
    import Monster1Config = game.config.Monster1Config;
    class MonsterVo extends ActorVo {
        isReady: boolean;
        index: number;
        lv: number;
        private _monsterType;
        readonly monsterType: MonsterType;
        isDead: boolean;
        readonly cfg: Monster1Config;
        applyUpdate(s2c: msg.scene_monster_data | msg.scene_collect_data): string[];
    }
}
declare namespace game.scene {
    class NPCVo extends ActorVo {
        index: number;
        npc_id: number;
        shape: string;
        applyUpdate(data: any): string[];
    }
}
declare namespace game.scene {
    import Handler = base.Handler;
    class Ride extends Partner {
        isPlayGhost: boolean;
        constructor();
        vo: PetVo;
        onAlloc(): void;
        onDie(): void;
        protected updateIndex(): void;
        isShowAvatar(show: boolean): void;
        act: string;
        onStar(id: Long, handler: Handler, _scene: Scene): void;
        onOff(id: Long, handler: Handler, _scene: Scene): void;
        advanceTime(elapseTime: number): void;
        onRelease(): void;
    }
}
declare namespace game.scene {
    class BaseAct extends BaseItem {
        protected _actor: BaseActor;
        protected _isDone: boolean;
        protected _isAbort: boolean;
        readonly isAbort: boolean;
        readonly isDone: boolean;
        start(): void;
        done(): void;
        abort(): void;
        protected onStart(): void;
        protected onDone(): void;
        protected onAbort(): void;
        protected onAdded(): void;
        onRelease(): void;
    }
}
declare namespace game.scene {
    import Point = egret.Point;
    class GPlayer extends BaseActor {
        private _avatarOrigScale;
        protected _huaShengOffY: number;
        constructor();
        vo: GPlayerVo;
        closeAvatar(): void;
        updateAvatarClose(): void;
        updateVo(): void;
        protected initUpdateCb(): void;
        advanceTime(elapseTime: number): void;
        protected attackStart(type: number, dir: number, eftId: string): void;
        attack(idx: number, actIdx: number[], dir: number, list: SkillEffectVo[], focusPt: Point): void;
        onPlayerUpdate(): void;
        onCampUpdate(): void;
        protected onMarryNameUpdate(): void;
        protected jumpAction: number;
        onMoveStart(): void;
        protected onReborn(): void;
        private onBodyUpdate;
        private onTitleUpdate;
        /**战盟信息/队伍*/
        protected onTeamNameUpdate(): void;
        /** 设置巅峰对决棋子显示*/
        setFlagShow(src: string): void;
        onRemoveFlag(): void;
        onWeaponUpdate(): void;
        /** 灵器*/
        /** 御灵 */
        private onWingUpdate;
        private onRideInit;
        onRideUpdate(): void;
        private onHorseUpdate;
        private rideStart;
        private rideOff;
        getRideObj(): Ride;
        private onRide;
        protected changeHpShow(): void;
        protected onUpdateMaxHp(): void;
        onUpdateLevel(): void;
        setHorse(id: string, isHorse2?: boolean): void;
        setWeapon(id: string): void;
        setWing(id: string): void;
        onDie(): void;
        onRelease(): void;
        dispose(): void;
        /***********************化神相关的***************************/
        protected onHuashenUpdate(): void;
        private setHuashen;
    }
}
declare namespace game.scene {
    class NPC extends BaseActor {
        protected onAdded(): void;
        protected showModel(): void;
        protected _tmpHp: any;
        protected changeCampShow(): void;
        updateVo(): void;
        onAlloc(): void;
        advanceTime(elapseTime: number): void;
        protected showByDis(): void;
        dir: number;
    }
}
declare namespace game.scene {
    import Point = egret.Point;
    import Handler = base.Handler;
    class MoveBaseAct extends BaseAct {
        protected _path: Point[];
        protected _startPt: Point;
        protected _stepPt: Point;
        protected _endTile: Point;
        protected _nextPt: Point;
        protected _tmpTile: Point;
        protected _curX: number;
        protected _curY: number;
        protected _curTime: number;
        protected _lastMoveTimeLeft: number;
        protected _totalTime: number;
        protected _keepRun: boolean;
        private _isGhostShow;
        protected _onMoveEnd: Handler;
        protected _moveType: number;
        protected _target: ActorVo;
        protected _moveTime: number;
        readonly endTile: Point;
        setPath(path: Point[], onMoveEnd?: Handler, moveType?: number, _moveTime?: number): void;
        readonly path: Point[];
        moveType: number;
        protected onStart(): void;
        protected onDone(): void;
        abort(keepRun?: boolean): void;
        protected onAbort(): void;
        advanceTime(elapseTime: number): void;
        /** 设置世界坐标 */
        protected setTilePos(): void;
        protected isNextPt(): boolean;
        protected shiftNext(): void;
        onSpeedUpdate(): void;
        protected updateDur(startPt: Point, endPt: Point): void;
        onRelease(): void;
    }
}
declare namespace game.mod.scene {
    import Handler = base.Handler;
    import Point = egret.Point;
    import GPlayer = game.scene.GPlayer;
    class RoleGhostShadow extends GPlayer {
        idx: string;
        realObj: GPlayer;
        onRelease(): void;
        protected initUpdateCb(): void;
        protected onAdded(): void;
        private tweenFinish;
        movePath(path: Point[], onMoveEnd?: Handler, moveType?: number, moveTime?: number): void;
        onNameChanged(): void;
    }
}
declare namespace game.mod.scene {
    import Handler = base.Handler;
    import Point = egret.Point;
    import BaseActor = game.scene.BaseActor;
    import Ride = game.scene.Ride;
    import GPlayer = game.scene.GPlayer;
    class GhostShadow extends BaseActor {
        idx: string;
        realObj: Ride | GPlayer;
        onRelease(): void;
        protected initUpdateCb(): void;
        protected onAdded(): void;
        private tweenFinish;
        movePath(path: Point[], onMoveEnd?: Handler, moveType?: number, moveTime?: number): void;
        onNameChanged(): void;
    }
}
declare namespace game.scene {
    class PetVo extends ActorVo {
        index: number;
        master_id: Long;
        buddy_type: number;
        weapon: number;
        ride: number;
        circle: number;
        title: number;
        evolve: number;
        master_name: string;
        isMainPet: boolean;
        applyUpdate(data: any): string[];
    }
}
declare namespace game.scene {
    class TeamPlayer extends GPlayer {
        onStartSprint(sx: number, sy: number, ex: number, ey: number): void;
        protected onHpChanged(): void;
        updateAvatarClose(): void;
        protected onCreditLvUpdate(): void;
    }
}
declare namespace game.scene {
    class TriggerVo extends NPCVo {
        triggerType: number;
        applyUpdate(data: any): string[];
    }
}
declare namespace game.scene {
    class Trigger extends NPC {
        private _lastTriggerTime;
        private _triggerState;
        protected _triggerObj: BaseSceneObj;
        onAlloc(): void;
        advanceTime(elapseTime: number): void;
        /**
         *设置判断对象
         * @param obj
         */
        setJudgeObj(obj: BaseSceneObj): void;
        onRelease(): void;
        private updateTrigger;
        protected showByDis(): void;
    }
}
declare namespace game.scene {
    class CollectVo extends MonsterVo {
    }
}
declare namespace game.scene {
    class CollectItem extends BaseActor {
        protected onAdded(): void;
        protected updateIndex(): void;
        onNameChanged(): void;
        updateClickArea(): void;
        onAlloc(): void;
        protected _addEft(): void;
    }
}
declare namespace game.scene {
    class DropItem extends BaseSceneObj {
        private _eftBmp;
        private _ctrl;
        private _data;
        private _src;
        private iconBmp;
        private iconBmpBg;
        private nameTf;
        private _yIdx;
        private _curTime;
        private _totalTime;
        private _waitTime;
        private _startPt;
        private _endPt;
        private _tmpTile;
        private _isDrawing;
        vo: DropItemVo;
        protected initDsp(): void;
        protected onAdded(): void;
        advanceTime(elapseTime: number): void;
        drawTo(x: number, y: number): void;
        private playDraw;
        private playDrop;
        private checkDel;
        protected updateIndex(): void;
        private getShowSpeed;
        private onIconLoaded;
        private onEftLoaded;
        private removeCurrent;
        private onFrameChange;
        onAlloc(): void;
        onRelease(): void;
        /** 经验飘往经验池 */
        private showMonsterSoul;
    }
}
declare namespace game.scene {
    import PropConfig = game.config.PropConfig;
    import Point = egret.Point;
    class DropItemVo extends SceneObjVo {
        index: Long;
        prop_cnt: number;
        src_coord: Point;
        dest_coord: Point;
        owner_entity_id: Long;
        readyDraw: boolean;
        readonly cfg: PropConfig;
        applyUpdate(data: any): string[];
    }
}
declare namespace game.scene {
    class General extends Partner {
        constructor();
        vo: PetVo;
        onAlloc(): void;
        onDie(): void;
        act: string;
        protected getBodyHeight(): number;
        protected onAdded(): void;
        protected initUpdateCb(): void;
        onNameChanged(): void;
        updateEvolve(): void;
        getQuality(): QualityType;
    }
}
declare namespace game.scene {
    import scene_skill = msg.scene_skill;
    class GPlayerVo extends ActorVo {
        role_id: Long;
        server_id: number;
        sex: number;
        level: number;
        guild_id: number;
        guild_name: string;
        team_id: Long;
        weapon: number;
        wing: number;
        ride: number;
        fashion: number;
        head: number;
        head_frame: number;
        title_index: number;
        title_star: number;
        mate_id: Long;
        mate_name: string;
        skills: scene_skill[];
        skillsMap: {
            [key: number]: scene_skill;
        };
        ride_state: number;
        vip_lv: number;
        the_god: number;
        readonly isDizzy: boolean;
        readonly isTie: boolean;
        private isBuffExist;
        applyUpdate(data: any): string[];
    }
}
declare namespace game.scene {
    import Point = egret.Point;
    class Monster extends BaseActor {
        constructor();
        vo: MonsterVo;
        updateVo(): void;
        private showModel;
        onNameChanged(): void;
        isBoss(): boolean;
        setBossLz(): void;
        onBackStart(): void;
        protected onBuffsUpdate(): void;
        attack(idx: number, actIdx: number[], dir: number, list: game.scene.SkillEffectVo[], focusPt?: egret.Point): void;
        onAlloc(): void;
        onHitStart(): void;
        hit(dir: number): void;
        onMoveStart(): void;
        protected updateIndex(): void;
        protected getBodyHeight(): number;
        onDie(): void;
        decreaseHp(v: Long): void;
        protected changeHpShow(): void;
        private _dyingTime;
        onFatalAtk(): void;
        advanceTime(elapseTime: number): void;
        killBy(attacker: BaseActor): void;
        act: string;
        dir: number;
        pushBack(dst: Point, time: number): void;
    }
}
declare namespace game.scene {
    import Point = egret.Point;
    class MainGPlayer extends GPlayer {
        /** 闲置时间 */
        standTime: number;
        /** 是否遥感移动 */
        isControlMove: boolean;
        private _requestCnt;
        private _lastRequestTime;
        private static _moveTmp;
        private static _ins;
        constructor();
        static readonly ins: MainGPlayer;
        static delIns(): void;
        vo: MainGPlayerVo;
        advanceTime(elapseTime: number): void;
        act: string;
        updateAvatarClose(): void;
        updateVo(): void;
        x: number;
        y: number;
        protected onTeamNameUpdate(): void;
        onNameChanged(): void;
        setAdTitle(lv: number): void;
        requestMonster(): void;
        clearRequestStatus(): void;
        private _sprintPt1;
        private _sprintPt2;
        private _sprintPath;
        onStartSprint(sx: number, sy: number, ex: number, ey: number): void;
        onChangeMoveByPath(path: {
            x: number;
            y: number;
        }[], moveType?: number): void;
        attack(idx: number, actIdx: number[], dir: number, list: SkillEffectVo[], focusPt: Point): void;
        showCommonAtkEfect(): void;
        setWorldPos(wx: number, wy: number): void;
        onMoveStart(): void;
        doMove(p: {
            x: number;
            y: number;
        }[], mType: number): void;
        setTilePos(tx: number, ty: number, updateWorld?: boolean): void;
        onDie(): void;
        onDieEnd(): void;
        onAlloc(): void;
        onRelease(): void;
        /***********************化神相关的***************************/
        protected onHuashenUpdate(): void;
    }
}
declare namespace game.scene {
    import Rectangle = egret.Rectangle;
    import Time = base.Time;
    import EventDispatcher = egret.EventDispatcher;
    import Point = egret.Point;
    import UpdateItem = base.UpdateItem;
    import Texture = egret.Texture;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    class Scene extends BaseDraw implements UpdateItem {
        private _dispatcher;
        private _camera;
        private _shake;
        private _map;
        private _layerDown;
        private _layerAvatar;
        private _layerDropItem;
        private _layerEffect;
        private _layerEffect2;
        private _depthCnt;
        private _depthItem;
        private _ctrl;
        private _isInitMap;
        isAddedMain: boolean;
        mapId: number;
        sceneType: number;
        sceneIndex: number;
        private preTime;
        readonly isInitMap: boolean;
        readonly dispatcher: EventDispatcher;
        readonly ctrl: BaseSceneCtrl;
        readonly isShow: boolean;
        protected init(): void;
        protected initDsp(): void;
        private addLayer;
        clearDropItems(): void;
        addDsp(child: BaseDraw): void;
        initScene(mapId: number, handler: BaseSceneCtrl, sceneType: number, sceneIndex: number): void;
        setBlur(texture: Texture): void;
        readonly isSceneReady: boolean;
        readonly layerDown: DisplayObjectContainer;
        clean(clearAll: boolean): void;
        addActor(actor: BaseSceneObj): void;
        removeActor(actor: BaseSceneObj): void;
        onStageResize(): void;
        updateViewPort(viewPort: Rectangle): void;
        addObj(obj: BaseSceneObj): void;
        removeObj(id: Long): void;
        updateTiles(sc: number, sr: number, ec: number, er: number): void;
        /**
         *更新摄像头对焦位置
         * @param wx
         * @param wy
         * @param smooth 是否平滑
         */
        updateFocus(wx: number, wy: number, smooth?: boolean): void;
        /** 对焦地图中心点*/
        setMapCenterFocus(): void;
        /** 添加残影 */
        addGhost(obj: Ride | GPlayer): void;
        updateShakeFocusPt(): void;
        getFocusPt(): Point;
        getWorldPt(stageX: number, stageY: number, pt?: Point): Point;
        getStagePt(sceneX: number, sceneY: number, pt?: Point): Point;
        static getFindPathDis(sx: number, sy: number, ex: number, ey: number): number;
        static findPath(sx: number, sy: number, ex: number, ey: number): Point[];
        static findAtkPath(sx: number, sy: number, ex: number, ey: number, dis: number): Point[];
        shake(cfg: number[]): void;
        removeShake(): void;
        update(time: Time): void;
        advanceTime(elapseTime: number): void;
        private updateDepth;
        private static sortFun;
        getNearByObjType(objectType: number, index: number): BaseSceneObj;
    }
}
declare namespace game.scene {
    import Texture = egret.Texture;
    class BaseHp extends BaseDraw {
        protected bmpBg: BitmapBase;
        protected bmpHp: BitmapBase;
        protected bmpGrid: BitmapBase[];
        protected gridTexture: Texture;
        private _width;
        private _height;
        private _hpWidth;
        width: number;
        hpWidth: number;
        height: number;
        protected initDsp(): void;
        protected onGetBmpGrid(tex: Texture): void;
        setHp(hp: number): void;
        setGridHp(maxHp: Long): void;
        private clearBmpGrid;
        onRelease(): void;
    }
}
declare namespace game.scene {
    import Point = egret.Point;
    class AttackAct extends BaseAct {
        actType: number[];
        private _idx;
        private _atkEft;
        private _skillEft;
        private _dir;
        private _list;
        private _timeoutKey;
        private _eftListTimeOut;
        private _focusPt;
        readonly idx: number;
        setData(idx: number, actIdx: number[], dir: number, list: SkillEffectVo[], focusPt?: Point): void;
        protected onStart(): void;
        onEffCom(): void;
        private onAtkTimeOut;
        private eftList;
        private roleBeAttack;
        private isShowDmgTxt;
        private clearList;
        protected onDone(): void;
        protected onAbort(): void;
        onRelease(): void;
        private playCastEft;
    }
}
declare namespace game.scene {
    class MoveAct extends MoveBaseAct {
        protected setTilePos(): void;
        protected isNextPt(): boolean;
        /**冲刺*/
        private sprintMove;
        protected findTarget(): boolean;
        private checkDir;
        onRelease(): void;
    }
}
declare namespace game.scene {
    interface EftGroupChildCfg {
        id: string;
        x: number;
        y: number;
        ex: number;
        ey: number;
        sx: number;
        sy: number;
        r: number;
        delay: number;
        rDelay: number;
        times: number;
        duration: number;
        tw?: number[][];
    }
    interface EftGroupCfg {
        id: string;
        children: EftGroupChildCfg[];
    }
    const enum ObjectType {
        NONE = 0,
        PLAYER = 1,
        NPC = 2,
        MONSTER = 3,
        PET = 4,
        DROP_ITEM = 5,
        TEAM_PLAYER = 6,
        /**采集对象*/
        COLLECT = 7,
        /** 触碰物 */
        TRIGGER = 8
    }
    const AllObjectType: ObjectType[];
    const ObjectVo: {
        [ObjectType.PLAYER]: typeof GPlayerVo;
        [ObjectType.NPC]: typeof NPCVo;
        [ObjectType.MONSTER]: typeof MonsterVo;
        [ObjectType.PET]: typeof PetVo;
        [ObjectType.DROP_ITEM]: typeof DropItemVo;
        [ObjectType.TEAM_PLAYER]: typeof GPlayerVo;
        [ObjectType.COLLECT]: typeof CollectVo;
        [ObjectType.TRIGGER]: typeof TriggerVo;
    };
    const ObjectCls: {
        [ObjectType.PLAYER]: typeof GPlayer;
        [ObjectType.NPC]: typeof NPC;
        [ObjectType.MONSTER]: typeof Monster;
        [ObjectType.DROP_ITEM]: typeof DropItem;
        [ObjectType.TEAM_PLAYER]: typeof TeamPlayer;
        [ObjectType.COLLECT]: typeof CollectItem;
        [ObjectType.TRIGGER]: typeof Trigger;
    };
    const PetObjectCls: {
        [PetType.General]: typeof General;
        [PetType.Ride]: typeof Ride;
    };
    const enum MoveType {
        Normal = 0,
        Sprint = 1,
        Back = 2,
        Find = 3,
        Jump = 6,
        Push_Back = 7,
        Push_Fly = 8,
        Bounce_Off = 9,
        Stop = 99
    }
    const enum BuffType {
        Invincible = 37,
        Crit = 38
    }
    const enum SkillUseStatus {
        SUCCESS = 0,
        NO_EFFECT = 1,
        NEED_BUT_NO_FOCUS = 2,
        IN_CD = 3,
        TOO_FAR = 4,
        INVALID_FOCUS = 5,
        NO_SKILL = 6,
        IN_PUBLIC_CD = 7
    }
    const SPRINT_DIS_MAX: number;
    const SPRINT_DIS_MIN: number;
    const MOVE_AMEND_DIS: number;
    const enum SceneLayerType {
        Down = 1,
        Avatar = 2,
        Effect = 3
    }
    const enum MonsterType {
        Common = 1,
        Boss = 2,
        Architecture = 3,
        Collect = 4
    }
    const enum PetType {
        General = 1,
        Sprite = 2,
        Ride = 3
    }
    const enum SkillType2 {
        NORMAL = 1,
        ROLE = 2,
        WUSHEN = 3,
        SHINV = 4,
        LINGCHONG = 5,
        SHENHUA = 12,
        SHENJUE = 13
    }
    const BossHitEftSrc: string;
    const EnterSceneEft: string;
    const BossDieEftSrc: string;
    const TalentEftSrc: string;
    const TalentEftSrc2: string;
    const EnterPortal: string;
    const enum GroupEftSrc {
        Buff = "12fz_dragon"
    }
    const ATK_EFT_3: string;
    const GuideLuoJian: string;
    const LuoJianXie: string;
    const BossEnterEft: string;
    const RoleLvUp: string;
    const MonsterEnterPortal: string;
    const XianShiFaZhen: string;
    const DropItemY: number[];
    const HuashenPt: {
        x: number;
        y: number;
    };
    const FaBaoRightPt: {
        x: number;
        y: number;
    };
    const DiBingRightPt: {
        x: number;
        y: number;
    }[];
    const SoulWareAddX: number;
    const enum SoulWareDir {
        LEFT = 1,
        RIGHT = -1
    }
    const FaBaoMoveCfg: number[][];
}
declare namespace game.scene {
    import Point = egret.Point;
    class SceneTools {
        static readonly mainPlayerVo: game.scene.MainGPlayerVo;
        static isSelfReady(playerVo: GPlayerVo): boolean;
        static isTargetReady(target: ActorVo): boolean;
        static isEnemy(target: ActorVo): boolean;
        static getNameColor(target: ActorVo): UIColor.WHITE | UIColor.ORANGE | UIColor.RED;
        static getMapIdByScene(index: number): number;
        static isMainPlayer(targetId: Long): boolean;
        static getRandomNum(min: number, max: number): number;
        private static tmpRandom;
        static getRandomPt(focusX: number, focusY: number, min: number, max: number, pt?: Point): Point;
        static getRandomTeamPt(focusX: number, focusY: number, idx: number, pt?: Point): Point;
        private static focusEntityId;
        /** 镜头跟随id */
        static setFocusEntityId(focus_id: Long): void;
        /** 是否为主视角*/
        static isFocusEntity(tarId: Long): boolean;
        /**
         * 是否震屏
         * @param sceneType
         */
        static isOptimizeScene(sceneType: number): boolean;
        static isShieldingSkillEft(target: BaseActor): boolean;
        /**
         * 是否显示特效
         * @param {boolean} _isSelf
         * @returns {boolean}
         */
        static isShowEft(_isSelf: boolean): boolean;
    }
}
declare namespace game.scene {
    import UpdateItem = base.UpdateItem;
    import Time = base.Time;
    import Handler = base.Handler;
    class BaseEnterEffect implements UpdateItem {
        private _onComplete;
        private _stepStatus;
        constructor(onComplete: Handler);
        start(): void;
        step(step: EnterEffectStep): void;
        stop(callComplete?: boolean): void;
        update(time: Time): void;
    }
}
declare namespace game.scene {
    class PlayerHp extends BaseHp {
        protected initDsp(): void;
        onAlloc(): void;
        protected getHpRes(): void;
        protected getBgRes(): void;
        protected getGridRes(): void;
        protected onGetBmpHp(): void;
        protected onGetBmpBg(): void;
        protected switchGridType(type?: number): void;
        onRelease(): void;
    }
}
declare namespace game.scene {
    import MainGPlayer = game.scene.MainGPlayer;
    import scene_skill = msg.scene_skill;
    import Point = egret.Point;
    import Scene = game.scene.Scene;
    import BaseItem = game.scene.BaseItem;
    import ActorVo = game.scene.ActorVo;
    import ISceneProxy = game.mod.ISceneProxy;
    /** 通用Ai */
    class CommonAi extends BaseItem {
        protected _curTarget: ActorVo;
        protected _open: boolean;
        private _tickerCnt;
        protected _isUsingSkill: boolean;
        protected _lastUsingTime: number;
        protected _lastUsingIdx: number;
        private preTime;
        /** 技能队列 */
        protected _queueSkills: scene_skill[];
        protected _enableSkills: scene_skill[];
        protected _commonSkils: number[];
        protected _commonHuashengSkils: number[];
        protected player: MainGPlayer;
        protected scene: Scene;
        protected _proxy: ISceneProxy;
        protected _isSprintAI: boolean;
        protected _startAtk: boolean;
        protected _cellWidth: number;
        protected _tolerance: number;
        protected _otherSkillTime: number;
        protected _tmpTile: Point;
        onAlloc(): void;
        protected onAdded(): void;
        /** 当前选中目标 */
        curTarget: ActorVo;
        open: boolean;
        startAtk(): void;
        stopAtk(): void;
        advanceTime(elapseTime: number): void;
        private isAtked;
        private ticker;
        protected findTarget(): boolean;
        /** 攻击目标 */
        attackTarget(skillIdx: number): void;
        private isDoneSprint;
        getCellXY(x1: number, y1: number, x2: number, y2: number, dir: number, atkDis: number): Point;
        private turnPetDir;
        private useSkill;
        /** 获取能使用的技能 */
        protected getEnableSkillIdx(): number;
        /** 获取普通攻击 包括化神普工*/
        protected getCommonAtk(commonSkils: number[]): number;
        /** 获取队列中技能 */
        protected getQueueSkill(): scene_skill;
        /** 随机获取冷却好的技能 */
        protected getReadySkill(): scene_skill;
        private processSpecialSkill2;
        /** 注意 skills 不是玩家已经挂上的技能，这里只是为了他的顺序 */
        private processSpecialSkill;
        /** 清除能使用技能状态 */
        clearUsingSkillStatus(): void;
        /** 寻找目标 */
        protected commonFindTarget(): ActorVo;
        protected findMinDisTarget(type: number): ActorVo;
        /** 开始挂机 */
        startHangUp(): void;
        /** 停止挂机 */
        stopHandUp(): void;
        resetData(): void;
        onRelease(): void;
        getAttackTarget(): ActorVo;
    }
}
declare namespace game.scene {
    import TextField = egret.TextField;
    class BaseName extends BaseDraw {
        protected _textField: TextField;
        protected _actor: BaseActor;
        protected _headMdr: HeadMgr;
        protected _width: number;
        width: number;
        protected onAdded(): void;
        text: string;
        protected _height: number;
        height: number;
        protected initDsp(): void;
        color: number;
        onRelease(): void;
    }
}
declare namespace game.scene {
    import Handler = base.Handler;
    class CloudEffect extends BaseEnterEffect {
        private _imgs;
        private static _ins;
        static getIns(onComplete: Handler): CloudEffect;
        start(): void;
        stop(callComplete?: boolean): void;
    }
}
declare namespace game.scene {
    import UpdateItem = base.UpdateItem;
    import Time = base.Time;
    class STxtMgr implements UpdateItem {
        private static _ins;
        static readonly ins: STxtMgr;
        private _scene;
        private _queueNum;
        static _actArrayMap: {
            [key: number]: any;
        };
        init(scene: Scene): void;
        show(dmgStr: string, x: number, y: number, dir: number, types: number[], delay: number, target?: BaseActor): void;
        update(time: Time): void;
        private addNum;
        clean(): void;
    }
}
declare namespace game.scene {
    class BaseSceneCtrl {
        private _scene;
        private _mapId;
        private _objMap;
        private _rideMap;
        private _ghost;
        /** 调试专用 */
        objDebugMap: {
            [key: string]: BaseSceneObj;
        };
        private _ghostIdx;
        getObj(id: Long): BaseSceneObj;
        getObjMap(): {
            [key: string]: BaseSceneObj;
        };
        init(mapId: number, scene: Scene): void;
        getRide(id: Long): Ride;
        addRide(obj: Ride): void;
        removeRide(obj: Ride | string): void;
        addObj(obj: BaseSceneObj): void;
        removeById(id: Long): boolean;
        removeObj(obj: BaseSceneObj): boolean;
        addGhost(obj: BaseSceneObj): void;
        removeGhost(obj: BaseSceneObj): void;
        /** SceneDebug */
        addDebugObj(obj: BaseSceneObj): void;
        /** SceneDebug */
        removeDebugById(id: Long | string): boolean;
        /** SceneDebug */
        removeDebugAll(): void;
        dispose(): void;
        protected onInit(): void;
        protected onObjAdded(obj: BaseSceneObj): void;
        protected onRemoved(obj: BaseSceneObj): void;
        protected onDispose(): void;
    }
}
declare namespace game.scene {
    class AdTitle extends BaseDraw {
        private _width;
        private _height;
        private _imgTxtVip;
        private _imgDi;
        private _imgTxtDao;
        private _imgTxtSong;
        private _imgTxtGuan;
        private _vipFont;
        private _conditionFont;
        private _nextPass;
        private _nextInfo;
        width: number;
        height: number;
        protected initDsp(): void;
        /**
         * @param {number} lv vip等级
         * */
        static getShowVipAdLimit(lv: number): number[];
        setTitle(_limit: number[]): void;
        private loadFont;
        private setVipBmpFont;
        onRelease(): void;
        private releaseByEle;
    }
}
declare namespace game.scene {
    class BaseClickArea extends BaseDraw {
        private _bmp;
        private _width;
        private _height;
        protected initDsp(): void;
        private onClickSelf;
        clickEnabled: boolean;
        width: number;
        height: number;
        onRelease(): void;
    }
}
declare namespace game.scene {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Texture = egret.Texture;
    class SceneMap extends DisplayObjectContainer {
        private _blur;
        private _mapId;
        private _sliceW;
        private _sliceH;
        private _curSC;
        private _curSR;
        private _curEC;
        private _curER;
        private _bmpMap;
        private _curShow;
        private _initX;
        private _numC;
        private _initY;
        private _numR;
        private _moveSpeed;
        private _moveType;
        private _initMoveData;
        private _isHangUp;
        private _waitTime;
        private _waitCnt;
        private _lastWaitTime;
        private _releaseMap;
        constructor();
        init(mapId: number): void;
        /**视图变化时重置地图移动数据*/
        private initMoveData;
        setBlur(texture: Texture): void;
        /**刷新地图，左上方第一块地图坐标（sc,sr），右下方最后一块地图坐标（ec,er）*/
        updateTiles(sc: number, sr: number, ec: number, er: number): void;
        private loadOne;
        private updateBlur;
        clean(clearAll: boolean): void;
        private getBmp;
        check(time: number): void;
        private checkMapBmpClear;
        private releaseMapBmp;
        private clearAllMapBmp;
        private static getCol;
        private static getRow;
        private static centerCol;
        private static centerRow;
        static sortId(id1: string, id2: string): number;
        /**移动地图块*/
        private checkMapBmpMove;
        /**移动地图块*/
        private checkMapBmpMoveX;
        /**移动地图块*/
        private checkMapBmpMoveY;
    }
}
declare namespace game.scene {
    class BaseBmpNum extends BaseDraw {
        readonly type: number;
        private _startAttr;
        private _tweenX;
        private _tweenY;
        private _curTime;
        private _curFrame;
        private _finalFrame;
        private _text;
        private _url;
        private _fontName;
        private _type;
        private _isHasWord;
        private _data;
        private _dir;
        showTime: number;
        private _showAttr;
        private _randomX;
        private _randomY;
        private isNeedShowTween;
        private _actArray;
        private _isMainPlayer;
        loadCfg(key: string): void;
        setText(text: string, x: number, y: number, dir: number, type: number, fontName: string, actArray: any, hasword?: number, isMainPlayer?: boolean, actAtr?: string): void;
        private computerTotalAtr;
        private parabolic;
        showTween(): void;
        private setBmp;
        private setAnchorOff;
        private addFontBmp;
        advanceTime(elapseTime: number): void;
        private onComplete;
        private updateAttr;
        protected onAdded(): void;
        private clearDisplay;
        onRelease(): void;
        dispose(): void;
    }
}
declare namespace game.scene {
    class BaseTitle extends BaseDraw {
        constructor();
        protected _titleBmp: BitmapBase;
        private group;
        private _width;
        private _height;
        private _ctrl;
        private _data;
        private _src;
        width: number;
        height: number;
        protected initDsp(): void;
        setTitle(src: string): void;
        private onLoaded;
        private removeCurrent;
        advanceTime(elapseTime: number): void;
        private onFrameChange;
        onAlloc(): void;
        onRelease(): void;
    }
}
declare namespace game.scene {
    class ChatText extends BaseDraw {
        private _width;
        private _height;
        private _imgChatBg;
        private _labChatTxt;
        width: number;
        height: number;
        protected initDsp(): void;
        setChatTxt(content: string): void;
        onRelease(): void;
    }
}
declare namespace game.scene {
    class HeadMgr extends BaseDraw {
        readonly adTitle: AdTitle;
        protected _itemName: ComName;
        protected _partnerName: BaseName;
        protected _hpItem: BaseHp;
        protected _teamName: TeamName;
        protected _title: BaseTitle;
        protected _campName: CampName;
        protected _flag: TopDuelFlag;
        private _adTitle;
        private _height;
        private _sort;
        private _widthChanged;
        sort: boolean;
        height: number;
        updateEnabled: boolean;
        setName(name?: string, color?: number): void;
        setNameColor(color: UIColor): void;
        setTeamName(name?: string, color?: number): void;
        setPartnerName(name: string, color?: UIColor): void;
        setPartnerNameColor(color: UIColor): void;
        removeParnerName(): void;
        /** 巅峰对决旗显示*/
        setFlagShow(src: string): void;
        removeFlag(): void;
        setCampName(name?: string, color?: number): void;
        add(child: BaseItem): void;
        remove(child: BaseItem): void;
        setHp(hpPercent: number): void;
        setGridHp(maxHp: Long): void;
        setAdTitle(lv: number): void;
        removeHp(): void;
        setTitle(src: string): void;
        removeTitle(): void;
        private initHp;
        advanceTime(elapseTime: number): void;
        private updateWidth;
        private sortChild;
        protected onAdded(): void;
        onRelease(): void;
    }
}
declare namespace game.scene {
    /**
     * 小怪血条
     */
    class MonsterHp extends PlayerHp {
        protected getHpRes(): void;
        protected onGetBmpHp(): void;
        protected onGetBmpBg(): void;
    }
}
declare namespace game.scene {
    class SceneShake {
        private _scene;
        isShake: boolean;
        private _shakeStartTime;
        private _curTimes;
        private _times;
        private _duration;
        private _curFrame;
        private _frameTime;
        private _shakeFocusPt;
        private readonly MAX_FRAME;
        constructor(scene: Scene);
        start(cfg: number[]): void;
        remove(): void;
        updateShakeFocusPt(): void;
        doShake(): void;
    }
}
declare namespace game.scene {
    class TopDuelFlag extends BaseDraw {
        constructor();
        protected _titleBmp: BitmapBase;
        private _width;
        private _height;
        type: number;
        width: number;
        height: number;
        protected initDsp(): void;
        setTitle(src: string): void;
        protected onGetTitle(): void;
        onRelease(): void;
    }
}
declare namespace game.scene {
    class CampName extends BaseName {
        protected onAdded(): void;
        /** 设置阵营名*/
        setName(name?: string): void;
        height: number;
        width: number;
        color: number;
        text: string;
    }
}
declare namespace game.scene {
    class ComName extends BaseName {
        protected onAdded(): void;
        /**
         * 实体名字赋值
         * @param eName 用于调试
         */
        setName(eName?: string): void;
        height: number;
        width: number;
        color: number;
        text: string;
        onRelease(): void;
    }
}
declare namespace game.scene {
    import TextField = egret.TextField;
    class TeamName extends BaseDraw {
        protected _textField: TextField;
        protected _actor: BaseActor;
        protected _headMdr: HeadMgr;
        private _iconBmp;
        private _width;
        private _height;
        private readonly imgSize;
        protected initDsp(): void;
        protected onAdded(): void;
        /**
         * 队伍/战盟名
         */
        setName(name?: string): void;
        setGuildIcon(src: string): void;
        height: number;
        width: number;
        color: number;
        text: string;
        onRelease(): void;
    }
}
declare namespace game.scene {
    /***
     * 阴影
     */
    class ActorShadow extends BaseDraw {
        private _bmp;
        private _actor;
        setActor(actor: BaseActor): void;
        updatePos(wx: number, wy: number): void;
        private resetPos;
        onAlloc(): void;
        onRelease(): void;
    }
}
declare namespace game.scene {
    import Point = egret.Point;
    import Handler = base.Handler;
    class MapData {
        private static _ins;
        static readonly ins: MapData;
        private _path;
        readonly path: number[][];
        private _mapWidth;
        readonly mapWidth: number;
        private _mapHeight;
        readonly mapHeight: number;
        private _sliceWidth;
        readonly sliceWidth: number;
        private _sliceHeight;
        readonly sliceHeight: number;
        private _sliceCol;
        readonly sliceCol: number;
        private _sliceRow;
        readonly sliceRow: number;
        private _cellWidth;
        readonly cellWidth: number;
        private _cellHeight;
        readonly cellHeight: number;
        private _numCol;
        readonly numCol: number;
        private _numRow;
        readonly numRow: number;
        private _isHangUp;
        isHangUp: boolean;
        private _mapMoveType;
        mapMoveType: number;
        private _cfg;
        getMask(x: number, y: number): number;
        private _ckBlock;
        readonly ckBlock: Handler;
        isBlock(x: number, y: number): boolean;
        isShelter(x: number, y: number): boolean;
        /**
         * 范围内
         * @param x
         * @param y
         */
        isInRange(x: number, y: number): boolean;
        isPointLegal(x: number, y: number): boolean;
        setSource(data: MapInfo): void;
        getCellPt(wx: number, wy: number, pt?: Point): Point;
        /**计算世界坐标，会乘以网格宽度32*/
        getWorldPt(tx: number, ty: number, pt?: Point): Point;
        getCellPtByIdx(idx: number, pt?: Point): Point;
    }
}
declare namespace game.scene {
    import ActorVo = game.scene.ActorVo;
    /** 跨服斗法Ai */
    class KuafuDoufaAi extends CommonAi {
        /** 寻找目标 */
        protected commonFindTarget(): ActorVo;
    }
}
declare namespace game.scene {
    import Handler = base.Handler;
    class Avatar extends BaseDraw {
        loadPri: number;
        private readonly _partMap;
        private _ctrl;
        private _ctrlHorse;
        private _soulWareCtrl;
        resType: number;
        private _fixFrame;
        private _act;
        private _dir;
        objType: number;
        loop: boolean;
        private _close;
        private _bodyIsShow;
        private _ower;
        private _durationN;
        ower: BaseActor;
        close: boolean;
        bodyIsShow: boolean;
        getAvatarPart(type: number): AvatarPart;
        onComplete: Handler;
        readonly isComplete: boolean;
        advanceTime(elapseTime: number): void;
        private updatePart;
        setPart(partIdx: number, id: string, func?: Handler): void;
        resetActDir(): void;
        setAct(act: string): void;
        setDir(dir: number): void;
        private updatePartMap;
        /** 设置固定帧 */
        setFixFrame(frame: number): void;
        private onFrameChanged;
        private onFrameHorseChanged;
        private onPartLoadCfg;
        private onPartHorseLoadCfg;
        sortPart(): void;
        onAlloc(): void;
        scale: number;
        onRelease(): void;
        private resetDurationN;
    }
}
declare namespace game.scene {
    import DisplayObject = egret.DisplayObject;
    import Handler = base.Handler;
    import PoolObject = base.PoolObject;
    class AvatarPart implements PoolObject {
        private readonly _bmp;
        loadPri: number;
        srcUpdate: boolean;
        private _idx;
        private _id;
        private _data;
        private _act;
        private _dir;
        private _src;
        private _resType;
        private _bmpScaleX;
        scale: number;
        offsetY: number;
        private scaleX;
        private scaleY;
        y: number;
        private _loadCb;
        private _cbCall;
        private _sp;
        private static Tmp;
        private _loadedFunc;
        constructor();
        readonly display: DisplayObject;
        readonly idx: number;
        readonly dir: number;
        readonly data: MergedBmp;
        init(idx: number, resType: number): void;
        setLoadCb(cb: Handler): void;
        protected checkAct(act: string): string;
        protected checkDir(dir: number): number;
        setSrc(id: string, act: string, dir: number, func?: Handler): void;
        getId(): string;
        loadCfg(): void;
        private onLoadComplete;
        private callCb;
        onFrame(frame: number): void;
        private getSrc;
        /**删除当前*/
        private removeCurrent;
        dispose(): void;
        onAlloc(): void;
        onRelease(): void;
        private getFinalDir;
        private getBmpScaleX;
    }
}
declare namespace game.scene {
    class ActMgr extends BaseCont {
        readonly isEmpty: boolean;
        readonly curAct: BaseAct;
        has(act: any): boolean;
        add(child: BaseItem): void;
        private onAddAtk;
        private onAddJumpMove;
        private onAddMove;
        removeAllActByCls(cls: new () => BaseAct): void;
        advanceTime(elapseTime: number): void;
        doNext(): void;
    }
}
declare namespace game.scene {
    class MainGPlayerVo extends GPlayerVo {
        isAutoHangUp: boolean;
        target_id: Long;
        target_idx: number;
    }
}
declare namespace game.scene {
    class DieAct extends BaseAct {
        attacker: BaseActor;
        private _start;
        private _flyEnd;
        private _curTime;
        private _moveTime;
        private _totalTime;
        private _timeOutKey;
        protected onStart(): void;
        protected onAbort(): void;
        protected onDone(): void;
        private onDieTimeOut;
        onAnimComp(): void;
        advanceTime(elapseTime: number): void;
        onRelease(): void;
    }
}
declare namespace game.scene {
    class HitAct extends BaseAct {
        private _timeoutKey;
        eftDir: number;
        isChangeAct: boolean;
        protected onStart(): void;
        private onTimeOut;
        onEffCom(): void;
        protected onDone(): void;
        protected onAbort(): void;
        protected onAdded(): void;
        onRelease(): void;
    }
}
declare namespace game.scene {
    import Point = egret.Point;
    import Handler = base.Handler;
    class JumpMoveAct extends BaseAct {
        private _bezierPosArr;
        private _starP;
        private _midP;
        private _endP;
        private _onMoveEnd;
        private _moveType;
        /**
         * 每段贝塞尔曲线运动花费的时间
         */
        private _timePerDis;
        /**
         * 贝塞尔曲线的段数
         */
        private _disCnt;
        /**
         * 是否已经计算过速度
         */
        private _isCountSpeed;
        protected onStart(): void;
        setPath(path: Point[], moveType: number, onMoveEnd?: Handler): void;
        private moveBezierPoint;
        private flusCameraPos;
    }
}
declare namespace game.scene {
    interface SceneDisplay {
        addTime: number;
    }
}
declare namespace game.scene {
    class SceneItem extends BaseDraw {
        protected _ctrl: AnimCtrl;
        private _bmp;
        private _data;
        private _src;
        onAlloc(): void;
        src: string;
        private onLoadComplete;
        onFrame(frame: number): void;
        private removeCurrent;
        private onPartLoadCfg;
        advanceTime(elapseTime: number): void;
        onRelease(): void;
    }
}
declare namespace game.scene {
    import battle_value = msg.battle_value;
    class AddBloodAct extends BaseAct {
        private _value;
        setData(list: battle_value): void;
        protected onStart(): void;
        private eftList;
        onRelease(): void;
    }
}
declare namespace game.scene {
    import PoolObject = base.PoolObject;
    import battle_value = msg.battle_value;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    class SkillEffectVo implements PoolObject {
        private static _pool;
        static allocList(): SkillEffectVo[];
        static releaseList(list: SkillEffectVo[]): void;
        target: BaseActor;
        target_id: Long;
        b_value: battle_value[];
        is_dead: boolean;
        push_x: number;
        push_y: number;
        skillCfg: BattleSkillConfig;
        dispose(): void;
        onAlloc(): void;
        onRelease(): void;
    }
}
declare namespace game.scene {
    class SoulWareVo extends ActorVo {
        mainId: Long;
        index: number;
    }
}
declare namespace game.scene {
    import battle_value = msg.battle_value;
    class AddImmuneAct extends BaseAct {
        private _value;
        setData(list: battle_value): void;
        protected onStart(): void;
        private eftList;
        onRelease(): void;
    }
}
declare namespace game.scene {
    import Handler = base.Handler;
    class ActorEftMgr extends BaseDraw {
        private _actor;
        private _id;
        private readonly _effect;
        addEft(eftId: string, x: number, y: number, dir: number, scale?: number, cb?: Handler, times?: number, isRotation?: boolean, isScene?: boolean): number;
        private onPlayComp;
        removeEffect(id: number | string): void;
        removeAllEffects(): void;
        protected onAdded(): void;
        onRelease(): void;
    }
}
declare namespace game.scene {
    import Handler = base.Handler;
    class EftGroup extends BaseDraw {
        private _eftId;
        private _src;
        private _onDone;
        private _timeOut;
        private _addEdEft;
        private _eftList;
        private _len;
        private _startTime;
        private _elapseTime;
        private _actor;
        layer: number;
        setData(eftId: string | number, src: string, actor: BaseActor, cb: Handler): void;
        private onLoadFail;
        private onLoadSucc;
        private resetActor;
        private onComp;
        advanceTime(elapseTime: number): void;
        onRelease(): void;
    }
}
declare namespace game.scene {
    import Handler = base.Handler;
    class EftUIGroup extends BaseDraw {
        private _eftId;
        private _src;
        private _onDone;
        private _onEftDone;
        private _onEftChildDone;
        private _timeOut;
        private _addEdEft;
        private _eftList;
        private _len;
        private _startTime;
        private _elapseTime;
        private _actor;
        layer: number;
        _container: egret.DisplayObjectContainer;
        setData(eftId: string | number, src: string, actor: BaseActor, cb: Handler, container: egret.DisplayObjectContainer, eftDone: Handler, eftChildDone: Handler): void;
        private onLoadFail;
        private onLoadSucc;
        private resetActor;
        private onComp;
        advanceTime(elapseTime: number): void;
        onRelease(): void;
        isFinished(): boolean;
    }
}
declare namespace game.scene {
    import Handler = base.Handler;
    class SkillEffect extends BaseDraw {
        private _bmp;
        private _ctrl;
        private _data;
        private _dataBit;
        private _source;
        private _sourceFrames;
        private _curTimes;
        times: number;
        duration: number;
        speed: number;
        private _replayTimeOut;
        private _onDone;
        private _timeoutTick;
        private _removeTimeOut;
        private _removeDelay;
        private _twList;
        private _twCnt;
        private _twCurTime;
        private _twLen;
        private _sx;
        private _sy;
        groupR: number;
        layer: number;
        private _isRemove;
        private _setRotation;
        private _bmpScaleX;
        constructor();
        playEft(eftId: string, src: string, dir: number, cb?: Handler): void;
        playSkillEft(eftId: string, src: string, rotation: number, eftCfg: EftGroupChildCfg, scaleX?: number, cb?: Handler): void;
        private loadEft;
        private removeCurrent;
        private oneLoaded;
        private initCtrl;
        private onComplete;
        private replay;
        private removeSelf;
        private onRemoveTimeOut;
        advanceTime(elapseTime: number): void;
        private onFrameChange;
        protected initDsp(): void;
        onAlloc(): void;
        onRelease(): void;
    }
}
declare namespace game.scene {
    import Handler = base.Handler;
    import SkillShowConfig = game.config.SkillShowConfig;
    import UpdateItem = base.UpdateItem;
    class SkillEftMgr implements UpdateItem {
        private static _ins;
        private _eftGroup;
        private _skillEffects;
        static readonly ins: SkillEftMgr;
        private _scene;
        init(scene: Scene): void;
        showAtkEft(eftId: string, x: number, y: number, dir: number, cb?: Handler, scale?: number, times?: number, layer?: number): void;
        showSkillEft(eftId: string, x: number, y: number, rotation: number, eftCfg: EftGroupChildCfg, groupR?: number, scaleX?: number, scale?: number, layer?: number): void;
        showSkillEftUI(eftId: string, x: number, y: number, rotation: number, eftCfg: EftGroupChildCfg, groupR?: number, scaleX?: number, scale?: number, layer?: number, container?: egret.DisplayObjectContainer, cb?: Handler): SkillEffect;
        showGroupEft(eftId: string, x: number, y: number, dir: number, atkCfg?: SkillShowConfig, actor?: BaseActor, cb?: Handler, scale?: number): void;
        showGroupUIEft(eftId: string, x: number, y: number, dir: number, atkCfg?: SkillShowConfig, actor?: BaseActor, scale?: number, container?: egret.DisplayObjectContainer): EftUIGroup;
        update(time: base.Time): void;
        resetUIEf(): void;
    }
}
declare namespace game.scene {
    import Point = egret.Point;
    import Handler = base.Handler;
    class AStar {
        private static _nodes;
        private static _numCols;
        private static _numRows;
        private static _isInit;
        private static _nowversion;
        static ckIsBlock: Handler;
        static initialize(numCols: number, numRows: number): void;
        private static excInit;
        private static getNode;
        static findPath(sx: number, sy: number, ex: number, ey: number): Point[];
        /** 此方法会修改传入的path */
        static floyd(path: Point[]): Point[];
        private static floydVector;
        static isPassable(p1: Point, p2: Point): boolean;
        private static initNodeLink8;
        static isLinePassable(x0: number, y0: number, x1: number, y1: number): boolean;
        private static buildPath;
        private static euclidian2;
    }
}
declare namespace game.scene {
    import Rectangle = egret.Rectangle;
    import Point = egret.Point;
    class SceneCamera {
        private static Fix;
        private _mw;
        private _mh;
        private _sliceW;
        private _sliceH;
        private _sw;
        private _sh;
        private _fx;
        private _fy;
        _scene: Scene;
        private _viewPort;
        private _scale;
        private _isStartMove;
        private _speedMove;
        private _curMovePosX;
        private _curMovePosY;
        private _startPosX;
        private _startPosY;
        private _endPosX;
        private _endPosY;
        private _totalDist;
        private _curTime;
        private isUpdate;
        private _update_average_time_queue;
        constructor(scene: Scene);
        init(): void;
        onResize(sw: number, sh: number): void;
        private equal;
        /**PVP里面的场景才会用到，设置镜头居中*/
        setMapCenterFocus(): void;
        setFocus(focusX: number, focusY: number, smooth?: boolean, scale?: number): void;
        update(elapseTime: number): void;
        private checkToStopUpdate;
        getFocusPt(): Point;
        private updateViewPort;
        private updateMapTiles;
        readonly viewPort: Rectangle;
    }
}
declare namespace game.scene {
    class MapCellUtil {
        static readonly BLOCK: number;
        static readonly PASS: number;
        static readonly SHELTER: number;
        static readonly JUMP: number;
        static readonly SAFETY: number;
        static isMask(value: number, mask: number): boolean;
        static isPass(value: number): boolean;
        static isBlock(value: number): boolean;
        static isShelter(value: number): boolean;
    }
}
declare namespace game.scene {
    import Point = egret.Point;
    class OptimalPath {
        private static _matrixMap;
        private static _disList;
        private static _tmpPt1;
        private static _tmpPt2;
        private static clearDis;
        private static initData;
        private static Dijkstra;
        static getPath(beginPt: Point, endPt: Point, mapId: number): Point[];
        private static findPointIdx;
        private static findPathIdx;
    }
}
declare namespace game.scene {
    import Time = base.Time;
    class RhombusEffect extends BaseEnterEffect {
        private readonly _sps;
        private _pos;
        start(): void;
        stop(callComplete?: boolean): void;
        update(time: Time): void;
        private draw;
    }
}
