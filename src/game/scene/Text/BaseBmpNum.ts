namespace game.scene {

    import Pool = base.Pool;
    import Handler = base.Handler;
    import Tween = base.Tween;

    export class BaseBmpNum extends BaseDraw {
        get type(): number {
            return this._type;
        }

        private _startAttr: { x: number, y: number } = {x: 0, y: 0};
        private _tweenX: number = 0;
        private _tweenY: number = 0;
        private _curTime: number;
        private _curFrame: number = 0;
        private _finalFrame: number = 0;
        private _text: string;
        private _url: string;

        //private _config: BattleFigureConfig;

        private _fontName: string;

        private _type: number;
        private _isHasWord:number;

        private _data: MergedBmp;

        private _dir: number;
        public showTime: number;

        private _showAttr: { x: number, y: number, a: number, sx: number, sy: number, t?: number }[];
        private _randomX: number;
        private _randomY: number;

        private isNeedShowTween: boolean;
        private _actArray:any;

        private _isMainPlayer = false;

        public loadCfg(key: string): void {
            if (!key) {
                return;
            }
            let self = this;
            self._fontName = key;
            let url: string = ResUtil.getFontUrl(self._fontName);
            self._url = url;
            LoadMgr.ins.addRef(url);
            LoadMgr.ins.loadMerge(url, Handler.alloc(this, this.setBmp), LoadPri.UIScene);
        }

        public setText(text: string, x: number, y: number, dir: number, type: number,
                       fontName:string,actArray:any,hasword:number = 0,isMainPlayer = false,
                       actAtr:string = null): void {
            let self = this;
            self._type = type;
            self._dir = dir;
            this._isHasWord = hasword;
            this._isMainPlayer = isMainPlayer;

            this.dsp.scaleX = 1;
            this.dsp.scaleY = 1;
            this.dsp.alpha = 1;

            this._actArray = actArray;

            let rand = Math.random()*10;
            if(rand % 2){
                x += rand;
                y -= rand;
            }else{
                x -= rand;
                y -= rand;
            }

            if(text == "0"){
                text = "";
            }

            // x = MainGPlayer.ins.x;
            // y = MainGPlayer.ins.y;

            self._startAttr.x = this._tweenX = x;
            self._startAttr.y = this._tweenY = y;

            self._text = text;

            //初始化
            self.x = self._tweenX;
            self.y = self._tweenY;

            //fontName = "stxt_1";
            self.loadCfg(fontName);

            if(actAtr){
                self.isNeedShowTween = false;
                self._showAttr = game[actAtr];
                self._curTime = 0;
                self._curFrame = 0;
                self._finalFrame = self._showAttr.length;

                self._randomX = -40 * Math.random();
                self._randomY = 40 * Math.random();// + 100;
            }else{
                self.isNeedShowTween = true;
            }

        }

        //计算目标总属性
        private computerTotalAtr(d:any,time:number):any{
            let atr:any = {};
            if(d.scale != undefined){
                atr.scaleX = d.scale;
                atr.scaleY = d.scale;
            }

            if(d.move){
                //计算位移
                // let dir = d.move.dir;
                //
                // if(dir == 3){
                //     //随机
                //     dir = Math.random() > 0.5 ? 1 : 2;
                // }

                let dir = this._dir;

                if(this._isMainPlayer && d.move.dir){
                    dir = d.move.dir;
                }

                if(d.move.dir == 3){
                    dir = Math.random() > 0.5 ? 1 : 2;
                }

                let dstx = this._tweenX;
                let dsty = this._tweenY;

                if(dir == 1) {
                    //  1 加策划的偏移量 X
                    dstx += d.move.x;
                    dsty += d.move.y;
                }else{
                    //  2 减策划的偏移量 X
                    dstx -= d.move.x;
                    dsty += d.move.y;
                }

                atr.x = dstx;
                atr.y = dsty;

            }

            if(d.alpha != undefined){
                atr.alpha = d.alpha;
            }
            return atr;
        }

        // //抛物线
        private parabolic(tween:Tween,d:any,time:number):Tween{
            if(d.move) {
                //计算抛物线方向
                // let dir = d.move.dir;
                // if (dir == 3) {
                //     //随机
                //     dir = Math.random() > 0.5 ? 1 : 2;
                // }

                let dir = this._dir;
                if(this._isMainPlayer && d.move.dir){
                    dir = d.move.dir;
                }

                if(d.move.dir == 3){
                    dir = Math.random() > 0.5 ? 1 : 2;
                }

                let dstx = this._tweenX;
                let dsty = this._tweenY;

                if(dir == 1) {
                    //  1 加策划的偏移量 X
                    dstx += d.move.x;
                    dsty += d.move.y;
                }else{
                    //  2 减策划的偏移量 X
                    dstx -= d.move.x;
                    dsty += d.move.y;
                }

                MathUtil.parabolic2(this.dsp, time, {x: dstx, y: dsty}, Handler.alloc(this, function () {

                }), tween,{alpha:d.alpha,scale:d.scale});
            }
            return tween;
        }

        public showTween():void{

            let tween:Tween = Tween.get(this.dsp);

            for(let i = 0; i < this._actArray.length;i++){
                let groupAct = this._actArray[i];
                for(let k in groupAct){
                    let d = groupAct[k];
                    let time = groupAct.time;
                    if(k == "to"){
                        let atr = this.computerTotalAtr(d,time);
                        tween = tween.to(atr,time);
                    }else if(k == "delay"){
                        tween = tween.delay(d);
                    }else if(k == "parabolic"){
                        tween = this.parabolic(tween,d,time);
                    }else if(k == "bir"){
                        if(this._dir == 1){
                            this.dsp.x = this.dsp.x + d.x;
                        }else{
                            this.dsp.x = this.dsp.x - d.x;
                        }
                        this.dsp.y = this.dsp.y + d.y;
                        this.dsp.scaleX = d.scale;
                        this.dsp.scaleY = d.scale;
                    }
                }
            }
            tween.exec(Handler.alloc(this, this.onComplete));
        }

        private setBmp(data: MergedBmp, url: string): void {
            let self = this;
            if (self._url != url) {
                return;
            }
            self._data = data;
            let display = self.dsp;
            let text = self._text;
            //self._type = 2;
            //let mergeText = self.type == BmpTextType.ATK || self.type == BmpTextType.HIT ? "" : "F";
            let mergeText = this._isHasWord == 0 ? "" : "F";
            let numChildren: number = display.numChildren;
            let textLen: number = text.length;
            if (mergeText) {
                text = text.replace(mergeText, "");
                textLen = text.length + 1;
            }
            while (numChildren > textLen) {
                Pool.release(<BitmapBase>display.removeChildAt(numChildren - 1));
                numChildren--;
            }
            while (numChildren < textLen) {
                display.addChild(Pool.alloc(BitmapBase));
                numChildren++;
            }

            let bmpX: number = 0;
            let idx: number = 0;
            if (mergeText) {
                bmpX = self.addFontBmp(mergeText, bmpX, <BitmapBase>display.getChildAt(idx++));
            }

            // switch (self._type) {
            //     case BmpTextType.CRITICAL:
            //         bmpX -= 5;
            //         break;
            // }

            for (let i = 0, l = text.length; i < l; ++i) {
                bmpX = self.addFontBmp(text[i], bmpX, <BitmapBase>display.getChildAt(idx++));
            }
            for (let i = 0, l = numChildren; i < l; ++i) {
                (<BitmapBase>self.dsp.getChildAt(i)).verCenter();
            }

            this.setAnchorOff();

        }

        private setAnchorOff() {
            let self = this;
            self.dsp.anchorOffsetX = self.dsp.width * 0.5;
            self.dsp.anchorOffsetY = self.dsp.height * 0.5;
        }

        private addFontBmp(t: string, bmpX: number, bmp: BitmapBase): number {
            let self = this;
            let h = self._data.getVal(t, "h");
            bmp.texture = self._data.getTexture(t);
            bmp.x = bmpX;
            bmpX += bmp.texture.textureWidth;
            self.dsp.height = Math.max(h, self.dsp.height);
            return bmpX;
        }

        public advanceTime(elapseTime: number): void {
            super.advanceTime(elapseTime);
            let self = this;
            if (self.isNeedShowTween) {
                self.isNeedShowTween = false;
                this.showTween();
            }

            if (!self._showAttr) {
                return;
            }

            if (!self.parent) {
                return;
            }
            if (self._curFrame >= self._finalFrame) {
                this.onComplete();
                return;
            }
            let attr = self._showAttr[self._curFrame];
            if (attr.t == undefined) {
                this.updateAttr();
                self._curFrame++;
            } else {
                let preFrame = self._curFrame;
                let isComplete = false;
                this._curTime += elapseTime;
                while (self._curTime > attr.t) {
                    self._curFrame++;
                    if (self._curFrame == self._finalFrame) {
                        isComplete = true;
                        break;
                    }
                    attr = self._showAttr[self._curFrame];
                }
                if (isComplete) {
                    self.onComplete();
                    return;
                }
                if (preFrame != self._curFrame) {
                    self.updateAttr();
                }
            }
        }

        private onComplete() {
            this.dispose();
        }

        private updateAttr() {
            let self = this;
            let attr = self._showAttr[self._curFrame];
            let offX = attr.x + this._randomX;

            // self.x = this._tweenX;//self._startAttr.x + (this._dir == BmpTextDir.Left ? -offX : +offX);
            // self.y = this._tweenY;//self._startAttr.y + attr.y - this._randomY;

            if(this.isNeedShowTween){
                self.x = this._tweenX;//self._startAttr.x + (this._dir == BmpTextDir.Left ? -offX : +offX);
                self.y = this._tweenY;//self._startAttr.y + attr.y - this._randomY;
            }else{
                self.x = self._startAttr.x + (this._dir == BmpTextDir.Left ? -offX : +offX);
                self.y = self._startAttr.y + attr.y - this._randomY;
            }


            self.alpha = attr.a;
            self.scaleX = attr.sx;
            self.scaleY = attr.sy;
        }

        protected onAdded(): void {
            super.onAdded();
        }

        private clearDisplay(isDispose: boolean = false): void {
            let display = this.dsp;
            if (isDispose) {
                for (let i = display.numChildren - 1; i >= 0; i--) {
                    Pool.release(display.removeChildAt(i));
                }
                return;
            }
            for (let i = 0, len = display.numChildren; i < len; i++) {
                (<BitmapBase>display.getChildAt(i)).source = null;
            }
        }

        public onRelease(): void {
            let self = this;
            self._data = null;
            LoadMgr.ins.decRef(self._url);
            self._url = null;
            self._text = null;
            self._curFrame = 0;
            self.showTime = 0;
            self.isNeedShowTween = false;
            this._actArray = null;
            self.x = 0;
            self.y = 0;
            self.alpha = self.scale = 1;
            for (let k in self._startAttr) {
                delete self._startAttr[k];
            }
            self._showAttr = null;
            self.clearDisplay();
            super.onRelease();
        }

        public dispose(): void {
            this.clearDisplay(true);
            super.dispose();
        }
    }
}
