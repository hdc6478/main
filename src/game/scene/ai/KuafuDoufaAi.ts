namespace game.scene {
    import ObjectType = game.scene.ObjectType;
    import SceneTools = game.scene.SceneTools;
    import ActorVo = game.scene.ActorVo;
    import ICompeteProxy = game.mod.ICompeteProxy;
    import facade = base.facade;

    /** 跨服斗法Ai */
    export class KuafuDoufaAi extends CommonAi {
        /** 寻找目标 */
        protected commonFindTarget(): ActorVo {
            if(this._proxy.foeTargetId){
                //优先攻击目标
                let vo = this._proxy.getVoById(this._proxy.foeTargetId) as ActorVo;
                if(vo && vo.percent > 0){
                    return vo;
                }
            }
            let competeProxy: ICompeteProxy = facade.retMod(ModName.Compete).retProxy(ProxyType.Compete);
            if(competeProxy.attackStatus == KuafuDoufaAttackStatus.Attack){

                //获取敌方玩家
                let min;
                let retVo;
                let players:ActorVo[] = this._proxy.getEnemyVos(ObjectType.PLAYER);
                if(players.length > 0){
                    for(let i = 0; i < players.length;i++){
                        let vo = players[i];
                        let curDis = PointUtil.distance(this.player.vo.x, this.player.vo.y, vo.x, vo.y);
                        if(!min){
                            min = curDis;
                            retVo = vo;
                        }else if(curDis > min){
                            min = curDis;
                            retVo = vo;
                        }
                    }
                }

                //
                if(retVo && retVo.percent > 0){
                    //最近的地方玩家
                    return retVo;
                }

                //攻击状态，则打boss
                let enemies: ActorVo[] =  this._proxy.getEnemyVos(ObjectType.MONSTER);//获取怪物，区分ObjectType，敌人攻击走上面
                if (!enemies || 0 == enemies.length) {
                    return null;
                }
                let myCamp = this.player.vo.camp;//自己的阵营
                let monsterCamp = myCamp == CampType.RED ? CampType.BLUE : CampType.RED;//怪物的阵营
                let curIndex = competeProxy.findCurMonsterIndex(monsterCamp);//当前可攻击的怪物
                for (let i = 0, l = enemies.length; i < l; ++i) {
                    let vo = enemies[i] as MonsterVo;
                    if (!SceneTools.isTargetReady(vo)) {
                        continue;
                    }
                    if(vo.index == curIndex){
                        this._proxy.foeTargetId = vo.entity_id;//直接设置BOSS为攻击目标
                        return vo;
                    }
                }
                return null;
            }
            //驻守状态，则攻击敌方玩家
            return this.findMinDisTarget(ObjectType.PLAYER);
        }
    }
}