namespace game.scene {
    import Pool = base.Pool;
    import TimeMgr = base.TimeMgr;
    import Tween = base.Tween;
    import Handler = base.Handler;
    import Point = egret.Point;

    //怪物
    export class Monster extends BaseActor {

        constructor() {
            super();
            this._enType = ObjectType.MONSTER;
        }

        public get vo(): MonsterVo {
            return <MonsterVo>this._vo;
        }

        public set vo(value: MonsterVo) {
            this._vo = value;
        }

        public updateVo(): void {
            super.updateVo();
            let self = this;
            self.showModel();
            if (self.vo && self.vo.monsterType == MonsterType.Boss) {
                self.changeHpShow();
                self.setBossLz();
            }
            self.dsp.alpha = 0;
            this.vo.isReady = true;
            Tween.get(self).to({alpha: 1}, 300);
        }

        private showModel() {
            let vo: MonsterVo = <MonsterVo>this.vo;
            let self = this;
            if (!vo.cfg) return;
            if (vo.cfg.res_id) {
                self.avatar.resType = ConfigHead.Creature;
                self.setBody(vo.cfg.res_id);
            }
        }

        public onNameChanged(): void {
            //Monster需要打了才显示名字
            let scene = this.parent as Scene;
            if (this.vo.monsterType == MonsterType.Boss) return;
        }

        public isBoss():boolean{
            return this.vo.monsterType == MonsterType.Boss;
        }

        public setBossLz() {

        }

        public onBackStart(): void {
            super.onBackStart();
            //怪物没有受击动作
        }


        protected onBuffsUpdate(): void {
            // super.onBuffsUpdate();
        }

        attack(idx: number, actIdx: number[] = [1], dir: number, list: game.scene.SkillEffectVo[], focusPt?: egret.Point): void {
            super.attack(idx, actIdx, dir, list, focusPt);
        }

        public onAlloc(): void {
            super.onAlloc();
            this.avatar.resType = ConfigHead.Creature;
        }

        public onHitStart(): void {
            if (this.vo.monsterType == MonsterType.Boss) {
                return;
            }
            super.onHitStart(false);//怪物暂时没有受击动作 todo
        }

        public hit(dir: number): void {
            super.hit(dir);
        }

        public onMoveStart(): void {
            this.act = ActionName.RUN;
        }

        protected updateIndex(): void {
            let vo: MonsterVo = <MonsterVo>this.vo;
            if (vo.cfg && vo.cfg.res_id) {
                this.setBody(vo.cfg.res_id);
            }
        }

        protected getBodyHeight(): number {
            return this.vo && this.vo.monsterType == MonsterType.Boss ? 270 : super.getBodyHeight();
        }

        public onDie(): void {
            let self = this;
            self._headMgr.removeHp();
            if (self._shadow) {
                Pool.release(self._shadow);
                self._shadow = undefined;
            }
            super.onDie();
        }

        public decreaseHp(v: Long) {
            if (this.vo.hp == undefined || this.vo.max_hp == undefined) {
                return;
            }
            if (this.vo.hp.lte(v)) {
                this.vo.isDead = true;
                this.vo.hp.high = 0;
                this.vo.hp.low = 0;
                this._headMgr.removeHp();
            } else {
                this.vo.hp = this.vo.hp.sub(v);
                this.vo.isDead = false;
                let p = this.vo.hp.mul(10000).div(this.vo.max_hp).toNumber();
                this._headMgr.setHp(Math.max(p, 0));
            }
        }

        protected changeHpShow(): void {
            let self = this;
            if (!self.parent) {
                return;
            }
            let vo = self.vo;
            if (!vo.isTarget) {
                return;
            }
            if (vo.monsterType == MonsterType.Boss) {
                let t: BossHpData = {
                    entity_id: vo.entity_id,
                    cfg: vo.cfg,
                    max_hp: vo.max_hp,
                    percent: vo.percent
                };
                (<Scene>self.parent).dispatcher.dispatchEventWith(SceneEvent.ON_BOSS_HP, false, t);
            } else {
                self._headMgr.setHp(vo.percent);
                super.onNameChanged();
                if (vo.percent <= 0) {
                    self._headMgr.removeHp();
                }
            }
        }


        private _dyingTime: number = 0;

        public onFatalAtk(): void {
            if (this.isDead) {
                return;
            }
            if (!this.vo) {
                return;
            }
            this._dying = true;
            this.vo.isDead = true;
            this._dyingTime = TimeMgr.time.serverTime;
        }

        public advanceTime(elapseTime: number): void {
            super.advanceTime(elapseTime);
            if (this.dieDel && this._dyingTime && TimeMgr.time.serverTime - this._dyingTime >= 3000) {
                this.onDieEnd();
            }
        }

        public killBy(attacker: BaseActor): void {
            if (!this.isDead) {
                let die = Pool.alloc(DieAct);
                die.attacker = attacker;
                this._actMgr.add(die);
            }
        }

        public set act(value: string) {
            if (!value) {
                return;
            }
            this._act = value;
            this.avatar.setAct(value);
        }

        public get act(): string {
            return this._act;
        }

        public get dir(): number {
            return this._dir;
        }

        public set dir(value: number) {
            if (!value) {
                return;
            }
            this._dir = value;
            this.avatar.setDir(value);
        }

        //击退
         public pushBack(dst:Point,time:number):void{
             if(dst && time){
                 let target = this.dsp;
                 let x = dst.x * MapData.ins.cellWidth;
                 let y = dst.y * MapData.ins.cellHeight;
                 this.vo.x = dst.x;
                 this.vo.y = dst.y;
                 Tween.get(target).to({x:x,y:y},time).exec(Handler.alloc(this,function () {
                     Tween.remove(target);
                 }));
             }
             else{
                 console.error("dst = "+dst+","+"this._moveTime = "+time);
             }
        }

    }
}
