namespace game {
    import PoolObject = base.PoolObject;
    import Texture = egret.Texture;
    import ByteArray = egret.ByteArray;
    import Bitmap = egret.Bitmap;
    import Pool = base.Pool;

    /** @internal */ export const ExtPng: string = ".png";
    /** @internal */ export type FrameKey = "x" | "y" | "w" | "h" | "offX" | "offY" | "sourceW" | "sourceH" | "dur";

    export class MergedBmp implements PoolObject {
        /** @internal */ public static HeadSize: number = 2;
        /** @internal */ public static Size: number = 2;
        /** @internal */ public static Pos = ["x", "y", "w", "h", "offX", "offY", "sourceW", "sourceH", "dur"];

        /** @internal */ private _frames: number[][];

        /** @internal */ private _json: {
            frames: {
                [key: string]: { x: number, y: number, w: number, h: number, offX: number, offY: number, sourceW: number, sourceH: number, dur: number }
            }
        };
        /** @internal */ private _jsonKeys: string[];

        /** @internal */ private _frameRate: number;

        /** @internal */ private _texture: Texture;
        /** @internal */ private _alphaTexture: Texture;
        /** @internal */ private _bitmapX: number = 0;
        /** @internal */ private _bitmapY: number = 0;
        /** @internal */ private _subMap: { [key: string]: Texture } = Object.create(null);

        /** @internal */ private _url: string;
        /** @internal */ public get url(): string {
            return this._url;
        }

        /** @internal */ private _type: string;
        /** @internal */ private _scale: number;
        public get scale(): number {
            return this._scale;
        }

        public get numFrames(): number {
            if (this._jsonKeys) {
                return this._jsonKeys.length;
            }
            if (this._frames) {
                return this._frames.length;
            }
            return 0;
        }

        public get isLoaded(): boolean {
            // let supportedCompressedTexture = egret.Capabilities.supportedCompressedTexture;
            return this._texture != null && (this._frames != null || this._json != null);
            // && (DEBUG || (!supportedCompressedTexture.etc1 && !supportedCompressedTexture.pvrtc) || supportedCompressedTexture.pvrtc ||
            //     (supportedCompressedTexture.etc1 && !supportedCompressedTexture.pvrtc && this._alphaTexture != null));
        }

        /** @internal */ public init(url: string, type: string, priority: number, frameRate?: number): void {
            this._url = url;
            this._type = type;
            this._frameRate = frameRate ? frameRate : 12;
            this._scale = this._url && this._url.indexOf("assets/anim/") > -1 ? TextureScale : 1
        }

        /** @internal */ public cfgLoaded(data: any, url: string): void {
            if (url != this._url + this._type) {
                return;
            }
            if (data instanceof ByteArray) {
                this.setBytes(data);
            } else if (Array.isArray(data)) {
                this._frames = data;
            } else {
                this.setJson(data);
            }
            this.checkComp();
        }

        /** @internal */ public imgLoaded(texture: Texture, url: string): void {
            let self = this;
            self._texture = texture;
            self._bitmapX = texture.$bitmapX - texture.$offsetX;
            self._bitmapY = texture.$bitmapY - texture.$offsetY;
            if (self._alphaTexture && self._texture.$bitmapData && self._alphaTexture.$bitmapData) {
                self._texture.$bitmapData.etcAlphaMask = self._alphaTexture.$bitmapData;
            }
            self.checkComp();
        }

        /** @internal */ public imgAlphaLoaded(texture: Texture, url: string): void {
            let self = this;
            self._alphaTexture = texture;
            if (self._alphaTexture.$bitmapData == null) {
                console.warn("_alphaTexture没有Date" + url);
            }
            if (self._texture && self._texture.$bitmapData && self._alphaTexture.$bitmapData) {
                self._texture.$bitmapData.etcAlphaMask = self._alphaTexture.$bitmapData;
            }
            self.checkComp();
        }

        /** @internal */ private setBytes(bytes: ByteArray, pos: number = 0): void {
            let s = MergedBmp;
            bytes.position = pos;
            let n: number = bytes.readShort();
            let frames: number[][] = this._frames = [];
            frames.length = n;
            let len = s.Pos.length;
            for (let i = 0; i < n; i++) {
                frames[i] = [];
                frames[i].length = len;
                for (let j = 0; j < len; j++) {
                    bytes.position = pos + s.HeadSize + (s.Pos.length * i + j) * s.Size;
                    frames[i][j] = bytes.readShort();
                }
            }
        }

