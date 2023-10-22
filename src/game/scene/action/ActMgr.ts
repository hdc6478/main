namespace game.scene {
    export class ActMgr extends BaseCont {
        public get isEmpty(): boolean {
            return !this.numChildren;
        }

        public get curAct(): BaseAct {
            if (this.numChildren == 0) {
                return null;
            }
            return <BaseAct><any>this.children[0];
        }

        public has(act: any): boolean {
            for (let i = 0, n = this.numChildren; i < n; i++) {
                let child = this.children[i];
                if (child instanceof act) {
                    return true;

                }
            }
            return false;
        }

        public add(child: BaseItem): void {
            let act: BaseAct = <BaseAct>child;
            if (act instanceof MoveAct) {
                this.onAddMove();
            }
            if(act instanceof JumpMoveAct){
                this.onAddJumpMove();
            }
            if (act instanceof DieAct) {
                this.removeAll();
            }
            if (act instanceof AttackAct) {
                this.onAddAtk();
            }
            let isEmpty = this.isEmpty;
            if (act instanceof HitAct) {
                act.isChangeAct = isEmpty;
            }
            super.add(child);
            if (isEmpty || act instanceof HitAct) {
                act.start();
            }
        }

        private onAddAtk() {
            let cur = this.curAct;
            let actor: BaseActor = <BaseActor>this.parent;
            if (cur instanceof MoveAct && (actor.vo.type == ObjectType.PLAYER || actor.vo.type == ObjectType.PET)) {
                cur.abort();
                this.remove(cur);
                return;
            }
            this.removeAllActByCls(HitAct);
        }

        private onAddJumpMove():void{
            let cur = this.curAct;
            let actor: BaseActor = <BaseActor>this.parent;
            if (actor.vo.type == ObjectType.PLAYER || actor.vo.type == ObjectType.PET) {
                if (cur instanceof AttackAct) {
                    cur.abort();
                    this.remove(cur);
                    return;
                } else if (cur instanceof MoveAct) {
                    cur.abort(true);
                }
            }
            this.removeAllActByCls(JumpMoveAct);
        }

        private onAddMove() {
            let cur = this.curAct;
            let actor: BaseActor = <BaseActor>this.parent;
            if (actor.vo.type == ObjectType.PLAYER || actor.vo.type == ObjectType.PET) {
                if (cur instanceof AttackAct) {
                    cur.abort();
                    this.remove(cur);
                    return;
                } else if (cur instanceof MoveAct) {
                    cur.abort(true);
                }
            }
            this.removeAllActByCls(MoveAct);
        }

        public removeAllActByCls(cls: new () => BaseAct): void {
            for (let i = 0; i < this.children.length; i++) {
                let act = this.children[i];
                if (act instanceof cls) {
                    this.remove(act);
                    i--;
                }
            }
        }

        public advanceTime(elapseTime: number): void {
            let cur = this.curAct;
            if (cur != null && (cur.isDone || cur.isAbort)) {
                this.remove(cur);
                this.doNext();
            }
            super.advanceTime(elapseTime);
        }

        public doNext() {
            if (0 == this.numChildren) {
                return;
            }
            this.curAct.start();
        }
    }
}
