namespace game.mod.scene {

    import Tween = base.Tween;
    import Handler = base.Handler;
    import Point = egret.Point;
    import BaseActor = game.scene.BaseActor;
    import Ride = game.scene.Ride;
    import GPlayer = game.scene.GPlayer;

    export class GhostShadow extends BaseActor {
        public idx: string;
        public realObj: Ride | GPlayer;

        onRelease() {
            Tween.remove(this);
            this.idx = null;
            this.realObj = null;
            super.onRelease();
        }

        protected initUpdateCb() {

        }

        protected onAdded() {
            super.onAdded();
            this.alpha = 1;
            this.dir = this.realObj.dir;
            this.act = this.realObj.act;
            this.realObj.setFixFrame(this.realObj.fixFrame);
            Tween.get(this).to({alpha: 0}, 300).exec(Handler.alloc(this, this.tweenFinish));
            if (this.headMgr) {
                this.headMgr.dispose();
            }
            this.actMgr.dispose();
        }

        private tweenFinish() {
            let scene: any = this.parent;
            if (scene) {
                scene.ctrl.removeGhost(this);
            }
        }

        public movePath(path: Point[], onMoveEnd?: Handler, moveType?: number,moveTime?:number): void {
            //残影不移动
        }

        onNameChanged() {
        }
    }
}