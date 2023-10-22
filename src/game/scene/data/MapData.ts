namespace game.scene {
    import Point = egret.Point;
    import Pool = base.Pool;
    import Handler = base.Handler;

    export class MapData {
        private static _ins: MapData;
        public static get ins(): MapData {
            if (this._ins == null) {
                this._ins = new MapData();
            }
            return this._ins;
        }

        private _path: number[][];
        public get path(): number[][] {
            return this._path;
        }

        private _mapWidth: number;//地图宽度
        public get mapWidth(): number {
            return this._mapWidth;
        }

        private _mapHeight: number;//地图高度
        public get mapHeight(): number {
            return this._mapHeight;
        }

        private _sliceWidth: number;//地图块宽度，256
        public get sliceWidth(): number {
            return this._sliceWidth;
        }

        private _sliceHeight: number;//地图块高度，256
        public get sliceHeight(): number {
            return this._sliceHeight;
        }

        private _sliceCol: number;//地图块水平数量，列数
        public get sliceCol(): number {
            return this._sliceCol;
        }

        private _sliceRow: number;//地图块垂直数量，行数
        public get sliceRow(): number {
            return this._sliceRow;
        }

        private _cellWidth: number;//网格宽度，32
        public get cellWidth(): number {
            return this._cellWidth;
        }

        private _cellHeight: number;//网格高度，32
        public get cellHeight(): number {
            return this._cellHeight;
        }

        private _numCol: number;//地图转换后的x坐标大小
        public get numCol(): number {
            return this._numCol;
        }

        private _numRow: number;//地图转换后的y坐标大小
        public get numRow(): number {
            return this._numRow;
        }

        private _isHangUp: boolean;//是否是挂机场景，自动循环地图
        public get isHangUp(): boolean {
            return this._isHangUp;
        }
        public set isHangUp(val: boolean) {
            this._isHangUp = val;
        }

        private _mapMoveType: number = MapMoveType.LeftDown;//地图移动类型
        public get mapMoveType(): number {
            return this._mapMoveType;
        }
        public set mapMoveType(val: number) {
            this._mapMoveType = val;
        }

        private _cfg: number[] = [];

        public getMask(x: number, y: number): number {
            return this._cfg[y * this._numCol + x];
        }

        private _ckBlock: Handler;
        public get ckBlock(): Handler {
            if (this._ckBlock == null) {
                this._ckBlock = Handler.alloc(this, this.isBlock);
            }
            return this._ckBlock;
        }

        public isBlock(x: number, y: number): boolean {
            return MapCellUtil.isBlock(this.getMask(x, y));
        }

        public isShelter(x: number, y: number): boolean {
            return MapCellUtil.isShelter(this.getMask(x, y));
        }

        /**
         * 范围内
         * @param x
         * @param y
         */
        public isInRange(x: number, y: number): boolean {
            return x >= 0 && y >= 0 && x < this._numCol && y < this._numRow;
        }

        public isPointLegal(x: number, y: number) {
            return this.isInRange(x, y) && !this.isBlock(x, y);
        }

        public setSource(data: MapInfo): void {
            let self = this;
            self._mapWidth = data.mW;
            self._mapHeight = data.mH;
            self._sliceWidth = data.sW;
            self._sliceHeight = data.sH;
            self._cellWidth = data.cW;
            self._cellHeight = data.cH;
            self._path = data.p;
            self._cfg.length = (data.mW / data.cW) * (data.mH / data.cH);
            for (let i = 0, len1 = data.d.length; i < len1; i++) {
                self._cfg[i] = data.d[i];
            }
            self._numCol = self._mapWidth / self._cellWidth;
            self._numRow = self._mapHeight / self._cellHeight;

            self._sliceCol = self._mapWidth / self._sliceWidth;
            self._sliceRow = self._mapHeight / self._sliceHeight;
        }

        public getCellPt(wx: number, wy: number, pt: Point = null): Point {
            let tx: number = Math.floor(wx / this._cellWidth);
            let ty: number = Math.floor(wy / this._cellHeight);
            if (pt == null) {
                pt = Pool.alloc(Point).setTo(tx, ty);
            } else {
                pt.x = tx;
                pt.y = ty;
            }
            return pt;
        }
        /**计算世界坐标，会乘以网格宽度32*/
        public getWorldPt(tx: number, ty: number, pt: Point = null): Point {
            let wx: number = Math.floor((tx + 0.5) * this._cellWidth);
            let wy: number = Math.floor((ty + 0.5) * this._cellHeight);
            if (pt == null) {
                pt = Pool.alloc(Point).setTo(wx, wy);
            } else {
                pt.x = wx;
                pt.y = wy;
            }
            return pt;
        }

        public getCellPtByIdx(idx: number, pt?: Point) {
            let x = idx % this._numCol;
            let y = Math.floor(idx / this._numCol);
            if (pt == null) {
                pt = Pool.alloc(Point).setTo(x, y);
            } else {
                pt.x = x;
                pt.y = y;
            }
            return pt;
        }
    }

}
