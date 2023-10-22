namespace game.mod {

    import facade = base.facade;
    import SceneObjVo = game.scene.SceneObjVo;
    import MainGPlayerVo = game.scene.MainGPlayerVo;
    import MainGPlayer = game.scene.MainGPlayer;
    import Scene = game.scene.Scene;
    import BaseSceneObj = game.scene.BaseSceneObj;
    import SceneConfig = game.config.SceneConfig;
    import ActorVo = game.scene.ActorVo;
    import LanDef = game.localization.LanDef;
    import GPlayerVo = game.scene.GPlayerVo;

    export class SceneUtil {
        private static _rewardInfo: number[];//场景类型，场景奖励预览index

        /** 获取当前场景类型*/
        public static getCurSceneType(): number {
            let s_proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            return s_proxy.curSceneType;
        }

        /** 获取当前场景idx*/
        public static getCurSceneIdx(): number {
            let s_proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            return s_proxy.curSceneIdx;
        }

        /**
         * 根据id获取实体vo
         * @param id
         */
        public static getVoByIdx(id: Long): SceneObjVo {
            let s_proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            return s_proxy.getVoById(id);
        }

        public static getVoByRoleId(roleId: Long, camp?: number): GPlayerVo {
            let s_proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            return s_proxy.getVoByRoleId(roleId, camp);
        }

        /** 主角Vo*/
        public static getMainPlayerVo(): MainGPlayerVo {
            let s_proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            return s_proxy.mainPlayerVo;
        }

        /** 主角Obj*/
        public static getMainPlayerObj(): MainGPlayer {
            let s_proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            return s_proxy.mainPlayerObj;
        }

        /** 场景Obj*/
        public static getSceneObj(): Scene {
            let s_proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            return s_proxy.scene;
        }

        public static getSceneObjById(id: Long): BaseSceneObj {
            let scene: Scene = this.getSceneObj();
            return scene.ctrl && scene.ctrl.getObj(id);
        }

        /** 场景Obj*/
        public static getCurSceneCfg(): SceneConfig {
            let cfg: SceneConfig = getConfigByNameId(ConfigName.Scene, this.getCurSceneIdx());
            return cfg;
        }

        /** 点击退出场景，实际上不退出场景，而是提前结算奖励*/
        public static clickExit(): void {
            let s_proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            let type = s_proxy.curSceneType;
            switch (type) {
                case SceneType.Yuanling:
                    // 元灵试炼副本，组队退出不需要结算界面，个人挑战大于一层则需要
                    let proxy: IYuanLingProxy = getProxy(ModName.Shilian, ProxyType.YuanlingFuben);
                    if (proxy.onTeam() || proxy.curLayer() == 1) {
                        s_proxy.exitScene();
                        return;
                    }
                    break;
                case SceneType.ManyBoss:
                case SceneType.CrossBoss:
                case SceneType.Forbidden:
                case SceneType.Yijie:
                case SceneType.YonghengYijie:
                case SceneType.Friend:
                case SceneType.Yjjs:
                case SceneType.Xianta:
                case SceneType.Abyss:
                case SceneType.Sea:
                case SceneType.KuafuDoufa:
                case SceneType.XianjieLuandou:
                    s_proxy.exitScene();//特殊场景，直接退出场景
                    facade.sendNt(RoleEvent.ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT, true);
                    return;
            }
            s_proxy.clickExit();//弹结算界面
            facade.sendNt(RoleEvent.ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT, true);//修仙女仆的自动挑战，手动退出，重新计算30秒
        }

        /** 退出场景*/
        public static exitScene(): void {
            let s_proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            s_proxy.exitScene();
        }

        /** 显示主界面 UI */
        public static isShowMain(): boolean {
            let type = this.getCurSceneType();
            let isShow = false;
            if (type == SceneType.HangUp2) {
                //挂机场景，且不在挑战boss
                let _passProxy: IPassProxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
                isShow = !_passProxy.challengeBoss;
            }
            return isShow;
        }

        /** 清除奖励预览id */
        public static resetReward(): void {
            this._rewardInfo = null;
        }
        public static getReward(): number[] {
            return this._rewardInfo;
        }

        /** 设置奖励预览id
         * @param sceneType，场景类型
         * @param rewardId，奖励预览id
         * */
        public static setReward(sceneType: number, rewardId: number): void {
            this._rewardInfo = [sceneType, rewardId];
        }

        /** 归属者 */
        public static getBelong(): msg.teammate {
            let s_proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            return s_proxy.belong;
        }

        /** 最高伤害攻击者 */
        public static getMaxHurt(): msg.teammate {
            let s_proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            return s_proxy.maxHurt;
        }

        /** 副本通用结束时间戳 */
        public static getEndTime(): number {
            let s_proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            return s_proxy.endTime;
        }

        public static requestControlAI(ret: ControlAIType): void {
            let s_proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            s_proxy.requestControlAI(ret);
        }

        /** 是否是Pvp场景 */
        public static isPvpScene(): boolean {
            let cfg = this.getCurSceneCfg();
            return cfg && cfg.fight_type == FightType.PVP
        }

        /** 是否是对应场景 */
        public static isSceneType(sceneType: number): boolean {
            let type = this.getCurSceneType();
            return type == sceneType;
        }

        /**
         * 场景震屏
         * @param times 震屏次数
         * @param times 震屏的时间
         */
        public static shake(times: number = 3, time: number = 300): void {
            facade.sendNt(SceneEvent.ON_SCENE_SHAKE, [times, time]);//震屏
        }

        /**
         * 场景表中 atk_delay
         * @param sceneId 场景id
         */
        public static atkDelay(): number {
            let sceneId = this.getCurSceneIdx();
            let cfg: SceneConfig = getConfigByNameId(ConfigName.Scene, sceneId);
            return (cfg.atk_delay || 0);
        }

        /**
         * 获取可攻击目标ID
         */
        public static getAttackTargetId(showTips?: boolean): Long {
            let targetId: Long;
            let proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            if (this.isPvpScene()) {
                targetId = proxy.foeTargetId;//PVP场景时候返回攻击目标
            }
            else {
                let target = proxy.mainAi && proxy.mainAi.getAttackTarget();
                targetId = target && target.entity_id;//寻怪
            }
            if (!targetId && showTips) {
                PromptBox.getIns().show(getLanById(LanDef.not_target_atk));
            }
            return targetId;
        }

        /**
         * 使用技能
         */
        public static useSkill(skillIdx: number, focus: Long, type?: number[], x?: number, y?: number, tx?: number, ty?: number): void {
            let proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            proxy.useSkill(skillIdx, focus, type, x, y, tx, ty);
        }

    }

}