namespace game.scene {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Texture = egret.Texture;
    import Bitmap = egret.Bitmap;
    import PoolObject = base.PoolObject;
    import Pool = base.Pool;
    import Handler = base.Handler;
    import TimeMgr = base.TimeMgr;

    const BlurRatio: number = 20;

    export class SceneMap extends DisplayObjectContainer {
        private _blur: Texture;

        private _mapId: number = 0;
        private _sliceW: number = 0;
        private _sliceH: number = 0;

        private _curSC: number;
        private _curSR: number;
        private _curEC: number;
        private _curER: number;

        private _bmpMap: { [key: number]: MapBmp };
        private _curShow: string[];

        private _initX = 0;//地图初始化位置，水平坐标
        private _numC: number;//地图块移动的位置，默认从第一块地图开始计算
        private _initY = 0;//地图初始化位置，水平坐标
        private _numR: number;//地图块移动的位置，默认从第一块地图开始计算
        private _moveSpeed: number = 2;//地图移动速度,todo，可以支持配置
        private _moveType: number;//地图移动类型,todo，可以支持配置
        // private _moveLeft: boolean = false;//是否向左移动
        // private _moveUp: boolean = false;//是否向上移动
        private _initMoveData: boolean = false;//是否初始化数据
        private _isHangUp: boolean = false;//是否是挂机移动地图

        private _waitTime: number = 120;//秒
        private _waitCnt: number = 200;
        private _lastWaitTime: number = 0;
        private _releaseMap: { [key: number]: [MapBmp, number] };

        constructor() {
            super();
            let self = this;
            self._bmpMap = {};
            self._releaseMap = {};
            self._curShow = [];
            self._waitCnt = egret.Capabilities.os == "iOS" ? 100 : 200;//todo,旧代码
        }

        public init(mapId: number): void {
            let self = this;
            self._mapId = mapId;
            self._sliceW = MapData.ins.sliceWidth;
            self._sliceH = MapData.ins.sliceHeight;
            self._moveType = MapData.ins.mapMoveType;
            if(gso.mapMoveType != undefined){
                self._moveType = parseInt(gso.mapMoveType);
            }
            self._isHangUp = MapData.ins.isHangUp;
            self._initMoveData = false;
        }
        /**视图变化时重置地图移动数据*/
        private initMoveData(): void {
            let self = this;
            self._initX = self.x = 0;
            self._initY = self.y = 0;
            if(!self._isHangUp){
                return;
            }
            if(self._moveType == MapMoveType.Null){
                return;
            }
            switch (self._moveType) {
                case MapMoveType.Left:
                    self._numC = self._curSC;//向左从第一块地图开始
                    break;
                case MapMoveType.Right:
                    self._numC = self._curEC - 1;//向右从最后一块地图开始
                    break;
                case MapMoveType.Up:
                    self._numR = self._curSR;
                    break;
                case MapMoveType.Down:
                    self._numR = self._curER - 1;
                    break;
                case MapMoveType.LeftUp:
                    self._numC = self._curSC;
                    self._numR = self._curSR;
                    break;
                case MapMoveType.LeftDown:
                    self._numC = self._curSC;
                    self._numR = self._curER - 1;
                    break;
                case MapMoveType.RightUp:
                    self._numC = self._curEC - 1;
                    self._numR = self._curSR;
                    break;
                case MapMoveType.RightDown:
                    self._numC = self._curEC - 1;
                    self._numR = self._curER - 1;
                    break;
            }
            // for (let key in self._bmpMap) {
            //     let bmp = self._bmpMap[key];
            //     let col: number = SceneMap.getCol(key);
            //     let row: number = SceneMap.getRow(key);
            //     bmp.x = col * self._sliceW;
            //     bmp.y = row * self._sliceH;
            //     bmp.setIdx(col, row, self._mapId);
            // }

            self._initMoveData = true;
        }

