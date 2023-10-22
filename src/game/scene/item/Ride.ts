namespace game.scene {


    import GDirUtil = game.utils.GDirUtil;
    import Point = egret.Point;
    import Pool = base.Pool;
    import SceneUtil = game.mod.SceneUtil;
    import Handler = base.Handler;
    import HorseConfig = game.config.HorseConfig;

    //����,������������
    export class Ride extends Partner {

        public isPlayGhost: boolean;

        constructor() {
            super();
            this._enType = ObjectType.PET;
        }

        public get vo(): PetVo {
            return <PetVo>this._vo;
        }

        public set vo(value: PetVo) {
            this._vo = value;
        }

        public onAlloc(): void {
            super.onAlloc();
            this.avatar.resType = ConfigHead.Horse;
            this.isPlayGhost = false;
        }

        public onDie(): void {
            super.onDie();
        }

        protected updateIndex(): void {
            let isHorse2: boolean = false;
            let rideSrc: string;
            if (this.vo.index) {
                let config: HorseConfig = getConfigById(this.vo.index);
                isHorse2 = config.is_double == 1;
                rideSrc = ResUtil.getModelName(this.vo.index);
            }
            this.avatar.setPart(ConfigHead.Horse, rideSrc);
            if (isHorse2) {
                this.avatar.setPart(ConfigHead.Horse2, rideSrc);
            } else {
                this.avatar.setPart(ConfigHead.Horse2, null);
            }
        }

        public isShowAvatar(show: boolean) {
            let self = this;
            if (!self.avatar) return;
            if (self.avatar.dsp.parent && !show) {
                self.dsp.removeChild(self.avatar.dsp);
                self.headMgr.dsp.visible = false;
            } else if (self.avatar.dsp.parent == null && show) {
                let idx = self.dsp.getChildIndex(self.headMgr.dsp);
                self.dsp.addChildAt(self.avatar.dsp, idx - 1);
                self.headMgr.dsp.visible = true;
            }
        }

        public get act(): string {
            return this._act;
        }

        public set act(value: string) {
            if (!value) {
                return;
            }
            this._act = value;
            this.avatar.setAct(value);
        }

        public onStar(id: Long, handler: Handler, _scene: Scene) {
            let self = this;
            let gPlayer: GPlayer = SceneUtil.getSceneObjById(id) as GPlayer;
            let playerVo: GPlayerVo = gPlayer.vo;
            if (!playerVo) return;
            let _dir = GDirUtil.reversalDir(gPlayer.dir);
            let endPoint: Point = Pool.alloc(Point).setTo(playerVo.x, playerVo.y);
            let starPoint: Point = GDirUtil.getDirPoint(playerVo.x, playerVo.y, _dir, 10);
            if (!self.vo) {
                self.vo = new PetVo(ObjectType.PET);
                self.vo.index = playerVo.ride;
                self.vo.master_id = playerVo.entity_id;
                self.vo.speed = playerVo.speed / 4;
                _scene.ctrl.addRide(self);
                self.setTilePos(starPoint.x, starPoint.y, true);
            }
            let move = Pool.alloc(MoveAct);
            let path: Point[] = [starPoint, endPoint];
            if (!path) return;
            this.isPlayGhost = true;
            let had: Handler = Handler.alloc(handler.context, handler.method, [self, true]);
            move.setPath(path, had);
            Pool.release(handler);
            self.actMgr.add(move);
            // Tween.get(this.dsp).to({alpha: 1}, 1000)
        }

        public onOff(id: Long, handler: Handler, _scene: Scene) {
            let self = this;
            let gPlayer: GPlayer = SceneUtil.getSceneObjById(id) as GPlayer;
            let playerVo: GPlayerVo = gPlayer.vo;
            if (!playerVo) return;
            let _starPoint: Point = Pool.alloc(Point).setTo(playerVo.x, playerVo.y);
            let _endPoint: Point = GDirUtil.getDirPoint(playerVo.x, playerVo.y, gPlayer.dir, 10);
            if (!self.vo) {
                self.vo = new PetVo(ObjectType.PET);
                self.vo.index = playerVo.ride;
                self.vo.master_id = playerVo.entity_id;
                _scene.ctrl.addRide(self);
                self.vo.speed = playerVo.speed / 4;
                self.setTilePos(_starPoint.x, _starPoint.y, true);
            }
            let move = Pool.alloc(MoveAct);
            let path: Point[] = [_starPoint, _endPoint];
            if (!path) return;
            this.isPlayGhost = true;
            let had: Handler = Handler.alloc(handler.context, handler.method, [self, false]);
            move.setPath(path, had);
            self.actMgr.add(move);
            Pool.release(handler);
            // Tween.get(this.dsp).to({alpha: 0}, 500)
        }

        public advanceTime(elapseTime: number): void {
            super.advanceTime(elapseTime);
            this.alpha = this.isPlayGhost ? 0.6 : 1;
        }


        public onRelease(): void {
            super.onRelease();
            this.isPlayGhost = undefined;
        }

    }
}