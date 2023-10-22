namespace game.scene {

    import Pool = base.Pool;
    import Handler = base.Handler;
    import SkillShowConfig = game.config.SkillShowConfig;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;

    export class SkillEftMgr implements UpdateItem {
        private static _ins: SkillEftMgr;

        private _eftGroup:EftUIGroup = null;
        private _skillEffects:SkillEffect[] = [];

        public static get ins(): SkillEftMgr {
            if (!this._ins) {
                this._ins = new SkillEftMgr();
            }
            return this._ins;
        }

        private _scene: Scene;

        public init(scene: Scene): void {
            this._scene = scene;
        }

        public showAtkEft(eftId: string, x: number, y: number, dir: number, cb?: Handler, scale?: number, times: number = 1,layer?:number) {
            let eft: SkillEffect = Pool.alloc(SkillEffect);
            eft.x = x;
            eft.y = y;
            eft.scale = scale || 1;
            eft.times = times;
            //eft.layer = eftId.indexOf(PreDownLayerEft) > -1 ? SceneLayerType.Down : SceneLayerType.Effect;
            eft.layer = layer || SceneLayerType.Effect;
            let source = ResUtil.getSkillEftUrl(eftId);
            this._scene.add(eft);
            eft.playEft(eftId, source, dir, cb);
        }

        public showSkillEft(eftId: string, x: number, y: number, rotation: number, eftCfg: EftGroupChildCfg,
                            groupR?: number, scaleX?: number, scale?: number,layer?:number) {
            let eft: SkillEffect = Pool.alloc(SkillEffect);
            eft.x = x;
            eft.y = y;
            eft.scale = scale || 1;
            scaleX = scaleX || 1;
            eft.groupR = groupR;
            //eft.layer = eftId.indexOf(PreDownLayerEft) > -1 ? SceneLayerType.Down : SceneLayerType.Effect;
            eft.layer = layer || SceneLayerType.Effect;

            let source = ResUtil.getSkillEftUrl(eftId);
            this._scene.add(eft);
            eft.playSkillEft(eftId,source, rotation, eftCfg, scaleX);
        }

        public showSkillEftUI(eftId: string, x: number, y: number, rotation: number, eftCfg: EftGroupChildCfg,
                            groupR?: number, scaleX?: number, scale?: number,layer?:number,container?:egret.DisplayObjectContainer,cb?: Handler):SkillEffect {
            let eft: SkillEffect = Pool.alloc(SkillEffect);
            eft.x = x;
            eft.y = y;
            eft.scale = scale || 1;
            scaleX = scaleX || 1;
            eft.groupR = groupR;
            eft.layer = layer || SceneLayerType.Effect;

            let source = ResUtil.getSkillEftUrl(eftId);
            container && container.addChild(eft.dsp);
            eft.playSkillEft(eftId,source, rotation, eftCfg, scaleX,cb);
            return  eft;
        }


        //private time = 0;

        public showGroupEft(eftId: string, x: number, y: number, dir: number, atkCfg?: SkillShowConfig, actor?: BaseActor, cb?: Handler, scale?: number) {
            //eftId = "cs_2";
           // console.log("eftId = "+eftId);
            // if(Date.now()-this.time < 3000){
            //     return ;
            // }
            // this.time = Date.now();
            // eftId = "skill_hyzd";
            // x = MainGPlayer.ins.x;
            // y = MainGPlayer.ins.y;

            let isRotate = false;
            let shakeCfg = null;
            let layer = SceneLayerType.Effect;
            if(atkCfg){
                isRotate = atkCfg.isrotate == 2
                shakeCfg =  atkCfg.shake;
                layer = atkCfg.layer;
            }

            let eft: EftGroup = Pool.alloc(EftGroup);
            eft.x = x;
            eft.y = y;
            eft.scale = scale || 1;
            eft.scaleX *= MirDir[dir] ? -1 : 1;
            let d = MirDir[dir] ? MirDir[dir] : dir;

            eft.dsp.rotation = !!isRotate ? (d - Direction.RIGHT) * 45 : 0;
            let src = ResUtil.getGroupEftUrl(eftId);
            eft.setData(eftId, src, actor, cb);
            eft.layer = layer;
            this._scene.add(eft);

            if (shakeCfg && shakeCfg.length > 1 && shakeCfg[0] >= 1) {
                let isMain = actor && actor instanceof GPlayer && actor.vo.role_id && actor.vo.role_id.eq(RoleVo.ins.role_id);
                if (isMain && SceneTools.isOptimizeScene(this._scene.sceneType)) {   //只有主角释放技能才震屏
                    this._scene.shake(shakeCfg);
                }
            }
        }

        public showGroupUIEft(eftId: string, x: number, y: number, dir: number, atkCfg?: SkillShowConfig,
                                  actor?: BaseActor, scale?: number,
                                  container?:egret.DisplayObjectContainer):EftUIGroup {

            // if(this._skillEffects.length > 0 || this._eftGroup){
            //     return null;
            // }

            container && container.removeChildren();
            let self = this;
            let isRotate = false;
            let layer = SceneLayerType.Effect;
            let eft: EftUIGroup = Pool.alloc(EftUIGroup);
            eft.x = x;
            eft.y = y;
            eft.scale = scale || 1;
            eft.scaleX *= MirDir[dir] ? -1 : 1;
            let d = MirDir[dir] ? MirDir[dir] : dir;

            eft.dsp.rotation = !!isRotate ? (d - Direction.RIGHT) * 45 : 0;
            let src = ResUtil.getGroupEftUrl(eftId);
            eft.setData(eftId, src, actor, Handler.alloc(this,function (data:SkillEffect[]){
                self._eftGroup = null;
            }),container,Handler.alloc(this,function (data:SkillEffect) {
                let index = self._skillEffects.indexOf(data);
                if(index > -1){
                    self._skillEffects.splice(index,1);
                    if(data.dsp.parent){
                        data.dsp.parent.removeChild(data.dsp);
                    }
                }
            }),Handler.alloc(this,function (eft:SkillEffect) {
                if(self._skillEffects.indexOf(eft) < 0){
                    self._skillEffects.push(eft);
                }
            }));
            eft.layer = layer;
            container && container.addChild(eft.dsp);
            this._eftGroup = eft;
            TimeMgr.addUpdateItem(this);
            return eft;
        }

        update(time: base.Time) {
            let elapseTime = TimeMgr.getElapseTime(this);
            if(this._eftGroup){
                this._eftGroup.advanceTime(elapseTime);
            }

            if(this._skillEffects.length > 0){
                for(let i = 0;i < this._skillEffects.length;i++){
                    let d = this._skillEffects[i];
                    d.advanceTime(elapseTime);
                }
            }

            if(!this._eftGroup && this._skillEffects.length <= 0){
                this.resetUIEf();
            }

        }

        //重置一下
        resetUIEf():void{
            this._eftGroup = null;
            this._skillEffects = [];
            TimeMgr.removeUpdateItem(this);
        }
    }
}
