namespace game {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import PoolObject = base.PoolObject;
    import UpdateItem = base.UpdateItem;
    import Time = base.Time;
    import TimeMgr = base.TimeMgr;
    import Pool = base.Pool;
    import Handler = base.Handler;
    import Tween = base.Tween;
    import Sprite = egret.Sprite;

    export class UIAvatar extends DisplayObjectContainer implements PoolObject, UpdateItem {
        private _ctrl: AnimCtrl;

        private _bodySource: string;
        private _body: BitmapBase;
        private _bodyData: MergedBmp;

        private _weaponSource: string;
        private _weapon: BitmapBase;
        private _weaponData: MergedBmp;

        private _wingSrc: string;
        private _wing: BitmapBase;
        private _wingData: MergedBmp;

        private _animate: UIAnimate;
        private _animateTwFrame: number = 0;
        private _animateCurTime: number = 0;

        private readonly CROWN_DURATION_TIME: number = 8000;
        private _nextSwitchTime: number = 2000;
        private _showTime: number = 0;
        private _isShowCrown: boolean = false;
        public sex: number;
        public is_ui: boolean;

        private _isLoop: boolean = true;

        constructor() {
            super();
            this.touchEnabled = this.touchChildren = false;
            this.init();
        }

        private init(): void {
            let self = this;
            self._wing = <BitmapBase>self.addChild(Pool.alloc(BitmapBase));
            self._body = <BitmapBase>self.addChild(Pool.alloc(BitmapBase));
            self._weapon = <BitmapBase>self.addChild(Pool.alloc(BitmapBase));
        }

        //设置回调函数
        public setCtrlCompHandler(handler: Handler): void {
            if (this._ctrl) {
                this._ctrl.compHandler = handler;
            }
        }

        //设置是否循环播放
        public setCtrlLoop(isLoop: boolean) {
            if (this._ctrl) {
                this._isLoop = isLoop;
                this._ctrl.loop = isLoop;
            }
        }

        public sortPart(dir: number) {
            let self = this;
            let order: number[] = getSortOrder(dir);
            for (let i: number = 0, len: number = order.length; i < len; i++) {
                switch (order[i]) {
                    case ConfigHead.Body:
                        self.addChild(self._body);
                        break;
                    case ConfigHead.Weapon:
                        self.addChild(self._weapon);
                        break;
                    case ConfigHead.Wing:
                        self.addChild(self._wing);
                        if (self._animate) {
                            self.addChild(self._animate);
                        }
                        break;
                }
            }
        }

        public setBody(src: string): void {
            let self = this;
            if (self._bodySource == src) {
                return;
            }
            self.removeBody();
            self._bodySource = src;
            if (!src) {
                return;
            }
            LoadMgr.ins.addRef(src);
            LoadMgr.ins.loadMerge(src, Handler.alloc(self, self.onLoaded), LoadPri.UI);
        }

        private removeBody(): void {
            let self = this;
            self._body.texture = null;
            self._body.scaleX = self._body.scaleY = 1;
            self._bodyData = undefined;
            LoadMgr.ins.decRef(self._bodySource);
            self._bodySource = undefined;
            if (self._ctrl) {
                self._ctrl.stop();
            }
            TimeMgr.removeUpdateItem(self);
        }

        public setWeapon(src: string): void {
            let self = this;
            if (self._weaponSource == src) {
                return;
            }
            self.removeWeapon();
            self._weaponSource = src;
            if (!src) {
                return;
            }
            LoadMgr.ins.addRef(src);
            LoadMgr.ins.loadMerge(src, Handler.alloc(self, self.onLoaded), LoadPri.UI);
        }

        public isHaveWeapon() {
            return this._weaponSource != null;
        }

        private removeWeapon(): void {
            let self = this;
            self._weapon.texture = null;
            self._weapon.scaleX = self._weapon.scaleY = 1;
            self._weaponData = undefined;
            LoadMgr.ins.decRef(self._weaponSource);
            self._weaponSource = undefined;
        }

