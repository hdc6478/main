namespace game.scene {
    import TextField = egret.TextField;
    import Point = egret.Point;
    import Pool = base.Pool;
    import Event = egret.Event;
    import Handler = base.Handler;
    import Sprite = egret.Sprite;
    import facade = base.facade;
    import Image = eui.Image;
    import Rectangle = egret.Rectangle;
    import ISceneProxy = game.mod.ISceneProxy;
    import ViewMgr = game.mod.ViewMgr;

    //掉落
    export class DropItem extends BaseSceneObj {

        private _eftBmp: BitmapBase;
        private _ctrl: AnimCtrl;
        private _data: MergedBmp;
        private _src: string;

        private iconBmp: BitmapBase;
        private iconBmpBg: Image;
        private nameTf: TextField;

        private _yIdx: number;
        private _curTime: number;
        private _totalTime: number;
        private _waitTime: number;

        private _startPt: Point;
        private _endPt: Point;
        private _tmpTile: Point;

        private _isDrawing: boolean;

        public get vo(): DropItemVo {
            return <DropItemVo>this._vo;
        }

        public set vo(v: DropItemVo) {
            this._vo = v;
        }

        protected initDsp(): void {
            super.initDsp();
            let self = this;
            self.nameTf = new TextField();
            self.nameTf.size = 20;
            self.nameTf.textColor = 0x00ff00;
            self.nameTf.stroke = 1;
            self.iconBmp = Pool.alloc(BitmapBase);
            self.iconBmp.scaleX = self.iconBmp.scaleY = 0.8;
            // self.iconBmp.addEventListener(Event.COMPLETE, self.onIconLoaded, self);
            self.dsp.addChild(self.iconBmp);
            self.iconBmpBg = Pool.alloc(Image);
            self._eftBmp = Pool.alloc(BitmapBase);
            let sp = new Sprite();
            sp.addChild(self._eftBmp);
            sp.y = -90;
            sp.x = 0;
            self.dsp.addChild(sp);
            self.dsp.addChild(self.iconBmpBg);
            self.dsp.addChild(self.nameTf);
        }

        protected onAdded(): void {
            let self = this;
            this.updateIndex();
            self._curTime = 0;
            self._waitTime = 0;
            self._yIdx = 0;
            self._isDrawing = false;
            if (!self.vo.src_coord) {
                console.error("添加掉落物坐标错误!", self.vo.entity_id.toString());
                return;
            }
            if (!self.vo.dest_coord) {
                self.vo.dest_coord = Pool.alloc(Point);
                self.vo.dest_coord.x = self.vo.src_coord.x + (Math.floor(Math.random() * 5 * (Math.random() > 0.5 ? -1 : 1)));
                self.vo.dest_coord.y = self.vo.src_coord.y + (Math.floor(Math.random() * 5 * (Math.random() > 0.5 ? -1 : 1)));
            }
            self.vo.x = self.vo.src_coord.x;
            self.vo.y = self.vo.src_coord.y;
            let pt = MapData.ins.getWorldPt(self.vo.x, self.vo.y);
            self.x = pt.x;
            self.y = pt.y;
            self._startPt = Pool.alloc(Point).setTo(self.x, self.y);
            self._endPt = MapData.ins.getWorldPt(self.vo.dest_coord.x, self.vo.dest_coord.y, self._endPt);
            Pool.release(pt);

            let dis = PointUtil.distancePt(self._startPt, self._endPt);
            self._totalTime = (dis / self.getShowSpeed()) * 3;
        }

        public advanceTime(elapseTime: number): void {
            super.advanceTime(elapseTime);
            this._ctrl.advanceTime(elapseTime);
            let self = this;
            if (!self._startPt) {
                return;
            }
            if (!self.vo.readyDraw) {
                self.playDrop(elapseTime);
                return;
            }
            if (self._isDrawing) {
                this.playDraw(elapseTime);
            }
        }

        public drawTo(x: number, y: number): void {
            let self = this;
            self._curTime = 0;
            self.x = self._endPt.x;
            self.y = self._endPt.y;
            self._startPt.setTo(self.x, self.y);
            self._endPt.setTo(x, y);
            let dis = PointUtil.distancePt(self._startPt, self._endPt);
            self._totalTime = dis / self.getShowSpeed();
            self._isDrawing = true;
        }

        private playDraw(elapseTime: number) {
            let self = this;
            self._curTime += elapseTime;
            let p = self._totalTime == 0 ? 1 : self._curTime / self._totalTime;
            if (p >= 1) {
                this._isDrawing = false;
                this.checkDel();
                return;
            }
            self.x = self._startPt.x + (self._endPt.x - self._startPt.x) * p;
            self.y = self._startPt.y + (self._endPt.y - self._startPt.y) * p;
        }

        private playDrop(elapseTime: number) {
            let self = this;
            self._curTime += elapseTime;
            let p = self._totalTime == 0 ? 1 : self._curTime / self._totalTime;
            if (p >= 1) {
                self._tmpTile = MapData.ins.getCellPt(self._endPt.x, self._endPt.y, self._tmpTile);
                self.setTilePos(self._tmpTile.x, self._tmpTile.y, false);
                self._waitTime += elapseTime;
                if (self._waitTime >= 1800) {

                    // 挂机场景
                    let s_proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
                    // if (s_proxy.curSceneType == SceneType.HangUp && ViewMgr.getIns().isMain()) {
                    //     self.showMonsterSoul();
                    //     facade.sendNt(MainEvent.UPDATE_MAIN_LAYER);
                    //     return;
                    // }
                    self.vo.readyDraw = true;
                    let main: GPlayer = (<Scene>self.parent).ctrl.getObj(self.vo.owner_entity_id) as GPlayer;
                    if (main) self.drawTo(main.x, main.y - 50);
                }
                // self.iconBmp.rotation = 0;
            } else {
                self.x = self._startPt.x + (self._endPt.x - self._startPt.x) * p;
                let value = -1000 * p * (1 - p);//最高是0.25
                self.y = self._startPt.y + (self._endPt.y - self._startPt.y) * p + value;
                // self.iconBmp.rotation = 360 * p;
            }
        }

        private checkDel(): void {
            if (!this._isDrawing && this.parent) {
                let s_proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
                s_proxy.delVo(this.vo.entity_id);
                this.dispose();
            }
        }

        protected updateIndex(): void {
            let vo = this.vo;
            if (vo.cfg) {
                let propData = PropData.create(vo.index);
                let name: string = propData.cfg.name;
                this.nameTf.text = name;
                let quality = propData.quality;
                this.nameTf.textColor = ColorUtil.getColorByQuality2(quality);
                this.nameTf.x = -this.nameTf.textWidth / 2;
                this.iconBmp.addEventListener(Event.COMPLETE, this.onIconLoaded, this);
                this.iconBmpBg.addEventListener(Event.COMPLETE, this.onIconLoaded, this);
                this.iconBmp.source = ResUtil.getUiProp(vo.cfg);
                this.iconBmpBg.source = "drop_di" + quality;
                this.iconBmpBg.scale9Grid = new Rectangle(28, 12, 27, 1);
                this.iconBmpBg.width = this.nameTf.textWidth + 20;
                this.iconBmpBg.height = 30;
                //掉落物特效
                // if (vo.cfg.quality >= QualityType.ORANGE) {
                //     let q = Math.min(quality, QualityType.RED);
                //     let src = ResUtil.getEffectUI("drop_" + q);
                //     this.setEft(src);
                // }
            }
        }

        private getShowSpeed(): number {
            return MapData.ins.cellWidth / 30;
        }

        private onIconLoaded(e: Event): void {
            let self = this;
            if (e.currentTarget == self.iconBmpBg) {
                self.iconBmpBg.removeEventListener(Event.COMPLETE, self.onIconLoaded, self);
            } else {
                self.iconBmp.removeEventListener(Event.COMPLETE, self.onIconLoaded, self);
            }
            self.iconBmp.anchorOffsetX = self.iconBmp.width / 2;
            self.iconBmp.anchorOffsetY = self.iconBmp.height / 2;
            // self.iconBmp.rotation = 0;
            // self.iconBmp.x = -(self.iconBmp.width * self.iconBmp.scaleX) / 2;
            // self.iconBmp.y = -(self.iconBmp.height * self.iconBmp.scaleY) / 2;
            self.nameTf.y = -(self.iconBmp.height * self.iconBmp.scaleY / 2 + self.nameTf.height);
            self.iconBmpBg.x = -self.iconBmpBg.width / 2;
            self.iconBmpBg.y = self.nameTf.y - (self.iconBmpBg.height - self.nameTf.height) / 2;
        }


        // public setEft(src: string): void {
        //     let self = this;
        //     if (self._src == src) {
        //         return;
        //     }
        //     self.removeCurrent();
        //     self._src = src;
        //     LoadMgr.ins.addRef(src);
        //     LoadMgr.ins.loadMerge(src, Handler.alloc(self, self.onEftLoaded), LoadPri.Scene, 6);
        // }

        private onEftLoaded(data: MergedBmp, url: string): void {
            if (this._src != url) {
                return;
            }
            let self = this;
            self._data = data;
            let durList = [];
            for (let i: number = 0, n: number = data.numFrames; i < n; i++) {
                durList.push(data.getVal(i, "dur"));
            }
            self._ctrl.init(durList, url);
            self._ctrl.loop = true;
            this._ctrl.play();
            this._eftBmp.y = -168;
            self.onFrameChange(0);
        }

        private removeCurrent(): void {
            let self = this;
            self._data = undefined;
            LoadMgr.ins.decRef(self._src);
            self._src = undefined;
            if (self._ctrl) {
                self._ctrl.stop();
            }
            self._eftBmp.texture = null;
        }

        private onFrameChange(frame: number) {
            this._data.drawTo(this._eftBmp, frame);
        }

        public onAlloc(): void {
            super.onAlloc();
            let self = this;
            self._ctrl = Pool.alloc(AnimCtrl);
            self._ctrl.changeHandler = Handler.alloc(self, self.onFrameChange);
        }

        public onRelease(): void {
            let self = this;
            self.removeCurrent();
            Pool.release(self._ctrl);
            self._ctrl = undefined;

            self.iconBmp.source = null;
            Pool.release(self._startPt);
            self.nameTf.text = null;
            self._startPt = null;
            Pool.release(self._endPt);
            self._endPt = null;
            Pool.release(self._tmpTile);
            self._tmpTile = null;
            self._isDrawing = false;
            if (self.vo) {
                facade.sendNt(SceneEvent.ON_OBJ_DEL, self.vo);
            }
            super.onRelease();
        }

        /** 经验飘往经验池 */
        private showMonsterSoul() {
            let self = this;
            self._isDrawing = false;
            self.checkDel();
        }

    }
}
