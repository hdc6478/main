namespace game {
    import Event = egret.Event;
    import Handler = base.Handler;
    import Pool = base.Pool;
    import UpdateItem = base.UpdateItem;
    import Time = base.Time;
    import TimeMgr = base.TimeMgr;

    const enum FadedType {
        In = 1,
        Out = 2,
    }

    export class SoundMgr implements UpdateItem {
        /** @internal */ private static _ins: SoundMgr;

        public static get ins(): SoundMgr {
            let ins = this._ins;
            if (!ins) {
                ins = this._ins = new SoundMgr();
            }
            return ins;
        }

        /** @internal */ private _entryMap: { [url: string]: SoundEntry } = Object.create(null);
        /** @internal */ private _init: boolean = false;
        /** @internal */ private _soundEnabled: boolean = true; //用于背景音乐控制吧
        /** @internal */ private _ext: string = ".mp3";

        /** @internal */ private _bgEntry: SoundEntry;
        /** @internal */ private _bgStop: boolean = false;

        /** @internal */ private fadedTotalTime: number = 1500;
        /** @internal */ private _startFadedTime: number = 0;
        /** @internal */ private _fadedType: number = 0;

        /** @internal */ private _curUrl: string;
        /** @internal */ private _isActive: boolean = true;

        /** @internal */ private _isMute: boolean = false;

        public soundEftEnabled: boolean = true; //用于游戏音效控制

        public get isMute(): boolean {
            return this._isMute;
        }

        public set isMute(value: boolean) {
            let self = this;
            if (self._isMute === value) {
                return;
            }
            self._isMute = value;
            if (!value) {
                if (!self._bgStop) {
                    self.playBg();
                }
                return;
            }
            let entry: SoundEntry;
            for (let url in self._entryMap) {
                entry = self._entryMap[url];
                if (entry) {
                    entry.stop();
                }
            }
            if (self._bgEntry) {
                self._bgEntry.stop();
            }
        }

        /** @internal */ public init(): void {
            let self = this;
            if (typeof webAudio !== "undefined") {
                webAudio.initAudio(Handler.alloc(self, self.onInit, null, true));
            } else {
                this.onInit(".mp3");
            }
        }

        /** @internal */ private onInit(type: string): void {
            if (type) {
                this._ext = type;
            }
            this._init = true;
            if (!this._bgStop) {
                this.playBg();
            }
        }

        public enableSound(value: boolean): void {
            this._soundEnabled = value;
        }

        /** @internal */ public recoverWebAudio(cb: Handler): void {
            if (typeof webAudio !== "undefined") {
                webAudio.resumeAudio(cb);
            } else {
                cb.exec();
            }
        }

        /** @internal */ public onActivate(): void {
            this._isActive = true;
            this.recoverWebAudio(Handler.alloc(this, this.playBg, null, true));
        }

        /** @internal */ public onDeActivate(): void {
            this._isActive = false;
            this.stopBg();
        }

        public setBg(url: string): void {
            let self = this;
            let entry: SoundEntry = self._bgEntry;
            if (!url) {
                if (entry) {
                    self.faded(FadedType.Out);
                }
                return;
            }
            this._curUrl = url;
            if (!self._isActive || !self._soundEnabled) {
                return;
            }
            if (!entry) {
                self._bgEntry = entry = new SoundEntry();
            }
            if (entry.url === url) {
                if (!self._bgStop && entry.loaded) {
                    this.faded(FadedType.In);
                }
                return;
            }
            entry.clear();
            entry.url = url;
            entry.isStop = self._bgStop;
            LoadMgr.ins.load(url + self._ext, Handler.alloc(self, self.onLoaded, [entry]), LoadPri.Scene,
                Handler.alloc(self, self.onLoadFail, [entry]));
        }

        /** @internal */ private faded(type: FadedType) {
            let self = this;
            self._startFadedTime = TimeMgr.time.time;
            self._fadedType = type;
            if (type === FadedType.In) {
                self._bgEntry.volume = 0;
                //self._curUrl = null;
                self.playBg();
            }
            TimeMgr.addUpdateItem(this);
        }

        public update(time: Time): void {
            let self = this;
            if (!self._fadedType) {
                return;
            }
            let curTime = time.time - self._startFadedTime;
            let p = Math.floor(10 * curTime / self.fadedTotalTime) / 10;
            if (p >= 1) {
                p = 1;
            }
            self._bgEntry.volume = self._fadedType == FadedType.Out ? 1 - p : p;
            if (1 == p) {
                if (self._fadedType == FadedType.Out) {
                    self._bgEntry.clear();
                }
                TimeMgr.removeUpdateItem(this);
                self._fadedType = undefined;
            }
        }

        public playBg(): void {
            let self = this;
            self._bgStop = false;
            let entry = self._bgEntry;
            if (!self._init || !entry || !entry.loaded || !self._soundEnabled) {
                if (self._curUrl) {
                    self.setBg(self._curUrl);
                }
                return;
            }
            entry.isStop = false;
            entry.play(true);
        }

        public stopBg(): void {
            this._bgStop = true;
            let entry = this._bgEntry;
            if (!entry) {
                return;
            }
            entry.stop();
        }

        public playEffect(url: string, onComplete?: Handler, isUI?: boolean): void {
            let self = this;
            if (gso.isGameMusic) {
                return;
            }

            if (!self._isActive || !self.soundEftEnabled || self._isMute) { //!self._soundEnabled 只对背景音效控制
                if (onComplete) {
                    onComplete.exec();
                    Pool.release(onComplete);
                }
                return;
            }
            let entry: SoundEntry = self._entryMap[url];
            if (!entry) {
                self._entryMap[url] = entry = new SoundEntry();
                entry.url = url;
            }
            Pool.release(entry.onComplete);
            entry.onComplete = onComplete;
            entry.isStop = false;
            if (entry.loaded) {
                entry.play(false);
            } else {
                LoadMgr.ins.load(url + self._ext, Handler.alloc(self, self.onLoaded, [entry]), isUI ? LoadPri.UI : LoadPri.Scene,
                    Handler.alloc(self, self.onLoadFail, [entry]));
            }
        }

        public stopEffect(url: string): void {
            let entry: SoundEntry = this._entryMap[url];
            if (entry) {
                entry.stop();
            }
        }

        /** @internal */ private onLoaded(entry: SoundEntry, sound: egret.Sound, url: string): void {
            entry.sound = sound;
            entry.loaded = true;
            if (!this._isActive) {
                return;
            }
            if (this._isMute) {
                entry.isStop = true;
                return;
            }
            if (entry === this._bgEntry) {
                this.faded(FadedType.In);
            } else {
                entry.play(false);
            }
        }

        /** @internal */ private onLoadFail(entry: SoundEntry, url: string): void {
            let h: Handler = entry.onComplete;
            entry.onComplete = null;
            if (h) {
                h.exec();
                Pool.release(h);
            }
        }

    }

    class SoundEntry {
        public url: string;
        public loaded: boolean;
        public isStop: boolean = true;
        public sound: egret.Sound;
        public channel: egret.SoundChannel;
        public onComplete: Handler;
        private _volume: number = 1;
        private _loop: boolean;

        public set volume(value: number) {
            let self = this;
            if (self.isStop) {
                return;
            }
            self._volume = value;
            if (self.channel) {
                self.channel.volume = value;
            }
        }

        public get volume(): number {
            return this._volume;
        }

        public play(loop: boolean): void {
            let mgr = SoundMgr.ins;
            if (mgr.isMute) {
                return;
            }
            let self: SoundEntry = this;
            if (!self.sound) {
                return;
            }
            self._loop = loop;
            mgr.recoverWebAudio(Handler.alloc(self, self.startPlay, null, true));
        }

        public stop(): void {
            let self = this;
            if (self.channel) {
                self.channel.stop();
                self.channel.removeEventListener(Event.SOUND_COMPLETE, self.onPlayComplete, self);
                self.channel = null;
            }
            Pool.release(self.onComplete);
            self.onComplete = null;
            self.isStop = true;
        }

        private startPlay(): void {
            let self = this;
            if (self.isStop || self.channel) {
                return;
            }
            self.channel = self.sound.play(0, 1);
            self.channel.addEventListener(Event.SOUND_COMPLETE, self.onPlayComplete, self);
            self.channel.volume = self._volume;
        }

        private onPlayComplete(e: Event): void {
            let self = this;
            self.isStop = !self._loop;
            self.channel.removeEventListener(Event.SOUND_COMPLETE, self.onPlayComplete, self);
            self.channel = null;
            let h = self.onComplete;
            self.onComplete = null;
            if (h) {
                h.exec();
                Pool.release(h);
            }
            if (self._loop) {
                this.startPlay();
            }
        }

        public clear(): void {
            let self = this;
            self.stop();
            self.url = null;
            self.loaded = false;
            self.sound = null;
            self._volume = 1;
        }
    }

}
