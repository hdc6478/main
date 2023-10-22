namespace game.scene {
    import DisplayObject = egret.DisplayObject;
    import Handler = base.Handler;
    import PoolObject = base.PoolObject;
    import Pool = base.Pool;
    import GDirUtil = game.utils.GDirUtil;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Tween = base.Tween;

    export class AvatarPart implements PoolObject {
        private readonly _bmp: BitmapBase;
        public loadPri: number;
        public srcUpdate: boolean;
        private _idx: number;
        private _id: string;
        private _data: MergedBmp;
        private _act: string;
        private _dir: number;
        private _src: string;
        private _resType: number;
        private _bmpScaleX: number;
        public scale: number;
        public offsetY: number;
        private scaleX: number;
        private scaleY: number;
        public y: number = 0;

        private _loadCb: Handler;
        private _cbCall: boolean;

        private _sp: DisplayObjectContainer;

        private static Tmp: any[] = [];

        //加载完成回调
        //private _loadedFuncs:{ [key: string]: Handler } = {};
        private _loadedFunc:Handler;
        //private preFrame:number;

        constructor() {
            this._bmp = Pool.alloc(BitmapBase);
            this._sp = new DisplayObjectContainer();
            this._sp.addChild(this._bmp);
        }

        public get display(): DisplayObject {
            return this._sp;
        }

        public get idx(): number {
            return this._idx;
        }

        public get dir():number{
            return this._dir;
        }

        public get data():MergedBmp{
            return this._data;
        }

        public init(idx: number, resType: number) {
            let self = this;
            self._resType = resType;
            self._idx = idx;
            self.scale = 1;
            self.y = 0;
        }

        public setLoadCb(cb: Handler) {
            this._loadCb = cb;
        }

        protected checkAct(act: string): string {
            let self = this;
            // if (self._idx == SurfaceType.Buff || self._resType == SurfaceType.SoulWare) {
            //     return ActionName.STAND;
            // }
            // if (self._idx == SurfaceType.Buff) {
            //     return ActionName.STAND;
            // }
            // if (self._idx == ConfigHead.Wing) {
            //     if (act.indexOf(ActionName.JUMP) > -1) {
            //         return ActionName.JUMP + 1;
            //     }
            // }
            if (self._idx == ConfigHead.Horse || self._idx == ConfigHead.Horse2) {
                if (act.indexOf(ActionName.STAND) == -1) {
                    //return self._idx == SurfaceType.Horse ? ActionName.STAND : ActionName.RUN + 2;
                    return self._idx == ConfigHead.Horse ? ActionName.STAND : ActionName.STAND + 2;
                }
            }
            // if (self._idx == SurfaceType.AdventGod) {
            //     if (act.indexOf(ActionName.ATTACK) > -1) {
            //         // if (act != ActionName.ATTACK + 1) {
            //         //     act = ActionName.ATTACK + 1;
            //         // }
            //         act = ActionName.ATTACK + 1;
            //     } else {
            //         return ActionName.STAND;
            //     }
            // }
            return act;
        }

        protected checkDir(dir: number): number {
            let self = this;
            // if (self._resType == SurfaceType.SoulWare) {
            //     return Direction.DOWN;
            // }
            // if (self._idx == SurfaceType.Gory || self._act == ActionName.ATTACK + 8) {
            //     return Direction.RIGHT;
            // }
            if (self._act == ActionName.ATTACK + 8) {
                return Direction.RIGHT;
            }
            return dir;
        }

        public setSrc(id: string, act: string, dir: number,func?:Handler) {
            let self = this;
            self._loadedFunc = func;
            self._id = id;
            self._act = self.checkAct(act);
            self._dir = self.checkDir(dir);
            self.loadCfg();
        }

        public getId(): string {
            return this._id;
        }

        public loadCfg() {
            let self = this;
            self.srcUpdate = false;
            let src = self.getSrc();

            if (src == null) {
                return;
            }
            if (self._src == src && self._data && self._data.isLoaded) {
                self._cbCall = false;
                self.onLoadComplete(self._data, src);
                return;
            }
            self.removeCurrent();
            LoadMgr.ins.addRef(src);
            self._src = src;
            let res: MergedBmp = LoadMgr.ins.getRes(src);
            if (res) {
                self._cbCall = false;
                self.onLoadComplete(res, src);
                return;
            }
            if (self._cbCall) {
                let durList = LoadMgr.ins.getAnimDur(src);
                if (durList) {
                    self.callCb(durList);
                }
            }
            LoadMgr.ins.loadMerge(src, Handler.alloc(self, self.onLoadComplete), self.loadPri);
        }

        private onLoadComplete(data: MergedBmp, url: string): void {
            let self = this;
            if (url != self._src) {
                return;
            }
            self._data = data;
            self._bmp.scaleX = data.scale * self._bmpScaleX;
            self._bmp.scaleY = data.scale;
            if (NoScaleSurface.indexOf(self._resType) == -1) {
                self._bmp.scaleX *= gso.avatarScale;
                self._bmp.scaleY *= gso.avatarScale;
            }
            self.scaleX = self._bmp.scaleX;
            self.scaleY = self._bmp.scaleY;
            if (self._loadCb && !self._cbCall) {
                let durList = [];
                for (let i: number = 0, n: number = data.numFrames; i < n; i++) {
                    durList.push(data.getVal(i, "dur"));
                }
                self.callCb(durList);
            }
            self.onFrame(0);

            if(self._loadedFunc){
                self._loadedFunc.exec(url);
                self._loadedFunc = null;
            }
        }

        private callCb(durList: number[]): void {
            this._cbCall = true;
            let tmp = AvatarPart.Tmp;
            tmp.length = 0;
            tmp[0] = durList;
            tmp[1] = this._src;
            this._loadCb.exec(tmp);
            tmp.length = 0;
        }

        public onFrame(frame: number): void {
            let self = this;
            if (!self._data || !self._data.isLoaded) {
                return;
            }
            // if (self._idx == SurfaceType.Gory) {
            //     if (gso["scale"]) self.scale = gso["scale"];
            //     self._bmp.scaleX = self.scaleX * self.scale;
            //     self._bmp.scaleY = self.scaleY * self.scale;
            // }


            //if(this.preFrame != frame){
            //     if (self._idx == SurfaceType.Body && this._src.indexOf("assets/anim/body/female_01/atk1") > -1){
            //
            //         console.log("_src = "+ this._src);
            //         console.log("frame = "+frame);
            //     }
                self._data.drawTo(self._bmp, frame, self._bmp.scaleX);
                //this.preFrame = frame;
           // }

            // if (self._idx == SurfaceType.Gory) {
            //     self.display.y = self.y;
            // }
        }

        private getSrc(): string {
            let self = this;
            if (!self._id || !self._act || !self._dir) {
                return null;
            }

            let dir = this.getFinalDir(self._dir);
            self._bmpScaleX = this.getBmpScaleX(self._dir);
            let type = self._resType != undefined ? self._resType : self._idx;
            // if (self._idx == SurfaceType.Buff) {
            //     type = self._idx;
            // }
            //死亡 羽翼没有动画  妖魔入侵水晶没有动画
            if (self._act == ActionName.DIE && type == ConfigHead.Wing) {// || type == SurfaceType.Weapon || type == SurfaceType.Blade
                return null;
            }
            //重剑攻击不显示轻剑
            if (type == ConfigHead.Weapon) {
                if (AtkNoWeapon.indexOf(self._act) != -1) {
                    if (this._bmp.parent) self._bmp.parent.removeChild(self._bmp);
                    return null;
                } else {
                    if (!this._bmp.parent) this._sp.addChild(this._bmp);
                }
            }
            // 御灵
            // if (type == SurfaceType.Gory) {
            //     if (self._act == ActionName.DIE) {
            //         return null;
            //     } else {
            //         self._act = ActionName.STAND;
            //     }
            // }
            return ResUtil.getModelUrlByModelName(type, self._id, dir, self._act);
        }

        /**删除当前*/
        private removeCurrent(): void {
            let self = this;
            LoadMgr.ins.decRef(self._src);
            self._data = undefined;
            self._src = undefined;
            self._bmp.texture = null;
            self._bmp.scaleX = self._bmp.scaleY = 1;
            self._cbCall = false;
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
            this._bmpScaleX = 1;
            this._sp.addChild(this._bmp);
        }

        public onRelease(): void {
            let self = this;
            Tween.remove(self);
            self._idx = undefined;
            self._id = undefined;
            self._act = undefined;
            self._dir = undefined;
            self._resType = undefined;
            self.scale = 1;
            self.y = 0;
            self.display.x = 0;
            self.display.y = 0;
            if (self.display && self.display.parent) {
                self.display.parent.removeChild(self.display);
            }
            self.removeCurrent();
            if (self._bmp && self._bmp.parent) {
                self._bmp.parent.removeChild(self._bmp);
            }
            Pool.release(self._loadCb);
            self._loadCb = undefined;
            //this.preFrame = -1;
        }

        private getFinalDir(dir: number): number {
            let alter_dir: number = dir;
            if (GDirUtil.Dir_Res_Num == 5) {
                return GDirUtil.getMir(dir);
            }
            if (GDirUtil.Dir_Res_Num == 2) {
                return GDirUtil.getMir2(dir);
            }
            if (GDirUtil.Dir_Res_Num == 3) {
                return GDirUtil.getMir3(dir);
            }
            return alter_dir;
        }

        private getBmpScaleX(dir: number): number {
            let scaleX: number = 1;
            if (GDirUtil.Dir_Res_Num == 5) {
                return GDirUtil.getMir(dir) != dir ? -1 : 1;
            }
            if (GDirUtil.Dir_Res_Num == 2) {
                return GDirUtil.getBmpScaleXFor2(dir);
            }
            if (GDirUtil.Dir_Res_Num == 3) {
                return GDirUtil.getBmpScaleXFor3(dir);
            }
            return scaleX;
        }
    }

}