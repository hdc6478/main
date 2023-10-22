namespace game.scene {


    import Sprite = egret.Sprite;
    import Pool = base.Pool;
    import Handler = base.Handler;
    import ParamConfig = game.config.ParamConfig;
    import IPassProxy = game.mod.IPassProxy;
    import facade = base.facade;

    export class AdTitle extends BaseDraw {

        private _width: number;
        private _height: number;

        private _imgTxtVip: BitmapBase;
        private _imgDi: BitmapBase;
        private _imgTxtDao: BitmapBase;
        private _imgTxtSong: BitmapBase;
        private _imgTxtGuan: BitmapBase;

        private _vipFont: Sprite;
        private _conditionFont: Sprite;

        private _nextPass: number;
        private _nextInfo: number[];

        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            let self = this;
            self._width = value;
            self.dsp.width = value;
        }

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            let self = this;
            self._height = value;
            self.dsp.height = value;
        }

        protected initDsp(): void {
            super.initDsp();
            let self = this;
            self.height = 56;
            self._width = 209;

            self._imgDi = self.dsp.addChild(Pool.alloc(BitmapBase)) as BitmapBase;
            self._imgDi.source = "ad_vip_di";
            self._imgDi.y = 0;
            self._imgDi.x = 20;

            self._imgTxtVip = self.dsp.addChild(Pool.alloc(BitmapBase)) as BitmapBase;
            self._imgTxtVip.source = "vip_txt_vip";
            self._imgTxtVip.y = 20;

            self._imgTxtDao = self.dsp.addChild(Pool.alloc(BitmapBase)) as BitmapBase;
            self._imgTxtDao.source = "vip_txt_dao";
            self._imgTxtDao.y = 26;
            self._imgTxtDao.x = 20;

            self._imgTxtSong = self.dsp.addChild(Pool.alloc(BitmapBase)) as BitmapBase;
            self._imgTxtSong.source = "vip_txt_song";
            self._imgTxtSong.y = 19;

            self._imgTxtGuan = self.dsp.addChild(Pool.alloc(BitmapBase)) as BitmapBase;
            self._imgTxtGuan.source = "vip_txt_guan";
            self._imgTxtGuan.y = 25;

            self._vipFont = new Sprite();
            self.dsp.addChild(self._vipFont);
            self._vipFont.y = 20;

            self._conditionFont = new Sprite();
            self.dsp.addChild(self._conditionFont);
            self._conditionFont.y = 27;
        }

        /**
         * @param {number} lv vip等级
         * */
        public static getShowVipAdLimit(lv: number): number[] {
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "VIP_guankazengsong");
            if (!cfg || !cfg.value) {
                return null;
            }
            let _limit: number[] = null;
            for (let _temp of cfg.value) {
                if (_temp[2] > lv) {
                    _limit = _temp;
                    break;
                }
            }
            return _limit;
        }

        public setTitle(_limit: number[]) {
            let self = this;
            if (!_limit || self._nextPass == _limit[0]) {
                return;
            }

            self._nextInfo = _limit;
            self._nextPass = _limit[0];
            let proxy: IPassProxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
            let len: number = (proxy.changeIdxToNum(_limit[0])).toString().length;
            let _x: number = len * 18 - (len - 1) * 5;
            self._conditionFont.x = 47;
            self._imgTxtGuan.x = self._conditionFont.x + _x;
            self._imgTxtSong.x = self._imgTxtGuan.x + 25;
            self._imgTxtVip.x = self._imgTxtSong.x + 29;
            self._vipFont.x = self._imgTxtVip.x + 55;

            self.loadFont("ad_title_num");
            self.loadFont("ad_vip");

            self.x = -self._width * 0.5;
        }

        private loadFont(name: string) {
            let self = this;
            let url = ResUtil.getFontUiUrl(name);
            LoadMgr.ins.addRef(url);
            LoadMgr.ins.loadMerge(url, Handler.alloc(self, self.setVipBmpFont), LoadPri.UIScene);
        }

        private setVipBmpFont(data: MergedBmp, url: string) {
            let self = this;
            if (!self._nextInfo) {
                return;
            }
            let vipUrl: string = ResUtil.getFontUiUrl("ad_vip");
            let condiUrl: string = ResUtil.getFontUiUrl("ad_title_num");
            if (url != vipUrl && url != condiUrl) {
                return;
            }
            let parent = url == vipUrl ? self._vipFont : self._conditionFont;
            for (let i = parent.numChildren - 1; i >= 0; i--) {
                let c: BitmapBase = <BitmapBase>parent.removeChildAt(i);
                Pool.release(c);
            }
            let gap = -5;
            let proxy: IPassProxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
            let text = url == vipUrl ? self._nextInfo[2] + "" : (proxy.changeIdxToNum(self._nextInfo[0])) + "";
            let bmpX: number = 0;
            for (let i = 0, l = text.length; i < l; ++i) {
                let bmp: BitmapBase = Pool.alloc(BitmapBase);
                bmp.texture = data.getTexture(text[i]);
                bmp.x = bmpX;
                bmpX += bmp.texture.textureWidth + gap;
                parent.addChild(bmp);
            }
        }

        public onRelease(): void {
            let self = this;
            for (let i = self._vipFont.numChildren - 1; i >= 0; i--) {
                let c: BitmapBase = <BitmapBase>self._vipFont.removeChildAt(i);
                Pool.release(c);
            }
            for (let i = self._conditionFont.numChildren - 1; i >= 0; i--) {
                let c: BitmapBase = <BitmapBase>self._conditionFont.removeChildAt(i);
                Pool.release(c);
            }
            self.releaseByEle(["_nextPass", "_nextInfo", "_imgTxtVip", "_imgDi", "_imgTxtDao", "_imgTxtSong",
                "_imgTxtGuan", "_vipFont", "_conditionFont"]);
            let vipUrl: string = ResUtil.getFontUiUrl("ad_vip");
            let condiUrl: string = ResUtil.getFontUiUrl("ad_title_num");
            LoadMgr.ins.decRef(vipUrl);
            LoadMgr.ins.decRef(condiUrl);
            super.onRelease();
            self._isInit = false;
        }

        private releaseByEle(ele: string[]) {
            let self = this;
            for (let i of ele) {
                if (self[i]) {
                    if (self[i].parent) {
                        self[i].parent.removeChild(self[i]);
                        Pool.release(self[i]);
                    }
                }
                self[i] = null;
            }
        }
    }
}
