namespace game.scene {

    import SceneConfig = game.config.SceneConfig;
    import Point = egret.Point;
    import Pool = base.Pool;
    import facade = base.facade;
    import ISceneProxy = game.mod.ISceneProxy;

    export class SceneTools {
        static get mainPlayerVo(): game.scene.MainGPlayerVo {
            let scene: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            return scene.mainPlayerVo;
        }

        public static isSelfReady(playerVo: GPlayerVo): boolean {
            return playerVo && playerVo.percent > 0 && !playerVo.isDizzy;
        }

        public static isTargetReady(target: ActorVo): boolean {
            if (!target) {
                return false;
            }

            // if (target instanceof MonsterVo && target.monsterType == MonsterType.Common) {
            //     return !target.isDead && target.hp.gt(0) && target.isReady;
            // }

            if (target.percent <= 0) {
                return false;
            }

            // if (this.mainPlayerVo && !isNaN(this.mainPlayerVo.team_id)) {
            //     let tflag:boolean = this.mainPlayerVo.team_id != target.team_id;
            //     if(!tflag){
            //         console.info(".......未找到目标...222222222222");
            //     }
            //     return tflag;
            // }

            /**归属抢夺不需要从场景实体来获取信息，伤害排行榜有归属者信息*/
            // let scProxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            // let ownId: Long = scProxy.getOwner() ? scProxy.getOwner().entity_id : null;
            // let robberList: Long[] = scProxy.getRobberList();
            // let _len: number = robberList ? robberList.length : 0;
            // if (ownId) {
            //     if (target.entity_id && target.entity_id.eq(ownId)) {
            //         for (let i = 0; i < _len; i++) {
            //             if (this.mainPlayerVo.entity_id.eq(robberList[i])) {
            //                 return true;
            //             }
            //         }
            //     } else if (this.mainPlayerVo.entity_id.eq(ownId)) {
            //         for (let i = 0; i < _len; i++) {
            //             if (target.entity_id && target.entity_id.eq(robberList[i])) {
            //                 return true;
            //             }
            //         }
            //     }
            // }
            // let flag:boolean = this.mainPlayerVo && this.mainPlayerVo.camp != target.camp;
            // if(!flag){
            //     console.log(".......未找到目标...111111111111");
            // }
            return true;
        }

        public static isEnemy(target: ActorVo): boolean {
            if (target.type == ObjectType.TEAM_PLAYER) {
                return false;
            }
            let _mainPlayer: MainGPlayerVo = this.mainPlayerVo;
            return !(_mainPlayer && _mainPlayer.camp == target.camp);
        }

        public static getNameColor(target: ActorVo) {
            //if (target.type == ObjectType.TEAM_PLAYER) {
            //    return UIColor.WHITE;
            //} else
            if (target.type == ObjectType.MONSTER) {
                return UIColor.RED;
            } else if (target.type == ObjectType.NPC) {
                return UIColor.ORANGE;
            } else if (target.type == ObjectType.COLLECT) {
                return UIColor.ORANGE;
            }
            let _mainPlayer: MainGPlayerVo = this.mainPlayerVo;
            return !(_mainPlayer && _mainPlayer.camp == target.camp) ? UIColor.RED : UIColor.WHITE;
        }

        public static getMapIdByScene(index: number): number {
            let cfg: SceneConfig = getConfigByNameId(ConfigName.Scene, index);
            if (!cfg) {
                return 0;
            }
            return cfg.map_id;
        }

        public static isMainPlayer(targetId: Long): boolean {
            if (!targetId) {
                return false;
            }
            return this.mainPlayerVo && this.mainPlayerVo.entity_id.eq(targetId);
        }

        public static getRandomNum(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        private static tmpRandom: number[] = [-1, 1];

        public static getRandomPt(focusX: number, focusY: number, min: number, max: number, pt?: Point): Point {
            pt = pt || Pool.alloc(Point);
            let rx0 = SceneTools.getRandomNum(min, max);
            let ry0 = SceneTools.getRandomNum(min, max);
            let rx = SceneTools.tmpRandom[Math.floor(Math.random() * 2)] * rx0;
            let ry = SceneTools.tmpRandom[Math.floor(Math.random() * 2)] * ry0;
            let cnt: number = 0;
            while (!MapData.ins.isPointLegal(focusX + rx, focusY + ry)) {
                rx0 = SceneTools.getRandomNum(min, max);
                ry0 = SceneTools.getRandomNum(min, max);
                rx = SceneTools.tmpRandom[Math.floor(Math.random() * 2)] * rx0;
                ry = SceneTools.tmpRandom[Math.floor(Math.random() * 2)] * ry0;
                cnt++;
                if (cnt >= 50) {
                    return pt.setTo(focusX, focusY);
                }
            }
            pt.setTo(focusX + rx, focusY + ry);
            return pt;
        }

        public static getRandomTeamPt(focusX: number, focusY: number, idx: number, pt?: Point): Point {
            let min = (idx - 1) * 2 + 2;
            let max = (idx - 1) * 2 + 5;
            return this.getRandomPt(focusX, focusY, min, max, pt);
        }

        private static focusEntityId: Long;

        /** 镜头跟随id */
        public static setFocusEntityId(focus_id: Long): void {
            this.focusEntityId = focus_id;
        }

        /** 是否为主视角*/
        public static isFocusEntity(tarId: Long): boolean {
            if (!this.focusEntityId) return false;
            return this.focusEntityId.equals(tarId);
        }

        /**
         * 是否震屏
         * @param sceneType
         */
        public static isOptimizeScene(sceneType: number): boolean {
            return true;
        }

        public static isShieldingSkillEft(target: BaseActor): boolean {
            if (!target) {
                return true;
            }
            if (this.isMainPlayer(target.vo.entity_id)) {
                return false;
            }
            if (!(target instanceof GPlayer)) {
                return false;
            }
            // let scene = target.parent as Scene;
            // let sceneType = scene && scene.sceneType;
            // if (!this.isOptimizeScene(sceneType)) {
            //     return false;
            // }
            return gso.jzsj_channel == CHANNEL_NAME.JZXY_SHOUQ
                || gso.jzsj_channel == CHANNEL_NAME.WANJIAN_SHOUQ
                || gso.jzsj_channel == CHANNEL_NAME.YUEWANIOS
                || gso.jzsj_channel == CHANNEL_NAME.YOUXIIOS
                || gso.maskSkillEft;
        }

        /**
         * 是否显示特效
         * @param {boolean} _isSelf
         * @returns {boolean}
         */
        public static isShowEft(_isSelf: boolean): boolean {
            return _isSelf ? !gso.isHideSeflEft : (!gso.isHideOtherPlayerEft && !gso.isHideOtherPlayer);
        }
    }
}