        public setBlur(texture: Texture): void {
            let self = this;
            texture.disposeBitmapData = false;
            let blur = Pool.alloc(Texture);
            blur.bitmapData = texture.bitmapData;
            self._blur = blur;

            let bmp: MapBmp = null;
            for (let id of self._curShow) {
                bmp = self.getBmp(id);
                if (bmp && !bmp.texture) {
                    self.updateBlur(id);
                }
            }
        }
        /**刷新地图，左上方第一块地图坐标（sc,sr），右下方最后一块地图坐标（ec,er）*/
        public updateTiles(sc: number, sr: number, ec: number, er: number): void {
            let self = this;
            if (self._mapId == 0) {
                return;
            }
            if (sc < 0) {
                sc = 0;
            }
            if (sr < 0) {
                sr = 0;
            }
            let sliceCol = MapData.ins.sliceCol;
            let sliceRow = MapData.ins.sliceRow;
            if(self._isHangUp){
                /**挂机场景循环多加载一块地图，用于循环*/
                switch (self._moveType) {
                    case MapMoveType.Left:
                        ec++;
                        break;
                    case MapMoveType.Right:
                        sc--;
                        break;
                    case MapMoveType.Up:
                        er++;
                        break;
                    case MapMoveType.Down:
                        sr--;
                        break;
                    case MapMoveType.LeftUp:
                        ec++;
                        er++;
                        break;
                    case MapMoveType.LeftDown:
                        ec++;
                        sr--;
                        break;
                    case MapMoveType.RightUp:
                        er++;
                        sc--;
                        break;
                    case MapMoveType.RightDown:
                        sc--;
                        sr--;
                        break;
                }
            }
            else {
                /**非挂机场景限制地图范围，挂机场景不限制，兼容旧地图规则*/
                if (ec > sliceCol) {
                    ec = sliceCol;
                }
                if (er > sliceRow) {
                    er = sliceRow;
                }
            }

            if (self._curSC == sc && self._curSR == sr && self._curEC == ec && self._curER == er) {
                return;
            }
            self._curSC = sc;
            self._curSR = sr;
            self._curEC = ec;
            self._curER = er;
            self._curShow.length = 0;
            self.initMoveData();
            /**加载顺序从上往下，从左往右*/
            for (let c = sc; c < ec; c++) {
                for (let r = sr; r < er; r++) {
                    self._curShow.push(`${self._mapId}_${c}_${r}`);//SceneMap.getSliceId(c, r)
                }
            }
            //地图缓存处理
            let _time: number = TimeMgr.time.serverTimeSecond;
            for (let key in self._bmpMap) {
                if (self._curShow.indexOf(key) == -1) {
                    self.releaseMapBmp(key, self._bmpMap[key], _time);
                    delete self._bmpMap[key];
                }
            }

            for (let i = 0, n = self._curShow.length; i < n; i++) {
                self.loadOne(self._curShow[i]);
            }
        }

        private loadOne(id: string): void {
            let self = this;
            let bmp: MapBmp = self.getBmp(id);
            if (!bmp) {
                /**新加载的地图，且不在缓存地图里面*/
                let col: number = SceneMap.getCol(id);
                let row: number = SceneMap.getRow(id);
                bmp = Pool.alloc(MapBmp);
                bmp.x = col * self._sliceW;
                bmp.y = row * self._sliceH;
                bmp.setIdx(col, row, self._mapId);
                self._bmpMap[id] = bmp;
                self.addChild(bmp);
                self.updateBlur(id);
            }
            else {
                //如果存在地图块，且是挂机移动地图，需要重置下数据和位置
                if(this._isHangUp){
                    let col: number = SceneMap.getCol(id);
                    let row: number = SceneMap.getRow(id);
                    bmp.x = col * self._sliceW;
                    bmp.y = row * self._sliceH;
                    bmp.setIdx(col, row, self._mapId, true);
                }
            }
        }

