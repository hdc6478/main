namespace game.mod {
    import TimeMgr = base.TimeMgr;
    import Time = base.Time;
    import EventDispatcher = egret.EventDispatcher;
    import UpdateItem = base.UpdateItem;

    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Group = eui.Group;
    import DisplayObject = egret.DisplayObject;

    export class SceneInUI extends Group implements UpdateItem {

        private _dispatcher: EventDispatcher;

        private _layerDown: DisplayObjectContainer;
        private _layerAvatar: DisplayObjectContainer;
        private _layerEffect: DisplayObjectContainer;

        private _ctrl: SceneInUICtrl;

        constructor() {
            super();
            this.init();
        }

        public get dispatcher(): EventDispatcher {
            return this._dispatcher;
        }

        protected init(): void {
            this._dispatcher = new EventDispatcher();
            this.initDsp();
        }

        protected initDsp(): void {
            let self = this;
            self.touchEnabled = true;

            self._layerDown = self.addLayer(DisplayObjectContainer, "_layerDown");

            self._layerAvatar = self.addLayer(DisplayObjectContainer, "_layerAvatar");

            self._layerEffect = self.addLayer(DisplayObjectContainer, "_layerEffect");

            if(!self._ctrl){
                let ctrl = new SceneInUICtrl();
                this.initScene(ctrl);
            }
        }

        private addLayer<T extends DisplayObjectContainer>(cls: new() => T, name: string): T {
            let s: T = new cls();
            s.name = name;
            s.touchEnabled = s.touchChildren = false;
            this.addChild(s);
            return s;
        }

        private initScene(ctrl: SceneInUICtrl): void {
            let self = this;

            self._ctrl = ctrl;
            self._ctrl.init(self);

            self._layerAvatar.touchChildren = true;

            TimeMgr.addUpdateItem(self);
            self.onStageResize();
        }

        public clean(): void {
            TimeMgr.removeUpdateItem(this);
            this._ctrl.clean();
            this._ctrl = null;
        }

        public onStageResize(): void {
            //this._camera.onResize(gso.gameStage.stageWidth, gso.gameStage.stageHeight);
        }

        public addAvatar(obj: game.scene.BaseActor): void {
            this._layerAvatar.addChild(obj.dsp);
        }

        public removeAvatar(obj: game.scene.BaseActor): void {
            if (obj && obj.dsp && obj.dsp.parent) {
                this._layerAvatar.removeChild(obj.dsp);
            }
        }

        public sortAvatar(): void {
            this._layerAvatar.$children.sort((a, b) => {
                return a.y - b.y;
            });
        }

        public addBottomChild(obj: DisplayObject): void {
            this._layerDown.addChild(obj);
        }

        public removeBottomChild(obj: DisplayObject): void {
            if (obj && obj.parent) {
                this._layerDown.removeChild(obj);
            }
        }

        public addEftChild(obj: DisplayObject): void {
            this._layerEffect.addChild(obj);
        }

        public removeEftChild(obj: DisplayObject): void {
            if (obj && obj.parent) {
                this._layerEffect.removeChild(obj);
            }
        }

        public update(time: Time): void {
            if (this._ctrl) {
                this._ctrl.update(time);
            }
        }

        public get layerDown(): DisplayObjectContainer {
            return this._layerDown;
        }

        public get layerEffect(): DisplayObjectContainer {
            return this._layerEffect;
        }
    }

}