        public setWing(src: string): void {
            let self = this;
            if (self._wingSrc == src) {
                return;
            }
            self.removeWing();
            self._wingSrc = src;
            LoadMgr.ins.addRef(src);
            LoadMgr.ins.loadMerge(src, Handler.alloc(self, self.onLoaded), LoadPri.UI);
        }

        private removeWing(): void {
            let self = this;
            self._wing.texture = null;
            self._wing.scaleX = self._wing.scaleY = 1;
            self._wingData = undefined;
            LoadMgr.ins.decRef(self._wingSrc);
            self._wingSrc = undefined;
        }

        public setAnimate(src: string, x: number = 0, y: number = 0, times = 0, speed: number = 1, scale: number = 1): void {
            if (!src) {
                this.removeAnimate();
                return;
            }
            let self = this;
            let source: string = ResUtil.getEffectUI(src);
            let idx = self.getChildIndex(self._wing);
            self._wing.y -= 220;
            if (!self._animate) {
                self._animate = <UIAnimate>self.addChildAt(Pool.alloc(UIAnimate), idx + 1);
            }
            let animate = self._animate;
            animate.x = x;
            animate.y = y;
            animate.times = times;
            animate.speed = speed;
            animate.scaleX = animate.scaleY = scale;
            animate.load(source);
        }

        private removeAnimate(): void {
            let self = this;
            if (self._animate && self._animate.parent) {
                self._animate.parent.removeChild(self._animate);
            }
            Pool.release(self._animate);
            self._animate = null;
            self._animateTwFrame = 0;
            self._animateCurTime = 0;
        }

        private onLoaded(data: MergedBmp, url: string): void {
            let self = this;
            switch (url) {
                case self._bodySource:
                    self._body.scaleX = self._body.scaleY = data.scale;
                    self._bodyData = data;
                    let durList = [];
                    for (let i: number = 0, n: number = data.numFrames; i < n; i++) {
                        durList.push(data.getVal(i, "dur"));
                    }
                    self._ctrl.init(durList, url, 1, this._isLoop);
                    self._ctrl.play();
                    TimeMgr.addUpdateItem(self);
                    self.onFrameChange(0);
                    break;

                case self._weaponSource:
                    self._weapon.scaleX = self._weapon.scaleY = data.scale;
                    self._weaponData = data;
                    break;
                case self._wingSrc:
                    self._wingData = data;
                    self._wing.scaleX = self._wing.scaleY = data.scale * 1.25;
                    break;
            }
        }

        private onFrameChange(frame: number): void {
            let self = this;
            self._bodyData.drawTo(self._body, frame);
            if (self._weaponData) {
                self._weaponData.drawTo(self._weapon, frame);
                if (self.is_ui && self.sex == Sex.Male) {
                    self._weapon.x -= 10;
                    self._weapon.y += 15;
                }
            }
            if (self._wingData) {
                self._wingData.drawTo(self._wing, frame);
            }
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
            let self = this;
            self._ctrl = Pool.alloc(AnimCtrl);
            self._ctrl.changeHandler = Handler.alloc(self, self.onFrameChange);
        }

        public onRelease(): void {
            let self = this;
            self.removeAnimate();
            self.removeBody();
            self.removeWeapon();
            self.removeWing();
            if (self.parent) {
                self.parent.removeChild(self);
            }
            self._nextSwitchTime = 2000;
            self._showTime = 0;
            self._isShowCrown = false;
            Tween.remove(self._wing);
            self._wing.alpha = 1;
            if (self._animate) {
                self._animate.visible = true;
            }
            self.x = self.y = 0;
            Pool.release(self._ctrl);
            self._ctrl = undefined;
            self.is_ui = null;
            self.sex = null;
        }

        public update(time: Time): void {
            let self = this;
            let elapseTime = TimeMgr.getElapseTime(self);
            self._ctrl.advanceTime(elapseTime);
        }
    }
}