        private updateBlur(id: string): void {
            let self = this;
            if (!self._blur) {
                return;
            }
            let col: number = SceneMap.getCol(id);
            let row: number = SceneMap.getRow(id);
            let blur: Texture = Pool.alloc(Texture);
            blur.disposeBitmapData = false;
            if (self._blur && self._blur.bitmapData) {
                blur._setBitmapData(self._blur.bitmapData);
            }
            let ratio = BlurRatio;
            let tx: number = col * self._sliceW / ratio;
            let ty: number = row * self._sliceH / ratio;
            let tw: number = self._sliceW / ratio;
            let th: number = self._sliceH / ratio;
            blur.$initData(self._blur.$bitmapX + tx, self._blur.$bitmapY + ty, tw, th,
                0, 0, tw, th, self._blur.$sourceWidth, self._blur.$sourceHeight);
            self._bmpMap[id].setBlur(blur);
        }

        public clean(clearAll: boolean): void {
            let self = this;
            self._mapId = self._sliceW = self._sliceH = 0;
            Pool.release(self._blur);
            self._blur = null;
            self._curSC = self._curSR = self._curEC = self._curER = 0;
            self._curShow.length = 0;
            if (clearAll) {
                self.clearAllMapBmp();
            }
        }

        private getBmp(id: string): MapBmp {
            let self = this;
            let bmp: MapBmp = self._bmpMap[id];
            if (self._releaseMap[id]) {
                if (!bmp) {
                    bmp = self._releaseMap[id][0];
                    self._bmpMap[id] = bmp;
                    self.addChild(bmp);
                }
                delete self._releaseMap[id];
            }
            return bmp;
        }

        public check(time: number): void {
            this.checkMapBmpClear(time);
            this.checkMapBmpMove();
        }

        private checkMapBmpClear(time: number) {
            let self = this;

            if (self._lastWaitTime && time - self._lastWaitTime < 3) {
                return;
            }

            self._lastWaitTime = time;

            let _time: number = 0;
            let _list = self._releaseMap;
            let _keys: string[] = Object.keys(self._releaseMap);
            let _isFull: boolean = _keys.length > self._waitCnt;
            for (let key of _keys) {
                _time = time - _list[key][1];
                if (_time > self._waitTime || (_isFull && _time > 30)) {
                    _list[key][0].onRelease();
                    Pool.release(_list[key]);
                    _list[key][0] = null;
                    delete _list[key];
                }
            }
        }

        private releaseMapBmp(id: number | string, bmp: MapBmp, _time: number) {
            let self = this;
            if (!bmp || !bmp.texture) {
                return;
            }
            bmp.removeDisplay();

            if (!self._releaseMap[id]) {
                self._releaseMap[id] = [bmp, _time];
            }
        }

        private clearAllMapBmp() {
            let self = this;
            for (let key in self._bmpMap) {
                self._bmpMap[key] && self._bmpMap[key].onRelease();
                Pool.release(self._bmpMap[key]);
                delete self._bmpMap[key];
            }
            for (let key in self._releaseMap) {
                self._releaseMap[key][0] && self._releaseMap[key][0].onRelease();
                Pool.release(self._releaseMap[key]);
                self._releaseMap[key][0] = null;
                delete self._releaseMap[key];
            }
        }

        private static getCol(sliceId: string): number {
            return Number(sliceId.split("_")[1]);//(sliceId & this.LOW_WORD) - this.NRM;
        }

        private static getRow(sliceId: string): number {
            return Number(sliceId.split("_")[2]);//(sliceId >> this.ROW_SHIFT) - this.NRM;
        }

        private static centerCol: number;
        private static centerRow: number;

