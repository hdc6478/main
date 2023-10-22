namespace game.mod {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Texture = egret.Texture;
    import Bitmap = egret.Bitmap;
    import PoolObject = base.PoolObject;
    import Pool = base.Pool;
    import Handler = base.Handler;

    const BlurRatio: number = 20;

    export class SceneInUIMap extends DisplayObjectContainer {
        private _blur: Texture;

        private _mapId: number = 0;
        private _sliceW: number = 0;
        private _sliceH: number = 0;

        // mapdata 属性迁移到内部来
        private _mapWidth: number;
        private _mapHeight: number;
        private _sliceCol: number;
        private _sliceRow: number;

        private _curSC: number;
        private _curSR: number;
        private _curEC: number;
        private _curER: number;

        private readonly _bmpMap: { [key: number]: MapBmp };
        private _curShow: number[];

        constructor() {
            super();
            this._bmpMap = {};
            this._curShow = [];
        }

        public init(mapId: number, map_params:number[]): void {
            this._mapId = mapId;
            this._mapWidth = map_params[0];
            this._mapHeight = map_params[1];
            this._sliceW = map_params[2];
            this._sliceH = map_params[3];

            this._sliceCol = this._mapWidth / this._sliceW;
            this._sliceRow = this._mapHeight / this._sliceH;
        }

        public setBlur(texture: Texture): void {
            texture.disposeBitmapData = false;
            let blur = Pool.alloc(Texture);
            blur.bitmapData = texture.bitmapData;
            this._blur = blur;
            for (let id of this._curShow) {
                this.updateBlur(id);
            }
        }

        public updateTiles(sc: number, sr: number, ec: number, er: number): void {
            if (this._mapId == 0) {
                return;
            }
            if (sc < 0) {
                sc = 0;
            }
            if (sr < 0) {
                sr = 0;
            }
            if (ec > this._sliceCol) {
                ec = this._sliceCol;
            }
            if (er > this._sliceRow) {
                er = this._sliceRow;
            }
            if (this._curSC == sc && this._curSR == sr && this._curEC == ec && this._curER == er) {
                return;
            }
            this._curSC = sc;
            this._curSR = sr;
            this._curEC = ec;
            this._curER = er;
            this._curShow.length = 0;
            for (let c = sc; c < ec; c++) {
                for (let r = sr; r < er; r++) {
                    this._curShow.push(SceneInUIMap.getSliceId(c, r));
                }
            }
            SceneInUIMap.centerCol = sc - (ec - sc) / 2 - 1;
            SceneInUIMap.centerRow = sr - (er - sr) / 2 - 1;
            this._curShow = this._curShow.sort(SceneInUIMap.sortId).reverse();

            for (let key in this._bmpMap) {
                if (this._curShow.indexOf(parseInt(key)) == -1) {
                    Pool.release(this._bmpMap[key]);
                    this._bmpMap[key] = null;
                }
            }
            for (let i = 0, n = this._curShow.length; i < n; i++) {
                this.loadOne(this._curShow[i]);
            }
        }

        private loadOne(id: number): void {
            let bmp: MapBmp = this._bmpMap[id];
            if (!bmp) {
                bmp = Pool.alloc(MapBmp);
                let col: number = SceneInUIMap.getCol(id);
                let row: number = SceneInUIMap.getRow(id);
                bmp.x = col * this._sliceW;
                bmp.y = row * this._sliceH;
                bmp.setIdx(col, row, this._mapId);
                this._bmpMap[id] = bmp;
                this.addChild(bmp);
                this.updateBlur(id);
            }
        }

        private updateBlur(id: number): void {
            if (!this._blur) {
                return;
            }
            let bmp: MapBmp = this._bmpMap[id];
            if (!bmp) {
                return;
            }
            let col: number = SceneInUIMap.getCol(id);
            let row: number = SceneInUIMap.getRow(id);
            let blur: Texture = Pool.alloc(Texture);
            blur.disposeBitmapData = false;
            if (this._blur && this._blur.bitmapData) {
                blur._setBitmapData(this._blur.bitmapData);
            }
            let ratio = BlurRatio;
            let tx: number = col * this._sliceW / ratio;
            let ty: number = row * this._sliceH / ratio;
            let tw: number = this._sliceW / ratio;
            let th: number = this._sliceH / ratio;
            blur.$initData(this._blur.$bitmapX + tx, this._blur.$bitmapY + ty, tw, th,
                0, 0, tw, th, this._blur.$sourceWidth, this._blur.$sourceHeight);
            bmp.setBlur(blur);
        }

        public clean(): void {
            let self = this;
            self._mapId = self._sliceW = self._sliceH = 0;
            Pool.release(self._blur);
            self._blur = null;
            self._curSC = self._curSR = self._curEC = self._curER = 0;
            for (let key in self._bmpMap) {
                Pool.release(self._bmpMap[key]);
                self._bmpMap[key] = null;
            }
            self._curShow.length = 0;
        }

        private static ROW_SHIFT: number = 16;
        private static LOW_WORD: number = 0xFFFF;
        private static NRM: number = 1; // 0移位后还是0所以加1

        private static getSliceId(col: number, row: number): number {
            return ((row + this.NRM) << this.ROW_SHIFT) + (col + this.NRM);
        }

        private static getCol(sliceId: number): number {
            return (sliceId & this.LOW_WORD) - this.NRM;
        }

        private static getRow(sliceId: number): number {
            return (sliceId >> this.ROW_SHIFT) - this.NRM;
        }

        private static centerCol: number;
        private static centerRow: number;

        public static sortId(id1: number, id2: number): number {
            let self = SceneInUIMap;
            let ca: number = self.getCol(id1) - self.centerCol;
            let ra: number = self.getRow(id1) - self.centerRow;
            let cb: number = self.getCol(id2) - self.centerCol;
            let rb: number = self.getRow(id2) - self.centerRow;
            let distA: number = ca * ca + ra * ra;
            let distB: number = cb * cb + rb * rb;
            if (distA < distB) {
                return 1;
            } else if (distA > distB) {
                return -1;
            }
            return 0;
        }

    }

    class MapBmp extends Bitmap implements PoolObject {
        private _url: string;
        private _blur: Texture;

        public setIdx(c: number, r: number, mapId: number): void {
            let url: string = ResUtil.getMapBmpUrl(mapId, c, r);
            if (this._url == url) {
                return;
            }
            this.removeCur();
            this._url = url;
            LoadMgr.ins.addRef(url);
            LoadMgr.ins.load(this._url, Handler.alloc(this, this.onLoaded), LoadPri.Init);
        }

        public setBlur(blur: Texture): void {
            if (this.texture) {
                return;
            }
            this._blur = blur;
            this.texture = blur;
            this.scaleX = this.scaleY = BlurRatio;
        }

        private onLoaded(data: Texture, url: string) {
            if (this._url != url) {
                return;
            }
            this.removeBlur();
            this.texture = data;
        }

        private removeBlur(): void {
            this.scaleX = this.scaleY = 1;
            this.texture = null;
            Pool.release(this._blur);
            this._blur = null;
        }

        private removeCur(): void {
            this.removeBlur();
            if (this._url) {
                LoadMgr.ins.decRef(this._url);
            }
            this._url = undefined;
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
        }

        public onRelease(): void {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.removeCur();
        }

    }

}
