namespace game.scene {

    export class BaseAct extends BaseItem {
        protected _actor: BaseActor;
        protected _isDone: boolean;
        protected _isAbort: boolean;

        public get isAbort(): boolean {
            return this._isAbort;
        }

        public get isDone(): boolean {
            return this._isDone;
        }

        public start(): void {
            this._isDone = false;
            this._isAbort = false;
            this.onStart();
        }

        public done(): void {
            this._isDone = true;
            this.onDone();
        }

        public abort(): void {
            this._isAbort = true;
            this.onAbort();
        }

        protected onStart(): void {
            this.updateEnabled = true;
        }

        protected onDone(): void {
        }

        protected onAbort(): void {
        }


        protected onAdded(): void {
            super.onAdded();
            this._actor = <BaseActor>this.parent.parent;
        }

        public onRelease(): void {
            this._actor = null;
            super.onRelease();
        }
    }
}