        public static sortId(id1: string, id2: string): number {
            let self = SceneMap;
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
        /**移动地图块*/
        private checkMapBmpMove(): void {
            let self = this;
            if(!self._isHangUp){
                return;
            }
            if(!self._initMoveData){
                return;
            }
            if(self._moveType == MapMoveType.Null){
                return;
            }
            if(self._moveType == MapMoveType.Left || self._moveType == MapMoveType.Right || self._moveType == MapMoveType.LeftUp ||
                self._moveType == MapMoveType.LeftDown || self._moveType == MapMoveType.RightUp || self._moveType == MapMoveType.RightDown){
                this.checkMapBmpMoveX();
            }
            if(self._moveType == MapMoveType.Up || self._moveType == MapMoveType.Down || self._moveType == MapMoveType.LeftUp ||
                self._moveType == MapMoveType.LeftDown || self._moveType == MapMoveType.RightUp || self._moveType == MapMoveType.RightDown){
                this.checkMapBmpMoveY();
            }
        }

        /**移动地图块*/
        private checkMapBmpMoveX() {
            let self = this;
            let moveLeft = self._moveType == MapMoveType.Left || self._moveType == MapMoveType.LeftDown || self._moveType == MapMoveType.LeftUp;//是否向左移动
            let calcX = moveLeft ? -1 : 1;//位移变量，正负
            self.x += self._moveSpeed * calcX;/**左右移动*/
            let moveX = Math.abs(self.x - self._initX);/**地图移动的距离*/
            let numX = Math.floor(moveX / self._sliceW);/**移动的地图块数量，256为一块*/
            if(!numX){
                return;
            }

            self._initX = self.x;/**重置地图初始坐标x*/
            //let maxCol = self._curEC - self._curSC;/**当前水平方向地图块数量*/
            //r应该从当前sr算起，因为向下移动时sr从-1开始
            for (let r = self._curSR; r < self._curER; r++) {
                /**移动一整列地图*/
                let id = `${self._mapId}_${self._numC}_${r}`;/**移动的地图块id*/
                let bmp: MapBmp = self.getBmp(id);/**移动的地图块*/
                if(!bmp){
                    console.error("MoveX找不到地图块bmp");
                    continue;
                }

                let lastC = 0;/**计算最后一块地图的位置*/
                if(moveLeft){
                    //向左移动时，最后一块地图的位置
                    lastC = self._numC == self._curSC ? self._curEC - 1 : self._numC - 1 ;/**计算最后一块地图的位置*/
                }
                else {
                    lastC = self._numC == self._curEC - 1 ? self._curSC : self._numC + 1;/**计算最后一块地图的位置*/
                }

                let lastId = `${self._mapId}_${lastC}_${r}`;/**最后一块地图的id*/
                let lastBmp: MapBmp = self.getBmp(lastId);/**最后一块地图*/
                if(!lastBmp){
                    console.error("MoveX找不到地图块lastBmp");
                    continue;
                }

                bmp.x = lastBmp.x - self._sliceW * calcX;/**移动地图块*/

                bmp.setIdx(lastBmp.curC - calcX, lastBmp.curR, self._mapId);/**设置地图块纹理，根据最后一块地图来设置id*/
            }
            self._numC -= calcX;//累加计算
            if(moveLeft){
                self._numC = self._numC > self._curEC - 1 ? self._curSC : self._numC;/**循环累加，例如0~3*/
            }
            else {
                self._numC = self._numC < self._curSC ? self._curEC - 1 : self._numC;/**循环累减，例如-1~2*/
            }
        }
        /**移动地图块*/
        private checkMapBmpMoveY() {
            let self = this;
            let moveUp = self._moveType == MapMoveType.Up || self._moveType == MapMoveType.LeftUp || self._moveType == MapMoveType.RightUp;
            let calcY = moveUp ? -1 : 1;
            self.y += self._moveSpeed * calcY;/**上下移动*/
            let moveY = Math.abs(self.y - self._initY);/**地图移动的距离*/
            let numY = Math.floor(moveY / self._sliceH);/**移动的地图块数量*/
            if(!numY){
                return;
            }

            self._initY = self.y;/**重置地图初始坐标y*/
            //let maxRol = self._curER - self._curSR;/**当前垂直方向地图块数量*/
            //c应该从当前sc算起，因为向右移动时sc从-1开始
            for (let c = self._curSC; c < self._curEC; c++) {
                /**移动一整行地图*/
                let id = `${self._mapId}_${c}_${self._numR}`;/**移动的地图块id*/
                let bmp: MapBmp = self.getBmp(id);/**移动的地图块*/
                if(!bmp){
                    console.error("MoveY找不到地图块bmp");
                    continue;
                }

                let lastR = 0;/**计算最后一块地图的位置*/
                if(moveUp){
                    lastR = self._numR == self._curSR ? self._curER - 1 : self._numR - 1;/**计算最后一块地图的位置*/
                }
                else {
                    lastR = self._numR == self._curER - 1 ? self._curSR : self._numR + 1;/**计算最后一块地图的位置*/
                }

                let lastId = `${self._mapId}_${c}_${lastR}`;/**最后一块地图的id*/
                let lastBmp: MapBmp = self.getBmp(lastId);/**最后一块地图*/
                if(!lastBmp){
                    console.error("MoveY找不到地图块lastBmp");
                    continue;
                }

                bmp.y = lastBmp.y - self._sliceH * calcY;/**移动地图块*/

                bmp.setIdx(lastBmp.curC, lastBmp.curR - calcY, self._mapId);/**设置地图块纹理*/
            }
            self._numR -= calcY;
            if(moveUp){
                self._numR = self._numR > self._curER - 1 ? self._curSR : self._numR;/**循环累加，例如0~3*/
            }
            else {
                self._numR = self._numR < self._curSR ? self._curER - 1 : self._numR;/**循环累减，例如-1~2*/
            }
        }
    }

