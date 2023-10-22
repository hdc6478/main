namespace game {
    import Event = egret.Event;
    import Pool = base.Pool;

    export class BgMgr {
        /** @internal */ private static _ins: BgMgr;

        public static getIns(): BgMgr {
            if (!this._ins) {
                this._ins = new BgMgr();
            }
            return this._ins;
        }

        /** @internal */ private _img: BitmapBase;
        /** @internal */ private _imgBig: BitmapBase;
        /** @internal */ private _bigRes: string;
        /** @internal */ private _res: string;
        /** @internal */ private _url: string;
        /** @internal */ private _loaded: boolean;
        private _imgLoader: egret.ImageLoader;


        /** @internal */
        constructor() {
            this.initImg();
        }

        /** @internal */ private initImg(): void {
            let self = this;
            self._img = Pool.alloc(BitmapBase);
            this._imgLoader = new egret.ImageLoader();
            this._imgLoader.crossOrigin = "anonymous";// 跨域请求
            self._img.addEventListener(Event.COMPLETE, self.onImgComp, self);
        }

        public setBigBg(res: string): void {
            if (1 || gso.jzsj_channel != CHANNEL_NAME.WANBA) {
                return;
            }
            let self = this;
            if (self._bigRes == res) {
                return;
            }
            if (res && !self._imgBig) {
                let img = self._imgBig = Pool.alloc(BitmapBase);
                let s = gso.gameStage;
                img.width = s.stageWidth;
                img.height = s.stageHeight;
                img.x = 0;
                img.y = 0;
                img.source = this.getUrl(res);
                gso.gameStage.addChildAt(img, 0);
                self._bigRes = res;
            } else if (!res && self._imgBig) {
                self._imgBig.removeFromParent();
                Pool.release(self._imgBig);
                self._imgBig = null;
                self._bigRes = null;
            }
        }

        public setBg(res: string): void {
            let self = this;
            if (self._res == res) {
                return;
            }
            if (res && !self._img.parent) {
                let idx = self._imgBig ? 1 : 0;
                gso.gameStage.addChildAt(self._img, idx);
            } else if (!res) {
                self._img.removeFromParent();
            }
            self._res = res;
            self.updateBg();
        }

        public updateBg(): void {
            let self = this;
            let url: string = self.getUrl(self._res);
            if (self._url == url) {
                if (self._loaded) {
                    self.onImgComp();
                }
                return;
            }

            self._url = url;
            self._loaded = false;

            if(!self._url) {
                return;
            }
            let imgLoader = this._imgLoader;
            imgLoader.load(self._url );
            imgLoader.once(egret.Event.COMPLETE, function (evt: egret.Event) {
                if (evt.currentTarget.data) {
                    let texture = new egret.Texture();
                    texture.bitmapData = evt.currentTarget.data;
                    self._img.source = texture;
                    self.onImgComp();
                }
            }, this);

            // self._img.source = self._url;
        }

        /** @internal */ private getUrl(key: string): string {
            if (!key) {
                return null;
            }

            // console.info("BgMgr key = " + key);
            //
            // // @ts-ignore
            // for(let k in gso.bgImg){
            //     console.info(k + " = " + gso.bgImg[k]);
            // }

            //时光
            if(gso.isShiguangSDK){
                return gso.bgImg["1_shiguang"];
            }

            if (typeof gso.bgImg === "object" && gso.bgImg[key]) {
                return gso.bgImg[key];
            }

            //1 是选服界面 2是加载界面
            let res = this.getloadRes(key);
            let img = res == "" ? "assets/loading/1.jpg": res;
            return img;
        }


        //区分loading
        public getloadRes(urlname:string):string {
            // if(urlname == "1") {
            //     if(gso.isWeixin) {
            //         return "https://cdnsrcex-ljtx.1y-game.com/assets/loading/wx1.jpg";
            //     }else if(gso.isFuyaoWeixin || gso.isWanjianShouq){
            //         return "https://cdnsrcex-ljtx.1y-game.com/assets/loading/1.jpg";
            //     }else if(gso.isShouq){
            //         return "https://cdnsrcex-ljtx.1y-game.com/assets/loading/shouq1.jpg";
            //     }
            // }else if(urlname == "2") {
            //     if(gso.isWeixin){
            //         return "https://cdnsrcex-ljtx.1y-game.com/assets/loading/wx2.jpg";
            //     }else if(gso.isFuyaoWeixin || gso.isWanjianShouq){
            //         return "https://cdnsrcex-ljtx.1y-game.com/assets/loading/2.jpg";
            //     }else if(gso.isShouq){
            //         return "https://cdnsrcex-ljtx.1y-game.com/assets/loading/shouq2.jpg";
            //     }
            // }
            return "";
        }

        /** @internal */ private onImgComp() {
            this._loaded = true;
            let img = this._img;
            let s = gso.gameStage;
            let sW = s.stageWidth;
            let sH = s.stageHeight;
            // // if (!gso.isPc) {
            // let scale = Math.max(sW / img.width, sH / img.height);
            // img.width *= scale;
            // img.height *= scale;
            // // }
            img.x = (sW - img.width) / 2;
            img.y = (sH - img.height) / 2;
        }
    }
}