        /** @internal */ private setJson(json: any): void {
            this._json = json;
            this._jsonKeys = Object.keys(json.frames);
        }

        /** @internal */ private checkComp(): void {
            let self = this;
            if (self.isLoaded) {
                LoadMgr.ins.onMergedLoaded(this);
            }
        }

        public getTexture(frame: string | number): Texture {
            let self = this;
            if (!self._texture) {
                return null;
            }
            let texture: Texture = self._subMap[frame];
            if (!texture) {
                let source: Texture = self._texture;
                let x: number = self.getVal(frame, "x") / self._scale + self._bitmapX;
                let y: number = self.getVal(frame, "y") / self._scale + self._bitmapY;
                let w: number = self.getVal(frame, "w") / self._scale;
                let h: number = self.getVal(frame, "h") / self._scale;
                let offX: number = self.getVal(frame, "offX") / self._scale;
                let offY: number = self.getVal(frame, "offY") / self._scale;
                let sourceW: number = self.getVal(frame, "sourceW") / self._scale;
                let sourceH: number = self.getVal(frame, "sourceH") / self._scale;

                texture = Pool.alloc(Texture);
                texture.disposeBitmapData = false;
                texture.$bitmapData = source.$bitmapData;
                texture.$initData(x, y, w, h, offX, offY, sourceW, sourceH, source.$sourceWidth, source.$sourceHeight);

                if(!texture.$bitmapX && !texture.$bitmapY && !texture.$bitmapWidth && !texture.$bitmapHeight){
                    //console.error(this._url+" 缺少帧"+ frame + " 数据");
                    return null;
                }

                self._subMap[frame] = texture;
            }
            return texture;
        }

        public drawTo(bmp: Bitmap, frame: string | number, scaleX: number = 1): void {
            let self = this;
            let sw = self.getVal(frame, "sourceW");
            let sh = self.getVal(frame, "sourceH");
            bmp.x = -bmp.scaleX * sw / 2;
            bmp.y = bmp.scaleY * -sh / 2;
            bmp.texture = self.getTexture(frame);
        }

        public getVal(frame: string | number, key: FrameKey): number {
            let self = this;
            if (self._frames) {
                let f: number = typeof frame === "string" ? parseInt(frame) : frame;
                return self.getValFromBin(f, key);
            }
            if (self._json) {
                if (key === "dur") {
                    return 1000 / self._frameRate;
                }
                let frameObj = self._json.frames[frame];
                if (typeof frame === "string") {
                    if (frameObj) {
                        return frameObj[key];
                    }
                    return 0;
                }
                if (frameObj) {
                    return frameObj[key];
                }
                if (frame < self._jsonKeys.length) {
                    frame = self._jsonKeys[frame];
                    return self._json.frames[frame][key];
                }
                return 0;
            }
            return 0;
        }

        /** @internal */ private getValFromBin(frame: number, key: string): number {
            let self = this;
            let s = MergedBmp;
            let idx: number = s.Pos.indexOf(key);
            if (idx < 0) {
                return 0;
            }
            if (self._frames[frame]) {
                return self._frames[frame][idx];
            }
            //默认返还0帧
            return 0;
        }

        /** @internal */ private clear(): void {
            let self = this;
            self._url = null;
            self._type = null;
            self._frameRate = 0;
            self._frames = null;
            self._json = null;
            self._jsonKeys = null;
            // if (self._alphaTexture && self._alphaTexture.ktxData) self._alphaTexture.ktxData = null;
            Pool.release(self._alphaTexture);
            self._alphaTexture = null;
            // if (self._texture && self._texture.ktxData) self._texture.ktxData = null;
            Pool.release(self._texture);
            self._texture = null;
            for (let k in self._subMap) {
                let t: Texture = self._subMap[k];
                Pool.release(t);
                self._subMap[k] = null;
                delete self._subMap[k];
            }
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
        }

        public onRelease(): void {
            this.clear();
        }
    }
}