    class MapBmp extends Bitmap implements PoolObject {
        private _url: string;
        private _curC: number;//当前地图资源0_1中的0
        private _curR: number;//当前地图资源0_1中的1

        public setIdx(c: number, r: number, mapId: number, notRemove?: boolean): void {
            let self = this;
            let sliceCol = MapData.ins.sliceCol;
            if(c >= sliceCol){
                c = c % sliceCol;
            }else if(c < 0){
                c = sliceCol - 1;//todo
            }
            let sliceRow = MapData.ins.sliceRow;
            if(r >= sliceRow){
                r = r % sliceRow;
            }else if(r < 0){
                r = sliceRow - 1;//todo
            }
            let url: string = ResUtil.getMapBmpUrl(mapId, c, r);
            if (self._url == url) {
                return;
            }
            if(!notRemove){
                //不移除当前
                self.removeCur();
            }
            self._url = url;
            self._curC = c;
            self._curR = r;
            LoadMgr.ins.addRef(url);
            let data: Texture = LoadMgr.ins.getRes(url);
            if(data){
                self.onLoaded(data, url);
            }
            else {
                LoadMgr.ins.load(self._url, Handler.alloc(self, self.onLoaded), LoadPri.Map);
            }
        }

        /**先设置了这里的texture，缩放后的，256/20=12.8*/
        public setBlur(blur: Texture): void {
            let self = this;
            if (self.texture) {
                return;
            }
            // self._blur = blur;
            self.texture = blur;
            self.scaleX = self.scaleY = BlurRatio;
        }
        /**加载完成后再设置完整的texture，256*/
        private onLoaded(data: Texture, url: string) {
            let self = this;
            if (self._url != url || !data) {
                return;
            }
            self.scaleX = self.scaleY = 1;
            self.texture = data;
        }

        private removeCur(): void {
            let self = this;
            self.scaleX = self.scaleY = 1;
            self.texture = null;
            if (self._url) {
                LoadMgr.ins.decRef(self._url);
            }
            self._url = undefined;
        }

        public removeDisplay() {
            let self = this;
            if (self.parent) {
                self.parent.removeChild(self);
            }
        }

        public dispose(): void {
            let self = this;
            self.onRelease();
        }

        public onAlloc(): void {
        }

        public onRelease(): void {
            let self = this;
            self.removeDisplay();
            self.removeCur();
        }

        public get curC(): number {
            return this._curC;
        }
        public get curR(): number {
            return this._curR;
        }
    }

}
