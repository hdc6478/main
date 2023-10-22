namespace game.mod.scene {
    import SceneObjVo = game.scene.SceneObjVo;
    import AllObjectType = game.scene.AllObjectType;
    import MainGPlayerVo = game.scene.MainGPlayerVo;
    import Scene = game.scene.Scene;
    import MainGPlayer = game.scene.MainGPlayer;
    import NPCVo = game.scene.NPCVo;
    //import NpcConfig = game.config.NpcConfig;
    import CommonAi = game.scene.CommonAi;
    import teammate = msg.teammate;
    import s2c_battle_role_die = msg.s2c_battle_role_die;

    export class SceneModel {
        public mainPlayerVo: MainGPlayerVo;
        public scene: Scene;
        public mainPlayer: MainGPlayer;
        public mainAi: CommonAi;
        public isFirstEnter:boolean = true;
        public role_info:msg.scene_role_data;

        public get isAutoHangUp(): boolean {
            return this._isAutoHangUp;
        }

        public set isAutoHangUp(value: boolean) {
            this._isAutoHangUp = value;
            if (this.mainPlayerVo) {
                this.mainPlayerVo.isAutoHangUp = value;
            }
        }

        get voList(): { [p: string]: SceneObjVo } {
            return this._voList;
        }

        set voList(value: { [p: string]: SceneObjVo }) {
            this._voList = value;
        }

        private _isAutoHangUp: boolean = true;
        public isServerControl: boolean; //是否是服务端控制

        public isEnterScene: boolean = false; //是否第二次确定进入场景
        public isMapOk: boolean = false;
        public lastSceneIdx: number = 0;
        public curSceneIdx: number = 0;
        public sceneId: number;
        public isSceneEft: number;//是否播放云雾特效，0不播放

        public readonly typeVoMap: { [type: number]: SceneObjVo[] };
        private _voList: { [key: string]: SceneObjVo } = {};

        constructor() {
            this.typeVoMap = {};
            for (let type of AllObjectType) {
                this.typeVoMap[type] = [];
            }
        }

        public foeTargetId: Long; //当前选择攻击目标

        //非归属者敌人
        public enemyInfo: { id: Long, type: number };

        /** 客户端NPC */
        public npcDic: { [p: string]: NPCVo } = {}
        //public npcCfgDict: { [scene_idx: number]: NpcConfig[] };
        ////////////// 自增生成客户端 entity_id ///////////////
        private clientId: Long;
        private client_entity_num: number = 0;

        public genClientEntityId(): Long {
            if (!this.clientId) {
                this.clientId = Long.fromValue(1000000000)
            }
            this.client_entity_num++;
            if (this.client_entity_num > 90000) {
                this.client_entity_num = 0;
            }
            return this.clientId.add(this.client_entity_num);
        }
        ////////////// 自增生成客户端 entity_id ///////////////

        //////////////////////////////////////////////////////
        public curBossId: Long;/** 当前攻击BossId */
        public belong: teammate;//归属者
        public maxHurt: teammate;//最高伤害攻击者

        public endTime: number;//副本通用结束时间戳/

        public diedInfo: s2c_battle_role_die;
    }
}
